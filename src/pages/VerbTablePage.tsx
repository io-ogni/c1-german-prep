import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/i18n/useTranslation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useHighlightedPhrases } from '@/hooks/useHighlightedPhrases';
import type { Tables } from '@/integrations/supabase/types';

type Filter = 'all' | 'irregular' | 'separable' | 'highlighted';

export default function VerbTablePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [sortBy, setSortBy] = useState<'frequency' | 'alpha'>('frequency');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isHighlighted, toggle } = useHighlightedPhrases('verb-table-highlights');

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
    let result = verbs;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((v) => v.infinitiv.toLowerCase().includes(q));
    }
    if (filter === 'irregular') result = result.filter((v) => v.is_irregular);
    if (filter === 'separable') result = result.filter((v) => v.is_separable);
    if (filter === 'highlighted') result = result.filter((v) => isHighlighted(v.infinitiv));
    if (sortBy === 'alpha') {
      result = [...result].sort((a, b) => a.infinitiv.localeCompare(b.infinitiv));
    }
    return result;
  }, [verbs, search, filter, sortBy, isHighlighted]);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('grammar_filter_all') },
    { key: 'irregular', label: t('grammar_filter_irregular') },
    { key: 'separable', label: t('grammar_filter_separable') },
    { key: 'highlighted', label: 'Markiert' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/grammar')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('page_grammar')}
        </Button>
        <h1 className="text-xl font-bold text-foreground">{t('grammar_verb_table')}</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('grammar_search_verb')}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1">
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortBy(sortBy === 'frequency' ? 'alpha' : 'frequency')}
        >
          {sortBy === 'frequency' ? 'A→Z' : '#'}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Klicken Sie auf eine Zeile, um sie zu markieren. Erneut klicken zum Abwählen.
      </p>

      {isLoading ? (
        <Skeleton className="h-96 w-full rounded-lg" />
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Infinitiv</TableHead>
                <TableHead>ich</TableHead>
                <TableHead>du</TableHead>
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
                  className={cn('cursor-pointer', isHighlighted(v.infinitiv) && 'bg-primary/10')}
                  onClick={() => toggle(v.infinitiv)}
                >
                  <TableCell className={cn('font-medium', v.is_irregular && 'text-primary')}>
                    {v.infinitiv}
                    {v.is_separable && <span className="ml-1 text-xs text-muted-foreground">(trb.)</span>}
                  </TableCell>
                  <TableCell className="text-sm">{v.praesens_ich}</TableCell>
                  <TableCell className="text-sm">{v.praesens_du}</TableCell>
                  <TableCell className="text-sm">{v.praesens_er}</TableCell>
                  <TableCell className="text-sm">{v.praeteritum_ich}</TableCell>
                  <TableCell className="text-sm">{v.perfekt}</TableCell>
                  <TableCell className="text-sm">{v.konjunktiv_ii}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{v.bedeutung_en}</TableCell>
                </TableRow>
              ))}
              {!filtered.length && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    {t('page_coming_soon')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
