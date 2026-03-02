import { useTranslation } from '@/i18n/useTranslation';
import type { TranslationKey } from '@/i18n/translations';

interface ScaffoldPageProps {
  titleKey: TranslationKey;
}

export default function ScaffoldPage({ titleKey }: ScaffoldPageProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">{t(titleKey)}</h1>
      <p className="text-muted-foreground">{t('page_coming_soon')}</p>
    </div>
  );
}
