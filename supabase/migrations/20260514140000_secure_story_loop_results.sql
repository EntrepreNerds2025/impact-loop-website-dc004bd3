-- Tighten Story LOOP result access.
-- Public result pages now read through the get-story-loop-result Edge Function,
-- so the table no longer needs broad public SELECT access.

DROP POLICY IF EXISTS "Anyone can read a session by id" ON public.story_loop_sessions;

CREATE POLICY "Authenticated users can read Story LOOP sessions"
ON public.story_loop_sessions
FOR SELECT
USING (auth.role() = 'authenticated');
