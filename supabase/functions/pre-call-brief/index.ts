import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { getServiceSupabaseClient } from "../_shared/supabase.ts";
import { formatBookingDateTime, sendPreCallBrief } from "../_shared/notifications.ts";

const talkingPointsByChallenge: Record<string, string[]> = {
  "We need a film or video to build trust with funders": [
    "Clarify the funding audience and exact trust barrier to address.",
    "Identify 2-3 outcomes that can be evidenced on camera in the next 90 days.",
    "Confirm where the finished film will be used (grant decks, events, donor onboarding).",
  ],
  "We need a content system, not just a one-off project": [
    "Assess current story capture workflow and where it breaks down.",
    "Prioritize reusable content formats and cadence by stakeholder group.",
    "Map ownership: who approves, publishes, and maintains storytelling operations.",
  ],
  "We need to communicate ESG or impact to stakeholders": [
    "Define the most critical ESG metrics and the story evidence behind them.",
    "Align narrative structure with board/investor reporting timelines.",
    "Surface reputational risks and where proof needs strengthening.",
  ],
  "We need help building internal storytelling capacity": [
    "Audit team capability gaps (strategy, production, interviewing, distribution).",
    "Discuss workshop scope, participants, and success markers.",
    "Identify a pilot use case to apply training immediately.",
  ],
  default: [
    "Clarify core objective and deadline driving this conversation.",
    "Identify decision-makers and required approvals.",
    "Prioritize one measurable win for the next 30 days.",
  ],
};

const renderTalkingPoints = (challengeType: string) => {
  const points = talkingPointsByChallenge[challengeType] || talkingPointsByChallenge.default;
  return `<ul>${points.map((point) => `<li>${point}</li>`).join("")}</ul>`;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

    const supabase = getServiceSupabaseClient();
    const { data: rows, error } = await supabase
      .from("booking_leads")
      .select(
        "id, full_name, email, organization, organization_website, challenge_type, budget_range, referral_source, scheduled_at, pre_call_answers, brief_sent_at, status",
      )
      .eq("status", "booked")
      .is("brief_sent_at", null)
      .gt("scheduled_at", now.toISOString())
      .lte("scheduled_at", inOneHour.toISOString())
      .order("scheduled_at", { ascending: true })
      .limit(100);

    if (error) throw error;

    let sent = 0;
    const failed: string[] = [];

    for (const row of rows || []) {
      if (!row.scheduled_at) continue;

      const preCallAnswers =
        row.pre_call_answers && typeof row.pre_call_answers === "object"
          ? `<pre style="white-space:pre-wrap;border:1px solid #ddd;padding:12px;">${JSON.stringify(
              row.pre_call_answers,
              null,
              2,
            )}</pre>`
          : "<p>No prep answers submitted yet.</p>";

      const html = `
        <h2>Pre-call brief</h2>
        <table style="border-collapse:collapse;width:100%;max-width:700px;">
          <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Name</td><td style="border:1px solid #ddd;padding:8px;">${row.full_name}</td></tr>
          <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Email</td><td style="border:1px solid #ddd;padding:8px;">${row.email}</td></tr>
          <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Organization</td><td style="border:1px solid #ddd;padding:8px;">${row.organization}</td></tr>
          <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Website</td><td style="border:1px solid #ddd;padding:8px;">${row.organization_website || "Not provided"}</td></tr>
          <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Challenge</td><td style="border:1px solid #ddd;padding:8px;">${row.challenge_type}</td></tr>
          <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Budget</td><td style="border:1px solid #ddd;padding:8px;">${row.budget_range || "Not provided"}</td></tr>
          <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Referral</td><td style="border:1px solid #ddd;padding:8px;">${row.referral_source || "Not provided"}</td></tr>
          <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Scheduled For</td><td style="border:1px solid #ddd;padding:8px;">${formatBookingDateTime(row.scheduled_at)}</td></tr>
        </table>
        <h3>Suggested talking points</h3>
        ${renderTalkingPoints(row.challenge_type)}
        <h3>Prep answers</h3>
        ${preCallAnswers}
      `;

      try {
        await sendPreCallBrief({ summaryHtml: html });
        await supabase
          .from("booking_leads")
          .update({ brief_sent_at: new Date().toISOString() })
          .eq("id", row.id);
        sent += 1;
      } catch (err) {
        console.warn("Failed pre-call brief for booking", row.id, err);
        failed.push(row.id);
      }
    }

    return jsonResponse({ success: true, sent, failed });
  } catch (error) {
    console.error("pre-call-brief error", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
