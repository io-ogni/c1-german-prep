import { useRef, useState, useEffect } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  /** e.g. "SET1_Teil1.mp3" — just the filename inside the listening-audio bucket */
  audioFile?: string;
  /** Full URL override (if provided, audioFile is ignored) */
  audioUrl?: string;
  className?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function ListeningAudioPlayer({ audioFile, audioUrl, className }: Props) {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);

  const src = audioUrl ?? (audioFile ? `${SUPABASE_URL}/storage/v1/object/public/listening-audio/${audioFile}` : '');

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setError(false);
  }, [src]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play().catch(() => setError(true));
    }
    setPlaying(!playing);
  };

  const restart = () => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    setCurrentTime(0);
    if (!playing) {
      el.play().catch(() => setError(true));
      setPlaying(true);
    }
  };

  const seek = (value: number[]) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  if (!src) {
    return (
      <Card className={cn('bg-muted/30', className)}>
        <CardContent className="py-3 text-center">
          <p className="text-xs text-muted-foreground">{t('listening_no_audio')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('bg-muted/30', className)}>
      <CardContent className="py-3 space-y-2">
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
          onEnded={() => setPlaying(false)}
          onError={() => setError(true)}
          muted={muted}
        />

        {error ? (
          <p className="text-xs text-destructive text-center">{t('listening_audio_error')}</p>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={toggle}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={restart}>
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.5}
                onValueChange={seek}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground tabular-nums w-20 text-right shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setMuted(!muted)}>
                {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
