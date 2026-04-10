-- Remove duplicate personal_vocabulary rows (keep the oldest per user+word+source)
DELETE FROM public.personal_vocabulary a
USING public.personal_vocabulary b
WHERE a.user_id = b.user_id
  AND a.word_de = b.word_de
  AND a.source_type = b.source_type
  AND a.created_at > b.created_at;

-- Prevent future duplicates
CREATE UNIQUE INDEX idx_personal_vocabulary_user_word_source
  ON public.personal_vocabulary (user_id, word_de, source_type);
