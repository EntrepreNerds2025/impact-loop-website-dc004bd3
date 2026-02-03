import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const FounderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-impact-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Placeholder for founder photo */}
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-impact-blue/30 to-impact-purple/30">
              <div className="w-full h-full flex items-center justify-center text-white/30">
                <span className="font-serif text-lg">Founder Photo</span>
              </div>
              {/* Replace with actual image:
              <img
                src="/path-to-founder-photo.jpg"
                alt="Rovonn Russell, Founder"
                className="w-full h-full object-cover"
              /> */}
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-impact-blue/20 rounded-lg -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white"
          >
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
              Meet the Founder
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Rovonn Russell
            </h2>
            <p className="text-xl text-white/80 font-serif italic mb-6">
              Founder & Impact Story Director
            </p>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                With over a decade of experience in documentary filmmaking and
                nonprofit communications, Rovonn founded Impact Loop to bridge the
                gap between authentic storytelling and strategic impact.
              </p>
              <p>
                Having worked with organizations across Canada, he's seen firsthand
                how the right story, told the right way, can transform how
                communities perceive and support meaningful work.
              </p>
              <p>
                "Every organization has stories worth telling. My job is to help you
                tell them in a way that builds real trust—not just content."
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-impact-blue hover:text-impact-purple transition-colors duration-300 font-medium"
              >
                Learn More About Our Approach
                <span className="text-lg">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;