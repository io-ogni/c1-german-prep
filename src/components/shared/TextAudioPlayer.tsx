import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  audioUrl: string | undefined;
  disabled?: boolean;
  disabledTooltip?: string;
}

export function TextAudioPlayer({ audioUrl, disabled = false, disabledTooltip }: Props) {
  const { t, lang } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    if (disabled) return;
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    if (audioRef.current && audioRef.current.currentTime > 0) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.onended = () => setIsPlaying(false);
    setIsPlaying(true);
    audio.play();
  }, [isPlaying, audioUrl, disabled]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  // Stop on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Stop when audioUrl changes (e.g., switching examples)
  useEffect(() => {
    stop();
  }, [audioUrl, stop]);

  if (!audioUrl) return null;

  return (
    <div className="flex justify-end">
      <div className="relative group inline-block">
        <div className="inline-flex items-center gap-1">
          <button
            onClick={disabled ? undefined : toggle}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              disabled
                ? 'text-muted-foreground/50 cursor-default'
                : isPlaying
                  ? 'bg-primary/10 text-primary dark:bg-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {isPlaying
              ? <Pause className="h-3 w-3 fill-primary text-primary" />
              : <Play className={`h-3 w-3 ${disabled ? 'fill-muted-foreground/50 text-muted-foreground/50' : 'fill-primary text-primary'}`} />}
            {isPlaying
              ? 'Pause'
              : (lang === 'de' ? 'Text anhören' : 'Listen to text')}
          </button>
          {isPlaying && (
            <button
              onClick={stop}
              className="inline-flex items-center rounded-full p-1 text-primary hover:bg-muted transition-colors"
            >
              <Square className="h-3 w-3 fill-primary text-primary" />
            </button>
          )}
        </div>
        {disabled && disabledTooltip && (
          <div className="absolute right-0 top-full mt-1 hidden group-hover:block z-10 rounded-md bg-popover border border-border px-2.5 py-1.5 text-xs text-muted-foreground shadow-md whitespace-nowrap">
            {disabledTooltip}
          </div>
        )}
      </div>
    </div>
  );
}
