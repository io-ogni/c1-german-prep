import { useState } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { SelectableText } from '@/components/shared/SelectableText';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  content: any;
  solution: any;
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

export function WordFamily({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  // Detect multi-item format: content.items[]
  const items: { given: string; transform_to: string; hint?: string }[] | null = content?.items ?? null;

  if (items && items.length > 0) {
    return (
      <MultiItemWordFamily
        items={items}
        answers={solution?.answers ?? []}
        instructions={instructions}
        explanation={explanation}
        answered={answered}
        onAnswer={onAnswer}
      />
    );
  }

  // Single item format: content.word + content.target_type
  return (
    <SingleWordFamily
      content={content}
      solution={solution}
      instructions={instructions}
      explanation={explanation}
      answered={answered}
      onAnswer={onAnswer}
    />
  );
}

function SingleWordFamily({ content, solution, instructions, explanation, answered, onAnswer }: Props) {
  const [input, setInput] = useState('');
  const { t } = useTranslation();

  const checkAnswer = () => {
    const trimmed = input.trim().toLowerCase();
    const accepted = [solution.correct, ...(solution.accept_also ?? [])].map((s: string) =>
      s.toLowerCase().trim()
    );
    onAnswer(accepted.includes(trimmed));
  };

  const isCorrect =
    answered &&
    [solution.correct, ...(solution.accept_also ?? [])]
      .map((s: string) => s.toLowerCase().trim())
      .includes(input.trim().toLowerCase());

  return (
    <ExerciseCard
      question={instructions}
      feedback={
        answered
          ? {
              correct: isCorrect,
              message: isCorrect
                ? t('exercise_correct')
                : `${t('exercise_correct_answer')}: ${solution.correct}. ${explanation ?? ''}`,
            }
          : null
      }
    >
      <div className="text-center space-y-2 py-2">
        <SelectableText text={content?.given ?? content?.word ?? ''} className="text-lg font-semibold" />
        <p className="text-sm text-muted-foreground">{content?.target_type}</p>
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="..."
          disabled={answered}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !answered && input.trim()) checkAnswer();
          }}
        />
        {!answered && (
          <Button onClick={checkAnswer} disabled={!input.trim()}>
            {t('exercise_check')}
          </Button>
        )}
      </div>
    </ExerciseCard>
  );
}

function MultiItemWordFamily({
  items,
  answers,
  instructions,
  answered: parentAnswered,
  explanation,
  onAnswer,
}: {
  items: { given: string; transform_to: string; hint?: string }[];
  answers: string[];
  instructions: string;
  explanation?: string;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}) {
  const [subIndex, setSubIndex] = useState(0);
  const [input, setInput] = useState('');
  const [subAnswered, setSubAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const { t } = useTranslation();

  const current = items[subIndex];
  const correctAnswer = answers[subIndex] ?? '';
  const isLast = subIndex === items.length - 1;

  const normalize = (s: string) => s.trim().toLowerCase().replace(/[.,;:!?]/g, '');

  const handleCheck = () => {
    if (parentAnswered || subAnswered) return;
    const isCorrect = normalize(input) === normalize(correctAnswer);
    setSubAnswered(true);
    const newCount = correctCount + (isCorrect ? 1 : 0);
    setCorrectCount(newCount);
    if (isLast) {
      onAnswer(newCount === items.length);
    }
  };

  const handleNext = () => {
    setSubIndex(i => i + 1);
    setInput('');
    setSubAnswered(false);
  };

  const isCorrect = subAnswered && normalize(input) === normalize(correctAnswer);

  return (
    <>
      <ExerciseCard
        question={`${instructions} (${subIndex + 1}/${items.length})`}
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
        <div className="space-y-2 py-2">
          <div className="rounded-md bg-muted p-3">
            <SelectableText text={current.given} className="text-sm" />
          </div>
          <p className="text-xs text-muted-foreground italic">→ {current.transform_to}{current.hint ? ` (${current.hint})` : ''}</p>
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="..."
            disabled={subAnswered || parentAnswered}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !subAnswered && !parentAnswered && input.trim()) handleCheck();
            }}
          />
          {!subAnswered && !parentAnswered && (
            <Button onClick={handleCheck} disabled={!input.trim()}>
              {t('exercise_check')}
            </Button>
          )}
        </div>
      </ExerciseCard>
      {subAnswered && !isLast && !parentAnswered && (
        <div className="flex justify-end">
          <Button size="sm" onClick={handleNext}>{t('exercise_next')}</Button>
        </div>
      )}
    </>
  );
}
