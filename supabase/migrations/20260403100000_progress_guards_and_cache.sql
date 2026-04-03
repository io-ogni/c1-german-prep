-- =============================================================================
-- 1. GUARD TRIGGERS — prevent progress regression at DB level
-- =============================================================================

-- exercise_progress: completed is monotonic, score is high-water mark, attempts only increment
CREATE OR REPLACE FUNCTION public.guard_exercise_progress()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- completed: once true, stays true
  IF OLD.completed = true AND NEW.completed = false THEN
    NEW.completed := true;
  END IF;

  -- score: keep the highest value
  IF OLD.score IS NOT NULL AND (NEW.score IS NULL OR NEW.score < OLD.score) THEN
    NEW.score := OLD.score;
  END IF;

  -- attempts: only increment
  IF NEW.attempts < OLD.attempts THEN
    NEW.attempts := OLD.attempts;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_exercise_progress_guard
BEFORE UPDATE ON public.exercise_progress
FOR EACH ROW EXECUTE FUNCTION public.guard_exercise_progress();

-- reading_progress: completed is monotonic, score is high-water mark
CREATE OR REPLACE FUNCTION public.guard_reading_progress()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.completed = true AND NEW.completed = false THEN
    NEW.completed := true;
  END IF;

  IF OLD.score IS NOT NULL AND (NEW.score IS NULL OR NEW.score < OLD.score) THEN
    NEW.score := OLD.score;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_reading_progress_guard
BEFORE UPDATE ON public.reading_progress
FOR EACH ROW EXECUTE FUNCTION public.guard_reading_progress();


-- =============================================================================
-- 2. USER PROGRESS CACHE — pre-computed exercise counts per area
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.user_progress_cache (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  vocabulary_completed int NOT NULL DEFAULT 0,
  vocabulary_total int NOT NULL DEFAULT 0,
  grammar_completed int NOT NULL DEFAULT 0,
  grammar_total int NOT NULL DEFAULT 0,
  listening_completed int NOT NULL DEFAULT 0,
  listening_total int NOT NULL DEFAULT 0,
  it_completed int NOT NULL DEFAULT 0,
  it_total int NOT NULL DEFAULT 0,
  exam_completed int NOT NULL DEFAULT 0,
  exam_total int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_progress_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress cache"
  ON public.user_progress_cache FOR SELECT
  USING (auth.uid() = user_id);


-- =============================================================================
-- 3. RECALCULATE FUNCTION — computes all area counts for a user
-- =============================================================================

CREATE OR REPLACE FUNCTION public.recalculate_user_progress(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_vocab_total int;
  v_vocab_completed int;
  v_grammar_total int;
  v_grammar_completed int;
  v_listening_total int;
  v_listening_completed int;
  v_it_total int;
  v_it_completed int;
  v_exam_total int;
  v_exam_completed int;
BEGIN
  -- Area totals (global, same for all users)
  SELECT count(*) INTO v_vocab_total FROM exercises WHERE area = 'vocabulary';
  SELECT count(*) INTO v_grammar_total FROM exercises WHERE area IN ('grammar', 'sprachbausteine');
  SELECT count(*) INTO v_listening_total FROM exercises WHERE area = 'listening';
  SELECT count(*) INTO v_it_total FROM exercises WHERE area = 'berufssprache_it';
  SELECT count(*) INTO v_exam_total FROM exercises WHERE exam_format IS NOT NULL;

  -- User's completed counts
  SELECT count(*) INTO v_vocab_completed
  FROM exercise_progress ep JOIN exercises e ON e.id = ep.exercise_id
  WHERE ep.user_id = p_user_id AND ep.completed = true AND e.area = 'vocabulary';

  SELECT count(*) INTO v_grammar_completed
  FROM exercise_progress ep JOIN exercises e ON e.id = ep.exercise_id
  WHERE ep.user_id = p_user_id AND ep.completed = true AND e.area IN ('grammar', 'sprachbausteine');

  SELECT count(*) INTO v_listening_completed
  FROM exercise_progress ep JOIN exercises e ON e.id = ep.exercise_id
  WHERE ep.user_id = p_user_id AND ep.completed = true AND e.area = 'listening';

  SELECT count(*) INTO v_it_completed
  FROM exercise_progress ep JOIN exercises e ON e.id = ep.exercise_id
  WHERE ep.user_id = p_user_id AND ep.completed = true AND e.area = 'berufssprache_it';

  SELECT count(*) INTO v_exam_completed
  FROM exercise_progress ep JOIN exercises e ON e.id = ep.exercise_id
  WHERE ep.user_id = p_user_id AND ep.completed = true AND e.exam_format IS NOT NULL;

  -- Upsert into cache
  INSERT INTO user_progress_cache (
    user_id,
    vocabulary_completed, vocabulary_total,
    grammar_completed, grammar_total,
    listening_completed, listening_total,
    it_completed, it_total,
    exam_completed, exam_total,
    updated_at
  ) VALUES (
    p_user_id,
    v_vocab_completed, v_vocab_total,
    v_grammar_completed, v_grammar_total,
    v_listening_completed, v_listening_total,
    v_it_completed, v_it_total,
    v_exam_completed, v_exam_total,
    now()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    vocabulary_completed = EXCLUDED.vocabulary_completed,
    vocabulary_total = EXCLUDED.vocabulary_total,
    grammar_completed = EXCLUDED.grammar_completed,
    grammar_total = EXCLUDED.grammar_total,
    listening_completed = EXCLUDED.listening_completed,
    listening_total = EXCLUDED.listening_total,
    it_completed = EXCLUDED.it_completed,
    it_total = EXCLUDED.it_total,
    exam_completed = EXCLUDED.exam_completed,
    exam_total = EXCLUDED.exam_total,
    updated_at = now();
END;
$$;


-- =============================================================================
-- 4. RPC WRAPPER — safe for client calls (only own user)
-- =============================================================================

CREATE OR REPLACE FUNCTION public.initialize_progress_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM recalculate_user_progress(auth.uid());
END;
$$;


-- =============================================================================
-- 5. TRIGGERS — recalculate cache on progress changes
-- =============================================================================

CREATE OR REPLACE FUNCTION public.trigger_recalculate_exercise_progress()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM recalculate_user_progress(COALESCE(NEW.user_id, OLD.user_id));
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_exercise_progress_recalculate
AFTER INSERT OR UPDATE ON public.exercise_progress
FOR EACH ROW EXECUTE FUNCTION public.trigger_recalculate_exercise_progress();
