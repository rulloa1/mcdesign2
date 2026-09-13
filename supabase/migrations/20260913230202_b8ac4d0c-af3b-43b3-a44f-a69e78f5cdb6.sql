CREATE TABLE public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  project_type text NOT NULL CHECK (project_type IN ('owners-representation', 'residential-construction', 'design-build', 'hospitality', 'civil-development', 'estate-management', 'other')),
  location text CHECK (location IS NULL OR char_length(location) <= 120),
  budget text CHECK (budget IS NULL OR budget IN ('under-1m', '1m-5m', '5m-15m', '15m-plus', 'not-sure')),
  timeline text CHECK (timeline IS NULL OR timeline IN ('immediately', '3-6-months', '6-12-months', '12-months-plus', 'exploring')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_inquiries TO anon, authenticated;
GRANT SELECT ON public.contact_inquiries TO authenticated;
GRANT ALL ON public.contact_inquiries TO service_role;

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact inquiries"
ON public.contact_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can read contact inquiries"
ON public.contact_inquiries
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles ur
  WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::public.app_role
));

CREATE OR REPLACE FUNCTION public.set_contact_inquiries_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.set_contact_inquiries_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.set_contact_inquiries_updated_at() TO service_role;

CREATE TRIGGER set_contact_inquiries_updated_at
BEFORE UPDATE ON public.contact_inquiries
FOR EACH ROW EXECUTE FUNCTION public.set_contact_inquiries_updated_at();