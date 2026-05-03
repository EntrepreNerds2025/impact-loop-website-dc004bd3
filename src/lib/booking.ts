export type BookingCallType =
  | "strategy"
  | "story-capture"
  | "visibility"
  | "adapt-advisory"
  | "diagnostic"
  | "workshop"
  | "pilot";

export type BookingCallTypeConfig = {
  id: BookingCallType;
  title: string;
  durationMinutes: number;
  durationLabel: string;
  description: string;
  ideal: string;
};

export const BOOKING_CALL_TYPES: BookingCallTypeConfig[] = [
  {
    id: "strategy",
    title: "Impact Strategy Call",
    durationMinutes: 45,
    durationLabel: "45 minutes",
    description:
      "A focused conversation to understand what your team needs most: capture, visibility, ADAPT, or a mix of support.",
    ideal:
      "Leaders who know something needs to improve but want help choosing the right starting point.",
  },
  {
    id: "story-capture",
    title: "Story Capture Call",
    durationMinutes: 45,
    durationLabel: "45 minutes",
    description:
      "Talk through a program, event, interview, community story, or campaign moment that needs to be captured properly.",
    ideal:
      "Teams planning program capture, event storytelling, interviews, testimonials, photo, or video assets.",
  },
  {
    id: "visibility",
    title: "Visibility System Call",
    durationMinutes: 45,
    durationLabel: "45 minutes",
    description:
      "Explore how your existing work, photos, reports, updates, and events could become consistent content.",
    ideal:
      "Organizations that need ongoing visibility without adding more work to the team.",
  },
  {
    id: "adapt-advisory",
    title: "ADAPT Advisory Call",
    durationMinutes: 60,
    durationLabel: "60 minutes",
    description:
      "Get focused guidance on where AI fits into your real workflows, communication, content, reporting, and team capacity.",
    ideal:
      "Leaders and small teams who want practical AI direction before a full training day or implementation project.",
  },
];

export const LEGACY_CALL_TYPE_MAP: Record<string, BookingCallType> = {
  diagnostic: "strategy",
  workshop: "adapt-advisory",
  pilot: "visibility",
};

export const CHALLENGE_TYPE_OPTIONS_BY_CALL_TYPE: Record<BookingCallType, readonly string[]> = {
  strategy: [
    "We need to capture a program, event, or story",
    "We need more consistent visibility",
    "We need help using AI and workflows better",
    "We need help deciding where to start",
    "Something else",
  ],
  "story-capture": [
    "We need a program captured",
    "We need an event or community moment documented",
    "We need interviews, testimonials, or participant stories",
    "We need photo and video assets we can reuse",
    "We need campaign or fundraising storytelling",
    "Something else",
  ],
  visibility: [
    "We need consistent monthly content",
    "We want to repurpose existing photos, reports, or updates",
    "We need donor, stakeholder, or partner updates",
    "We want a free sample content pack",
    "We need ongoing content support",
    "Something else",
  ],
  "adapt-advisory": [
    "We want to understand where AI fits into our work",
    "We need to improve team workflows and communication",
    "We want to map practical AI use cases",
    "We are considering an ADAPT training day",
    "We need help choosing a first step",
    "Something else",
  ],
  diagnostic: [
    "We need to capture a program, event, or story",
    "We need more consistent visibility",
    "We need help using AI and workflows better",
    "We need help deciding where to start",
    "Something else",
  ],
  workshop: [
    "We want to understand where AI fits into our work",
    "We need to improve team workflows and communication",
    "We want to map practical AI use cases",
    "We are considering an ADAPT training day",
    "Something else",
  ],
  pilot: [
    "We need consistent monthly content",
    "We want to repurpose existing photos, reports, or updates",
    "We need donor, stakeholder, or partner updates",
    "Something else",
  ],
} as const;

export const SUPPORT_LEVEL_OPTIONS = [
  "A focused session",
  "A project",
  "Monthly support",
  "A larger program or campaign capture",
  "Not sure yet",
] as const;

export const ADAPT_SESSION_TYPE_OPTIONS = [
  "ADAPT Clarity Session",
  "ADAPT Working Session",
  "ADAPT Training Day",
  "Not sure yet",
] as const;

export const REFERRAL_SOURCE_OPTIONS = [
  "Google/Search",
  "LinkedIn",
  "Instagram",
  "Partner Referral",
  "Word of Mouth",
  "Existing Client",
  "Other",
] as const;

export const BOOKING_STEPS = [
  "Choose Call Type",
  "Tell Us About You",
  "Pick a Time",
  "Confirmed",
] as const;

export const getCallTypeConfig = (callType: BookingCallType) =>
  BOOKING_CALL_TYPES.find((item) => item.id === (LEGACY_CALL_TYPE_MAP[callType] || callType)) || BOOKING_CALL_TYPES[0];

export const getChallengeTypeOptions = (callType: BookingCallType) =>
  CHALLENGE_TYPE_OPTIONS_BY_CALL_TYPE[callType] || CHALLENGE_TYPE_OPTIONS_BY_CALL_TYPE.strategy;

export const normalizeCallType = (value: string | null): BookingCallType | null => {
  if (!value) return null;
  const cleaned = value.trim().toLowerCase();
  if (cleaned === "strategy") return "strategy";
  if (cleaned === "story-capture" || cleaned === "story_capture") return "story-capture";
  if (cleaned === "visibility") return "visibility";
  if (cleaned === "adapt-advisory" || cleaned === "adapt_advisory") return "adapt-advisory";
  if (cleaned === "diagnostic") return "strategy";
  if (cleaned === "workshop") return "adapt-advisory";
  if (cleaned === "pilot") return "visibility";
  return null;
};

export const CASE_STUDY_BY_CHALLENGE: Record<string, { title: string; href: string }> = {
  "We need to capture a program, event, or story": {
    title: "Black Creek: Black History Month",
    href: "/work",
  },
  "We need more consistent visibility": {
    title: "Black Creek BHM Media Hub",
    href: "/hub/black-creek-bhm",
  },
  "We need help using AI and workflows better": {
    title: "ADAPT AI Training",
    href: "/adapt-ai-training",
  },
  "We need a program captured": {
    title: "EmployNext: Youth Trades Program",
    href: "/work",
  },
  "We need an event or community moment documented": {
    title: "Black Creek: Black History Month",
    href: "/work",
  },
  "We want to understand where AI fits into our work": {
    title: "ADAPT AI Training",
    href: "/adapt-ai-training",
  },
  "We need a film or video to build trust with funders": {
    title: "CafCan: Our People's Keeper",
    href: "/work",
  },
  "We need a content system, not just a one-off project": {
    title: "Lakeridge Health: I Belong Initiative",
    href: "/work",
  },
  "We need to communicate ESG or impact to stakeholders": {
    title: "Reddit AI Search Event",
    href: "/work",
  },
  "We need help building internal storytelling capacity": {
    title: "EmployNext: Youth Trades Program",
    href: "/work",
  },
  "Something else": {
    title: "Hair for Self-Esteem",
    href: "/work",
  },
};

export const getCaseStudyForChallenge = (challengeType?: string | null) =>
  CASE_STUDY_BY_CHALLENGE[challengeType || ""] || CASE_STUDY_BY_CHALLENGE["Something else"];

export function trackBookingEvent(eventName: string, payload?: Record<string, unknown>) {
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

export const formatBookingDateTime = (iso: string, timeZone?: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(iso));

export const formatBookingTime = (iso: string, timeZone?: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));

export const formatBookingDate = (iso: string, timeZone?: string) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
