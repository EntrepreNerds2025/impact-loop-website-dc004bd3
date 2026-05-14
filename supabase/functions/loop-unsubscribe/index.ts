/**
 * loop-unsubscribe
 *
 * Public GET endpoint reached from email footer links.
 * Marks the session's followup_unsubscribed_at and returns an HTML confirmation page.
 *
 * Usage: GET /functions/v1/loop-unsubscribe?id=<session-uuid>
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function htmlPage(title: string, body: string): Response {
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 480px; margin: 80px auto; padding: 32px 24px; color: #1a1a1a; line-height: 1.6; text-align: center; }
  h1 { font-family: Georgia, serif; font-size: 28px; margin-bottom: 16px; }
  .eyebrow { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #888; margin-bottom: 16px; }
  a { color: #1a1a1a; }
</style></head>
<body>
  <p class="eyebrow">Impact Loop</p>
  <h1>${title}</h1>
  ${body}
</body></html>`;
  return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return htmlPage("Missing session id", `<p>This unsubscribe link looks malformed. If you keep getting follow-up emails you don't want, reply to one and ask to be removed.</p>`);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return htmlPage("Server error", `<p>Couldn't process this right now. Reply to any email from us and we'll remove you manually.</p>`);
  }

  const db = createClient(supabaseUrl, serviceKey);
  const { error } = await db
    .from("story_loop_sessions")
    .update({ followup_unsubscribed_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return htmlPage("Something went wrong", `<p>Couldn't update your preferences. Reply to any email from us and we'll handle it manually.</p>`);
  }

  return htmlPage(
    "You're unsubscribed.",
    `<p>You won't get any more Story LOOP follow-up emails from us.</p>
     <p style="margin-top: 24px; font-size: 14px; color: #555;">Your result page still works at the link you have. If you change your mind, reply to any past email and we'll re-enable.</p>`
  );
});
