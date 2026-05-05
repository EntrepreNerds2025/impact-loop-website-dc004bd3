import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Download, CheckCircle2, BookOpen, Search, Layers, ListChecks, Repeat2, Eye, FileText } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { setSEO, resetSEO } from "@/lib/seo";

const PDF_URL = "/resources/nonprofit-ai-adoption-workbook.pdf";

const orgTypes = [
  "Nonprofit",
  "Foundation",
  "CSR / Corporate Team",
  "Community Organization",
  "Public Sector",
  "Other",
];

const inside = [
  { icon: BookOpen, title: "How to use this workbook", desc: "A working tool, not a strategy doc. 30 days, 4 weeks, one cycle." },
  { icon: Eye, title: "Week 1 — Assess", desc: "The three jobs of nonprofit communication. The honest sort that decides where AI is allowed." },
  { icon: Search, title: "Week 2 — Discover", desc: "Five places AI consistently fits. Five places it doesn't. The Discover criteria for picking your one workflow." },
  { icon: Layers, title: "Week 3 — Apply", desc: "The smallest version that could work. Three build patterns. What to log." },
  { icon: ListChecks, title: "Week 4 — Produce + Transform", desc: "The three measurements. The Trust Test. The runbook hand-off." },
  { icon: Repeat2, title: "Three-cycle progression", desc: "What most teams build first, second, third. When you stop needing facilitation." },
  { icon: FileText, title: "Appendix templates", desc: "Sample prompts, tone-of-voice gate checklist, one-page maintenance plan template." },
];

const HeroSection = () => (
  <section className="relative bg-gradient-to-br from-[#2e44d6] via-[#4838d8] to-[#6e3acb] py-24 px-6 md:py-32 md:px-12 text-white overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[#f7d76a] mb-6">
        A Free Workbook from Impact Loop
      </p>
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] mb-8">
        Nonprofit AI Adoption{" "}
        <span className="italic text-[#f7d76a]">Workbook.</span>
      </h1>
      <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-white/90 max-w-3xl">
        A 30-day, self-directed guide to running one ADAPT cycle on your team's real work, without losing the mission.
      </p>
    </motion.div>
  </section>
);

const InsideSection = () => (
  <section className="bg-[#fafbfd] py-16 md:py-24 px-6 md:px-12">
    <div className="max-w-5xl mx-auto">
      <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#6e3acb] mb-4">
        What's Inside
      </p>
      <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1f2233] leading-tight mb-12">
        Seven sections.{" "}
        <span className="italic">22 pages.</span>{" "}
        Built to live next to your team's real work.
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {inside.map((item) => (
          <div key={item.title} className="flex items-start gap-4 bg-white border border-[#e6e8ef] rounded-md p-5">
            <div className="w-10 h-10 mt-0.5 rounded-md bg-[#6e3acb]/10 flex items-center justify-center shrink-0">
              <item.icon size={18} className="text-[#6e3acb]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold leading-snug text-[#1f2233] mb-1">{item.title}</h3>
              <p className="text-sm text-[#6b6f7a] leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FormSection = ({ onSubmitted, submitted }: { onSubmitted: () => void; submitted: boolean }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    org_type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const started = useRef(false);

  const handleStarted = () => {
    if (!started.current) {
      started.current = true;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    handleStarted();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.org_type) {
      toast.error("Please fill in name, email, and organization type.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    try {
      await supabase.functions.invoke("send-contact-notification", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim() || form.org_type,
          service_interest: "Nonprofit AI Workbook",
          message: `Org type: ${form.org_type}. Downloaded the Nonprofit AI Adoption Workbook.`,
        },
      });
      onSubmitted();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-[#1f2233] text-white py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#f7d76a]/20 flex items-center justify-center">
            <CheckCircle2 size={28} className="text-[#f7d76a]" />
          </div>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#f7d76a] mb-5">
            You're In
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-6">
            Your workbook is{" "}
            <span className="italic text-[#f7d76a]">ready.</span>
          </h2>
          <p className="opacity-80 leading-relaxed mb-10 text-base md:text-lg">
            Download the 22-page PDF below. Run one phase per week. The first cycle is the hardest, every cycle after that gets easier.
          </p>
          <a
            href={PDF_URL}
            download="Nonprofit-AI-Adoption-Workbook-Impact-Loop.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#f7d76a] text-[#1f2233] px-8 py-4 font-semibold tracking-[0.16em] uppercase text-sm rounded-md hover:bg-[#f5cc4d] transition-colors"
          >
            <Download size={16} /> Download the Workbook
          </a>
          <p className="text-xs opacity-50 mt-8">
            Want experienced facilitation instead? Book a free discovery call for ADAPT AI Training:{" "}
            <a href="/bookings?type=adapt-advisory" className="underline hover:text-[#f7d76a]">impactloop.ca/bookings</a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#1f2233] text-white py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#f7d76a] mb-5 text-center">
          Get The Workbook
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-6 text-center">
          Run one ADAPT cycle on your{" "}
          <span className="italic text-[#f7d76a]">team's real work.</span>
        </h2>
        <p className="opacity-70 leading-relaxed mb-10 text-center text-base">
          Free. No spam. Unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider opacity-70 block mb-2">
              First Name *
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full bg-white/5 border border-white/15 text-white rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f7d76a]/40 focus:border-[#f7d76a] placeholder:text-white/40"
              autoComplete="given-name"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider opacity-70 block mb-2">
              Email *
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@yourorg.org"
              className="w-full bg-white/5 border border-white/15 text-white rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f7d76a]/40 focus:border-[#f7d76a] placeholder:text-white/40"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider opacity-70 block mb-2">
              Organization
            </label>
            <input
              name="organization"
              type="text"
              value={form.organization}
              onChange={handleChange}
              placeholder="Your org name (optional)"
              className="w-full bg-white/5 border border-white/15 text-white rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f7d76a]/40 focus:border-[#f7d76a] placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider opacity-70 block mb-2">
              Organization type *
            </label>
            <select
              name="org_type"
              value={form.org_type}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/15 text-white rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f7d76a]/40 focus:border-[#f7d76a] appearance-none cursor-pointer"
              required
            >
              <option value="" className="bg-[#1f2233] text-white">Choose one</option>
              {orgTypes.map((opt) => (
                <option key={opt} value={opt} className="bg-[#1f2233] text-white">{opt}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#f7d76a] text-[#1f2233] px-8 py-4 font-semibold tracking-[0.16em] uppercase text-sm rounded-md hover:bg-[#f5cc4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Get the Workbook"}
            {!isSubmitting && <Download size={16} />}
          </button>
        </form>
      </div>
    </section>
  );
};

const TrustNoteSection = () => (
  <section className="bg-white py-16 md:py-24 px-6 md:px-12">
    <div className="max-w-3xl mx-auto text-center">
      <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#6e3acb] mb-6">
        Who This Is For
      </p>
      <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#1f2233] leading-tight mb-6">
        Nonprofit teams, foundation officers, and CSR leaders staring at a board motion that says{" "}
        <span className="italic">"use AI."</span>
      </h2>
      <p className="text-base md:text-lg text-[#6b6f7a] leading-relaxed">
        The pressure to adopt AI is real. The board motion isn't going away. But the response that actually serves your work is not to buy the most-marketed tool and roll it out across the org. The response is to slow down for two weeks, run the Assess and Discover phases honestly, and then build one small thing that does one specific job for one specific team member. That's what this workbook walks you through.
      </p>
    </div>
  </section>
);

const NonprofitAIWorkbook = () => {
  useEffect(() => {
    setSEO({
      title: "Nonprofit AI Adoption Workbook | Impact Loop",
      description:
        "A free 22-page workbook for nonprofit teams running one ADAPT cycle in 30 days. Diagnostic questions, the Trust Test, sample workflows, anti-patterns, and a runbook hand-off template.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <main>
        <HeroSection />
        <InsideSection />
        <FormSection submitted={submitted} onSubmitted={() => setSubmitted(true)} />
        {!submitted && <TrustNoteSection />}
      </main>
    </Layout>
  );
};

export default NonprofitAIWorkbook;
