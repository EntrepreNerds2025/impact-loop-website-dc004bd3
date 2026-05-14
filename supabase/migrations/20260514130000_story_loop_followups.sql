-- Follow-up tracking on story_loop_sessions.
-- Drives the loop-followup-sweep edge function which runs daily.

ALTER TABLE public.story_loop_sessions
  ADD COLUMN IF NOT EXISTS followup_day3_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS followup_day10_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS followup_day21_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS followup_unsubscribed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS lead_status TEXT NOT NULL DEFAULT 'new' CHECK (
    lead_status IN ('new', 'contacted', 'meeting_booked', 'qualified', 'converted', 'lost', 'unqualified')
  ),
  ADD COLUMN IF NOT EXISTS lead_notes TEXT;

CREATE INDEX IF NOT EXISTS idx_story_loop_sessions_lead_status
  ON public.story_loop_sessions (lead_status);
CREATE INDEX IF NOT EXISTS idx_story_loop_sessions_followup_due
  ON public.story_loop_sessions (created_at)
  WHERE status = 'complete' AND followup_unsubscribed_at IS NULL;

-- pg_cron schedule for daily follow-up sweep at 14:00 UTC (10am ET / 7am PT).
-- Replace YOUR_PROJECT_REF and YOUR_SERVICE_ROLE_KEY then run manually once in the SQL editor.
--
-- select cron.schedule(
--   'loop-followup-daily',
--   '0 14 * * *',
--   $$
--   select net.http_post(
--     url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/loop-followup-sweep',
--     headers := '{"Content-Type":"application/json","Authorization":"Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
--     body := '{}'::jsonb
--   )
--   $$
-- );
