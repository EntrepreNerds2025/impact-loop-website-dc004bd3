/**
 * get-story-loop-result
 *
 * Public result lookup for /loop/result/:id. This keeps story_loop_sessions
 * table reads private while still allowing UUID result links to work.
 * Returns only the generated output/status fields needed by the page.
 *
 * Required env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
      500,
    );
  }

  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON body" }, 400);
  }

  const id = body.id?.trim();
  if (!id || !uuidPattern.test(id)) {
    return jsonResponse({ ok: false, error: "Invalid result id" }, 400);
  }

  const db = createClient(supabaseUrl, serviceKey);
  const { data, error } = await db
    .from("story_loop_sessions")
    .select("id, mode, status, output, error, completed_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return jsonResponse({ ok: false, error: error.message }, 500);
  }

  if (!data) {
    return jsonResponse({ ok: false, error: "Session not found" }, 404);
  }

  return jsonResponse({
    ok: true,
    session: {
      id: data.id,
      mode: data.mode,
      status: data.status,
      output: data.output,
      error: data.error,
      completed_at: data.completed_at,
    },
  });
});
