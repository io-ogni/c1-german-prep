import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TertiaryNav } from '@/components/shared/TertiaryNav';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { TertiaryNavItem } from '@/components/shared/TertiaryNav';
import { VerbFlashcard } from '@/components/shared/VerbFlashcard';
import type { Tables } from '@/integrations/supabase/types';

type Tab = 'verben' | 'lernkarten';
type VerbFilter = 'all' | 'irregular' | 'separable';

const TAB_ITEMS: TertiaryNavItem[] = [
  { value: 'verben', label: 'Verben' },
  { value: 'lernkarten', label: 'Lernkarten' },
];

function loadFilter(userId: string): VerbFilter {
  try {
    const v = localStorage.getItem(`verb-filter-${userId}`);
    if (v === 'irregular' || v === 'separable') return v;
  } catch {}
  return 'all';
}

export function VerbTableContent() {
  const { profile } = useRequiredAuth();
  const userId = profile?.user_id ?? '';
  const [tab, setTab] = useState<Tab>('verben');
  const [verbFilter, setVerbFilter] = useState<VerbFilter>(() => loadFilter(userId));

  useEffect(() => {
    if (userId) localStorage.setItem(`verb-filter-${userId}`, verbFilter);
  }, [verbFilter, userId]);

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
    if (verbFilter === 'irregular') result = result.filter((v) => v.is_irregular);
    if (verbFilter === 'separable') result = result.filter((v) => v.is_separable);
    return result;
  }, [verbs, verbFilter]);

  const noResults = !filtered.length && !isLoading;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start gap-2">
        <Select value={verbFilter} onValueChange={(v) => setVerbFilter(v as VerbFilter)}>
          <SelectTrigger className="h-8 w-auto text-xs gap-1">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle ({verbs?.length ?? 0})</SelectItem>
            <SelectItem value="irregular">Unregelmäßig ({verbs?.filter(v => v.is_irregular).length ?? 0})</SelectItem>
            <SelectItem value="separable">Trennbar ({verbs?.filter(v => v.is_separable).length ?? 0})</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <TertiaryNav
        items={TAB_ITEMS}
        activeValue={tab}
        onChange={(v) => setTab(v as Tab)}
      />
      {tab === 'lernkarten' ? (
        filtered.length > 0 ? (
          <VerbFlashcard verbs={filtered} />
        ) : (
          <Skeleton className="h-96 w-full rounded-lg" />
        )
      ) : (
      <>

      {isLoading ? (
        <Skeleton className="h-96 w-full rounded-lg" />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Infinitiv</TableHead>
                  <TableHead>er/sie/es</TableHead>
                  <TableHead>Präteritum</TableHead>
                  <TableHead>Perfekt</TableHead>
                  <TableHead>Konj. II</TableHead>
                  <TableHead>EN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((v) => (
                  <TableRow key={v.id}>
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
            {filtered.map((v) => (
              <div
                key={v.id}
                className="rounded-lg border p-3 space-y-2 bg-card"
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
          <p className="text-sm text-muted-foreground">Keine Ergebnisse.</p>
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
