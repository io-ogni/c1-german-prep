import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flame, BookOpen, Star, Monitor, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { track } from '@/lib/posthog';
import { cn } from '@/lib/utils';

const INFO_SLIDES = [
  {
    icon: Flame,
    color: 'from-orange-500/20 to-orange-500/5',
    iconColor: 'text-orange-500',
    title: 'Daily Practice',
    image: '/guide-daily.png',
    points: [
      'Your most important tool — a timed mix of grammar, vocabulary, and IT exercises.',
      'Tailored to what you haven\'t mastered yet, or what you want to keep rehearsing. Failed exercises come back first.',
      'Use it every day, even just 5 minutes. That\'s how you build your streak.',
    ],
  },
  {
    icon: BookOpen,
    color: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-500',
    title: 'Exam Prep',
    image: '/guide-exam.png',
    points: [
      'Every section of the telc C1 exam: reading, listening, writing, speaking.',
      'Each has exercises AND targeted support material — Redemittel, Konnektoren, Sprachbausteine.',
      'Plus 130 verb flashcards with full conjugations — filter by irregular or separable.',
    ],
  },
  {
    icon: Star,
    color: 'from-yellow-500/20 to-yellow-500/5',
    iconColor: 'text-yellow-500',
    title: 'My Vocabulary',
    image: '/guide-wortschatz.png',
    points: [
      'Tap any word in a reading text, or click a row in any phrase table — it lands in your personal vocabulary.',
      'You\'ll review it with spaced repetition (Leitner system) until it sticks.',
      'Find it on the homepage or in the user menu.',
    ],
  },
  {
    icon: Monitor,
    color: 'from-fuchsia-500/20 to-fuchsia-500/5',
    iconColor: 'text-fuchsia-500',
    title: 'IT German',
    image: '/guide-it.png',
    points: [
      'Podcasts, dialogues, 235+ nouns, expressions for every meeting situation.',
      'Listen while cooking, commuting, or pretending to work — so they stick.',
      'Add anything to My Vocabulary for spaced repetition review.',
    ],
  },
];

const FOCUS_CHOICES = [
  {
    icon: BookOpen,
    title: 'Exam prep',
    subtitle: 'I\'m preparing for telc C1.',
    color: 'from-blue-500 to-cyan-400',
    path: '/grammar',
  },
  {
    icon: Monitor,
    title: 'IT German',
    subtitle: 'I want to communicate at work in German.',
    color: 'from-fuchsia-500 to-pink-400',
    path: '/it-deutsch/vokabular',
  },
  {
    icon: Zap,
    title: 'Just practice',
    subtitle: 'I want to improve my German.',
    color: 'from-amber-500 to-orange-400',
    path: '/daily-practice?minutes=10',
  },
] as const;

export function OnboardingOverlay() {
  const navigate = useNavigate();
  const { profile, refreshProfile } = useRequiredAuth();
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const touchStartX = useRef(0);

  const totalSteps = INFO_SLIDES.length + 1; // 4 info + 1 picker
  const isLastInfo = step === INFO_SLIDES.length - 1;
  const isPicker = step === INFO_SLIDES.length;

  const dismiss = useCallback(async (path: string) => {
    setDismissed(true);
    if (profile) {
      await supabase
        .from('profiles')
        .update({ onboarding_completed_at: new Date().toISOString() })
        .eq('user_id', profile.user_id);
      await refreshProfile();
      track('onboarding_completed', { focus: path });
    }
    navigate(path);
  }, [profile, refreshProfile, navigate]);

  const next = () => setStep(s => Math.min(s + 1, totalSteps - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    if (delta > 50) prev();
  };

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm px-4 py-6 overflow-y-auto"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md space-y-4"
      >
        {/* Welcome header */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground">Welcome to C1 Werkstatt</h1>
          <p className="text-sm text-muted-foreground">Here's what you can do.</p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === step ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/25'
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            {!isPicker ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border bg-card overflow-hidden"
              >
                {/* Header */}
                {(() => {
                  const slide = INFO_SLIDES[step];
                  const Icon = slide.icon;
                  return (
                    <>
                      <div className={cn('flex items-center gap-3 px-5 py-4 bg-gradient-to-r', slide.color)}>
                        <Icon className={cn('h-8 w-8', slide.iconColor)} />
                        <h2 className="text-lg font-bold text-foreground">{slide.title}</h2>
                      </div>

                      {/* Image — desktop only */}
                      <div className="hidden md:block border-b overflow-hidden max-h-[200px]">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full object-cover object-top"
                        />
                      </div>

                      {/* Points */}
                      <div className="p-5 space-y-3">
                        {slide.points.map((point, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            className="flex items-start gap-3"
                          >
                            <span className="shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-primary" />
                            <p className="text-sm text-foreground leading-relaxed">{point}</p>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div
                key="picker"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-bold text-foreground">Where do you want to start?</h2>
                  <p className="text-sm text-muted-foreground">You can always explore everything. This is just your starting point.</p>
                </div>
                <div className="space-y-3">
                  {FOCUS_CHOICES.map((choice, i) => (
                    <motion.button
                      key={choice.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      onClick={() => dismiss(choice.path)}
                      className="w-full flex items-center gap-4 rounded-xl border bg-card p-4 text-left transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                      <div className={`shrink-0 inline-flex p-3 rounded-xl bg-gradient-to-br ${choice.color}`}>
                        <choice.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{choice.title}</p>
                        <p className="text-sm text-muted-foreground">{choice.subtitle}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {!isPicker && (
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={prev} disabled={step === 0} className="text-muted-foreground">
              Back
            </Button>
            <span className="text-xs text-muted-foreground">{step + 1} / {totalSteps}</span>
            <Button size="sm" onClick={next} className="px-5">
              {isLastInfo ? "Let's go" : 'Next'}
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
