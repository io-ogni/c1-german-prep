import { useEffect, useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, PenLine, BookOpenCheck, Headphones, Languages, Flame, BookMarked, FileText, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

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

export default function HomePage() {
  const { t } = useTranslation();
  const { user, profile } = useRequiredAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    if (!user) return;
    loadProgress();
  }, [user]);

  async function loadProgress() {
    setLoading(true);
    try {
      // Step 1: Get all exercise IDs grouped by area
      const { data: allExercises } = await supabase
        .from('exercises')
        .select('id, area, exam_format');

      const exercisesByArea: Record<string, string[]> = {};
      const examIds: string[] = [];
      for (const ex of allExercises ?? []) {
        const a = ex.area ?? 'unknown';
        (exercisesByArea[a] ??= []).push(ex.id);
        if (ex.exam_format) examIds.push(ex.id);
      }

      const vocabIds = exercisesByArea['vocabulary'] ?? [];
      const grammarIds = [...(exercisesByArea['grammar'] ?? []), ...(exercisesByArea['sprachbausteine'] ?? [])];
      const itIds = exercisesByArea['berufssprache_it'] ?? [];
      const listeningIds = exercisesByArea['listening'] ?? [];

      // Step 2: Get all completed exercise IDs for this user in one query
      const { data: completedRows } = await supabase
        .from('exercise_progress')
        .select('exercise_id')
        .eq('user_id', user!.id)
        .eq('completed', true);

      const completedSet = new Set((completedRows ?? []).map(r => r.exercise_id));

      const countCompleted = (ids: string[]) => ids.filter(id => completedSet.has(id)).length;

      // Step 3: Parallel queries for non-exercise counts
      const [
        { count: totalWritingPrompts },
        { count: totalReadingTexts },
        { count: writingSubmissions },
        { count: completedReading },
        { count: vocabCount },
        { count: dueReviewCount },
      ] = await Promise.all([
        supabase.from('writing_prompts').select('*', { count: 'exact', head: true }),
        supabase.from('reading_texts').select('*', { count: 'exact', head: true }),
        supabase.from('writing_submissions').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
        supabase.from('reading_progress').select('*', { count: 'exact', head: true }).eq('user_id', user!.id).eq('completed', true),
        supabase.from('personal_vocabulary').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
        supabase.from('personal_vocabulary').select('*', { count: 'exact', head: true }).eq('user_id', user!.id).lte('next_review_at', new Date().toISOString()),
      ]);

      const cVocab = countCompleted(vocabIds);
      const cGrammar = countCompleted(grammarIds);
      const cExam = countCompleted(examIds);
      const cIT = countCompleted(itIds);
      const cListening = countCompleted(listeningIds);

      setData({
        vocabulary: { completed: cVocab, total: vocabIds.length },
        grammar: { completed: cGrammar, total: grammarIds.length },
        writing: { completed: writingSubmissions ?? 0, total: totalWritingPrompts ?? 0 },
        reading: { completed: completedReading ?? 0, total: totalReadingTexts ?? 0 },
        listening: { completed: cListening, total: listeningIds.length },
        itDeutsch: { completed: cIT, total: itIds.length },
        examPrep: { completed: cExam, total: examIds.length },
        totalExercises: cVocab + cGrammar + cExam + cIT + cListening,
        vocabCount: vocabCount ?? 0,
        writingCount: writingSubmissions ?? 0,
        dueReviewCount: dueReviewCount ?? 0,
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
    { key: 'nav_it_deutsch' as const, path: '/it-deutsch', icon: Briefcase, data: data?.itDeutsch, fuchsia: true },
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
        <p className="mt-1 text-muted-foreground">C1 Werkstatt — {t('home_subtitle')}</p>
      </div>

      {/* Session Builder */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-card-foreground">{t('daily_title')}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{t('daily_how_much_time')}</p>
          <div className="flex flex-wrap gap-2">
            {TIME_OPTIONS.map((min) => (
              <Button
                key={min}
                variant={min === 15 ? 'default' : 'outline'}
                size="sm"
                className="min-w-[3.5rem]"
                onClick={() => navigate(`/daily-practice?minutes=${min}`)}
              >
                {min} {t('daily_minutes')}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {streak > 0
              ? `${t('daily_streak')}: ${streak} ${t('daily_streak_days')}`
              : t('daily_start_streak')}
          </p>
        </CardContent>
      </Card>

      {/* Progress Cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">{t('home_progress')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => {
            const Icon = area.icon;
            const progress = area.data;
            const pct = progress && progress.total > 0
              ? Math.round((progress.completed / progress.total) * 100)
              : 0;

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
                          {progress?.completed ?? 0} / {progress?.total ?? 0} {t('home_exercises_completed')}
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

      {/* Quick Links */}
      <div className="flex flex-wrap gap-4 text-sm">
        <Link to="/my-vocabulary" className="text-primary hover:underline flex items-center gap-1">
          <BookMarked className="h-4 w-4" />
          {t('home_review_vocabulary')}
          {data && data.dueReviewCount > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">{data.dueReviewCount}</Badge>
          )}
        </Link>
        <Link to="/writing" className="text-primary hover:underline flex items-center gap-1">
          <FileText className="h-4 w-4" />
          {t('home_practice_writing')}
        </Link>
      </div>

      {/* Stats */}
      {!loading && data && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: t('home_exercises_completed'), value: data.totalExercises },
            { label: t('home_words_learned'), value: data.vocabCount },
            { label: t('home_texts_written'), value: data.writingCount },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground space-y-1">
        <p>
          Built by <a href="https://ioana-ognibeni.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ioana Ognibeni</a> with{' '}
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a>,{' '}
          <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lovable</a> &{' '}
          <a href="https://notebooklm.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NotebookLM</a>
        </p>
      </div>
    </div>
  );
}
