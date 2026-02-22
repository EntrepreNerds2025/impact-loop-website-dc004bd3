import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, FileDown, Images } from "lucide-react";
import { slideFromLeft, slideFromRight, staggerContainer, slideUp } from "@/hooks/useScrollAnimation";

const features = [
  { icon: Globe, label: "A shareable media page your stakeholders can explore and share" },
  { icon: FileDown, label: "Downloadable reports, partner kits, and media packs" },
  { icon: Images, label: "Photos, quotes, video clips, and partner context — all in one place" },
];

const ImpactMediaHubSection = () => {
  return (
    <section className="section-cream py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Text */}
          <motion.div variants={slideFromLeft} className="space-y-6">
            <span className="inline-block bg-impact-blue text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm">
              New
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Impact Media Hub
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              A shareable media page for your program, event, campaign, or partnership. Story-first. Proof woven in through real outcomes, quotes, and partner context.
            </p>

            <ul className="space-y-4 pt-2">
              {features.map((f) => (
                <li key={f.label} className="flex items-start gap-3">
                  <f.icon className="w-5 h-5 text-impact-blue mt-0.5 shrink-0" />
                  <span className="text-foreground/80 text-sm">{f.label}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/hub/demo" className="btn-primary">
                View Nonprofit Demo Hub
              </Link>
              <Link to="/hub/corporate-demo" className="btn-secondary">
                View CSR Demo Hub
              </Link>
              <Link to="/bookings" className="btn-secondary">
                Build a Hub
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual preview card */}
          <motion.div variants={slideFromRight}>
            <div className="relative bg-background rounded-sm shadow-xl border border-border overflow-hidden">
              <div className="bg-impact-dark p-6 text-center">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Example Hub</p>
                <h3 className="font-serif text-2xl text-white font-semibold">
                  Our People's Keeper Employment Program
                </h3>
                <p className="text-white/60 text-sm mt-1">Real stories. Real outcomes. Built to be shared.</p>
              </div>
              <div className="p-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "150+", label: "Participants" },
                  { value: "12", label: "Partners" },
                  { value: "8", label: "Video Clips" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-2xl font-bold text-impact-blue">{stat.value}</p>
                    <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMediaHubSection;
