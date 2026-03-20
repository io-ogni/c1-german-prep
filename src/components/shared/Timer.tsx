import { useState, useRef, useCallback } from 'react';
import { TimerIcon, TimerOff, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimerProps {
  className?: string;
}

export function Timer({ className }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }, [running]);

  const stop = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    stop();
    setSeconds(0);
  }, [stop]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <span className="font-mono text-lg font-semibold text-foreground tabular-nums">
        {mm}:{ss}
      </span>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={running ? stop : start}>
        {running ? <TimerOff className="h-4 w-4" /> : <TimerIcon className="h-4 w-4" />}
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={reset}>
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}
