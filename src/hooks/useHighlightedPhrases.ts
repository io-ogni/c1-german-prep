import { useState, useCallback } from 'react';

function load(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

function save(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export function useHighlightedPhrases(storageKey: string) {
  const [highlighted, setHighlighted] = useState<Set<string>>(() => load(storageKey));

  const toggle = useCallback((phrase: string) => {
    setHighlighted(prev => {
      const next = new Set(prev);
      if (next.has(phrase)) {
        next.delete(phrase);
      } else {
        next.add(phrase);
      }
      save(storageKey, next);
      return next;
    });
  }, [storageKey]);

  const isHighlighted = useCallback((phrase: string) => highlighted.has(phrase), [highlighted]);

  return { isHighlighted, toggle };
}
