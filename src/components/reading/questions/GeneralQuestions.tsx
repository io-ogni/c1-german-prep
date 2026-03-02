import { useTranslation } from '@/i18n/useTranslation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  questions: any;
  answers: Record<string, string>;
  setAnswers: (a: Record<string, string>) => void;
  checked: boolean;
}

export function GeneralQuestions({ questions, answers, setAnswers, checked }: Props) {
  const { lang: language } = useTranslation();
  const items: { text: string; options: string[]; correct: number }[] = Array.isArray(questions) ? questions : questions.questions || [];

  return (
    <div className="space-y-4">
      {items.map((q, i) => {
        const key = String(i);
        const userAnswer = answers[key];
        const correctAnswer = String(q.correct);
        const isCorrect = checked && userAnswer === correctAnswer;
        const isWrong = checked && userAnswer && userAnswer !== correctAnswer;

        return (
          <div key={i} className={`p-3 rounded-lg border ${isCorrect ? 'border-primary bg-primary/5' : isWrong ? 'border-destructive bg-destructive/5' : 'border-border'}`}>
            <p className="text-sm text-foreground mb-2">
              <span className="font-bold mr-1">{i + 1}.</span>
              {q.text}
            </p>
            <RadioGroup
              value={userAnswer || ''}
              onValueChange={(val) => {
                if (!checked) setAnswers({ ...answers, [key]: val });
              }}
              className="space-y-1"
            >
              {q.options.map((opt, optIdx) => {
                const optVal = String(optIdx);
                const isThisCorrect = checked && optVal === correctAnswer;
                return (
                  <div key={optIdx} className={`flex items-center gap-2 ${isThisCorrect ? 'text-primary font-medium' : ''}`}>
                    <RadioGroupItem value={optVal} id={`q${i}-opt${optIdx}`} disabled={checked} />
                    <Label htmlFor={`q${i}-opt${optIdx}`} className="text-xs cursor-pointer">{opt}</Label>
                  </div>
                );
              })}
            </RadioGroup>
            {checked && (
              <div className="flex items-center gap-1 mt-1">
                {isCorrect ? <CheckCircle className="h-3.5 w-3.5 text-primary" /> : <XCircle className="h-3.5 w-3.5 text-destructive" />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
