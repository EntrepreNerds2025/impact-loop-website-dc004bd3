-- Impact Loop Nonprofit Growth Study — application submissions
CREATE TABLE public.growth_study_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  role TEXT,
  email TEXT NOT NULL,
  website TEXT,
  social_link TEXT,
  organization_type TEXT NOT NULL,
  community_served TEXT NOT NULL,
  biggest_challenge TEXT NOT NULL,
  value_goal TEXT,
  consent_public BOOLEAN NOT NULL DEFAULT false,
  consent_contact BOOLEAN NOT NULL DEFAULT false,
  consent_case_study BOOLEAN NOT NULL DEFAULT false,
  source TEXT NOT NULL DEFAULT 'nonprofit_growth_study_page',
  lead_magnet TEXT NOT NULL DEFAULT 'nonprofit_growth_study',
  tags TEXT[] NOT NULL DEFAULT ARRAY[
    'nonprofit_growth_study',
    'research_initiative_lead',
    'impact_loop'
  ],
  stage TEXT NOT NULL DEFAULT 'Study Application Received',
  status TEXT NOT NULL DEFAULT 'applied' CHECK (
    status IN (
      'applied',
      'reviewing',
      'accepted',
      'review_in_progress',
      'insight_delivered',
      'case_study_candidate',
      'closed'
    )
  ),
  assigned_team_member TEXT,
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.growth_study_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply to the growth study"
ON public.growth_study_applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view growth study applications"
ON public.growth_study_applications
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update growth study applications"
ON public.growth_study_applications
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete growth study applications"
ON public.growth_study_applications
FOR DELETE
USING (auth.role() = 'authenticated');

CREATE INDEX idx_growth_study_applications_status_created
ON public.growth_study_applications (status, created_at DESC);

CREATE INDEX idx_growth_study_applications_email
ON public.growth_study_applications (email);

CREATE OR REPLACE FUNCTION public.update_growth_study_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_growth_study_applications_updated_at
  BEFORE UPDATE ON public.growth_study_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_growth_study_applications_updated_at();
