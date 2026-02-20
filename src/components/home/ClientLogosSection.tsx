import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeIn, staggerContainer } from "@/hooks/useScrollAnimation";

const clientLogos = [
  { id: 1, name: "Community Foundation", placeholder: "CF" },
  { id: 2, name: "Health Alliance", placeholder: "HA" },
  { id: 3, name: "Youth Network", placeholder: "YN" },
  { id: 4, name: "Green Initiative", placeholder: "GI" },
  { id: 5, name: "Education First", placeholder: "EF" },
  { id: 6, name: "Housing Trust", placeholder: "HT" },
  { id: 7, name: "Arts Council", placeholder: "AC" },
  { id: 8, name: "Food Security", placeholder: "FS" },
  { id: 9, name: "Mental Health", placeholder: "MH" },
  { id: 10, name: "Family Services", placeholder: "FS" },
  { id: 11, name: "Indigenous Partners", placeholder: "IP" },
  { id: 12, name: "Climate Action", placeholder: "CA" },
];

const ClientLogosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-10"
        >
          Trusted by organizations making real impact
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center"
        >
          {clientLogos.map((logo) => (
            <motion.div
              key={logo.id}
              variants={fadeIn}
              className="w-20 h-12 flex items-center justify-center text-muted-foreground/50 hover:text-foreground/60 transition-colors duration-300"
            >
              <span className="font-serif text-xl font-bold">{logo.placeholder}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
