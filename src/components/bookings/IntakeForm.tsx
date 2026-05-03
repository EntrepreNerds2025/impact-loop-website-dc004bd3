import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  ADAPT_SESSION_TYPE_OPTIONS,
  getChallengeTypeOptions,
  getCallTypeConfig,
  REFERRAL_SOURCE_OPTIONS,
  SUPPORT_LEVEL_OPTIONS,
  trackBookingEvent,
  type BookingCallType,
} from "@/lib/booking";
import type { BookingLeadRecord, IntakePayload } from "./types";

type IntakeFormProps = {
  callType: BookingCallType;
  callDurationMin: number;
  preselectedSessionType?: string | null;
  onComplete: (lead: BookingLeadRecord) => void;
};

const sessionParamToLabel = (value?: string | null) => {
  if (!value) return "";
  const cleaned = value.toLowerCase();
  if (cleaned === "clarity" || cleaned === "clarity-session") return "ADAPT Clarity Session";
  if (cleaned === "working" || cleaned === "working-session") return "ADAPT Working Session";
  if (cleaned === "training" || cleaned === "training-day") return "ADAPT Training Day";
  return "";
};

const IntakeForm = ({ callType, callDurationMin, preselectedSessionType, onComplete }: IntakeFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<IntakePayload>({
    full_name: "",
    email: "",
    organization: "",
    organization_website: "",
    challenge_type: "",
    budget_range: "",
    referral_source: "",
    project_context: "",
    preferred_session_type: sessionParamToLabel(preselectedSessionType),
  });

  const callConfig = getCallTypeConfig(callType);
  const challengeOptions = getChallengeTypeOptions(callType);
  const isAdaptAdvisory = callType === "adapt-advisory" || callType === "workshop";

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.full_name.trim()) return "Please enter your full name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!form.organization.trim()) return "Please enter your organization.";
    if (!form.challenge_type) return "Please select your challenge type.";
    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        organization: form.organization.trim(),
        organization_website: form.organization_website?.trim() || null,
        challenge_type: form.challenge_type,
        budget_range: form.budget_range || null,
        referral_source: form.referral_source || null,
        call_type: callType,
        call_duration_min: callDurationMin,
        status: "intake_complete",
        pre_call_answers: {
          project_context: form.project_context?.trim() || null,
          preferred_session_type: form.preferred_session_type || null,
          service_path: callConfig.title,
          lead_source: isAdaptAdvisory ? "adapt_advisory" : "booking",
          service_interest: isAdaptAdvisory ? "adapt_advisory" : callType,
          tags: isAdaptAdvisory
            ? ["adapt_advisory", "ai_training_lead", "team_capacity_lead", "impact_loop"]
            : ["impact_loop", `${callType}_booking`],
        },
      };

      const { data, error } = await (supabase as any)
        .from("booking_leads")
        .insert(payload)
        .select(
          "id, full_name, email, organization, organization_website, challenge_type, budget_range, referral_source, call_type, call_duration_min, status, cancel_token, scheduled_at, meeting_link",
        )
        .single();

      if (error || !data) {
        throw error || new Error("Failed to save booking intake.");
      }

      onComplete(data as BookingLeadRecord);
      if (isAdaptAdvisory) {
        trackBookingEvent("adapt_advisory_form_submitted", {
          call_type: callType,
          preferred_session_type: form.preferred_session_type || "not_selected",
        });
      }
      toast.success("Great. Let's pick a time.");
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Something went wrong saving your details.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background rounded-xl border border-border p-6 md:p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-2">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            value={form.full_name}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
            Organization <span className="text-destructive">*</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            required
            value={form.organization}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Organization name"
          />
        </div>
        <div>
          <label htmlFor="organization_website" className="block text-sm font-medium text-foreground mb-2">
            Organization Website
          </label>
          <input
            id="organization_website"
            name="organization_website"
            type="url"
            value={form.organization_website || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="https://example.org"
          />
        </div>
      </div>

      <div>
        <label htmlFor="challenge_type" className="block text-sm font-medium text-foreground mb-2">
          {isAdaptAdvisory ? "What do you want help understanding or improving with AI?" : "What's the main focus right now?"} <span className="text-destructive">*</span>
        </label>
        <select
          id="challenge_type"
          name="challenge_type"
          required
          value={form.challenge_type}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="" disabled>
            Select challenge type
          </option>
          {challengeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {isAdaptAdvisory && (
        <div>
          <label htmlFor="preferred_session_type" className="block text-sm font-medium text-foreground mb-2">
            Preferred session type
          </label>
          <select
            id="preferred_session_type"
            name="preferred_session_type"
            value={form.preferred_session_type || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Not selected</option>
            {ADAPT_SESSION_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="project_context" className="block text-sm font-medium text-foreground mb-2">
          {isAdaptAdvisory ? "What should we know about your team or workflow?" : "What should we know before the call?"}
        </label>
        <textarea
          id="project_context"
          name="project_context"
          value={form.project_context || ""}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder={isAdaptAdvisory ? "Example: We want to save time on reports, stakeholder updates, internal notes, or content workflows." : "Share timeline, goals, context, or anything you want us to understand."}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="budget_range" className="block text-sm font-medium text-foreground mb-2">
            Level of support you are considering
          </label>
          <select
            id="budget_range"
            name="budget_range"
            value={form.budget_range || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Not selected</option>
            {SUPPORT_LEVEL_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="referral_source" className="block text-sm font-medium text-foreground mb-2">
            How did you find us?
          </label>
          <select
            id="referral_source"
            name="referral_source"
            value={form.referral_source || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Not selected</option>
            {REFERRAL_SOURCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Continue to Scheduling"}
      </button>
    </form>
  );
};

export default IntakeForm;
