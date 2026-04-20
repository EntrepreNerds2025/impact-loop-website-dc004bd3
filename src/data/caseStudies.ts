/**
 * Case Studies data
 *
 * Each entry powers a full /work/:slug page that walks through the Problem →
 * Approach → Process → Deliverables → Result arc for a signature Impact Loop
 * project.
 */

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Deliverable {
  title: string;
  description: string;
}

export interface Outcome {
  value: string;
  label: string;
}

export interface CaseStudyQuote {
  text: string;
  name: string;
  role: string;
}

export interface Partner {
  name: string;
  role?: string;
}

export interface GalleryPhoto {
  src: string;
  caption: string;
  /** When true, this image spans two columns in the grid for editorial rhythm. */
  wide?: boolean;
}

export interface VideoTestimonial {
  vimeoId: string;
  title: string;
  /** Optional start time (seconds) for the looping preview. */
  previewStart?: number;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  tagline: string;
  heroVimeoId: string;
  previewStart?: number;
  overview: string;
  theAsk: {
    headline: string;
    body: string;
  };
  theApproach: {
    headline: string;
    body: string;
  };
  theProcess: ProcessStep[];
  theDeliverables: Deliverable[];
  theResult: {
    headline: string;
    body: string;
    outcomes: Outcome[];
    quote?: CaseStudyQuote;
  };
  partners?: Partner[];
  hubLink?: string;
  related?: string[];
  /**
   * Optional editorial photo gallery. Placeholder images from Unsplash are
   * fine to start, swap with real production stills when available.
   */
  gallery?: GalleryPhoto[];
  /**
   * Optional mini testimonial video gallery. When present, a "Voices from the
   * Project" section is rendered on the case study page with a CTA linking
   * to the full testimonial library on the Impact Media Hub page.
   */
  videoTestimonials?: VideoTestimonial[];
}

export const caseStudies: CaseStudy[] = [
  /* ────────────────────────── EmployNext ────────────────────────── */
  {
    slug: "employnext-youth-trades",
    title: "EmployNext: Youth Trades Program",
    client: "EmployNext",
    category: "Program Highlights",
    year: "2025",
    tagline:
      "A documentary-style film that turned a youth trades program into a funder, partner, and recruitment asset.",
    heroVimeoId: "1174716942",
    overview:
      "EmployNext partnered with construction organizations, employers, and training centres to address youth unemployment and the growing skilled trades shortage across Ontario. Participants gained hands-on experience, industry certifications, and the soft skills employers actually demand.",
    theAsk: {
      headline: "Prove a youth trades program works to funders who have seen a dozen that didn't.",
      body:
        "Youth unemployment in Ontario was rising while employers in the skilled trades sector were facing a critical worker shortage. Traditional job programs were placing young people in roles without the certifications, professional habits, or mentorship that employers actually needed, so placements collapsed within weeks. EmployNext had results to show, but no story assets to prove it to government funders, industry partners, or prospective participants. A written report couldn't do the job: funders needed to see the rigor of the training, hear from participants in their own words, and watch employers validate that the program was producing workers they would actually hire.",
    },
    theApproach: {
      headline: "A three-voice documentary so no one has to take anyone's word for it.",
      body:
        "We built the film around three voices that had to line up on camera for the story to be credible: participants sharing their own transformation, instructors explaining the rigor of the training, and employers testifying to the quality of the workers coming out the other end. If all three voices aligned on the same story, the proof was self-evident. We designed the edit to anchor EmployNext's impact report while doubling as a cohort recruitment tool, one piece of content engineered from day one to serve funder reporting, partner recruitment, and participant intake.",
    },
    theProcess: [
      {
        title: "Discovery and story architecture",
        description:
          "We mapped the program's narrative arc against the three core audiences, funders, industry partners, and prospective participants, and identified the emotional beats the film had to hit for each. We built a shot list that gave each audience something to hold onto without fragmenting the story.",
      },
      {
        title: "On-site filming across training centres",
        description:
          "Our crew embedded inside active training sessions across multiple Ontario training centres to capture the hands-on reality of the program, welding sparks, power tools, safety briefings, real instruction. No recreated scenes. What happens on the ground is what ended up on screen.",
      },
      {
        title: "Interview direction with participants, instructors, and employers",
        description:
          "We ran interviews designed to draw out specific, concrete moments rather than program talking points. Participants described exactly what they couldn't do before and can do now. Instructors described exactly what separated the workers they signed off on. Employers described exactly what they were seeing in the hires from the program.",
      },
      {
        title: "Edit built for three audiences at once",
        description:
          "In the edit, we structured the film so a funder, an industry partner, and a prospective participant could each watch it and immediately see themselves. The pacing gave every voice enough space to land, without letting any single thread dominate.",
      },
    ],
    theDeliverables: [
      {
        title: "Cinematic documentary film",
        description: "Hero piece anchoring the impact report, funding proposals, and partner meetings.",
      },
      {
        title: "Cohort recruitment cutdown",
        description: "A shorter version engineered for social and info-session use to drive cohort intake.",
      },
      {
        title: "Broadcast-quality interview library",
        description: "Isolated participant, instructor, and employer interview takes for future reuse.",
      },
      {
        title: "Color-graded master files",
        description: "Delivery in formats ready for web, social, and in-room presentation.",
      },
    ],
    theResult: {
      headline: "One film, three high-value uses.",
      body:
        "The film gave EmployNext a credible, reusable story asset they could bring into every funder conversation, partner pitch, and recruitment event. It now serves as the primary piece for recruiting new cohorts and for demonstrating program outcomes in funding proposals. The same asset doing three jobs is what makes a film like this compound in value over time, not a single campaign, but an engine.",
      outcomes: [
        { value: "3", label: "High-Value Uses from One Asset" },
        { value: "1", label: "Hero Film + Cutdowns" },
        { value: "Multi", label: "Training Centres Filmed" },
      ],
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80",
        caption: "Program participants on the training floor.",
        wide: true,
      },
      {
        src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80",
        caption: "Hands-on skills practice under supervisor guidance.",
      },
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80",
        caption: "Training centre, where classroom meets industry.",
      },
      {
        src: "https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=1400&q=80",
        caption: "Graduate portrait, the moment work becomes career.",
      },
      {
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80",
        caption: "Employer-partner site visit.",
        wide: true,
      },
    ],
    related: ["hair-for-self-esteem", "cafcan-opkt"],
  },

  /* ──────────────────── Hair for Self-Esteem ──────────────────── */
  {
    slug: "hair-for-self-esteem",
    title: "Hair for Self-Esteem",
    client: "Muamba Foundation × Bartley Skills Development × Aylesbury Public School",
    category: "Program Highlights",
    year: "2025",
    tagline:
      "A program born from a heartbreaking reality, told with the care it deserved.",
    heroVimeoId: "1135409664",
    overview:
      "In collaboration with the Muamba Foundation, the Bartley Skills Development Program, and Aylesbury Public School, this initiative was born from a heartbreaking reality: a young girl was contemplating self-harm because her family couldn't afford to have her hair done. Professional braiders volunteered their craft, educators created safe spaces, and students walked away with the confidence to raise their hands in class.",
    theAsk: {
      headline: "Capture a program small enough to feel personal and big enough to replicate.",
      body:
        "A young girl was contemplating self-harm because her family couldn't afford to get her hair done. The program that emerged around that moment was real and producing immediate impact inside classrooms. But impact that lives only in the memory of a handful of people in the room can't be shared with foundations, scaled to more schools, or replicated by other community organizations. The Muamba Foundation and its partners needed proof that a small, targeted investment in dignity produces measurable results in student wellbeing, proof that could open a conversation with any principal, board, or funder who might carry the model forward.",
    },
    theApproach: {
      headline: "Let real voices carry the story, because the story carries itself.",
      body:
        "This was not a film that needed stylized storytelling. The story was already powerful, what it needed was production values that honored the people in it. We produced a documentary piece that followed the arc from the founding story to the classroom outcomes, letting braiders, educators, parents, and students describe what they saw in their own words. The creative restraint was the point: no manufactured drama, no voiceover narration. Dignity as a production principle.",
    },
    theProcess: [
      {
        title: "Founding story interview",
        description:
          "We sat down with the program's originators to capture the moment that sparked the initiative, the story that everything else in the film would point back to. This anchor interview set the emotional ceiling for the entire piece.",
      },
      {
        title: "Event day coverage",
        description:
          "Our crew documented the hair session itself, professional braiders at work, Bartley Skills participants building trade hours, educators holding the space. We captured moments of transformation as they happened, without asking anyone to perform them.",
      },
      {
        title: "Classroom and family follow-up",
        description:
          "We filmed students in the weeks that followed to capture the downstream effect: raised hands, steadier participation, the visible shift in classroom presence. We also captured parent and educator reflections on what changed at home and in school.",
      },
      {
        title: "Sensitive-subject edit",
        description:
          "The edit was built with deliberate emotional pacing. We gave difficult moments the weight they deserved without tipping into exploitation. Every frame was chosen to protect the dignity of the young people at the heart of the story.",
      },
    ],
    theDeliverables: [
      {
        title: "Documentary hero film",
        description: "The primary piece used for partnership conversations and community engagement.",
      },
      {
        title: "Partner-facing cutdowns",
        description: "Shorter versions engineered for donor meetings, board presentations, and social.",
      },
      {
        title: "Still photography set",
        description: "Event-day stills for use in decks, reports, and program marketing.",
      },
      {
        title: "Archive of raw interview footage",
        description: "A library of full-length interviews preserved for future storytelling needs.",
      },
    ],
    theResult: {
      headline: "A community engagement and partnership development tool.",
      body:
        "The film opened conversations with schools, foundations, and municipal partners about replicating the model elsewhere. It stands as one of the strongest examples in our portfolio of how a story told with care can shift perception at an organizational level, not by overstating the work, but by making space for what was already true about it to be seen clearly. The video demonstrated measurable gains in student confidence and classroom participation and opened doors to future community health partnerships.",
      outcomes: [
        { value: "3", label: "Partnering Organizations" },
        { value: "1", label: "Documentary Hero Film" },
        { value: "Multi", label: "Replication Conversations Opened" },
      ],
    },
    partners: [
      { name: "Muamba Foundation", role: "Program partner and funder" },
      { name: "Bartley Skills Development Program", role: "Trade hours and braiders" },
      { name: "Aylesbury Public School", role: "Host school and classroom access" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1622296089780-290d1a81bde2?w=1400&q=80",
        caption: "The chair, where the conversation starts.",
        wide: true,
      },
      {
        src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1400&q=80",
        caption: "Care that goes beyond the cut.",
      },
      {
        src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1400&q=80",
        caption: "Community salon space, youth welcome.",
      },
      {
        src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1400&q=80",
        caption: "The after, self-image, reset.",
      },
      {
        src: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=1400&q=80",
        caption: "Mentorship in motion between Muamba and the barbers.",
        wide: true,
      },
    ],
    related: ["employnext-youth-trades", "black-creek-bhm"],
  },

  /* ─────────────────────── Black Creek BHM ─────────────────────── */
  {
    slug: "black-creek-bhm",
    title: "Black Creek: Black History Month Event Series",
    client: "Black Creek Community Health Centre",
    category: "Event Recaps",
    year: "2025",
    tagline:
      "Three events. One cohesive story about culturally affirming care.",
    heroVimeoId: "1174716851",
    overview:
      "Black Creek Community Health Centre's Black History Month programming was designed to strengthen social connection, reduce isolation, and create culturally affirming care pathways. Through barrier-free workshops, cultural food programming, and collaboration with Black-owned businesses and trusted partners, these events helped build trust and improve access to community health supports.",
    theAsk: {
      headline: "Make a care model visible to the people who fund it.",
      body:
        "Black Creek was running culturally significant programming that was producing real health outcomes in a community that has historically been under-served and over-studied. But those outcomes were invisible to funders and community partners who needed to see barrier-free access, Afrocentric design, and culturally affirming care in action, not just described in a report. The challenge: document three distinct events across the series in a way that honored each one individually while also rolling up into a single story about the care model as a whole.",
    },
    theApproach: {
      headline: "Let each event breathe. Let them add up.",
      body:
        "We treated each event as its own chapter with its own energy and emotional register: cultural food programming, community workshops, and partnership showcases. Then we designed the edit so all three chapters would accumulate into a clear statement about the model that produced them. We leaned heavily into community voices over institutional narration, the people receiving the care describing what it meant, directly. Spaces, food, movement, and laughter carried the rest.",
    },
    theProcess: [
      {
        title: "Multi-event production planning",
        description:
          "We scoped each of the three events individually for shot priorities, interview subjects, and coverage plans, then built a unified story architecture that allowed each event to stand on its own and also feed into the larger piece.",
      },
      {
        title: "Community-first interviews",
        description:
          "Interviews prioritized community members, partner representatives, and health leaders with lived connection to the community. We let people speak to what mattered to them rather than prompting for institutional language.",
      },
      {
        title: "Cinematic event coverage",
        description:
          "Multi-camera coverage of each event captured both the warmth of the gatherings and the specific programming elements, cooking workshops, health talks, cultural food distribution, that make the care model visible.",
      },
      {
        title: "Integrated edit with partner spotlights",
        description:
          "The final edit wove partner contributions into the story so that the Church of St. Stephen Downsview, Alliance for Healthier Communities, and Ella Charles Cuisine are visible as structural partners, not logos at the end.",
      },
    ],
    theDeliverables: [
      {
        title: "Cinematic recap film",
        description: "A single film telling the story of the full event series.",
      },
      {
        title: "Testimonial clip library",
        description: "Twelve individual testimonial clips from community members, partners, and program leads.",
      },
      {
        title: "Photo gallery",
        description: "100+ photos captured across the three events, organized for reuse.",
      },
      {
        title: "Impact Media Hub page",
        description: "A shareable landing page collecting the film, clips, photos, voices, and partner spotlights in one place.",
      },
    ],
    theResult: {
      headline: "A care model you can watch operating.",
      body:
        "The film became a tangible proof point for Black Creek's approach to culturally affirming community health. Funders could see the care model operating, not just read about it. The piece continues to support ongoing programming conversations with community partners and government stakeholders, and the accompanying Impact Media Hub gives the organization a living, shareable page that keeps earning value long after the events ended.",
      outcomes: [
        { value: "120+", label: "Community Members Reached" },
        { value: "3", label: "Events Captured" },
        { value: "4", label: "Community Partners" },
        { value: "12", label: "Testimonial Clips" },
        { value: "100+", label: "Photos Captured" },
        { value: "1", label: "Impact Media Hub" },
      ],
      quote: {
        text: "As humans, we are not supposed to be in isolation. Being together promotes a better sense of wellness. Creating culturally safe spaces and representation helps people feel safe to step forward and seek care.",
        name: "Dr. Akeem Stewart",
        role: "Alliance for Healthier Communities",
      },
    },
    partners: [
      { name: "Black Creek Community Health Centre", role: "Lead organization" },
      { name: "Church of St. Stephen Downsview", role: "Venue and community coordination" },
      { name: "Alliance for Healthier Communities", role: "Health leadership and speaker" },
      { name: "Ella Charles Cuisine", role: "Cultural food programming" },
    ],
    hubLink: "/hub/black-creek-bhm",
    videoTestimonials: [
      { title: "Dr. Akeem Stewart on Community Events", vimeoId: "1174190910" },
      { title: "Emma, Community Ambassador", vimeoId: "1174191016" },
      { title: "Victoria: Participant Testimonial", vimeoId: "1174191105" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1400&q=80",
        caption: "Community gathering, Black Creek neighbours, together.",
        wide: true,
      },
      {
        src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1400&q=80",
        caption: "Intergenerational moments on the community floor.",
      },
      {
        src: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1400&q=80",
        caption: "Families on the event floor.",
      },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80",
        caption: "Performance spotlight, a cultural showcase moment.",
      },
      {
        src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1400&q=80",
        caption: "Dr. Akeem Stewart addressing the community.",
        wide: true,
      },
    ],
    related: ["cafcan-opkt", "hair-for-self-esteem"],
  },

  /* ─────────────────────── CafCan OPKT ─────────────────────────── */
  {
    slug: "cafcan-opkt",
    title: "CafCan: Our People's Keeper, Too",
    client: "CAFCAN Social Services",
    category: "Program Highlights",
    year: "2025–2026",
    tagline:
      "Seven cohort sessions. One story library that replaced generic reporting with real evidence.",
    heroVimeoId: "1143331891",
    overview:
      "After securing improved funding in 2024, CafCan needed to visually demonstrate the real-world impact of their Our People's Keeper employment program for newcomers. We produced a launch recap featuring candid testimonials from counselors and program participants, followed by a series of ten cohort session videos capturing each stage of the journey.",
    theAsk: {
      headline: "Turn a newcomer program into a reusable library of proof.",
      body:
        "CAFCAN had secured improved government funding in 2024 for their Our People's Keeper, Too (OPKT) program, a culturally responsive initiative designed to bridge the gap between arrival and long-term stability for African asylum seekers. But funders required clear evidence of outcomes to justify renewal, and text-based reports weren't capturing the human transformation happening inside the program. CAFCAN also needed story assets that could build a pipeline of future participants and demonstrate the program's value to potential community partners, which meant a single recap video wouldn't do the job.",
    },
    theApproach: {
      headline: "Build a library, not a deliverable.",
      body:
        "We proposed a two-part production strategy: a launch recap anchored by candid testimonials from counselors and participants, and a series of ten cohort session videos documenting each phase of the employment journey, with enough coverage across multiple partner sites (Homes First, Christie Refugee Welcome Centre, CAFCAN's own location) that the final output could serve impact reporting, renewal submissions, cohort recruitment, and community outreach simultaneously. The intent from day one was a reusable story library, not a single video.",
    },
    theProcess: [
      {
        title: "Partner-site scoping",
        description:
          "We scoped filming across multiple delivery sites, CAFCAN Social Services, Homes First Shelter, Christie Refugee Welcome Centre, each with its own coordination process, cultural protocols, and participant privacy considerations.",
      },
      {
        title: "Culturally grounded interview direction",
        description:
          "Interview direction was built around Africentric values, the Ma'at principles, and Nguzo Saba, the same frameworks the program itself is built on. Participants were invited to share on their own terms, in their own words, with every comfort level honored.",
      },
      {
        title: "Cohort-by-cohort production",
        description:
          "We filmed each cohort session, Employment Readiness, Career Development, Health & Wellness, Civic Engagement, Skilled Trades, and Entrepreneurship, capturing the specific content of each while also building a consistent visual language across the series.",
      },
      {
        title: "Modular edit architecture",
        description:
          "The edit was built so every piece could stand alone as a single-purpose video or stack together into longer-form content for renewal submissions and funder showcases.",
      },
    ],
    theDeliverables: [
      {
        title: "Hero recap film",
        description: "Full OPKT story anchored by counselor and participant testimonials.",
      },
      {
        title: "Cohort session videos",
        description: "Individual videos for each of the cohort sessions across partner sites.",
      },
      {
        title: "Testimonial clip library",
        description: "20+ short-form testimonial clips ready for social and stakeholder use.",
      },
      {
        title: "Photo archive",
        description: "150+ photos captured across every cohort and partner site, organized by session.",
      },
      {
        title: "Impact Media Hub page",
        description: "A unified destination for the entire OPKT story library.",
      },
    ],
    theResult: {
      headline: "A story library, not a single video.",
      body:
        "CAFCAN had a complete library of story assets to support their impact report, funding renewal submissions, and community outreach. The cohort session videos gave future participants a transparent look at what the program involves, reducing drop-off between inquiry and enrollment. The Impact Media Hub page gave CAFCAN a single living destination they could share with funders, partners, and prospective participants, turning a one-time production engagement into a compounding communication asset.",
      outcomes: [
        { value: "7", label: "Cohort Sessions Delivered" },
        { value: "6", label: "Partner Locations" },
        { value: "20+", label: "Testimonial Clips" },
        { value: "150+", label: "Photos Captured" },
        { value: "1", label: "Job Fair Hosted" },
        { value: "1", label: "Impact Media Hub" },
      ],
      quote: {
        text: "OPKT is more than a program. It is a family that helps you stand on your own feet.",
        name: "OPKT Cohort Member",
        role: "Program Participant",
      },
    },
    partners: [
      { name: "CAFCAN Social Services", role: "Lead organization" },
      { name: "Homes First Shelter", role: "Delivery partner" },
      { name: "Christie Refugee Welcome Centre", role: "Delivery partner" },
      { name: "Up With Women", role: "Program partner" },
      { name: "CIBC", role: "Funding partner" },
      { name: "Impakt Foundation for Social Change", role: "Program partner" },
      { name: "City of Toronto", role: "Municipal partner" },
    ],
    hubLink: "/hub/story-cafcan",
    videoTestimonials: [
      { title: "Session 1 Testimonial", vimeoId: "1183558854" },
      { title: "Session 3 Testimonial", vimeoId: "1183604690" },
      { title: "Session 5 Testimonial", vimeoId: "1183559582" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80",
        caption: "Refugee cohort participants in session together.",
        wide: true,
      },
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80",
        caption: "Group discussion, story work in practice.",
      },
      {
        src: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=1400&q=80",
        caption: "CafCan staff guiding a cohort session.",
      },
      {
        src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1400&q=80",
        caption: "Newcomer families connecting across cultures.",
      },
      {
        src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&q=80",
        caption: "Program graduation, a quiet milestone.",
        wide: true,
      },
    ],
    related: ["black-creek-bhm", "employnext-youth-trades"],
  },

  /* ────────────────── Lakeridge Health, I Belong ──────────────── */
  {
    slug: "lakeridge-i-belong",
    title: "Lakeridge Health: I Belong Initiative",
    client: "Lakeridge Health",
    category: "Initiatives",
    year: "2023",
    tagline:
      "A documentary-style launch film for a multi-year IDEAA action plan serving 8,700 staff across Durham Region.",
    heroVimeoId: "1140641190",
    previewStart: 30,
    overview:
      "In the summer of 2023, Lakeridge Health unveiled I Belong, its multi-year Inclusion, Diversity, Equity, Accessibility, and Anti-Racism (IDEAA) Action Plan. Serving the diverse communities of Durham Region with more than 8,700 staff, physicians, and volunteers, the initiative was designed so every patient, staff member, and family could honestly say: 'I belong at Lakeridge Health.' We produced the film built to anchor the public launch and internal culture-building effort around it.",
    theAsk: {
      headline: "Earn buy-in from staff who've seen initiatives come and go.",
      body:
        "Lakeridge Health was launching a major, system-wide inclusion plan, the IDEAA Multi-Year Action Plan, across hospital sites from Ajax to Bowmanville. But they faced a trust challenge: hospital staff had seen similar initiatives come and go, and another corporate-feeling launch video risked undermining the work before it started. At the same time, external stakeholders in Durham Region and public accountability bodies needed to see clear alignment between the film and the IDEAA commitments the plan put on the record. The film had to feel genuine internally and stand up to scrutiny externally, at the same time, without compromise on either side.",
    },
    theApproach: {
      headline: "Real staff, no script, no spokesperson.",
      body:
        "We built the film entirely on real staff voices across departments and care levels, nurses, physicians, volunteers, administrators, and patient-facing roles, with no scripts and no spokesperson narration. The structure followed the core values of the initiative and showed how each one translated into lived experience for staff, patients, and families. The edit was designed to serve two audiences simultaneously: internal culture building for the 8,700 people inside the organization, and external accountability for the IDEAA commitments Lakeridge had made publicly.",
    },
    theProcess: [
      {
        title: "Cross-department recruitment",
        description:
          "Working with Lakeridge's IDEAA leadership, we identified staff from multiple departments, career stages, and hospital sites, not the usual spokespeople. The goal was a cross-section of the organization that looked like the communities Durham Region actually serves.",
      },
      {
        title: "Unscripted interview direction",
        description:
          "We ran interviews without scripts, question prompts, or rehearsal. Staff spoke about inclusion, compassion, innovation, teamwork, and joy in their own words, including the hard parts. The resulting answers carry a credibility no prepared statement could.",
      },
      {
        title: "Multi-site cinematic coverage",
        description:
          "Our crew captured footage across multiple Lakeridge Health sites to reflect the system-wide scope of the initiative. Visual pacing was built to match the reflective tone of the interviews, warm, deliberate, and honest.",
      },
      {
        title: "Dual-audience edit",
        description:
          "The edit was structured to play equally well in a staff town hall and in a public-facing IDEAA report. We cut a hero film plus shorter versions designed specifically for internal culture-building moments (onboarding, team meetings, staff forums).",
      },
    ],
    theDeliverables: [
      {
        title: "Documentary hero film",
        description: "The primary launch asset for the I Belong initiative, anchoring public communications.",
      },
      {
        title: "Internal culture-building cutdowns",
        description: "Shorter versions engineered for onboarding, staff forums, and team meetings.",
      },
      {
        title: "Raw staff interview archive",
        description: "A preserved library of staff interview footage for future IDEAA reporting.",
      },
      {
        title: "Stills for IDEAA communications",
        description: "Photo assets aligned with the film for use in the action plan and ongoing updates.",
      },
    ],
    theResult: {
      headline: "A launch film that earned internal trust and stood up to external scrutiny.",
      body:
        "The film drove measurable inclusion outcomes internally and became a public-facing anchor for Lakeridge's IDEAA commitments. It positioned I Belong as an ongoing organizational shift rather than a one-time campaign. The piece was used in staff onboarding, partner communications, and community engagement contexts across the Durham Region footprint, and it continues to serve as reference material for the action plan years after the launch.",
      outcomes: [
        { value: "8,700", label: "Staff, Physicians, and Volunteers Served" },
        { value: "Multi-Year", label: "IDEAA Action Plan Anchored" },
        { value: "Durham", label: "Region-Wide Reach" },
      ],
    },
    partners: [
      { name: "Lakeridge Health", role: "Lead organization" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80",
        caption: "Lakeridge Health staff on the front line.",
        wide: true,
      },
      {
        src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80",
        caption: "Hallway interview, an I Belong voice.",
      },
      {
        src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1400&q=80",
        caption: "Team huddle, inclusion lived day to day.",
      },
      {
        src: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1400&q=80",
        caption: "Care in practice across Durham Region.",
      },
      {
        src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1400&q=80",
        caption: "Leadership portrait, the story of I Belong from the top.",
        wide: true,
      },
    ],
    related: ["cafcan-opkt", "black-creek-bhm"],
  },
];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);

export const getCaseStudySlugs = (): string[] => caseStudies.map((c) => c.slug);

export const getRelatedCaseStudies = (slug: string): CaseStudy[] => {
  const current = getCaseStudy(slug);
  if (!current?.related) return [];
  return current.related
    .map((s) => getCaseStudy(s))
    .filter((c): c is CaseStudy => Boolean(c));
};
