import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-16 mb-6">{children}</h2>
);

const Pullquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-4 border-[hsl(var(--impact-blue))] pl-6 py-2 my-10 text-xl md:text-2xl font-serif italic text-muted-foreground leading-relaxed">
    {children}
  </blockquote>
);

const StatCard = ({ stat, label }: { stat: string; label: string }) => (
  <div className="text-center p-6">
    <p className="font-serif text-4xl md:text-5xl font-bold text-[hsl(var(--impact-blue))]">{stat}</p>
    <p className="text-muted-foreground text-sm mt-2 uppercase tracking-wider">{label}</p>
  </div>
);

const ReportMetricsThatMatter = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end section-dark overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--impact-dark))] via-[hsl(var(--impact-dark))]/70 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-16 pt-32">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Research
          </Link>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase block mb-4"
          >
            Measurement
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-[1.1]"
          >
            The Metrics That Matter Report 2026
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-white/60 max-w-2xl text-lg"
          >
            Why impressions don't equal impact. A guide to measuring what matters in social impact communications.
          </motion.p>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Intro */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              The social impact sector has a measurement problem. Organizations spend millions creating content, campaigns, and communications—then evaluate success using the same vanity metrics borrowed from consumer marketing. Impressions, likes, and follower counts dominate reports, while the metrics that actually indicate behavior change, trust, and lasting impact remain invisible.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              This report challenges the status quo. Drawing on interviews with 40+ nonprofit communications leaders, analysis of 200+ impact reports, and proprietary research from the Impact Loop team, we present a new framework for measuring what matters.
            </p>
          </motion.div>

          <Pullquote>
            "We were celebrating a video that got 2 million views. Then we realized none of our target audience—policymakers in East Africa—had seen it."
          </Pullquote>

          {/* Stats row */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="grid grid-cols-3 gap-4 my-12 py-8 border-y border-border"
          >
            <StatCard stat="87%" label="of nonprofits track impressions" />
            <StatCard stat="12%" label="track behavior change" />
            <StatCard stat="3%" label="tie media to outcomes" />
          </motion.div>

          {/* Section 1 */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
            <SectionHeading>The Vanity Trap</SectionHeading>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Vanity metrics aren't inherently bad—they measure reach, which has its place. The problem arises when organizations mistake reach for resonance. A post with 500,000 impressions may have changed zero minds. A video with 200 views may have directly influenced a funder to write a $2M check.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The trap is structural. Social platforms optimize for engagement, not impact. Analytics dashboards default to showing what's easy to count. And communications teams, under pressure to justify budgets, report what looks impressive rather than what's meaningful.
            </p>
          </motion.div>

          {/* Full-width image break */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="my-12 -mx-6 md:-mx-12"
          >
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
              alt="Data dashboard showing analytics"
              className="w-full h-64 md:h-96 object-cover rounded-sm"
            />
            <p className="text-xs text-muted-foreground mt-3 px-6 md:px-12 italic">
              Traditional dashboards prioritize volume over value—measuring what's easy, not what matters.
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}>
            <SectionHeading>The Impact Measurement Framework</SectionHeading>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We propose a three-tier framework that moves organizations from counting outputs to measuring outcomes:
            </p>

            <div className="space-y-8 my-8">
              <div className="border-l-2 border-[hsl(var(--impact-blue))]/30 pl-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Tier 1: Attention Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Move beyond raw views to measure watch-through rates, scroll depth, and time spent. A two-minute documentary watch is worth more than 10,000 scroll-past impressions. Track who is watching, not just how many.
                </p>
              </div>
              <div className="border-l-2 border-[hsl(var(--impact-blue))]/60 pl-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Tier 2: Narrative Shift</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Measure whether your communications are changing the conversation. Track media mentions, stakeholder language adoption, and sentiment shifts over time. Are people using your framing when they talk about the issue?
                </p>
              </div>
              <div className="border-l-2 border-[hsl(var(--impact-blue))] pl-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Tier 3: Behavior & Decision Change</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The ultimate measure: did your media drive action? Track policy changes influenced, funding decisions connected to your content, partnership inquiries sourced from campaigns, and community-reported behavior shifts.
                </p>
              </div>
            </div>
          </motion.div>

          <Pullquote>
            "The organizations doing the most important work often have the worst metrics—because they're measuring the wrong things."
          </Pullquote>

          {/* Section 3 */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={5}>
            <SectionHeading>Case Study: From Views to Votes</SectionHeading>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A regional environmental nonprofit was producing documentary content that consistently performed well on social media—hundreds of thousands of views, strong engagement rates. But their advocacy goals weren't advancing. Policy positions remained unchanged.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              When they shifted to Tier 2 and Tier 3 measurement, the strategy changed entirely. Instead of optimizing for shareability, they created shorter, data-rich video briefs targeted specifically at legislative staff. Views dropped 90%. But within six months, three key policy provisions were adopted, directly traceable to the media their team produced.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The lesson: fewer eyeballs, more impact.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
            className="my-12 -mx-6 md:-mx-12"
          >
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80"
              alt="Team collaborating on strategy"
              className="w-full h-64 md:h-96 object-cover rounded-sm"
            />
            <p className="text-xs text-muted-foreground mt-3 px-6 md:px-12 italic">
              Effective measurement starts with aligning media strategy to mission outcomes, not platform algorithms.
            </p>
          </motion.div>

          {/* Section 4 */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={7}>
            <SectionHeading>Five Principles for Impact Measurement</SectionHeading>
            <div className="space-y-6">
              <div>
                <h3 className="font-sans font-semibold text-foreground mb-1">1. Measure the audience that matters, not the biggest audience</h3>
                <p className="text-muted-foreground leading-relaxed">100 policymakers watching your documentary matters more than 100,000 random viewers. Define your target audience before you define success metrics.</p>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-foreground mb-1">2. Track narrative adoption, not just sentiment</h3>
                <p className="text-muted-foreground leading-relaxed">Positive sentiment is nice. But when stakeholders start using your language and framing unprompted, that's narrative shift—and it's far more valuable.</p>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-foreground mb-1">3. Connect media touchpoints to decisions</h3>
                <p className="text-muted-foreground leading-relaxed">Build attribution into your workflow. Ask funders what they saw. Survey partners about content influence. Create direct lines from media to outcomes.</p>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-foreground mb-1">4. Report honestly, even when numbers are small</h3>
                <p className="text-muted-foreground leading-relaxed">A report that says "our video reached 200 legislative staff and influenced 3 policy provisions" is more credible than "our campaign generated 5 million impressions."</p>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-foreground mb-1">5. Invest in longitudinal tracking</h3>
                <p className="text-muted-foreground leading-relaxed">Impact communications work over months and years, not days. Build measurement systems that track narrative and behavior change over extended periods.</p>
              </div>
            </div>
          </motion.div>

          {/* Closing */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={8}>
            <SectionHeading>What Comes Next</SectionHeading>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The shift from vanity metrics to impact metrics isn't just a measurement upgrade—it's a strategic transformation. When organizations measure what matters, they make better content, reach more relevant audiences, and can demonstrate genuine impact to funders and stakeholders.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The tools exist. The frameworks are emerging. What's needed now is the courage to let go of big numbers in favor of meaningful ones.
            </p>
          </motion.div>

          <Pullquote>
            "The future of impact communications isn't louder. It's more precise."
          </Pullquote>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="py-24 section-dark text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Measure What Matters?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Let's build a measurement framework that connects your media to real-world outcomes.
            </p>
            <Link to="/bookings" className="btn-primary">
              Book a Strategy Call
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ReportMetricsThatMatter;
