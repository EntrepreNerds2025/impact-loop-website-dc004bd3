import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BrainCircuit, Calendar, Camera, CheckCircle2, Clock, MessageSquare, Repeat2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import StepIndicator from "@/components/bookings/StepIndicator";
import IntakeForm from "@/components/bookings/IntakeForm";
import AvailabilityPicker from "@/components/bookings/AvailabilityPicker";
import type { AvailabilitySlot, BookingLeadRecord } from "@/components/bookings/types";
import {
  BOOKING_CALL_TYPES,
  BOOKING_STEPS,
  getCallTypeConfig,
  normalizeCallType,
  type BookingCallType,
} from "@/lib/booking";

const callTypeIcons = {
  strategy: MessageSquare,
  "story-capture": Camera,
  visibility: Repeat2,
  "adapt-advisory": BrainCircuit,
  diagnostic: MessageSquare,
  workshop: Calendar,
  pilot: Clock,
} as const;

const Bookings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const preselectedCallType = useMemo(
    () => normalizeCallType(searchParams.get("type")),
    [searchParams],
  );
  const preselectedSessionType = searchParams.get("session");

  const [selectedCallType, setSelectedCallType] = useState<BookingCallType | null>(
    preselectedCallType,
  );
  const [currentStep, setCurrentStep] = useState(preselectedCallType ? 2 : 1);
  const [bookingLead, setBookingLead] = useState<BookingLeadRecord | null>(null);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);

  useEffect(() => {
    setSEO({
      title: "Book a Call - Impact Loop",
      description:
        "Book an Impact Strategy, Story Capture, Visibility System, or ADAPT Advisory call with Impact Loop.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  useEffect(() => {
    if (!preselectedCallType) return;
    setSelectedCallType(preselectedCallType);
    setCurrentStep((prev) => (prev < 2 ? 2 : prev));
  }, [preselectedCallType]);

  const selectedCallConfig = selectedCallType ? getCallTypeConfig(selectedCallType) : null;

  const handleSelectCallType = (callType: BookingCallType) => {
    setSelectedCallType(callType);
    setCurrentStep(2);
    setBookingLead(null);
  };

  const handleIntakeComplete = (lead: BookingLeadRecord) => {
    setBookingLead(lead);
    setCurrentStep(3);
  };

  const handleConfirmSlot = async (slot: AvailabilitySlot) => {
    if (!bookingLead?.id) {
      toast.error("Please complete the intake form first.");
      return;
    }

    setIsCreatingBooking(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-booking", {
        body: {
          booking_lead_id: bookingLead.id,
          selected_slot: slot.start_utc,
        },
      });

      if (error) throw new Error(error.message || "Failed to book this slot.");

      const booking = data?.booking;
      if (!booking?.cancel_token || !booking?.scheduled_at) {
        throw new Error("Booking response is missing required details.");
      }

      const params = new URLSearchParams({
        token: booking.cancel_token,
        scheduled: booking.scheduled_at,
        callType: booking.call_type || selectedCallType || "diagnostic",
        callTypeLabel: booking.call_type_label || selectedCallConfig?.title || "Impact Loop Call",
        challenge: booking.challenge_type || bookingLead.challenge_type,
        name: booking.full_name || bookingLead.full_name,
        meeting: booking.meeting_link || "",
      });

      setCurrentStep(4);
      toast.success("Booking confirmed.");
      navigate(`/booking-confirmed?${params.toString()}`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Could not complete booking.");
    } finally {
      setIsCreatingBooking(false);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 1 || !selectedCallType) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {BOOKING_CALL_TYPES.map((type) => {
            const Icon = callTypeIcons[type.id];
            return (
              <div key={type.id} className="bg-background rounded-lg border border-border p-6">
                <div className="w-12 h-12 rounded-lg bg-impact-blue/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-impact-blue" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">{type.title}</h3>
                <p className="text-impact-blue text-sm font-medium mb-4">{type.durationLabel}</p>
                <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                <p className="text-muted-foreground/80 text-xs mb-6">
                  <span className="font-semibold">Ideal for:</span> {type.ideal}
                </p>
                <button className="btn-primary w-full" onClick={() => handleSelectCallType(type.id)}>
                  Choose This Call
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="space-y-5">
          <div className="rounded-lg border border-border bg-background p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Selected Call Type</p>
            <p className="font-serif text-2xl text-foreground">{selectedCallConfig?.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{selectedCallConfig?.durationLabel}</p>
          </div>
          <IntakeForm
            callType={selectedCallType}
            callDurationMin={selectedCallConfig?.durationMinutes || 45}
            preselectedSessionType={preselectedSessionType}
            onComplete={handleIntakeComplete}
          />
          {!preselectedCallType && (
            <button
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
              onClick={() => setCurrentStep(1)}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to call types
            </button>
          )}
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="space-y-5">
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-800">
            <p className="font-semibold inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Intake complete
            </p>
            <p className="mt-1">
              Booking for <strong>{bookingLead?.full_name}</strong> at{" "}
              <strong>{bookingLead?.organization}</strong>.
            </p>
          </div>

          <AvailabilityPicker
            durationMinutes={selectedCallConfig?.durationMinutes || bookingLead?.call_duration_min || 45}
            onConfirm={handleConfirmSlot}
            confirmLabel={isCreatingBooking ? "Booking..." : "Confirm Booking"}
          />

          <button
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
            onClick={() => setCurrentStep(2)}
            disabled={isCreatingBooking}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to intake
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-impact-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
              Start Here
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Book Your <span className="text-gradient">Impact Strategy Call</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Choose the starting point that matches your needs, share context, and reserve a time with real availability.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 section-cream">
        <div className="container mx-auto px-6 max-w-6xl space-y-8">
          <StepIndicator steps={BOOKING_STEPS} currentStep={currentStep} />
          {renderStepContent()}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-impact-dark mb-6">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="w-8 h-8 rounded-full bg-impact-blue text-white flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h4 className="font-semibold text-impact-dark mb-2">We Listen</h4>
                <p className="text-impact-dark/60 text-sm">
                  You share your current goals, context, and what your team is trying to move forward.
                </p>
              </div>
              <div>
                <div className="w-8 h-8 rounded-full bg-impact-blue text-white flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h4 className="font-semibold text-impact-dark mb-2">We Explore</h4>
                <p className="text-impact-dark/60 text-sm">
                  Together, we look at whether capture, visibility, ADAPT, or a combined path makes the most sense.
                </p>
              </div>
              <div>
                <div className="w-8 h-8 rounded-full bg-impact-blue text-white flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h4 className="font-semibold text-impact-dark mb-2">We Recommend</h4>
                <p className="text-impact-dark/60 text-sm">
                  You leave with clear next steps and a practical direction forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bookings;
