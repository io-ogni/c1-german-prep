import { useState, useMemo, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useHighlightedPhrases } from '@/hooks/useHighlightedPhrases';
import { StarredButton } from '@/components/shared/StarredButton';
import { SelectionHint, markHintInteraction } from '@/components/shared/SelectionHint';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlayAllButton } from '@/components/PlayAllButton';
import { usePlayAll } from '@/hooks/usePlayAll';
import { NV_VERBINDUNGEN, NV_CATEGORIES } from '@/data/nvVerbindungen';

const ttsAudio: Record<string, string> = import.meta.glob('/src/assets/audio/nv-verbindungen/*.mp3', { eager: true, import: 'default' }) as Record<string, string>;
function getTtsUrl(index: number): string | undefined {
  const padded = String(index + 1).padStart(2, '0');
  return ttsAudio[`/src/assets/audio/nv-verbindungen/nv-${padded}.mp3`];
}
import type { NVVerbindung } from '@/data/nvVerbindungen';

const BORDER_COLORS: Record<string, string> = {
  'Entscheidungen & Einfluss': 'border-l-blue-400',
  'Kommunikation': 'border-l-emerald-400',
  'Arbeit & Leistung': 'border-l-violet-400',
  'Veränderung & Entwicklung': 'border-l-amber-400',
  'Probleme & Lösungen': 'border-l-rose-400',
  'Recht & Regeln': 'border-l-indigo-400',
  'Bewertung & Meinung': 'border-l-cyan-400',
  'Zustand & Beziehung': 'border-l-teal-400',
};

const BADGE_COLORS: Record<string, string> = {
  'Entscheidungen & Einfluss': 'text-blue-700 dark:text-blue-300',
  'Kommunikation': 'text-emerald-700 dark:text-emerald-300',
  'Arbeit & Leistung': 'text-violet-700 dark:text-violet-300',
  'Veränderung & Entwicklung': 'text-amber-700 dark:text-amber-300',
  'Probleme & Lösungen': 'text-rose-700 dark:text-rose-300',
  'Recht & Regeln': 'text-indigo-700 dark:text-indigo-300',
  'Bewertung & Meinung': 'text-cyan-700 dark:text-cyan-300',
  'Zustand & Beziehung': 'text-teal-700 dark:text-teal-300',
};

export function NVVerbindungenContent() {
  const auth = useAuth();
  const userId = auth?.user?.id ?? '';
  const { isHighlighted, toggle } = useHighlightedPhrases(`nv-verbindungen-highlights-${userId}`);
  const [starredOnly, setStarredOnly] = useState(false);
  const [category, setCategory] = useState('Alle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const player = usePlayAll();

  const speak = useCallback((idx: number) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (playingIdx === idx) { setPlayingIdx(null); return; }
    const url = getTtsUrl(idx);
    if (!url) return;
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingIdx(idx);
    audio.onended = () => { setPlayingIdx(null); audioRef.current = null; };
    audio.play();
  }, [playingIdx]);

  const filtered = useMemo(() => {
    let items = NV_VERBINDUNGEN.map((item, i) => ({ ...item, _i: i }));
    if (category !== 'Alle') items = items.filter(i => i.category === category);
    if (starredOnly) items = items.filter(i => isHighlighted(i.de));
    return items;
  }, [category, starredOnly, isHighlighted]);

  const handleToggle = (item: NVVerbindung) => {
    markHintInteraction('nv-verbindungen');
    toggle(item.de);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <SelectionHint hintKey="nv-verbindungen" />
        <div className="flex items-center gap-2">
          <StarredButton active={starredOnly} onClick={() => setStarredOnly(prev => !prev)} />
          <PlayAllButton color="blue" player={player} getUrls={() => filtered.map(item => getTtsUrl(item._i)).filter(Boolean) as string[]} />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-1 text-xs font-semibold text-muted-foreground">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-auto w-auto justify-start text-left text-xs font-semibold border-0 bg-transparent shadow-none px-1">
                    <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alle">Alle Kategorien</SelectItem>
                    {NV_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        <span className="flex items-center gap-2">
                          <span className={`inline-block w-2 h-2 rounded-full ${(BORDER_COLORS[cat] ?? '').replace('border-l-', 'bg-')}`} />
                          {cat}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">Deutsch</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">English</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">Beispielsatz</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item, i) => {
              const sel = isHighlighted(item.de);
              return (
                <TableRow
                  key={i}
                  className={cn('cursor-pointer transition-colors', sel && 'bg-yellow-50 dark:bg-yellow-900/20')}
                  onClick={() => handleToggle(item)}
                >
                  <TableCell className={`border-l-4 ${BORDER_COLORS[item.category] ?? 'border-l-transparent'}`}>
                    <span className={`text-xs font-normal whitespace-nowrap ${BADGE_COLORS[item.category] ?? ''}`}>{item.category}</span>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{item.de}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{item.en}</TableCell>
                  <TableCell className="text-sm text-foreground">
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); speak(item._i); }} className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                        <Volume2 className={cn('h-4 w-4', playingIdx === item._i && 'text-primary')} />
                      </button>
                      <span>{item.example}</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-sm text-muted-foreground">
                  {starredOnly ? 'Noch keine Einträge markiert.' : 'Keine Ergebnisse.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Alle">Alle Kategorien</SelectItem>
            {NV_CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {filtered.map((item, i) => {
          const sel = isHighlighted(item.de);
          return (
            <div
              key={i}
              onClick={() => handleToggle(item)}
              className={cn(
                `rounded-lg border border-l-4 ${BORDER_COLORS[item.category] ?? ''} p-4 space-y-2 cursor-pointer transition-colors`,
                sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200' : 'bg-card'
              )}
            >
              <span className={`text-xs ${BADGE_COLORS[item.category] ?? 'text-muted-foreground'}`}>{item.category}</span>
              <p className="text-sm font-medium text-foreground">{item.de}</p>
              <p className="text-xs text-muted-foreground">{item.en}</p>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); speak(item._i); }} className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                  <Volume2 className={cn('h-4 w-4', playingIdx === item._i && 'text-primary')} />
                </button>
                <p className="text-sm text-foreground">{item.example}</p>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-8 rounded-lg border bg-white dark:bg-card">
            <p className="text-sm text-muted-foreground">{starredOnly ? 'Noch keine Einträge markiert.' : 'Keine Ergebnisse.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
