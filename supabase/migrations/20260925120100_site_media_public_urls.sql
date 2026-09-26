-- Serve studio images from a public bucket instead of 5-year signed links that
-- would silently expire. Objects were already readable by anyone via the
-- "Site media images are readable" policy; writes stay admin-only.

UPDATE storage.buckets SET public = true WHERE id = 'site-media';

-- Rewrite existing signed links to their permanent public form.
UPDATE public.site_media
SET url = regexp_replace(url, '/storage/v1/object/sign/site-media/([^?]+)\?.*$', '/storage/v1/object/public/site-media/\1')
WHERE url LIKE '%/storage/v1/object/sign/site-media/%';

UPDATE public.site_media_log
SET previous_url = regexp_replace(previous_url, '/storage/v1/object/sign/site-media/([^?]+)\?.*$', '/storage/v1/object/public/site-media/\1')
WHERE previous_url LIKE '%/storage/v1/object/sign/site-media/%';

UPDATE public.site_media_log
SET new_url = regexp_replace(new_url, '/storage/v1/object/sign/site-media/([^?]+)\?.*$', '/storage/v1/object/public/site-media/\1')
WHERE new_url LIKE '%/storage/v1/object/sign/site-media/%';
