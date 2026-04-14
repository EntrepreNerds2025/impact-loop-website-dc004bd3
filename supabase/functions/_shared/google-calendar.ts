import { BUSINESS_TIMEZONE } from "./time.ts";

type ServiceAccount = {
  client_email: string;
  private_key: string;
  token_uri?: string;
};

const GOOGLE_SCOPE = "https://www.googleapis.com/auth/calendar";

const textEncoder = new TextEncoder();

const toBase64Url = (input: string | Uint8Array) => {
  const bytes =
    typeof input === "string" ? textEncoder.encode(input) : input;

  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

const fromPemPrivateKey = (pem: string) => {
  const normalized = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");

  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

const parseServiceAccount = (): ServiceAccount | null => {
  const raw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
  if (!raw) return null;

  const candidates = [raw];
  try {
    candidates.push(atob(raw));
  } catch {
    // no-op
  }

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as ServiceAccount;
      if (parsed.client_email && parsed.private_key) return parsed;
    } catch {
      // try next candidate
    }
  }

  return null;
};

const getAccessTokenWithRefresh = async () => {
  const refreshToken = Deno.env.get("GOOGLE_REFRESH_TOKEN");
  const clientId = Deno.env.get("GOOGLE_CLIENT_ID");
  const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");

  if (!refreshToken || !clientId || !clientSecret) return null;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data?.access_token) {
    throw new Error(`Google refresh token exchange failed: ${JSON.stringify(data)}`);
  }

  return data.access_token as string;
};

const getAccessTokenWithServiceAccount = async () => {
  const account = parseServiceAccount();
  if (!account) return null;

  const now = Math.floor(Date.now() / 1000);
  const tokenUri = account.token_uri || "https://oauth2.googleapis.com/token";

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: account.client_email,
    scope: GOOGLE_SCOPE,
    aud: tokenUri,
    iat: now,
    exp: now + 3600,
  };

  const signingInput = `${toBase64Url(JSON.stringify(header))}.${toBase64Url(
    JSON.stringify(payload),
  )}`;

  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    fromPemPrivateKey(account.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    textEncoder.encode(signingInput),
  );

  const assertion = `${signingInput}.${toBase64Url(new Uint8Array(signature))}`;

  const res = await fetch(tokenUri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data?.access_token) {
    throw new Error(`Google service account exchange failed: ${JSON.stringify(data)}`);
  }

  return data.access_token as string;
};

export const getGoogleAccessToken = async () => {
  const staticToken = Deno.env.get("GOOGLE_ACCESS_TOKEN");
  if (staticToken) return staticToken;

  const refreshTokenAccess = await getAccessTokenWithRefresh();
  if (refreshTokenAccess) return refreshTokenAccess;

  const serviceAccountAccess = await getAccessTokenWithServiceAccount();
  if (serviceAccountAccess) return serviceAccountAccess;

  throw new Error(
    "Google credentials not configured. Set GOOGLE_ACCESS_TOKEN, refresh token secrets, or GOOGLE_SERVICE_ACCOUNT_KEY.",
  );
};

const googleRequest = async (
  url: string,
  init: RequestInit = {},
) => {
  const accessToken = await getGoogleAccessToken();
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google API error [${res.status}]: ${text}`);
  }

  if (res.status === 204) return null;
  return await res.json();
};

export const getCalendarId = () =>
  Deno.env.get("GOOGLE_CALENDAR_ID") || "primary";

export const getCalendarBusyIntervals = async ({
  timeMin,
  timeMax,
  calendarId,
}: {
  timeMin: string;
  timeMax: string;
  calendarId?: string;
}) => {
  const targetCalendarId = calendarId || getCalendarId();
  const data = await googleRequest("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: BUSINESS_TIMEZONE,
      items: [{ id: targetCalendarId }],
    }),
  });

  const busy = data?.calendars?.[targetCalendarId]?.busy || [];
  return busy as Array<{ start: string; end: string }>;
};

export const createCalendarEvent = async ({
  summary,
  description,
  startUtc,
  endUtc,
  attendeeEmail,
  meetingLink,
  calendarId,
}: {
  summary: string;
  description: string;
  startUtc: string;
  endUtc: string;
  attendeeEmail?: string;
  meetingLink?: string | null;
  calendarId?: string;
}) => {
  const targetCalendarId = calendarId || getCalendarId();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    targetCalendarId,
  )}/events`;

  const payload = {
    summary,
    description,
    location: meetingLink || undefined,
    start: {
      dateTime: startUtc,
      timeZone: BUSINESS_TIMEZONE,
    },
    end: {
      dateTime: endUtc,
      timeZone: BUSINESS_TIMEZONE,
    },
    attendees: attendeeEmail ? [{ email: attendeeEmail }] : undefined,
  };

  const event = await googleRequest(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return event as { id: string; htmlLink?: string };
};

export const deleteCalendarEvent = async ({
  eventId,
  calendarId,
}: {
  eventId: string;
  calendarId?: string;
}) => {
  const targetCalendarId = calendarId || getCalendarId();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    targetCalendarId,
  )}/events/${encodeURIComponent(eventId)}`;

  try {
    await googleRequest(url, { method: "DELETE" });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("[404]")) return;
    throw error;
  }
};
