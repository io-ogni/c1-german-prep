import { useAuth } from '@/contexts/AuthContext';
import { translations, type TranslationKey, type Language } from './translations';

export function useTranslation() {
  const lang: Language = 'de';

  function t(key: TranslationKey): string {
    return translations.de[key] ?? key;
  }

  return { t, lang };
}
