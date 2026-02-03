import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Placeholder logos - replace with actual client logos
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
    <section ref={ref} className="py-16 bg-impact-cream">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-impact-dark/50 text-sm uppercase tracking-widest mb-10"
        >
          Trusted by organizations making real impact
        </motion.p>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center"
        >
          {clientLogos.map((logo, index) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="w-20 h-12 flex items-center justify-center text-impact-dark/30 hover:text-impact-dark/50 transition-colors duration-300"
            >
              {/* Replace with actual logo images */}
              <span className="font-serif text-xl font-bold">
                {logo.placeholder}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogosSection;