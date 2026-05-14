/**
 * StoryLoopResult — /loop/result/[id]
 *
 * Renders a generated Story LOOP package. Phase 1 ships with a hardcoded sample
 * (CAFCAN Our People's Keeper) so the page is demoable before the backend wires
 * up. Phase 2 will fetch real data from Supabase by session ID.
 *
 * The data shape below is the contract the edge function will return.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Copy,
  CheckCircle2,
  Mail,
  Calendar,
  Camera,
  Quote,
  Sparkles,
  Layers,
  Lock,
  Printer,
  Share2,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";

interface LoopResult {
  orgName: string;
  programName: string;
  generatedAt: string;
  path: "nonprofit" | "business" | "founder";
  loop: {
    lens: string;
    origin: string;
    obstacle: string;
    payoff: string;
  };
  story: {
    long500: string;
    medium150: string;
    short50: string;
  };
  audienceVersions: Record<string, { label: string; body: string }>;
  quoteStarters: string[];
  headlines: string[];
  visualBrief: Array<{ shotType: string; description: string; purpose: string }>;
  calendar: Array<{
    week: number;
    channel: string;
    format: string;
    leadWith: string;
    cta: string;
  }>;
  ctas: Record<string, string>;
}

// Hardcoded CAFCAN sample (Path A demo)
const sampleResult: LoopResult = {
  orgName: "CAFCAN Social Services",
  programName: "Our People's Keeper",
  generatedAt: "2026-05-11",
  path: "nonprofit",
  loop: {
    lens: "The voice that carries this is Adaeze's, not CAFCAN's. CAFCAN holds the program. Adaeze tells what happened in it. Every funder and donor who reads the story needs to hear the moment in her words before they hear about cohort design or partnership architecture. The vendor isn't the hero. The participant is. CAFCAN is the room that made it possible.",
    origin:
      "This started in 2024 when CAFCAN secured improved CIBC funding for Our People's Keeper, not as a generic employment program but as a culturally responsive one, built for community members whose credentials kept getting filtered out by Canadian recruitment systems. Cohort 1 launched that fall. Ten sessions. A first-of-its-kind partnership with Homes First, Christie Refugee Welcome Centre, Up With Women, and Impakt Foundation. The premise: don't just teach resume formatting. Teach the system, name the racism, and stand alongside community while they navigate it.",
    obstacle:
      "The friction that earns the audience's attention isn't unemployment. It's the gap between being qualified and being legible to Canadian employers. That gap disproportionately affects Black newcomers with professional credentials from elsewhere. For Adaeze: 18 months of overqualified work and underemployment that no spreadsheet captured. For CIBC: needing to see, not just read, why a culturally responsive program produces outcomes that generic employment services don't. The stakes for cohort 2: without funding renewal, the next twelve months of community members like Adaeze stay stuck.",
    payoff:
      "Six weeks into the program, Adaeze accepted a contract role at a community bank using the financial-services experience she brought from Lagos. She took a photo of her first Canadian business cards and sent it to her daughter at school. Across cohort 1, multiple participants moved from precarious shift work into roles aligned to their training. CIBC's investment didn't produce a generic employment outcome. It produced a return of dignity, professional identity, and economic mobility for Caribbean African Canadian community members who had been doing everything the system asked and getting nothing back.",
  },
  story: {
    long500:
      "Adaeze arrived in Toronto from Lagos with two children and a decade of client services experience at a Nigerian financial firm. For eighteen months after landing, she stitched together three precarious shifts at a grocery store and a warehouse, sending money home each pay cycle and not telling her parents how thin the margin had become. She had been applying for roles that matched her credentials. None of them called back.\n\nThis is the gap Our People's Keeper exists to close. CAFCAN's employment-readiness program, launched in cohort 1 in 2024 with renewed CIBC support, is built specifically for community members whose international credentials and professional experience keep getting filtered out by Canadian recruitment systems. The program runs in partnership with Homes First Shelter, Christie Refugee Welcome Centre, Up With Women, and Impakt Foundation for Social Change. A network designed so participants aren't sent from one waiting list to another but accompanied through a single culturally responsive process.\n\nTen sessions over twelve weeks. Career counseling that names what other programs leave unsaid. Sessions on translating credentials, on navigating recruiter screens and bias, on financial planning during transition, on the unwritten rules of Canadian workplace culture. Not a resume workshop. A system orientation, run by people who have been through the system themselves.\n\nFor Adaeze, the shift came in week six. After three rounds of mock interviews with a CAFCAN counselor, she walked into a community bank interview with the same experience she had always had, and a way to talk about it that landed. She started two weeks later in a contract role that used her actual training. She took a photo of her first Canadian business cards in the office hallway and sent it to her daughter at school.\n\nAcross cohort 1, participants moved out of precarious work into roles aligned to their professional histories. The outcomes weren't a function of better resumes. They were a function of being seen, named, and stood beside through a system that had been actively unseeing them.\n\nCIBC's funding made the program possible. The community partnerships made it complete. The participants made it real.\n\nFor cohort 2, CAFCAN is requesting renewed support to extend the model to twice as many community members. The case isn't theoretical. It is sitting in Adaeze's pocket, in the business cards she carries to work each morning, and in the photo on her daughter's school folder.",
    medium150:
      "For eighteen months after arriving in Toronto from Lagos, Adaeze stitched together three precarious shifts and sent money home. She had a decade of client services experience from a Nigerian financial firm. None of the roles that matched her credentials called back.\n\nThen Our People's Keeper launched. CAFCAN's employment program, built specifically for community members whose international credentials keep getting filtered out by Canadian recruitment systems, ran ten sessions in partnership with Homes First, Christie Refugee Welcome Centre, Up With Women, and Impakt Foundation.\n\nIn week six, after three rounds of mock interviews with a CAFCAN counselor, Adaeze walked into a community bank interview with the same experience she had always had, and a way to talk about it that landed. She started a contract role two weeks later. She took a photo of her first Canadian business cards and sent it to her daughter at school.",
    short50:
      "Adaeze had a decade of financial services experience from Lagos. For 18 months in Toronto, nobody called back. Six weeks into CAFCAN's Our People's Keeper program, she walked into a community bank interview. Same experience, new language for it. She started two weeks later.",
  },
  audienceVersions: {
    funder: {
      label: "Funder version (outcome-led, evidence-led)",
      body: "Our People's Keeper cohort 1 produced measurable employment outcomes by closing a specific gap CIBC's general workforce investments cannot reach: the credential-recognition and cultural-fluency barriers that disproportionately filter Caribbean African Canadian newcomers out of skilled roles for which they are technically qualified.\n\nParticipant Adaeze, with a decade of client services experience from a Nigerian financial firm, spent eighteen months in precarious shift work in Toronto before entering cohort 1. By week six, she had transitioned into a contract role at a community bank, using her existing credentials, made legible through CAFCAN's program-specific career counseling and mock-interview rounds.\n\nAcross cohort 1, participants moved out of precarious employment into roles aligned to their professional histories. The driver wasn't credential upgrading. It was structural orientation to a recruitment system that had been actively unseeing them. Cohort 2 will extend the model to twice the participant base.",
    },
    donor: {
      label: "Donor version (transformation-led, emotional)",
      body: "Adaeze had been a client services lead at a Nigerian bank. In Toronto, she worked three precarious shifts for eighteen months. She didn't tell her parents how thin the margins had gotten. She kept sending money home anyway.\n\nWhat changed wasn't her qualifications. What changed was the room she walked into. Our People's Keeper met her with people who had been through the same system, named the parts no other program had said out loud, and stood next to her through twelve weeks of work that wasn't really about resumes. It was about being seen.\n\nSix weeks in, she sat across from a hiring manager at a community bank and described her own decade of experience in a way that landed. She started two weeks later. The first thing she did with her first Canadian business cards was take a photo and send it to her daughter at school.\n\nYour gift is what makes the next Adaeze possible. Cohort 2 starts soon. Will you stand alongside us?",
    },
    community: {
      label: "Community version (relational, ongoing)",
      body: "OPKT belongs to the community as much as it belongs to CAFCAN. Cohort 1 ran on partnership (Homes First, Christie Refugee Welcome Centre, Up With Women, Impakt Foundation, CIBC) and on the willingness of community members like Adaeze to come back week after week and trust the process.\n\nAdaeze, a member of our community originally from Lagos, came to OPKT after eighteen months of underemployment that had nothing to do with her qualifications. By week six she was in a contract role at a community bank that used her actual training. She is still in our community. The program continues to support cohort 1 alumni as they navigate the next chapter.\n\nCohort 2 begins this season. Referrals welcome from community partners. The work is ours. The pipeline is open.",
    },
    partner: {
      label: "Partner version (collaborative, capacity-focused)",
      body: "Our People's Keeper is a partnership architecture before it is a program. CAFCAN coordinates. Homes First, Christie Refugee Welcome Centre, Up With Women, and Impakt Foundation deliver and refer. CIBC funds. Community members carry the outcomes. The strength of cohort 1, including participants like Adaeze, who moved from eighteen months of precarious work into a contract role at a community bank in six weeks, is a function of the partnership, not any single org.\n\nFor cohort 2 we are expanding capacity and inviting deeper coordination across referral, intake, and post-program follow-up. The participants we serve are often working with two or three of your organizations simultaneously. A coordinated handoff between us turns three separate efforts into one continuous pathway. Let's schedule a partnership review for next quarter.",
    },
  },
  quoteStarters: [
    "When I first walked into OPKT, I didn't know that...",
    "The first time someone in the program actually named what I had been feeling for eighteen months...",
    "I sent the photo of my business cards to my daughter at school because...",
    "In Lagos, I was [role]. In Toronto, before OPKT, I was...",
    "What changed wasn't my qualifications. What changed was...",
    "The hardest part of those first months in Canada wasn't the work. It was...",
    "OPKT was the first program I had been in where the person across the table...",
    "When I tell community members back home about this program, what I tell them is...",
  ],
  headlines: [
    "Eighteen months of being qualified and invisible. Six weeks of being seen.",
    "She had the experience the whole time. CAFCAN gave her the room to use it.",
    "The first Canadian business cards Adaeze ever held are in a photo on her daughter's school folder.",
    "Most employment programs teach resume formatting. Our People's Keeper teaches the system.",
    "What CIBC funded wasn't an employment outcome. It was a return of dignity.",
    "Cohort 1 didn't fix the recruitment system. It taught participants how to outlast it.",
    "From client services in Lagos to client services in Toronto, with eighteen months of underemployment in between.",
    "The strongest part of Our People's Keeper isn't what's in the curriculum. It's who's in the room.",
    "A program built by people who have been through the system, for people who are still in it.",
    "Cohort 2 begins this season. Adaeze's story is what makes it possible.",
  ],
  visualBrief: [
    {
      shotType: "Portrait, environmental",
      description:
        "Participant at her new desk. Eye level. Not posed. The hero shot of the package.",
      purpose: "Tells the funder what the program does without a single word of explanation.",
    },
    {
      shotType: "Close-up, hands",
      description: "A pair of hands holding the new Canadian business cards. No face. Universal.",
      purpose:
        "Pulls in donor audiences who want emotional specificity without identification.",
    },
    {
      shotType: "Wide, cohort space",
      description:
        "The room mid-session. Density and presence. Multiple orgs in one room, participants seated together, counselor at the front.",
      purpose:
        "Shows the partnership architecture is real. Anchors the partner version.",
    },
    {
      shotType: "Detail, materials",
      description:
        "The OPKT workbook, a participant's notes in their own handwriting, a coffee cup. Specific, intimate, not staged.",
      purpose: "The texture of actual work.",
    },
    {
      shotType: "Wide, partner site",
      description:
        "A wide of the Christie Refugee Welcome Centre or Homes First lobby with a CAFCAN counselor and participant walking through.",
      purpose: "Shows the multi-site delivery model in one frame.",
    },
    {
      shotType: "Portrait, counselor",
      description: "A CAFCAN counselor mid-conversation with a participant.",
      purpose:
        "The counselor is the unseen hero of the program. Funders and donors should see her.",
    },
    {
      shotType: "B-roll, intake",
      description:
        "A participant first walking into the program space, looking around.",
      purpose: "Used as the cold open. Tells the 'before' half of the story without explanation.",
    },
    {
      shotType: "Detail, business card",
      description:
        "The business card itself, photographed on a kitchen table next to a child's homework.",
      purpose: "Domestic specificity. The story arc compressed into one image.",
    },
  ],
  calendar: [
    {
      week: 1,
      channel: "Instagram and LinkedIn (organic)",
      format: "Short form (50 words) + business cards close-up image",
      leadWith: "Eighteen months of being qualified and invisible. Six weeks of being seen.",
      cta: "Link in bio to OPKT page",
    },
    {
      week: 2,
      channel: "Email to donor list + monthly newsletter",
      format: "Medium form (150 words) + cohort wide shot + counselor portrait",
      leadWith:
        "Most employment programs teach resume formatting. Our People's Keeper teaches the system.",
      cta: "Stand alongside cohort 2. Give monthly.",
    },
    {
      week: 3,
      channel: "Grant proposal section + website hero + LinkedIn long post",
      format: "Long form (500 words) + environmental portrait + business cards detail",
      leadWith:
        "The full Adaeze story as the opening section of the CIBC renewal proposal",
      cta: "Internal grant submission. LinkedIn post tags CIBC's community impact lead.",
    },
    {
      week: 4,
      channel: "Direct email to partner orgs + partnership announcement post",
      format: "Partner version (120w) + wide cohort space + partner site image",
      leadWith:
        "The strongest part of Our People's Keeper isn't what's in the curriculum. It's who's in the room.",
      cta: "Let's schedule the cohort 2 partnership review.",
    },
  ],
  ctas: {
    funder:
      "Renew Our People's Keeper. Cohort 2 will reach twice as many community members at the same per-participant investment level. The case is sitting in Adaeze's pocket.",
    donor:
      "Stand alongside cohort 2. $50 a month funds one participant's full twelve-week experience.",
    community: "Know someone navigating the same gap Adaeze did? OPKT cohort 2 referrals are open.",
    partner:
      "Let's schedule a partnership review for cohort 2. Coordinated referral, intake, and post-program handoff across our orgs.",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-accent-deep transition-colors no-print"
    >
      {copied ? <CheckCircle2 size={14} className="text-accent-deep" /> : <Copy size={14} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function StoryLoopResult() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") as "starter" | "full" | null) ?? "full";
  const isStarter = mode === "starter";
  const [result, setResult] = useState<LoopResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      // Sample fallback so the demo URL keeps working.
      if (id === "sample-cafcan") {
        if (!cancelled) {
          setResult(sampleResult);
          setLoading(false);
        }
        return;
      }
      if (!id) {
        setError("No session id");
        setLoading(false);
        return;
      }
      try {
        const { data, error: functionError } = await supabase.functions.invoke(
          "get-story-loop-result",
          { body: { id } },
        );
        if (functionError) throw new Error(functionError.message);
        const payload = data as {
          ok?: boolean;
          error?: string;
          session?: { output: LoopResult | null; status: string; error: string | null };
        } | null;
        if (!payload?.ok || !payload.session) {
          throw new Error(payload?.error || "Session not found");
        }
        const row = payload.session;
        if (row.status === "failed") {
          throw new Error(row.error || "Generation failed");
        }
        if (row.status !== "complete" || !row.output) {
          throw new Error("Result not yet ready. Try refreshing in a moment.");
        }
        if (!cancelled) {
          setResult(row.output);
          setLoading(false);
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        if (!cancelled) {
          setError(message);
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (result) {
      setSEO({
        title: `${result.programName}. Story LOOP | Impact Loop`,
        description: `Story LOOP package for ${result.orgName}: ${result.programName}.`,
        path: `/loop/result/${id}`,
      });
    }
    return resetSEO;
  }, [id, result]);

  if (loading) {
    return (
      <Layout>
        <section className="py-32 text-center">
          <div className="container max-w-md mx-auto px-6">
            <p className="text-sm text-muted-foreground">Loading your Story LOOP...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !result) {
    return (
      <Layout>
        <section className="py-32">
          <div className="container max-w-md mx-auto px-6 text-center">
            <h1 className="font-serif text-2xl font-bold mb-3">Couldn't load your Story LOOP</h1>
            <p className="text-sm text-muted-foreground mb-6">{error || "Unknown error"}</p>
            <Link
              to="/loop"
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-md font-semibold"
            >
              Start over <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  // Helper component for the unlock CTA shown in starter mode
  const UnlockBanner = () => (
    <section className="bg-accent-deep text-background py-14 md:py-16">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <Layers className="text-accent mx-auto mb-5" size={26} />
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4">
          Unlock the full package
        </p>
        <h2 className="font-serif text-2xl md:text-4xl font-bold leading-tight mb-4">
          You have the spine.{" "}
          <span className="italic text-accent">Ten more minutes gets you the full kit.</span>
        </h2>
        <p className="opacity-90 leading-relaxed mb-8 max-w-2xl mx-auto">
          Continue the form and unlock three story lengths, four audience versions (funder, donor, community, partner), quote starters, ten total headlines, a visual brief, a 4-week content calendar, and CTAs tuned per audience. Free.
        </p>
        <Link
          to="/loop"
          className="inline-flex items-center gap-2 bg-accent text-foreground px-6 py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors"
        >
          Continue building <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );

  // What's locked, shown in starter mode as a teaser
  const LockedTeaser = ({ title }: { title: string }) => (
    <section className="py-12 md:py-16 bg-secondary/40 border-y border-border">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Lock className="text-muted-foreground mx-auto mb-4" size={20} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2">
            Locked in starter mode
          </p>
          <h3 className="font-serif text-xl md:text-2xl font-semibold leading-tight mb-3">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
            Continue the form to unlock this section and the rest of the full package.
          </p>
          <Link
            to="/loop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-deep hover:gap-3 transition-all"
          >
            Continue building <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <Layout>
      {/* Hero with toolbar */}
      <section className="bg-secondary py-12 md:py-16 border-b border-border print:bg-white print:py-6">
        <div className="container max-w-5xl mx-auto px-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
              Your Story LOOP. {result.orgName}
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-3">
              {result.programName}
            </h1>
            <p className="text-sm text-muted-foreground">
              Generated {result.generatedAt}. Save this link. Share with your team.
            </p>
          </div>
          <div className="flex gap-2 no-print">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
            >
              <Printer size={14} /> Download PDF
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
            >
              <Share2 size={14} /> Copy link
            </button>
          </div>
        </div>
        <div className="container max-w-5xl mx-auto px-6 mt-6 no-print">
          <div className="inline-flex items-center gap-2 text-xs bg-accent/10 text-accent-deep border border-accent/20 px-3 py-1.5 rounded-full">
            <Mail size={12} /> A copy has been emailed to you.
          </div>
        </div>
      </section>

      {/* Print stylesheet. Hides nav, footer, buttons, and tightens layout for paper. */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          header, footer, nav { display: none !important; }
          body { background: white !important; color: black !important; }
          section { page-break-inside: avoid; padding-top: 12px !important; padding-bottom: 12px !important; }
          .bg-secondary, .bg-secondary\\/40, .bg-foreground, .bg-accent-deep\\/5, .bg-card { background: white !important; color: black !important; }
          .text-background { color: black !important; }
          .border-y, .border-b, .border-t { border-color: #ddd !important; }
        }
      `}</style>

      {/* SECTION 1 - LOOP */}
      <section className="py-16 md:py-20">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3"
          >
            Section 1. Your LOOP
          </motion.p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-10 leading-tight">
            The spine of your story.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { letter: "L", title: "Lens", body: result.loop.lens },
              { letter: "O", title: "Origin", body: result.loop.origin },
              { letter: "O", title: "Obstacle", body: result.loop.obstacle },
              { letter: "P", title: "Payoff", body: result.loop.payoff },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-serif font-bold text-4xl text-accent-deep leading-none">
                    {pillar.letter}
                  </span>
                  <h3 className="font-serif text-xl font-semibold">{pillar.title}</h3>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 - Three lengths (starter mode shows only medium) */}
      <section className="bg-secondary/40 py-16 md:py-20 border-y border-border">
        <div className="container max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
            Section 2. {isStarter ? "Your story draft" : "Your story, three lengths"}
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-10 leading-tight">
            {isStarter ? "A 150-word draft to start." : "Ship it where it needs to land."}
          </h2>
          <div className="space-y-6">
            {(isStarter
              ? [{ label: "Medium form (~150 words)", note: "For donor emails, newsletter spotlights", text: result.story.medium150 }]
              : [
                  { label: "Long form (~500 words)", note: "For grant proposals, annual reports", text: result.story.long500 },
                  { label: "Medium form (~150 words)", note: "For donor emails, newsletter spotlights", text: result.story.medium150 },
                  { label: "Short form (~50 words)", note: "For social captions, board updates", text: result.story.short50 },
                ]
            ).map((v) => (
              <div key={v.label} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-foreground">{v.label}</p>
                  <CopyButton text={v.text} />
                </div>
                <p className="text-xs text-muted-foreground mb-4">{v.note}</p>
                <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {v.text}
                </div>
              </div>
            ))}
            {isStarter && (
              <div className="bg-accent-deep/5 border border-accent-deep/30 rounded-lg p-5 text-sm text-center">
                <Lock className="text-accent-deep inline-block mr-2" size={14} />
                <span className="text-muted-foreground">
                  Long form (500w) and short form (50w) versions unlock when you complete the full intake.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3-7 wrapper for starter mode. Show 5 headlines, hide everything else, show unlock banner */}
      {isStarter && (
        <>
          {/* Trimmed headlines section (5 only) */}
          <section className="py-16 md:py-20">
            <div className="container max-w-5xl mx-auto px-6">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
                Section 3. Headlines and hooks
              </p>
              <h2 className="font-serif text-2xl md:text-4xl font-bold mb-10 leading-tight">
                Five ready-to-use opener lines.
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {result.headlines.slice(0, 5).map((h, i) => (
                  <div key={i} className="bg-card border border-border rounded-md p-4 flex items-start gap-3">
                    <span className="font-serif font-bold text-2xl text-accent-deep leading-none w-7 shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground flex-1 font-medium leading-snug">{h}</span>
                    <CopyButton text={h} />
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-accent-deep/5 border border-accent-deep/30 rounded-lg p-5 text-sm text-center">
                <Lock className="text-accent-deep inline-block mr-2" size={14} />
                <span className="text-muted-foreground">
                  5 more headlines unlock with the full package, plus quote starters, audience versions, visual brief, calendar, and CTAs.
                </span>
              </div>
            </div>
          </section>

          {/* Big unlock banner */}
          <UnlockBanner />
        </>
      )}

      {/* Full mode only: Sections 3-8 */}
      {!isStarter && (
        <>
      {/* SECTION 3 - Audience versions */}
      <section className="py-16 md:py-20">
        <div className="container max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
            Section 3. Four audience versions
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-10 leading-tight">
            Same story. Four framings.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(result.audienceVersions).map(([key, v]) => (
              <div key={key} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent-deep">
                    {v.label}
                  </p>
                  <CopyButton text={v.body} />
                </div>
                <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {v.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - Quote starters */}
      <section className="bg-secondary/40 py-16 md:py-20 border-y border-border">
        <div className="container max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
            Section 4. Quote starters
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-3 leading-tight">
            Sentence openers to use in interviews or pull from existing footage.
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-2xl">
            These work as prompts when you sit down with the person at the center, or as filters when you scan existing testimonial material.
          </p>
          <ul className="space-y-3">
            {result.quoteStarters.map((q, i) => (
              <li key={i} className="bg-card border border-border rounded-md p-4 flex items-start gap-3">
                <Quote className="text-accent-deep shrink-0 mt-1" size={16} />
                <span className="text-sm italic text-foreground flex-1">"{q}"</span>
                <CopyButton text={q} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 5 - Headlines */}
      <section className="py-16 md:py-20">
        <div className="container max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
            Section 5. Headlines and hooks
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-10 leading-tight">
            For Instagram captions, email subjects, grant openings, donor letter leads.
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {result.headlines.map((h, i) => (
              <div key={i} className="bg-card border border-border rounded-md p-4 flex items-start gap-3">
                <span className="font-serif font-bold text-2xl text-accent-deep leading-none w-7 shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground flex-1 font-medium leading-snug">{h}</span>
                <CopyButton text={h} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - Visual brief */}
      <section className="bg-secondary/40 py-16 md:py-20 border-y border-border">
        <div className="container max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
            Section 6. Visual brief
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-3 leading-tight">
            Eight specific shots to capture or pull from your archive.
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-2xl">
            Shoot these on a phone or pull from existing assets. Each one does a specific story job.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {result.visualBrief.map((shot, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="text-accent-deep" size={16} />
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent-deep">
                    {i + 1}. {shot.shotType}
                  </p>
                </div>
                <p className="text-sm text-foreground font-medium mb-2 leading-snug">{shot.description}</p>
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  Why: {shot.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - Calendar */}
      <section className="py-16 md:py-20">
        <div className="container max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
            Section 7. Content calendar
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-10 leading-tight">
            A 4-week sequence to release this story.
          </h2>
          <div className="space-y-4">
            {result.calendar.map((w) => (
              <div key={w.week} className="bg-card border border-border rounded-lg p-6 grid md:grid-cols-12 gap-4">
                <div className="md:col-span-2 flex items-start gap-2">
                  <Calendar className="text-accent-deep shrink-0" size={18} />
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent-deep">
                      Week
                    </p>
                    <p className="font-serif text-3xl font-bold text-foreground">{w.week}</p>
                  </div>
                </div>
                <div className="md:col-span-10 space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Channel: </span>
                    {w.channel}
                  </div>
                  <div>
                    <span className="font-semibold">Format: </span>
                    {w.format}
                  </div>
                  <div>
                    <span className="font-semibold">Lead with: </span>
                    <em>"{w.leadWith}"</em>
                  </div>
                  <div>
                    <span className="font-semibold">CTA: </span>
                    {w.cta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - CTAs */}
      <section className="bg-secondary/40 py-16 md:py-20 border-y border-border">
        <div className="container max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-deep mb-3">
            Section 8. CTAs per audience
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-10 leading-tight">
            Different ask, different audience.
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {Object.entries(result.ctas).map(([aud, text]) => (
              <div key={aud} className="bg-card border border-border rounded-lg p-6">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent-deep mb-3 capitalize">
                  {aud} CTA
                </p>
                <p className="text-sm italic text-foreground leading-relaxed">"{text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      {/* Bottom CTA */}
      <section className="bg-foreground text-background py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Sparkles className="text-accent mx-auto mb-6" size={28} />
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4">
            Want this story told as a film?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-6">
            This is the strategy.{" "}
            <span className="italic text-accent">Impact Loop makes the film.</span>
          </h2>
          <p className="opacity-80 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            We bring cinematic production, real community grounding, and a working asset library to organizations doing equity-focused work. Book a 30-minute discovery call to see if it fits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-foreground px-6 py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors"
            >
              Book a discovery call <ArrowRight size={16} />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 bg-background/10 border border-background/20 px-6 py-3 rounded-md font-semibold hover:bg-background/15 transition-colors"
            >
              See past Impact Loop work
            </Link>
            <a
              href="mailto:rovonn@impactloop.ca"
              className="inline-flex items-center gap-2 text-sm font-semibold opacity-80 hover:opacity-100 transition-opacity"
            >
              <Mail size={16} /> Email Rovonn directly
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
