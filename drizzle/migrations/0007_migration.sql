DROP POLICY IF EXISTS "Admins can read site media" ON storage.objects;
CREATE POLICY "Admins can read site media" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'site-media' AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role));