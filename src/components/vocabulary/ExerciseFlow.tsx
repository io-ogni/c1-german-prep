import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
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
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [restartMode, setRestartMode] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const { t, lang } = useTranslation();
  const auth = useAuth();

  const dbLevel = level === 'b2' ? 'b2_refresh' : level;

  // Fetch all exercises for this topic
  const { data: allExercises, isLoading: loadingExercises } = useQuery({
    queryKey: ['exercises', area, topic, dbLevel],
    queryFn: async () => {
      const { data } = await supabase
        .from('exercises')
        .select('*')
        .eq('area', area)
        .eq('topic', topic)
        .eq('level', dbLevel)
        .order('sort_order');
      return (data ?? []) as Tables<'exercises'>[];
    },
  });

  // Fetch user's progress for these exercises
  const { data: progressMap, isLoading: loadingProgress } = useQuery({
    queryKey: ['exercise-progress', area, topic, dbLevel, auth?.user?.id],
    queryFn: async () => {
      if (!auth?.user || !allExercises?.length) return {};
      const ids = allExercises.map(e => e.id);
      const { data } = await supabase
        .from('exercise_progress')
        .select('exercise_id, completed')
        .eq('user_id', auth.user.id)
        .in('exercise_id', ids);
      const map: Record<string, boolean> = {};
      for (const row of data ?? []) {
        map[row.exercise_id] = row.completed;
      }
      return map;
    },
    enabled: !!allExercises?.length && !!auth?.user,
  });

  // Build the exercise queue: failed first → unattempted → skip completed
  // In restart mode, show all exercises in original order
  const exercises = useMemo(() => {
    if (!allExercises?.length) return [];
    if (restartMode || !progressMap || Object.keys(progressMap).length === 0) return allExercises;

    const failed: Tables<'exercises'>[] = [];
    const unattempted: Tables<'exercises'>[] = [];
    let allDone = true;

    for (const ex of allExercises) {
      const status = progressMap[ex.id];
      if (status === true) continue; // completed — skip
      allDone = false;
      if (status === false) {
        failed.push(ex); // attempted but wrong
      } else {
        unattempted.push(ex); // never tried
      }
    }

    if (allDone) return []; // all completed — show completion screen
    return [...failed, ...unattempted];
  }, [allExercises, progressMap, restartMode]);

  const isLoading = loadingExercises || loadingProgress;

  const handleAnswer = async (correct: boolean, exerciseId: string) => {
    setAnswered(true);
    if (!auth?.user) return;

    await supabase.from('exercise_progress').upsert(
      {
        user_id: auth.user.id,
        exercise_id: exerciseId,
        completed: correct,
        last_attempt_at: new Date().toISOString(),
        attempts: 1,
      },
      { onConflict: 'user_id,exercise_id' as any }
    );
    // Invalidate progress so it's fresh next time
    queryClient.invalidateQueries({ queryKey: ['exercise-progress', area, topic, dbLevel, auth.user.id] });
    queryClient.invalidateQueries({ queryKey: ['grammar-topics'] });
    queryClient.invalidateQueries({ queryKey: ['vocabulary-topics'] });
  };

  const handleNext = useCallback(() => {
    setAnswered(false);
    setCurrentIndex((i) => i + 1);
  }, []);

  const handleRestart = () => {
    setRestartMode(true);
    setCurrentIndex(0);
    setAnswered(false);
  };

  // Enter key advances to next exercise when answered
  useEffect(() => {
    if (!answered) return;
    const timeout = setTimeout(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter') handleNext();
      };
      window.addEventListener('keydown', onKey);
      cleanupRef.current = () => window.removeEventListener('keydown', onKey);
    }, 50);
    return () => {
      clearTimeout(timeout);
      cleanupRef.current?.();
    };
  }, [answered, handleNext]);

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-lg" />;
  }

  if (!allExercises?.length) {
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

  // All exercises completed (not in restart mode)
  const allCompleted = exercises.length === 0 && !restartMode;
  const flowComplete = currentIndex >= exercises.length && exercises.length > 0;

  if (allCompleted || flowComplete) {
    const totalCount = allExercises.length;
    const completedCount = allCompleted
      ? totalCount
      : Object.values(progressMap ?? {}).filter(Boolean).length;

    return (
      <div className="space-y-4 text-center py-12">
        <h2 className="text-xl font-bold text-foreground">🎉 {topicTitle}</h2>
        <p className="text-muted-foreground">
          {completedCount} {t('exercise_of')} {totalCount} {t('exercise_progress')}
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onBack}>{t('exercise_back_to_topics')}</Button>
          <Button onClick={handleRestart}>
            <RotateCcw className="mr-2 h-4 w-4" />
            {lang === 'de' ? 'Nochmal üben' : 'Practice again'}
          </Button>
        </div>
      </div>
    );
  }

  const exercise = exercises[currentIndex];
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
        return (content?.sentences || area === 'grammar') ? <GrammarFillIn {...commonProps} /> : <FillIn {...commonProps} />;
      case 'synonym_match':
        return <SynonymMatch {...commonProps} />;
      case 'word_family':
        return <WordFamily {...commonProps} />;
      case 'transform':
        return <Transform key={exercise.id} {...commonProps} />;
      case 'sentence_build':
        return <SentenceBuild key={exercise.id} {...commonProps} />;
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
