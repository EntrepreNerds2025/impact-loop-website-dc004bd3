import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import VimeoLightbox from "../shared/VimeoLightbox";
import { slideFromLeft, staggerContainer, scaleIn } from "@/hooks/useScrollAnimation";

const portfolioItems = [
  { id: 1, title: "Community Health Initiative", category: "Impact Story", thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop", vimeoId: "76979871" },
  { id: 2, title: "Youth Empowerment Program", category: "Testimonial", thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop", vimeoId: "76979871" },
  { id: 3, title: "Environmental Restoration", category: "Program Highlight", thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop", vimeoId: "76979871" },
  { id: 4, title: "Education Access Campaign", category: "Impact Story", thumbnail: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop", vimeoId: "76979871" },
  { id: 5, title: "Housing First Initiative", category: "Event Recap", thumbnail: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&h=400&fit=crop", vimeoId: "76979871" },
  { id: 6, title: "Mental Health Awareness", category: "Testimonial", thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop", vimeoId: "76979871" },
];

const VideoPortfolioSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 section-cream">
      <div className="container mx-auto px-6">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item) => (
            <motion.div
              key={item.id}
              variants={scaleIn}
              className="group relative aspect-video rounded-sm overflow-hidden cursor-pointer"
              onClick={() => setSelectedVideo(item.vimeoId)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/40 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Play className="w-7 h-7 text-white ml-1" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[hsl(var(--impact-dark))]/90 to-transparent">
                <span className="text-primary text-xs uppercase tracking-wider">{item.category}</span>
                <h3 className="font-serif text-lg font-semibold text-white mt-1">{item.title}</h3>
              </div>
            </motion.div>
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

      <VimeoLightbox
        vimeoId={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};

export default VideoPortfolioSection;
