import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/posthog';
import { NOUNS, VERBS, COLLOCATIONS, WORKSHOP_PHRASES, REFINEMENT_PHRASES, COMPOSURE_PHRASES, CRISIS_TRIGGERS } from '@/pages/ITVokabularPage';
import { SECTIONS } from '@/pages/SpeakingPage';
import { REDEMITTEL_SECTIONS } from '@/pages/WritingPage';
import { c1Expressions } from '@/data/c1Expressions';
import { techIdioms } from '@/data/techIdioms';

interface StarredItem {
  de: string;
  en: string;
  example?: string;
  source: string;
}

const IT_VOCAB_SECTIONS: { prefix: string; label: string; data: readonly { de: string; en: string; example?: string }[] }[] = [
  { prefix: 'nomen', label: 'it-nomen', data: NOUNS },
  { prefix: 'verben', label: 'it-verben', data: VERBS },
  { prefix: 'koll', label: 'it-kollokationen', data: COLLOCATIONS },
  { prefix: 'workshop', label: 'it-workshop', data: WORKSHOP_PHRASES },
  { prefix: 'refinement', label: 'it-refinement', data: REFINEMENT_PHRASES },
  { prefix: 'souv', label: 'it-souveränität', data: COMPOSURE_PHRASES },
  { prefix: 'krise', label: 'it-notfallkit', data: CRISIS_TRIGGERS.map(c => ({ de: c.response, en: c.trigger, example: c.strategy })) },
];

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

export function getAllStarredItems(userId: string): StarredItem[] {
  const items: StarredItem[] = [];

  // IT Vokabular (keyed by prefix-index)
  const itHighlights = loadSet(`it-vokabular-highlights-${userId}`);
  for (const section of IT_VOCAB_SECTIONS) {
    for (const key of itHighlights) {
      const match = key.match(new RegExp(`^${section.prefix}-(\\d+)$`));
      if (match) {
        const idx = parseInt(match[1], 10);
        const item = section.data[idx];
        if (item) items.push({ de: item.de, en: item.en, example: item.example, source: section.label });
      }
    }
  }

  // IT Redewendungen (keyed by German text)
  const itIdiomHighlights = loadSet('it-redewendungen-highlights');
  for (const german of itIdiomHighlights) {
    const idiom = techIdioms.find(i => i.german === german);
    if (idiom) items.push({ de: idiom.german, en: idiom.english, example: idiom.example, source: 'it-redewendungen' });
  }

  // Sprechen phrases
  const speakingHighlights = loadSet('speaking-highlights');
  for (const section of SECTIONS) {
    for (const sub of section.subsections) {
      for (const phrase of sub.phrases) {
        if (speakingHighlights.has(phrase.de)) {
          items.push({ de: phrase.de, en: phrase.en, source: `sprechen-${section.tab}` });
        }
      }
    }
  }

  // Sprechen expressions
  for (const expr of c1Expressions) {
    if (speakingHighlights.has(expr.german)) {
      items.push({ de: expr.german, en: expr.english, example: expr.example, source: 'sprechen-redewendungen' });
    }
  }

  // Writing Redemittel (keyed by German text)
  const writingHighlights = loadSet('writing-tips-highlights');
  for (const section of REDEMITTEL_SECTIONS) {
    for (const sub of section.subsections) {
      for (const phrase of sub.phrases) {
        if (writingHighlights.has(phrase.de)) {
          items.push({ de: phrase.de, en: phrase.en, source: `schreiben-${section.tab}` });
        }
      }
    }
  }

  return items.filter(i => i.de && i.en);
}

/**
 * Sync localStorage starred items to personal_vocabulary table.
 * Skips items that already exist. Safe to call multiple times.
 */
export async function syncStarredToDb(userId: string): Promise<void> {
  const starred = getAllStarredItems(userId);
  if (starred.length === 0) return;

  const { data: existing } = await supabase
    .from('personal_vocabulary')
    .select('word_de')
    .eq('user_id', userId);
  const existingSet = new Set((existing ?? []).map(w => w.word_de));
  const toInsert = starred.filter(s => !existingSet.has(s.de));
  if (toInsert.length === 0) return;

  const now = new Date().toISOString();
  await supabase.from('personal_vocabulary').upsert(
    toInsert.map(item => ({
      user_id: userId,
      word_de: item.de,
      translation_en: item.en,
      translation_custom: null,
      example_sentence: item.example || null,
      source_type: item.source,
      box_number: 1,
      next_review_at: now,
    })),
    { onConflict: 'user_id,word_de,source_type', ignoreDuplicates: true }
  );
  track('vocab_synced', { count: toInsert.length, source_types: [...new Set(toInsert.map(i => i.source))] });
}
