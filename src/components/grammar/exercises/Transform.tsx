import { useState } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n/useTranslation';
import { cn } from '@/lib/utils';

interface SingleContent {
  original: string;
}

interface MultiContent {
  items: { given: string; transform_to: string }[];
}

interface SingleSolution {
  correct: string;
  accept_also?: string[];
}

interface MultiSolution {
  answers: string[];
}

interface Props {
  content: SingleContent | MultiContent;
  solution: SingleSolution | MultiSolution;
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

function normalize(s: string | undefined) {
  return (s ?? '').trim().toLowerCase().replace(/[.,;:!?]/g, '').replace(/\s+/g, ' ');
}

function isMulti(content: any): content is MultiContent {
  return Array.isArray(content?.items);
}

export function Transform({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const { t } = useTranslation();
  const multi = isMulti(content);
  const itemCount = multi ? content.items.length : 1;

  const [values, setValues] = useState<string[]>(Array(itemCount).fill(''));
  const [currentIdx, setCurrentIdx] = useState(0);

  const checkSingle = (val: string, idx: number): boolean => {
    if (multi) {
      const expected = (solution as MultiSolution).answers?.[idx];
      return normalize(val) === normalize(expected);
    }
    const sol = solution as SingleSolution;
    const allAccepted = [sol.correct, ...(sol.accept_also ?? [])];
    return allAccepted.some((a) => normalize(val) === normalize(a));
  };

  const allCorrect = values.every((v, i) => checkSingle(v, i));

  const handleCheck = () => {
    if (multi) {
      // Check current item, advance or finish
      const isLast = currentIdx >= itemCount - 1;
      if (isLast) {
        onAnswer(allCorrect);
      } else {
        setCurrentIdx((prev) => prev + 1);
      }
    } else {
      onAnswer(checkSingle(values[0], 0));
    }
  };

  const updateValue = (idx: number, val: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  // For feedback message
  const feedbackMessage = (() => {
    if (!answered) return null;
    if (allCorrect) return t('exercise_correct');
    if (multi) {
      const sol = solution as MultiSolution;
      return `${t('exercise_correct_answer')}: ${sol.answers?.join(' | ')}`;
    }
    const sol = solution as SingleSolution;
    return `${t('exercise_correct_answer')}: ${sol.correct}${explanation ? ` — ${explanation}` : ''}`;
  })();

  // Multi-item: show all items sequentially, or single item
  if (multi) {
    const items = content.items;
    return (
      <ExerciseCard
        question={instructions}
        feedback={
          answered
            ? { correct: allCorrect, message: feedbackMessage ?? '' }
            : null
        }
      >
        <div className="space-y-4">
          {items.map((item, idx) => {
            const visible = idx <= currentIdx || answered;
            if (!visible) return null;
            const isItemCorrect = answered && checkSingle(values[idx], idx);
            const isItemWrong = answered && !isItemCorrect;
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-muted-foreground mt-1">{idx + 1}.</span>
                  <div className="flex-1 space-y-2">
                    <div className="rounded-md bg-muted p-3 text-sm text-foreground">{item.given}</div>
                    <span className="text-xs text-muted-foreground italic">→ {item.transform_to}</span>
                    <Textarea
                      value={values[idx]}
                      onChange={(e) => updateValue(idx, e.target.value)}
                      placeholder="..."
                      disabled={answered || idx < currentIdx}
                      rows={2}
                      className={cn(
                        isItemCorrect && 'border-primary',
                        isItemWrong && 'border-destructive'
                      )}
                    />
                    {answered && isItemWrong && (
                      <p className="text-xs text-destructive">
                        {t('exercise_correct_answer')}: {(solution as MultiSolution).answers?.[idx]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {!answered && (
          <Button
            onClick={handleCheck}
            disabled={!values[currentIdx]?.trim()}
            className="self-end mt-2"
          >
            {currentIdx >= itemCount - 1 ? t('exercise_check') : t('exercise_next') ?? 'Weiter'}
          </Button>
        )}
      </ExerciseCard>
    );
  }

  // Single item (original format)
  return (
    <ExerciseCard
      question={instructions}
      feedback={
        answered
          ? { correct: allCorrect, message: feedbackMessage ?? '' }
          : null
      }
    >
      <div className="rounded-md bg-muted p-3 text-sm text-foreground">{(content as SingleContent).original}</div>
      <Textarea
        value={values[0]}
        onChange={(e) => updateValue(0, e.target.value)}
        placeholder="..."
        disabled={answered}
        rows={2}
      />
      {!answered && (
        <Button onClick={handleCheck} disabled={!values[0]?.trim()} className="self-end">
          {t('exercise_check')}
        </Button>
      )}
    </ExerciseCard>
  );
}
