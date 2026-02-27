import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import RotatingWord from "./RotatingWord";

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/1135409559?background=1&autoplay=1&loop=1&muted=1&autopause=0"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] min-w-[120%] min-h-[120%] pointer-events-none"
            style={{ border: 'none' }}
            allow="autoplay; fullscreen"
            title="Background video"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--impact-dark))]/85 via-[hsl(var(--impact-dark))]/70 to-[hsl(var(--impact-dark))] z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-6"
          >
            Cinematic Impact Films & Story Systems
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            <RotatingWord />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Cinematic impact films and story systems built to earn trust.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/50 text-base max-w-2xl mx-auto mb-10"
          >
            We produce documentary-style impact films and short-form cutdowns, then deploy them as reusable story assets for partners, funders, and stakeholders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/work"
              className="btn-primary text-base"
            >
              See Our Work
            </Link>
            <Link
              to="/bookings"
              className="bg-transparent border border-white text-white hover:bg-white hover:text-[hsl(var(--impact-dark))] font-medium px-8 py-3.5 rounded-sm transition-all duration-300 uppercase tracking-widest text-sm"
            >
              Book a Storytelling Diagnostic
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/50 hover:text-white transition-colors duration-300"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
