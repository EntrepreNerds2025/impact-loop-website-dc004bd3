import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Zap, Plug, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { slideFromLeft, staggerContainer, scaleIn } from "@/hooks/useScrollAnimation";

const features = [
  { icon: Monitor, title: "Custom-Built for You", description: "Apps, dashboards, and platforms designed around your actual workflows — not the other way around." },
  { icon: Zap, title: "AI-Powered Delivery", description: "What used to take large teams and years of development can now be delivered in weeks." },
  { icon: Plug, title: "Seamless Integration", description: "Connect with the tools and systems your organization already relies on." },
  { icon: RefreshCw, title: "Ongoing Support", description: "Continuous iteration and support so your platform evolves as your needs grow." },
];

const TechSolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            Impact Technology
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Custom Platforms Built in Weeks, Not Years
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            With AI-accelerated development, organizations no longer need massive budgets or multi-year timelines
            to get purpose-built software. We design and deliver custom apps, intake systems, dashboards, and
            reporting platforms — tailored to your workflows and ready in weeks.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              className="bg-card border border-border rounded-sm p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-10 space-y-4"
        >
          <Link to="/contact" className="btn-primary">
            Let's Build Something
          </Link>
          <div>
            <Link
              to="/blog/ai-apps-for-impact"
              className="text-primary hover:underline text-sm font-medium"
            >
              Read: How AI Is Changing What's Possible →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSolutionsSection;
