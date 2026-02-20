import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Target, Award, Video, Shield, Heart } from "lucide-react";
import { slideFromLeft, slideFromRight, staggerContainer, scaleIn } from "@/hooks/useScrollAnimation";

const principles = [
  { icon: Film, title: "Story Standards", description: "A consistent methodology for capturing authentic narratives." },
  { icon: Target, title: "Proof-Backed Narratives", description: "Stories structured as evidence, not just content." },
  { icon: Award, title: "Selective Craft, Not Volume", description: "Quality over quantity. Every story earns its place." },
  { icon: Video, title: "System-Led Production", description: "Video as an output of a larger storytelling infrastructure." },
  { icon: Shield, title: "Ethical Story Governance", description: "Protecting human voice in an AI-saturated world." },
  { icon: Heart, title: "Long-Term Trust Building", description: "Compounding credibility through consistent, authentic storytelling." },
];

const PrinciplesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Makes Impact Loop Different
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We don't just make videos. We build storytelling systems for organizations and corporations
            that are accountable to funders, stakeholders, employees, and the public.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {principles.map((principle) => (
            <motion.div
              key={principle.title}
              variants={scaleIn}
              className="bg-card border border-border rounded-sm p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <principle.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {principle.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Three Column Text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {[
            { title: "Beyond Content", text: "In a world drowning in content, trust has become the scarcest resource. For corporations, this trust gap shows up in ESG reporting, CSR communications, and internal alignment, not just marketing." },
            { title: "Systems Thinking", text: "One video is a moment. A storytelling system is infrastructure that scales with your mission." },
            { title: "Human Voice Protection", text: "Real people. Real stories. Real outcomes. Protected voices and authentic narratives: no stock footage, no generic scripts, no synthetic content." },
          ].map((item) => (
            <motion.div key={item.title} variants={slideFromRight}>
              <h4 className="font-serif text-xl font-semibold text-foreground mb-3">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
