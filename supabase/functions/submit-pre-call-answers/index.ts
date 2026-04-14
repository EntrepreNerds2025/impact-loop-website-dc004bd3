import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { getServiceSupabaseClient } from "../_shared/supabase.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const cancelToken = String(body?.cancel_token || "").trim();
    const answers = body?.answers;

    if (!cancelToken) {
      return jsonResponse({ error: "cancel_token is required" }, 400);
    }

    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      return jsonResponse({ error: "answers must be an object" }, 400);
    }

    const supabase = getServiceSupabaseClient();
    const { data, error } = await supabase
      .from("booking_leads")
      .update({ pre_call_answers: answers })
      .eq("cancel_token", cancelToken)
      .select("id, full_name, email, scheduled_at, status")
      .single();

    if (error || !data) {
      return jsonResponse({ error: "Booking not found or update failed" }, 404);
    }

    return jsonResponse({ success: true, booking: data });
  } catch (error) {
    console.error("submit-pre-call-answers error", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
