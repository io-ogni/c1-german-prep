import { useTranslation } from '@/i18n/useTranslation';

interface ScaffoldPageProps {
  titleKey: 'page.vocabulary' | 'page.grammar' | 'page.writing' | 'page.reading' | 'page.listening' | 'page.examPrep' | 'page.myVocabulary' | 'page.myTexts';
}

export default function ScaffoldPage({ titleKey }: ScaffoldPageProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">{t(titleKey)}</h1>
      <p className="text-muted-foreground">{t('page.comingSoon')}</p>
    </div>
  );
}
