-- Add Präpositionen and NV-Verbindungen source types to personal_vocabulary
ALTER TABLE public.personal_vocabulary
  DROP CONSTRAINT IF EXISTS personal_vocabulary_source_type_check;

ALTER TABLE public.personal_vocabulary
  ADD CONSTRAINT personal_vocabulary_source_type_check
  CHECK (source_type IN (
    'reading', 'vocabulary', 'grammar', 'manual', 'writing',
    'it-nomen', 'it-verben', 'it-kollokationen', 'it-workshop', 'it-refinement',
    'it-souveränität', 'it-notfallkit', 'it-redewendungen',
    'sprechen-praesentation', 'sprechen-diskussion', 'sprechen-zusammenfassung',
    'sprechen-redemittel', 'sprechen-redewendungen',
    'schreiben-einleitung', 'schreiben-hauptteil', 'schreiben-schluss',
    'schreiben-c1-strukturen',
    'praepositionen', 'nv-verbindungen'
  ));
