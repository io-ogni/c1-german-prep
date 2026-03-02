import { useState } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  content: { context?: string; sentence?: string; options: string[] };
  solution: { correct: number };
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

const LABELS = ['a', 'b', 'c', 'd'];

export function MultipleChoice({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const { t } = useTranslation();
  const isCorrect = selected === solution.correct;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    onAnswer(idx === solution.correct);
  };

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
      {(content.context || content.sentence) && (
        <p className="text-sm text-foreground leading-relaxed bg-muted rounded-md p-3">
          {content.context ?? content.sentence}
        </p>
      )}
      <div className="grid gap-2">
        {content.options.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            className={cn(
              'justify-start text-left h-auto py-3 whitespace-normal',
              answered && idx === solution.correct && 'border-primary bg-primary/10 text-primary',
              answered && selected === idx && idx !== solution.correct && 'border-destructive bg-destructive/10 text-destructive'
            )}
            onClick={() => handleSelect(idx)}
            disabled={answered}
          >
            <span className="font-semibold mr-2">{LABELS[idx]})</span> {opt}
          </Button>
        ))}
      </div>
    </ExerciseCard>
  );
}
