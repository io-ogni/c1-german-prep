import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LS_KEY = 'selection-hint-dismissed';

function isTypeDismissed(type: 'card' | 'table'): boolean {
  try {
    const val = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    return !!val[type];
  } catch { return false; }
}

export function markHintInteraction(type: 'card' | 'table') {
  try {
    const val = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    val[type] = true;
    localStorage.setItem(LS_KEY, JSON.stringify(val));
    window.dispatchEvent(new Event('selection-hint-update'));
  } catch {}
}

export function SelectionHint({ type = 'table' }: { type?: 'card' | 'table' }) {
  const [animate, setAnimate] = useState(() => !isTypeDismissed(type));

  useEffect(() => {
    const handler = () => setAnimate(!isTypeDismissed(type));
    window.addEventListener('selection-hint-update', handler);
    return () => window.removeEventListener('selection-hint-update', handler);
  }, [type]);

  const text = (
    <>Markiere Einträge per Klick — sie landen in deinem <Link to="/my-vocabulary" className="underline hover:text-foreground/70">Wortschatz</Link> zum Üben.</>
  );

  return (
    <p className="text-xs text-muted-foreground">
      {animate ? <span className="hint-shimmer">{text}</span> : text}
    </p>
  );
}
