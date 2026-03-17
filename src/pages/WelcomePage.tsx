import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, PenTool, Headphones, MessageCircle, ArrowRight, Zap, Target, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const floatingEmojis = ['🇩🇪', '📚', '✍️', '🎧', '💬', '🎯', '⚡', '🏆'];

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
  { icon: BookOpen, title: 'Read real texts', desc: 'Newspaper articles, essays & exam formats', color: 'from-blue-500 to-cyan-400' },
  { icon: PenTool, title: 'Write with AI feedback', desc: 'Get instant corrections on your essays', color: 'from-violet-500 to-purple-400' },
  { icon: Headphones, title: 'Train your ear', desc: 'Listening exercises at C1 level', color: 'from-amber-500 to-orange-400' },
  { icon: MessageCircle, title: 'Speak confidently', desc: 'Workshop phrases & presentation skills', color: 'from-emerald-500 to-green-400' },
];

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
          <span className="text-xl font-bold">
            <span className="text-primary">C1</span> Werkstatt
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4" />
            Built for expats who actually want to pass telc C1
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            Deutsch C1 —
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-400 to-violet-500 bg-clip-text text-transparent">
              Einmal mit Profis arbeiten.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Interactive exercises, AI-powered feedback, and real exam formats — 
            everything you need to crush the telc C1, but also be prepared for the next Refinement meeting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="text-base px-8 h-12 rounded-xl shadow-lg shadow-primary/25" asChild>
              <Link to="/signup">
                Start learning for free
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
            className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-500" /> AI-powered</span>
            <span className="flex items-center gap-1.5"><Target className="h-4 w-4 text-emerald-500" /> Exam-focused</span>
            <span className="flex items-center gap-1.5">🇩🇪 Made for expats</span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8"
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
              Everything you need. Nothing you don't.
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Four skills. One platform. Zero fluff.
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

          {/* Software flavour card — distinct style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 relative rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 overflow-hidden"
          >
            <div className="flex items-start gap-5">
              <div className="inline-flex p-3 rounded-xl bg-foreground text-background shrink-0">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-foreground text-background text-xs font-mono font-bold tracking-wider uppercase mb-3">
                  Software flavour
                </div>
                <h3 className="text-xl font-bold mb-2">IT vocabulary to express complex thoughts</h3>
                <p className="text-muted-foreground">From standup updates to architecture discussions — finally say what you actually mean.</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Social proof */}
      <section className="px-6 py-24 md:py-32 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl font-semibold leading-relaxed mb-8">
              "I moved to Berlin, panicked about the C1 exam, 
              <span className="text-primary"> and then found this.</span> 
              {' '}It actually made studying feel like less of a chore."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Sarah, 28</p>
                <p className="text-xs text-muted-foreground">Software engineer from London → Berlin</p>
              </div>
            </div>
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
            Ready to stop procrastinating?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join other expats who are actually having fun preparing for C1. Free to start, no credit card needed.
          </p>
          <Button size="lg" className="text-base px-10 h-13 rounded-xl shadow-lg shadow-primary/25" asChild>
            <Link to="/signup">
              Let's go 🚀
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            <span className="text-primary">C1</span> Werkstatt
          </span>
          <span>© {new Date().getFullYear()} — Made with ❤️ for the expat community</span>
        </div>
      </footer>
    </div>
  );
}
