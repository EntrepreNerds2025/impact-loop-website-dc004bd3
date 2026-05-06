import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FROM = Deno.env.get("LEAD_EMAIL_FROM") || Deno.env.get("BOOKING_EMAIL_FROM") || "Impact Loop <hello@impactloop.ca>";
const INTERNAL = Deno.env.get("BOOKING_INTERNAL_EMAIL") || "rovonn@impactloop.ca";
const REPLY_TO = "rovonn@impactloop.ca";

const escapeHtml = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

type Source = "contact" | "adapt-readiness" | "impact-visibility-sample";

interface Payload {
  source: Source;
  lead_id?: string;
  submitter: { name: string; email: string; organization?: string };
  // Arbitrary key/value pairs to render in the internal alert table
  details?: Record<string, string | number | boolean | null | undefined>;
  // Optional override of the friendly subject label
  subject_label?: string;
}

const SOURCE_META: Record<Source, { label: string; confirmationLead: string; confirmationBody: string }> = {
  contact: {
    label: "Contact Form",
    confirmationLead: "Thanks for reaching out to Impact Loop.",
    confirmationBody:
      "We've received your message and Rovonn will personally review it. You'll hear back within 1–2 business days. In the meantime, feel free to explore our work or book a story call.",
  },
  "adapt-readiness": {
    label: "ADAPT Readiness Score",
    confirmationLead: "Your ADAPT Readiness Score is on its way.",
    confirmationBody:
      "Thanks for completing the ADAPT diagnostic. We'll follow up shortly with a personalized read on your score and the most useful next step — whether that's a Clarity Session, Working Session, or full Training Day.",
  },
  "impact-visibility-sample": {
    label: "Impact Visibility — Sample Content Request",
    confirmationLead: "Your sample content pack is on the way.",
    confirmationBody:
      "Thanks for requesting a sample from the Impact Visibility System. We'll review your organization's work and send tailored sample content within 2–3 business days.",
  },
};

const renderRows = (details?: Payload["details"]) => {
  if (!details) return "";
  return Object.entries(details)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;background:#faf6ef;">${escapeHtml(k)}</td><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
};

const internalHtml = (p: Payload) => {
  const meta = SOURCE_META[p.source];
  return `
    <div style="font-family:Arial,sans-serif;color:#241f1a;">
      <h2 style="font-family:Georgia,serif;margin:0 0 16px;">New Lead — ${escapeHtml(meta.label)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px;font-size:14px;">
        <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;background:#faf6ef;">Name</td><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(p.submitter.name)}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;background:#faf6ef;">Email</td><td style="border:1px solid #ddd;padding:8px;"><a href="mailto:${escapeHtml(p.submitter.email)}">${escapeHtml(p.submitter.email)}</a></td></tr>
        ${p.submitter.organization ? `<tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;background:#faf6ef;">Organization</td><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(p.submitter.organization)}</td></tr>` : ""}
        ${renderRows(p.details)}
      </table>
      <p style="margin-top:18px;font-size:12px;color:#777;">Source: ${escapeHtml(p.source)}${p.lead_id ? ` · ID: ${escapeHtml(p.lead_id)}` : ""}</p>
    </div>
  `;
};

const confirmationHtml = (p: Payload) => {
  const meta = SOURCE_META[p.source];
  const firstName = p.submitter.name.split(" ")[0] || p.submitter.name;
  return `
    <div style="font-family:Arial,sans-serif;color:#241f1a;max-width:560px;margin:0 auto;">
      <h2 style="font-family:Georgia,serif;font-size:24px;margin:0 0 16px;">${escapeHtml(meta.confirmationLead)}</h2>
      <p style="font-size:15px;line-height:1.6;color:#3a312a;">Hi ${escapeHtml(firstName)},</p>
      <p style="font-size:15px;line-height:1.6;color:#3a312a;">${escapeHtml(meta.confirmationBody)}</p>
      <p style="font-size:15px;line-height:1.6;color:#3a312a;">If anything is time-sensitive, just reply to this email — it goes straight to Rovonn.</p>
      <hr style="border:none;border-top:1px solid #eadfce;margin:28px 0;" />
      <p style="font-size:13px;color:#6e5d4b;margin:0;">
        Rovonn Russell<br/>
        Impact Loop<br/>
        <a href="https://impactloop.ca" style="color:#a86f39;">impactloop.ca</a>
      </p>
    </div>
  `;
};

const sendResend = async (params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  idempotencyKey?: string;
}) => {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  if (params.idempotencyKey) headers["Idempotency-Key"] = params.idempotencyKey;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: FROM,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      reply_to: params.replyTo,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend [${res.status}]: ${text}`);
  }
  return res.json();
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as Payload;
    if (!body?.source || !SOURCE_META[body.source]) throw new Error("Invalid source");
    if (!body?.submitter?.email || !body?.submitter?.name) throw new Error("submitter.name and submitter.email required");

    const meta = SOURCE_META[body.source];
    const subjectLabel = body.subject_label || meta.label;
    const idBase = body.lead_id || `${body.submitter.email}-${Date.now()}`;

    const warnings: string[] = [];

    try {
      await sendResend({
        to: INTERNAL,
        subject: `New Lead: ${subjectLabel} — ${body.submitter.name}`,
        html: internalHtml(body),
        replyTo: body.submitter.email,
        idempotencyKey: `internal-${body.source}-${idBase}`,
      });
    } catch (err) {
      console.error("Internal alert failed", err);
      warnings.push("internal_alert_failed");
    }

    try {
      await sendResend({
        to: body.submitter.email,
        subject: `${meta.confirmationLead}`,
        html: confirmationHtml(body),
        replyTo: REPLY_TO,
        idempotencyKey: `confirm-${body.source}-${idBase}`,
      });
    } catch (err) {
      console.error("Confirmation email failed", err);
      warnings.push("confirmation_failed");
    }

    return new Response(JSON.stringify({ success: true, warnings }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("send-lead-emails error:", message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
