-- Gallery media is private; public portfolio albums remain in site-media.
DROP POLICY IF EXISTS "Gallery is publicly readable" ON public.project_gallery;
REVOKE ALL ON public.project_gallery FROM anon;

INSERT INTO storage.buckets (id, name, public)
VALUES ('private-gallery', 'private-gallery', false)
ON CONFLICT (id) DO UPDATE SET public = false;

CREATE POLICY "Admins manage private gallery objects"
ON storage.objects FOR ALL TO authenticated
USING (
  bucket_id = 'private-gallery'
  AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
)
WITH CHECK (
  bucket_id = 'private-gallery'
  AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
);
