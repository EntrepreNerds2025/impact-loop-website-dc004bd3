import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Film, Lightbulb, CalendarCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Film,
    title: "Impact Story Videos",
    description:
      "Cinematic storytelling that captures the heart of your mission and the people you serve.",
  },
  {
    icon: Lightbulb,
    title: "Program Highlights",
    description:
      "Showcase the outcomes and transformations your programs create in the community.",
  },
  {
    icon: CalendarCheck,
    title: "Event Recaps",
    description:
      "Dynamic coverage that extends the life and reach of your important events.",
  },
  {
    icon: Sparkles,
    title: "Testimonial Stories",
    description:
      "Authentic voices sharing real experiences that build trust with your audience.",
  },
];

const ServicesPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-purple py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-white/60 font-medium text-sm uppercase tracking-widest mb-4">
            How We Work
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Videos That Move People to Action
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-4">
            We work with nonprofits and corporations that need storytelling systems — not one-off content — 
            to support funding, reporting, and stakeholder trust.
          </p>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            Video is one output of a larger system. We produce selectively, guided by a clear storytelling standard.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-5">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10 text-white/50 text-sm max-w-xl mx-auto"
        >
          Video production is offered as part of a broader storytelling system, not as standalone content.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-white text-impact-purple hover:bg-white/90 font-medium px-8 py-4 rounded-md transition-colors duration-300"
          >
            Explore All Services
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;