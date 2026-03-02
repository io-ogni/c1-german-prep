import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from './ProgressBar';
import { TelcBadge } from './TelcBadge';
import { useTranslation } from '@/i18n/useTranslation';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  title: string;
  exerciseCount: number;
  progress: number;
  onClick?: () => void;
  className?: string;
  showTelcBadge?: boolean;
}

export function TopicCard({ title, exerciseCount, progress, onClick, className, showTelcBadge }: TopicCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      className={cn('cursor-pointer transition-shadow hover:shadow-md', className)}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-sm text-card-foreground">{title}</h3>
          {showTelcBadge && <TelcBadge />}
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          {exerciseCount} {t('common_exercises')}
        </p>
        <ProgressBar value={progress} />
      </CardContent>
    </Card>
  );
}
