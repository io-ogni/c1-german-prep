import { useState } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  content: { original: string };
  solution: { correct: string; accept_also?: string[] };
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[.,;:!?]/g, '').replace(/\s+/g, ' ');
}

export function Transform({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [value, setValue] = useState('');
  const { t } = useTranslation();

  const allAccepted = [solution.correct, ...(solution.accept_also ?? [])];
  const isCorrect = allAccepted.some((a) => normalize(value) === normalize(a));

  const handleCheck = () => {
    if (!value.trim()) return;
    onAnswer(isCorrect);
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
                : `${t('exercise_correct_answer')}: ${solution.correct}${explanation ? ` — ${explanation}` : ''}`,
            }
          : null
      }
    >
      <div className="rounded-md bg-muted p-3 text-sm text-foreground">{content.original}</div>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="..."
        disabled={answered}
        rows={2}
      />
      {!answered && (
        <Button onClick={handleCheck} disabled={!value.trim()} className="self-end">
          {t('exercise_check')}
        </Button>
      )}
    </ExerciseCard>
  );
}
