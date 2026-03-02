import { useState } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { profile, refreshProfile } = useRequiredAuth();
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [uiLanguage, setUiLanguage] = useState<string>(profile?.ui_language || 'de');
  const [writingLevel, setWritingLevel] = useState<string>(profile?.writing_level || '');
  const [saving, setSaving] = useState(false);

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
      toast.success(t('common.save'));
    }
  };

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t('settings.title')}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('auth.displayName')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('settings.language')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={uiLanguage} onValueChange={setUiLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="de">{t('settings.german')}</SelectItem>
              <SelectItem value="en">{t('settings.english')}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('settings.level')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={writingLevel} onValueChange={setWritingLevel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b2">{t('level.b2refresh')}</SelectItem>
              <SelectItem value="c1">{t('level.c1new')}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? t('common.loading') : t('common.save')}
      </Button>
    </div>
  );
}
