/**
 * StoryLoop. /loop
 *
 * Lead magnet tool entry point. Path selector, then a multi-step intake.
 *
 * Two-stage UX:
 *   Steps 0-2: Path, About, Story focus (~5 min)
 *   Step 3:    Checkpoint. Capture email. Choose: get starter LOOP now OR continue for full package.
 *   Steps 4-7: Human at center, Audience, Assets, Voice notes (~10 more min)
 *   Submit:    Navigates to /loop/result/[id]?mode=starter or ?mode=full
 *
 * Phase 1 stub: submission navigates to the hardcoded CAFCAN sample with the mode param.
 * Phase 2 will POST to a generate-story-loop edge function and use real session IDs.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Briefcase,
  User as UserIcon,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type Path = "nonprofit" | "business" | "founder";

interface IntakeData {
  path: Path | null;
  // Stage 1 (steps 1-2)
  orgName: string;
  orgType: string;
  whoServed: string;
  mission: string;
  storyFocus: string;
  whyNow: string;
  stakes: string;
  // Checkpoint (step 3)
  contactName: string;
  contactRole: string;
  contactEmail: string;
  allowFollowup: boolean;
  // Stage 2 (steps 4-7)
  hasPerson: "yes" | "no" | "composite" | "";
  personBefore: string;
  personAfter: string;
  primaryAudience: string;
  useChannels: string[];
  existingAssets: string;
  voiceNotes: string;
}

const initialData: IntakeData = {
  path: null,
  orgName: "",
  orgType: "",
  whoServed: "",
  mission: "",
  storyFocus: "",
  whyNow: "",
  stakes: "",
  contactName: "",
  contactRole: "",
  contactEmail: "",
  allowFollowup: false,
  hasPerson: "",
  personBefore: "",
  personAfter: "",
  primaryAudience: "",
  useChannels: [],
  existingAssets: "",
  voiceNotes: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const pathCards: Array<{
  id: Path;
  icon: typeof Building2;
  label: string;
  title: string;
  desc: string;
}> = [
  {
    id: "nonprofit",
    icon: Building2,
    label: "Nonprofit / Community",
    title: "I run a nonprofit or community-serving org.",
    desc: "Tell stories to funders, donors, partners, or community.",
  },
  {
    id: "business",
    icon: Briefcase,
    label: "Business / Founder",
    title: "I run a business or B2B startup.",
    desc: "Tell stories to customers, prospects, investors, or partners.",
  },
  {
    id: "founder",
    icon: UserIcon,
    label: "Independent / Creator",
    title: "I'm an independent founder, creator, or coach.",
    desc: "Build authority around my own work.",
  },
];

function pathCopy(path: Path | null) {
  if (path === "business") {
    return {
      orgTypePlaceholder: "SaaS / fintech / agency / e-commerce / other",
      whoServedPlaceholder: "Your target customers in one sentence",
      missionPlaceholder: "What your business exists to do",
      storyPersonPrompt: "A customer whose work or results changed because of your product",
      audienceOptions: ["Prospect", "Customer", "Investor", "Partner", "Board"],
    };
  }
  if (path === "founder") {
    return {
      orgTypePlaceholder: "Coach / consultant / creator / speaker / advisor / other",
      whoServedPlaceholder: "Your audience or clients in one sentence",
      missionPlaceholder: "What you exist to teach or build",
      storyPersonPrompt: "You yourself, or a transformation moment in your work",
      audienceOptions: ["Audience", "Peers", "Clients", "Press", "Mentors"],
    };
  }
  return {
    orgTypePlaceholder: "Nonprofit / charity / community health / social service / other",
    whoServedPlaceholder: "Who your organization primarily serves in one sentence",
    missionPlaceholder: "Your mission in one sentence",
    storyPersonPrompt: "A beneficiary or program participant",
    audienceOptions: ["Funder", "Donor", "Community", "Partner", "Board"],
  };
}

// Steps that count toward progress bar (excludes path selector and checkpoint)
const FULL_PROGRESS_STEPS = 7; // About, Story, Checkpoint, Human, Audience, Assets, Voice
const STARTER_PROGRESS_STEPS = 3; // About, Story, Checkpoint

export default function StoryLoop() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IntakeData>(initialData);
  const [progressMode, setProgressMode] = useState<"unknown" | "starter" | "full">("unknown");
  const [submitting, setSubmitting] = useState<"idle" | "starter" | "full">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setSEO({
      title: "Story LOOP. Build your impact story in 5 minutes | Impact Loop",
      description:
        "A free strategic storytelling tool. Get the spine of your story in 5 minutes. Continue for a full multi-format content package.",
      path: "/loop",
    });
    return resetSEO;
  }, []);

  const copy = pathCopy(data.path);

  const update = <K extends keyof IntakeData>(key: K, value: IntakeData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleChannel = (channel: string) =>
    setData((d) => ({
      ...d,
      useChannels: d.useChannels.includes(channel)
        ? d.useChannels.filter((c) => c !== channel)
        : [...d.useChannels, channel],
    }));

  const submitToBackend = async (mode: "starter" | "full") => {
    setSubmitError(null);
    setSubmitting(mode);
    try {
      const { data: response, error } = await supabase.functions.invoke(
        "generate-story-loop",
        {
          body: {
            path: data.path,
            mode,
            orgName: data.orgName,
            orgType: data.orgType,
            whoServed: data.whoServed,
            mission: data.mission,
            storyFocus: data.storyFocus,
            whyNow: data.whyNow,
            stakes: data.stakes,
            contactName: data.contactName,
            contactRole: data.contactRole,
            contactEmail: data.contactEmail,
            allowFollowup: data.allowFollowup,
            hasPerson: mode === "full" ? data.hasPerson : undefined,
            personBefore: mode === "full" ? data.personBefore : undefined,
            personAfter: mode === "full" ? data.personAfter : undefined,
            primaryAudience: mode === "full" ? data.primaryAudience : undefined,
            useChannels: mode === "full" ? data.useChannels : undefined,
            existingAssets: mode === "full" ? data.existingAssets : undefined,
            voiceNotes: mode === "full" ? data.voiceNotes : undefined,
          },
        },
      );

      if (error) throw new Error(error.message || "Generation failed");
      const sessionId = (response as { sessionId?: string })?.sessionId;
      if (!sessionId) throw new Error("No session id returned");

      navigate(`/loop/result/${sessionId}?mode=${mode}`);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setSubmitError(message);
      setSubmitting("idle");
    }
  };

  const handleStarterSubmit = () => submitToBackend("starter");
  const handleFullSubmit = () => submitToBackend("full");

  const continueToFull = () => {
    setProgressMode("full");
    setStep(4); // jump past checkpoint into the advanced steps
  };

  const canAdvance = () => {
    if (step === 0) return data.path !== null;
    if (step === 1) return data.orgName.trim() && data.whoServed.trim();
    if (step === 2) return data.storyFocus.trim() && data.whyNow.trim();
    if (step === 3)
      return data.contactName.trim() && data.contactEmail.trim();
    if (step === 4) return data.hasPerson !== "";
    if (step === 5) return data.primaryAudience.trim() && data.useChannels.length > 0;
    if (step === 6) return true; // assets optional
    if (step === 7) return true; // voice optional
    return false;
  };

  // For progress bar
  const progressDenominator =
    progressMode === "starter" ? STARTER_PROGRESS_STEPS : FULL_PROGRESS_STEPS;
  const progressNumerator = Math.min(step, progressDenominator);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-background py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4"
          >
            Story LOOP. Free Tool
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4"
          >
            Build your impact story. Start in{" "}
            <span className="italic text-accent">5 minutes.</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg opacity-80 leading-relaxed"
          >
            Three short sections gets you the spine of your story for free. Continue for ten more minutes and walk away with a full multi-format content package: grant copy, donor email, four audience versions, headlines, visual brief, and a content calendar.
          </motion.p>
        </div>
      </section>

      {/* Progress bar */}
      {step > 0 && (
        <div className="bg-secondary border-b border-border">
          <div className="container max-w-3xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
              <span>
                {progressMode === "starter"
                  ? `Starter. Step ${progressNumerator} of ${progressDenominator}`
                  : `Full. Step ${progressNumerator} of ${progressDenominator}`}
              </span>
              <span className="font-medium">
                {Math.round((progressNumerator / progressDenominator) * 100)}% complete
              </span>
            </div>
            <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-deep transition-all duration-500"
                style={{ width: `${(progressNumerator / progressDenominator) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Processing overlay */}
      {submitting !== "idle" && (
        <div className="fixed inset-0 z-50 bg-foreground/95 text-background flex items-center justify-center">
          <div className="max-w-md mx-auto text-center px-6">
            <Loader2 className="animate-spin mx-auto mb-6 text-accent" size={40} />
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">
              Generating your {submitting === "starter" ? "Starter" : "Full"} LOOP
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight mb-4">
              About 90 seconds.
            </h2>
            <ul className="text-sm opacity-80 leading-relaxed space-y-2 text-left max-w-sm mx-auto">
              <li>Reading your inputs about the program...</li>
              <li>Structuring your story arc using LOOP...</li>
              <li>{submitting === "starter" ? "Drafting your 150-word version..." : "Drafting your four audience versions..."}</li>
              <li>{submitting === "starter" ? "Pulling five headlines..." : "Pulling quote starters and building your visual brief..."}</li>
              {submitting === "full" && <li>Laying out your content calendar and CTAs...</li>}
            </ul>
          </div>
        </div>
      )}

      {/* Submit error banner */}
      {submitError && (
        <div className="bg-red-50 border-y border-red-200 text-red-800 py-4 px-6">
          <div className="container max-w-3xl mx-auto text-sm">
            <strong>Something went wrong:</strong> {submitError}. Try again, or email rovonn@impactloop.ca if it keeps failing.
          </div>
        </div>
      )}

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6">
          {/* Step 0. Path selector */}
          {step === 0 && (
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-4">
                Step 1. Which best describes you?
              </p>
              <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight mb-10">
                Pick the path that fits. Everything after this is tailored to it.
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                {pathCards.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => update("path", p.id)}
                    className={`text-left bg-card border rounded-lg p-6 transition-all hover:border-accent-deep hover:shadow-md ${
                      data.path === p.id
                        ? "border-accent-deep ring-2 ring-accent-deep/30"
                        : "border-border"
                    }`}
                  >
                    <p.icon className="text-accent-deep mb-4" size={26} />
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-deep mb-2">
                      {p.label}
                    </p>
                    <h3 className="font-serif text-lg font-semibold mb-2 leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </button>
                ))}
              </div>

              <div className="mt-16 bg-secondary border border-border rounded-lg p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-deep mb-4">
                  Two ways to use this tool
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={16} className="text-accent-deep" />
                      <p className="font-semibold">Starter (~5 min)</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Three short sections. Walk away with your LOOP framework, a draft story, and five ready-to-use headlines. Free.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Layers size={16} className="text-accent-deep" />
                      <p className="font-semibold">Full package (~15 min total)</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Continue for the complete kit: three story lengths, four audience versions, quote starters, visual brief, content calendar, and CTAs. Free.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 1. About */}
          {step === 1 && (
            <StepCard
              eyebrow="Step 2 of 3 (Starter). About you"
              title="Tell us who you are."
            >
              <Field label="Organization or business name">
                <input
                  type="text"
                  value={data.orgName}
                  onChange={(e) => update("orgName", e.target.value)}
                  className="form-input"
                  placeholder="e.g., CAFCAN Social Services"
                />
              </Field>
              <Field label="Type of organization" optional>
                <input
                  type="text"
                  value={data.orgType}
                  onChange={(e) => update("orgType", e.target.value)}
                  className="form-input"
                  placeholder={copy.orgTypePlaceholder}
                />
              </Field>
              <Field label="Who you primarily serve">
                <input
                  type="text"
                  value={data.whoServed}
                  onChange={(e) => update("whoServed", e.target.value)}
                  className="form-input"
                  placeholder={copy.whoServedPlaceholder}
                />
              </Field>
              <Field label="Mission in one sentence" optional>
                <textarea
                  value={data.mission}
                  onChange={(e) => update("mission", e.target.value)}
                  className="form-input min-h-[80px]"
                  placeholder={copy.missionPlaceholder}
                />
              </Field>
            </StepCard>
          )}

          {/* Step 2. Story focus */}
          {step === 2 && (
            <StepCard
              eyebrow="Step 3 of 3 (Starter). The story"
              title="What specific story do you want to tell?"
            >
              <Field label="Program, initiative, campaign, or moment this is about">
                <textarea
                  value={data.storyFocus}
                  onChange={(e) => update("storyFocus", e.target.value)}
                  className="form-input min-h-[100px]"
                  placeholder="e.g., Our People's Keeper employment program, cohort 1 outcomes"
                />
              </Field>
              <Field label="Why are you telling it now?">
                <textarea
                  value={data.whyNow}
                  onChange={(e) => update("whyNow", e.target.value)}
                  className="form-input min-h-[80px]"
                  placeholder="e.g., Renewal cycle for CIBC funding, plus annual report due"
                />
              </Field>
              <Field label="What's at stake if you don't tell it well?" optional>
                <textarea
                  value={data.stakes}
                  onChange={(e) => update("stakes", e.target.value)}
                  className="form-input min-h-[80px]"
                  placeholder="e.g., Without funding renewal, cohort 2 doesn't happen"
                />
              </Field>
            </StepCard>
          )}

          {/* Step 3. CHECKPOINT */}
          {step === 3 && (
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
                Checkpoint
              </p>
              <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight mb-3">
                Two paths from here.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                We've got enough to generate the spine of your story right now. Or you can spend ten more minutes and walk away with the full content package. Either way, we'll email you the result.
              </p>

              {/* Contact fields */}
              <div className="bg-card border border-border rounded-lg p-6 mb-8">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent-deep mb-4">
                  Where should we send your result?
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Field label="Your name">
                    <input
                      type="text"
                      value={data.contactName}
                      onChange={(e) => update("contactName", e.target.value)}
                      className="form-input"
                      placeholder="First and last"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      value={data.contactEmail}
                      onChange={(e) => update("contactEmail", e.target.value)}
                      className="form-input"
                      placeholder="you@org.com"
                    />
                  </Field>
                </div>
                <Field label="Your role" optional>
                  <input
                    type="text"
                    value={data.contactRole}
                    onChange={(e) => update("contactRole", e.target.value)}
                    className="form-input"
                    placeholder="e.g., Executive Director, Communications Lead"
                  />
                </Field>
                <label className="flex items-start gap-3 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.allowFollowup}
                    onChange={(e) => update("allowFollowup", e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-muted-foreground">
                    OK to email me occasionally with related resources from Impact Loop.
                  </span>
                </label>
              </div>

              {/* Two choice cards */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Starter card */}
                <div className="bg-card border-2 border-border rounded-lg p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-accent-deep" size={18} />
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent-deep">
                      Starter LOOP
                    </p>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3 leading-tight">
                    Get your story spine now.
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                    The LOOP framework breakdown (Lens, Origin, Obstacle, Payoff) plus a 150-word draft of your story and 5 ready-to-use headlines.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "LOOP framework breakdown",
                      "150-word story draft",
                      "5 headlines and hooks",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-accent-deep shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleStarterSubmit}
                    disabled={!canAdvance()}
                    className="inline-flex items-center justify-center gap-2 w-full bg-foreground text-background px-5 py-3 rounded-md font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Get my starter LOOP <ArrowRight size={16} />
                  </button>
                  <p className="text-xs text-muted-foreground mt-3 text-center">~30 seconds</p>
                </div>

                {/* Full package card */}
                <div className="bg-accent-deep text-background border-2 border-accent-deep rounded-lg p-6 flex flex-col shadow-md">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="text-accent" size={18} />
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                      Full Package
                    </p>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3 leading-tight">
                    Continue for the complete kit.
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed mb-4 flex-grow">
                    Everything in the starter plus three story lengths, four audience versions, quote starters, visual brief, content calendar, and CTAs.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Three story lengths (500w, 150w, 50w)",
                      "Four audience versions",
                      "Quote starters + 10 headlines",
                      "Visual brief + content calendar",
                      "CTAs per audience",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={continueToFull}
                    disabled={!canAdvance()}
                    className="inline-flex items-center justify-center gap-2 w-full bg-accent text-foreground px-5 py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue building <ArrowRight size={16} />
                  </button>
                  <p className="text-xs opacity-70 mt-3 text-center">~10 more minutes</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4. Human at center */}
          {step === 4 && (
            <StepCard
              eyebrow="Step 4 of 7. The human at the center"
              title="Is there a specific person whose story carries this?"
              subtitle={`For your path, that's typically: ${copy.storyPersonPrompt}.`}
            >
              <div className="flex flex-wrap gap-3 mb-6">
                {(["yes", "no", "composite"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => update("hasPerson", opt)}
                    className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                      data.hasPerson === opt
                        ? "bg-accent-deep text-background border-accent-deep"
                        : "bg-card border-border hover:border-accent-deep"
                    }`}
                  >
                    {opt === "yes" && "Yes, a specific person"}
                    {opt === "no" && "No, but I can describe the kind of person"}
                    {opt === "composite" && "A composite from multiple stories"}
                  </button>
                ))}
              </div>
              <Field label="What were they facing before they connected with you?">
                <textarea
                  value={data.personBefore}
                  onChange={(e) => update("personBefore", e.target.value)}
                  className="form-input min-h-[100px]"
                  placeholder="Specifics. Real moments. What they couldn't access, do, or be."
                />
              </Field>
              <Field label="What's different now?">
                <textarea
                  value={data.personAfter}
                  onChange={(e) => update("personAfter", e.target.value)}
                  className="form-input min-h-[100px]"
                  placeholder="Specifics. The change, however measured: dignity, dollars, hours."
                />
              </Field>
            </StepCard>
          )}

          {/* Step 5. Audience */}
          {step === 5 && (
            <StepCard
              eyebrow="Step 5 of 7. Audience and use"
              title="Where will this story go first?"
            >
              <Field label="Primary audience">
                <div className="flex flex-wrap gap-3">
                  {copy.audienceOptions.map((aud) => (
                    <button
                      key={aud}
                      onClick={() => update("primaryAudience", aud)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                        data.primaryAudience === aud
                          ? "bg-accent-deep text-background border-accent-deep"
                          : "bg-card border-border hover:border-accent-deep"
                      }`}
                    >
                      {aud}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Where you'll use it (pick all that apply)">
                <div className="flex flex-wrap gap-2">
                  {[
                    "Grant proposal",
                    "Donor email",
                    "Newsletter",
                    "Social media",
                    "Website hero",
                    "Annual report",
                    "Pitch deck",
                    "Gala",
                    "Board meeting",
                  ].map((ch) => (
                    <button
                      key={ch}
                      onClick={() => toggleChannel(ch)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        data.useChannels.includes(ch)
                          ? "bg-accent-deep text-background border-accent-deep"
                          : "bg-card border-border hover:border-accent-deep"
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </Field>
            </StepCard>
          )}

          {/* Step 6. Existing assets */}
          {step === 6 && (
            <StepCard
              eyebrow="Step 6 of 7. What you already have"
              title="Existing assets you can draw from"
              subtitle="Testimonials, photos, video clips, written quotes. Even a rough list is enough."
            >
              <Field label="Describe what you have" optional>
                <textarea
                  value={data.existingAssets}
                  onChange={(e) => update("existingAssets", e.target.value)}
                  className="form-input min-h-[140px]"
                  placeholder="e.g., 2-min interview clip with the participant, 3 photos from the program, a written reflection she sent us in an email."
                />
              </Field>
            </StepCard>
          )}

          {/* Step 7. Voice notes */}
          {step === 7 && (
            <StepCard
              eyebrow="Step 7 of 7. Voice notes"
              title="Anything specific about how your organization speaks?"
              subtitle="Optional. Skip if you don't have strong preferences."
            >
              <Field label="Voice and tone notes" optional>
                <textarea
                  value={data.voiceNotes}
                  onChange={(e) => update("voiceNotes", e.target.value)}
                  className="form-input min-h-[120px]"
                  placeholder={`e.g., "We always center the participant's own words. We avoid savior framing. Our funders are clinical, our donors are emotional."`}
                />
              </Field>
            </StepCard>
          )}

          {/* Navigation */}
          {step !== 3 && (
            <div className="mt-10 flex items-center justify-between">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent-deep transition-colors"
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <span />
              )}

              {step < 7 ? (
                <button
                  onClick={() => {
                    if (step === 0 && progressMode === "unknown") {
                      setProgressMode("starter");
                    }
                    setStep((s) => s + 1);
                  }}
                  disabled={!canAdvance()}
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleFullSubmit}
                  disabled={!canAdvance()}
                  className="inline-flex items-center gap-2 bg-accent-deep text-background px-6 py-3 rounded-md font-semibold hover:bg-accent-deep/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Build my full story package <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Form input styles */}
      <style>{`
        .form-input {
          width: 100%;
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          line-height: 1.5;
          color: hsl(var(--foreground));
          transition: border-color 0.2s;
        }
        .form-input:focus {
          outline: none;
          border-color: hsl(var(--accent-deep));
          box-shadow: 0 0 0 3px hsl(var(--accent-deep) / 0.15);
        }
      `}</style>
    </Layout>
  );
}

function StepCard({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
      <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
        {eyebrow}
      </p>
      <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="space-y-6">{children}</div>
    </motion.div>
  );
}

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">
        {label}
        {optional && (
          <span className="ml-2 text-xs font-normal text-muted-foreground">(optional)</span>
        )}
      </label>
      {children}
    </div>
  );
}
