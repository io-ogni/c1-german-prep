import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LS_KEY = 'selection-hint-dismissed';

type HintKey = string;
type HintVariant = 'table' | 'card' | 'reading';

function isKeyDismissed(key: HintKey): boolean {
  try {
    const val = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    return !!val[key];
  } catch { return false; }
}

export function markHintInteraction(key: HintKey) {
  try {
    const val = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    val[key] = true;
    localStorage.setItem(LS_KEY, JSON.stringify(val));
    window.dispatchEvent(new Event('selection-hint-update'));
  } catch {}
}

const HINT_TEXT: Record<HintVariant, React.ReactNode> = {
  table: <>Markiere Einträge per Klick — sie landen in deinem <Link to="/my-vocabulary" className="underline hover:text-foreground/70">Wortschatz</Link> zum Üben.</>,
  card: <>Markiere Einträge per Klick — sie landen in deinem <Link to="/my-vocabulary" className="underline hover:text-foreground/70">Wortschatz</Link> zum Üben.</>,
  reading: <>Tippe auf ein Wort im Text, um es in deinen <Link to="/my-vocabulary" className="underline hover:text-foreground/70">Wortschatz</Link> zu speichern.</>,
};

export function SelectionHint({ hintKey, variant = 'table' }: { hintKey: string; variant?: HintVariant }) {
  const [animate, setAnimate] = useState(() => !isKeyDismissed(hintKey));

  useEffect(() => {
    const handler = () => setAnimate(!isKeyDismissed(hintKey));
    window.addEventListener('selection-hint-update', handler);
    return () => window.removeEventListener('selection-hint-update', handler);
  }, [hintKey]);

  const text = HINT_TEXT[variant];

  return (
    <p className="text-xs text-muted-foreground">
      {animate ? <span className="hint-shimmer">{text}</span> : text}
    </p>
  );
}
