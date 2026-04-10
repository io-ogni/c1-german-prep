import { useEffect, useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, PenLine, BookOpenCheck, Headphones, Languages, Flame, Monitor } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Skeleton } from '@/components/ui/skeleton';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { VerbFlashcard } from '@/components/shared/VerbFlashcard';
import type { Tables } from '@/integrations/supabase/types';

interface AreaProgress {
  completed: number;
  total: number;
}

interface HomeData {
  vocabulary: AreaProgress;
  grammar: AreaProgress;
  writing: AreaProgress;
  reading: AreaProgress;
  listening: AreaProgress;
  examPrep: AreaProgress;
  itDeutsch: AreaProgress;
  totalExercises: number;
  vocabCount: number;
  writingCount: number;
  dueReviewCount: number;
}

const TIME_OPTIONS = [5, 10, 15, 20, 30];

const SUBTITLES = [
  'Ready to slay some Nebensätze today?',
  'Dein Konjunktiv II wird nicht von alleine besser.',
  'Time to make your Genitiv great again.',
  'Heute schon einen Relativsatz gebaut?',
  'Your next Meeting-Flex starts here.',
  'Trennbare Verben? Hold my Kaffee.',
  'Lass uns ein paar Präpositionen zerstören.',
  'Dein Deutsch-Level-up wartet.',
  'Bereit, im nächsten Refinement verbal aufzuräumen?',
  'Plot twist: du kannst das.',
  'Passiv-Konstruktionen are your friend today.',
  'Modalpartikeln? Ja, halt schon.',
  'Mach deinen Teamlead sprachlos. Im guten Sinne.',
  'Heute üben, morgen im Meeting flexen.',
  "Let's turn that B2 energy into C1 Souveränität.",
  'Wortstellung: because Deutsch has its own Logik.',
  'Noch ein Tag, noch ein Stück näher an der C1.',
  'Dein Gehirn will das. Trust the Prozess.',
  'Kein Meeting ohne dich und deinen Konjunktiv.',
  'Partizip II can be beautiful. Allegedly.',
  'Substantivierung klingt schlimm, ist aber dein Superpower.',
  'Sprachbausteine sind wie Lego. Für Erwachsene.',
  'Wer braucht schon Netflix wenn es Leseverstehen gibt.',
  'Nominalisierung: weil ein Nomen mehr sagt als tausend Verben.',
  'Deutsch lernen ist wie Debugging. Aber mit Umlauten.',
];

function getTodaysSubtitle(): string {
  const day = Math.floor(Date.now() / 86400000);
  return SUBTITLES[day % SUBTITLES.length];
}

export default function HomePage() {
  const { t } = useTranslation();
  const { user, profile } = useRequiredAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HomeData | null>(null);
  const [homeDueCards, setHomeDueCards] = useState<any[]>([]);
  const [dueLoading, setDueLoading] = useState(true);
  const [homeVerbs, setHomeVerbs] = useState<Tables<'verb_conjugations'>[]>([]);

  useEffect(() => {
    if (!user) return;
    loadProgress();
    loadDueCards();
    loadVerbs();
  }, [user]);

  async function loadVerbs() {
    const { data } = await supabase
      .from('verb_conjugations')
      .select('*')
      .order('frequency_rank');
    if (data) setHomeVerbs(data as Tables<'verb_conjugations'>[]);
  }

  async function loadDueCards() {
    setDueLoading(true);
    try {
      const { data: dueData } = await supabase
        .from('personal_vocabulary')
        .select('id,word_de,translation_en,translation_custom,example_sentence,box_number,next_review_at,review_count,source_type')
        .eq('user_id', user!.id)
        .lte('next_review_at', new Date().toISOString())
        .order('next_review_at')
        .limit(50);
      if (dueData && dueData.length > 0) setHomeDueCards(dueData);
    } catch {} finally {
      setDueLoading(false);
    }
  }

  async function loadProgress() {
    setLoading(true);
    try {
      // Fire sync as fire-and-forget — doesn't block homepage
      import('@/lib/syncStarredVocab').then(m => m.syncStarredToDb(user!.id)).catch(() => {});

      // All queries in parallel: cache + lightweight counts
      const [
        { data: cache },
        { count: totalWritingPrompts },
        { count: totalReadingTexts },
        { count: writingSubmissions },
        { count: completedReading },
        { count: vocabCount },
      ] = await Promise.all([
        supabase.from('user_progress_cache' as any).select('*').eq('user_id', user!.id).maybeSingle(),
        supabase.from('writing_prompts').select('*', { count: 'exact', head: true }),
        supabase.from('reading_texts').select('*', { count: 'exact', head: true }),
        supabase.from('writing_submissions').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
        supabase.from('reading_progress').select('*', { count: 'exact', head: true }).eq('user_id', user!.id).eq('completed', true),
        supabase.from('personal_vocabulary').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
      ]);

      // If no cache row yet (first visit after migration), initialize it
      let c = cache as any;
      if (!c) {
        await supabase.rpc('initialize_progress_cache');
        const { data: fresh } = await supabase.from('user_progress_cache' as any).select('*').eq('user_id', user!.id).maybeSingle();
        c = fresh;
      }

      setData({
        vocabulary: { completed: c?.vocabulary_completed ?? 0, total: c?.vocabulary_total ?? 0 },
        grammar: { completed: c?.grammar_completed ?? 0, total: c?.grammar_total ?? 0 },
        writing: { completed: writingSubmissions ?? 0, total: totalWritingPrompts ?? 0 },
        reading: { completed: completedReading ?? 0, total: totalReadingTexts ?? 0 },
        listening: { completed: c?.listening_completed ?? 0, total: c?.listening_total ?? 0 },
        itDeutsch: { completed: c?.it_completed ?? 0, total: c?.it_total ?? 0 },
        examPrep: { completed: c?.exam_completed ?? 0, total: c?.exam_total ?? 0 },
        totalExercises: (c?.vocabulary_completed ?? 0) + (c?.grammar_completed ?? 0) + (c?.exam_completed ?? 0) + (c?.it_completed ?? 0) + (c?.listening_completed ?? 0),
        vocabCount: vocabCount ?? 0,
        writingCount: writingSubmissions ?? 0,
        dueReviewCount: 0,
      });
    } catch (err) {
      console.error('Failed to load progress', err);
    } finally {
      setLoading(false);
    }
  }

  const areas = [
    { key: 'nav_vocabulary' as const, path: '/vocabulary', icon: Languages, data: data?.vocabulary },
    { key: 'nav_grammar' as const, path: '/grammar', icon: BookOpen, data: data?.grammar },
    { key: 'nav_writing' as const, path: '/writing', icon: PenLine, data: data?.writing },
    { key: 'nav_reading' as const, path: '/reading', icon: BookOpenCheck, data: data?.reading },
    { key: 'nav_listening' as const, path: '/listening', icon: Headphones, data: data?.listening },
    { key: 'nav_it_deutsch' as const, path: '/it-deutsch/uebungen', icon: Monitor, data: data?.itDeutsch, fuchsia: true },
  ];

  const streak = profile?.current_streak ?? 0;
  const displayName = profile?.display_name || '';

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {t('home_welcome')}{displayName ? `, ${displayName}` : ''}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{getTodaysSubtitle()}</p>
      </div>

      {/* Session Builder */}
      <Card className="bg-gradient-to-r from-blue-100/70 via-violet-100/70 to-fuchsia-100/70 dark:from-blue-950/30 dark:via-violet-950/30 dark:to-fuchsia-950/30 border-blue-200/50 dark:border-violet-900/40">
        <CardContent className="px-5 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30">
                <Flame className={`h-5 w-5 ${streak > 0 ? 'text-orange-500' : 'text-orange-300'}`} />
              </div>
              <div>
                {streak > 0 ? (
                  <>
                    <p className="font-bold text-foreground text-lg leading-tight">{streak} {streak === 1 ? 'Tag' : 'Tage'} am Stück!</p>
                    <p className="text-xs text-muted-foreground">Weiter so — 30 min reichen.</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-foreground leading-tight">Starte deine Serie!</p>
                    <p className="text-xs text-muted-foreground">15 Minuten reichen für den ersten Tag.</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {TIME_OPTIONS.map((min) => (
              <Button
                key={min}
                variant={min === 15 ? 'default' : 'outline'}
                size="sm"
                className="min-w-[2.5rem] h-8 text-xs"
                onClick={() => navigate(`/daily-practice?minutes=${min}`)}
              >
                {min} min
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">{t('home_progress')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => {
            const Icon = area.icon;
            const progress = area.data;
            const rawPct = progress && progress.total > 0
              ? (progress.completed / progress.total) * 100
              : 0;
            const pct = rawPct > 0 ? Math.max(1, Math.round(rawPct)) : 0;

            return (
              <Link key={area.path} to={area.path}>
                <Card className="transition-shadow hover:shadow-md cursor-pointer h-full">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 ${area.fuchsia ? 'text-fuchsia-500' : 'text-primary'}`} />
                      <span className="font-semibold text-card-foreground">{t(area.key)}</span>
                    </div>
                    {loading ? (
                      <Skeleton className="h-2 w-full" />
                    ) : area.comingSoon ? (
                      <p className="text-xs text-muted-foreground">{t('exam_coming_soon')}</p>
                    ) : (
                      <>
                        <ProgressBar value={pct} barClassName={area.fuchsia ? 'bg-fuchsia-500' : undefined} />
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">{progress?.completed ?? 0}</span> / {progress?.total ?? 0} {t('home_exercises_completed')}
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Wortschatz wiederholen */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">{t('home_review_vocabulary')}</h2>
          {!loading && data && data.vocabCount > 0 && (
            <Link to="/my-vocabulary" className="text-sm text-primary hover:underline">
              Mein Wortschatz →
            </Link>
          )}
        </div>
        {dueLoading ? (
          <Card><CardContent className="py-6 text-center"><Skeleton className="h-5 w-40 mx-auto" /></CardContent></Card>
        ) : homeDueCards.length > 0 ? (
          <ReviewCard dueCards={homeDueCards} compact onCardReviewed={() => {}} />
        ) : !loading && data && data.vocabCount > 0 ? (
          <Card>
            <CardContent className="py-6 text-center space-y-1">
              <p className="text-foreground font-medium">Alles wiederholt — gut gemacht!</p>
              <p className="text-sm text-muted-foreground">{data.vocabCount} Wörter & Sätze insgesamt</p>
            </CardContent>
          </Card>
        ) : !loading && data ? (
          <Card>
            <CardContent className="py-10 text-center space-y-3">
              <Languages className="h-10 w-10 mx-auto text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Noch keine Wörter gesammelt</p>
              <p className="text-xs text-muted-foreground/70">Markiere Wörter in Übungen, Redewendungen oder Lesetexten — sie erscheinen hier zum Wiederholen.</p>
              <Link to="/it-deutsch/vokabular" className="inline-block text-xs text-primary hover:underline mt-1">Jetzt starten →</Link>
            </CardContent>
          </Card>
        ) : null}
      </div>


      {/* Verb Flashcards */}
      {homeVerbs.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Verb-Lernkarten</h2>
            <Link to="/grammar/verbs" className="text-sm text-primary hover:underline">
              Alle Verben →
            </Link>
          </div>
          <VerbFlashcard verbs={homeVerbs} compact />
        </div>
      )}

      {/* Stats */}
      {!loading && data && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: t('home_exercises_completed'), value: data.totalExercises },
            { label: t('home_words_learned'), value: data.vocabCount },
            { label: t('home_texts_written'), value: data.writingCount },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground space-y-1">
        <p>
          Built by <a href="https://ioana-ognibeni.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ioana Ognibeni</a> with{' '}
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> &{' '}
          <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lovable</a>
        </p>
      </div>
    </div>
  );
}
