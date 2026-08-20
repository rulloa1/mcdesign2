-- site_media
DROP POLICY IF EXISTS "Admins can insert site media" ON public.site_media;
DROP POLICY IF EXISTS "Admins can update site media" ON public.site_media;
DROP POLICY IF EXISTS "Admins can delete site media" ON public.site_media;

CREATE POLICY "Admins can insert site media" ON public.site_media FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins can update site media" ON public.site_media FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins can delete site media" ON public.site_media FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

-- site_media_log
DROP POLICY IF EXISTS "Admins can read the media log" ON public.site_media_log;
DROP POLICY IF EXISTS "Admins can write the media log" ON public.site_media_log;

CREATE POLICY "Admins can read the media log" ON public.site_media_log FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins can write the media log" ON public.site_media_log FOR INSERT TO authenticated
WITH CHECK (actor_id = auth.uid() AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

-- project_order
DROP POLICY IF EXISTS "Admins can insert project order" ON public.project_order;
DROP POLICY IF EXISTS "Admins can update project order" ON public.project_order;
DROP POLICY IF EXISTS "Admins can delete project order" ON public.project_order;

CREATE POLICY "Admins can insert project order" ON public.project_order FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins can update project order" ON public.project_order FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins can delete project order" ON public.project_order FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
