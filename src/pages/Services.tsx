import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  Compass,
  Video,
  Monitor,
  BarChart2,
  Layers,
  Globe,
  MessageSquare,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";

const pathways = [
  {
    phase: "01",
    label: "Start Here",
    title: "Impact Story Diagnostic",
    tagline: "Free — understand where you are",
    description:
      "A guided assessment that surfaces your strongest story opportunities, gaps in your current communications, and the clearest path to credibility with funders and stakeholders.",
    price: "Free",
    priceNote: "AI-powered tool on the website",
    color: "impact-blue",
    icon: MessageSquare,
    cta: "Take the Diagnostic",
    ctaHref: "/bookings",
  },
  {
    phase: "02",
    label: "Build Visibility",
    title: "Impact Visibility Starter",
    tagline: "Monthly retainer — content that shows up",
    description:
      "A monthly content system that keeps your organization visible with funders, community partners, and stakeholders between major projects. Short-form video cutdowns, social assets, and story distribution built into your workflow.",
    price: "Starting from $1,500/mo",
    priceNote: "CAD",
    color: "impact-blue",
    icon: BarChart2,
    cta: "Book a Call",
    ctaHref: "/bookings",
  },
  {
    phase: "03",
    label: "Scale Content",
    title: "Impact Content Engine",
    tagline: "Monthly retainer — consistent story output",
    description:
      "A full content production system built around your existing story assets. Cutdowns, repurposed testimonials, program highlights, and social-ready clips produced monthly so your mission stays visible across every stakeholder channel.",
    price: "Starting from $3,000/mo",
    priceNote: "CAD",
    color: "impact-blue",
    icon: Layers,
    cta: "Book a Call",
    ctaHref: "/bookings",
  },
  {
    phase: "04",
    label: "Build Capacity",
    title: "Workshops & Training",
    tagline: "One-time or recurring — in-house storytelling skills",
    description:
      "Equip your team with the frameworks, interview techniques, and content standards to identify and capture impact stories on an ongoing basis without relying on external production every time.",
    price: "Starting from $2,500/session",
    priceNote: "CAD",
    color: "impact-purple",
    icon: Users,
    cta: "Learn More",
    ctaHref: "/bookings",
    outcomes: [
      "Story identification frameworks",
      "Interview techniques training",
      "Content planning templates",
      "Ongoing support resources",
    ],
  },
  {
    phase: "05",
    label: "Self-Guided System",
    title: "Framework Kit Access",
    tagline: "One-time purchase — proven systems, self-paced",
    description:
      "Access Impact Loop's complete storytelling framework, templates, and guides to implement at your own pace. Built for self-starters and teams who want a proven system without hands-on guidance.",
    price: "Starting from $500",
    priceNote: "CAD",
    color: "impact-purple",
    icon: BookOpen,
    cta: "Learn More",
    ctaHref: "/bookings",
    outcomes: [
      "Story Standard guidelines",
      "Story Types catalog",
      "Intake prompts library",
      "Implementation checklists",
    ],
  },
  {
    phase: "06",
    label: "Guided Implementation",
    title: "System Setup (Pilot)",
    tagline: "Project-based — build your storytelling infrastructure",
    description:
      "Work directly with Impact Loop to design and implement a storytelling system tailored to your organization's mission, reporting requirements, and stakeholder environment. Includes hands-on training, first story capture support, and a 90-day plan.",
    price: "Starting from $3,000",
    priceNote: "CAD, project-based",
    color: "impact-blue",
    icon: Compass,
    cta: "Book a Discovery Call",
    ctaHref: "/bookings",
    outcomes: [
      "Custom framework adaptation",
      "Team training sessions",
      "First story capture support",
      "90-day implementation plan",
    ],
  },
  {
    phase: "07",
    label: "Flagship Production",
    title: "Cinematic Impact Films",
    tagline: "Project-based — your most credible story asset",
    description:
      "Documentary-style films that capture real people and real outcomes with the production quality that earns trust with donors, board members, funders, and corporate partners. Built to live for years and serve multiple audiences.",
    price: "Starting from $7,000",
    priceNote: "CAD, project-based",
    color: "impact-purple",
    icon: Video,
    cta: "See Our Work",
    ctaHref: "/work",
    featured: true,
    outcomes: [
      "Flagship impact film (60–180 seconds)",
      "6–12 short cutdowns for LinkedIn and social",
      "Story blueprint and interview plan",
      "Strategic deployment guidance",
    ],
  },
  {
    phase: "08",
    label: "Always-On Platform",
    title: "Impact Media Hub",
    tagline: "Platform setup + monthly hosting — your story library",
    description:
      "A branded, purpose-built platform that houses all your impact stories, makes them searchable for stakeholders, and lets you deploy the right story to the right audience without manual effort. Setup plus ongoing management.",
    price: "Starting from $10,000 setup",
    priceNote: "+ $500–$1,500/mo CAD",
    color: "impact-blue",
    icon: Globe,
    cta: "Book a Call",
    ctaHref: "/bookings",
  },
  {
    phase: "09",
    label: "Full-System Strategy",
    title: "Impact Communication OS",
    tagline: "Monthly retainer — end-to-end story system",
    description:
      "A complete operating system for organizational storytelling. Covers production, content strategy, stakeholder deployment, funder-facing assets, and internal alignment. For organizations ready to make storytelling a core operational function.",
    price: "Starting from $5,000/mo",
    priceNote: "CAD",
    color: "impact-purple",
    icon: Layers,
    cta: "Book a Discovery Call",
    ctaHref: "/bookings",
  },
  {
    phase: "10",
    label: "Executive Partnership",
    title: "Strategic Advisory",
    tagline: "Monthly retainer — direct access to Rovonn",
    description:
      "Direct advisory partnership with Rovonn Russell for founders, CEOs, and communications leads navigating complex storytelling challenges. Covers brand positioning, stakeholder strategy, media presence, and organizational trust-building.",
    price: "Starting from $3,000/mo",
    priceNote: "CAD",
    color: "impact-blue",
    icon: MessageSquare,
    cta: "Apply for Advisory",
    ctaHref: "/bookings",
  },
  {
    phase: "11",
    label: "Custom Technology",
    title: "Impact Technology Solutions",
    tagline: "Project-based — purpose-built platforms and tools",
    description:
      "Custom apps, platforms, and software tools built to help your organization operate more efficiently and deliver impact at scale. AI-accelerated development means solutions that once required large teams and long timelines can now be built in weeks.",
    price: "Starting from $15,000",
    priceNote: "CAD, project-based",
    color: "impact-purple",
    icon: Monitor,
    cta: "Book a Discovery Call",
    ctaHref: "/bookings",
    outcomes: [
      "Custom app or platform tailored to your workflows",
      "AI-powered development — weeks, not years",
      "Ongoing support and iteration",
      "Integration with your existing systems",
    ],
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: typeof pathways[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isFeatured = service.featured;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3) }}
      className={`relative p-8 rounded-xl border transition-all duration-300 ${
        isFeatured
          ? "bg-impact-dark text-white border-primary/40 shadow-lg shadow-primary/10"
          : index % 2 === 0
          ? "bg-impact-cream border-border"
          : "bg-white border-border"
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-3 left-8">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left col — icon, phase, title, tagline, description, price */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isFeatured
                  ? "bg-primary/20"
                  : service.color === "impact-blue"
                  ? "bg-impact-blue/10"
                  : "bg-impact-purple/10"
              }`}
            >
              <service.icon
                className={`w-6 h-6 ${
                  isFeatured
                    ? "text-primary"
                    : service.color === "impact-blue"
                    ? "text-impact-blue"
                    : "text-impact-purple"
                }`}
              />
            </div>
            <span
              className={`text-xs font-semibold uppercase tracking-widest ${
                isFeatured ? "text-white/40" : "text-muted-foreground"
              }`}
            >
              {service.phase}
            </span>
          </div>

          <div
            className={`text-xs font-medium uppercase tracking-widest mb-2 ${
              isFeatured
                ? "text-primary"
                : service.color === "impact-blue"
                ? "text-impact-blue"
                : "text-impact-purple"
            }`}
          >
            {service.label}
          </div>

          <h2
            className={`font-serif text-2xl font-bold mb-1 ${
              isFeatured ? "text-white" : "text-impact-dark"
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
              isFeatured ? "text-white/70" : "text-impact-dark/70"
            }`}
          >
            {service.description}
          </p>

          {/* Price */}
          <div
            className={`rounded-lg p-4 ${
              isFeatured ? "bg-white/5 border border-white/10" : "bg-white border border-border"
            }`}
          >
            <div
              className={`font-bold text-xl font-serif ${
                isFeatured ? "text-white" : "text-impact-dark"
              }`}
            >
              {service.price}
            </div>
            {service.priceNote && (
              <div className={`text-xs mt-0.5 ${isFeatured ? "text-white/40" : "text-muted-foreground"}`}>
                {service.priceNote}
              </div>
            )}
          </div>
        </div>

        {/* Right col — outcomes + CTA */}
        <div className="lg:col-span-3 flex flex-col justify-between">
          {service.outcomes && (
            <div className="mb-8">
              <h4
                className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                  isFeatured ? "text-white/40" : "text-impact-dark"
                }`}
              >
                What You Get
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className={`flex items-start gap-2 text-sm ${
                      isFeatured ? "text-white/65" : "text-impact-dark/70"
                    }`}
                  >
                    <ChevronRight
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        service.color === "impact-blue" ? "text-impact-blue" : "text-impact-purple"
                      }`}
                    />
                    {outcome}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-4">
            <Link
              to={service.ctaHref}
              className={`inline-flex items-center gap-2 font-medium text-sm transition-colors duration-300 ${
                isFeatured
                  ? "text-primary hover:text-white"
                  : service.color === "impact-blue"
                  ? "text-impact-blue hover:text-impact-purple"
                  : "text-impact-purple hover:text-impact-blue"
              }`}
            >
              {service.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    setSEO({
      title: "Services — Impact Loop",
      description: "From free diagnostics to cinematic impact films and custom technology. Choose the storytelling pathway that matches where your organization is and where it needs to go.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-impact-dark">
        <div className="container mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-impact-blue font-medium text-sm uppercase tracking-widest mb-4">
              Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Pathways, Not <span className="text-gradient">Packages</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              Every organization is at a different stage. Choose the pathway that
              matches where you are and where you want to go.
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              All prices are in Canadian dollars. Custom scoping available for every service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ascension Path Label */}
      <section className="py-4 bg-impact-dark border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 text-white/30 text-xs uppercase tracking-widest">
            <span>Free</span>
            <span className="text-white/10">→</span>
            <span>Starter</span>
            <span className="text-white/10">→</span>
            <span>Growth</span>
            <span className="text-white/10">→</span>
            <span>Flagship</span>
            <span className="text-white/10">→</span>
            <span>System</span>
            <span className="text-white/10">→</span>
            <span>Technology</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-8 max-w-5xl mx-auto">
            {pathways.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
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
              Book a free Storytelling Diagnostic. We'll look at your current situation and tell you honestly which pathway makes the most sense for where you are right now.
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
