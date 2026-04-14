CREATE TABLE public.booking_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  challenge_type TEXT NOT NULL,
  budget_range TEXT,
  referral_source TEXT,
  organization_website TEXT,
  call_type TEXT NOT NULL CHECK (call_type IN ('diagnostic', 'workshop', 'pilot')),
  call_duration_min INTEGER NOT NULL CHECK (call_duration_min > 0 AND call_duration_min <= 180),
  scheduled_at TIMESTAMPTZ,
  google_event_id TEXT,
  meeting_link TEXT,
  status TEXT NOT NULL DEFAULT 'intake_complete' CHECK (status IN ('intake_complete', 'booked', 'completed', 'cancelled', 'no_show')),
  cancel_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  pre_call_answers JSONB,
  reminder_sent_at TIMESTAMPTZ,
  brief_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT booked_requires_schedule CHECK (
    (status <> 'booked') OR (scheduled_at IS NOT NULL)
  )
);

ALTER TABLE public.booking_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create booking intake"
ON public.booking_leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view booking leads"
ON public.booking_leads
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update booking leads"
ON public.booking_leads
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete booking leads"
ON public.booking_leads
FOR DELETE
USING (auth.role() = 'authenticated');

CREATE INDEX idx_booking_leads_status_scheduled
ON public.booking_leads (status, scheduled_at);

CREATE INDEX idx_booking_leads_email
ON public.booking_leads (email);

CREATE INDEX idx_booking_leads_cancel_token
ON public.booking_leads (cancel_token);

CREATE UNIQUE INDEX uniq_booking_leads_booked_slot
ON public.booking_leads (scheduled_at)
WHERE status = 'booked' AND scheduled_at IS NOT NULL;

CREATE OR REPLACE FUNCTION public.update_booking_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_booking_leads_updated_at
  BEFORE UPDATE ON public.booking_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_booking_leads_updated_at();
