-- Server-side rate limit: max 10 feedback per user per day
-- Replaces the permissive INSERT policy with a function-enforced one

DROP POLICY IF EXISTS "Users can insert own feedback" ON public.feedback;

CREATE OR REPLACE FUNCTION public.check_feedback_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  today_count int;
BEGIN
  SELECT count(*) INTO today_count
  FROM public.feedback
  WHERE user_id = NEW.user_id
    AND created_at >= date_trunc('day', now());

  IF today_count >= 10 THEN
    RAISE EXCEPTION 'Rate limit exceeded: max 10 feedback per day';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_feedback_rate_limit
BEFORE INSERT ON public.feedback
FOR EACH ROW EXECUTE FUNCTION public.check_feedback_rate_limit();

-- Re-create the RLS policy
CREATE POLICY "Users can insert own feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);
