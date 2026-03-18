import { useState, useEffect } from 'react';

export type TextSize = 'compact' | 'default' | 'large';

const STORAGE_KEY = 'c1-text-size';
const CLASS_MAP: Record<TextSize, string | null> = {
  compact: 'text-size-compact',
  default: null,
  large: 'text-size-large',
};

function applySize(size: TextSize) {
  const html = document.documentElement;
  Object.values(CLASS_MAP).forEach((cls) => {
    if (cls) html.classList.remove(cls);
  });
  const cls = CLASS_MAP[size];
  if (cls) html.classList.add(cls);
}

export function useTextSize() {
  const [size, setSize] = useState<TextSize>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as TextSize) || 'default';
  });

  useEffect(() => {
    applySize(size);
    localStorage.setItem(STORAGE_KEY, size);
  }, [size]);

  return { size, setSize };
}

/** Call once at app startup to apply saved preference before first paint. */
export function initTextSize() {
  const stored = localStorage.getItem(STORAGE_KEY) as TextSize | null;
  if (stored && CLASS_MAP[stored]) {
    document.documentElement.classList.add(CLASS_MAP[stored]!);
  }
}
