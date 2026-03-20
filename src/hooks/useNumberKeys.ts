import { useEffect } from 'react';

/**
 * Keyboard shortcut hook for option-select exercises.
 * Press 1-9 to select an option by index. Only fires when not typing in an input/textarea.
 */
export function useNumberKeys(
  onSelect: (index: number) => void,
  optionCount: number,
  disabled: boolean,
) {
  useEffect(() => {
    if (disabled) return;
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= optionCount) {
        e.preventDefault();
        onSelect(num - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSelect, optionCount, disabled]);
}
