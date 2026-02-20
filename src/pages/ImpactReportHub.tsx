import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, FileDown, Images, Handshake, Search, Pencil, Rocket, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { slideUp, staggerContainer, fadeIn } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const includes = [
  { icon: Globe, title: "Interactive Web Hub", desc: "A branded, shareable page with stories, outcomes, and media your stakeholders can explore anytime." },
  { icon: FileDown, title: "PDF Export", desc: "A polished downloadable report for board meetings, grant applications, and offline sharing." },
  { icon: Images, title: "Media Appendix", desc: "Photos, quotes, video links, and partner assets — organized, captioned, and ready to share." },
  { icon: Handshake, title: "Partner Kit", desc: "Pre-built captions, thumbnails, and talking points so partners can amplify your story effortlessly." },
];

const audiences = [
  { title: "Nonprofits", desc: "Show funders and communities the real impact of your programs with dignity-first storytelling." },
  { title: "CSR Teams", desc: "Give your corporate social responsibility initiatives the proof and polish they deserve." },
  { title: "Partnerships", desc: "Equip partners with ready-to-share assets that make co-promotion seamless." },
  { title: "Workforce & Community Impact", desc: "Document training outcomes, employment placements, and community events with credibility." },
];

const steps = [
  { num: "01", icon: Search, title: "Diagnose", desc: "We audit your existing materials and identify the strongest stories and data points." },
  { num: "02", icon: Pencil, title: "Blueprint", desc: "We map the hub structure, content flow, and design direction together." },
  { num: "03", icon: Globe, title: "Build Hub", desc: "We produce the stories, design the hub, and populate every section." },
  { num: "04", icon: Rocket, title: "Deploy", desc: "Your hub goes live. We hand off partner kits and train your team to share it." },
];

const faqs = [
  { q: "What's included in a Digital Impact Report Hub?", a: "Every hub includes an interactive web page, downloadable PDF report, media appendix with photos/quotes/videos, and a partner kit with pre-built sharing assets." },
  { q: "How do the video stories work?", a: "We produce short cinematic stories featuring real participants. These are embedded directly in your hub as YouTube or Vimeo videos and can be shared independently." },
  { q: "Can we embed YouTube or Vimeo videos?", a: "Yes. Hubs support YouTube and Vimeo embeds natively. You can also link to external video platforms if needed." },
  { q: "How is proof and credibility shown?", a: "Through a combination of participant stories, quantitative outcome metrics, partner endorsements, and a transparent financial snapshot — all presented with consent-first ethics." },
  { q: "Can we update the hub quarterly?", a: "Absolutely. Hubs are designed to be living documents. We include a quarterly updates section and can add new stories, metrics, and media each quarter." },
  { q: "How long does the process take?", a: "A typical hub takes 4–6 weeks from kickoff to launch, depending on the number of stories and complexity of data. Rush timelines are available." },
];

const ImpactReportHub = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-dark pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.p variants={fadeIn} initial="hidden" animate="visible" className="text-impact-blue uppercase tracking-widest text-sm mb-4">
            Digital Impact Report Hub
          </motion.p>
          <motion.h1 variants={slideUp} initial="hidden" animate="visible" className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            A living impact report built to earn trust
          </motion.h1>
          <motion.p variants={slideUp} initial="hidden" animate="visible" className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Combine cinematic stories, real outcomes, and partner assets into one shareable web hub — designed for nonprofits, CSR teams, and changemakers.
          </motion.p>
          <motion.div variants={slideUp} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-4">
            <Link to="/hub/demo" className="btn-primary">View Example Hub</Link>
            <Link to="/bookings" className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-impact-dark">Book a Story Call</Link>
          </motion.div>
        </div>
      </section>

      {/* What It Includes */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.h2 variants={slideUp} className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">What's Included</motion.h2>
            <motion.p variants={slideUp} className="text-muted-foreground max-w-xl mx-auto">Everything you need to turn your impact into a trusted, shareable narrative.</motion.p>
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
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <p className="text-white/60 mb-10">Let's turn your impact into a living, shareable story.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/hub/demo" className="btn-primary">View Example Hub</Link>
            <Link to="/bookings" className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-impact-dark">Book a Story Call</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ImpactReportHub;
