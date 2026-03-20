import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/i18n/useTranslation';
import { NAV_CONTAINER, TAB_TRIGGER_BLUE } from '@/components/shared/navStyles';

interface LevelTabsProps {
  value: 'b2' | 'c1';
  onValueChange: (value: 'b2' | 'c1') => void;
}

export function LevelTabs({ value, onValueChange }: LevelTabsProps) {
  const { t } = useTranslation();

  return (
    <Tabs value={value} onValueChange={(v) => onValueChange(v as 'b2' | 'c1')}>
      <TabsList className={NAV_CONTAINER}>
        <TabsTrigger value="b2" className={TAB_TRIGGER_BLUE}>{t('level_b2_refresh')}</TabsTrigger>
        <TabsTrigger value="c1" className={TAB_TRIGGER_BLUE}>{t('level_c1')}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
