import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NAV_CONTAINER, TAB_TRIGGER_BLUE } from '@/components/shared/navStyles';
import { ScrollNav } from '@/components/shared/ScrollNav';
import { BookOpen, CheckCircle, Clock, Puzzle, ScanSearch, FileSearch } from 'lucide-react';
import { ReadingInterface } from '@/components/reading/ReadingInterface';

const topicImages = import.meta.glob('/src/assets/reading-topics/*.png', { eager: true, import: 'default' }) as Record<string, string>;

// Map image IDs to title keywords for matching DB texts to images
const IMAGE_TITLE_MAP: Record<number, string> = {
  1: 'Digitalisierung im Gesundheitswesen',
  2: 'Nachhaltiger Konsum im Alltag',
  3: 'Die Zukunft der Arbeit',
  4: 'Städte der Zukunft',
  5: 'Digitalisierung in der Bildung',
  6: 'Vier-Tage-Woche',
  7: 'Bedingungsloses Grundeinkommen',
  8: 'individuelles Handeln das Klima',
  9: 'Fake News — Gefahr',
  10: 'Massentourismus',
  11: 'Gendern',
  12: 'Karrieretipps',
  13: 'Studieren im Ausland',
  14: 'Wohnkonzepte',
  15: 'Weiterbildung — Welcher Weg',
  16: 'Homeoffice oder Büro',
  17: 'Frauen in Führungspositionen',
  18: 'Mobilität der Zukunft',
  19: 'Studiengebühren',
  20: 'Künstliche Intelligenz in der Wissenschaft',
  21: 'Schlaf',
  22: 'Gehirn Sprachen',
  23: 'Ernährungsmythen',
  24: 'Ehrenamt in Deutschland',
  25: 'Fachkräftemangel',
  26: 'Globalisierung',
  27: 'Demografischer Wandel',
  28: 'Einfluss sozialer Medien',
  29: 'Lebenslanges Lernen',
  30: 'Datenschutz im digitalen',
  31: 'Landflucht',
  32: 'Ehrenamt 2.0',
  33: 'Künstliche Intelligenz kreativ',
  34: 'Einsamkeitsepidemie',
  35: 'Gentrifizierung',
  36: 'Fake News erkennen',
  37: 'Minimalismus',
  38: 'Bildungssystem',
  39: 'Integration durch Sprache',
  40: 'Psychische Gesundheit',
};

function getTopicImage(titleDe: string): string | undefined {
  for (const [id, keyword] of Object.entries(IMAGE_TITLE_MAP)) {
    if (titleDe.includes(keyword)) {
      return topicImages[`/src/assets/reading-topics/topic-${id}.png`];
    }
  }
  return undefined;
}

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

const TYPE_ICONS: Record<string, typeof BookOpen> = {
  textrekonstruktion: Puzzle,
  selektives_verstehen: ScanSearch,
  detailverstehen: FileSearch,
  general: BookOpen,
};

const TYPE_LABELS: Record<string, { de: string; en: string }> = {
  textrekonstruktion: { de: 'Textrekonstruktion', en: 'Text Reconstruction' },
  selektives_verstehen: { de: 'Selektives Verstehen', en: 'Selective Reading' },
  detailverstehen: { de: 'Detailverstehen', en: 'Detailed Reading' },
  general: { de: 'Allgemein', en: 'General' },
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

  const availableTypes = TYPE_ORDER.filter(type => texts.some(t => t.text_type === type));
  const [searchParams, setSearchParams] = useSearchParams();
  const readingTab = searchParams.get('tab') || availableTypes[0] || 'textrekonstruktion';
  const setReadingTab = (v: string) => setSearchParams({ tab: v }, { replace: true });

  if (selectedText) {
    return (
      <ReadingInterface
        text={selectedText}
        onBack={() => { setSelectedText(null); fetchData(); }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          {language === 'de' ? 'Leseverstehen' : 'Reading Comprehension'}
          <TelcBadge className="ml-1" />
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Texte, die länger sind als deine Attention Span. Let's go.
        </p>
      </div>

      {loading ? (
        <div className="text-muted-foreground">{t('common_loading')}</div>
      ) : texts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-8 text-center text-muted-foreground">
          {language === 'de' ? 'Keine Lesetexte verfügbar.' : 'No reading texts available.'}
        </div>
      ) : (
        <Tabs value={readingTab} onValueChange={setReadingTab}>
          <ScrollNav>
            <TabsList className={`${NAV_CONTAINER} h-auto gap-1`}>
              {availableTypes.map(type => {
                const Icon = TYPE_ICONS[type];
                return (
                  <TabsTrigger
                    key={type}
                    value={type}
                    className={`${TAB_TRIGGER_BLUE} gap-1.5`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {TYPE_LABELS[type]?.[language] || type}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </ScrollNav>

          {availableTypes.map(type => (
            <TabsContent key={type} value={type} className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {texts.filter(t => t.text_type === type).map(text => {
                  const prog = getProgress(text.id);
                  const image = getTopicImage(text.title_de);
                  return (
                    <div
                      key={text.id}
                      className="cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md"
                      onClick={() => { setSelectedText(text); window.scrollTo(0, 0); }}
                    >
                      {image ? (
                        <div className="mb-3 overflow-hidden rounded-lg bg-muted/30">
                          <img
                            src={image}
                            alt={language === 'de' ? text.title_de : text.title_en}
                            className="w-full h-28 object-cover rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="mb-3 h-28 rounded-lg bg-muted/30 flex items-center justify-center">
                          <span className="text-2xl">📖</span>
                        </div>
                      )}

                      <p className="font-semibold text-sm text-foreground leading-snug">
                        {language === 'de' ? text.title_de : text.title_en}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                        <span>{text.word_count} {t('reading_words')}</span>
                        <span className="flex items-center gap-0.5">
                          <Clock className="h-3 w-3" />
                          ~{text.estimated_minutes} {t('reading_minutes')}
                        </span>
                      </div>
                      <div className="mt-1.5 text-xs">
                        {prog?.completed ? (
                          <span className="inline-flex items-center gap-1 font-medium text-primary bg-primary/10 rounded px-1.5 py-0.5">
                            <CheckCircle className="h-3 w-3" />
                            {t('reading_completed')} {prog.score != null && `(${prog.score}%)`}
                          </span>
                        ) : (
                          <span className="font-medium text-muted-foreground bg-muted/50 rounded px-1.5 py-0.5">
                            {t('writing_not_started')}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
