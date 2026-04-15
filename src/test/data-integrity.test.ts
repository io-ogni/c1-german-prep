import { describe, it, expect, vi } from 'vitest';
import { PRAEPOSITIONEN } from '@/data/praepositionen';
import { NV_VERBINDUNGEN } from '@/data/nvVerbindungen';
import { c1Expressions } from '@/data/c1Expressions';
import { techIdioms } from '@/data/techIdioms';

// Mock modules that create circular import chains through syncStarredVocab
vi.mock('@/lib/syncStarredVocab', () => ({ getAllStarredItems: () => [], syncStarredToDb: async () => {} }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { auth: { getSession: async () => ({ data: { session: null } }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) }, from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null }) }) }) }) } }));

async function loadITVocab() {
  const mod = await import('@/pages/ITVokabularPage');
  return mod;
}

describe('IT Vocabulary data integrity', () => {
  it('every noun has de, en, and example fields', async () => {
    const { NOUNS } = await loadITVocab();
    for (const noun of NOUNS) {
      expect(noun.de, `Noun missing 'de': ${JSON.stringify(noun)}`).toBeTruthy();
      expect(noun.en, `Noun missing 'en': ${noun.de}`).toBeTruthy();
      expect(noun.example, `Noun missing 'example': ${noun.de}`).toBeTruthy();
    }
  });

  it('every noun has a German article (Der/Die/Das)', async () => {
    const { NOUNS } = await loadITVocab();
    for (const noun of NOUNS) {
      expect(noun.de).toMatch(/^(Der|Die|Das) /);
    }
  });

  it('nouns have no duplicates', async () => {
    const { NOUNS } = await loadITVocab();
    const deValues = NOUNS.map(n => n.de);
    const dupes = deValues.filter((v, i) => deValues.indexOf(v) !== i);
    expect(dupes, `Duplicate nouns found: ${dupes.join(', ')}`).toHaveLength(0);
  });

  it('every verb has de, en, and example fields', async () => {
    const { VERBS } = await loadITVocab();
    for (const verb of VERBS) {
      expect(verb.de).toBeTruthy();
      expect(verb.en).toBeTruthy();
      expect(verb.example).toBeTruthy();
    }
  });

  it('every collocation has phrase, en, and example fields', async () => {
    const { COLLOCATIONS } = await loadITVocab();
    for (const coll of COLLOCATIONS) {
      expect(coll.phrase, `Collocation missing 'phrase': ${JSON.stringify(coll)}`).toBeTruthy();
      expect(coll.en, `Collocation missing 'en': ${coll.phrase}`).toBeTruthy();
      expect(coll.example, `Collocation missing 'example': ${coll.phrase}`).toBeTruthy();
    }
  });

  it('workshop phrases all have required fields', async () => {
    const { WORKSHOP_PHRASES } = await loadITVocab();
    for (const p of WORKSHOP_PHRASES) {
      expect(p.de).toBeTruthy();
      expect(p.en).toBeTruthy();
    }
  });

  it('refinement phrases all have required fields', async () => {
    const { REFINEMENT_PHRASES } = await loadITVocab();
    for (const p of REFINEMENT_PHRASES) {
      expect(p.de).toBeTruthy();
      expect(p.en).toBeTruthy();
      expect(p.category).toBeTruthy();
    }
  });

  it('composure phrases all have required fields', async () => {
    const { COMPOSURE_PHRASES } = await loadITVocab();
    for (const p of COMPOSURE_PHRASES) {
      expect(p.de).toBeTruthy();
      expect(p.en).toBeTruthy();
      expect(p.situation).toBeTruthy();
    }
  });

  it('crisis triggers all have required fields', async () => {
    const { CRISIS_TRIGGERS } = await loadITVocab();
    for (const c of CRISIS_TRIGGERS) {
      expect(c.trigger).toBeTruthy();
      expect(c.response).toBeTruthy();
      expect(c.strategy).toBeTruthy();
    }
  });
});

describe('Präpositionen data integrity', () => {
  it('every item has verb_or_adj, preposition, en, and example', () => {
    for (const item of PRAEPOSITIONEN) {
      expect(item.verb_or_adj, `Missing verb_or_adj`).toBeTruthy();
      expect(item.preposition, `Missing preposition for ${item.verb_or_adj}`).toBeTruthy();
      expect(item.en, `Missing en for ${item.verb_or_adj}`).toBeTruthy();
      expect(item.example, `Missing example for ${item.verb_or_adj}`).toBeTruthy();
    }
  });

  it('prepositions include case markers', () => {
    for (const item of PRAEPOSITIONEN) {
      expect(item.preposition).toMatch(/\+(?:Akk|Dat)/);
    }
  });
});

describe('NV-Verbindungen data integrity', () => {
  it('every item has de, en, example, and category', () => {
    for (const item of NV_VERBINDUNGEN) {
      expect(item.de).toBeTruthy();
      expect(item.en).toBeTruthy();
      expect(item.example).toBeTruthy();
      expect(item.category).toBeTruthy();
    }
  });
});

describe('C1 Expressions data integrity', () => {
  it('every expression has german and english fields', () => {
    for (const expr of c1Expressions) {
      expect(expr.german, `Missing german`).toBeTruthy();
      expect(expr.english, `Missing english for: ${expr.german}`).toBeTruthy();
    }
  });
});

describe('Tech Idioms data integrity', () => {
  it('every idiom has german, english, and example', () => {
    for (const idiom of techIdioms) {
      expect(idiom.german).toBeTruthy();
      expect(idiom.english).toBeTruthy();
      expect(idiom.example).toBeTruthy();
    }
  });

  it('no duplicate idioms', () => {
    const germanPhrases = techIdioms.map(i => i.german);
    const unique = new Set(germanPhrases);
    expect(unique.size).toBe(germanPhrases.length);
  });
});

describe('German text quality', () => {
  it('German text contains proper umlauts (no ascii substitutes)', async () => {
    const { NOUNS, VERBS, COLLOCATIONS } = await loadITVocab();
    const allDe = [
      ...NOUNS.map(n => n.de),
      ...NOUNS.map(n => n.example),
      ...VERBS.map(v => v.de),
      ...COLLOCATIONS.map(c => c.phrase),
    ].filter(Boolean); // filter out any undefined
    for (const text of allDe) {
      expect(text).not.toMatch(/\bae\b|\boe\b|\bue\b/i);
    }
  });
});
