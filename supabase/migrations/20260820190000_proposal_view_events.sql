CREATE TABLE public.proposal_view_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_slug TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  view_bucket TEXT NOT NULL,
  page_url TEXT NOT NULL,
  referrer TEXT,
  viewer_timezone TEXT,
  user_agent TEXT,
  city TEXT,
  region TEXT,
  country TEXT,
  notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (proposal_slug, visitor_hash, view_bucket)
);

ALTER TABLE public.proposal_view_events ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_proposal_view_events_created_at
ON public.proposal_view_events (created_at DESC);

CREATE INDEX idx_proposal_view_events_proposal_created
ON public.proposal_view_events (proposal_slug, created_at DESC);
