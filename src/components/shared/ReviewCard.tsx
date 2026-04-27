import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, CheckCircle, XCircle, RotateCcw, Check, X, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { track } from '@/lib/posthog';
import { getFlashcardAudioUrl } from '@/lib/flashcardAudio';

interface VocabWord {
  id: string;
  word_de: string;
  translation_en: string;
  translation_custom: string | null;
  example_sentence: string | null;
  box_number: number;
  next_review_at: string;
  review_count: number;
  source_type: string;
}

const BOX_INTERVALS = [1, 3, 7, 14, 30, 90];

const SOURCE_LABELS: Record<string, string> = {
  manual: 'Manuell',
  'it-nomen': 'IT Nomen',
  'it-verben': 'IT Verben',
  'it-kollokationen': 'IT Kollokationen',
  'it-workshop': 'IT Workshop',
  'it-refinement': 'IT Refinement',
  'it-souveränität': 'IT Souveränität',
  'it-notfallkit': 'IT Notfall-Kit',
  'it-redewendungen': 'IT Redewendungen',
  'sprechen-praesentation': 'Präsentation',
  'sprechen-diskussion': 'Diskussion',
  'sprechen-zusammenfassung': 'Zusammenfassung',
  'sprechen-redemittel': 'Redemittel',
  'sprechen-redewendungen': 'Redewendungen',
  'schreiben-einleitung': 'Schreiben: Einleitung',
  'schreiben-hauptteil': 'Schreiben: Hauptteil',
  'schreiben-schluss': 'Schreiben: Schluss',
  'schreiben-c1-strukturen': 'Schreiben: C1-Strukturen',
  'schreiben-konnektoren': 'Schreiben: Konnektoren',
  reading: 'Lesetext',
};

const SUCCESS_MESSAGES = [
  "Perfekt! 🔥", "Stark! 💪", "Genau! ✨", "Weiter so! 🚀", "Klasse! 🌟",
];
const FAIL_MESSAGES = [
  "Nächstes Mal! 💡", "Übung macht den Meister 📚", "Dranbleiben! 🧠", "Kommt noch! 🌱",
];

interface ReviewCardProps {
  dueCards: VocabWord[];
  onCardReviewed?: () => void;
  compact?: boolean;
}

export function ReviewCard({ dueCards, onCardReviewed, compact }: ReviewCardProps) {
  const { t } = useTranslation();
  const [reviewIndex, setReviewIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [exitAnim, setExitAnim] = useState<'left' | 'right' | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | null>(null);

  const progress = dueCards.length > 0 ? (reviewIndex / dueCards.length) * 100 : 0;

  const handleReview = useCallback(async (knewIt: boolean) => {
    const card = dueCards[reviewIndex];
    if (!card) return;

    const direction = knewIt ? 'right' : 'left';
    setExitAnim(direction);

    const msgs = knewIt ? SUCCESS_MESSAGES : FAIL_MESSAGES;
    setFeedback(msgs[Math.floor(Math.random() * msgs.length)]);
    setFeedbackType(knewIt ? 'correct' : 'wrong');

    if (knewIt) setCorrect(c => c + 1);
    setTotal(t => t + 1);
    track('flashcard_reviewed', { knew_it: knewIt, box_number: card.box_number, source_type: card.source_type });

    const newBox = knewIt ? Math.min(card.box_number + 1, 6) : 1;
    const daysUntilNext = BOX_INTERVALS[newBox - 1];
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + daysUntilNext);

    const { error: updateError } = await supabase.from('personal_vocabulary').update({
      box_number: newBox,
      next_review_at: nextReview.toISOString(),
      review_count: card.review_count + 1,
    }).eq('id', card.id);
    if (updateError) toast.error('Fortschritt konnte nicht gespeichert werden.');

    setTimeout(() => {
      setFlipped(false);
      setExitAnim(null);
      requestAnimationFrame(() => {
        setReviewIndex(i => i + 1);
        onCardReviewed?.();
      });
      setTimeout(() => {
        setFeedback(null);
        setFeedbackType(null);
      }, 1200);
    }, 350);
  }, [dueCards, reviewIndex, onCardReviewed]);

  // Keyboard shortcuts (disabled in compact/homepage mode to avoid conflicts)
  useEffect(() => {
    if (compact) return;
    const handler = (e: KeyboardEvent) => {
      if (reviewIndex >= dueCards.length) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!flipped) setFlipped(true);
      }
      if (flipped) {
        if (e.key === 'ArrowRight' || e.key === '1') handleReview(true);
        if (e.key === 'ArrowLeft' || e.key === '2') handleReview(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [flipped, reviewIndex, dueCards.length, handleReview]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAudio = useCallback((url: string) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => { audioRef.current = null; };
    audio.play().catch(() => { audioRef.current = null; });
  }, []);

  if (dueCards.length === 0 || reviewIndex >= dueCards.length) {
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        {total > 0 ? (
          compact ? (
            <>
              <CheckCircle className="h-8 w-8 text-primary" />
              <p className="text-foreground font-medium">{total} Wörter wiederholt — weiter so!</p>
            </>
          ) : (
            <>
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
              <p className="text-sm text-muted-foreground">{correct} / {total} {t('vocab_reviewed')}!</p>
            </>
          )
        ) : (
          <>
            <CheckCircle className={`${compact ? 'h-8 w-8' : 'h-10 w-10'} text-primary`} />
            <p className="text-foreground font-medium">{t('vocab_no_reviews')}</p>
            <p className="text-xs text-muted-foreground">Deine Wörter chillen noch in ihrer Box. Komm morgen wieder.</p>
          </>
        )}
      </div>
    );
  }

  const currentCard = dueCards[reviewIndex];
  const minH = compact ? 'min-h-[200px]' : 'min-h-[260px]';
  const ttsUrl = getFlashcardAudioUrl(currentCard.source_type, currentCard.word_de);

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
            <span>{reviewIndex + 1} / {dueCards.length}</span>
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
            <span className="absolute top-3 left-3 text-[10px] italic text-muted-foreground/70">Was bedeutet es?</span>
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">Box {currentCard.box_number}/6</span>
              {currentCard.source_type !== 'manual' && (
                <Badge variant="secondary" className="text-[10px] font-normal">
                  {SOURCE_LABELS[currentCard.source_type] ?? currentCard.source_type}
                </Badge>
              )}
            </div>
            <p className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-foreground`}>{currentCard.word_de}</p>
            {ttsUrl && (
              <button
                onClick={(e) => { e.stopPropagation(); playAudio(ttsUrl); }}
                className="mt-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            )}
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
            <p className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-foreground mb-3`}>{currentCard.word_de}</p>
            <p className={`${compact ? 'text-base' : 'text-lg'} text-foreground`}>→ {currentCard.translation_en}</p>
            {currentCard.translation_custom && (
              <p className="text-sm text-muted-foreground mt-1">→ {currentCard.translation_custom}</p>
            )}
            {currentCard.example_sentence && (
              <p className="text-xs text-muted-foreground italic mt-3 max-w-sm">"{currentCard.example_sentence}"</p>
            )}
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
            <Button onClick={() => handleReview(false)} size={compact ? 'sm' : 'default'} className="gap-1 bg-orange-500 text-white hover:bg-orange-600">
              <XCircle className="h-4 w-4" /> {t('vocab_didnt_know')}
            </Button>
            <Button onClick={() => handleReview(true)} size={compact ? 'sm' : 'default'} className="gap-1">
              <CheckCircle className="h-4 w-4" /> {t('vocab_knew_it')}
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
