import { useState, useMemo, useRef, useCallback } from 'react';
import { Monitor, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { techIdioms } from '@/data/techIdioms';
import { useTranslation } from '@/i18n/useTranslation';
import { useHighlightedPhrases } from '@/hooks/useHighlightedPhrases';
import { ITDeutschNav } from '@/components/layout/ITDeutschNav';
import { StarredButton } from '@/components/shared/StarredButton';
import { SelectionHint, markHintInteraction } from '@/components/shared/SelectionHint';
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
    return list;
  }, [starredOnly, isHighlighted]);

  const getUrls = useCallback(() => filtered.map(i => getIdiomAudioUrl(i.id)).filter(Boolean) as string[], [filtered]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          {t('nav_it_deutsch')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Damit 'Can you maybe look into this?' endlich auf Deutsch genauso passiv-aggressiv klingt.</p>
      </div>
      <ITDeutschNav />

      <SelectionHint hintKey="it-redewendungen" variant="card" />
      <div className="flex items-center justify-end gap-2 -mt-3">
        <StarredButton active={starredOnly} onClick={() => setStarredOnly(prev => !prev)} />
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
              onClick={() => { toggleHighlight(idiom.german); markHintInteraction('it-redewendungen'); }}
              className={cn(
                'relative rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md cursor-pointer',
                starred && 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
              )}
            >
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
                      onClick={(e) => { e.stopPropagation(); toggleAudio(idiom.id); }}
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
        <div className="py-12 text-center text-sm space-y-2">
          {starredOnly ? (
            <>
              <p className="text-muted-foreground">Noch keine Redewendungen markiert — klicke auf eine Karte, um sie zu markieren.</p>
              <button className="text-primary text-sm font-medium hover:underline" onClick={() => setStarredOnly(false)}>Alle anzeigen</button>
            </>
          ) : (
            <p className="text-muted-foreground">Keine Redewendung gefunden.</p>
          )}
        </div>
      )}
    </div>
  );
}
