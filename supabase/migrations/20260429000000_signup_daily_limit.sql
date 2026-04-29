-- Limit signups to 300 per day as bot protection (replaces CAPTCHA)
-- Supabase also has built-in per-IP rate limiting on auth endpoints

CREATE OR REPLACE FUNCTION public.check_daily_signup_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT count(*) FROM auth.users
    WHERE created_at >= date_trunc('day', now())
  ) >= 300 THEN
    RAISE EXCEPTION 'Daily signup limit reached. Please try again tomorrow.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Only create if not exists
DROP TRIGGER IF EXISTS enforce_daily_signup_limit ON auth.users;
CREATE TRIGGER enforce_daily_signup_limit
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.check_daily_signup_limit();
