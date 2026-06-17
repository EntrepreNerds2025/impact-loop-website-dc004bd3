// ============================================================================
// Impact Page data model
// ----------------------------------------------------------------------------
// One Impact Page = a credible, story-driven impact report that is ALSO a
// future-ready data container for The Impact Loop Standard.
//
// Today a page may be populated from manually-entered nonprofit data (stats,
// stories, media). Tomorrow the optional `standard` block can be populated
// directly from the Impact Loop Standard software (Pillar Moments → scores).
// The shape below is designed so that swap requires no template changes.
// ============================================================================

export type PillarId =
  | "identity"
  | "character"
  | "relationships"
  | "service"
  | "purpose";

export interface PillarDef {
  id: PillarId;
  name: string;
  color: string; // hex
}

export const STANDARD_PILLARS: PillarDef[] = [
  { id: "identity", name: "Identity", color: "#7C3AED" },
  { id: "character", name: "Character", color: "#2563EB" },
  { id: "relationships", name: "Relationships", color: "#0D9488" },
  { id: "service", name: "Service", color: "#EA580C" },
  { id: "purpose", name: "Purpose", color: "#CA8A04" },
];

// ---- content building blocks ------------------------------------------------

export interface ImpactStat {
  value: string; // "72", "94%", "6"
  label: string; // "Participants served"
  sublabel?: string;
}

export interface Cohort {
  name: string; // "Cohort 1"
  focus?: string; // "Employment Readiness"
  participants?: number;
  date?: string;
  location?: string;
}

export interface Outcome {
  value: string; // a word ("Confidence") or a figure ("87%")
  label: string;
}

export interface Testimonial {
  quote: string;
  attribution?: string; // anonymized is fine: "Program participant"
  role?: string;
}

export interface StaffQuote {
  quote: string;
  name?: string;
  role?: string;
}

export interface Partner {
  name: string;
  logo?: string; // imported asset URL (optional)
  contribution?: string;
  outcome?: string;
}

export interface MediaPhoto {
  src: string;
  alt?: string;
  caption?: string;
}

export interface MediaVideo {
  provider?: "vimeo" | "youtube";
  id: string;
  title?: string;
}

// ---- The Impact Loop Standard layer (optional, future-ready) ---------------

export type ConfidenceTier =
  | "Emerging picture"
  | "Developing"
  | "Strong evidence";

export interface PillarScore {
  pillar: PillarId;
  current: number; // 0–100
  lastPeriod?: number; // 0–100
  growth?: number; // points vs last period
  observations?: number;
  confidence?: ConfidenceTier;
}

export interface SampleObservation {
  pillar: PillarId;
  note: string; // anonymized staff observation
  date?: string;
}

/**
 * `status` is a credibility flag and MUST be honored in the UI:
 *  - "live"        → real measured Pillar Moment data from the Standard software
 *  - "preview"     → real data, partial / early (small samples)
 *  - "illustrative"→ NOT measured; a mapping of existing qualitative outcomes onto
 *                    the pillars to show what the measured version would look like.
 *                    The template labels this clearly so it is never mistaken for
 *                    audited data.
 */
export interface StandardData {
  status: "live" | "preview" | "illustrative";
  asOf?: string;
  summary?: string;
  pillars?: PillarScore[];
  sampleObservations?: SampleObservation[];
}

// ---- section identifiers (for show/hide control) ---------------------------

export type ImpactSectionId =
  | "hero"
  | "overview"
  | "stats"
  | "cohorts"
  | "outcomes"
  | "highlights"
  | "standard"
  | "stories"
  | "staff"
  | "media"
  | "partners"
  | "cta";

// ---- the page itself --------------------------------------------------------

export interface ImpactPage {
  // identity & future-ready keys (map to Standard software later)
  slug: string;
  organizationId?: string;
  programId?: string;

  // header / context
  organizationName: string;
  programName: string;
  programDescription?: string;
  communityServed?: string;
  reportingPeriod?: string;

  // hero
  hero?: {
    kicker?: string;
    headline?: string;
    subhead?: string;
    image?: string;
    videoVimeoId?: string;
  };

  // counts / engagement
  participantsServed?: number;
  cohortsCount?: number;
  engagementNote?: string;
  cohorts?: Cohort[];

  // content blocks
  stats?: ImpactStat[];
  keyOutcomes?: Outcome[];
  impactHighlights?: string[];
  testimonials?: Testimonial[];
  staffQuotes?: StaffQuote[];
  partners?: Partner[];

  // media
  photos?: MediaPhoto[];
  videos?: MediaVideo[];

  // funder-facing CTA
  cta?: {
    heading?: string;
    body?: string;
    buttonLabel?: string;
    buttonHref?: string;
  };

  // optional: which sections render (defaults to "show if data present")
  sections?: Partial<Record<ImpactSectionId, boolean>>;

  // the Impact Loop Standard layer
  standard?: StandardData;

  // export / report
  allowDownload?: boolean;

  // seo
  seo?: { title?: string; description?: string };
}

export const pillarById = (id: PillarId): PillarDef =>
  STANDARD_PILLARS.find((p) => p.id === id) ?? STANDARD_PILLARS[0];
