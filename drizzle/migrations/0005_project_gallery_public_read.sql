CREATE POLICY "Gallery is publicly readable"
ON public.project_gallery
FOR SELECT
TO anon, authenticated
USING (project_id IS NOT NULL);