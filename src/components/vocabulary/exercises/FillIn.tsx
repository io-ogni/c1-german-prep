import { useState } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';

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

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    onAnswer(idx === solution.correct);
  };

  // Highlight the blank
  const sentenceHtml = (content?.sentence ?? '').replace(
    /___/g,
    '<span class="inline-block border-b-2 border-primary px-2 mx-1 min-w-[4rem]">&nbsp;</span>'
  );
  const options = content?.options ?? [];

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
      <p
        className="text-base text-foreground leading-relaxed py-2"
        dangerouslySetInnerHTML={{ __html: sentenceHtml }}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        {content.options.map((opt, idx) => (
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
            {opt}
          </Button>
        ))}
      </div>
    </ExerciseCard>
  );
}
