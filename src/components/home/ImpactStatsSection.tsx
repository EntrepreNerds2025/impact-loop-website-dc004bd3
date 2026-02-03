import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Users, RefreshCw } from "lucide-react";

const outcomes = [
  {
    icon: MessageSquare,
    title: "Clearer conversations with funders and stakeholders",
  },
  {
    icon: Users,
    title: "Stronger internal alignment around your mission",
  },
  {
    icon: RefreshCw,
    title: "Higher reuse and consistency across communications",
  },
];

const ImpactStatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-impact-dark mb-6">
              What Changes When Stories Are Built With Proof
            </h2>
          </motion.div>

          {/* Outcomes Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-impact-blue/10 to-impact-purple/10 flex items-center justify-center mx-auto mb-4">
                  <outcome.icon className="w-7 h-7 text-impact-blue" />
                </div>
                <p className="text-impact-dark font-medium text-lg leading-relaxed">
                  {outcome.title}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Context Line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-impact-dark/50 text-base max-w-2xl mx-auto"
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