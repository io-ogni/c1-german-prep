import { useState, useMemo, useCallback } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { SelectableText } from '@/components/shared/SelectableText';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/useTranslation';
import { useNumberKeys } from '@/hooks/useNumberKeys';

interface Props {
  content: any;
  solution: any;
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

const LABELS = ['a', 'b', 'c', 'd'];

export function MultipleChoice({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  // Detect multi-question format
  const questions: { question?: string; correct: string; options: string[] }[] | null =
    content?.questions ?? null;

  if (questions && questions.length > 0) {
    return (
      <MultiStepMC
        questions={questions}
        answers={solution?.answers ?? []}
        instructions={instructions}
        explanation={explanation}
        answered={answered}
        onAnswer={onAnswer}
      />
    );
  }

  // Single question format
  return (
    <SingleMC
      content={content}
      solution={solution}
      instructions={instructions}
      explanation={explanation}
      answered={answered}
      onAnswer={onAnswer}
    />
  );
}

function SingleMC({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const { t } = useTranslation();

  const shuffled = useMemo(() => {
    const opts = (content?.options ?? []).map((text: string, origIdx: number) => ({ text, origIdx }));
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    const correctIdx = opts.findIndex((o: { origIdx: number }) => o.origIdx === solution.correct);
    return { options: opts, correctIdx };
  }, [content?.options, solution.correct]);

  const isCorrect = selected === shuffled.correctIdx;

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
      {(content?.context || content?.sentence || content?.expression) && (
        <div className="bg-muted/50 rounded-md p-3">
          <SelectableText text={content.context ?? content.sentence ?? content.expression} className={content?.expression && !content?.context && !content?.sentence ? "text-lg font-semibold text-center" : "text-sm"} />
        </div>
      )}
      <div className="grid gap-2">
        {shuffled.options.map((opt: { text: string; origIdx: number }, idx: number) => (
          <Button
            key={idx}
            variant="outline"
            className={cn(
              'justify-start text-left h-auto py-3 whitespace-normal bg-white dark:bg-card hover:border-primary/40 hover:bg-primary/5',
              answered && idx === shuffled.correctIdx && 'border-primary bg-primary/10 text-primary',
              answered && selected === idx && idx !== shuffled.correctIdx && 'border-destructive bg-destructive/10 text-destructive'
            )}
            onClick={() => handleSelect(idx)}
            disabled={answered}
          >
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mr-2">{idx + 1}</span>
            {opt.text}
          </Button>
        ))}
      </div>
    </ExerciseCard>
  );
}

function MultiStepMC({
  questions,
  answers,
  instructions,
  explanation,
  answered: parentAnswered,
  onAnswer,
}: {
  questions: { question?: string; correct: string; options: string[] }[];
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

  const current = questions[subIndex] ?? { question: '', options: [], correct: '' };
  const questionText = current?.question ?? '';
  const correctAnswer = current?.correct ?? answers[subIndex] ?? '';
  const isLast = subIndex === questions.length - 1;

  const handleSelect = useCallback((idx: number) => {
    if (subAnswered || parentAnswered) return;
    const opt = current.options[idx];
    const isCorrect = opt?.toLowerCase() === correctAnswer.toLowerCase();
    setSelected(idx);

    if (isCorrect) {
      setSubAnswered(true);
      const newCount = correctCount + 1;
      setCorrectCount(newCount);
      if (isLast) {
        onAnswer(newCount === questions.length);
      }
    } else {
      setEliminated(prev => new Set(prev).add(idx));
      setTimeout(() => setSelected(null), 400);
    }
  }, [subAnswered, parentAnswered, current, correctAnswer, correctCount, isLast, onAnswer, eliminated]);

  useNumberKeys(handleSelect, current.options.length, subAnswered || parentAnswered);

  const handleNext = () => {
    setSubIndex(i => i + 1);
    setSelected(null);
    setSubAnswered(false);
    setEliminated(new Set());
  };

  const isCorrect = selected !== null && current.options[selected]?.toLowerCase() === correctAnswer.toLowerCase();

  return (
    <ExerciseCard
      question={`${instructions} (${subIndex + 1}/${questions.length})`}
      feedback={null}
    >
      <SelectableText text={questionText} className="py-2" />
      <div className="grid gap-2 sm:grid-cols-2">
        {current.options.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            className={cn(
              'justify-start text-left h-auto py-3 whitespace-normal hover:border-primary/40 hover:bg-primary/5',
              subAnswered && opt.toLowerCase() === correctAnswer.toLowerCase() && 'border-primary bg-primary/10 text-primary',
              eliminated.has(idx) && 'opacity-40 pointer-events-none border-destructive/50',
              !subAnswered && selected === idx && opt.toLowerCase() !== correctAnswer.toLowerCase() && 'border-destructive bg-destructive/10 text-destructive'
            )}
            onClick={() => handleSelect(idx)}
            disabled={subAnswered || parentAnswered || eliminated.has(idx)}
          >
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mr-2">{idx + 1}</span>
            {opt}
          </Button>
        ))}
      </div>
      {subAnswered && (
        <div
          className={cn(
            'rounded-md px-3 py-2 text-sm font-medium',
            isCorrect
              ? 'bg-success/10 text-success'
              : 'bg-destructive/10 text-destructive'
          )}
        >
          {isCorrect
            ? t('exercise_correct')
            : `${t('exercise_correct_answer')}: ${correctAnswer}${explanation ? ` — ${explanation}` : ''}`}
        </div>
      )}
      {subAnswered && !isLast && !parentAnswered && (
        <div className="flex justify-end">
          <Button size="sm" onClick={handleNext}>{t('exercise_next')}</Button>
        </div>
      )}
    </ExerciseCard>
  );
}
