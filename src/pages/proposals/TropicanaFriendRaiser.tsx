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
  CheckCircle2,
  PlayCircle,
  Award,
  MessageSquare,
  Target,
  Music,
  Palette,
  Play, Mail} from "lucide-react";
import Layout from "@/components/layout/Layout";
import VimeoLightbox from "@/components/shared/VimeoLightbox";
import TropicanaMotionGraphics from "./components/TropicanaMotionGraphics";
import galaPremierePhoto from "@/assets/signature/gala-premiere.png";
import corporateBrandFilmPhoto from "@/assets/signature/corporate-brand-film.jpg";
import founderPhoto from "@/assets/founder/rovonn.png";
import rovonnOnSet from "@/assets/tropicana/rovonn-on-set.jpg";
import btsInterviewSetup from "@/assets/tropicana/bts-interview-setup.jpg";
import fullProductionGear from "@/assets/tropicana/full-production-gear.jpg";
import scoreSample1 from "@/assets/tropicana/sample-1.mp3";
import scoreSample2 from "@/assets/tropicana/sample-2.mp3";
import scoreSample3 from "@/assets/tropicana/sample-3.mp3";

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
  { title: "EmployNext - Youth Trades Program", category: "Workforce Development", desc: "Program highlight film built around three youth participants. Used in funder reporting and community recruitment. Closest analogue to Tropicana's employment + pre-apprenticeship work.", vimeoId: "1174716942", slug: "employnext-youth-trades" },
  { title: "CAFCAN - Our People's Keeper", category: "Caribbean African Canadian Social Services", desc: "Multi-program documentary anchoring CAFCAN's community justice work. Cited by their leadership as a turning point in donor and funder conversations.", vimeoId: "1143331891", slug: "cafcan-opkt" },
  { title: "Lakeridge Health - I Belong", category: "Healthcare Institution", desc: "Cinematic film built around Lakeridge Health's I Belong IDEAA Action Plan (Inclusion, Diversity, Equity, Accessibility, Anti-Racism). Made to hold up in front of board, government, and patient-family audiences simultaneously.", vimeoId: "1140641190", slug: "lakeridge-i-belong" },
  { title: "Black Creek - Black History Month", category: "Community Initiative", desc: "Event film and program documentation for a flagship community moment. The kind of work that makes the next year of programming easier to fund.", vimeoId: "1174716851", slug: "black-creek-bhm" },
];

const scoreSamples = [
  {
    label: "Sample 01",
    title: "Hybrid Cinematic Warm",
    note: "Soft piano open, warm strings build, subtle hybrid pulse underneath. Lands inspirational. The safest pick for your full 5-minute film.",
    src: scoreSample1,
  },
  {
    label: "Sample 02",
    title: "Hybrid Cinematic Soulful",
    note: "Soft piano with subtle gospel roots, warm Hammond pad, gentle modern beat under the orchestral lift. Bridges elder and youth audiences in the gala room.",
    src: scoreSample2,
  },
  {
    label: "Sample 03",
    title: "Hybrid Cinematic Rising",
    note: "Soft piano arpeggios into ascending strings and rising horn swell over driving hybrid groove. Built for the future-vision and One Tropicana finale beats.",
    src: scoreSample3,
  },
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
    body: "We anchor the film on five real people drawn from across Tropicana\u2019s program areas: a Childcare & Youth parent, an Employment & Pre-Apprenticeship graduate, a Timeless Treasures senior, a Counselling or Village Pantry community member, and one Tropicana team member who has been there for the long arc. Final program areas confirmed with your team at kickoff. The film is a chorus, not a narration.",
  },
  {
    label: "Built Around Your Vision",
    title: "We Build to Your Outline, Not Our Template.",
    body: "You have a second-by-second video outline, and we take that seriously. Your structure is the spine we edit to, not ours. Our job in pre-production is to pressure-test every beat so the film your team already imagined is the one that lands in the room, executed at a level that earns 100 friends.",
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
    initials: "PM",
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

const supportingRoles = [
  { role: "Colorist", tier: "Signature Production+" },
  { role: "Sound Designer", tier: "Signature Production+" },
  { role: "Audio Engineer", tier: "Both Tiers" },
  { role: "Gaffer", tier: "Signature Production+" },
  { role: "Grip", tier: "Signature Production+" },
  { role: "DP Assistant", tier: "Signature Production+" },
  { role: "Production Assistant", tier: "Both Tiers" },
  { role: "Still Photographer", tier: "Signature Production+" },
];

const references = [
  { person: "Cheryl Prescod", title: "Executive Director", org: "Black Creek Community Health Centre", note: "Reference for community-centered storytelling, multi-stakeholder coordination, and event-anchored video work, the closest format match to FriendRaiser." },
  { person: "Floydeen Charles-Fridal", title: "Executive Director", org: "CAFCAN Social Services (Caribbean African Canadian)", note: "Reference for cultural fit, community-rooted production approach, and the experience of working with a Black-serving multi-program nonprofit." },
];

const tierValueAdds = [
  { title: "Original Score", value: "$5K\u2013$15K value" },
  { title: "Broadcast Motion Graphics", value: "$5K\u2013$15K value" },
  { title: "Expanded Crew", value: "$3K\u2013$7K value" },
  { title: "Archival Research + HDR Master", value: "Included" },
  { title: "Multi-Cut Deployment Pack", value: "Included" },
  { title: "CEO Post-Event Video Series", value: "Included" },
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
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-impact-blue/10 via-impact-dark to-impact-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.04),transparent_60%)]" />
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
            <button
              onClick={() => setLightboxVideo("1186367128")}
              className="relative aspect-video w-full max-w-3xl mx-auto bg-black/40 border border-white/10 rounded-sm overflow-hidden my-12 group cursor-pointer hover:border-impact-blue/50 transition-colors block"
              aria-label="Play 90-second video pitch from Rovonn"
            >
              <iframe
                src="https://player.vimeo.com/video/1186367128?background=1&autoplay=1&loop=1&muted=1"
                className="absolute inset-0 w-full h-full pointer-events-none scale-110"
                allow="autoplay"
                title="Video pitch from Rovonn"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40 group-hover:from-black/60 transition-colors flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-impact-blue/90 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-2xl">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
                <p className="text-white text-sm uppercase tracking-widest font-medium">90-Second Video Pitch from Rovonn</p>
                <p className="text-white/70 text-xs mt-2 px-6 text-center">Direct-to-camera walkthrough of how we'd approach the FriendRaiser film</p>
              </div>
            </button>
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
              <div key={p.vimeoId} className="relative aspect-video bg-black/40 overflow-hidden rounded-sm" aria-label={`${p.title} preview`}>
                <iframe src={`https://player.vimeo.com/video/${p.vimeoId}?background=1&autoplay=1&loop=1&muted=1`} className="absolute inset-0 w-full h-full pointer-events-none scale-110" allow="autoplay" title={`${p.title} preview`} />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-xs italic mt-6">Full case studies linked in Section 08 below.</p>
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
                <p>We bring three things to FriendRaiser that matter more than gear: a director who understands why your 45 years are an asset, not a backstory; a community first interview practice that makes clients feel safe enough to give you the moment you actually need; and a deployment mindset that guarantees the film is still working in October, not just on June 4.</p>
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 rounded-sm overflow-hidden aspect-[4/5]">
                <img src={btsInterviewSetup} alt="Behind the scenes on a recent Impact Loop interview shoot" className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-3">
                <p className="text-primary text-xs uppercase tracking-widest mb-3 font-medium">A Note From the Director</p>
                <p className="text-impact-dark/80 text-lg italic leading-relaxed mb-4">
                  &ldquo;Your guests are giving you their evening. They deserve a film that respects what they came in with, and earns the next step on its own merit. We don&rsquo;t set out to make a fundraising film. We set out to make a film worth watching, and trust that the friendship follows.&rdquo;
                </p>
                <p className="text-impact-dark/60 text-sm uppercase tracking-widest font-medium">Rovonn Russell</p>
                <p className="text-impact-dark/50 text-xs italic">Creative Director &amp; Director</p>
              </div>
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
                Sound design and score do the emotional heavy lifting in a five-minute film. Below are three Hybrid Cinematic samples in the lane your brief asked for: soft piano open, warm orchestral build, powerful crescendo. Press play on each to compare.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5 self-stretch">
                <div className="relative bg-white/5 border border-white/10 rounded-sm overflow-hidden h-full min-h-[480px] p-6">
                  <p className="absolute top-4 left-5 text-impact-blue/80 text-[10px] uppercase tracking-[0.25em] font-medium">Broadcast Audio Signature</p>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-impact-blue/20" />
                  <div className="relative h-full w-full flex items-center justify-center gap-[3px]">
                    {Array.from({ length: 44 }).map((_, idx) => (
                      <motion.span
                        key={idx}
                        className="block w-[5px] bg-gradient-to-b from-impact-blue via-impact-blue/80 to-impact-blue rounded-full"
                        initial={{ scaleY: 0.2 }}
                        animate={{ scaleY: [0.2, 0.95, 0.45, 0.85, 0.25, 0.7, 0.3] }}
                        transition={{
                          duration: 2.6 + (idx % 5) * 0.18,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: (idx % 12) * 0.07,
                        }}
                        style={{ height: "85%", transformOrigin: "center" }}
                      />
                    ))}
                  </div>
                  <p className="absolute bottom-3 right-4 text-impact-blue/60 text-[10px] uppercase tracking-[0.2em] font-mono">Live waveform</p>
                </div>
              </motion.div>
              <div className="lg:col-span-7 space-y-4">
                {scoreSamples.map((sample, i) => (
                  <motion.div key={sample.label} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-sm p-5 hover:border-impact-blue/40 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="text-impact-blue text-xs uppercase tracking-widest font-medium">{sample.label}</p>
                        <h3 className="font-serif text-lg font-semibold text-white mt-1">{sample.title}</h3>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{sample.note}</p>
                    <audio controls preload="none" className="w-full" style={{ filter: "invert(0.85) hue-rotate(180deg)" }}>
                      <source src={sample.src} type="audio/mpeg" />
                      Your browser does not support audio playback.
                    </audio>
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-white/60 text-sm text-center max-w-2xl mx-auto italic">
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

      <section className="py-24 bg-impact-dark text-white relative" style={{ backgroundImage: `linear-gradient(rgba(11, 11, 22, 0.92), rgba(11, 11, 22, 0.95)), url(${fullProductionGear})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-10 bg-white/5 border-l-4 border-impact-blue rounded-sm p-8 md:p-10">
              <p className="text-impact-blue text-[10px] uppercase tracking-[0.3em] font-medium mb-2">Tier Value Breakdown</p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">What the Extra $17,500 Buys You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                {tierValueAdds.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-impact-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium leading-tight">{item.title}</p>
                      <p className="text-white/55 text-xs italic mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-white/65 text-sm italic leading-relaxed border-t border-white/10 pt-5">
                At market rates, these additions typically price at $21K&ndash;$45K standalone. Bundled into Signature Production+, the gap is $17,500 because the same crew, same production, same post pipeline absorbs the added scale efficiently.
              </p>
            </motion.div>
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
                Every Impact Loop project is directed by Rovonn Russell. Below is the crew composition planned for FriendRaiser.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:sticky lg:top-24">
                <div className="aspect-[4/5] rounded-sm overflow-hidden mb-4 relative">
                  <img src={rovonnOnSet} alt="Rovonn Russell, Creative Director, on set with cinema camera" className="w-full h-full object-cover object-center" />
                  <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary/10 rounded-sm -z-10" />
                </div>
                <p className="text-primary text-xs uppercase tracking-widest mb-2 font-medium">Direct Contact for Tropicana</p>
                <h3 className="font-serif text-2xl font-bold text-impact-dark mb-1">Rovonn Russell</h3>
                <p className="text-impact-dark/60 italic text-sm mb-4">Creative Director &amp; Director · Founder of Impact Loop</p>
                <p className="text-impact-dark/70 text-sm leading-relaxed">
                  Documentary filmmaker and storytelling strategist. Toronto-based. Designs the story strategy, leads every interview, directs every shoot, oversees every cut. No account managers. No handoffs. Recent Signature Productions for Lakeridge Health, CAFCAN, Black Creek BHM, and the Muamba Foundation.
                </p>
              </motion.div>
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamRoles.map((member, i) => (
                    <motion.div key={member.role} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-5 bg-white rounded-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-serif font-semibold text-sm tracking-wider">{member.initials}</span>
                        </div>
                        <h3 className="font-serif text-base font-semibold text-impact-dark leading-tight flex-1">{member.role}</h3>
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
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="p-6 bg-white rounded-sm border-l-4 border-impact-blue">
                  <p className="text-impact-blue text-[10px] uppercase tracking-[0.25em] font-medium mb-4">Supporting Roles · Assembled Per Project</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
                    {supportingRoles.map((sr) => (
                      <div key={sr.role} className="flex flex-col">
                        <p className="font-serif text-sm font-semibold text-impact-dark leading-tight">{sr.role}</p>
                        <p className={`text-[10px] uppercase tracking-widest mt-1 ${sr.tier === "Signature Production+" ? "text-impact-blue" : "text-primary"}`}>{sr.tier}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-impact-dark/55 text-xs italic mt-5">Every supporting role is filled by a vetted Toronto-based specialist Rovonn has directly worked with or been recommended by trusted collaborators. Names confirmed at contract sign.</p>
                </motion.div>
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
                <motion.div key={r.org} custom={i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-impact-cream rounded-sm border-l-4 border-primary p-8 md:p-10">
                  <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-medium mb-3">Past Client Reference</p>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-impact-dark leading-tight mb-2">{r.person}</h3>
                  <p className="text-impact-dark/80 text-base font-medium mb-1">{r.title}</p>
                  <p className="text-impact-dark/55 text-sm italic mb-5">{r.org}</p>
                  <p className="text-impact-dark/75 leading-relaxed border-t border-impact-dark/10 pt-5">{r.note}</p>
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
              Whether we end up working together or not, we're rooting for this film to land the way you've envisioned it, for June 4 to turn into 100 new friends, and for the next 45 years of Tropicana to be as bold as the first. If you'd like to keep the conversation going, Rovonn is one email away.
            </p>
            <div className="flex justify-center">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                <Mail className="w-5 h-5" />
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
