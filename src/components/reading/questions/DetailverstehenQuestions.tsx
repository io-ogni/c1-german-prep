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

export function DetailverstehenQuestions({ questions, answers, setAnswers, checked }: Props) {
  const { t } = useTranslation();
  const statements: { text: string; correct: string }[] = questions.statements || questions || [];

  return (
    <div className="space-y-4">
      {statements.map((stmt, i) => {
        const key = String(i);
        const userAnswer = answers[key];
        const isCorrect = checked && userAnswer === stmt.correct;
        const isWrong = checked && userAnswer && userAnswer !== stmt.correct;

        return (
          <div key={i} className={`p-3 rounded-lg border ${isCorrect ? 'border-primary bg-primary/5' : isWrong ? 'border-destructive bg-destructive/5' : 'border-border'}`}>
            <p className="text-sm text-foreground mb-2">
              <span className="font-bold mr-1">{i + 1}.</span>
              {stmt.text}
            </p>
            <RadioGroup
              value={userAnswer || ''}
              onValueChange={(val) => {
                if (!checked) setAnswers({ ...answers, [key]: val });
              }}
              className="flex gap-4"
            >
              {['R', 'F', 'N'].map(val => (
                <div key={val} className="flex items-center gap-1.5">
                  <RadioGroupItem value={val} id={`${i}-${val}`} disabled={checked} />
                  <Label htmlFor={`${i}-${val}`} className="text-xs cursor-pointer">
                    {val === 'R' ? t('reading_richtig') : val === 'F' ? t('reading_falsch') : t('reading_nicht_im_text')}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {checked && (
              <div className="flex items-center gap-1 mt-1">
                {isCorrect ? <CheckCircle className="h-3.5 w-3.5 text-primary" /> : <XCircle className="h-3.5 w-3.5 text-destructive" />}
                {isWrong && <span className="text-xs text-muted-foreground">→ {stmt.correct === 'R' ? t('reading_richtig') : stmt.correct === 'F' ? t('reading_falsch') : t('reading_nicht_im_text')}</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
