import { useState, useCallback, useRef, useEffect } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';
import { useNumberKeys } from '@/hooks/useNumberKeys';

interface Props {
  content: any;
  solution: any;
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

/**
 * Telc C1 Sprachbausteine format:
 * - A continuous text with numbered gaps: __(1)__, __(2)__, etc.
 * - Each gap has 4 options (a/b/c/d)
 * - Learner works through gaps sequentially
 *
 * content: { text: string, gaps: [{ options: string[] }] }
 * solution: { answers: string[] }  (correct option text per gap)
 */
export function Sprachbausteine({ content, solution, instructions, explanation, answered: parentAnswered, onAnswer }: Props) {
  const { t } = useTranslation();
  const gaps: { options: string[] }[] = content?.gaps ?? [];
  const answers: string[] = solution?.answers ?? [];
  const text: string = content?.text ?? '';

  const [currentGap, setCurrentGap] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [subAnswered, setSubAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [eliminated, setEliminated] = useState<Set<number>>(new Set());
  const [filledAnswers, setFilledAnswers] = useState<(string | null)[]>(() => gaps.map(() => null));

  // Reset when exercise changes
  const contentRef = useRef(content);
  useEffect(() => {
    if (contentRef.current !== content) {
      contentRef.current = content;
      setCurrentGap(0);
      setSelected(null);
      setSubAnswered(false);
      setCorrectCount(0);
      setEliminated(new Set());
      setFilledAnswers(gaps.map(() => null));
    }
  }, [content, gaps.length]);

  const current = gaps[currentGap];
  const correctAnswer = answers[currentGap] ?? '';
  const isLast = currentGap === gaps.length - 1;

  const handleSelect = useCallback((idx: number) => {
    if (subAnswered || parentAnswered) return;
    const opt = current?.options[idx];
    const isCorrect = opt?.toLowerCase() === correctAnswer.toLowerCase();
    setSelected(idx);

    if (isCorrect) {
      setSubAnswered(true);
      setFilledAnswers(prev => { const next = [...prev]; next[currentGap] = opt; return next; });
      const newCount = correctCount + 1;
      setCorrectCount(newCount);
      if (isLast) {
        onAnswer(newCount >= Math.ceil(gaps.length * 0.7)); // 70% threshold
      }
    } else {
      setEliminated(prev => new Set(prev).add(idx));
      setTimeout(() => setSelected(null), 400);
    }
  }, [subAnswered, parentAnswered, current, correctAnswer, correctCount, currentGap, isLast, onAnswer, gaps.length]);

  useNumberKeys(handleSelect, current?.options?.length ?? 0, subAnswered || parentAnswered);

  const handleNext = () => {
    setCurrentGap(i => i + 1);
    setSelected(null);
    setSubAnswered(false);
    setEliminated(new Set());
  };

  const isCorrect = selected !== null && current?.options[selected]?.toLowerCase() === correctAnswer.toLowerCase();

  // Render text with gap markers highlighted
  const renderText = () => {
    const parts = text.split(/__\((\d+)\)__/);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        const gapIdx = parseInt(part, 10) - 1;
        const filled = filledAnswers[gapIdx];
        const isCurrent = gapIdx === currentGap && !parentAnswered;
        return (
          <span
            key={`gap-${gapIdx}`}
            className={cn(
              'inline-block min-w-[80px] border-b-2 text-center font-medium mx-0.5 px-1',
              isCurrent && 'border-primary text-primary bg-primary/5',
              filled && !isCurrent && 'border-emerald-500 text-emerald-700 dark:text-emerald-300',
              !filled && !isCurrent && 'border-muted-foreground/30 text-muted-foreground'
            )}
          >
            {filled ?? `(${gapIdx + 1})`}
          </span>
        );
      }
      return <span key={`text-${i}`}>{part}</span>;
    });
  };

  return (
    <ExerciseCard
      question={`${instructions} (${currentGap + 1}/${gaps.length})`}
      feedback={
        subAnswered
          ? {
              correct: isCorrect,
              message: isCorrect
                ? t('exercise_correct')
                : `${t('exercise_correct_answer')}: ${correctAnswer}${explanation ? ` — ${explanation}` : ''}`,
            }
          : null
      }
    >
      {/* Full text with gaps */}
      <div className="bg-muted/50 rounded-lg p-4 text-sm leading-relaxed border">
        {renderText()}
      </div>

      {/* Current gap options */}
      {current && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Lücke {currentGap + 1}:</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {current.options.map((opt, idx) => (
              <Button
                key={idx}
                variant="outline"
                className={cn(
                  'justify-start text-left h-auto py-3 whitespace-normal',
                  subAnswered && opt.toLowerCase() === correctAnswer.toLowerCase() && 'border-primary bg-primary/10 text-primary',
                  eliminated.has(idx) && 'opacity-40 pointer-events-none border-destructive/50',
                  !subAnswered && selected === idx && opt.toLowerCase() !== correctAnswer.toLowerCase() && 'border-destructive bg-destructive/10 text-destructive'
                )}
                onClick={() => handleSelect(idx)}
                disabled={subAnswered || parentAnswered || eliminated.has(idx)}
              >
                <kbd className="font-mono text-[10px] opacity-50 mr-2 shrink-0">{idx + 1}</kbd> {opt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {subAnswered && !isLast && !parentAnswered && (
        <div className="flex justify-end pt-2">
          <Button size="sm" onClick={handleNext}>{t('exercise_next')}</Button>
        </div>
      )}

      {parentAnswered && (
        <div className="text-sm text-muted-foreground">
          {correctCount}/{gaps.length} richtig
        </div>
      )}
    </ExerciseCard>
  );
}
