import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { setSEO, resetSEO } from "@/lib/seo";
import { Globe, FileDown, Images, Handshake, Search, Pencil, Rocket, ChevronRight, Video, Quote, BarChart3 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { slideUp, staggerContainer, fadeIn } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const includes = [
  { icon: Globe, title: "Overview & Context", desc: "A branded hero section with your initiative brief, who/what/when/where, and call-to-action." },
  { icon: Video, title: "Hero Video & Clips", desc: "A cinematic hero video plus individual clips, embedded from YouTube or Vimeo." },
  { icon: Images, title: "Photo Gallery", desc: "Upload and manage photos with captions. Lightbox viewing. Easy bulk upload." },
  { icon: Quote, title: "Quotes & Voices", desc: "Participant, partner, and staff quotes with role labels, real voices woven in." },
  { icon: Handshake, title: "Partners & Presenters", desc: "Logo tiles, spotlight cards, and a partner sharing kit, ready for co-promotion." },
  { icon: BarChart3, title: "Quick Outcomes", desc: "A small metrics panel showing 4-6 key outcome numbers at a glance." },
  { icon: FileDown, title: "PDF Export", desc: "A polished downloadable report for board meetings and grant applications." },
];

const audiences = [
  { title: "Nonprofits", desc: "Show funders and communities the real impact of your programs with dignity-first storytelling." },
  { title: "CSR Teams", desc: "Give your corporate social responsibility initiatives the proof and polish they deserve." },
  { title: "Partnerships", desc: "Equip partners with ready-to-share assets that make co-promotion seamless." },
];

const steps = [
  { num: "01", icon: Search, title: "Diagnose", desc: "We audit your existing materials and identify the strongest stories and data points." },
  { num: "02", icon: Pencil, title: "Blueprint", desc: "We map the hub structure, content flow, and design direction together." },
  { num: "03", icon: Globe, title: "Produce", desc: "We produce the stories, shoot the media, and populate every section." },
  { num: "04", icon: Rocket, title: "Deploy", desc: "Your hub goes live. We hand off partner kits and train your team to share it." },
];

const faqs = [
  { q: "What is an Impact Media Hub?", a: "It's a shareable, story-first web page built for your program, event, campaign, or partnership. It combines video, photos, quotes, partner context, and outcomes into one polished, media-first experience." },
  { q: "How is this different from a traditional impact report?", a: "Traditional reports are static PDFs. A Media Hub is a living, interactive web page with embedded video, photo galleries, and partner sharing tools, designed to be explored and shared, not just filed away." },
  { q: "Can I upload my own photos?", a: "Yes. When you're logged in, a bulk photo uploader appears directly on your hub page. Drag and drop or browse to add images, they're stored securely and display in a gallery with lightbox viewing." },
  { q: "Can we embed YouTube or Vimeo videos?", a: "Yes. Hubs support YouTube and Vimeo embeds natively. Your hero video and individual clips are embedded directly in the page." },
  { q: "Who manages the hub after launch?", a: "You do. Photos can be uploaded anytime. For content updates (quotes, partners, outcomes), we can do quarterly refreshes or hand off the keys." },
  { q: "How long does the process take?", a: "A typical hub takes 4–6 weeks from kickoff to launch, depending on the number of stories and complexity of media. Rush timelines are available." },
];

const ImpactMediaHub = () => {
  useEffect(() => {
    setSEO({
      title: "Impact Media Hub: Impact Loop",
      description: "A media-first hub combining cinematic stories, photos, quotes, and outcomes into one shareable page for nonprofits and CSR teams.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-dark pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.p variants={fadeIn} initial="hidden" animate="visible" className="text-impact-blue uppercase tracking-widest text-sm mb-4">
            Impact Media Hub
          </motion.p>
          <motion.h1 variants={slideUp} initial="hidden" animate="visible" className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            A media-first hub built to earn trust
          </motion.h1>
          <motion.p variants={slideUp} initial="hidden" animate="visible" className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Combine cinematic stories, real outcomes, photos, quotes, and partner assets into one shareable web page, designed for nonprofits, CSR teams, and changemakers.
          </motion.p>
          <motion.div variants={slideUp} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-4">
            <Link to="/hub/black-creek-bhm" className="btn-primary">View Example Hub</Link>
            <Link to="/hub/black-creek-bhm" className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-impact-dark">View Black Creek Demo</Link>
          </motion.div>
        </div>
      </section>

      {/* What It Includes */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.h2 variants={slideUp} className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">What's Included</motion.h2>
            <motion.p variants={slideUp} className="text-muted-foreground max-w-xl mx-auto">Everything you need to turn your impact into a trusted, shareable media page.</motion.p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {includes.map((item) => (
              <motion.div key={item.title} variants={slideUp} className="bg-card border border-border rounded-sm p-8 text-center space-y-4">
                <item.icon className="w-10 h-10 text-impact-blue mx-auto" />
                <h3 className="font-serif text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-cream py-24">
        <div className="container mx-auto px-6">
          <motion.h2 variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-16 text-center">
            Who It's For
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audiences.map((a) => (
              <motion.div key={a.title} variants={slideUp} className="bg-background border border-border rounded-sm p-8 space-y-3">
                <h3 className="font-serif text-xl font-semibold text-foreground">{a.title}</h3>
                <p className="text-muted-foreground text-sm">{a.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.h2 variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-16 text-center">
            How It Works
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={slideUp} className="relative text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-impact-blue/10 flex items-center justify-center mx-auto">
                  <s.icon className="w-7 h-7 text-impact-blue" />
                </div>
                <p className="text-impact-blue font-semibold text-xs uppercase tracking-widest">{s.num}</p>
                <h3 className="font-serif text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-8 -right-4 w-6 h-6 text-border" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-cream py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2 variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">
            Frequently Asked Questions
          </motion.h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background border border-border rounded-sm px-6">
                <AccordionTrigger className="font-serif text-lg text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-dark py-24">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Ready to build your hub?</h2>
          <p className="text-white/60 mb-10">Let's turn your impact into a living, shareable media page.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/bookings" className="btn-primary">Book a Story Call</Link>
            <Link to="/hub/black-creek-bhm" className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-impact-dark">View Example Hub</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ImpactMediaHub;
