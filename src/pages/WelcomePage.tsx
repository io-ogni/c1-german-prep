import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, PenTool, Headphones, MessageCircle, ArrowRight, Zap, Target, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PREVIEW_IMAGES = [
  { src: '/app-preview.png', alt: 'Homepage with progress tracking and vocabulary review' },
  { src: '/preview-grammar.png', alt: 'Grammar exercises — match Funktionsverbgefüge to verbs' },
  { src: '/preview-vocabulary.png', alt: 'Spaced repetition flashcards for your personal vocabulary' },
  { src: '/preview-it-deutsch.png', alt: 'IT Deutsch — Souveränität phrases for tech meetings' },
  { src: '/preview-reading.png', alt: 'Reading exercise — Textrekonstruktion with dropdown gap-fill' },
];


const floatingEmojis = ['🇩🇪', '✍️', '📚', '🎧', '💬', '🎯', '⚡', '🏆'];

function FloatingEmoji({ emoji, delay, x, y }: { emoji: string; delay: number; x: number; y: number }) {
  return (
    <motion.span
      className="absolute text-2xl md:text-3xl select-none pointer-events-none opacity-20"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {emoji}
    </motion.span>
  );
}

const features = [
  { icon: BookOpen, title: 'Read real texts', desc: 'Newspaper articles, essays & exam formats. Select any word from the text to add it to your vocabulary, and rehearse as often as you want.', color: 'from-blue-500 to-cyan-400' },
  { icon: PenTool, title: 'Write with AI feedback', desc: 'Get instant corrections on your essays. No API key? No problem — you\'ll get a perfectly shaped prompt to assess your essay in your own LLM.', color: 'from-violet-500 to-purple-400' },
  { icon: Headphones, title: 'Train your ear', desc: 'C1 listening exercises, realistic recorded meetings, and text-to-speech for every German sentence in the app.', color: 'from-amber-500 to-orange-400' },
  { icon: MessageCircle, title: 'Speak confidently', desc: 'Workshop phrases, presentation skills, and expressions for every situation — including how to save face in German when you didn\'t catch what was said.', color: 'from-emerald-500 to-green-400' },
];

function PreviewCarousel() {
  const [current, setCurrent] = useState(0);
  const len = PREVIEW_IMAGES.length;

  const next = useCallback(() => setCurrent(i => (i + 1) % len), [len]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="px-6 py-16 md:py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-2xl border border-border shadow-2xl shadow-primary/10 overflow-hidden h-[60vh] md:h-[70vh]">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={PREVIEW_IMAGES[current].src}
                alt={PREVIEW_IMAGES[current].alt}
                className="absolute inset-0 w-full h-full object-cover object-left-top md:object-top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted/80 to-transparent pointer-events-none" />
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {PREVIEW_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-muted-foreground/25'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Floating emojis */}
        {floatingEmojis.map((emoji, i) => (
          <FloatingEmoji
            key={i}
            emoji={emoji}
            delay={i * 0.5}
            x={10 + (i * 11) % 80}
            y={10 + ((i * 17) % 70)}
          />
        ))}

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 py-5"
        >
          <span className="text-xl font-bold flex items-center gap-2">
            <img src="/logo.png" alt="C1" className="h-11 w-11 rounded-lg" /> <span className="hidden sm:inline bg-gradient-to-r from-blue-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Werkstatt</span>
          </span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">Sign up free</Link>
            </Button>
          </div>
        </motion.nav>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-100 text-fuchsia-600 font-semibold dark:bg-fuchsia-900/30 dark:text-fuchsia-300 text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4" />
            Built for the IT industry
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-3"
          >
            The Real Deutsch C1
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary via-blue-400 to-violet-500 bg-clip-text text-transparent mb-6"
          >
            Einmal mit Profis arbeiten ;)
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-14 leading-relaxed"
          >
            Free C1 prep built for tech professionals in Germany — from Refinement auf Deutsch to your telc exam. 980+ exercises, IT vocabulary, and AI writing feedback.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="text-base px-8 h-12 rounded-xl shadow-lg shadow-primary/25" asChild>
              <Link to="/signup">
                Start learning (all free)
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-12 rounded-xl" asChild>
              <Link to="/login">I already have an account</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 mb-2 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1">⚛️ AI-powered</span>
            <span className="flex items-center gap-1">🍦 IT-flavoured</span>
            <span className="flex items-center gap-1">🇩🇪 B2 → C1</span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              For IT expats who don't just want to pass an exam, but actually be free in their everyday work in German.
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Four skills. One platform. Zero fluff. (Just dog hair.)
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border bg-card p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} mb-5`}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          {/* IT Deutsch card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 relative rounded-2xl border-2 border-dashed border-pink-500/40 bg-gradient-to-br from-pink-500/10 via-fuchsia-500/10 to-violet-500/5 p-8 overflow-hidden"
          >
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white mb-5">
              <Code className="h-6 w-6" />
            </div>
            <div className="block w-fit px-2.5 py-0.5 rounded-md bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white text-xs font-mono font-bold tracking-wider uppercase mb-3">
              Deutsch für IT-ler
            </div>
            <h3 className="text-xl font-bold mb-2">From standup updates to architecture discussions — finally say what you actually mean.</h3>
            <p className="text-muted-foreground">120 user stories from 12 industries, podcasts, and expressions for your daily work. Plus 235 nouns with that gender you always mess up.</p>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* App preview carousel */}
      <PreviewCarousel />

      {/* Numbers */}
      <section className="px-6 py-20 md:py-28 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center"
          >
            {[
              { num: '980+', label: 'Exercises' },
              { num: '235+', label: 'IT nouns' },
              { num: '120', label: 'User Stories from 12 industries' },
              { num: '130', label: 'Verbs with full conjugations' },
              { num: '500+', label: 'Audio files (Neural2 TTS)' },
              { num: '100%', label: 'Free, no ads' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{s.num}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Ready to stop starting and start finishing?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Tired of starting C1 exercise books and never finishing them? This app is an interactive alternative to boring learning — and it's completely free, because Jerry 🐕 likes it that way.
          </p>
          <Button size="lg" className="text-base px-10 h-13 rounded-xl shadow-lg shadow-primary/25" asChild>
            <Link to="/signup">
              Let's go
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground space-y-4">
          <div>
            Built by <a href="https://ioana-ognibeni.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ioana Ognibeni</a> with{' '}
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> &{' '}
            <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lovable</a>.
            {' '}Approved by Jerry the 🐕
          </div>
          <a href="/about" className="text-xs text-primary hover:underline">About this app →</a>
        </div>
      </footer>
    </div>
  );
}
