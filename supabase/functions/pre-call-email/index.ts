import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { getServiceSupabaseClient } from "../_shared/supabase.ts";
import { sendPreCallEmail } from "../_shared/notifications.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const supabase = getServiceSupabaseClient();
    const { data: rows, error } = await supabase
      .from("booking_leads")
      .select("id, full_name, email, scheduled_at, cancel_token, reminder_sent_at, status")
      .eq("status", "booked")
      .is("reminder_sent_at", null)
      .gt("scheduled_at", now.toISOString())
      .lte("scheduled_at", in24Hours.toISOString())
      .order("scheduled_at", { ascending: true })
      .limit(100);

    if (error) throw error;

    const siteUrl = Deno.env.get("SITE_URL") || "https://impactloop.ca";
    let sent = 0;
    const failed: string[] = [];

    for (const row of rows || []) {
      if (!row.scheduled_at) continue;
      try {
        const prepLink = `${siteUrl}/booking-confirmed?token=${row.cancel_token}`;
        await sendPreCallEmail({
          fullName: row.full_name,
          email: row.email,
          scheduledAt: row.scheduled_at,
          prepLink,
        });

        await supabase
          .from("booking_leads")
          .update({ reminder_sent_at: new Date().toISOString() })
          .eq("id", row.id);

        sent += 1;
      } catch (err) {
        console.warn("Failed pre-call reminder for booking", row.id, err);
        failed.push(row.id);
      }
    }

    return jsonResponse({ success: true, sent, failed });
  } catch (error) {
    console.error("pre-call-email error", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
