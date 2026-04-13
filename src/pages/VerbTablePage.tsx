import { useState, useMemo, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/i18n/useTranslation';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHighlightedPhrases } from '@/hooks/useHighlightedPhrases';
import { TertiaryNav } from '@/components/shared/TertiaryNav';
import { StarredButton } from '@/components/shared/StarredButton';
import { SelectionHint, markHintInteraction } from '@/components/shared/SelectionHint';
import type { TertiaryNavItem } from '@/components/shared/TertiaryNav';
import { VerbFlashcard } from '@/components/shared/VerbFlashcard';
import type { Tables } from '@/integrations/supabase/types';

type Filter = 'all' | 'irregular' | 'separable' | 'lernkarten';

const FILTER_ITEMS: TertiaryNavItem[] = [
  { value: 'all', label: 'Alle' },
  { value: 'irregular', label: 'Unregelmäßig' },
  { value: 'separable', label: 'Trennbar' },
  { value: 'lernkarten', label: 'Lernkarten' },
];

export function VerbTableContent() {
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [starredOnly, setStarredOnly] = useState(false);
  const { t } = useTranslation();
  const { isHighlighted, toggle } = useHighlightedPhrases('verb-table-highlights');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const { data: verbs, isLoading } = useQuery({
    queryKey: ['verb-conjugations'],
    queryFn: async () => {
      const { data } = await supabase
        .from('verb_conjugations')
        .select('*')
        .order('frequency_rank');
      return (data ?? []) as Tables<'verb_conjugations'>[];
    },
  });

  const filtered = useMemo(() => {
    if (!verbs) return [];
    let result = [...verbs].sort((a, b) => a.infinitiv.localeCompare(b.infinitiv, 'de'));
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((v) => v.infinitiv.toLowerCase().includes(q));
    }
    if (filter === 'irregular') result = result.filter((v) => v.is_irregular);
    if (filter === 'separable') result = result.filter((v) => v.is_separable);
    if (starredOnly) result = result.filter((v) => isHighlighted(v.infinitiv));
    return result;
  }, [verbs, search, filter, starredOnly, isHighlighted]);

  const noResults = !filtered.length && !isLoading;

  return (
    <div className="space-y-4">
      <TertiaryNav
        items={FILTER_ITEMS}
        activeValue={filter}
        onChange={(v) => setFilter(v as Filter)}
      />
      {filter === 'lernkarten' ? (
        verbs && verbs.length > 0 ? (
          <VerbFlashcard verbs={verbs} />
        ) : (
          <Skeleton className="h-96 w-full rounded-lg" />
        )
      ) : (
      <>
      <div className="flex items-center justify-between gap-2 -mt-2">
        <SelectionHint />
      </div>
      <div className="flex items-center justify-end">
        <StarredButton active={starredOnly} onClick={() => setStarredOnly(prev => !prev)} />
      </div>

      {isLoading ? (
        <Skeleton className="h-96 w-full rounded-lg" />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {searchOpen ? (
                      <div className="flex items-center gap-1">
                        <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <Input
                          ref={searchRef}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder={t('grammar_search_verb')}
                          className="h-7 text-xs border-0 bg-transparent shadow-none focus-visible:ring-0 px-1"
                        />
                        <button
                          onClick={() => { setSearch(''); setSearchOpen(false); }}
                          className="shrink-0 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSearchOpen(true)}
                        className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Search className="h-3.5 w-3.5" />
                        Infinitiv
                      </button>
                    )}
                  </TableHead>
                  <TableHead>er/sie/es</TableHead>
                  <TableHead>Präteritum</TableHead>
                  <TableHead>Perfekt</TableHead>
                  <TableHead>Konj. II</TableHead>
                  <TableHead>EN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((v) => (
                  <TableRow
                    key={v.id}
                    className={cn('cursor-pointer', isHighlighted(v.infinitiv) && 'bg-yellow-50 dark:bg-yellow-900/20')}
                    onClick={() => { markHintInteraction('table'); toggle(v.infinitiv); }}
                  >
                    <TableCell className={cn('font-medium', v.is_irregular && 'text-primary')}>
                      {v.infinitiv}
                      {v.is_separable && <span className="ml-1 text-xs text-muted-foreground">(trb.)</span>}
                    </TableCell>
                    <TableCell className="text-sm">{v.praesens_er}</TableCell>
                    <TableCell className="text-sm">{v.praeteritum_ich}</TableCell>
                    <TableCell className="text-sm">{v.perfekt}</TableCell>
                    <TableCell className="text-sm">{v.konjunktiv_ii}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{v.bedeutung_en}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {searchOpen && (
              <div className="flex items-center gap-2 mb-2">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <Input
                  ref={searchRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('grammar_search_verb')}
                  className="h-8 text-sm"
                />
                <button onClick={() => { setSearch(''); setSearchOpen(false); }} className="text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {!searchOpen && (
              <button onClick={() => setSearchOpen(true)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-2">
                <Search className="h-3.5 w-3.5" /> Suchen
              </button>
            )}
            {filtered.map((v) => (
              <div
                key={v.id}
                onClick={() => { markHintInteraction('table'); toggle(v.infinitiv); }}
                className={cn(
                  'rounded-lg border p-3 space-y-2 cursor-pointer transition-colors',
                  isHighlighted(v.infinitiv) ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200' : 'bg-card'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn('text-sm font-semibold', v.is_irregular && 'text-primary')}>
                    {v.infinitiv}
                    {v.is_separable && <span className="ml-1 text-xs text-muted-foreground font-normal">(trb.)</span>}
                  </span>
                  <span className="text-xs text-muted-foreground">{v.bedeutung_en}</span>
                </div>
                <p className="text-xs text-foreground">
                  {v.praesens_er} <span className="text-muted-foreground/40">•</span> {v.praeteritum_ich} <span className="text-muted-foreground/40">•</span> {v.perfekt} <span className="text-muted-foreground/40">•</span> {v.konjunktiv_ii}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      {noResults && (
        <div className="text-center py-8 rounded-lg border bg-white dark:bg-card">
          {starredOnly ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Noch keine Verben markiert — klicke auf eine Zeile, um sie zu markieren.</p>
              <button className="text-primary text-sm font-medium hover:underline" onClick={() => setStarredOnly(false)}>Alle anzeigen</button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{search ? 'Keine Ergebnisse.' : t('page_coming_soon')}</p>
          )}
        </div>
      )}
      </>
      )}
    </div>
  );
}

export default function VerbTablePage() {
  return <VerbTableContent />;
}
