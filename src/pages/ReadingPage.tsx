import { useState, useEffect, useCallback } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { Timer } from '@/components/shared/Timer';
import { toast } from 'sonner';
import { ArrowLeft, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { ReadingInterface } from '@/components/reading/ReadingInterface';

// Types
interface ReadingText {
  id: string;
  title_de: string;
  title_en: string;
  text_type: string;
  exam_format: string | null;
  level: string;
  word_count: number;
  estimated_minutes: number;
  text_content: string;
  questions: any;
  sort_order: number;
}

interface ReadingProgress {
  reading_text_id: string;
  completed: boolean;
  score: number | null;
}

const TYPE_ORDER = ['textrekonstruktion', 'selektives_verstehen', 'detailverstehen', 'general'];

const TYPE_LABELS: Record<string, { de: string; en: string }> = {
  textrekonstruktion: { de: 'Textrekonstruktion', en: 'Text Reconstruction' },
  selektives_verstehen: { de: 'Selektives Verstehen', en: 'Selective Reading' },
  detailverstehen: { de: 'Detailverstehen', en: 'Detailed Reading' },
  general: { de: 'Allgemeines C1-Lesen', en: 'General C1 Reading' },
};

export default function ReadingPage() {
  const { t, lang: language } = useTranslation();
  const { profile } = useRequiredAuth();
  const [texts, setTexts] = useState<ReadingText[]>([]);
  const [progress, setProgress] = useState<ReadingProgress[]>([]);
  const [selectedText, setSelectedText] = useState<ReadingText | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!profile) return;
    const [textsRes, progressRes] = await Promise.all([
      supabase.from('reading_texts').select('*').order('sort_order'),
      supabase.from('reading_progress').select('reading_text_id, completed, score').eq('user_id', profile.user_id),
    ]);
    if (textsRes.data) setTexts(textsRes.data);
    if (progressRes.data) setProgress(progressRes.data);
    setLoading(false);
  }, [profile]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const getProgress = (textId: string) => progress.find(p => p.reading_text_id === textId);

  const grouped = TYPE_ORDER.map(type => ({
    type,
    label: TYPE_LABELS[type]?.[language] || type,
    isTelc: type !== 'general',
    texts: texts.filter(t => t.text_type === type),
  })).filter(g => g.texts.length > 0);

  if (selectedText) {
    return (
      <ReadingInterface
        text={selectedText}
        onBack={() => { setSelectedText(null); fetchData(); }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          {language === 'de' ? 'Leseverstehen' : 'Reading Comprehension'}
        </h1>
      </div>

      {loading ? (
        <div className="text-muted-foreground">{t('common_loading')}</div>
      ) : texts.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-muted-foreground">
          {language === 'de' ? 'Keine Lesetexte verfügbar.' : 'No reading texts available.'}
        </CardContent></Card>
      ) : (
        grouped.map(group => (
          <section key={group.type} className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              {group.label}
              {group.isTelc && <TelcBadge />}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.texts.map(text => {
                const prog = getProgress(text.id);
                return (
                  <Card
                    key={text.id}
                    className="cursor-pointer transition-colors hover:bg-accent/50"
                    onClick={() => { setSelectedText(text); window.scrollTo(0, 0); }}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-foreground text-sm">
                          {language === 'de' ? text.title_de : text.title_en}
                        </h3>
                        {text.exam_format === 'telc' && <TelcBadge className="shrink-0" />}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{text.word_count} {t('reading_words')}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          ~{text.estimated_minutes} {t('reading_minutes')}
                        </span>
                      </div>
                      <div className="text-xs">
                        {prog?.completed ? (
                          <span className="flex items-center gap-1 text-primary">
                            <CheckCircle className="h-3.5 w-3.5" />
                            {t('reading_completed')} {prog.score != null && `(${prog.score}%)`}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">{t('writing_not_started')}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
