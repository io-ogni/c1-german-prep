import { useState, useMemo, useEffect, useCallback } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';
import { useIsMobile } from '@/hooks/use-mobile';

interface Props {
  content: { pairs: any[] };
  solution: { correct: number[][] };
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

function normalizePairs(raw: any[]): [string, string][] {
  if (!raw || raw.length === 0) return [];
  const first = raw[0];
  if (Array.isArray(first)) return raw as [string, string][];
  if (first && typeof first === 'object' && ('word' in first)) {
    return raw.map((p: any) => [p.word, p.antonym ?? '']);
  }
  return [];
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

export function AntonymMatch({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSelectedLeft(null);
    setMatches(new Map());
    setChecked(false);
  }, [content]);

  const pairsData = useMemo(() => normalizePairs(content?.pairs ?? []), [content?.pairs]);

  const shuffledLeft = useMemo(() => {
    const left = pairsData.map((p, i) => ({ text: p[0], originalIdx: i }));
    for (let i = left.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [left[i], left[j]] = [left[j], left[i]];
    }
    return left;
  }, [pairsData]);

  const shuffledRight = useMemo(() => {
    const right = pairsData.map((p, i) => ({ text: p[1], originalIdx: i }));
    for (let i = right.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [right[i], right[j]] = [right[j], right[i]];
    }
    return right;
  }, [pairsData]);

  const handleLeftClick = useCallback((idx: number) => {
    if (answered) return;
    setSelectedLeft(idx === selectedLeft ? null : idx);
  }, [answered, selectedLeft]);

  const matchedRightIndices = useMemo(() => new Set(matches.values()), [matches]);

  const handleRightClick = useCallback((rightIdx: number) => {
    if (answered || selectedLeft === null || matchedRightIndices.has(rightIdx)) return;
    const newMatches = new Map(matches);
    newMatches.set(selectedLeft, rightIdx);
    setMatches(newMatches);
    setSelectedLeft(null);
  }, [answered, selectedLeft, matches, matchedRightIndices]);

  const handleCheck = () => {
    setChecked(true);
    let allCorrect = true;
    for (let i = 0; i < shuffledLeft.length; i++) {
      const rightIdx = matches.get(i);
      if (rightIdx === undefined || shuffledRight[rightIdx].originalIdx !== shuffledLeft[i].originalIdx) {
        allCorrect = false;
        break;
      }
    }
    onAnswer(allCorrect);
  };

  // Keyboard handler
  useEffect(() => {
    if (answered) return;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key;
      // Number keys 1-9 for left items
      const num = parseInt(key, 10);
      if (num >= 1 && num <= shuffledLeft.length) {
        handleLeftClick(num - 1);
        return;
      }
      // Letter keys for right items
      const rIdx = RIGHT_KEYS.indexOf(key.toLowerCase());
      if (rIdx >= 0 && rIdx < shuffledRight.length) {
        handleRightClick(rIdx);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, shuffledLeft.length, shuffledRight.length, handleLeftClick, handleRightClick]);

  const isMatchCorrect = (leftIdx: number): boolean | null => {
    if (!checked) return null;
    const rightIdx = matches.get(leftIdx);
    if (rightIdx === undefined) return false;
    return shuffledRight[rightIdx].originalIdx === shuffledLeft[leftIdx].originalIdx;
  };

  const rightColorMap = useMemo(() => {
    const m = new Map<number, number>();
    matches.forEach((rightIdx, leftIdx) => {
      m.set(rightIdx, shuffledLeft[leftIdx]?.originalIdx ?? 0);
    });
    return m;
  }, [matches, shuffledLeft]);

  if (pairsData.length === 0) {
    return <ExerciseCard question={instructions} feedback={null}><p className="text-muted-foreground">No data available.</p></ExerciseCard>;
  }

  return (
    <ExerciseCard question={instructions} feedback={null}>
      <div className="grid grid-cols-2 gap-2 md:gap-3 min-w-0">
        <div className="space-y-1.5 md:space-y-2">
          {shuffledLeft.map((item, idx) => {
            const colorIdx = item.originalIdx % PAIR_COLORS.length;
            const matched = matches.has(idx);
            return (
              <Button
                key={idx}
                variant="outline"
                className={cn(
                  'w-full justify-start h-auto py-2 md:py-3 px-2 md:px-3 text-left whitespace-normal break-words text-sm min-w-0',
                  selectedLeft === idx && 'ring-2 ring-primary',
                  matched && !checked && PAIR_COLORS[colorIdx],
                  checked && isMatchCorrect(idx) === true && 'border-green-500 bg-green-100 dark:bg-green-900/30',
                  checked && isMatchCorrect(idx) === false && 'border-destructive bg-destructive/10'
                )}
                onClick={() => handleLeftClick(idx)}
                disabled={answered}
              >
                {!isMobile && <kbd className="font-mono text-[10px] opacity-50 mr-2 shrink-0">{idx + 1}</kbd>}
                <span lang="de" style={{ hyphens: 'auto' }}>{item.text}</span>
                {!isMobile && matched && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    → {shuffledRight[matches.get(idx)!].text}
                  </span>
                )}
              </Button>
            );
          })}
        </div>
        <div className="space-y-1.5 md:space-y-2">
          {shuffledRight.map((item, idx) => {
            const matchedByColor = rightColorMap.get(idx);
            const isMatched = matchedByColor !== undefined;
            const colorIdx = isMatched ? matchedByColor % PAIR_COLORS.length : -1;
            return (
              <Button
                key={idx}
                variant="outline"
                className={cn(
                  'w-full justify-start h-auto py-2 md:py-3 px-2 md:px-3 text-left whitespace-normal break-words text-sm min-w-0',
                  isMatched && !checked && PAIR_COLORS[colorIdx],
                  !isMatched && selectedLeft !== null && !answered && 'ring-1 ring-primary/40 bg-primary/5'
                )}
                onClick={() => handleRightClick(idx)}
                disabled={answered || isMatched}
              >
                {!isMobile && <kbd className="font-mono text-[10px] opacity-50 mr-2 shrink-0">{RIGHT_LABELS[idx]}</kbd>}
                <span lang="de" style={{ hyphens: 'auto' }}>{item.text}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {!answered && matches.size === shuffledLeft.length && !checked && (
        <Button onClick={handleCheck} className="self-end mt-2">
          {t('exercise_check')}
        </Button>
      )}

      {checked && (
        <div
          className={cn(
            'rounded-md px-3 py-2 text-sm font-medium',
            Array.from(matches.entries()).every(
              ([l, r]) => shuffledRight[r].originalIdx === shuffledLeft[l].originalIdx
            )
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-destructive/10 text-destructive'
          )}
        >
          {Array.from(matches.entries()).every(
            ([l, r]) => shuffledRight[r].originalIdx === shuffledLeft[l].originalIdx
          )
            ? t('exercise_correct')
            : `${t('exercise_incorrect')} ${explanation ?? ''}`}
        </div>
      )}
    </ExerciseCard>
  );
}
