import { useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, ChevronDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  content: any;
  solution: Record<string, string>;
  instructions: string;
  explanation?: string;
  title: string;
  onBack: () => void;
  onSaveProgress: (score: number, total: number) => void;
}

export function ListeningDetailverstehen({ content, solution, instructions, explanation, title, onBack, onSaveProgress }: Props) {
  const { t } = useTranslation();
  const questions: any[] = content.questions ?? [];
  const total = questions.length;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const currentQ = questions[currentIdx];
  const isLast = currentIdx === total - 1;

  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.number]: optionId }));
  };

  const handleNext = () => {
    if (isLast) {
      setShowResults(true);
      const score = questions.filter(q => answers[q.number] === solution[String(q.number)]).length;
      onSaveProgress(score, total);
    } else {
      setCurrentIdx(i => i + 1);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
    setShowTranscript(false);
  };

  if (showResults) {
    const score = questions.filter(q => answers[q.number] === solution[String(q.number)]).length;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('listening_back')}
          </Button>
          <TelcBadge />
        </div>

        <Card className="bg-secondary/50">
          <CardContent className="py-4 text-center space-y-2">
            <p className="text-lg font-bold text-foreground">
              {t('listening_score')}: {score} / {total} ({Math.round((score / total) * 100)}%)
            </p>
            <ProgressBar value={(score / total) * 100} />
          </CardContent>
        </Card>

        <div className="space-y-3">
          {questions.map(q => {
            const userAnswer = answers[q.number];
            const correctAnswer = solution[String(q.number)];
            const isCorrect = userAnswer === correctAnswer;

            return (
              <Card key={q.number} className={cn(isCorrect ? 'border-primary/20' : 'border-destructive/20')}>
                <CardContent className="py-3 space-y-1">
                  <div className="flex items-center gap-2">
                    {isCorrect ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-destructive" />}
                    <span className="text-sm font-medium text-foreground">{t('listening_question')} {q.number}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{q.stem}</p>
                  {!isCorrect && (
                    <div className="text-xs space-y-0.5 pl-6">
                      <p className="text-destructive">
                        {t('listening_your_answer')}: {userAnswer}) {q.options.find((o: any) => o.id === userAnswer)?.text}
                      </p>
                      <p className="text-primary">
                        {t('listening_correct_answer')}: {correctAnswer}) {q.options.find((o: any) => o.id === correctAnswer)?.text}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {explanation && (
          <Card className="bg-muted/50">
            <CardContent className="py-3">
              <p className="text-xs text-muted-foreground">{explanation}</p>
            </CardContent>
          </Card>
        )}

        {content.transcript && (
          <Collapsible open={showTranscript} onOpenChange={setShowTranscript}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <ChevronDown className={cn('h-4 w-4 transition-transform', showTranscript && 'rotate-180')} />
                {showTranscript ? t('listening_hide_transcript') : t('listening_show_transcript')}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="mt-2">
                <CardContent className="py-3">
                  <p className="text-xs text-muted-foreground whitespace-pre-line">{content.transcript}</p>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleRetry}>{t('listening_try_again')}</Button>
          <Button onClick={onBack}>{t('listening_back')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('listening_back')}
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground tabular-nums">{currentIdx + 1} / {total}</span>
          <TelcBadge />
        </div>
      </div>

      <ProgressBar value={((currentIdx + 1) / total) * 100} showLabel={false} />

      <div>
        <h2 className="text-lg font-semibold text-foreground">{t('listening_detailverstehen')}</h2>
        <p className="text-xs text-muted-foreground">{instructions}</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            {t('listening_question')} {currentQ.number}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-foreground">{currentQ.stem}</p>
          <div className="space-y-2 pt-2">
            {currentQ.options.map((opt: any) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={cn(
                  'w-full text-left rounded-md border px-3 py-2.5 text-sm transition-colors',
                  answers[currentQ.number] === opt.id
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:bg-accent/50'
                )}
              >
                <span className="font-medium">{opt.id})</span> {opt.text}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={!answers[currentQ.number]}>
          {isLast ? t('listening_check_answers') : t('exercise_next')}
        </Button>
      </div>
    </div>
  );
}
