import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Mic, PenLine, Headphones, Monitor, Brain, Shield, Code, ArrowLeft } from 'lucide-react';

const FEATURES = [
  { icon: BookOpen, title: 'telc C1 exam prep', desc: 'Reading, listening, writing, speaking — all exam sections with 1100+ exercises.' },
  { icon: PenLine, title: 'Writing with AI feedback', desc: 'Write essays and get them evaluated by Claude (Anthropic) using telc grading criteria.' },
  { icon: Monitor, title: 'IT German', desc: '200+ nouns with articles, verbs, collocations, idioms, dialogues, podcasts, and user stories from 12 industries.' },
  { icon: Mic, title: 'Audio for everything', desc: 'Every example sentence voiced with Google Cloud Neural2 TTS — no robot voice.' },
  { icon: Brain, title: 'Spaced repetition flashcards', desc: 'Mark any word or phrase — it lands in your personal vocabulary and gets reviewed on a Leitner schedule.' },
  { icon: Headphones, title: 'IT podcasts & dialogues', desc: 'Discovery sessions, refinements, Slack chats — real scenarios from your actual workday.' },
];

const TECH = [
  { name: 'React + TypeScript + Tailwind', role: 'Frontend' },
  { name: 'Supabase (PostgreSQL, Auth, Edge Functions)', role: 'Backend & database' },
  { name: 'Claude by Anthropic', role: 'AI writing evaluation + content creation + development' },
  { name: 'Gemini by Google', role: 'Partial content creation' },
  { name: 'Claude Code + Lovable', role: 'Development' },
  { name: 'Google Cloud TTS (Neural2)', role: 'Audio generation' },
  { name: 'NotebookLM', role: 'Podcast generation' },
  { name: 'PostHog (EU Cloud)', role: 'Anonymous analytics' },
  { name: 'GitHub Pages', role: 'Hosting' },
];

const SECURITY = [
  'API keys encrypted with AES-256-GCM',
  'Row-Level Security on all tables',
  'Passwords hashed with bcrypt',
  'No tracking cookies, no Facebook Pixel',
  'Data stored in the EU (Supabase Ireland, PostHog EU)',
  'Full account deletion available',
];

export default function AboutPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Back navigation */}
      <Button variant="ghost" size="sm" onClick={() => navigate(auth?.user ? '/home' : '/')}>
        <ArrowLeft className="h-4 w-4 mr-1" /> {auth?.user ? 'Startseite' : 'Back to home'}
      </Button>

      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">About C1 Werkstatt</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interactive telc C1 exam prep with IT-specific German — built by a Product Manager who needed it herself.
        </p>
        <p className="text-sm text-muted-foreground/70 max-w-2xl mx-auto">
          A companion to your C1 preparation, not a replacement for textbooks or courses. 100% free, no ads.
        </p>
      </div>

      {/* What it does */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">What the app gives you</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map(f => (
            <Card key={f.title}>
              <CardContent className="p-4 flex gap-3">
                <f.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* What's unique */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">What you won't find elsewhere</h2>
        <Card>
          <CardContent className="p-5 space-y-3 text-sm text-foreground">
            <p>
              <strong>IT German for your actual workday.</strong> No textbook covers how to moderate a refinement in German, argue in a sprint review, or diplomatically escalate in Slack. The IT section includes 200+ nouns with articles, 80+ collocations, dialogues, podcasts, and 120 user stories across 12 industries.
            </p>
            <p>
              <strong>100% free. No ads.</strong> This is a personal project opened for the community.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tech stack */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Code className="h-5 w-5" /> Built with
        </h2>
        <Card>
          <CardContent className="p-5">
            <div className="grid gap-2 sm:grid-cols-2">
              {TECH.map(t => (
                <div key={t.name} className="flex items-baseline gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  <span><span className="text-foreground font-medium">{t.name}</span> <span className="text-muted-foreground">— {t.role}</span></span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5" /> Security & privacy
        </h2>
        <Card>
          <CardContent className="p-5">
            <div className="grid gap-2 sm:grid-cols-2">
              {SECURITY.map(s => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-foreground">{s}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <div className="text-center text-sm text-muted-foreground space-y-1 pt-4 border-t">
        <p>
          Built by <a href="https://www.linkedin.com/in/ioanamarinescu/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Ioana Ognibeni</a>
        </p>
        <p>Approved by Jerry 🐕</p>
      </div>
    </div>
  );
}
