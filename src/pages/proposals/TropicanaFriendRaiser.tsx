import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { setSEO, resetSEO } from "@/lib/seo";
import {
  ArrowRight,
  Film,
  Users,
  Heart,
  Globe2,
  Sparkles,
  Layers,
  Calendar,
  CheckCircle2,
  PlayCircle,
  Award,
  Clapperboard,
  MessageSquare,
  Target,
} from "lucide-react";
import Layout from "@/components/layout/Layout";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const understandingPoints = [
  {
    icon: Heart,
    title: "100 New Friends, Not Just Donors",
    desc: "FriendRaiser 2026 is about relationship, not transaction. The film has to make a stranger feel like family by minute four.",
  },
  {
    icon: Users,
    title: "45+ Years of Trust",
    desc: "Tropicana's longevity is the asset. The film must honor that legacy without feeling like a retrospective. Past as proof, not nostalgia.",
  },
  {
    icon: Globe2,
    title: "Local Roots, Global Alignment",
    desc: "The work belongs in the same conversation as the UN Second Decade for People of African Descent. The film should signal that scale without losing the GTA street-level intimacy.",
  },
  {
    icon: Target,
    title: "Authentic. Inspirational. Forward-Looking.",
    desc: "Three tones to balance in five minutes. We've built our entire practice around that exact tension.",
  },
];

const threeAct = [
  {
    act: "ACT I",
    title: "The Tropicana Effect",
    runtime: "0:00 \u2013 1:15",
    arcStage: "Trust & Legacy",
    desc: "Open on a single client face, hold the silence, then earn the title card. We pull the room in with one human moment before we ever say the word 'organization.' From there we layer in 45 years of legacy not as a timeline but as a feeling, archival texture, present-day faces, the same neighbourhood across decades.",
    deliverables: [
      "Cold open on a single FriendRaiser-worthy moment",
      "Title card: The Tropicana Effect \u2014 We Change Lives",
      "Legacy montage: archival + present, scored, no narration",
    ],
  },
  {
    act: "ACT II",
    title: "The Eight Doors",
    runtime: "1:15 \u2013 3:30",
    arcStage: "Impact & Humanity \u2192 Credibility & Scale",
    desc: "Tropicana runs eight programs. Most fundraising videos turn that into a list. We turn it into eight doors, each one opened by a real person who walked through it. Childcare. Youth. Seniors. Employment. Food security. Counselling. Justice. Community economic development. Then we widen the lens, Board Chair, CEO, staff, partner, donor, rapid-cut, all five voices answering the same off-camera question: what does Tropicana mean to you?",
    deliverables: [
      "8 program vignettes, each anchored by one client voice",
      "Voices of Tropicana rapid-cut sequence",
      "Visual proof of scale: spaces, hands, the work happening",
    ],
  },
  {
    act: "ACT III",
    title: "The Best Is Yet To Come",
    runtime: "3:30 \u2013 5:00",
    arcStage: "Vision & Momentum \u2192 Inspiration & Belonging",
    desc: "The pivot from what is to what's next. S.E.S.B.I. Hub. The Tropicana Legacy Foundation in 2029. The Youth Resource Centres. We frame the future not as a slide deck but as a promise the audience is being invited to keep. We close on the same client face from the cold open, transformed, and the room is now ready to become a friend.",
    deliverables: [
      "Future-vision sequence: S.E.S.B.I. Hub, Legacy Foundation, Youth Centres",
      "UN / PFPAD / SBCCI alignment moment, earned not labeled",
      "Closing tag: One Tropicana \u2014 The Best Is Yet To Come",
    ],
  },
];

const timeline = [
  {
    phase: "Week 1",
    dates: "Apr 28 \u2013 May 4",
    title: "Discovery & Story Strategy",
    items: [
      "Kickoff call with Tropicana leadership",
      "Story strategy doc + interview list approval",
      "Program-team coordination for client participation",
    ],
  },
  {
    phase: "Week 2",
    dates: "May 5 \u2013 May 11",
    title: "Pre-Production",
    items: [
      "Shot list, location lock, release forms",
      "Crew confirmation, gear prep",
      "Archival research + rights review",
    ],
  },
  {
    phase: "Week 2 \u2013 3",
    dates: "May 8 \u2013 May 17",
    title: "Principal Photography",
    items: [
      "2\u20133 shoot days across Tropicana program sites",
      "Leadership interviews + client portraits",
      "B-roll of programs in motion",
    ],
  },
  {
    phase: "Week 3 \u2013 4",
    dates: "May 18 \u2013 May 26",
    title: "Edit, Score, Color, Sound",
    items: [
      "First cut review with Tropicana team",
      "Round 1 + Round 2 revisions",
      "Original score, color grade, broadcast mix",
    ],
  },
  {
    phase: "Week 5",
    dates: "May 27 \u2013 May 29",
    title: "Final Delivery",
    items: [
      "Master file delivery by Friday May 29, 2026",
      "Gala-ready ProRes + web/social cuts",
      "Caption files, thumbnail set, deployment notes",
    ],
  },
  {
    phase: "Event",
    dates: "Jun 4, 2026",
    title: "FriendRaiser Premiere",
    items: [
      "On-call support the day of the event",
      "Backup files on-site",
      "Post-event handoff: editable archive + asset library",
    ],
  },
];

const tierGood = [
  "5-minute FriendRaiser film, fully scripted to your outline",
  "2 shoot days across Tropicana program sites",
  "Principal interviews: Board Chair, CEO, 1 staff, 1 client per program (up to 8)",
  "Cinematic editing, color grading, broadcast sound mix",
  "Licensed score (curated, not original composition)",
  "Standard motion graphics package: lower thirds, program titles, closing tag",
  "2 rounds of revisions",
  "Gala master + 1 social cutdown (90 sec)",
  "Caption files, thumbnail set, deployment notes",
];

const tierBetter = [
  "Everything in the Cinematic Impact Film tier, plus:",
  "3 shoot days with expanded crew (DP, camera assistant, dedicated sound engineer, gaffer)",
  "Original score composed for the film by a credited composer",
  "Broadcast-grade motion graphics: animated timelines, program-impact data viz, future-vision sequence",
  "Archival research and rights clearance for Tropicana legacy footage",
  "Cinema-grade color finishing, HDR-ready master",
  "3 rounds of revisions",
  "Multi-cut deployment pack: gala master, 90-sec social, 60-sec donor outreach, 30-sec teaser",
  "Day-of-event on-call support and backup playback files on-site",
  "Friend Activation Kit (see below): 5\u20137 personalized cutdowns for pre-event invitee outreach",
];

const portfolio = [
  {
    title: "CAFCAN \u2014 Our People's Keeper",
    category: "Caribbean African Canadian Social Services",
    desc: "Multi-program documentary anchoring CAFCAN's community justice work. Cited by their leadership as a turning point in donor and funder conversations.",
  },
  {
    title: "Lakeridge Health \u2014 I Belong",
    category: "Healthcare Institution",
    desc: "Cinematic film for one of Ontario's largest healthcare systems. Built to hold up in front of board, government, and patient-family audiences simultaneously.",
  },
  {
    title: "Black Creek \u2014 Black History Month",
    category: "Community Initiative",
    desc: "Event film and program documentation for a flagship community moment. The kind of work that makes the next year of programming easier to fund.",
  },
  {
    title: "EmployNext \u2014 Youth Trades Program",
    category: "Workforce Development",
    desc: "Program highlight film built around three youth participants. Used in funder reporting and community recruitment. Closest analogue to Tropicana's employment + pre-apprenticeship work.",
  },
];

const teamRoles = [
  {
    role: "Founder & Director",
    name: "Rovonn Russell",
    desc: "Designs the story strategy, leads every interview, directs every shoot, oversees every cut. No account managers. No handoffs.",
  },
  {
    role: "Director of Photography",
    name: "Vetted Toronto-based DP",
    desc: "Cinematic camera work. Selected per project from a roster of DPs Rovonn has shot with on healthcare and community films.",
  },
  {
    role: "Sound Engineer",
    name: "Field & Post Sound Lead",
    desc: "Broadcast-grade location sound and final mix. Critical for gala-room playback where audio failure is unrecoverable.",
  },
  {
    role: "Composer & Motion Designer",
    name: "Original Score + Graphics Team",
    desc: "Signature Production tier only. Original composition and broadcast motion graphics built specifically for the FriendRaiser film.",
  },
];

const references = [
  {
    org: "CAFCAN Social Services (Caribbean African Canadian)",
    contact: "Reference contact provided on request",
    project: "Multi-program documentary, 2024",
    note: "Closest reference for cultural fit, community-rooted production approach, and working with multi-program nonprofits.",
  },
  {
    org: "Lakeridge Health",
    contact: "Reference contact provided on request",
    project: "I Belong Signature Production, 2024",
    note: "Reference for production scale, working with a large institution's communications and leadership team, and broadcast-grade delivery.",
  },
  {
    org: "Black Creek Community Health Centre \u2014 Black History Month",
    contact: "Reference contact provided on request",
    project: "Event documentary, 2024",
    note: "Reference for community-centered storytelling, multi-stakeholder coordination, and event-anchored video work.",
  },
];

const TropicanaFriendRaiser = () => {
  useEffect(() => {
    setSEO({
      title: "FriendRaiser 2026 Proposal \u2014 Impact Loop for Tropicana Community Services",
      description:
        "Cinematic 5-minute film proposal for Tropicana Community Services' FriendRaiser 2026. Built by Impact Loop, Toronto.",
      ogType: "website",
    });
    // Add noindex meta tag for unlisted proposal page
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
            Confidential Proposal &middot; Prepared for Tropicana Community Services &middot; April 2026
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-24 pb-20 bg-impact-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
              FriendRaiser 2026 &middot; 5-Minute Film Proposal
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              The Tropicana Effect, <span className="text-gradient">on Film</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8">
              A five-minute cinematic portrait of 45 years of community impact, built to turn
              100 new strangers into 100 new friends on June 4, 2026.
            </p>

            {/* Video pitch placeholder */}
            <div className="aspect-video w-full max-w-3xl mx-auto bg-black/40 border border-white/10 rounded-sm flex items-center justify-center my-12 group cursor-pointer hover:border-impact-blue/40 transition-colors">
              <div className="text-center">
                <PlayCircle className="w-16 h-16 text-white/40 group-hover:text-impact-blue mx-auto mb-3 transition-colors" />
                <p className="text-white/60 text-sm uppercase tracking-widest">
                  90-Second Video Pitch from Rovonn
                </p>
                <p className="text-white/30 text-xs mt-2">
                  Direct-to-camera walkthrough of how we'd approach the FriendRaiser film
                </p>
              </div>
            </div>

            <p className="text-white/50 text-xs md:text-sm uppercase tracking-[0.25em]">
              Submitted by Impact Loop &middot; Toronto-based &middot; Founder-led production
            </p>
          </motion.div>
        </div>
      </section>

      {/* Understanding the Brief */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                01 &middot; What We Heard
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">
                Understanding the Brief
              </h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                FriendRaiser is not a gala video. It's a relationship-builder disguised as a
                short film. Here's what we believe the brief is really asking for.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {understandingPoints.map((point, i) => (
                <motion.div
                  key={point.title}
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-8 border border-impact-dark/10 rounded-sm hover:border-primary/30 transition-colors"
                >
                  <point.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-impact-dark mb-3">
                    {point.title}
                  </h3>
                  <p className="text-impact-dark/70 leading-relaxed">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creative Approach: 3-Act */}
      <section className="py-24 bg-impact-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                02 &middot; Creative Approach
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">
                A Three-Act Film, Mapped to Your Five-Stage Arc
              </h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Your outline calls for an emotional journey from Trust &amp; Legacy through to
                Inspiration &amp; Belonging. We've translated that into a three-act cinematic
                structure that delivers the same arc with a tighter narrative spine.
              </p>
            </motion.div>

            <div className="space-y-12">
              {threeAct.map((act, i) => (
                <motion.div
                  key={act.act}
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white p-8 md:p-10 rounded-sm shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-6 mb-6">
                    <span className="text-primary font-serif text-3xl font-bold">{act.act}</span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-impact-dark">
                      {act.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <span className="bg-impact-cream px-3 py-1 rounded-sm text-impact-dark/70 uppercase tracking-wider">
                      {act.runtime}
                    </span>
                    <span className="bg-impact-blue/10 text-impact-blue px-3 py-1 rounded-sm uppercase tracking-wider">
                      {act.arcStage}
                    </span>
                  </div>
                  <p className="text-impact-dark/70 text-lg leading-relaxed mb-6">{act.desc}</p>
                  <div className="border-t border-impact-dark/10 pt-6">
                    <p className="text-impact-dark/50 text-xs uppercase tracking-widest mb-3">
                      Key Deliverables in this Act
                    </p>
                    <ul className="space-y-2">
                      {act.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-impact-dark/80">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{d}</span>
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

      {/* Production Plan & Timeline */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                03 &middot; Production Plan
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">
                From Kickoff to Gala Premiere in Five Weeks
              </h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Built backwards from your two non-negotiable dates: final delivery
                Friday May 29, FriendRaiser premiere Thursday June 4.
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
                  className="flex flex-col md:flex-row gap-6 p-6 border border-impact-dark/10 rounded-sm hover:border-primary/30 transition-colors"
                >
                  <div className="md:w-48 flex-shrink-0">
                    <p className="text-primary text-sm uppercase tracking-widest font-medium">
                      {t.phase}
                    </p>
                    <p className="text-impact-dark/50 text-sm">{t.dates}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold text-impact-dark mb-3">
                      {t.title}
                    </h3>
                    <ul className="space-y-1.5">
                      {t.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-impact-dark/70">
                          <span className="text-primary mt-1.5">&bull;</span>
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

      {/* Two-Tier Investment */}
      <section className="py-24 section-blue">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-white/70 font-medium text-sm uppercase tracking-widest mb-4">
                04 &middot; Investment
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Two Tiers, Same Story Standard
              </h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                Both tiers deliver the full 5-minute FriendRaiser film at broadcast quality.
                The Signature tier adds production scale: original score, expanded crew,
                broadcast motion graphics, and the Friend Activation Kit.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tier 1: Cinematic Impact Film */}
              <motion.div
                custom={0}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/5 border border-white/20 rounded-sm p-8 md:p-10 backdrop-blur-sm"
              >
                <div className="mb-6">
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Tier 1</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                    Cinematic Impact Film
                  </h3>
                  <p className="text-white/70 text-sm italic">
                    The full FriendRaiser film, lean crew, gala-ready
                  </p>
                </div>
                <div className="border-t border-b border-white/10 py-6 mb-6">
                  <p className="text-4xl md:text-5xl font-serif font-bold mb-1">$24,500</p>
                  <p className="text-white/60 text-sm">CAD &middot; all-in &middot; taxes additional</p>
                </div>
                <ul className="space-y-3">
                  {tierGood.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-impact-blue flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tier 2: Signature Production */}
              <motion.div
                custom={1}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white text-impact-dark rounded-sm p-8 md:p-10 relative shadow-2xl"
              >
                <div className="absolute -top-3 right-8 bg-impact-blue text-white text-xs uppercase tracking-widest px-3 py-1 rounded-sm">
                  Recommended
                </div>
                <div className="mb-6">
                  <p className="text-impact-dark/60 text-xs uppercase tracking-widest mb-2">
                    Tier 2
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                    Signature Production
                  </h3>
                  <p className="text-impact-dark/70 text-sm italic">
                    Premiere-grade scale for a 45-year legacy moment
                  </p>
                </div>
                <div className="border-t border-b border-impact-dark/10 py-6 mb-6">
                  <p className="text-4xl md:text-5xl font-serif font-bold mb-1 text-primary">
                    $42,000
                  </p>
                  <p className="text-impact-dark/60 text-sm">
                    CAD &middot; all-in &middot; taxes additional
                  </p>
                </div>
                <ul className="space-y-3">
                  {tierBetter.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-impact-dark/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/60 text-sm text-center mt-10 max-w-2xl mx-auto"
            >
              Payment terms: 40% on signed agreement, 40% at first cut, 20% on final delivery.
              We hold these prices through May 5, 2026.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Beyond the Film: Microsite + Friend Activation Kit */}
      <section className="py-24 bg-impact-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
                05 &middot; Beyond the Five-Minute Film
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Two Innovations Built for FriendRaiser, Not Borrowed from Generic Video Work
              </h2>
              <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
                A film that lives only on June 4 is a film that retires on June 5. We've
                designed two add-ons that extend the FriendRaiser arc before, during, and after
                the gala.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                custom={0}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border border-white/20 rounded-sm p-8 md:p-10 hover:border-impact-blue/50 transition-colors"
              >
                <Layers className="w-10 h-10 text-impact-blue mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-3">
                  Innovation #1: The Tropicana Story Hub
                </h3>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-4">
                  Included with Signature tier &middot; +$4,500 add-on for Tier 1
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                  An always-on microsite hosted under tropicana.org (or as a standalone link)
                  that holds the gala film, every cutdown, the eight program vignettes as
                  standalone shareables, and a downloadable press / partner kit.
                </p>
                <p className="text-white/80 leading-relaxed">
                  After June 4, every new prospective friend, funder, or partner can be sent
                  one link instead of a one-time gala video. The film keeps working all year.
                </p>
              </motion.div>

              <motion.div
                custom={1}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border border-white/20 rounded-sm p-8 md:p-10 hover:border-impact-blue/50 transition-colors"
              >
                <MessageSquare className="w-10 h-10 text-impact-blue mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-3">
                  Innovation #2: The Friend Activation Kit
                </h3>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-4">
                  Included with Signature tier
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                  Five to seven 30-to-60-second cutdowns, each shaped for a different invitee
                  archetype: corporate partner, faith community leader, alumni donor,
                  government contact, community ally.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Tropicana's team sends these directly to the 100 prospective friends
                  <em className="not-italic"> before</em> the event, so guests arrive on June 4
                  already warmed up. The room becomes friends faster because the conversation
                  started two weeks earlier.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                06 &middot; Portfolio
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">
                Closest Reference Work
              </h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Each of these projects shares meaningful DNA with FriendRaiser, multi-program
                nonprofit, community-rooted, Black-led or Black-serving, built to hold up in
                front of high-stakes audiences.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolio.map((p, i) => (
                <motion.div
                  key={p.title}
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-8 bg-impact-cream rounded-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-primary text-xs uppercase tracking-widest mb-3 font-medium">
                    {p.category}
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-impact-dark mb-3">
                    {p.title}
                  </h3>
                  <p className="text-impact-dark/70 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium"
              >
                View the full Impact Loop portfolio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-impact-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                07 &middot; Team
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">
                Founder-Led, Vetted Toronto Crew
              </h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Every Impact Loop project is directed by Rovonn Russell. For Signature
                productions, he assembles a vetted Toronto-based crew chosen specifically for
                this project.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamRoles.map((member, i) => (
                <motion.div
                  key={member.role}
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-6 bg-white rounded-sm"
                >
                  <p className="text-primary text-xs uppercase tracking-widest mb-2 font-medium">
                    {member.role}
                  </p>
                  <h3 className="font-serif text-lg font-semibold text-impact-dark mb-2">
                    {member.name}
                  </h3>
                  <p className="text-impact-dark/70 text-sm leading-relaxed">{member.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium"
              >
                Read more about Rovonn and Impact Loop
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                08 &middot; References
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">
                Three Past Clients Available for Reference Calls
              </h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Direct contact information shared upon request to protect their inboxes. We're
                happy to schedule a 15-minute call with any of the three before contract sign.
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
                  className="flex flex-col md:flex-row gap-6 p-6 border border-impact-dark/10 rounded-sm"
                >
                  <Award className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold text-impact-dark mb-1">
                      {r.org}
                    </h3>
                    <p className="text-impact-dark/50 text-sm mb-3">
                      {r.project} &middot; {r.contact}
                    </p>
                    <p className="text-impact-dark/70 leading-relaxed">{r.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Impact Loop */}
      <section className="py-24 section-blue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-10 h-10 text-impact-blue mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
                Why Impact Loop for FriendRaiser
              </h2>
              <div className="space-y-6 text-white/85 text-lg leading-relaxed text-left max-w-3xl mx-auto">
                <p>
                  Most production companies will treat your brief as a video-services job.
                  Capture, edit, deliver. We don't, and that's the difference.
                </p>
                <p>
                  Impact Loop builds storytelling systems for organizations whose work has to
                  earn trust before it can earn dollars. Healthcare. Black-serving community
                  organizations. Workforce development. Faith communities. The exact territory
                  Tropicana operates in.
                </p>
                <p>
                  We bring three things to FriendRaiser that matter more than gear: a director
                  who understands why your 45 years are an asset, not a backstory; a
                  community-first interview practice that makes clients feel safe enough to
                  give you the moment you actually need; and a deployment mindset that
                  guarantees the film is still working in October, not just on June 4.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="py-24 bg-impact-dark">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
              Next Step
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">
              Let's Have a 30-Minute Conversation
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Whether or not we end up working together, the conversation will sharpen the
              film you commission. Book a time directly with Rovonn, or reply to this proposal
              email and we'll find a slot that works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bookings" className="btn-primary inline-flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Book a Call with Rovonn
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white hover:bg-white/5 transition-colors rounded-sm"
              >
                Reply by Email
              </Link>
            </div>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-12">
              Proposal valid through May 5, 2026 &middot; Impact Loop &middot; Toronto
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default TropicanaFriendRaiser;
