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
      <TabsList className="bg-muted/80 border border-border">
        <TabsTrigger value="b2" className="data-[state=inactive]:text-foreground/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{t('level_b2_refresh')}</TabsTrigger>
        <TabsTrigger value="c1" className="data-[state=inactive]:text-foreground/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{t('level_c1_new')}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
