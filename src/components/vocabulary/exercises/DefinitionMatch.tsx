import { useState, useMemo, useCallback } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { SelectableText } from '@/components/shared/SelectableText';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';
import { useNumberKeys } from '@/hooks/useNumberKeys';

const PAIR_COLORS = [
  'border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/40',
  'border-2 border-purple-400 bg-purple-50 dark:bg-purple-950/40',
  'border-2 border-teal-400 bg-teal-50 dark:bg-teal-950/40',
  'border-2 border-pink-400 bg-pink-50 dark:bg-pink-950/40',
  'border-2 border-yellow-700 bg-yellow-50 dark:bg-yellow-950/40',
  'border-2 border-cyan-400 bg-cyan-50 dark:bg-cyan-950/40',
];

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
  const handleSelect = useCallback((idx: number) => {
    if (answered) return;
    setSelected(idx);
    onAnswer(idx === shuffled.correctIdx);
  }, [answered, shuffled.correctIdx, onAnswer]);

  useNumberKeys(handleSelect, shuffled.options.length, answered);

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
      <div className="text-center py-2">
        <SelectableText text={content?.word ?? ''} className="text-lg font-semibold" />
      </div>
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
            <kbd className="font-mono text-[10px] opacity-50 mr-2 shrink-0 hidden md:inline">{idx + 1}</kbd> {opt.text}
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

  const rightColorMap = useMemo(() => {
    const m = new Map<number, number>();
    matches.forEach((rightIdx, leftIdx) => {
      m.set(rightIdx, leftIdx);
    });
    return m;
  }, [matches]);

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
      <div className="grid grid-cols-2 gap-2 md:gap-3 min-w-0">
        <div className="space-y-1.5 md:space-y-2">
          {words.map((w, i) => {
            const colorIdx = i % PAIR_COLORS.length;
            const matched = matches.has(i);
            return (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className={cn(
                  'w-full justify-start text-left h-auto py-1.5 md:py-2 px-2 md:px-3 whitespace-normal break-words text-xs min-w-0',
                  selectedLeft === i && 'ring-2 ring-primary',
                  matched && !answered && PAIR_COLORS[colorIdx],
                  answered && matches.get(i) === correctMap.get(i) && 'border-primary bg-primary/10',
                  answered && matches.get(i) !== correctMap.get(i) && 'border-destructive bg-destructive/10'
                )}
                onClick={() => handleLeftClick(i)}
                disabled={answered}
              >
                <span lang="de" style={{ hyphens: 'auto' }}>{w}</span>
              </Button>
            );
          })}
        </div>
        <div className="space-y-1.5 md:space-y-2">
          {shuffledDefs.map((d, i) => {
            const matchedByColor = rightColorMap.get(i);
            const isMatched = matchedByColor !== undefined;
            const colorIdx = isMatched ? matchedByColor % PAIR_COLORS.length : -1;
            return (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className={cn(
                  'w-full justify-start text-left h-auto py-1.5 md:py-2 px-2 md:px-3 whitespace-normal break-words text-xs min-w-0',
                  isMatched && !answered && PAIR_COLORS[colorIdx],
                  !isMatched && selectedLeft !== null && !answered && 'ring-1 ring-primary/40 bg-primary/5',
                  answered && 'pointer-events-none'
                )}
                onClick={() => handleRightClick(i)}
                disabled={answered || isMatched}
              >
                <span lang="de" style={{ hyphens: 'auto' }}>{d.text}</span>
              </Button>
            );
          })}
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
