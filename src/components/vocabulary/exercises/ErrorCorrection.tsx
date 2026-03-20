import { useState, useEffect, useRef } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  content: { sentence: string; wrong_word: string };
  solution: { correct: string; accept_also?: string[] };
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[.,;:!?]/g, '');
}

export function ErrorCorrection({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const { t } = useTranslation();
  const [userAnswer, setUserAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserAnswer('');
    setChecked(false);
    setIsCorrect(false);
    inputRef.current?.focus();
  }, [content]);

  const handleCheck = () => {
    const normalized = normalize(userAnswer);
    const correctNorm = normalize(solution.correct);
    const accepted = [correctNorm, ...(solution.accept_also ?? []).map(normalize)];
    const correct = accepted.includes(normalized);
    setIsCorrect(correct);
    setChecked(true);
    onAnswer(correct);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer.trim() && !checked) {
      handleCheck();
    }
  };

  // Highlight the wrong word in the sentence
  const parts = content.sentence.split(new RegExp(`(${content.wrong_word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'));

  return (
    <ExerciseCard question={instructions} feedback={null}>
      <div className="space-y-4">
        <p className="text-base leading-relaxed">
          {parts.map((part, i) =>
            normalize(part) === normalize(content.wrong_word) ? (
              <span
                key={i}
                className={cn(
                  'font-bold underline decoration-wavy decoration-destructive',
                  checked && 'line-through text-destructive'
                )}
              >
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>

        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('exercise_type_answer')}
            disabled={answered}
            className={cn(
              'flex-1',
              checked && isCorrect && 'border-green-500',
              checked && !isCorrect && 'border-destructive'
            )}
          />
          {!answered && (
            <Button onClick={handleCheck} disabled={!userAnswer.trim()}>
              {t('exercise_check')}
            </Button>
          )}
        </div>

        {checked && (
          <div
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium',
              isCorrect
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-destructive/10 text-destructive'
            )}
          >
            {isCorrect
              ? t('exercise_correct')
              : `${t('exercise_incorrect')} ${solution.correct}${explanation ? ` — ${explanation}` : ''}`}
          </div>
        )}
      </div>
    </ExerciseCard>
  );
}
