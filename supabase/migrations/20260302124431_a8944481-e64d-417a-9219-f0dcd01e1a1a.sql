
ALTER TABLE public.profiles ALTER COLUMN writing_level SET DEFAULT 'solid_b2';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, user_id, display_name, writing_level)
  VALUES (NEW.id, NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)), 'solid_b2');
  RETURN NEW;
END;
$function$;
