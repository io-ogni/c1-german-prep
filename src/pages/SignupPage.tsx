import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';

const perks = [
  'Unlimited reading & listening exercises',
  'AI-powered writing corrections',
  'Spaced repetition flashcards',
  'Real telc C1 exam formats',
];

export default function SignupPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t('auth_passwords_no_match'));
      return;
    }
    setLoading(true);
    const { error } = await auth!.signup(email, password, displayName);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Check your inbox! ✉️</h2>
          <p className="text-muted-foreground mb-6">{t('auth_check_email')}</p>
          <Button variant="outline" asChild>
            <Link to="/login">{t('auth_login')}</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-violet-600 via-primary to-cyan-500">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Free to start
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-4">
              Your C1 journey
              <br />
              starts now 🚀
            </h1>
            <p className="text-lg text-white/80 max-w-sm leading-relaxed mb-10">
              Join thousands of expats who chose the fun way to prepare for their German exam.
            </p>

            <div className="space-y-4">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-white/90">{perk}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link
            to="/welcome"
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
              Create your account — it's free
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('auth_display_name')}</Label>
              <Input
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How should we call you?"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth_email')}</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth_password')}</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 rounded-xl"
              />
              <p className="text-xs text-muted-foreground">{t('auth_password_hint')}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t('auth_confirm_password')}</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl text-base font-semibold shadow-lg shadow-primary/20"
              disabled={loading}
            >
              {loading ? t('common_loading') : 'Create account'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t('auth_has_account')}{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              {t('auth_login')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
