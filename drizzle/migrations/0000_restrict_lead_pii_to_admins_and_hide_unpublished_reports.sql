-- 1. Admin role infrastructure
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2. booking_leads: admin-only read/update/delete
DROP POLICY IF EXISTS "Authenticated users can view booking leads" ON public.booking_leads;
DROP POLICY IF EXISTS "Authenticated users can update booking leads" ON public.booking_leads;
DROP POLICY IF EXISTS "Authenticated users can delete booking leads" ON public.booking_leads;

CREATE POLICY "Admins can view booking leads"
ON public.booking_leads FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update booking leads"
ON public.booking_leads FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete booking leads"
ON public.booking_leads FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. contact_submissions
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.contact_submissions;

CREATE POLICY "Admins can view submissions"
ON public.contact_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. research_leads
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.research_leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON public.research_leads;
DROP POLICY IF EXISTS "Authenticated users can delete leads" ON public.research_leads;

CREATE POLICY "Admins can view leads"
ON public.research_leads FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
ON public.research_leads FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
ON public.research_leads FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5. sample_content_requests
DROP POLICY IF EXISTS "Authenticated users can view sample content requests" ON public.sample_content_requests;
DROP POLICY IF EXISTS "Authenticated users can update sample content requests" ON public.sample_content_requests;
DROP POLICY IF EXISTS "Authenticated users can delete sample content requests" ON public.sample_content_requests;

CREATE POLICY "Admins can view sample content requests"
ON public.sample_content_requests FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sample content requests"
ON public.sample_content_requests FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete sample content requests"
ON public.sample_content_requests FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 6. research_reports: only published visible publicly
DROP POLICY IF EXISTS "Anyone can view published reports" ON public.research_reports;

CREATE POLICY "Anyone can view published reports"
ON public.research_reports FOR SELECT
USING (published = true);

CREATE POLICY "Admins can view all reports"
ON public.research_reports FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));