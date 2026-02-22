import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroCubeWrapperProps {
  children: React.ReactNode;
  contentChildren: React.ReactNode;
}

const HeroCubeWrapper = ({ children, contentChildren }: HeroCubeWrapperProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 30) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <div ref={containerRef} className="relative" style={{ perspective: "1200px" }}>
      <AnimatePresence mode="wait">
        {!hasScrolled ? (
          <motion.div
            key="hero"
            initial={{ rotateX: 0 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              transformOrigin: "bottom center",
              backfaceVisibility: "hidden",
            }}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              transformOrigin: "top center",
              backfaceVisibility: "hidden",
            }}
            className="bg-background"
          >
            {contentChildren}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroCubeWrapper;
