import { useState, useMemo } from 'react';
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
  const [selected, setSelected] = useState<number | null>(null);
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

  // Shuffle options, tracking which shuffled index is correct
  const shuffled = useMemo(() => {
    const opts = (content?.options ?? []).map((text, origIdx) => ({ text, origIdx }));
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    const correctIdx = opts.findIndex((o) => o.origIdx === solution.correct);
    return { options: opts, correctIdx };
  }, [content?.options, solution.correct]);

  const isCorrect = selected === shuffled.correctIdx;

  // Single word + options format
  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    onAnswer(idx === shuffled.correctIdx);
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
        {shuffled.options.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            className={cn(
              'justify-start text-left h-auto py-3 whitespace-normal',
              answered && idx === shuffled.correctIdx && 'border-primary bg-primary/10 text-primary',
              answered && selected === idx && idx !== shuffled.correctIdx && 'border-destructive bg-destructive/10 text-destructive'
            )}
            onClick={() => handleSelect(idx)}
            disabled={answered}
          >
            {opt.text}
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

  // Shuffle definitions so they don't align with their matching words
  const shuffledDefs = useMemo(() => {
    const defs = pairs.map((p, i) => ({ text: p.definition, originalIdx: i }));
    for (let i = defs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [defs[i], defs[j]] = [defs[j], defs[i]];
    }
    return defs;
  }, [pairs]);

  // Build correct mapping: for each word index, find its definition in the shuffled array
  const correctMap = new Map<number, number>();
  words.forEach((_, wi) => {
    const di = shuffledDefs.findIndex((d) => d.originalIdx === wi);
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
          {shuffledDefs.map((d, i) => (
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
              {d.text}
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
