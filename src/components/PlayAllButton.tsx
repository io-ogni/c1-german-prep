import { Play, Pause, Square } from 'lucide-react';
import type { usePlayAll } from '@/hooks/usePlayAll';

type PlayAllControls = ReturnType<typeof usePlayAll>;

interface PlayAllButtonProps {
  getUrls: () => string[];
  player: PlayAllControls;
  color?: 'fuchsia' | 'blue';
}

export function PlayAllButton({ getUrls, player, color = 'fuchsia' }: PlayAllButtonProps) {
  const { isPlaying, currentIndex, total, toggle, stop } = player;
  const active = currentIndex >= 0;

  const iconColor = color === 'fuchsia'
    ? 'fill-fuchsia-500 text-fuchsia-500'
    : 'fill-primary text-primary';

  const activeBg = color === 'fuchsia'
    ? 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300'
    : 'bg-primary/10 text-primary dark:bg-primary/20';

  return (
    <div className="inline-flex items-center gap-1">
      <button
        onClick={() => toggle(getUrls())}
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
          active
            ? activeBg
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
      >
        {isPlaying ? <Pause className={`h-3 w-3 ${iconColor}`} /> : <Play className={`h-3 w-3 ${iconColor}`} />}
        {active ? `${currentIndex + 1} / ${total}` : 'Alle abspielen'}
      </button>
      {active && (
        <button
          onClick={stop}
          className="inline-flex items-center rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Square className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
