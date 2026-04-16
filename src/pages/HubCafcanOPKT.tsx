import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Video, Images, Quote, Handshake, FileDown, BarChart3,
  ChevronDown, Menu, X, Play, Download, Star
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
import cafcanLogo from "@/assets/logos/cafcan.png";
import upwithwomenLogo from "@/assets/hub/cafcan-opkt/logos/upwithwomen.jpg";
import cibcLogo from "@/assets/hub/cafcan-opkt/logos/cibc.svg";
import tdgLogo from "@/assets/hub/cafcan-opkt/logos/tdg.png";
import impaktLogo from "@/assets/hub/cafcan-opkt/logos/impakt-foundation.png";
import homesFirstLogo from "@/assets/hub/cafcan-opkt/logos/homes-first.png";
import christieLogo from "@/assets/hub/cafcan-opkt/logos/christie-refugee.jpg";
import torontoLogo from "@/assets/hub/cafcan-opkt/logos/toronto.png";
import cafcanFullLogo from "@/assets/hub/cafcan-opkt/logos/cafcan-full.png";

/* ─── Sections nav ─── */
const sections = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "program", label: "Program", icon: BookOpen },
  { id: "hero-video", label: "Main Film", icon: Video },
  { id: "testimonials", label: "Testimonials", icon: Quote },
  { id: "clips", label: "Testimonial Clips", icon: Play },
  { id: "photos", label: "Photos", icon: Images },
  { id: "voices", label: "Voices", icon: Quote },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "pdf-export", label: "PDF Export", icon: FileDown },
  { id: "outcomes", label: "Outcomes", icon: BarChart3 },
];

/* ─── Cohort / Tab definitions ─── */
interface CohortTab {
  id: string;
  label: string;
  location: string;
}

const cohortTabs: CohortTab[] = [
  { id: "featured", label: "Featured", location: "" },
  { id: "launch-day", label: "Launch Day", location: "CAFCAN Social Services" },
  { id: "cohort-1", label: "Cohort 1", location: "CAFCAN Social Services" },
  { id: "cohort-2", label: "Cohort 2", location: "Homes First Shelter" },
  { id: "cohort-3", label: "Cohort 3", location: "Christie Refugee Welcome Centre" },
  { id: "cohort-4", label: "Cohort 4", location: "Homes First Shelter" },
  { id: "cohort-5", label: "Cohort 5", location: "Skilled Trades" },
  { id: "cohort-6", label: "Cohort 6", location: "Entrepreneurship Module" },
];

const clipTabs: CohortTab[] = [
  { id: "featured", label: "Featured", location: "" },
  { id: "cohort-1", label: "Session 1", location: "CAFCAN Social Services" },
  { id: "cohort-2", label: "Session 2", location: "Homes First Shelter" },
  { id: "cohort-3", label: "Session 3", location: "Christie Refugee Welcome Centre" },
  { id: "cohort-4", label: "Session 4", location: "Homes First Shelter" },
  { id: "cohort-5", label: "Session 5", location: "Skilled Trades" },
  { id: "cohort-6", label: "Session 6", location: "Entrepreneurship Module" },
];

/* ─── Photo imports (auto-discovered per cohort) ─── */
const photoModulesCohort1 = import.meta.glob<{ default: string }>(
  "../assets/hub/cafcan-opkt/photos/cohort-1/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);
const photoModulesCohort2 = import.meta.glob<{ default: string }>(
  "../assets/hub/cafcan-opkt/photos/cohort-2/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);
const photoModulesCohort3 = import.meta.glob<{ default: string }>(
  "../assets/hub/cafcan-opkt/photos/cohort-3/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);
const photoModulesCohort4 = import.meta.glob<{ default: string }>(
  "../assets/hub/cafcan-opkt/photos/cohort-4/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);
const photoModulesCohort5 = import.meta.glob<{ default: string }>(
  "../assets/hub/cafcan-opkt/photos/cohort-5/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);
const photoModulesCohort6 = import.meta.glob<{ default: string }>(
  "../assets/hub/cafcan-opkt/photos/cohort-6/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);
const photoModulesLaunchDay = import.meta.glob<{ default: string }>(
  "../assets/hub/cafcan-opkt/photos/launch-day/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);

const modulesToItems = (modules: Record<string, { default: string }>): MediaItem[] =>
  Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, mod], i) => ({
      type: "photo" as const,
      src: mod.default,
      title: `Photo ${i + 1}`,
    }));

const photoByCohort: Record<string, MediaItem[]> = {
  "cohort-1": modulesToItems(photoModulesCohort1),
  "cohort-2": modulesToItems(photoModulesCohort2),
  "cohort-3": modulesToItems(photoModulesCohort3),
  "cohort-4": modulesToItems(photoModulesCohort4),
  "cohort-5": modulesToItems(photoModulesCohort5),
  "cohort-6": modulesToItems(photoModulesCohort6),
  "launch-day": modulesToItems(photoModulesLaunchDay),
};

/* Build featured from first 2 of each cohort */
const seededShuffle = <T,>(items: T[], seed = 20260415) => {
  const result = [...items];
  const random = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
};

const featuredPhotos = seededShuffle(
  Object.values(photoByCohort).flatMap(photos => photos.slice(0, 3))
);

const allPhotosFlat = [
  ...featuredPhotos,
  ...Object.values(photoByCohort).flat(),
];

/* ─── Video clips (placeholder: Vimeo IDs to be added per cohort) ─── */
// Each cohort will have its own clips array once Vimeo uploads are done
// For now, the clips section shows a placeholder message
interface ClipDef {
  title: string;
  vimeoId: string;
  cohort: string;
}

const clips: ClipDef[] = [
  { title: "Session 1 - Testimonial 1", vimeoId: "1183558854", cohort: "cohort-1" },
  { title: "Session 1 - Testimonial 2", vimeoId: "1183558804", cohort: "cohort-1" },
  { title: "Session 1 - Testimonial 3", vimeoId: "1183558844", cohort: "cohort-1" },

  { title: "Session 2 - Testimonial 1", vimeoId: "1183558964", cohort: "cohort-2" },
  { title: "Session 2 - Testimonial 2", vimeoId: "1183558944", cohort: "cohort-2" },
  { title: "Session 2 - Testimonial 3", vimeoId: "1183558918", cohort: "cohort-2" },
  { title: "Session 2 - Testimonial 4", vimeoId: "1183558892", cohort: "cohort-2" },
  { title: "Session 2 - Testimonial 5", vimeoId: "1183558872", cohort: "cohort-2" },

  { title: "Session 3 - Testimonial 1", vimeoId: "1183604690", cohort: "cohort-3" },
  { title: "Session 3 - Testimonial 2", vimeoId: "1183604705", cohort: "cohort-3" },
  { title: "Session 3 - Testimonial 3", vimeoId: "1183604763", cohort: "cohort-3" },
  { title: "Session 3 - Testimonial 4", vimeoId: "1183604733", cohort: "cohort-3" },
  { title: "Session 3 - Testimonial 5", vimeoId: "1183604782", cohort: "cohort-3" },

  { title: "Session 4 - Testimonial 1", vimeoId: "1183559430", cohort: "cohort-4" },
  { title: "Session 4 - Testimonial 2", vimeoId: "1183559484", cohort: "cohort-4" },
  { title: "Session 4 - Testimonial 3", vimeoId: "1183559402", cohort: "cohort-4" },
  { title: "Session 4 - Testimonial 4", vimeoId: "1183559448", cohort: "cohort-4" },
  { title: "Session 4 - Testimonial 5", vimeoId: "1183559470", cohort: "cohort-4" },
  { title: "Session 4 - Testimonial 6", vimeoId: "1183559379", cohort: "cohort-4" },

  { title: "Session 5 - Testimonial 1", vimeoId: "1183559582", cohort: "cohort-5" },
  { title: "Session 5 - Testimonial 2", vimeoId: "1183559561", cohort: "cohort-5" },
  { title: "Session 5 - Testimonial 3", vimeoId: "1183559543", cohort: "cohort-5" },
  { title: "Session 5 - Testimonial 4", vimeoId: "1183559509", cohort: "cohort-5" },

  { title: "Session 6 - Testimonial 1", vimeoId: "1183559671", cohort: "cohort-6" },
  { title: "Session 6 - Testimonial 2", vimeoId: "1183559635", cohort: "cohort-6" },
  { title: "Session 6 - Testimonial 3", vimeoId: "1183559658", cohort: "cohort-6" },
  { title: "Session 6 - Testimonial 4", vimeoId: "1183559617", cohort: "cohort-6" },
];

/* ─── Program pillars ─── */
const programPillars = [
  { label: "Employment Readiness", value: "Canadian workplace culture training, resume development, and networking strategies." },
  { label: "Career Development", value: "Career exploration, interview skills, and entrepreneurship foundations." },
  { label: "Health & Wellness", value: "Culturally safe workshops on mental health, physical wellbeing, and coping with displacement." },
  { label: "Civic Engagement", value: "Volunteering opportunities and leadership development within local communities." },
  { label: "Food Security", value: "Weekly culturally relevant food baskets through Afri-Can FoodBasket partnerships." },
  { label: "System Navigation", value: "Guidance accessing federal and provincial programs, healthcare, and education." },
];

/* ─── Quotes (placeholder, to be filled from real testimonials) ─── */
const quotes = [
  { text: "This program gave me the confidence to advocate for myself and my family in a country where everything felt unfamiliar.", name: "Program Participant", role: "OPKT Cohort Member" },
  { text: "The workshops helped me understand the Canadian job market and build connections I never thought possible.", name: "Program Participant", role: "OPKT Cohort Member" },
  { text: "Being surrounded by people who understand your journey makes all the difference. OPKT gave us that community.", name: "Program Participant", role: "OPKT Cohort Member" },
  { text: "I came to Canada with uncertainty. Through this program, I found a path forward and people who believed in me.", name: "Program Participant", role: "OPKT Cohort Member" },
  { text: "The entrepreneurship module opened my eyes to possibilities I had never considered before arriving here.", name: "Program Participant", role: "OPKT Cohort Member" },
  { text: "OPKT is more than a program. It is a family that helps you stand on your own feet.", name: "Program Participant", role: "OPKT Cohort Member" },
];

/* ─── Outcomes ─── */
const outcomes = [
  { value: "7", label: "Cohort Sessions Delivered" },
  { value: "6", label: "Partner Locations" },
  { value: "150+", label: "Photos Captured" },
  { value: "1", label: "Job Fair Hosted" },
];

const partnerLogos = [
  { name: "Up With Women", logo: upwithwomenLogo, darkBg: false },
  { name: "CIBC", logo: cibcLogo, darkBg: false },
  { name: "TDG", logo: tdgLogo, darkBg: false },
  { name: "Impakt Foundation for Social Change", logo: impaktLogo, darkBg: false },
  { name: "Homes First", logo: homesFirstLogo, darkBg: true },
  { name: "Christie Refugee Welcome Centre", logo: christieLogo, darkBg: true },
  { name: "City of Toronto", logo: torontoLogo, darkBg: true },
  { name: "CAFCAN Social Services", logo: cafcanLogo, darkBg: false },
];

const INITIAL_PHOTOS_VISIBLE = 12;

/* ─── Tab Button component ─── */
const TabBar = ({
  tabs,
  activeTab,
  onSelect,
}: {
  tabs: CohortTab[];
  activeTab: string;
  onSelect: (id: string) => void;
}) => (
  <div className="flex flex-wrap gap-2 mb-8 justify-center">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onSelect(tab.id)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeTab === tab.id
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-white/10"
        }`}
      >
        {tab.id === "featured" && <Star className="w-3 h-3 inline mr-1 -mt-0.5" />}
        {tab.label}
        {tab.location && (
          <span className="hidden sm:inline text-[10px] ml-1 opacity-60">
            {tab.location}
          </span>
        )}
      </button>
    ))}
  </div>
);

const LightTabBar = ({
  tabs,
  activeTab,
  onSelect,
}: {
  tabs: CohortTab[];
  activeTab: string;
  onSelect: (id: string) => void;
}) => (
  <div className="flex flex-wrap gap-2 mb-8 justify-center">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onSelect(tab.id)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeTab === tab.id
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border"
        }`}
      >
        {tab.id === "featured" && <Star className="w-3 h-3 inline mr-1 -mt-0.5" />}
        {tab.label}
      </button>
    ))}
  </div>
);

/* ─── Main Page ─── */
const HubCafcanOPKT = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [photoTab, setPhotoTab] = useState("featured");
  const [clipTab, setClipTab] = useState("featured");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [zipping, setZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  const heroVimeoId = "1143331891";
  const featuredYouTubeId = "lcdbgNcaMe8";

  /* Get current tab's photos */
  const currentPhotos = useMemo(() => {
    if (photoTab === "featured") return featuredPhotos;
    return photoByCohort[photoTab] || [];
  }, [photoTab]);

  const visiblePhotos = showAllPhotos ? currentPhotos : currentPhotos.slice(0, INITIAL_PHOTOS_VISIBLE);

  /* Get current tab's clips */
  const currentClips = useMemo(() => {
    if (clipTab === "featured") return clips.slice(0, 6);
    return clips.filter(c => c.cohort === clipTab);
  }, [clipTab]);

  /* Media lightbox array */
  const allMedia: MediaItem[] = useMemo(() => [
    { type: "video" as const, src: heroVimeoId, title: "CAFCAN OPKT Program \u2014 Our People\u2019s Keeper, Too" },
    ...clips.map(c => ({ type: "video" as const, src: c.vimeoId, title: c.title })),
    ...allPhotosFlat,
  ], []);

  const openVideo = (vimeoId: string) => {
    const idx = allMedia.findIndex(m => m.type === "video" && m.src === vimeoId);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const openPhoto = (photoIndex: number) => {
    const photo = visiblePhotos[photoIndex];
    if (!photo) return;
    const idx = allMedia.findIndex(m => m.type === "photo" && m.src === photo.src);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const handleDemoDownload = () => {
    toast({ title: "Coming Soon", description: "PDF export will be available when this hub is finalized." });
  };

  const downloadSinglePhoto = useCallback(async (src: string, title?: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = title ? `${title.replace(/[^a-zA-Z0-9-_ ]/g, "")}.png` : "photo.png";
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
      const folder = zip.folder("cafcan-opkt-photos");
      const photos = currentPhotos;
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const response = await fetch(photo.src);
        const blob = await response.blob();
        const ext = blob.type.includes("png") ? "png" : "jpg";
        folder!.file(`photo-${i + 1}.${ext}`, blob);
        setZipProgress(Math.round(((i + 1) / photos.length) * 100));
      }
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `cafcan-opkt-${photoTab}-photos.zip`);
    } catch {
      toast({ title: "Download failed", description: "Could not build the ZIP file. Try again." });
    } finally {
      setZipping(false);
      setZipProgress(0);
    }
  }, [zipping, toast, currentPhotos, photoTab]);

  return (
    <Layout>
      <div className="pt-24 relative">
        <div className="flex">
          {/* Desktop sidebar */}
          {!isMobile && (
            <aside className={`sticky top-24 h-[calc(100vh-6rem)] transition-all duration-300 shrink-0 ${sidebarOpen ? "w-56" : "w-12"} border-r border-border bg-background z-30`}>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-center py-3 text-muted-foreground hover:text-foreground" aria-label="Toggle sidebar">
                {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              {sidebarOpen && (
                <nav className="px-3 space-y-1 overflow-y-auto">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors">
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

          {/* Main content */}
          <main className={`flex-1 min-w-0 ${isMobile ? "pt-12" : ""}`}>

            {/* 1. Overview */}
            <section id="overview" className="py-16 md:py-28 bg-background">
              <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
                <motion.p variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-impact-blue uppercase tracking-widest text-xs mb-4">
                  Caribbean African Canadian Social Services (CAFCAN) &bull; Impact Media Hub
                </motion.p>
                <motion.h1 variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4">
                  Our People's Keeper, Too
                </motion.h1>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground text-base md:text-lg italic mb-6">
                  Empowering African asylum seekers as they transition into life in Canada.
                </motion.p>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-2xl mx-auto">
                  The Our People's Keeper, Too (OPKT) program is a culturally responsive initiative by CAFCAN, specifically designed to bridge the gap between arrival and long-term stability for African asylum seekers. Through interactive workshops covering employment readiness, career development, health and wellness, and civic engagement, participants gain practical skills, community connections, and the confidence to build new lives in Canada.
                </motion.p>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground/60 text-xs leading-relaxed max-w-xl mx-auto">
                  Grounded in Africentric values, the Ma'at principles, and Nguzo Saba (Seven Principles of Kwanzaa), OPKT ensures that support is practical, spiritually affirming, and culturally responsive for the African diaspora.
                </motion.p>
              </div>
            </section>

            {/* 2. Program Pillars */}
            <section id="program" className="py-16 md:py-20 bg-[hsl(var(--impact-cream))]">
              <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                <h2 className="font-serif text-2xl md:text-5xl font-bold text-foreground mb-8 md:mb-12 text-center">Program Pillars</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {programPillars.map((d, idx) => (
                    <div key={d.label} className="bg-white border border-border rounded-xl p-4 md:p-6 shadow-sm">
                      <p className="text-impact-blue text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] md:tracking-widest mb-2">
                        {String(idx + 1).padStart(2, "0")} &bull; {d.label}
                      </p>
                      <p className="text-foreground text-sm md:text-base leading-relaxed">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Hero Video */}
            <section id="hero-video" className="section-dark py-20">
              <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-8 text-center">The OPKT Story</h2>
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
                    title="OPKT Program Story preview"
                  />
                  <div className="absolute inset-0 bg-[hsl(var(--impact-dark))]/30 group-hover:bg-[hsl(var(--impact-dark))]/60 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-7 h-7 text-primary-foreground ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                <p className="text-white/40 text-sm text-center mt-4">Click to play the full OPKT program story.</p>
              </div>
            </section>

            {/* 4. Featured Testimonial */}
            <section id="testimonials" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-center">Participant Voices</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  Hearing directly from participants is the most powerful proof of impact. These are the voices that remind us why this work matters.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Featured testimonial video (YouTube) */}
                  <div className="relative overflow-hidden rounded-xl bg-black lg:mt-8" style={{ aspectRatio: "16 / 9" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${featuredYouTubeId}?rel=0&modestbranding=1`}
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Featured OPKT Participant Testimonial"
                    />
                  </div>

                  {/* Write-up */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Quote className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        Why These Stories Matter
                      </h3>
                    </div>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Every participant in the OPKT program arrived in Canada carrying uncertainty, resilience, and a story that deserves to be heard. These testimonials are not promotional content. They are real voices from real people sharing what it meant to find community, build skills, and regain confidence during one of the most difficult transitions of their lives.
                      </p>
                      <p>
                        Hearing from participants directly is the strongest evidence that this program works. Their words carry a weight that no report or metric can replicate, and they remind us that behind every statistic is a human being rebuilding their life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Testimonial Clips */}
            <section id="clips" className="py-20 bg-[hsl(var(--impact-cream))]">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-center">Testimonial Clips</h2>
                <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">
                  Testimonial clips from each session. Select a session to explore participant stories.
                </p>

                <LightTabBar tabs={clipTabs} activeTab={clipTab} onSelect={setClipTab} />

                {currentClips.length > 0 ? (
                  <HubVideoClips
                    clips={currentClips}
                    onPlay={openVideo}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                  />
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-border">
                    <Video className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">
                      Video clips for this session are being uploaded to Vimeo.
                    </p>
                    <p className="text-muted-foreground/60 text-xs mt-1">
                      Check back soon for looping preview clips from each cohort.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* 6. Photo Gallery (tabbed) — DARK */}
            <section id="photos" className="section-dark py-20">
              <div className="container mx-auto px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-white text-center sm:text-left">Photo Gallery</h2>
                  <button
                    onClick={downloadAllPhotos}
                    disabled={zipping}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
                  >
                    <Download size={16} />
                    {zipping ? `Zipping\u2026 ${zipProgress}%` : `Download All (${currentPhotos.length})`}
                  </button>
                </div>

                <TabBar tabs={cohortTabs} activeTab={photoTab} onSelect={(id) => { setPhotoTab(id); setShowAllPhotos(false); }} />

                {currentPhotos.length > 0 ? (
                  <>
                    <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem]">
                      {visiblePhotos.map((photo, i) => (
                        <div
                          key={`${photoTab}-${i}`}
                          className="group relative mb-4 w-full overflow-hidden rounded-xl bg-white/5"
                          style={{ breakInside: "avoid" }}
                        >
                          <button onClick={() => openPhoto(i)} className="w-full">
                            <img
                              src={photo.src}
                              alt={photo.title || "OPKT program photo"}
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
                          >
                            <Download size={14} className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {currentPhotos.length > INITIAL_PHOTOS_VISIBLE && (
                      <div className="mt-10 text-center">
                        <button
                          onClick={() => setShowAllPhotos((prev) => !prev)}
                          className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-impact-dark"
                        >
                          {showAllPhotos ? "Show Fewer Photos" : `View All ${currentPhotos.length} Photos`}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
                    <Images className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/50 text-sm">No photos for this session yet.</p>
                  </div>
                )}
              </div>
            </section>

            {/* 7. Voices / Quotes */}
            <section id="voices" className="py-20 bg-background">
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

            {/* 8. Partners */}
            <section id="partners" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-center">Partners</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  Community and institutional partners helping deliver the OPKT program across the GTA.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  {partnerLogos.map((partner) => (
                    <motion.div
                      key={partner.name}
                      variants={slideUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className={`border border-border rounded-xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 min-h-32 ${
                        partner.darkBg ? "bg-gray-800" : "bg-white"
                      }`}
                    >
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-h-14 w-auto max-w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                      <p className={`text-xs md:text-sm text-center leading-tight ${partner.darkBg ? "text-white" : "text-foreground"}`}>{partner.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 9. PDF Export */}
            <section id="pdf-export" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">PDF Export</h2>
                <PdfExportPreview
                  hubTitle="Our People's Keeper, Too (OPKT)"
                  hubSubtitle="CAFCAN Social Services \u2022 2025\u20132026"
                  outcomes={outcomes}
                  quotes={quotes}
                  onDownload={handleDemoDownload}
                />
              </div>
            </section>

            {/* 10. Quick Outcomes — DARK */}
            <section id="outcomes" className="section-dark py-20">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-12 text-center">Quick Outcomes</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {outcomes.map((o) => (
                    <div key={o.label} className="bg-white/5 border border-white/10 rounded-sm p-6 text-center">
                      <p className="font-serif text-3xl font-bold text-impact-blue">{o.value}</p>
                      <p className="text-white/50 text-xs mt-1">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 11. Final CTA */}
            <section className="section-dark py-24 border-t border-white/10">
              <div className="container mx-auto px-6 text-center max-w-2xl">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Build Your Impact Media Hub</h2>
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

export default HubCafcanOPKT;
