import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const headlines = [
  "Stories that Earn Donor Trust.",
  "Stories that Earn Partner Trust.",
  "Stories that Earn Stakeholder Trust.",
];

const RotatingHeadline = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    return <span>{headlines[0]}</span>;
  }

  return (
    <span
      className="block relative overflow-hidden"
      style={{ perspective: "1200px", minHeight: "1.2em" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={headlines[index]}
          initial={{ rotateX: 90, opacity: 0, transformOrigin: "bottom center" }}
          animate={{ rotateX: 0, opacity: 1, transformOrigin: "bottom center" }}
          exit={{ rotateX: -90, opacity: 0, transformOrigin: "top center" }}
          transition={{
            duration: 0.7,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="block"
          style={{ backfaceVisibility: "hidden" }}
        >
          {headlines[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingHeadline;
