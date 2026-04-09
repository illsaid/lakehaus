/*
  # Create product-images Storage Bucket

  ## Summary
  Creates a public Supabase Storage bucket for recommended item product images
  uploaded through the admin CMS, mirroring the article-images bucket setup.

  ## Changes
  - New bucket: `product-images` (public)

  ## Security
  - Public SELECT: anyone can read product image URLs (needed for public pages)
  - Authenticated INSERT: only logged-in admins can upload
  - Authenticated UPDATE: only logged-in admins can replace images
  - Authenticated DELETE: only logged-in admins can remove images
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images')
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');
