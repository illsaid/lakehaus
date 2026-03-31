/*
  # Create article-images Storage Bucket

  ## Summary
  Creates a public Supabase Storage bucket for article hero images uploaded
  through the admin CMS, with appropriate RLS policies.

  ## Changes
  - New bucket: `article-images` (public)
  - Policy: Anyone can read (GET) objects — needed for public image URLs
  - Policy: Authenticated users can upload (INSERT) objects
  - Policy: Authenticated users can update (UPDATE) objects
  - Policy: Authenticated users can delete (DELETE) objects

  ## Notes
  - Bucket is marked public so image URLs work without signed tokens
  - Write access restricted to authenticated users (admin panel only)
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for article images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload article images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can update article images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'article-images')
  WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can delete article images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'article-images');
