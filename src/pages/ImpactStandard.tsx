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
  Lock,
  Network,
  Database,
  Workflow,
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

const steps = [
  {
    icon: ClipboardCheck,
    title: "Capture a Pillar Moment",
    body: "A staff member logs one observation — who, which pillar, how strong (1–5), the growth indicator, and the direction — in three taps.",
  },
  {
    icon: Mic,
    title: "Talk, don't type",
    body: "A voice note becomes the written record. The note is the human story; the tags make it measurable. About fifteen seconds, then back to the work.",
  },
  {
    icon: TrendingUp,
    title: "Moments become scores",
    body: "Each pillar earns a 0–100 score, weighted by direction and recency, so growth is visible quarter over quarter and reflects who the youth is now.",
  },
  {
    icon: BarChart3,
    title: "Scores become an Impact Report",
    body: "The quarter's growth numbers, paired with real anonymized observations — auditable evidence funders trust, exported on demand.",
  },
];

const safeguards = [
  {
    icon: ShieldCheck,
    title: "Humans rate, the system only weights",
    body: "Staff assign every rating. The platform categorizes and aggregates — it never invents a score. Every number drills down to dated, named, quotable observations.",
  },
  {
    icon: Layers,
    title: "Confidence tiers",
    body: "Each score is labeled Emerging, Developing, or Strong evidence by how many observations back it. One great day never masquerades as transformation.",
  },
  {
    icon: ClipboardCheck,
    title: "Self-evaluation cross-check",
    body: "Participants rate themselves on the same pillars each quarter. Gaps between their view and staff's become coaching conversations — and a second, independent signal.",
  },
];

const moat = [
  { icon: Network, title: "A shared standard", body: "A documented way to convert field observations into comparable outcomes — what accounting standards are to finance. We own the language funders learn to ask for." },
  { icon: Database, title: "Longitudinal benchmark data", body: "Years of dated observations across many organizations create norms no newcomer can replicate. The asset compounds while you sleep." },
  { icon: Lock, title: "Funder trust", body: "As the methodology is validated and recognized, “measured on the Impact Loop Standard” becomes a credential a grant officer trusts on sight." },
  { icon: Workflow, title: "System of record", body: "The daily logging habit makes Impact Loop where an organization's impact history lives. Switching means abandoning the evidence behind its last three grant reports." },
];

const ImpactStandard = () => {
  useEffect(() => {
    setSEO({
      title: "The Impact Loop Standard — Turn Frontline Impact Into Fundable Data",
      description:
        "The Impact Loop Standard is a documented methodology that turns fifteen-second frontline observations into longitudinal, auditable impact data — so the organizations doing the work can prove it, and funders can trust it.",
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
              Attendance is easy to count. Transformation isn't. The Impact Loop Standard turns
              fifteen-second frontline observations into longitudinal, auditable impact data —
              so the people doing the work can prove it, and the funders backing them can trust it.
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

        {/* PROBLEM → PROMISE */}
        <section className="container mx-auto px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              "We can see they've grown" no longer wins grants.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Funders want outcomes, not activity. But the growth a frontline worker sees every
              day lives in memory and scattered notes — and by reporting season it has collapsed
              into a single unprovable sentence. The Standard exists to fix exactly that, without
              adding an hour of paperwork to an already-stretched team.
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
                A single observation — who, which development pillar, how strong (1–5), the growth
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
        </section>

        {/* THE FORMULA */}
        <section className="bg-[hsl(var(--impact-dark))] py-20 text-white md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/60">
                The engine
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                A formula we're happy to publish
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Because the formula was never the moat. Transparency is the point — every number
                stays auditable.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-7 text-center backdrop-blur">
              <p className="font-serif text-2xl font-bold md:text-3xl">
                PillarScore (0–100) = weighted average of staff ratings (1–5) × 20
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-3">
              {[
                ["Direction weight", "Growth counts fully · neutral counts half · a setback pulls the score down. Honest data, not a feel-good meter."],
                ["Recency weight", "A 30-day half-life: a moment today counts about twice one from a month ago. Scores reflect who the youth is now."],
                ["Growth Rate", "The change versus the same score one quarter ago — the headline funders care about, reproducible from the raw moments."],
              ].map(([t, b]) => (
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
              What makes it defensible
            </p>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Built to survive a funder's scrutiny
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

        {/* OUTPUT QUOTE */}
        <section className="bg-[hsl(var(--impact-cream))] py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <Quote className="mx-auto mb-6 text-primary" size={40} />
            <p className="font-serif text-2xl font-bold leading-relaxed md:text-3xl">
              Numbers and stories, on one page. Funders get the measurable outcome and the human
              moment that proves it — exported on demand.
            </p>
          </div>
        </section>

        {/* THE MOAT */}
        <section className="container mx-auto px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              Why it's an Impact Loop asset
            </p>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Give the formula away. Own the standard.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              A formula is copyable. What compounds — and can't be copied — is built around it.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {moat.map((m, i) => (
              <motion.div
                key={m.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex gap-5 rounded-2xl border border-border bg-background p-7 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <m.icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[hsl(var(--impact-dark))] py-20 text-white md:py-24">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Want to measure transformation, not just attendance?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              We're piloting the Standard with Inner City Outreach in Toronto's Jane &amp; Finch
              community. If your organization needs to turn its impact into fundable evidence,
              let's talk.
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
