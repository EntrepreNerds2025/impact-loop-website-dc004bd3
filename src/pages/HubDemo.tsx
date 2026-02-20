import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, BarChart3, Handshake, DollarSign, Shield, Download, Images, CalendarDays,
  Check, Copy, ExternalLink, ChevronDown, Menu, X
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { slideUp, staggerContainer, fadeIn } from "@/hooks/useScrollAnimation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

/* ─── Program / Initiative Data ─── */
const programs = [
  { id: "all", label: "All Programs" },
  { id: "youth-futures", label: "Youth Futures" },
  { id: "skills-bridge", label: "Skills Bridge" },
  { id: "community-connect", label: "Community Connect" },
];

/* ─── Stories ─── */
const stories = [
  {
    id: 1, program: "youth-futures",
    title: "From Classroom to Career: Amara's Journey",
    narrative: "Amara joined EmployNext's Youth Futures program at 19, uncertain about her path after high school. Through a 12-week intensive combining job-readiness workshops, mentorship pairings, and real-world employer placements, she discovered a passion for digital marketing. Today, she works full-time at a local agency and mentors new participants.",
    quote: { text: "They didn't just teach me skills — they showed me I already had them.", author: "Amara T., Program Graduate" },
    outcome: "128 youth trained",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 2, program: "skills-bridge",
    title: "Bridging the Gap: How Skills Bridge Reached 50 Employers",
    narrative: "Skills Bridge was designed to connect mid-career professionals with employers struggling to fill technical roles. By pairing industry-specific micro-credentials with mentorship from hiring managers, the program achieved a 78% completion rate and placed 89 participants into permanent roles within six months.",
    quote: { text: "We didn't lower the bar — we built a better ladder.", author: "David K., Employer Partner" },
    outcome: "89 job placements",
    videoId: "ScMzIvxBSi4",
  },
  {
    id: 3, program: "community-connect",
    title: "Community Connect: 12 Events That Changed a Neighbourhood",
    narrative: "What began as a small neighbourhood cleanup grew into a 12-event series spanning financial literacy workshops, family wellness days, and cultural celebrations. Community Connect brought together 1,200 volunteer hours and strengthened ties between three previously disconnected community associations.",
    quote: { text: "For the first time, we felt like one neighbourhood — not three.", author: "Rosa M., Community Organizer" },
    outcome: "1,200 volunteer hours",
    videoId: "LXb3EKWsInQ",
  },
];

/* ─── Outcomes ─── */
const allOutcomes = [
  { value: "420", label: "Youth Served", program: "youth-futures" },
  { value: "78%", label: "Completion Rate", program: "skills-bridge" },
  { value: "24", label: "Employer Partners", program: "skills-bridge" },
  { value: "68", label: "Workshops Delivered", program: "youth-futures" },
  { value: "310", label: "Certifications Earned", program: "skills-bridge" },
  { value: "1,200", label: "Volunteer Hours", program: "community-connect" },
  { value: "89", label: "Job Placements", program: "skills-bridge" },
  { value: "12", label: "Community Events", program: "community-connect" },
];

/* ─── Partners ─── */
const partnerLogos = [
  { initials: "AC", name: "Apex Corp" },
  { initials: "BF", name: "Bright Foundation" },
  { initials: "GH", name: "GreenHouse" },
  { initials: "NW", name: "NorthWind" },
  { initials: "TL", name: "TrueLight" },
  { initials: "VP", name: "VisionPoint" },
];

/* ─── Financials ─── */
const financials = [
  { category: "Program Delivery", amount: "$245,000", pct: "49%" },
  { category: "Staff & Training", amount: "$120,000", pct: "24%" },
  { category: "Technology", amount: "$55,000", pct: "11%" },
  { category: "Marketing & Outreach", amount: "$40,000", pct: "8%" },
  { category: "In-Kind Contributions", amount: "$40,000", pct: "8%" },
];

/* ─── Media assets ─── */
const mediaPhotos = [
  { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop", caption: "Youth Futures graduation ceremony", program: "youth-futures" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop", caption: "Skills Bridge employer panel", program: "skills-bridge" },
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop", caption: "Community Connect neighbourhood event", program: "community-connect" },
  { src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&h=400&fit=crop", caption: "Workshop facilitation", program: "youth-futures" },
  { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop", caption: "Employer networking session", program: "skills-bridge" },
  { src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop", caption: "Volunteer appreciation day", program: "community-connect" },
];

const mediaQuotes = [
  { text: "This program changed the trajectory of my life.", author: "Jordan P.", program: "youth-futures" },
  { text: "The employer partnerships were genuine — not performative.", author: "Lisa W.", program: "skills-bridge" },
  { text: "We saw neighbours become collaborators.", author: "Marcus R.", program: "community-connect" },
  { text: "I didn't know mentorship could feel this natural.", author: "Priya S.", program: "youth-futures" },
  { text: "Our hiring pipeline improved measurably.", author: "TrueLight HR Team", program: "skills-bridge" },
  { text: "Every event felt like it belonged to the community.", author: "Chen L.", program: "community-connect" },
];

/* ─── Quarters ─── */
const quarters = [
  { q: "Q1 2025", summary: "Launched Youth Futures cohort 3 with 140 participants. Secured two new employer partners.", metric: "140 enrolled" },
  { q: "Q2 2025", summary: "Skills Bridge hit 78% completion rate. Community Connect hosted 4 neighbourhood events.", metric: "78% completion" },
  { q: "Q3 2025", summary: "89 job placements confirmed across all programs. Partner kit distributed to 6 organizations.", metric: "89 placements" },
];

/* ─── Sections nav ─── */
const sections = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "stories", label: "Stories", icon: BookOpen },
  { id: "outcomes", label: "Outcomes", icon: BarChart3 },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "financials", label: "Financials", icon: DollarSign },
  { id: "ethics", label: "Ethics & Consent", icon: Shield },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "media", label: "Media Appendix", icon: Images },
  { id: "updates", label: "Quarterly Updates", icon: CalendarDays },
];

const HubDemo = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeProgram, setActiveProgram] = useState("all");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filter = <T extends { program?: string }>(items: T[]) =>
    activeProgram === "all" ? items : items.filter((i) => i.program === activeProgram);

  const handleDemoDownload = () => {
    toast({ title: "Demo Only", description: "This is a demo. Downloads are available in real hubs." });
  };

  const copyLink = (anchor: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/hub/demo#${anchor}`);
    toast({ title: "Link copied!" });
  };

  return (
    <Layout>
      <div className="pt-24 relative">
        {/* Floating CTA */}
        <Link
          to="/bookings"
          className="fixed top-24 right-6 z-40 btn-primary text-xs hidden md:inline-flex"
        >
          Book a Story Call
        </Link>

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

            {/* Program Tabs */}
            <div className="sticky top-24 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
              <div className="container mx-auto px-6 py-3">
                <div className="flex flex-wrap gap-2">
                  {programs.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveProgram(p.id)}
                      className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors ${
                        activeProgram === p.id
                          ? "bg-impact-blue text-white"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* A) Cover & Overview */}
            <section id="overview" className="section-dark py-20 md:py-28">
              <div className="container mx-auto px-6 text-center max-w-3xl">
                <motion.p variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-impact-blue uppercase tracking-widest text-xs mb-4">
                  Example Impact Report Hub
                </motion.p>
                <motion.h1 variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                  EmployNext Community Impact Report 2025
                </motion.h1>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/50 text-lg italic mb-6">
                  Real stories. Real outcomes. Built to be shared.
                </motion.p>
                <motion.p variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">
                  EmployNext is a workforce development organization serving youth, mid-career professionals, and underserved communities across three flagship programs: Youth Futures, Skills Bridge, and Community Connect.
                </motion.p>
                <div className="flex flex-wrap justify-center gap-3">
                  {sections.slice(1).map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white/70 border border-white/20 rounded-sm hover:bg-white/10 transition-colors"
                    >
                      <s.icon size={12} /> {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* B) Stories */}
            <section id="stories" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">Impact Stories</h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-16">
                  {filter(stories).map((story) => (
                    <motion.div key={story.id} variants={slideUp} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                      <div className="aspect-video rounded-sm overflow-hidden bg-impact-dark">
                        <iframe
                          src={`https://www.youtube.com/embed/${story.videoId}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={story.title}
                        />
                      </div>
                      <div className="space-y-4">
                        <span className="text-xs uppercase tracking-widest text-impact-blue font-semibold">
                          {programs.find((p) => p.id === story.program)?.label}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-foreground">{story.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{story.narrative}</p>
                        <div className="bg-muted rounded-sm p-4 border-l-4 border-impact-blue">
                          <p className="text-foreground italic text-sm">"{story.quote.text}"</p>
                          <p className="text-muted-foreground text-xs mt-1">— {story.quote.author}</p>
                        </div>
                        <span className="inline-block bg-impact-blue/10 text-impact-blue text-xs font-semibold px-3 py-1 rounded-sm">
                          {story.outcome}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* C) Outcomes */}
            <section id="outcomes" className="section-cream py-20">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">Key Outcomes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {filter(allOutcomes).map((o) => (
                    <div key={o.label} className="bg-background border border-border rounded-sm p-6 text-center">
                      <p className="font-serif text-3xl font-bold text-impact-blue">{o.value}</p>
                      <p className="text-muted-foreground text-sm mt-1">{o.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm text-center max-w-xl mx-auto">
                  Outcomes are tracked across all three programs and reported quarterly. All data is self-reported and verified through partner surveys.
                </p>
              </div>
            </section>

            {/* D) Partners */}
            <section id="partners" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">Our Partners</h2>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {partnerLogos.map((p) => (
                    <div key={p.initials} className="w-20 h-20 rounded-sm bg-muted flex items-center justify-center" title={p.name}>
                      <span className="font-serif text-2xl font-bold text-foreground/60">{p.initials}</span>
                    </div>
                  ))}
                </div>
                {/* Spotlight */}
                <div className="max-w-2xl mx-auto bg-card border border-border rounded-sm p-8 space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-foreground">Partner Spotlight: Bright Foundation</h3>
                  <p className="text-muted-foreground text-sm"><strong>Contribution:</strong> $50,000 in program funding + 3 mentors</p>
                  <p className="text-muted-foreground text-sm"><strong>Enabled Outcome:</strong> 128 youth trained through Youth Futures</p>
                  <div className="bg-muted rounded-sm p-4 border-l-4 border-impact-purple">
                    <p className="text-foreground italic text-sm">"Partnering with EmployNext gave us a front-row seat to real community impact."</p>
                    <p className="text-muted-foreground text-xs mt-1">— Sarah L., Bright Foundation Director</p>
                  </div>
                </div>
                {/* Partner Kit preview */}
                <div className="max-w-2xl mx-auto mt-8 bg-muted rounded-sm p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 bg-border rounded-sm flex items-center justify-center shrink-0">
                    <Images className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-semibold text-foreground text-sm mb-1">Partner Kit</p>
                    <p className="text-muted-foreground text-xs mb-3">Pre-built captions, thumbnails, and talking points for partners.</p>
                    <button onClick={handleDemoDownload} className="btn-primary text-xs">Download Partner Kit</button>
                  </div>
                </div>
              </div>
            </section>

            {/* E) Financial Snapshot */}
            <section id="financials" className="section-cream py-20">
              <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-center">Financial Snapshot</h2>
                <p className="text-center mb-8">
                  <span className="inline-block bg-impact-blue/10 text-impact-blue text-xs font-semibold px-3 py-1 rounded-sm">Example Only</span>
                </p>
                <div className="bg-background border border-border rounded-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted">
                        <th className="text-left px-6 py-3 font-semibold text-foreground">Category</th>
                        <th className="text-right px-6 py-3 font-semibold text-foreground">Amount</th>
                        <th className="text-right px-6 py-3 font-semibold text-foreground">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financials.map((f) => (
                        <tr key={f.category} className="border-b border-border last:border-0">
                          <td className="px-6 py-3 text-foreground">{f.category}</td>
                          <td className="px-6 py-3 text-right text-muted-foreground">{f.amount}</td>
                          <td className="px-6 py-3 text-right text-muted-foreground">{f.pct}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* F) Ethics & Consent */}
            <section id="ethics" className="py-20 bg-background">
              <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-8 text-center">Dignity by Design</h2>
                <ul className="space-y-4 mb-8">
                  {[
                    "Informed consent obtained from every participant before stories are published.",
                    "Privacy boundaries respected — no identifying details shared without explicit permission.",
                    "Strength-based framing — stories centre resilience, not hardship.",
                    "Consent removal path — participants can request removal of their content at any time.",
                  ].map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-impact-blue mt-0.5 shrink-0" />
                      <span className="text-foreground/80 text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground text-sm text-center">
                  EmployNext follows a dignity-first storytelling framework. Every narrative is reviewed with participants before publication.
                </p>
              </div>
            </section>

            {/* G) Downloads */}
            <section id="downloads" className="section-cream py-20">
              <div className="container mx-auto px-6 text-center">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-8">Downloads</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Download PDF Report", "Download Partner Kit", "Download Media Appendix"].map((label) => (
                    <button key={label} onClick={handleDemoDownload} className="btn-primary">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* H) Media Appendix */}
            <section id="media" className="py-20 bg-background">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">Media Appendix</h2>
                <Tabs defaultValue="photos" className="w-full">
                  <TabsList className="w-full justify-start mb-8 bg-transparent border-b border-border rounded-none p-0 gap-0">
                    {["photos", "quotes", "videos"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="capitalize rounded-none border-b-2 border-transparent data-[state=active]:border-impact-blue data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="photos">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filter(mediaPhotos).map((photo, i) => (
                        <Dialog key={i}>
                          <DialogTrigger asChild>
                            <div className="cursor-pointer group relative rounded-sm overflow-hidden bg-muted">
                              <img src={photo.src} alt={photo.caption} className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <p className="text-white text-xs">{photo.caption}</p>
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl p-2">
                            <img src={photo.src} alt={photo.caption} className="w-full rounded-sm" />
                            <p className="text-sm text-muted-foreground mt-2 px-2">{photo.caption}</p>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="quotes">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filter(mediaQuotes).map((q, i) => (
                        <div key={i} className="bg-card border border-border rounded-sm p-6 flex flex-col justify-between">
                          <p className="text-foreground italic text-sm mb-4">"{q.text}"</p>
                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground text-xs">— {q.author}</p>
                            <button onClick={() => copyLink("media")} className="text-muted-foreground hover:text-foreground">
                              <Copy size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="videos">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filter(stories).map((s) => (
                        <div key={s.id} className="bg-card border border-border rounded-sm p-6 space-y-3">
                          <h4 className="font-serif text-lg font-semibold text-foreground">{s.title}</h4>
                          <p className="text-muted-foreground text-xs">{programs.find((p) => p.id === s.program)?.label}</p>
                          <a
                            href={`https://www.youtube.com/watch?v=${s.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-impact-blue text-sm font-medium hover:underline"
                          >
                            Watch on YouTube <ExternalLink size={12} />
                          </a>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </section>

            {/* I) Quarterly Updates */}
            <section id="updates" className="section-cream py-20">
              <div className="container mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">Quarterly Updates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {quarters.map((q) => (
                    <div key={q.q} className="bg-background border border-border rounded-sm p-6 space-y-3">
                      <p className="text-impact-blue font-semibold text-xs uppercase tracking-widest">{q.q}</p>
                      <p className="text-foreground/80 text-sm">{q.summary}</p>
                      <span className="inline-block bg-impact-blue/10 text-impact-blue text-xs font-semibold px-3 py-1 rounded-sm">
                        {q.metric}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom CTA */}
            <section className="section-dark py-20">
              <div className="container mx-auto px-6 text-center max-w-2xl">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">Want a hub like this?</h2>
                <p className="text-white/50 mb-4 font-serif text-xl">Build your Digital Impact Report Hub</p>
                <p className="text-white/40 text-sm mb-10">Turn your programs, campaigns, and events into a living, shareable impact story.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/impact-report-hub" className="btn-primary">Learn More</Link>
                  <Link to="/bookings" className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-impact-dark">Book a Story Call</Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default HubDemo;
