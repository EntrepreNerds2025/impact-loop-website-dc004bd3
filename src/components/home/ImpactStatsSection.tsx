import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Users, RefreshCw } from "lucide-react";
import { slideFromLeft, slideFromRight, staggerContainer, scaleIn } from "@/hooks/useScrollAnimation";

const outcomes = [
  { icon: MessageSquare, title: "Clearer conversations with funders and stakeholders" },
  { icon: Users, title: "Stronger internal alignment around your mission" },
  { icon: RefreshCw, title: "Higher reuse and consistency across communications" },
];

const ImpactStatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 section-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Changes When Stories Are Built With Proof
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {outcomes.map((outcome) => (
              <motion.div
                key={outcome.title}
                variants={scaleIn}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <outcome.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-foreground font-medium text-lg leading-relaxed">
                  {outcome.title}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={slideFromRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-12 text-muted-foreground text-base max-w-2xl mx-auto"
          >
            Industry benchmarks suggest that authentic, story-driven content consistently
            outperforms generic messaging.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ImpactStatsSection;
