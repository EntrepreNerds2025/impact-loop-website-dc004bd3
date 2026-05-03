import {
  addMinutes,
  BUFFER_MINUTES,
  BUSINESS_END_HOUR,
  BUSINESS_START_HOUR,
  BUSINESS_TIMEZONE,
  formatDateInTimeZone,
  formatTimeInTimeZone,
  formatWeekdayInTimeZone,
  isWeekdayDateString,
  isWithinBookingWindow,
  MIN_NOTICE_HOURS,
  SLOT_STEP_MINUTES,
  zonedDateTimeToUtc,
  enumerateDateStrings,
} from "./time.ts";

export type CallType =
  | "strategy"
  | "story-capture"
  | "visibility"
  | "adapt-advisory"
  | "diagnostic"
  | "workshop"
  | "pilot";

export const CALL_TYPE_META: Record<
  CallType,
  { label: string; durationMinutes: number }
> = {
  strategy: { label: "Impact Strategy Call", durationMinutes: 45 },
  "story-capture": { label: "Story Capture Call", durationMinutes: 45 },
  visibility: { label: "Visibility System Call", durationMinutes: 45 },
  "adapt-advisory": { label: "ADAPT Advisory Call", durationMinutes: 60 },
  diagnostic: { label: "Storytelling Diagnostic", durationMinutes: 45 },
  workshop: { label: "Workshop Discovery Call", durationMinutes: 30 },
  pilot: { label: "System Pilot Call", durationMinutes: 45 },
};

export type BusyInterval = { start: Date; end: Date };

export type AvailabilitySlot = {
  start: string;
  end: string;
  start_utc: string;
  end_utc: string;
};

export type AvailabilityDay = {
  date: string;
  slots: AvailabilitySlot[];
};

export const parseBusyIntervals = (
  intervals: Array<{ start: string; end: string }>,
) =>
  intervals
    .map((item) => ({ start: new Date(item.start), end: new Date(item.end) }))
    .filter((item) => !Number.isNaN(item.start.getTime()) && !Number.isNaN(item.end.getTime()))
    .filter((item) => item.end.getTime() > item.start.getTime());

const normalizeIntervals = (intervals: BusyInterval[]) =>
  intervals
    .map((item) => ({
      start: addMinutes(item.start, -BUFFER_MINUTES),
      end: addMinutes(item.end, BUFFER_MINUTES),
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

const overlaps = (startA: Date, endA: Date, startB: Date, endB: Date) =>
  startA.getTime() < endB.getTime() && endA.getTime() > startB.getTime();

const isWeekdaySlot = (slotStartUtc: Date) => {
  const weekday = formatWeekdayInTimeZone(slotStartUtc, BUSINESS_TIMEZONE);
  return weekday !== "Sat" && weekday !== "Sun";
};

const isWithinBusinessHours = (slotStartUtc: Date, slotEndUtc: Date) => {
  const dayKey = formatDateInTimeZone(slotStartUtc, BUSINESS_TIMEZONE);
  const businessStartUtc = zonedDateTimeToUtc(
    dayKey,
    `${String(BUSINESS_START_HOUR).padStart(2, "0")}:00`,
    BUSINESS_TIMEZONE,
  );
  const businessEndUtc = zonedDateTimeToUtc(
    dayKey,
    `${String(BUSINESS_END_HOUR).padStart(2, "0")}:00`,
    BUSINESS_TIMEZONE,
  );

  return (
    slotStartUtc.getTime() >= businessStartUtc.getTime() &&
    slotEndUtc.getTime() <= businessEndUtc.getTime()
  );
};

export const isSlotAvailable = ({
  slotStartUtc,
  durationMinutes,
  busyIntervals,
  now = new Date(),
}: {
  slotStartUtc: Date;
  durationMinutes: number;
  busyIntervals: BusyInterval[];
  now?: Date;
}) => {
  if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) return false;
  if (!isWeekdaySlot(slotStartUtc)) return false;

  const slotEndUtc = addMinutes(slotStartUtc, durationMinutes);
  if (!isWithinBusinessHours(slotStartUtc, slotEndUtc)) return false;
  if (!isWithinBookingWindow(slotStartUtc, now)) return false;

  const minNoticeCutoff = addMinutes(now, MIN_NOTICE_HOURS * 60);
  if (slotStartUtc.getTime() < minNoticeCutoff.getTime()) return false;

  const normalized = normalizeIntervals(busyIntervals);
  const conflict = normalized.some((interval) =>
    overlaps(slotStartUtc, slotEndUtc, interval.start, interval.end),
  );

  return !conflict;
};

export const generateAvailability = ({
  dateFrom,
  dateTo,
  durationMinutes,
  busyIntervals,
  now = new Date(),
}: {
  dateFrom: string;
  dateTo: string;
  durationMinutes: number;
  busyIntervals: BusyInterval[];
  now?: Date;
}): AvailabilityDay[] => {
  const dates = enumerateDateStrings(dateFrom, dateTo).filter(isWeekdayDateString);
  const output: AvailabilityDay[] = [];

  for (const dayKey of dates) {
    const businessStartUtc = zonedDateTimeToUtc(
      dayKey,
      `${String(BUSINESS_START_HOUR).padStart(2, "0")}:00`,
      BUSINESS_TIMEZONE,
    );
    const businessEndUtc = zonedDateTimeToUtc(
      dayKey,
      `${String(BUSINESS_END_HOUR).padStart(2, "0")}:00`,
      BUSINESS_TIMEZONE,
    );

    const slots: AvailabilitySlot[] = [];
    for (
      let cursor = new Date(businessStartUtc);
      cursor.getTime() < businessEndUtc.getTime();
      cursor = addMinutes(cursor, SLOT_STEP_MINUTES)
    ) {
      const slotStartUtc = new Date(cursor);
      const slotEndUtc = addMinutes(slotStartUtc, durationMinutes);
      if (slotEndUtc.getTime() > businessEndUtc.getTime()) continue;

      const available = isSlotAvailable({
        slotStartUtc,
        durationMinutes,
        busyIntervals,
        now,
      });
      if (!available) continue;

      slots.push({
        start: formatTimeInTimeZone(slotStartUtc, BUSINESS_TIMEZONE),
        end: formatTimeInTimeZone(slotEndUtc, BUSINESS_TIMEZONE),
        start_utc: slotStartUtc.toISOString(),
        end_utc: slotEndUtc.toISOString(),
      });
    }

    output.push({ date: dayKey, slots });
  }

  return output;
};

export const bookingToBusyInterval = (
  scheduledAtIso: string,
  durationMinutes: number,
): BusyInterval => {
  const start = new Date(scheduledAtIso);
  const end = addMinutes(start, durationMinutes);
  return { start, end };
};
