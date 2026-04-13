import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { track } from '@/lib/posthog';

const MAX_PER_DAY = 10;
const MAX_LENGTH = 1000;

export function FeedbackButton() {
  const auth = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!auth?.user) return null;

  const handleSubmit = async () => {
    if (!message.trim() || !auth.user) return;
    setSending(true);

    try {
      // Rate limit check
      const today = new Date().toISOString().slice(0, 10);
      const { count } = await supabase
        .from('feedback' as any)
        .select('*', { count: 'exact', head: true })
        .eq('user_id', auth.user.id)
        .gte('created_at', `${today}T00:00:00`);

      if ((count ?? 0) >= MAX_PER_DAY) {
        toast.error('Du hast heute schon 3x Feedback gegeben — morgen wieder!');
        setSending(false);
        return;
      }

      // Capture visible context: active tabs, headings, exercise titles
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
      toast.success('Danke für dein Feedback! Jerry 🐕 liest alles.');
      setMessage('');
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Fehler beim Senden');
    } finally {
      setSending(false);
    }
  };

  const form = (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        This app is for you — tell me how to make it better.
      </p>
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Schreib los..."
        maxLength={MAX_LENGTH}
        className="min-h-[120px] resize-none bg-white dark:bg-card ph-no-capture"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{message.length}/{MAX_LENGTH}</span>
        <Button onClick={handleSubmit} disabled={sending || !message.trim()} size="sm" className="gap-1">
          <Send className="h-3.5 w-3.5" />
          {sending ? 'Senden...' : 'Senden'}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: floating FAB */}
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-xl transition-all items-center justify-center"
        aria-label="Feedback geben"
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      {/* Mobile: static bar at bottom of page */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center gap-2 w-full py-3 border-t border-border text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        Give feedback
      </button>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="px-4 pb-8">
            <DrawerTitle className="text-lg font-semibold mb-4">Feedback</DrawerTitle>
            {form}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Feedback</DialogTitle>
            </DialogHeader>
            {form}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
