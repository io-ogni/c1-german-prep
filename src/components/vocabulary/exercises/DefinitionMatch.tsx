import { useState } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  content: { word?: string; options?: string[]; pairs?: { word: string; definition: string }[] };
  solution: { correct?: number; pairs?: { word: string; definition: string }[] };
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

export function DefinitionMatch({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const { t } = useTranslation();

  // If pairs format, delegate to PairsMatch
  if (content?.pairs) {
    return (
      <PairsMatch
        content={content}
        solution={solution}
        instructions={instructions}
        explanation={explanation}
        answered={answered}
        onAnswer={onAnswer}
      />
    );
  }

  // Single word + options format
  const [selected, setSelected] = useState<number | null>(null);
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
      <p className="text-lg font-semibold text-foreground text-center py-2">{content?.word}</p>
      <div className="grid gap-2">
        {(content?.options ?? []).map((opt, idx) => (
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
            {opt}
          </Button>
        ))}
      </div>
    </ExerciseCard>
  );
}

/* ── Pairs matching sub-component ── */
function PairsMatch({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const { t } = useTranslation();

  const pairs = content.pairs!;
  const words = pairs.map((p) => p.word);
  // Shuffle definitions deterministically from solution or just use them in order
  const solPairs = solution.pairs ?? pairs;
  const definitions = solPairs.map((p) => p.definition);

  // Build correct mapping: for each word index, find definition index
  const correctMap = new Map<number, number>();
  pairs.forEach((p, wi) => {
    const di = definitions.indexOf(p.definition);
    correctMap.set(wi, di);
  });

  const matchedRight = new Set(matches.values());

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
    if (matches.size !== words.length) return;
    const allCorrect = words.every((_, i) => matches.get(i) === correctMap.get(i));
    onAnswer(allCorrect);
  };

  const allCorrect = answered && words.every((_, i) => matches.get(i) === correctMap.get(i));

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
          {words.map((w, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className={cn(
                'w-full justify-start text-left h-auto py-2 whitespace-normal text-xs',
                selectedLeft === i && 'ring-2 ring-primary',
                matches.has(i) && 'bg-muted',
                answered && matches.get(i) === correctMap.get(i) && 'border-primary bg-primary/10',
                answered && matches.get(i) !== correctMap.get(i) && 'border-destructive bg-destructive/10'
              )}
              onClick={() => handleLeftClick(i)}
              disabled={answered}
            >
              {w}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          {definitions.map((d, i) => (
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
              {d}
            </Button>
          ))}
        </div>
      </div>
      {!answered && (
        <Button
          onClick={handleCheck}
          disabled={matches.size !== words.length}
          className="self-end"
        >
          {t('exercise_check')}
        </Button>
      )}
    </ExerciseCard>
  );
}
