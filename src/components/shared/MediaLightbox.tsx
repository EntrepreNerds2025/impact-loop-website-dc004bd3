import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react";

export interface MediaItem {
  type: "video" | "photo";
  /** Vimeo ID for videos, URL for photos */
  src: string;
  title?: string;
  caption?: string;
}

interface MediaLightboxProps {
  items: MediaItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const downloadPhoto = async (src: string, title?: string) => {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title ? `${title.replace(/[^a-zA-Z0-9-_ ]/g, "")}.jpg` : "photo.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    // Fallback: open in new tab
    window.open(src, "_blank");
  }
};

const MediaLightbox = ({ items, currentIndex, onClose, onNavigate }: MediaLightboxProps) => {
  const isOpen = currentIndex !== null;
  const item = currentIndex !== null ? items[currentIndex] : null;
  const hasPrev = currentIndex !== null && currentIndex > 0;
  const hasNext = currentIndex !== null && currentIndex < items.length - 1;
  const [downloading, setDownloading] = useState(false);

  const goPrev = useCallback(() => {
    if (hasPrev && currentIndex !== null) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext && currentIndex !== null) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  const handleDownload = useCallback(async () => {
    if (!item) return;
    if (item.type === "video") {
      window.open(`https://vimeo.com/${item.src}`, "_blank");
    } else {
      setDownloading(true);
      await downloadPhoto(item.src, item.title);
      setDownloading(false);
    }
  }, [item]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95"
            onClick={onClose}
          />

          {/* Top-right buttons */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10 flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300 disabled:opacity-50"
              aria-label={item.type === "video" ? "View on Vimeo" : "Download photo"}
              title={item.type === "video" ? "View on Vimeo" : "Download photo"}
            >
              {item.type === "video" ? (
                <ExternalLink className="w-5 h-5 text-white" />
              ) : (
                <Download className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Prev arrow */}
          {hasPrev && (
            <button
              onClick={goPrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Next arrow */}
          {hasNext && (
            <button
              onClick={goNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-5xl flex flex-col items-center"
            >
              {item.type === "video" ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={`https://player.vimeo.com/video/${item.src}?autoplay=1&title=0&byline=0&portrait=0`}
                    className="w-full h-full rounded-lg"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={item.title || "Video player"}
                  />
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.caption || item.title || "Photo"}
                  className="max-h-[80vh] max-w-full object-contain rounded-lg"
                />
              )}

              {/* Caption / title */}
              {(item.title || item.caption) && (
                <p className="text-white/80 text-sm mt-4 text-center">
                  {item.title || item.caption}
                </p>
              )}

              {/* Counter */}
              {items.length > 1 && (
                <p className="text-white/40 text-xs mt-2">
                  {(currentIndex ?? 0) + 1} / {items.length}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MediaLightbox;
