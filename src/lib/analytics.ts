/**
 * First-party analytics — pageviews, UTM attribution, and named events written
 * to the site's own Supabase (`site_events`). No third-party scripts, no
 * cookies, no PII: a random per-browser id, paths, and UTM tags only.
 * Respects Do Not Track. Plausible/GA can be layered on later without
 * touching call sites (trackEvent fans out via lib/booking's trackBookingEvent).
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const VID_KEY = "il-vid";
const UTM_KEY = "il-utm";

const dnt = () =>
  typeof navigator !== "undefined" &&
  (navigator.doNotTrack === "1" || (window as any).doNotTrack === "1");

function visitorId(): string {
  try {
    let v = localStorage.getItem(VID_KEY);
    if (!v) {
      v = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(VID_KEY, v);
    }
    return v;
  } catch {
    return "anon";
  }
}

/** Capture utm_* params once per session so later events keep attribution. */
function currentUtm(search: string): Record<string, string> {
  try {
    const params = new URLSearchParams(search);
    const fresh: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = params.get(k);
      if (v) fresh[k] = v.slice(0, 120);
    }
    if (Object.keys(fresh).length > 0) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(fresh));
      return fresh;
    }
    return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function trackEvent(event: string, props: Record<string, unknown> = {}): void {
  if (dnt()) return;
  try {
    void supabase
      .from("site_events" as any)
      .insert({
        event,
        path: window.location.pathname,
        referrer: document.referrer ? document.referrer.slice(0, 300) : null,
        utm: currentUtm(window.location.search),
        props,
        visitor: visitorId(),
      })
      .then(() => undefined);
  } catch {
    /* analytics must never break the site */
  }
}

/** Mount once inside the router: logs a pageview on every route change. */
export function AnalyticsTracker(): null {
  const location = useLocation();
  useEffect(() => {
    if (dnt()) return;
    try {
      void supabase
        .from("site_events" as any)
        .insert({
          event: "pageview",
          path: location.pathname,
          referrer: document.referrer ? document.referrer.slice(0, 300) : null,
          utm: currentUtm(location.search),
          props: {},
          visitor: visitorId(),
        })
        .then(() => undefined);
    } catch {
      /* never break the site */
    }
  }, [location.pathname, location.search]);
  return null;
}
