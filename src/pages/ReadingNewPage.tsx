import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TelcBadge } from '@/components/shared/TelcBadge';

const topicImages = import.meta.glob('/src/assets/reading-topics/*.png', { eager: true, import: 'default' }) as Record<string, string>;

function getTopicImage(id: number): string | undefined {
  const key = `/src/assets/reading-topics/topic-${id}.png`;
  return topicImages[key];
}

interface ReadingTopic {
  id: number;
  title: string;
  isTelc: boolean;
}

const topics: ReadingTopic[] = [
  { id: 1, title: 'Digitalisierung im Gesundheitswesen', isTelc: true },
  { id: 2, title: 'Nachhaltiger Konsum im Alltag', isTelc: true },
  { id: 3, title: 'Die Zukunft der Arbeit', isTelc: true },
  { id: 4, title: 'Städte der Zukunft', isTelc: true },
  { id: 5, title: 'Digitalisierung in der Bildung — Chance oder Risiko?', isTelc: true },
  { id: 6, title: 'Die Vier-Tage-Woche — Utopie oder Zukunftsmodell?', isTelc: true },
  { id: 7, title: 'Bedingungsloses Grundeinkommen — Freiheit oder Faulheit?', isTelc: true },
  { id: 8, title: 'Kann individuelles Handeln das Klima retten?', isTelc: true },
  { id: 9, title: 'Fake News — Gefahr für die Demokratie', isTelc: true },
  { id: 10, title: 'Massentourismus — Segen oder Fluch für beliebte Reiseziele?', isTelc: true },
  { id: 11, title: 'Gendern — Sprachgerechtigkeit oder Sprachverhunzung?', isTelc: true },
  { id: 12, title: 'Karrieretipps von Experten', isTelc: true },
  { id: 13, title: 'Studieren im Ausland — Erfahrungsberichte', isTelc: true },
  { id: 14, title: 'Wohnkonzepte in der Großstadt', isTelc: true },
  { id: 15, title: 'Weiterbildung — Welcher Weg passt zu mir?', isTelc: true },
  { id: 16, title: 'Homeoffice oder Büro? — Fünf Perspektiven', isTelc: true },
  { id: 17, title: 'Frauen in Führungspositionen — Fünf Stimmen', isTelc: true },
  { id: 18, title: 'Mobilität der Zukunft — Fünf Visionen', isTelc: true },
  { id: 19, title: 'Studiengebühren — Pro und Contra', isTelc: true },
  { id: 20, title: 'Künstliche Intelligenz in der Wissenschaft — Fünf Meinungen', isTelc: true },
  { id: 21, title: 'Schlaf — das unterschätzte Lebenselixier', isTelc: true },
  { id: 22, title: 'Wie das Gehirn Sprachen lernt', isTelc: true },
  { id: 23, title: 'Ernährungsmythen auf dem Prüfstand', isTelc: true },
  { id: 24, title: 'Ehrenamt in Deutschland — mehr als nur Helfen', isTelc: true },
  { id: 25, title: 'Fachkräftemangel in Deutschland — Ursachen und Lösungen', isTelc: true },
  { id: 26, title: 'Globalisierung — Wohlstand für alle oder Gewinn für wenige?', isTelc: true },
  { id: 27, title: 'Demografischer Wandel — Eine alternde Gesellschaft vor neuen Herausforderungen', isTelc: true },
  { id: 28, title: 'Der Einfluss sozialer Medien auf das Selbstbild junger Menschen', isTelc: true },
  { id: 29, title: 'Lebenslanges Lernen — Notwendigkeit oder Überforderung?', isTelc: true },
  { id: 30, title: 'Datenschutz im digitalen Zeitalter — Wie viel Privatsphäre geben wir auf?', isTelc: true },
  { id: 31, title: 'Landflucht und Urbanisierung — Warum junge Menschen die Provinz verlassen', isTelc: true },
  { id: 32, title: 'Ehrenamt 2.0 — Wie sich freiwilliges Engagement verändert', isTelc: true },
  { id: 33, title: 'Kann Künstliche Intelligenz kreativ sein?', isTelc: false },
  { id: 34, title: 'Die Einsamkeitsepidemie', isTelc: false },
  { id: 35, title: 'Gentrifizierung — Fluch oder Segen?', isTelc: false },
  { id: 36, title: 'Fake News erkennen und bekämpfen', isTelc: false },
  { id: 37, title: 'Minimalismus — weniger besitzen, mehr leben?', isTelc: false },
  { id: 38, title: 'Das deutsche Bildungssystem im internationalen Vergleich', isTelc: false },
  { id: 39, title: 'Integration durch Sprache — reicht das?', isTelc: false },
  { id: 40, title: 'Psychische Gesundheit am Arbeitsplatz', isTelc: false },
];

export default function ReadingNewPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return topics;
    const q = search.toLowerCase();
    return topics.filter((t) => t.title.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/reading')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lesetexte — Themenübersicht</h1>
          <p className="text-sm text-muted-foreground">{topics.length} Themen · Klicke auf ein Thema für Details</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Thema suchen..."
          className="pl-9"
        />
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} von {topics.length} Themen</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((topic) => {
          const image = getTopicImage(topic.id);

          return (
            <div
              key={topic.id}
              className="cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md"
            >
              {image ? (
                <div className="mb-3 overflow-hidden rounded-lg bg-muted/30 flex items-center justify-center">
                  <img
                    src={image}
                    alt={topic.title}
                    className="w-full h-40 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="mb-3 h-40 rounded-lg bg-muted/30 flex items-center justify-center">
                  <span className="text-3xl">📖</span>
                </div>
              )}

              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mt-0.5">
                  {topic.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm text-foreground leading-snug">{topic.title}</p>
                    {topic.isTelc && <TelcBadge />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground text-sm">
          Kein Thema gefunden.
        </div>
      )}
    </div>
  );
}
