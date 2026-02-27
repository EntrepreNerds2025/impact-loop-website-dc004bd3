import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeIn, staggerContainer } from "@/hooks/useScrollAnimation";

import cafcanLogo from "@/assets/logos/cafcan.png";
import blackCreekLogo from "@/assets/logos/black-creek.png";
import bcfLogo from "@/assets/logos/bcf.png";
import bartleyLogo from "@/assets/logos/bartley.png";
import redditLogo from "@/assets/logos/reddit.png";
import fibeLogo from "@/assets/logos/fibe.png";
import employnextLogo from "@/assets/logos/employnext.png";
import addictiveLogo from "@/assets/logos/addictive-services.png";
import leukemiaLogo from "@/assets/logos/leukemia.png";
import lakeridgeLogo from "@/assets/logos/lakeridge.png";

const clientLogos = [
  { id: 1, name: "Cafcan", src: cafcanLogo, large: true },
  { id: 2, name: "Black Creek", src: blackCreekLogo, large: true },
  { id: 3, name: "Barrie Community Foundation", src: bcfLogo, large: true },
  { id: 4, name: "Bartley Skills Development", src: bartleyLogo, large: true },
  { id: 5, name: "Reddit", src: redditLogo, large: true },
  { id: 6, name: "Fibe", src: fibeLogo, large: false },
  { id: 7, name: "EmployNext", src: employnextLogo, large: false },
  { id: 8, name: "Addictive Services", src: addictiveLogo, large: true },
  { id: 9, name: "Leukemia & Lymphoma Society", src: leukemiaLogo, large: true },
  { id: 10, name: "Lakeridge Health", src: lakeridgeLogo, large: true },
];

const ClientLogosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 bg-impact-dark">
      <div className="container mx-auto px-6">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center text-white/50 text-sm uppercase tracking-widest mb-10"
        >
          Trusted by organizations and companies making real impact
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 md:grid-cols-5 gap-10 items-center justify-items-center"
        >
          {clientLogos.map((logo) => (
            <motion.div
              key={logo.id}
              variants={fadeIn}
              className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`${logo.large ? "h-30" : "h-10"} w-auto object-contain`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
