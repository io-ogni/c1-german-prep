import { useTranslation } from '@/i18n/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function PhraseList({ phrases }: { phrases: string[] }) {
  return (
    <ul className="space-y-1.5 pl-1">
      {phrases.map((p, i) => (
        <li key={i} className="text-sm text-foreground leading-relaxed">
          <span className="text-muted-foreground mr-2">•</span>{p}
        </li>
      ))}
    </ul>
  );
}

function SubSection({ label, phrases }: { label: string; phrases: string[] }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <PhraseList phrases={phrases} />
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
      <span className="text-foreground">{text}</span>
    </div>
  );
}

const quickRef = [
  { fn: 'MEINUNG', items: 'Meiner Meinung nach / Ich bin überzeugt / Aus meiner Sicht' },
  { fn: 'ZUSTIMMUNG', items: 'Da stimme ich zu / Genauso sehe ich das' },
  { fn: 'WIDERSPRUCH', items: 'Da bin ich anderer Meinung / Ich sehe das anders' },
  { fn: 'BEISPIEL', items: 'Zum Beispiel / Ein konkretes Beispiel wäre' },
  { fn: 'URSACHE', items: 'Der Grund dafür ist / Das liegt daran, dass' },
  { fn: 'FOLGE', items: 'Das führt dazu, dass / Die Konsequenz ist' },
  { fn: 'VERGLEICH', items: 'Im Vergleich zu / Verglichen mit' },
  { fn: 'KONTRAST', items: 'Im Gegensatz dazu / Andererseits' },
  { fn: 'ZUSAMMENFASSUNG', items: 'Zusammenfassend / Alles in allem' },
];

export default function SpeakingPage() {
  const { lang } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {lang === 'de' ? 'Mündlicher Ausdruck' : 'Speaking'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {lang === 'de'
            ? 'Redemittel für die mündliche Prüfung — auswendig lernen!'
            : 'Phrases for the oral exam — learn by heart!'}
        </p>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <Accordion type="multiple" className="w-full">
            {/* 1. Präsentation */}
            <AccordionItem value="praesentation">
              <AccordionTrigger className="text-base font-semibold">1. Präsentation (Teil 1)</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Begrüßung und Thema vorstellen" phrases={[
                  'Guten Tag, ich möchte Ihnen heute das Thema ... vorstellen.',
                  'In meinem Vortrag geht es um die Frage, ob / wie / warum ...',
                  'Ich habe dieses Thema gewählt, weil ...',
                  'Das Thema ... ist derzeit besonders aktuell, da ...',
                  'Ich freue mich, Ihnen heute etwas über ... erzählen zu dürfen.',
                ]} />
                <SubSection label="Gliederung ankündigen" phrases={[
                  'Mein Vortrag gliedert sich in drei Teile: Zunächst ..., dann ..., und schließlich ...',
                  'Ich werde zunächst auf ... eingehen, anschließend ... und zum Schluss ...',
                  'Ich möchte drei Aspekte ansprechen: ...',
                ]} />
                <SubSection label="Zum nächsten Punkt überleiten" phrases={[
                  'Damit komme ich zum nächsten Punkt: ...',
                  'Nun möchte ich auf ... eingehen.',
                  'Ein weiterer wichtiger Aspekt ist ...',
                  'Kommen wir nun zu der Frage, ob / wie / warum ...',
                ]} />
                <SubSection label="Beispiele aus eigener Erfahrung" phrases={[
                  'Aus meiner persönlichen Erfahrung kann ich sagen, dass ...',
                  'In meinem Heimatland ist es so, dass ...',
                  'Ich habe selbst erlebt, dass ...',
                  'Ein Beispiel aus meinem Alltag: ...',
                ]} />
                <SubSection label="Vortrag abschließen" phrases={[
                  'Zusammenfassend möchte ich sagen, dass ...',
                  'Damit bin ich am Ende meines Vortrags angelangt.',
                  'Abschließend lässt sich festhalten, dass ...',
                  'Vielen Dank für Ihre Aufmerksamkeit. Haben Sie Fragen?',
                ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 2. Diskussion */}
            <AccordionItem value="diskussion">
              <AccordionTrigger className="text-base font-semibold">2. Diskussion (Teil 2)</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Eigene Meinung äußern" phrases={[
                  'Meiner Meinung nach ...',
                  'Ich bin der Überzeugung, dass ...',
                  'Aus meiner Sicht ...',
                  'Ich vertrete die Ansicht, dass ...',
                  'Persönlich halte ich ... für ...',
                  'Wenn Sie mich fragen, würde ich sagen, dass ...',
                ]} />
                <SubSection label="Zustimmen" phrases={[
                  'Da stimme ich Ihnen vollkommen zu.',
                  'Genauso sehe ich das auch.',
                  'Das ist ein sehr guter Punkt.',
                  'Da haben Sie absolut recht.',
                  'Das entspricht auch meiner Erfahrung.',
                  'Dem kann ich nur zustimmen.',
                ]} />
                <SubSection label="Teilweise zustimmen" phrases={[
                  'Da haben Sie einerseits recht, aber ...',
                  'Das stimmt zwar, allerdings ...',
                  'Grundsätzlich teile ich Ihre Meinung, jedoch ...',
                  'Bis zu einem gewissen Punkt stimme ich zu, aber ...',
                  'Das mag sein, dennoch sollte man bedenken, dass ...',
                ]} />
                <SubSection label="Höflich widersprechen" phrases={[
                  'Da bin ich leider anderer Meinung.',
                  'Ich sehe das etwas anders.',
                  'Erlauben Sie mir, eine andere Perspektive einzubringen.',
                  'Ich kann Ihren Standpunkt nachvollziehen, aber ...',
                  'Da muss ich Ihnen leider widersprechen.',
                  'Das sehe ich nicht ganz so.',
                ]} />
                <SubSection label="Nachfragen" phrases={[
                  'Könnten Sie das bitte näher erläutern?',
                  'Was genau meinen Sie damit?',
                  'Haben Sie dafür ein konkretes Beispiel?',
                  'Wie kommen Sie zu dieser Einschätzung?',
                  'Darf ich nachfragen: ...?',
                ]} />
                <SubSection label="Auf den Partner eingehen" phrases={[
                  'Sie haben vorhin erwähnt, dass ... — dazu möchte ich sagen ...',
                  'Wenn ich Sie richtig verstanden habe, meinen Sie, dass ...',
                  'Das ist ein interessanter Gedanke. Ich möchte hinzufügen, dass ...',
                  'Was halten Sie denn von ...?',
                  'Wie sehen Sie das?',
                ]} />
                <SubSection label="Kompromiss finden" phrases={[
                  'Vielleicht können wir uns darauf einigen, dass ...',
                  'Ein Kompromiss wäre vielleicht ...',
                  'Wir sind uns zumindest einig, dass ...',
                  'Lassen Sie uns einen Mittelweg finden.',
                ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 3. Zusammenfassung */}
            <AccordionItem value="zusammenfassung">
              <AccordionTrigger className="text-base font-semibold">3. Zusammenfassung (Teil 3)</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Zusammenfassung des Gehörten" phrases={[
                  'Der Text / Die Sendung handelt von ...',
                  'Im Wesentlichen geht es darum, dass ...',
                  'Die wichtigsten Punkte sind ...',
                  'Es wird berichtet, dass ...',
                  'Der Autor / Die Autorin vertritt die These, dass ...',
                ]} />
                <SubSection label="Eigene Stellungnahme" phrases={[
                  'Dazu möchte ich anmerken, dass ...',
                  'Ich finde es bemerkenswert, dass ...',
                  'In Bezug auf mein Heimatland kann ich sagen, dass ...',
                ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 4. Allgemeine Redemittel */}
            <AccordionItem value="allgemein">
              <AccordionTrigger className="text-base font-semibold">4. Allgemeine Redemittel</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Um Bedenkzeit bitten" phrases={[
                  'Das ist eine gute Frage. Lassen Sie mich kurz überlegen.',
                  'Darüber habe ich noch nicht so genau nachgedacht, aber ...',
                  'Spontan würde ich sagen, dass ...',
                ]} />
                <SubSection label="Etwas umformulieren" phrases={[
                  'Anders gesagt: ...',
                  'Was ich damit sagen möchte, ist ...',
                  'Ich formuliere es mal anders: ...',
                  'Mit anderen Worten: ...',
                ]} />
                <SubSection label="Unterbrechen / unterbrochen werden" phrases={[
                  'Entschuldigung, darf ich kurz etwas dazu sagen?',
                  'Einen Moment, ich möchte meinen Gedanken noch zu Ende führen.',
                  'Lassen Sie mich bitte noch kurz ausreden.',
                  'Verzeihung, dass ich Sie unterbreche, aber ...',
                ]} />
                <SubSection label="Unsicherheit ausdrücken" phrases={[
                  'Ich bin mir nicht ganz sicher, aber ich glaube, dass ...',
                  'Soweit ich weiß, ...',
                  'Wenn ich mich nicht irre, ...',
                  'Es könnte sein, dass ...',
                ]} />
                <SubSection label="Verallgemeinern" phrases={[
                  'Im Allgemeinen kann man sagen, dass ...',
                  'In der Regel ist es so, dass ...',
                  'Grundsätzlich gilt, dass ...',
                  'Man kann davon ausgehen, dass ...',
                ]} />
                <SubSection label="Einschränken" phrases={[
                  'Das gilt allerdings nur für ...',
                  'Man muss dabei berücksichtigen, dass ...',
                  'Natürlich gibt es auch Ausnahmen.',
                  'Das hängt natürlich davon ab, ob / wie ...',
                ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 5. Schnellreferenz */}
            <AccordionItem value="schnellreferenz">
              <AccordionTrigger className="text-base font-semibold">5. Schnellreferenz</AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="overflow-x-auto rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[140px] font-semibold">Funktion</TableHead>
                        <TableHead className="font-semibold">Redemittel</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quickRef.map((r) => (
                        <TableRow key={r.fn}>
                          <TableCell className="font-medium text-foreground text-sm">{r.fn}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{r.items}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 6. Tipps */}
            <AccordionItem value="tipps">
              <AccordionTrigger className="text-base font-semibold">
                6. {lang === 'de' ? 'Tipps für die mündliche Prüfung' : 'Tips for the oral exam'}
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <ChecklistItem text="Langsam und deutlich sprechen — Tempo ≠ Kompetenz" />
                <ChecklistItem text="Pausen sind erlaubt und wirken souverän" />
                <ChecklistItem text="Blickkontakt mit Prüfer UND Gesprächspartner" />
                <ChecklistItem text="Stichworte als Gedächtnisstütze, nicht ablesen" />
                <ChecklistItem text="Wort nicht parat? Umschreiben, nicht schweigen" />
                <ChecklistItem text="Auf den Partner eingehen — nicht nur eigene Meinung runterbeten" />
                <ChecklistItem text="Grammatikfehler nicht nachträglich korrigieren — weitermachen" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
