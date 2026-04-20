import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { slideUp } from "@/hooks/useScrollAnimation";

interface PdfExportPreviewProps {
  hubTitle: string;
  hubSubtitle: string;
  outcomes: { value: string; label: string }[];
  quotes: { text: string; name: string; role: string }[];
  onDownload?: () => void;
  isDemoMode?: boolean;
  hideDownload?: boolean;
}

const PdfExportPreview = ({
  hubTitle,
  hubSubtitle,
  outcomes,
  quotes,
  onDownload,
  isDemoMode = true,
  hideDownload = false,
}: PdfExportPreviewProps) => {
  const topQuotes = quotes.slice(0, 3);

  return (
    <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-2xl mx-auto">
      {/* PDF Preview Card — simulates what the export would look like */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        {/* Header band */}
        <div className="bg-[hsl(var(--impact-dark))] px-8 py-6 text-center">
          <p className="text-impact-blue uppercase tracking-widest text-[10px] mb-1">Impact Media Hub — PDF Export</p>
          <h3 className="font-serif text-xl md:text-2xl text-white font-bold leading-tight">{hubTitle}</h3>
          <p className="text-white/50 text-xs mt-1">{hubSubtitle}</p>
        </div>

        {/* Outcomes row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-border">
          {outcomes.slice(0, 6).map((o) => (
            <div key={o.label} className="bg-card px-3 py-4 text-center">
              <p className="font-serif text-lg font-bold text-impact-blue">{o.value}</p>
              <p className="text-muted-foreground text-[10px] mt-0.5 leading-tight">{o.label}</p>
            </div>
          ))}
        </div>

        {/* Quotes section */}
        <div className="px-8 py-6 space-y-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Selected Voices</p>
          {topQuotes.map((q, i) => (
            <div key={i} className="border-l-2 border-impact-blue pl-3">
              <p className="text-foreground text-xs italic leading-relaxed">"{q.text}"</p>
              <p className="text-muted-foreground text-[10px] mt-0.5">— {q.name}, {q.role}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-muted/50 px-8 py-4 flex items-center justify-between">
          <p className="text-muted-foreground text-[10px]">Generated from Impact Media Hub • impactloop.ca</p>
          <p className="text-muted-foreground text-[10px]">Page 1 of 2</p>
        </div>
      </div>

      {/* Download button / caption */}
      {!hideDownload ? (
        <div className="text-center mt-6">
          <button
            onClick={onDownload}
            className="btn-primary inline-flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            {isDemoMode ? "Download PDF (Demo)" : "Download PDF"}
          </button>
          {isDemoMode && (
            <p className="text-muted-foreground text-xs mt-3">Demo hub — PDF exports are available in