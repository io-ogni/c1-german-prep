import { useState, useMemo, useEffect, useCallback } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';
import { useIsMobile } from '@/hooks/use-mobile';

interface Props {
  content: any;
  solution: any;
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

const RIGHT_KEYS = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const RIGHT_LABELS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];

const PAIR_COLORS = [
  'border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/40',
  'border-2 border-purple-400 bg-purple-50 dark:bg-purple-950/40',
  'border-2 border-teal-400 bg-teal-50 dark:bg-teal-950/40',
  'border-2 border-pink-400 bg-pink-50 dark:bg-pink-950/40',
  'border-2 border-yellow-700 bg-yellow-50 dark:bg-yellow-950/40',
  'border-2 border-cyan-400 bg-cyan-50 dark:bg-cyan-950/40',
];

export function Match({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const hasPairs = Array.isArray(content?.pairs);

  if (hasPairs) {
    return <PairsMatch content={content} solution={solution} instructions={instructions} explanation={explanation} answered={answered} onAnswer={onAnswer} />;
  }

  return <ArrayMatch content={content} solution={solution} instructions={instructions} explanation={explanation} answered={answered} onAnswer={onAnswer} />;
}

/** Pairs format: content.pairs = [{word, match}] */
function PairsMatch({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const pairs: { word: string; match: string }[] = content?.pairs ?? [];
  const words = pairs.map(p => p.word);

  const shuffledRight = useMemo(() => {
    const right = pairs.map((p, i) => ({ text: p.match, originalIdx: i }));
    for (let i = right.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [right[i], right[j]] = [right[j], right[i]];
    }
    return right;
  }, [pairs]);

  const matchedRight = useMemo(() => new Set(matches.values()), [matches]);

  const handleLeftClick = useCallback((idx: number) => {
    if (answered) return;
    setSelectedLeft(idx === selectedLeft ? null : idx);
  }, [answered, selectedLeft]);

  const handleRightClick = useCallback((idx: number) => {
    if (answered || selectedLeft === null || matchedRight.has(idx)) return;
    const next = new Map(matches);
    next.set(selectedLeft, idx);
    setMatches(next);
    setSelectedLeft(null);
  }, [answered, selectedLeft, matches, matchedRight]);

  // Keyboard handler
  useEffect(() => {
    if (answered) return;
    const onKey = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= words.length) {
        handleLeftClick(num - 1);
        return;
      }
      const rIdx = RIGHT_KEYS.indexOf(e.key.toLowerCase());
      if (rIdx >= 0 && rIdx < shuffledRight.length) {
        handleRightClick(rIdx);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, words.length, shuffledRight.length, handleLeftClick, handleRightClick]);

  const handleCheck = () => {
    if (matches.size !== words.length) return;
    const allCorrect = words.every((_, i) => {
      const rightIdx = matches.get(i);
      return rightIdx !== undefined && shuffledRight[rightIdx].originalIdx === i;
    });
    onAnswer(allCorrect);
  };

  const allCorrect = answered && words.every((_, i) => {
    const rightIdx = matches.get(i);
    return rightIdx !== undefined && shuffledRight[rightIdx].originalIdx === i;
  });

  // Map right index → originalIdx of the left item that matched it (for color)
  const rightColorMap = useMemo(() => {
    const m = new Map<number, number>();
    matches.forEach((rightIdx, leftIdx) => {
      m.set(rightIdx, leftIdx);
    });
    return m;
  }, [matches]);

  if (pairs.length === 0) {
    return <ExerciseCard question={instructions} feedback={null}><p className="text-muted-foreground">No data.</p></ExerciseCard>;
  }

  return (
    <ExerciseCard
      question={instructions}
      feedback={answered ? { correct: allCorrect, message: allCorrect ? t('exercise_correct') : `${t('exercise_incorrect')} ${explanation ?? ''}` } : null}
    >
      <div className="grid grid-cols-2 gap-2 md:gap-3 min-w-0">
        <div className="space-y-1.5 md:space-y-2">
          {words.map((w, i) => {
            const colorIdx = i % PAIR_COLORS.length;
            const matched = matches.has(i);
            return (
              <Button key={i} variant="outline" size="sm"
                className={cn(
                  'w-full justify-start text-left h-auto py-1.5 md:py-2 px-2 md:px-3 whitespace-normal break-words text-xs min-w-0',
                  selectedLeft === i && 'ring-2 ring-primary',
                  matched && !answered && PAIR_COLORS[colorIdx],
                  answered && matches.get(i) !== undefined && shuffledRight[matches.get(i)!].originalIdx === i && 'border-primary bg-primary/10',
                  answered && matches.get(i) !== undefined && shuffledRight[matches.get(i)!].originalIdx !== i && 'border-destructive bg-destructive/10'
                )}
                onClick={() => handleLeftClick(i)} disabled={answered}
              >
                {!isMobile && <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mr-2">{i + 1}</span>}
                <span lang="de" style={{ hyphens: 'auto' }}>{w}</span>
              </Button>
            );
          })}
        </div>
        <div className="space-y-1.5 md:space-y-2">
          {shuffledRight.map((d, i) => {
            const matchedByColor = rightColorMap.get(i);
            const isMatched = matchedByColor !== undefined;
            const colorIdx = isMatched ? matchedByColor % PAIR_COLORS.length : -1;
            return (
              <Button key={i} variant="outline" size="sm"
                className={cn(
                  'w-full justify-start text-left h-auto py-1.5 md:py-2 px-2 md:px-3 whitespace-normal break-words text-xs min-w-0',
                  isMatched && !answered && PAIR_COLORS[colorIdx],
                  !isMatched && selectedLeft !== null && !answered && 'ring-1 ring-primary/40 bg-primary/5',
                  answered && 'pointer-events-none'
                )}
                onClick={() => handleRightClick(i)}
                disabled={answered || isMatched}
              >
                {!isMobile && <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mr-2">{RIGHT_LABELS[i]}</span>}
                <span lang="de" style={{ hyphens: 'auto' }}>{d.text}</span>
              </Button>
            );
          })}
        </div>
      </div>
      {!answered && (
        <Button onClick={handleCheck} disabled={matches.size !== words.length} className="self-end">
          {t('exercise_check')}
        </Button>
      )}
    </ExerciseCard>
  );
}

/** Legacy format: content.left[], content.right[], solution.pairs: number[] */
function ArrayMatch({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const leftItems: string[] = content?.left ?? [];
  const rightItems: string[] = content?.right ?? [];
  const pairs: number[] = solution?.pairs ?? [];

  const matchedRight = useMemo(() => new Set(matches.values()), [matches]);

  const handleLeftClick = useCallback((idx: number) => {
    if (!answered) setSelectedLeft(idx === selectedLeft ? null : idx);
  }, [answered, selectedLeft]);

  const handleRightClick = useCallback((idx: number) => {
    if (answered || selectedLeft === null || matchedRight.has(idx)) return;
    const next = new Map(matches);
    next.set(selectedLeft, idx);
    setMatches(next);
    setSelectedLeft(null);
  }, [answered, selectedLeft, matches, matchedRight]);

  // Keyboard handler
  useEffect(() => {
    if (answered) return;
    const onKey = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= leftItems.length) {
        handleLeftClick(num - 1);
        return;
      }
      const rIdx = RIGHT_KEYS.indexOf(e.key.toLowerCase());
      if (rIdx >= 0 && rIdx < rightItems.length) {
        handleRightClick(rIdx);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, leftItems.length, rightItems.length, handleLeftClick, handleRightClick]);

  const handleCheck = () => {
    if (matches.size !== leftItems.length) return;
    const allCorrect = leftItems.every((_, i) => matches.get(i) === pairs[i]);
    setChecked(true);
    onAnswer(allCorrect);
  };

  const allCorrect = checked && leftItems.every((_, i) => matches.get(i) === pairs[i]);

  const rightColorMap = useMemo(() => {
    const m = new Map<number, number>();
    matches.forEach((rightIdx, leftIdx) => {
      m.set(rightIdx, leftIdx);
    });
    return m;
  }, [matches]);

  if (leftItems.length === 0) {
    return <ExerciseCard question={instructions} feedback={null}><p className="text-muted-foreground">No data.</p></ExerciseCard>;
  }

  return (
    <ExerciseCard
      question={instructions}
      feedback={answered ? { correct: allCorrect, message: allCorrect ? t('exercise_correct') : `${t('exercise_incorrect')} ${explanation ?? ''}` } : null}
    >
      <div className="grid grid-cols-2 gap-2 md:gap-3 min-w-0">
        <div className="space-y-1.5 md:space-y-2">
          {leftItems.map((item, i) => {
            const colorIdx = i % PAIR_COLORS.length;
            const matched = matches.has(i);
            return (
              <Button key={i} variant="outline" size="sm"
                className={cn('w-full justify-start text-left h-auto py-1.5 md:py-2 px-2 md:px-3 whitespace-normal break-words text-xs min-w-0',
                  selectedLeft === i && 'ring-2 ring-primary',
                  matched && !checked && PAIR_COLORS[colorIdx],
                  answered && matches.get(i) === pairs[i] && 'border-primary bg-primary/10',
                  answered && matches.get(i) !== pairs[i] && 'border-destructive bg-destructive/10'
                )}
                onClick={() => handleLeftClick(i)} disabled={answered}
              >
                {!isMobile && <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mr-2">{i + 1}</span>}
                <span lang="de" style={{ hyphens: 'auto' }}>{item}</span>
              </Button>
            );
          })}
        </div>
        <div className="space-y-1.5 md:space-y-2">
          {rightItems.map((item, i) => {
            const matchedByColor = rightColorMap.get(i);
            const isMatched = matchedByColor !== undefined;
            const colorIdx = isMatched ? matchedByColor % PAIR_COLORS.length : -1;
            return (
              <Button key={i} variant="outline" size="sm"
                className={cn('w-full justify-start text-left h-auto py-1.5 md:py-2 px-2 md:px-3 whitespace-normal break-words text-xs min-w-0',
                  isMatched && !checked && PAIR_COLORS[colorIdx],
                  !isMatched && selectedLeft !== null && !answered && 'ring-1 ring-primary/40 bg-primary/5',
                  answered && 'pointer-events-none'
                )}
                onClick={() => handleRightClick(i)} disabled={answered || isMatched}
              >
                {!isMobile && <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mr-2">{RIGHT_LABELS[i]}</span>}
                <span lang="de" style={{ hyphens: 'auto' }}>{item}</span>
              </Button>
            );
          })}
        </div>
      </div>
      {!answered && (
        <Button onClick={handleCheck} disabled={matches.size !== leftItems.length} className="self-end">
          {t('exercise_check')}
        </Button>
      )}
    </ExerciseCard>
  );
}
