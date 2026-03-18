import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { techIdioms } from '@/data/techIdioms';
import { useTranslation } from '@/i18n/useTranslation';
import { ITDeutschNav } from '@/components/layout/ITDeutschNav';

const idiomImages = import.meta.glob('/src/assets/idioms/*.png', { eager: true, import: 'default' }) as Record<string, string>;

function getIdiomImage(id: number): string | undefined {
  const key = `/src/assets/idioms/idiom-${id}.png`;
  return idiomImages[key];
}

export default function ITRedewendungenPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    if (!search) return techIdioms;
    const q = search.toLowerCase();
    return techIdioms.filter(
      (p) =>
        p.german.toLowerCase().includes(q) ||
        p.english.toLowerCase().includes(q) ||
        p.example.toLowerCase().includes(q) ||
        p.context.toLowerCase().includes(q)
    );
  }, [search]);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-foreground">{t('nav_it_deutsch')}</h1>
        <ITDeutschNav />
      </div>
      <p className="text-sm text-muted-foreground">72 deutsche Redewendungen mit wörtlichen Illustrationen · Klicke auf eine Karte für Details</p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Redewendung suchen..."
          className="pl-9"
        />
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((idiom) => {
          const isExpanded = expanded.has(idiom.id);
          const image = getIdiomImage(idiom.id);

          return (
            <div
              key={idiom.id}
              onClick={() => toggleExpand(idiom.id)}
              className={cn(
                'cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md',
                isExpanded && 'ring-2 ring-primary/20 shadow-lg'
              )}
            >
              {image && (
                <div className="mb-3 overflow-hidden rounded-lg bg-muted/30 flex items-center justify-center">
                  <img
                    src={image}
                    alt={idiom.german}
                    className="w-full h-40 object-contain"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex items-start gap-2 mb-1">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mt-0.5">
                  {idiom.id}
                </span>
                <p className="font-semibold text-base text-foreground leading-snug">{idiom.german}</p>
              </div>

              <p className="text-sm text-muted-foreground ml-7">{idiom.english}</p>

              {isExpanded && (
                <div className="mt-3 space-y-2 ml-7 animate-in fade-in slide-in-from-top-1 duration-200">
                  <p className="text-xs text-muted-foreground italic">{idiom.context}</p>
                  <p className="text-base text-foreground font-medium leading-relaxed bg-muted/50 rounded px-2 py-1.5">
                    {idiom.example}
                  </p>
                </div>
              )}
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
