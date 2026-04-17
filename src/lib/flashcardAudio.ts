/**
 * Resolves Google Cloud TTS audio URLs for flashcard items.
 * Only returns a URL when a pre-recorded MP3 exists that matches
 * the word/phrase shown on the card (not example sentences).
 */

import { COMPOSURE_PHRASES, CRISIS_TRIGGERS } from '@/pages/ITVokabularPage';
import { SECTIONS } from '@/pages/SpeakingPage';
import { REDEMITTEL_SECTIONS } from '@/pages/WritingPage';
import { c1Expressions } from '@/data/c1Expressions';
import { techIdioms } from '@/data/techIdioms';
import { NV_VERBINDUNGEN } from '@/data/nvVerbindungen';
import { PRAEPOSITIONEN } from '@/data/praepositionen';

// ── Audio file imports (eager, deduped by Vite) ──

const audioFiles: Record<string, Record<string, string>> = {
  'it-redewendungen': import.meta.glob('/src/assets/audio/it-redewendungen/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'souveranitaet': import.meta.glob('/src/assets/audio/souveranitaet/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'notfallkit': import.meta.glob('/src/assets/audio/notfallkit/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'sprechen-praesentation': import.meta.glob('/src/assets/audio/sprechen-praesentation/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'sprechen-diskussion': import.meta.glob('/src/assets/audio/sprechen-diskussion/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'sprechen-zusammenfassung': import.meta.glob('/src/assets/audio/sprechen-zusammenfassung/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'sprechen-redemittel': import.meta.glob('/src/assets/audio/sprechen-redemittel/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'expressions': import.meta.glob('/src/assets/audio/expressions/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'schreiben-einleitung': import.meta.glob('/src/assets/audio/schreiben-einleitung/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'schreiben-hauptteil': import.meta.glob('/src/assets/audio/schreiben-hauptteil/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'schreiben-schluss': import.meta.glob('/src/assets/audio/schreiben-schluss/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'schreiben-strukturen': import.meta.glob('/src/assets/audio/schreiben-strukturen/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'nv-verbindungen': import.meta.glob('/src/assets/audio/nv-verbindungen/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'praepositionen': import.meta.glob('/src/assets/audio/praepositionen/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
};

function getUrl(section: string, index: number): string | undefined {
  const map = audioFiles[section];
  if (!map) return undefined;
  const padded = String(index + 1).padStart(2, '0');
  return map[`/src/assets/audio/${section}/${section}-${padded}.mp3`];
}

// ── Flatten speaking/writing sections into sequential index maps ──

function flattenSections(sections: typeof SECTIONS): Record<string, Map<string, number>> {
  const result: Record<string, Map<string, number>> = {};
  for (const section of sections) {
    const m = new Map<string, number>();
    let i = 0;
    for (const sub of section.subsections) {
      for (const phrase of sub.phrases) {
        m.set(phrase.de, i);
        i++;
      }
    }
    result[section.tab] = m;
  }
  return result;
}

const speakingIndexes = flattenSections(SECTIONS);
const writingIndexes = flattenSections(REDEMITTEL_SECTIONS);

// ── Build word→URL lookup per source_type ──

const cache = new Map<string, Map<string, string>>();

function buildLookup(sourceType: string): Map<string, string> {
  const m = new Map<string, string>();

  if (sourceType === 'it-redewendungen') {
    for (const idiom of techIdioms) {
      const padded = String(idiom.id).padStart(2, '0');
      const url = audioFiles['it-redewendungen']?.[`/src/assets/audio/it-redewendungen/it-redewendungen-${padded}.mp3`];
      if (url) m.set(idiom.german, url);
    }
  } else if (sourceType === 'it-souveränität') {
    COMPOSURE_PHRASES.forEach((p, i) => {
      const url = getUrl('souveranitaet', i);
      if (url) m.set(p.de, url);
    });
  } else if (sourceType === 'it-notfallkit') {
    CRISIS_TRIGGERS.forEach((c, i) => {
      const url = getUrl('notfallkit', i);
      if (url) m.set(c.response, url);
    });
  } else if (sourceType === 'sprechen-redewendungen') {
    c1Expressions.forEach((e, i) => {
      const url = getUrl('expressions', i);
      if (url) m.set(e.german, url);
    });
  } else if (sourceType.startsWith('sprechen-')) {
    const tab = sourceType.replace('sprechen-', '');
    const audioSection = `sprechen-${tab}`;
    const indexes = speakingIndexes[tab];
    if (indexes) {
      for (const [de, idx] of indexes) {
        const url = getUrl(audioSection, idx);
        if (url) m.set(de, url);
      }
    }
  } else if (sourceType.startsWith('schreiben-')) {
    const tab = sourceType.replace('schreiben-', '');
    const audioSection = tab === 'c1-strukturen' ? 'schreiben-strukturen' : `schreiben-${tab}`;
    const indexes = writingIndexes[tab];
    if (indexes) {
      for (const [de, idx] of indexes) {
        const url = getUrl(audioSection, idx);
        if (url) m.set(de, url);
      }
    }
  } else if (sourceType === 'nv-verbindungen') {
    NV_VERBINDUNGEN.forEach((item, i) => {
      const url = getUrl('nv-verbindungen', i);
      if (url) m.set(item.de, url);
    });
  } else if (sourceType === 'praepositionen') {
    PRAEPOSITIONEN.forEach((item, i) => {
      const url = getUrl('praepositionen', i);
      if (url) m.set(`${item.verb_or_adj} ${item.preposition}`, url);
    });
  }

  return m;
}

/**
 * Returns a Google Cloud TTS audio URL for a flashcard item, or undefined
 * if no pre-recorded audio exists for this word/phrase.
 */
export function getFlashcardAudioUrl(sourceType: string, wordDe: string): string | undefined {
  if (!cache.has(sourceType)) {
    cache.set(sourceType, buildLookup(sourceType));
  }
  return cache.get(sourceType)!.get(wordDe);
}
