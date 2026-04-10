import { useState, useCallback, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { flashcards, type Flashcard } from '@/data/flashcards';
import { RotateCcw, Check, X, Eye, CheckCircle, XCircle, Trophy, Sparkles, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ITDeutschNav } from '@/components/layout/ITDeutschNav';
import { useTranslation } from '@/i18n/useTranslation';

const SUCCESS_MESSAGES = [
  "Perfekt! 🔥", "Stark! 💪", "Genau richtig! ✨", "Weiter so! 🚀",
  "Volltreffer! 🎯", "Klasse! 🌟", "Ausgezeichnet! 👏", "Super gemacht! 🎉",
];

const FAIL_MESSAGES = [
  "Nächstes Mal! 💡", "Übung macht den Meister 📚", "Dranbleiben! 🧠",
  "Nicht aufgeben! 💪", "Kommt noch! 🌱", "Weiter üben! 📝",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type CardResult = 'correct' | 'wrong' | 'skipped';

export default function FlashcardsPage() {
  const { t } = useTranslation();
  const [cards, setCards] = useState<Flashcard[]>(() => shuffle(flashcards));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<CardResult[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [exitAnim, setExitAnim] = useState<'left' | 'right' | null>(null);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex) / cards.length) * 100;
  const correctCount = results.filter(r => r === 'correct').length;
  const wrongCount = results.filter(r => r === 'wrong').length;
  const skippedCount = results.filter(r => r === 'skipped').length;

  const showFeedback = useCallback((type: 'correct' | 'wrong') => {
    const msgs = type === 'correct' ? SUCCESS_MESSAGES : FAIL_MESSAGES;
    setFeedbackMessage(msgs[Math.floor(Math.random() * msgs.length)]);
    setFeedbackType(type);
  }, []);

  const goNext = useCallback((result: CardResult) => {
    const direction = result === 'correct' ? 'right' : 'left';
    setExitAnim(direction);

    if (result !== 'skipped') {
      showFeedback(result === 'correct' ? 'correct' : 'wrong');
    }

    setTimeout(() => {
      setIsFlipped(false);
      setExitAnim(null);
      // Wait a frame for the flip to reset before showing the next card,
      // otherwise the next card's answer flashes briefly
      requestAnimationFrame(() => {
        setResults(prev => [...prev, result]);
        if (currentIndex + 1 >= cards.length) {
          setIsFinished(true);
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      });
      setTimeout(() => {
        setFeedbackMessage(null);
        setFeedbackType(null);
      }, 1200);
    }, 350);
  }, [currentIndex, cards.length, showFeedback]);

  const restart = useCallback(() => {
    setCards(shuffle(flashcards));
    setCurrentIndex(0);
    setResults([]);
    setIsFlipped(false);
    setIsFinished(false);
    setFeedbackMessage(null);
    setFeedbackType(null);
    setExitAnim(null);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isFinished) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isFlipped) setIsFlipped(true);
      }
      if (isFlipped) {
        if (e.key === 'ArrowRight' || e.key === '1') goNext('correct');
        if (e.key === 'ArrowLeft' || e.key === '2') goNext('wrong');
      }
      if (e.key === 's' || e.key === 'S') goNext('skipped');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFlipped, isFinished, goNext]);

  if (isFinished) {
    const total = results.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    return (
      <div className="space-y-6">
        <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          {t('nav_it_deutsch')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Damit 'Can you maybe look into this?' endlich auf Deutsch genauso passiv-aggressiv klingt.</p>
      </div>
          <ITDeutschNav />
        <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-full max-w-lg text-center space-y-8 animate-scale-in">
          {/* Trophy */}
          <div className="relative mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-primary" />
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-success-foreground" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground">Geschafft! 🎉</h2>
            <p className="text-muted-foreground mt-2">{cards.length} Karten durchgearbeitet</p>
          </div>

          {/* Score ring */}
          <div className="relative mx-auto w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="stroke-secondary" />
              <circle
                cx="50" cy="50" r="42" fill="none" strokeWidth="8"
                className="stroke-primary"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 2.64} ${264 - percentage * 2.64}`}
                style={{ transition: 'stroke-dasharray 1s ease-out' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground">
              {percentage}%
            </span>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm text-foreground">{correctCount} richtig</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm text-foreground">{wrongCount} falsch</span>
            </div>
            {skippedCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <span className="text-sm text-foreground">{skippedCount} übersprungen</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={restart}>
              <RotateCcw className="w-4 h-4" /> Nochmal spielen
            </Button>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          {t('nav_it_deutsch')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Damit 'Can you maybe look into this?' endlich auf Deutsch genauso passiv-aggressiv klingt.</p>
      </div>
      <ITDeutschNav />

      <div className="flex flex-col items-center gap-4 relative rounded-2xl border border-border bg-muted/30 p-4 sm:p-6">

      {/* Feedback toast */}
      {feedbackMessage && (
        <div className={cn(
          'absolute top-2 z-10 px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce',
          feedbackType === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
        )}>
          {feedbackMessage}
        </div>
      )}

      {/* Progress */}
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-end mb-2">
          <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-1 text-green-600"><Check className="w-4 h-4" /> {correctCount}</span>
            <span className="flex items-center gap-1 text-destructive"><X className="w-4 h-4" /> {wrongCount}</span>
            <span>{currentIndex + 1} / {cards.length}</span>
          </div>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Card */}
      <div
        className={cn(
          "w-full max-w-xl cursor-pointer select-none",
          exitAnim === 'right' && 'animate-slide-out-right',
          exitAnim === 'left' && 'animate-slide-out-left',
        )}
        onClick={() => !isFlipped && setIsFlipped(true)}
        style={{ perspective: '1200px' }}
      >
        <div
          className={cn(
            "relative w-full min-h-[280px] transition-transform duration-500",
            isFlipped && "[transform:rotateY(180deg)]"
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
                Frage
              </span>
            </div>
            <p className="text-xl font-bold text-foreground leading-relaxed max-w-md">
              {currentCard.question}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-muted-foreground text-xs">
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
            <p className="text-xl font-bold text-foreground leading-relaxed max-w-md">
              {currentCard.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-xl">
        {!isFlipped ? (
          <div className="flex justify-center">
            <Button size="sm" onClick={() => setIsFlipped(true)}>
              <Eye className="w-4 h-4 mr-1" /> Aufdecken
            </Button>
          </div>
        ) : (
          <div className="flex justify-center gap-3">
            <Button variant="destructive" size="sm" className="gap-1" onClick={() => goNext('wrong')}>
              <XCircle className="h-4 w-4" /> Nicht gewusst
            </Button>
            <Button size="sm" className="gap-1" onClick={() => goNext('correct')}>
              <CheckCircle className="h-4 w-4" /> Gewusst
            </Button>
          </div>
        )}
      </div>

      {/* Keyboard hints — desktop only */}
      <p className="hidden sm:block text-xs text-muted-foreground">
        <kbd className="px-1.5 py-0.5 rounded border bg-secondary text-xs">Leertaste</kbd> aufdecken ·
        <kbd className="px-1.5 py-0.5 rounded border bg-secondary text-xs ml-1">→</kbd> richtig ·
        <kbd className="px-1.5 py-0.5 rounded border bg-secondary text-xs ml-1">←</kbd> falsch
        <kbd className="px-1.5 py-0.5 rounded border bg-secondary text-xs ml-1">S</kbd> überspringen
      </p>
      </div>
    </div>
  );
}
