import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Layers,
  Mic,
  ClipboardCheck,
  BarChart3,
  Quote,
  Database,
  FlaskConical,
  Scale,
  BadgeCheck,
  Network,
  Users,
  Compass,
  Settings2,
  Rocket,
  Plug,
  Sprout,
  Clock,
  FileText,
  HeartHandshake,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import {
  CinematicBand,
  FormulaAnatomy,
  LedgerChain,
  MomentPhoto,
} from "@/components/standard/StandardVisuals";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08 },
  }),
};

const PILLARS = [
  { name: "Identity", color: "#7C3AED", indicators: "Self-awareness · Confidence · Integrity" },
  { name: "Character", color: "#2563EB", indicators: "Integrity · Accountability · Resilience" },
  { name: "Relationships", color: "#0D9488", indicators: "Communication · Trust · Healthy conflict" },
  { name: "Service", color: "#EA580C", indicators: "Empathy · Initiative · Teamwork" },
  { name: "Purpose", color: "#CA8A04", indicators: "Goal-setting · Gifts & talents" },
];

// Illustrative only. Not measured data.
const ILLUSTRATIVE_SCORES = [
  { name: "Identity", color: "#7C3AED", score: 78 },
  { name: "Character", color: "#2563EB", score: 64 },
  { name: "Relationships", color: "#0D9488", score: 82 },
  { name: "Service", color: "#EA580C", score: 58 },
  { name: "Purpose", color: "#CA8A04", score: 69 },
];

const steps = [
  {
    icon: ClipboardCheck,
    title: "Capture a Pillar Moment",
    body: "A staff member logs one observation: who, which pillar, how strong (1 to 5), the growth indicator, and the direction, in three taps.",
  },
  {
    icon: Mic,
    title: "Talk, don't type",
    body: "A voice note becomes the written record. The note is the human story; the tags make it measurable. About fifteen seconds, then back to the work.",
  },
  {
    icon: TrendingUp,
    title: "Moments become scores",
    body: "Each pillar earns a 0 to 100 score, weighted by direction and recency, so growth is visible quarter over quarter and reflects who the youth is now.",
  },
  {
    icon: BarChart3,
    title: "Scores become an Impact Report",
    body: "The quarter's growth numbers, paired with real anonymized observations, become auditable evidence funders trust, exported on demand.",
  },
];

const scoringFactors = [
  ["Direction", "Growth counts fully. A neutral moment counts for less. A setback lowers the score. Honest data, not a feel-good meter."],
  ["Recency", "A moment today counts for more than one from a month ago, about a 30 day half life, so a score stays current."],
  ["Growth over time", "We compare this quarter to the last, so the headline is the change, always traceable back to the real moments behind it."],
];

const safeguards = [
  {
    icon: ShieldCheck,
    title: "Humans rate, the system only weights",
    body: "Staff assign every rating. The platform categorizes and aggregates, it never invents a score. Every number drills down to dated, named, quotable observations.",
  },
  {
    icon: Layers,
    title: "Confidence tiers",
    body: "Each score is labeled Emerging, Developing, or Strong evidence by how many observations back it. One great day never masquerades as transformation.",
  },
  {
    icon: ClipboardCheck,
    title: "Self-evaluation cross-check",
    body: "Participants rate themselves on the same pillars each quarter. Gaps between their view and staff's become coaching conversations, and a second, independent signal.",
  },
];

const RESEARCH_STATS = [
  { value: 43, suffix: "", label: "annual & impact reports analyzed across the sector" },
  { value: 8, suffix: "", label: "funder frameworks mapped, from Ontario Trillium to evidence-tier models" },
  { value: 20, suffix: "+", label: "measurement platforms and methodologies studied" },
  { value: 90, suffix: "+", label: "primary sources behind the Standard's design decisions" },
];

/** Eased count-up that starts when scrolled into view. */
const CountUp = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
};

// Illustrative rotation for the hero's live-logging card. Not measured data.
const LIVE_MOMENTS = [
  { pillar: "Service", color: "#EA580C", note: "Led the warm-up for the juniors — planned it himself." },
  { pillar: "Identity", color: "#7C3AED", note: "Spoke in front of the whole group for the first time." },
  { pillar: "Relationships", color: "#0D9488", note: "Settled a dispute with words, unprompted." },
];

const PARTNER_STEPS = [
  {
    icon: Compass,
    title: "Plan",
    body: "A working session to map your programs, your outcomes language, and what your funders actually ask for. You leave with a roadmap either way.",
  },
  {
    icon: ClipboardCheck,
    title: "Assess",
    body: "An impact-readiness audit: what you can already prove, where the gaps are, and the shortest path from anecdotes to auditable evidence.",
  },
  {
    icon: Settings2,
    title: "Configure the Standard",
    body: "Your taxonomy — pillars and indicators tuned to your theory of change, anchored rubrics your staff can rate consistently, consent and governance set up properly from day one.",
  },
  {
    icon: Rocket,
    title: "Launch your platform",
    body: "A measurement platform your team actually uses: fifteen-second voice logging on shared tablets, staff trained, pilot term underway in weeks — not quarters.",
  },
  {
    icon: Plug,
    title: "Integrate & report",
    body: "The Standard attaches to what you already run — your website, your systems, your reporting rhythm. Living impact pages, funder-ready exports, evidence on demand.",
  },
  {
    icon: Sprout,
    title: "Grow with the network",
    body: "As your pilot data matures: reliability reporting, verified growth events, and — as partner organizations join — benchmarks against programs like yours.",
  },
];

const OUTCOMES = [
  {
    icon: BadgeCheck,
    title: "Walk into funder meetings with evidence",
    body: "Unique participant counts, measured growth with denominators, and a methods card — the dossier a program officer can defend to their own board.",
  },
  {
    icon: FileText,
    title: "Reports that assemble themselves",
    body: "Quarter's end becomes an export, not a three-week scramble. Funder pack and family one-pager, generated from the same evidence, on demand.",
  },
  {
    icon: TrendingUp,
    title: "Stronger applications and renewals",
    body: "\"Data and results that demonstrate the success of the existing program\" stops being the question you dread and becomes the section you lead with.",
  },
  {
    icon: Clock,
    title: "Hours back, every single week",
    body: "Fifteen seconds per observation, spoken not typed. No spreadsheets, no end-of-year archaeology through sticky notes and memory.",
  },
  {
    icon: HeartHandshake,
    title: "Earlier, smarter care for your youth",
    body: "The same data that convinces funders quietly tells your team who needs a check-in this week — before disengagement becomes a goodbye.",
  },
  {
    icon: Database,
    title: "Evidence you own, forever",
    body: "Exportable, portable, independently verifiable. Your organization's proof outlives any website, any vendor — including us. That's by design.",
  },
];

const PILOT_ASKS = [
  "A program lead and a few frontline staff who'll log honestly",
  "About fifteen seconds per observation, during sessions you already run",
  "One program term — a real season of real moments",
  "The courage to log setbacks too (that honesty is what funders end up trusting)",
];

const WE_CARRY = [
  "Your taxonomy, rubrics, and consent setup — configured with you, not for you",
  "The platform, the tablets workflow, and staff training",
  "Scoring, evidence ledger, reliability machinery — all the math",
  "Report generation and integration with your site and systems",
];

const SEEKING = [
  {
    title: "Youth & community organizations",
    body: "You run real programs and can feel the transformation — you just can't prove it yet. You're the partner the Standard was designed for first.",
  },
  {
    title: "Funders & intermediaries",
    body: "You want comparable outcomes across a portfolio instead of a stack of incompatible PDFs. Sponsor a cohort and every grantee measures on one spine.",
  },
  {
    title: "Organizations with existing platforms",
    body: "Keep your systems. We attach the measurement layer underneath — the ledger, the scoring, the reporting — and your platform gains an evidence engine.",
  },
];

const ENGINE_LAYERS = [
  {
    icon: Database,
    title: "The evidence ledger",
    body: "Every observation is append-only and cryptographically chained. Corrections are visible additions, never silent edits, and the entire history can be re-verified independently, the audit trail funders' evaluators actually ask for.",
    status: "Running in our pilot platform",
  },
  {
    icon: Users,
    title: "Reliability, measured",
    body: "When two staff observe the same session, the platform quietly pairs their independent ratings. Over a term that becomes an inter-rater reliability report, the difference between 'trust me' and 'here's the agreement data.'",
    status: "Built in, reporting as pilot data accumulates",
  },
  {
    icon: FlaskConical,
    title: "Statistical honesty",
    body: "Small samples are weighted honestly, every score carries how much evidence backs it, and headline conclusions are automatically re-tested under different settings so no claim depends on one convenient parameter.",
    status: "Running in our pilot platform",
  },
  {
    icon: BadgeCheck,
    title: "Verified growth events",
    body: "A youth's growth only becomes a countable outcome after it is sustained over time and corroborated by more than one observer. Conservative by design, so the number a funder reads means what it says.",
    status: "Built in, verifying as pilot data accumulates",
  },
  {
    icon: Scale,
    title: "The language governor",
    body: "Claims are gated by evidence. Early signals are called early signals. Association is never dressed up as causation. The reporting layer literally cannot generate a sentence the data hasn't earned.",
    status: "Designed into every report the platform produces",
  },
  {
    icon: Network,
    title: "Shared benchmarks",
    body: "Organizations measuring on the same taxonomy produce comparable data. As the network grows, so does the context: how your growth compares, fairly, to programs like yours.",
    status: "Unlocks as partner organizations join",
  },
];

const CLAIMS_TODAY = [
  "A fully documented, openly published methodology (Standard v1.0)",
  "A working measurement platform, in the field with our pilot partners",
  "A verifiable, append-only evidence ledger behind every number",
  "A design grounded in sector research, funder frameworks, and measurement science",
];

const CLAIMS_NOT_YET = [
  "“Scientifically validated” — our inter-rater and convergent validity studies run inside the pilot first",
  "“Proven outcomes” — verified growth events are counted only as real pilot data sustains them",
  "“Benchmarked” — network comparisons publish only when enough organizations share the taxonomy",
];

const IllustrativeTag = ({ children = "Illustrative example, not measured data" }: { children?: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-amber-700">
    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
    {children}
  </span>
);

/** Hero visual: animated pillar bars + a rotating "moment being logged" chip. */
const HeroPillarsCard = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % LIVE_MOMENTS.length), 3400);
    return () => clearInterval(t);
  }, []);
  const m = LIVE_MOMENTS[idx];
  return (
    <div className="relative rounded-3xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-md md:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white/50">
            A pillar reading, building in real time
          </p>
          <p className="mt-0.5 font-serif text-lg font-bold text-white">Moments in. Evidence out.</p>
        </div>
        <IllustrativeTag>Illustrative</IllustrativeTag>
      </div>
      <div className="space-y-3">
        {ILLUSTRATIVE_SCORES.map((p, i) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="w-24 flex-none text-xs font-semibold text-white/85">{p.name}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: p.color }}
                initial={{ width: 0 }}
                animate={{ width: `${p.score}%` }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.14, ease: "easeOut" }}
              />
            </div>
            <span className="w-8 flex-none text-right text-xs font-bold tabular-nums text-white/85">
              {p.score}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="mb-2 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-white/50">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          Moment being logged
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            className="rounded-xl border border-white/10 bg-white/5 p-3.5"
          >
            <p className="text-sm italic leading-snug text-white/90">"{m.note}"</p>
            <p className="mt-1.5 text-[0.7rem] font-semibold" style={{ color: m.color }}>
              {m.pillar} · voice note · 15 seconds
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/** Scroll-driven partnership timeline. */
const PartnerJourney = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  return (
    <section id="partner-journey" className="bg-[hsl(var(--impact-cream))] py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
            Working with us
          </p>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            From first conversation to living impact data
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Partnering isn't buying software. It's a guided path — planning, assessment,
            configuration, launch, integration — with your team in the loop at every step, and
            evidence accumulating from the first week.
          </p>
        </div>
        <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
          <div className="absolute bottom-3 left-[21px] top-3 w-0.5 rounded bg-border" />
          <motion.div
            className="absolute bottom-3 left-[21px] top-3 w-0.5 origin-top rounded bg-gradient-to-b from-[#7C3AED] via-[#2563EB] to-[#0D9488]"
            style={{ scaleY: lineScale }}
          />
          <div className="space-y-8">
            {PARTNER_STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i * 0.5}
                className="relative flex gap-6"
              >
                <div className="z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm">
                  <s.icon size={19} />
                </div>
                <div className="flex-1 rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Step {i + 1}
                    </span>
                    <h3 className="text-lg font-bold">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* the deal, plainly */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-7 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                What a pilot asks of you
              </p>
              <ul className="mt-4 space-y-3">
                {PILOT_ASKS.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border bg-[hsl(var(--impact-dark))] p-7 text-white md:border-l md:border-t-0 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                What we carry
              </p>
              <ul className="mt-4 space-y-3">
                {WE_CARRY.map((w) => (
                  <li key={w} className="flex gap-3 text-sm leading-relaxed text-white/80">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-300" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border bg-[hsl(var(--impact-cream))] px-7 py-5 sm:flex-row md:px-8">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">Zero-risk first step:</span> a free
              Impact Readiness snapshot of your current reporting — you leave with a roadmap
              whether we work together or not.
            </p>
            <Link
              to="/bookings?type=strategy"
              className="inline-flex flex-none items-center justify-center gap-2 rounded-sm bg-[hsl(var(--impact-dark))] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:opacity-90"
            >
              Get your free snapshot
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ImpactStandard = () => {
  useEffect(() => {
    setSEO({
      title: "The Impact Loop Standard | Turning Frontline Impact Into Fundable Data",
      description:
        "The Impact Loop Standard turns fifteen-second frontline observations into longitudinal, auditable impact data. Built on a study of 43 sector reports, 8 funder frameworks, and 20+ platforms — with a verifiable evidence ledger, published methodology, and a working pilot platform in the field.",
      ogType: "article",
      path: "/impact-standard",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      <main className="bg-background text-foreground">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[hsl(var(--impact-dark))] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,hsl(var(--impact-purple)/0.28),transparent_30%),linear-gradient(135deg,hsl(var(--impact-dark))_0%,hsl(var(--impact-dark-lighter))_55%,hsl(var(--impact-blue)/0.55)_100%)]" />
          <motion.div
            className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[hsl(var(--impact-purple))]/25 blur-3xl"
            animate={{ y: [0, 30, 0], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[hsl(var(--impact-blue))]/25 blur-3xl"
            animate={{ y: [0, -26, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="container relative z-10 mx-auto px-6 pb-24 pt-32 md:pt-36">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="text-center lg:text-left">
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur"
                >
                  <motion.span
                    className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <span className="sm:hidden">Partner applications open</span>
                  <span className="hidden sm:inline">
                    The Impact Loop Standard · Partner applications open
                  </span>
                </motion.p>
                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
                >
                  Turn the impact you create into data funders can trust.
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg lg:mx-0"
                >
                  Attendance is easy to count. Transformation isn't. The Standard turns
                  fifteen-second frontline observations into longitudinal, auditable impact data —
                  so the people doing the work can prove it, and the funders backing them can
                  trust it. The methodology is published, the platform is in the field with our
                  pilot partners, and every layer is built in the open. Now we're selecting the
                  next partners to build with.
                </motion.p>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
                >
                  <Link
                    to="/bookings?type=strategy"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-[hsl(var(--impact-dark))] transition hover:bg-white/90"
                  >
                    Get your free Impact Readiness snapshot
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href="#partner-journey"
                    className="inline-flex items-center justify-center rounded-sm border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[hsl(var(--impact-dark))]"
                  >
                    See how we work together
                  </a>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.35 }}
              >
                <HeroPillarsCard />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CINEMATIC PHOTO BAND */}
        <CinematicBand />

        {/* PROBLEM -> PROMISE */}
        <section className="container mx-auto px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              "We can see they've grown" no longer wins grants.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Funders want outcomes, not activity. But the growth a frontline worker sees every
              day lives in memory and scattered notes, and by reporting season it has collapsed
              into a single unprovable sentence. We're developing the Standard with our partners to
              fix exactly that, without adding an hour of paperwork to an already-stretched team.
            </p>
          </div>

          {/* RESEARCH PROGRAM */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                Built on research, not vibes
              </p>
              <h3 className="font-serif text-2xl font-bold md:text-3xl">
                Before designing the Standard, we studied how the sector actually proves impact
              </h3>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {RESEARCH_STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="rounded-2xl border border-border bg-background p-6 text-center shadow-sm"
                >
                  <p className="font-serif text-4xl font-bold text-primary">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-[hsl(var(--impact-cream))] p-6">
                <p className="text-sm leading-relaxed text-foreground">
                  Of the Canadian nonprofit reports we reviewed,{" "}
                  <span className="font-bold">not one included a methods note</span>, the section
                  that tells a funder how the numbers were produced. Every report generated on the
                  Standard carries one by default.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-[hsl(var(--impact-cream))] p-6">
                <p className="text-sm leading-relaxed text-foreground">
                  Across 20+ platforms we studied,{" "}
                  <span className="font-bold">
                    none combined an open methodology, fifteen-second frontline capture, and
                    click-through provenance
                  </span>{" "}
                  from any number back to the dated observations behind it. That combination is
                  the Standard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT PARTNERS WALK AWAY WITH */}
        <section className="container mx-auto px-6 pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              What partners walk away with
            </p>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Not a methodology lesson. More funded work.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              The Standard is the engine. This is what it drives for your organization.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map((o, i) => (
              <motion.div
                key={o.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-border bg-[hsl(var(--impact-cream))] p-7 transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <o.icon size={22} />
                </div>
                <h3 className="text-lg font-bold">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* THE PILLAR MOMENT / 5 PILLARS */}
        <section className="bg-[hsl(var(--impact-cream))] py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                The core unit
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Everything is built from one Pillar Moment
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                A single observation: who, which development pillar, how strong (1 to 5), the growth
                indicator, the direction, and a short note. Thousands of these become an
                organization's impact dataset. The Standard organizes growth into five pillars,
                each with named indicators.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="rounded-2xl border border-border bg-background p-6 shadow-sm"
                >
                  <div className="mb-4 h-1.5 w-12 rounded-full" style={{ backgroundColor: p.color }} />
                  <h3 className="text-lg font-bold" style={{ color: p.color }}>
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.indicators}</p>
                </motion.div>
              ))}
            </div>

            {/* VISUAL A: illustrative pillar scores */}
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-background p-7 shadow-sm">
              <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">What a pillar reading looks like</p>
                  <h3 className="mt-1 font-serif text-xl font-bold">Five pillars, one glance</h3>
                </div>
                <IllustrativeTag />
              </div>
              <div className="space-y-3.5">
                {ILLUSTRATIVE_SCORES.map((p) => (
                  <div key={p.name} className="flex items-center gap-4">
                    <span className="w-28 flex-none text-sm font-semibold" style={{ color: p.color }}>
                      {p.name}
                    </span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{ width: `${p.score}%`, backgroundColor: p.color }} />
                    </div>
                    <span className="w-10 flex-none text-right text-sm font-bold tabular-nums">{p.score}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="font-semibold uppercase tracking-wider">Confidence:</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#EA580C]" /> Emerging</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#2563EB]" /> Developing</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#0D9488]" /> Strong</span>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="container mx-auto px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">How it works</p>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              From a fifteen-second observation to a funder-ready report
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon size={22} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </motion.div>
            ))}
          </div>

          {/* VISUAL B: flow diagram */}
          <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-border bg-[hsl(var(--impact-cream))] p-8">
            <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
              {[
                { icon: ClipboardCheck, label: "Pillar Moment", caption: "One observation, logged in seconds", color: "#7C3AED" },
                { icon: TrendingUp, label: "Score (0 to 100)", caption: "Weighted by direction and recency", color: "#2563EB" },
                { icon: BarChart3, label: "Impact Report", caption: "Numbers and stories on one page", color: "#0D9488" },
              ].map((node, idx, arr) => (
                <div key={node.label} className="flex flex-1 flex-col items-center md:flex-row md:items-stretch">
                  <div className="flex w-full flex-col items-center rounded-xl border border-border bg-background p-5 text-center shadow-sm">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${node.color}1a`, color: node.color }}>
                      <node.icon size={20} />
                    </div>
                    <p className="text-sm font-bold">{node.label}</p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{node.caption}</p>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="flex items-center justify-center py-2 text-muted-foreground md:px-3 md:py-0">
                      <motion.span
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.25 }}
                        className="inline-flex"
                      >
                        <ArrowRight className="rotate-90 md:rotate-0" size={20} />
                      </motion.span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW A MOMENT BECOMES A SCORE (replaces the formula) */}
        <section className="bg-[hsl(var(--impact-dark))] py-20 text-white md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/60">
                How scoring works
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                How a moment becomes a score
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                The formula below is published and deliberately simple, so a funder can audit it. A
                score is just many small observations, added up honestly.
                A staff member rates each moment from 1 to 5. Growth counts fully, a steady day
                counts for less, and a setback pulls the score down. Recent moments matter more than
                older ones, so a score reflects who a young person is now, not who they were a year
                ago. This is the approach we are developing and testing with our pilot partners.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
              {scoringFactors.map(([t, b]) => (
                <div key={t} className="rounded-xl border border-white/12 bg-white/5 p-5">
                  <h3 className="text-base font-bold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE FORMULA, VISUALIZED */}
        <FormulaAnatomy />

        {/* THE LOOP ENGINE — the layers behind the score */}
        <section className="bg-[hsl(var(--impact-cream))] py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                The engineering underneath
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                A simple score, with serious machinery behind it
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                The published formula is deliberately simple, because a funder should be able to
                audit it. The depth lives in the layers around it, each one built to answer a
                question a skeptical evaluator would ask. We publish where each layer stands,
                honestly.
              </p>
            </div>
            <LedgerChain />
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {ENGINE_LAYERS.map((l, i) => (
                <motion.div
                  key={l.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover={{ y: -6 }}
                  className="flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-lg hover:ring-1 hover:ring-primary/20"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <l.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold">{l.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                  <p className="mt-4 inline-flex w-fit rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary">
                    {l.status}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                to="/impact-standard/spec"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-[hsl(var(--impact-dark))]/25 px-6 py-3 text-xs font-bold uppercase tracking-widest text-foreground transition hover:bg-[hsl(var(--impact-dark))] hover:text-white"
              >
                Read the published specification (v1.0)
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* SAFEGUARDS */}
        <section className="container mx-auto px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              What keeps it honest
            </p>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Built to hold up to a funder's questions
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {safeguards.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="rounded-2xl border border-border bg-background p-7 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon size={22} />
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PARTNER JOURNEY */}
        <PartnerJourney />

        {/* WHO WE'RE LOOKING FOR */}
        <section className="container mx-auto px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              Who we're looking for
            </p>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              We're selecting a small cohort of partners — on purpose
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Every early partner shapes the Standard: your taxonomy, your rubrics, your funders'
              questions make the whole network stronger. That's why we'd rather build deeply with
              a few than shallowly with many.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SEEKING.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-border bg-background p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/bookings?type=strategy"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[hsl(var(--impact-dark))] px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90"
            >
              Start the conversation
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* THE HONESTY LADDER */}
        <section className="bg-[hsl(var(--impact-dark))] py-20 text-white md:py-24">
          <div className="container mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/60">
                The honesty ladder
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                What we claim today — and what we refuse to claim yet
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
                A measurement standard is only as trustworthy as its own claims. So we publish
                both lists, and each claim on the second list unlocks only when the evidence
                earns it. That discipline is the product.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/12 bg-white/5 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                  What's true today
                </p>
                <ul className="mt-4 space-y-3">
                  {CLAIMS_TODAY.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-white/80">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-300" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/5 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Not yet — and we'll say so until it's earned
                </p>
                <ul className="mt-4 space-y-3">
                  {CLAIMS_NOT_YET.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-white/80">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* OUTPUT QUOTE + SAMPLE REPORT */}
        <section className="bg-[hsl(var(--impact-cream))] py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <Quote className="mx-auto mb-6 text-primary" size={40} />
            <p className="font-serif text-2xl font-bold leading-relaxed md:text-3xl">
              Numbers and stories, on one page. Funders get the measurable outcome and the human
              moment that proves it, exported on demand.
            </p>
          </div>

          {/* VISUAL C: sample impact report card */}
          <div className="container mx-auto mt-12 max-w-2xl px-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <div className="flex items-center justify-between border-b border-border bg-[hsl(var(--impact-dark))] px-6 py-4 text-white">
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white/60">Impact Report</p>
                  <p className="font-serif text-lg font-bold">Youth Program, Q3</p>
                </div>
                <IllustrativeTag>Illustrative sample</IllustrativeTag>
              </div>
              <div className="grid gap-6 p-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pillar growth</p>
                  <div className="mt-3 space-y-3">
                    {[["Relationships", 82, "#0D9488"], ["Identity", 78, "#7C3AED"], ["Purpose", 69, "#CA8A04"]].map(([n, v, c]) => (
                      <div key={n as string} className="flex items-center gap-3">
                        <span className="w-24 flex-none text-xs font-semibold" style={{ color: c as string }}>{n}</span>
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full" style={{ width: `${v}%`, backgroundColor: c as string }} />
                        </div>
                        <span className="w-8 flex-none text-right text-xs font-bold tabular-nums">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl bg-[hsl(var(--impact-blue))]/8 p-4">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">Growth this quarter</p>
                    <p className="mt-1 font-serif text-2xl font-bold text-[hsl(var(--impact-blue))]">+12 points</p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-[hsl(var(--impact-cream))] p-5">
                  <div className="mb-4"><MomentPhoto /></div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">The moment behind the number</p>
                  <p className="mt-2 text-sm italic leading-relaxed text-foreground">
                    "Led the check-in circle for the first time and stayed after to help a newcomer
                    feel welcome."
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">Relationships · rating 4 of 5 · logged by a youth worker, with a date</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[hsl(var(--impact-dark))] py-20 text-white md:py-24">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Your impact is real. Let's make it provable — together.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              We're building the Standard in the field with Inner City Outreach in Toronto's Jane
              and Finch community and the Jean Augustine Centre for Young Women's Empowerment —
              and we're selecting the next partner organizations now. If your work changes lives
              and your reports can't prove it yet, that's exactly who this is for.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/bookings?type=strategy"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-[hsl(var(--impact-dark))] transition hover:bg-white/90"
              >
                Get your free Impact Readiness snapshot
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/impact-visibility-system"
                className="inline-flex items-center justify-center rounded-sm border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[hsl(var(--impact-dark))]"
              >
                Explore our systems
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ImpactStandard;
