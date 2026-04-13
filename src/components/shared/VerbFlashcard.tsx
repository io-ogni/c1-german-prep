import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Eye, RotateCcw, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Tables } from '@/integrations/supabase/types';

type Verb = Tables<'verb_conjugations'>;

const SUCCESS_MESSAGES = [
  "Perfekt! 🔥", "Stark! 💪", "Genau! ✨", "Weiter so! 🚀",
  "Volltreffer! 🎯", "Klasse! 🌟",
];
const FAIL_MESSAGES = [
  "Nächstes Mal! 💡", "Übung macht den Meister 📚", "Dranbleiben! 🧠",
  "Kommt noch! 🌱",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface VerbFlashcardProps {
  verbs: Verb[];
  compact?: boolean;
}

export function VerbFlashcard({ verbs, compact }: VerbFlashcardProps) {
  const [deck, setDeck] = useState(() => shuffle(verbs));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [exitAnim, setExitAnim] = useState<'left' | 'right' | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | null>(null);

  const current = deck[index];
  const progress = deck.length > 0 ? (index / deck.length) * 100 : 0;

  const answer = useCallback((knewIt: boolean) => {
    const direction = knewIt ? 'right' : 'left';
    setExitAnim(direction);

    const msgs = knewIt ? SUCCESS_MESSAGES : FAIL_MESSAGES;
    setFeedback(msgs[Math.floor(Math.random() * msgs.length)]);
    setFeedbackType(knewIt ? 'correct' : 'wrong');

    if (knewIt) setCorrect(c => c + 1);
    setTotal(t => t + 1);

    setTimeout(() => {
      setFlipped(false);
      setExitAnim(null);
      requestAnimationFrame(() => {
        setIndex(i => i + 1);
      });
      setTimeout(() => {
        setFeedback(null);
        setFeedbackType(null);
      }, 1200);
    }, 350);
  }, []);

  const restart = useCallback(() => {
    setDeck(shuffle(verbs));
    setIndex(0);
    setFlipped(false);
    setCorrect(0);
    setTotal(0);
    setExitAnim(null);
    setFeedback(null);
    setFeedbackType(null);
  }, [verbs]);

  // Keyboard shortcuts
  useEffect(() => {
    if (compact) return;
    const handler = (e: KeyboardEvent) => {
      if (index >= deck.length) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!flipped) setFlipped(true);
      }
      if (flipped) {
        if (e.key === 'ArrowRight' || e.key === '1') answer(true);
        if (e.key === 'ArrowLeft' || e.key === '2') answer(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [compact, flipped, index, deck.length, answer]);

  if (!current || index >= deck.length) {
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="relative mx-auto w-20 h-20">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="stroke-secondary" />
            <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="stroke-primary" strokeLinecap="round"
              strokeDasharray={`${pct * 2.64} ${264 - pct * 2.64}`}
              style={{ transition: 'stroke-dasharray 1s ease-out' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-foreground">{pct}%</span>
        </div>
        <p className="text-sm text-muted-foreground">{correct} / {total} richtig</p>
        <Button onClick={restart} variant="outline" size="sm" className="gap-1">
          <RotateCcw className="h-3.5 w-3.5" /> Nochmal
        </Button>
      </div>
    );
  }

  const minH = compact ? 'min-h-[200px]' : 'min-h-[280px]';

  return (
    <div className="flex flex-col items-center gap-4 relative rounded-2xl border border-border bg-muted/30 p-4 sm:p-6">
      {/* Feedback toast */}
      {feedback && (
        <div className={cn(
          'absolute top-2 z-10 px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce',
          feedbackType === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
        )}>
          {feedback}
        </div>
      )}

      {/* Progress */}
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-end mb-2">
          <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-1 text-green-600"><Check className="w-4 h-4" /> {correct}</span>
            <span className="flex items-center gap-1 text-destructive"><X className="w-4 h-4" /> {total - correct}</span>
            <span>{index + 1} / {deck.length}</span>
          </div>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Card with flip + slide */}
      <div
        className={cn(
          'w-full max-w-xl cursor-pointer select-none',
          exitAnim === 'right' && 'animate-slide-out-right',
          exitAnim === 'left' && 'animate-slide-out-left',
        )}
        onClick={() => !flipped && setFlipped(true)}
        style={{ perspective: '1200px' }}
      >
        <div
          className={cn(
            `relative w-full ${minH} transition-transform duration-500`,
            flipped && '[transform:rotateY(180deg)]',
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-border bg-card p-6 flex flex-col items-center justify-center text-center shadow-lg"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                {current.is_irregular ? 'unregelmäßig' : 'regelmäßig'}
              </span>
            </div>
            <p className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-foreground`}>{current.infinitiv}</p>
            <p className="text-xs text-muted-foreground mt-2">{current.bedeutung_en}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-4">er/sie/es · Präteritum · Perfekt</p>
            <div className="mt-3 flex items-center gap-1.5 text-muted-foreground text-xs">
              <Eye className="w-3.5 h-3.5" />
              <span>Klicken zum Aufdecken</span>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-primary/30 bg-card p-6 flex flex-col items-center justify-center text-center shadow-lg"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Antwort
              </span>
            </div>
            <p className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-foreground mb-4`}>{current.infinitiv}</p>
            <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">er/sie/es</p>
                <p className="font-semibold text-foreground text-sm">{current.praesens_er}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Präteritum</p>
                <p className="font-semibold text-foreground text-sm">{current.praeteritum_ich}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Perfekt</p>
                <p className="font-semibold text-foreground text-sm">{current.perfekt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-xl">
        {!flipped ? (
          <div className="flex justify-center">
            <Button size={compact ? 'sm' : 'default'} onClick={() => setFlipped(true)}>
              <Eye className="w-4 h-4 mr-1" /> Aufdecken
            </Button>
          </div>
        ) : (
          <div className="flex justify-center gap-3">
            <Button onClick={() => answer(false)} size={compact ? 'sm' : 'default'} className="gap-1 bg-orange-500 text-white hover:bg-orange-600">
              <XCircle className="h-4 w-4" /> Nicht gewusst
            </Button>
            <Button onClick={() => answer(true)} size={compact ? 'sm' : 'default'} className="gap-1">
              <CheckCircle className="h-4 w-4" /> Gewusst
            </Button>
          </div>
        )}
      </div>

      {!compact && (
        <p className="hidden sm:block text-xs text-muted-foreground">
          <kbd className="px-1.5 py-0.5 rounded border bg-secondary text-xs">Leertaste</kbd> aufdecken ·
          <kbd className="px-1.5 py-0.5 rounded border bg-secondary text-xs ml-1">→</kbd> richtig ·
          <kbd className="px-1.5 py-0.5 rounded border bg-secondary text-xs ml-1">←</kbd> falsch
        </p>
      )}
    </div>
  );
}
