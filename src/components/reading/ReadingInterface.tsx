import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Timer } from '@/components/shared/Timer';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { ClickableText } from './ClickableText';
import { TextAudioPlayer } from '@/components/shared/TextAudioPlayer';
import { TextrekonstruktionQuestions } from './questions/TextrekonstruktionQuestions';
import { DetailverstehenQuestions } from './questions/DetailverstehenQuestions';
import { SelektivesVerstehenQuestions } from './questions/SelektivesVerstehenQuestions';
import { GeneralQuestions } from './questions/GeneralQuestions';
import { SelectionHint } from '@/components/shared/SelectionHint';
import { track } from '@/lib/posthog';

const readingAudio = import.meta.glob('/src/assets/audio/reading/*.mp3', { eager: true, import: 'default' }) as Record<string, string>;

function getReadingAudioUrl(sortOrder: number): string | undefined {
  const padded = String(sortOrder).padStart(2, '0');
  return readingAudio[`/src/assets/audio/reading/reading-${padded}.mp3`];
}

interface ReadingText {
  id: string;
  title_de: string;
  title_en: string;
  text_type: string;
  exam_format: string | null;
  word_count: number;
  text_content: string;
  questions: any;
  sort_order: number;
  word_annotations?: Record<string, { de: string; en: string }> | null;
}

interface Props {
  text: ReadingText;
  onBack: () => void;
}

export function ReadingInterface({ text, onBack }: Props) {
  const { t, lang: language } = useTranslation();
  const { profile } = useRequiredAuth();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [selfScore, setSelfScore] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const timerSecondsRef = useRef(0);

  const audioUrl = getReadingAudioUrl(text.sort_order);

  const isTextrekonstruktion = text.text_type === 'textrekonstruktion';
  const isArrayFormat = isTextrekonstruktion && Array.isArray(text.questions);

  // Build gap options and correct map for textrekonstruktion
  const { gapOptions, gapCorrect } = useMemo(() => {
    if (!isTextrekonstruktion) return { gapOptions: undefined, gapCorrect: undefined };

    const q = text.questions;
    let opts: Record<string, { id: string; text: string }[]> = {};
    let corr: Record<string, string> = {};

    if (isArrayFormat) {
      // Format B: per-gap options
      (q as any[]).forEach((item: any) => {
        const pos = String(item.position || item.id?.replace('gap', ''));
        opts[pos] = (item.options || []).map((opt: string) => ({
          id: `${pos}-${opt}`,
          text: opt,
        }));
        corr[pos] = `${pos}-${item.correct}`;
      });
    } else {
      // Format A: shared pool
      const options = q.options || [];
      opts['_shared'] = options;
      corr = q.correct || {};
    }

    return { gapOptions: opts, gapCorrect: corr };
  }, [text.questions, isTextrekonstruktion, isArrayFormat]);

  const handleGapSelect = useCallback((gapNum: string, optionId: string) => {
    if (checked) return;
    const newAnswers = { ...answers };
    // Remove this option from any other gap
    for (const [gap, val] of Object.entries(newAnswers)) {
      if (val === optionId) delete newAnswers[gap];
    }
    newAnswers[gapNum] = optionId;
    setAnswers(newAnswers);
  }, [answers, checked, setAnswers]);

  const handleGapClear = useCallback((gapNum: string) => {
    if (checked) return;
    const newAnswers = { ...answers };
    delete newAnswers[gapNum];
    setAnswers(newAnswers);
  }, [answers, checked, setAnswers]);

  const handleRetry = () => {
    setAnswers({});
    setChecked(false);
    setScore(null);
    setSelfScore(null);
  };

  const handleCheck = () => {
    const q = text.questions;
    let correct = 0;
    let total = 0;

    if (text.text_type === 'textrekonstruktion') {
      if (Array.isArray(q)) {
        // Format B: array of per-gap objects
        total = q.length;
        q.forEach((item: any) => {
          const pos = String(item.position || item.id?.replace('gap', ''));
          const expectedId = `${pos}-${item.correct}`;
          if (answers[pos] === expectedId) correct++;
        });
      } else {
        // Format A: { correct: {gap: optionId}, options: [...] }
        const correctMap = q.correct as Record<string, string>;
        total = Object.keys(correctMap).length;
        for (const [gap, answer] of Object.entries(correctMap)) {
          if (answers[gap] === answer) correct++;
        }
      }
    } else if (text.text_type === 'detailverstehen') {
      const items: any[] = Array.isArray(q) ? q : q.statements || q.questions || [];
      total = items.length;
      items.forEach((item: any, i: number) => {
        if (answers[String(i)] === item.correct) correct++;
      });
    } else if (text.text_type === 'selektives_verstehen') {
      const items: any[] = Array.isArray(q) ? q : q.questions || [];
      total = items.length;
      items.forEach((item: any, i: number) => {
        if (answers[String(i)] === item.correct) correct++;
      });
    } else {
      // general MC
      const items: any[] = Array.isArray(q) ? q : q.questions || [];
      total = items.length;
      items.forEach((item: any, i: number) => {
        if (answers[String(i)] === String(item.correct)) correct++;
      });
    }

    setScore({ correct, total });
    setChecked(true);
  };

  const handleSave = async () => {
    if (!profile || !score) return;
    setSaving(true);
    const percentage = Math.round((score.correct / score.total) * 100);

    // Fetch existing to preserve best score
    const { data: existing } = await supabase.from('reading_progress')
      .select('score')
      .eq('user_id', profile.user_id)
      .eq('reading_text_id', text.id)
      .maybeSingle();

    const { error } = await supabase
      .from('reading_progress')
      .upsert(
        {
          user_id: profile.user_id,
          reading_text_id: text.id,
          completed: true,
          score: Math.max(percentage, existing?.score ?? 0),
          self_score: selfScore,
          answers: answers,
          time_spent_seconds: timerSecondsRef.current,
        },
        { onConflict: 'user_id,reading_text_id' }
      );

    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      track('reading_completed', { score: percentage, text_type: text.text_type, time_spent: timerSecondsRef.current });
      toast.success(language === 'de' ? 'Fortschritt gespeichert!' : 'Progress saved!');
      onBack();
    }
  };

  const title = language === 'de' ? text.title_de : text.title_en;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-xl font-bold text-foreground">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="capitalize">{text.text_type.replace(/_/g, ' ')}</span> | ~{text.word_count} {t('reading_words')}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Timer />
        </div>
        <SelectionHint hintKey="reading" variant="reading" />
      </div>

      {/* Text content */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <TextAudioPlayer
              audioUrl={audioUrl}
              disabled={isTextrekonstruktion && !checked}
              disabledTooltip={language === 'de' ? 'Verfügbar nach dem Lösen' : 'Available after solving'}
            />
          </div>
          <ClickableText
            content={text.text_content}
            textId={text.id}
            textType={text.text_type}
            wordAnnotations={text.word_annotations ?? undefined}
            gapAnswers={isTextrekonstruktion ? answers : undefined}
            gapOptions={gapOptions}
            gapCorrect={gapCorrect}
            checked={checked}
            onGapSelect={handleGapSelect}
            onGapClear={handleGapClear}
          />
        </CardContent>
      </Card>

      {/* Questions */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {text.text_type === 'textrekonstruktion' && (
            <TextrekonstruktionQuestions
              questions={text.questions}
              answers={answers}
              setAnswers={setAnswers}
              checked={checked}
            />
          )}
          {text.text_type === 'detailverstehen' && (
            <DetailverstehenQuestions
              questions={text.questions}
              answers={answers}
              setAnswers={setAnswers}
              checked={checked}
            />
          )}
          {text.text_type === 'selektives_verstehen' && (
            <SelektivesVerstehenQuestions
              questions={text.questions}
              answers={answers}
              setAnswers={setAnswers}
              checked={checked}
            />
          )}
          {text.text_type === 'general' && (
            <GeneralQuestions
              questions={text.questions}
              answers={answers}
              setAnswers={setAnswers}
              checked={checked}
            />
          )}

          {/* Check / Results */}
          {!checked ? (
            <Button onClick={handleCheck} disabled={
              gapCorrect
                ? Object.keys(answers).length < Object.keys(gapCorrect).length
                : Object.keys(answers).length === 0
            }>
              {t('reading_check_answers')}
            </Button>
          ) : (
            <div className="space-y-4">
              {score && (
                <div className="rounded-lg bg-secondary p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {score.correct} / {score.total}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round((score.correct / score.total) * 100)}%
                  </p>
                </div>
              )}


              <div className="flex gap-2">
                {score && score.correct === score.total ? (
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? t('common_loading') : t('reading_save_progress')}
                  </Button>
                ) : (
                  <Button variant="outline" onClick={handleRetry}>
                    {language === 'de' ? 'Nochmal versuchen' : 'Try again'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
