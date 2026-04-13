import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { slideFromLeft, slideFromRight, staggerContainer, scaleIn } from "@/hooks/useScrollAnimation";

const stats = [
  { number: "13+", label: "Impact Films Produced", detail: "Documentary-style films delivered across nonprofit and corporate sectors" },
  { number: "7+", label: "Organizations Served", detail: "Nonprofits, health systems, community orgs, and corporate partners" },
  { number: "45%", label: "Higher Donor Retention", detail: "The industry benchmark for story-driven giving vs. generic messaging" },
];

const sectors = [
  "Community Health",
  "Employment & Workforce",
  "Corporate / ESG",
  "Education",
  "Faith & International",
  "Wellness & Mental Health",
];

const ImpactStatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 section-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              The Work So Far
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Real Organizations. Real Outcomes.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Every film we produce is built to hold up under scrutiny, earn real trust, and create lasting story assets organizations return to again and again.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center p-8 bg-white rounded-xl border border-border shadow-sm"
              >
                <div className="font-serif text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-foreground text-lg mb-2">
                  {stat.label}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Sectors */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center"
          >
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-5">
              Sectors We Serve
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {sectors.map((sector) => (
                <span
                  key={sector}
                  className="px-4 py-2 rounded-full bg-primary/8 text-primary text-sm font-medium border border-primary/20"
                >
                  {sector}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStatsSection;
