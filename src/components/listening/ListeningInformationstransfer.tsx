import { useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { ProgressBar } from '@/components/shared/ProgressBar';

import { ArrowLeft, ChevronDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ListeningAudioPlayer } from './ListeningAudioPlayer';

interface Props {
  content: any;
  solution: Record<string, string>;
  instructions: string;
  explanation?: string;
  title: string;
  onBack: () => void;
  onSaveProgress: (score: number, total: number) => void;
}

function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/[.,;:!?]+$/, '').replace(/\s+/g, ' ');
}

function checkAnswer(userInput: string, correctAnswer: string): boolean {
  const u = normalize(userInput);
  const c = normalize(correctAnswer);
  if (!u) return false;
  if (u === c) return true;
  // Check if all key words from the solution are in the user input
  const correctWords = c.split(' ').filter(w => w.length > 2);
  const userWords = u.split(' ');
  if (correctWords.length > 0 && correctWords.every(w => userWords.some(uw => uw.includes(w)))) return true;
  // Lenient numeric check
  const cDigits = c.replace(/\D/g, '');
  const uDigits = u.replace(/\D/g, '');
  if (cDigits && cDigits === uDigits && cDigits.length >= 2) return true;
  return false;
}

export function ListeningInformationstransfer({ content, solution, instructions, explanation, title, onBack, onSaveProgress }: Props) {
  const { t } = useTranslation();
  const noteForm: any[] = content.note_form ?? [];
  const total = noteForm.length;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  

  const handleChange = (num: number, value: string) => {
    setAnswers(prev => ({ ...prev, [num]: value }));
  };

  const anyFilled = Object.values(answers).some(v => v.trim());

  const handleCheck = () => {
    const r: Record<number, boolean> = {};
    let score = 0;
    noteForm.forEach(item => {
      const correct = checkAnswer(answers[item.number] ?? '', solution[String(item.number)] ?? '');
      r[item.number] = correct;
      if (correct) score++;
    });
    setResults(r);
    setChecked(true);
    onSaveProgress(score, total);
  };

  const handleRetry = () => {
    setAnswers({});
    setChecked(false);
    setResults({});
    
  };

  const score = checked ? Object.values(results).filter(Boolean).length : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('listening_back')}
        </Button>
        <TelcBadge />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground">{t('listening_informationstransfer')}</h2>
        <p className="text-xs text-muted-foreground">{content.topic_title ?? title}</p>
      </div>

      <ListeningAudioPlayer audioFile={content.audio_file} />

      <p className="text-sm text-muted-foreground">{instructions}</p>

      {checked && (
        <Card className="bg-secondary/50">
          <CardContent className="py-3 text-center space-y-2">
            <p className="text-lg font-bold text-foreground">
              {t('listening_score')}: {score} / {total} ({Math.round((score / total) * 100)}%)
            </p>
            <ProgressBar value={(score / total) * 100} />
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {noteForm.map(item => {
          const isCorrect = checked && results[item.number];
          const isWrong = checked && !results[item.number];

          return (
            <div
              key={item.number}
              className={cn(
                'rounded-md border p-3',
                checked && isCorrect && 'border-primary/30 bg-primary/5',
                checked && isWrong && 'border-destructive/30 bg-destructive/5'
              )}
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-foreground shrink-0 min-w-[1.5rem] text-right">{item.number}.</span>
                <div className="flex-1">
                  <span className="text-foreground">{item.sentence_before} </span>
                  <Input
                    value={answers[item.number] ?? ''}
                    onChange={(e) => handleChange(item.number, e.target.value)}
                    disabled={checked}
                    className={cn(
                      'inline-block w-48 h-7 text-sm mx-1',
                      checked && isCorrect && 'border-primary text-primary',
                      checked && isWrong && 'border-destructive text-destructive'
                    )}
                    placeholder="..."
                  />
                  <span className="text-foreground"> {item.sentence_after}</span>
                  {checked && isCorrect && <Check className="inline h-4 w-4 text-primary ml-1" />}
                  {checked && isWrong && (
                    <span className="block text-xs mt-1">
                      <X className="inline h-3 w-3 text-destructive mr-1" />
                      <span className="text-destructive">{t('listening_correct_answer')}: </span>
                      <span className="text-foreground font-medium">{solution[String(item.number)]}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {checked && explanation && (
        <Card className="bg-muted/50">
          <CardContent className="py-3">
            <p className="text-xs text-muted-foreground">{explanation}</p>
          </CardContent>
        </Card>
      )}

      {checked && content.transcript && (
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
        {!checked ? (
          <Button onClick={handleCheck} disabled={!anyFilled}>
            {t('listening_check_answers')}
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={handleRetry}>{t('listening_try_again')}</Button>
            <Button onClick={onBack}>{t('listening_back')}</Button>
          </>
        )}
      </div>
    </div>
  );
}
