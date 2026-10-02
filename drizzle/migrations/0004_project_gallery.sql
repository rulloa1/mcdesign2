CREATE TABLE public.project_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id text NOT NULL,
  storage_path text NOT NULL,
  kind text NOT NULL DEFAULT 'image',
  caption text NOT NULL DEFAULT '',
  taken_on date,
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX project_gallery_project_idx ON public.project_gallery(project_id, taken_on DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_gallery TO authenticated;
GRANT ALL ON public.project_gallery TO service_role;
ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage gallery" ON public.project_gallery FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));