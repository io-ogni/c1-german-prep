import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, BookOpen, Headphones, PenLine } from 'lucide-react';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function SignupPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const captchaRef = useRef<TurnstileInstance>(null);
  const [captchaToken, setCaptchaToken] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t('auth_passwords_no_match'));
      return;
    }
    if (TURNSTILE_SITE_KEY && !captchaToken) {
      toast.error('Bitte warte, bis die CAPTCHA-Überprüfung abgeschlossen ist.');
      return;
    }
    setLoading(true);

    const { error } = await auth!.signup(email, password, displayName, captchaToken);
    setLoading(false);
    captchaRef.current?.reset();
    setCaptchaToken(undefined);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm text-center">
          <CardContent className="pt-6 space-y-3">
            <p className="text-lg font-semibold text-foreground">✉️</p>
            <p className="text-sm text-muted-foreground">{t('auth_check_email')}</p>
            <Link to="/login" className="text-sm font-medium text-primary hover:underline">{t('auth_login')}</Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-blue-500 to-violet-600">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Start your journey
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-4">
              Dein non-boring
              <br />
              Weg zur C1
              <br />
              Prüfung.
            </h1>
            <p className="text-lg text-white/80 max-w-sm leading-relaxed">
              Interactive exercises, real-life vocabulary, and AI feedback — everything you need from B2 to C1.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 flex gap-4"
          >
            {[
              { icon: BookOpen, label: 'Lesen & Hören' },
              { icon: PenLine, label: 'Schreiben mit AI' },
              { icon: Headphones, label: 'IT-Deutsch' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 flex items-center gap-2">
                <s.icon className="h-4 w-4" />
                <p className="text-xs text-white/90">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mb-8">
            <h2 className="text-2xl font-bold lg:hidden mb-1">
              <span className="text-primary">C1</span> Werkstatt
            </h2>
            <h3 className="text-2xl font-bold">{t('auth_signup')}</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Kostenlos starten · Kein Abo nötig
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div className="space-y-2">
              <Label htmlFor="signup-name">{t('auth_display_name')}</Label>
              <Input id="signup-name" autoComplete="off" required maxLength={30} value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">{t('auth_email')}</Label>
              <Input id="signup-email" type="email" autoComplete="new-email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">{t('auth_password')}</Label>
              <Input id="signup-password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-xl" />
              <p className="text-xs text-muted-foreground">{t('auth_password_hint')}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-confirm-password">{t('auth_confirm_password')}</Label>
              <Input id="signup-confirm-password" type="password" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-11 rounded-xl" />
            </div>

            {TURNSTILE_SITE_KEY && (
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                ref={captchaRef}
                onSuccess={setCaptchaToken}
                onExpire={() => setCaptchaToken(undefined)}
                options={{ size: 'flexible' }}
              />
            )}

            <Button
              type="submit"
              className="w-full h-11 rounded-xl text-base font-semibold shadow-lg shadow-primary/20"
              disabled={loading}
            >
              {loading ? t('common_loading') : t('auth_signup')}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t('auth_has_account')}{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              {t('auth_login')}
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Built by <a href="https://ioana-ognibeni.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ioana Ognibeni</a> with{' '}
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> &{' '}
            <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lovable</a>.
            {' '}Approved by Jerry the 🐕
          </p>
        </motion.div>
      </div>
    </div>
  );
}
