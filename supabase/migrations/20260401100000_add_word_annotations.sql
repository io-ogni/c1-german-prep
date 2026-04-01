-- Add word_annotations column for pre-computed per-word translations
ALTER TABLE public.reading_texts
  ADD COLUMN IF NOT EXISTS word_annotations JSONB;

COMMENT ON COLUMN public.reading_texts.word_annotations IS
  'Pre-computed word-level annotations: { "word_lower": { "de": "base form", "en": "translation" }, ... }';
