import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Video, Images, Quote, Handshake, FileDown, BarChart3,
  ChevronDown, Menu, X, Play, Download
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Layout from "@/components/layout/Layout";
import { slideUp, staggerContainer, fadeIn } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import HubVideoClips from "@/components/hub/HubVideoClips";
import PdfExportPreview from "@/components/hub/PdfExportPreview";
import MediaLightbox, { type MediaItem } from "@/components/shared/MediaLightbox";

import blackCreekLogo from "@/assets/hub/black-creek-logo.jpg";
import cssdLogo from "@/assets/hub/cssd-logo.png";
import ahcLogo from "@/assets/hub/ahc-logo.png";
import ellaCharlesLogo from "@/assets/hub/ella-charles-logo.png";

/* ─── Sections nav ─── */
const sections = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "initiative", label: "Themes", icon: BookOpen },
  { id: "hero-video", label: "Hero Video", icon: Video },
  { id: "clips", label: "Clips", icon: Play },
  { id: "photos", label: "Photos", icon: Images },
  { id: "quotes", label: "Voices", icon: Quote },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "pdf-export", label: "PDF Export", icon: FileDown },
  { id: "outcomes", label: "Outcomes", icon: BarChart3 },
];

/* ─── Clips (Vimeo — from the user's library) ─── */
const clips = [
  { title: "Dr Akeem on Community Event Importance", vimeoId: "1174190910" },
  { title: "Victoria Testimonial 1", vimeoId: "1174191105" },
  { title: "Patricia Testimonial", vimeoId: "1174191067" },
  { title: "Ella Charles Cuisine Spotlight", vimeoId: "1174190976" },
  { title: "Edith Testimonial Video", vimeoId: "1174203013" },
  { title: "Victoria Testimonial 2", vimeoId: "1174191137" },
  { title: "Emma Testimonial", vimeoId: "1174191016" },
  { title: "Doreen Testimonial", vimeoId: "1174190887" },
  { title: "Dr Akeem on the BCCHC Partnership", vimeoId: "1174190944" },
  { title: "Miss Emma Community Ambassador", vimeoId: "1174191042" },
  { title: "Carol Testimonial Video", vimeoId: "1174203036" },
  { title: "Veroni Testimonial Video", vimeoId: "1174203026" },
];

/* ─── Photos (placeholder until real uploads) ─── */
const fallbackPhotoItems: MediaItem[] = [
  { type: "photo", src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&h=800&fit=crop", title: "Community gathering" },
  { type: "photo", src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=800&fit=crop", title: "Cooking workshop" },
  { type: "photo", src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop", title: "Event celebration" },
  { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop", title: "Vision board session" },
  { type: "photo", src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=800&fit=crop", title: "Movie night" },
  { type: "photo", src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop", title: "Volunteer moment" },
];

const localPhotoModules = import.meta.glob<{ default: string }>(
  "../assets/hub/black-creek-bhm/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);

const FEATURED_PHOTO_BASENAME = "dsc06165";

const toBaseNameFromPath = (filePath: string) =>
  filePath.split("/").pop()?.replace(/\.[^/.]+$/, "") ?? "";

const toTitleFromPath = (filePath: string) => {
  const fileName = toBaseNameFromPath(filePath);
  return fileName.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
};

const seededShuffle = <T,>(items: T[]) => {
  const result = [...items];
  let seed = 20260217;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

const sortedPhotoEntries = Object.entries(localPhotoModules).sort(([pathA], [pathB]) =>
  pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: "base" })
);

const featuredPhotoEntries = sortedPhotoEntries.filter(
  ([filePath]) => toBaseNameFromPath(filePath).toLowerCase() === FEATURED_PHOTO_BASENAME
);

const regularPhotoEntries = sortedPhotoEntries.filter(
  ([filePath]) => toBaseNameFromPath(filePath).toLowerCase() !== FEATURED_PHOTO_BASENAME
);

const orderedPhotoEntries = [
  ...featuredPhotoEntries,
  ...seededShuffle(regularPhotoEntries),
];

const uploadedPhotoItems: MediaItem[] = orderedPhotoEntries.map(([filePath, module], index) => ({
    type: "photo",
    src: module.default,
    title: toTitleFromPath(filePath) || `Event Photo ${index + 1}`,
  }));

const photoItems: MediaItem[] =
  uploadedPhotoItems.length > 0 ? uploadedPhotoItems : fallbackPhotoItems;

/* ─── Quotes ─── */
const quotes = [
  { text: "The events are so enjoyable. We always enjoy the food and the hospitality.", name: "Community Member", role: "Community Member and Participant" },
  { text: "This gives us opportunity to meet people. I did not know my friend beside me before, and now we connect.", name: "Community Member", role: "Community Member and Participant" },
  { text: "It is a wonderful opportunity to come out and be happy, especially for people who do not go out often.", name: "Community Member", role: "Community Member and Participant" },
  { text: "Thank you for the opportunity to participate. This helps us make new friends and learn new skills.", name: "Community Member", role: "Community Member and Participant" },
  { text: "Before COVID we were serving 20 to 30 meals a day. Now it is over 100.", name: "Community Member", role: "Community Member and Participant" },
  { text: "As humans, we are not supposed to be in isolation. Being together promotes a better sense of wellness.", name: "Dr. Akeem Stewart", role: "Alliance for Healthier Communities" },
  { text: "Creating culturally safe spaces and representation helps people feel safe to step forward and seek care.", name: "Dr. Akeem Stewart", role: "Alliance for Healthier Communities" },
  { text: "My name is Emma, and I am a Black Community Ambassador and an advocate for my community.", name: "Emma", role: "Community Ambassador" },
  { text: "Black Creek gives a sense of belonging. Black Creek is the beacon of our community.", name: "Emma", role: "Community Ambassador" },
];

/* ─── Partners ─── */
const partners = [
  { name: "Black Creek Community Health Centre", logo: blackCreekLogo },
  { name: "Church of St. Stephen Downsview", logo: cssdLogo },
  { name: "Alliance for Healthier Communities", logo: ahcLogo },
  { name: "Ella Charles Cuisine", logo: ellaCharlesLogo },
];

const spotlights = [
  { name: "Church of St. Stephen Downsview", contribution: "Provided venue space and community coordination for the event series", outcome: "Hosted 3 events reaching 120+ community members" },
  { name: "Alliance for Healthier Communities", contribution: "Partner speaker Akeem Stewart, M.D. presented on community health and wellness", outcome: "Connected attendees with health resources and follow-up supports" },
  { name: "Ella Charles Cuisine", contribution: "Led the Community Cooking Workshop — teaching, feeding, and equipping participants", outcome: "Participants left with meals, recipes, and supplies to take home" },
];

/* ─── Outcomes (dummy) ─── */
const outcomes = [
  { value: "120+", label: "Community Members Reached" },
  { value: "3", label: "Events Hosted" },
  { value: "4", label: "Community Partners" },
  { value: "100+", label: "Photos Captured" },
  { value: "6", label: "Video Stories" },
  { value: "50+", label: "Meals Shared" },
];

/* ─── Events ─── */
const events = [
  { label: "Afrocentric Design", value: "Programs and events rooted in Afrocentricity." },
  { label: "Culturally Affirming Care", value: "Safe, equitable care that improves Black health outcomes." },
  { label: "Social Connection", value: "Stronger relationships that reduce social isolation." },
  { label: "Cultural Food Programming", value: "Food-led programming that addresses health inequities." },
  { label: "Community Trust", value: "Community-led engagement that builds trust with providers." },
  { label: "Barrier-Free Access", value: "Barrier-free access to workshops and trainings." },
  { label: "Social Infrastructure", value: "Markets and events as community social infrastructure." },
  { label: "Black-Owned Collaboration", value: "Black-owned businesses and partners as health assets." },
];

const INITIAL_CLIPS_VISIBLE = 6;
const INITIAL_PHOTOS_VISIBLE = 12;

const HubBlackCreekBHM = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAllClips, setShowAllClips] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const handleDemoDownload = () => {
    toast({ title: "Coming Soon", description: "PDF export will be available when this hub is finalized." });
  };

  const heroVimeoId = "1174716851";

  const allMedia: MediaItem[] = useMemo(() => [
    { type: "video" as const, src: heroVimeoId, title: "Black History Month Event Series — Full Story" },
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

  const visibleClips = showAllClips ? clips : clips.slice(0, INITIAL_CLIPS_VISIBLE);
  const visiblePhotos = showAllPhotos ? photoItems : photoItems.slice(0, INITIAL_PHOTOS_VISIBLE);

  return (
    <Layout>
      <div className="pt-24 relative">
        <div className="flex">
          {/* Desktop sidebar */}
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
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors"
                    >
                      <s.icon size={14} />
                      {s.label}
                    </a>
                  ))}
                </nav>
              )}
            </aside>
          )}

          {/* Mobile dropdown nav */}
          {isMobile && (
            <div className="fixed top-[4.5rem] left-0 right-0 z-30 bg-background border-b border-border px-4 py-2">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="w-full flex items-center justify-between text-sm text-foreground font-medium"
              >
                Jump to section <ChevronDown size={16} className={`transition-transform ${mobileNavOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileNavOpen && (
                <nav className="mt-2 space-y-1 pb-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => setMobileNavOpen(false)}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          )}

          {/* Main content */}
          <main className={`flex-1 min-w-0 ${isMobile ? "pt-12" : ""}`}>

            {/* 1. Overview */}
            <section id="overview" className="py-16 md:py-28 bg-background">
              <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
                <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex justify-center mb-8">
                  <img src={blackCreekLogo} alt="Black Creek Community Health Centre" className="h-20 md:h-28 rounded-lg bg-white p-2" />
                </motion.div>
                <motion.p variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-impact-blue uppercase tracking-widest text-xs mb-4">
                  Black Creek Community Health Centre • Impact Media Hub
                </motion.p>
                <motion.h1 variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4">
                  Black History Month Community Event Series
                </motion.h1>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground text-base md:text-lg italic mb-6">
                  Afrocentric, community-rooted programming advancing health equity for Black communities.
                </motion.p>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
                  Black Creek Community Health Centre's Black History Month programming was designed to strengthen social connection, reduce isolation, and create culturally affirming care pathways. Through barrier-free workshops, cultural food programming, and collaboration with Black-owned businesses and trusted partners, these events helped build trust and improve access to community health supports.
                </motion.p>
              </div>
            </section>

            {/* 2. Events Overview */}
            <section id="initiative" className="py-16 md:py-20 bg-[hsl(var(--impact-cream))]">
              <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                <h2 className="font-serif text-2xl md:text-5xl font-bold text-foreground mb-8 md:mb-12 text-center">Community Themes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {events.map((d, idx) => (
                    <div key={d.label} className="bg-white border border-border rounded-xl p-4 md:p-6 shadow-sm">
                      <p className="text-impact-blue text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] md:tracking-widest mb-2">
                        {String(idx + 1).padStart(2, "0")} • {d.label}
                      </p>
                      <p className="text-foreground text-sm md:text-base leading-relaxed">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Hero Video — DARK */}
            <section id="hero-video" className="section-dark py-20">
              <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-8 text-center">Event Series Story</h2>
                <div
                  className="group relative overflow-hidden rounded-xl cursor-pointer bg-[hsl(var(--impact-dark))]"
                  style={{ aspectRatio: "16 / 9" }}
                  onClick={() => openVideo(heroVimeoId)}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${heroVimeoId}?background=1&autoplay=1&loop=1&muted=1`}
                    className="absolute pointer-events-none"
                    style={{ border: 0, width: "140%", height: "140%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    allow="autoplay"
                    title="Event Series Hero Video preview"
                  />
                  <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/30 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-7 h-7 text-primary-foreground ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                <p className="text-white/40 text-sm text-center mt-4">Click to play the full event series story.</p>
              </div>
            </section>

            {/* 4. Clips */}
            <section id="clips" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">Video Clips</h2>
                <HubVideoClips
                  clips={visibleClips}
                  onPlay={openVideo}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                />
                {clips.length > INITIAL_CLIPS_VISIBLE && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setShowAllClips((prev) => !prev)}
                      className="btn-secondary"
                    >
                      {showAllClips ? "Show Fewer Clips" : "View More Clips"}
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* 5. Photo Gallery — DARK */}
            <section id="photos" className="section-dark py-20">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 text-center">Photo Gallery</h2>
                <p className="text-white/40 text-sm text-center mb-12">Drop photos into <code>src/assets/hub/black-creek-bhm/photos</code> and they will auto-appear here.</p>
                <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem]">
                  {visiblePhotos.map((photo, i) => (
                    <button
                      key={i}
                      onClick={() => openPhoto(i)}
                      className="group relative mb-4 w-full overflow-hidden rounded-xl bg-white/5"
                      style={{ breakInside: "avoid" }}
                    >
                      <img
                        src={photo.src}
                        alt={photo.title || "Hub photo"}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        decoding="async"
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
                {photoItems.length > INITIAL_PHOTOS_VISIBLE && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setShowAllPhotos((prev) => !prev)}
                      className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-impact-dark"
                    >
                      {showAllPhotos ? "Show Fewer Photos" : "View More Photos"}
                    </button>
                  </div>
                )}
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

            {/* 7. Partners */}
            <section id="partners" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">Partners</h2>

                <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                  {partners.map((p) => (
                    <div key={p.name} className="h-16 md:h-20 bg-white border border-border rounded-lg px-4 py-2 flex items-center justify-center" title={p.name}>
                      <img src={p.logo} alt={p.name} className="h-full w-auto object-contain max-w-[180px]" />
                    </div>
                  ))}
                </div>

                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {spotlights.map((s) => (
                    <motion.div key={s.name} variants={slideUp} className="bg-card border border-border rounded-sm p-6 space-y-3">
                      <h3 className="font-serif text-lg font-semibold text-foreground">{s.name}</h3>
                      <p className="text-muted-foreground text-sm"><strong className="text-foreground">Contribution:</strong> {s.contribution}</p>
                      <p className="text-muted-foreground text-sm"><strong className="text-foreground">Outcome:</strong> {s.outcome}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* 8. PDF Export */}
            <section id="pdf-export" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">PDF Export</h2>
                <PdfExportPreview
                  hubTitle="Black History Month Community Event Series"
                  hubSubtitle="Black Creek Community Health Centre • February 2025"
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
                <p className="text-white/60 mb-10">Let's turn your impact into a living, shareable media page.</p>
                <div className="flex flex-wrap justify-center gap-4">
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

export default HubBlackCreekBHM;

