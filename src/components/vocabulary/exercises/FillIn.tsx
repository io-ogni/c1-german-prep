import { useState, useCallback } from 'react';
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
  const isCorrect = selected === solution.correct;

  const handleSelect = useCallback((idx: number) => {
    if (answered) return;
    setSelected(idx);
    onAnswer(idx === solution.correct);
  }, [answered, solution.correct, onAnswer]);

  const options = content?.options ?? [];

  useNumberKeys(handleSelect, options.length, answered);

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
        {options.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            className={cn(
              'justify-start text-left h-auto py-3',
              answered && idx === solution.correct && 'border-primary bg-primary/10 text-primary',
              answered && selected === idx && idx !== solution.correct && 'border-destructive bg-destructive/10 text-destructive'
            )}
            onClick={() => handleSelect(idx)}
            disabled={answered}
          >
            <kbd className="font-mono text-[10px] opacity-50 mr-2 shrink-0 hidden md:inline">{idx + 1}</kbd> {opt}
          </Button>
        ))}
      </div>
    </ExerciseCard>
  );
}
