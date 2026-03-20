import { cn } from '@/lib/utils';

interface TelcBadgeProps {
  className?: string;
}

export function TelcBadge({ className }: TelcBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center self-center rounded-sm bg-muted-foreground/15 text-muted-foreground px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider leading-normal',
      className
    )}>
      telc
    </span>
  );
}
