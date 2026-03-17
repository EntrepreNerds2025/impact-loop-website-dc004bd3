import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const headlines = [
  "Stories that Earn Donor Trust.",
  "Stories that Earn Community Trust.",
  "Stories that Drive Action.",
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
    return (
      <span className="block mx-auto max-w-[15ch] sm:max-w-none leading-tight text-center px-2">
        {headlines[0]}
      </span>
    );
  }

  return (
    <span
      className="relative mx-auto flex w-full max-w-[15ch] sm:max-w-none justify-center overflow-hidden px-2 text-center"
      style={{ minHeight: "2.6em" }}
    >
      <AnimatePresence>
        {headlines.map((headline, i) =>
          i === index ? (
            <motion.span
              key={headline}
              className="absolute inset-x-0 leading-tight"
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -150, opacity: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            >
              {headline}
            </motion.span>
          ) : null
        )}
      </AnimatePresence>
    </span>
  );
};

export default RotatingHeadline;
