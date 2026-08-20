CREATE TABLE public.site_media_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slot text NOT NULL,
  action text NOT NULL,
  previous_url text,
  new_url text,
  actor_id uuid,
  actor_email text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX site_media_log_slot_created_idx ON public.site_media_log (slot, created_at DESC);

GRANT SELECT, INSERT ON public.site_media_log TO authenticated;
GRANT ALL ON public.site_media_log TO service_role;

ALTER TABLE public.site_media_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read the media log" ON public.site_media_log
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can write the media log" ON public.site_media_log
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND actor_id = auth.uid());