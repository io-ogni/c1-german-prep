import { useState, useEffect, useRef } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { SelectableText } from '@/components/shared/SelectableText';
import { Input } from '@/components/ui/input';
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

/**
 * Handles two data shapes:
 * 1) Single sentence:  content.sentence + solution.correct
 * 2) Multi-sentence:   content.sentences[] (with options) + solution.answers[]
 *    For multi-sentence we show them one at a time inside the ExerciseFlow stepper,
 *    but the exercise row covers ALL sentences → we render the current sub-index internally.
 */
export function GrammarFillIn({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const { t } = useTranslation();

  // Detect multi-sentence format
  const sentences: { text: string; options?: string[]; hint?: string }[] | null = content?.sentences ?? null;

  if (sentences) {
    return (
      <MultiSentenceFillIn
        sentences={sentences}
        answers={solution?.answers ?? []}
        instructions={instructions}
        explanation={explanation}
        answered={answered}
        onAnswer={onAnswer}
      />
    );
  }

  // Single sentence format
  return (
    <SingleSentenceFillIn
      content={content}
      solution={solution}
      instructions={instructions}
      explanation={explanation}
      answered={answered}
      onAnswer={onAnswer}
    />
  );
}

/* ── Single sentence (free-text input) ── */
function SingleSentenceFillIn({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [value, setValue] = useState('');
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  // Reset input and focus when exercise changes
  const prevContent = useRef(content);
  useEffect(() => {
    if (prevContent.current !== content) {
      prevContent.current = content;
      setValue('');
    }
    inputRef.current?.focus();
  }, [content]);

  const rawCorrect = solution?.correct ?? '';
  // correct may be a string, array, or numeric index into content.options
  let correctAnswer: string;
  if (typeof rawCorrect === 'number' && content?.options) {
    correctAnswer = content.options[rawCorrect] ?? String(rawCorrect);
  } else if (Array.isArray(rawCorrect)) {
    correctAnswer = rawCorrect[0] ?? '';
  } else {
    correctAnswer = String(rawCorrect);
  }
  const acceptAlso: string[] = solution?.accept_also ?? [];
  const allAccepted = [correctAnswer, ...acceptAlso].map(a => a.trim().toLowerCase());
  const isCorrect = allAccepted.includes(value.trim().toLowerCase());
  const allowsEmpty = allAccepted.includes('');

  const handleCheck = () => {
    if (!value.trim() && !allowsEmpty) return;
    onAnswer(isCorrect);
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
                : `${t('exercise_correct_answer')}: ${solution.full_answer ?? (allowsEmpty ? 'keine Endung' : correctAnswer)}${explanation ? ` — ${explanation}` : ''}`,
            }
          : null
      }
    >
      <SelectableText text={content?.sentence ?? content?.original ?? ''} className="py-2" />
      {content?.instruction && (
        <p className="text-sm font-medium text-primary">{content.instruction}</p>
      )}
      {content?.hint && (
        <p className="text-xs text-muted-foreground italic">{content.hint}</p>
      )}
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !answered && handleCheck()}
          placeholder="..."
          disabled={answered}
          className="flex-1"
          autoFocus
        />
        {!answered && (
          <Button onClick={handleCheck} disabled={!value.trim() && !allowsEmpty}>
            {t('exercise_check')}
          </Button>
        )}
      </div>
    </ExerciseCard>
  );
}

/* ── Multi-sentence with options (step through internally) ── */
function MultiSentenceFillIn({
  sentences,
  answers,
  instructions,
  explanation,
  answered: parentAnswered,
  onAnswer,
}: {
  sentences: { text: string; options?: string[] }[];
  answers: string[];
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}) {
  const [subIndex, setSubIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [subAnswered, setSubAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [eliminated, setEliminated] = useState<Set<number>>(new Set());
  const { t } = useTranslation();

  // Reset all internal state when the exercise changes
  const sentencesRef = useRef(sentences);
  useEffect(() => {
    if (sentencesRef.current !== sentences) {
      sentencesRef.current = sentences;
      setSubIndex(0);
      setSelected(null);
      setSubAnswered(false);
      setCorrectCount(0);
      setEliminated(new Set());
    }
  }, [sentences]);

  const current = sentences[subIndex] ?? { text: '', options: [] };
  const rawAnswer = answers[subIndex] ?? '';
  let correctAnswer: string;
  if (typeof rawAnswer === 'number' && current?.options) {
    correctAnswer = current.options[rawAnswer] ?? String(rawAnswer);
  } else if (Array.isArray(rawAnswer)) {
    correctAnswer = rawAnswer[0] ?? '';
  } else {
    correctAnswer = String(rawAnswer);
  }
  const isLast = subIndex === sentences.length - 1;

  const handleSelect = (idx: number) => {
    if (subAnswered || parentAnswered) return;
    const isCorrect = current.options?.[idx]?.toLowerCase() === correctAnswer.toLowerCase();
    setSelected(idx);

    if (isCorrect) {
      setSubAnswered(true);
      const newCount = correctCount + 1;
      setCorrectCount(newCount);
      if (isLast) {
        onAnswer(newCount === sentences.length);
      }
    } else {
      // Mark wrong option as eliminated, allow retry
      setEliminated((prev) => new Set(prev).add(idx));
      // Brief highlight then clear selection
      setTimeout(() => setSelected(null), 400);
    }
  };

  const handleNextSub = () => {
    setSubIndex((i) => i + 1);
    setSelected(null);
    setSubAnswered(false);
    setEliminated(new Set());
  };

  const isCorrect = selected !== null && current.options?.[selected]?.toLowerCase() === correctAnswer.toLowerCase();

  return (
    <ExerciseCard
      question={`${instructions} (${subIndex + 1}/${sentences.length})`}
      feedback={
        subAnswered
          ? {
              correct: isCorrect,
              message: isCorrect
                ? t('exercise_correct')
                : `${t('exercise_correct_answer')}: ${correctAnswer}${explanation ? ` — ${explanation}` : ''}`,
            }
          : null
      }
    >
      <SelectableText text={current?.text ?? ''} className="py-2" />
      {current.options && (
        <div className="grid gap-2 sm:grid-cols-2">
          {current.options.map((opt, idx) => (
            <Button
              key={idx}
              variant="outline"
              className={cn(
                'justify-start text-left h-auto py-3',
                subAnswered && opt.toLowerCase() === correctAnswer.toLowerCase() && 'border-primary bg-primary/10 text-primary',
                eliminated.has(idx) && 'opacity-40 pointer-events-none border-destructive/50',
                !subAnswered && selected === idx && opt.toLowerCase() !== correctAnswer.toLowerCase() && 'border-destructive bg-destructive/10 text-destructive'
              )}
              onClick={() => handleSelect(idx)}
              disabled={subAnswered || parentAnswered || eliminated.has(idx)}
            >
              {opt}
            </Button>
          ))}
        </div>
      )}
      {subAnswered && !isLast && !parentAnswered && (
        <div className="flex justify-end pt-2">
          <Button size="sm" onClick={handleNextSub}>{t('exercise_next')}</Button>
        </div>
      )}
    </ExerciseCard>
  );
}
