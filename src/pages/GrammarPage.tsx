import { useState } from 'react';
import { LevelTabs } from '@/components/shared/LevelTabs';
import { TopicCard } from '@/components/shared/TopicCard';
import { ExerciseFlow } from '@/components/vocabulary/ExerciseFlow';
import { useTranslation } from '@/i18n/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TOPIC_NAMES: Record<string, { de: string; en: string; telc?: boolean }> = {
  // B2
  adjektivdeklination: { de: 'Adjektivdeklination', en: 'Adjective Declension' },
  praepositionen: { de: 'Präpositionen', en: 'Prepositions' },
  konjunktiv_ii: { de: 'Konjunktiv II', en: 'Subjunctive II' },
  relativsaetze: { de: 'Relativsätze', en: 'Relative Clauses' },
  passiv: { de: 'Passiv', en: 'Passive Voice' },
  verben_mit_praepositionen: { de: 'Verben mit Präpositionen', en: 'Verbs with Prepositions' },
  // C1
  nominalisierung: { de: 'Nominalisierung', en: 'Nominalization' },
  konnektoren: { de: 'Konnektoren', en: 'Connectors' },
  passiversatzformen: { de: 'Passiversatzformen', en: 'Passive Alternatives' },
  erweitertes_partizip: { de: 'Erweitertes Partizip', en: 'Extended Participle' },
  n_deklination: { de: 'N-Deklination', en: 'N-Declension' },
  nomen_verb_verbindungen: { de: 'Nomen-Verb-Verbindungen', en: 'Noun-Verb Combinations' },
  subjektlose_passivkonstruktionen: { de: 'Subjektlose Passivkonstruktionen', en: 'Subjectless Passive' },
  sprachbausteine: { de: 'Sprachbausteine (telc)', en: 'Language Building Blocks (telc)', telc: true },
};

export default function GrammarPage() {
  const [level, setLevel] = useState<'b2' | 'c1'>('b2');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { t, lang } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const dbLevel = level === 'b2' ? 'b2_refresh' : level;

  const { data: topics, isLoading } = useQuery({
    queryKey: ['grammar-topics', dbLevel, auth?.user?.id],
    queryFn: async () => {
      const { data: exercises } = await supabase
        .from('exercises')
        .select('id, topic, sort_order')
        .eq('area', 'grammar')
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
          title: TOPIC_NAMES[slug]?.[lang] ?? slug,
          telc: TOPIC_NAMES[slug]?.telc ?? false,
          total: data.total,
          completed: data.completed,
        }));
    },
    enabled: !!auth?.user,
  });

  if (selectedTopic) {
    return (
      <ExerciseFlow
        area="grammar"
        topic={selectedTopic}
        level={level}
        topicTitle={TOPIC_NAMES[selectedTopic]?.[lang] ?? selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{t('page_grammar')}</h1>
        <Button variant="outline" size="sm" onClick={() => navigate('/grammar/verbs')}>
          <BookOpen className="mr-2 h-4 w-4" />
          {t('grammar_verb_table')}
        </Button>
      </div>

      <LevelTabs value={level} onValueChange={setLevel} />

      {isLoading ? (
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
              showTelcBadge={topic.telc}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">{t('page_coming_soon')}</p>
      )}
    </div>
  );
}
