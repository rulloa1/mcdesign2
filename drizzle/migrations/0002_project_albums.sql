CREATE TABLE public.project_albums (
  project_id text PRIMARY KEY,
  images text[] NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.project_albums TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_albums TO authenticated;
GRANT ALL ON public.project_albums TO service_role;
ALTER TABLE public.project_albums ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Albums are publicly readable" ON public.project_albums FOR SELECT TO anon, authenticated USING (project_id IS NOT NULL);
CREATE POLICY "Admins can insert albums" ON public.project_albums FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins can update albums" ON public.project_albums FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins can delete albums" ON public.project_albums FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));