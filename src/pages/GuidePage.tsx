import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Calendar, Brain, Target, Layers, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import guideWortschatz from '@/assets/guide/guide-wortschatz.jpg';
import guideMeinWortschatz from '@/assets/guide/guide-mein-wortschatz.jpg';
import guideTagesplan from '@/assets/guide/guide-tagesplan.jpg';
import guideTipps from '@/assets/guide/guide-tipps.jpg';

interface Slide {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  points: { icon: React.ReactNode; text: string }[];
  color: string;
  image: string;
}

const slides: Slide[] = [
  {
    icon: <BookOpen className="h-10 w-10" />,
    title: 'Wortschatz',
    subtitle: 'So lernst du neue Wörter effektiv',
    color: 'from-primary/20 to-primary/5',
    image: guideWortschatz,
    points: [
      { icon: <Layers className="h-5 w-5 text-primary" />, text: 'Wähle ein Thema (z.B. Wirtschaft, Technik) und dein Niveau (B2 oder C1).' },
      { icon: <Target className="h-5 w-5 text-primary" />, text: 'Bearbeite vier Übungstypen: Definitionen zuordnen, Lückentext, Synonyme und Wortfamilien.' },
      { icon: <Brain className="h-5 w-5 text-primary" />, text: 'Klicke auf unbekannte Wörter in Lesetexten, um sie direkt zu deinem Wortschatz hinzuzufügen.' },
    ],
  },
  {
    icon: <RotateCcw className="h-10 w-10" />,
    title: 'Mein Wortschatz',
    subtitle: 'Dein persönliches Karteikasten-System',
    color: 'from-success/20 to-success/5',
    image: guideMeinWortschatz,
    points: [
      { icon: <Layers className="h-5 w-5 text-success" />, text: 'Alle gespeicherten Wörter landen in Box 1. Mit jeder richtigen Antwort steigen sie eine Box höher (bis Box 5).' },
      { icon: <Calendar className="h-5 w-5 text-success" />, text: 'Das System erinnert dich automatisch, wenn eine Karte zur Wiederholung fällig ist.' },
      { icon: <Target className="h-5 w-5 text-success" />, text: 'Du kannst eigene Wörter mit Übersetzung und Beispielsatz hinzufügen.' },
    ],
  },
  {
    icon: <Calendar className="h-10 w-10" />,
    title: 'Tagesplan',
    subtitle: 'Strukturiertes Üben in deinem Tempo',
    color: 'from-orange-500/20 to-orange-500/5',
    image: guideTagesplan,
    points: [
      { icon: <Target className="h-5 w-5 text-orange-500" />, text: 'Wähle, wie viel Zeit du hast (10, 20 oder 30 Minuten). Der Plan wird automatisch erstellt.' },
      { icon: <Brain className="h-5 w-5 text-orange-500" />, text: 'Zuerst wiederholst du fällige Karteikarten, dann folgen Grammatik- und Wortschatzübungen.' },
      { icon: <RotateCcw className="h-5 w-5 text-orange-500" />, text: 'Am Ende siehst du eine Zusammenfassung. Deine Serie (Streak) zählt die Tage in Folge.' },
    ],
  },
  {
    icon: <Brain className="h-10 w-10" />,
    title: 'Tipps für den Alltag',
    subtitle: 'So holst du das Beste heraus',
    color: 'from-purple-500/20 to-purple-500/5',
    image: guideTipps,
    points: [
      { icon: <Calendar className="h-5 w-5 text-purple-500" />, text: 'Nutze den Tagesplan jeden Tag — auch 10 Minuten helfen, eine Routine aufzubauen.' },
      { icon: <BookOpen className="h-5 w-5 text-purple-500" />, text: 'Lies regelmäßig Texte im Lesebereich und speichere unbekannte Wörter.' },
      { icon: <Target className="h-5 w-5 text-purple-500" />, text: 'Schreibe mindestens einen Text pro Woche im Schreibbereich und lass ihn bewerten.' },
    ],
  },
];

export default function GuidePage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const slide = slides[current];

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-foreground">So funktioniert die App</h1>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i === current ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
            )}
          />
        ))}
      </div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card min-h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="p-8"
          >
            {/* Header */}
            <div className={cn('inline-flex items-center gap-3 rounded-xl px-5 py-3 mb-5 bg-gradient-to-r', slide.color)}>
              {slide.icon}
              <div>
                <h2 className="text-xl font-bold text-foreground">{slide.title}</h2>
                <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
              </div>
            </div>

            {/* Screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-5 overflow-hidden rounded-xl border border-border shadow-sm"
            >
              <img
                src={slide.image}
                alt={slide.title}
                loading="lazy"
                className="w-full h-40 object-cover object-top"
              />
            </motion.div>

            {/* Points */}
            <div className="space-y-4">
              {slide.points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-0.5 shrink-0 rounded-lg bg-secondary p-2">
                    {point.icon}
                  </div>
                  <p className="text-foreground leading-relaxed text-sm">{point.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={prev}
          disabled={current === 0}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Zurück
        </Button>

        <span className="text-sm text-muted-foreground">
          {current + 1} / {slides.length}
        </span>

        {current < slides.length - 1 ? (
          <Button size="sm" onClick={next} className="gap-1">
            Weiter <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" onClick={() => navigate('/')} className="gap-1">
            Los geht's <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
