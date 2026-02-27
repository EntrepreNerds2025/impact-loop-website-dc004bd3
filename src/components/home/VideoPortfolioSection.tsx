import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import VimeoLightbox from "../shared/VimeoLightbox";
import { slideFromLeft, staggerContainer, scaleIn } from "@/hooks/useScrollAnimation";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  vimeoId: string;
  previewVimeoId: string;
}

const portfolioItems: PortfolioItem[] = [
  { id: 1, title: "Mental Health Awareness", category: "Testimonial", thumbnail: "", vimeoId: "1140514160", previewVimeoId: "1168718317" },
  { id: 2, title: "Iris Ministries — Malawi", category: "Impact Story", thumbnail: "", vimeoId: "1140283574", previewVimeoId: "1140283574" },
  { id: 3, title: "Lakeridge Health — I Belong Initiative", category: "Initiatives", thumbnail: "", vimeoId: "1140641190", previewVimeoId: "1140641190" },
  { id: 4, title: "Hair for Self-Esteem", category: "Impact Story", thumbnail: "", vimeoId: "1135409664", previewVimeoId: "1135409664" },
  { id: 5, title: "Black Creek Community Health Ambassadors", category: "Program Highlight", thumbnail: "", vimeoId: "833854968", previewVimeoId: "833854968" },
  { id: 6, title: "Octavia Sampson — Wellness Educator", category: "Testimonial", thumbnail: "", vimeoId: "1142229793", previewVimeoId: "1142229793" },
];

const VideoCard = ({
  item,
  onClick,
  isFullWidth,
}: {
  item: PortfolioItem;
  onClick: () => void;
  isFullWidth: boolean;
}) => {
  return (
  <motion.div
    variants={scaleIn}
    className="group relative overflow-hidden rounded-xl cursor-pointer bg-[hsl(var(--impact-dark))]"
    style={{ aspectRatio: "2.35 / 1" }}
    onClick={onClick}
  >
    {/* Vimeo background embed - native loop */}
      <iframe
        src={`https://player.vimeo.com/video/${item.previewVimeoId}?background=1&autoplay=1&loop=1&muted=1`}
        className="absolute pointer-events-none"
        style={{ border: 0, width: '140%', height: '140%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        allow="autoplay"
        title={`${item.title} preview`}
      />

    {/* Overlay */}
    <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/40 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />

    {/* Play button */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
        <Play className="w-7 h-7 text-primary-foreground ml-1" fill="white" />
      </div>
    </div>

    {/* Info */}
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[hsl(var(--impact-dark))]/90 to-transparent">
      <span className="text-primary text-xs uppercase tracking-wider">{item.category}</span>
      <h3 className="font-serif text-lg font-semibold text-white mt-1">{item.title}</h3>
    </div>
  </motion.div>
  );
};

const VideoPortfolioSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Split into rows: full, pair, full, pair
  const rows = [
    { type: "full" as const, items: [portfolioItems[0]] },
    { type: "pair" as const, items: [portfolioItems[1], portfolioItems[2]] },
    { type: "full" as const, items: [portfolioItems[3]] },
    { type: "pair" as const, items: [portfolioItems[4], portfolioItems[5]] },
  ];

  return (
    <section ref={ref} className="py-24 section-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Our Work
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Your Mission. <span className="text-gradient">In Motion.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              These stories were created using a repeatable standard designed to protect
              credibility in both nonprofit and corporate environments.
            </p>
          </motion.div>

          {/* Video Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={row.type === "pair" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}
              >
                {row.items.map((item) => (
                  <VideoCard
                    key={item.id}
                    item={item}
                    isFullWidth={row.type === "full"}
                    onClick={() => setSelectedVideo(item.vimeoId)}
                  />
                ))}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mt-12"
          >
            <a
              href="/work"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium"
            >
              View Full Portfolio
              <span className="text-lg">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      <VimeoLightbox
        vimeoId={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};

export default VideoPortfolioSection;
