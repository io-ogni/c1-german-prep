import { useState } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  content: { left: string[]; right: string[] };
  solution: { pairs: number[] }; // pairs[i] = index in right for left[i]
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

export function Match({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();

  const leftItems = content?.left ?? [];
  const rightItems = content?.right ?? [];
  const pairs = solution?.pairs ?? [];

  const handleLeftClick = (idx: number) => {
    if (answered) return;
    setSelectedLeft(idx === selectedLeft ? null : idx);
  };

  const handleRightClick = (idx: number) => {
    if (answered || selectedLeft === null) return;
    const next = new Map(matches);
    next.set(selectedLeft, idx);
    setMatches(next);
    setSelectedLeft(null);
  };

  const handleCheck = () => {
    if (matches.size !== leftItems.length) return;
    const allCorrect = leftItems.every((_, i) => matches.get(i) === pairs[i]);
    setChecked(true);
    onAnswer(allCorrect);
  };

  const allCorrect = checked && leftItems.every((_, i) => matches.get(i) === pairs[i]);

  // Which right indices are already matched
  const matchedRight = new Set(matches.values());

  return (
    <ExerciseCard
      question={instructions}
      feedback={
        answered
          ? {
              correct: allCorrect,
              message: allCorrect
                ? t('exercise_correct')
                : `${t('exercise_incorrect')} ${explanation ?? ''}`,
            }
          : null
      }
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {leftItems.map((item, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className={cn(
                'w-full justify-start text-left h-auto py-2 whitespace-normal text-xs',
                selectedLeft === i && 'ring-2 ring-primary',
                matches.has(i) && 'bg-muted',
                answered && matches.get(i) === solution.pairs[i] && 'border-primary bg-primary/10',
                answered && matches.get(i) !== solution.pairs[i] && 'border-destructive bg-destructive/10'
              )}
              onClick={() => handleLeftClick(i)}
              disabled={answered}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          {content.right.map((item, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className={cn(
                'w-full justify-start text-left h-auto py-2 whitespace-normal text-xs',
                matchedRight.has(i) && 'bg-muted',
                answered && 'pointer-events-none'
              )}
              onClick={() => handleRightClick(i)}
              disabled={answered || matchedRight.has(i)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      {!answered && (
        <Button
          onClick={handleCheck}
          disabled={matches.size !== content.left.length}
          className="self-end"
        >
          {t('exercise_check')}
        </Button>
      )}
    </ExerciseCard>
  );
}
