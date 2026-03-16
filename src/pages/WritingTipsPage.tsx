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
import { useHighlightedPhrases } from '@/hooks/useHighlightedPhrases';
import { AddPhraseInput } from '@/components/writing-tips/AddPhraseInput';
import { AddConnectorInput } from '@/components/writing-tips/AddConnectorInput';

function PhraseList({ phrases, customPhrases, sectionKey, onAdd, onRemove, isHighlighted, onToggleHighlight }: {
  phrases: { de: string; en: string }[];
  customPhrases?: string[];
  sectionKey?: string;
  onAdd?: (key: string, phrase: string) => void;
  onRemove?: (key: string, index: number) => void;
  isHighlighted?: (phrase: string) => boolean;
  onToggleHighlight?: (phrase: string) => void;
}) {
  return (
    <div>
      <ul className="space-y-1.5 pl-1">
        {phrases.map((p, i) => (
          <li
            key={i}
            className={`text-sm leading-relaxed rounded-sm px-1.5 py-0.5 -mx-1.5 cursor-pointer transition-colors select-none ${
              isHighlighted?.(p.de)
                ? 'bg-primary/15 border-l-2 border-primary pl-2'
                : 'hover:bg-muted/50'
            }`}
            onClick={() => onToggleHighlight?.(p.de)}
          >
            <span className="text-muted-foreground mr-2">•</span>
            <span className="text-foreground">{p.de}</span>
            <br />
            <span className="text-muted-foreground text-xs ml-4 italic">{p.en}</span>
          </li>
        ))}
        {customPhrases?.map((p, i) => (
          <li
            key={`custom-${i}`}
            className={`text-sm text-foreground leading-relaxed flex items-start gap-1 group rounded-sm px-1.5 py-0.5 -mx-1.5 cursor-pointer transition-colors select-none ${
              isHighlighted?.(p)
                ? 'bg-primary/15 border-l-2 border-primary pl-2'
                : 'hover:bg-muted/50'
            }`}
            onClick={() => onToggleHighlight?.(p)}
          >
            <span className="text-primary mr-2">•</span>
            <span className="flex-1">{p}</span>
            {onRemove && sectionKey && (
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(sectionKey, i); }}
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

function SubSection({ label, phrases, sectionKey, customPhrases, onAdd, onRemove, isHighlighted, onToggleHighlight }: {
  label: string;
  phrases: { de: string; en: string }[];
  sectionKey: string;
  customPhrases?: string[];
  onAdd?: (key: string, phrase: string) => void;
  onRemove?: (key: string, index: number) => void;
  isHighlighted?: (phrase: string) => boolean;
  onToggleHighlight?: (phrase: string) => void;
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
        isHighlighted={isHighlighted}
        onToggleHighlight={onToggleHighlight}
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
  const { isHighlighted, toggle: toggleHighlight } = useHighlightedPhrases('writing-tips-highlights');

  const connectors = [
    { fn: 'Grund', items: 'da, weil, aufgrund (+Gen.), wegen (+Gen.), zumal, denn, nämlich' },
    { fn: 'Einräumung', items: 'obwohl, trotzdem, dennoch, trotz (+Gen.), nichtsdestotrotz, ungeachtet (+Gen.), wenngleich, wenn auch' },
    { fn: 'Gegensatz', items: 'jedoch, allerdings, hingegen, im Gegensatz dazu, demgegenüber, während, wohingegen, vielmehr' },
    { fn: 'Folge', items: 'deshalb, daher, folglich, infolgedessen, sodass, demzufolge, somit, dementsprechend' },
    { fn: 'Bedingung', items: 'wenn, falls, sofern, vorausgesetzt dass, unter der Bedingung dass, angenommen dass, es sei denn' },
    { fn: 'Zweck', items: 'um...zu, damit, mit dem Ziel, zwecks (+Gen.), zu dem Zweck' },
    { fn: 'Aufzählung', items: 'zunächst...dann...schließlich, einerseits...andererseits, zum einen...zum anderen, erstens...zweitens...drittens' },
    { fn: 'Einschränkung', items: 'insofern als, nur insoweit, lediglich, ausschließlich, es sei denn' },
    { fn: 'Verstärkung', items: 'umso mehr als, erst recht, zumal, insbesondere, vor allem, gerade deshalb' },
    { fn: 'Vergleich', items: 'ebenso wie, genauso wie, gleichermaßen, in ähnlicher Weise, analog zu' },
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
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'In der heutigen Gesellschaft ist ... zu einer wichtigen Frage geworden.', en: 'In today\'s society, ... has become an important question.' },
                    { de: 'Heutzutage wird das Thema ... zunehmend diskutiert.', en: 'Nowadays, the topic of ... is increasingly being discussed.' },
                    { de: 'Die Debatte um ... ist nach wie vor aktuell.', en: 'The debate about ... is still relevant today.' },
                    { de: 'In den letzten Jahren hat ... immer mehr an Bedeutung gewonnen.', en: 'In recent years, ... has gained more and more significance.' },
                    { de: 'Kaum ein Thema wird derzeit so kontrovers diskutiert wie ...', en: 'Hardly any topic is currently discussed as controversially as ...' },
                    { de: 'Angesichts der jüngsten Entwicklungen gewinnt die Frage nach ... erneut an Brisanz.', en: 'In light of recent developments, the question of ... is gaining renewed urgency.' },
                    { de: 'Spätestens seit ... rückt ... verstärkt in den Fokus der öffentlichen Debatte.', en: 'At the latest since ..., ... has moved increasingly into the focus of public debate.' },
                    { de: 'Die Tragweite dieser Problematik zeigt sich nicht zuletzt darin, dass ...', en: 'The scope of this issue is evident not least in the fact that ...' },
                    { de: 'In Anbetracht der gegenwärtigen Lage erscheint eine Auseinandersetzung mit ... unumgänglich.', en: 'In view of the current situation, engaging with ... appears unavoidable.' },
                    { de: 'Das Thema ... hat in jüngster Zeit eine neue Dimension angenommen.', en: 'The topic of ... has taken on a new dimension recently.' },
                  ]} />
                <SubSection label="Ein Problem einleiten" sectionKey="einleitung-problem"
                  customPhrases={customPhrases['einleitung-problem']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Viele Menschen / Unternehmen stoßen dabei an ihre Grenzen.', en: 'Many people / companies reach their limits in this regard.' },
                    { de: 'Trotz zahlreicher Bemühungen bleibt ... ein ungelöstes Problem.', en: 'Despite numerous efforts, ... remains an unsolved problem.' },
                    { de: 'Die Herausforderung besteht darin, dass ...', en: 'The challenge lies in the fact that ...' },
                    { de: 'Es stellt sich die grundlegende Frage, inwieweit ...', en: 'The fundamental question arises as to what extent ...' },
                    { de: 'Obwohl vielfach thematisiert, mangelt es nach wie vor an konkreten Lösungsansätzen.', en: 'Although frequently addressed, there is still a lack of concrete solutions.' },
                    { de: 'Die Kluft zwischen Anspruch und Wirklichkeit wird im Bereich ... besonders deutlich.', en: 'The gap between aspiration and reality is particularly evident in the area of ...' },
                  ]} />
                <SubSection label="Zum Hauptteil überleiten" sectionKey="einleitung-ueberleitung"
                  customPhrases={customPhrases['einleitung-ueberleitung']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Im Folgenden sollen die Vor- und Nachteile von ... dargelegt werden.', en: 'In the following, the advantages and disadvantages of ... will be outlined.' },
                    { de: 'Nachfolgend werden die wichtigsten Argumente dargestellt und mit einem Fazit abgeschlossen.', en: 'Below, the key arguments will be presented and concluded with a summary.' },
                    { de: 'Dieser Fragestellung möchte ich im Folgenden unter verschiedenen Gesichtspunkten nachgehen.', en: 'I would like to explore this question from various perspectives in the following.' },
                    { de: 'Um zu einem differenzierten Urteil zu gelangen, ist es notwendig, sowohl ... als auch ... in den Blick zu nehmen.', en: 'To reach a differentiated judgment, it is necessary to consider both ... and ...' },
                  ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 4. Redemittel — Hauptteil */}
            <AccordionItem value="redemittel-hauptteil">
              <AccordionTrigger className="text-base font-semibold">4. Redemittel — Hauptteil</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Argumente einführen" sectionKey="hauptteil-argumente"
                  customPhrases={customPhrases['hauptteil-argumente']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Ein wesentlicher Aspekt ist ...', en: 'A key aspect is ...' },
                    { de: 'Zunächst ist festzuhalten, dass ...', en: 'First of all, it should be noted that ...' },
                    { de: 'Ein zentrales Argument für / gegen ... ist ...', en: 'A central argument for / against ... is ...' },
                    { de: 'Einer der Hauptgründe für ... ist ...', en: 'One of the main reasons for ... is ...' },
                    { de: 'Als erstes sei darauf hingewiesen, dass ...', en: 'First, it should be pointed out that ...' },
                    { de: 'Ausschlaggebend für diese Entwicklung ist vor allem ...', en: 'The decisive factor for this development is above all ...' },
                    { de: 'An erster Stelle steht die Tatsache, dass ...', en: 'In first place stands the fact that ...' },
                    { de: 'Was besonders ins Gewicht fällt, ist ...', en: 'What is particularly significant is ...' },
                  ]} />
                <SubSection label="Weitere Argumente anfügen" sectionKey="hauptteil-weitere"
                  customPhrases={customPhrases['hauptteil-weitere']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Darüber hinaus ist zu beachten, dass ...', en: 'Furthermore, it should be noted that ...' },
                    { de: 'Des Weiteren sollte nicht vergessen werden, dass ...', en: 'Moreover, it should not be forgotten that ...' },
                    { de: 'Hinzu kommt, dass ...', en: 'In addition, ...' },
                    { de: 'Überdies lässt sich anführen, dass ...', en: 'Besides, it can be stated that ...' },
                    { de: 'Ferner ist zu berücksichtigen, dass ...', en: 'Furthermore, it must be taken into account that ...' },
                    { de: 'Nicht zuletzt spielt ... eine entscheidende Rolle.', en: 'Last but not least, ... plays a decisive role.' },
                    { de: 'Ein damit eng verknüpfter Aspekt betrifft ...', en: 'A closely related aspect concerns ...' },
                    { de: 'In engem Zusammenhang damit steht die Frage, ob ...', en: 'Closely connected to this is the question of whether ...' },
                    { de: 'Ergänzend sei angemerkt, dass ...', en: 'Additionally, it should be noted that ...' },
                    { de: 'Verstärkend wirkt sich zudem aus, dass ...', en: 'The effect is further reinforced by the fact that ...' },
                    { de: 'Gleichsam bedeutsam ist in diesem Kontext ...', en: 'Equally significant in this context is ...' },
                    { de: 'Dieser Sachverhalt wird noch dadurch verstärkt, dass ...', en: 'This situation is further intensified by the fact that ...' },
                  ]} />
                <SubSection label="Gegenargumente einleiten" sectionKey="hauptteil-gegen"
                  customPhrases={customPhrases['hauptteil-gegen']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Dem steht jedoch gegenüber, dass ...', en: 'However, it must be contrasted that ...' },
                    { de: 'Auf der anderen Seite muss man einräumen, dass ...', en: 'On the other hand, one must concede that ...' },
                    { de: 'Allerdings gibt es auch Schattenseiten.', en: 'However, there are also downsides.' },
                    { de: 'Kritiker wenden ein, dass ...', en: 'Critics object that ...' },
                    { de: 'Es darf jedoch nicht übersehen werden, dass ...', en: 'However, it must not be overlooked that ...' },
                    { de: 'Bei aller Berechtigung dieses Arguments muss man einwenden, dass ...', en: 'For all the validity of this argument, one must object that ...' },
                    { de: 'So überzeugend dieses Argument auch klingen mag — es lässt ... außer Acht.', en: 'As convincing as this argument may sound — it disregards ...' },
                    { de: 'Gleichwohl ist nicht von der Hand zu weisen, dass ...', en: 'Nevertheless, it cannot be denied that ...' },
                    { de: 'Diesen Vorteilen stehen indes gewichtige Nachteile gegenüber.', en: 'These advantages are, however, offset by significant disadvantages.' },
                    { de: 'Dieser Argumentation lässt sich entgegenhalten, dass ...', en: 'This line of reasoning can be countered by arguing that ...' },
                  ]} />
                <SubSection label="Beispiele anführen" sectionKey="hauptteil-beispiele"
                  customPhrases={customPhrases['hauptteil-beispiele']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Dies lässt sich am Beispiel von ... verdeutlichen.', en: 'This can be illustrated by the example of ...' },
                    { de: 'Ein anschauliches Beispiel hierfür ist ...', en: 'A vivid example of this is ...' },
                    { de: 'So zeigt sich etwa, dass ...', en: 'For instance, it can be seen that ...' },
                    { de: 'Konkret bedeutet das: ...', en: 'Concretely, this means: ...' },
                    { de: 'Exemplarisch sei hier ... angeführt.', en: 'As an example, ... may be cited here.' },
                    { de: 'Besonders deutlich wird dies anhand von ...', en: 'This becomes particularly clear through ...' },
                    { de: 'Wie ... eindrücklich belegt, ...', en: 'As ... impressively demonstrates, ...' },
                    { de: 'Dies wird durch die Tatsache untermauert, dass ...', en: 'This is underpinned by the fact that ...' },
                  ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 5. Redemittel — Schluss */}
            <AccordionItem value="redemittel-schluss">
              <AccordionTrigger className="text-base font-semibold">5. Redemittel — Schluss</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Fazit ziehen" sectionKey="schluss-fazit"
                  customPhrases={customPhrases['schluss-fazit']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Zusammenfassend lässt sich feststellen, dass ...', en: 'In summary, it can be stated that ...' },
                    { de: 'Nach Abwägung der Vor- und Nachteile lässt sich feststellen, dass ...', en: 'After weighing the pros and cons, it can be concluded that ...' },
                    { de: 'Alles in allem zeigt sich, dass ...', en: 'All in all, it shows that ...' },
                    { de: 'In der Gesamtbetrachtung überwiegen die ... gegenüber den ...', en: 'Overall, the ... outweigh the ...' },
                    { de: 'Unter Berücksichtigung aller genannten Aspekte lässt sich konstatieren, dass ...', en: 'Taking all mentioned aspects into account, it can be stated that ...' },
                    { de: 'Resümierend ist festzuhalten, dass ...', en: 'To summarize, it should be noted that ...' },
                  ]} />
                <SubSection label="Eigene Meinung" sectionKey="schluss-meinung"
                  customPhrases={customPhrases['schluss-meinung']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Meiner Ansicht nach ...', en: 'In my view ...' },
                    { de: 'Ich bin der Überzeugung, dass ...', en: 'I am convinced that ...' },
                    { de: 'Meines Erachtens wäre es zielführender, ...', en: 'In my estimation, it would be more productive to ...' },
                    { de: 'Ich persönlich neige zu der Auffassung, dass ...', en: 'I personally tend to the view that ...' },
                  ]} />
                <SubSection label="Ausblick" sectionKey="schluss-ausblick"
                  customPhrases={customPhrases['schluss-ausblick']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Es bleibt abzuwarten, wie sich ... entwickeln wird.', en: 'It remains to be seen how ... will develop.' },
                    { de: 'Schließen möchte ich mit dem Gedanken, dass ...', en: 'I would like to close with the thought that ...' },
                    { de: 'Die Zukunft wird zeigen, ob die genannten Maßnahmen die erhoffte Wirkung entfalten.', en: 'The future will show whether the mentioned measures will have the desired effect.' },
                    { de: 'Entscheidend wird letztlich sein, inwieweit es gelingt, ...', en: 'Ultimately, the decisive factor will be the extent to which it is possible to ...' },
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
                  <PhraseList isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight} phrases={[
                    { de: '\u201EMan könnte argumentieren, dass...\u201C', en: '"One could argue that..."' },
                    { de: '\u201EEs ließe sich einwenden, dass...\u201C', en: '"It could be objected that..."' },
                    { de: '\u201EEs wäre denkbar, dass...\u201C', en: '"It would be conceivable that..."' },
                    { de: '\u201EDem ließe sich entgegenhalten, dass...\u201C', en: '"One could counter this by saying that..."' },
                    { de: '\u201EEs dürfte kaum zu bestreiten sein, dass...\u201C', en: '"It can hardly be denied that..."' },
                    { de: '\u201EMan müsste sich fragen, ob...\u201C', en: '"One would have to ask whether..."' },
                  ]} />
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Passiv-Ersatzformen</p>
                  <PhraseList isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight} phrases={[
                    { de: '\u201E... lässt sich feststellen\u201C (= kann festgestellt werden)', en: '"... can be determined" (= can be established)' },
                    { de: '\u201E... ist zu berücksichtigen\u201C (= muss berücksichtigt werden)', en: '"... is to be considered" (= must be taken into account)' },
                    { de: '\u201E... bleibt zu klären\u201C (= muss noch geklärt werden)', en: '"... remains to be clarified" (= still needs to be resolved)' },
                    { de: '\u201E... gilt als erwiesen\u201C (= wird als erwiesen betrachtet)', en: '"... is regarded as proven" (= is considered established)' },
                    { de: '\u201E... bedarf einer genaueren Betrachtung\u201C (= muss genauer betrachtet werden)', en: '"... requires closer examination" (= needs to be examined more closely)' },
                  ]} />
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Funktionsverbgefüge (gehobener Stil)</p>
                  <PhraseList isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight} phrases={[
                    { de: '\u201Ein Frage stellen\u201C statt \u201Ebezweifeln\u201C', en: '"to call into question" instead of "to doubt"' },
                    { de: '\u201Ezur Diskussion stehen\u201C statt \u201Ediskutiert werden\u201C', en: '"to be up for discussion" instead of "to be discussed"' },
                    { de: '\u201Ein Betracht ziehen\u201C statt \u201Eberücksichtigen\u201C', en: '"to take into consideration" instead of "to consider"' },
                    { de: '\u201Ezum Ausdruck bringen\u201C statt \u201Eausdrücken\u201C', en: '"to give expression to" instead of "to express"' },
                    { de: '\u201EStellung nehmen zu\u201C statt \u201Eseine Meinung sagen\u201C', en: '"to take a position on" instead of "to state one\'s opinion"' },
                    { de: '\u201Ein Kauf nehmen\u201C statt \u201Eakzeptieren\u201C', en: '"to accept/tolerate" instead of "to accept"' },
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
