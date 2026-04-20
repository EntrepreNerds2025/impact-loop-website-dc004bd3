import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Film, Lightbulb, CalendarCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { convergeFromLeft, convergeFromRight, staggerContainer } from "@/hooks/useScrollAnimation";

const services = [
  { icon: Film, title: "Impact Story Videos", description: "Cinematic storytelling that captures the heart of your mission." },
  { icon: Lightbulb, title: "Program Highlights", description: "Showcase the outcomes your programs create in the community." },
  { icon: CalendarCheck, title: "Event Recaps", description: "Dynamic coverage that extends the life of your events." },
  { icon: Sparkles, title: "Testimonial Stories", description: "Authentic voices sharing real experiences that build trust." },
];

const ServicesPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[hsl(var(--impact-dark))] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left, Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={convergeFromLeft}>
              <p className="text-[hsl(var(--impact-blue))] font-medium text-sm uppercase tracking-widest mb-4">
                How We Work
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Videos That Move People to Action
              </h2>
              <p className="text-white/70 text-lg mb-4 max-w-lg">
                We work with nonprofits and corporations that need storytelling systems, not one-off content,
                to support funding, reporting, and stakeholder trust.
              </p>
              <p className="text-white/50 text-base mb-10 max-w-lg">
                Video is one output of a larger system. We produce selectively, guided by a clear storytelling standard.
              </p>
            </motion.div>

            {/* 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={convergeFromLeft}
                  className="bg-[hsl(var(--impact-dark-lighter))] border border-white/10 rounded-sm p-5 hover:border-white/20 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--impact-blue))]/15 flex items-center justify-center mb-3">
                    <service.icon className="w-5 h-5 text-[hsl(var(--impact-blue))]" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-white mb-1.5">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={convergeFromLeft}>
              <Link to="/services" className="btn-primary">
                Explore All Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Right, Image */}
          <motion.div
            variants={convergeFromRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="rounded-sm overflow-hidden aspect-[4/5] lg:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1576267423048-15c0040fec78?auto=format&fit=crop&w=800&q=80"
                alt="Video production and impact storytelling"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;
