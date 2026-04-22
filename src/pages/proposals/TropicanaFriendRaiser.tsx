import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { setSEO, resetSEO } from "@/lib/seo";
import {
  ArrowRight,
  Users,
  Heart,
  Globe2,
  Sparkles,
  Layers,
  Calendar,
  CheckCircle2,
  PlayCircle,
  Award,
  MessageSquare,
  Target,
  Music,
  Palette,
  Play,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import VimeoLightbox from "@/components/shared/VimeoLightbox";
import TropicanaMotionGraphics from "./components/TropicanaMotionGraphics";
import galaPremierePhoto from "@/assets/signature/gala-premiere.png";
import corporateBrandFilmPhoto from "@/assets/signature/corporate-brand-film.jpg";
import founderPhoto from "@/assets/founder/rovonn.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const understandingPoints = [
  {
    icon: Heart,
    title: "100 New Friends, Not Just Donors",
    desc: "FriendRaiser 2026 is about relationship, not transaction. The film has to make a stranger feel like family by minute four.",
  },
  {
    icon: Users,
    title: "45+ Years of Trust",
    desc: "Tropicana's longevity is the asset. The film must honor that legacy without feeling like a retrospective. Past as proof, not nostalgia.",
  },
  {
    icon: Globe2,
    title: "Local Roots, Global Alignment",
    desc: "The work belongs in the same conversation as the UN Second Decade for People of African Descent. The film should signal that scale without losing the GTA street-level intimacy.",
  },
  {
    icon: Target,
    title: "Authentic. Inspirational. Forward-Looking.",
    desc: "Three tones to balance in five minutes. We've built our entire practice around that exact tension.",
  },
];

const timeline = [
  { phase: "Week 1", dates: "Apr 28 - May 4", title: "Discovery & Story Strategy", items: ["Kickoff call with Tropicana leadership", "Story strategy doc + interview list approval", "Program-team coordination for client participation"] },
  { phase: "Week 2", dates: "May 5 - May 11", title: "Pre-Production", items: ["Shot list, location lock, release forms", "Crew confirmation, gear prep", "Archival research + rights review"] },
  { phase: "Week 2 - 3", dates: "May 8 - May 17", title: "Principal Photography", items: ["2-3 shoot days across Tropicana program sites", "Leadership interviews + client portraits", "B-roll of programs in motion"] },
  { phase: "Week 3 - 4", dates: "May 18 - May 26", title: "Edit, Score, Color, Sound", items: ["First cut review with Tropicana team", "Round 1 + Round 2 revisions", "Original score, color grade, broadcast mix"] },
  { phase: "Week 5", dates: "May 27 - May 29", title: "Final Delivery", items: ["Master file delivery by Friday May 29, 2026", "Gala-ready ProRes + web/social cuts", "Caption files, thumbnail set, deployment notes"] },
  { phase: "Event", dates: "Jun 4, 2026", title: "FriendRaiser Premiere", items: ["On-call support the day of the event", "Backup files on-site", "Post-event handoff: editable archive + asset library"] },
];

const tierGood = [
  "5-minute FriendRaiser film, fully scripted to your outline",
  "2 shoot days across Tropicana program sites",
  "Principal interviews: Board Chair, CEO, 1 staff, 1 client per program (up to 8)",
  "Cinematic editing, color grading, broadcast sound mix",
  "Licensed score (curated, not original composition)",
  "Standard motion graphics package: lower thirds, program titles, closing tag",
  "2 rounds of revisions",
  "Gala master + 1 social cutdown (90 sec)",
  "Caption files, thumbnail set, deployment notes",
];

const tierBetter = [
  "Everything in the Signature Production tier, plus:",
  "3 shoot days with expanded crew (DP, camera assistant, dedicated sound engineer, gaffer)",
  "Original score composed for the film by a credited composer",
  "Broadcast-grade motion graphics: animated timelines, program-impact data viz, future-vision sequence",
  "Archival research and rights clearance for Tropicana legacy footage",
  "Cinema-grade color finishing, HDR-ready master",
  "3 rounds of revisions",
  "Multi-cut deployment pack: gala master, 90-sec social, 60-sec donor outreach, 30-sec teaser",
  "Day-of-event on-call support and backup playback files on-site",
  "CEO Post-Event Video Series (see below): 5 personalized messages from Tropicana's CEO for each invitee archetype",
];

const portfolio = [
  { title: "CAFCAN - Our People's Keeper", category: "Caribbean African Canadian Social Services", desc: "Multi-program documentary anchoring CAFCAN's community justice work. Cited by their leadership as a turning point in donor and funder conversations.", vimeoId: "1143331891", slug: "cafcan-opkt", relevance: "Closest cultural + structural fit to Tropicana" },
  { title: "Lakeridge Health - I Belong", category: "Healthcare Institution", desc: "Cinematic film for one of Ontario's largest healthcare systems. Built to hold up in front of board, government, and patient-family audiences simultaneously.", vimeoId: "1140641190", slug: "lakeridge-i-belong", relevance: "Closest scale + institutional-trust match" },
  { title: "Black Creek - Black History Month", category: "Community Initiative", desc: "Event film and program documentation for a flagship community moment. The kind of work that makes the next year of programming easier to fund.", vimeoId: "1174716851", slug: "black-creek-bhm", relevance: "Event-anchored film closest to FriendRaiser format" },
  { title: "EmployNext - Youth Trades Program", category: "Workforce Development", desc: "Program highlight film built around three youth participants. Used in funder reporting and community recruitment. Closest analogue to Tropicana's employment + pre-apprenticeship work.", vimeoId: "1174716942", slug: "employnext-youth-trades", relevance: "Direct program-type analogue" },
];

const scoreReferences = [
  { label: "Original Score Example", note: "Reference clip being curated for your review. We'll share a Lakeridge-tier scoring example before our first call so you can hear the standard we hold for FriendRaiser." },
  { label: "Sound Design Example", note: "Reference clip being curated for your review. We'll share a layered ambient + interview-room example showing how we make a quiet moment feel alive." },
];

const creativeApproach = [
  {
    label: "The Central Idea",
    title: "Friendship Is Earned Through Proximity, Not Pitch",
    body: "Your goal is 100 new friends in one night. Friendship doesn\u2019t happen at a podium. It happens when a stranger sees something true and recognizes themselves in it. Our job in five minutes is to put the room close enough to a Tropicana family that they can\u2019t stay strangers.",
  },
  {
    label: "The Throughline",
    title: "Five Voices, One Question: Who Is Tropicana For?",
    body: "We anchor the film on five real people, one from each of your major program areas: a Childcare parent, a SNAP BACK youth, a TEC employment graduate, a Caribbean Lime senior, and one Tropicana team member who has been there for the long arc. The film is a chorus, not a narration.",
  },
  {
    label: "The Emotional Arc",
    title: "Open Intimate. Scale in the Middle. Land as a Host, Not a Fundraiser.",
    body: "The first 60 seconds are one face, one room, one truth, quiet enough that the room leans in. The middle scales to the 45-year legacy and the eight programs through motion graphics. The close hands the room a role, not an ask. We treat your guest as a future friend, not a wallet.",
  },
  {
    label: "Why This Earns 100 Friends",
    title: "Treat the Viewer As a Guest. Not a Target.",
    body: "Donor films that try too hard to convert produce polite applause. Films that make the viewer feel trusted with something real produce signed cards at the table. That\u2019s the version we make for FriendRaiser.",
  },
];

const graphicsReferences = [
  { label: "Lower Thirds + Program Titles", note: "Reference clip being curated for your review. We'll share a clean, branded lower-thirds example you can press play on before our kickoff." },
  { label: "Animated Data + Timelines", note: "Reference clip being curated for your review. We'll share an animated impact-data example showing the visual language we'd build for Tropicana's 45-year legacy moment." },
];

const teamRoles = [
  {
    role: "Director of Photography",
    initials: "DP",
    tier: "Both Tiers",
    desc: "Cinematic camera work, lensing, and lighting. Selected from Rovonn\u2019s vetted roster of Toronto-based DPs with documentary and healthcare experience.",
  },
  {
    role: "Field Sound Mixer",
    initials: "SM",
    tier: "Both Tiers",
    desc: "Broadcast-grade location sound on every interview and B-roll moment. Critical for gala-room playback where audio failure is unrecoverable.",
  },
  {
    role: "Production Manager",
    name: "Timotheus Greene",
    initials: "TG",
    tier: "Both Tiers",
    desc: "Owns scheduling, crew logistics, and release-form management across all shoot days. Coordinates call times, gear movement, Tropicana site access, and subject paperwork from pre-production through wrap.",
  },
  {
    role: "Editor & Post Producer",
    initials: "ED",
    tier: "Both Tiers",
    desc: "Story-led editor working alongside Rovonn through three review rounds. Handles colour, audio sweetening, and final delivery in your gala playback spec.",
  },
  {
    role: "Composer",
    initials: "CO",
    tier: "Signature Production+ Only",
    desc: "Original score written to picture by a credited composer. Built specifically for FriendRaiser\u2019s emotional arc and your 45-year legacy moment.",
  },
  {
    role: "Motion Designer",
    initials: "MD",
    tier: "Signature Production+ Only",
    desc: "Broadcast-grade animated graphics for your eight programs, the legacy timeline, and the future-vision sequence (S.E.S.B.I. Hub, Legacy Foundation, Youth Centres).",
  },
];

const references = [
  { org: "Black Creek Community Health Centre", contact: "Cheryl Prescod, Executive Director", project: "Black History Month documentary, 2024", note: "Reference for community-centered storytelling, multi-stakeholder coordination, and event-anchored video work, the closest format match to FriendRaiser." },
  { org: "CAFCAN Social Services (Caribbean African Canadian)", contact: "Floydeen Charles-Fridal, Executive Director", project: "Multi-program documentary, 2024", note: "Reference for cultural fit, community-rooted production approach, and the experience of working with a Black-serving multi-program nonprofit." },
];

const TropicanaFriendRaiser = () => {
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);

  useEffect(() => {
    setSEO({
      title: "FriendRaiser 2026 Proposal - Impact Loop for Tropicana Community Services",
      description: "Cinematic 5-minute film proposal for Tropicana Community Services' FriendRaiser 2026. Built by Impact Loop, Toronto.",
      ogType: "website",
    });
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex,nofollow");
    return () => {
      resetSEO();
      const meta = document.querySelector('meta[name="robots"]');
      if (meta) meta.remove();
    };
  }, []);

  return (
    <Layout>
      <VimeoLightbox vimeoId={lightboxVideo} isOpen={lightboxVideo !== null} onClose={() => setLightboxVideo(null)} />

      <div className="bg-impact-blue/10 border-b border-impact-blue/20">
        <div className="container mx-auto px-6 py-3">
          <p className="text-impact-blue text-xs uppercase tracking-[0.25em] text-center">
            Confidential Proposal &middot; Prepared for Tropicana Community Services &middot; April 2026
          </p>
        </div>
      </div>

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-impact-dark">
        <div className="absolute inset-0 z-0 opacity-40">
          <iframe
            src="https://player.vimeo.com/video/1140641190?background=1&autoplay=1&loop=1&muted=1"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ width: "100vw", height: "56.25vw", minHeight: "100vh", minWidth: "177.77vh", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            allow="autoplay; fullscreen"
            title="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-impact-dark/80 via-impact-dark/60 to-impact-dark" />
        </div>
        <div className="container mx-auto px-6 relative z-10 pt-16 pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
              FriendRaiser 2026 &middot; 5-Minute Film Proposal
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              The Tropicana Effect, <span className="text-gradient">on Film</span>
            </h1>
            <p className="text-white/80 text-xl leading-relaxed mb-8">
              A five-minute cinematic portrait of 45 years of community impact, built to turn 100 new strangers into 100 new friends on June 4, 2026.
            </p>
            <div className="aspect-video w-full max-w-3xl mx-auto bg-black/40 border border-white/10 rounded-sm flex items-center justify-center my-12 group cursor-pointer hover:border-impact-blue/40 transition-colors">
              <div className="text-center">
                <PlayCircle className="w-16 h-16 text-white/40 group-hover:text-impact-blue mx-auto mb-3 transition-colors" />
                <p className="text-white/70 text-sm uppercase tracking-widest">90-Second Video Pitch from Rovonn</p>
                <p className="text-white/40 text-xs mt-2">Direct-to-camera walkthrough of how we'd approach the FriendRaiser film</p>
              </div>
            </div>
            <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.25em]">
              Submitted by Impact Loop &middot; Toronto-based &middot; Founder-led production
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-impact-dark border-t border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-center text-white/50 text-xs uppercase tracking-[0.25em] mb-8">
            Recent work in the same emotional register as FriendRaiser
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {portfolio.map((p) => (
              <button key={p.vimeoId} onClick={() => setLightboxVideo(p.vimeoId)} className="group relative aspect-video bg-black/40 overflow-hidden rounded-sm cursor-pointer" aria-label={`Play ${p.title}`}>
                <iframe src={`https://player.vimeo.com/video/${p.vimeoId}?background=1&autoplay=1&loop=1&muted=1`} className="absolute inset-0 w-full h-full pointer-events-none scale-110" allow="autoplay" title={`${p.title} preview`} />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <Play className="w-10 h-10 text-white/0 group-hover:text-white/90 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 section-blue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Sparkles className="w-10 h-10 text-impact-blue mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Why Impact Loop for FriendRaiser</h2>
              <div className="space-y-6 text-white/85 text-lg leading-relaxed text-left max-w-3xl mx-auto">
                <p>Most production companies will treat your brief as a video-services job. Capture, edit, deliver. We don't, and that's the difference.</p>
                <p>Impact Loop builds storytelling systems for organizations whose work has to earn trust before it can earn dollars. Healthcare. Black-serving community organizations. Workforce development. Faith communities. The exact territory Tropicana operates in.</p>
                <p>We bring three things to FriendRaiser that matter more than gear: a director who understands why your 45 years are an asset, not a backstory; a community-first interview practice that makes clients feel safe enough to give you the moment you actually need; and a deployment mindset that guarantees the film is still working in October, not just on June 4.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 bg-cover bg-center" style={{ backgroundImage: `url(${galaPremierePhoto})` }} />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">01 &middot; What We Heard</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">Understanding the Brief</h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                FriendRaiser is not a gala video. It's a relationship-builder disguised as a short film. Here's what we believe the brief is really asking for.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {understandingPoints.map((point, i) => (
                <motion.div key={point.title} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-8 border border-impact-dark/10 rounded-sm hover:border-primary/30 transition-colors bg-white">
                  <point.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-impact-dark mb-3">{point.title}</h3>
                  <p className="text-impact-dark/70 leading-relaxed">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">02 &middot; Creative Approach</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">How We Turn Your Investor Goal Into a Film That Earns Friends</h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                The brief is clear: 100 new friends, not just donors. A 5-minute film that earns them. Here is the creative thinking that drives every decision in production, from who we point the camera at first to how the final frame lands.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creativeApproach.map((item, i) => (
                <motion.div key={item.label} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-8 bg-impact-cream rounded-sm border-l-4 border-primary">
                  <p className="text-primary text-xs uppercase tracking-widest mb-3 font-medium">{item.label}</p>
                  <h3 className="font-serif text-xl font-semibold text-impact-dark mb-3 leading-snug">{item.title}</h3>
                  <p className="text-impact-dark/70 leading-relaxed text-[15px]">{item.body}</p>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12 max-w-3xl mx-auto text-center">
              <p className="text-impact-dark/80 text-base italic leading-relaxed">
                &ldquo;Your guests are giving you their evening. They deserve a film that respects what they came in with, and earns the next step on its own merit.&rdquo;
              </p>
              <p className="text-impact-dark/50 text-xs uppercase tracking-widest mt-4">Rovonn Russell, Director</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-impact-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <Music className="w-10 h-10 text-impact-blue mx-auto mb-4" />
              <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">03 &middot; Sound & Score</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">The Sound Carries the Story.</h2>
              <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Sound design and score do the emotional heavy lifting in a five-minute film. Here's the standard we'd hold for FriendRaiser. Reference clips are being curated and will be shared with you ahead of our first call.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {scoreReferences.map((ref, i) => (
                <motion.div key={ref.label + i} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-sm overflow-hidden">
                  <div className="relative aspect-video w-full bg-gradient-to-br from-impact-blue/10 to-white/5 border-b border-white/10 flex flex-col items-center justify-center">
                    <Music className="w-12 h-12 text-impact-blue/50 mb-2" />
                    <p className="text-white/40 text-[11px] uppercase tracking-[0.25em]">Reference clip placeholder</p>
                  </div>
                  <div className="p-6">
                    <p className="text-impact-blue text-xs uppercase tracking-widest mb-2">{ref.label}</p>
                    <p className="text-white/80 leading-relaxed text-sm">{ref.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-white/60 text-sm text-center mt-12 max-w-2xl mx-auto italic">
              Signature Production+ includes original composition by a credited composer. Signature Production uses high-quality licensed score curated to the exact emotional register of your film.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <Palette className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">04 &middot; Motion Graphics</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">Graphics That Earn Their Place</h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                For FriendRaiser, motion graphics serve three jobs: name your eight programs, animate the 45-year legacy timeline, and visualize the future-vision sequence (S.E.S.B.I. Hub, Legacy Foundation, Youth Centres). Reference clips are being curated for your review.
              </p>
            </motion.div>
            <TropicanaMotionGraphics />
            <p className="text-impact-dark/60 text-sm text-center mt-12 max-w-2xl mx-auto italic">
              Signature Production+ includes a custom-designed motion graphics package built from Tropicana's brand kit. Signature Production uses a refined standard package: lower thirds, program titles, closing tag.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-impact-dark text-white relative" style={{ backgroundImage: `linear-gradient(rgba(11, 11, 22, 0.92), rgba(11, 11, 22, 0.95)), url(${corporateBrandFilmPhoto})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">05 &middot; Production Plan</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">From Kickoff to Gala Premiere in Five Weeks</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                Built backwards from your two non-negotiable dates: final delivery Friday May 29, FriendRaiser premiere Thursday June 4.
              </p>
            </motion.div>
            <div className="space-y-4">
              {timeline.map((t, i) => (
                <motion.div key={t.phase + t.dates} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col md:flex-row gap-6 p-6 border border-white/15 rounded-sm hover:border-impact-blue/50 transition-colors bg-impact-dark/60 backdrop-blur-sm">
                  <div className="md:w-48 flex-shrink-0">
                    <p className="text-impact-blue text-sm uppercase tracking-widest font-medium">{t.phase}</p>
                    <p className="text-white/50 text-sm">{t.dates}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold text-white mb-3">{t.title}</h3>
                    <ul className="space-y-1.5">
                      {t.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-white/75 text-sm">
                          <span className="text-impact-blue mt-1">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 section-blue">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-white/70 font-medium text-sm uppercase tracking-widest mb-4">06 &middot; Investment</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Two Tiers, Same Story Standard</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                Both tiers deliver the full 5-minute FriendRaiser film at broadcast quality. Signature Production+ adds production scale: original score, expanded crew, broadcast motion graphics, and the Friend Activation Kit.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div custom={0} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/20 rounded-sm p-8 md:p-10 backdrop-blur-sm">
                <div className="mb-6">
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Tier 1</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">Signature Production</h3>
                  <p className="text-white/70 text-sm italic">The full FriendRaiser film, lean crew, gala-ready</p>
                </div>
                <div className="border-t border-b border-white/10 py-6 mb-6">
                  <p className="text-4xl md:text-5xl font-serif font-bold mb-1">$24,500</p>
                  <p className="text-white/60 text-sm">CAD &middot; all-in &middot; taxes additional</p>
                </div>
                <ul className="space-y-3">
                  {tierGood.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-impact-blue flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div custom={1} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white text-impact-dark rounded-sm p-8 md:p-10 relative shadow-2xl">
                <div className="absolute -top-3 right-8 bg-impact-blue text-white text-xs uppercase tracking-widest px-3 py-1 rounded-sm">Recommended</div>
                <div className="mb-6">
                  <p className="text-impact-dark/60 text-xs uppercase tracking-widest mb-2">Tier 2</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">Signature Production<span className="text-primary">+</span></h3>
                  <p className="text-impact-dark/70 text-sm italic">Premiere-grade scale for a 45-year legacy moment</p>
                </div>
                <div className="border-t border-b border-impact-dark/10 py-6 mb-6">
                  <p className="text-4xl md:text-5xl font-serif font-bold mb-1 text-primary">$42,000</p>
                  <p className="text-impact-dark/60 text-sm">CAD &middot; all-in &middot; taxes additional</p>
                </div>
                <ul className="space-y-3">
                  {tierBetter.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-impact-dark/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/60 text-sm text-center mt-10 max-w-2xl mx-auto">
              Payment terms: 40% on signed agreement, 40% at first cut, 20% on final delivery. We hold these prices through May 5, 2026.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-impact-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">07 &middot; Beyond the Five-Minute Film</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Two Innovations Built for FriendRaiser</h2>
              <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
                A film that lives only on June 4 is a film that retires on June 5. We've designed two add-ons that extend the FriendRaiser arc before, during, and after the gala.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div custom={0} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border border-white/20 rounded-sm overflow-hidden hover:border-impact-blue/50 transition-colors">
                <div className="bg-black/60 p-3 border-b border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-3 text-white/40 text-xs font-mono">tropicanacommunity.org/friendraiser</span>
                  </div>
                </div>
                <div className="relative aspect-video bg-gradient-to-br from-impact-blue/20 via-black/60 to-impact-dark flex flex-col items-center justify-center">
                  <Layers className="w-12 h-12 text-impact-blue/60 mb-3" />
                  <p className="text-white/60 text-[11px] uppercase tracking-[0.25em]">Story Hub mockup placeholder</p>
                </div>
                <div className="p-8">
                  <Layers className="w-8 h-8 text-impact-blue mb-3" />
                  <h3 className="font-serif text-2xl font-bold mb-2">Innovation #1: The Story Hub</h3>
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Included with Signature Production+ &middot; +$4,500 add-on for Signature Production</p>
                  <p className="text-white/80 leading-relaxed mb-3">
                    An always-on microsite hosted under tropicana.org (or as a standalone link) that holds the gala film, every cutdown, the eight program vignettes as standalone shareables, and a downloadable press / partner kit.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    After June 4, every new prospective friend, funder, or partner can be sent one link instead of a one-time gala video. The film keeps working all year.
                  </p>
                </div>
              </motion.div>
              <motion.div custom={1} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border border-white/20 rounded-sm overflow-hidden hover:border-impact-blue/50 transition-colors">
                <div className="relative aspect-video bg-black overflow-hidden grid grid-cols-5 gap-1 p-1">
                  {[
                    { label: "Corporate", icon: Users },
                    { label: "Faith", icon: Heart },
                    { label: "Alumni", icon: Award },
                    { label: "Government", icon: Globe2 },
                    { label: "Community", icon: Sparkles },
                  ].map((v) => (
                    <div key={v.label} className="relative bg-gradient-to-br from-impact-blue/15 via-black/70 to-impact-dark flex flex-col items-center justify-center px-1">
                      <v.icon className="w-5 h-5 text-impact-blue/50 mb-1" />
                      <p className="text-white/50 text-[9px] uppercase tracking-widest text-center leading-tight">{v.label}</p>
                    </div>
                  ))}
                </div>
                <div className="p-8">
                  <MessageSquare className="w-8 h-8 text-impact-blue mb-3" />
                  <h3 className="font-serif text-2xl font-bold mb-2">Innovation #2: The CEO Post-Event Video Series</h3>
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Included with Signature Production+</p>
                  <p className="text-white/80 leading-relaxed mb-3">
                    Five personalized 60-to-90-second video messages recorded by Tropicana's CEO, each addressed to a specific archetype of new friend made at FriendRaiser: <span className="text-white">corporate partner, faith community leader, alumni donor, government contact, community ally</span>.
                  </p>
                  <p className="text-white/80 leading-relaxed mb-3">
                    Sent within 48 hours of the event, while the room is still warm. Each version speaks to that audience's specific reasons for being there, what their relationship with Tropicana could become, and a clear next step.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Recorded in a single 2-hour wraparound session during principal photography. The CEO's relationship-building energy gets to scale to all 100 new friends at once, without losing the personal feel that made the night work.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">08 &middot; Portfolio</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">Closest Reference Work</h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Each of these projects shares meaningful DNA with FriendRaiser - multi-program nonprofit, community-rooted, Black-led or Black-serving, built to hold up in front of high-stakes audiences. Click any tile to read the full case study.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.map((p, i) => (
                <motion.div key={p.title} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Link to={`/work/${p.slug}`} className="group block">
                    <div className="relative aspect-video bg-black rounded-sm overflow-hidden mb-4">
                      <iframe src={`https://player.vimeo.com/video/${p.vimeoId}?background=1&autoplay=1&loop=1&muted=1`} className="absolute inset-0 w-full h-full pointer-events-none scale-110" allow="autoplay" title={`${p.title} preview`} />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <ArrowRight className="w-12 h-12 text-white/0 group-hover:text-white transition-all" />
                      </div>
                      <div className="absolute top-3 left-3 bg-impact-blue text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm">{p.relevance}</div>
                      <div className="absolute bottom-3 right-3 bg-white/90 text-impact-dark text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm font-medium">View case study &rarr;</div>
                    </div>
                    <p className="text-primary text-xs uppercase tracking-widest mb-2 font-medium">{p.category}</p>
                    <h3 className="font-serif text-xl font-semibold text-impact-dark mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-impact-dark/70 text-sm leading-relaxed">{p.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
              <Link to="/work" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium">
                View the full Impact Loop portfolio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-impact-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">09 &middot; Planned Crew</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">Planned Crew for FriendRaiser</h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Every Impact Loop project is directed by Rovonn Russell. Below is the crew composition planned for FriendRaiser. Final crew names and credits are confirmed at kickoff based on shoot-date availability (May 8\u201317, 2026), and are drawn from a vetted Toronto-based roster Rovonn has worked with on prior healthcare and community films.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:sticky lg:top-24">
                <div className="aspect-[4/5] rounded-sm overflow-hidden mb-4 relative">
                  <img src={founderPhoto} alt="Rovonn Russell, Founder of Impact Loop" className="w-full h-full object-cover object-top" />
                  <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary/10 rounded-sm -z-10" />
                </div>
                <p className="text-primary text-xs uppercase tracking-widest mb-2 font-medium">Direct Contact for Tropicana</p>
                <h3 className="font-serif text-2xl font-bold text-impact-dark mb-1">Rovonn Russell</h3>
                <p className="text-impact-dark/60 italic text-sm mb-4">Creative Director &amp; Director, FriendRaiser · Founder of Impact Loop</p>
                <p className="text-impact-dark/70 text-sm leading-relaxed">
                  Documentary filmmaker and storytelling strategist. Toronto-based. Designs the story strategy, leads every interview, directs every shoot, oversees every cut. No account managers. No handoffs. Recent Signature Productions for Lakeridge Health, CAFCAN, Black Creek BHM, and the Muamba Foundation.
                </p>
              </motion.div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamRoles.map((member, i) => (
                  <motion.div key={member.role} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-5 bg-white rounded-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-serif font-semibold text-sm tracking-wider">{member.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-primary text-[10px] uppercase tracking-widest font-medium leading-tight">{member.role}</p>
                        <p className={`text-[11px] mt-1 ${member.name ? "text-impact-dark font-medium" : "text-impact-dark/50 uppercase tracking-wider"}`}>
                          {member.name || "[Name TBD]"}
                        </p>
                      </div>
                    </div>
                    <p className="text-impact-dark/70 text-[13px] leading-relaxed mb-4 flex-1">{member.desc}</p>
                    <div className="pt-3 border-t border-impact-dark/10">
                      <span className={`inline-block text-[10px] uppercase tracking-widest font-medium px-2 py-1 rounded-sm ${member.tier === "Signature Production+ Only" ? "bg-impact-blue/10 text-impact-blue" : "bg-primary/10 text-primary"}`}>
                        {member.tier}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
              <Link to="/about" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium">
                Read more about Rovonn and Impact Loop
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">10 &middot; References</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark mb-6">Two Past Clients Available for Reference Calls</h2>
              <p className="text-impact-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Direct contact information shared upon request to protect their inboxes. We're happy to schedule a 15-minute call with either reference before contract sign.
              </p>
            </motion.div>
            <div className="space-y-6">
              {references.map((r, i) => (
                <motion.div key={r.org} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col md:flex-row gap-6 p-6 border border-impact-dark/10 rounded-sm">
                  <Award className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold text-impact-dark mb-1">{r.org}</h3>
                    <p className="text-impact-dark/50 text-sm mb-3">{r.project} &middot; {r.contact}</p>
                    <p className="text-impact-dark/70 leading-relaxed">{r.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-impact-dark relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <iframe src="https://player.vimeo.com/video/1143331891?background=1&autoplay=1&loop=1&muted=1" className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: "100vw", height: "56.25vw", minHeight: "100%", minWidth: "177.77vh", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} allow="autoplay" title="CTA background" />
          <div className="absolute inset-0 bg-impact-dark/80" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">From Rovonn &amp; the Impact Loop Team</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Thank You for Reading.</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              We know your team reviewed every proposal that landed in your inbox with care, and we're honoured to have been considered for a moment as significant as Tropicana's 45-year FriendRaiser.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              Whether we end up working together or not, we're rooting for this film to land the way you've envisioned it, for June 4 to turn into 100 new friends, and for the next 45 years of Tropicana to be as bold as the first. If you'd like to keep the conversation going, Rovonn is one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bookings" className="btn-primary inline-flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Book a Call with Rovonn
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white hover:bg-white/5 transition-colors rounded-sm">
                Reply by Email
              </Link>
            </div>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-12">Proposal valid through May 5, 2026 &middot; Impact Loop &middot; Toronto</p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default TropicanaFriendRaiser;
