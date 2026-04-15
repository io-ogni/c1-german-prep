import { useState, useMemo, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useHighlightedPhrases } from '@/hooks/useHighlightedPhrases';
import { StarredButton } from '@/components/shared/StarredButton';
import { SelectionHint, markHintInteraction } from '@/components/shared/SelectionHint';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlayAllButton } from '@/components/PlayAllButton';
import { usePlayAll } from '@/hooks/usePlayAll';
import { PRAEPOSITIONEN, PRAEP_CATEGORIES } from '@/data/praepositionen';

const ttsAudio: Record<string, string> = import.meta.glob('/src/assets/audio/praepositionen/*.mp3', { eager: true, import: 'default' }) as Record<string, string>;
function getTtsUrl(index: number): string | undefined {
  const padded = String(index + 1).padStart(2, '0');
  return ttsAudio[`/src/assets/audio/praepositionen/praep-${padded}.mp3`];
}
import type { PraepItem } from '@/data/praepositionen';

const BORDER_COLORS: Record<string, string> = {
  'auf (+Akk)': 'border-l-blue-400',
  'an (+Akk)': 'border-l-emerald-400',
  'an (+Dat)': 'border-l-green-400',
  'über (+Akk)': 'border-l-violet-400',
  'für (+Akk)': 'border-l-amber-400',
  'mit (+Dat)': 'border-l-rose-400',
  'von (+Dat)': 'border-l-indigo-400',
  'um (+Akk)': 'border-l-cyan-400',
  'vor (+Dat)': 'border-l-teal-400',
  'zu (+Dat)': 'border-l-orange-400',
  'nach (+Dat)': 'border-l-pink-400',
  'gegen (+Akk)': 'border-l-red-400',
  'aus (+Dat)': 'border-l-lime-400',
  'in (+Akk)': 'border-l-sky-400',
  'in (+Dat)': 'border-l-slate-400',
};

const BADGE_COLORS: Record<string, string> = {
  'auf (+Akk)': 'text-blue-700 dark:text-blue-300',
  'an (+Akk)': 'text-emerald-700 dark:text-emerald-300',
  'an (+Dat)': 'text-green-700 dark:text-green-300',
  'über (+Akk)': 'text-violet-700 dark:text-violet-300',
  'für (+Akk)': 'text-amber-700 dark:text-amber-300',
  'mit (+Dat)': 'text-rose-700 dark:text-rose-300',
  'von (+Dat)': 'text-indigo-700 dark:text-indigo-300',
  'um (+Akk)': 'text-cyan-700 dark:text-cyan-300',
  'vor (+Dat)': 'text-teal-700 dark:text-teal-300',
  'zu (+Dat)': 'text-orange-700 dark:text-orange-300',
  'nach (+Dat)': 'text-pink-700 dark:text-pink-300',
  'gegen (+Akk)': 'text-red-700 dark:text-red-300',
  'aus (+Dat)': 'text-lime-700 dark:text-lime-300',
  'in (+Akk)': 'text-sky-700 dark:text-sky-300',
  'in (+Dat)': 'text-slate-700 dark:text-slate-300',
};

const TYPE_LABEL: Record<string, string> = { verb: 'Verb', nomen: 'Nomen', adj: 'Adj' };

export function PraepositionenContent() {
  const auth = useAuth();
  const userId = auth?.user?.id ?? '';
  const { isHighlighted, toggle } = useHighlightedPhrases(`praepositionen-highlights-${userId}`);
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
    let items = PRAEPOSITIONEN.map((item, i) => ({ ...item, _i: i }));
    if (category !== 'Alle') items = items.filter(i => i.preposition === category);
    if (starredOnly) items = items.filter(i => isHighlighted(i.verb_or_adj));
    return items;
  }, [category, starredOnly, isHighlighted]);

  const handleToggle = (item: PraepItem) => {
    markHintInteraction('praepositionen');
    toggle(item.verb_or_adj);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <SelectionHint hintKey="praepositionen" />
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
                    <SelectItem value="Alle">Alle Präpositionen</SelectItem>
                    {PRAEP_CATEGORIES.map(cat => (
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
              <TableHead className="text-xs font-semibold text-muted-foreground">Verb / Nomen / Adj</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">English</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">Beispielsatz</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item, i) => {
              const sel = isHighlighted(item.verb_or_adj);
              return (
                <TableRow
                  key={i}
                  className={cn('cursor-pointer transition-colors', sel && 'bg-yellow-50 dark:bg-yellow-900/20')}
                  onClick={() => handleToggle(item)}
                >
                  <TableCell className={`border-l-4 ${BORDER_COLORS[item.preposition] ?? 'border-l-transparent'}`}>
                    <span className={`text-xs font-normal whitespace-nowrap ${BADGE_COLORS[item.preposition] ?? ''}`}>{item.preposition}</span>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {item.verb_or_adj}
                    <Badge variant="secondary" className="ml-2 text-[10px] font-normal">{TYPE_LABEL[item.type]}</Badge>
                  </TableCell>
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
            <SelectItem value="Alle">Alle Präpositionen</SelectItem>
            {PRAEP_CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {filtered.map((item, i) => {
          const sel = isHighlighted(item.verb_or_adj);
          return (
            <div
              key={i}
              onClick={() => handleToggle(item)}
              className={cn(
                `rounded-lg border border-l-4 ${BORDER_COLORS[item.preposition] ?? ''} p-4 space-y-2 cursor-pointer transition-colors`,
                sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200' : 'bg-card'
              )}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs ${BADGE_COLORS[item.preposition] ?? 'text-muted-foreground'}`}>{item.preposition}</span>
                <Badge variant="secondary" className="text-[10px] font-normal">{TYPE_LABEL[item.type]}</Badge>
              </div>
              <p className="text-sm font-medium text-foreground">{item.verb_or_adj}</p>
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
