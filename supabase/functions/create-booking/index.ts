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
  getCalendarBusyIntervals,
} from "../_shared/google-calendar.ts";
import {
  sendBookingConfirmationEmail,
  sendBookingInternalNotification,
  syncBookingToCrm,
} from "../_shared/notifications.ts";

const getCallTypeLabel = (callType: string) =>
  CALL_TYPE_META[(callType as CallType) || "diagnostic"]?.label || "Impact Loop Call";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const bookingLeadId = String(body?.booking_lead_id || "").trim();
    const selectedSlot = String(body?.selected_slot || "").trim();
    if (!bookingLeadId || !selectedSlot) {
      return jsonResponse({ error: "booking_lead_id and selected_slot are required" }, 400);
    }

    const slotStartUtc = new Date(selectedSlot);
    if (Number.isNaN(slotStartUtc.getTime())) {
      return jsonResponse({ error: "selected_slot must be a valid ISO timestamp" }, 400);
    }

    const supabase = getServiceSupabaseClient();
    const { data: lead, error: leadError } = await supabase
      .from("booking_leads")
      .select(
        "id, full_name, email, organization, challenge_type, budget_range, referral_source, organization_website, call_type, call_duration_min, status, cancel_token",
      )
      .eq("id", bookingLeadId)
      .single();

    if (leadError || !lead) {
      return jsonResponse({ error: "Booking intake record not found" }, 404);
    }

    if (lead.status === "booked") {
      return jsonResponse({ error: "This lead is already booked" }, 409);
    }

    if (lead.status === "cancelled" || lead.status === "completed") {
      return jsonResponse({ error: "Booking cannot be created from this lead status" }, 400);
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

    const meetingLink =
      Deno.env.get("BOOKING_STATIC_MEETING_LINK") ||
      "https://zoom.us/j/0000000000";

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
      `Website: ${lead.organization_website || "Not provided"}`,
      "",
      "Booked via impactloop.ca custom scheduler.",
    ].join("\n");

    const event = await createCalendarEvent({
      summary,
      description,
      startUtc: slotStartUtc.toISOString(),
      endUtc: slotEndUtc.toISOString(),
      attendeeEmail: lead.email,
      meetingLink,
    });

    const { data: updatedLead, error: updateError } = await supabase
      .from("booking_leads")
      .update({
        scheduled_at: slotStartUtc.toISOString(),
        google_event_id: event.id,
        meeting_link: meetingLink,
        status: "booked",
      })
      .eq("id", lead.id)
      .select(
        "id, full_name, email, organization, challenge_type, budget_range, referral_source, call_type, call_duration_min, scheduled_at, cancel_token, meeting_link, status",
      )
      .single();

    if (updateError || !updatedLead) {
      // Handle unique index collisions on booked slot.
      const message = updateError?.message || "";
      if (message.toLowerCase().includes("uniq_booking_leads_booked_slot")) {
        return jsonResponse({ error: "Selected slot was just booked. Please choose another." }, 409);
      }
      throw updateError || new Error("Failed to update booking record.");
    }

    const siteUrl = Deno.env.get("SITE_URL") || "https://impactloop.ca";
    const rescheduleUrl = `${siteUrl}/booking/reschedule/${updatedLead.cancel_token}`;
    const cancelUrl = `${siteUrl}/booking/cancel/${updatedLead.cancel_token}`;

    const asyncWarnings: string[] = [];

    try {
      await sendBookingConfirmationEmail({
        fullName: updatedLead.full_name,
        email: updatedLead.email,
        callTypeLabel,
        scheduledAt: updatedLead.scheduled_at,
        meetingLink: updatedLead.meeting_link,
        rescheduleUrl,
        cancelUrl,
      });
    } catch (error) {
      console.warn("Booking confirmation email failed", error);
      asyncWarnings.push("Confirmation email failed.");
    }

    try {
      await sendBookingInternalNotification({
        fullName: updatedLead.full_name,
        email: updatedLead.email,
        organization: updatedLead.organization,
        challengeType: updatedLead.challenge_type,
        budgetRange: updatedLead.budget_range,
        referralSource: updatedLead.referral_source,
        callTypeLabel,
        scheduledAt: updatedLead.scheduled_at,
      });
    } catch (error) {
      console.warn("Internal booking notification failed", error);
      asyncWarnings.push("Internal notification failed.");
    }

    try {
      await syncBookingToCrm({
        firstName: updatedLead.full_name,
        email: updatedLead.email,
        companyName: updatedLead.organization,
        serviceInterest: `${callTypeLabel} Booking`,
        message: `Scheduled for ${updatedLead.scheduled_at}. Challenge: ${updatedLead.challenge_type}. Budget: ${updatedLead.budget_range || "Not provided"}. Source: ${updatedLead.referral_source || "Not provided"}.`,
      });
    } catch (error) {
      console.warn("CRM booking sync failed", error);
      asyncWarnings.push("CRM sync failed.");
    }

    return jsonResponse({
      success: true,
      booking: {
        id: updatedLead.id,
        full_name: updatedLead.full_name,
        email: updatedLead.email,
        organization: updatedLead.organization,
        call_type: updatedLead.call_type,
        call_type_label: callTypeLabel,
        call_duration_min: updatedLead.call_duration_min,
        challenge_type: updatedLead.challenge_type,
        scheduled_at: updatedLead.scheduled_at,
        cancel_token: updatedLead.cancel_token,
        meeting_link: updatedLead.meeting_link,
      },
      warnings: asyncWarnings,
    });
  } catch (error) {
    console.error("create-booking error", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
