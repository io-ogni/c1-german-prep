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
    <div className="h-screen bg-background overflow-y-auto snap-y snap-mandatory">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 snap-start">
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
            Interactive exercises, real-life examples and AI feedback —
            everything you need from B2 to C1 and your next Refinement meeting.
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
            className="mt-6 mb-2 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-amber-500" /> AI-powered</span>
            <span className="flex items-center gap-1"><Target className="h-3.5 w-3.5 text-fuchsia-500" /> IT-flavoured</span>
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
      <section className="relative px-6 py-24 md:py-32 snap-start snap-always">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              For B2 IT expats who want more than just pass the C1 exam.
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
            <h3 className="text-xl font-bold mb-2">IT vocabulary to express complex thoughts</h3>
            <p className="text-muted-foreground">From standup updates to architecture discussions — finally say what you actually mean.</p>
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
              "This time, I don't want just to pass the exam, I want to be
              <span className="text-primary"> freaking free</span>
              {' '}in my everyday work in IT."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                I
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Ioana, Product Manager</p>
                <p className="text-xs text-muted-foreground">Was bored of all language tools and made this app instead</p>
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
            Join other expats who are actually having fun preparing for C1. 100% free — no ads, no costs.
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
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground flex items-center gap-2">
            <img src="/logo.png" alt="C1" className="h-5 w-5 rounded-sm" /> <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Werkstatt</span>
          </span>
          <div className="text-center">
            Built by <a href="https://ioana-ognibeni.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ioana Ognibeni</a> with{' '}
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> &{' '}
            <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lovable</a>.
            {' '}Approved by Jerry the 🐕
          </div>
        </div>
      </footer>
    </div>
  );
}
