import { cn } from '@/lib/utils';

interface TelcBadgeProps {
  className?: string;
}

export function TelcBadge({ className }: TelcBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground',
      className
    )}>
      telc
    </span>
  );
}
