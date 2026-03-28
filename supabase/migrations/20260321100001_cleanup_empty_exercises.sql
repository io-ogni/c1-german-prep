-- Find and delete exercises with empty or broken content
-- These show up as blank exercises in daily practice

-- First, let's see what we're deleting (run this SELECT first to review)
-- SELECT id, exercise_type, title_de, content
-- FROM exercises
-- WHERE content IS NULL
--    OR content = '{}'::jsonb
--    OR content = 'null'::jsonb
--    OR (exercise_type = 'match' AND NOT (content ? 'pairs' OR content ? 'left'))
--    OR (exercise_type = 'fill_in' AND NOT (content ? 'sentence' OR content ? 'sentences'))
--    OR (exercise_type = 'definition_match' AND NOT (content ? 'word' OR content ? 'options'))
--    OR (exercise_type = 'multiple_choice' AND NOT (content ? 'options'))
--    OR (exercise_type = 'transform' AND NOT (content ? 'sentences'))
--    OR (exercise_type = 'sentence_build' AND NOT (content ? 'sentences'))
--    OR (exercise_type = 'error_correction' AND NOT (content ? 'sentences'))
--    OR (exercise_type = 'antonym_match' AND NOT (content ? 'pairs'))
--    OR (exercise_type = 'synonym_match' AND NOT (content ? 'pairs'))
--    OR (exercise_type = 'word_family' AND NOT (content ? 'word' OR content ? 'base_word'))
--    OR (exercise_type = 'sprachbausteine' AND NOT (content ? 'text'));

-- Delete broken exercises (also cleans up exercise_progress via CASCADE)
DELETE FROM exercises
WHERE content IS NULL
   OR content = '{}'::jsonb
   OR content = 'null'::jsonb
   OR (exercise_type = 'match' AND NOT (content ? 'pairs' OR content ? 'left'))
   OR (exercise_type = 'fill_in' AND NOT (content ? 'sentence' OR content ? 'sentences'))
   OR (exercise_type = 'definition_match' AND NOT (content ? 'word' OR content ? 'options'))
   OR (exercise_type = 'multiple_choice' AND NOT (content ? 'options'))
   OR (exercise_type = 'transform' AND NOT (content ? 'sentences'))
   OR (exercise_type = 'sentence_build' AND NOT (content ? 'sentences'))
   OR (exercise_type = 'error_correction' AND NOT (content ? 'sentences'))
   OR (exercise_type = 'antonym_match' AND NOT (content ? 'pairs'))
   OR (exercise_type = 'synonym_match' AND NOT (content ? 'pairs'))
   OR (exercise_type = 'word_family' AND NOT (content ? 'word' OR content ? 'base_word'))
   OR (exercise_type = 'sprachbausteine' AND NOT (content ? 'text'));
