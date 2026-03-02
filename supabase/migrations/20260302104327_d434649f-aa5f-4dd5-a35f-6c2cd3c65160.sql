
-- ============================================================
-- Alter existing PROFILES table to match spec
-- ============================================================

-- Drop the has_api_key column, add api_key_encrypted
ALTER TABLE public.profiles DROP COLUMN IF EXISTS has_api_key;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS api_key_encrypted TEXT;

-- Change writing_level default and allowed values
ALTER TABLE public.profiles ALTER COLUMN writing_level DROP DEFAULT;
ALTER TABLE public.profiles ALTER COLUMN writing_level SET DEFAULT NULL;

-- Add streak columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_streak INT NOT NULL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_practice_date DATE;

-- Recreate handle_new_user to use id as PK (matching spec: id = auth.users.id)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, display_name)
  VALUES (NEW.id, NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;

-- ============================================================
-- 2. EXERCISES (static content, seeded)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  area TEXT NOT NULL CHECK (area IN ('vocabulary', 'grammar', 'reading', 'listening', 'sprachbausteine')),
  level TEXT NOT NULL CHECK (level IN ('b2_refresh', 'c1')),
  topic TEXT NOT NULL,
  exercise_type TEXT NOT NULL CHECK (exercise_type IN ('fill_in', 'transform', 'match', 'multiple_choice', 'richtig_falsch', 'sentence_build', 'definition_match', 'synonym_match', 'word_family')),
  exam_format TEXT CHECK (exam_format IN ('telc', 'goethe')),
  title_de TEXT NOT NULL,
  title_en TEXT NOT NULL,
  instructions_de TEXT NOT NULL,
  instructions_en TEXT NOT NULL,
  content JSONB NOT NULL,
  solution JSONB NOT NULL,
  explanation_de TEXT,
  explanation_en TEXT,
  difficulty INT NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read exercises"
  ON public.exercises FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_exercises_area_level ON public.exercises(area, level);
CREATE INDEX IF NOT EXISTS idx_exercises_topic ON public.exercises(topic);

-- ============================================================
-- 3. EXERCISE PROGRESS (per user)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.exercise_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  score INT,
  attempts INT NOT NULL DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, exercise_id)
);

ALTER TABLE public.exercise_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own exercise progress"
  ON public.exercise_progress FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_exercise_progress_user ON public.exercise_progress(user_id);

-- ============================================================
-- 4. READING TEXTS (static content, seeded)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reading_texts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_de TEXT NOT NULL,
  title_en TEXT NOT NULL,
  text_content TEXT NOT NULL,
  text_type TEXT NOT NULL CHECK (text_type IN ('textrekonstruktion', 'selektives_verstehen', 'detailverstehen', 'general')),
  exam_format TEXT CHECK (exam_format IN ('telc', 'goethe')),
  level TEXT NOT NULL CHECK (level IN ('b2_refresh', 'c1')),
  word_count INT NOT NULL,
  estimated_minutes INT NOT NULL,
  questions JSONB NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.reading_texts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read reading_texts"
  ON public.reading_texts FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- 5. READING PROGRESS (per user)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reading_text_id UUID NOT NULL REFERENCES public.reading_texts(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  time_spent_seconds INT,
  self_score INT CHECK (self_score BETWEEN 1 AND 5),
  answers JSONB,
  score INT,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, reading_text_id)
);

ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own reading progress"
  ON public.reading_progress FOR ALL
  USING (auth.uid() = user_id);

-- ============================================================
-- 6. WRITING PROMPTS (static content, seeded)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.writing_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level TEXT NOT NULL CHECK (level IN ('rusty', 'solid_b2', 'almost_c1')),
  prompt_type TEXT NOT NULL CHECK (prompt_type IN ('micro', 'paragraph', 'full_text')),
  text_type TEXT NOT NULL CHECK (text_type IN ('eroerterung', 'stellungnahme', 'beschwerde', 'formeller_brief', 'micro_exercise')),
  exam_format TEXT CHECK (exam_format IN ('telc')),
  title_de TEXT NOT NULL,
  title_en TEXT NOT NULL,
  context_de TEXT NOT NULL,
  context_en TEXT NOT NULL,
  starter_quotes JSONB,
  target_word_count INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.writing_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read writing_prompts"
  ON public.writing_prompts FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- 7. WRITING SUBMISSIONS (per user)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.writing_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES public.writing_prompts(id) ON DELETE CASCADE,
  text_content TEXT NOT NULL,
  word_count INT NOT NULL,
  score_aufgabengerechtheit TEXT CHECK (score_aufgabengerechtheit IN ('A', 'B', 'C', 'D')),
  score_korrektheit TEXT CHECK (score_korrektheit IN ('A', 'B', 'C', 'D')),
  score_repertoire TEXT CHECK (score_repertoire IN ('A', 'B', 'C', 'D')),
  score_kommunikative_gestaltung TEXT CHECK (score_kommunikative_gestaltung IN ('A', 'B', 'C', 'D')),
  total_points INT,
  llm_feedback_de TEXT,
  llm_feedback_en TEXT,
  llm_corrections JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.writing_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own writing submissions"
  ON public.writing_submissions FOR ALL
  USING (auth.uid() = user_id);

CREATE TRIGGER writing_submissions_updated_at
  BEFORE UPDATE ON public.writing_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_writing_submissions_user ON public.writing_submissions(user_id);

-- ============================================================
-- 8. PERSONAL VOCABULARY (per user)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.personal_vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word_de TEXT NOT NULL,
  translation_en TEXT NOT NULL,
  translation_custom TEXT,
  example_sentence TEXT,
  source_type TEXT NOT NULL CHECK (source_type IN ('reading', 'vocabulary', 'grammar', 'manual', 'writing')),
  source_id TEXT,
  box_number INT NOT NULL DEFAULT 1 CHECK (box_number BETWEEN 1 AND 5),
  next_review_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  review_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.personal_vocabulary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own vocabulary"
  ON public.personal_vocabulary FOR ALL
  USING (auth.uid() = user_id);

CREATE TRIGGER personal_vocabulary_updated_at
  BEFORE UPDATE ON public.personal_vocabulary
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_personal_vocabulary_user ON public.personal_vocabulary(user_id);
CREATE INDEX IF NOT EXISTS idx_personal_vocabulary_review ON public.personal_vocabulary(user_id, next_review_at);

-- ============================================================
-- 9. VERB CONJUGATIONS (static reference table)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.verb_conjugations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  infinitiv TEXT NOT NULL,
  bedeutung_en TEXT NOT NULL,
  praesens_ich TEXT NOT NULL,
  praesens_du TEXT NOT NULL,
  praesens_er TEXT NOT NULL,
  praeteritum_ich TEXT NOT NULL,
  perfekt TEXT NOT NULL,
  konjunktiv_ii TEXT NOT NULL,
  is_irregular BOOLEAN NOT NULL DEFAULT FALSE,
  is_separable BOOLEAN NOT NULL DEFAULT FALSE,
  frequency_rank INT NOT NULL DEFAULT 999,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.verb_conjugations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read verb_conjugations"
  ON public.verb_conjugations FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_verb_conjugations_rank ON public.verb_conjugations(frequency_rank);

-- ============================================================
-- 10. DICTIONARY (static lookup for inline translation)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.dictionary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_de TEXT NOT NULL,
  article TEXT,
  translation_en TEXT NOT NULL,
  word_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.dictionary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read dictionary"
  ON public.dictionary FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_dictionary_word ON public.dictionary(word_de);
CREATE INDEX IF NOT EXISTS idx_dictionary_word_lower ON public.dictionary(LOWER(word_de));

-- ============================================================
-- 11. DAILY SESSIONS (per user)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.daily_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  planned_minutes INT NOT NULL,
  actual_seconds INT,
  exercises_planned INT NOT NULL,
  exercises_completed INT NOT NULL DEFAULT 0,
  flashcards_reviewed INT NOT NULL DEFAULT 0,
  correct_count INT NOT NULL DEFAULT 0,
  total_answered INT NOT NULL DEFAULT 0,
  exercise_ids JSONB NOT NULL DEFAULT '[]',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.daily_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own daily sessions"
  ON public.daily_sessions FOR ALL USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_daily_sessions_user_date ON public.daily_sessions(user_id, started_at);
