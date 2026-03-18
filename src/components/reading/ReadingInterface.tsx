import { useState, useRef, useCallback, useMemo } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { Timer } from '@/components/shared/Timer';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { ClickableText } from './ClickableText';
import { TextrekonstruktionQuestions } from './questions/TextrekonstruktionQuestions';
import { DetailverstehenQuestions } from './questions/DetailverstehenQuestions';
import { SelektivesVerstehenQuestions } from './questions/SelektivesVerstehenQuestions';
import { GeneralQuestions } from './questions/GeneralQuestions';

interface ReadingText {
  id: string;
  title_de: string;
  title_en: string;
  text_type: string;
  exam_format: string | null;
  word_count: number;
  text_content: string;
  questions: any;
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

    const { error } = await supabase
      .from('reading_progress')
      .upsert(
        {
          user_id: profile.user_id,
          reading_text_id: text.id,
          completed: true,
          score: percentage,
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
      toast.success(language === 'de' ? 'Fortschritt gespeichert!' : 'Progress saved!');
      onBack();
    }
  };

  const title = language === 'de' ? text.title_de : text.title_en;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            {title}
            {text.exam_format === 'telc' && <TelcBadge />}
          </h1>
          <p className="text-sm text-muted-foreground">
            {text.text_type.replace(/_/g, ' ')} | ~{text.word_count} {t('reading_words')}
          </p>
        </div>
        <Timer className="shrink-0" />
      </div>

      {/* Text content */}
      <Card>
        <CardContent className="p-6">
          <ClickableText
            content={text.text_content}
            textId={text.id}
            textType={text.text_type}
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
            <Button onClick={handleCheck} disabled={Object.keys(answers).length === 0}>
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

              {/* Self-assessment */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{t('reading_self_assessment')}</p>
                <div className="flex items-end gap-1.5">
                  {[1, 2, 3, 4, 5].map(n => {
                    const labels: Record<number, { de: string; en: string }> = {
                      1: { de: 'Kaum', en: 'Barely' },
                      2: { de: 'Wenig', en: 'Little' },
                      3: { de: 'Okay', en: 'Okay' },
                      4: { de: 'Gut', en: 'Well' },
                      5: { de: 'Super', en: 'Great' },
                    };
                    return (
                      <button
                        key={n}
                        onClick={() => setSelfScore(n)}
                        className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs transition-colors border ${
                          selfScore === n
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="text-base">{['😟', '😕', '😐', '🙂', '🤩'][n - 1]}</span>
                        <span className="font-medium">{labels[n]?.[language] ?? n}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleRetry}>
                  {language === 'de' ? 'Nochmal versuchen' : 'Try again'}
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? t('common_loading') : t('reading_save_progress')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
