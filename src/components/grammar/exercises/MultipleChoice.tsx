import { useState, useMemo } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { SelectableText } from '@/components/shared/SelectableText';
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

const LABELS = ['a', 'b', 'c', 'd'];

export function MultipleChoice({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  // Detect multi-question format (qüstions array)
  const questions: { qüstion?: string; question?: string; correct: string; options: string[] }[] | null =
    content?.qüstions ?? content?.questions ?? null;

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
      {(content?.context || content?.sentence) && (
        <div className="bg-muted rounded-md p-3">
          <SelectableText text={content.context ?? content.sentence} className="text-sm" />
        </div>
      )}
      <div className="grid gap-2">
        {shuffled.options.map((opt: { text: string; origIdx: number }, idx: number) => (
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
            <span className="font-semibold mr-2">{LABELS[idx]})</span> {opt.text}
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
  questions: { qüstion?: string; question?: string; correct: string; options: string[] }[];
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
  const questionText = current?.qüstion ?? current?.question ?? '';
  const correctAnswer = current?.correct ?? answers[subIndex] ?? '';
  const isLast = subIndex === questions.length - 1;

  const handleSelect = (idx: number) => {
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
  };

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
      <SelectableText text={questionText} className="py-2" />
      <div className="grid gap-2 sm:grid-cols-2">
        {current.options.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            className={cn(
              'justify-start text-left h-auto py-3 whitespace-normal',
              subAnswered && opt.toLowerCase() === correctAnswer.toLowerCase() && 'border-primary bg-primary/10 text-primary',
              eliminated.has(idx) && 'opacity-40 pointer-events-none border-destructive/50',
              !subAnswered && selected === idx && opt.toLowerCase() !== correctAnswer.toLowerCase() && 'border-destructive bg-destructive/10 text-destructive'
            )}
            onClick={() => handleSelect(idx)}
            disabled={subAnswered || parentAnswered || eliminated.has(idx)}
          >
            <span className="font-semibold mr-2">{LABELS[idx]})</span> {opt}
          </Button>
        ))}
      </div>
      {subAnswered && !isLast && !parentAnswered && (
        <div className="flex justify-end pt-2">
          <Button size="sm" onClick={handleNext}>{t('exercise_next')}</Button>
        </div>
      )}
    </ExerciseCard>
  );
}
