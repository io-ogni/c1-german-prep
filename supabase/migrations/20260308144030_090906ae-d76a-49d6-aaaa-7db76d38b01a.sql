
-- Create the public listening-audio storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('listening-audio', 'listening-audio', true);

-- Allow anyone to read files from this bucket
CREATE POLICY "Public read access for listening audio"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'listening-audio');

-- Allow authenticated users to upload (for admin use)
CREATE POLICY "Authenticated users can upload listening audio"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'listening-audio');
