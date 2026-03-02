
-- Drop old check constraint first
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_writing_level_check;

-- Make column nullable and remove default
ALTER TABLE public.profiles ALTER COLUMN writing_level DROP NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN writing_level DROP DEFAULT;

-- Reset existing 'b2' values to NULL
UPDATE public.profiles SET writing_level = NULL WHERE writing_level NOT IN ('rusty', 'solid_b2', 'almost_c1');

-- Now add new check constraint (NULL is allowed since column is nullable)
ALTER TABLE public.profiles ADD CONSTRAINT profiles_writing_level_check 
  CHECK (writing_level IS NULL OR writing_level IN ('rusty', 'solid_b2', 'almost_c1'));

-- Update trigger to not set writing_level
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, user_id, display_name)
  VALUES (NEW.id, NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$function$;
