import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clipboard,
  ExternalLink,
  Loader2,
  Mail,
  RefreshCw,
  Save,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { resetSEO, setSEO } from "@/lib/seo";
import {
  buildFollowUpEmail,
  buildSampleGenerationBrief,
  SAMPLE_CONTENT_STATUSES,
  statusLabels,
  type SampleContentRequest,
  type SampleContentRequestUpdate,
  type SampleContentStatus,
  updateSampleContentRequest,
} from "@/lib/impactVisibility";

type DraftState = {
  status: SampleContentStatus;
  assigned_team_member: string;
  sample_pack_url: string;
  sample_pack_notes: string;
  generated_post_ideas: string;
  visual_prompt_notes: string;
  internal_notes: string;
  follow_up_email_status: string;
};

const statusTone: Record<SampleContentStatus, string> = {
  sample_requested: "bg-[#fff5df] text-[#8a5b1d] border-[#e9c983]",
  reviewing: "bg-[#eaf2ff] text-[#1d4f8a] border-[#a9c7f2]",
  generating_samples: "bg-[#f3ebff] text-[#5d368d] border-[#d1b7f1]",
  samples_ready: "bg-[#e8f8ef] text-[#1c6d3d] border-[#9ed9b5]",
  email_sent: "bg-[#eef8f7] text-[#1c6a65] border-[#9ad7d2]",
  closed: "bg-[#f2f2f2] text-[#555] border-[#d6d6d6]",
};

const toDraft = (request: SampleContentRequest): DraftState => ({
  status: request.status,
  assigned_team_member: request.assigned_team_member || "",
  sample_pack_url: request.sample_pack_url || "",
  sample_pack_notes: request.sample_pack_notes || "",
  generated_post_ideas: request.generated_post_ideas || "",
  visual_prompt_notes: request.visual_prompt_notes || "",
  internal_notes: request.internal_notes || "",
  follow_up_email_status: request.follow_up_email_status || "not_sent",
});

const draftToUpdates = (draft: DraftState): SampleContentRequestUpdate => ({
  status: draft.status,
  assigned_team_member: draft.assigned_team_member.trim() || null,
  sample_pack_url: draft.sample_pack_url.trim() || null,
  sample_pack_notes: draft.sample_pack_notes.trim() || null,
  generated_post_ideas: draft.generated_post_ideas.trim() || null,
  visual_prompt_notes: draft.visual_prompt_notes.trim() || null,
  internal_notes: draft.internal_notes.trim() || null,
  follow_up_email_status: draft.follow_up_email_status.trim() || "not_sent",
});

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

const copyText = async (text: string, label: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  toast.success(`${label} copied.`);
};

const SampleContentRequests = () => {
  const [requests, setRequests] = useState<SampleContentRequest[]>([]);
  const [drafts, setDrafts] = useState<Record<string, DraftState>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [requiresAuth, setRequiresAuth] = useState(false);
  const [filter, setFilter] = useState<SampleContentStatus | "all">("all");

  useEffect(() => {
    setSEO({
      title: "Sample Content Requests | Impact Loop Admin",
      description: "Internal queue for Impact Visibility System sample content requests.",
      ogType: "website",
    });

    return () => resetSEO();
  }, []);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError("");

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      setError(sessionError.message);
      setLoading(false);
      return;
    }

    if (!session) {
      setRequiresAuth(true);
      setRequests([]);
      setDrafts({});
      setLoading(false);
      return;
    }

    setRequiresAuth(false);

    const { data, error: queryError } = await (supabase as any)
      .from("sample_content_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (queryError) {
      setError(queryError.message);
      toast.error("Could not load sample content requests.");
    } else {
      const rows = (data || []) as SampleContentRequest[];
      setRequests(rows);
      setDrafts(Object.fromEntries(rows.map((request) => [request.id, toDraft(request)])));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const visibleRequests = useMemo(
    () => (filter === "all" ? requests : requests.filter((request) => request.status === filter)),
    [filter, requests]
  );

  const counts = useMemo(() => {
    return requests.reduce(
      (acc, request) => {
        acc[request.status] += 1;
        acc.all += 1;
        return acc;
      },
      { all: 0, sample_requested: 0, reviewing: 0, generating_samples: 0, samples_ready: 0, email_sent: 0, closed: 0 } as Record<
        SampleContentStatus | "all",
        number
      >
    );
  }, [requests]);

  const updateDraft = (id: string, field: keyof DraftState, value: string) => {
    setDrafts((current) => ({
      ...current,
      [id]: {
        ...current[id],
        [field]: value,
      },
    }));
  };

  const saveRequest = async (id: string, overrides: SampleContentRequestUpdate = {}) => {
    const draft = drafts[id];
    if (!draft) return;

    const nextDraft = { ...draft, ...overrides } as DraftState;
    const updates = {
      ...draftToUpdates(nextDraft),
      ...overrides,
    };

    if (updates.status === "samples_ready" && !updates.sample_pack_url) {
      toast.error("Add a sample pack URL before marking this request as samples ready.");
      return;
    }

    setSavingId(id);

    try {
      const saved = await updateSampleContentRequest(id, updates);
      setRequests((current) => current.map((request) => (request.id === id ? saved : request)));
      setDrafts((current) => ({ ...current, [id]: toDraft(saved) }));
      toast.success("Sample content request updated.");
    } catch (saveError) {
      console.error(saveError);
      toast.error("Could not update this request.");
    } finally {
      setSavingId(null);
    }
  };

  const copyGenerationBrief = async (request: SampleContentRequest) => {
    await copyText(buildSampleGenerationBrief(request), "Sample generation brief");
  };

  const copyFollowUpEmail = async (request: SampleContentRequest) => {
    const draft = drafts[request.id];
    const hydratedRequest = draft
      ? ({
          ...request,
          ...draftToUpdates(draft),
        } as SampleContentRequest)
      : request;

    await copyText(buildFollowUpEmail(hydratedRequest), "Follow-up email");
  };

  return (
    <Layout>
      <main className="min-h-screen bg-[#f7efe3] pt-28 text-[#201b17]">
        <section className="bg-[#201b17] py-16 text-white md:py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#f4b15f]">
                  <ShieldCheck size={16} />
                  Internal Queue
                </p>
                <h1 className="font-serif text-4xl font-bold md:text-6xl">Sample Content Requests</h1>
                <p className="mt-5 max-w-2xl text-white/72">
                  Review Impact Visibility System requests, move them through production, store sample pack links, and copy the generation brief or follow-up email when ready.
                </p>
              </div>
              <button
                type="button"
                onClick={loadRequests}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-[#201b17] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                Refresh
              </button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-10 md:py-14">
          {requiresAuth && (
            <div className="rounded-2xl border border-[#eadfce] bg-white p-8 shadow-sm">
              <h2 className="font-serif text-3xl font-bold">Admin access required</h2>
              <p className="mt-3 text-[#665747]">
                Sign in with a Supabase-authenticated admin account before viewing sample content requests. The database policies only allow authenticated users to read and update this queue.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              {error}
            </div>
          )}

          {!requiresAuth && (
            <>
              <div className="mb-8 grid gap-3 md:grid-cols-4">
                {(["all", ...SAMPLE_CONTENT_STATUSES] as Array<SampleContentStatus | "all">).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFilter(status)}
                    className={`rounded-xl border p-4 text-left transition ${
                      filter === status
                        ? "border-[#9d6a3c] bg-white shadow-md"
                        : "border-[#eadfce] bg-white/70 hover:bg-white"
                    }`}
                  >
                    <span className="block text-2xl font-bold">{counts[status]}</span>
                    <span className="text-xs font-bold uppercase tracking-wide text-[#7a6757]">
                      {status === "all" ? "All requests" : statusLabels[status]}
                    </span>
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex items-center justify-center rounded-2xl border border-[#eadfce] bg-white p-12 text-[#665747]">
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Loading sample content requests...
                </div>
              ) : visibleRequests.length === 0 ? (
                <div className="rounded-2xl border border-[#eadfce] bg-white p-10 text-center">
                  <h2 className="font-serif text-3xl font-bold">No requests yet</h2>
                  <p className="mt-3 text-[#665747]">New Impact Visibility System sample requests will appear here after the lead form is submitted.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {visibleRequests.map((request) => {
                    const draft = drafts[request.id] || toDraft(request);
                    const isSaving = savingId === request.id;

                    return (
                      <article key={request.id} className="overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm">
                        <div className="grid gap-6 border-b border-[#eadfce] p-6 lg:grid-cols-[1fr_auto]">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h2 className="font-serif text-2xl font-bold">
                                {request.first_name} {request.last_name}
                              </h2>
                              <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusTone[request.status]}`}>
                                {statusLabels[request.status]}
                              </span>
                              {request.interested_in_ongoing_content_support && (
                                <span className="rounded-full border border-[#f1c676] bg-[#fff7e6] px-3 py-1 text-xs font-bold uppercase text-[#83551d]">
                                  Ongoing support
                                </span>
                              )}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#665747]">
                              <a href={`mailto:${request.email}`} className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
                                <Mail size={15} />
                                {request.email}
                              </a>
                              <span>{request.organization_name}</span>
                              <span>{request.organization_type}</span>
                              <span>{formatDate(request.created_at)}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-start gap-2 lg:justify-end">
                            <button
                              type="button"
                              onClick={() => saveRequest(request.id, { status: "reviewing" })}
                              disabled={isSaving}
                              className="rounded-md border border-[#d9c6ae] px-3 py-2 text-xs font-bold uppercase transition hover:bg-[#f7efe3]"
                            >
                              Mark reviewing
                            </button>
                            <button
                              type="button"
                              onClick={() => saveRequest(request.id, { status: "generating_samples" })}
                              disabled={isSaving}
                              className="rounded-md border border-[#d9c6ae] px-3 py-2 text-xs font-bold uppercase transition hover:bg-[#f7efe3]"
                            >
                              Generating
                            </button>
                            <button
                              type="button"
                              onClick={() => saveRequest(request.id, { status: "samples_ready" })}
                              disabled={isSaving}
                              className="rounded-md border border-[#d9c6ae] px-3 py-2 text-xs font-bold uppercase transition hover:bg-[#f7efe3]"
                            >
                              Samples ready
                            </button>
                            <button
                              type="button"
                              onClick={() => saveRequest(request.id, { status: "email_sent", follow_up_email_status: "email_sent" })}
                              disabled={isSaving}
                              className="rounded-md bg-[#201b17] px-3 py-2 text-xs font-bold uppercase text-white transition hover:bg-[#3a312b]"
                            >
                              Email sent
                            </button>
                          </div>
                        </div>

                        <div className="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr]">
                          <div className="space-y-5">
                            <div className="rounded-xl bg-[#f7efe3] p-5">
                              <p className="text-xs font-bold uppercase tracking-wide text-[#9d6a3c]">Visibility goal</p>
                              <p className="mt-2 text-sm leading-relaxed text-[#4e4238]">{request.visibility_goal}</p>
                            </div>
                            <div className="rounded-xl border border-[#eadfce] p-5">
                              <p className="text-xs font-bold uppercase tracking-wide text-[#9d6a3c]">Website or social link</p>
                              <a
                                href={request.website_or_social_link}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 inline-flex items-center gap-2 break-all text-sm font-semibold text-[#201b17] underline-offset-4 hover:underline"
                              >
                                {request.website_or_social_link}
                                <ExternalLink size={14} />
                              </a>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <AdminInput
                                label="Assigned team member"
                                value={draft.assigned_team_member}
                                onChange={(value) => updateDraft(request.id, "assigned_team_member", value)}
                              />
                              <div>
                                <label className="mb-2 block text-sm font-semibold">Status</label>
                                <select
                                  value={draft.status}
                                  onChange={(event) => updateDraft(request.id, "status", event.target.value as SampleContentStatus)}
                                  className="ivs-input"
                                >
                                  {SAMPLE_CONTENT_STATUSES.map((status) => (
                                    <option key={status} value={status}>
                                      {statusLabels[status]}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <AdminInput
                              label="Sample pack URL"
                              value={draft.sample_pack_url}
                              onChange={(value) => updateDraft(request.id, "sample_pack_url", value)}
                              placeholder="https://..."
                            />
                            <AdminInput
                              label="Follow-up email status"
                              value={draft.follow_up_email_status}
                              onChange={(value) => updateDraft(request.id, "follow_up_email_status", value)}
                              placeholder="not_sent, drafted, email_sent"
                            />
                          </div>

                          <div className="space-y-4">
                            <AdminTextarea
                              label="Generated post ideas"
                              value={draft.generated_post_ideas}
                              onChange={(value) => updateDraft(request.id, "generated_post_ideas", value)}
                              placeholder="Paste or summarize sample post concepts here."
                            />
                            <AdminTextarea
                              label="Visual prompt notes"
                              value={draft.visual_prompt_notes}
                              onChange={(value) => updateDraft(request.id, "visual_prompt_notes", value)}
                              placeholder="Image 2.0 visual direction notes."
                            />
                            <AdminTextarea
                              label="Sample pack notes"
                              value={draft.sample_pack_notes}
                              onChange={(value) => updateDraft(request.id, "sample_pack_notes", value)}
                              placeholder="Client-facing or production notes."
                            />
                            <AdminTextarea
                              label="Internal notes"
                              value={draft.internal_notes}
                              onChange={(value) => updateDraft(request.id, "internal_notes", value)}
                              placeholder="Internal context, next steps, or assignment notes."
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-[#eadfce] bg-[#fffaf3] p-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                            <button
                              type="button"
                              onClick={() => copyGenerationBrief(request)}
                              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d9c6ae] px-4 py-2 text-xs font-bold uppercase transition hover:bg-white"
                            >
                              <Clipboard size={15} />
                              Copy Sample Generation Brief
                            </button>
                            <button
                              type="button"
                              onClick={() => copyFollowUpEmail(request)}
                              disabled={!draft.sample_pack_url}
                              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d9c6ae] px-4 py-2 text-xs font-bold uppercase transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
                            >
                              <Mail size={15} />
                              Copy Follow-up Email
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => saveRequest(request.id)}
                            disabled={isSaving}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#9d6a3c] px-5 py-2.5 text-xs font-bold uppercase text-white transition hover:bg-[#7f5633] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                            Save Request
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </Layout>
  );
};

const AdminInput = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold">{label}</span>
    <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="ivs-input" />
  </label>
);

const AdminTextarea = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold">{label}</span>
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="ivs-input min-h-24 resize-y"
    />
  </label>
);

export default SampleContentRequests;
