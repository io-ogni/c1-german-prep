-- Fix typo: "qüstions" → "questions" key in reading_texts JSONB
-- Affected: all general texts (top-level key) and selektives_verstehen texts (nested key)

-- General texts: simple rename
UPDATE reading_texts
SET questions = jsonb_build_object('questions', questions->'qüstions')
WHERE text_type = 'general'
  AND questions ? 'qüstions';

-- Selektives_verstehen texts: preserve instruction, rename qüstions → questions
UPDATE reading_texts
SET questions = jsonb_build_object('instruction', questions->'instruction', 'questions', questions->'qüstions')
WHERE questions ? 'qüstions';

-- Fix Fraün → Frauen typo in title/content/questions
UPDATE reading_texts
SET title_de = REPLACE(title_de, 'Fraün', 'Frauen'),
    text_content = REPLACE(text_content, 'Fraün', 'Frauen'),
    questions = REPLACE(questions::text, 'Fraün', 'Frauen')::jsonb
WHERE title_de LIKE '%Fraü%' OR text_content LIKE '%Fraü%' OR questions::text LIKE '%Fraü%';
