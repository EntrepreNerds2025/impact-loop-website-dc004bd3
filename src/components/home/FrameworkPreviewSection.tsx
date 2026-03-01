import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, BookOpen, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { convergeFromLeft, convergeFromRight, staggerContainer } from "@/hooks/useScrollAnimation";

const frameworkModules = [
  { icon: BookOpen, title: "Story Standard", description: "The foundational principles for authentic impact storytelling." },
  { icon: FileText, title: "Story Types", description: "Different narrative formats for different strategic goals." },
  { icon: Users, title: "Intake Prompts", description: "Questions that unlock the stories hidden in your organization." },
];

const FrameworkPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 section-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            variants={convergeFromLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            <div className="rounded-sm overflow-hidden aspect-[4/5] lg:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80"
                alt="Cinematic filmmaking and storytelling"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 lg:order-2"
          >
            <motion.div variants={convergeFromRight}>
              <p className="text-[hsl(var(--impact-blue))] font-medium text-sm uppercase tracking-widest mb-4">
                The Framework
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                The Storytelling Standard Behind the Work
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-lg">
                Access our framework for nonprofits, CSR teams, and impact-led corporations
                to identify, capture, and deploy stories that stand up to scrutiny.
              </p>
            </motion.div>

            {/* Stacked cards */}
            <div className="space-y-4 mb-10">
              {frameworkModules.map((module) => (
                <motion.div
                  key={module.title}
                  variants={convergeFromRight}
                  className="bg-[hsl(var(--impact-dark-lighter))] border border-white/10 rounded-sm p-6 flex items-start gap-4 hover:border-white/20 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--impact-blue))]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <module.icon className="w-5 h-5 text-[hsl(var(--impact-blue))]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-serif text-lg font-semibold text-white">{module.title}</h3>
                      <Lock className="w-3.5 h-3.5 text-white/30" />
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{module.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={convergeFromRight}>
              <Link
                to="/services"
                className="inline-block border border-white text-white hover:bg-white hover:text-[hsl(var(--impact-dark))] font-medium px-8 py-3.5 rounded-sm transition-all duration-300 uppercase tracking-widest text-sm"
              >
                Get Framework Access
              </Link>
              <p className="text-white/40 text-sm mt-4">
                Already have access?{" "}
                <Link to="/login" className="text-[hsl(var(--impact-blue))] hover:underline">Login here</Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FrameworkPreviewSection;
