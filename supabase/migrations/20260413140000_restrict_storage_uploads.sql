-- Remove overly permissive upload policy on listening-audio bucket
-- Any authenticated user could upload/overwrite audio files
DROP POLICY IF EXISTS "Authenticated users can upload listening audio" ON storage.objects;
