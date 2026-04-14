import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
  formatBookingDateTime,
  getCaseStudyForChallenge,
  getCallTypeConfig,
  normalizeCallType,
} from "@/lib/booking";
import rovonnAvatar from "@/assets/founder/rovonn-avatar.png";

const escapeIcsText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

const toIcsUtc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

const downloadIcs = ({
  callTypeLabel,
  scheduledAt,
  durationMinutes,
  meetingLink,
}: {
  callTypeLabel: string;
  scheduledAt: string;
  durationMinutes: number;
  meetingLink?: string;
}) => {
  const start = new Date(scheduledAt);
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const uid = `impact-loop-${start.getTime()}@impactloop.ca`;

  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Impact Loop//Smart Booking//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsUtc(new Date().toISOString())}`,
    `DTSTART:${toIcsUtc(start.toISOString())}`,
    `DTEND:${toIcsUtc(end.toISOString())}`,
    `SUMMARY:${escapeIcsText(`Impact Loop - ${callTypeLabel}`)}`,
    `DESCRIPTION:${escapeIcsText("Your booking with Impact Loop is confirmed.")}`,
    `LOCATION:${escapeIcsText(meetingLink || "Impact Loop will share meeting details by email.")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "impact-loop-booking.ics";
  anchor.click();
  URL.revokeObjectURL(url);
};

const BookingConfirmed = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const scheduled = searchParams.get("scheduled") || "";
  const callType = normalizeCallType(searchParams.get("callType"));
  const callTypeLabel = searchParams.get("callTypeLabel") || getCallTypeConfig(callType || "diagnostic").title;
  const challengeType = searchParams.get("challenge") || "Something else";
  const meetingLink = searchParams.get("meeting") || "";
  const fullName = searchParams.get("name") || "there";

  const durationMinutes = getCallTypeConfig(callType || "diagnostic").durationMinutes;
  const caseStudy = getCaseStudyForChallenge(challengeType);
  const hasSchedule = Boolean(scheduled);

  const formattedDateTime = useMemo(
    () => (hasSchedule ? formatBookingDateTime(scheduled) : ""),
    [hasSchedule, scheduled],
  );

  return (
    <Layout>
      <section className="pt-32 pb-14 section-dark">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-impact-blue uppercase tracking-widest text-xs mb-4">Booking Confirmed</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-5">
            You're booked.
          </h1>
          {hasSchedule ? (
            <p className="text-white/70 text-lg">
              {fullName}, your <strong>{callTypeLabel}</strong> is scheduled for{" "}
              <strong>{formattedDateTime}</strong>.
            </p>
          ) : (
            <p className="text-white/70 text-lg">
              Your booking has been received. Confirmation details are on the way.
            </p>
          )}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="font-serif text-3xl text-foreground mb-3">Before your call</h2>
              <p className="text-muted-foreground mb-4">
                Based on your intake, this case study is a strong fit to review before we speak:
              </p>
              <Link to={caseStudy.href} className="btn-primary inline-flex">
                View: {caseStudy.title}
              </Link>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h2 className="font-serif text-3xl text-foreground mb-4">What to Expect</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-impact-blue mb-1">Step 1</p>
                  <h3 className="font-semibold text-foreground mb-1">We Listen</h3>
                  <p className="text-sm text-muted-foreground">We start with your real context and constraints.</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-impact-blue mb-1">Step 2</p>
                  <h3 className="font-semibold text-foreground mb-1">We Explore</h3>
                  <p className="text-sm text-muted-foreground">We pressure-test options and identify leverage points.</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-impact-blue mb-1">Step 3</p>
                  <h3 className="font-semibold text-foreground mb-1">We Recommend</h3>
                  <p className="text-sm text-muted-foreground">You leave with a practical path forward.</p>
                </div>
              </div>
            </div>

            {hasSchedule && (
              <div className="border border-border rounded-lg p-6">
                <h2 className="font-serif text-3xl text-foreground mb-4">Manage your booking</h2>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      downloadIcs({
                        callTypeLabel,
                        scheduledAt: scheduled,
                        durationMinutes,
                        meetingLink,
                      })
                    }
                    className="btn-secondary"
                  >
                    Download .ics
                  </button>
                  {token && (
                    <>
                      <Link to={`/booking/reschedule/${token}`} className="btn-secondary">
                        Reschedule
                      </Link>
                      <Link to={`/booking/cancel/${token}`} className="btn-secondary">
                        Cancel
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="border border-border rounded-lg p-6 bg-muted/30 h-fit">
            <img
              src={rovonnAvatar}
              alt="Rovonn Russell"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="font-serif text-2xl text-foreground mb-2">Rovonn Russell</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Founder and Storytelling Director at Impact Loop.
            </p>
            <p className="text-sm text-muted-foreground">
              This call is designed to give you clarity quickly and map the highest-leverage next move.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookingConfirmed;
