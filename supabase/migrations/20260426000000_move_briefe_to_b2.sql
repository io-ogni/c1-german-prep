-- Move formelle Briefe from C1 to B1-B2 — not part of telc C1 Schriftlicher Ausdruck
UPDATE writing_prompts SET level = 'solid_b2'
WHERE id IN (
  '480a7537-a3ac-4f38-a10a-587642dcc47e',  -- Bewerbung für einen Sprachkurs
  'bd1cfe80-3b16-4b61-be95-4146eaf87019'   -- Bitte um Arbeitszeugnis
);
