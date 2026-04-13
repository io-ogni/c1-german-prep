-- Truncate any existing long names first
UPDATE public.profiles SET display_name = LEFT(display_name, 30) WHERE length(display_name) > 30;

-- Limit display_name to 30 characters at DB level
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_display_name_length CHECK (length(display_name) <= 30);
