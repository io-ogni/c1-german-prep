import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('handles undefined and null', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2');
  });
});

describe('translations completeness', () => {
  it('all translation keys have non-empty values', async () => {
    const { translations } = await import('@/i18n/translations');
    const deTranslations = translations.de;
    const INTENTIONALLY_EMPTY = ['home_subtitle']; // dynamic subtitles generated at runtime
    for (const [key, value] of Object.entries(deTranslations)) {
      if (INTENTIONALLY_EMPTY.includes(key)) continue;
      expect(value, `Empty translation for key: ${key}`).toBeTruthy();
    }
  });
});
