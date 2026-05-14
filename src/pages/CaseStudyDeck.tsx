/**
 * CaseStudyDeck — funder-facing portfolio presentation
 *
 * Long-form deck-style page that walks funders, fiscal sponsors, and partner
 * organizations through Impact Loop's signature work, in the Tropicana proposal
 * visual language: hero, combined stats, chapter-style case studies with video,
 * outcomes, gallery, quote, capabilities, CTA.
 *
 * Pulls from src/data/caseStudies.ts so updates flow through automatically.
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  Film,
  Users,
  HeartHandshake,
  Building2,
  Camera,
  Globe2,
  Mail,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import VimeoLightbox from "@/components/shared/VimeoLightbox";
import { setSEO, resetSEO } from "@/lib/seo";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Combined headline stats compiled across all five case studies
const combinedStats = [
  { value: "5", label: "Signature Films", sub: "Documented client engagements" },
  { value: "10+", label: "Cohort Session Videos", sub: "CAFCAN Our People's Keeper" },
  { value: "Multi-org", label: "Delivery Partners", sub: "CAFCAN, Homes First, Christie Refugee, Bartley, Aylesbury, Lakeridge, Black Creek, EmployNext" },
  { value: "3+", label: "Funding Sources Engaged", sub: "Per major film, on average" },
];

// What we bring — capability frame for funders
const capabilities = [
  {
    icon: Film,
    title: "Cinematic documentary storytelling",
    body:
      "Hero films that hold up in front of boards, government, gala rooms, and online audiences simultaneously. Documentary structure, real voices, no manufactured scripts.",
  },
  {
    icon: Camera,
    title: "Production stills + multi-cut asset libraries",
    body:
      "Every engagement produces a usable library — stills, social cuts, donor-outreach edits — not a single deliverable. Your funder, partner, and recruitment pipelines all draw from the same shoot.",
  },
  {
    icon: HeartHandshake,
    title: "Cultural and community grounding",
    body:
      "Black-serving, racialized, and equity-focused community work is the lane we've been in for years. We bring crew that gets it and a process that protects the trust the org has earned.",
  },
  {
    icon: Users,
    title: "Youth cohort integration (Foundation work)",
    body:
      "Through Impact Loop Foundation, eligible projects bring Black and racialized youth on as paid crew. Real credits, real references, a pipeline back into the field.",
  },
  {
    icon: Globe2,
    title: "Multi-audience delivery",
    body:
      "Same story, multiple cuts. Gala master, social cutdown, donor outreach piece, partner recruitment edit. Designed so one shoot does five jobs.",
  },
  {
    icon: Sparkles,
    title: "Optional AI-supported content systems",
    body:
      "For partner orgs that want to extend their storytelling capacity, we offer AI literacy and content-system implementation as a complementary service. Diagnostic-first, never tool-led.",
  },
];

const Hero = () => (
  <section className="relative bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-background py-24 md:py-32 overflow-hidden">
    <div className="container max-w-5xl mx-auto px-6 relative z-10">
      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-6"
      >
        Case Study Deck · For Funders + Partners
      </motion.p>
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.05] mb-8"
      >
        Stories told at the quality{" "}
        <span className="italic text-accent">the work deserves.</span>
      </motion.h1>
      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl opacity-80 leading-relaxed max-w-3xl"
      >
        Impact Loop produces cinematic storytelling for Black-serving and equity-focused community
        organizations across Ontario. Five signature engagements. Documented outcomes. Reusable
        asset libraries that compound in value across funder reporting, partner recruitment, and
        community visibility.
      </motion.p>
    </div>
  </section>
);

const CombinedStats = () => (
  <section className="bg-secondary py-16 md:py-20 border-y border-border">
    <div className="container max-w-6xl mx-auto px-6">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3 text-center"
      >
        Across the Portfolio
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-serif font-bold text-center mb-12 leading-tight"
      >
        Five films. <span className="italic">Multi-fold reuse.</span>
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {combinedStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-card border border-border rounded-lg p-6 text-center"
          >
            <div className="text-4xl md:text-5xl font-serif font-bold text-accent-deep mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">{stat.label}</div>
            <div className="text-xs text-muted-foreground leading-snug">{stat.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ChapterSection = ({ study, index }: { study: CaseStudy; index: number }) => (
  <section
    id={study.slug}
    className={`py-20 md:py-28 ${index % 2 === 0 ? "bg-background" : "bg-secondary/40"}`}
  >
    <div className="container max-w-6xl mx-auto px-6">
      {/* Chapter header */}
      <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
        <div className="md:col-span-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent-deep">
              Chapter 0{index + 1}
            </span>
            <span className="h-px w-12 bg-accent-deep/40" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {study.category} · {study.year}
            </span>
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-3"
          >
            {study.title}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="text-sm md:text-base text-muted-foreground font-medium"
          >
            {study.client}
          </motion.p>
        </div>
        <div className="md:col-span-4">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg italic text-foreground/80 leading-relaxed"
          >
            "{study.tagline}"
          </motion.p>
        </div>
      </div>

      {/* Hero video */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-12 rounded-xl overflow-hidden border border-border shadow-lg aspect-video"
      >
        <VimeoLightbox
          vimeoId={study.heroVimeoId}
          previewStart={study.previewStart}
          title={study.title}
        />
      </motion.div>

      {/* Outcomes grid */}
      {study.theResult.outcomes && study.theResult.outcomes.length > 0 && (
        <div className="grid grid-cols-3 gap-3 md:gap-5 mb-12">
          {study.theResult.outcomes.map((outcome, i) => (
            <motion.div
              key={outcome.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-accent/10 border border-accent/30 rounded-lg p-5 text-center"
            >
              <div className="text-2xl md:text-4xl font-serif font-bold text-accent-deep mb-1">
                {outcome.value}
              </div>
              <div className="text-xs md:text-sm font-medium text-foreground leading-tight">
                {outcome.label}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Problem → Approach → Result */}
      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="text-xs font-bold tracking-[0.22em] uppercase text-accent-deep mb-3">
            The Ask
          </div>
          <h3 className="font-serif text-xl font-semibold leading-snug mb-3">
            {study.theAsk.headline}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {study.theAsk.body}
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          <div className="text-xs font-bold tracking-[0.22em] uppercase text-accent-deep mb-3">
            The Approach
          </div>
          <h3 className="font-serif text-xl font-semibold leading-snug mb-3">
            {study.theApproach.headline}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {study.theApproach.body}
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <div className="text-xs font-bold tracking-[0.22em] uppercase text-accent-deep mb-3">
            The Result
          </div>
          <h3 className="font-serif text-xl font-semibold leading-snug mb-3">
            {study.theResult.headline}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {study.theResult.body}
          </p>
        </motion.div>
      </div>

      {/* Quote */}
      {study.theResult.quote && (
        <motion.figure
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="border-l-4 border-accent-deep pl-6 md:pl-8 py-2 mb-12 max-w-3xl"
        >
          <blockquote className="font-serif text-xl md:text-2xl italic leading-snug text-foreground mb-3">
            "{study.theResult.quote.text}"
          </blockquote>
          <figcaption className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{study.theResult.quote.name}</span>
            {" · "}
            {study.theResult.quote.role}
          </figcaption>
        </motion.figure>
      )}

      {/* Gallery */}
      {study.gallery && study.gallery.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
          {study.gallery.slice(0, 6).map((photo, i) => (
            <motion.figure
              key={photo.src + i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`overflow-hidden rounded-lg border border-border ${
                photo.wide ? "md:col-span-2" : ""
              }`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <figcaption className="px-3 py-2 text-xs text-muted-foreground bg-card border-t border-border">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      )}

      {/* Partners (if any) */}
      {study.partners && study.partners.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="border-t border-border pt-6"
        >
          <div className="text-xs font-bold tracking-[0.22em] uppercase text-accent-deep mb-3">
            Delivery + Funding Partners
          </div>
          <ul className="flex flex-wrap gap-2">
            {study.partners.map((p) => (
              <li
                key={p.name}
                className="text-xs md:text-sm bg-card border border-border rounded-full px-3 py-1.5"
              >
                <span className="font-semibold">{p.name}</span>
                {p.role && <span className="text-muted-foreground"> · {p.role}</span>}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Link to deep dive */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mt-8"
      >
        <Link
          to={`/work/${study.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent-deep hover:gap-3 transition-all"
        >
          Read the full case study <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  </section>
);

const CapabilitiesSection = () => (
  <section className="bg-foreground text-background py-20 md:py-28">
    <div className="container max-w-6xl mx-auto px-6">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4"
      >
        What We Bring
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-12 max-w-3xl"
      >
        The craft and the system{" "}
        <span className="italic text-accent">behind every engagement.</span>
      </motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-background/5 border border-background/15 rounded-lg p-6 hover:bg-background/10 transition-colors"
          >
            <cap.icon className="text-accent mb-4" size={24} />
            <h3 className="font-serif text-xl font-semibold mb-3 leading-tight">{cap.title}</h3>
            <p className="text-sm opacity-75 leading-relaxed">{cap.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="bg-accent/10 py-20 md:py-28">
    <div className="container max-w-3xl mx-auto px-6 text-center">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-6"
      >
        Next Conversation
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-6"
      >
        If your organization is preparing a campaign,{" "}
        <span className="italic">a funding case, or a community moment</span> — let's talk.
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ delay: 0.2 }}
        className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
      >
        Whether you're a foundation looking for a storytelling partner for grantee orgs, a
        community organization with funding in hand, or a fiscal sponsor evaluating a project,
        the next step is a 30-minute conversation. We'll figure out together whether the work
        fits.
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md font-semibold hover:bg-foreground/90 transition-colors"
        >
          Book a discovery call <ArrowRight size={16} />
        </Link>
        <a
          href="mailto:rovonn@impactloop.ca"
          className="inline-flex items-center gap-2 bg-background border border-border px-6 py-3 rounded-md font-semibold hover:bg-secondary transition-colors"
        >
          Email Rovonn directly <Mail size={16} />
        </a>
      </motion.div>
    </div>
  </section>
);

export default function CaseStudyDeck() {
  useEffect(() => {
    setSEO({
      title: "Case Study Deck | Impact Loop",
      description:
        "Funder-facing portfolio of Impact Loop's signature storytelling work for Black-serving and equity-focused community organizations across Ontario.",
      path: "/case-studies",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      <Hero />
      <CombinedStats />
      {caseStudies.map((study, index) => (
        <ChapterSection key={study.slug} study={study} index={index} />
      ))}
      <CapabilitiesSection />
      <FinalCTA />
    </Layout>
  );
}
