-- Add example_texts column to writing_prompts
-- Stores 3 model Erörterungen/Stellungnahmen per prompt
-- Format: [{title: string, text: string}, ...]
-- Used in the "Beispiele" tab to show students completed examples before writing

ALTER TABLE writing_prompts
ADD COLUMN IF NOT EXISTS example_texts jsonb DEFAULT NULL;

COMMENT ON COLUMN writing_prompts.example_texts IS 'Array of 3 model texts [{title, text}] shown in Beispiele tab';
