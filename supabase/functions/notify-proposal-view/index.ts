import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { getServiceSupabaseClient } from "../_shared/supabase.ts";

const PROPOSAL_SLUG = "cbcc-kenya-canada";
const ALLOWED_ORIGINS = new Set([
  "https://impactloop.ca",
  "https://www.impactloop.ca",
]);
const DEFAULT_FROM = "Impact Loop <hello@impactloop.ca>";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const clean = (value: unknown, maxLength: number) =>
  String(value || "").trim().slice(0, maxLength);

const hashValue = async (value: string) => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ success: false, error: "Method not allowed" }, 405);
  }

  try {
    const origin = req.headers.get("origin");
    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return jsonResponse({ success: false, error: "Origin not allowed" }, 403);
    }

    const payload = await req.json();
    const proposalSlug = clean(payload.proposal_slug, 80);
    const visitorId = clean(payload.visitor_id, 128);
    const pageUrl = clean(payload.page_url, 500);
    const referrer = clean(payload.referrer, 500) || "(direct)";
    const viewerTimezone = clean(payload.viewer_timezone, 100) || "Unknown";

    if (proposalSlug !== PROPOSAL_SLUG || visitorId.length < 16) {
      return jsonResponse({ success: false, error: "Invalid tracker payload" }, 400);
    }

    let parsedPageUrl: URL;
    try {
      parsedPageUrl = new URL(pageUrl);
    } catch {
      return jsonResponse({ success: false, error: "Invalid page URL" }, 400);
    }

    if (!["impactloop.ca", "www.impactloop.ca"].includes(parsedPageUrl.hostname)) {
      return jsonResponse({ success: false, error: "Page not allowed" }, 403);
    }

    const visitorHash = await hashValue(visitorId);
    const viewBucket = new Date().toISOString().slice(0, 13);
    const userAgent = clean(req.headers.get("user-agent"), 500) || "Unknown";
    const city = clean(
      req.headers.get("cf-ipcity") || req.headers.get("x-vercel-ip-city"),
      100,
    );
    const region = clean(
      req.headers.get("cf-region") || req.headers.get("x-vercel-ip-country-region"),
      100,
    );
    const country = clean(
      req.headers.get("cf-ipcountry") || req.headers.get("x-vercel-ip-country"),
      100,
    );

    const supabase = getServiceSupabaseClient();
    const { data: event, error: insertError } = await supabase
      .from("proposal_view_events")
      .insert({
        proposal_slug: proposalSlug,
        visitor_hash: visitorHash,
        view_bucket: viewBucket,
        page_url: pageUrl,
        referrer,
        viewer_timezone: viewerTimezone,
        user_agent: userAgent,
        city: city || null,
        region: region || null,
        country: country || null,
      })
      .select("id")
      .single();

    if (insertError?.code === "23505") {
      return jsonResponse({ success: true, notified: false, reason: "rate_limited" });
    }
    if (insertError || !event) {
      throw insertError || new Error("Could not record proposal view");
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const notificationEmail =
      Deno.env.get("PROPOSAL_VIEW_NOTIFICATION_EMAIL") ||
      "rovonnrussell@gmail.com";
    const location = [city, region, country].filter(Boolean).join(", ");
    const viewedAt = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Toronto",
      dateStyle: "medium",
      timeStyle: "long",
    }).format(new Date());

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: Deno.env.get("BOOKING_EMAIL_FROM") || DEFAULT_FROM,
        to: [notificationEmail],
        subject: `Proposal Viewed: CBCC Kenya-Canada${location ? ` from ${location}` : ""}`,
        html: `
          <h2>CBCC Kenya-Canada proposal viewed</h2>
          <table style="border-collapse:collapse;width:100%;max-width:700px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Time (Toronto)</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(viewedAt)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Approximate location</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(location || "Unavailable")}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Page</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(pageUrl)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Referrer</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(referrer)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Viewer timezone</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(viewerTimezone)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Browser</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(userAgent)}</td></tr>
          </table>
          <p style="color:#666;font-size:12px;">Repeat views from the same browser are limited to one notification per hour.</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      await supabase.from("proposal_view_events").delete().eq("id", event.id);
      throw new Error(`Resend error [${emailResponse.status}]: ${errorText}`);
    }

    await supabase
      .from("proposal_view_events")
      .update({ notified_at: new Date().toISOString() })
      .eq("id", event.id);

    return jsonResponse({ success: true, notified: true });
  } catch (error) {
    console.error("notify-proposal-view error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ success: false, error: message }, 500);
  }
});
