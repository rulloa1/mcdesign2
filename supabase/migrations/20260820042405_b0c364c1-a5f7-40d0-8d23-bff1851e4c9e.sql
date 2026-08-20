DROP POLICY IF EXISTS "Admins can upload site media images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update site media images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete site media images" ON storage.objects;

CREATE POLICY "Admins can upload site media images" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'site-media' AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins can update site media images" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'site-media' AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
WITH CHECK (bucket_id = 'site-media' AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins can delete site media images" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'site-media' AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
