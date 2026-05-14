/**
 * generate-story-loop
 *
 * Edge function that powers the /loop tool. Receives intake inputs, calls
 * Anthropic Claude with a structured prompt to produce the multi-format
 * storytelling content package, persists the result to story_loop_sessions,
 * and returns the session id to the frontend.
 *
 * Two modes:
 *   starter — abbreviated output (LOOP + 150w + 5 headlines), generated from
 *             only steps 1-2 of the intake. Faster + cheaper.
 *   full    — complete 8-section package. Requires all stage 2 inputs.
 *
 * Required env: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * Optional env: RESEND_API_KEY (enables result email delivery), RESULT_BASE_URL (default https://impactloop.ca)
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface IntakeBody {
  path: "nonprofit" | "business" | "founder";
  mode: "starter" | "full";
  orgName: string;
  orgType?: string;
  whoServed: string;
  mission?: string;
  storyFocus: string;
  whyNow: string;
  stakes?: string;
  contactName: string;
  contactRole?: string;
  contactEmail: string;
  allowFollowup?: boolean;
  // Stage 2 (full mode only)
  hasPerson?: "yes" | "no" | "composite";
  personBefore?: string;
  personAfter?: string;
  primaryAudience?: string;
  useChannels?: string[];
  existingAssets?: string;
  voiceNotes?: string;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}

// ---- Path-specific framing helpers ----
function audienceLabelsForPath(path: string): Record<string, string> {
  if (path === "business") {
    return {
      prospect: "Prospect version (problem-aware buyer, value-led)",
      customer: "Customer version (relational, expansion-led)",
      investor: "Investor version (outcome-led, scale-led)",
      partner: "Partner version (collaborative, capacity-focused)",
    };
  }
  if (path === "founder") {
    return {
      audience: "Audience version (educational, story-led)",
      peers: "Peer version (insight-led)",
      clients: "Client version (transformation-led)",
      press: "Press version (newsworthy hook)",
    };
  }
  return {
    funder: "Funder version (outcome-led, evidence-led)",
    donor: "Donor version (transformation-led, emotional)",
    community: "Community version (relational, ongoing)",
    partner: "Partner version (collaborative, capacity-focused)",
  };
}

// ---- The Claude prompt builder ----
function buildPrompt(input: IntakeBody): string {
  const audiences = audienceLabelsForPath(input.path);
  const audienceKeys = Object.keys(audiences);
  const isStarter = input.mode === "starter";

  const voiceRules = `
VOICE RULES (apply to every section of the output):
- Bridge tone: technical fluency + creative judgment + community context. Refuse to flatten into one.
- Observation, reflection, bigger picture. Open with a specific moment when possible.
- Specifics over abstractions. Name real moments, real names where given.
- Tricolons earn their place. Don't pad.
- NEVER use em dashes (—). Use periods, commas, colons, or rewrite. Hard rule, no exceptions.
- No Silicon Valley AI-bro language. No creator-coach softness. No saviour framing.
- Don't open sentences with "I". Don't overuse "genuinely," "honestly," "straightforward."
- Don't say "just reaching out" or other cold-outreach cliches.
- Black founder voice when relevant. Cultural fluency, not performative.
- Brevity is a feature.
`.trim();

  const inputs = `
ORGANIZATION INPUTS:
- Org name: ${input.orgName}
- Org type: ${input.orgType || "(not provided)"}
- Who served: ${input.whoServed}
- Mission: ${input.mission || "(not provided)"}
- Story focus: ${input.storyFocus}
- Why telling now: ${input.whyNow}
- Stakes if untold: ${input.stakes || "(not provided)"}
- Path: ${input.path}
${
    isStarter
      ? ""
      : `
- Has specific person at center: ${input.hasPerson}
- Person before: ${input.personBefore || "(not provided)"}
- Person after: ${input.personAfter || "(not provided)"}
- Primary audience: ${input.primaryAudience}
- Use channels: ${(input.useChannels || []).join(", ")}
- Existing assets: ${input.existingAssets || "(not provided)"}
- Voice notes from org: ${input.voiceNotes || "(not provided)"}
`
  }`.trim();

  const starterSchema = `{
  "loop": {
    "lens": "string (2-4 sentences). Who is the right voice to tell this. Why.",
    "origin": "string (2-4 sentences). The real moment this work started. No smoothing.",
    "obstacle": "string (2-4 sentences). The friction or stakes that earn attention.",
    "payoff": "string (2-4 sentences). The change, in terms the audience cares about."
  },
  "story": {
    "medium150": "string (140-170 words). A draft story version usable in donor emails, newsletter spotlights, website features."
  },
  "headlines": ["string", "string", "string", "string", "string"]
}`;

  const fullSchema = `{
  "loop": {
    "lens": "string (2-4 sentences)",
    "origin": "string (2-4 sentences)",
    "obstacle": "string (2-4 sentences)",
    "payoff": "string (2-4 sentences)"
  },
  "story": {
    "long500": "string (~500 words). For grant proposals, annual reports.",
    "medium150": "string (~150 words). For donor emails, newsletters.",
    "short50": "string (~50 words). For social captions, board updates."
  },
  "audienceVersions": {
${audienceKeys
  .map(
    (k) =>
      `    "${k}": { "label": "${audiences[k]}", "body": "string (~140 words)" }`
  )
  .join(",\n")}
  },
  "quoteStarters": ["string", ...] // 5-8 sentence openers
  "headlines": ["string", ...] // 8-10 hooks
  "visualBrief": [
    {
      "shotType": "string (e.g. Portrait environmental, Close-up hands, Wide cohort space, Detail materials)",
      "description": "string. What to capture, specifically.",
      "purpose": "string. What story-job this image does."
    }, ...
  ] // 5-8 items
  "calendar": [
    {
      "week": 1,
      "channel": "string",
      "format": "string",
      "leadWith": "string. Specific opener line.",
      "cta": "string"
    }, ...
  ] // 4 weeks
  "ctas": {
${audienceKeys.map((k) => `    "${k}": "string. The action ask for this audience."`).join(",\n")}
  }
}`;

  const schema = isStarter ? starterSchema : fullSchema;

  return `You are the storytelling intelligence behind Impact Loop, a Toronto-based cinematic storytelling company. You produce a multi-format storytelling content package for the organization described below, structured around the LOOP framework:

L — Lens: whose voice carries this best.
O — Origin: the real moment this work started.
O — Obstacle: the friction or stakes that earn attention.
P — Payoff: the change, in terms the audience cares about.

${voiceRules}

${inputs}

Generate ${isStarter ? "an abbreviated (starter)" : "a complete"} JSON object with this exact shape:

${schema}

CRITICAL:
- Every field must be filled with content specific to this organization's story. No generic placeholder language.
- Use the person's name and details from inputs where provided. If not provided, generate plausible composite specifics rather than blanks.
- No em dashes anywhere in the output. None. Use periods, commas, or rewrite.
- Output the JSON only. No preamble. No markdown code fences. No trailing text.`;
}

// ---- Claude API call ----
async function callClaude(prompt: string): Promise<unknown> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not set");
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 8000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Claude API error ${res.status}: ${text.slice(0, 500)}`);
  }

  const data = await res.json();
  const text: string = data?.content?.[0]?.text ?? "";

  // Defensive JSON extraction. Claude sometimes wraps with code fences despite instructions.
  let jsonString = text.trim();
  if (jsonString.startsWith("```")) {
    jsonString = jsonString.replace(/^```(?:json)?\n?/, "").replace(/\n?```\s*$/, "");
  }
  // Strip any em dashes that snuck through (belt and suspenders)
  jsonString = jsonString.replace(/—/g, ",");

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    throw new Error(
      `Claude returned malformed JSON: ${(e as Error).message}. First 300 chars: ${jsonString.slice(0, 300)}`
    );
  }
}

// ---- Email delivery via Resend (graceful if not configured) ----
async function sendResultEmail({
  to,
  name,
  programName,
  orgName,
  mode,
  resultUrl,
  unsubscribeUrl,
}: {
  to: string;
  name: string;
  programName: string;
  orgName: string;
  mode: "starter" | "full";
  resultUrl: string;
  unsubscribeUrl: string;
}): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.log("RESEND_API_KEY not set, skipping email");
    return;
  }
  const from = Deno.env.get("RESEND_FROM") || "Impact Loop <hello@impactloop.ca>";

  const subject =
    mode === "starter"
      ? `Your Starter Story LOOP is ready: ${programName}`
      : `Your Story LOOP package is ready: ${programName}`;

  const bodyText =
    mode === "starter"
      ? `Hi ${name},\n\nYour Starter Story LOOP for ${orgName} (${programName}) is ready.\n\nThis includes your LOOP framework breakdown, a 150-word story draft, and 5 ready-to-use headlines. Save the link below. You can come back to it any time.\n\nResult: ${resultUrl}\n\nWant the full content package — three story lengths, four audience versions, quote starters, visual brief, and a four-week content calendar? Continue the form at the same starting page. Same intake. Ten more minutes. Free.\n\n— Rovonn\nImpact Loop`
      : `Hi ${name},\n\nYour Story LOOP package for ${orgName} (${programName}) is ready.\n\nIt includes your LOOP framework, three story lengths (500w, 150w, 50w), four audience-tuned versions, quote starters, ten headlines, a visual brief, a four-week content calendar, and CTAs per audience.\n\nResult: ${resultUrl}\n\nIf you want this story told as a film, that's the work Impact Loop does. Reply to this email or book a 30-minute discovery call to talk.\n\n— Rovonn\nImpact Loop`;

  const bodyHtml = `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
  <p style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #888; margin: 0 0 20px;">Impact Loop</p>
  <h1 style="font-family: Georgia, serif; font-size: 24px; line-height: 1.2; margin: 0 0 16px;">Your ${mode === "starter" ? "Starter " : ""}Story LOOP is ready.</h1>
  <p style="margin: 0 0 12px;">Hi ${name},</p>
  <p style="margin: 0 0 16px;">Your Story LOOP for <strong>${orgName}</strong> (${programName}) is ready to read. Save this link, share it with your team, come back to it anytime.</p>
  <p style="margin: 0 0 24px;"><a href="${resultUrl}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: 600;">Open your Story LOOP →</a></p>
  ${
    mode === "starter"
      ? `<p style="margin: 0 0 16px; padding: 16px; background: #f6f0e2; border-radius: 8px; font-size: 14px;">Want the full content package? Continue the form for the complete kit: three story lengths, four audience versions, quote starters, visual brief, and a 4-week content calendar. <a href="https://impactloop.ca/loop">Continue building →</a></p>`
      : `<p style="margin: 0 0 16px; padding: 16px; background: #f6f0e2; border-radius: 8px; font-size: 14px;">If you want this story told as a film, that's the work Impact Loop does. Reply to this email or <a href="https://impactloop.ca/contact">book a discovery call</a> to talk.</p>`
  }
  <p style="margin: 24px 0 0; font-size: 14px; color: #555;">— Rovonn<br/>Impact Loop</p>
  <p style="margin-top: 32px; font-size: 11px; color: #aaa;"><a href="${unsubscribeUrl}" style="color: #aaa;">Unsubscribe from follow-ups</a></p>
</body></html>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: bodyText,
        html: bodyHtml,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.log(`Resend send failed: ${res.status} ${text.slice(0, 300)}`);
    }
  } catch (e) {
    console.log(`Resend send error: ${(e as Error).message}`);
  }
}

// ---- Main handler ----
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "Only POST is supported" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return jsonResponse(
      { ok: false, error: "Server missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" },
      500
    );
  }
  const db = createClient(supabaseUrl, serviceKey);

  let input: IntakeBody;
  try {
    input = await req.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON body" }, 400);
  }

  // Basic validation
  if (!input.path || !input.orgName || !input.whoServed || !input.storyFocus || !input.contactEmail) {
    return jsonResponse(
      { ok: false, error: "Missing required fields (path, orgName, whoServed, storyFocus, contactEmail)" },
      400
    );
  }

  // Insert pending session
  const { data: row, error: insertErr } = await db
    .from("story_loop_sessions")
    .insert({
      path: input.path,
      mode: input.mode || "full",
      org_name: input.orgName,
      org_type: input.orgType || null,
      who_served: input.whoServed,
      mission: input.mission || null,
      story_focus: input.storyFocus,
      why_now: input.whyNow,
      stakes: input.stakes || null,
      contact_name: input.contactName,
      contact_role: input.contactRole || null,
      contact_email: input.contactEmail,
      allow_followup: input.allowFollowup ?? false,
      has_person: input.hasPerson || null,
      person_before: input.personBefore || null,
      person_after: input.personAfter || null,
      primary_audience: input.primaryAudience || null,
      use_channels: input.useChannels || null,
      existing_assets: input.existingAssets || null,
      voice_notes: input.voiceNotes || null,
      status: "processing",
      started_at: new Date().toISOString(),
      user_agent: req.headers.get("user-agent") || null,
    })
    .select("id")
    .single();

  if (insertErr || !row) {
    return jsonResponse({ ok: false, error: `DB insert failed: ${insertErr?.message}` }, 500);
  }

  const sessionId = row.id;

  // Run Claude generation
  try {
    const prompt = buildPrompt(input);
    const output = await callClaude(prompt);

    // Add metadata the result page uses for display
    const enriched = {
      orgName: input.orgName,
      programName: input.storyFocus.slice(0, 80),
      generatedAt: new Date().toISOString().slice(0, 10),
      path: input.path,
      ...(output as Record<string, unknown>),
    };

    await db
      .from("story_loop_sessions")
      .update({
        status: "complete",
        output: enriched,
        completed_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    // Fire-and-forget email. If Resend isn't configured the function returns early.
    const baseUrl = Deno.env.get("RESULT_BASE_URL") || "https://impactloop.ca";
    const mode = (input.mode || "full") as "starter" | "full";
    const resultUrl = `${baseUrl}/loop/result/${sessionId}?mode=${mode}`;
    const unsubscribeUrl = `${supabaseUrl}/functions/v1/loop-unsubscribe?id=${sessionId}`;
    sendResultEmail({
      to: input.contactEmail,
      name: input.contactName?.split(" ")[0] || "there",
      programName: input.storyFocus.slice(0, 80),
      orgName: input.orgName,
      mode,
      resultUrl,
      unsubscribeUrl,
    }).catch((e) => console.log("Email dispatch failed:", e));

    return jsonResponse({ ok: true, sessionId, mode });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await db
      .from("story_loop_sessions")
      .update({
        status: "failed",
        error: message.slice(0, 1000),
        completed_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    return jsonResponse({ ok: false, sessionId, error: message }, 500);
  }
});
