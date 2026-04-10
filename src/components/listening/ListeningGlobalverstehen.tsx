import { useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { ArrowLeft, Check, X } from 'lucide-react';
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

export function ListeningGlobalverstehen({ content, solution, instructions, explanation, title, onBack, onSaveProgress }: Props) {
  const { t } = useTranslation();
  const speakers: any[] = content.speakers ?? [];
  const statements: any[] = content.statements ?? [];
  const total = speakers.length;

  const [selections, setSelections] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  

  const usedStatements = new Set(Object.values(selections));

  const handleSelect = (speakerId: number, statementId: string) => {
    setSelections(prev => ({ ...prev, [speakerId]: statementId }));
  };

  const allSelected = speakers.every(s => selections[s.id]);

  const handleCheck = () => {
    setChecked(true);
    const score = speakers.filter(s => selections[s.id] === solution[String(s.id)]).length;
    onSaveProgress(score, total);
  };

  const handleRetry = () => {
    setSelections({});
    setChecked(false);
    
  };

  const score = checked ? speakers.filter(s => selections[s.id] === solution[String(s.id)]).length : 0;

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
        <h2 className="text-lg font-semibold text-foreground">{t('listening_globalverstehen')}</h2>
        <p className="text-xs text-muted-foreground">{content.topic_title}</p>
      </div>

      <ListeningAudioPlayer audioFile={content.audio_file} />

      <p className="text-sm text-muted-foreground">{instructions}</p>

      {checked && (
        <Card className="bg-secondary/50">
          <CardContent className="py-3 text-center">
            <p className="font-semibold text-foreground">
              {t('listening_score')}: {score} / {total} {t('listening_correct')} ({Math.round((score / total) * 100)}%)
            </p>
          </CardContent>
        </Card>
      )}

      {/* Speaker rows */}
      <div className="space-y-2">
        {speakers.map(speaker => {
          const isCorrect = checked && selections[speaker.id] === solution[String(speaker.id)];
          const isWrong = checked && selections[speaker.id] !== solution[String(speaker.id)];

          return (
            <div
              key={speaker.id}
              className={cn(
                'flex items-center gap-3 rounded-md border p-3 bg-white dark:bg-card',
                checked && isCorrect && 'border-primary/30 !bg-primary/5',
                checked && isWrong && 'border-destructive/30 !bg-destructive/5'
              )}
            >
              <span className="text-sm font-medium text-foreground w-24 shrink-0">
                {t('listening_speaker')} {speaker.id}
              </span>
              <div className="flex-1 min-w-0">
                <Select
                  value={selections[speaker.id] ?? ''}
                  onValueChange={(v) => handleSelect(speaker.id, v)}
                  disabled={checked}
                >
                  <SelectTrigger className="w-full overflow-hidden [&>span]:truncate [&>span]:block [&>span]:max-w-[calc(100%-1.5rem)]">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className="max-w-[calc(100vw-2rem)] bg-gray-100 dark:bg-gray-800">
                    {statements.map(st => {
                      const isUsed = usedStatements.has(st.id) && selections[speaker.id] !== st.id;
                      return (
                        <SelectItem key={st.id} value={st.id} disabled={isUsed} className="whitespace-normal bg-white dark:bg-card rounded-md mb-0.5">
                          <span className="line-clamp-3">{st.id}) {st.text}</span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              {checked && isCorrect && <Check className="h-5 w-5 text-primary shrink-0" />}
              {checked && isWrong && (
                <div className="flex items-center gap-1 shrink-0">
                  <X className="h-5 w-5 text-destructive" />
                  <span className="text-xs text-muted-foreground">→ {solution[String(speaker.id)]}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Statements reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t('listening_statement')}n</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {statements.map(st => (
            <p key={st.id} className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">{st.id})</span> {st.text}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Explanation */}
      {checked && explanation && (
        <Card className="bg-muted/50">
          <CardContent className="py-3">
            <p className="text-xs text-muted-foreground">{explanation}</p>
          </CardContent>
        </Card>
      )}


      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        {!checked ? (
          <Button onClick={handleCheck} disabled={!allSelected}>
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
