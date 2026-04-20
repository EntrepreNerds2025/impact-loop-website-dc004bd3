import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { setSEO, resetSEO } from "@/lib/seo";
import {
  ArrowRight,
  Award,
  Film,
  Music,
  Sparkles,
  Layers,
  Archive,
  Palette,
  Play,
  Users,
  Clapperboard,
  Gem,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import VimeoLightbox from "@/components/shared/VimeoLightbox";
import galaPremierePhoto from "@/assets/signature/gala-premiere.png";
import boardroomFundersPhoto from "@/assets/signature/boardroom-funders.png";
import corporateBrandFilmPhoto from "@/assets/signature/corporate-brand-film.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const deliverables = [
  {
    icon: Film,
    title: "Multi-Location Principal Photography",
    desc: "2–3+ shoot days across your organization\'s most meaningful locations, with a full cinematic crew — DP, camera assistant, sound, gaffer, and production support.",
  },
  {
    icon: Music,
    title: "Original Score & Sound Design",
    desc: "A custom-composed score that carries the emotional arc of your film, paired with broadcast-grade sound design and mix ready for gala playback.",
  },
  {
    icon: Sparkles,
    title: "Broadcast Motion Graphics Package",
    desc: "Animated timelines, data visualization, program maps, and funder reveals built to broadcast standards — not template overlays.",
  },
  {
    icon: Archive,
    title: "Archival Research & Integration",
    desc: "For legacy and anniversary projects: archival footage research, rights clearance, restoration, and seamless integration with newly captured material.",
  },
  {
    icon: Palette,
    title: "Cinema-Grade Color & Finishing",
    desc: "Professional color grading, high-dynamic-range finishing, and a master file set ready for gala projection, broadcast, and large-format display.",
  },
  {
    icon: Layers,
    title: "Multi-Cut Deployment Pack",
    desc: "Gala premiere master plus shorter digital, funder-report, and social cuts engineered for the specific audience and channel of each.",
  },
];

const audiences = [
  "Gala and fundraising centerpiece films",
  "Anniversary milestones (25, 50, 75 years)",
  "Capital campaign launches",
  "Foundation and institutional closings",
  "Board and major-donor cultivation films",
  "Legacy portraits for retiring leaders",
  "Government, UN, and policy-milestone moments",
  "Annual impact reports with cinematic scope",
];

const processSteps = [
  {
    step: "01",
    title: "Discover",
    desc: "An in-depth briefing with leadership, the committee, and key stakeholders. We align on narrative thesis, audience, event context, and the legacy you want this film to leave.",
  },
  {
    step: "02",
    title: "Archive",
    desc: "Archival footage and photo research, interview-subject casting, beneficiary and leadership coordination, location scouting, and rights clearance.",
  },
  {
    step: "03",
    title: "Blueprint",
    desc: "Narrative architecture, emotional-beat mapping, shot lists, storyboards, production schedule, and creative brief — signed off before any camera rolls.",
  },
  {
    step: "04",
    title: "Capture",
    desc: "Multi-location cinematic production with a full creative team. Interviews, B-roll, verite moments, event coverage — captured with the care of a feature documentary.",
  },
  {
    step: "05",
    title: "Compose",
    desc: "An offline edit built around the emotional arc, with parallel tracks for original score composition, motion graphics development, and archival integration.",
  },
  {
    step: "06",
    title: "Finish",
    desc: "Color grading, sound design, music mix, motion graphics polish, and mastering — culminating in a premiere-ready film and a deployment-ready asset library.",
  },
  {
    step: "07",
    title: "Premiere",
    desc: "Technical delivery for your gala or premiere event, plus a strategic rollout plan for the film\'s life after — funder reports, social, partner channels, and year-over-year use.",
  },
];

const signatureWork = [
  {
    title: "CafCan — Our People\'s Keeper",
    category: "Program Launch Film",
    vimeoId: "1143331891",
  },
  {
    title: "Black Creek — Black History Month",
    category: "Event Legacy Film",
    vimeoId: "1174716851",
  },
  {
    title: "Lakeridge Health — I Belong",
    category: "Institutional Initiative",
    vimeoId: "1140641190",
  },
  {
    title: "Hair for Self-Esteem — Muamba Foundation",
    category: "Community Partnership",
    vimeoId: "1135409664",
  },
  {
    title: "EmployNext — Youth Trades Program",
    category: "Program Portrait",
    vimeoId: "1174716942",
  },
  {
    title: "Reddit AI Search Event",
    category: "Event Recap",
    vimeoId: "1168847247",
  },
];

const principles = [
  {
    icon: Clapperboard,
    title: "Every Signature Production is custom-scoped",
    desc: "We don\'t run Signature Productions on packages. Scope, locations, crew size, music, and finishing are all tailored to the moment the film is being made for.",
  },
  {
    icon: Users,
    title: "The team scales with the stakes",
    desc: "A small documentary is one person with a camera. A Signature Production is a full creative team: director, DP, camera assistant, sound, gaffer, composer, motion designer, and colorist — each chosen for the specific project.",
  },
  {
    icon: Gem,
    title: "Built to outlive the event",
    desc: "Signature films are designed to work in the premiere moment AND to keep earning — driving donor renewals, funder conversations, partner trust, and recruitment for years after.",
  },
];

const SignatureProduction = () => {
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);

  useEffect(() => {
    setSEO({
      title: "Signature Productions — Impact Loop",
      description:
        "Flagship cinematic films for galas, anniversaries, capital campaigns, and institutional milestones. Multi-location production, original score, broadcast-grade motion graphics, and cinema finishing — built for the moments that define an organization.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-a-cinematic-shot-of-a-city-skyline-at-sunset-9021/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--impact-dark))]/90 via-[hsl(var(--impact-dark))]/75 to-[hsl(var(--impact-dark))]" />
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 text-[hsl(var(--impact-blue))] font-medium text-xs uppercase tracking-[0.3em] mb-8">
              <Award className="w-4 h-4" />
              <span>Flagship Tier</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              For the Moments that <span className="text-gradient">Define</span> an Organization.
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Signature Productions are multi-location cinematic films built for galas, anniversaries, capital campaigns, and institutional milestones. A full creative team. Original score. Broadcast-grade motion graphics. Designed to live as the definitive film of a defining moment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#signature-work"
                className="btn-primary text-base inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> See Signature Work
              </a>
              <Link
                to="/bookings"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-[hsl(var(--impact-dark))] font-medium px-8 py-3.5 rounded-sm transition-all duration-300 uppercase tracking-widest text-sm"
              >
                Request a Signature Brief
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles strip */}
      <section className="py-20 bg-[hsl(var(--impact-dark))] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {principles.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="text-center md:text-left"
              >
                <item.icon className="w-7 h-7 text-[hsl(var(--impact-blue))] mb-4 mx-auto md:mx-0" />
                <h3 className="font-serif text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial break — Gala Premiere (full-bleed) */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={galaPremierePhoto}
          alt="A Signature Production playing on the big screen at a nonprofit gala premiere"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--impact-dark))]/90 via-[hsl(var(--impact-dark))]/35 to-transparent" />
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-6 pb-14 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                The Premiere Moment
              </p>
              <p className="font-serif text-2xl md:text-3xl text-white leading-snug">
                A full ballroom holds its breath. A Signature Production is the film that plays on the big screen at the defining fundraising moment of your year.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Deliverables
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">
              What a Signature Production Includes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Every Signature Production is custom-scoped, but the elements below are what distinguish this tier from standard documentary work.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {deliverables.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-7 border border-border rounded-md hover:shadow-lg hover:border-[hsl(var(--impact-blue))]/30 transition-all duration-300 bg-white"
              >
                <item.icon className="w-8 h-8 text-[hsl(var(--impact-blue))] mb-4" />
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best For */}
      <section className="py-24 section-cream">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-12"
          >
            <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Use Cases
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">
              Built for Defining Moments
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {audiences.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex items-center gap-4 p-5 bg-background rounded-md border border-border hover:border-[hsl(var(--impact-blue))]/30 transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-[hsl(var(--impact-blue))] flex-shrink-0" />
                <p className="text-foreground font-medium text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Process
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">
              The Seven-Stage Signature Process
            </h2>
          </motion.div>
          <div className="space-y-0">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex gap-6 md:gap-10 py-8 border-b border-border last:border-b-0"
              >
                <span className="font-serif text-4xl md:text-5xl font-bold text-[hsl(var(--impact-blue))]/20 flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial split — After the Premiere (funder boardroom) */}
      <section className="py-24 bg-[hsl(var(--impact-cream))]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <motion.figure
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-xl shadow-lg bg-[hsl(var(--impact-dark))]"
              style={{ aspectRatio: "4 / 5" }}
            >
              <img
                src={boardroomFundersPhoto}
                alt="Executive director presenting a Signature Production to funders in a boardroom"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.figure>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                After the Premiere
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                The film\'s second life is where the return compounds.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Signature Production doesn\'t retire after the gala. The same film is reframed for foundation meetings, government funder presentations, major-donor briefings, and board cultivation — wherever credibility with capital decision-makers matters.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That\'s why every Signature Production ships with a multi-cut deployment pack — gala master, funder-report cut, social cut, and boardroom edit — engineered to keep earning long after the lights come up.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selected Signature Work */}
      <section id="signature-work" className="py-24 section-dark">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Portfolio
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">
              Selected Work
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mt-4">
              A selection of recent cinematic productions for nonprofit, institutional, and community partners.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {signatureWork.map((item, i) => (
              <motion.div
                key={item.vimeoId}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group relative overflow-hidden rounded-xl cursor-pointer bg-[hsl(var(--impact-dark))]"
                style={{ aspectRatio: "2.35 / 1" }}
                onClick={() => setLightboxVideo(item.vimeoId)}
              >
                <iframe
                  src={`https://player.vimeo.com/video/${item.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
                  className="absolute pointer-events-none"
                  style={{
                    border: 0,
                    width: "140%",
                    height: "140%",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  allow="autoplay"
                  title={`${item.title} preview`}
                />
                <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/40 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[hsl(var(--impact-dark))]/90 to-transparent">
                  <span className="text-primary text-xs uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-white mt-1">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="text-center mt-10"
          >
            <Link
              to="/work"
              className="text-white/60 hover:text-white text-sm uppercase tracking-widest transition-colors inline-flex items-center gap-2"
            >
              View Full Portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Editorial split — Partner & Stakeholder Stages (corporate) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="md:order-1 order-2"
            >
              <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                Partner & Stakeholder Stages
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Built for every stage where trust is being earned.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Signature Productions anchor more than a single gala. AGMs, investor days, ESG showcases, sponsor activations, and corporate-partner events all call for films that can hold a full room — and hold up on a big screen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When your nonprofit–corporate partnerships hit the main stage, the story needs to match the production value of the room. That\'s what this tier is built for.
              </p>
            </motion.div>
            <motion.figure
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative overflow-hidden rounded-xl shadow-lg bg-[hsl(var(--impact-dark))] md:order-2 order-1"
              style={{ aspectRatio: "4 / 5" }}
            >
              <img
                src={corporateBrandFilmPhoto}
                alt="A Signature Production on the main stage at a corporate partner event"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.figure>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Investment
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
              Scoped to the Moment
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Signature Productions are custom-scoped, not packaged. Investment levels are shaped by the number of shoot locations, the depth of archival work, the scale of the motion graphics package, the length of the final film, and the premiere context.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Every engagement begins with a Signature Brief — a scoped, written proposal that reflects your specific moment, audience, and deliverables. No templates, no guesswork, no surprises.
            </p>
            <Link to="/bookings" className="btn-primary inline-flex items-center gap-2">
              Request a Signature Brief
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 section-cream">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              A Defining Moment Deserves a Defining Film.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
              Let\'s talk about what you\'re building toward and how a Signature Production can meet the moment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bookings" className="btn-primary">
                Book a Discovery Call
              </Link>
              <Link
                to="/cinematic-impact-films"
                className="bg-transparent border border-[hsl(var(--impact-dark))]/30 text-foreground hover:bg-[hsl(var(--impact-dark))] hover:text-white font-medium px-8 py-3.5 rounded-sm transition-all duration-300 uppercase tracking-widest text-sm"
              >
                See Documentary Tier
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <VimeoLightbox
        vimeoId={lightboxVideo}
        isOpen={!!lightboxVideo}
        onClose={() => setLightboxVideo(null)}
      />
    </Layout>
  );
};

export default SignatureProduction;
