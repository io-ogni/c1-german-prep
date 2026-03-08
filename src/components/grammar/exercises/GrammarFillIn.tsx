import { useState } from 'react';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
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

  const correctAnswer = solution?.correct ?? '';
  const isCorrect = value.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

  const handleCheck = () => {
    if (!value.trim()) return;
    onAnswer(isCorrect);
  };

  const sentenceHtml = (content?.sentence ?? '').replace(
    /___/g,
    '<span class="inline-block border-b-2 border-primary px-2 mx-1 min-w-[4rem]">&nbsp;</span>'
  );

  return (
    <ExerciseCard
      question={instructions}
      feedback={
        answered
          ? {
              correct: isCorrect,
              message: isCorrect
                ? t('exercise_correct')
                : `${t('exercise_correct_answer')}: ${solution.full_answer ?? solution.correct}${explanation ? ` — ${explanation}` : ''}`,
            }
          : null
      }
    >
      <p
        className="text-base text-foreground leading-relaxed py-2"
        dangerouslySetInnerHTML={{ __html: sentenceHtml }}
      />
      {content?.hint && (
        <p className="text-xs text-muted-foreground italic">{content.hint}</p>
      )}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !answered && handleCheck()}
          placeholder="..."
          disabled={answered}
          className="flex-1"
        />
        {!answered && (
          <Button onClick={handleCheck} disabled={!value.trim()}>
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
  const { t } = useTranslation();

  const current = sentences[subIndex];
  const correctAnswer = answers[subIndex] ?? '';
  const isLast = subIndex === sentences.length - 1;

  const sentenceHtml = (current?.text ?? '').replace(
    /___/g,
    '<span class="inline-block border-b-2 border-primary px-2 mx-1 min-w-[4rem]">&nbsp;</span>'
  );

  const handleSelect = (idx: number) => {
    if (subAnswered || parentAnswered) return;
    setSelected(idx);
    setSubAnswered(true);
    const isCorrect = current.options?.[idx]?.toLowerCase() === correctAnswer.toLowerCase();
    const newCount = correctCount + (isCorrect ? 1 : 0);
    setCorrectCount(newCount);
    if (isLast) {
      onAnswer(newCount === sentences.length);
    }
  };

  const handleNextSub = () => {
    setSubIndex((i) => i + 1);
    setSelected(null);
    setSubAnswered(false);
  };

  const showFeedback = subAnswered || parentAnswered;
  const isCorrect = selected !== null && current.options?.[selected]?.toLowerCase() === correctAnswer.toLowerCase();

  return (
    <ExerciseCard
      question={`${instructions} (${subIndex + 1}/${sentences.length})`}
      feedback={
        showFeedback
          ? {
              correct: isCorrect,
              message: isCorrect
                ? t('exercise_correct')
                : `${t('exercise_correct_answer')}: ${correctAnswer}${explanation ? ` — ${explanation}` : ''}`,
            }
          : null
      }
    >
      <p
        className="text-base text-foreground leading-relaxed py-2"
        dangerouslySetInnerHTML={{ __html: sentenceHtml }}
      />
      {current.options && (
        <div className="grid gap-2 sm:grid-cols-2">
          {current.options.map((opt, idx) => (
            <Button
              key={idx}
              variant="outline"
              className={cn(
                'justify-start text-left h-auto py-3',
                showFeedback && opt.toLowerCase() === correctAnswer.toLowerCase() && 'border-primary bg-primary/10 text-primary',
                showFeedback && selected === idx && opt.toLowerCase() !== correctAnswer.toLowerCase() && 'border-destructive bg-destructive/10 text-destructive'
              )}
              onClick={() => handleSelect(idx)}
              disabled={subAnswered || parentAnswered}
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
