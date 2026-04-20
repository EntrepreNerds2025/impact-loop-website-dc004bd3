import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Video,
  Monitor,
  Layers,
  Globe,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Play,
  Building2,
  Heart,
  Award,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import CommunicationOSGraphic from "@/components/services/CommunicationOSGraphic";
import founderPhoto from "@/assets/founder/rovonn.png";
import blackCreekPhoto from "@/assets/hub/black-creek-bhm/photos/DSC06165.jpg";

// ─── Service definitions ─────────────────────────────────────────────

interface ServiceDef {
  id: string;
  phase: string;
  label: string;
  title: string;
  tagline: string;
  description: string;
  investment?: string;
  investmentNote?: string;
  icon: typeof Video;
  cta: string;
  ctaHref: string;
  featured?: boolean;
  /** Variant controls the featured card color. "primary" = warm dark (nonprofit/legacy), "secondary" = deep blue (corporate/everyday). */
  featuredVariant?: "primary" | "secondary";
  flagshipLabel?: string;
  outcomes?: string[];
  visual?: "employNextPreview" | "mediaHubPhoto" | "advisoryPhoto" | "commOSGraphic";
  lanes: ("nonprofit" | "corporate")[];
}

const allServices: ServiceDef[] = [
  {
    id: "diagnostic",
    phase: "01",
    label: "Start Here",
    title: "Impact Story Diagnostic",
    tagline: "Free — understand where you are",
    description:
      "A guided assessment that surfaces your strongest story opportunities, gaps in your current communications, and the clearest path to credibility with funders and stakeholders.",
    investment: "Complimentary",
    investmentNote: "AI-powered tool on the website",
    icon: MessageSquare,
    cta: "Take the Diagnostic",
    ctaHref: "/bookings",
    lanes: ["nonprofit", "corporate"],
  },
  {
    id: "content-engine",
    phase: "02",
    label: "Ongoing Content",
    title: "Impact Content Engine",
    tagline: "Monthly retainer — consistent story output",
    description:
      "A full content production system built around your existing story assets. Cutdowns, repurposed testimonials, program highlights, and social-ready clips produced monthly so your mission stays visible across every stakeholder channel.",
    icon: Layers,
    cta: "Book a Discovery Call",
    ctaHref: "/bookings",
    lanes: ["nonprofit", "corporate"],
  },
  {
    id: "workshops",
    phase: "03",
    label: "Build Capacity",
    title: "Workshops & Training",
    tagline: "One-time or recurring — in-house storytelling skills",
    description:
      "Equip your team with the frameworks, interview techniques, and content standards to identify and capture impact stories on an ongoing basis without relying on external production every time.",
    icon: Users,
    cta: "Learn More",
    ctaHref: "/bookings",
    outcomes: [
      "Story identification frameworks",
      "Interview techniques training",
      "Content planning templates",
      "Ongoing support resources",
    ],
    lanes: ["nonprofit"],
  },
  {
    id: "signature-production",
    phase: "04",
    label: "Signature Production",
    title: "Signature Productions",
    tagline: "Nonprofit flagship tier — for galas, capital campaigns, and legacy moments",
    description:
      "Cinema-grade productions built for the moments that define a nonprofit's decade — gala premieres, capital campaign launches, anniversary celebrations, and major funder premieres. A full creative team, original score, broadcast-grade motion graphics, archival integration, and cinema-grade finishing — engineered to move a room of donors and keep earning value in every funder conversation that follows.",
    icon: Award,
    cta: "Explore Signature Productions",
    ctaHref: "/signature-production",
    featured: true,
    featuredVariant: "primary",
    flagshipLabel: "Nonprofit Flagship",
    outcomes: [
      "Multi-location principal photography (2–3+ shoot days)",
      "Original composed score and full sound design",
      "Broadcast-grade motion graphics and data visualization",
      "Archival research, integration, and rights management",
      "Gala-ready master plus digital, funder, and social cuts",
      "Premiere strategy and deployment roadmap",
    ],
    lanes: ["nonprofit", "corporate"],
  },
  {
    id: "cinematic-films",
    phase: "05",
    label: "Corporate Flagship",
    title: "Cinematic Impact Films",
    tagline: "Corporate flagship tier — brand films, ESG stories, and stakeholder trust assets",
    description:
      "Documentary-style brand and impact films engineered for corporate audiences — investors, boards, employees, partners, and the public. We capture real people, real outcomes, and real work with the production quality that earns trust from institutional stakeholders. Built to anchor ESG reports, investor communications, recruitment narratives, and corporate social impact storytelling for years.",
    icon: Video,
    cta: "See Our Work",
    ctaHref: "/cinematic-impact-films",
    featured: true,
    featuredVariant: "secondary",
    flagshipLabel: "Corporate Flagship",
    visual: "employNextPreview",
    outcomes: [
      "Flagship brand film (60–180 seconds)",
      "6–12 short cutdowns for LinkedIn, investor decks, and internal comms",
      "Story blueprint and stakeholder interview plan",
      "Deployment guidance for board, investor, and public audiences",
    ],
    lanes: ["nonprofit", "corporate"],
  },
  {
    id: "media-hub",
    phase: "06",
    label: "Always-On Platform",
    title: "Impact Media Hub",
    tagline: "Platform setup + monthly hosting — your story library",
    description:
      "A branded, purpose-built platform that houses all your impact stories, makes them searchable for stakeholders, and lets you deploy the right story to the right audience without manual effort.",
    icon: Globe,
    visual: "mediaHubPhoto",
    cta: "Book a Discovery Call",
    ctaHref: "/bookings",
    lanes: ["nonprofit", "corporate"],
  },
  {
    id: "comm-os",
    phase: "07",
    label: "Full-System Strategy",
    title: "Impact Communication OS",
    tagline: "Monthly retainer — end-to-end story system",
    description:
      "A complete operating system for organizational storytelling. Covers production, content strategy, stakeholder deployment, funder-facing assets, and internal alignment. For organizations ready to make storytelling a core operational function.",
    icon: Layers,
    visual: "commOSGraphic",
    cta: "Book a Discovery Call",
    ctaHref: "/bookings",
    lanes: ["nonprofit", "corporate"],
  },
  {
    id: "advisory",
    phase: "08",
    label: "Executive Partnership",
    title: "Strategic Advisory",
    tagline: "Monthly retainer — direct access to Rovonn",
    description:
      "Direct advisory partnership with Rovonn Russell for founders, CEOs, and communications leads navigating complex storytelling challenges. Covers brand positioning, stakeholder strategy, media presence, and organizational trust-building.",
    icon: MessageSquare,
    visual: "advisoryPhoto",
    cta: "Apply for Advisory",
    ctaHref: "/bookings",
    lanes: ["corporate"],
  },
  {
    id: "tech-solutions",
    phase: "09",
    label: "Custom Technology",
    title: "Impact Technology Solutions",
    tagline: "Project-based — purpose-built platforms and tools",
    description:
      "Custom apps, platforms, and software tools built to help your organization operate more efficiently and deliver impact at scale. AI-accelerated development means solutions that once required large teams and long timelines can now be built in weeks.",
    icon: Monitor,
    cta: "Book a Discovery Call",
    ctaHref: "/bookings",
    outcomes: [
      "Custom app or platform tailored to your workflows",
      "AI-powered development — weeks, not years",
      "Ongoing support and iteration",
      "Integration with your existing systems",
    ],
    lanes: ["corporate"],
  },
];

// ─── Visual asset renderers ──────────────────────────────────────────

const EmployNextPreview = () => (
  <div
    className="relative overflow-hidden rounded-lg cursor-pointer group"
    style={{ aspectRatio: "16 / 9" }}
  >
    <iframe
      src="https://player.vimeo.com/video/1174716942?background=1&autoplay=1&loop=1&muted=1"
      className="absolute pointer-events-none"
      style={{
        border: 0,
        width: "140%",
        height: "140%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      allow="autoplay"
      title="EmployNext preview"
    />
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
      </div>
    </div>
    <div className="absolute bottom-3 left-3 right-3">
      <span className="text-white/60 text-xs">EmployNext — Youth Trades Program</span>
    </div>
  </div>
);

const MediaHubPhoto = () => (
  <div className="rounded-lg overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
    <img
      src={blackCreekPhoto}
      alt="Black Creek community event — Impact Media Hub example"
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
);

const AdvisoryPhoto = () => (
  <div className="rounded-lg overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
    <img
      src={founderPhoto}
      alt="Rovonn Russell — Strategic Advisory"
      className="w-full h-full object-cover object-top"
      loading="lazy"
    />
  </div>
);

const VisualAsset = ({ type }: { type: ServiceDef["visual"] }) => {
  switch (type) {
    case "employNextPreview":
      return <EmployNextPreview />;
    case "mediaHubPhoto":
      return <MediaHubPhoto />;
    case "advisoryPhoto":
      return <AdvisoryPhoto />;
    case "commOSGraphic":
      return <CommunicationOSGraphic />;
    default:
      return null;
  }
};

// ─── Service card ───────────────────────────────────────────────────

const ServiceCard = ({
  service,
  index,
  activeLane,
}: {
  service: ServiceDef;
  index: number;
  activeLane: Lane;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isFeatured = service.featured;
  const variant = service.featuredVariant ?? "primary";
  const isSecondaryFeatured = isFeatured && variant === "secondary";
  const hasVisual = !!service.visual;

  const displayInvestment = service.investment;
  const displayInvestmentNote = service.investmentNote;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.25) }}
      className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
        isFeatured
          ? isSecondaryFeatured
            ? "bg-gradient-to-br from-[hsl(var(--impact-blue))] to-[hsl(220_55%_18%)] text-white border-[hsl(var(--impact-blue))]/50 shadow-lg shadow-[hsl(var(--impact-blue))]/20"
            : "bg-[hsl(var(--impact-dark))] text-white border-primary/40 shadow-lg shadow-primary/10"
          : "bg-white border-border hover:shadow-md"
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-0 right-8 z-10">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-b-lg uppercase tracking-wider ${
              isSecondaryFeatured
                ? "bg-white text-[hsl(var(--impact-blue))]"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {service.flagshipLabel ?? "Flagship Tier"}
          </span>
        </div>
      )}

      <div className={`p-8 ${hasVisual ? "grid grid-cols-1 lg:grid-cols-2 gap-8" : ""}`}>
        {/* Content side */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isSecondaryFeatured
                  ? "bg-white/15"
                  : isFeatured
                  ? "bg-primary/20"
                  : "bg-primary/8"
              }`}
            >
              <service.icon
                className={`w-5 h-5 ${
                  isSecondaryFeatured ? "text-white" : "text-primary"
                }`}
              />
            </div>
            <div>
              <span
                className={`text-[10px] font-semibold uppercase tracking-widest block ${
                  isSecondaryFeatured ? "text-white/80" : "text-primary"
                }`}
              >
                {service.label}
              </span>
            </div>
          </div>

          <h2
            className={`font-serif text-xl md:text-2xl font-bold mb-1 ${
              isFeatured ? "text-white" : "text-foreground"
            }`}
          >
            {service.title}
          </h2>
          <p
            className={`text-sm mb-4 ${
              isFeatured ? "text-white/50" : "text-muted-foreground"
            }`}
          >
            {service.tagline}
          </p>
          <p
            className={`leading-relaxed text-sm mb-6 ${
              isFeatured ? "text-white/70" : "text-foreground/70"
            }`}
          >
            {service.description}
          </p>

          {/* Outcomes */}
          {service.outcomes && (
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className={`flex items-start gap-2 text-sm ${
                      isFeatured ? "text-white/65" : "text-foreground/65"
                    }`}
                  >
                    <ChevronRight
                      className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                        isSecondaryFeatured ? "text-white" : "text-primary"
                      }`}
                    />
                    {outcome}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Investment + CTA row */}
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-white/10">
            {displayInvestment ? (
              <div>
                <div
                  className={`font-bold text-lg font-serif ${
                    isFeatured ? "text-white" : "text-foreground"
                  }`}
                >
                  {displayInvestment}
                </div>
                {displayInvestmentNote && (
                  <div
                    className={`text-xs ${
                      isFeatured ? "text-white/40" : "text-muted-foreground"
                    }`}
                  >
                    {displayInvestmentNote}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div
                  className={`text-xs uppercase tracking-widest ${
                    isFeatured ? "text-white/40" : "text-muted-foreground"
                  }`}
                >
                  Investment
                </div>
                <div
                  className={`text-sm font-medium ${
                    isFeatured ? "text-white/80" : "text-foreground/80"
                  }`}
                >
                  Scoped to engagement
                </div>
              </div>
            )}
            <Link
              to={service.ctaHref}
              className={`inline-flex items-center gap-2 font-medium text-sm transition-colors duration-300 ${
                isSecondaryFeatured
                  ? "text-white hover:text-white/70"
                  : isFeatured
                  ? "text-primary hover:text-white"
                  : "text-primary hover:text-primary/70"
              }`}
            >
              {service.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Visual side */}
        {hasVisual && (
          <div className="flex items-center justify-center">
            <VisualAsset type={service.visual} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Page ──────────────────────────────────────────────────────

type Lane = "nonprofit" | "corporate";

const laneConfig: Record<Lane, { label: string; icon: typeof Heart; heroSub: string }> = {
  nonprofit: {
    label: "Nonprofits & Organizations",
    icon: Heart,
    heroSub:
      "Services built for nonprofits, foundations, and community organizations that need to earn trust with funders, boards, and the communities they serve.",
  },
  corporate: {
    label: "Corporate & Impact Companies",
    icon: Building2,
    heroSub:
      "Services built for corporate teams, ESG leaders, and impact companies that need credible storytelling to demonstrate accountability and build stakeholder trust.",
  },
};

const Services = () => {
  const [activeLane, setActiveLane] = useState<Lane>("nonprofit");

  useEffect(() => {
    setSEO({
      title: "Services — Impact Loop",
      description:
        "From free diagnostics to cinematic impact films and custom technology. Choose the storytelling pathway that matches where your organization is and where it needs to go.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  const filteredServices = allServices.filter((s) =>
    s.lanes.includes(activeLane)
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[hsl(var(--impact-dark))]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Pathways, Not <span className="text-gradient">Packages</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-2">
              Every organization is at a different stage. Choose the pathway that
              matches where you are and where you want to go.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lane Tabs */}
      <section className="bg-[hsl(var(--impact-dark))] border-b border-white/10 sticky top-[72px] z-30 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            {(Object.entries(laneConfig) as [Lane, typeof laneConfig[Lane]][]).map(
              ([lane, config]) => {
                const Icon = config.icon;
                const isActive = activeLane === lane;
                return (
                  <button
                    key={lane}
                    onClick={() => setActiveLane(lane)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 border-b-2 ${
                      isActive
                        ? "border-primary text-white"
                        : "border-transparent text-white/40 hover:text-white/70"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {config.label}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Lane description */}
      <section className="py-8 bg-[hsl(var(--impact-dark))]">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeLane}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-white/50 text-center max-w-2xl mx-auto text-sm leading-relaxed"
            >
              {laneConfig[activeLane].heroSub}
            </motion.p>
          </AnimatePresence>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-[hsl(var(--impact-cream))]">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLane}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6 max-w-5xl mx-auto"
            >
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  activeLane={activeLane}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 section-purple">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Not Sure Where to Start?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Book a free Storytelling Diagnostic. We'll look at your current
              situation and tell you honestly which pathway makes the most sense
              for where you are right now.
            </p>
            <Link to="/bookings" className="btn-secondary">
              Book Your Free Diagnostic
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
