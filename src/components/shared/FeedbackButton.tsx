import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, CheckCircle, X } from 'lucide-react';
import { track } from '@/lib/posthog';

const MAX_PER_DAY = 10;
const MAX_LENGTH = 1000;

export function FeedbackButton() {
  const auth = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!auth?.user) return null;

  const handleSubmit = async () => {
    if (!message.trim() || !auth.user) return;
    setSending(true);

    try {
      const today = new Date().toISOString().slice(0, 10);
      const { count } = await supabase
        .from('feedback' as any)
        .select('*', { count: 'exact', head: true })
        .eq('user_id', auth.user.id)
        .gte('created_at', `${today}T00:00:00`);

      if ((count ?? 0) >= MAX_PER_DAY) {
        setMessage('Du hast heute schon 3x Feedback gegeben — morgen wieder!');
        setSending(false);
        return;
      }

      const activeTab = document.querySelector('[data-state="active"]')?.textContent?.trim() ?? '';
      const heading = document.querySelector('h1, h2')?.textContent?.trim() ?? '';
      const pageContext = [location.pathname, activeTab, heading].filter(Boolean).join(' — ');

      const { error } = await supabase.from('feedback' as any).insert({
        user_id: auth.user.id,
        page: pageContext,
        message: message.trim().slice(0, MAX_LENGTH),
      });

      if (error) throw error;

      track('feedback_submitted', { page: location.pathname, length: message.trim().length });
      setMessage('');
      setSent(true);
      setTimeout(() => { setSent(false); setOpen(false); }, 2500);
    } catch (err: any) {
      setMessage(prev => prev || 'Fehler beim Senden — bitte versuche es nochmal.');
    } finally {
      setSending(false);
    }
  };

  const formContent = sent ? (
    <div className="flex flex-col items-center gap-2 py-4">
      <CheckCircle className="h-8 w-8 text-primary" />
      <p className="text-sm font-medium text-foreground">Danke für dein Feedback!</p>
      <p className="text-xs text-muted-foreground">Jerry liest alles. 🐕</p>
    </div>
  ) : (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Feedback</p>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        Help me build the best tool for your C1 journey: share your feedback, ideas, or bug reports.
      </p>
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Schreib los..."
        maxLength={MAX_LENGTH}
        className="min-h-[100px] resize-none bg-white dark:bg-background ph-no-capture"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{message.length}/{MAX_LENGTH}</span>
        <Button onClick={handleSubmit} disabled={sending || !message.trim()} size="sm" className="gap-1">
          <Send className="h-3.5 w-3.5" />
          {sending ? 'Senden...' : 'Senden'}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* ─── Desktop: FAB + floating card ─── */}
      <div className="hidden lg:block">
        {!open && (
          <button
            onClick={() => { setOpen(true); setSent(false); }}
            className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            aria-label="Feedback geben"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
        )}
        {open && (
          <div className="fixed bottom-6 right-6 z-40 w-96 rounded-lg border border-border bg-card p-4 space-y-3 shadow-xl">
            {formContent}
          </div>
        )}
      </div>

      {/* ─── Mobile: inline in footer ─── */}
      <div className="lg:hidden w-full">
        {!open && (
          <button
            onClick={() => { setOpen(true); setSent(false); }}
            className="flex items-center justify-center gap-2 w-full py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageCircle className="h-4 w-4 text-primary" />
            Give feedback
          </button>
        )}
        {open && (
          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            {formContent}
          </div>
        )}
      </div>
    </>
  );
}
