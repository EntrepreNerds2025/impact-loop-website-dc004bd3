CREATE TABLE public.sample_content_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL CHECK (
    organization_type IN (
      'Nonprofit',
      'Foundation',
      'Corporate Team',
      'Small Business',
      'Public Sector',
      'Community Organization',
      'Other'
    )
  ),
  website_or_social_link TEXT NOT NULL,
  visibility_goal TEXT NOT NULL,
  interested_in_ongoing_content_support BOOLEAN NOT NULL DEFAULT false,
  source TEXT NOT NULL DEFAULT 'impact_visibility_system_page',
  lead_magnet TEXT NOT NULL DEFAULT 'sample_content_pack',
  tags TEXT[] NOT NULL DEFAULT ARRAY[
    'impact_visibility_sample_request',
    'content_services_lead',
    'impact_loop'
  ],
  stage TEXT NOT NULL DEFAULT 'Sample Content Requested',
  status TEXT NOT NULL DEFAULT 'sample_requested' CHECK (
    status IN (
      'sample_requested',
      'reviewing',
      'generating_samples',
      'samples_ready',
      'email_sent',
      'closed'
    )
  ),
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

CREATE POLICY "Anyone can request a sample content pack"
ON public.sample_content_requests
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view sample content requests"
ON public.sample_content_requests
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update sample content requests"
ON public.sample_content_requests
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete sample content requests"
ON public.sample_content_requests
FOR DELETE
USING (auth.role() = 'authenticated');

CREATE INDEX idx_sample_content_requests_status_created
ON public.sample_content_requests (status, created_at DESC);

CREATE INDEX idx_sample_content_requests_email
ON public.sample_content_requests (email);

CREATE OR REPLACE FUNCTION public.update_sample_content_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_sample_content_requests_updated_at
  BEFORE UPDATE ON public.sample_content_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_sample_content_requests_updated_at();
