
-- Create research_reports table
CREATE TABLE public.research_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cover_image TEXT NOT NULL,
  cover_label TEXT,
  pdf_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.research_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published reports" ON public.research_reports FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert reports" ON public.research_reports FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update reports" ON public.research_reports FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete reports" ON public.research_reports FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create research_leads table
CREATE TABLE public.research_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  report_slug TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.research_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead" ON public.research_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view leads" ON public.research_leads FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update leads" ON public.research_leads FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete leads" ON public.research_leads FOR DELETE USING (auth.uid() IS NOT NULL);

-- Seed the 7 reports
INSERT INTO public.research_reports (title, description, slug, cover_image, cover_label, sort_order) VALUES
('The Anti-Vanity Report 2026', 'Why impressions don''t equal impact. A guide to measuring what matters in social impact communications.', 'anti-vanity-report-2026', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'MEASUREMENT', 1),
('Culture vs. Counterfeit: The Nonprofit''s Guide to Authentic Storytelling', 'How organizations can tell real stories without extracting from the communities they serve.', 'culture-vs-counterfeit', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', 'STORYTELLING', 2),
('The Trust Effect: Rebuilding Stakeholder Confidence Through Media', 'A framework for using video, photography, and narrative to rebuild trust after organizational change.', 'trust-effect', 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80', 'TRUST', 3),
('Constellations Outlook: The Forces Shaping Impact Communications in 2026', 'Trends in nonprofit media, CSR reporting, and community-led storytelling.', 'constellations-outlook-2026', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', 'TRENDS', 4),
('Inside Modern Impact Reporting: Trust, Timing & Building Credibility', 'A deep dive into earned attention in the impact sector.', 'modern-impact-reporting', 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&q=80', 'CREDIBILITY', 5),
('Building a Story-First Strategy: A Guide for Nonprofits', 'How to shift from data-heavy reports to narrative-driven impact communications.', 'story-first-strategy', 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80', 'STRATEGY', 6),
('The Growing Power of Community-Led Media', 'Why the most credible impact stories come from the communities themselves.', 'community-led-media', 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80', 'COMMUNITY', 7);
