-- Expand source_type to allow starred items from IT Deutsch and Sprechen
ALTER TABLE public.personal_vocabulary
  DROP CONSTRAINT IF EXISTS personal_vocabulary_source_type_check;

ALTER TABLE public.personal_vocabulary
  ADD CONSTRAINT personal_vocabulary_source_type_check
  CHECK (source_type IN (
    'reading', 'vocabulary', 'grammar', 'manual', 'writing',
    'it-nomen', 'it-verben', 'it-kollokationen', 'it-workshop', 'it-refinement',
    'it-souveränität', 'it-notfallkit', 'it-redewendungen',
    'sprechen-praesentation', 'sprechen-diskussion', 'sprechen-zusammenfassung',
    'sprechen-redemittel', 'sprechen-redewendungen'
  ));
