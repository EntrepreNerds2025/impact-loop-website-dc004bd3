/**
 * loop-followup-sweep
 *
 * Runs daily via pg_cron. Selects story_loop_sessions ready for day 3, day 10,
 * or day 21 follow-up emails. Sends via Resend. Marks the corresponding
 * followup_dayN_sent_at column on success.
 *
 * Inclusion rules:
 *   status = 'complete'
 *   allow_followup = true
 *   followup_unsubscribed_at IS NULL
 *   created_at <= now() - interval 'X days'
 *   followup_dayX_sent_at IS NULL
 *
 * Required env: RESEND_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * Optional env: RESEND_FROM, RESULT_BASE_URL
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Stage = 3 | 10 | 21;

interface SessionRow {
  id: string;
  org_name: string;
  story_focus: string;
  contact_name: string;
  contact_email: string;
  mode: "starter" | "full";
  path: "nonprofit" | "business" | "founder";
  followup_day3_sent_at: string | null;
  followup_day10_sent_at: string | null;
  followup_day21_sent_at: string | null;
}

function templateForStage(
  stage: Stage,
  row: SessionRow,
  resultUrl: string,
  unsubscribeUrl: string,
): { subject: string; text: string; html: string } {
  const name = row.contact_name?.split(" ")[0] || "there";
  const org = row.org_name;
  const program = row.story_focus.slice(0, 80);
  const ctaUrl = "https://impactloop.ca/contact";
  const caseStudiesUrl = "https://impactloop.ca/case-studies";

  let subject = "";
  let bodyText = "";
  let bodyHtml = "";

  if (stage === 3) {
    subject = `${name}, did your Story LOOP land?`;
    bodyText = `Hi ${name},\n\nIt's been a few days since you generated your Story LOOP for ${org}. I wanted to check in.\n\nTwo questions:\n\n1. Did the LOOP framework land? Was the spine of the story usable for your next funder or donor moment?\n\n2. Is there a specific piece you'd push deeper on if you could? A particular audience version, a tone choice, a part of the storytelling that needs more nuance than a free tool can give?\n\nIf the answer to either is yes, I'd love to hear about it. Either reply to this email or book a 30-minute call at ${ctaUrl}.\n\nNo pressure. Either way, your result is here whenever you want to come back to it: ${resultUrl}\n\n— Rovonn Russell\nImpact Loop\n\nUnsubscribe: ${unsubscribeUrl}`;
    bodyHtml = `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
  <p style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #888; margin: 0 0 20px;">Impact Loop</p>
  <h1 style="font-family: Georgia, serif; font-size: 22px; line-height: 1.3; margin: 0 0 16px;">${name}, did your Story LOOP land?</h1>
  <p>Hi ${name},</p>
  <p>It's been a few days since you generated your Story LOOP for <strong>${org}</strong>. I wanted to check in.</p>
  <p><strong>Two questions:</strong></p>
  <ol>
    <li style="margin-bottom: 8px;">Did the LOOP framework land? Was the spine of the story usable for your next funder or donor moment?</li>
    <li>Is there a specific piece you'd push deeper on if you could? A particular audience version, a tone choice, a part of the storytelling that needs more nuance than a free tool can give?</li>
  </ol>
  <p>If the answer to either is yes, I'd love to hear about it. Reply to this email, or <a href="${ctaUrl}">book a 30-minute call</a>.</p>
  <p style="font-size: 14px; color: #555; margin-top: 24px;">Your result lives here whenever you want to come back to it: <a href="${resultUrl}">${resultUrl}</a></p>
  <p style="margin: 24px 0 0; font-size: 14px; color: #555;">— Rovonn Russell<br/>Impact Loop</p>
  <p style="margin-top: 32px; font-size: 11px; color: #aaa;"><a href="${unsubscribeUrl}" style="color: #aaa;">Unsubscribe from these follow-ups</a></p>
</body></html>`;
  } else if (stage === 10) {
    subject = `How a Story LOOP becomes a film: ${org}`;
    bodyText = `Hi ${name},\n\nA quick follow-up. Your Story LOOP for ${org} gave you the strategy and the multi-format content package. The next step, when you're ready, is having it told as a film.\n\nThat's what Impact Loop does. We work with Black-serving and equity-focused community organizations on cinematic storytelling that holds up in front of funders, boards, and gala rooms.\n\nA few past projects that started exactly where you are right now: ${caseStudiesUrl}\n\nIf a film of your story is on your roadmap in the next 6 to 12 months, even loosely, let's talk. Discovery call is 30 minutes, free, no pitch. We figure out together whether the work fits.\n\n${ctaUrl}\n\n— Rovonn\nImpact Loop\n\nResult page: ${resultUrl}\nUnsubscribe: ${unsubscribeUrl}`;
    bodyHtml = `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
  <p style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #888; margin: 0 0 20px;">Impact Loop</p>
  <h1 style="font-family: Georgia, serif; font-size: 22px; line-height: 1.3; margin: 0 0 16px;">How a Story LOOP becomes a film: ${org}</h1>
  <p>Hi ${name},</p>
  <p>A quick follow-up. Your Story LOOP for <strong>${org}</strong> gave you the strategy and the multi-format content package. The next step, when you're ready, is having it told as a film.</p>
  <p>That's what Impact Loop does. We work with Black-serving and equity-focused community organizations on cinematic storytelling that holds up in front of funders, boards, and gala rooms.</p>
  <p>A few past projects that started exactly where you are right now: <a href="${caseStudiesUrl}">see the case study deck</a>.</p>
  <p style="margin: 24px 0; padding: 16px; background: #f6f0e2; border-radius: 8px;">If a film of your story is on your roadmap in the next 6 to 12 months, even loosely, <a href="${ctaUrl}">let's talk</a>. Discovery call is 30 minutes, free, no pitch. We figure out together whether the work fits.</p>
  <p style="margin: 24px 0 0; font-size: 14px; color: #555;">— Rovonn<br/>Impact Loop</p>
  <p style="margin-top: 24px; font-size: 12px; color: #888;">Your Story LOOP result: <a href="${resultUrl}" style="color: #888;">${resultUrl}</a></p>
  <p style="margin-top: 16px; font-size: 11px; color: #aaa;"><a href="${unsubscribeUrl}" style="color: #aaa;">Unsubscribe from these follow-ups</a></p>
</body></html>`;
  } else {
    subject = `Quarterly funder cycle: still on the radar?`;
    bodyText = `Hi ${name},\n\nQuarterly funder cycles are approaching. If ${org} is in a window where a stronger storytelling case would help (renewals, new applications, board reporting, end-of-year appeals), this is the moment to act on it.\n\nI'm not selling something. I'm asking if there's a window in the next quarter where Impact Loop's work would land at the right time. If yes, a 30-minute call now is the easiest way to figure out timing and scope. If no, no worries — I won't keep nudging.\n\n${ctaUrl}\n\n— Rovonn\nImpact Loop\n\nYour Story LOOP: ${resultUrl}\nUnsubscribe: ${unsubscribeUrl}`;
    bodyHtml = `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
  <p style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #888; margin: 0 0 20px;">Impact Loop</p>
  <h1 style="font-family: Georgia, serif; font-size: 22px; line-height: 1.3; margin: 0 0 16px;">Quarterly funder cycle: still on the radar?</h1>
  <p>Hi ${name},</p>
  <p>Quarterly funder cycles are approaching. If <strong>${org}</strong> is in a window where a stronger storytelling case would help (renewals, new applications, board reporting, end-of-year appeals), this is the moment to act on it.</p>
  <p>I'm not selling something. I'm asking if there's a window in the next quarter where Impact Loop's work would land at the right time. If yes, a <a href="${ctaUrl}">30-minute call</a> now is the easiest way to figure out timing and scope. If no, no worries. I won't keep nudging.</p>
  <p style="margin: 24px 0 0; font-size: 14px; color: #555;">— Rovonn<br/>Impact Loop</p>
  <p style="margin-top: 24px; font-size: 12px; color: #888;">Your Story LOOP: <a href="${resultUrl}" style="color: #888;">${resultUrl}</a></p>
  <p style="margin-top: 16px; font-size: 11px; color: #aaa;"><a href="${unsubscribeUrl}" style="color: #aaa;">Unsubscribe from these follow-ups</a></p>
</body></html>`;
  }

  return { subject, text: bodyText, html: bodyHtml };
}

async function sendResend(to: string, from: string, subject: string, text: string, html: string): Promise<boolean> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text, html }),
  });
  return res.ok;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ ok: false, error: "Missing env" }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }
  const db = createClient(supabaseUrl, serviceKey);
  const baseUrl = Deno.env.get("RESULT_BASE_URL") || "https://impactloop.ca";
  const from = Deno.env.get("RESEND_FROM") || "Impact Loop <hello@impactloop.ca>";

  const stages: Array<{ stage: Stage; days: number; column: string }> = [
    { stage: 3, days: 3, column: "followup_day3_sent_at" },
    { stage: 10, days: 10, column: "followup_day10_sent_at" },
    { stage: 21, days: 21, column: "followup_day21_sent_at" },
  ];

  const summary: Record<string, number> = { processed: 0, sent: 0, failed: 0 };

  for (const { stage, days, column } of stages) {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const { data: rows, error } = await db
      .from("story_loop_sessions")
      .select(
        "id, org_name, story_focus, contact_name, contact_email, mode, path, followup_day3_sent_at, followup_day10_sent_at, followup_day21_sent_at",
      )
      .eq("status", "complete")
      .eq("allow_followup", true)
      .is("followup_unsubscribed_at", null)
      .is(column, null)
      .lte("created_at", cutoff)
      .limit(50);

    if (error || !rows) continue;

    for (const row of rows as SessionRow[]) {
      summary.processed += 1;
      const resultUrl = `${baseUrl}/loop/result/${row.id}?mode=${row.mode}`;
      const unsubUrl = `${supabaseUrl}/functions/v1/loop-unsubscribe?id=${row.id}`;
      const tpl = templateForStage(stage, row, resultUrl, unsubUrl);
      const ok = await sendResend(row.contact_email, from, tpl.subject, tpl.text, tpl.html);
      if (ok) {
        summary.sent += 1;
        await db
          .from("story_loop_sessions")
          .update({ [column]: new Date().toISOString() })
          .eq("id", row.id);
      } else {
        summary.failed += 1;
      }
    }
  }

  return new Response(JSON.stringify({ ok: true, summary }), {
    status: 200,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
});
