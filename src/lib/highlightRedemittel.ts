import { REDEMITTEL_SECTIONS } from '@/pages/WritingPage';

/**
 * Given a model answer text, find which word positions belong to Redemittel phrases.
 * Returns a Set of word-position keys in the format used by ClickableText: `${pIdx}-0-${wIdx}`
 *
 * Strategy: extract fixed parts from Redemittel phrases (split on "..."),
 * find them as case-insensitive substrings, then map character positions to word indices.
 */

function buildPhraseFragments(): string[] {
  const fragments: string[] = [];
  for (const section of REDEMITTEL_SECTIONS) {
    for (const sub of section.subsections) {
      for (const phrase of sub.phrases) {
        // Split on "..." to get the fixed parts
        const parts = phrase.de.split(/\s*\.\.\.\s*/);
        for (const part of parts) {
          // Strip trailing punctuation, trim
          const cleaned = part.replace(/[.,;:!?]+$/, '').trim();
          if (cleaned.length >= 8) { // only match substantial fragments
            fragments.push(cleaned);
          }
        }
      }
    }
  }
  // Sort by length descending so longer matches take priority
  fragments.sort((a, b) => b.length - a.length);
  return fragments;
}

let cachedFragments: string[] | null = null;

function getFragments(): string[] {
  if (!cachedFragments) cachedFragments = buildPhraseFragments();
  return cachedFragments;
}

/**
 * Build a set of word-position keys that should be highlighted as Redemittel.
 * Keys match ClickableText's WordKey format: `${paragraphIdx}-0-${wordIdx}`
 */
export function findRedemittelHighlights(text: string): Set<string> {
  const highlights = new Set<string>();
  const fragments = getFragments();
  const textLower = text.toLowerCase();

  // Build a map: character position → word key
  // ClickableText splits on \n\n for paragraphs, then on \s+ for words
  const paragraphs = text.split('\n\n');
  const charToKey: Map<number, string> = new Map();

  let charOffset = 0;
  for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
    const para = paragraphs[pIdx];
    const words = para.split(/(\s+)/);
    let localOffset = 0;
    let wIdx = 0;

    for (const token of words) {
      if (/^\s+$/.test(token)) {
        localOffset += token.length;
        continue;
      }
      // Map each character of this word to its key
      for (let c = 0; c < token.length; c++) {
        charToKey.set(charOffset + localOffset + c, `${pIdx}-0-${wIdx}`);
      }
      localOffset += token.length;
      wIdx++;
    }

    charOffset += para.length + 2; // +2 for the \n\n separator
  }

  // For each fragment, find all occurrences in text and mark word keys
  const matched = new Set<number>(); // already-matched character positions
  for (const fragment of fragments) {
    const fragLower = fragment.toLowerCase();
    let searchFrom = 0;
    while (true) {
      const idx = textLower.indexOf(fragLower, searchFrom);
      if (idx === -1) break;

      // Check that this span isn't already matched by a longer fragment
      let alreadyCovered = false;
      for (let c = idx; c < idx + fragment.length; c++) {
        if (matched.has(c)) { alreadyCovered = true; break; }
      }

      if (!alreadyCovered) {
        for (let c = idx; c < idx + fragment.length; c++) {
          matched.add(c);
          const key = charToKey.get(c);
          if (key) highlights.add(key);
        }
      }

      searchFrom = idx + 1;
    }
  }

  return highlights;
}
