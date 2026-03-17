import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Phase = 'all' | 'Opening' | 'Flow' | 'Interruption' | 'Change Topic' | 'Conflict' | 'Engagement' | 'Action' | 'Closing' | 'Idioms';

interface Phrase {
  id: number;
  phase: string;
  category: string;
  german: string;
  english: string;
  example: string;
}

const phrases: Phrase[] = [
  { id: 1, phase: 'Opening', category: 'Welcome', german: 'Herzlich willkommen', english: 'A warm welcome', example: '„Herzlich willkommen zu unserem heutigen Workshop zur Cloud-Strategie."' },
  { id: 2, phase: 'Opening', category: 'Purpose', german: 'Das Ziel ist...', english: 'The goal is...', example: '„Das Ziel ist heute die Erarbeitung eines gemeinsamen Fahrplans."' },
  { id: 3, phase: 'Opening', category: 'Agenda', german: 'Die Tagesordnung', english: 'The agenda', example: '„Lassen Sie uns kurz die Tagesordnung für den Vormittag durchgehen."' },
  { id: 4, phase: 'Opening', category: 'Housekeeping', german: 'Zeitlicher Rahmen', english: 'Time frame', example: '„Unser zeitlicher Rahmen sieht eine Mittagspause um 12:00 Uhr vor."' },
  { id: 5, phase: 'Opening', category: 'Expectations', german: 'Erwartungshaltung', english: 'Expectations', example: '„Ich würde gerne zuerst Ihre Erwartungshaltung abfragen."' },
  { id: 6, phase: 'Opening', category: 'Icebreaker', german: 'Zum Einstieg', english: 'To start off', example: '„Zum Einstieg machen wir eine kurze Vorstellungsrunde."' },
  { id: 7, phase: 'Opening', category: 'Role', german: 'Die Moderation', english: 'Facilitation/Moderator', example: '„Ich werde heute die Moderation übernehmen und durch den Tag führen."' },
  { id: 8, phase: 'Flow', category: 'Transition', german: 'Überleiten zu', english: 'To transition to', example: '„Damit möchte ich zum nächsten Agendapunkt überleiten."' },
  { id: 9, phase: 'Flow', category: 'Context', german: 'Im Hinblick auf', english: 'With regard to', example: '„Im Hinblick auf das Budget müssen wir Prioritäten setzen."' },
  { id: 10, phase: 'Flow', category: 'Focus', german: 'Den Fokus legen', english: 'To put the focus on', example: '„Lassen Sie uns den Fokus nun auf die technischen Details legen."' },
  { id: 11, phase: 'Flow', category: 'Elaborate', german: 'Näher eingehen', english: 'To go into detail', example: '„Wir werden später noch näher auf diesen Punkt eingehen."' },
  { id: 12, phase: 'Flow', category: 'Recap', german: 'Zusammenfassend', english: 'In summary', example: '„Zusammenfassend lässt sich sagen, dass wir hier einen Konsens haben."' },
  { id: 13, phase: 'Flow', category: 'Visualizing', german: 'Festhalten', english: 'To record/write down', example: '„Ich werde diese Punkte am Whiteboard festhalten."' },
  { id: 14, phase: 'Flow', category: 'Examples', german: 'Veranschaulichen', english: 'To illustrate', example: '„Könnten Sie das bitte anhand eines Beispiels veranschaulichen?"' },
  { id: 15, phase: 'Interruption', category: 'Politeness', german: 'Darf ich kurz...?', english: 'May I briefly...?', example: '„Darf ich kurz einhaken, um ein Missverständnis zu vermeiden?"' },
  { id: 16, phase: 'Interruption', category: 'Timekeeping', german: 'Im Zeitplan bleiben', english: 'To stay on schedule', example: '„Wir müssen im Zeitplan bleiben, daher müssen wir jetzt weitermachen."' },
  { id: 17, phase: 'Interruption', category: 'Redirecting', german: 'Zurückkommen auf', english: 'To come back to', example: '„Könnten wir bitte wieder auf das Hauptthema zurückkommen?"' },
  { id: 18, phase: 'Interruption', category: 'Parking Lot', german: 'Themenparkplatz', english: 'Parking lot (topics)', example: '„Lassen Sie uns diesen Punkt auf den Themenparkplatz schieben."' },
  { id: 19, phase: 'Interruption', category: 'Brevity', german: 'Sich kurz fassen', english: 'To be brief', example: '„Ich muss Sie bitten, sich nun etwas kurz zu fassen."' },
  { id: 20, phase: 'Interruption', category: 'Clarification', german: 'Präzisieren', english: 'To clarify/specify', example: '„Könnten Sie diese Aussage bitte noch einmal präzisieren?"' },
  { id: 21, phase: 'Change Topic', category: 'New Phase', german: 'Einen neuen Punkt...', english: 'A new point...', example: '„Ich möchte nun einen neuen Punkt aufwerfen."' },
  { id: 22, phase: 'Change Topic', category: 'Switching', german: 'Wechseln zu', english: 'To switch to', example: '„Lassen Sie uns nun zur methodischen Ebene wechseln."' },
  { id: 23, phase: 'Change Topic', category: 'Pivot', german: 'Davon abgesehen', english: 'Apart from that', example: '„Davon abgesehen müssen wir auch die Compliance prüfen."' },
  { id: 24, phase: 'Change Topic', category: 'Expanding', german: 'Den Blick weiten', english: 'To broaden the view', example: '„Ich würde gerne den Blick weiten und das große Ganze betrachten."' },
  { id: 25, phase: 'Change Topic', category: 'Breaking down', german: 'Herunterbrechen', english: 'To break down', example: '„Lassen Sie uns das auf die operative Ebene herunterbrechen."' },
  { id: 26, phase: 'Conflict', category: 'Neutrality', german: 'Objektiv betrachten', english: 'To look at objectively', example: '„Lassen Sie uns die Situation sachlich und objektiv betrachten."' },
  { id: 27, phase: 'Conflict', category: 'Differing views', german: 'Widersprüchlich', english: 'Contradictory', example: '„Hier scheinen die Meinungen etwas widersprüchlich zu sein."' },
  { id: 28, phase: 'Conflict', category: 'Compromise', german: 'Kompromiss finden', english: 'To find a compromise', example: '„Wie könnten wir hier einen tragfähigen Kompromiss finden?"' },
  { id: 29, phase: 'Conflict', category: 'Mediation', german: 'Vermitteln', english: 'To mediate', example: '„Ich versuche hier zwischen den beiden Positionen zu vermitteln."' },
  { id: 30, phase: 'Conflict', category: 'Postponing', german: 'Vertagen', english: 'To postpone/adjourn', example: '„Ich schlage vor, wir vertagen diese Diskussion auf morgen."' },
  { id: 31, phase: 'Engagement', category: 'Encouraging', german: 'Beitragen', english: 'To contribute', example: '„Wer möchte noch etwas zu diesem Thema beitragen?"' },
  { id: 32, phase: 'Engagement', category: 'Input', german: 'Ihre Einschätzung', english: 'Your assessment', example: '„Mich würde hierzu brennend Ihre Einschätzung interessieren."' },
  { id: 33, phase: 'Engagement', category: 'Silent users', german: 'Zu Wort kommen', english: 'To have a say', example: '„Ich möchte sicherstellen, dass jeder heute zu Wort kommt."' },
  { id: 34, phase: 'Engagement', category: 'Feedback', german: 'Feedback einholen', english: 'To get feedback', example: '„Ich möchte an dieser Stelle kurz ein kurzes Stimmungsbild einholen."' },
  { id: 35, phase: 'Engagement', category: 'Opening floor', german: 'Die Runde öffnen', english: 'To open the floor', example: '„Ich möchte die Runde nun für Fragen und Anmerkungen öffnen."' },
  { id: 36, phase: 'Action', category: 'Responsibility', german: 'Verantwortlich sein', english: 'To be responsible', example: '„Wer wird für die Umsetzung dieses Punktes verantwortlich sein?"' },
  { id: 37, phase: 'Action', category: 'Next Steps', german: 'Nächste Schritte', english: 'Next steps', example: '„Lassen Sie uns nun die konkreten nächsten Schritte festlegen."' },
  { id: 38, phase: 'Action', category: 'Deadline', german: 'Frist setzen', english: 'To set a deadline', example: '„Wir sollten hierfür eine realistische Frist setzen."' },
  { id: 39, phase: 'Action', category: 'Documentation', german: 'Protokoll führen', english: 'To take minutes', example: '„Wer würde sich bereit erklären, heute Protokoll zu führen?"' },
  { id: 40, phase: 'Action', category: 'Follow-up', german: 'Nachfassen', english: 'To follow up', example: '„Ich werde nächste Woche diesbezüglich noch einmal nachfassen."' },
  { id: 41, phase: 'Closing', category: 'Finalizing', german: 'Abschließen', english: 'To conclude', example: '„Lassen Sie uns diesen Workshop nun offiziell abschließen."' },
  { id: 42, phase: 'Closing', category: 'Takeaway', german: 'Kernbotschaft', english: 'Key takeaway', example: '„Was ist für Sie die wichtigste Kernbotschaft des Tages?"' },
  { id: 43, phase: 'Closing', category: 'Gratitude', german: 'Vielen Dank', english: 'Thank you very much', example: '„Vielen Dank für Ihre aktive Teilnahme und die guten Impulse."' },
  { id: 44, phase: 'Closing', category: 'Outlook', german: 'Ausblick', english: 'Outlook/Future view', example: '„Zum Abschluss möchte ich noch einen kurzen Ausblick geben."' },
  { id: 45, phase: 'Closing', category: 'Feedback loop', german: 'Blitzlicht', english: 'Lightning round (brief feedback)', example: '„Machen wir zum Ende ein kurzes Blitzlicht: Wie fühlen Sie sich?"' },
  { id: 46, phase: 'Idioms', category: 'On Point', german: 'Auf den Punkt bringen', english: 'To get to the point', example: '„Danke, das hat das Problem genau auf den Punkt gebracht."' },
  { id: 47, phase: 'Idioms', category: 'Common ground', german: 'Nenner', english: 'Common denominator', example: '„Wir müssen hier einen gemeinsamen Nenner finden."' },
  { id: 48, phase: 'Idioms', category: 'Deep dive', german: 'Eintauchen', english: 'To dive into', example: '„Lassen Sie uns tief in die Materie eintauchen."' },
  { id: 49, phase: 'Idioms', category: 'Red thread', german: 'Roter Faden', english: 'Common thread', example: '„Der rote Faden fehlt mir in dieser Argumentation noch etwas."' },
  { id: 50, phase: 'Idioms', category: 'Closing gap', german: 'Lücke schließen', english: 'To close the gap', example: '„Wir müssen die Lücke zwischen Theorie und Praxis schließen."' },
];

const phaseColors: Record<string, { bg: string; text: string; border: string }> = {
  Opening: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-l-emerald-500' },
  Flow: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-l-blue-500' },
  Interruption: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-l-amber-500' },
  'Change Topic': { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-700 dark:text-violet-300', border: 'border-l-violet-500' },
  Conflict: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-300', border: 'border-l-rose-500' },
  Engagement: { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-l-cyan-500' },
  Action: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', border: 'border-l-orange-500' },
  Closing: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-l-indigo-500' },
  Idioms: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-700 dark:text-pink-300', border: 'border-l-pink-500' },
};

const phaseOrder: Phase[] = ['all', 'Opening', 'Flow', 'Interruption', 'Change Topic', 'Conflict', 'Engagement', 'Action', 'Closing', 'Idioms'];

export default function WorkshopPhrasesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activePhase, setActivePhase] = useState<Phase>('all');
  const [highlighted, setHighlighted] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    let result = phrases;
    if (activePhase !== 'all') {
      result = result.filter((p) => p.phase === activePhase);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.german.toLowerCase().includes(q) ||
          p.english.toLowerCase().includes(q) ||
          p.example.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activePhase]);

  const toggleHighlight = (id: number) => {
    setHighlighted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const speak = (text: string) => {
    const clean = text.replace(/[„"]/g, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'de-DE';
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/speaking')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Workshop Facilitation Boot Camp</h1>
          <p className="text-sm text-muted-foreground">50 Power Phrases · Klicke auf eine Zeile, um sie zu markieren</p>
        </div>
      </div>

      {/* Search + Phase filters */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Phrase suchen..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {phaseOrder.map((phase) => {
            const colors = phase !== 'all' ? phaseColors[phase] : null;
            return (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-all border',
                  activePhase === phase
                    ? phase === 'all'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : cn(colors?.bg, colors?.text, 'border-current')
                    : 'bg-secondary text-muted-foreground border-border hover:bg-accent'
                )}
              >
                {phase === 'all' ? 'Alle' : phase}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress indicator */}
      {highlighted.size > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${(highlighted.size / 50) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground tabular-nums">
            {highlighted.size}/50 markiert
          </span>
          {highlighted.size > 0 && (
            <button
              onClick={() => setHighlighted(new Set())}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* Cards view for mobile, table for desktop */}
      <div className="space-y-2 sm:hidden">
        {filtered.map((p) => {
          const colors = phaseColors[p.phase];
          const isHighlighted = highlighted.has(p.id);
          return (
            <div
              key={p.id}
              onClick={() => toggleHighlight(p.id)}
              className={cn(
                'cursor-pointer rounded-lg border-l-4 p-3 transition-all',
                colors.border,
                isHighlighted
                  ? 'bg-primary/5 border border-l-4 border-primary/20 ring-1 ring-primary/10'
                  : 'bg-card border border-l-4 border-border hover:bg-accent/50'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold', colors.bg, colors.text)}>
                      {p.phase}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{p.category}</span>
                  </div>
                  <p className="font-semibold text-sm text-foreground">{p.german}</p>
                  <p className="text-xs text-muted-foreground">{p.english}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); speak(p.example); }}
                  className="mt-1 shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-2 text-xs italic text-muted-foreground leading-relaxed">{p.example}</p>
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/60">
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground w-8">#</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">Phase</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">Kategorie</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">Deutsch</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">Englisch</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">C1-Beispielsatz</th>
                <th className="px-3 py-2.5 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => {
                const colors = phaseColors[p.phase];
                const isHighlighted = highlighted.has(p.id);
                // Show phase group separator
                const isNewPhase = idx === 0 || filtered[idx - 1].phase !== p.phase;

                return (
                  <tr
                    key={p.id}
                    onClick={() => toggleHighlight(p.id)}
                    className={cn(
                      'cursor-pointer transition-colors border-l-4',
                      colors.border,
                      isHighlighted
                        ? 'bg-primary/5 ring-1 ring-inset ring-primary/10'
                        : 'hover:bg-accent/40',
                      isNewPhase && idx > 0 && 'border-t-2 border-t-border'
                    )}
                  >
                    <td className="px-3 py-2.5 text-xs text-muted-foreground tabular-nums">{p.id}</td>
                    <td className="px-3 py-2.5">
                      <span className={cn('inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold', colors.bg, colors.text)}>
                        {p.phase}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground">{p.category}</td>
                    <td className="px-3 py-2.5 font-semibold text-foreground">{p.german}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{p.english}</td>
                    <td className="px-3 py-2.5 text-xs italic text-muted-foreground max-w-xs leading-relaxed">{p.example}</td>
                    <td className="px-2 py-2.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); speak(p.example); }}
                        className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground text-sm">
          Keine Phrase gefunden.
        </div>
      )}
    </div>
  );
}
