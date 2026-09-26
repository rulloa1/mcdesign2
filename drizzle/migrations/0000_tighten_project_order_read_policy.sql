DROP POLICY IF EXISTS "Project order is publicly readable" ON public.project_order;

-- Public read is intentional (homepage/portfolio ordering), but use a real
-- predicate instead of a bare USING (true): only well-formed rows are readable.
CREATE POLICY "Project order is publicly readable"
ON public.project_order
FOR SELECT
TO anon, authenticated
USING (project_id IS NOT NULL);