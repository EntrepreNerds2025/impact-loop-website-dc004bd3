import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { convergeFromLeft, convergeFromRight } from "@/hooks/useScrollAnimation";
import founderPhoto from "@/assets/founder/rovonn.png";

const FounderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Photo - converges from left */}
          <motion.div
            variants={convergeFromLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              <img src={founderPhoto} alt="Rovonn Russell, Founder of Impact Loop" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-sm -z-10" />
          </motion.div>

          {/* Content - converges from right */}
          <motion.div
            variants={convergeFromRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Meet the Founder
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Rovonn Russell
            </h2>
            <p className="text-xl text-muted-foreground font-serif italic mb-6">
              Founder, Storytelling Systems Designer
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                With over a decade of experience in documentary filmmaking and
                organizational communications, Rovonn founded Impact Loop to design
                systems that protect human stories in an AI-saturated world.
              </p>
              <p>
                Having worked with organizations across Canada, he's seen firsthand
                how the right story, told the right way, can transform how
                communities perceive and support meaningful work.
              </p>
              <p>
                "Every organization has stories worth telling. My job is to help you
                tell them in a way that builds real trust, not just content."
              </p>
              <p>
                His work supports nonprofits and corporate teams navigating trust,
                accountability, and public scrutiny in an AI-saturated world.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium"
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
