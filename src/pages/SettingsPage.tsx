import { useState } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Key, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { profile, refreshProfile } = useRequiredAuth();
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [uiLanguage, setUiLanguage] = useState<string>(profile?.ui_language || 'de');
  const [writingLevel, setWritingLevel] = useState<string>(profile?.writing_level || '');
  const [saving, setSaving] = useState(false);

  // API key state
  const [apiKey, setApiKey] = useState('');
  const [savingKey, setSavingKey] = useState(false);
  const [testingKey, setTestingKey] = useState(false);
  const hasKey = !!profile?.api_key_encrypted;

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
    } catch (err: any) {
      toast.error(err.message || 'Failed to save API key');
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
    } catch (err: any) {
      toast.error(err.message || 'API key test failed');
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
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove API key');
    } finally {
      setSavingKey(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: displayName,
        ui_language: uiLanguage,
        writing_level: writingLevel,
      })
      .eq('user_id', profile.user_id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      await refreshProfile();
      toast.success(t('common_save'));
    }
  };

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t('settings_title')}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('auth_display_name')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('settings_language')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={uiLanguage} onValueChange={setUiLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="de">{t('settings_german')}</SelectItem>
              <SelectItem value="en">{t('settings_english')}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('settings_writing_level')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={writingLevel} onValueChange={setWritingLevel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b2">{t('level_b2_refresh')}</SelectItem>
              <SelectItem value="c1">{t('level_c1_new')}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? t('common_loading') : t('common_save')}
      </Button>

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
              <span>API key is configured</span>
            </div>
          )}
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="sk-ant-..."
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
                {t('common_delete') || 'Remove'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
