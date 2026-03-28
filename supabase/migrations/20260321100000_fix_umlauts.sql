-- Fix German umlauts: ae→ä, oe→ö, ue→ü
-- Some exercises were generated with ASCII substitutes instead of proper umlauts.
-- Uses placeholder approach to protect known German false positives (teuer, Mauer, aktuell, Israel, Poet, etc.)
--
-- IMPORTANT: For JSON fields (content, solution, questions), we walk the JSON tree
-- and only replace within string VALUES — keys, booleans, numbers are untouched.
-- This prevents mangling English JSON keys like "question" or JSON booleans like "true".

-- Step 1: Text-level umlaut fixer (for plain text columns only)
CREATE OR REPLACE FUNCTION pg_temp.fix_umlauts(input text) RETURNS text AS $$
DECLARE
  r text := input;
BEGIN
  IF input IS NULL THEN RETURN NULL; END IF;

  -- Protect false positives for 'ue'
  -- auen: bauen, schauen, vertrauen, stauen, kauen, hauen...
  r := REPLACE(r, 'auen', '{{AUEN}}');
  r := REPLACE(r, 'Auen', '{{Auen}}');
  -- eue: neue, freue, Treue, Reue...
  r := REPLACE(r, 'eue', '{{EUE}}');
  r := REPLACE(r, 'Eue', '{{Eue}}');
  -- euer: Feuer, teuer, Steuer...
  r := REPLACE(r, 'euer', '{{EUER}}');
  r := REPLACE(r, 'Euer', '{{Euer}}');
  r := REPLACE(r, 'EUER', '{{_EUER}}');
  -- auer: Mauer, Bauer, Dauer, sauer...
  r := REPLACE(r, 'auer', '{{AUER}}');
  r := REPLACE(r, 'Auer', '{{Auer}}');
  -- uell: aktuell, manuell, virtuell...
  r := REPLACE(r, 'uell', '{{UELL}}');
  r := REPLACE(r, 'Uell', '{{Uell}}');
  r := REPLACE(r, 'uent', '{{UENT}}');  -- frequentiert etc.
  r := REPLACE(r, 'uenz', '{{UENZ}}');  -- Frequenz, Konsequenz
  r := REPLACE(r, 'ques', '{{QUES}}');  -- question (JSON keys)
  r := REPLACE(r, 'Ques', '{{Ques}}');

  -- Protect false positives for 'ae' (ael→Israel/Michael/Raphael)
  r := REPLACE(r, 'ael', '{{AEL}}');
  r := REPLACE(r, 'Ael', '{{Ael}}');
  r := REPLACE(r, 'aero', '{{AERO}}');
  r := REPLACE(r, 'Aero', '{{Aero}}');

  -- Protect false positives for 'oe' (oet→Poet, oex→Koexistenz, oef→Koeffizient)
  r := REPLACE(r, 'oet', '{{OET}}');
  r := REPLACE(r, 'Oet', '{{Oet}}');
  r := REPLACE(r, 'oex', '{{OEX}}');
  r := REPLACE(r, 'Oex', '{{Oex}}');
  r := REPLACE(r, 'oef', '{{OEF}}');
  r := REPLACE(r, 'Oef', '{{Oef}}');

  -- Replace umlaut substitutes (capitals first, then lowercase)
  r := REPLACE(r, 'Ae', 'Ä');
  r := REPLACE(r, 'ae', 'ä');
  r := REPLACE(r, 'Oe', 'Ö');
  r := REPLACE(r, 'oe', 'ö');
  r := REPLACE(r, 'Ue', 'Ü');
  r := REPLACE(r, 'ue', 'ü');

  -- Restore protected patterns
  r := REPLACE(r, '{{EUER}}', 'euer');
  r := REPLACE(r, '{{Euer}}', 'Euer');
  r := REPLACE(r, '{{_EUER}}', 'EUER');
  r := REPLACE(r, '{{AUER}}', 'auer');
  r := REPLACE(r, '{{Auer}}', 'Auer');
  r := REPLACE(r, '{{UELL}}', 'uell');
  r := REPLACE(r, '{{Uell}}', 'Uell');
  r := REPLACE(r, '{{UENT}}', 'uent');
  r := REPLACE(r, '{{UENZ}}', 'uenz');
  r := REPLACE(r, '{{AEL}}', 'ael');
  r := REPLACE(r, '{{Ael}}', 'Ael');
  r := REPLACE(r, '{{AERO}}', 'aero');
  r := REPLACE(r, '{{Aero}}', 'Aero');
  r := REPLACE(r, '{{OET}}', 'oet');
  r := REPLACE(r, '{{Oet}}', 'Oet');
  r := REPLACE(r, '{{OEX}}', 'oex');
  r := REPLACE(r, '{{Oex}}', 'Oex');
  r := REPLACE(r, '{{OEF}}', 'oef');
  r := REPLACE(r, '{{Oef}}', 'Oef');
  r := REPLACE(r, '{{AUEN}}', 'auen');
  r := REPLACE(r, '{{Auen}}', 'Auen');
  r := REPLACE(r, '{{EUE}}', 'eue');
  r := REPLACE(r, '{{Eue}}', 'Eue');
  r := REPLACE(r, '{{QUES}}', 'ques');
  r := REPLACE(r, '{{Ques}}', 'Ques');

  RETURN r;
END;
$$ LANGUAGE plpgsql;

-- Step 2: JSON-aware umlaut fixer — walks the tree, only transforms string values
CREATE OR REPLACE FUNCTION pg_temp.fix_umlauts_jsonb(input jsonb) RETURNS jsonb AS $$
DECLARE
  result jsonb;
  k text;
  v jsonb;
  elem jsonb;
  arr jsonb := '[]'::jsonb;
BEGIN
  IF input IS NULL THEN RETURN NULL; END IF;

  CASE jsonb_typeof(input)
    WHEN 'object' THEN
      result := '{}'::jsonb;
      FOR k, v IN SELECT * FROM jsonb_each(input) LOOP
        -- Recurse into value, leave key untouched
        result := result || jsonb_build_object(k, pg_temp.fix_umlauts_jsonb(v));
      END LOOP;
      RETURN result;
    WHEN 'array' THEN
      FOR elem IN SELECT * FROM jsonb_array_elements(input) LOOP
        arr := arr || jsonb_build_array(pg_temp.fix_umlauts_jsonb(elem));
      END LOOP;
      RETURN arr;
    WHEN 'string' THEN
      -- Only strings get umlaut replacement
      RETURN to_jsonb(pg_temp.fix_umlauts(input #>> '{}'));
    ELSE
      -- number, boolean, null — return unchanged
      RETURN input;
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- Fix exercises table
-- Plain text columns: use fix_umlauts directly
-- JSON columns: use fix_umlauts_jsonb (values only, keys/booleans safe)
UPDATE exercises SET
  instructions_de = pg_temp.fix_umlauts(instructions_de),
  title_de = pg_temp.fix_umlauts(title_de),
  explanation_de = pg_temp.fix_umlauts(explanation_de),
  content = pg_temp.fix_umlauts_jsonb(content),
  solution = pg_temp.fix_umlauts_jsonb(solution)
WHERE
  coalesce(instructions_de, '') ~ '(ae|oe|ue|Ae|Oe|Ue)'
  OR coalesce(title_de, '') ~ '(ae|oe|ue|Ae|Oe|Ue)'
  OR coalesce(explanation_de, '') ~ '(ae|oe|ue|Ae|Oe|Ue)'
  OR content::text ~ '(ae|oe|ue|Ae|Oe|Ue)'
  OR solution::text ~ '(ae|oe|ue|Ae|Oe|Ue)';

-- Fix reading_texts table
UPDATE reading_texts SET
  title_de = pg_temp.fix_umlauts(title_de),
  text_content = pg_temp.fix_umlauts(text_content),
  questions = pg_temp.fix_umlauts_jsonb(questions)
WHERE
  coalesce(title_de, '') ~ '(ae|oe|ue|Ae|Oe|Ue)'
  OR coalesce(text_content, '') ~ '(ae|oe|ue|Ae|Oe|Ue)'
  OR questions::text ~ '(ae|oe|ue|Ae|Oe|Ue)';

-- Fix writing_prompts table (no JSON columns)
UPDATE writing_prompts SET
  title_de = pg_temp.fix_umlauts(title_de),
  context_de = pg_temp.fix_umlauts(context_de)
WHERE
  coalesce(title_de, '') ~ '(ae|oe|ue|Ae|Oe|Ue)'
  OR coalesce(context_de, '') ~ '(ae|oe|ue|Ae|Oe|Ue)';
