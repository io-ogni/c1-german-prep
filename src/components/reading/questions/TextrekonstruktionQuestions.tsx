import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n/useTranslation';
import { CheckCircle, XCircle, GripVertical } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

interface Props {
  questions: any;
  answers: Record<string, string>;
  setAnswers: (a: Record<string, string>) => void;
  checked: boolean;
}

function DraggableOption({ id, text, isAssigned, disabled }: { id: string; text: string; isAssigned: boolean; disabled: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: disabled || isAssigned,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors select-none
        ${isAssigned ? 'opacity-30 cursor-default' : 'cursor-grab active:cursor-grabbing hover:bg-accent/50 border-border'}
        ${isDragging ? 'opacity-50' : ''}
        ${disabled ? 'pointer-events-none' : ''}
      `}
    >
      {!isAssigned && !disabled && <GripVertical className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
      <span className="line-clamp-2">{text}</span>
    </div>
  );
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

  const gaps = isArrayFormat ? (questions as any[]).length : (questions.gaps || Object.keys(correct).length);
  const assignedOptions = new Set(Object.values(answers));

  // Format B: per-gap multiple-choice (no drag and drop)
  if (perGapOptions) {
    return (
      <div className="space-y-4">
        <p className="text-sm font-medium text-foreground">
          {language === 'de'
            ? 'Wählen Sie für jede Lücke den passenden Satz aus.'
            : 'Choose the correct sentence for each gap.'}
        </p>
        <div className="space-y-4">
          {Array.from({ length: gaps }, (_, i) => String(i + 1)).map(gapNum => {
            const gapOpts = perGapOptions[gapNum] || [];
            const assigned = answers[gapNum];
            return (
              <div key={gapNum} className="space-y-2">
                <p className="text-xs font-bold text-foreground">[{gapNum}]</p>
                {gapOpts.map(opt => {
                  const isSelected = assigned === opt.id;
                  const optCorrect = checked && opt.id === correct[gapNum];
                  const optWrong = checked && isSelected && opt.id !== correct[gapNum];
                  return (
                    <Button
                      key={opt.id}
                      variant={isSelected ? 'default' : 'outline'}
                      className={`w-full justify-start text-left h-auto py-2 text-xs whitespace-normal ${
                        optCorrect ? 'border-primary bg-primary/10 text-primary' : ''
                      } ${optWrong ? 'border-destructive bg-destructive/10 text-destructive' : ''}`}
                      onClick={() => {
                        if (checked) return;
                        setAnswers({ ...answers, [gapNum]: isSelected ? '' : opt.id });
                      }}
                      disabled={checked}
                    >
                      <span className="line-clamp-3">{opt.text}</span>
                    </Button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Format A: shared pool — draggable options (gaps are in the text now)
  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-foreground">
        {language === 'de'
          ? 'Ziehen Sie die Sätze in die passenden Lücken im Text oben.'
          : 'Drag sentences into the correct gaps in the text above.'}
      </p>

      {checked && Object.entries(correct).some(([gap, val]) => answers[gap] !== val) && (
        <div className="rounded-lg bg-secondary p-3 space-y-1">
          <p className="text-xs font-medium text-foreground">{language === 'de' ? 'Richtige Zuordnung:' : 'Correct assignments:'}</p>
          {Object.entries(correct).map(([gap, optId]) => (
            <p key={gap} className="text-xs text-muted-foreground">
              {gap}. → {options.find(o => o.id === optId)?.text}
            </p>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          {language === 'de' ? 'Verfügbare Sätze:' : 'Available sentences:'}
        </p>
        {options.map(opt => (
          <DraggableOption
            key={opt.id}
            id={opt.id}
            text={opt.text}
            isAssigned={assignedOptions.has(opt.id)}
            disabled={checked}
          />
        ))}
      </div>
    </div>
  );
}
