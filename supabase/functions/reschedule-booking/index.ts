import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { getServiceSupabaseClient } from "../_shared/supabase.ts";
import {
  addMinutes,
  BUSINESS_TIMEZONE,
  formatDateInTimeZone,
  zonedDateTimeToUtc,
} from "../_shared/time.ts";
import {
  bookingToBusyInterval,
  CALL_TYPE_META,
  isSlotAvailable,
  parseBusyIntervals,
  type CallType,
} from "../_shared/booking.ts";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getCalendarBusyIntervals,
} from "../_shared/google-calendar.ts";
import { sendRescheduleEmail } from "../_shared/notifications.ts";

const getCallTypeLabel = (callType: string) =>
  CALL_TYPE_META[(callType as CallType) || "diagnostic"]?.label || "Impact Loop Call";

const readRequestData = async (req: Request) => {
  if (req.method === "GET") {
    const url = new URL(req.url);
    return {
      cancelToken: String(url.searchParams.get("token") || "").trim(),
      newSlot: "",
      preview: true,
    };
  }

  const body = await req.json();
  return {
    cancelToken: String(body?.cancel_token || "").trim(),
    newSlot: String(body?.new_slot || "").trim(),
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
    const { cancelToken, newSlot, preview } = await readRequestData(req);
    if (!cancelToken) {
      return jsonResponse({ error: "cancel_token is required" }, 400);
    }

    const supabase = getServiceSupabaseClient();
    const { data: lead, error: leadError } = await supabase
      .from("booking_leads")
      .select(
        "id, full_name, email, organization, challenge_type, budget_range, referral_source, call_type, call_duration_min, scheduled_at, google_event_id, meeting_link, status, cancel_token",
      )
      .eq("cancel_token", cancelToken)
      .single();

    if (leadError || !lead) {
      return jsonResponse({ error: "Booking not found" }, 404);
    }

    if (req.method === "GET" || preview || !newSlot) {
      return jsonResponse({
        success: true,
        booking: {
          ...lead,
          call_type_label: getCallTypeLabel(lead.call_type),
        },
      });
    }

    if (!newSlot) {
      return jsonResponse({ error: "new_slot is required" }, 400);
    }

    const slotStartUtc = new Date(newSlot);
    if (Number.isNaN(slotStartUtc.getTime())) {
      return jsonResponse({ error: "new_slot must be a valid ISO timestamp" }, 400);
    }

    if (lead.scheduled_at && new Date(lead.scheduled_at).toISOString() === slotStartUtc.toISOString()) {
      return jsonResponse({
        success: true,
        booking: {
          ...lead,
          call_type_label: getCallTypeLabel(lead.call_type),
        },
      });
    }

    const durationMinutes = Number(lead.call_duration_min || 45);
    const slotEndUtc = addMinutes(slotStartUtc, durationMinutes);

    const slotDate = formatDateInTimeZone(slotStartUtc, BUSINESS_TIMEZONE);
    const dayStart = zonedDateTimeToUtc(slotDate, "00:00", BUSINESS_TIMEZONE).toISOString();
    const dayEnd = zonedDateTimeToUtc(slotDate, "23:59", BUSINESS_TIMEZONE).toISOString();

    const [googleBusy, dbBusyResult] = await Promise.all([
      getCalendarBusyIntervals({ timeMin: dayStart, timeMax: dayEnd }),
      supabase
        .from("booking_leads")
        .select("id, scheduled_at, call_duration_min")
        .eq("status", "booked")
        .gte("scheduled_at", dayStart)
        .lte("scheduled_at", dayEnd),
    ]);

    if (dbBusyResult.error) {
      throw dbBusyResult.error;
    }

    const bookedIntervals = (dbBusyResult.data || [])
      .filter((row) => row.id !== lead.id)
      .filter((row) => row.scheduled_at)
      .map((row) => bookingToBusyInterval(row.scheduled_at as string, row.call_duration_min || 45))
      .map((item) => ({ start: item.start.toISOString(), end: item.end.toISOString() }));

    const busyIntervals = [
      ...parseBusyIntervals(googleBusy),
      ...parseBusyIntervals(bookedIntervals),
    ];

    const slotOpen = isSlotAvailable({
      slotStartUtc,
      durationMinutes,
      busyIntervals,
      now: new Date(),
    });

    if (!slotOpen) {
      return jsonResponse({ error: "Selected slot is no longer available" }, 409);
    }

    if (lead.google_event_id) {
      await deleteCalendarEvent({ eventId: lead.google_event_id });
    }

    const callTypeLabel = getCallTypeLabel(lead.call_type);
    const summary = `Impact Loop: ${callTypeLabel} with ${lead.full_name} (${lead.organization})`;
    const description = [
      `Call Type: ${callTypeLabel}`,
      `Name: ${lead.full_name}`,
      `Email: ${lead.email}`,
      `Organization: ${lead.organization}`,
      `Challenge Type: ${lead.challenge_type}`,
      `Budget Range: ${lead.budget_range || "Not provided"}`,
      `Referral Source: ${lead.referral_source || "Not provided"}`,
      "",
      "Rescheduled via impactloop.ca custom scheduler.",
    ].join("\n");

    const event = await createCalendarEvent({
      summary,
      description,
      startUtc: slotStartUtc.toISOString(),
      endUtc: slotEndUtc.toISOString(),
      attendeeEmail: lead.email,
      meetingLink: lead.meeting_link,
    });

    const { data: updatedLead, error: updateError } = await supabase
      .from("booking_leads")
      .update({
        scheduled_at: slotStartUtc.toISOString(),
        google_event_id: event.id,
        status: "booked",
      })
      .eq("id", lead.id)
      .select(
        "id, full_name, email, organization, challenge_type, call_type, call_duration_min, scheduled_at, cancel_token, meeting_link, status",
      )
      .single();

    if (updateError || !updatedLead) {
      throw updateError || new Error("Failed to reschedule booking");
    }

    const siteUrl = Deno.env.get("SITE_URL") || "https://impactloop.ca";
    const rescheduleUrl = `${siteUrl}/booking/reschedule/${updatedLead.cancel_token}`;
    const cancelUrl = `${siteUrl}/booking/cancel/${updatedLead.cancel_token}`;

    try {
      await sendRescheduleEmail({
        fullName: updatedLead.full_name,
        email: updatedLead.email,
        callTypeLabel,
        scheduledAt: updatedLead.scheduled_at,
        rescheduleUrl,
        cancelUrl,
      });
    } catch (error) {
      console.warn("Reschedule email failed", error);
    }

    return jsonResponse({
      success: true,
      booking: {
        ...updatedLead,
        call_type_label: callTypeLabel,
      },
    });
  } catch (error) {
    console.error("reschedule-booking error", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
