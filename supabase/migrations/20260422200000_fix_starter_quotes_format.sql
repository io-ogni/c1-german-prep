-- Fix starter_quotes format: convert from object {quote_1: {...}, quote_2: {...}}
-- to array [{text, source}, {text, source}] so the frontend can render them.
-- The WritingPage code does: (prompt.starter_quotes as {text, source}[]).map(...)
-- Objects don't have .map(), so quotes were silently hidden.

UPDATE writing_prompts
SET starter_quotes = jsonb_build_array(
  starter_quotes->'quote_1',
  starter_quotes->'quote_2'
)
WHERE starter_quotes IS NOT NULL
  AND starter_quotes ? 'quote_1';
