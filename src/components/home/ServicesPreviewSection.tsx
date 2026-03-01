import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Film, Lightbulb, CalendarCheck, Sparkles, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { slideFromLeft, staggerContainer, scaleIn } from "@/hooks/useScrollAnimation";

const services = [
  { icon: Film, title: "Impact Story Videos", description: "Cinematic storytelling that captures the heart of your mission and the people you serve." },
  { icon: Lightbulb, title: "Program Highlights", description: "Showcase the outcomes and transformations your programs create in the community." },
  { icon: CalendarCheck, title: "Event Recaps", description: "Dynamic coverage that extends the life and reach of your important events." },
  { icon: Sparkles, title: "Testimonial Stories", description: "Authentic voices sharing real experiences that build trust with your audience." },
  { icon: Monitor, title: "Impact Technology", description: "Custom apps and platforms built with AI — delivered in weeks, not years — to power your operations and amplify your impact." },
];

const ServicesPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            How We Work
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Videos That Move People to Action
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-4">
            We work with nonprofits and corporations that need storytelling systems, not one-off content,
            to support funding, reporting, and stakeholder trust.
          </p>
          <p className="text-muted-foreground/70 max-w-2xl mx-auto text-base">
            Video is one output of a larger system. We produce selectively, guided by a clear storytelling standard.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              className="bg-card border border-border rounded-sm p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-5">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Line */}
        <motion.p
          variants={slideFromLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-10 text-muted-foreground/60 text-sm max-w-xl mx-auto"
        >
          Video production is offered as part of a broader storytelling system, not as standalone content.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-8"
        >
          <Link to="/services" className="btn-primary">
            Explore All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;
