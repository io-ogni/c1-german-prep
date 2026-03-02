import { useTranslation } from '@/i18n/useTranslation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  questions: any;
  answers: Record<string, string>;
  setAnswers: (a: Record<string, string>) => void;
  checked: boolean;
}

export function SelektivesVerstehenQuestions({ questions, answers, setAnswers, checked }: Props) {
  const { lang: language } = useTranslation();
  const items: { text: string; correct: string }[] = Array.isArray(questions) ? questions : questions.questions || [];
  const sections = ['a', 'b', 'c', 'd', 'e'];

  return (
    <div className="space-y-3">
      {items.map((q, i) => {
        const key = String(i);
        const userAnswer = answers[key];
        const isCorrect = checked && userAnswer === q.correct;
        const isWrong = checked && userAnswer && userAnswer !== q.correct;

        return (
          <div key={i} className={`p-3 rounded-lg border ${isCorrect ? 'border-primary bg-primary/5' : isWrong ? 'border-destructive bg-destructive/5' : 'border-border'}`}>
            <p className="text-sm text-foreground mb-2">
              <span className="font-bold mr-1">{i + 1}.</span>
              {q.text}
            </p>
            <div className="flex items-center gap-2">
              <Select
                value={userAnswer || ''}
                onValueChange={(val) => {
                  if (!checked) setAnswers({ ...answers, [key]: val });
                }}
                disabled={checked}
              >
                <SelectTrigger className="w-24 h-8 text-xs">
                  <SelectValue placeholder={language === 'de' ? 'Abschnitt' : 'Section'} />
                </SelectTrigger>
                <SelectContent>
                  {sections.map(s => (
                    <SelectItem key={s} value={s}>{s.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {checked && (
                <span className="flex items-center gap-1">
                  {isCorrect ? <CheckCircle className="h-3.5 w-3.5 text-primary" /> : <XCircle className="h-3.5 w-3.5 text-destructive" />}
                  {isWrong && <span className="text-xs text-muted-foreground">→ {q.correct.toUpperCase()}</span>}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
