import { useAuth } from '@/contexts/AuthContext';
import { translations, type TranslationKey, type Language } from './translations';

export function useTranslation() {
  const auth = useAuth();
  const lang: Language = auth?.profile?.ui_language ?? 'de';

  function t(key: TranslationKey): string {
    const entry = translations[key];
    return entry?.[lang] ?? key;
  }

  return { t, lang };
}
