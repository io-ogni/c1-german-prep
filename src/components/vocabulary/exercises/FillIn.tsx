import { useState, useCallback, useMemo } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { SelectableText } from '@/components/shared/SelectableText';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';
import { useNumberKeys } from '@/hooks/useNumberKeys';

interface Props {
  content: { sentence: string; options: string[] };
  solution: { correct: number };
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

export function FillIn({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const { t } = useTranslation();

  const options = content?.options ?? [];
  const correctValue = options[solution.correct] ?? '';

  // Shuffle options once per mount
  const shuffled = useMemo(() => {
    const opts = [...options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [content]);

  const correctIdx = shuffled.indexOf(correctValue);
  const isCorrect = selected === correctIdx;

  const handleSelect = useCallback((idx: number) => {
    if (answered) return;
    setSelected(idx);
    onAnswer(idx === correctIdx);
  }, [answered, correctIdx, onAnswer]);

  useNumberKeys(handleSelect, shuffled.length, answered);

  return (
    <ExerciseCard
      question={instructions}
      feedback={
        answered
          ? {
              correct: isCorrect,
              message: isCorrect
                ? t('exercise_correct')
                : `${t('exercise_incorrect')} ${explanation ?? ''}`,
            }
          : null
      }
    >
      <SelectableText text={content?.sentence ?? ''} className="py-2" />
      <div className="grid gap-2 sm:grid-cols-2">
        {shuffled.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            className={cn(
              'justify-start text-left h-auto py-3 hover:border-primary/40 hover:bg-primary/5',
              answered && idx === correctIdx && 'border-primary bg-primary/10 text-primary',
              answered && selected === idx && idx !== correctIdx && 'border-destructive bg-destructive/10 text-destructive'
            )}
            onClick={() => handleSelect(idx)}
            disabled={answered}
          >
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mr-2">{idx + 1}</span>
            {opt}
          </Button>
        ))}
      </div>
    </ExerciseCard>
  );
}
