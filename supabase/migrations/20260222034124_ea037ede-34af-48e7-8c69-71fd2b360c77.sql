
-- Create hub_photos table
CREATE TABLE public.hub_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hub_slug TEXT NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hub_photos ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Anyone can view hub photos"
  ON public.hub_photos
  FOR SELECT
  USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated users can insert hub photos"
  ON public.hub_photos
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update
CREATE POLICY "Authenticated users can update hub photos"
  ON public.hub_photos
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can delete
CREATE POLICY "Authenticated users can delete hub photos"
  ON public.hub_photos
  FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create index on hub_slug for faster filtering
CREATE INDEX idx_hub_photos_slug ON public.hub_photos (hub_slug);

-- Create hub-photos storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('hub-photos', 'hub-photos', true);

-- Storage: public read
CREATE POLICY "Anyone can view hub photos storage"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'hub-photos');

-- Storage: authenticated upload
CREATE POLICY "Authenticated users can upload hub photos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'hub-photos' AND auth.uid() IS NOT NULL);

-- Storage: authenticated delete
CREATE POLICY "Authenticated users can delete hub photos storage"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'hub-photos' AND auth.uid() IS NOT NULL);
