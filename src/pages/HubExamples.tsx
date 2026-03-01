import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import { slideUp, staggerContainer, fadeIn } from "@/hooks/useScrollAnimation";

const hubs = [
  {
    title: "CAFCan Our People's Keeper Employment Program",
    type: "Nonprofit / Program",
    description: "A media-first hub showcasing employment pathways, wellness supports, and community momentum for an Indigenous-led workforce initiative.",
    link: "/hub/demo",
  },
  {
    title: "Northfield Tech Community Investment Hub 2025",
    type: "Corporate / CSR",
    description: "A corporate community investment hub highlighting partner impact, volunteer engagement, and social responsibility outcomes.",
    link: "/hub/corporate-demo",
  },
];

const HubExamples = () => {
  useEffect(() => {
    setSEO({
      title: "Hub Examples — Impact Loop",
      description: "Explore demo Impact Media Hubs built for nonprofits and corporate CSR initiatives.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.p variants={fadeIn} initial="hidden" animate="visible" className="text-impact-blue uppercase tracking-widest text-sm mb-4">
            Hub Examples
          </motion.p>
          <motion.h1 variants={slideUp} initial="hidden" animate="visible" className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            See It in Action
          </motion.h1>
          <motion.p variants={slideUp} initial="hidden" animate="visible" className="text-white/60 text-lg">
            Explore demo hubs built for different sectors and use cases.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hubs.map((hub) => (
              <motion.div key={hub.title} variants={slideUp} className="bg-card border border-border rounded-sm overflow-hidden flex flex-col">
                <div className="bg-impact-dark p-6">
                  <span className="inline-block bg-impact-blue/20 text-impact-blue text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-3">
                    {hub.type}
                  </span>
                  <h3 className="font-serif text-xl text-white font-semibold">{hub.title}</h3>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-muted-foreground text-sm mb-6 flex-1">{hub.description}</p>
                  <Link to={hub.link} className="btn-primary text-center">
                    View Hub
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-cream py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">Want your own?</h2>
          <p className="text-muted-foreground mb-6">Let's build a media hub for your initiative.</p>
          <Link to="/bookings" className="btn-primary">Book a Story Call</Link>
        </div>
      </section>
    </Layout>
  );
};

export default HubExamples;
