import { useState, useMemo, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Star, MousePointerClick, Monitor, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { techIdioms } from '@/data/techIdioms';
import { useTranslation } from '@/i18n/useTranslation';
import { useHighlightedPhrases } from '@/hooks/useHighlightedPhrases';
import { ITDeutschNav } from '@/components/layout/ITDeutschNav';
import { PlayAllButton } from '@/components/PlayAllButton';
import { usePlayAll } from '@/hooks/usePlayAll';

const idiomImages = import.meta.glob('/src/assets/idioms/*.png', { eager: true, import: 'default' }) as Record<string, string>;
const idiomAudio = import.meta.glob('/src/assets/audio/it-redewendungen/*.mp3', { eager: true, import: 'default' }) as Record<string, string>;

function getIdiomImage(id: number): string | undefined {
  return idiomImages[`/src/assets/idioms/idiom-${id}.png`];
}

function getIdiomAudioUrl(id: number): string | undefined {
  const padded = String(id).padStart(2, '0');
  return idiomAudio[`/src/assets/audio/it-redewendungen/it-redewendungen-${padded}.mp3`];
}

export default function ITRedewendungenPage() {
  const { t, lang } = useTranslation();
  const [search, setSearch] = useState('');
  const [starredOnly, setStarredOnly] = useState(false);
  const { isHighlighted, toggle: toggleHighlight } = useHighlightedPhrases('it-redewendungen-highlights');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const player = usePlayAll();

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingId(null);
  }, []);

  const toggleAudio = useCallback((id: number) => {
    // Same speaker → stop
    if (playingId === id) {
      stopAudio();
      return;
    }
    // Different speaker → stop current, start new
    stopAudio();
    player.stop();
    const url = getIdiomAudioUrl(id);
    if (!url) return;
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingId(id);
    audio.onended = () => { setPlayingId(null); audioRef.current = null; };
    audio.play().catch(() => setPlayingId(null));
  }, [playingId, stopAudio, player]);

  const filtered = useMemo(() => {
    let list = techIdioms;
    if (starredOnly) list = list.filter(p => isHighlighted(p.german));
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.german.toLowerCase().includes(q) ||
          p.english.toLowerCase().includes(q) ||
          p.example.toLowerCase().includes(q) ||
          p.context.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, starredOnly, isHighlighted]);

  const getUrls = useCallback(() => filtered.map(i => getIdiomAudioUrl(i.id)).filter(Boolean) as string[], [filtered]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          {t('nav_it_deutsch')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Berufssprache für die IT-Branche — Vokabular, Redewendungen und Dialoge für den Arbeitsalltag.</p>
      </div>
      <ITDeutschNav />

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Redewendung suchen..."
            className="pl-9"
          />
        </div>
        <button
          onClick={() => setStarredOnly(prev => !prev)}
          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors shrink-0 ${
            starredOnly
              ? 'border-yellow-300 bg-yellow-50 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
              : 'border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${starredOnly ? 'fill-yellow-400 text-yellow-500' : ''}`} />
          Markierte
        </button>
        <PlayAllButton player={player} getUrls={getUrls} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((idiom) => {
          const image = getIdiomImage(idiom.id);
          const starred = isHighlighted(idiom.german);
          const isPlaying = playingId === idiom.id;
          const hasAudio = !!getIdiomAudioUrl(idiom.id);
          return (
            <div
              key={idiom.id}
              className={cn(
                'relative rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md',
                starred && 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
              )}
            >
              <button
                onClick={() => toggleHighlight(idiom.german)}
                className="absolute top-3 left-3 z-10"
              >
                <Star className={cn('h-4 w-4 transition-colors', starred ? 'fill-yellow-400 text-yellow-500' : 'text-muted-foreground/40 hover:text-yellow-400')} />
              </button>
              <div>
                {image && (
                  <div className="relative mb-3 overflow-hidden rounded-lg bg-muted/30 flex items-center justify-center">
                    <img
                      src={image}
                      alt={idiom.german}
                      className="w-full h-40 object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex items-start gap-2 mb-1">
                  <span className="inline-flex items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 text-[10px] font-bold w-5 h-5 shrink-0 mt-0.5">
                    {idiom.id}
                  </span>
                  <p className="font-semibold text-base text-foreground leading-snug pr-6">{idiom.german}</p>
                </div>

                <p className="text-sm text-muted-foreground ml-7">{idiom.english}</p>
                <p className="text-xs text-muted-foreground italic mt-2 ml-7">{idiom.context}</p>

                <div className="flex items-start gap-2 mt-3">
                  {hasAudio ? (
                    <button
                      onClick={() => toggleAudio(idiom.id)}
                      className="shrink-0 mt-0.5 text-muted-foreground hover:text-fuchsia-500 transition-colors"
                    >
                      <Volume2 className={cn('h-4 w-4', isPlaying && 'text-fuchsia-500')} />
                    </button>
                  ) : (
                    <span className="w-4 shrink-0" />
                  )}
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {idiom.example}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground text-sm">
          Keine Redewendung gefunden.
        </div>
      )}
    </div>
  );
}
