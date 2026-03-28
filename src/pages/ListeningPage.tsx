import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Skeleton } from '@/components/ui/skeleton';
import { Headphones, ArrowLeft } from 'lucide-react';
import { ListeningGlobalverstehen } from '@/components/listening/ListeningGlobalverstehen';
import { ListeningDetailverstehen } from '@/components/listening/ListeningDetailverstehen';
import { ListeningInformationstransfer } from '@/components/listening/ListeningInformationstransfer';
import type { Tables } from '@/integrations/supabase/types';

type Exercise = Tables<'exercises'>;

interface ExerciseSet {
  setNumber: number;
  exercises: Exercise[];
}

const TEIL_TOPICS: Record<string, 'listening_globalverstehen' | 'listening_detailverstehen' | 'listening_informationstransfer'> = {
  globalverstehen: 'listening_globalverstehen',
  detailverstehen: 'listening_detailverstehen',
  informationstransfer: 'listening_informationstransfer',
};

export default function ListeningPage() {
  const { t, lang } = useTranslation();
  const { user } = useRequiredAuth();
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  const { data: exercises, isLoading } = useQuery({
    queryKey: ['listening-exercises'],
    queryFn: async () => {
      const { data } = await supabase
        .from('exercises')
        .select('*')
        .eq('area', 'listening')
        .order('sort_order');
      return (data ?? []) as Exercise[];
    },
  });

  const { data: progress } = useQuery({
    queryKey: ['listening-progress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('exercise_progress')
        .select('exercise_id, completed')
        .eq('user_id', user.id);
      return data ?? [];
    },
    enabled: !!user,
  });

  const completedIds = new Set(progress?.filter(p => p.completed).map(p => p.exercise_id) ?? []);

  // Group into sets of 3
  const sets: ExerciseSet[] = [];
  if (exercises) {
    for (let i = 0; i < exercises.length; i += 3) {
      sets.push({
        setNumber: Math.floor(i / 3) + 1,
        exercises: exercises.slice(i, i + 3),
      });
    }
  }

  const handleSaveProgress = async (exerciseId: string, score: number, total: number) => {
    if (!user) return;
    await supabase.from('exercise_progress').upsert(
      {
        user_id: user.id,
        exercise_id: exerciseId,
        completed: score === total,
        score: Math.round((score / total) * 100),
        last_attempt_at: new Date().toISOString(),
        attempts: 1,
      },
      { onConflict: 'user_id,exercise_id' as any }
    );
  };

  if (activeExercise) {
    const content = activeExercise.content as any;
    const solution = activeExercise.solution as any;
    const instructions = lang === 'de' ? activeExercise.instructions_de : activeExercise.instructions_en;
    const explanation = lang === 'de' ? activeExercise.explanation_de : activeExercise.explanation_en;
    const title = lang === 'de' ? activeExercise.title_de : activeExercise.title_en;

    const commonProps = {
      content,
      solution,
      instructions,
      explanation: explanation ?? undefined,
      title,
      onBack: () => setActiveExercise(null),
      onSaveProgress: (score: number, total: number) => handleSaveProgress(activeExercise.id, score, total),
    };

    return (
      <div className="space-y-4">
        {activeExercise.exercise_type === 'match' && <ListeningGlobalverstehen {...commonProps} />}
        {activeExercise.exercise_type === 'multiple_choice' && <ListeningDetailverstehen {...commonProps} />}
        {activeExercise.exercise_type === 'fill_in' && <ListeningInformationstransfer {...commonProps} />}
      </div>
    );
  }

  if (isLoading) {
    return <div className="space-y-4"><Skeleton className="h-8 w-64" /><Skeleton className="h-40 w-full" /><Skeleton className="h-40 w-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Headphones className="h-6 w-6" />
          {t('listening_title')}
          <TelcBadge className="ml-1" />
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{t('listening_subtitle')}</p>
      </div>

      <div className="grid gap-4">
        {sets.map(set => {
          const completedCount = set.exercises.filter(e => completedIds.has(e.id)).length;
          return (
            <Card key={set.setNumber}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  {t('listening_set')} {set.setNumber}
                  <TelcBadge />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {set.exercises.map((exercise, idx) => {
                  const teilKey = TEIL_TOPICS[exercise.topic] ?? exercise.topic;
                  const isCompleted = completedIds.has(exercise.id);
                  return (
                    <button
                      key={exercise.id}
                      onClick={() => setActiveExercise(exercise)}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm bg-muted/40 hover:bg-primary/10 hover:text-primary transition-colors text-left cursor-pointer"
                    >
                      <span className={isCompleted ? 'text-foreground' : 'text-muted-foreground'}>
                        {t('listening_teil')} {idx + 1}: {t(teilKey as any)}
                        {' — '}
                        <span className="text-xs">
                          {(exercise.content as any).topic_title ?? (lang === 'de' ? exercise.title_de : exercise.title_en)}
                        </span>
                      </span>
                      {isCompleted && <span className="text-xs text-primary">✓</span>}
                    </button>
                  );
                })}
                <div className="pt-2">
                  <ProgressBar value={(completedCount / Math.max(set.exercises.length, 1)) * 100} />
                  <p className="text-xs text-muted-foreground mt-1">
                    {completedCount}/{set.exercises.length} {t('listening_completed')}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
