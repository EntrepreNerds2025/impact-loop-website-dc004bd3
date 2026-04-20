import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { setSEO, resetSEO } from "@/lib/seo";
import { ArrowRight, Film, Scissors, Quote, Share2, Layers, Play } from "lucide-react";
import Layout from "@/components/layout/Layout";
import VimeoLightbox from "@/components/shared/VimeoLightbox";
import RotatingWord from "@/components/home/RotatingWord";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const deliverables = [
  { icon: Film, title: "Flagship Impact Film", desc: "60\u2013180 second cinematic documentary capturing real people and real outcomes" },
  { icon: Scissors, title: "Cutdowns Pack", desc: "6\u201312 short-form edits optimized for LinkedIn, Instagram, and social" },
  { icon: Quote, title: "Quote Clips", desc: "Standalone soundbites from interviews, ready for social and presentations" },
  { icon: Share2, title: "Partner-Ready Sharing Kit", desc: "Branded assets, thumbnails, and copy for partners and stakeholders to share" },
  { icon: Layers, title: "Impact Media Hub Add-on", desc: "Optional always-on media hub for ongoing story distribution" },
];

const audiences = [
  "Nonprofit fundraising & donor trust",
  "CSR and partnership storytelling",
  "Program launches & community initiatives",
  "Employer brand & community credibility",
];

const processSteps = [
  { step: "01", title: "Diagnose", desc: "We audit your current story assets and identify the biggest trust gaps." },
  { step: "02", title: "Blueprint", desc: "Story strategy, interview plan, and shot list tailored to your audience." },
  { step: "03", title: "Capture", desc: "On-location documentary filming with real people, real settings, real moments." },
  { step: "04", title: "Produce", desc: "Cinematic editing, color grading, and sound design to broadcast standard." },
  { step: "05", title: "Deploy", desc: "Strategic deployment guidance for stakeholders, partners, and platforms." },
];

const selectedWork = [
  { title: "EmployNext \u2014 Youth Trades Program", category: "Program Highlight", vimeoId: "1174716942" },
  { title: "Black Creek \u2014 Black History Month", category: "Event Recap", vimeoId: "1174716851" },
  { title: "Hair for Self-Esteem", category: "Impact Story", vimeoId: "1135409664" },
  { title: "CafCan \u2014 Our People's Keeper", category: "Program Highlight", vimeoId: "1143331891" },
  { title: "Lakeridge Health \u2014 I Belong", category: "Initiative", vimeoId: "1140641190" },
  { title: "Reddit AI Search Event", category: "Event Recap", vimeoId: "1168847247" },
];

const CinematicImpactFilms = () => {
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);

  useEffect(() => {
    setSEO({
      title: "Cinematic Impact Films \u2014 Impact Loop",
      description: "Premium documentary-style video production for nonprofits, CSR teams, and changemakers. Films built to earn trust with donors, partners, and stakeholders.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      {/* Hero with video banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-aerial-view-of-city-at-night-2559/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--impact-dark))]/85 via-[hsl(var(--impact-dark))]/70 to-[hsl(var(--impact-dark))]" />
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-[hsl(var(--impact-blue))] font-medium text-sm uppercase tracking-widest mb-6">
              Premium Video Production
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Stories that Move{" "}<RotatingWord />{" "}Forward.
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Cinematic, documentary-style films that capture real people and real outcomes, built to earn trust with donors, partners, employees, and stakeholders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#selected-work"
                className="btn-primary text-base inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> See Our Work
              </a>
              <Link
                to="/bookings"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-[hsl(var(--impact-dark))] font-medium px-8 py-3.5 rounded-sm transition-all duration-300 uppercase tracking-widest text-sm"
              >
                Book a Storytelling Diagnostic
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
            <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">Deliverables</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">What You Get</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {deliverables.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-6 border border-border rounded-md hover:shadow-lg transition-shadow duration-300"
              >
                <item.icon className="w-8 h-8 text-[hsl(var(--impact-blue))] mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best For */}
      <section className="py-24 section-cream">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-12">
            <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">Audience</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">Best For</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {audiences.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex items-center gap-4 p-6 bg-background rounded-md border border-border"
              >
                <ArrowRight className="w-5 h-5 text-[hsl(var(--impact-blue))] flex-shrink-0" />
                <p className="text-foreground font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
            <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">Process</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">How It Works</h2>
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
                <span className="font-serif text-4xl md:text-5xl font-bold text-[hsl(var(--impact-blue))]/20 flex-shrink-0">{item.step}</span>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work, Vimeo autoplay previews */}
      <section id="selected-work" className="py-24 section-dark">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
            <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">Portfolio</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">Selected Work</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {selectedWork.map((item, i) => (
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
                {/* Vimeo background embed, autoplay, looped, muted */}
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

                {/* Overlay */}
                <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/40 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="white" />
                  </div>
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[hsl(var(--impact-dark))]/90 to-transparent">
                  <span className="text-primary text-xs uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-serif text-base font-semibold text-white mt-1">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} className="text-center mt-10">
            <Link to="/work" className="text-white/60 hover:text-white text-sm uppercase tracking-widest transition-colors inline-flex items-center gap-2">
              View Full Portfolio
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
              Ready to Tell Your Story?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
              Start with a Storytelling Diagnostic. We'll audit your current story assets and map the fastest path to trust.
            </p>
            <Link to="/bookings" className="btn-primary">
              Book a Storytelling Diagnostic
            </Link>
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

export default CinematicImpactFilms;
