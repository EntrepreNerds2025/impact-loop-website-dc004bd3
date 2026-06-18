import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Layers,
  Mic,
  ClipboardCheck,
  BarChart3,
  Quote,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";

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

const IllustrativeTag = ({ children = "Illustrative example, not measured data" }: { children?: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-amber-700">
    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
    {children}
  </span>
);

const ImpactStandard = () => {
  useEffect(() => {
    setSEO({
      title: "The Impact Loop Standard | Turning Frontline Impact Into Fundable Data",
      description:
        "The Impact Loop Standard is the measurement layer of the Impact OS we're developing with mission-driven organizations, a shared way to turn fifteen-second frontline observations into longitudinal, auditable impact data, so the organizations doing the work can prove it, and funders can trust it.",
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
          <div className="container relative z-10 mx-auto px-6 pb-24 pt-36 text-center">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur"
            >
              The Impact Loop Standard
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mx-auto max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            >
              Turn the impact you create into data funders can trust.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
            >
              Attendance is easy to count. Transformation isn't. The Impact Loop Standard is the
              measurement layer of the Impact OS we're building with mission-driven organizations.
              It's a shared way to turn fifteen-second frontline observations into longitudinal,
              auditable impact data, so the people doing the work can prove it, and the funders
              backing them can trust it.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                to="/bookings?type=strategy"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-[hsl(var(--impact-dark))] transition hover:bg-white/90"
              >
                Bring the Standard to your work
                <ArrowRight size={16} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-sm border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[hsl(var(--impact-dark))]"
              >
                See how it works
              </a>
            </motion.div>
          </div>
        </section>

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
                      <ArrowRight className="rotate-90 md:rotate-0" size={20} />
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
                No equation to memorize. A score is just many small observations, added up honestly.
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
              Want to measure transformation, not just attendance?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              We're piloting the Standard with Inner City Outreach in Toronto's Jane and Finch
              community and with the Jean Augustine Centre for Young Women's Empowerment. If your
              organization needs to turn its impact into fundable evidence, let's talk.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/bookings?type=strategy"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-[hsl(var(--impact-dark))] transition hover:bg-white/90"
              >
                Book a strategy call
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
