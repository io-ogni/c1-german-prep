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

export function SelektivesVerstehenQuestions({ questions, answers, setAnswers, checked }: Props) {
  const { lang: language } = useTranslation();
  const items: any[] = Array.isArray(questions) ? questions : questions.questions || [];

  return (
    <div className="space-y-4">
      {items.map((q, i) => {
        const key = String(i);
        const userAnswer = answers[key];
        const questionText = language === 'de'
          ? (q.qüstion_de || q.question_de || q.text || '')
          : (q.qüstion_en || q.question_en || q.text || '');
        const options: string[] = q.options || [];
        const correct = q.correct;
        const isCorrect = checked && userAnswer === correct;
        const isWrong = checked && userAnswer && userAnswer !== correct;

        return (
          <div key={i} className={`p-3 rounded-lg border ${isCorrect ? 'border-primary bg-primary/5' : isWrong ? 'border-destructive bg-destructive/5' : 'border-border'}`}>
            <p className="text-sm text-foreground mb-2">
              <span className="font-bold mr-1">{i + 1}.</span>
              {questionText}
            </p>
            <RadioGroup
              value={userAnswer || ''}
              onValueChange={(val) => {
                if (!checked) setAnswers({ ...answers, [key]: val });
              }}
              className="space-y-1"
            >
              {options.map((opt, optIdx) => {
                const isThisCorrect = checked && opt === correct;
                return (
                  <div key={optIdx} className={`flex items-center gap-2 ${isThisCorrect ? 'text-primary font-medium' : ''}`}>
                    <RadioGroupItem value={opt} id={`sv-q${i}-opt${optIdx}`} disabled={checked} />
                    <Label htmlFor={`sv-q${i}-opt${optIdx}`} className="text-xs cursor-pointer">{opt}</Label>
                  </div>
                );
              })}
            </RadioGroup>
            {checked && (
              <div className="flex items-center gap-1 mt-1">
                {isCorrect ? <CheckCircle className="h-3.5 w-3.5 text-primary" /> : <XCircle className="h-3.5 w-3.5 text-destructive" />}
                {isWrong && <span className="text-xs text-muted-foreground">→ {correct}</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
