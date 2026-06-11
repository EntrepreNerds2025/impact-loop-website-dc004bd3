import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Clock,
  Database,
  Sparkles,
  Search,
  FileText,
  MessageSquare,
  TrendingUp,
  Bot,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Users,
  ClipboardList,
  Lightbulb,
  LineChart,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// ---------- Static content ----------

const problemCards = [
  {
    icon: Clock,
    title: "Content Takes Too Much Time",
    body: "Many organizations know they need to post, share updates, and tell better stories — but creating consistent content can feel like another full-time job.",
  },
  {
    icon: Database,
    title: "Data Lives in Too Many Places",
    body: "Impact stories, program numbers, testimonials, and funder updates are often scattered across spreadsheets, documents, emails — and memory.",
  },
  {
    icon: Sparkles,
    title: "AI Feels Useful but Unclear",
    body: "Many nonprofits are curious about AI, but they aren't sure where to start, what's safe, or how it actually applies to their day-to-day work.",
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Apply",
    body: "Your organization completes a short form so we can understand your mission, audience, and current communication challenges.",
  },
  {
    icon: Search,
    title: "We Review Your Public Presence",
    body: "We look at your website, social media, public messaging, and available engagement signals. No backend access is required.",
  },
  {
    icon: Lightbulb,
    title: "You Receive a Practical Recommendation",
    body: "We provide a simple, tailored recommendation — a social post idea, campaign angle, messaging improvement, or content opportunity.",
  },
  {
    icon: LineChart,
    title: "We Track Learnings & Share Insights",
    body: "Where possible, we track public-facing results and summarize what we learn. You may be invited into a future case study — only with permission.",
  },
];

const benefits = [
  "A public-facing content and messaging review",
  "One tailored content or campaign recommendation",
  "Insight into how your organization currently communicates its impact",
  "Suggested ways to improve storytelling, engagement, or reporting",
  "A simple summary of findings",
  "Potential opportunity to be featured in a positive Impact Loop case study",
  "Early access to future Impact Loop tools for content, data, grant readiness, and AI workflows",
];

const audience = [
  "Nonprofits",
  "Charities",
  "Community organizations",
  "Youth programs",
  "Faith-based initiatives",
  "Social enterprises",
  "Grassroots organizations",
  "Arts & culture organizations",
  "Health & wellness initiatives",
  "Education & mentorship programs",
];

const researchFocus = [
  {
    icon: FileText,
    title: "Content Clarity",
    body: "How clearly does the organization explain who they serve, what they do, and why it matters?",
  },
  {
    icon: MessageSquare,
    title: "Public Engagement",
    body: "What types of posts, stories, or updates create stronger connection with the community?",
  },
  {
    icon: TrendingUp,
    title: "Impact Storytelling",
    body: "How can nonprofits better turn program work, testimonials, and outcomes into compelling public narratives?",
  },
  {
    icon: Bot,
    title: "AI Readiness",
    body: "Where could AI reduce repetitive work — without replacing the human care and judgment mission-driven work requires?",
  },
];

const trustPoints = [
  "No backend account access required",
  "No private donor data requested",
  "No confidential client information needed",
  "No case study published without permission",
  "Public-facing review only, unless your team chooses to share more",
  "Recommendations support your mission — they don't replace your voice",
];

const osCapabilities = [
  "Organize their impact data",
  "Tell better stories",
  "Prepare stronger reports",
  "Find relevant funding opportunities",
  "Build content faster",
  "Improve donor & community communication",
  "Make better decisions with clearer information",
];

const faqs = [
  {
    q: "Do we need to give you access to our social media accounts?",
    a: "No. The study begins with public-facing information only. We can review your website, social media presence, and public content without needing any backend access.",
  },
  {
    q: "Is this free?",
    a: "For the pilot version of the study, selected organizations may receive a free or low-cost review. Impact Loop may later offer deeper paid support, but there is no obligation to purchase anything.",
  },
  {
    q: "Will our organization be publicly featured?",
    a: "Not without your permission. If we believe your organization would make a strong case study, we will ask for approval before anything is published.",
  },
  {
    q: "What kind of recommendation will we receive?",
    a: "You may receive a content idea, messaging suggestion, campaign angle, engagement insight, or a simple AI/system recommendation based on what we observe.",
  },
  {
    q: "Is this only for large nonprofits?",
    a: "No. This is especially helpful for small and mid-sized organizations doing meaningful work but without large marketing, data, or technology teams.",
  },
  {
    q: "What does Impact Loop do beyond the study?",
    a: "Impact Loop helps mission-driven organizations improve their content, data, systems, reporting, and AI-supported workflows so they can communicate their impact more clearly and operate with more confidence.",
  },
];

const orgTypes = [
  "Nonprofit",
  "Charity",
  "Community organization",
  "Youth program",
  "Faith-based community initiative",
  "Social enterprise",
  "Grassroots organization",
  "Arts & culture organization",
  "Health & wellness initiative",
  "Education & mentorship program",
  "Other",
];

const challenges = [
  "Content creation",
  "Social media engagement",
  "Reporting impact",
  "Grant readiness",
  "Donor communication",
  "AI adoption",
  "Systems and operations",
  "Other",
];

// ---------- Form schema ----------

const urlOptional = z
  .string()
  .trim()
  .url("Enter a valid URL (including https://)")
  .or(z.literal(""))
  .optional();

const applicationSchema = z.object({
  organization_name: z.string().trim().min(1, "Organization name is required").max(200),
  contact_name: z.string().trim().min(1, "Contact name is required").max(120),
  role: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Enter a valid email").max(255),
  website: urlOptional,
  social_link: urlOptional,
  organization_type: z.string().min(1, "Please select your organization type"),
  community_served: z.string().trim().min(1, "Please tell us who you serve").max(300),
  biggest_challenge: z.string().min(1, "Please select your biggest challenge"),
  value_goal: z.string().trim().max(1000).optional(),
  consent_public: z.literal(true, {
    errorMap: () => ({ message: "Please confirm to continue" }),
  }),
  consent_contact: z.literal(true, {
    errorMap: () => ({ message: "Please confirm to continue" }),
  }),
  consent_case_study: z.boolean().optional(),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

// ---------- Reusable animation wrapper ----------

const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <span
    className={`inline-block text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4 ${
      light ? "text-white/70" : "text-[hsl(var(--impact-blue))]"
    }`}
  >
    {children}
  </span>
);

// ---------- Page ----------

const NonprofitGrowthStudy = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setSEO({
      title: "Impact Loop Nonprofit Growth Study | Content, Data and AI for Mission-Driven Organizations",
      description:
        "Apply to join Impact Loop's nonprofit research initiative exploring how better content, clearer data, and practical AI-supported workflows can help mission-driven organizations grow their reach and communicate their impact.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  const form = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      organization_name: "",
      contact_name: "",
      role: "",
      email: "",
      website: "",
      social_link: "",
      organization_type: "",
      community_served: "",
      biggest_challenge: "",
      value_goal: "",
      consent_public: undefined as unknown as true,
      consent_contact: undefined as unknown as true,
      consent_case_study: false,
    },
  });

  const onSubmit = async (values: ApplicationValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("growth_study_applications" as any).insert({
        organization_name: values.organization_name,
        contact_name: values.contact_name,
        role: values.role || null,
        email: values.email,
        website: values.website || null,
        social_link: values.social_link || null,
        organization_type: values.organization_type,
        community_served: values.community_served,
        biggest_challenge: values.biggest_challenge,
        value_goal: values.value_goal || null,
        consent_public: values.consent_public,
        consent_contact: values.consent_contact,
        consent_case_study: Boolean(values.consent_case_study),
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again, or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden section-cream pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Loop motif */}
        <svg
          className="pointer-events-none absolute -right-24 -top-24 w-[420px] opacity-[0.12]"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="200" cy="200" r="150" stroke="hsl(var(--impact-blue))" strokeWidth="2" />
          <circle cx="200" cy="200" r="110" stroke="hsl(var(--impact-purple))" strokeWidth="2" />
          <circle cx="200" cy="200" r="70" stroke="hsl(var(--impact-blue))" strokeWidth="2" />
        </svg>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--impact-blue))] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--impact-purple))]" />
                A practical research initiative
              </span>
              <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground">
                Is Your Nonprofit Reaching as Many People as It Could?
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Many mission-driven organizations are doing powerful work, but limited time, scattered
                systems, and unclear content can make it hard to show the full impact. Impact Loop is
                launching a practical research initiative to help nonprofits understand how stronger
                content, better data, and simple AI-supported workflows can improve visibility,
                engagement, and funding readiness.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#apply" className="btn-primary">
                  Apply to Join the Study
                </a>
                <a href="#how" className="btn-secondary">
                  See How It Works
                </a>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-[hsl(var(--impact-blue))]" />
                Public-facing review only · No backend access required · Limited first cohort
              </p>
            </Reveal>

            {/* Dashboard mockup */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="font-serif text-lg font-semibold text-foreground">
                    Nonprofit Growth Snapshot
                  </span>
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--impact-blue))]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[hsl(var(--impact-blue))]/8 p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      Social Reach
                    </p>
                    <p className="mt-1 font-serif text-2xl font-semibold text-foreground">12.4k</p>
                  </div>
                  <div className="rounded-xl bg-[hsl(var(--impact-purple))]/8 p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      Community Stories
                    </p>
                    <p className="mt-1 font-serif text-2xl font-semibold text-foreground">38</p>
                  </div>
                </div>
                <div className="mt-3 rounded-xl border border-border p-4">
                  <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                    Public Engagement Signals
                  </p>
                  <div className="flex h-16 items-end gap-2">
                    {[42, 78, 55, 88, 64, 96].map((h, i) => (
                      <span
                        key={i}
                        className={`flex-1 rounded-t ${
                          i % 2 === 0
                            ? "bg-[hsl(var(--impact-blue))]/70"
                            : "bg-[hsl(var(--impact-purple))]/70"
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      Impact Metrics
                    </p>
                    <p className="mt-1 font-serif text-2xl font-semibold text-foreground">7</p>
                  </div>
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      Grant Readiness
                    </p>
                    <p className="mt-1 font-serif text-2xl font-semibold text-foreground">Clearer</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-border p-3.5 text-sm font-medium text-foreground">
                  <span className="rounded-md bg-[hsl(var(--impact-dark))] px-2 py-1 text-[0.6rem] font-bold tracking-wide text-white">
                    AI INSIGHT
                  </span>
                  One tailored content recommendation ready
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM ===== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>The Challenge</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Great Work Often Goes Underseen
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Nonprofits are often stretched thin — serving communities, managing programs, reporting to
              funders, creating content, writing grants, and keeping up with new technology, all at once.
              The issue is rarely a lack of impact. It's usually a lack of capacity, clarity, and systems.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {problemCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--impact-blue))]/10 text-[hsl(var(--impact-blue))]">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OPPORTUNITY ===== */}
      <section className="section-cream py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <SectionLabel>The Opportunity</SectionLabel>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                What If Nonprofits Had a Clearer Way to Learn What Works?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                The Impact Loop Nonprofit Growth Study is designed to help organizations test small,
                practical improvements — without adding more pressure to their teams. Instead of asking
                nonprofits to overhaul everything, we start with simple public-facing insights:
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "What are you already communicating well?",
                  "Where is your message unclear?",
                  "What content could help more people understand your mission?",
                  "What basic engagement patterns can we learn from?",
                  "How could AI or better systems reduce repetitive work?",
                ].map((q) => (
                  <li key={q} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[hsl(var(--impact-blue))]" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl bg-white p-3 shadow-xl">
                <div className="rounded-xl bg-muted p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Before
                  </p>
                  <ul className="mt-3 space-y-1.5 text-foreground/80">
                    <li>— Scattered posts</li>
                    <li>— Manual reporting</li>
                    <li>— Unclear messaging</li>
                    <li>— Missed stories</li>
                  </ul>
                </div>
                <div className="flex justify-center py-2 text-[hsl(var(--impact-blue))]">
                  <ArrowDown className="h-6 w-6" />
                </div>
                <div className="rounded-xl bg-[hsl(var(--impact-blue))]/8 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--impact-blue))]">
                    After
                  </p>
                  <ul className="mt-3 space-y-1.5 text-foreground">
                    {[
                      "Clearer content",
                      "Stronger storytelling",
                      "Better public engagement insights",
                      "Easier reporting opportunities",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 flex-none text-[hsl(var(--impact-blue))]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="py-20 md:py-28 scroll-mt-24">
        <div className="container mx-auto px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>The Process</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Four simple steps — designed to be lightweight from the first click to the final insight.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-7 shadow-sm">
                  <span className="absolute right-6 top-6 font-serif text-3xl font-bold text-[hsl(var(--impact-blue))]/20">
                    {i + 1}
                  </span>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--impact-blue))]/10 text-[hsl(var(--impact-blue))]">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-xl bg-[hsl(var(--impact-blue))]/8 px-6 py-5 text-[hsl(var(--impact-blue))]">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-none" />
              <p className="text-sm font-medium leading-relaxed text-foreground">
                This initiative is designed to be lightweight. We focus on public-facing information
                unless your organization chooses to provide additional context.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="section-cream py-20 md:py-28">
        <div className="container mx-auto px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>What's Included</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              What Your Organization Gets
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real value, delivered upfront — with no obligation to purchase anything.
            </p>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-white px-5 py-4 shadow-sm">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-[hsl(var(--impact-blue))] text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <p className="text-foreground/90">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AUDIENCE ===== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>Who It's For</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Who Should Apply?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              This initiative is designed for mission-driven teams of all kinds:
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {audience.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm"
              >
                {a}
              </span>
            ))}
          </Reveal>
          <Reveal className="mx-auto mt-8 max-w-xl text-center">
            <p className="text-muted-foreground">
              You don't need to be a large organization. You simply need to be doing mission-driven work
              and have a public presence we can review.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== RESEARCH FOCUS ===== */}
      <section className="section-cream py-20 md:py-28">
        <div className="container mx-auto px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>The Research</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              What We're Learning
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              This initiative helps Impact Loop better understand how mission-driven organizations can
              use content, data, and AI-supported systems in realistic, responsible ways.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchFocus.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--impact-purple))]/10 text-[hsl(var(--impact-purple))]">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRIVACY / TRUST ===== */}
      <section className="section-dark py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <SectionLabel light>Privacy &amp; Trust</SectionLabel>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                A Lightweight, Respectful Approach
              </h2>
              <p className="mt-4 text-lg text-white/70 leading-relaxed">
                We know nonprofits handle sensitive stories, community relationships, and important data.
                This study is designed to begin with public-facing information only.
              </p>
              <ul className="mt-6 space-y-3">
                {trustPoints.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-white/85">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[hsl(var(--impact-blue))]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-8 md:p-10">
                <span className="font-serif text-6xl leading-none text-[hsl(var(--impact-blue))]">"</span>
                <p className="mt-2 font-serif text-2xl md:text-3xl leading-snug text-white">
                  Impact Loop believes AI should strengthen mission-driven work — not strip away the
                  humanity that makes it meaningful.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== IMPACT OS VISION ===== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="rounded-3xl border border-border bg-gradient-to-br from-[hsl(var(--impact-blue))]/8 via-card to-[hsl(var(--impact-purple))]/8 p-8 md:p-12">
              <span className="inline-block rounded-full bg-[hsl(var(--impact-dark))] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                The Bigger Vision
              </span>
              <h2 className="mt-5 font-serif text-3xl md:text-4xl font-bold text-foreground">
                Building the Future Impact OS
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                This initiative is part of a larger vision: building an <strong className="text-foreground">Impact OS</strong> for
                mission-driven organizations — a working concept for a practical ecosystem of tools,
                workflows, and AI-supported systems that help organizations:
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {osCapabilities.map((cap) => (
                  <div
                    key={cap}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white/70 px-4 py-3 text-sm font-medium text-foreground"
                  >
                    <span className="h-2 w-2 flex-none rounded-full bg-[hsl(var(--impact-purple))]" />
                    {cap}
                  </div>
                ))}
              </div>
              <p className="mt-7 max-w-2xl text-sm italic text-muted-foreground">
                This study helps us learn directly from real organizations before building tools in
                isolation. Impact OS is an evolving concept — we're starting with people, not a finished
                platform.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== APPLICATION FORM ===== */}
      <section id="apply" className="section-cream py-20 md:py-28 scroll-mt-20">
        <div className="container mx-auto px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>Apply Now</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Apply to Join the Impact Loop Nonprofit Growth Study
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              If your organization is doing meaningful work and wants practical insight into how to
              communicate it more clearly, we'd love to learn from you — and support you.
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-3xl border border-border bg-white p-7 md:p-10 shadow-xl">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-6 flex h-18 w-18 items-center justify-center rounded-full bg-[hsl(var(--impact-blue))]/10 p-4 text-[hsl(var(--impact-blue))]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Thank you for applying.</h3>
                  <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                    Impact Loop will review your organization's information and follow up if there's a fit
                    for the current study. Keep an eye on your inbox.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="organization_name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name *</FormLabel>
                        <FormControl><Input placeholder="Your organization" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="contact_name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name *</FormLabel>
                        <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="role" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role or Title</FormLabel>
                        <FormControl><Input placeholder="e.g. Executive Director" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl><Input type="email" placeholder="you@org.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="website" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl><Input placeholder="https://" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="social_link" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Social Media Link</FormLabel>
                        <FormControl><Input placeholder="https://" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="organization_type" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Organization *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select one…" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {orgTypes.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="community_served" render={({ field }) => (
                      <FormItem>
                        <FormLabel>What community do you serve? *</FormLabel>
                        <FormControl><Input placeholder="e.g. newcomer families in Toronto" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="biggest_challenge" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>What is your biggest current challenge? *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select one…" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {challenges.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="value_goal" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>What would make this study valuable for your organization?</FormLabel>
                        <FormControl><Textarea rows={3} placeholder="A sentence or two is perfect." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="consent_public" render={({ field }) => (
                      <FormItem className="md:col-span-2 flex flex-row items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                        </FormControl>
                        <div className="leading-snug">
                          <FormLabel className="font-normal text-foreground/90">
                            I understand this initiative begins with public-facing information.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="consent_contact" render={({ field }) => (
                      <FormItem className="md:col-span-2 flex flex-row items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                        </FormControl>
                        <div className="leading-snug">
                          <FormLabel className="font-normal text-foreground/90">
                            I agree to be contacted by Impact Loop about this study.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="consent_case_study" render={({ field }) => (
                      <FormItem className="md:col-span-2 flex flex-row items-start gap-3 rounded-xl border border-[hsl(var(--impact-blue))]/30 bg-[hsl(var(--impact-blue))]/8 p-4 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                        </FormControl>
                        <div className="leading-snug">
                          <FormLabel className="font-normal text-foreground/90">
                            <strong>Optional:</strong> I'm open to being considered for a future case study,
                            with final approval before anything is published.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )} />

                    <div className="md:col-span-2">
                      <button type="submit" disabled={submitting} className="btn-primary w-full text-center !py-4 disabled:opacity-50">
                        {submitting ? "Submitting…" : "Apply to Join the Study"}
                      </button>
                      <p className="mt-3 text-center text-xs text-muted-foreground">
                        We review every application personally and follow up only if there's a fit for the
                        current cohort.
                      </p>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>Questions</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border bg-card px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-serif text-lg font-semibold text-foreground hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="section-dark relative overflow-hidden py-24 text-center">
        <svg
          className="pointer-events-none absolute -bottom-28 -left-20 w-[360px] opacity-[0.10]"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="200" cy="200" r="150" stroke="#fff" strokeWidth="2" />
          <circle cx="200" cy="200" r="100" stroke="hsl(var(--impact-blue))" strokeWidth="2" />
          <circle cx="200" cy="200" r="55" stroke="hsl(var(--impact-purple))" strokeWidth="2" />
        </svg>
        <div className="container relative z-10 mx-auto px-6">
          <Reveal>
            <Users className="mx-auto mb-6 h-10 w-10 text-[hsl(var(--impact-blue))]" />
            <h2 className="mx-auto max-w-2xl font-serif text-3xl md:text-5xl font-bold text-white">
              Your impact deserves to be seen.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              Join the first cohort of the Impact Loop Nonprofit Growth Study and get a practical,
              public-facing look at how to reach more of the people your mission is meant to serve.
            </p>
            <a href="#apply" className="btn-primary mt-8 inline-flex items-center gap-2">
              Apply to Join the Study <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default NonprofitGrowthStudy;
