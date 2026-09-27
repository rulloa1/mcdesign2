DROP POLICY IF EXISTS "Anyone can submit contact inquiries" ON public.contact_inquiries;
REVOKE INSERT ON public.contact_inquiries FROM anon, authenticated;
CREATE INDEX IF NOT EXISTS contact_inquiries_email_created_idx ON public.contact_inquiries (lower(email), created_at DESC);
CREATE INDEX IF NOT EXISTS contact_inquiries_created_idx ON public.contact_inquiries (created_at DESC);
CREATE OR REPLACE FUNCTION public.submit_contact_inquiry(_name text,_email text,_phone text,_project_type text,_location text,_budget text,_timeline text,_message text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF (SELECT count(*) FROM public.contact_inquiries WHERE lower(email) = lower(trim(_email)) AND created_at > now() - interval '1 hour') >= 3 THEN
    RAISE EXCEPTION 'rate_limited' USING ERRCODE = 'P0001';
  END IF;
  IF (SELECT count(*) FROM public.contact_inquiries WHERE created_at > now() - interval '10 minutes') >= 30 THEN
    RAISE EXCEPTION 'rate_limited' USING ERRCODE = 'P0001';
  END IF;
  INSERT INTO public.contact_inquiries (name, email, phone, project_type, location, budget, timeline, message)
  VALUES (trim(_name), trim(_email), NULLIF(trim(_phone), ''), _project_type, NULLIF(trim(_location), ''), NULLIF(_budget, ''), NULLIF(_timeline, ''), trim(_message));
END;
$$;
REVOKE ALL ON FUNCTION public.submit_contact_inquiry(text,text,text,text,text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_contact_inquiry(text,text,text,text,text,text,text,text) TO anon, authenticated, service_role;