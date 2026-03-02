import { useAuth } from '@/contexts/AuthContext';
import { translations, type TranslationKey, type Language } from './translations';

export function useTranslation() {
  const auth = useAuth();
  const lang: Language = (auth?.profile?.ui_language as Language) ?? 'de';

  function t(key: TranslationKey): string {
    return translations[lang]?.[key] ?? translations.de[key] ?? key;
  }

  return { t, lang };
}
