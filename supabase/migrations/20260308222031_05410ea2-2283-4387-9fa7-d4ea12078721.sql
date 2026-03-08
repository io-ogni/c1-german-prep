
-- Fix all RESTRICTIVE policies by dropping and recreating as PERMISSIVE

-- daily_sessions
DROP POLICY IF EXISTS "Users manage own daily sessions" ON public.daily_sessions;
CREATE POLICY "Users manage own daily sessions" ON public.daily_sessions
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- dictionary
DROP POLICY IF EXISTS "Authenticated users can read dictionary" ON public.dictionary;
CREATE POLICY "Authenticated users can read dictionary" ON public.dictionary
  FOR SELECT TO authenticated USING (true);

-- exercise_progress
DROP POLICY IF EXISTS "Users can manage own exercise progress" ON public.exercise_progress;
CREATE POLICY "Users can manage own exercise progress" ON public.exercise_progress
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- exercises
DROP POLICY IF EXISTS "Authenticated users can read exercises" ON public.exercises;
CREATE POLICY "Authenticated users can read exercises" ON public.exercises
  FOR SELECT TO authenticated USING (true);

-- personal_vocabulary
DROP POLICY IF EXISTS "Users can manage own vocabulary" ON public.personal_vocabulary;
CREATE POLICY "Users can manage own vocabulary" ON public.personal_vocabulary
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- profiles
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- reading_progress
DROP POLICY IF EXISTS "Users can manage own reading progress" ON public.reading_progress;
CREATE POLICY "Users can manage own reading progress" ON public.reading_progress
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- reading_texts
DROP POLICY IF EXISTS "Authenticated users can read reading_texts" ON public.reading_texts;
CREATE POLICY "Authenticated users can read reading_texts" ON public.reading_texts
  FOR SELECT TO authenticated USING (true);

-- verb_conjugations
DROP POLICY IF EXISTS "Authenticated users can read verb_conjugations" ON public.verb_conjugations;
CREATE POLICY "Authenticated users can read verb_conjugations" ON public.verb_conjugations
  FOR SELECT TO authenticated USING (true);

-- writing_prompts
DROP POLICY IF EXISTS "Authenticated users can read writing_prompts" ON public.writing_prompts;
CREATE POLICY "Authenticated users can read writing_prompts" ON public.writing_prompts
  FOR SELECT TO authenticated USING (true);

-- writing_submissions
DROP POLICY IF EXISTS "Users can manage own writing submissions" ON public.writing_submissions;
CREATE POLICY "Users can manage own writing submissions" ON public.writing_submissions
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
