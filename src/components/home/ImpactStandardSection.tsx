import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardCheck, TrendingUp, ShieldCheck, FileBarChart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { slideFromLeft, staggerContainer, scaleIn } from "@/hooks/useScrollAnimation";

const steps = [
  { icon: ClipboardCheck, title: "Capture", description: "Staff log a Pillar Moment in three taps and a voice note — about fifteen seconds." },
  { icon: TrendingUp, title: "Quantify", description: "Observations become 0–100 pillar scores, weighted by direction and recency." },
  { icon: ShieldCheck, title: "Verify", description: "Confidence tiers and self-eval cross-checks keep every number auditable." },
  { icon: FileBarChart, title: "Report", description: "Growth figures paired with real stories — funder-ready, exported on demand." },
];

const ImpactStandardSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[hsl(var(--impact-dark))] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,hsl(var(--impact-purple)/0.25),transparent_32%),radial-gradient(circle_at_85%_80%,hsl(var(--impact-blue)/0.22),transparent_35%)]" />
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/60">
            The Impact Loop Standard
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
            Turn the impact you create into data funders trust
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Attendance is easy to count. Transformation isn't. Our methodology turns
            fifteen-second frontline observations into longitudinal, auditable impact data —
            so the people doing the work can prove it, and the funders backing them can trust it.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.title}
              variants={scaleIn}
              className="rounded-sm border border-white/12 bg-white/5 p-7 backdrop-blur transition-colors duration-300 hover:bg-white/10"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-white/10">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/65">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 text-center"
        >
          <Link
            to="/impact-standard"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-[hsl(var(--impact-dark))] transition hover:bg-white/90"
          >
            Explore the Standard
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStandardSection;
