import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function ForgotPasswordPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const captchaRef = useRef<TurnstileInstance>(null);
  const [captchaToken, setCaptchaToken] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (TURNSTILE_SITE_KEY && !captchaToken) {
      toast.error('Bitte warte, bis die CAPTCHA-Überprüfung abgeschlossen ist.');
      return;
    }
    setLoading(true);

    const { error } = await auth!.resetPassword(email, captchaToken);
    setLoading(false);
    captchaRef.current?.reset();
    setCaptchaToken(undefined);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">{t('auth_reset_password')}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {sent ? (
              <p className="text-sm text-muted-foreground text-center">{t('auth_reset_sent')}</p>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth_email')}</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            )}
            {TURNSTILE_SITE_KEY && (
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                ref={captchaRef}
                onSuccess={setCaptchaToken}
                onExpire={() => setCaptchaToken(undefined)}
                options={{ size: 'flexible' }}
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            {!sent && (
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common_loading') : t('auth_reset_password')}
              </Button>
            )}
            <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">{t('auth_login')}</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
