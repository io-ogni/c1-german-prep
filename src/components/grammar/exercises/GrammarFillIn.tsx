import { useState } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  content: { sentence: string; hint?: string };
  solution: { correct: string; full_answer?: string };
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

export function GrammarFillIn({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [value, setValue] = useState('');
  const { t } = useTranslation();

  const isCorrect = value.trim().toLowerCase() === solution.correct.trim().toLowerCase();

  const handleCheck = () => {
    if (!value.trim()) return;
    onAnswer(isCorrect);
  };

  const sentenceHtml = content.sentence.replace(
    /___/g,
    '<span class="inline-block border-b-2 border-primary px-2 mx-1 min-w-[4rem]">&nbsp;</span>'
  );

  return (
    <ExerciseCard
      question={instructions}
      feedback={
        answered
          ? {
              correct: isCorrect,
              message: isCorrect
                ? t('exercise_correct')
                : `${t('exercise_correct_answer')}: ${solution.full_answer ?? solution.correct}${explanation ? ` — ${explanation}` : ''}`,
            }
          : null
      }
    >
      <p
        className="text-base text-foreground leading-relaxed py-2"
        dangerouslySetInnerHTML={{ __html: sentenceHtml }}
      />
      {content.hint && (
        <p className="text-xs text-muted-foreground italic">{content.hint}</p>
      )}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !answered && handleCheck()}
          placeholder="..."
          disabled={answered}
          className="flex-1"
        />
        {!answered && (
          <Button onClick={handleCheck} disabled={!value.trim()}>
            {t('exercise_check')}
          </Button>
        )}
      </div>
    </ExerciseCard>
  );
}
