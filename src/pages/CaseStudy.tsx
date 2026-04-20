import { useEffect, useState, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Player from "@vimeo/player";
import { Play, ArrowRight, ArrowLeft, CheckCircle2, Quote as QuoteIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import VimeoLightbox from "@/components/shared/VimeoLightbox";
import { setSEO, resetSEO } from "@/lib/seo";
import { slideUp, fadeIn, staggerContainer } from "@/hooks/useScrollAnimation";
import { getCaseStudy, getRelatedCaseStudies, type CaseStudy as CaseStudyType } from "@/data/caseStudies";

/* ─── Reusable animated section ─── */
const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Hero Video (looping preview, click to expand) ─── */
const HeroVideo = ({
  vimeoId,
  previewStart = 0,
  title,
  onPlay,
}: {
  vimeoId: string;
  previewStart?: number;
  title: string;
  onPlay: () => void;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const player = new Player(iframe);
    const LOOP_START = previewStart;
    const LOOP_END = LOOP_START + 12;

    player.setCurrentTime(LOOP_START);
    const handleTimeUpdate = (data: { seconds: number }) => {
      if (data.seconds >= LOOP_END) player.setCurrentTime(LOOP_START);
    };
    player.on("timeupdate", handleTimeUpdate);
    return () => {
      player.off("timeupdate", handleTimeUpdate);
    };
  }, [previewStart]);

  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer bg-[hsl(var(--impact-dark))] shadow-2xl"
      style={{ aspectRatio: "16 / 9" }}
      onClick={onPlay}
    >
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
        className="absolute pointer-events-none"
        style={{ border: 0, width: "140%", height: "140%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        allow="autoplay"
        title={`${title} preview`}
      />
      <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/30 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-20 h-20 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-8 h-8 text-primary-foreground ml-1" fill="white" />
        </div>
      </div>
    </div>
  );
};

/* ─── Main Case Study Page ─── */
const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;
  const related = slug ? getRelatedCaseStudies(slug) : [];
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);

  useEffect(() => {
    if (study) {
      setSEO({
        title: `${study.title} — Impact Loop Case Study`,
        description: study.tagline,
        ogType: "article",
      });
    }
    return resetSEO;
  }, [study]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!study) {
    return <Navigate to="/work" replace />;
  }

  return (
    <Layout>
      {/* ─── Hero ─── */}
      <section className="pt-32 pb-12 bg-impact-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Work
            </Link>
            <p className="text-primary font-medium text-xs uppercase tracking-widest mb-4">
              {study.category} • {study.year}
            </p>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {study.title}
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl">
              {study.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">Client</p>
                <p className="text-white/90">{study.client}</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">Category</p>
                <p className="text-white/90">{study.category}</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">Year</p>
                <p className="text-white/90">{study.year}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Hero Video ─── */}
      <section className="pb-20 bg-impact-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <HeroVideo
              vimeoId={study.heroVimeoId}
              previewStart={study.previewStart}
              title={study.title}
              onPlay={() => setLightboxVideo(study.heroVimeoId)}
            />
            <p className="text-white/40 text-sm text-center mt-4">Click to watch the full film.</p>
          </div>
        </div>
      </section>

      {/* ─── Overview ─── */}
      <section className="py-20 bg-[hsl(var(--impact-cream))]">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSection>
            <p className="text-impact-blue uppercase tracking-widest text-xs mb-4 text-center">Overview</p>
            <p className="text-foreground text-lg md:text-xl leading-relaxed text-center">
              {study.overview}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── The Ask ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <AnimatedSection className="lg:col-span-4">
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">01 • The Ask</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {study.theAsk.headline}
              </h2>
            </AnimatedSection>
            <AnimatedSection className="lg:col-span-8">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
                {study.theAsk.body}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── The Approach ─── */}
      <section className="py-24 section-dark border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <AnimatedSection className="lg:col-span-4">
              <p className="text-impact-blue text-xs font-semibold uppercase tracking-widest mb-3">02 • Our Approach</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
                {study.theApproach.headline}
              </h2>
            </AnimatedSection>
            <AnimatedSection className="lg:col-span-8">
              <p className="text-white/70 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {study.theApproach.body}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── The Process ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="mb-12 max-w-2xl">
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">03 • The Process</p>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground leading-tight">
                How we built the piece, step by step.
              </h2>
            </AnimatedSection>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {study.theProcess.map((step, idx) => (
                <motion.div
                  key={step.title}
                  variants={slideUp}
                  className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start p-6 md:p-8 bg-card border border-border rounded-xl"
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-serif text-xl md:text-2xl font-bold text-primary">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg md:text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── The Deliverables ─── */}
      <section className="py-24 bg-[hsl(var(--impact-cream))]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="mb-12 max-w-2xl">
              <p className="text-impact-blue text-xs font-semibold uppercase tracking-widest mb-3">04 • The Deliverables</p>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground leading-tight">
                Everything the engagement produced.
              </h2>
            </AnimatedSection>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              {study.theDeliverables.map((d) => (
                <motion.div
                  key={d.title}
                  variants={slideUp}
                  className="flex items-start gap-4 p-6 bg-white border border-border rounded-xl"
                >
                  <CheckCircle2 className="w-6 h-6 text-impact-blue shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">{d.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{d.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Editorial accent photo (single, tasteful break) ─── */}
      {study.gallery && study.gallery.length > 0 && (
        <section className="bg-background">
          <div className="container mx-auto px-6 py-16">
            <div className="max-w-6xl mx-auto">
              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className="group relative overflow-hidden rounded-xl bg-[hsl(var(--impact-dark))] shadow-lg"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={study.gallery[0].src}
                  alt={study.gallery[0].caption}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--impact-dark))]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-white/90 text-sm md:text-base font-medium">
                  {study.gallery[0].caption}
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </section>
      )}

      {/* ─── The Result ─── */}
      <section className="py-24 section-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
              <AnimatedSection className="lg:col-span-4">
                <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">05 • The Result</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
                  {study.theResult.headline}
                </h2>
              </AnimatedSection>
              <AnimatedSection className="lg:col-span-8">
                <p className="text-white/70 text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {study.theResult.body}
                </p>
              </AnimatedSection>
            </div>

            {/* Outcomes grid */}
            <AnimatedSection>
              <div className={`grid grid-cols-2 md:grid-cols-3 ${study.theResult.outcomes.length > 3 ? "lg:grid-cols-6" : ""} gap-4 md:gap-6 mb-12`}>
                {study.theResult.outcomes.map((o) => (
                  <div key={o.label} className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 text-center">
                    <p className="font-serif text-2xl md:text-4xl font-bold text-impact-blue">{o.value}</p>
                    <p className="text-white/60 text-[11px] md:text-xs mt-2 leading-tight">{o.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Pull quote */}
            {study.theResult.quote && (
              <AnimatedSection>
                <div className="max-w-3xl mx-auto bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 relative">
                  <QuoteIcon className="absolute top-6 left-6 w-8 h-8 text-impact-blue/40" />
                  <p className="font-serif text-xl md:text-2xl text-white leading-relaxed italic mb-6 pl-10">
                    "{study.theResult.quote.text}"
                  </p>
                  <div className="pl-10">
                    <p className="text-white font-semibold text-sm">{study.theResult.quote.name}</p>
                    <p className="text-white/50 text-xs">{study.theResult.quote.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* ─── Partners ─── */}
      {study.partners && study.partners.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection className="mb-12 text-center">
                <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Partners</p>
                <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground leading-tight">
                  Built in collaboration.
                </h2>
              </AnimatedSection>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {study.partners.map((p) => (
                  <motion.div
                    key={p.name}
                    variants={slideUp}
                    className="bg-card border border-border rounded-xl p-5 md:p-6"
                  >
                    <p className="font-serif text-base md:text-lg font-bold text-foreground mb-1">{p.name}</p>
                    {p.role && <p className="text-muted-foreground text-sm">{p.role}</p>}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Optional Hub link ─── */}
      {study.hubLink && (
        <section className="py-16 bg-[hsl(var(--impact-cream))] border-t border-border">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <AnimatedSection>
              <p className="text-impact-blue text-xs font-semibold uppercase tracking-widest mb-3">Related</p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Explore the full media library
              </h3>
              <p className="text-muted-foreground mb-6">
                The full video clips, photo galleries, testimonials, and partner spotlights live on the Impact Media Hub page for this project.
              </p>
              <Link
                to={study.hubLink}
                className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors duration-300 font-medium"
              >
                Visit the Impact Media Hub
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ─── Related Case Studies ─── */}
      {related.length > 0 && (
        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection className="mb-12">
                <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">More Case Studies</p>
                <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground leading-tight">
                  See what else we've built.
                </h2>
              </AnimatedSection>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {related.map((r) => (
                  <motion.div key={r.slug} variants={slideUp}>
                    <Link
                      to={`/work/${r.slug}`}
                      className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors duration-300"
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                        <iframe
                          src={`https://player.vimeo.com/video/${r.heroVimeoId}?background=1&autoplay=1&loop=1&muted=1`}
                          className="absolute pointer-events-none"
                          style={{ border: 0, width: "140%", height: "140%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                          allow="autoplay"
                          title={`${r.title} preview`}
                        />
                        <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/30 group-hover:bg-[hsl(var(--impact-dark))]/50 transition-colors duration-300" />
                      </div>
                      <div className="p-6">
                        <p className="text-primary text-xs uppercase tracking-widest mb-2">{r.category}</p>
                        <h3 className="font-serif text-lg md:text-xl font-bold text-foreground mb-2">{r.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{r.tagline}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="py-20 section-purple">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Ready to build a story asset like this one?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Every film in our portfolio started with a conversation about what needed to be proven, to whom, and why it mattered. Book a call to have that conversation about your organization.
          </p>
          <Link to="/bookings" className="btn-secondary">
            Book a Discovery Call
          </Link>
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

export default CaseStudy;
