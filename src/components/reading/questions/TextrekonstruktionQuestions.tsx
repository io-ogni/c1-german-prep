import { useState } from 'react';
import { Button } from '@/components/ui/button';
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

  // Normalize two formats:
  // Format A: { options: [{id, text}], correct: {gapNum: optionId}, gaps }
  // Format B: [{ id: "gap1", options: [...strings], correct: "...", position }]
  const isArrayFormat = Array.isArray(questions);

  const options: { id: string; text: string }[] = isArrayFormat
    ? (questions as any[]).flatMap((q: any, _i: number) =>
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

  const gaps = isArrayFormat ? (questions as any[]).length : (questions.gaps || Object.keys(correct).length);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const assignedOptions = new Set(Object.values(answers));

  const handleOptionClick = (optionId: string) => {
    if (checked) return;
    if (assignedOptions.has(optionId)) {
      const newAnswers = { ...answers };
      for (const [gap, val] of Object.entries(newAnswers)) {
        if (val === optionId) delete newAnswers[gap];
      }
      setAnswers(newAnswers);
      return;
    }
    setSelectedOption(optionId === selectedOption ? null : optionId);
  };

  const handleGapClick = (gapNum: string) => {
    if (checked || !selectedOption) return;
    setAnswers({ ...answers, [gapNum]: selectedOption });
    setSelectedOption(null);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-foreground">
        {language === 'de'
          ? 'Ordnen Sie die Sätze den Lücken im Text zu. Klicken Sie auf einen Satz, dann auf eine Lücke.'
          : 'Assign sentences to gaps in the text. Click a sentence, then click a gap.'}
      </p>

      <div className="space-y-2">
        {Array.from({ length: gaps }, (_, i) => String(i + 1)).map(gapNum => {
          const assigned = answers[gapNum];
          const isCorrect = checked && assigned === correct[gapNum];
          const isWrong = checked && assigned && assigned !== correct[gapNum];

          return (
            <div
              key={gapNum}
              className={`flex items-start gap-2 p-2 rounded border cursor-pointer transition-colors ${
                selectedOption && !assigned ? 'border-primary bg-primary/5' : 'border-border'
              } ${isCorrect ? 'border-primary bg-primary/10' : ''} ${isWrong ? 'border-destructive bg-destructive/10' : ''}`}
              onClick={() => handleGapClick(gapNum)}
            >
              <span className="font-mono text-xs font-bold text-muted-foreground mt-0.5 shrink-0 w-5">{gapNum}.</span>
              <span className="text-sm text-foreground flex-1">
                {assigned
                  ? options.find(o => o.id === assigned)?.text || assigned
                  : <span className="text-muted-foreground italic">{language === 'de' ? 'Lücke leer' : 'Empty gap'}</span>
                }
              </span>
              {isCorrect && <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />}
              {isWrong && <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />}
            </div>
          );
        })}
      </div>

      {checked && Object.entries(correct).some(([gap, val]) => answers[gap] !== val) && (
        <div className="rounded-lg bg-secondary p-3 space-y-1">
          <p className="text-xs font-medium text-foreground">{language === 'de' ? 'Richtige Zuordnung:' : 'Correct assignments:'}</p>
          {Object.entries(correct).map(([gap, optId]) => (
            <p key={gap} className="text-xs text-muted-foreground">
              {gap}. → [{optId}] {options.find(o => o.id === optId)?.text}
            </p>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          {language === 'de' ? 'Verfügbare Sätze:' : 'Available sentences:'}
        </p>
        {options.map(opt => {
          const isAssigned = assignedOptions.has(opt.id);
          const isSelected = selectedOption === opt.id;
          return (
            <Button
              key={opt.id}
              variant={isSelected ? 'default' : 'outline'}
              className={`w-full justify-start text-left h-auto py-2 text-xs ${
                isAssigned ? 'opacity-40' : ''
              }`}
              onClick={() => handleOptionClick(opt.id)}
              disabled={checked}
            >
              <span className="font-bold mr-2 shrink-0">[{opt.id}]</span>
              <span className="line-clamp-2">{opt.text}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
