import { supabase } from "@/integrations/supabase/client";

export const ORGANIZATION_TYPES = [
  "Nonprofit",
  "Foundation",
  "Corporate Team",
  "Small Business",
  "Public Sector",
  "Community Organization",
  "Other",
] as const;

export const SAMPLE_CONTENT_STATUSES = [
  "sample_requested",
  "reviewing",
  "generating_samples",
  "samples_ready",
  "email_sent",
  "closed",
] as const;

export type OrganizationType = (typeof ORGANIZATION_TYPES)[number];
export type SampleContentStatus = (typeof SAMPLE_CONTENT_STATUSES)[number];

export type Lead = {
  first_name: string;
  last_name: string;
  email: string;
  organization_name: string;
  organization_type: OrganizationType;
  website_or_social_link: string;
  visibility_goal: string;
  interested_in_ongoing_content_support: boolean;
};

export type SampleContentRequest = Lead & {
  id: string;
  source: "impact_visibility_system_page";
  lead_magnet: "sample_content_pack";
  tags: string[];
  stage: "Sample Content Requested";
  status: SampleContentStatus;
  assigned_team_member: string | null;
  sample_pack_url: string | null;
  sample_pack_notes: string | null;
  generated_post_ideas: string | null;
  visual_prompt_notes: string | null;
  internal_notes: string | null;
  follow_up_email_status: string;
  created_at: string;
  updated_at: string;
};

export type SampleContentRequestUpdate = Partial<
  Pick<
    SampleContentRequest,
    | "status"
    | "assigned_team_member"
    | "sample_pack_url"
    | "sample_pack_notes"
    | "generated_post_ideas"
    | "visual_prompt_notes"
    | "internal_notes"
    | "follow_up_email_status"
  >
>;

export const SAMPLE_CONTENT_TAGS = [
  "impact_visibility_sample_request",
  "content_services_lead",
  "impact_loop",
] as const;

export const BOOKING_LINK = "/bookings?type=diagnostic";

export const statusLabels: Record<SampleContentStatus, string> = {
  sample_requested: "Sample requested",
  reviewing: "Reviewing",
  generating_samples: "Generating samples",
  samples_ready: "Samples ready",
  email_sent: "Email sent",
  closed: "Closed",
};

export function trackImpactVisibilityEvent(eventName: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const win = window as Window & {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    dataLayer?: unknown[];
  };

  win.gtag?.("event", eventName, payload || {});
  win.plausible?.(eventName, payload ? { props: payload } : undefined);
  win.dataLayer?.push({ event: eventName, ...(payload || {}) });
}

export function buildSampleRequestPayload(lead: Lead) {
  return {
    ...lead,
    first_name: lead.first_name.trim(),
    last_name: lead.last_name.trim(),
    email: lead.email.trim().toLowerCase(),
    organization_name: lead.organization_name.trim(),
    website_or_social_link: lead.website_or_social_link.trim(),
    visibility_goal: lead.visibility_goal.trim(),
    source: "impact_visibility_system_page",
    lead_magnet: "sample_content_pack",
    status: "sample_requested",
    stage: "Sample Content Requested",
    tags: [...SAMPLE_CONTENT_TAGS],
  };
}

export async function submitSampleContentRequest(lead: Lead) {
  const payload = buildSampleRequestPayload(lead);

  try {
    const { data, error } = await supabase.functions.invoke("impact-visibility-sample", {
      body: payload,
    });

    if (!error && data?.request) {
      return data.request as SampleContentRequest;
    }
  } catch (error) {
    console.warn("Impact visibility edge function unavailable; falling back to direct insert.", error);
  }

  const { data, error } = await (supabase as any)
    .from("sample_content_requests")
    .upsert(payload, {
      onConflict: "email,organization_name,lead_magnet",
    })
    .select("*")
    .single();

  if (error || !data) {
    throw error || new Error("Could not save sample content request.");
  }

  return data as SampleContentRequest;
}

export async function updateSampleContentRequest(id: string, updates: SampleContentRequestUpdate) {
  const { data, error } = await (supabase as any)
    .from("sample_content_requests")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    throw error || new Error("Could not update sample content request.");
  }

  return data as SampleContentRequest;
}

export function buildSampleGenerationBrief(request: SampleContentRequest) {
  return `Create a sample content pack for ${request.organization_name}, a ${request.organization_type}.
Website or social link: ${request.website_or_social_link}
Visibility goal: ${request.visibility_goal}

Create:
1. Three social post concepts
2. Three captions
3. Three visual directions for Image 2.0
4. One carousel idea
5. One LinkedIn post idea
6. One short campaign theme

Tone:
Human, warm, clear, mission-driven, professional, story-first.

Avoid:
Generic nonprofit language, hype, robotic AI phrasing, and overpromising.`;
}

export function buildFollowUpEmail(request: SampleContentRequest) {
  return `Subject: Your sample content pack is ready

Hi ${request.first_name},

Thanks again for requesting a sample content pack.

We took a look at ${request.organization_name} and put together a few content ideas based on the work you're doing and the visibility goal you shared.

You can view it here:
${request.sample_pack_url || "[Sample Pack URL]"}

This is a small preview of how your organization could turn real work, programs, events, and updates into consistent content that builds trust and support over time.

If you'd like, we can also walk you through how the Impact Visibility System could support your team on a monthly basis.

Book a call here:
${typeof window !== "undefined" ? `${window.location.origin}${BOOKING_LINK}` : BOOKING_LINK}

Warmly,
Impact Loop`;
}
