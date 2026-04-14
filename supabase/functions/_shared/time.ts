export const BUSINESS_TIMEZONE = "America/Toronto";
export const BUSINESS_START_HOUR = 9;
export const BUSINESS_END_HOUR = 17;
export const BOOKING_WINDOW_DAYS = 14;
export const BUFFER_MINUTES = 15;
export const MIN_NOTICE_HOURS = 4;
export const SLOT_STEP_MINUTES = 15;

type DateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

const dateTimeFormatterCache = new Map<string, Intl.DateTimeFormat>();

const getDateTimeFormatter = (timeZone: string) => {
  const key = `${timeZone}:datetime`;
  if (!dateTimeFormatterCache.has(key)) {
    dateTimeFormatterCache.set(
      key,
      new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    );
  }
  return dateTimeFormatterCache.get(key)!;
};

const getPartsInTimeZone = (date: Date, timeZone: string): DateParts => {
  const formatter = getDateTimeFormatter(timeZone);
  const parts = formatter.formatToParts(date);
  const map = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
  };
};

const getTimeZoneOffsetMs = (date: Date, timeZone: string) => {
  const parts = getPartsInTimeZone(date, timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  return asUtc - date.getTime();
};

export const zonedDateTimeToUtc = (
  dateString: string,
  timeString: string,
  timeZone: string,
) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const [hour, minute] = timeString.split(":").map(Number);

  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const offset = getTimeZoneOffsetMs(utcGuess, timeZone);
  return new Date(utcGuess.getTime() - offset);
};

export const formatDateInTimeZone = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

export const formatTimeInTimeZone = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

export const formatWeekdayInTimeZone = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" }).format(date);

export const isWeekdayDateString = (dateString: string) => {
  const utc = new Date(`${dateString}T00:00:00Z`);
  const day = utc.getUTCDay();
  return day !== 0 && day !== 6;
};

export const enumerateDateStrings = (dateFrom: string, dateTo: string) => {
  const output: string[] = [];
  const start = new Date(`${dateFrom}T00:00:00Z`);
  const end = new Date(`${dateTo}T00:00:00Z`);

  for (
    let cursor = new Date(start);
    cursor.getTime() <= end.getTime();
    cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000)
  ) {
    output.push(cursor.toISOString().slice(0, 10));
  }

  return output;
};

export const addMinutes = (date: Date, minutes: number) =>
  new Date(date.getTime() + minutes * 60_000);

export const isWithinBookingWindow = (date: Date, now = new Date()) => {
  const limit = new Date(now.getTime() + BOOKING_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  return date.getTime() <= limit.getTime();
};
