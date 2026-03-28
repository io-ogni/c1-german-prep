import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowLeft, Eye, EyeOff, Volume2 } from 'lucide-react';
import { PlayAllButton } from '@/components/PlayAllButton';
import { usePlayAll } from '@/hooks/usePlayAll';
import type { ITDialogue } from '@/data/itDialogues';

// Speaker colors — consistent across dialogues
const SPEAKER_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  Sarah: { text: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-l-blue-400' },
  Jan: { text: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-l-emerald-400' },
  Lukas: { text: 'text-orange-700 dark:text-orange-300', bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-l-orange-400' },
  Katja: { text: 'text-violet-700 dark:text-violet-300', bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-l-violet-400' },
  Marco: { text: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-50 dark:bg-rose-950/30', border: 'border-l-rose-400' },
};

const DEFAULT_COLOR = { text: 'text-foreground', bg: 'bg-muted/30', border: 'border-l-muted-foreground' };

function getSpeakerColor(name: string) {
  return SPEAKER_COLORS[name] ?? DEFAULT_COLOR;
}

// ─── TTS Audio ───

const dialogueAudio: Record<string, Record<string, string>> = {
  'discovery-session': import.meta.glob('/src/assets/audio/dialoge/discovery-session/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'story-mapping': import.meta.glob('/src/assets/audio/dialoge/story-mapping/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'slack-debugging': import.meta.glob('/src/assets/audio/dialoge/slack-debugging/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'slack-pre-demo': import.meta.glob('/src/assets/audio/dialoge/slack-pre-demo/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
};

function getLineAudioUrl(dialogueId: string, lineIdx: number): string | undefined {
  const map = dialogueAudio[dialogueId];
  if (!map) return undefined;
  const padded = String(lineIdx + 1).padStart(2, '0');
  return map[`/src/assets/audio/dialoge/${dialogueId}/${dialogueId}-${padded}.mp3`];
}

function getAllAudioUrls(dialogueId: string, lineCount: number): string[] {
  const urls: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    const url = getLineAudioUrl(dialogueId, i);
    if (url) urls.push(url);
  }
  return urls;
}

// ─── Dialogue List ───

interface DialogueListProps {
  dialogues: ITDialogue[];
  onSelect: (d: ITDialogue) => void;
}

export function DialogueList({ dialogues, onSelect }: DialogueListProps) {
  const { lang } = useTranslation();

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {dialogues.map(d => (
        <Card
          key={d.id}
          className="cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => onSelect(d)}
        >
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-foreground">{lang === 'de' ? d.title_de : d.title_en}</h3>
            </div>
            <p className="text-xs text-muted-foreground">{lang === 'de' ? d.description_de : d.description_en}</p>
            <div className="flex gap-1.5 flex-wrap">
              {d.speakers.map(s => (
                <Badge key={s.name} variant="secondary" className={cn('text-xs font-normal px-2 py-0.5', getSpeakerColor(s.name).text)}>
                  {s.name} ({s.role})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Dialogue View ───

interface DialogueViewProps {
  dialogue: ITDialogue;
  onBack: () => void;
}

export function DialogueView({ dialogue, onBack }: DialogueViewProps) {
  const { lang } = useTranslation();
  const [showTranslations, setShowTranslations] = useState(false);
  const [revealedLines, setRevealedLines] = useState<Set<number>>(new Set());
  const [playingLine, setPlayingLine] = useState<number | null>(null);
  const player = usePlayAll();
  const singleAudioRef = useRef<HTMLAudioElement | null>(null);

  const stopSingle = useCallback(() => {
    if (singleAudioRef.current) {
      singleAudioRef.current.pause();
      singleAudioRef.current = null;
    }
    setPlayingLine(null);
  }, []);

  // Stop all audio on unmount
  useEffect(() => {
    return () => {
      if (singleAudioRef.current) {
        singleAudioRef.current.pause();
        singleAudioRef.current = null;
      }
      player.stop();
    };
  }, []);

  const toggleLineAudio = useCallback((idx: number) => {
    // If already playing this line, stop it
    if (playingLine === idx) {
      stopSingle();
      return;
    }
    // Stop any current playback (single line or play-all)
    stopSingle();
    player.stop();
    const url = getLineAudioUrl(dialogue.id, idx);
    if (!url) return;
    const audio = new Audio(url);
    singleAudioRef.current = audio;
    setPlayingLine(idx);
    audio.onended = () => {
      setPlayingLine(null);
      singleAudioRef.current = null;
    };
    audio.play().catch(() => setPlayingLine(null));
  }, [dialogue.id, stopSingle, player, playingLine]);

  const toggleLine = (idx: number) => {
    if (showTranslations) return;
    setRevealedLines(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const getUrls = useCallback(() => getAllAudioUrls(dialogue.id, dialogue.lines.length), [dialogue.id, dialogue.lines.length]);

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => { stopSingle(); player.stop(); onBack(); }}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {lang === 'de' ? 'Zurück' : 'Back'}
      </Button>

      <div>
        <h2 className="text-lg font-bold text-foreground">{lang === 'de' ? dialogue.title_de : dialogue.title_en}</h2>
        <p className="text-sm text-muted-foreground mt-1">{lang === 'de' ? dialogue.context_de : dialogue.context_en}</p>
        <div className="flex gap-1.5 flex-wrap mt-2">
          {dialogue.speakers.map(s => (
            <Badge key={s.name} variant="secondary" className={cn('text-xs font-normal px-2 py-0.5', getSpeakerColor(s.name).text)}>
              {s.name} — {s.role}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setShowTranslations(!showTranslations)}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            showTranslations
              ? 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          {showTranslations ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {showTranslations ? 'EN aus' : 'EN ein'}
        </button>
        <PlayAllButton getUrls={getUrls} player={player} />
      </div>

      <div className="space-y-2">
        {dialogue.lines.map((line, idx) => {
          const color = getSpeakerColor(line.speaker);
          const translationVisible = showTranslations || revealedLines.has(idx);
          const isPlaying = playingLine === idx;
          const hasAudio = !!getLineAudioUrl(dialogue.id, idx);

          return (
            <Card
              key={idx}
              onClick={() => toggleLine(idx)}
              className={cn(
                'group border-l-3 transition-colors cursor-pointer',
                color.border,
                isPlaying && 'ring-1 ring-fuchsia-300 dark:ring-fuchsia-700',
              )}
            >
              <CardContent className="px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <p className={cn('text-sm font-bold', color.text)}>{line.speaker}</p>
                  {hasAudio && (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLineAudio(idx); }}
                      className={cn('opacity-0 group-hover:opacity-100 transition-opacity', isPlaying && 'opacity-100')}
                    >
                      <Volume2 className={cn('h-3.5 w-3.5 text-muted-foreground hover:text-foreground', isPlaying && 'text-fuchsia-500')} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-foreground leading-relaxed">{line.de}</p>
                {translationVisible && (
                  <p className="text-xs text-muted-foreground mt-1.5 italic leading-relaxed">{line.en}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!showTranslations && (
        <p className="text-xs text-muted-foreground text-center">
          {lang === 'de' ? 'Klicke auf eine Zeile, um die Übersetzung zu sehen' : 'Click a line to see the translation'}
        </p>
      )}
    </div>
  );
}
