import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import AvailabilityPicker from "@/components/bookings/AvailabilityPicker";
import type { AvailabilitySlot, BookingLeadRecord } from "@/components/bookings/types";
import { formatBookingDateTime } from "@/lib/booking";

const RescheduleBooking = () => {
  const { token = "" } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booking, setBooking] = useState<(BookingLeadRecord & { call_type_label?: string }) | null>(null);

  const loadBooking = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("reschedule-booking", {
        body: { cancel_token: token, preview: true },
      });

      if (error) throw new Error(error.message || "Could not load booking.");
      if (!data?.booking) throw new Error("Booking not found.");
      setBooking(data.booking);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to load booking.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooking();
  }, [token]);

  const handleReschedule = async (slot: AvailabilitySlot) => {
    if (!token) return;
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("reschedule-booking", {
        body: {
          cancel_token: token,
          new_slot: slot.start_utc,
        },
      });

      if (error) throw new Error(error.message || "Failed to reschedule.");
      if (!data?.booking) throw new Error("Reschedule response missing booking data.");

      toast.success("Booking rescheduled.");
      const params = new URLSearchParams({
        token,
        scheduled: data.booking.scheduled_at,
        callType: data.booking.call_type || "diagnostic",
        callTypeLabel: data.booking.call_type_label || "Impact Loop Call",
        challenge: data.booking.challenge_type || "",
        name: data.booking.full_name || "",
        meeting: data.booking.meeting_link || "",
      });
      navigate(`/booking-confirmed?${params.toString()}`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Could not reschedule booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-16 section-dark">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-impact-blue text-xs uppercase tracking-widest mb-4">Reschedule Booking</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-5">Pick a new time</h1>
          <p className="text-white/70">Choose a new slot and we'll update your calendar invite automatically.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl space-y-6">
          {isLoading ? (
            <div className="border border-border rounded-lg p-6">Loading booking...</div>
          ) : !booking ? (
            <div className="border border-border rounded-lg p-6 space-y-4">
              <p className="text-muted-foreground">We couldn't find this booking token.</p>
              <Link to="/bookings" className="btn-primary inline-flex">
                Book a New Call
              </Link>
            </div>
          ) : (
            <>
              <div className="border border-border rounded-lg p-6 bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Current booking</p>
                <p className="font-serif text-2xl text-foreground mb-2">{booking.call_type_label || "Impact Loop Call"}</p>
                {booking.scheduled_at ? (
                  <p className="text-sm text-muted-foreground">
                    {formatBookingDateTime(booking.scheduled_at)}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">No current schedule found.</p>
                )}
              </div>

              <AvailabilityPicker
                durationMinutes={booking.call_duration_min || 45}
                onConfirm={handleReschedule}
                confirmLabel={isSubmitting ? "Rescheduling..." : "Confirm New Time"}
              />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default RescheduleBooking;
