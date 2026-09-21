ALTER TABLE public.contact_inquiries
  ADD COLUMN project_stage text;

ALTER TABLE public.contact_inquiries
  ADD CONSTRAINT contact_inquiries_project_stage_check
  CHECK (
    project_stage IS NULL
    OR project_stage IN ('planning', 'design', 'bidding', 'under-construction', 'closeout')
  );

ALTER TABLE public.contact_inquiries
  DROP CONSTRAINT IF EXISTS contact_inquiries_project_type_check;

ALTER TABLE public.contact_inquiries
  ADD CONSTRAINT contact_inquiries_project_type_check
  CHECK (
    project_type IN (
      'owners-representation',
      'residential-construction',
      'design-build',
      'hospitality',
      'civil-development',
      'estate-management',
      'executive-role',
      'other'
    )
  ) NOT VALID;