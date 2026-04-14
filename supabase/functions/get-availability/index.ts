import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import {
  BOOKING_WINDOW_DAYS,
  BUSINESS_TIMEZONE,
  formatDateInTimeZone,
  zonedDateTimeToUtc,
} from "../_shared/time.ts";
import {
  bookingToBusyInterval,
  generateAvailability,
  parseBusyIntervals,
} from "../_shared/booking.ts";
import { getServiceSupabaseClient } from "../_shared/supabase.ts";
import { getCalendarBusyIntervals } from "../_shared/google-calendar.ts";

const responseCache = new Map<string, { expiresAt: number; payload: unknown }>();

const isIsoDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

const toDateInBusinessTimeZone = (date: Date) =>
  formatDateInTimeZone(date, BUSINESS_TIMEZONE);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const durationMinutes = Number(body?.duration_minutes || 45);
    if (!Number.isFinite(durationMinutes) || durationMinutes <= 0 || durationMinutes > 120) {
      return jsonResponse({ error: "Invalid duration_minutes" }, 400);
    }

    const today = new Date();
    const defaultFrom = toDateInBusinessTimeZone(today);
    const defaultTo = toDateInBusinessTimeZone(
      new Date(today.getTime() + (BOOKING_WINDOW_DAYS - 1) * 24 * 60 * 60 * 1000),
    );

    const dateFrom = String(body?.date_from || defaultFrom);
    const dateTo = String(body?.date_to || defaultTo);

    if (!isIsoDate(dateFrom) || !isIsoDate(dateTo)) {
      return jsonResponse({ error: "date_from and date_to must be YYYY-MM-DD" }, 400);
    }

    const cacheKey = `${dateFrom}:${dateTo}:${durationMinutes}`;
    const cached = responseCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return jsonResponse(cached.payload);
    }

    const timeMin = zonedDateTimeToUtc(dateFrom, "00:00", BUSINESS_TIMEZONE).toISOString();
    const timeMax = zonedDateTimeToUtc(dateTo, "23:59", BUSINESS_TIMEZONE).toISOString();

    const [googleBusy, dbResult] = await Promise.all([
      getCalendarBusyIntervals({ timeMin, timeMax }),
      getServiceSupabaseClient()
        .from("booking_leads")
        .select("scheduled_at, call_duration_min, status")
        .eq("status", "booked")
        .gte("scheduled_at", timeMin)
        .lte("scheduled_at", timeMax),
    ]);

    if (dbResult.error) {
      throw dbResult.error;
    }

    const dbBusy = (dbResult.data || [])
      .filter((row) => row.scheduled_at)
      .map((row) => bookingToBusyInterval(row.scheduled_at as string, row.call_duration_min || 45))
      .map((interval) => ({
        start: interval.start.toISOString(),
        end: interval.end.toISOString(),
      }));

    const busyIntervals = [
      ...parseBusyIntervals(googleBusy),
      ...parseBusyIntervals(dbBusy),
    ];

    const availability = generateAvailability({
      dateFrom,
      dateTo,
      durationMinutes,
      busyIntervals,
    });

    const payload = {
      timezone: BUSINESS_TIMEZONE,
      duration_minutes: durationMinutes,
      date_from: dateFrom,
      date_to: dateTo,
      availability,
    };

    responseCache.set(cacheKey, {
      expiresAt: Date.now() + 60_000,
      payload,
    });

    return jsonResponse(payload, 200);
  } catch (error) {
    console.error("get-availability error", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
