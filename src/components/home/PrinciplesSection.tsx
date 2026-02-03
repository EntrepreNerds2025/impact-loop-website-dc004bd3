import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Film,
  Target,
  Award,
  Video,
  Shield,
  Heart,
} from "lucide-react";

const principles = [
  {
    icon: Film,
    title: "Story Standards",
    description: "A consistent methodology for capturing authentic narratives.",
  },
  {
    icon: Target,
    title: "Proof-Backed Narratives",
    description: "Stories structured as evidence, not just content.",
  },
  {
    icon: Award,
    title: "Selective Craft, Not Volume",
    description: "Quality over quantity. Every story earns its place.",
  },
  {
    icon: Video,
    title: "System-Led Production",
    description: "Video as an output of a larger storytelling infrastructure.",
  },
  {
    icon: Shield,
    title: "Ethical Story Governance",
    description: "Protecting human voice in an AI-saturated world.",
  },
  {
    icon: Heart,
    title: "Long-Term Trust Building",
    description: "Compounding credibility through consistent, authentic storytelling.",
  },
];

const PrinciplesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-blue py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Makes Impact Loop Different
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            We don't just make videos. We build storytelling systems for organizations and corporations 
            that are accountable to funders, stakeholders, employees, and the public.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6">
                <principle.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                {principle.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Three Column Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <h4 className="font-serif text-xl font-semibold mb-3">
              Beyond Content
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              In a world drowning in content, trust has become the scarcest
              resource. For corporations, this trust gap shows up in ESG reporting, 
              CSR communications, and internal alignment, not just marketing.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-xl font-semibold mb-3">
              Systems Thinking
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              One video is a moment. A storytelling system is infrastructure
              that scales with your mission.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-xl font-semibold mb-3">
              Human Voice Protection
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Real people. Real stories. Real outcomes. Protected voices and 
              authentic narratives: no stock footage, no generic scripts, no synthetic content.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrinciplesSection;