import { useState } from 'react';
import { TopicCard } from '@/components/shared/TopicCard';
import { ExerciseFlow } from '@/components/vocabulary/ExerciseFlow';
import { useTranslation } from '@/i18n/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { ITDeutschNav } from '@/components/layout/ITDeutschNav';

const TOPIC_NAMES: Record<string, { de: string; en: string }> = {
  power_nomen: { de: 'Power-Nomen', en: 'Power Nouns' },
  power_verben: { de: 'Power-Verben', en: 'Power Verbs' },
  kollokationen: { de: 'Kollokationen', en: 'Collocations' },
  workshop_phrasen: { de: 'Workshop-Moderation', en: 'Workshop Facilitation' },
  refinement_phrasen: { de: 'Refinement & Planning', en: 'Refinement & Planning' },
  redewendungen: { de: 'Redewendungen', en: 'Idioms' },
  krisen_simulator: { de: 'Krisen-Simulator', en: 'Crisis Simulator' },
};

export default function ITUebungenPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { t, lang } = useTranslation();
  const auth = useAuth();

  const { data: topics, isLoading } = useQuery({
    queryKey: ['it-deutsch-topics', auth?.user?.id],
    queryFn: async () => {
      const { data: exercises } = await supabase
        .from('exercises')
        .select('id, topic, sort_order')
        .eq('area', 'berufssprache_it');

      if (!exercises?.length) return [];

      const { data: progress } = await supabase
        .from('exercise_progress')
        .select('exercise_id, completed')
        .eq('user_id', auth!.user!.id);

      const completedSet = new Set(
        (progress ?? []).filter((p) => p.completed).map((p) => p.exercise_id)
      );

      const topicMap = new Map<string, { total: number; completed: number; minSort: number }>();
      for (const ex of exercises) {
        const entry = topicMap.get(ex.topic) ?? { total: 0, completed: 0, minSort: ex.sort_order };
        entry.total++;
        if (completedSet.has(ex.id)) entry.completed++;
        if (ex.sort_order < entry.minSort) entry.minSort = ex.sort_order;
        topicMap.set(ex.topic, entry);
      }

      return Array.from(topicMap.entries())
        .sort((a, b) => a[1].minSort - b[1].minSort)
        .map(([slug, data]) => ({
          slug,
          title: TOPIC_NAMES[slug]?.[lang] ?? slug,
          total: data.total,
          completed: data.completed,
        }));
    },
    enabled: !!auth?.user,
  });

  if (selectedTopic) {
    return (
      <ExerciseFlow
        area="berufssprache_it"
        topic={selectedTopic}
        level="c1"
        topicTitle={TOPIC_NAMES[selectedTopic]?.[lang] ?? selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-foreground">{t('nav_it_deutsch')}</h1>
        <ITDeutschNav />
      </div>

      <p className="text-sm text-muted-foreground">{t('it_deutsch_subtitle')}</p>

      {isLoading ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
      ) : topics?.length ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard
              key={topic.slug}
              title={topic.title}
              exerciseCount={topic.total}
              progress={topic.total > 0 ? (topic.completed / topic.total) * 100 : 0}
              onClick={() => setSelectedTopic(topic.slug)}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">{t('page_coming_soon')}</p>
      )}
    </div>
  );
}
