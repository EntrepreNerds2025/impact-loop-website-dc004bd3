import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { deleteCalendarEvent } from "../_shared/google-calendar.ts";
import { getServiceSupabaseClient } from "../_shared/supabase.ts";
import { CALL_TYPE_META, type CallType } from "../_shared/booking.ts";
import { sendCancellationEmail } from "../_shared/notifications.ts";

const getCallTypeLabel = (callType: string) =>
  CALL_TYPE_META[(callType as CallType) || "diagnostic"]?.label || "Impact Loop Call";

const readRequestData = async (req: Request) => {
  if (req.method === "GET") {
    const url = new URL(req.url);
    return {
      cancelToken: String(url.searchParams.get("token") || "").trim(),
      preview: true,
    };
  }

  const body = await req.json();
  return {
    cancelToken: String(body?.cancel_token || "").trim(),
    preview: Boolean(body?.preview),
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const { cancelToken, preview } = await readRequestData(req);
    if (!cancelToken) {
      return jsonResponse({ error: "cancel_token is required" }, 400);
    }

    const supabase = getServiceSupabaseClient();
    const { data: lead, error: leadError } = await supabase
      .from("booking_leads")
      .select(
        "id, full_name, email, organization, call_type, call_duration_min, challenge_type, scheduled_at, status, google_event_id, cancel_token",
      )
      .eq("cancel_token", cancelToken)
      .single();

    if (leadError || !lead) {
      return jsonResponse({ error: "Booking not found" }, 404);
    }

    if (req.method === "GET" || preview) {
      return jsonResponse({
        success: true,
        booking: {
          id: lead.id,
          full_name: lead.full_name,
          email: lead.email,
          organization: lead.organization,
          call_type: lead.call_type,
          call_type_label: getCallTypeLabel(lead.call_type),
          call_duration_min: lead.call_duration_min,
          challenge_type: lead.challenge_type,
          scheduled_at: lead.scheduled_at,
          status: lead.status,
          cancel_token: lead.cancel_token,
        },
      });
    }

    if (lead.status === "cancelled") {
      return jsonResponse({
        success: true,
        booking: {
          ...lead,
          call_type_label: getCallTypeLabel(lead.call_type),
        },
      });
    }

    if (lead.google_event_id) {
      await deleteCalendarEvent({ eventId: lead.google_event_id });
    }

    const { data: updatedLead, error: updateError } = await supabase
      .from("booking_leads")
      .update({
        status: "cancelled",
        google_event_id: null,
      })
      .eq("id", lead.id)
      .select(
        "id, full_name, email, organization, call_type, call_duration_min, challenge_type, scheduled_at, status, cancel_token",
      )
      .single();

    if (updateError || !updatedLead) {
      throw updateError || new Error("Failed to cancel booking");
    }

    try {
      await sendCancellationEmail({
        fullName: updatedLead.full_name,
        email: updatedLead.email,
        callTypeLabel: getCallTypeLabel(updatedLead.call_type),
      });
    } catch (error) {
      console.warn("Cancellation email failed", error);
    }

    return jsonResponse({
      success: true,
      booking: {
        ...updatedLead,
        call_type_label: getCallTypeLabel(updatedLead.call_type),
      },
    });
  } catch (error) {
    console.error("cancel-booking error", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
