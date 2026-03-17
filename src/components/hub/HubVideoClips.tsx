import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Player from "@vimeo/player";
import { scaleIn } from "@/hooks/useScrollAnimation";

interface Clip {
  title: string;
  vimeoId: string;
  previewStart?: number;
}

const ClipCard = ({ clip, onPlay }: { clip: Clip; onPlay: (id: string) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const player = new Player(iframe);
    const LOOP_START = clip.previewStart ?? 0;
    const LOOP_END = LOOP_START + 10;

    player.setCurrentTime(LOOP_START);

    const handleTimeUpdate = (data: { seconds: number }) => {
      if (data.seconds >= LOOP_END) {
        player.setCurrentTime(LOOP_START);
      }
    };

    player.on("timeupdate", handleTimeUpdate);
    return () => {
      player.off("timeupdate", handleTimeUpdate);
    };
  }, [clip.previewStart]);

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="space-y-3"
    >
      <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground">{clip.title}</h3>
      <div
        className="group relative overflow-hidden rounded-xl cursor-pointer bg-[hsl(var(--impact-dark))]"
        style={{ aspectRatio: "16 / 9" }}
        onClick={() => onPlay(clip.vimeoId)}
      >
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${clip.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
          className="absolute pointer-events-none"
          style={{ border: 0, width: "140%", height: "140%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          allow="autoplay"
          title={`${clip.title} preview`}
        />
        <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/30 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface HubVideoClipsProps {
  clips: Clip[];
  onPlay: (vimeoId: string) => void;
  className?: string;
}

const HubVideoClips = ({ clips, onPlay, className }: HubVideoClipsProps) => (
  <div className={className ?? "grid grid-cols-1 md:grid-cols-2 gap-8"}>
    {clips.map((clip, i) => (
      <ClipCard key={i} clip={clip} onPlay={onPlay} />
    ))}
  </div>
);

export default HubVideoClips;
export type { Clip };
