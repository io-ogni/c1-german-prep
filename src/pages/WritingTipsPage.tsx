import { useTranslation } from '@/i18n/useTranslation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Check, X, Trash2 } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { useCustomPhrases } from '@/hooks/useCustomPhrases';
import { AddPhraseInput } from '@/components/writing-tips/AddPhraseInput';
import { AddConnectorInput } from '@/components/writing-tips/AddConnectorInput';

function PhraseList({ phrases, customPhrases, sectionKey, onAdd, onRemove }: {
  phrases: string[];
  customPhrases?: string[];
  sectionKey?: string;
  onAdd?: (key: string, phrase: string) => void;
  onRemove?: (key: string, index: number) => void;
}) {
  return (
    <div>
      <ul className="space-y-1.5 pl-1">
        {phrases.map((p, i) => (
          <li key={i} className="text-sm text-foreground leading-relaxed">
            <span className="text-muted-foreground mr-2">•</span>{p}
          </li>
        ))}
        {customPhrases?.map((p, i) => (
          <li key={`custom-${i}`} className="text-sm text-foreground leading-relaxed flex items-start gap-1 group">
            <span className="text-primary mr-2">•</span>
            <span className="flex-1">{p}</span>
            {onRemove && sectionKey && (
              <button
                onClick={() => onRemove(sectionKey, i)}
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </li>
        ))}
      </ul>
      {sectionKey && onAdd && (
        <AddPhraseInput onAdd={(val) => onAdd(sectionKey, val)} />
      )}
    </div>
  );
}

function SubSection({ label, phrases, sectionKey, customPhrases, onAdd, onRemove }: {
  label: string;
  phrases: string[];
  sectionKey: string;
  customPhrases?: string[];
  onAdd?: (key: string, phrase: string) => void;
  onRemove?: (key: string, index: number) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <PhraseList
        phrases={phrases}
        customPhrases={customPhrases}
        sectionKey={sectionKey}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    </div>
  );
}

function ChecklistItem({ text, good }: { text: string; good: boolean }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      {good ? (
        <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
      ) : (
        <X className="h-4 w-4 shrink-0 mt-0.5 text-destructive" />
      )}
      <span className="text-foreground">{text}</span>
    </div>
  );
}

export default function WritingTipsPage() {
  const { lang } = useTranslation();
  const { customPhrases, customConnectors, addPhrase, removePhrase, addConnector, removeConnector } = useCustomPhrases();

  const connectors = [
    { fn: 'Grund', items: 'da, weil, aufgrund (+Gen.), wegen (+Gen.)' },
    { fn: 'Einräumung', items: 'obwohl, trotzdem, dennoch, trotz (+Gen.)' },
    { fn: 'Gegensatz', items: 'jedoch, allerdings, hingegen, im Gegensatz dazu' },
    { fn: 'Folge', items: 'deshalb, daher, folglich, infolgedessen, sodass' },
    { fn: 'Bedingung', items: 'wenn, falls, sofern, vorausgesetzt dass' },
    { fn: 'Zweck', items: 'um...zu, damit, mit dem Ziel' },
    { fn: 'Aufzählung', items: 'zunächst...dann...schließlich, einerseits...andererseits' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/writing">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tipps & Redemittel</h1>
          <p className="text-sm text-muted-foreground">
            {lang === 'de' ? 'Referenzmaterial für den schriftlichen Ausdruck' : 'Reference material for written expression'}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <Accordion type="multiple" className="w-full">
            {/* 1. Textstruktur */}
            <AccordionItem value="textstruktur">
              <AccordionTrigger className="text-base font-semibold">1. Textstruktur</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="rounded-lg border border-border p-4 space-y-4 bg-muted/30">
                  <div>
                    <p className="font-bold text-sm text-foreground">1. EINLEITUNG (2–3 Sätze)</p>
                    <p className="text-sm text-muted-foreground">Thema einführen, Aktualität herstellen, zum Hauptteil überleiten</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">2. HAUPTTEIL (150–200 Wörter)</p>
                    <p className="text-sm text-muted-foreground">Pro/Kontra abwägen, Argumente mit Beispielen stützen, Konnektoren verwenden</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">3. SCHLUSS (2–3 Sätze)</p>
                    <p className="text-sm text-muted-foreground">Fazit, eigene Position, Ausblick</p>
                  </div>
                  <div className="border-t border-border pt-3 text-xs text-muted-foreground space-y-1">
                    <p>Gesamtlänge: 250–350 Wörter</p>
                    <p>Zeit: 70 Minuten</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 2. Prüfungstipps */}
            <AccordionItem value="pruefungstipps">
              <AccordionTrigger className="text-base font-semibold">2. Prüfungstipps</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <ChecklistItem good text="Aufgabenstellung ZWEIMAL lesen" />
                <ChecklistItem good text="5–10 Minuten planen (Stichworte)" />
                <ChecklistItem good text="ALLE Punkte der Aufgabenstellung behandeln" />
                <ChecklistItem good text="Satzbau variieren" />
                <ChecklistItem good text="Konjunktiv II für Höflichkeit und Distanz" />
                <ChecklistItem good text="10 Minuten für Korrekturlesen" />
                <ChecklistItem good={false} text="Nur Pro ODER nur Kontra (C1 verlangt Abwägung)" />
                <ChecklistItem good={false} text="Argumente ohne Beispiele" />
                <ChecklistItem good={false} text="Fehlende Übergänge zwischen Absätzen" />
              </AccordionContent>
            </AccordionItem>

            {/* 3. Redemittel — Einleitung */}
            <AccordionItem value="redemittel-einleitung">
              <AccordionTrigger className="text-base font-semibold">3. Redemittel — Einleitung</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Aktualität herstellen" sectionKey="einleitung-aktualitaet"
                  customPhrases={customPhrases['einleitung-aktualitaet']} onAdd={addPhrase} onRemove={removePhrase}
                  phrases={[
                    'In der heutigen Gesellschaft ist ... zu einer wichtigen Frage geworden.',
                    'Heutzutage wird das Thema ... zunehmend diskutiert.',
                    'Die Debatte um ... ist nach wie vor aktuell.',
                    'In den letzten Jahren hat ... immer mehr an Bedeutung gewonnen.',
                    'Kaum ein Thema wird derzeit so kontrovers diskutiert wie ...',
                  ]} />
                <SubSection label="Ein Problem einleiten" sectionKey="einleitung-problem"
                  customPhrases={customPhrases['einleitung-problem']} onAdd={addPhrase} onRemove={removePhrase}
                  phrases={[
                    'Viele Menschen / Unternehmen stoßen dabei an ihre Grenzen.',
                    'Trotz zahlreicher Bemühungen bleibt ... ein ungelöstes Problem.',
                    'Die Herausforderung besteht darin, dass ...',
                  ]} />
                <SubSection label="Zum Hauptteil überleiten" sectionKey="einleitung-ueberleitung"
                  customPhrases={customPhrases['einleitung-ueberleitung']} onAdd={addPhrase} onRemove={removePhrase}
                  phrases={[
                    'Im Folgenden sollen die Vor- und Nachteile von ... dargelegt werden.',
                    'Nachfolgend werden die wichtigsten Argumente dargestellt und mit einem Fazit abgeschlossen.',
                  ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 4. Redemittel — Hauptteil */}
            <AccordionItem value="redemittel-hauptteil">
              <AccordionTrigger className="text-base font-semibold">4. Redemittel — Hauptteil</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Argumente einführen" sectionKey="hauptteil-argumente"
                  customPhrases={customPhrases['hauptteil-argumente']} onAdd={addPhrase} onRemove={removePhrase}
                  phrases={[
                    'Ein wesentlicher Aspekt ist ...',
                    'Zunächst ist festzuhalten, dass ...',
                    'Ein zentrales Argument für / gegen ... ist ...',
                    'Einer der Hauptgründe für ... ist ...',
                  ]} />
                <SubSection label="Weitere Argumente anfügen" sectionKey="hauptteil-weitere"
                  customPhrases={customPhrases['hauptteil-weitere']} onAdd={addPhrase} onRemove={removePhrase}
                  phrases={[
                    'Darüber hinaus ist zu beachten, dass ...',
                    'Des Weiteren sollte nicht vergessen werden, dass ...',
                    'Hinzu kommt, dass ...',
                    'Überdies lässt sich anführen, dass ...',
                    'Ferner ist zu berücksichtigen, dass ...',
                    'Nicht zuletzt spielt ... eine entscheidende Rolle.',
                  ]} />
                <SubSection label="Gegenargumente einleiten" sectionKey="hauptteil-gegen"
                  customPhrases={customPhrases['hauptteil-gegen']} onAdd={addPhrase} onRemove={removePhrase}
                  phrases={[
                    'Dem steht jedoch gegenüber, dass ...',
                    'Auf der anderen Seite muss man einräumen, dass ...',
                    'Allerdings gibt es auch Schattenseiten.',
                    'Kritiker wenden ein, dass ...',
                    'Es darf jedoch nicht übersehen werden, dass ...',
                  ]} />
                <SubSection label="Beispiele anführen" sectionKey="hauptteil-beispiele"
                  customPhrases={customPhrases['hauptteil-beispiele']} onAdd={addPhrase} onRemove={removePhrase}
                  phrases={[
                    'Dies lässt sich am Beispiel von ... verdeutlichen.',
                    'Ein anschauliches Beispiel hierfür ist ...',
                    'So zeigt sich etwa, dass ...',
                    'Konkret bedeutet das: ...',
                  ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 5. Redemittel — Schluss */}
            <AccordionItem value="redemittel-schluss">
              <AccordionTrigger className="text-base font-semibold">5. Redemittel — Schluss</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Fazit ziehen" sectionKey="schluss-fazit"
                  customPhrases={customPhrases['schluss-fazit']} onAdd={addPhrase} onRemove={removePhrase}
                  phrases={[
                    'Zusammenfassend lässt sich feststellen, dass ...',
                    'Nach Abwägung der Vor- und Nachteile lässt sich feststellen, dass ...',
                    'Alles in allem zeigt sich, dass ...',
                  ]} />
                <SubSection label="Eigene Meinung" sectionKey="schluss-meinung"
                  customPhrases={customPhrases['schluss-meinung']} onAdd={addPhrase} onRemove={removePhrase}
                  phrases={[
                    'Meiner Ansicht nach ...',
                    'Ich bin der Überzeugung, dass ...',
                  ]} />
                <SubSection label="Ausblick" sectionKey="schluss-ausblick"
                  customPhrases={customPhrases['schluss-ausblick']} onAdd={addPhrase} onRemove={removePhrase}
                  phrases={[
                    'Es bleibt abzuwarten, wie sich ... entwickeln wird.',
                    'Schließen möchte ich mit dem Gedanken, dass ...',
                  ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 6. Konnektoren */}
            <AccordionItem value="konnektoren">
              <AccordionTrigger className="text-base font-semibold">6. Konnektoren</AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="overflow-x-auto rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px] font-semibold">Funktion</TableHead>
                        <TableHead className="font-semibold">Konnektoren</TableHead>
                        <TableHead className="w-[40px]" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {connectors.map((c) => (
                        <TableRow key={c.fn}>
                          <TableCell className="font-medium text-foreground text-sm">{c.fn}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{c.items}</TableCell>
                          <TableCell />
                        </TableRow>
                      ))}
                      {customConnectors.map((c, i) => (
                        <TableRow key={`custom-${i}`} className="group">
                          <TableCell className="font-medium text-foreground text-sm">{c.fn}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{c.items}</TableCell>
                          <TableCell>
                            <button
                              onClick={() => removeConnector(i)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <AddConnectorInput onAdd={addConnector} />
              </AccordionContent>
            </AccordionItem>

            {/* 7. C1-Strukturen */}
            <AccordionItem value="c1-strukturen">
              <AccordionTrigger className="text-base font-semibold">7. C1-Strukturen</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Partizipialkonstruktionen</p>
                  <div className="rounded-lg border border-border p-3 space-y-1 bg-muted/30">
                    <p className="text-sm text-muted-foreground line-through">„Die Nachfrage, die in den letzten Jahren stark gestiegen ist..."</p>
                    <p className="text-sm text-foreground font-medium">→ „Die in den letzten Jahren stark gestiegene Nachfrage..."</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nominalisierungen</p>
                  <div className="rounded-lg border border-border p-3 space-y-1 bg-muted/30">
                    <p className="text-sm text-muted-foreground line-through">„Wenn man flexible Arbeitsmodelle einführt..."</p>
                    <p className="text-sm text-foreground font-medium">→ „Die Einführung flexibler Arbeitsmodelle..."</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Konjunktiv II für Distanz</p>
                  <PhraseList phrases={[
                    '„Man könnte argumentieren, dass..."',
                    '„Es ließe sich einwenden, dass..."',
                  ]} />
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Passiv-Ersatzformen</p>
                  <PhraseList phrases={[
                    '„... lässt sich feststellen" (= kann festgestellt werden)',
                    '„... ist zu berücksichtigen" (= muss berücksichtigt werden)',
                  ]} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
