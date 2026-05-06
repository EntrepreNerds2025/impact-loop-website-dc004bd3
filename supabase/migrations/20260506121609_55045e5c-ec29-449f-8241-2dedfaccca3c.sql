CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS public.booking_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  challenge_type TEXT NOT NULL,
  budget_range TEXT,
  referral_source TEXT,
  organization_website TEXT,
  call_type TEXT NOT NULL CHECK (call_type IN ('diagnostic','workshop','pilot','strategy','story-capture','visibility','adapt-advisory')),
  call_duration_min INTEGER NOT NULL CHECK (call_duration_min > 0 AND call_duration_min <= 180),
  scheduled_at TIMESTAMPTZ,
  google_event_id TEXT,
  meeting_link TEXT,
  status TEXT NOT NULL DEFAULT 'intake_complete' CHECK (status IN ('intake_complete','booked','completed','cancelled','no_show')),
  cancel_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  pre_call_answers JSONB,
  reminder_sent_at TIMESTAMPTZ,
  brief_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT booked_requires_schedule CHECK ((status <> 'booked') OR (scheduled_at IS NOT NULL))
);

ALTER TABLE public.booking_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create booking intake" ON public.booking_leads;
CREATE POLICY "Anyone can create booking intake" ON public.booking_leads FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated users can view booking leads" ON public.booking_leads;
CREATE POLICY "Authenticated users can view booking leads" ON public.booking_leads FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated users can update booking leads" ON public.booking_leads;
CREATE POLICY "Authenticated users can update booking leads" ON public.booking_leads FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated users can delete booking leads" ON public.booking_leads;
CREATE POLICY "Authenticated users can delete booking leads" ON public.booking_leads FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_booking_leads_status_scheduled ON public.booking_leads (status, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_booking_leads_email ON public.booking_leads (email);
CREATE INDEX IF NOT EXISTS idx_booking_leads_cancel_token ON public.booking_leads (cancel_token);
CREATE UNIQUE INDEX IF NOT EXISTS uniq_booking_leads_booked_slot ON public.booking_leads (scheduled_at) WHERE status = 'booked' AND scheduled_at IS NOT NULL;

CREATE OR REPLACE FUNCTION public.update_booking_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS update_booking_leads_updated_at ON public.booking_leads;
CREATE TRIGGER update_booking_leads_updated_at
  BEFORE UPDATE ON public.booking_leads
  FOR EACH ROW EXECUTE FUNCTION public.update_booking_leads_updated_at();

CREATE TABLE IF NOT EXISTS public.sample_content_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL CHECK (organization_type IN ('Nonprofit','Foundation','Corporate Team','Small Business','Public Sector','Community Organization','Other')),
  website_or_social_link TEXT NOT NULL,
  visibility_goal TEXT NOT NULL,
  interested_in_ongoing_content_support BOOLEAN NOT NULL DEFAULT false,
  source TEXT NOT NULL DEFAULT 'impact_visibility_system_page',
  lead_magnet TEXT NOT NULL DEFAULT 'sample_content_pack',
  tags TEXT[] NOT NULL DEFAULT ARRAY['impact_visibility_sample_request','content_services_lead','impact_loop'],
  stage TEXT NOT NULL DEFAULT 'Sample Content Requested',
  status TEXT NOT NULL DEFAULT 'sample_requested' CHECK (status IN ('sample_requested','reviewing','generating_samples','samples_ready','email_sent','closed')),
  assigned_team_member TEXT,
  sample_pack_url TEXT,
  sample_pack_notes TEXT,
  generated_post_ideas TEXT,
  visual_prompt_notes TEXT,
  internal_notes TEXT,
  follow_up_email_status TEXT NOT NULL DEFAULT 'not_sent',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (email, organization_name, lead_magnet)
);

ALTER TABLE public.sample_content_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can request a sample content pack" ON public.sample_content_requests;
CREATE POLICY "Anyone can request a sample content pack" ON public.sample_content_requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated users can view sample content requests" ON public.sample_content_requests;
CREATE POLICY "Authenticated users can view sample content requests" ON public.sample_content_requests FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated users can update sample content requests" ON public.sample_content_requests;
CREATE POLICY "Authenticated users can update sample content requests" ON public.sample_content_requests FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated users can delete sample content requests" ON public.sample_content_requests;
CREATE POLICY "Authenticated users can delete sample content requests" ON public.sample_content_requests FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_sample_content_requests_status_created ON public.sample_content_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sample_content_requests_email ON public.sample_content_requests (email);

CREATE OR REPLACE FUNCTION public.update_sample_content_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS update_sample_content_requests_updated_at ON public.sample_content_requests;
CREATE TRIGGER update_sample_content_requests_updated_at
  BEFORE UPDATE ON public.sample_content_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_sample_content_requests_updated_at();