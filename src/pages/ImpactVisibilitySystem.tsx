import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  HeartHandshake,
  Layers,
  Mail,
  Megaphone,
  MessageSquareText,
  PenLine,
  Repeat2,
  Send,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import boardroomFundersPhoto from "@/assets/signature/boardroom-funders.png";
import {
  BOOKING_LINK,
  ORGANIZATION_TYPES,
  type Lead,
  type OrganizationType,
  submitSampleContentRequest,
  trackImpactVisibilityEvent,
} from "@/lib/impactVisibility";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08 },
  }),
};

const problemCards = [
  {
    title: "You post when you remember",
    body: "Visibility becomes random instead of intentional.",
    icon: CalendarDays,
  },
  {
    title: "Your best moments disappear",
    body: "Events, wins, testimonials, and community stories often fade after they happen.",
    icon: Sparkles,
  },
  {
    title: "Content feels like extra work",
    body: "Your team is already stretched, so storytelling keeps getting pushed aside.",
    icon: ClipboardList,
  },
  {
    title: "The right people are not seeing the work",
    body: "Donors, partners, stakeholders, clients, and community members need consistent reminders of your value.",
    icon: Target,
  },
];

const beforeItems = [
  "Scattered updates",
  "Inconsistent posting",
  "Unused photos and videos",
  "Unclear messaging",
  "Overwhelmed team",
];

const afterItems = [
  "Clear content rhythm",
  "Story-driven posts",
  "Reusable messaging",
  "Consistent visibility",
  "Stronger trust",
];

const processSteps = [
  {
    title: "Capture",
    body: "We gather the material your organization already has, including events, updates, reports, photos, ideas, stories, and leadership insights.",
  },
  {
    title: "Create",
    body: "We turn that material into clear, story-driven content your audience can understand and care about.",
  },
  {
    title: "Circulate",
    body: "We help your content show up consistently across the platforms and channels that matter.",
  },
  {
    title: "Compound",
    body: "Over time, your content builds recognition, trust, engagement, and support.",
  },
];

const contentFormats = [
  "Story-driven social posts",
  "Carousel content",
  "LinkedIn updates",
  "Donor and stakeholder updates",
  "Campaign messaging",
  "Leadership thought pieces",
  "Event recap content",
  "Light motion content",
  "Internal communication support",
  "Full storytelling capture for select campaigns",
];

const tiers = [
  {
    name: "Foundation Visibility System",
    line: "For small teams that need consistency without adding more work.",
    bestFor:
      "Small nonprofits, community organizations, early-stage initiatives, and teams that already have photos, updates, reports, or stories but need help turning them into content.",
    includes: [
      "Monthly content strategy direction",
      "8 to 12 story-driven posts per month",
      "Captions and messaging",
      "Content calendar",
      "Repurposing from existing photos, reports, websites, updates, and past events",
      "Light design support",
      "Monthly review and recommendations",
    ],
    doesNotInclude: ["On-site filming", "Full video production"],
    button: "Start with Foundation",
  },
  {
    name: "Growth Visibility System",
    line: "For organizations ready to build stronger visibility and deeper engagement.",
    bestFor: "Teams that want consistent content plus light multimedia support.",
    includes: [
      "Monthly content strategy",
      "12 to 20 posts per month",
      "Repurposing from existing content",
      "Campaign and event content planning",
      "Carousel content",
      "LinkedIn and social platform content",
      "Light video or motion content using existing clips or simple submitted footage",
      "Monthly performance review",
      "Recommendations for future content opportunities",
    ],
    note: "Light video support is included only when footage is provided or when simple edits are required. This is not full production.",
    button: "Build Momentum",
    featured: true,
  },
  {
    name: "Campaign Visibility System",
    line: "For high-impact campaigns that need in-person storytelling and premium production.",
    bestFor:
      "GTA-based nonprofits, companies, foundations, public sector teams, CSR initiatives, and community campaigns that need deeper storytelling.",
    includes: [
      "Campaign strategy",
      "On-site storytelling capture",
      "Interviews",
      "Event or program documentation",
      "Photography and video capture",
      "Story-driven content rollout",
      "Multi-platform campaign content",
      "Stakeholder and donor-facing content",
      "Campaign recap assets",
    ],
    note: "Available for GTA-based projects only. Travel outside the GTA may be scoped separately.",
    button: "Plan a Campaign",
  },
];

type FormState = Omit<Lead, "organization_type"> & {
  organization_type: OrganizationType | "";
};

const initialForm: FormState = {
  first_name: "",
  last_name: "",
  email: "",
  organization_name: "",
  organization_type: "",
  website_or_social_link: "",
  visibility_goal: "",
  interested_in_ongoing_content_support: false,
};

const ImpactVisibilitySystem = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);

  useEffect(() => {
    setSEO({
      title: "Impact Visibility System | Impact Loop",
      description:
        "A premium content visibility system for organizations doing meaningful work. Turn programs, events, updates, photos, reports, and stories into consistent content.",
      ogType: "website",
    });
    trackImpactVisibilityEvent("impact_visibility_page_view");
    return resetSEO;
  }, []);

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFormStart = () => {
    if (hasStartedForm) return;
    setHasStartedForm(true);
    trackImpactVisibilityEvent("sample_content_form_started");
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.first_name.trim()) nextErrors.first_name = "First name is required.";
    if (!form.last_name.trim()) nextErrors.last_name = "Last name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.organization_name.trim()) nextErrors.organization_name = "Organization name is required.";
    if (!form.organization_type) nextErrors.organization_type = "Choose an organization type.";
    if (!form.website_or_social_link.trim()) nextErrors.website_or_social_link = "Website or social link is required.";
    if (!form.visibility_goal.trim()) nextErrors.visibility_goal = "Tell us what needs more visibility.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitSampleContentRequest(form as Lead);
      setIsSuccess(true);
      setForm(initialForm);
      trackImpactVisibilityEvent("sample_content_form_submitted", {
        organization_type: form.organization_type,
        ongoing_support: form.interested_in_ongoing_content_support,
      });
      toast.success("Thank you. We received your request.");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackedClick = (eventName: string, payload?: Record<string, unknown>) => {
    trackImpactVisibilityEvent(eventName, payload);
  };

  return (
    <Layout>
      <main className="bg-[#fffaf3] text-[#201b17]">
        <section className="relative overflow-hidden bg-[#201b17] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(242,177,95,0.22),transparent_28%),linear-gradient(135deg,#201b17_0%,#30251d_48%,#7f5633_100%)]" />
          <div className="container relative z-10 mx-auto grid min-h-[92vh] items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <p className="mb-5 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase text-[#ffd49b] backdrop-blur">
                Impact Visibility System
              </p>
              <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
                You're doing meaningful work. Most people will never see it.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/76 md:text-lg">
                The Impact Visibility System turns your programs, events, updates, and everyday impact into consistent content that builds visibility, trust, and support.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#sample-content"
                  onClick={() => handleTrackedClick("sample_content_form_started", { source: "hero_cta" })}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#f4b15f] px-6 py-3 text-sm font-bold uppercase text-[#201b17] transition hover:bg-[#ffd18b]"
                >
                  Get Free Sample Content
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-md border border-white/28 px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-[#201b17]"
                >
                  See How It Works
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="relative mx-auto w-full max-w-2xl"
            >
              <div className="rounded-[1.25rem] border border-white/16 bg-white/10 p-4 shadow-2xl backdrop-blur-xl md:p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-[#fffaf3] p-5 text-[#201b17] shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase text-[#9d6a3c]">Content Calendar</p>
                      <CalendarDays size={18} className="text-[#9d6a3c]" />
                    </div>
                    <div className="space-y-3">
                      {["Program update", "Partner story", "Event recap"].map((item, index) => (
                        <div key={item} className="flex items-center gap-3 rounded-lg bg-[#f4eadc] p-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-[#8b552d]">
                            {index + 1}
                          </span>
                          <span className="text-sm font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-5 text-[#201b17] shadow-lg">
                    <p className="mb-3 text-xs font-bold uppercase text-[#9d6a3c]">Social Post Preview</p>
                    <div className="rounded-lg bg-[#f4eadc] p-4">
                      <div className="mb-3 h-24 rounded-lg bg-gradient-to-br from-[#e2b574] to-[#72533c]" />
                      <p className="text-sm font-bold">A week inside the work</p>
                      <p className="mt-2 text-xs leading-relaxed text-[#665747]">
                        Turning an everyday program moment into a story donors and partners can understand.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-5 text-[#201b17] shadow-lg md:col-span-2">
                    <div className="grid gap-4 md:grid-cols-[1fr_180px] md:items-center">
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase text-[#9d6a3c]">Stakeholder Update</p>
                        <p className="font-serif text-2xl font-bold">This month, your support helped 42 families access services.</p>
                        <p className="mt-2 text-sm text-[#665747]">Clear, useful, and built from work already happening.</p>
                      </div>
                      <div className="rounded-full border border-[#dcc7ab] p-3">
                        {["Real work", "Story", "Content", "Visibility", "Support"].map((item) => (
                          <div key={item} className="mb-2 rounded-full bg-[#f4eadc] px-3 py-1 text-center text-xs font-bold text-[#6f4628] last:mb-0">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase text-[#9d6a3c]">The real problem</p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">Your team does not need to post more. It needs a system.</h2>
              <p className="mt-5 text-[#665747]">
                Most organizations are already sitting on powerful stories. The problem is that those stories are scattered across events, reports, photos, conversations, and people's heads.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {problemCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="rounded-xl border border-[#eadfce] bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#f2e3ce] text-[#8b552d]">
                    <card.icon size={22} />
                  </div>
                  <h3 className="font-serif text-xl font-bold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#665747]">{card.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6eadb] py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="mb-3 text-xs font-bold uppercase text-[#9d6a3c]">The shift</p>
                <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
                  You do not have a content problem. You have a capture problem.
                </h2>
                <div className="mt-6 space-y-3 text-[#5f5144]">
                  <p>The stories are already there.</p>
                  <p>The impact is already happening.</p>
                  <p>The work is already meaningful.</p>
                  <p className="pt-3 font-semibold text-[#201b17]">
                    What is missing is a repeatable way to capture it, shape it, and share it consistently.
                  </p>
                  <p>That is what the Impact Visibility System is built to do.</p>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-xl border border-[#e1c9aa] bg-white/70 p-6">
                  <p className="mb-5 text-xs font-bold uppercase text-[#9b6f53]">Before</p>
                  <div className="space-y-3">
                    {beforeItems.map((item) => (
                      <div key={item} className="rounded-lg bg-white px-4 py-3 text-sm text-[#665747] shadow-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-[#c99a65] bg-[#201b17] p-6 text-white shadow-xl">
                  <p className="mb-5 text-xs font-bold uppercase text-[#f4b15f]">After</p>
                  <div className="space-y-3">
                    {afterItems.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm text-white/86">
                        <CheckCircle2 className="h-4 w-4 text-[#f4b15f]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase text-[#9d6a3c]">How it works</p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">From real work to real visibility.</h2>
            </div>
            <div className="relative mx-auto grid max-w-6xl gap-5 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="relative rounded-xl border border-[#eadfce] bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#201b17] font-serif text-2xl font-bold text-[#f4b15f]">
                    {index + 1}
                  </div>
                  <h3 className="font-serif text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#665747]">{step.body}</p>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-1/2 hidden h-8 w-8 rounded-full bg-[#f4b15f] p-2 text-[#201b17] lg:block" />
                  )}
                </motion.article>
              ))}
            </div>
              <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-full border border-[#e3d0b8] bg-white px-5 py-3 text-center text-sm font-semibold text-[#6b4b31]">
                <Repeat2 size={18} />
                {"Capture -> Create -> Circulate -> Compound -> Capture"}
              </div>
          </div>
        </section>

        <section id="sample-content" className="bg-[#201b17] py-20 text-white md:py-28">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase text-[#f4b15f]">Free sample content pack</p>
              <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">See what your content could look like.</h2>
              <p className="mt-5 text-white/72">
                Request a free sample content pack based on your organization's real work.
              </p>
              <div className="mt-6 space-y-4 text-white/72">
                <p>
                  Share your organization's website or social profile, and we'll review your work and create a small set of sample content ideas tailored to your mission, message, and audience.
                </p>
                <p className="font-semibold text-white">
                  This is not a generic template. It is a preview of how your organization could show up more clearly and consistently.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/12 bg-white p-5 text-[#201b17] shadow-2xl md:p-8">
              {isSuccess ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f4dc] text-[#437326]">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-serif text-3xl font-bold">Thank you. We received your request.</h3>
                  <p className="mx-auto mt-4 max-w-xl text-[#665747]">
                    We'll review your organization and prepare a sample content pack within a few business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 rounded-md border border-[#d9c4a9] px-5 py-3 text-sm font-bold uppercase text-[#6b4b31]"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} onFocusCapture={handleFormStart} noValidate className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First Name" id="first_name" error={errors.first_name}>
                      <input
                        id="first_name"
                        name="first_name"
                        required
                        maxLength={100}
                        value={form.first_name}
                        onChange={(event) => updateField("first_name", event.target.value)}
                        aria-invalid={Boolean(errors.first_name)}
                        aria-describedby={errors.first_name ? "first_name-error" : undefined}
                        className="ivs-input"
                      />
                    </Field>
                    <Field label="Last Name" id="last_name" error={errors.last_name}>
                      <input
                        id="last_name"
                        name="last_name"
                        required
                        maxLength={100}
                        value={form.last_name}
                        onChange={(event) => updateField("last_name", event.target.value)}
                        aria-invalid={Boolean(errors.last_name)}
                        aria-describedby={errors.last_name ? "last_name-error" : undefined}
                        className="ivs-input"
                      />
                    </Field>
                  </div>
                  <Field label="Email" id="email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={255}
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="ivs-input"
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Organization Name" id="organization_name" error={errors.organization_name}>
                      <input
                        id="organization_name"
                        name="organization_name"
                        required
                        maxLength={160}
                        value={form.organization_name}
                        onChange={(event) => updateField("organization_name", event.target.value)}
                        aria-invalid={Boolean(errors.organization_name)}
                        aria-describedby={errors.organization_name ? "organization_name-error" : undefined}
                        className="ivs-input"
                      />
                    </Field>
                    <Field label="Organization Type" id="organization_type" error={errors.organization_type}>
                      <select
                        id="organization_type"
                        name="organization_type"
                        required
                        value={form.organization_type}
                        onChange={(event) => updateField("organization_type", event.target.value)}
                        aria-invalid={Boolean(errors.organization_type)}
                        aria-describedby={errors.organization_type ? "organization_type-error" : undefined}
                        className="ivs-input"
                      >
                        <option value="">Select type</option>
                        {ORGANIZATION_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Website or Social Link" id="website_or_social_link" error={errors.website_or_social_link}>
                    <input
                      id="website_or_social_link"
                      name="website_or_social_link"
                      required
                      maxLength={500}
                      value={form.website_or_social_link}
                      onChange={(event) => updateField("website_or_social_link", event.target.value)}
                      placeholder="https://yourorganization.org or social profile"
                      aria-invalid={Boolean(errors.website_or_social_link)}
                      aria-describedby={errors.website_or_social_link ? "website_or_social_link-error" : undefined}
                      className="ivs-input"
                    />
                  </Field>
                  <Field label="What do you want more visibility for?" id="visibility_goal" error={errors.visibility_goal}>
                    <textarea
                      id="visibility_goal"
                      name="visibility_goal"
                      required
                      maxLength={1200}
                      value={form.visibility_goal}
                      onChange={(event) => updateField("visibility_goal", event.target.value)}
                      placeholder="Example: fundraising, programs, events, community impact, corporate social responsibility, client acquisition, public awareness"
                      rows={4}
                      aria-invalid={Boolean(errors.visibility_goal)}
                      aria-describedby={errors.visibility_goal ? "visibility_goal-error" : undefined}
                      className="ivs-input min-h-28 resize-none"
                    />
                  </Field>
                  <label htmlFor="interested_in_ongoing_content_support" className="flex items-start gap-3 rounded-lg bg-[#fffaf3] p-4 text-sm text-[#5f5144]">
                    <input
                      id="interested_in_ongoing_content_support"
                      name="interested_in_ongoing_content_support"
                      type="checkbox"
                      checked={form.interested_in_ongoing_content_support}
                      onChange={(event) => updateField("interested_in_ongoing_content_support", event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#c8ad8b]"
                    />
                    <span>I am interested in ongoing content support</span>
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#9d6a3c] px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-[#7f5633] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending Request..." : "Get My Free Sample Content"}
                    {!isSubmitting && <Send size={16} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase text-[#9d6a3c]">Formats</p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">Content built from the work you are already doing.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {contentFormats.map((format, index) => (
                <motion.div
                  key={format}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-sm"
                >
                  <Layers className="mb-4 h-5 w-5 text-[#9d6a3c]" />
                  <p className="text-sm font-semibold leading-snug">{format}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6eadb] py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase text-[#9d6a3c]">Visibility levels</p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">Choose the level of visibility your organization needs.</h2>
              <p className="mt-5 text-[#665747]">
                From consistent presence to full storytelling campaigns, we shape the system around your team, goals, and capacity.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {tiers.map((tier) => (
                <article key={tier.name} className={`rounded-xl border p-6 shadow-sm ${tier.featured ? "border-[#9d6a3c] bg-[#201b17] text-white shadow-xl" : "border-[#e3d0b8] bg-white"}`}>
                  <h3 className="font-serif text-2xl font-bold">{tier.name}</h3>
                  <p className={`mt-3 text-sm font-semibold ${tier.featured ? "text-[#f4b15f]" : "text-[#9d6a3c]"}`}>{tier.line}</p>
                  <p className={`mt-5 text-sm leading-relaxed ${tier.featured ? "text-white/72" : "text-[#665747]"}`}>
                    <span className="font-bold">Best for: </span>{tier.bestFor}
                  </p>
                  <div className="mt-6 space-y-3">
                    {tier.includes.map((item) => (
                      <div key={item} className="flex gap-3 text-sm">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${tier.featured ? "text-[#f4b15f]" : "text-[#9d6a3c]"}`} />
                        <span className={tier.featured ? "text-white/78" : "text-[#5f5144]"}>{item}</span>
                      </div>
                    ))}
                  </div>
                  {tier.doesNotInclude && (
                    <div className="mt-5 rounded-lg bg-[#fff7ee] p-4 text-sm text-[#6f4c2f]">
                      <p className="font-bold">Does not include:</p>
                      <p>{tier.doesNotInclude.join(", ")}</p>
                    </div>
                  )}
                  {tier.note && (
                    <p className={`mt-5 rounded-lg p-4 text-sm leading-relaxed ${tier.featured ? "bg-white/10 text-white/76" : "bg-[#fff7ee] text-[#6f4c2f]"}`}>
                      {tier.note}
                    </p>
                  )}
                  <p className={`mt-6 text-sm ${tier.featured ? "text-white/70" : "text-[#665747]"}`}>
                    Custom scoped based on your goals, team, and content needs.
                  </p>
                  <p className={`mt-2 text-xs ${tier.featured ? "text-white/50" : "text-[#8c7b69]"}`}>
                    Accessible monthly options are available for smaller organizations.
                  </p>
                  <a
                    href="#sample-content"
                    onClick={() => handleTrackedClick("tier_cta_clicked", { tier: tier.name })}
                    className={`mt-7 inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-sm font-bold uppercase transition ${
                      tier.featured ? "bg-[#f4b15f] text-[#201b17] hover:bg-[#ffd18b]" : "bg-[#201b17] text-white hover:bg-[#3b312a]"
                    }`}
                  >
                    {tier.button}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-xl">
              <img src={boardroomFundersPhoto} alt="Team presenting impact storytelling work" className="h-full min-h-[360px] w-full object-cover" />
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase text-[#9d6a3c]">Why Impact Loop</p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">Built for organizations where the story matters.</h2>
              <div className="mt-6 space-y-4 text-[#665747]">
                <p>Impact Loop is not here to make random content for the sake of posting.</p>
                <p>We help organizations communicate the value of their work with clarity, consistency, and care.</p>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Impact storytelling", "Content strategy", "AI-assisted workflows", "Communication systems", "Human-centered messaging"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-[#eadfce] bg-white p-4 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-[#9d6a3c]" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[#665747]">
                The result is content that feels true to your organization and useful to the people you are trying to reach.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#201b17] py-20 text-white md:py-28">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase text-[#f4b15f]">Connected to ADAPT</p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">AI helps us move faster. Story keeps it human.</h2>
              <p className="mt-6 leading-relaxed text-white/72">
                We use AI-assisted workflows to help organize ideas, repurpose content, draft captions, and build content systems more efficiently.
              </p>
              <p className="mt-4 leading-relaxed text-white/72">
                But the heart of the work stays human. Your mission, your voice, your community, and your impact remain at the center.
              </p>
              <Link
                to="/adapt-ai-training"
                onClick={() => handleTrackedClick("adapt_cta_clicked")}
                className="mt-8 inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-[#201b17]"
              >
                Explore ADAPT AI Training
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-4">
              {[
                { icon: MessageSquareText, label: "Organize ideas" },
                { icon: FileText, label: "Repurpose reports" },
                { icon: PenLine, label: "Draft captions" },
                { icon: BarChart3, label: "Build repeatable systems" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/8 p-5">
                  <item.icon className="h-5 w-5 text-[#f4b15f]" />
                  <span className="font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 text-center">
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase text-[#9d6a3c]">Final CTA</p>
              <h2 className="font-serif text-4xl font-bold md:text-6xl">Let's make your work visible.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[#665747]">
                Request a free sample content pack and see how your organization could turn real work into consistent, story-driven content.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#sample-content"
                  onClick={() => handleTrackedClick("sample_content_form_started", { source: "final_cta" })}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#9d6a3c] px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-[#7f5633]"
                >
                  Get Free Sample Content
                  <ArrowRight size={16} />
                </a>
                <Link
                  to={BOOKING_LINK}
                  onClick={() => handleTrackedClick("book_call_clicked", { source: "final_cta" })}
                  className="inline-flex items-center justify-center rounded-md border border-[#201b17] px-6 py-3 text-sm font-bold uppercase text-[#201b17] transition hover:bg-[#201b17] hover:text-white"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

const Field = ({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#201b17]">
      {label} <span className="text-[#b42318]">*</span>
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-2 text-sm text-[#b42318]">
        {error}
      </p>
    )}
  </div>
);

export default ImpactVisibilitySystem;
