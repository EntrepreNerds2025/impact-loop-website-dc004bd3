import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Film, Scissors, Quote, Share2, Layers, Play } from "lucide-react";
import Layout from "@/components/layout/Layout";
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
  { icon: Film, title: "Flagship Impact Film", desc: "60–180 second cinematic documentary capturing real people and real outcomes" },
  { icon: Scissors, title: "Cutdowns Pack", desc: "6–12 short-form edits optimized for LinkedIn, Instagram, and social" },
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

const portfolioItems = [
  { title: "Impact Story", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80" },
  { title: "Program Highlight", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80" },
  { title: "Partner Story", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80" },
  { title: "Event Recap", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
  { title: "Testimonial", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80" },
  { title: "Community Initiative", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80" },
];

const CinematicImpactFilms = () => {
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
              Cinematic, documentary-style films that capture real people and real outcomes — built to earn trust with donors, partners, employees, and stakeholders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#reel"
                className="btn-primary text-base inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> Watch the Reel
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

      {/* Reel Preview */}
      <section id="reel" className="py-24 bg-[hsl(var(--impact-dark))]">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">The Reel</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Documentary, cinematic, human-first. Every frame tells a story rooted in real outcomes.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
            <div className="aspect-video bg-[hsl(var(--impact-dark-lighter))] rounded-md border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-white/40 text-sm">Reel video — embed your Vimeo or YouTube link here</p>
              </div>
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

      {/* Portfolio Preview */}
      <section className="py-24 section-dark">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-16">
            <p className="text-[hsl(var(--impact-blue))] text-xs font-semibold tracking-[0.3em] uppercase mb-4">Portfolio</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">Selected Work</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {portfolioItems.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group relative aspect-video rounded-md overflow-hidden cursor-pointer"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} className="text-center mt-10">
            <Link to="/work" className="text-white/60 hover:text-white text-sm uppercase tracking-widest transition-colors">
              View Full Portfolio →
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#reel" className="btn-primary inline-flex items-center gap-2">
                <Play className="w-4 h-4" /> Watch the Reel
              </a>
              <Link to="/bookings" className="btn-secondary">
                Book a Storytelling Diagnostic
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CinematicImpactFilms;
