import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Download,
  FileText,
  HeartHandshake,
  Mail,
  MessageSquareText,
  PenLine,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import boardroomFundersPhoto from "@/assets/signature/boardroom-funders.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
};

const painPoints = [
  {
    icon: Clock,
    title: "Too much work, not enough time",
    desc: "Reports, emails, updates, proposals, and follow-ups keep piling up while the team is already stretched.",
  },
  {
    icon: MessageSquareText,
    title: "Your impact is hard to explain",
    desc: "The work is meaningful, but the story is scattered across notes, meetings, photos, spreadsheets, and memory.",
  },
  {
    icon: ShieldCheck,
    title: "AI feels overwhelming",
    desc: "Your team knows AI matters, but needs clear rules, practical workflows, and confidence using it safely.",
  },
  {
    icon: PenLine,
    title: "Content is inconsistent",
    desc: "Updates, social posts, newsletters, and stakeholder messages depend on whoever has time that week.",
  },
];

const frameworkSteps = [
  {
    letter: "A",
    title: "Assess",
    desc: "Map where your team spends time, where communication gets stuck, and which workflows are ready for AI support.",
  },
  {
    letter: "D",
    title: "Discover",
    desc: "Explore the AI tools and prompts that fit your work, audience, safety needs, and team capacity.",
  },
  {
    letter: "A",
    title: "Apply",
    desc: "Practice using AI inside real tasks like donor updates, report summaries, stakeholder emails, and planning docs.",
  },
  {
    letter: "P",
    title: "Produce",
    desc: "Turn raw materials from programs, meetings, events, and reports into useful content your team can refine and share.",
  },
  {
    letter: "T",
    title: "Transform",
    desc: "Build repeatable systems so AI becomes a thoughtful assistant for communication, not a random tool on the side.",
  },
];

const questions = [
  "Our team understands how AI can help our work.",
  "We currently use AI in daily or weekly tasks.",
  "We have clear rules or guidelines for AI use.",
  "We regularly turn our work into content or updates.",
  "Our team spends too much time on repetitive writing.",
  "Our impact stories are easy to find, organize, and share.",
  "We have systems for donor, client, or stakeholder communication.",
  "Our team feels confident using AI tools safely.",
  "We have workflows for repurposing events, reports, or meetings into content.",
  "We know which tasks AI should and should not handle.",
];

const trainingTimeline = [
  {
    time: "Morning",
    title: "Assess + Align",
    desc: "Clarify where AI can save time, where it needs guardrails, and which communication workflows matter most.",
    outputs: ["AI readiness map", "Workflow priorities", "Team guardrail draft"],
  },
  {
    time: "Midday",
    title: "Discover + Apply",
    desc: "Explore practical tools and prompt patterns, then apply them to real materials from your organization.",
    outputs: ["Reusable prompt bank", "Stakeholder emails", "Donor updates"],
  },
  {
    time: "Afternoon",
    title: "Produce",
    desc: "Turn reports, meetings, events, and program notes into content your team can edit, approve, and publish.",
    outputs: ["Reports", "Social posts", "Content calendars"],
  },
  {
    time: "Final Session",
    title: "Transform",
    desc: "Package the strongest workflows into templates and operating habits the team can keep using after training.",
    outputs: ["Internal templates", "Repurposing system", "Next-step action plan"],
  },
];

const useCases = {
  nonprofits: [
    "Turn program notes into donor updates and board-ready summaries.",
    "Repurpose events, interviews, and reports into newsletter and social content.",
    "Create consistent stakeholder communication without overloading one staff member.",
    "Organize impact stories so they are easier to find, approve, and share.",
  ],
  corporate: [
    "Translate ESG activity into clear internal updates, reports, and campaign content.",
    "Support employee engagement teams with repeatable communication workflows.",
    "Summarize meetings, initiatives, and partner activity into useful briefs.",
    "Create safer AI guidelines for teams working with sensitive stakeholder context.",
  ],
  owners: [
    "Build content systems from client work, meetings, offers, and testimonials.",
    "Draft stronger emails, proposals, service pages, and follow-up sequences.",
    "Save time on repetitive writing while keeping your voice intact.",
    "Create simple operating templates for marketing, sales, and client delivery.",
  ],
};

const orgTypes = ["Nonprofit", "Company", "Corporate / ESG Team", "Business Owner", "Foundation", "Government / Public Sector", "Other"];

type LeadInfo = {
  name: string;
  email: string;
  organization: string;
  role: string;
  organizationType: string;
};

const emptyLead: LeadInfo = {
  name: "",
  email: "",
  organization: "",
  role: "",
  organizationType: "",
};

function getTier(score: number) {
  if (score <= 25) {
    return {
      label: "Behind but ready",
      desc: "Start with the basics: shared language, simple rules, and a few high-value writing workflows your team can practice right away.",
    };
  }
  if (score <= 50) {
    return {
      label: "Exploring",
      desc: "You have momentum. The next step is turning experimentation into safer habits, stronger prompts, and repeatable team workflows.",
    };
  }
  if (score <= 75) {
    return {
      label: "Building",
      desc: "Your team is ready to systemize. Focus on templates, approval paths, content repurposing, and communication standards.",
    };
  }
  return {
    label: "Advanced",
    desc: "You are positioned to scale. The next move is refining governance, training champions, and building durable AI-assisted systems.",
  };
}

const AdaptAITraining = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>(emptyLead);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(3));
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setSEO({
      title: "ADAPT: AI Training for Impact-Driven Teams | Impact Loop",
      description:
        "ADAPT is Impact Loop's AI training framework for nonprofits, companies, and mission-driven teams who want to save time, communicate better, and turn their work into clear stories, content, and action.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  const leadComplete = Object.values(leadInfo).every((value) => value.trim().length > 0);

  const score = useMemo(() => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    return Math.round(((total - questions.length) / (questions.length * 4)) * 100);
  }, [answers]);

  const tier = getTier(score);
  const quizProgress = completed ? 100 : quizStep === 0 ? 34 : quizStep === 1 ? 68 : 92;

  const updateLead = (key: keyof LeadInfo, value: string) => {
    setLeadInfo((prev) => ({ ...prev, [key]: value }));
  };

  const downloadSummary = () => {
    const lines = [
      "ADAPT Readiness Summary",
      "",
      `Name: ${leadInfo.name}`,
      `Email: ${leadInfo.email}`,
      `Organization: ${leadInfo.organization}`,
      `Role: ${leadInfo.role}`,
      `Organization Type: ${leadInfo.organizationType}`,
      "",
      `Score: ${score}%`,
      `Tier: ${tier.label}`,
      `Recommendation: ${tier.desc}`,
      "",
      "Readiness Answers",
      ...questions.map((question, index) => `${index + 1}. ${question} - ${answers[index]}/5`),
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "adapt-readiness-summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderQuestionGroup = (start: number, end: number) => (
    <div className="space-y-5">
      {questions.slice(start, end).map((question, index) => {
        const questionIndex = start + index;
        return (
          <div key={question} className="rounded-lg border border-[#eadfce] bg-white/85 p-4 shadow-sm">
            <p className="text-sm font-semibold text-[#2a231c]">{questionIndex + 1}. {question}</p>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    const next = [...answers];
                    next[questionIndex] = value;
                    setAnswers(next);
                  }}
                  className={`h-10 rounded-md border text-sm font-semibold transition-all ${
                    answers[questionIndex] === value
                      ? "border-[#5b3f2a] bg-[#5b3f2a] text-white shadow-sm"
                      : "border-[#eadfce] bg-[#fffaf3] text-[#6e5d4b] hover:border-[#c9955c]"
                  }`}
                  aria-label={`${question} score ${value}`}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[11px] uppercase text-[#9b8771]">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Layout>
      <main className="bg-[#fffaf3] text-[#241f1a]">
        <section className="relative min-h-[92vh] overflow-hidden bg-[#1f1a16] text-white">
          <img
            src={boardroomFundersPhoto}
            alt="A mission-driven team presenting impact work in a boardroom"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1b1510]/95 via-[#3b271d]/80 to-[#8f5f38]/45" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fffaf3] to-transparent" />

          <div className="container relative z-10 mx-auto flex min-h-[92vh] flex-col justify-center px-6 pb-20 pt-32">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-4xl">
              <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase text-white/85 backdrop-blur-md">
                ADAPT: AI Training for Impact-Driven Teams
              </p>
              <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
                Help your team use AI without losing the human side of your work.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg">
                ADAPT is Impact Loop's AI training framework for nonprofits, companies, and mission-driven teams who want to save time, communicate better, and turn their work into clear stories, content, and action.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#adapt-score" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#f4b15f] px-6 py-3 text-sm font-bold uppercase text-[#201913] transition hover:bg-[#ffd08a]">
                  Get Your ADAPT Score
                  <ArrowRight size={16} />
                </a>
                <a href="#training-day" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-[#201913]">
                  Explore the Training Day
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {["Save time", "Communicate clearly", "Build systems"].map((item) => (
                <div key={item} className="rounded-lg border border-white/18 bg-white/10 p-4 backdrop-blur-md">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-[#f4b15f]" />
                  <p className="text-sm font-semibold text-white">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase text-[#a86f39]">Capacity before tools</p>
              <h2 className="font-serif text-3xl font-bold leading-tight text-[#241f1a] md:text-5xl">
                Your team does not need more tools. It needs more capacity.
              </h2>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {painPoints.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="rounded-lg border border-[#eadfce] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#f3e4d0] text-[#7c4c26]">
                    <item.icon size={22} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#241f1a]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6e5d4b]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#241f1a] py-20 text-white md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase text-[#f4b15f]">The ADAPT Framework</p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">A practical loop for real teams doing real work.</h2>
            </div>

            <div className="relative mx-auto hidden min-h-[520px] max-w-5xl md:block">
              <div className="absolute inset-10 rounded-full border border-[#f4b15f]/25" />
              <div className="absolute left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/8 p-8 text-center shadow-2xl backdrop-blur-md">
                <p className="font-serif text-3xl font-bold leading-tight">More Capacity. Better Communication. Greater Impact.</p>
              </div>

              {frameworkSteps.map((step, index) => {
                const positions = [
                  "left-1/2 top-0 -translate-x-1/2",
                  "right-0 top-32",
                  "right-20 bottom-0",
                  "left-20 bottom-0",
                  "left-0 top-32",
                ];
                return (
                  <button
                    key={`${step.letter}-${step.title}`}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={`absolute w-56 rounded-lg border p-5 text-left transition-all ${positions[index]} ${
                      activeStep === index
                        ? "border-[#f4b15f] bg-[#f4b15f] text-[#241f1a] shadow-xl"
                        : "border-white/12 bg-white/8 text-white hover:border-[#f4b15f]/60"
                    }`}
                  >
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#241f1a] font-serif text-xl font-bold text-[#f4b15f]">
                      {step.letter}
                    </span>
                    <span className="block font-serif text-2xl font-bold">{step.title}</span>
                    <span className={`mt-2 block text-sm leading-relaxed ${activeStep === index ? "text-[#463626]" : "text-white/65"}`}>
                      {activeStep === index ? step.desc : "Tap to expand this step."}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 md:hidden">
              <div className="rounded-lg border border-white/10 bg-white/8 p-6 text-center">
                <p className="font-serif text-2xl font-bold">More Capacity. Better Communication. Greater Impact.</p>
              </div>
              {frameworkSteps.map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`rounded-lg border p-5 text-left transition ${activeStep === index ? "border-[#f4b15f] bg-[#f4b15f] text-[#241f1a]" : "border-white/12 bg-white/8 text-white"}`}
                >
                  <span className="text-xs font-bold uppercase">Step {index + 1}</span>
                  <span className="mt-2 block font-serif text-2xl font-bold">{step.letter}: {step.title}</span>
                  {activeStep === index && <span className="mt-2 block text-sm leading-relaxed text-[#463626]">{step.desc}</span>}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="adapt-score" className="bg-gradient-to-b from-[#fffaf3] to-[#f2e4d2] py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:sticky lg:top-28">
                <p className="mb-3 text-xs font-bold uppercase text-[#a86f39]">Lead magnet</p>
                <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">Get your ADAPT Readiness Score.</h2>
                <p className="mt-5 text-base leading-relaxed text-[#6e5d4b]">
                  Answer ten practical questions and see where your team sits today: behind but ready, exploring, building, or advanced.
                </p>
                <div className="mt-8 rounded-lg border border-[#eadfce] bg-white/75 p-5">
                  <p className="text-sm font-semibold text-[#241f1a]">Your score is based on:</p>
                  <div className="mt-4 grid gap-3 text-sm text-[#6e5d4b]">
                    {["AI confidence", "Content systems", "Communication workflows", "Safety and guidelines"].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-[#a86f39]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-lg border border-[#e2d1bb] bg-white p-5 shadow-xl md:p-8">
                <div className="mb-7">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase text-[#9b8771]">
                    <span>{completed ? "Complete" : `Step ${quizStep + 1} of 3`}</span>
                    <span>{quizProgress}%</span>
                  </div>
                  <Progress value={quizProgress} className="h-2 bg-[#f0e3d1] [&>div]:bg-[#a86f39]" />
                </div>

                {!completed && quizStep === 0 && (
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-[#241f1a]">First, tell us who this score is for.</h3>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <input className="rounded-md border border-[#eadfce] bg-[#fffaf3] px-4 py-3 text-sm outline-none focus:border-[#a86f39]" placeholder="Name" value={leadInfo.name} onChange={(e) => updateLead("name", e.target.value)} />
                      <input className="rounded-md border border-[#eadfce] bg-[#fffaf3] px-4 py-3 text-sm outline-none focus:border-[#a86f39]" placeholder="Email" type="email" value={leadInfo.email} onChange={(e) => updateLead("email", e.target.value)} />
                      <input className="rounded-md border border-[#eadfce] bg-[#fffaf3] px-4 py-3 text-sm outline-none focus:border-[#a86f39]" placeholder="Organization" value={leadInfo.organization} onChange={(e) => updateLead("organization", e.target.value)} />
                      <input className="rounded-md border border-[#eadfce] bg-[#fffaf3] px-4 py-3 text-sm outline-none focus:border-[#a86f39]" placeholder="Role" value={leadInfo.role} onChange={(e) => updateLead("role", e.target.value)} />
                      <select className="rounded-md border border-[#eadfce] bg-[#fffaf3] px-4 py-3 text-sm outline-none focus:border-[#a86f39] md:col-span-2" value={leadInfo.organizationType} onChange={(e) => updateLead("organizationType", e.target.value)}>
                        <option value="">Organization Type</option>
                        {orgTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <button type="button" disabled={!leadComplete} onClick={() => setQuizStep(1)} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#241f1a] px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-[#3a3028] disabled:cursor-not-allowed disabled:opacity-40 md:w-auto">
                      Start Readiness Questions
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {!completed && quizStep === 1 && (
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-[#241f1a]">AI clarity and communication habits</h3>
                    <div className="mt-6">{renderQuestionGroup(0, 5)}</div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                      <button type="button" onClick={() => setQuizStep(0)} className="rounded-md border border-[#cdb99f] px-5 py-3 text-sm font-bold uppercase text-[#5b3f2a]">Back</button>
                      <button type="button" onClick={() => setQuizStep(2)} className="rounded-md bg-[#241f1a] px-5 py-3 text-sm font-bold uppercase text-white">Continue</button>
                    </div>
                  </div>
                )}

                {!completed && quizStep === 2 && (
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-[#241f1a]">Systems, safety, and content reuse</h3>
                    <div className="mt-6">{renderQuestionGroup(5, 10)}</div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                      <button type="button" onClick={() => setQuizStep(1)} className="rounded-md border border-[#cdb99f] px-5 py-3 text-sm font-bold uppercase text-[#5b3f2a]">Back</button>
                      <button type="button" onClick={() => setCompleted(true)} className="rounded-md bg-[#a86f39] px-5 py-3 text-sm font-bold uppercase text-white">Calculate My Score</button>
                    </div>
                  </div>
                )}

                {completed && (
                  <div className="text-center">
                    <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-[#f0dfc8] bg-[#fffaf3]">
                      <div>
                        <p className="font-serif text-5xl font-bold text-[#a86f39]">{score}%</p>
                        <p className="text-xs font-bold uppercase text-[#8b7865]">Score</p>
                      </div>
                    </div>
                    <h3 className="mt-6 font-serif text-3xl font-bold text-[#241f1a]">{tier.label}</h3>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6e5d4b]">{tier.desc}</p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                      <Link to="/bookings" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#241f1a] px-5 py-3 text-sm font-bold uppercase text-white transition hover:bg-[#3a3028]">
                        <PhoneCall size={16} />
                        Book an ADAPT Strategy Call
                      </Link>
                      <button type="button" onClick={downloadSummary} className="inline-flex items-center justify-center gap-2 rounded-md border border-[#cdb99f] px-5 py-3 text-sm font-bold uppercase text-[#5b3f2a] transition hover:bg-[#fffaf3]">
                        <Download size={16} />
                        Download Your ADAPT Summary
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="training-day" className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase text-[#a86f39]">Training Day Breakdown</p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">One day that turns uncertainty into usable workflows.</h2>
            </div>
            <div className="mx-auto max-w-5xl">
              {trainingTimeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="grid gap-5 border-t border-[#eadfce] py-8 md:grid-cols-[180px_1fr]"
                >
                  <div>
                    <p className="text-xs font-bold uppercase text-[#a86f39]">{item.time}</p>
                    <p className="mt-2 font-serif text-2xl font-bold text-[#241f1a]">{item.title}</p>
                  </div>
                  <div>
                    <p className="leading-relaxed text-[#6e5d4b]">{item.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.outputs.map((output) => (
                        <span key={output} className="rounded-full bg-[#f3e4d0] px-3 py-1 text-xs font-semibold text-[#6e4527]">{output}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7efe5] py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase text-[#a86f39]">Use cases</p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">Built for different teams with the same pressure: more work, less time.</h2>
            </div>

            <Tabs defaultValue="nonprofits" className="mx-auto max-w-5xl">
              <TabsList className="flex h-auto w-full flex-col gap-2 rounded-lg bg-white/70 p-2 sm:flex-row">
                <TabsTrigger value="nonprofits" className="w-full rounded-md py-3">Nonprofits</TabsTrigger>
                <TabsTrigger value="corporate" className="w-full rounded-md py-3">Corporate / ESG Teams</TabsTrigger>
                <TabsTrigger value="owners" className="w-full rounded-md py-3">Business Owners</TabsTrigger>
              </TabsList>
              {[
                { value: "nonprofits", icon: HeartHandshake, items: useCases.nonprofits },
                { value: "corporate", icon: BarChart3, items: useCases.corporate },
                { value: "owners", icon: Users, items: useCases.owners },
              ].map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {tab.items.map((item) => (
                      <div key={item} className="flex gap-4 rounded-lg border border-[#eadfce] bg-white p-5 shadow-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3e4d0] text-[#7c4c26]">
                          <tab.icon size={20} />
                        </div>
                        <p className="text-sm leading-relaxed text-[#5f5144]">{item}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#241f1a] py-20 text-white md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,177,95,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent)]" />
          <div className="container relative z-10 mx-auto grid items-center gap-10 px-6 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase text-[#f4b15f]">Human-centered AI</p>
              <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
                AI should not replace your voice. It should help your team express it more clearly.
              </h2>
              <p className="mt-6 max-w-2xl leading-relaxed text-white/70">
                ADAPT helps teams capture, organize, and communicate their work with clarity and consistency. The goal is not to automate the soul out of your message. The goal is to give your people more room to think, decide, connect, and tell the truth of the work with care.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                { icon: ClipboardCheck, title: "Capture what matters" },
                { icon: FileText, title: "Organize stories and updates" },
                { icon: Mail, title: "Communicate with consistency" },
                { icon: CalendarDays, title: "Build repeatable rhythms" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur">
                  <item.icon className="h-5 w-5 text-[#f4b15f]" />
                  <p className="font-semibold text-white">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf3] py-20 md:py-28">
          <div className="container mx-auto px-6 text-center">
            <div className="mx-auto max-w-3xl">
              <Sparkles className="mx-auto mb-6 h-8 w-8 text-[#a86f39]" />
              <h2 className="font-serif text-4xl font-bold leading-tight md:text-6xl">Ready to help your team ADAPT?</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[#6e5d4b]">
                Start with the score, then turn the result into a practical training plan for your team.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#adapt-score" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#a86f39] px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-[#8f5f31]">
                  Get Your ADAPT Score
                  <ArrowRight size={16} />
                </a>
                <Link to="/bookings" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#241f1a] px-6 py-3 text-sm font-bold uppercase text-[#241f1a] transition hover:bg-[#241f1a] hover:text-white">
                  Book a Training Call
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AdaptAITraining;
