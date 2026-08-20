import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { setSEO, resetSEO } from "@/lib/seo";
import {
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  Award,
  Video,
  Radio,
  Image as ImageIcon,
  Mail,
  Download,
  Play,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import ClientLogosSection from "@/components/home/ClientLogosSection";
import btsInterviewSetup from "@/assets/tropicana/bts-interview-setup.jpg";
import fullProductionGear from "@/assets/tropicana/full-production-gear.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const timeline = [
  {
    phase: "Day 1",
    dates: "Sept 5, 2026",
    title: "Opening Reception, Metro Hall, Toronto",
    items: [
      "Full crew on site (photographer + videographer)",
      "Delegation welcome and opening remarks captured",
      "Delegate arrival portraits",
      "Same-day selects: 15-20 finished images within 24 hours",
    ],
  },
  {
    phase: "Days 2-3",
    dates: "Sept 8-9, 2026",
    title: "Business Track Sessions, York Civic Centre, Toronto",
    items: [
      "Panel and roundtable coverage across both days",
      "Delegate breakout captures and B-roll of sessions in motion",
      "Live Social Desk running (Packages 2 & 3): Stories, Reels, daily carousels published same day",
      "Continued same-day photo selects delivered nightly",
    ],
  },
  {
    phase: "Travel",
    dates: "Sept 9 evening",
    title: "Toronto to Ottawa Move",
    items: [
      "Crew drives with full lighting and backup camera gear",
      "Social Editor works remotely from Toronto so no downtime in social deliverables",
      "Ottawa venue walkthrough day-before setup",
    ],
  },
  {
    phase: "Days 4-5",
    dates: "Sept 10-11, 2026",
    title: "Ottawa Programme, Bayview Yards",
    items: [
      "Government and institutional meetings covered",
      "Delegate interviews (Package 3) captured seated, lit, individually mic'd",
      "Keynote and reception coverage",
      "Final Mission Film footage secured",
    ],
  },
  {
    phase: "Post",
    dates: "Sept 12 onward",
    title: "Delivery Rolling",
    items: [
      "Full photo gallery (500-750 images): 7 business days",
      "Event recap films and vertical cutdowns: 10 business days",
      "Full session recordings archived: 5 business days",
      "The Mission Film, 3-4 minutes (Package 3): 3 weeks from final interview",
    ],
  },
];

const packageOne = [
  "2-3 person crew, photographer and videographer, across all five days",
  "500-750 edited images, colour-corrected, web and print",
  "One 1-2 minute recap film for each of the three events (Metro Hall, York Civic Centre, Bayview Yards)",
  "10 vertical social cutdowns",
  "Full session recordings, archived and organised",
  "Same-day selects: 15-20 finished images within 24 hours of each day",
  "Delivery: gallery in 7 business days, recap films and cutdowns in 10",
];

const packageTwo = [
  "Everything in Package One, plus:",
  "Live Social Desk, all five days: an editor on site cutting while the mission runs",
  "35-50 vertical Stories per day for Instagram and LinkedIn",
  "5-10 Reels per day, edited to trending audio or licensed music",
  "A daily carousel with suggested copy, sized for every channel you post to",
  "Delivery: live content during the mission, everything else as Package One",
];

const packageThree = [
  "Everything in Packages One and Two, plus:",
  "Six seated leadership interviews, lit, individually mic'd and fully transcribed",
  "The Mission Film, 3-4 minutes: why this mission mattered, in the words of the people who made it",
  "Licensed music and burned-in captions",
  "One round of revisions included",
  "Delivery: film 3 weeks from the final interview, everything else as Packages One and Two",
];

type PortfolioItem = {
  title: string;
  category: string;
  desc: string;
  vimeoId: string;
  slug?: string;
};

const portfolio: PortfolioItem[] = [
  {
    title: "EmployNext - Youth Trades Program",
    category: "Workforce Development",
    desc: "Program highlight film built around three youth participants. Used in funder reporting and community recruitment. Closest analogue to institutional storytelling with delegate voices.",
    vimeoId: "1174716942",
    slug: "employnext-youth-trades",
  },
  {
    title: "CAFCAN - Our People's Keeper",
    category: "Caribbean African Canadian Social Services",
    desc: "Multi-program documentary anchoring CAFCAN's community justice work. Cited by their leadership as a turning point in donor and funder conversations.",
    vimeoId: "1143331891",
    slug: "cafcan-opkt",
  },
  {
    title: "Lakeridge Health - I Belong",
    category: "Healthcare Institution",
    desc: "Cinematic film built around Lakeridge Health's I Belong IDEAA Action Plan. Made to hold up in front of board, government, and patient-family audiences simultaneously.",
    vimeoId: "1140641190",
    slug: "lakeridge-i-belong",
  },
  {
    title: "Jean Augustine Centre - When a Girl Is Empowered",
    category: "Young Women's Empowerment",
    desc: "Documentary portrait of a Black-serving young women's empowerment centre in Toronto. Built around real voices from mentors and program participants. Closest cultural analogue to the diaspora leadership and youth empowerment threads a trade mission carries.",
    vimeoId: "1219684603",
  },
];

const creativeApproach = [
  {
    label: "The Central Idea",
    title: "Trust Is Built in the Room, Not in the Press Release.",
    body: "Trade missions succeed or fail on the human trust built between delegates and hosts. The photography and film have to earn the room's permission to be present, quiet, respectful, ready, so we capture the moments that actually matter instead of the ones staged for us.",
  },
  {
    label: "The Throughline",
    title: "Five Voices, One Corridor: What Does Kenya-Canada Look Like When It Works?",
    body: "We anchor the Mission Film on five real people from across the delegation: a Kenyan delegate leading a business track, a Canadian counterpart, a CBCC leadership voice, a young diaspora entrepreneur, and one host from Nexus Global Strategies. Final voices confirmed at kickoff. The film is a corridor between two economies, not a slideshow of a conference.",
  },
  {
    label: "Built Around Your Vision",
    title: "We Build to Your Outline, Not Our Template.",
    body: "You know your mission agenda, your VIP moments, and your must-haves better than we ever will. Send us your run-of-show and we build the coverage plan around it. Our job in pre-production is to pressure-test every beat so the story your team already imagined lands in the room and on the feed.",
  },
  {
    label: "Why This Earns New Partners",
    title: "Treat the Delegate As a Guest. Not a Backdrop.",
    body: "Trade mission films that try too hard to convert produce polite LinkedIn reshares. Films that make delegates and partners feel seen and trusted produce the meetings that turn into signed deals. That is the version we make.",
  },
];

const socialDeskCards = [
  {
    icon: Video,
    label: "Stories",
    desc: "35-50 vertical clips per day, 9:16, ready for Instagram and LinkedIn Stories.",
  },
  {
    icon: Play,
    label: "Reels",
    desc: "5-10 Reels per day, edited to trending audio or licensed music.",
  },
  {
    icon: Layers,
    label: "Daily Carousel",
    desc: "3-5 image carousel with suggested copy, sized per platform.",
  },
  {
    icon: ImageIcon,
    label: "Same-Day Selects",
    desc: "15-20 finished photos within 24 hours of each shoot day.",
  },
];

const references = [
  {
    org: "Black Creek Community Health Centre",
    person: "Cheryl Prescod",
    title: "Executive Director",
    note: "Reference for community-centered storytelling, multi-stakeholder coordination, and event-anchored video work. The closest format match to a five-day mission.",
  },
  {
    org: "CAFCAN Social Services (Caribbean African Canadian)",
    person: "Floydeen Charles-Fridal",
    title: "Executive Director",
    note: "Reference for cultural fit, community-rooted production approach, and the experience of working with a Black-serving multi-program nonprofit across multiple venues and cohorts.",
  },
];

const travelLines = [
  { item: "Vehicle, Toronto to Ottawa, 900 km @ $0.73/km", amount: "$657" },
  { item: "Hotel, 1 room x 2 nights", amount: "$460" },
  { item: "Meals, 2 crew x 3 days", amount: "$510" },
  { item: "Parking, three venues", amount: "$180" },
  { item: "Total", amount: "$1,807", bold: true },
];

const turnaround = [
  { item: "Same-day selects, 15-20 finished images", when: "Within 24 hours" },
  { item: "Live Social Desk content (Packages 2 & 3)", when: "Same day" },
  { item: "Full session recordings, archived", when: "5 business days" },
  { item: "Full photo gallery, 500-750 images", when: "7 business days" },
  { item: "Event recap films and social cutdowns", when: "10 business days" },
  { item: "The Mission Film, 3-4 minutes (Package 3)", when: "3 weeks" },
];

const ProposalCbccKenyaCanada = () => {
  useEffect(() => {
    setSEO({
      title: "Kenya-Canada Trade Mission Proposal - Impact Loop for CBCC",
      description: "Photo and video proposal for the Kenya-Canada Trade and Investment Mission, September 5-11, 2026. Toronto and Ottawa. Prepared by Impact Loop for the Canadian Black Chamber of Commerce.",
      ogType: "website",
    });
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex,nofollow");
    return () => {
      resetSEO();
      const meta = document.querySelector('meta[name="robots"]');
      if (meta) meta.remove();
    };
  }, []);

  return (
    <Layout>
      {/* Confidential banner */}
      <div className="bg-impact-blue/10 border-b border-impact-blue/20">
        <div className="container mx-auto px-6 py-3">
          <p className="text-impact-blue text-xs uppercase tracking-[0.25em] text-center">
            Confidential Proposal &middot; Prepared for Canadian Black Chamber of Commerce &middot; September 2026
          </p>
        </div>
      </div>

      {/* Section 1: Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-impact-dark">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-impact-blue/10 via-impact-dark to-impact-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.04),transparent_60%)]" />
        </div>
        <div className="container mx-auto px-6 relative z-10 pt-16 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
              CBCC Kenya-Canada Mission &middot; Photo + Video &middot; Quotation IL-2026-000
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Kenya-Canada Trade Mission <span className="text-gradient">Proposal</span>
            </h1>
            <p className="text-white/80 text-xl leading-relaxed mb-10">
              Five days of cinematic photography and video capturing the Kenya-Canada Trade &amp; Investment Mission across Toronto and Ottawa, September 5, 8-9, and 10-11, 2026. Prepared for Sheares Benjamin, Canadian Black Chamber of Commerce, on behalf of the Kenya National Chamber of Commerce &amp; Industry, Nexus Global Strategies, and the CBCC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <a
                href="/proposals/impact-loop-cbcc-kenya-canada.pdf"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download as PDF
              </a>
            </div>
            <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.25em]">
              Submitted by Impact Loop &middot; Toronto-based &middot; Founder-led production
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Portfolio banner (unclickable previews) */}
      <section className="py-12 bg-impact-dark border-t border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-center text-white/50 text-xs uppercase tracking-[0.25em] mb-8">
            Recent work in the same emotional register as Kenya-Canada
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {portfolio.map((p) => (
              <div key={p.vimeoId} className="relative aspect-video bg-black/40 overflow-hidden rounded-sm pointer-events-none">
                <iframe
                  src={`https://player.vimeo.com/video/${p.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
                  className="absolute inset-0 w-full h-full pointer-events-none scale-110"
                  allow="autoplay"
                  title={`${p.title} preview`}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-[10px] uppercase tracking-[0.25em] mt-5 italic">
            Full case studies linked below
          </p>
        </div>
      </section>

      {/* Section 3: Why Impact Loop */}
      <section className="py-24 section-blue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Sparkles className="w-10 h-10 text-impact-blue mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Why Impact Loop for Kenya-Canada</h2>
              <div className="space-y-6 text-white/85 text-lg leading-relaxed text-left max-w-3xl mx-auto">
                <p>Most production companies will treat a five-day trade mission like a shoot list. Capture the room, edit the recap, deliver. We don't, and that's the difference.</p>
                <p>Impact Loop builds storytelling systems for institutions whose work has to earn trust before it can earn deals. Chambers of commerce. Trade delegations. Diaspora economic development. Black-led and Black-serving organizations. The exact territory this mission operates in.</p>
                <p>We bring three things to Kenya-Canada that matter more than gear: a director who understands why the delegation itself is the story, not just the signed MOUs; a community first interview practice that makes Kenyan and Canadian delegates feel safe enough to give you the moments that actually earn partners; and a same-day content mindset that means the mission is on socials while it is still happening, not two weeks after everyone flew home.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Creative Approach */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">01 &middot; Creative Approach</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">How We Turn Five Days Into a Story That Earns Partners</h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                The brief is clear: cover the mission comprehensively, deliver in real time, and produce a legacy film that outlasts the week. Here is the creative thinking that drives every decision.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creativeApproach.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-8 bg-impact-cream rounded-sm border-l-4 border-primary"
                >
                  <p className="text-primary text-xs uppercase tracking-widest mb-3 font-medium">{item.label}</p>
                  <h3 className="font-serif text-xl font-semibold text-impact-dark mb-3 leading-snug">{item.title}</h3>
                  <p className="text-impact-dark/70 leading-relaxed text-[15px]">{item.body}</p>
                </motion.div>
              ))}
            </div>
            {/* A Note From the Director */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="aspect-[4/5] rounded-sm overflow-hidden relative">
                    <img src={btsInterviewSetup} alt="Documentary-style interview setup with boom mic and pro lighting" className="w-full h-full object-cover" />
                    <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-primary/10 rounded-sm -z-10" />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <p className="text-primary text-xs uppercase tracking-widest mb-3 font-medium">A Note From the Director</p>
                  <p className="text-impact-dark/80 text-lg italic leading-relaxed mb-4">
                    &ldquo;Trade missions are one of the last real venues where economic diplomacy is done face to face. Our job as filmmakers is to stay out of the way when it matters and be ready when the moment needs a witness. We don&rsquo;t set out to make a marketing film. We set out to make an honest record of five days that mattered, and trust that the partnerships follow.&rdquo;
                  </p>
                  <p className="text-impact-dark/60 text-sm uppercase tracking-widest font-medium">Rovonn Russell</p>
                  <p className="text-impact-dark/50 text-xs italic">Creative Director &amp; Director</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Live Social Desk */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <Radio className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">02 &middot; Live Social Desk</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">The Mission on the Feed, While It Is Still Happening.</h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                For Packages Two and Three, a Social Editor is on site all five days, cutting vertical Stories, Reels, and daily carousels between sessions. Content goes live the same day, not the next week.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {socialDeskCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-6 bg-impact-cream rounded-sm text-center border border-impact-dark/5"
                >
                  <card.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-serif text-base font-semibold text-impact-dark mb-2">{card.label}</h3>
                  <p className="text-impact-dark/70 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Production Plan */}
      <section
        className="py-24 bg-impact-dark text-white relative"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 11, 22, 0.92), rgba(11, 11, 22, 0.95)), url(${fullProductionGear})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">03 &middot; Mission Coverage Plan</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Five Days, Two Cities, One Continuous Story</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                Built around your mission agenda: three venues across Toronto and Ottawa, September 5 through 11.
              </p>
            </motion.div>
            <div className="space-y-4">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.phase + t.dates}
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row gap-6 p-6 border border-white/15 rounded-sm hover:border-impact-blue/50 transition-colors bg-impact-dark/60 backdrop-blur-sm"
                >
                  <div className="md:w-48 flex-shrink-0">
                    <p className="text-impact-blue text-sm uppercase tracking-widest font-medium">{t.phase}</p>
                    <p className="text-white/50 text-sm">{t.dates}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold text-white mb-3">{t.title}</h3>
                    <ul className="space-y-1.5">
                      {t.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-white/75 text-sm">
                          <span className="text-impact-blue mt-1">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Investment */}
      <section className="py-24 section-blue">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-white/70 font-medium text-sm uppercase tracking-widest mb-4">04 &middot; Investment</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Three Packages, Same Photography &amp; Video Standard</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                Every package includes photography and video across all five mission days. Package Two adds live social. Package Three adds the Mission Film and delegate interviews.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Package 1 */}
              <motion.div custom={0} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/20 rounded-sm p-8 backdrop-blur-sm flex flex-col">
                <div className="mb-6">
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Package One</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">Mission Coverage</h3>
                  <p className="text-white/70 text-sm italic">Lean crew, full five days, photo and video</p>
                </div>
                <div className="border-t border-b border-white/10 py-6 mb-6">
                  <p className="text-4xl md:text-5xl font-serif font-bold mb-1">$17,700</p>
                  <p className="text-white/60 text-sm">+ $1,807 travel &middot; CAD &middot; taxes additional</p>
                </div>
                <ul className="space-y-3 flex-1">
                  {packageOne.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-impact-blue flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              {/* Package 2 */}
              <motion.div custom={1} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/20 rounded-sm p-8 backdrop-blur-sm flex flex-col">
                <div className="mb-6">
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Package Two</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">Coverage + Live Content</h3>
                  <p className="text-white/70 text-sm italic">Adds Live Social Desk across all five days</p>
                </div>
                <div className="border-t border-b border-white/10 py-6 mb-6">
                  <p className="text-4xl md:text-5xl font-serif font-bold mb-1">$24,200</p>
                  <p className="text-white/60 text-sm">+ $1,807 travel &middot; CAD &middot; taxes additional</p>
                </div>
                <ul className="space-y-3 flex-1">
                  {packageTwo.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-impact-blue flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              {/* Package 3 - Recommended */}
              <motion.div custom={2} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white text-impact-dark rounded-sm p-8 relative shadow-2xl border-2 border-impact-purple flex flex-col">
                <div className="absolute -top-3 right-8 bg-impact-purple text-white text-xs uppercase tracking-widest px-3 py-1 rounded-sm">Recommended</div>
                <div className="mb-6">
                  <p className="text-impact-dark/60 text-xs uppercase tracking-widest mb-2">Package Three</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">Full Mission Story</h3>
                  <p className="text-impact-dark/70 text-sm italic">Adds interviews and a 3-4 minute Mission Film</p>
                </div>
                <div className="border-t border-b border-impact-dark/10 py-6 mb-6">
                  <p className="text-4xl md:text-5xl font-serif font-bold mb-1 text-impact-purple">$27,000</p>
                  <p className="text-impact-dark/60 text-sm">+ $1,807 travel &middot; CAD &middot; taxes additional</p>
                </div>
                <ul className="space-y-3 flex-1">
                  {packageThree.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-impact-purple flex-shrink-0 mt-0.5" />
                      <span className="text-impact-dark/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* What the extra buys you */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-14 max-w-4xl mx-auto bg-white/5 border border-impact-purple/30 border-l-4 border-l-impact-purple rounded-sm p-8">
              <p className="text-impact-purple text-[11px] uppercase tracking-[0.25em] font-semibold mb-4">What the Extra Buys You</p>
              <p className="text-white/85 text-base leading-relaxed mb-5">
                Every package delivers the same photography and video standard across all five days. The differences are where the mission gets amplified.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-impact-purple flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-[13px]">Package Two vs One &middot; +$6,500</p>
                    <p className="text-white/60 text-[12px] leading-snug">Five days of on-site social editing, 175-250 Stories, 25-50 Reels, and daily branded carousels. Standalone social editor rates run $1,200-$1,800/day in Toronto.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-impact-purple flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-[13px]">Package Three vs Two &middot; +$2,800</p>
                    <p className="text-white/60 text-[12px] leading-snug">Six seated executive interviews with full transcripts, plus a 3-4 min Mission Film with licensed score and captions. Standalone film production of that spec runs $4,500-$8,000.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-impact-purple flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-[13px]">Travel &middot; $1,807 flat, at cost</p>
                    <p className="text-white/60 text-[12px] leading-snug">Vehicle to Ottawa, hotel, meals, parking. Reconciled against receipts. Same across all three packages because our social editor works remotely from Toronto for the Ottawa dates.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-impact-purple flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-[13px]">Payment Terms</p>
                    <p className="text-white/60 text-[12px] leading-snug">40% on signed agreement, 40% at first day of shooting, 20% on final delivery. Prices held for 30 days from proposal date.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 8: Add-Ons */}
      <section className="py-24 section-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">05 &middot; Add-Ons</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">Two Ways to Extend Package One or Two</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div custom={0} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-8 rounded-sm border-l-4 border-amber-500">
                <p className="text-amber-600 text-xs uppercase tracking-widest font-semibold mb-3">Add-On &middot; +$2,800</p>
                <h3 className="font-serif text-xl font-semibold text-impact-dark mb-3">The Mission Film + Leadership Interviews</h3>
                <p className="text-impact-dark/70 leading-relaxed">
                  Six seated interviews with mission leadership and delegates, captured on site and fully transcribed, cut into a 3-4 minute film. Automatically included in Package Three.
                </p>
              </motion.div>
              <motion.div custom={1} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-8 rounded-sm border-l-4 border-amber-500">
                <p className="text-amber-600 text-xs uppercase tracking-widest font-semibold mb-3">Add-On &middot; On Request</p>
                <h3 className="font-serif text-xl font-semibold text-impact-dark mb-3">Subtitling &amp; Translation</h3>
                <p className="text-impact-dark/70 leading-relaxed">
                  For delegates who would rather speak in Swahili or another language. We caption and subtitle in-language and English for the Mission Film and any social cutdowns that need it.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Travel Line Items */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">06 &middot; Ottawa Travel, At Cost</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">Travel Line Items</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-impact-dark/10 rounded-sm overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {travelLines.map((line, idx) => (
                      <tr key={line.item} className={`${line.bold ? "bg-impact-cream font-semibold text-impact-dark" : "text-impact-dark/80"} ${idx !== travelLines.length - 1 ? "border-b border-impact-dark/10" : ""}`}>
                        <td className="px-4 py-3">{line.item}</td>
                        <td className="px-4 py-3 text-right">{line.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-impact-cream p-6 rounded-sm">
                <p className="text-impact-dark/70 text-sm leading-relaxed italic">
                  Billed at cost with no markup, and reconciled against receipts after the mission. Driving rather than flying lets us bring full lighting and backup equipment. Our Social Editor works remotely from Toronto for the Ottawa dates, so travel does not increase across packages.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Turnaround */}
      <section className="py-24 section-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">07 &middot; Turnaround</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">What You Get, When You Get It</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white border border-impact-dark/10 rounded-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-impact-dark text-white">
                    <th className="px-4 py-3 text-left uppercase text-xs tracking-widest font-semibold">Deliverable</th>
                    <th className="px-4 py-3 text-right uppercase text-xs tracking-widest font-semibold">Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {turnaround.map((t, idx) => (
                    <tr key={t.item} className={`text-impact-dark/80 ${idx !== turnaround.length - 1 ? "border-b border-impact-dark/10" : ""}`}>
                      <td className="px-4 py-3">{t.item}</td>
                      <td className="px-4 py-3 text-right font-medium">{t.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
            <p className="text-impact-dark/60 text-sm italic mt-6 max-w-3xl mx-auto text-center">
              All timings run from the final shoot date. The Mission Film runs three weeks from the final interview rather than the final shoot day. If leadership prefer to sit down after the mission rather than during it, their availability sets that date, and we would rather wait for the right voices than deliver on time without them.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11: Example of Our Work */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">08 &middot; Example of Our Work</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">Closest Reference Work</h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Each of these projects shares meaningful DNA with the Kenya-Canada mission: multi-stakeholder, community-rooted, Black-led or Black-serving, built to hold up in front of institutional audiences. Click any tile to read the full case study.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.map((p, i) => (
                <motion.div key={p.title} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Link to={p.slug ? `/work/${p.slug}` : "/work"} className="group block">
                    <div className="relative aspect-video bg-black rounded-sm overflow-hidden mb-4">
                      <iframe
                        src={`https://player.vimeo.com/video/${p.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
                        className="absolute inset-0 w-full h-full pointer-events-none scale-110"
                        allow="autoplay"
                        title={`${p.title} preview`}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <ArrowRight className="w-12 h-12 text-white/0 group-hover:text-white transition-all" />
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/90 text-impact-dark text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm font-medium">
                        {p.slug ? "View case study →" : "View on Work →"}
                      </div>
                    </div>
                    <p className="text-primary text-xs uppercase tracking-widest mb-2 font-medium">{p.category}</p>
                    <h3 className="font-serif text-xl font-semibold text-impact-dark mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-impact-dark/70 text-sm leading-relaxed">{p.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
              <Link to="/work" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium">
                View the full Impact Loop portfolio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 12: Trusted By (imported from homepage) */}
      <ClientLogosSection />

      {/* Section 13: References */}
      <section className="py-24 section-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">09 &middot; References</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">Two Past Clients Available for Reference Calls</h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Direct contact information shared upon request to protect their inboxes. We are happy to schedule a 15-minute call with either reference before contract sign.
              </p>
            </motion.div>
            <div className="space-y-6">
              {references.map((r, i) => (
                <motion.div
                  key={r.org}
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row gap-6 p-8 border border-impact-dark/10 border-l-4 border-l-primary rounded-sm bg-white"
                >
                  <Award className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-primary text-[11px] uppercase tracking-[0.25em] font-semibold mb-2">Past Client Reference</p>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-1 leading-tight">{r.person}</h3>
                    <p className="text-impact-dark/70 text-base font-medium mb-1">{r.title}</p>
                    <p className="text-impact-dark/60 text-sm italic mb-4">{r.org}</p>
                    <p className="text-impact-dark/70 leading-relaxed">{r.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 14: Closing */}
      <section className="py-24 bg-impact-dark relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <iframe
            src="https://player.vimeo.com/video/1143331891?background=1&autoplay=1&loop=1&muted=1"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              width: "100vw",
              height: "56.25vw",
              minHeight: "100%",
              minWidth: "177.77vh",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            allow="autoplay"
            title="CTA background"
          />
          <div className="absolute inset-0 bg-impact-dark/80" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">From Rovonn &amp; the Impact Loop Team</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Thank You for Reading.</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              We know your team reviewed every quote that landed in your inbox with care, and we are honoured to have been considered for a mission as significant as Kenya-Canada 2026.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              Whether we end up working together or not, we are rooting for this mission to build the kind of partnerships that outlast the week. If you would like to keep the conversation going, Rovonn is one email away.
            </p>
            <div className="flex justify-center">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Reply by Email
              </Link>
            </div>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-12">
              Quotation IL-2026-000 &middot; Valid 30 days from proposal date &middot; Impact Loop &middot; Toronto &middot; impactloop.ca &middot; All figures CAD, before applicable taxes
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProposalCbccKenyaCanada;
