import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Code } from 'lucide-react';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function LoginPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef<TurnstileInstance>(null);
  const [captchaToken, setCaptchaToken] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (TURNSTILE_SITE_KEY && !captchaToken) {
      toast.error('Bitte warte, bis die CAPTCHA-Überprüfung abgeschlossen ist.');
      return;
    }
    setLoading(true);

    const { error } = await auth!.login(email, password, captchaToken);
    setLoading(false);
    captchaRef.current?.reset();
    setCaptchaToken(undefined);
    if (error) {
      toast.error(error.message);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-blue-500 to-violet-600">
        {/* Pattern overlay */}
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
              Welcome back
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-4">
              Schön, dass
              <br />
              du wieder
              <br />
              da bist!
            </h1>
            <p className="text-lg text-white/80 max-w-sm leading-relaxed">
              Pick up right where you left off. Your exercises, vocabulary, and progress are all waiting for you.
            </p>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 flex gap-4"
          >
            {[
              { num: '7', label: 'Bereiche' },
              { num: '980+', label: 'Übungen' },
              { num: 'AI', label: 'Feedback' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <p className="text-2xl font-bold">{s.num}</p>
                <p className="text-xs text-white/70">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* IT Deutsch callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 max-w-xs"
          >
            <Code className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold text-sm">Deutsch für IT-ler</p>
              <p className="text-xs text-white/70">265+ Phrasen für Meetings & Refinements</p>
            </div>
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
          {/* Back to welcome */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Logo (mobile) */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold lg:hidden mb-1">
              <span className="text-primary">C1</span> Werkstatt
            </h2>
            <h3 className="text-2xl font-bold">{t('auth_login')}</h3>
            <p className="text-muted-foreground text-sm mt-1">
              telc C1 Prüfungsvorbereitung · Deutsch für IT-ler
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth_email')}</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('auth_password')}</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  {t('auth_forgot_password')}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                className="h-11 rounded-xl"
              />
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
              {loading ? t('common_loading') : t('auth_login')}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t('auth_no_account')}{' '}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              {t('auth_signup')}
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-muted-foreground/60">
            Your data is safe. Jerry guards it personally. 🐕
          </p>
        </motion.div>
      </div>
    </div>
  );
}
