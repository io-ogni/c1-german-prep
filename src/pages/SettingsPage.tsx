import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { Key, CheckCircle, Loader2, ShieldCheck, Trash2, Lock, Type, User } from 'lucide-react';
import { track, resetUser } from '@/lib/posthog';
import { useTextSize, type TextSize } from '@/hooks/useTextSize';

async function getEdgeFunctionError(err: unknown): Promise<string> {
  if (err instanceof FunctionsHttpError) {
    try {
      const body = await err.context.json();
      return body?.error || err.message;
    } catch {
      return err.message;
    }
  }
  return (err as any)?.message || 'Ein unerwarteter Fehler ist aufgetreten';
}

function ChangePasswordCard() {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async () => {
    if (newPw !== confirmPw) {
      toast.error('Passwörter stimmen nicht überein.');
      return;
    }
    if (newPw.length < 8) {
      toast.error('Mindestens 8 Zeichen.');
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPw });
      if (error) throw error;
      toast.success('Passwort geändert.');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } catch (err: any) {
      toast.error(err.message || 'Fehler beim Ändern des Passworts');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Passwort ändern
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          type="password"
          placeholder="Neues Passwort"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Neues Passwort bestätigen"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
        />
        <Button onClick={handleChangePassword} disabled={saving || !newPw || !confirmPw} size="sm">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Passwort ändern
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile, refreshProfile } = useRequiredAuth();
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [saving, setSaving] = useState(false);

  // API key state
  const [apiKey, setApiKey] = useState('');
  const [savingKey, setSavingKey] = useState(false);
  const [testingKey, setTestingKey] = useState(false);
  const hasKey = !!profile?.api_key_encrypted;

  // Delete account state
  const [deleting, setDeleting] = useState(false);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;
    setSavingKey(true);
    try {
      const { data, error } = await supabase.functions.invoke('set-api-key', {
        body: { api_key: apiKey },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(data?.key_hint ? `Key saved: ${data.key_hint}` : 'API key saved');
      setApiKey('');
      await refreshProfile();
    } catch (err: unknown) {
      toast.error(await getEdgeFunctionError(err));
    } finally {
      setSavingKey(false);
    }
  };

  const handleTestKey = async () => {
    setTestingKey(true);
    try {
      const { data, error } = await supabase.functions.invoke('test-api-key');
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(data?.message || 'API key is valid!');
    } catch (err: unknown) {
      toast.error(await getEdgeFunctionError(err));
    } finally {
      setTestingKey(false);
    }
  };

  const handleRemoveKey = async () => {
    setSavingKey(true);
    try {
      const { data, error } = await supabase.functions.invoke('set-api-key', {
        body: { api_key: null },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success('API key removed');
      await refreshProfile();
    } catch (err: unknown) {
      toast.error(await getEdgeFunctionError(err));
    } finally {
      setSavingKey(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('user_id', profile.user_id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      await refreshProfile();
      toast.success(t('common_save'));
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const { data, error } = await supabase.functions.invoke('delete-account');
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      track('account_deleted');
      resetUser();
      // Clear localStorage so starred vocab doesn't re-sync into a future account
      localStorage.clear();
      // User is already deleted server-side, sign out locally (ignore errors)
      await supabase.auth.signOut().catch(() => {});
      navigate('/login');
      toast.success('Konto und alle Daten wurden gelöscht.');
    } catch (err: unknown) {
      toast.error(await getEdgeFunctionError(err));
    } finally {
      setDeleting(false);
    }
  };

  const { size: textSize, setSize: setTextSize } = useTextSize();

  const TEXT_SIZE_OPTIONS: { value: TextSize; label: string; desc: string }[] = [
    { value: 'compact', label: 'Kompakt', desc: 'Kleinere Schrift, mehr Inhalt' },
    { value: 'default', label: 'Standard', desc: 'Empfohlene Größe' },
    { value: 'large', label: 'Groß', desc: 'Größere Schrift, leichter lesbar' },
  ];

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t('settings_title')}</h1>

      {/* API Key Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Key className="h-4 w-4" />
            {t('settings_api_key')}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {t('settings_api_key_note')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {hasKey && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>API-Schlüssel ist konfiguriert</span>
            </div>
          )}
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder={hasKey ? '••••••••••••••••' : 'sk-ant-...'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSaveKey} disabled={savingKey || !apiKey.trim()} size="sm">
              {savingKey ? <Loader2 className="h-4 w-4 animate-spin" /> : t('settings_save_key')}
            </Button>
          </div>
          {hasKey && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleTestKey} disabled={testingKey}>
                {testingKey ? <Loader2 className="h-4 w-4 animate-spin" /> : t('settings_test_key')}
              </Button>
              <Button variant="destructive" size="sm" onClick={handleRemoveKey} disabled={savingKey}>
                Schlüssel löschen
              </Button>
            </div>
          )}
          <div className="flex items-start gap-2 rounded-md border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
            <span>Dein Schlüssel wird mit AES-256-GCM auf dem Server verschlüsselt und nie in deinem Browser gespeichert. Er wird nur kurzzeitig in sicheren Backend-Funktionen entschlüsselt.</span>
          </div>
          <div className="flex items-start gap-2 rounded-md border border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/30 p-3 text-xs text-orange-800 dark:text-orange-300">
            <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" />
            <span><strong>Security tip:</strong> Generate a dedicated API key just for this app. Set a spending limit, and delete it when you're done learning.</span>
          </div>
        </CardContent>
      </Card>

      {/* Anzeigename */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            {t('auth_display_name')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          <Button onClick={handleSave} disabled={saving} size="sm">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {t('common_save')}
          </Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <ChangePasswordCard />

      {/* Text Size */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Type className="h-4 w-4" />
            Textgröße
          </CardTitle>
          <CardDescription>Passe die Schriftgröße an deine Vorlieben an.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {TEXT_SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTextSize(opt.value)}
                className={`flex-1 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  textSize === opt.value
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete Account Section */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-destructive">
            <Trash2 className="h-4 w-4" />
            Konto löschen
          </CardTitle>
          <CardDescription>
            Ihr Konto und alle zugehörigen Daten (Vokabeln, Texte, Fortschritt) werden unwiderruflich gelöscht.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={deleting}>
                {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                Konto endgültig löschen
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bist du sicher?</AlertDialogTitle>
                <AlertDialogDescription>
                  Diese Aktion kann nicht rückgängig gemacht werden. Dein Konto und alle Daten — einschließlich Wortschatz, Texte, Übungsfortschritt und Einstellungen — werden dauerhaft gelöscht.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('common_cancel')}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Ja, Konto löschen
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
