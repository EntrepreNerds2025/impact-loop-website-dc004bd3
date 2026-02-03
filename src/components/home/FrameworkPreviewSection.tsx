import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, BookOpen, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

const frameworkModules = [
  {
    icon: BookOpen,
    title: "Story Standard",
    description: "The foundational principles for authentic impact storytelling.",
    locked: true,
  },
  {
    icon: FileText,
    title: "Story Types",
    description: "Different narrative formats for different strategic goals.",
    locked: true,
  },
  {
    icon: Users,
    title: "Intake Prompts",
    description: "Questions that unlock the stories hidden in your organization.",
    locked: true,
  },
];

const FrameworkPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-impact-cream">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
            The Framework
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-impact-dark mb-4">
            The Storytelling Standard Behind the Work
          </h2>
          <p className="text-impact-dark/60 max-w-2xl mx-auto text-lg">
            Access our framework for nonprofits, CSR teams, and impact-led corporations 
            to identify, capture, and deploy stories that stand up to scrutiny.
          </p>
        </motion.div>

        {/* Framework Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {frameworkModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 relative"
            >
              {/* Lock indicator */}
              {module.locked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-4 h-4 text-impact-dark/30" />
                </div>
              )}
              
              <div className="w-12 h-12 rounded-lg bg-impact-blue/10 flex items-center justify-center mb-5">
                <module.icon className="w-6 h-6 text-impact-blue" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-impact-dark mb-3">
                {module.title}
              </h3>
              <p className="text-impact-dark/60 leading-relaxed text-sm mb-4">
                {module.description}
              </p>
              {module.locked && (
                <span className="text-xs text-impact-dark/40 uppercase tracking-wider">
                  Available with Framework Kit
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="btn-primary"
          >
            Get Framework Access
          </Link>
          <p className="text-impact-dark/50 text-sm mt-4">
            Already have access?{" "}
            <Link to="/login" className="text-impact-blue hover:underline">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FrameworkPreviewSection;