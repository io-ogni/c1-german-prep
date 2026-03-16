import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY;

export default function SignupPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t('auth_passwords_no_match'));
      return;
    }
    setLoading(true);

    let token: string | undefined;
    if (HCAPTCHA_SITE_KEY && captchaRef.current) {
      try {
        const res = await captchaRef.current.execute({ async: true });
        token = res.response;
        console.log('hCaptcha token obtained:', token?.substring(0, 20) + '...');
      } catch (err) {
        console.error('hCaptcha execute failed:', err);
        toast.error('CAPTCHA fehlgeschlagen, bitte erneut versuchen');
        setLoading(false);
        return;
      }
    }
    console.log('Calling signup with captchaToken:', !!token);
    const { error } = await auth!.signup(email, password, displayName, token);
    setLoading(false);
    captchaRef.current?.resetCaptcha();
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-2 text-2xl font-bold">
            <span className="text-primary">C1</span> Werkstatt
          </div>
          <CardTitle className="text-lg">{t('auth_signup')}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('auth_display_name')}</Label>
              <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth_email')}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth_password')}</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
              <p className="text-xs text-muted-foreground">{t('auth_password_hint')}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t('auth_confirm_password')}</Label>
              <Input id="confirm-password" type="password" required minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            {HCAPTCHA_SITE_KEY && (
              <HCaptcha
                sitekey={HCAPTCHA_SITE_KEY}
                size="invisible"
                ref={captchaRef}
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('common_loading') : t('auth_signup')}
            </Button>
            <span className="text-sm text-muted-foreground">
              {t('auth_has_account')}{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">{t('auth_login')}</Link>
            </span>
          </CardFooter>
        </form>
      </Card>

      <div className="fixed bottom-4 left-0 right-0 text-center text-xs text-muted-foreground">
        Built by <a href="https://ioana-ognibeni.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ioana Ognibeni</a> with{' '}
        <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> &{' '}
        <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lovable</a>
      </div>
    </div>
  );
}
