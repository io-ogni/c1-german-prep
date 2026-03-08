import { useState, useMemo } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  content: { pairs: any[] };
  solution: { correct: number[][] };
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

/** Normalize pairs from either [{word, synonym}] objects or [string, string] tuples */
function normalizePairs(raw: any[]): [string, string][] {
  if (!raw || raw.length === 0) return [];
  const first = raw[0];
  if (Array.isArray(first)) return raw as [string, string][];
  if (first && typeof first === 'object' && ('word' in first)) {
    return raw.map((p: any) => [p.word, p.synonym ?? p.definition ?? '']);
  }
  return [];
}

export function SynonymMatch({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const { t } = useTranslation();
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [checked, setChecked] = useState(false);

  const pairsData = useMemo(() => normalizePairs(content?.pairs ?? []), [content?.pairs]);
  const leftItems = pairsData.map((p) => p[0]);
  const shuffledRight = useMemo(() => {
    const right = pairsData.map((p, i) => ({ text: p[1], originalIdx: i }));
    for (let i = right.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [right[i], right[j]] = [right[j], right[i]];
    }
    return right;
  }, [pairsData]);

  const handleLeftClick = (idx: number) => {
    if (answered) return;
    setSelectedLeft(idx === selectedLeft ? null : idx);
  };

  const handleRightClick = (rightIdx: number) => {
    if (answered || selectedLeft === null) return;
    const newMatches = new Map(matches);
    newMatches.set(selectedLeft, rightIdx);
    setMatches(newMatches);
    setSelectedLeft(null);
  };

  const handleCheck = () => {
    setChecked(true);
    let allCorrect = true;
    for (let i = 0; i < leftItems.length; i++) {
      const rightIdx = matches.get(i);
      if (rightIdx === undefined || shuffledRight[rightIdx].originalIdx !== i) {
        allCorrect = false;
        break;
      }
    }
    onAnswer(allCorrect);
  };

  const isMatchCorrect = (leftIdx: number): boolean | null => {
    if (!checked) return null;
    const rightIdx = matches.get(leftIdx);
    if (rightIdx === undefined) return false;
    return shuffledRight[rightIdx].originalIdx === leftIdx;
  };

  const matchedRightIndices = new Set(matches.values());

  if (pairsData.length === 0) {
    return <ExerciseCard question={instructions} feedback={null}><p className="text-muted-foreground">No data available.</p></ExerciseCard>;
  }

  return (
    <ExerciseCard question={instructions} feedback={null}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {leftItems.map((item, idx) => (
            <Button
              key={idx}
              variant="outline"
              className={cn(
                'w-full justify-start h-auto py-3 text-left whitespace-normal',
                selectedLeft === idx && 'ring-2 ring-primary',
                checked && isMatchCorrect(idx) === true && 'border-primary bg-primary/10',
                checked && isMatchCorrect(idx) === false && 'border-destructive bg-destructive/10'
              )}
              onClick={() => handleLeftClick(idx)}
              disabled={answered}
            >
              {item}
              {matches.has(idx) && (
                <span className="ml-auto text-xs text-muted-foreground">
                  → {shuffledRight[matches.get(idx)!].text}
                </span>
              )}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          {shuffledRight.map((item, idx) => (
            <Button
              key={idx}
              variant="outline"
              className={cn(
                'w-full justify-start h-auto py-3 text-left whitespace-normal',
                matchedRightIndices.has(idx) && 'opacity-50'
              )}
              onClick={() => handleRightClick(idx)}
              disabled={answered || matchedRightIndices.has(idx)}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </div>

      {!answered && matches.size === leftItems.length && !checked && (
        <Button onClick={handleCheck} className="w-full mt-2">
          {t('exercise_check')}
        </Button>
      )}

      {checked && (
        <div
          className={cn(
            'rounded-md px-3 py-2 text-sm font-medium',
            Array.from(matches.entries()).every(
              ([l, r]) => shuffledRight[r].originalIdx === l
            )
              ? 'bg-primary/10 text-primary'
              : 'bg-destructive/10 text-destructive'
          )}
        >
          {Array.from(matches.entries()).every(
            ([l, r]) => shuffledRight[r].originalIdx === l
          )
            ? t('exercise_correct')
            : `${t('exercise_incorrect')} ${explanation ?? ''}`}
        </div>
      )}
    </ExerciseCard>
  );
}
