-- Story LOOP sessions. One row per intake submission. Public read by ID, anon insert.
-- See: src/pages/StoryLoop.tsx and supabase/functions/generate-story-loop

CREATE TABLE public.story_loop_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Path branching
  path TEXT NOT NULL CHECK (path IN ('nonprofit', 'business', 'founder')),
  mode TEXT NOT NULL DEFAULT 'full' CHECK (mode IN ('starter', 'full')),

  -- Stage 1 inputs (always present)
  org_name TEXT NOT NULL,
  org_type TEXT,
  who_served TEXT NOT NULL,
  mission TEXT,
  story_focus TEXT NOT NULL,
  why_now TEXT NOT NULL,
  stakes TEXT,

  -- Contact captured at checkpoint
  contact_name TEXT NOT NULL,
  contact_role TEXT,
  contact_email TEXT NOT NULL,
  allow_followup BOOLEAN NOT NULL DEFAULT false,

  -- Stage 2 inputs (only present for full mode)
  has_person TEXT CHECK (has_person IN ('yes', 'no', 'composite') OR has_person IS NULL),
  person_before TEXT,
  person_after TEXT,
  primary_audience TEXT,
  use_channels TEXT[],
  existing_assets TEXT,
  voice_notes TEXT,

  -- Output
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'complete', 'failed')),
  output JSONB,
  error TEXT,

  -- Audit
  source TEXT NOT NULL DEFAULT 'loop_tool',
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_story_loop_sessions_email ON public.story_loop_sessions (contact_email);
CREATE INDEX idx_story_loop_sessions_created_at ON public.story_loop_sessions (created_at DESC);
CREATE INDEX idx_story_loop_sessions_status ON public.story_loop_sessions (status);

ALTER TABLE public.story_loop_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a new session (the intake form)
CREATE POLICY "Anyone can start a Story LOOP session"
ON public.story_loop_sessions
FOR INSERT
WITH CHECK (true);

-- Anyone can read a session by its ID (the public result link is private-by-obscurity via UUID)
CREATE POLICY "Anyone can read a session by id"
ON public.story_loop_sessions
FOR SELECT
USING (true);

-- Authenticated team members can manage sessions
CREATE POLICY "Authenticated users can update sessions"
ON public.story_loop_sessions
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete sessions"
ON public.story_loop_sessions
FOR DELETE
USING (auth.role() = 'authenticated');
