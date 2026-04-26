import { useEffect, useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, PenLine, BookOpenCheck, Headphones, Languages, Flame, Monitor, Zap, Coffee, Star, Clock, Trophy, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Skeleton } from '@/components/ui/skeleton';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { VerbFlashcard } from '@/components/shared/VerbFlashcard';
import { OnboardingOverlay } from '@/components/shared/OnboardingOverlay';
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

const DURATION_OPTIONS = [
  { minutes: 5,  label: 'SCHNELL',   icon: Zap },
  { minutes: 10, label: 'KAFFEE',    icon: Coffee },
  { minutes: 15, label: 'EMPFOHLEN', icon: Star, recommended: true },
  { minutes: 20, label: 'FOKUS',     icon: Clock },
  { minutes: 30, label: 'MARATHON',  icon: Trophy },
] as const;

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
    // Verbs are independent (no user data sync needed)
    loadVerbs();
    // Progress syncs starred vocab first, then due cards can query accurately
    loadProgress().then(() => loadDueCards());
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
      // Sync starred vocab + fetch cache in parallel (sync must finish before vocab count)
      const [, cacheResult] = await Promise.all([
        import('@/lib/syncStarredVocab').then(m => m.syncStarredToDb(user!.id)).catch(() => {}),
        supabase.from('user_progress_cache' as any).select('*').eq('user_id', user!.id).maybeSingle(),
      ]);

      // Single fast query: the cache row has exercise counts
      let cache = cacheResult.data;

      // If no cache row yet (first visit), initialize in background and use zeros
      if (!cache) {
        supabase.rpc('initialize_progress_cache').catch(() => {});
        cache = {};
      }

      const c = cache as any;

      // Only the counts not in cache — run in parallel
      const [
        { count: totalWritingPrompts },
        { count: writingSubmissions },
        { count: completedReading },
        { count: vocabCount },
      ] = await Promise.all([
        supabase.from('writing_prompts').select('*', { count: 'exact', head: true }),
        supabase.from('writing_submissions').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
        supabase.from('reading_progress').select('*', { count: 'exact', head: true }).eq('user_id', user!.id).eq('completed', true),
        supabase.from('personal_vocabulary').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
      ]);

      // reading_texts total is static — hardcode to avoid a query
      const totalReadingTexts = 40;

      setData({
        vocabulary: { completed: c?.vocabulary_completed ?? 0, total: c?.vocabulary_total ?? 0 },
        grammar: { completed: c?.grammar_completed ?? 0, total: c?.grammar_total ?? 0 },
        writing: { completed: writingSubmissions ?? 0, total: totalWritingPrompts ?? 0 },
        reading: { completed: completedReading ?? 0, total: totalReadingTexts },
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
      {profile && !profile.onboarding_completed_at && <OnboardingOverlay />}
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground truncate">
          {t('home_welcome')}{displayName ? <span className="ph-no-capture">, {displayName}</span> : ''}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{getTodaysSubtitle()}</p>
      </div>

      {/* Tagesplan */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-4 sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-orange-500/5 blur-3xl" />
        <div className="relative space-y-4">
          {/* Header: label + streak */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Tagesplan
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm font-bold ${
              streak > 0
                ? 'border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-400'
                : 'border-border/60 bg-background text-muted-foreground dark:bg-card'
            }`}>
              <Flame className={`h-4 w-4 ${streak > 0 ? 'text-orange-500' : 'text-muted-foreground/50'}`} />
              <span className="text-lg font-black">{streak}</span>
              <span className="text-[10px] font-semibold tracking-wider">TAG{streak !== 1 ? 'E' : ''}</span>
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-foreground">Wie viel Zeit hast du?</h2>
            <p className="text-sm text-muted-foreground">
              Wähle eine Dauer — dein Plan wird automatisch zusammengestellt.
            </p>
          </div>

          {/* Duration cards */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {DURATION_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isRec = 'recommended' in opt && opt.recommended;
              return (
                <button
                  key={opt.minutes}
                  onClick={() => navigate(`/daily-practice?minutes=${opt.minutes}`)}
                  className={`relative flex flex-col items-center justify-center gap-1 rounded-xl aspect-square sm:aspect-auto sm:py-4 transition-all border text-center cursor-pointer hover:-translate-y-0.5 ${
                    isRec
                      ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
                      : 'border-border bg-card hover:border-primary/40 hover:bg-primary/5 hover:shadow-md'
                  }`}
                >
                  {isRec && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-orange-500 shadow-sm">
                      <Star className="h-3 w-3 fill-white text-white" />
                    </span>
                  )}
                  <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isRec ? 'text-primary-foreground' : 'text-primary'}`} />
                  <span className={`text-base sm:text-xl font-bold leading-none ${isRec ? '' : 'text-foreground'}`}>
                    {opt.minutes}<span className="text-[10px] sm:text-sm font-medium">m</span>
                  </span>
                  <span className={`hidden sm:block text-[10px] font-semibold tracking-wider ${isRec ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Motivational footer */}
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <ArrowRight className="h-3 w-3" />
            {streak > 0
              ? `Bleib dran — Tag ${streak + 1} wartet auf dich.`
              : 'Starte deine erste Runde — du schaffst das.'}
          </p>
        </div>
      </div>

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
                <Card className="transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer h-full">
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
        {dueLoading && loading ? (
          <Card><CardContent className="py-6 text-center"><Skeleton className="h-5 w-40 mx-auto" /></CardContent></Card>
        ) : homeDueCards.length > 0 ? (
          <ReviewCard dueCards={homeDueCards} compact onCardReviewed={() => {}} />
        ) : data && data.vocabCount > 0 ? (
          <Card>
            <CardContent className="py-6 text-center space-y-1">
              <p className="text-foreground font-medium">Alles wiederholt — gut gemacht!</p>
              <p className="text-sm text-muted-foreground">{data.vocabCount} Wörter & Sätze insgesamt</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-10 text-center space-y-3">
              <Languages className="h-10 w-10 mx-auto text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Noch keine Wörter gesammelt</p>
              <p className="text-xs text-muted-foreground/70">Markiere Wörter in Übungen, Redewendungen oder Lesetexten — sie erscheinen hier zum Wiederholen.</p>
              <Link to="/it-deutsch/vokabular" className="inline-block text-xs text-primary hover:underline mt-1">Jetzt starten →</Link>
            </CardContent>
          </Card>
        )}
      </div>

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

    </div>
  );
}
