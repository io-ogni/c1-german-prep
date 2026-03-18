import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { c1Expressions } from '@/data/c1Expressions';

const expressionImages = import.meta.glob('/src/assets/expressions/*.png', { eager: true, import: 'default' }) as Record<string, string>;

function getExpressionImage(id: number): string | undefined {
  const key = `/src/assets/expressions/expr-${id}.png`;
  return expressionImages[key];
}

export default function C1ExpressionsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    if (!search) return c1Expressions;
    const q = search.toLowerCase();
    return c1Expressions.filter(
      (p) =>
        p.german.toLowerCase().includes(q) ||
        p.english.toLowerCase().includes(q) ||
        p.example.toLowerCase().includes(q)
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
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/speaking')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">C1/C2 Ausdrücke für Aufsätze & Debatten</h1>
          
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ausdruck suchen..."
          className="pl-9"
        />
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} von 72 Ausdrücken</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((expr) => {
          const isExpanded = expanded.has(expr.id);
          const image = getExpressionImage(expr.id);

          return (
            <div
              key={expr.id}
              onClick={() => toggleExpand(expr.id)}
              className={cn(
                'cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md',
                isExpanded && 'ring-2 ring-primary/20 shadow-lg'
              )}
            >
              {image && (
                <div className="mb-3 overflow-hidden rounded-lg bg-muted/30 flex items-center justify-center">
                  <img
                    src={image}
                    alt={expr.german}
                    className="w-full h-40 object-contain"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex items-start gap-2 mb-1">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mt-0.5">
                  {expr.id}
                </span>
                <p className="font-semibold text-base text-foreground leading-snug">{expr.german}</p>
              </div>

              <p className="text-sm text-muted-foreground ml-7">{expr.english}</p>

              {isExpanded && (
                <div className="mt-3 ml-7 animate-in fade-in slide-in-from-top-1 duration-200">
                  <p className="text-base text-foreground font-medium leading-relaxed bg-muted/50 rounded px-2 py-1.5">
                    {expr.example}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground text-sm">
          Kein Ausdruck gefunden.
        </div>
      )}
    </div>
  );
}
