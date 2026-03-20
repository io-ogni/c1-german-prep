import { useTranslation } from '@/i18n/useTranslation';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TelcBadge } from '@/components/shared/TelcBadge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  GraduationCap,
  BookOpen,
  Headphones,
  PenLine,
  MessageSquare,
  ExternalLink,
  FileText,
  ArrowRight,
  Link as LinkIcon,
  Check,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ExamPrepPage() {
  const { lang } = useTranslation();
  const de = lang === 'de';

  const examRows = [
    { teil: de ? 'Schriftliche Prüfung' : 'Written Exam', abschnitt: '', dauer: '3h 40min' + (de ? ' (inkl. 20 Min. Pause)' : ' (incl. 20 min break)'), aufgaben: '', punkte: '', isHeader: true },
    { teil: de ? 'Leseverstehen' : 'Reading', abschnitt: de ? 'Teil 1: Textrekonstruktion' : 'Part 1: Text Reconstruction', dauer: de ? '90 Min. (gesamt)' : '90 min (total)', aufgaben: de ? '6 Lücken, 8 Optionen' : '6 gaps, 8 options', punkte: '18' },
    { teil: '', abschnitt: de ? 'Teil 2: Selektives Verstehen' : 'Part 2: Selective Reading', dauer: '', aufgaben: de ? '6 Zuordnungen' : '6 matching items', punkte: '18' },
    { teil: '', abschnitt: de ? 'Teil 3: Detailverstehen' : 'Part 3: Detailed Reading', dauer: '', aufgaben: de ? '11 Aussagen (richtig/falsch/nicht im Text)' : '11 statements (true/false/not in text)', punkte: '12' },
    { teil: de ? 'Sprachbausteine' : 'Language Elements', abschnitt: de ? '22 Multiple-Choice-Lücken' : '22 multiple-choice gaps', dauer: de ? 'Teil von Leseverstehen' : 'Part of reading section', aufgaben: '22 Items', punkte: '22' },
    { teil: de ? 'Hörverstehen' : 'Listening', abschnitt: de ? 'Teil 1: Globalverstehen' : 'Part 1: Global Understanding', dauer: de ? 'ca. 40 Min.' : 'approx. 40 min', aufgaben: de ? '8 Zuordnungen, 10 Aussagen' : '8 matching, 10 statements', punkte: '24' },
    { teil: '', abschnitt: de ? 'Teil 2: Detailverstehen' : 'Part 2: Detailed Listening', dauer: '', aufgaben: de ? '10 MC-Fragen (a/b/c)' : '10 MC questions (a/b/c)', punkte: '30' },
    { teil: '', abschnitt: de ? 'Teil 3: Informationstransfer' : 'Part 3: Information Transfer', dauer: '', aufgaben: de ? '10 Lücken (max. 4 Wörter)' : '10 gaps (max. 4 words)', punkte: '20' },
    { teil: de ? 'Schriftlicher Ausdruck' : 'Written Expression', abschnitt: de ? '1 Text (Erörterung, Stellungnahme o.ä.)' : '1 text (essay, opinion piece, etc.)', dauer: '70 Min.', aufgaben: de ? '1 Aufgabe' : '1 task', punkte: '48' },
    { teil: de ? 'Mündliche Prüfung' : 'Oral Exam', abschnitt: '', dauer: de ? 'ca. 16–24 Min. (+20 Min. Vorbereitung)' : 'approx. 16–24 min (+20 min prep)', aufgaben: '', punkte: '', isHeader: true },
    { teil: '', abschnitt: de ? 'Teil 1: Präsentation' : 'Part 1: Presentation', dauer: '', aufgaben: de ? 'Vortrag zu einem Thema' : 'Talk on a topic', punkte: '' },
    { teil: '', abschnitt: de ? 'Teil 2: Diskussion' : 'Part 2: Discussion', dauer: '', aufgaben: de ? 'Gespräch mit Partner/in' : 'Conversation with partner', punkte: '' },
    { teil: '', abschnitt: de ? 'Teil 3: Zusammenfassung' : 'Part 3: Summary', dauer: '', aufgaben: '', punkte: '48' },
  ];

  const tips = [
    {
      id: 'lesen',
      icon: BookOpen,
      title: de ? 'Leseverstehen' : 'Reading Comprehension',
      items: [
        { label: de ? 'Textrekonstruktion' : 'Text Reconstruction', tip: de ? 'Achte auf Verknüpfungsmittel (außerdem, deshalb, jedoch). Prüfe, ob Pronomen zum vorhergehenden Satz passen.' : 'Pay attention to linking words (außerdem, deshalb, jedoch). Check if pronouns match the preceding sentence.' },
        { label: de ? 'Selektives Verstehen' : 'Selective Reading', tip: de ? 'Lies die Fragen ZUERST, dann scanne den Text gezielt.' : 'Read the questions FIRST, then scan the text selectively.' },
        { label: de ? 'Detailverstehen' : 'Detailed Reading', tip: de ? '"Nicht im Text" ≠ falsch. Wenn die Information einfach nicht vorkommt, ist es "nicht im Text."' : '"Not in text" ≠ false. If the information simply doesn\'t appear, it\'s "not in text."' },
      ],
    },
    {
      id: 'sprach',
      icon: FileText,
      title: de ? 'Sprachbausteine' : 'Language Elements',
      items: [
        { label: '', tip: de ? 'Lies den gesamten Text einmal durch, bevor du die Lücken füllst.' : 'Read the entire text once before filling in the gaps.' },
        { label: '', tip: de ? 'Achte auf Präpositionen, Konnektoren und feste Wendungen.' : 'Pay attention to prepositions, connectors, and fixed expressions.' },
        { label: '', tip: de ? 'Im Zweifel: laut im Kopf lesen — oft "hört" man die richtige Antwort.' : 'When in doubt: read aloud in your head — you often "hear" the right answer.' },
      ],
    },
    {
      id: 'hoeren',
      icon: Headphones,
      title: de ? 'Hörverstehen' : 'Listening Comprehension',
      items: [
        { label: de ? 'Globalverstehen' : 'Global Understanding', tip: de ? 'Du hörst jeden Sprecher nur EINMAL. Lies die Aussagen vorher.' : 'You hear each speaker only ONCE. Read the statements beforehand.' },
        { label: de ? 'Detailverstehen' : 'Detailed Listening', tip: de ? 'Du hörst den Text ZWEIMAL. Beim ersten Mal: Gesamtverständnis. Beim zweiten Mal: Antworten prüfen.' : 'You hear the text TWICE. First time: overall understanding. Second time: check answers.' },
        { label: de ? 'Informationstransfer' : 'Information Transfer', tip: de ? 'Maximal 4 Wörter pro Lücke. Schreib genau, was du hörst — keine Umformulierungen.' : 'Maximum 4 words per gap. Write exactly what you hear — no paraphrasing.' },
      ],
    },
    {
      id: 'schreiben',
      icon: PenLine,
      title: de ? 'Schriftlicher Ausdruck' : 'Written Expression',
      items: [
        { label: '', tip: de ? 'Aufgabe genau lesen: Alle Punkte der Aufgabenstellung müssen behandelt werden.' : 'Read the task carefully: all points of the task must be addressed.' },
        { label: '', tip: de ? 'Struktur: Einleitung → Hauptteil mit Argumenten → Schluss mit eigener Meinung.' : 'Structure: Introduction → Main body with arguments → Conclusion with own opinion.' },
        { label: '', tip: de ? 'Bewertungskriterien: Aufgabengerechtheit, Korrektheit, Repertoire, Kommunikative Gestaltung — alle vier zählen gleich.' : 'Scoring criteria: Task fulfillment, Accuracy, Range, Communicative design — all four count equally.' },
        { label: '', tip: de ? '10 Minuten am Ende zum Korrekturlesen einplanen.' : 'Plan 10 minutes at the end for proofreading.' },
      ],
      textstruktur: {
        einleitung: de ? 'Thema einführen, Aktualität herstellen, zum Hauptteil überleiten' : 'Introduce the topic, establish relevance, transition to main body',
        hauptteil: de ? 'Pro/Kontra abwägen, Argumente mit Beispielen stützen, Konnektoren verwenden' : 'Weigh pros/cons, support arguments with examples, use connectors',
        schluss: de ? 'Fazit, eigene Position, Ausblick' : 'Conclusion, own position, outlook',
        laenge: de ? 'Gesamtlänge: 250–350 Wörter' : 'Total length: 250–350 words',
        zeit: de ? 'Zeit: 70 Minuten' : 'Time: 70 minutes',
      },
      checklist: [
        { good: true, text: de ? 'Aufgabenstellung ZWEIMAL lesen' : 'Read the task TWICE' },
        { good: true, text: de ? '5–10 Minuten planen (Stichworte)' : '5–10 minutes planning (keywords)' },
        { good: true, text: de ? 'ALLE Punkte der Aufgabenstellung behandeln' : 'Address ALL points of the task' },
        { good: true, text: de ? 'Satzbau variieren' : 'Vary sentence structure' },
        { good: true, text: de ? 'Konjunktiv II für Höflichkeit und Distanz' : 'Konjunktiv II for politeness and distance' },
        { good: true, text: de ? '10 Minuten für Korrekturlesen' : '10 minutes for proofreading' },
        { good: false, text: de ? 'Nur Pro ODER nur Kontra (C1 verlangt Abwägung)' : 'Only pro OR only contra (C1 requires balanced arguments)' },
        { good: false, text: de ? 'Argumente ohne Beispiele' : 'Arguments without examples' },
        { good: false, text: de ? 'Fehlende Übergänge zwischen Absätzen' : 'Missing transitions between paragraphs' },
      ],
    },
    {
      id: 'muendlich',
      icon: MessageSquare,
      title: de ? 'Mündliche Prüfung' : 'Oral Exam',
      items: [
        { label: de ? 'Präsentation' : 'Presentation', tip: de ? '3–4 Minuten, klare Struktur (Einleitung, Hauptpunkte, Fazit).' : '3–4 minutes, clear structure (introduction, main points, conclusion).' },
        { label: de ? 'Diskussion' : 'Discussion', tip: de ? 'Auf den Partner eingehen, nicht nur eigene Meinung wiederholen.' : 'Engage with your partner, don\'t just repeat your own opinion.' },
        { label: '', tip: de ? 'Redemittel vorbereiten (meiner Meinung nach, ich stimme zu/widerspreche, einerseits...andererseits).' : 'Prepare discourse markers (in my opinion, I agree/disagree, on one hand...on the other).' },
      ],
    },
  ];

  const resources = [
    {
      url: 'https://www.telc.net/fileadmin/user_upload/pdfs/Handbuch_und_Tipps_fuer_Pruefungsvorbereitung/Deutsch_c1_hochschule_tipps_zur_pruefungsvorbereitung.pdf',
      label: de ? 'Offizielle Tipps zur Prüfungsvorbereitung' : 'Official exam preparation tips',
    },
    {
      url: 'https://www.perfekt-deutsch.de/wp-content/uploads/2021/07/telc_deutsch_c1_hochschule_uebungstest1.pdf',
      label: de ? 'Kompletter Übungstest mit Lösungen' : 'Complete practice test with solutions',
    },
    {
      url: 'https://www.telc.net/fileadmin/user_upload/pdfs/Handbuch_und_Tipps_fuer_Pruefungsvorbereitung/Deutsch_c1_hochschule_Handbuch.pdf',
      label: de ? 'Ausführliches Prüfungshandbuch' : 'Detailed exam handbook',
    },
    {
      url: 'https://www.telc.net',
      label: de ? 'Prüfungstermine und -orte' : 'Exam dates and locations',
    },
  ];

  const practiceLinks = [
    { label: de ? 'Leseverstehen üben' : 'Practice Reading', path: '/reading', icon: BookOpen },
    { label: de ? 'Hörverstehen üben' : 'Practice Listening', path: '/listening', icon: Headphones },
    { label: de ? 'Schreiben üben' : 'Practice Writing', path: '/writing', icon: PenLine },
    { label: de ? 'Wortschatz & Grammatik' : 'Vocabulary & Grammar', path: '/vocabulary', icon: FileText },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          {de ? 'Prüfungsvorbereitung' : 'Exam Preparation'}
          <TelcBadge className="ml-1" />
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {de
            ? 'Alles, was du über die telc C1 Prüfung wissen musst'
            : 'Everything you need to know about the telc C1 exam'}
        </p>
      </div>

      {/* Section 1: Exam Structure */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {de ? 'Prüfungsaufbau' : 'Exam Structure'}
        </h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">{de ? 'Teil' : 'Section'}</TableHead>
                  <TableHead>{de ? 'Abschnitt' : 'Part'}</TableHead>
                  <TableHead className="w-[150px]">{de ? 'Dauer' : 'Duration'}</TableHead>
                  <TableHead>{de ? 'Aufgaben' : 'Tasks'}</TableHead>
                  <TableHead className="w-[70px] text-right">{de ? 'Punkte' : 'Points'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examRows.map((row, i) => (
                  <TableRow key={i} className={row.isHeader ? 'bg-secondary/50 font-medium' : ''}>
                    <TableCell className={row.teil ? 'font-medium' : ''}>{row.teil}</TableCell>
                    <TableCell>{row.abschnitt}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{row.dauer}</TableCell>
                    <TableCell className="text-xs">{row.aufgaben}</TableCell>
                    <TableCell className="text-right font-medium">{row.punkte}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground rounded-md bg-secondary/50 px-4 py-2.5">
          <strong>{de ? 'Bestehen:' : 'Passing:'}</strong>{' '}
          {de
            ? 'Mindestens 60% in der schriftlichen UND mündlichen Prüfung.'
            : 'At least 60% in both the written AND oral exam.'}
        </p>
      </section>

      {/* Section 2: Tips */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {de ? 'Tipps pro Abschnitt' : 'Tips per Section'}
        </h2>
        <Accordion type="multiple" className="space-y-2">
          {tips.map((section) => (
            <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-4 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <section.icon className="h-4 w-4 text-primary" />
                  {section.title}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground leading-relaxed">
                      {item.label && <strong className="text-foreground">{item.label}: </strong>}
                      {item.tip}
                    </li>
                  ))}
                </ul>
                {'textstruktur' in section && section.textstruktur && (
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      {de ? 'Textstruktur' : 'Text Structure'}
                    </p>
                    <div className="rounded-lg border border-border p-3 space-y-2 bg-muted/30">
                      <div>
                        <p className="font-bold text-xs text-foreground">{de ? '1. EINLEITUNG (2–3 Sätze)' : '1. INTRODUCTION (2–3 sentences)'}</p>
                        <p className="text-xs text-muted-foreground">{(section.textstruktur as any).einleitung}</p>
                      </div>
                      <div>
                        <p className="font-bold text-xs text-foreground">{de ? '2. HAUPTTEIL (150–200 Wörter)' : '2. MAIN BODY (150–200 words)'}</p>
                        <p className="text-xs text-muted-foreground">{(section.textstruktur as any).hauptteil}</p>
                      </div>
                      <div>
                        <p className="font-bold text-xs text-foreground">{de ? '3. SCHLUSS (2–3 Sätze)' : '3. CONCLUSION (2–3 sentences)'}</p>
                        <p className="text-xs text-muted-foreground">{(section.textstruktur as any).schluss}</p>
                      </div>
                      <div className="border-t border-border pt-2 text-[11px] text-muted-foreground space-y-0.5">
                        <p>{(section.textstruktur as any).laenge}</p>
                        <p>{(section.textstruktur as any).zeit}</p>
                      </div>
                    </div>
                  </div>
                )}
                {'checklist' in section && section.checklist && (
                  <div className="mt-4 pt-3 border-t border-border space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      {de ? 'Checkliste' : 'Checklist'}
                    </p>
                    {section.checklist.map((item: { good: boolean; text: string }, k: number) => (
                      <div key={k} className="flex items-start gap-2 text-sm">
                        {item.good ? (
                          <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                        ) : (
                          <X className="h-4 w-4 shrink-0 mt-0.5 text-destructive" />
                        )}
                        <span className="text-foreground">{item.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Section 3: Resources */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {de ? 'Nützliche Links' : 'Useful Resources'}
        </h2>
        <Card>
          <CardContent className="py-4 space-y-2">
            {resources.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline py-1"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                {r.label}
              </a>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Section 4: Practice in the App */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {de ? 'Übe in der App' : 'Practice in the App'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {practiceLinks.map((pl) => (
            <Link
              key={pl.path}
              to={pl.path}
              className="flex items-center justify-between rounded-lg border bg-card p-4 text-sm font-medium text-foreground transition-colors hover:bg-accent/50"
            >
              <span className="flex items-center gap-2">
                <pl.icon className="h-4 w-4 text-primary" />
                {pl.label}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
