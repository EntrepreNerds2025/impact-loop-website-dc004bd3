ALTER TABLE public.booking_leads
DROP CONSTRAINT IF EXISTS booking_leads_call_type_check;

ALTER TABLE public.booking_leads
ADD CONSTRAINT booking_leads_call_type_check
CHECK (
  call_type IN (
    'diagnostic',
    'workshop',
    'pilot',
    'strategy',
    'story-capture',
    'visibility',
    'adapt-advisory'
  )
);
