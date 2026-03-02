import { useState } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  content: { word: string; target_type: string };
  solution: { correct: string; accept_also?: string[] };
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

export function WordFamily({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [input, setInput] = useState('');
  const { t } = useTranslation();

  const checkAnswer = () => {
    const trimmed = input.trim().toLowerCase();
    const accepted = [solution.correct, ...(solution.accept_also ?? [])].map((s) =>
      s.toLowerCase().trim()
    );
    const correct = accepted.includes(trimmed);
    onAnswer(correct);
  };

  const isCorrect =
    answered &&
    [solution.correct, ...(solution.accept_also ?? [])]
      .map((s) => s.toLowerCase().trim())
      .includes(input.trim().toLowerCase());

  return (
    <ExerciseCard
      question={instructions}
      feedback={
        answered
          ? {
              correct: isCorrect,
              message: isCorrect
                ? t('exercise_correct')
                : `${t('exercise_correct_answer')}: ${solution.correct}. ${explanation ?? ''}`,
            }
          : null
      }
    >
      <div className="text-center space-y-2 py-2">
        <p className="text-lg font-semibold text-foreground">{content.word}</p>
        <p className="text-sm text-muted-foreground">{content.target_type}</p>
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="..."
          disabled={answered}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !answered && input.trim()) checkAnswer();
          }}
        />
        {!answered && (
          <Button onClick={checkAnswer} disabled={!input.trim()}>
            {t('exercise_check')}
          </Button>
        )}
      </div>
    </ExerciseCard>
  );
}
