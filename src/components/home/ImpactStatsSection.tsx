import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ImpactStatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Stat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-8xl md:text-9xl lg:text-[12rem] font-serif font-bold text-gradient leading-none">
              22X
            </span>
          </motion.div>

          {/* Supporting Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 md:mt-6"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-impact-dark mb-4">
              Higher Impact
            </h3>
            <p className="text-impact-dark/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Organizations that invest in authentic storytelling see up to 22x more
              engagement than those using generic content. Real stories create real
              trust—and real results.
            </p>
          </motion.div>

          {/* Secondary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-serif font-bold text-impact-blue">
                87%
              </span>
              <p className="text-impact-dark/60 mt-2 text-sm">
                of funders prefer video over written proposals
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-serif font-bold text-impact-purple">
                3.5x
              </span>
              <p className="text-impact-dark/60 mt-2 text-sm">
                higher retention with story-driven content
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-serif font-bold text-impact-blue">
                94%
              </span>
              <p className="text-impact-dark/60 mt-2 text-sm">
                of viewers trust authentic testimonials
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStatsSection;