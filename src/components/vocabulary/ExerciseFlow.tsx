import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DefinitionMatch } from './exercises/DefinitionMatch';
import { FillIn } from './exercises/FillIn';
import { SynonymMatch } from './exercises/SynonymMatch';
import { WordFamily } from './exercises/WordFamily';
import { GrammarFillIn } from '@/components/grammar/exercises/GrammarFillIn';
import { Transform } from '@/components/grammar/exercises/Transform';
import { SentenceBuild } from '@/components/grammar/exercises/SentenceBuild';
import { MultipleChoice } from '@/components/grammar/exercises/MultipleChoice';
import { Match } from '@/components/grammar/exercises/Match';
import { Skeleton } from '@/components/ui/skeleton';
import type { Tables } from '@/integrations/supabase/types';

interface ExerciseFlowProps {
  area?: string;
  topic: string;
  level: string;
  topicTitle: string;
  onBack: () => void;
}

export function ExerciseFlow({ area = 'vocabulary', topic, level, topicTitle, onBack }: ExerciseFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const { t, lang } = useTranslation();
  const auth = useAuth();

  const { data: exercises, isLoading } = useQuery({
    queryKey: ['exercises', area, topic, level],
    queryFn: async () => {
      const { data } = await supabase
        .from('exercises')
        .select('*')
        .eq('area', area)
        .eq('topic', topic)
        .eq('level', level)
        .order('sort_order');
      return (data ?? []) as Tables<'exercises'>[];
    },
  });

  const handleAnswer = async (correct: boolean, exerciseId: string) => {
    setAnswered(true);
    if (!auth?.user) return;

    await supabase.from('exercise_progress').upsert(
      {
        user_id: auth.user.id,
        exercise_id: exerciseId,
        completed: correct,
        last_attempt_at: new Date().toISOString(),
        attempts: 1, // will be incremented by trigger or we handle it
      },
      { onConflict: 'user_id,exercise_id' as any }
    );
  };

  const handleNext = () => {
    setAnswered(false);
    setCurrentIndex((i) => i + 1);
  };

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-lg" />;
  }

  if (!exercises?.length) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('exercise_back_to_topics')}
        </Button>
        <p className="text-muted-foreground">{t('page_coming_soon')}</p>
      </div>
    );
  }

  const exercise = exercises[currentIndex];
  const isComplete = currentIndex >= exercises.length;

  if (isComplete) {
    return (
      <div className="space-y-4 text-center py-12">
        <h2 className="text-xl font-bold text-foreground">🎉 {topicTitle}</h2>
        <p className="text-muted-foreground">
          {exercises.length} {t('exercise_of')} {exercises.length} {t('exercise_progress')}
        </p>
        <Button onClick={onBack}>{t('exercise_back_to_topics')}</Button>
      </div>
    );
  }

  const content = exercise.content as any;
  const solution = exercise.solution as any;
  const instructions = lang === 'de' ? exercise.instructions_de : exercise.instructions_en;
  const explanation = lang === 'de' ? exercise.explanation_de : exercise.explanation_en;

  const renderExercise = () => {
    const commonProps = {
      content,
      solution,
      instructions,
      explanation: explanation ?? undefined,
      answered,
      onAnswer: (correct: boolean) => handleAnswer(correct, exercise.id),
    };

    switch (exercise.exercise_type) {
      case 'definition_match':
        return <DefinitionMatch {...commonProps} />;
      case 'fill_in':
        return area === 'grammar' ? <GrammarFillIn {...commonProps} /> : <FillIn {...commonProps} />;
      case 'synonym_match':
        return <SynonymMatch {...commonProps} />;
      case 'word_family':
        return <WordFamily {...commonProps} />;
      case 'transform':
        return <Transform {...commonProps} />;
      case 'sentence_build':
        return <SentenceBuild {...commonProps} />;
      case 'multiple_choice':
        return <MultipleChoice {...commonProps} />;
      case 'match':
        return <Match {...commonProps} />;
      default:
        return <p className="text-muted-foreground">Unsupported exercise type: {exercise.exercise_type}</p>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('exercise_back_to_topics')}
        </Button>
        <span className="text-sm text-muted-foreground tabular-nums">
          {currentIndex + 1} {t('exercise_of')} {exercises.length}
        </span>
      </div>

      <ProgressBar value={((currentIndex + 1) / exercises.length) * 100} showLabel={false} />

      {renderExercise()}

      {answered && (
        <div className="flex justify-end">
          <Button onClick={handleNext}>{t('exercise_next')}</Button>
        </div>
      )}
    </div>
  );
}
