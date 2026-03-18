import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  ArrowLeft, CheckCircle, XCircle, Eye, Flame, SkipForward, StopCircle, Loader2,
} from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';
import { DefinitionMatch } from '@/components/vocabulary/exercises/DefinitionMatch';
import { FillIn } from '@/components/vocabulary/exercises/FillIn';
import { SynonymMatch } from '@/components/vocabulary/exercises/SynonymMatch';
import { WordFamily } from '@/components/vocabulary/exercises/WordFamily';
import { GrammarFillIn } from '@/components/grammar/exercises/GrammarFillIn';
import { Transform } from '@/components/grammar/exercises/Transform';
import { SentenceBuild } from '@/components/grammar/exercises/SentenceBuild';
import { MultipleChoice } from '@/components/grammar/exercises/MultipleChoice';
import { Match } from '@/components/grammar/exercises/Match';

// ----- Types -----
interface VocabCard {
  id: string;
  word_de: string;
  translation_en: string;
  translation_custom: string | null;
  example_sentence: string | null;
  box_number: number;
  review_count: number;
}

interface ExerciseItem {
  id: string;
  area: string;
  exercise_type: string;
  difficulty: number;
  sort_order: number;
  title_de: string;
  title_en: string;
  instructions_de: string;
  instructions_en: string;
  content: Json;
  solution: Json;
  explanation_de: string | null;
  explanation_en: string | null;
}

type SessionStatus = 'loading' | 'empty' | 'flashcards' | 'exercises' | 'completed';

const TIME_ESTIMATES: Record<string, number> = {
  definition_match: 1, multiple_choice: 1, richtig_falsch: 1,
  fill_in: 1.5, word_family: 1.5,
  synonym_match: 2, match: 2,
  transform: 2.5, sentence_build: 2.5,
};

const BOX_INTERVALS = [1, 3, 7, 14, 30];
const VALID_MINUTES = [5, 10, 15, 20, 30];

export default function DailyPracticePage() {
  const { t, lang } = useTranslation();
  const { profile, refreshProfile } = useRequiredAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const minutes = VALID_MINUTES.includes(Number(searchParams.get('minutes'))) ? Number(searchParams.get('minutes')) : 15;

  const [status, setStatus] = useState<SessionStatus>('loading');
  const [flashcards, setFlashcards] = useState<VocabCard[]>([]);
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const sessionStartedRef = useRef(false);

  // Stats
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const [flashcardsReviewed, setFlashcardsReviewed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  // Timer
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<Date>(new Date());

  // Exercise answer state
  const [exerciseAnswer, setExerciseAnswer] = useState<string>('');
  const [exerciseFeedback, setExerciseFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const totalItems = flashcards.length + exercises.length;
  const isFlashcardPhase = status === 'flashcards';
  const currentFlashcard = isFlashcardPhase ? flashcards[currentIndex] : null;
  const currentExercise = status === 'exercises' ? exercises[currentIndex - flashcards.length] : null;

  // ----- Timer -----
  useEffect(() => {
    if (status === 'flashcards' || status === 'exercises') {
      timerRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            toast.info(lang === 'de' ? 'Zeit abgelaufen! Du kannst die aktuelle Übung noch beenden.' : "Time's up! You can still finish your current exercise.");
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status, lang]);

  // ----- Session generation -----
  const generateSession = useCallback(async () => {
    if (!profile || sessionStartedRef.current) return;

    const [vocabRes, progressRes, exercisesRes] = await Promise.all([
      supabase.from('personal_vocabulary').select('id, word_de, translation_en, translation_custom, example_sentence, box_number, review_count').eq('user_id', profile.user_id).lte('next_review_at', new Date().toISOString()).order('next_review_at').limit(50),
      supabase.from('exercise_progress').select('exercise_id, completed, attempts').eq('user_id', profile.user_id),
      supabase.from('exercises').select('id, area, exercise_type, difficulty, sort_order, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en').neq('area', 'sprachbausteine').neq('area', 'listening'),
    ]);

    const dueCards = vocabRes.data || [];
    const progressMap = new Map((progressRes.data || []).map(p => [p.exercise_id, p]));
    const allExercises = (exercisesRes.data || []).filter(e => {
      const c = e.content as Record<string, unknown> | null;
      if (!c) return false;
      // match exercises need pairs or left/right arrays
      if (e.exercise_type === 'match') return Array.isArray(c.pairs) && c.pairs.length > 0 || Array.isArray(c.left) && (c.left as unknown[]).length > 0;
      return true;
    });

    // Flashcards — cap at 30% of time
    const maxFlashcardTime = minutes * 0.3;
    const maxCards = Math.floor(maxFlashcardTime / 0.3);
    const selectedCards = dueCards.slice(0, maxCards);
    const flashcardTime = selectedCards.length * 0.3;

    // Remaining time for exercises
    let remainingTime = minutes - flashcardTime;
    const selectedExercises: ExerciseItem[] = [];

    // Quick types for short sessions
    const quickTypes = new Set(['definition_match', 'multiple_choice', 'richtig_falsch', 'fill_in']);

    // 1. Failed exercises
    const failed = allExercises.filter(e => {
      const p = progressMap.get(e.id);
      return p && !p.completed && p.attempts > 0;
    });
    for (const ex of shuffleArray(failed)) {
      if (remainingTime <= 0) break;
      if (minutes <= 5 && !quickTypes.has(ex.exercise_type)) continue;
      const time = TIME_ESTIMATES[ex.exercise_type] || 1.5;
      if (time <= remainingTime) {
        selectedExercises.push(ex);
        remainingTime -= time;
      }
    }

    // 2. New exercises (untouched)
    const untouched = allExercises.filter(e => !progressMap.has(e.id));
    for (const ex of shuffleArray(untouched)) {
      if (remainingTime <= 0) break;
      if (minutes <= 5 && !quickTypes.has(ex.exercise_type)) continue;
      const time = TIME_ESTIMATES[ex.exercise_type] || 1.5;
      if (time <= remainingTime) {
        selectedExercises.push(ex);
        remainingTime -= time;
      }
    }

    if (selectedCards.length === 0 && selectedExercises.length === 0) {
      setStatus('empty');
      return;
    }

    // Create session row
    const { data: sessionData } = await supabase.from('daily_sessions').insert({
      user_id: profile.user_id,
      planned_minutes: minutes,
      exercises_planned: selectedCards.length + selectedExercises.length,
      exercise_ids: selectedExercises.map(e => e.id) as unknown as Json,
    }).select('id').single();

    sessionStartedRef.current = true;
    setSessionId(sessionData?.id || null);
    setFlashcards(selectedCards as VocabCard[]);
    setExercises(selectedExercises);
    setCurrentIndex(0);
    startTimeRef.current = new Date();
    setStatus(selectedCards.length > 0 ? 'flashcards' : 'exercises');
  }, [profile, minutes]);

  useEffect(() => { generateSession(); }, [generateSession]);

  // ----- Handlers -----
  const advance = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= totalItems) {
      endSession();
    } else if (nextIdx >= flashcards.length && status === 'flashcards') {
      setCurrentIndex(nextIdx);
      setStatus('exercises');
      setExerciseAnswer('');
      setExerciseFeedback(null);
    } else {
      setCurrentIndex(nextIdx);
      setShowAnswer(false);
      setExerciseAnswer('');
      setExerciseFeedback(null);
    }
  };

  const handleFlashcard = async (knewIt: boolean) => {
    const card = currentFlashcard;
    if (!card) return;
    const newBox = knewIt ? Math.min(card.box_number + 1, 5) : 1;
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + BOX_INTERVALS[newBox - 1]);

    await supabase.from('personal_vocabulary').update({
      box_number: newBox,
      next_review_at: nextReview.toISOString(),
      review_count: card.review_count + 1,
    }).eq('id', card.id);

    setFlashcardsReviewed(f => f + 1);
    advance();
  };

  const handleExerciseAnswer = async (correct: boolean) => {
    const ex = currentExercise;
    if (!ex || !profile) return;

    setExerciseFeedback({ correct, message: correct ? t('exercise_correct') : t('exercise_incorrect') });
    setExercisesCompleted(c => c + 1);
    setTotalAnswered(a => a + 1);
    if (correct) setCorrectCount(c => c + 1);

    // Upsert progress
    const { data: existing } = await supabase.from('exercise_progress').select('id, attempts, completed').eq('user_id', profile.user_id).eq('exercise_id', ex.id).maybeSingle();
    if (existing) {
      await supabase.from('exercise_progress').update({
        completed: correct || existing.completed,
        attempts: existing.attempts + 1,
        last_attempt_at: new Date().toISOString(),
        score: correct ? 100 : existing.completed ? undefined : 0,
      }).eq('id', existing.id);
    } else {
      await supabase.from('exercise_progress').insert({
        user_id: profile.user_id,
        exercise_id: ex.id,
        completed: correct,
        attempts: 1,
        last_attempt_at: new Date().toISOString(),
        score: correct ? 100 : 0,
      });
    }

    setTimeout(advance, 1500);
  };

  const renderDailyExercise = (ex: ExerciseItem) => {
    const content = ex.content as any;
    const solution = ex.solution as any;
    const instructions = lang === 'de' ? ex.instructions_de : ex.instructions_en;
    const explanation = lang === 'de' ? ex.explanation_de : ex.explanation_en;
    const answered = !!exerciseFeedback;

    const commonProps = {
      content,
      solution,
      instructions,
      explanation: explanation ?? undefined,
      answered,
      onAnswer: (correct: boolean) => handleExerciseAnswer(correct),
    };

    switch (ex.exercise_type) {
      case 'definition_match':
        return <DefinitionMatch {...commonProps} />;
      case 'fill_in':
        // Both grammar and vocabulary fill_in can use sentences[] format
        return (content?.sentences || content?.sentence) 
          ? (content?.sentences ? <GrammarFillIn {...commonProps} /> : <FillIn {...commonProps} />)
          : <GrammarFillIn {...commonProps} />;
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
        return <p className="text-muted-foreground">Unsupported: {ex.exercise_type}</p>;
    }
  };

  const endSession = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const elapsed = Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000);

    try {
      // Update session
      if (sessionId) {
        await supabase.from('daily_sessions').update({
          actual_seconds: elapsed,
          exercises_completed: exercisesCompleted,
          flashcards_reviewed: flashcardsReviewed,
          correct_count: correctCount,
          total_answered: totalAnswered,
          completed_at: new Date().toISOString(),
        }).eq('id', sessionId);
      }

      // Update streak
      if (profile) {
        const today = new Date().toISOString().slice(0, 10);
        const lastDate = profile.last_practice_date;
        let newStreak = 1;
        if (lastDate) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().slice(0, 10);
          if (lastDate === today) {
            newStreak = profile.current_streak;
          } else if (lastDate === yesterdayStr) {
            newStreak = profile.current_streak + 1;
          }
        }
        await supabase.from('profiles').update({
          current_streak: newStreak,
          last_practice_date: today,
        }).eq('user_id', profile.user_id);
        await refreshProfile();
      }
    } catch (e) {
      console.error('Error ending session:', e);
    }

    setStatus('completed');
  };

  // ----- Render -----
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');
  const progressPct = totalItems > 0 ? (currentIndex / totalItems) * 100 : 0;

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="space-y-6 text-center py-12">
        <CheckCircle className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-xl font-bold text-foreground">{lang === 'de' ? 'Alles erledigt!' : 'All done!'}</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {lang === 'de'
            ? 'Keine Übungen oder Karteikarten verfügbar. Probieren Sie Schreiben oder fügen Sie neue Vokabeln hinzu.'
            : 'No exercises or flashcards available. Try writing or add new vocabulary.'}
        </p>
        <Button onClick={() => navigate('/home')}>{lang === 'de' ? 'Zur Startseite' : 'Back to Home'}</Button>
      </div>
    );
  }

  if (status === 'completed') {
    const elapsed = Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000);
    const em = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const es = String(elapsed % 60).padStart(2, '0');
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    return (
      <div className="max-w-md mx-auto space-y-6 py-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          {lang === 'de' ? 'Geschafft!' : 'Done!'}
        </h2>
        <div className="space-y-3">
          <p className="text-foreground">
            {exercisesCompleted} / {exercises.length} {lang === 'de' ? 'Übungen abgeschlossen' : 'exercises completed'}
          </p>
          {flashcardsReviewed > 0 && (
            <p className="text-foreground">
              {flashcardsReviewed} {lang === 'de' ? 'Karteikarten wiederholt' : 'flashcards reviewed'}
            </p>
          )}
          <p className="text-muted-foreground">{lang === 'de' ? 'Zeit' : 'Time'}: {em}:{es}</p>
          {totalAnswered > 0 && (
            <div className="space-y-1">
              <Progress value={accuracy} className="h-3" />
              <p className="text-sm text-muted-foreground">{accuracy}% {lang === 'de' ? 'richtig' : 'correct'}</p>
            </div>
          )}
          {profile && (
            <p className="flex items-center justify-center gap-1 text-foreground">
              <Flame className="h-5 w-5 text-orange-500" />
              {lang === 'de' ? 'Serie' : 'Streak'}: {profile.current_streak} {lang === 'de' ? (profile.current_streak === 1 ? 'Tag' : 'Tage') : (profile.current_streak === 1 ? 'day' : 'days')}
            </p>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate('/home')}>
            {lang === 'de' ? 'Startseite' : 'Home'}
          </Button>
          <Button onClick={() => {
            sessionStartedRef.current = false;
            setStatus('loading');
            setExercises([]);
            setFlashcards([]);
            setCurrentIndex(0);
            setCorrectCount(0);
            setTotalAnswered(0);
            setExercisesCompleted(0);
            setFlashcardsReviewed(0);
            setSessionId(null);
            setSecondsLeft(minutes * 60);
            setExerciseAnswer('');
            setExerciseFeedback(null);
            generateSession();
          }}>
            {lang === 'de' ? 'Weiter üben' : 'Practice More'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={async () => {
          if (confirm(lang === 'de' ? 'Sitzung abbrechen? Dein Fortschritt wird gespeichert.' : 'End session? Your progress will be saved.')) {
            await endSession();
            navigate('/home');
          }
        }}>
          <ArrowLeft className="h-4 w-4 mr-1" />{lang === 'de' ? 'Startseite' : 'Home'}
        </Button>
        <h2 className="font-semibold text-foreground">{lang === 'de' ? 'Tagesplan' : 'Daily Practice'}</h2>
        <span className="font-mono text-sm text-muted-foreground">{mm}:{ss}</span>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <Progress value={progressPct} className="h-2" />
        <p className="text-xs text-muted-foreground text-center">{currentIndex} / {totalItems}</p>
      </div>

      {/* Flashcard */}
      {isFlashcardPhase && currentFlashcard && (
        <Card className="min-h-[250px] flex flex-col items-center justify-center">
          <CardContent className="py-8 text-center space-y-4 w-full">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {lang === 'de' ? 'Karteikarte' : 'Flashcard'}
            </p>
            <p className="text-xl font-bold text-foreground">{currentFlashcard.word_de}</p>
            {!showAnswer ? (
              <Button onClick={() => setShowAnswer(true)} variant="outline">
                <Eye className="h-4 w-4 mr-1" />{t('vocab_show_answer')}
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-lg text-foreground">→ {currentFlashcard.translation_en}</p>
                {currentFlashcard.translation_custom && <p className="text-sm text-muted-foreground">→ {currentFlashcard.translation_custom}</p>}
                <div className="flex gap-3 justify-center pt-2">
                  <Button onClick={() => handleFlashcard(true)} className="gap-1">
                    <CheckCircle className="h-4 w-4" />{t('vocab_knew_it')}
                  </Button>
                  <Button onClick={() => handleFlashcard(false)} variant="destructive" className="gap-1">
                    <XCircle className="h-4 w-4" />{t('vocab_didnt_know')}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Exercise */}
      {status === 'exercises' && currentExercise && renderDailyExercise(currentExercise)}

      {/* Bottom buttons */}
      <div className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={() => endSession()}>
          <StopCircle className="h-4 w-4 mr-1" />{lang === 'de' ? 'Sitzung beenden' : 'End Session'}
        </Button>
        <Button variant="ghost" size="sm" onClick={advance}>
          <SkipForward className="h-4 w-4 mr-1" />{lang === 'de' ? 'Überspringen' : 'Skip'}
        </Button>
      </div>
    </div>
  );
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
