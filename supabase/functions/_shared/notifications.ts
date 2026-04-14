import { BUSINESS_TIMEZONE } from "./time.ts";

const DEFAULT_FROM = "Impact Loop <onboarding@resend.dev>";
const INTERNAL_EMAIL = Deno.env.get("BOOKING_INTERNAL_EMAIL") || "rovonn@impactloop.ca";
const CRM_ENDPOINT =
  Deno.env.get("CRM_RECEIVE_INQUIRY_URL") ||
  "https://oyjbpxdcazamsdtrrmey.supabase.co/functions/v1/receive-inquiry";
const CRM_API_KEY =
  Deno.env.get("CRM_API_KEY") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95amJweGRjYXphbXNkdHJybWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjM0MTgsImV4cCI6MjA4Nzc5OTQxOH0.n-j0RqwqckV3kisVL-JnjDx84AEOGUKY6SWxnLFUjmE";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const sendEmail = async ({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) => {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY is missing; skipping email send.");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: Deno.env.get("BOOKING_EMAIL_FROM") || DEFAULT_FROM,
      to,
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error [${res.status}]: ${text}`);
  }
};

export const formatBookingDateTime = (isoDateTime: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIMEZONE,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(isoDateTime));

export const sendBookingConfirmationEmail = async ({
  fullName,
  email,
  callTypeLabel,
  scheduledAt,
  meetingLink,
  rescheduleUrl,
  cancelUrl,
}: {
  fullName: string;
  email: string;
  callTypeLabel: string;
  scheduledAt: string;
  meetingLink?: string | null;
  rescheduleUrl: string;
  cancelUrl: string;
}) => {
  const when = formatBookingDateTime(scheduledAt);
  await sendEmail({
    to: email,
    subject: "Your call with Impact Loop is confirmed",
    replyTo: INTERNAL_EMAIL,
    html: `
      <h2>You're booked, ${escapeHtml(fullName)}.</h2>
      <p>Your <strong>${escapeHtml(callTypeLabel)}</strong> is confirmed for:</p>
      <p><strong>${escapeHtml(when)}</strong></p>
      ${
        meetingLink
          ? `<p>Meeting link: <a href="${meetingLink}">${meetingLink}</a></p>`
          : "<p>Rovonn will share your meeting details ahead of your call.</p>"
      }
      <p>If you need to adjust your time:</p>
      <ul>
        <li><a href="${rescheduleUrl}">Reschedule</a></li>
        <li><a href="${cancelUrl}">Cancel</a></li>
      </ul>
      <p>Looking forward to speaking with you.</p>
      <p>Impact Loop</p>
    `,
  });
};

export const sendBookingInternalNotification = async ({
  fullName,
  email,
  organization,
  challengeType,
  budgetRange,
  referralSource,
  callTypeLabel,
  scheduledAt,
}: {
  fullName: string;
  email: string;
  organization: string;
  challengeType: string;
  budgetRange?: string | null;
  referralSource?: string | null;
  callTypeLabel: string;
  scheduledAt: string;
}) => {
  const when = formatBookingDateTime(scheduledAt);
  await sendEmail({
    to: INTERNAL_EMAIL,
    subject: `New booking: ${callTypeLabel} - ${fullName}`,
    replyTo: email,
    html: `
      <h2>New booking confirmed</h2>
      <table style="border-collapse:collapse;width:100%;max-width:700px;">
        <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Name</td><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(fullName)}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Email</td><td style="border:1px solid #ddd;padding:8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Organization</td><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(organization)}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Call Type</td><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(callTypeLabel)}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Time</td><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(when)}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Challenge</td><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(challengeType)}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Budget</td><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(budgetRange || "Not provided")}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Referral</td><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(referralSource || "Not provided")}</td></tr>
      </table>
    `,
  });
};

export const sendCancellationEmail = async ({
  fullName,
  email,
  callTypeLabel,
}: {
  fullName: string;
  email: string;
  callTypeLabel: string;
}) => {
  await sendEmail({
    to: email,
    subject: "Your Impact Loop call was cancelled",
    replyTo: INTERNAL_EMAIL,
    html: `
      <h2>Hi ${escapeHtml(fullName)},</h2>
      <p>Your <strong>${escapeHtml(callTypeLabel)}</strong> has been cancelled.</p>
      <p>If you'd like to book a new time, visit <a href="https://impactloop.ca/bookings">impactloop.ca/bookings</a>.</p>
    `,
  });
};

export const sendRescheduleEmail = async ({
  fullName,
  email,
  callTypeLabel,
  scheduledAt,
  rescheduleUrl,
  cancelUrl,
}: {
  fullName: string;
  email: string;
  callTypeLabel: string;
  scheduledAt: string;
  rescheduleUrl: string;
  cancelUrl: string;
}) => {
  const when = formatBookingDateTime(scheduledAt);
  await sendEmail({
    to: email,
    subject: "Your Impact Loop call has been rescheduled",
    replyTo: INTERNAL_EMAIL,
    html: `
      <h2>Hi ${escapeHtml(fullName)},</h2>
      <p>Your <strong>${escapeHtml(callTypeLabel)}</strong> is now scheduled for <strong>${escapeHtml(when)}</strong>.</p>
      <ul>
        <li><a href="${rescheduleUrl}">Reschedule again</a></li>
        <li><a href="${cancelUrl}">Cancel booking</a></li>
      </ul>
    `,
  });
};

export const sendPreCallEmail = async ({
  fullName,
  email,
  scheduledAt,
  prepLink,
}: {
  fullName: string;
  email: string;
  scheduledAt: string;
  prepLink: string;
}) => {
  const when = formatBookingDateTime(scheduledAt);
  await sendEmail({
    to: email,
    subject: "Quick prep for your call with Rovonn tomorrow",
    replyTo: INTERNAL_EMAIL,
    html: `
      <h2>Hi ${escapeHtml(fullName)},</h2>
      <p>Looking forward to speaking with you on <strong>${escapeHtml(when)}</strong>.</p>
      <p>If useful, share a few prep notes here:</p>
      <p><a href="${prepLink}">${prepLink}</a></p>
      <p>Optional prompts:</p>
      <ul>
        <li>What does a successful outcome look like this year?</li>
        <li>Who are the key stakeholders your story needs to reach?</li>
        <li>Is there a deadline or event driving timeline?</li>
      </ul>
    `,
  });
};

export const sendPreCallBrief = async ({
  summaryHtml,
}: {
  summaryHtml: string;
}) => {
  await sendEmail({
    to: INTERNAL_EMAIL,
    subject: "Pre-call brief: upcoming Impact Loop booking",
    html: summaryHtml,
  });
};

export const syncBookingToCrm = async ({
  firstName,
  email,
  companyName,
  serviceInterest,
  message,
}: {
  firstName: string;
  email: string;
  companyName?: string;
  serviceInterest: string;
  message: string;
}) => {
  const res = await fetch(CRM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: CRM_API_KEY,
    },
    body: JSON.stringify({
      first_name: firstName,
      email,
      company_name: companyName,
      service_interest: serviceInterest,
      message,
      business_unit: "impact_loop",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CRM sync failed [${res.status}]: ${text}`);
  }
};
