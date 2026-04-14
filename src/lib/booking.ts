export type BookingCallType = "diagnostic" | "workshop" | "pilot";

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
    id: "diagnostic",
    title: "Storytelling Diagnostic",
    durationMinutes: 45,
    durationLabel: "45 minutes",
    description:
      "A focused conversation to understand your storytelling challenges and explore practical next steps.",
    ideal:
      "Nonprofit leaders, CSR teams, and communications directors evaluating the right direction.",
  },
  {
    id: "workshop",
    title: "Workshop Discovery Call",
    durationMinutes: 30,
    durationLabel: "30 minutes",
    description:
      "Discuss training needs and workshop options for building storytelling capacity across your team.",
    ideal:
      "Teams responsible for impact reporting, communications, or stakeholder trust.",
  },
  {
    id: "pilot",
    title: "System Pilot Call",
    durationMinutes: 45,
    durationLabel: "45 minutes",
    description:
      "Deep dive into what a custom storytelling system pilot would look like for your organization.",
    ideal:
      "Organizations ready to invest in storytelling infrastructure and implementation support.",
  },
];

export const CHALLENGE_TYPE_OPTIONS = [
  "We need a film or video to build trust with funders",
  "We need a content system, not just a one-off project",
  "We need to communicate ESG or impact to stakeholders",
  "We need help building internal storytelling capacity",
  "Something else",
] as const;

export const BUDGET_RANGE_OPTIONS = [
  "Under $2,000",
  "$2,000 to $5,000",
  "$5,000 to $15,000",
  "$15,000+",
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
  BOOKING_CALL_TYPES.find((item) => item.id === callType) || BOOKING_CALL_TYPES[0];

export const normalizeCallType = (value: string | null): BookingCallType | null => {
  if (!value) return null;
  const cleaned = value.trim().toLowerCase();
  if (cleaned === "diagnostic") return "diagnostic";
  if (cleaned === "workshop") return "workshop";
  if (cleaned === "pilot") return "pilot";
  return null;
};

export const CASE_STUDY_BY_CHALLENGE: Record<string, { title: string; href: string }> = {
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
