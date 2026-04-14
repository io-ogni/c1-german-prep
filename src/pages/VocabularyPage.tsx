import { useState } from 'react';
import { TopicCard } from '@/components/shared/TopicCard';
import { ExerciseFlow } from '@/components/vocabulary/ExerciseFlow';
import { useTranslation } from '@/i18n/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Languages, Link2, ArrowRightLeft } from 'lucide-react';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { NAV_CONTAINER, TAB_TRIGGER_BLUE } from '@/components/shared/navStyles';
import { ScrollNav } from '@/components/shared/ScrollNav';
import { NVVerbindungenContent } from '@/pages/NVVerbindungenContent';
import { PraepositionenContent } from '@/pages/PraepositionenContent';

const TOPIC_NAMES: Record<string, string> = {
  alltag_gesellschaft: 'Alltag & Gesellschaft',
  arbeit_karriere: 'Arbeit & Karriere',
  medien_kommunikation: 'Medien & Kommunikation',
  umwelt_natur: 'Umwelt & Natur',
  politik_wirtschaft: 'Politik & Wirtschaft',
  kultur_bildung: 'Kultur & Bildung',
  wissenschaft_technik: 'Wissenschaft & Technik',
  nomen_verb_verbindungen: 'Nomen-Verb-Verbindungen',
  konnektoren_redemittel: 'Konnektoren & Redemittel',
  digitalisierung_ki: 'Digitalisierung & KI',
  studium_wissenschaft: 'Studium & Wissenschaft',
  wirtschaft_arbeitswelt: 'Wirtschaft & Arbeitswelt',
  umwelt_nachhaltigkeit: 'Umwelt & Nachhaltigkeit',
  gesellschaft_politik: 'Gesellschaft & Politik',
  psychologie_kommunikation: 'Psychologie & Kommunikation',
  globalisierung_urbanisierung: 'Globalisierung & Urbanisierung',
};

export default function VocabularyPage() {
  const [level, setLevel] = useState<'b2' | 'c1' | 'nv-verbindungen' | 'praepositionen'>('c1');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { t, lang } = useTranslation();
  const auth = useAuth();

  const dbLevel = level === 'b2' ? 'b2_refresh' : level;

  const { data: topics, isLoading } = useQuery({
    queryKey: ['vocabulary-topics', dbLevel, auth?.user?.id],
    queryFn: async () => {
      const { data: exercises } = await supabase
        .from('exercises')
        .select('id, topic, sort_order')
        .eq('area', 'vocabulary')
        .eq('level', dbLevel);

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
          title: TOPIC_NAMES[slug] ?? slug,
          total: data.total,
          completed: data.completed,
        }));
    },
    enabled: !!auth?.user,
  });

  if (selectedTopic) {
    return (
      <ExerciseFlow
        topic={selectedTopic}
        level={level}
        topicTitle={TOPIC_NAMES[selectedTopic] ?? selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Languages className="h-6 w-6" />
          {t('page_vocabulary')}
          <TelcBadge className="ml-1" />
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Wörter sammeln wie Pokémon. Gotta catch 'em all.
        </p>
      </div>
      <Tabs value={level} onValueChange={(v) => setLevel(v as typeof level)}>
        <ScrollNav>
          <TabsList className={`${NAV_CONTAINER} h-auto gap-1`}>
            <TabsTrigger value="b2" className={TAB_TRIGGER_BLUE}>{t('level_b2_refresh')}</TabsTrigger>
            <TabsTrigger value="c1" className={TAB_TRIGGER_BLUE}>{t('level_c1')}</TabsTrigger>
            <TabsTrigger value="nv-verbindungen" className={`${TAB_TRIGGER_BLUE} gap-1.5`}>
              <Link2 className="h-4 w-4" />
              NV-Verbindungen
            </TabsTrigger>
            <TabsTrigger value="praepositionen" className={`${TAB_TRIGGER_BLUE} gap-1.5`}>
              <ArrowRightLeft className="h-4 w-4" />
              Präpositionen
            </TabsTrigger>
          </TabsList>
        </ScrollNav>
      </Tabs>

      {(level === 'b2' || level === 'c1') && (isLoading ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
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
      ))}

      {level === 'nv-verbindungen' && (
        <div className="mt-4">
          <NVVerbindungenContent />
        </div>
      )}

      {level === 'praepositionen' && (
        <div className="mt-4">
          <PraepositionenContent />
        </div>
      )}
    </div>
  );
}
