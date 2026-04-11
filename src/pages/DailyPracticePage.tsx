import { Component, useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { track } from '@/lib/posthog';
import {
  ArrowLeft, CheckCircle, XCircle, Eye, Flame, StopCircle, Loader2, Trophy, Sparkles,
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
import { ErrorCorrection } from '@/components/vocabulary/exercises/ErrorCorrection';
import { AntonymMatch } from '@/components/vocabulary/exercises/AntonymMatch';
import { Sprachbausteine } from '@/components/grammar/exercises/Sprachbausteine';

// ----- Safety net: catches render errors in exercise components -----
class ExerciseSafetyNet extends Component<{ children: ReactNode; onSkip: () => void }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Exercise render error:', error, info);
  }
  componentDidUpdate(prevProps: { children: ReactNode }) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border p-6 text-center space-y-3">
          <p className="text-sm text-muted-foreground">Diese Übung kann nicht angezeigt werden.</p>
          <button onClick={this.props.onSkip} className="text-sm font-medium text-primary hover:underline">
            Überspringen →
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
  definition_match: 0.3, multiple_choice: 0.3, richtig_falsch: 0.3,
  fill_in: 0.4, word_family: 0.4,
  synonym_match: 0.5, match: 0.5,
  transform: 0.6, sentence_build: 0.6,
};

const BOX_INTERVALS = [1, 3, 7, 14, 30, 90];
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
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardExitAnim, setCardExitAnim] = useState<'left' | 'right' | null>(null);
  const [cardFeedback, setCardFeedback] = useState<string | null>(null);
  const [cardFeedbackType, setCardFeedbackType] = useState<'correct' | 'wrong' | null>(null);
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

  // ----- Keyboard shortcuts -----
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept when typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (isFlashcardPhase && currentFlashcard) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!cardFlipped) setCardFlipped(true);
        }
        if (cardFlipped) {
          if (e.key === 'ArrowRight' || e.key === '1') { e.preventDefault(); handleFlashcard(true); }
          if (e.key === 'ArrowLeft' || e.key === '2') { e.preventDefault(); handleFlashcard(false); }
        }
      }

      // Enter to skip during exercise feedback delay
      if (status === 'exercises' && exerciseFeedback && e.key === 'Enter') {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFlashcardPhase, currentFlashcard, showAnswer, status, exerciseFeedback]);

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

    // Deduplicate vocab cards by word_de (same word can exist from multiple sources)
    const rawCards = vocabRes.data || [];
    const seenWords = new Set<string>();
    const dueCards = rawCards.filter(c => {
      const key = c.word_de.toLowerCase();
      if (seenWords.has(key)) return false;
      seenWords.add(key);
      return true;
    });
    const progressMap = new Map((progressRes.data || []).map(p => [p.exercise_id, p]));
    const allExercises = (exercisesRes.data || []).filter(e => {
      const c = e.content as Record<string, unknown> | null;
      if (!c || Object.keys(c).length === 0) return false;
      switch (e.exercise_type) {
        case 'match': return (Array.isArray(c.pairs) && c.pairs.length > 0) || (Array.isArray(c.left) && (c.left as unknown[]).length > 0);
        case 'definition_match': return !!c.word || !!c.options;
        case 'fill_in': return !!c.sentence || !!c.original || (Array.isArray(c.sentences) && c.sentences.length > 0);
        case 'synonym_match': return Array.isArray(c.pairs) && c.pairs.length > 0;
        case 'word_family': return !!c.word || !!c.base_word || !!c.given;
        case 'transform': return !!c.original || (Array.isArray(c.sentences) && c.sentences.length > 0);
        case 'sentence_build': return !!(c.sentence_a || (Array.isArray(c.sentences) && c.sentences.length > 0));
        case 'multiple_choice': return Array.isArray(c.options) && c.options.length > 0;
        case 'error_correction': return !!(c.sentence || c.wrong_word || (Array.isArray(c.sentences) && c.sentences.length > 0));
        case 'antonym_match': return Array.isArray(c.pairs) && c.pairs.length > 0;
        case 'sprachbausteine': return !!c.text;
        default: return false;
      }
    });

    // Flashcards — cap at 30% of time
    const maxFlashcardTime = minutes * 0.3;
    const maxCards = Math.floor(maxFlashcardTime / 0.1);
    const selectedCards = dueCards.slice(0, maxCards);
    const flashcardTime = selectedCards.length * 0.1;

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
    track('daily_session_started', { minutes_selected: minutes, flashcard_count: selectedCards.length, exercise_count: selectedExercises.length });
  }, [profile, minutes]);

  useEffect(() => { generateSession(); }, [generateSession]);

  // ----- Handlers -----
  const advance = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= totalItems) {
      endSession(true);
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

  const CARD_SUCCESS = ["Perfekt! 🔥", "Stark! 💪", "Genau! ✨", "Weiter so! 🚀", "Klasse! 🌟"];
  const CARD_FAIL = ["Nächstes Mal! 💡", "Dranbleiben! 🧠", "Kommt noch! 🌱"];

  const handleFlashcard = async (knewIt: boolean) => {
    const card = currentFlashcard;
    if (!card) return;

    setCardExitAnim(knewIt ? 'right' : 'left');
    const msgs = knewIt ? CARD_SUCCESS : CARD_FAIL;
    setCardFeedback(msgs[Math.floor(Math.random() * msgs.length)]);
    setCardFeedbackType(knewIt ? 'correct' : 'wrong');

    const newBox = knewIt ? Math.min(card.box_number + 1, 6) : 1;
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + BOX_INTERVALS[newBox - 1]);

    await supabase.from('personal_vocabulary').update({
      box_number: newBox,
      next_review_at: nextReview.toISOString(),
      review_count: card.review_count + 1,
    }).eq('id', card.id);

    setFlashcardsReviewed(f => f + 1);

    setTimeout(() => {
      setCardFlipped(false);
      setCardExitAnim(null);
      requestAnimationFrame(() => advance());
      setTimeout(() => { setCardFeedback(null); setCardFeedbackType(null); }, 1200);
    }, 350);
  };

  const handleExerciseAnswer = async (correct: boolean) => {
    const ex = currentExercise;
    if (!ex || !profile) return;

    setExerciseFeedback({ correct, message: correct ? t('exercise_correct') : t('exercise_incorrect') });
    setExercisesCompleted(c => c + 1);
    setTotalAnswered(a => a + 1);
    if (correct) setCorrectCount(c => c + 1);
    track('daily_exercise_answered', { correct });

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

    if (correct) {
      setTimeout(advance, 1500);
    }
  };

  const renderDailyExercise = (ex: ExerciseItem) => {
    let content = ex.content as any;
    const solution = ex.solution as any;
    const instructions = lang === 'de' ? ex.instructions_de : ex.instructions_en;
    const explanation = lang === 'de' ? ex.explanation_de : ex.explanation_en;
    const answered = !!exerciseFeedback;

    // Fallback: if definition_match has options but no word, use exercise title
    if (ex.exercise_type === 'definition_match' && content?.options && !content.word) {
      content = { ...content, word: lang === 'de' ? ex.title_de : ex.title_en };
    }

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
        // sentences[] → multi-step GrammarFillIn; sentence+options → vocab FillIn; original/fallback → GrammarFillIn
        return content?.sentences
          ? <GrammarFillIn {...commonProps} />
          : (content?.sentence && content?.options)
            ? <FillIn {...commonProps} />
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
      case 'error_correction':
        return <ErrorCorrection {...commonProps} />;
      case 'antonym_match':
        return <AntonymMatch {...commonProps} />;
      case 'sprachbausteine':
        return <Sprachbausteine {...commonProps} />;
      default:
        return <p className="text-muted-foreground">Unsupported: {ex.exercise_type}</p>;
    }
  };

  const endSession = async (sessionCompleted = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const elapsed = Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000);
    const totalItems = flashcards.length + exercises.length;

    track(sessionCompleted ? 'daily_session_completed' : 'daily_session_cancelled', {
      minutes_selected: minutes,
      elapsed_seconds: elapsed,
      exercises_completed: exercisesCompleted,
      flashcards_reviewed: flashcardsReviewed,
      accuracy: totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0,
      streak: profile?.current_streak ?? 0,
      ...(!sessionCompleted && { cancel_point: `${currentIndex}/${totalItems}` }),
    });

    try {
      // Update session
      if (sessionId) {
        await supabase.from('daily_sessions').update({
          actual_seconds: elapsed,
          exercises_completed: exercisesCompleted,
          flashcards_reviewed: flashcardsReviewed,
          correct_count: correctCount,
          total_answered: totalAnswered,
          completed_at: sessionCompleted ? new Date().toISOString() : null,
        }).eq('id', sessionId);
      }

      // Update streak only if session was completed (not cancelled)
      if (profile && sessionCompleted) {
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

    if (sessionCompleted) {
      setStatus('completed');
    }
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
      <div className="max-w-md mx-auto space-y-6 text-center py-12">
        <div className="relative mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{lang === 'de' ? 'Du hast literally alles gemacht.' : 'You literally did everything.'}</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {lang === 'de'
              ? 'Respect. Probier Schreiben mit AI-Feedback oder füge neue Vokabeln hinzu.'
              : 'Respect. Try writing with AI feedback or add new vocabulary.'}
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate('/home')}>{lang === 'de' ? 'Startseite' : 'Home'}</Button>
          <Button onClick={() => navigate('/writing')}>{lang === 'de' ? 'Schreiben üben' : 'Practice Writing'}</Button>
        </div>
      </div>
    );
  }

  if (status === 'completed') {
    const elapsed = Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000);
    const em = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const es = String(elapsed % 60).padStart(2, '0');
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    return (
      <div className="max-w-md mx-auto space-y-6 py-8 text-center animate-in fade-in duration-500">
        {/* Trophy */}
        <div className="relative mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Trophy className="w-12 h-12 text-primary" />
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {lang === 'de' ? 'Geschafft!' : 'Done!'} 🎉
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === 'de' ? `${em}:${es} gut investiert.` : `${em}:${es} well spent.`}
          </p>
        </div>

        {/* Score ring */}
        {totalAnswered > 0 && (
          <div className="relative mx-auto w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="stroke-secondary" />
              <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="stroke-primary" strokeLinecap="round"
                strokeDasharray={`${accuracy * 2.64} ${264 - accuracy * 2.64}`}
                style={{ transition: 'stroke-dasharray 1s ease-out' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-foreground">{accuracy}%</span>
          </div>
        )}

        {/* Stats */}
        <div className="flex justify-center gap-6 text-sm">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{exercisesCompleted}</p>
            <p className="text-xs text-muted-foreground">{lang === 'de' ? 'Übungen' : 'Exercises'}</p>
          </div>
          {flashcardsReviewed > 0 && (
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{flashcardsReviewed}</p>
              <p className="text-xs text-muted-foreground">{lang === 'de' ? 'Karten' : 'Cards'}</p>
            </div>
          )}
          {totalAnswered > 0 && (
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{correctCount}/{totalAnswered}</p>
              <p className="text-xs text-muted-foreground">{lang === 'de' ? 'Richtig' : 'Correct'}</p>
            </div>
          )}
        </div>

        {/* Streak */}
        {profile && (
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 rounded-full px-4 py-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-bold text-foreground">{profile.current_streak} {lang === 'de' ? (profile.current_streak === 1 ? 'Tag' : 'Tage') : (profile.current_streak === 1 ? 'day' : 'days')}</span>
            <span className="text-xs text-muted-foreground">{lang === 'de' ? 'am Stück' : 'streak'}</span>
          </div>
        )}

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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />{lang === 'de' ? 'Startseite' : 'Home'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{lang === 'de' ? 'Sitzung abbrechen?' : 'End session?'}</AlertDialogTitle>
              <AlertDialogDescription>
                {lang === 'de' ? 'Dein Übungsfortschritt wird gespeichert, aber die Serie zählt nur bei abgeschlossenen Sitzungen.' : 'Your exercise progress will be saved, but the streak only counts for completed sessions.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{lang === 'de' ? 'Weiter üben' : 'Keep going'}</AlertDialogCancel>
              <AlertDialogAction onClick={async () => { await endSession(); navigate('/home'); }}>
                {lang === 'de' ? 'Abbrechen' : 'End session'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
        <div className="flex flex-col items-center gap-4 relative rounded-2xl border border-border bg-muted/30 p-4 sm:p-6">
          {/* Feedback toast */}
          {cardFeedback && (
            <div className={cn(
              'absolute top-2 z-10 px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce',
              cardFeedbackType === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
            )}>
              {cardFeedback}
            </div>
          )}

          {/* Flip card */}
          <div
            className={cn(
              'w-full max-w-xl cursor-pointer select-none',
              cardExitAnim === 'right' && 'animate-slide-out-right',
              cardExitAnim === 'left' && 'animate-slide-out-left',
            )}
            onClick={() => !cardFlipped && setCardFlipped(true)}
            style={{ perspective: '1200px' }}
          >
            <div
              className={cn(
                'relative w-full min-h-[220px] transition-transform duration-500',
                cardFlipped && '[transform:rotateY(180deg)]',
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-2xl border-2 border-border bg-card p-6 flex flex-col items-center justify-center text-center shadow-lg"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] text-muted-foreground">Box {currentFlashcard.box_number}/6</span>
                </div>
                <p className="text-xl font-bold text-foreground">{currentFlashcard.word_de}</p>
                <div className="mt-4 flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Klicken zum Aufdecken</span>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl border-2 border-primary/30 bg-card p-6 flex flex-col items-center justify-center text-center shadow-lg"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">Antwort</span>
                </div>
                <p className="text-lg font-bold text-foreground mb-3">{currentFlashcard.word_de}</p>
                <p className="text-base text-foreground">→ {currentFlashcard.translation_en}</p>
                {currentFlashcard.translation_custom && (
                  <p className="text-sm text-muted-foreground mt-1">→ {currentFlashcard.translation_custom}</p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full max-w-xl">
            {!cardFlipped ? (
              <div className="flex justify-center">
                <Button size="sm" onClick={() => setCardFlipped(true)}>
                  <Eye className="w-4 h-4 mr-1" /> Aufdecken
                </Button>
              </div>
            ) : (
              <div className="flex justify-center gap-3">
                <Button onClick={() => handleFlashcard(false)} variant="destructive" size="sm" className="gap-1">
                  <XCircle className="h-4 w-4" /> {t('vocab_didnt_know')}
                </Button>
                <Button onClick={() => handleFlashcard(true)} size="sm" className="gap-1">
                  <CheckCircle className="h-4 w-4" /> {t('vocab_knew_it')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Exercise */}
      {status === 'exercises' && currentExercise && (
        <ExerciseSafetyNet onSkip={advance}>
          {renderDailyExercise(currentExercise)}
        </ExerciseSafetyNet>
      )}

      {/* Bottom buttons */}
      <div className="flex justify-between items-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <StopCircle className="h-4 w-4 mr-1" />{lang === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{lang === 'de' ? 'Sitzung abbrechen?' : 'End session?'}</AlertDialogTitle>
              <AlertDialogDescription>
                {lang === 'de' ? 'Dein Übungsfortschritt wird gespeichert, aber die Serie zählt nur bei abgeschlossenen Sitzungen.' : 'Your exercise progress will be saved, but the streak only counts for completed sessions.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{lang === 'de' ? 'Weiter üben' : 'Keep going'}</AlertDialogCancel>
              <AlertDialogAction onClick={async () => { await endSession(); navigate('/home'); }}>
                {lang === 'de' ? 'Abbrechen' : 'End session'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {exerciseFeedback && !exerciseFeedback.correct && (
          <Button onClick={advance} size="sm">
            {lang === 'de' ? 'Weiter' : 'Next'}
          </Button>
        )}
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
