import type { ImpactPage } from "./types";

/**
 * CAFCAN — One Person, One Kit, One Trade (OPKT) employment & skills program.
 * Serves newcomers/refugees and community members across Toronto.
 *
 * NOTE ON DATA: the stats, cohorts, outcomes, and stories below are the program's
 * real reported information. The `standard` block is an ILLUSTRATIVE mapping of
 * those qualitative outcomes onto the five pillars — clearly flagged in the UI —
 * to show what measured Impact Loop Standard data would look like. It is NOT
 * audited Pillar Moment data. Replace with real measured scores once staff begin
 * logging observations.
 */
export const cafcanOpkt: ImpactPage = {
  slug: "cafcan-opkt",
  organizationId: "cafcan",
  programId: "opkt",

  organizationName: "CAFCAN Social Services",
  programName: "One Person, One Kit, One Trade",
  programDescription:
    "An employment-readiness and skilled-trades pathway built with and for newcomers, refugees, and community members — pairing culturally grounded support with hands-on training in employment readiness, skilled trades, and entrepreneurship.",
  communityServed: "Newcomer & refugee communities · Toronto",
  reportingPeriod: "Nov 2025 – Mar 2026",

  hero: {
    kicker: "CAFCAN Social Services · Impact Report",
    headline: "One Person, One Kit, One Trade",
    subhead:
      "From a 72-person launch to six focused cohorts in employment readiness, skilled trades, and entrepreneurship — a pathway to work, dignity, and belonging.",
  },

  participantsServed: 140,
  cohortsCount: 6,

  stats: [
    { value: "72", label: "Participants at launch", sublabel: "Nov 13, 2025" },
    { value: "6", label: "Cohorts delivered" },
    { value: "140+", label: "Participants served" },
    { value: "3", label: "Skill pathways", sublabel: "Readiness · Trades · Entrepreneurship" },
  ],

  cohorts: [
    { name: "Launch Day", focus: "Program kickoff", participants: 72, date: "Nov 13, 2025" },
    { name: "Cohort 1", focus: "Employment Readiness", participants: 18 },
    { name: "Cohort 2", focus: "Employment Readiness", participants: 25 },
    { name: "Cohort 3", focus: "Employment Readiness", participants: 21 },
    { name: "Cohort 4", focus: "Employment Readiness", participants: 26 },
    { name: "Cohort 5", focus: "Skilled Trades", participants: 25, date: "Mar 11, 2026" },
    { name: "Cohort 6", focus: "Entrepreneurship", participants: 25, date: "Mar 17–19, 2026" },
  ],

  keyOutcomes: [
    { value: "Readiness", label: "Participants left equipped to pursue employment with confidence." },
    { value: "Skills", label: "Hands-on trade and entrepreneurship experience that builds real capability." },
    { value: "Belonging", label: "A culturally grounded space where newcomers feel seen and supported." },
    { value: "Pathways", label: "Clear next steps into work, trades, or starting a business." },
    { value: "Confidence", label: "A stronger sense of self and agency in a new country." },
    { value: "Network", label: "Connection to mentors, partners, and one another." },
  ],

  impactHighlights: [
    "A 72-participant launch day brought the whole community together around the program's vision.",
    "Six cohorts delivered across three distinct skill pathways in under five months.",
    "Skilled-trades and entrepreneurship sessions translated readiness into tangible capability.",
  ],

  testimonials: [
    {
      quote:
        "For the first time since arriving, I felt like someone was investing in my future, not just my paperwork.",
      attribution: "Program participant",
    },
    {
      quote:
        "The trades session showed me I could actually build a career here. I left with a plan.",
      attribution: "Cohort 5 participant",
    },
  ],

  staffQuotes: [
    {
      quote:
        "These aren't just job-skills classes. We're helping people rebuild identity and belonging while they build a livelihood.",
      role: "Program facilitator",
    },
  ],

  partners: [
    { name: "CAFCAN Social Services" },
    { name: "Christie Refugee Welcome Centre" },
    { name: "Homes First" },
    { name: "Up With Women" },
    { name: "CIBC" },
    { name: "City of Toronto" },
  ],

  // ----- ILLUSTRATIVE Standard preview (not audited data) -----
  standard: {
    status: "illustrative",
    summary:
      "Mapped onto the Impact Loop Standard's five pillars, here is what this program's outcomes would look like as measurable growth — the version a funder could track over time.",
    pillars: [
      { pillar: "identity", current: 74, growth: 18, confidence: "Developing" },
      { pillar: "character", current: 69, growth: 14, confidence: "Developing" },
      { pillar: "relationships", current: 71, growth: 16, confidence: "Developing" },
      { pillar: "service", current: 63, growth: 9, confidence: "Emerging picture" },
      { pillar: "purpose", current: 78, growth: 22, confidence: "Developing" },
    ],
    sampleObservations: [
      {
        pillar: "purpose",
        note: "Participant set a concrete goal to enter the skilled trades and built a step-by-step plan during the session.",
        date: "Mar 2026",
      },
      {
        pillar: "identity",
        note: "Spoke up in front of the cohort about their experience as a newcomer with visible pride and confidence.",
        date: "Feb 2026",
      },
    ],
  },

  cta: {
    heading: "Support newcomer pathways to work",
    body: "Help CAFCAN bring employment readiness, skilled trades, and entrepreneurship to the next cohort.",
    buttonLabel: "Partner with this program",
    buttonHref: "/contact",
  },

  allowDownload: true,

  seo: {
    title: "CAFCAN One Person, One Kit, One Trade — Impact Report",
    description:
      "An impact report for CAFCAN's newcomer employment & skilled-trades program: 140+ participants across six cohorts in Toronto.",
  },
};
