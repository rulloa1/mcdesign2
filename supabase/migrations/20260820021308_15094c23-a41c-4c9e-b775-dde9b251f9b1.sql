CREATE TABLE public.project_order (
  project_id text NOT NULL PRIMARY KEY,
  position integer NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.project_order TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_order TO authenticated;
GRANT ALL ON public.project_order TO service_role;

ALTER TABLE public.project_order ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project order is publicly readable" ON public.project_order
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can insert project order" ON public.project_order
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update project order" ON public.project_order
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete project order" ON public.project_order
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));