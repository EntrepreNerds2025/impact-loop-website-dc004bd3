import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, BookOpen, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { slideFromLeft, staggerContainer, slideFromRight } from "@/hooks/useScrollAnimation";

const frameworkModules = [
  { icon: BookOpen, title: "Story Standard", description: "The foundational principles for authentic impact storytelling.", locked: true },
  { icon: FileText, title: "Story Types", description: "Different narrative formats for different strategic goals.", locked: true },
  { icon: Users, title: "Intake Prompts", description: "Questions that unlock the stories hidden in your organization.", locked: true },
];

const FrameworkPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 section-cream">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            The Framework
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The Storytelling Standard Behind the Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Access our framework for nonprofits, CSR teams, and impact-led corporations
            to identify, capture, and deploy stories that stand up to scrutiny.
          </p>
        </motion.div>

        {/* Framework Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {frameworkModules.map((module) => (
            <motion.div
              key={module.title}
              variants={slideFromRight}
              className="bg-card border border-border rounded-sm p-8 hover:shadow-lg transition-shadow duration-300 relative"
            >
              {module.locked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-4 h-4 text-muted-foreground/40" />
                </div>
              )}
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-5">
                <module.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{module.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">{module.description}</p>
              {module.locked && (
                <span className="text-xs text-muted-foreground/50 uppercase tracking-wider">
                  Available with Framework Kit
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-12"
        >
          <Link to="/services" className="btn-primary">
            Get Framework Access
          </Link>
          <p className="text-muted-foreground/60 text-sm mt-4">
            Already have access?{" "}
            <Link to="/login" className="text-primary hover:underline">Login here</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FrameworkPreviewSection;
