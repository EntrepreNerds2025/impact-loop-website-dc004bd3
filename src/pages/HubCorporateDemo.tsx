import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Video, Images, Quote, Handshake, FileDown, BarChart3,
  ChevronDown, Menu, X, Play
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { slideUp, staggerContainer, fadeIn } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import HubVideoClips from "@/components/hub/HubVideoClips";
import PdfExportPreview from "@/components/hub/PdfExportPreview";
import MediaLightbox, { type MediaItem } from "@/components/shared/MediaLightbox";

/* ─── Sections nav ─── */
const sections = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "initiative", label: "Initiative", icon: BookOpen },
  { id: "hero-video", label: "Hero Video", icon: Video },
  { id: "clips", label: "Clips", icon: Play },
  { id: "photos", label: "Photos", icon: Images },
  { id: "quotes", label: "Quotes", icon: Quote },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "pdf-export", label: "PDF Export", icon: FileDown },
  { id: "outcomes", label: "Quick Outcomes", icon: BarChart3 },
];

/* ─── Clips (Vimeo) ─── */
const clips = [
  { title: "CEO Welcome and Investment Vision", vimeoId: "1168844885" },
  { title: "Community Impact Strategy Overview", vimeoId: "1140641190", previewStart: 30 },
  { title: "Partner Spotlight: Local Nonprofit Collaboration", vimeoId: "1135409664" },
  { title: "Employee Volunteer Program Highlights", vimeoId: "1159742453" },
  { title: "Sustainability and Social Responsibility", vimeoId: "1142229793" },
  { title: "Youth STEM Education Initiative", vimeoId: "1145353261" },
  { title: "Annual Giving Campaign Results", vimeoId: "1064687560" },
  { title: "Looking Ahead: 2026 Community Goals", vimeoId: "1168847247" },
];

/* ─── Photos (placeholder) ─── */
const photoItems: MediaItem[] = [
  { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop", title: "Corporate team event" },
  { type: "photo", src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop", title: "Volunteer day" },
  { type: "photo", src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&h=800&fit=crop", title: "Community engagement" },
  { type: "photo", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop", title: "Workshop session" },
  { type: "photo", src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1200&h=800&fit=crop", title: "Partnership celebration" },
  { type: "photo", src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop", title: "Annual gala" },
];

/* ─── Quotes ─── */
const quotes = [
  { text: "Northfield's investment in our community centre changed how families access services.", name: "Maria L.", role: "Partner" },
  { text: "The volunteer program brought our team closer while making a real difference.", name: "James C.", role: "Staff" },
  { text: "We've seen a measurable increase in youth STEM participation since the partnership began.", name: "Dr. Susan P.", role: "Partner" },
  { text: "This isn't just corporate responsibility — it's genuine community partnership.", name: "Aiden K.", role: "Partner" },
  { text: "Our employees consistently say the volunteer days are the highlight of their year.", name: "Rachel M.", role: "Staff" },
  { text: "The scholarship program funded by Northfield changed my daughter's life.", name: "Deborah T.", role: "Partner" },
  { text: "We appreciate a corporate partner that listens first and acts second.", name: "Omar F.", role: "Partner" },
  { text: "The multi-year commitment gives us stability to plan long-term programs.", name: "Elena V.", role: "Partner" },
  { text: "Northfield's approach to CSR is a model other corporations should follow.", name: "City Councillor Kim R.", role: "Partner" },
  { text: "Being part of this initiative reminded me why I chose to work here.", name: "Tyler B.", role: "Staff" },
];

/* ─── Partners ─── */
const partners = [
  { initials: "UW", name: "United Way" },
  { initials: "HFH", name: "Habitat for Humanity" },
  { initials: "BGC", name: "Boys & Girls Club" },
  { initials: "YMC", name: "YMCA" },
  { initials: "JA", name: "Junior Achievement" },
  { initials: "CF", name: "Community Foundation" },
];

/* ─── Outcomes ─── */
const outcomes = [
  { value: "$2.4M", label: "Investment Amount" },
  { value: "18", label: "Partners Supported" },
  { value: "4,200", label: "Volunteer Hours" },
  { value: "12", label: "Events Hosted" },
];

/* ─── Initiative details ─── */
const initiativeDetails = [
  { label: "Who", value: "Northfield Technologies employees, community nonprofits, and underserved neighbourhoods" },
  { label: "What", value: "A multi-year community investment strategy spanning education, housing, and wellness" },
  { label: "When", value: "Fiscal Year 2025 (January – December)" },
  { label: "Where", value: "Greater Toronto Area and surrounding communities" },
];

const HubCorporateDemo = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleDemoDownload = () => {
    toast({ title: "Demo Only", description: "This is a demo hub. Downloads are available in real hubs." });
  };

  const allMedia: MediaItem[] = useMemo(() => [
    { type: "video" as const, src: "1168844885", title: "Our Impact Story — Full Video" },
    ...clips.map(c => ({ type: "video" as const, src: c.vimeoId, title: c.title })),
    ...photoItems,
  ], []);

  const openVideo = (vimeoId: string) => {
    const idx = allMedia.findIndex(m => m.type === "video" && m.src === vimeoId);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const openPhoto = (photoIndex: number) => {
    const offset = 1 + clips.length;
    setLightboxIndex(offset + photoIndex);
  };

  return (
    <Layout>
      <div className="pt-24 relative">
        <Link
          to="/bookings"
          className="fixed top-24 right-6 z-40 btn-primary text-xs hidden md:inline-flex"
        >
          Book a Story Call
        </Link>

        <div className="flex">
          {!isMobile && (
            <aside className={`sticky top-24 h-[calc(100vh-6rem)] transition-all duration-300 shrink-0 ${sidebarOpen ? "w-56" : "w-12"} border-r border-border bg-background z-30`}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full flex items-center justify-center py-3 text-muted-foreground hover:text-foreground"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              {sidebarOpen && (
                <nav className="px-3 space-y-1 overflow-y-auto">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors">
                      <s.icon size={14} /> {s.label}
                    </a>
                  ))}
                </nav>
              )}
            </aside>
          )}

          {isMobile && (
            <div className="fixed top-[4.5rem] left-0 right-0 z-30 bg-background border-b border-border px-4 py-2">
              <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="w-full flex items-center justify-between text-sm text-foreground font-medium">
                Jump to section <ChevronDown size={16} className={`transition-transform ${mobileNavOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileNavOpen && (
                <nav className="mt-2 space-y-1 pb-2">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} onClick={() => setMobileNavOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                      {s.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          )}

          <main className={`flex-1 min-w-0 ${isMobile ? "pt-12" : ""}`}>

            {/* 1. Overview — DARK */}
            <section id="overview" className="section-dark py-20 md:py-28">
              <div className="container mx-auto px-6 text-center max-w-3xl">
                <motion.p variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-impact-blue uppercase tracking-widest text-xs mb-4">
                  Northfield Technologies • Impact Media Hub
                </motion.p>
                <motion.h1 variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                  Community Investment Hub 2025
                </motion.h1>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/50 text-lg italic mb-6">
                  Investing in communities. Measuring what matters.
                </motion.p>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">
                  Northfield Technologies' 2025 Community Investment Hub showcases our commitment to meaningful, measurable social impact across the Greater Toronto Area through education, housing, wellness, and volunteer engagement partnerships.
                </motion.p>
                <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4">
                  <Link to="/bookings" className="btn-primary">Build Your Own Hub</Link>
                  <Link to="/hub/examples" className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-impact-dark">View More Examples</Link>
                </motion.div>
              </div>
            </section>

            {/* 2. Initiative Overview */}
            <section id="initiative" className="py-20 bg-background">
              <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">Investment Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {initiativeDetails.map((d) => (
                    <div key={d.label} className="bg-card border border-border rounded-sm p-6">
                      <p className="text-impact-blue text-xs font-semibold uppercase tracking-widest mb-2">{d.label}</p>
                      <p className="text-foreground text-sm">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Hero Video — DARK */}
            <section id="hero-video" className="section-dark py-20">
              <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-8 text-center">Our Impact Story</h2>
                <div
                  className="group relative overflow-hidden rounded-xl cursor-pointer bg-[hsl(var(--impact-dark))]"
                  style={{ aspectRatio: "16 / 9" }}
                  onClick={() => openVideo("1168844885")}
                >
                  <iframe
                    src="https://player.vimeo.com/video/1168844885?background=1&autoplay=1&loop=1&muted=1"
                    className="absolute pointer-events-none"
                    style={{ border: 0, width: "140%", height: "140%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    allow="autoplay"
                    title="Corporate Hero Video preview"
                  />
                  <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/30 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-7 h-7 text-primary-foreground ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                <p className="text-white/40 text-sm text-center mt-4">Click to play the full impact story.</p>
              </div>
            </section>

            {/* 4. Clips */}
            <section id="clips" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">Video Clips</h2>
                <HubVideoClips clips={clips} onPlay={openVideo} />
              </div>
            </section>

            {/* 5. Photo Gallery — DARK */}
            <section id="photos" className="section-dark py-20">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-12 text-center">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photoItems.map((photo, i) => (
                    <button
                      key={i}
                      onClick={() => openPhoto(i)}
                      className="group relative aspect-[3/2] overflow-hidden rounded-xl bg-white/5"
                    >
                      <img
                        src={photo.src}
                        alt={photo.title || "Hub photo"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {photo.title && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs">{photo.title}</p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Quotes */}
            <section id="quotes" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">Voices</h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quotes.map((q, i) => (
                    <motion.div key={i} variants={slideUp} className="bg-card border border-border rounded-sm p-6 space-y-3">
                      <p className="text-foreground italic text-sm leading-relaxed">"{q.text}"</p>
                      <div>
                        <p className="text-foreground font-semibold text-sm">{q.name}</p>
                        <span className="inline-block bg-impact-blue/10 text-impact-blue text-xs font-semibold px-2 py-0.5 rounded-sm mt-1">{q.role}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* 7. Partners — DARK */}
            <section id="partners" className="section-dark py-20">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-12 text-center">Our Partners</h2>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {partners.map((p) => (
                    <div key={p.initials} className="w-24 h-24 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center" title={p.name}>
                      <span className="font-serif text-lg font-bold text-white/60 text-center px-1">{p.initials}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 8. PDF Export */}
            <section id="pdf-export" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">PDF Export</h2>
                <PdfExportPreview
                  hubTitle="Community Investment Hub 2025"
                  hubSubtitle="Northfield Technologies • Fiscal Year 2025"
                  outcomes={outcomes}
                  quotes={quotes}
                  onDownload={handleDemoDownload}
                />
              </div>
            </section>

            {/* 9. Quick Outcomes — DARK */}
            <section id="outcomes" className="section-dark py-20">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-12 text-center">Quick Outcomes</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {outcomes.map((o) => (
                    <div key={o.label} className="bg-white/5 border border-white/10 rounded-sm p-6 text-center">
                      <p className="font-serif text-3xl font-bold text-impact-blue">{o.value}</p>
                      <p className="text-white/50 text-xs mt-1">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 10. Final CTA — DARK */}
            <section className="section-dark py-24 border-t border-white/10">
              <div className="container mx-auto px-6 text-center max-w-2xl">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Build your Impact Media Hub</h2>
                <p className="text-white/60 mb-10">Let's turn your community investment into a living, shareable media page.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/bookings" className="btn-primary">Book a Story Call</Link>
                  <Link to="/impact-media-hub" className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-impact-dark">Learn More</Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <MediaLightbox
        items={allMedia}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </Layout>
  );
};

export default HubCorporateDemo;
