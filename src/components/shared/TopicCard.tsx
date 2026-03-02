import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from './ProgressBar';
import { useTranslation } from '@/i18n/useTranslation';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  title: string;
  exerciseCount: number;
  progress: number;
  onClick?: () => void;
  className?: string;
}

export function TopicCard({ title, exerciseCount, progress, onClick, className }: TopicCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      className={cn('cursor-pointer transition-shadow hover:shadow-md', className)}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm text-card-foreground mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-3">
          {exerciseCount} {t('common_exercises')}
        </p>
        <ProgressBar value={progress} />
      </CardContent>
    </Card>
  );
}
