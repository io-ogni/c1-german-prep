import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/i18n/useTranslation';

interface LevelTabsProps {
  value: 'b2' | 'c1';
  onValueChange: (value: 'b2' | 'c1') => void;
}

export function LevelTabs({ value, onValueChange }: LevelTabsProps) {
  const { t } = useTranslation();

  return (
    <Tabs value={value} onValueChange={(v) => onValueChange(v as 'b2' | 'c1')}>
      <TabsList>
        <TabsTrigger value="b2">{t('level.b2refresh')}</TabsTrigger>
        <TabsTrigger value="c1">{t('level.c1new')}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
