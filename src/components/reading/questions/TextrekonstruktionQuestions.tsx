import { useTranslation } from '@/i18n/useTranslation';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  questions: any;
  answers: Record<string, string>;
  setAnswers: (a: Record<string, string>) => void;
  checked: boolean;
}

export function TextrekonstruktionQuestions({ questions, answers, setAnswers, checked }: Props) {
  const { lang: language } = useTranslation();

  const isArrayFormat = Array.isArray(questions);

  const options: { id: string; text: string }[] = isArrayFormat
    ? (questions as any[]).flatMap((q: any) =>
        (q.options || []).map((opt: string) => ({ id: `${q.position || q.id}-${opt}`, text: opt }))
      )
    : (questions.options || []);

  const correct: Record<string, string> = isArrayFormat
    ? (questions as any[]).reduce((acc: Record<string, string>, q: any) => {
        const pos = String(q.position || q.id?.replace('gap', ''));
        acc[pos] = `${pos}-${q.correct}`;
        return acc;
      }, {})
    : (questions.correct || {});

  const perGapOptions: Record<string, { id: string; text: string }[]> | null = isArrayFormat
    ? (questions as any[]).reduce((acc: any, q: any) => {
        const pos = String(q.position || q.id?.replace('gap', ''));
        acc[pos] = (q.options || []).map((opt: string) => ({ id: `${pos}-${opt}`, text: opt }));
        return acc;
      }, {})
    : null;

  // For Format B (per-gap), the inline gaps in ClickableText handle everything.
  // We only show correct answers after checking if some are wrong.
  if (perGapOptions) {
    if (!checked) {
      return (
        <p className="text-sm text-muted-foreground">
          {language === 'de'
            ? 'Klicke auf eine Lücke im Text, um den passenden Satz auszuwählen.'
            : 'Click on a gap in the text to select the correct sentence.'}
        </p>
      );
    }

    const hasWrong = Object.entries(correct).some(([gap, val]) => answers[gap] !== val);
    if (!hasWrong) return null;

    return (
      <div className="rounded-lg bg-secondary p-3 space-y-1">
        <p className="text-xs font-medium text-foreground">
          {language === 'de' ? 'Richtige Zuordnung:' : 'Correct assignments:'}
        </p>
        {Object.entries(correct).map(([gap, optId]) => {
          const gapOpts = perGapOptions[gap] || [];
          const correctOpt = gapOpts.find(o => o.id === optId);
          return (
            <p key={gap} className="text-xs text-muted-foreground">
              <span className="font-bold">[{gap}]</span> → {correctOpt?.text}
            </p>
          );
        })}
      </div>
    );
  }

  // Format A: shared pool
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {language === 'de'
          ? 'Klicke auf eine Lücke im Text, um den passenden Satz auszuwählen.'
          : 'Click a gap in the text to select the matching sentence.'}
      </p>

      {checked && Object.entries(correct).some(([gap, val]) => answers[gap] !== val) && (
        <div className="rounded-lg bg-secondary p-3 space-y-1">
          <p className="text-xs font-medium text-foreground">
            {language === 'de' ? 'Richtige Zuordnung:' : 'Correct assignments:'}
          </p>
          {Object.entries(correct).map(([gap, optId]) => (
            <p key={gap} className="text-xs text-muted-foreground">
              <span className="font-bold">[{gap}]</span> → {options.find(o => o.id === optId)?.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
