import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroCubeWrapperProps {
  children: React.ReactNode;
  contentChildren: React.ReactNode;
}

const HeroCubeWrapper = ({ children, contentChildren }: HeroCubeWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Hero face rotates from 0 to -90deg (rotating "up" like top face of cube)
  const heroRotateX = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  // Content face starts at 90deg (below, like next cube face) and rotates to 0
  const contentRotateX = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, 1]);

  return (
    <>
      {/* Scroll spacer — this div's height drives the animation */}
      <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ perspective: "1200px" }}
        >
          {/* Hero face */}
          <motion.div
            style={{
              rotateX: heroRotateX,
              opacity: heroOpacity,
              transformOrigin: "bottom center",
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
            }}
          >
            {children}
          </motion.div>

          {/* Content face */}
          <motion.div
            style={{
              rotateX: contentRotateX,
              opacity: contentOpacity,
              transformOrigin: "top center",
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              overflow: "hidden",
            }}
            className="bg-background"
          >
            <div className="h-screen overflow-hidden">
              {contentChildren}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HeroCubeWrapper;
