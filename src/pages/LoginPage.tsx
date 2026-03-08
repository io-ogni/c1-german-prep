import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { BookOpen, PenTool, Headphones, GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await auth!.login(email, password);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate('/');
    }
  };

  const features = [
    { icon: BookOpen, label: 'Leseverstehen', desc: 'Texte auf C1-Niveau lesen & verstehen' },
    { icon: PenTool, label: 'Schreiben', desc: 'Aufsätze mit KI-Feedback verbessern' },
    { icon: Headphones, label: 'Hörverstehen', desc: 'Hörübungen im Prüfungsformat' },
    { icon: GraduationCap, label: 'Grammatik & Wortschatz', desc: 'Gezielte Übungen für C1' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side – info */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20 bg-primary/[0.04]">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            <span className="text-primary">C1</span> Werkstatt
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Dein interaktives Lernportal für die telc Deutsch C1 Prüfung – mit Übungen, KI-Feedback und Fortschrittskontrolle.
          </p>
          <div className="space-y-5">
            {features.map((f) => (
              <div key={f.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{f.label}</p>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side – login form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mb-2 text-2xl font-bold lg:hidden">
              <span className="text-primary">C1</span> Werkstatt
            </div>
            <CardTitle className="text-lg">{t('auth_login')}</CardTitle>
            <p className="text-sm text-muted-foreground lg:hidden mt-1">telc C1 Prüfungsvorbereitung</p>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth_email')}</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth_password')}</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common_loading') : t('auth_login')}
              </Button>
              <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                <Link to="/forgot-password" className="hover:text-primary">{t('auth_forgot_password')}</Link>
                <span>
                  {t('auth_no_account')}{' '}
                  <Link to="/signup" className="font-medium text-primary hover:underline">{t('auth_signup')}</Link>
                </span>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
