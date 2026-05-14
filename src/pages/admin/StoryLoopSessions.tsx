/**
 * Admin dashboard for the Story LOOP tool.
 * Lists all sessions with filtering, lets you update lead_status and lead_notes,
 * jump to the live result page, and copy the contact email.
 *
 * Route: /admin/loop-sessions
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clipboard,
  ExternalLink,
  Loader2,
  RefreshCw,
  Save,
  ShieldCheck,
  Mail,
  Sparkles,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { resetSEO, setSEO } from "@/lib/seo";

type LeadStatus =
  | "new"
  | "contacted"
  | "meeting_booked"
  | "qualified"
  | "converted"
  | "lost"
  | "unqualified";

const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "meeting_booked",
  "qualified",
  "converted",
  "lost",
  "unqualified",
];

const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  meeting_booked: "Meeting Booked",
  qualified: "Qualified",
  converted: "Converted",
  lost: "Lost",
  unqualified: "Not a fit",
};

const statusTone: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-blue-800 border-blue-200",
  contacted: "bg-amber-50 text-amber-800 border-amber-200",
  meeting_booked: "bg-purple-50 text-purple-800 border-purple-200",
  qualified: "bg-emerald-50 text-emerald-800 border-emerald-200",
  converted: "bg-green-50 text-green-900 border-green-300",
  lost: "bg-gray-100 text-gray-700 border-gray-300",
  unqualified: "bg-stone-100 text-stone-700 border-stone-300",
};

interface SessionRow {
  id: string;
  path: "nonprofit" | "business" | "founder";
  mode: "starter" | "full";
  status: "pending" | "processing" | "complete" | "failed";
  org_name: string;
  who_served: string | null;
  story_focus: string;
  why_now: string | null;
  primary_audience: string | null;
  use_channels: string[] | null;
  contact_name: string;
  contact_role: string | null;
  contact_email: string;
  allow_followup: boolean;
  lead_status: LeadStatus;
  lead_notes: string | null;
  followup_day3_sent_at: string | null;
  followup_day10_sent_at: string | null;
  followup_day21_sent_at: string | null;
  followup_unsubscribed_at: string | null;
  created_at: string;
  completed_at: string | null;
  error: string | null;
}

type Filter = "all" | LeadStatus | "starter_only" | "full_only";

export default function StoryLoopSessions() {
  const [rows, setRows] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [drafts, setDrafts] = useState<Record<string, { lead_status: LeadStatus; lead_notes: string }>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("story_loop_sessions" as never)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      toast.error(`Couldn't load sessions: ${error.message}`);
      setLoading(false);
      return;
    }
    const list = (data || []) as SessionRow[];
    setRows(list);
    const initialDrafts: Record<string, { lead_status: LeadStatus; lead_notes: string }> = {};
    list.forEach((r) => {
      initialDrafts[r.id] = { lead_status: r.lead_status, lead_notes: r.lead_notes ?? "" };
    });
    setDrafts(initialDrafts);
    setLoading(false);
  }, []);

  useEffect(() => {
    setSEO({
      title: "Story LOOP sessions. Admin | Impact Loop",
      description: "Internal admin for Story LOOP submissions.",
      path: "/admin/loop-sessions",
    });
    load();
    return resetSEO;
  }, [load]);

  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    if (filter === "starter_only") return rows.filter((r) => r.mode === "starter");
    if (filter === "full_only") return rows.filter((r) => r.mode === "full");
    return rows.filter((r) => r.lead_status === filter);
  }, [rows, filter]);

  const counts = useMemo(() => {
    const c = {
      total: rows.length,
      starter: rows.filter((r) => r.mode === "starter").length,
      full: rows.filter((r) => r.mode === "full").length,
      new: rows.filter((r) => r.lead_status === "new").length,
      converted: rows.filter((r) => r.lead_status === "converted").length,
    };
    return c;
  }, [rows]);

  const save = async (id: string) => {
    const d = drafts[id];
    if (!d) return;
    setSavingId(id);
    const { error } = await supabase
      .from("story_loop_sessions" as never)
      .update({ lead_status: d.lead_status, lead_notes: d.lead_notes })
      .eq("id", id);
    setSavingId(null);
    if (error) {
      toast.error(`Save failed: ${error.message}`);
    } else {
      toast.success("Saved");
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, lead_status: d.lead_status, lead_notes: d.lead_notes } : r)));
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied");
  };

  return (
    <Layout>
      <section className="container max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck size={18} className="text-accent-deep" />
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-accent-deep">
                Admin · Story LOOP Sessions
              </p>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight">
              Lead pipeline from the /loop tool.
            </h1>
          </div>
          <button
            onClick={load}
            className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-secondary transition-colors"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <StatPill label="Total" value={counts.total} />
          <StatPill label="Starter" value={counts.starter} icon={<Sparkles size={14} />} />
          <StatPill label="Full" value={counts.full} icon={<Layers size={14} />} />
          <StatPill label="New" value={counts.new} />
          <StatPill label="Converted" value={counts.converted} />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "starter_only", "full_only", ...LEAD_STATUSES] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                filter === f
                  ? "bg-accent-deep text-background border-accent-deep"
                  : "bg-card border-border hover:border-accent-deep"
              }`}
            >
              {f === "all" && "All"}
              {f === "starter_only" && "Starter only"}
              {f === "full_only" && "Full only"}
              {LEAD_STATUSES.includes(f as LeadStatus) && statusLabels[f as LeadStatus]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-muted-foreground">
            <Loader2 className="animate-spin mx-auto mb-3" size={20} /> Loading sessions...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            No sessions match this filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => {
              const d = drafts[r.id] || { lead_status: r.lead_status, lead_notes: r.lead_notes ?? "" };
              const isDirty = d.lead_status !== r.lead_status || d.lead_notes !== (r.lead_notes ?? "");
              return (
                <article
                  key={r.id}
                  className="bg-card border border-border rounded-lg p-5 md:p-6 grid md:grid-cols-12 gap-5"
                >
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusTone[r.lead_status]}`}>
                        {statusLabels[r.lead_status]}
                      </span>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground bg-secondary border border-border rounded-full px-2 py-0.5">
                        {r.path} · {r.mode}
                      </span>
                      {r.status !== "complete" && (
                        <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                          Gen: {r.status}
                        </span>
                      )}
                      {r.followup_unsubscribed_at && (
                        <span className="text-[10px] font-bold tracking-wider uppercase text-stone-700 bg-stone-100 border border-stone-300 rounded-full px-2 py-0.5">
                          Unsubscribed
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(r.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold leading-tight mb-1">
                      {r.org_name}
                    </h3>
                    <p className="text-sm text-foreground/80 mb-2">{r.story_focus}</p>
                    {r.who_served && (
                      <p className="text-xs text-muted-foreground italic mb-3">Serves: {r.who_served}</p>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-muted-foreground" />
                      <span className="text-foreground">{r.contact_name}</span>
                      <span className="text-muted-foreground">·</span>
                      <button
                        onClick={() => copyEmail(r.contact_email)}
                        className="text-accent-deep hover:underline inline-flex items-center gap-1"
                      >
                        {r.contact_email}
                        <Clipboard size={12} />
                      </button>
                      {r.contact_role && (
                        <>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground">{r.contact_role}</span>
                        </>
                      )}
                    </div>
                    {/* Follow-up status */}
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className={r.followup_day3_sent_at ? "text-emerald-700" : ""}>
                        D3 {r.followup_day3_sent_at ? "✓" : "○"}
                      </span>
                      <span className={r.followup_day10_sent_at ? "text-emerald-700" : ""}>
                        D10 {r.followup_day10_sent_at ? "✓" : "○"}
                      </span>
                      <span className={r.followup_day21_sent_at ? "text-emerald-700" : ""}>
                        D21 {r.followup_day21_sent_at ? "✓" : "○"}
                      </span>
                      {r.allow_followup ? null : (
                        <span className="text-stone-500">(opted out at intake)</span>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <a
                        href={`/loop/result/${r.id}?mode=${r.mode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent-deep hover:underline"
                      >
                        Open result page <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-secondary/40 rounded-md p-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Lead status
                    </label>
                    <select
                      value={d.lead_status}
                      onChange={(e) =>
                        setDrafts((s) => ({ ...s, [r.id]: { ...d, lead_status: e.target.value as LeadStatus } }))
                      }
                      className="w-full mb-4 bg-card border border-border rounded-md px-3 py-2 text-sm"
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {statusLabels[s]}
                        </option>
                      ))}
                    </select>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Notes
                    </label>
                    <textarea
                      value={d.lead_notes}
                      onChange={(e) =>
                        setDrafts((s) => ({ ...s, [r.id]: { ...d, lead_notes: e.target.value } }))
                      }
                      className="w-full mb-3 bg-card border border-border rounded-md px-3 py-2 text-sm min-h-[80px]"
                      placeholder="Conversation notes, next step, blockers..."
                    />
                    <button
                      onClick={() => save(r.id)}
                      disabled={!isDirty || savingId === r.id}
                      className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-md text-sm font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {savingId === r.id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      Save
                    </button>
                    {!isDirty && (
                      <span className="ml-3 text-xs text-muted-foreground inline-flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-emerald-600" /> Up to date
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </Layout>
  );
}

function StatPill({ label, value, icon }: { label: string; value: number; icon?: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-3 text-center">
      <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
        {icon} {label}
      </div>
      <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
    </div>
  );
}
