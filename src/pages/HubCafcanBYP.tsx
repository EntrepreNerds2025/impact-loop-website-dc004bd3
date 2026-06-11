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

import cafcanLogo from "@/assets/hub/cafcan-opkt/logos/cafcan-full.png";

/* ─────────────────────────────────────────────────────────────
   CAFCAN Black Youth Program × Newtonbrook Secondary School
   Impact Media Hub
   ───────────────────────────────────────────────────────────── */

/* ─── Sections nav (Story + Clips appear only when their media exists) ─── */
const baseSectionsTop = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "initiative", label: "Program Pillars", icon: BookOpen },
];
const baseSectionsBottom = [
  { id: "photos", label: "Photos", icon: Images },
  { id: "quotes", label: "Voices", icon: Quote },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "pdf-export", label: "PDF Export", icon: FileDown },
  { id: "outcomes", label: "Outcomes", icon: BarChart3 },
];

/* ─── Hero video ───
   When a program film is ready, paste its Vimeo numeric ID here and the hero
   automatically swaps from the group photo to the video. */
const heroVimeoId = "";

/* ─── Clips (Vimeo) ─── */
const clips: { title: string; vimeoId: string }[] = [
  { title: "Javonte — Program Testimonial", vimeoId: "1200474919" },
  { title: "Isaiah — Program Testimonial", vimeoId: "1200474918" },
  { title: "Ben — Program Testimonial", vimeoId: "1200474920" },
  { title: "Refugee Skills Trade Session — Reflection 1", vimeoId: "1200479865" },
  { title: "Refugee Skills Trade Session — Reflection 2", vimeoId: "1200479868" },
  { title: "Refugee Skills Trade Session — Reflection 3", vimeoId: "1200479866" },
  { title: "Refugee Skills Trade Session — Reflection 4", vimeoId: "1200479869" },
];

/* ─── Photos ───
   Drop image files into:  src/assets/hub/cafcan-byp-newtonbrook/photos
   They auto-load below. The group photo (HERO_PHOTO_BASENAME) is pulled out
   to use as the hero and is excluded from the gallery. */
const HERO_PHOTO_BASENAME = "NLSC CAM 27005.00_01_47_42.Still005";

const localPhotoModules = import.meta.glob<{ default: string }>(
  "../assets/hub/cafcan-byp-newtonbrook/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);

const toBaseNameFromPath = (filePath: string) =>
  filePath.split("/").pop()?.replace(/\.[^/.]+$/, "") ?? "";

const toTitleFromPath = (filePath: string) => {
  const fileName = toBaseNameFromPath(filePath);
  return fileName.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
};

const seededShuffle = <T,>(items: T[]) => {
  const result = [...items];
  let seed = 20260610;
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

const heroPhotoEntry = sortedPhotoEntries.find(
  ([filePath]) => toBaseNameFromPath(filePath) === HERO_PHOTO_BASENAME
);
const heroImage: string | undefined = heroPhotoEntry ? heroPhotoEntry[1].default : undefined;

const galleryPhotoEntries = sortedPhotoEntries.filter(
  ([filePath]) => toBaseNameFromPath(filePath) !== HERO_PHOTO_BASENAME
);

const photoItems: MediaItem[] = seededShuffle(galleryPhotoEntries).map(([filePath, module], index) => ({
  type: "photo",
  src: module.default,
  title: toTitleFromPath(filePath) || `Program Photo ${index + 1}`,
}));

/* ─── Voices ───
   Placeholder quotes themed to the program. Replace with real participant,
   mentor, and educator quotes when you have consent to publish them. */
const quotes = [
  { text: "I learned things about my history that no class ever taught me. Now I walk different because I know where I come from.", name: "Program Participant", role: "Newtonbrook Student" },
  { text: "These young men arrive unsure of themselves and leave standing taller, speaking up, and looking out for each other.", name: "Program Mentor", role: "CAFCAN Black Youth Program" },
  { text: "It is not just about the past. It is about who they are becoming and the future they now believe is theirs.", name: "Program Facilitator", role: "CAFCAN" },
  { text: "We see brotherhood form in this room. They hold each other accountable and celebrate each other's wins.", name: "Program Mentor", role: "CAFCAN Black Youth Program" },
  { text: "Having this space inside our school tells our Black students they belong here and their story matters.", name: "School Staff", role: "Newtonbrook Secondary School" },
  { text: "For the first time, I see myself in the people we learn about. That changes how I see what I can do.", name: "Program Participant", role: "Newtonbrook Student" },
];

/* ─── Program Pillars ─── */
const pillars = [
  { label: "Roots & History", value: "Learning the Black history, heritage, and ancestry too often left out of the classroom." },
  { label: "Identity & Self-Worth", value: "Helping young Black men know who they are and carry their identity with pride." },
  { label: "Confidence & Voice", value: "Building the confidence to speak, lead, and take up space without apology." },
  { label: "Brotherhood", value: "Creating a circle of accountability and belonging where young men support one another." },
  { label: "Mentorship", value: "Connecting students with mentors who reflect them and believe in their potential." },
  { label: "Future & Excellence", value: "Turning self-knowledge into aspiration, focus, and momentum toward their future." },
  { label: "School Belonging", value: "Affirming that Black students belong fully within the life of Newtonbrook Secondary School." },
  { label: "Hands-On Skills", value: "Real-world experiences like the Refugee Skills Trade sessions that build practical confidence." },
];

/* ─── Partners ─── */
const partners: { name: string; logo?: string }[] = [
  { name: "CAFCAN Social Services", logo: cafcanLogo },
  { name: "Newtonbrook Secondary School" },
];

const spotlights = [
  { name: "CAFCAN Social Services", contribution: "Designed and led the Black Youth Program, bringing culturally grounded mentorship, history-based learning, and hands-on skills sessions to students.", outcome: "Created a consistent, affirming space for young Black men to learn and grow." },
  { name: "Newtonbrook Secondary School", contribution: "Opened its doors to host the program, embedding the work directly within the school day and community.", outcome: "Brought identity-affirming programming to students where they already are." },
];

/* ─── Outcomes (qualitative) ─── */
const outcomes = [
  { value: "Roots", label: "Grounded in Black history & heritage" },
  { value: "Identity", label: "Stronger sense of self and pride" },
  { value: "Confidence", label: "Greater voice and self-belief" },
  { value: "Brotherhood", label: "Belonging and mutual accountability" },
  { value: "Mentorship", label: "Trusted role models who reflect them" },
  { value: "Future", label: "Aspiration toward excellence" },
];

const INITIAL_CLIPS_VISIBLE = 6;
const INITIAL_PHOTOS_VISIBLE = 12;

const sections = [
  ...baseSectionsTop,
  ...((heroVimeoId || heroImage) ? [{ id: "hero-video", label: "Story", icon: Video }] : []),
  ...(clips.length > 0 ? [{ id: "clips", label: "Clips", icon: Play }] : []),
  ...baseSectionsBottom,
];

const HubCafcanBYP = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAllClips, setShowAllClips] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const allMedia: MediaItem[] = useMemo(() => [
    ...(heroVimeoId ? [{ type: "video" as const, src: heroVimeoId, title: "CAFCAN Black Youth Program, Full Story" }] : []),
    ...clips.map(c => ({ type: "video" as const, src: c.vimeoId, title: c.title })),
    ...photoItems,
  ], []);

  const openVideo = (vimeoId: string) => {
    const idx = allMedia.findIndex(m => m.type === "video" && m.src === vimeoId);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const openPhoto = (photoIndex: number) => {
    const offset = (heroVimeoId ? 1 : 0) + clips.length;
    setLightboxIndex(offset + photoIndex);
  };

  const [zipping, setZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  const visibleClips = showAllClips ? clips : clips.slice(0, INITIAL_CLIPS_VISIBLE);
  const visiblePhotos = showAllPhotos ? photoItems : photoItems.slice(0, INITIAL_PHOTOS_VISIBLE);

  const downloadSinglePhoto = useCallback(async (src: string, title?: string) => {
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
      window.open(src, "_blank");
    }
  }, []);

  const downloadAllPhotos = useCallback(async () => {
    if (zipping) return;
    setZipping(true);
    setZipProgress(0);
    try {
      const zip = new JSZip();
      const folder = zip.folder("cafcan-byp-newtonbrook-photos");
      for (let i = 0; i < photoItems.length; i++) {
        const photo = photoItems[i];
        const response = await fetch(photo.src);
        const blob = await response.blob();
        const ext = blob.type.includes("png") ? "png" : "jpg";
        const name = photo.title
          ? `${photo.title.replace(/[^a-zA-Z0-9-_ ]/g, "")}.${ext}`
          : `photo-${i + 1}.${ext}`;
        folder!.file(name, blob);
        setZipProgress(Math.round(((i + 1) / photoItems.length) * 100));
      }
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "cafcan-byp-newtonbrook-photos.zip");
    } catch (err) {
      toast({ title: "Download failed", description: "Could not build the ZIP file. Try again." });
    } finally {
      setZipping(false);
      setZipProgress(0);
    }
  }, [zipping, toast]);

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
                  <img src={cafcanLogo} alt="CAFCAN Social Services" className="h-20 md:h-28 rounded-lg bg-white p-2" />
                </motion.div>
                <motion.p variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-impact-blue uppercase tracking-widest text-xs mb-4">
                  CAFCAN • Newtonbrook Secondary School • Impact Media Hub
                </motion.p>
                <motion.h1 variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4">
                  Black Youth Program at Newtonbrook
                </motion.h1>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground text-base md:text-lg italic mb-6">
                  Helping young Black men know their history, claim their identity, and step into their future with confidence.
                </motion.p>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
                  CAFCAN's Black Youth Program, hosted in partnership with Newtonbrook Secondary School, gives young Black men a space to learn the history and heritage they are rarely taught, to understand who they are, and to build the confidence and brotherhood that carry them forward. Grounded in CAFCAN's decades of service to Caribbean and African Canadian communities, the program treats identity not as a lesson but as a foundation, turning self-knowledge into aspiration, leadership, and a clear belief in the future they are capable of building.
                </motion.p>
              </div>
            </section>

            {/* 2. Program Pillars */}
            <section id="initiative" className="py-16 md:py-20 bg-[hsl(var(--impact-cream))]">
              <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                <h2 className="font-serif text-2xl md:text-5xl font-bold text-foreground mb-8 md:mb-12 text-center">Program Pillars</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {pillars.map((d, idx) => (
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

            {/* 3. Hero Story, DARK — group photo now, swaps to video when heroVimeoId is set */}
            {(heroVimeoId || heroImage) && (
              <section id="hero-video" className="section-dark py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-8 text-center">Program Story</h2>
                  {heroVimeoId ? (
                    <>
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
                          title="Program Hero Video preview"
                        />
                        <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/30 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-7 h-7 text-primary-foreground ml-1" fill="white" />
                          </div>
                        </div>
                      </div>
                      <p className="text-white/40 text-sm text-center mt-4">Click to play the full program story.</p>
                    </>
                  ) : (
                    <>
                      <div className="relative overflow-hidden rounded-xl bg-[hsl(var(--impact-dark))]" style={{ aspectRatio: "16 / 9" }}>
                        <img
                          src={heroImage}
                          alt="The CAFCAN Black Youth Program cohort at Newtonbrook Secondary School"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white/40 text-sm text-center mt-4">The Black Youth Program cohort at Newtonbrook Secondary School. A program film will live here soon.</p>
                    </>
                  )}
                </div>
              </section>
            )}

            {/* 4. Clips */}
            {clips.length > 0 && (
              <section id="clips" className="py-20 bg-background">
                <div className="container mx-auto px-6">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-center">Voices of the Program</h2>
                  <p className="text-muted-foreground text-center text-sm md:text-base mb-12 max-w-2xl mx-auto">Testimonials from the young men, including reflections from CAFCAN's Refugee Skills Trade sessions.</p>
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
            )}

            {/* 5. Photo Gallery, DARK */}
            <section id="photos" className="section-dark py-20">
              <div className="container mx-auto px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-white text-center sm:text-left">Photo Gallery</h2>
                  {photoItems.length > 0 && (
                    <button
                      onClick={downloadAllPhotos}
                      disabled={zipping}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                      <Download size={16} />
                      {zipping ? `Zipping… ${zipProgress}%` : `Download All (${photoItems.length})`}
                    </button>
                  )}
                </div>

                {photoItems.length === 0 ? (
                  <div className="border border-dashed border-white/20 rounded-xl py-16 text-center">
                    <Images className="w-8 h-8 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60 text-sm">
                      Drop program photos into <code className="text-white/80">src/assets/hub/cafcan-byp-newtonbrook/photos</code> and they will auto-appear here.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-white/40 text-sm text-center sm:text-left mb-12">Photos from the CAFCAN Black Youth Program at Newtonbrook Secondary School.</p>
                    <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem]">
                      {visiblePhotos.map((photo, i) => (
                        <div
                          key={i}
                          className="group relative mb-4 w-full overflow-hidden rounded-xl bg-white/5"
                          style={{ breakInside: "avoid" }}
                        >
                          <button onClick={() => openPhoto(i)} className="w-full">
                            <img
                              src={photo.src}
                              alt={photo.title || "Hub photo"}
                              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              decoding="async"
                              loading="lazy"
                            />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); downloadSinglePhoto(photo.src, photo.title); }}
                            className="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                            aria-label="Download photo"
                            title="Download photo"
                          >
                            <Download size={14} className="text-white" />
                          </button>
                          {photo.title && (
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <p className="text-white text-xs">{photo.title}</p>
                            </div>
                          )}
                        </div>
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
                  </>
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
                      {p.logo ? (
                        <img src={p.logo} alt={p.name} className="h-full w-auto object-contain max-w-[180px]" />
                      ) : (
                        <span className="font-serif text-sm md:text-base font-semibold text-foreground text-center px-2">{p.name}</span>
                      )}
                    </div>
                  ))}
                </div>

                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-3xl mx-auto">
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
                  hubTitle="CAFCAN Black Youth Program at Newtonbrook"
                  hubSubtitle="CAFCAN Social Services • Newtonbrook Secondary School"
                  outcomes={outcomes}
                  quotes={quotes}
                  isDemoMode={false}
                  hideDownload
                />
              </div>
            </section>

            {/* 9. Quick Outcomes, DARK */}
            <section id="outcomes" className="section-dark py-20">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-12 text-center">What the Program Builds</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {outcomes.map((o) => (
                    <div key={o.label} className="bg-white/5 border border-white/10 rounded-sm p-6 text-center">
                      <p className="font-serif text-2xl font-bold text-impact-blue">{o.value}</p>
                      <p className="text-white/50 text-xs mt-1">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 10. Final CTA, DARK */}
            <section className="section-dark py-24 border-t border-white/10">
              <div className="container mx-auto px-6 text-center max-w-2xl">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Build your Impact Media Hub</h2>
                <p className="text-white/60 mb-10">Let's turn your program's impact into a living, shareable media page.</p>
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

export default HubCafcanBYP;
