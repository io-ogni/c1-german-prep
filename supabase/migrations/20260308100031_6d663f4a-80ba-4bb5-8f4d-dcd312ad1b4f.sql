
-- Temporary function to safely replace ASCII umlauts with real German umlauts
-- Protects known false positives where ue/ae/oe are NOT umlauts
CREATE OR REPLACE FUNCTION _fix_umlauts(t text) RETURNS text LANGUAGE plpgsql IMMUTABLE AS $$
DECLARE
  r text := t;
BEGIN
  -- Protect false positive "ue" patterns (not umlauts)
  r := regexp_replace(r, '(aktu)(ell)', '\1§§ELL§§', 'gi');
  r := regexp_replace(r, '(eventu)(ell)', '\1§§ELL§§', 'gi');
  r := regexp_replace(r, '(individu)(ell)', '\1§§ELL§§', 'gi');
  r := regexp_replace(r, '(intellektu)(ell)', '\1§§ELL§§', 'gi');
  r := regexp_replace(r, '(virtu)(ell)', '\1§§ELL§§', 'gi');
  r := regexp_replace(r, '(manu)(ell)', '\1§§ELL§§', 'gi');
  r := regexp_replace(r, '(sexu)(ell)', '\1§§ELL§§', 'gi');
  r := regexp_replace(r, '([Qq])(uelle)', '\1§§UELLE§§', 'g');
  r := regexp_replace(r, '([Tt])(euer)', '\1§§EUER§§', 'g');
  r := regexp_replace(r, '([Nn])(euer)', '\1§§EUER§§', 'g');
  r := regexp_replace(r, '([Ff])(euer)', '\1§§EUER§§', 'g');
  r := regexp_replace(r, '([Ss])(teuer)', '\1§§TEUER§§', 'g');
  r := regexp_replace(r, '([Zz])(uschauer)', '\1§§USCHAUER§§', 'g');
  r := regexp_replace(r, '([Ee])(rneuer)', '\1§§RNEUER§§', 'g');
  r := regexp_replace(r, '([Aa])(benteuer)', '\1§§BENTEUER§§', 'g');
  r := regexp_replace(r, '([Dd])(auer)', '\1§§AUER§§', 'g');
  r := regexp_replace(r, '([Mm])(auer)', '\1§§AUER§§', 'g');
  r := regexp_replace(r, '([Bb])(auer)', '\1§§AUER§§', 'g');

  -- Bulk replace ASCII umlauts → real umlauts
  r := replace(r, 'Ae', 'Ä');
  r := replace(r, 'Oe', 'Ö');
  r := replace(r, 'Ue', 'Ü');
  r := replace(r, 'ae', 'ä');
  r := replace(r, 'oe', 'ö');
  r := replace(r, 'ue', 'ü');

  -- Restore protected sequences
  r := replace(r, '§§ELL§§', 'ell');
  r := replace(r, '§§UELLE§§', 'uelle');
  r := replace(r, '§§EUER§§', 'euer');
  r := replace(r, '§§TEUER§§', 'teuer');
  r := replace(r, '§§USCHAUER§§', 'uschauer');
  r := replace(r, '§§RNEUER§§', 'rneuer');
  r := replace(r, '§§BENTEUER§§', 'benteuer');
  r := replace(r, '§§AUER§§', 'auer');

  RETURN r;
END;
$$;

-- Apply to exercises table
UPDATE exercises SET
  content = (_fix_umlauts(content::text))::jsonb,
  solution = (_fix_umlauts(solution::text))::jsonb,
  instructions_de = _fix_umlauts(instructions_de),
  explanation_de = _fix_umlauts(COALESCE(explanation_de, '')),
  title_de = _fix_umlauts(title_de);

-- Set empty explanations back to null
UPDATE exercises SET explanation_de = NULL WHERE explanation_de = '';

-- Apply to reading_texts table
UPDATE reading_texts SET
  text_content = _fix_umlauts(text_content),
  title_de = _fix_umlauts(title_de),
  questions = (_fix_umlauts(questions::text))::jsonb;

-- Apply to writing_prompts table
UPDATE writing_prompts SET
  context_de = _fix_umlauts(context_de),
  title_de = _fix_umlauts(title_de);

-- Apply to dictionary table
UPDATE dictionary SET
  word_de = _fix_umlauts(word_de);

-- Apply to verb_conjugations table
UPDATE verb_conjugations SET
  infinitiv = _fix_umlauts(infinitiv),
  praesens_ich = _fix_umlauts(praesens_ich),
  praesens_du = _fix_umlauts(praesens_du),
  praesens_er = _fix_umlauts(praesens_er),
  praeteritum_ich = _fix_umlauts(praeteritum_ich),
  perfekt = _fix_umlauts(perfekt),
  konjunktiv_ii = _fix_umlauts(konjunktiv_ii);

-- Clean up
DROP FUNCTION _fix_umlauts(text);
