import { useState, useMemo, useEffect, useCallback } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';

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

  if (pairs.length === 0) {
    return <ExerciseCard question={instructions} feedback={null}><p className="text-muted-foreground">No data.</p></ExerciseCard>;
  }

  return (
    <ExerciseCard
      question={instructions}
      feedback={answered ? { correct: allCorrect, message: allCorrect ? t('exercise_correct') : `${t('exercise_incorrect')} ${explanation ?? ''}` } : null}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {words.map((w, i) => (
            <Button key={i} variant="outline" size="sm"
              className={cn(
                'w-full justify-start text-left h-auto py-2 whitespace-normal text-xs',
                selectedLeft === i && 'ring-2 ring-primary',
                matches.has(i) && 'bg-muted',
                answered && matches.get(i) !== undefined && shuffledRight[matches.get(i)!].originalIdx === i && 'border-primary bg-primary/10',
                answered && matches.get(i) !== undefined && shuffledRight[matches.get(i)!].originalIdx !== i && 'border-destructive bg-destructive/10'
              )}
              onClick={() => handleLeftClick(i)} disabled={answered}
            >
              <kbd className="font-mono text-[10px] opacity-50 mr-2 shrink-0">{i + 1}</kbd>
              {w}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          {shuffledRight.map((d, i) => (
            <Button key={i} variant="outline" size="sm"
              className={cn(
                'w-full justify-start text-left h-auto py-2 whitespace-normal text-xs',
                matchedRight.has(i) && 'bg-muted',
                selectedLeft !== null && !matchedRight.has(i) && !answered && 'ring-1 ring-primary/40 bg-primary/5',
                answered && 'pointer-events-none'
              )}
              onClick={() => handleRightClick(i)}
              disabled={answered || matchedRight.has(i)}
            >
              <kbd className="font-mono text-[10px] opacity-50 mr-2 shrink-0">{RIGHT_LABELS[i]}</kbd>
              {d.text}
            </Button>
          ))}
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

  if (leftItems.length === 0) {
    return <ExerciseCard question={instructions} feedback={null}><p className="text-muted-foreground">No data.</p></ExerciseCard>;
  }

  return (
    <ExerciseCard
      question={instructions}
      feedback={answered ? { correct: allCorrect, message: allCorrect ? t('exercise_correct') : `${t('exercise_incorrect')} ${explanation ?? ''}` } : null}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {leftItems.map((item, i) => (
            <Button key={i} variant="outline" size="sm"
              className={cn('w-full justify-start text-left h-auto py-2 whitespace-normal text-xs',
                selectedLeft === i && 'ring-2 ring-primary', matches.has(i) && 'bg-muted',
                answered && matches.get(i) === pairs[i] && 'border-primary bg-primary/10',
                answered && matches.get(i) !== pairs[i] && 'border-destructive bg-destructive/10'
              )}
              onClick={() => handleLeftClick(i)} disabled={answered}
            >
              <kbd className="font-mono text-[10px] opacity-50 mr-2 shrink-0">{i + 1}</kbd>
              {item}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          {rightItems.map((item, i) => (
            <Button key={i} variant="outline" size="sm"
              className={cn('w-full justify-start text-left h-auto py-2 whitespace-normal text-xs',
                matchedRight.has(i) && 'bg-muted',
                selectedLeft !== null && !matchedRight.has(i) && !answered && 'ring-1 ring-primary/40 bg-primary/5',
                answered && 'pointer-events-none'
              )}
              onClick={() => handleRightClick(i)} disabled={answered || matchedRight.has(i)}
            >
              <kbd className="font-mono text-[10px] opacity-50 mr-2 shrink-0">{RIGHT_LABELS[i]}</kbd>
              {item}
            </Button>
          ))}
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
