import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n/useTranslation';
import { CheckCircle, XCircle, GripVertical } from 'lucide-react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';

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
      <span className="font-bold shrink-0">[{id}]</span>
      <span className="line-clamp-2">{text}</span>
    </div>
  );
}

function DroppableGap({
  gapNum,
  assignedText,
  assignedId,
  isCorrect,
  isWrong,
  isOver,
  checked,
  onRemove,
}: {
  gapNum: string;
  assignedText: string | null;
  assignedId: string | null;
  isCorrect: boolean;
  isWrong: boolean;
  isOver: boolean;
  checked: boolean;
  onRemove: () => void;
}) {
  const { lang: language } = useTranslation();
  const { setNodeRef, isOver: droppableIsOver } = useDroppable({ id: `gap-${gapNum}` });
  const active = isOver || droppableIsOver;

  return (
    <div
      ref={setNodeRef}
      className={`flex items-start gap-2 p-2.5 rounded-md border-2 border-dashed min-h-[44px] transition-colors
        ${active ? 'border-primary bg-primary/10' : 'border-border'}
        ${assignedText ? 'border-solid' : ''}
        ${isCorrect ? 'border-primary bg-primary/10 border-solid' : ''}
        ${isWrong ? 'border-destructive bg-destructive/10 border-solid' : ''}
      `}
      onClick={() => {
        if (!checked && assignedText) onRemove();
      }}
    >
      <span className="font-mono text-xs font-bold text-muted-foreground mt-0.5 shrink-0 w-5">{gapNum}.</span>
      <span className="text-sm text-foreground flex-1">
        {assignedText ? (
          <span className="flex items-center gap-1">
            <span className="font-bold text-xs text-muted-foreground">[{assignedId}]</span>
            {assignedText}
            {!checked && (
              <button className="ml-auto text-muted-foreground hover:text-destructive text-xs shrink-0">✕</button>
            )}
          </span>
        ) : (
          <span className="text-muted-foreground italic text-xs">
            {language === 'de' ? 'Satz hierher ziehen' : 'Drag sentence here'}
          </span>
        )}
      </span>
      {isCorrect && <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />}
      {isWrong && <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />}
    </div>
  );
}

export function TextrekonstruktionQuestions({ questions, answers, setAnswers, checked }: Props) {
  const { lang: language } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    if (checked) return;
    const { active, over } = event;
    if (!over) return;

    const optionId = String(active.id);
    const overId = String(over.id);

    if (overId.startsWith('gap-')) {
      const gapNum = overId.replace('gap-', '');
      // Remove this option from any other gap first
      const newAnswers = { ...answers };
      for (const [gap, val] of Object.entries(newAnswers)) {
        if (val === optionId) delete newAnswers[gap];
      }
      newAnswers[gapNum] = optionId;
      setAnswers(newAnswers);
    }
  };

  const handleRemoveFromGap = (gapNum: string) => {
    if (checked) return;
    const newAnswers = { ...answers };
    delete newAnswers[gapNum];
    setAnswers(newAnswers);
  };

  const activeOption = activeId ? options.find(o => o.id === activeId) : null;

  // Format B: per-gap multiple-choice (no drag and drop needed)
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

  // Format A: shared pool — drag and drop
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        <p className="text-sm font-medium text-foreground">
          {language === 'de'
            ? 'Ziehen Sie die Sätze in die passenden Lücken im Text.'
            : 'Drag sentences into the correct gaps in the text.'}
        </p>

        <div className="space-y-2">
          {Array.from({ length: gaps }, (_, i) => String(i + 1)).map(gapNum => {
            const assigned = answers[gapNum];
            const assignedOpt = assigned ? options.find(o => o.id === assigned) : null;
            const isCorrect = checked && assigned === correct[gapNum];
            const isWrong = checked && !!assigned && assigned !== correct[gapNum];

            return (
              <DroppableGap
                key={gapNum}
                gapNum={gapNum}
                assignedText={assignedOpt?.text ?? null}
                assignedId={assignedOpt?.id ?? null}
                isCorrect={isCorrect}
                isWrong={isWrong}
                isOver={false}
                checked={checked}
                onRemove={() => handleRemoveFromGap(gapNum)}
              />
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

      <DragOverlay>
        {activeOption ? (
          <div className="flex items-center gap-2 rounded-md border border-primary bg-background px-3 py-2 text-xs shadow-lg max-w-md">
            <GripVertical className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="font-bold shrink-0">[{activeOption.id}]</span>
            <span className="line-clamp-2">{activeOption.text}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
