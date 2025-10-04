-- Storage Bucket Policies for RepurposePie
-- Run this in your Supabase SQL Editor after creating the storage buckets

-- NOTE: Storage policies must be created through the Supabase Dashboard UI
-- Go to Storage > Select bucket > Policies tab > New Policy

-- For reference, here are the policies to create manually:

-- BUCKET: project-files
-- ======================

-- Policy 1: INSERT
-- Name: Users can upload own files
-- Definition: bucket_id = 'project-files' AND (storage.foldername(name))[1] = auth.uid()::text

-- Policy 2: SELECT
-- Name: Users can view own files
-- Definition: bucket_id = 'project-files' AND (storage.foldername(name))[1] = auth.uid()::text

-- Policy 3: UPDATE
-- Name: Users can update own files
-- Definition: bucket_id = 'project-files' AND (storage.foldername(name))[1] = auth.uid()::text

-- Policy 4: DELETE
-- Name: Users can delete own files
-- Definition: bucket_id = 'project-files' AND (storage.foldername(name))[1] = auth.uid()::text


-- BUCKET: content-files
-- ======================

-- Policy 1: INSERT
-- Name: Users can upload content files
-- Definition: bucket_id = 'content-files' AND (storage.foldername(name))[1] = auth.uid()::text

-- Policy 2: SELECT
-- Name: Users can view content files
-- Definition: bucket_id = 'content-files' AND (storage.foldername(name))[1] = auth.uid()::text

-- Policy 3: UPDATE
-- Name: Users can update content files
-- Definition: bucket_id = 'content-files' AND (storage.foldername(name))[1] = auth.uid()::text

-- Policy 4: DELETE
-- Name: Users can delete content files
-- Definition: bucket_id = 'content-files' AND (storage.foldername(name))[1] = auth.uid()::text


-- BUCKET: user-avatars
-- =====================

-- Policy 1: INSERT
-- Name: Users can upload own avatar
-- Definition: bucket_id = 'user-avatars' AND (storage.foldername(name))[1] = auth.uid()::text

-- Policy 2: SELECT (PUBLIC)
-- Name: Anyone can view avatars
-- Definition: bucket_id = 'user-avatars'

-- Policy 3: UPDATE
-- Name: Users can update own avatar
-- Definition: bucket_id = 'user-avatars' AND (storage.foldername(name))[1] = auth.uid()::text

-- Policy 4: DELETE
-- Name: Users can delete own avatar
-- Definition: bucket_id = 'user-avatars' AND (storage.foldername(name))[1] = auth.uid()::text


-- ============================================================================
-- ALTERNATIVE: Make buckets PUBLIC for development (not recommended for production)
-- Go to Storage > Click bucket > Click settings (3 dots) > Edit bucket > Check "Public bucket"
-- ============================================================================
