import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { track } from '@/lib/posthog';
import { DefinitionMatch } from './exercises/DefinitionMatch';
import { FillIn } from './exercises/FillIn';
import { SynonymMatch } from './exercises/SynonymMatch';
import { AntonymMatch } from './exercises/AntonymMatch';
import { ErrorCorrection } from './exercises/ErrorCorrection';
import { WordFamily } from './exercises/WordFamily';
import { GrammarFillIn } from '@/components/grammar/exercises/GrammarFillIn';
import { Transform } from '@/components/grammar/exercises/Transform';
import { SentenceBuild } from '@/components/grammar/exercises/SentenceBuild';
import { MultipleChoice } from '@/components/grammar/exercises/MultipleChoice';
import { Match } from '@/components/grammar/exercises/Match';
import { Sprachbausteine } from '@/components/grammar/exercises/Sprachbausteine';
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

  // Invalidate progress cache on unmount so next entry gets fresh data
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ['exercises-with-progress', area, topic] });
    };
  }, [queryClient, area, topic]);

  const dbLevel = level === 'b2' ? 'b2_refresh' : level;

  // Fetch exercises AND progress in a single parallel query
  const { data: queryResult, isLoading: loadingExercises } = useQuery({
    queryKey: ['exercises-with-progress', area, topic, dbLevel, auth?.user?.id],
    queryFn: async () => {
      const exercisePromise = supabase
        .from('exercises')
        .select('*')
        .eq('area', area)
        .eq('topic', topic)
        .eq('level', dbLevel)
        .order('sort_order');

      const progressPromise = auth?.user
        ? supabase
            .from('exercise_progress')
            .select('exercise_id, completed')
            .eq('user_id', auth.user.id)
        : Promise.resolve({ data: [] as { exercise_id: string; completed: boolean }[] });

      const [exResult, progResult] = await Promise.all([exercisePromise, progressPromise]);
      const exercises = (exResult.data ?? []) as Tables<'exercises'>[];
      const progressData = 'data' in progResult ? (progResult as any).data ?? [] : progResult;

      // Build progress map, filtering to only exercises in this topic
      const exerciseIds = new Set(exercises.map(e => e.id));
      const map: Record<string, boolean> = {};
      for (const row of progressData) {
        if (exerciseIds.has(row.exercise_id)) {
          map[row.exercise_id] = row.completed;
        }
      }
      return { exercises, progressMap: map };
    },
  });

  const allExercises = queryResult?.exercises;
  const progressMap = queryResult?.progressMap;

  // Build the exercise queue ONCE: failed first → unattempted → skip completed
  // Frozen after initial build so mid-session progress changes don't shift the list
  const [exercises, setExercises] = useState<Tables<'exercises'>[]>([]);
  const queueBuilt = useRef(false);

  useEffect(() => {
    if (restartMode) {
      setExercises(allExercises ?? []);
      setCurrentIndex(0);
      queueBuilt.current = true;
      return;
    }
    if (queueBuilt.current || !allExercises?.length) return;
    if (progressMap === undefined) return;

    // Build queue once
    const failed: Tables<'exercises'>[] = [];
    const unattempted: Tables<'exercises'>[] = [];
    let allDone = true;

    for (const ex of allExercises) {
      const status = progressMap[ex.id];
      if (status === true) continue;
      allDone = false;
      if (status === false) {
        failed.push(ex);
      } else {
        unattempted.push(ex);
      }
    }

    setExercises(allDone ? [] : [...failed, ...unattempted]);
    queueBuilt.current = true;
  }, [allExercises, progressMap, restartMode]);

  const isLoading = loadingExercises || !queueBuilt.current;

  const handleAnswer = async (correct: boolean, exerciseId: string) => {
    setAnswered(true);
    if (!auth?.user) return;
    const ex = exercises[currentIndex];
    track('exercise_completed', { correct, area, topic, exercise_type: ex?.exercise_type });

    const { data: existing } = await supabase.from('exercise_progress')
      .select('id, attempts, completed')
      .eq('user_id', auth.user.id)
      .eq('exercise_id', exerciseId)
      .maybeSingle();

    if (existing) {
      await supabase.from('exercise_progress').update({
        completed: correct || existing.completed,
        attempts: existing.attempts + 1,
        last_attempt_at: new Date().toISOString(),
        score: correct ? 100 : existing.completed ? undefined : 0,
      }).eq('id', existing.id);
    } else {
      await supabase.from('exercise_progress').insert({
        user_id: auth.user.id,
        exercise_id: exerciseId,
        completed: correct,
        attempts: 1,
        last_attempt_at: new Date().toISOString(),
        score: correct ? 100 : 0,
      });
    }

    // Only invalidate topic lists (for progress display), NOT the exercise-progress
    // query — the queue must stay stable during the session
    queryClient.invalidateQueries({ queryKey: ['grammar-topics'] });
    queryClient.invalidateQueries({ queryKey: ['vocabulary-topics'] });
    queryClient.invalidateQueries({ queryKey: ['it-deutsch-topics'] });
  };

  const handleNext = useCallback(() => {
    setAnswered(false);
    setCurrentIndex((i) => i + 1);
  }, []);

  const handleRestart = () => {
    queueBuilt.current = false;
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

    const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return (
      <div className="max-w-md mx-auto space-y-6 py-8 text-center animate-in fade-in duration-500">
        <div className="relative mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Trophy className="w-12 h-12 text-primary" />
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">{topicTitle}</h2>
          <p className="text-muted-foreground mt-1">
            {allCompleted
              ? (lang === 'de' ? 'Alle Übungen geschafft! Mega.' : 'All exercises done! Mega.')
              : (lang === 'de' ? 'Runde abgeschlossen!' : 'Round complete!')}
          </p>
        </div>

        <div className="relative mx-auto w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="stroke-secondary" />
            <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="stroke-primary" strokeLinecap="round"
              strokeDasharray={`${pct * 2.64} ${264 - pct * 2.64}`}
              style={{ transition: 'stroke-dasharray 1s ease-out' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-foreground">{pct}%</span>
        </div>

        <p className="text-sm text-muted-foreground">{completedCount} / {totalCount} {t('exercise_progress')}</p>

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
  let content = exercise.content as any;
  const solution = exercise.solution as any;
  const instructions = lang === 'de' ? exercise.instructions_de : exercise.instructions_en;

  // Fallback: if definition_match has options but no word, use exercise title
  if (exercise.exercise_type === 'definition_match' && content?.options && !content.word) {
    content = { ...content, word: lang === 'de' ? exercise.title_de : exercise.title_en };
  }
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
        return <DefinitionMatch key={exercise.id} {...commonProps} />;
      case 'fill_in':
        if (content?.original) return <Transform key={exercise.id} {...commonProps} />;
        return (content?.sentences || area === 'grammar') ? <GrammarFillIn key={exercise.id} {...commonProps} /> : <FillIn key={exercise.id} {...commonProps} />;
      case 'synonym_match':
        return <SynonymMatch key={exercise.id} {...commonProps} />;
      case 'antonym_match':
        return <AntonymMatch key={exercise.id} {...commonProps} />;
      case 'error_correction':
        return <ErrorCorrection key={exercise.id} {...commonProps} />;
      case 'word_family':
        return <WordFamily key={exercise.id} {...commonProps} />;
      case 'transform':
        return <Transform key={exercise.id} {...commonProps} />;
      case 'sentence_build':
        return <SentenceBuild key={exercise.id} {...commonProps} />;
      case 'multiple_choice':
        return <MultipleChoice key={exercise.id} {...commonProps} />;
      case 'match':
        return <Match key={exercise.id} {...commonProps} />;
      case 'sprachbausteine':
        return <Sprachbausteine key={exercise.id} {...commonProps} />;
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
