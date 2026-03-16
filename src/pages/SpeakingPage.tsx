import { useTranslation } from '@/i18n/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, Trash2 } from 'lucide-react';
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

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
      <span className="text-foreground">{text}</span>
    </div>
  );
}

const quickRef = [
  { fn: 'MEINUNG', items: 'Meiner Meinung nach / Ich bin überzeugt / Aus meiner Sicht / Meines Erachtens / Ich vertrete die Ansicht' },
  { fn: 'ZUSTIMMUNG', items: 'Da stimme ich zu / Genauso sehe ich das / Dem kann ich nur beipflichten / Das deckt sich mit meiner Erfahrung' },
  { fn: 'WIDERSPRUCH', items: 'Da bin ich anderer Meinung / Ich sehe das anders / Erlauben Sie mir zu widersprechen / Das greift zu kurz' },
  { fn: 'BEISPIEL', items: 'Zum Beispiel / Ein konkretes Beispiel wäre / Exemplarisch sei erwähnt / Wie sich etwa an ... zeigt' },
  { fn: 'URSACHE', items: 'Der Grund dafür ist / Das liegt daran, dass / Das ist darauf zurückzuführen, dass / Ausschlaggebend dafür ist' },
  { fn: 'FOLGE', items: 'Das führt dazu, dass / Die Konsequenz ist / Daraus ergibt sich / Dies hat zur Folge, dass' },
  { fn: 'VERGLEICH', items: 'Im Vergleich zu / Verglichen mit / Analog zu / In ähnlicher Weise' },
  { fn: 'KONTRAST', items: 'Im Gegensatz dazu / Andererseits / Demgegenüber / Wohingegen' },
  { fn: 'ZUSAMMENFASSUNG', items: 'Zusammenfassend / Alles in allem / Resümierend lässt sich festhalten / In der Gesamtbetrachtung' },
  { fn: 'EINSCHRÄNKUNG', items: 'Allerdings nur unter der Voraussetzung / Man muss einschränkend sagen / Das gilt jedoch nur bedingt' },
];

export default function SpeakingPage() {
  const { lang } = useTranslation();
  const { customPhrases, customConnectors, addPhrase, removePhrase, addConnector, removeConnector } = useCustomPhrases('speaking-custom');
  const { isHighlighted, toggle: toggleHighlight } = useHighlightedPhrases('speaking-highlights');

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
                <SubSection label="Begrüßung und Thema vorstellen" sectionKey="praes-begruessung"
                  customPhrases={customPhrases['praes-begruessung']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Guten Tag, ich möchte Ihnen heute das Thema ... vorstellen.', en: 'Good day, I would like to present the topic of ... to you today.' },
                    { de: 'In meinem Vortrag geht es um die Frage, ob / wie / warum ...', en: 'My presentation addresses the question of whether / how / why ...' },
                    { de: 'Ich habe dieses Thema gewählt, weil ...', en: 'I chose this topic because ...' },
                    { de: 'Das Thema ... ist derzeit besonders aktuell, da ...', en: 'The topic of ... is particularly relevant right now because ...' },
                    { de: 'Ich freue mich, Ihnen heute etwas über ... erzählen zu dürfen.', en: 'I am pleased to be able to tell you about ... today.' },
                    { de: 'Gestatten Sie mir, Ihnen heute einige Überlegungen zum Thema ... vorzustellen.', en: 'Allow me to present some thoughts on the topic of ... today.' },
                    { de: 'Mein heutiger Beitrag widmet sich der Frage ...', en: 'My contribution today is dedicated to the question of ...' },
                    { de: 'Erlauben Sie mir, auf ein Thema einzugehen, das uns alle betrifft: ...', en: 'Allow me to address a topic that concerns us all: ...' },
                    { de: 'Ich möchte mich heute einem Thema zuwenden, das in jüngster Zeit viel Aufmerksamkeit erregt hat.', en: 'I would like to turn today to a topic that has attracted a lot of attention recently.' },
                  ]} />
                <SubSection label="Gliederung ankündigen" sectionKey="praes-gliederung"
                  customPhrases={customPhrases['praes-gliederung']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Mein Vortrag gliedert sich in drei Teile: Zunächst ..., dann ..., und schließlich ...', en: 'My presentation is divided into three parts: First ..., then ..., and finally ...' },
                    { de: 'Ich werde zunächst auf ... eingehen, anschließend ... und zum Schluss ...', en: 'I will first address ..., then ... and finally ...' },
                    { de: 'Ich möchte drei Aspekte ansprechen: ...', en: 'I would like to address three aspects: ...' },
                    { de: 'Meine Ausführungen umfassen folgende Schwerpunkte: ...', en: 'My remarks cover the following key points: ...' },
                    { de: 'Ich habe meinen Vortrag wie folgt gegliedert: ...', en: 'I have structured my presentation as follows: ...' },
                  ]} />
                <SubSection label="Zum nächsten Punkt überleiten" sectionKey="praes-ueberleitung"
                  customPhrases={customPhrases['praes-ueberleitung']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Damit komme ich zum nächsten Punkt: ...', en: 'This brings me to the next point: ...' },
                    { de: 'Nun möchte ich auf ... eingehen.', en: 'Now I would like to address ...' },
                    { de: 'Ein weiterer wichtiger Aspekt ist ...', en: 'Another important aspect is ...' },
                    { de: 'Kommen wir nun zu der Frage, ob / wie / warum ...', en: 'Let us now turn to the question of whether / how / why ...' },
                    { de: 'Das bringt mich zu meinem nächsten Punkt: ...', en: 'That brings me to my next point: ...' },
                    { de: 'Eng damit verbunden ist die Frage nach ...', en: 'Closely connected to this is the question of ...' },
                    { de: 'An dieser Stelle möchte ich den Fokus auf ... verlagern.', en: 'At this point, I would like to shift the focus to ...' },
                    { de: 'Lassen Sie mich nun einen anderen Blickwinkel einnehmen.', en: 'Let me now take a different perspective.' },
                  ]} />
                <SubSection label="Beispiele aus eigener Erfahrung" sectionKey="praes-beispiele"
                  customPhrases={customPhrases['praes-beispiele']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Aus meiner persönlichen Erfahrung kann ich sagen, dass ...', en: 'From my personal experience, I can say that ...' },
                    { de: 'In meinem Heimatland ist es so, dass ...', en: 'In my home country, it is the case that ...' },
                    { de: 'Ich habe selbst erlebt, dass ...', en: 'I have personally experienced that ...' },
                    { de: 'Ein Beispiel aus meinem Alltag: ...', en: 'An example from my daily life: ...' },
                  ]} />
                <SubSection label="Vortrag abschließen" sectionKey="praes-abschluss"
                  customPhrases={customPhrases['praes-abschluss']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Zusammenfassend möchte ich sagen, dass ...', en: 'In summary, I would like to say that ...' },
                    { de: 'Damit bin ich am Ende meines Vortrags angelangt.', en: 'With that, I have reached the end of my presentation.' },
                    { de: 'Abschließend lässt sich festhalten, dass ...', en: 'In conclusion, it can be noted that ...' },
                    { de: 'Vielen Dank für Ihre Aufmerksamkeit. Haben Sie Fragen?', en: 'Thank you for your attention. Do you have any questions?' },
                  ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 2. Diskussion */}
            <AccordionItem value="diskussion">
              <AccordionTrigger className="text-base font-semibold">2. Diskussion (Teil 2)</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Eigene Meinung äußern" sectionKey="disk-meinung"
                  customPhrases={customPhrases['disk-meinung']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Meiner Meinung nach ...', en: 'In my opinion ...' },
                    { de: 'Ich bin der Überzeugung, dass ...', en: 'I am convinced that ...' },
                    { de: 'Aus meiner Sicht ...', en: 'From my perspective ...' },
                    { de: 'Ich vertrete die Ansicht, dass ...', en: 'I hold the view that ...' },
                    { de: 'Persönlich halte ich ... für ...', en: 'Personally, I consider ... to be ...' },
                    { de: 'Wenn Sie mich fragen, würde ich sagen, dass ...', en: 'If you ask me, I would say that ...' },
                    { de: 'Meines Erachtens ...', en: 'In my estimation ...' },
                    { de: 'Ich neige zu der Auffassung, dass ...', en: 'I tend to the view that ...' },
                    { de: 'Ich würde sogar so weit gehen zu behaupten, dass ...', en: 'I would even go so far as to claim that ...' },
                    { de: 'Nach reiflicher Überlegung bin ich zu dem Schluss gekommen, dass ...', en: 'After careful consideration, I have come to the conclusion that ...' },
                  ]} />
                <SubSection label="Zustimmen" sectionKey="disk-zustimmen"
                  customPhrases={customPhrases['disk-zustimmen']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Da stimme ich Ihnen vollkommen zu.', en: 'I fully agree with you on that.' },
                    { de: 'Genauso sehe ich das auch.', en: 'That is exactly how I see it too.' },
                    { de: 'Das ist ein sehr guter Punkt.', en: 'That is a very good point.' },
                    { de: 'Da haben Sie absolut recht.', en: 'You are absolutely right about that.' },
                    { de: 'Das entspricht auch meiner Erfahrung.', en: 'That matches my experience as well.' },
                    { de: 'Dem kann ich nur zustimmen.', en: 'I can only agree with that.' },
                  ]} />
                <SubSection label="Teilweise zustimmen" sectionKey="disk-teilweise"
                  customPhrases={customPhrases['disk-teilweise']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Da haben Sie einerseits recht, aber ...', en: 'On the one hand you are right, but ...' },
                    { de: 'Das stimmt zwar, allerdings ...', en: 'That is true, however ...' },
                    { de: 'Grundsätzlich teile ich Ihre Meinung, jedoch ...', en: 'Fundamentally I share your opinion, however ...' },
                    { de: 'Bis zu einem gewissen Punkt stimme ich zu, aber ...', en: 'Up to a certain point I agree, but ...' },
                    { de: 'Das mag sein, dennoch sollte man bedenken, dass ...', en: 'That may be so, yet one should consider that ...' },
                  ]} />
                <SubSection label="Höflich widersprechen" sectionKey="disk-widersprechen"
                  customPhrases={customPhrases['disk-widersprechen']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Da bin ich leider anderer Meinung.', en: 'I am afraid I have a different opinion on that.' },
                    { de: 'Ich sehe das etwas anders.', en: 'I see that somewhat differently.' },
                    { de: 'Erlauben Sie mir, eine andere Perspektive einzubringen.', en: 'Allow me to offer a different perspective.' },
                    { de: 'Ich kann Ihren Standpunkt nachvollziehen, aber ...', en: 'I can understand your point of view, but ...' },
                    { de: 'Da muss ich Ihnen leider widersprechen.', en: 'I am afraid I must disagree with you.' },
                    { de: 'Das sehe ich nicht ganz so.', en: 'I don\'t quite see it that way.' },
                    { de: 'So berechtigt Ihr Einwand auch sein mag — ich würde dennoch dagegenhalten, dass ...', en: 'As valid as your objection may be — I would still counter that ...' },
                    { de: 'Ich möchte da einen Gegenstandpunkt einnehmen.', en: 'I would like to take a counterposition on that.' },
                    { de: 'Ihr Argument hat durchaus seine Berechtigung, aber es greift meines Erachtens zu kurz.', en: 'Your argument certainly has its merits, but in my view it falls short.' },
                    { de: 'Bei allem Respekt — ich halte diese Schlussfolgerung für nicht ganz zutreffend.', en: 'With all due respect — I consider this conclusion not entirely accurate.' },
                    { de: 'Da möchte ich doch eine differenziertere Betrachtung vorschlagen.', en: 'I would like to suggest a more nuanced view on that.' },
                  ]} />
                <SubSection label="Nachfragen" sectionKey="disk-nachfragen"
                  customPhrases={customPhrases['disk-nachfragen']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Könnten Sie das bitte näher erläutern?', en: 'Could you please elaborate on that?' },
                    { de: 'Was genau meinen Sie damit?', en: 'What exactly do you mean by that?' },
                    { de: 'Haben Sie dafür ein konkretes Beispiel?', en: 'Do you have a concrete example for that?' },
                    { de: 'Wie kommen Sie zu dieser Einschätzung?', en: 'How did you arrive at this assessment?' },
                    { de: 'Darf ich nachfragen: ...?', en: 'May I ask a follow-up question: ...?' },
                  ]} />
                <SubSection label="Auf den Partner eingehen" sectionKey="disk-partner"
                  customPhrases={customPhrases['disk-partner']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Sie haben vorhin erwähnt, dass ... — dazu möchte ich sagen ...', en: 'You mentioned earlier that ... — I would like to say ...' },
                    { de: 'Wenn ich Sie richtig verstanden habe, meinen Sie, dass ...', en: 'If I understood you correctly, you mean that ...' },
                    { de: 'Das ist ein interessanter Gedanke. Ich möchte hinzufügen, dass ...', en: 'That is an interesting thought. I would like to add that ...' },
                    { de: 'Was halten Sie denn von ...?', en: 'What do you think about ...?' },
                    { de: 'Wie sehen Sie das?', en: 'How do you see it?' },
                  ]} />
                <SubSection label="Kompromiss finden" sectionKey="disk-kompromiss"
                  customPhrases={customPhrases['disk-kompromiss']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Vielleicht können wir uns darauf einigen, dass ...', en: 'Perhaps we can agree that ...' },
                    { de: 'Ein Kompromiss wäre vielleicht ...', en: 'A compromise might be ...' },
                    { de: 'Wir sind uns zumindest einig, dass ...', en: 'We at least agree that ...' },
                    { de: 'Lassen Sie uns einen Mittelweg finden.', en: 'Let us find a middle ground.' },
                    { de: 'Könnten wir uns auf folgenden gemeinsamen Nenner verständigen: ...?', en: 'Could we agree on the following common ground: ...?' },
                    { de: 'Beide Seiten haben berechtigte Punkte — vielleicht liegt die Wahrheit in der Mitte.', en: 'Both sides have valid points — perhaps the truth lies in the middle.' },
                    { de: 'Trotz unserer unterschiedlichen Standpunkte lässt sich festhalten, dass ...', en: 'Despite our different viewpoints, it can be stated that ...' },
                  ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 3. Zusammenfassung */}
            <AccordionItem value="zusammenfassung">
              <AccordionTrigger className="text-base font-semibold">3. Zusammenfassung (Teil 3)</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Zusammenfassung des Gehörten" sectionKey="zusammen-gehoert"
                  customPhrases={customPhrases['zusammen-gehoert']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Der Text / Die Sendung handelt von ...', en: 'The text / broadcast is about ...' },
                    { de: 'Im Wesentlichen geht es darum, dass ...', en: 'Essentially, it is about ...' },
                    { de: 'Die wichtigsten Punkte sind ...', en: 'The most important points are ...' },
                    { de: 'Es wird berichtet, dass ...', en: 'It is reported that ...' },
                    { de: 'Der Autor / Die Autorin vertritt die These, dass ...', en: 'The author argues that ...' },
                  ]} />
                <SubSection label="Eigene Stellungnahme" sectionKey="zusammen-stellungnahme"
                  customPhrases={customPhrases['zusammen-stellungnahme']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Dazu möchte ich anmerken, dass ...', en: 'On this, I would like to note that ...' },
                    { de: 'Ich finde es bemerkenswert, dass ...', en: 'I find it noteworthy that ...' },
                    { de: 'In Bezug auf mein Heimatland kann ich sagen, dass ...', en: 'With regard to my home country, I can say that ...' },
                  ]} />
              </AccordionContent>
            </AccordionItem>

            {/* 4. Allgemeine Redemittel */}
            <AccordionItem value="allgemein">
              <AccordionTrigger className="text-base font-semibold">4. Allgemeine Redemittel</AccordionTrigger>
              <AccordionContent className="space-y-5 pt-2">
                <SubSection label="Um Bedenkzeit bitten" sectionKey="allg-bedenkzeit"
                  customPhrases={customPhrases['allg-bedenkzeit']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Das ist eine gute Frage. Lassen Sie mich kurz überlegen.', en: 'That is a good question. Let me think about it briefly.' },
                    { de: 'Darüber habe ich noch nicht so genau nachgedacht, aber ...', en: 'I haven\'t thought about that in detail yet, but ...' },
                    { de: 'Spontan würde ich sagen, dass ...', en: 'Off the top of my head, I would say that ...' },
                  ]} />
                <SubSection label="Etwas umformulieren" sectionKey="allg-umformulieren"
                  customPhrases={customPhrases['allg-umformulieren']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Anders gesagt: ...', en: 'In other words: ...' },
                    { de: 'Was ich damit sagen möchte, ist ...', en: 'What I mean to say is ...' },
                    { de: 'Ich formuliere es mal anders: ...', en: 'Let me put it differently: ...' },
                    { de: 'Mit anderen Worten: ...', en: 'In other words: ...' },
                  ]} />
                <SubSection label="Unterbrechen / unterbrochen werden" sectionKey="allg-unterbrechen"
                  customPhrases={customPhrases['allg-unterbrechen']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Entschuldigung, darf ich kurz etwas dazu sagen?', en: 'Excuse me, may I briefly add something?' },
                    { de: 'Einen Moment, ich möchte meinen Gedanken noch zu Ende führen.', en: 'One moment, I would like to finish my thought.' },
                    { de: 'Lassen Sie mich bitte noch kurz ausreden.', en: 'Please let me finish briefly.' },
                    { de: 'Verzeihung, dass ich Sie unterbreche, aber ...', en: 'Forgive me for interrupting, but ...' },
                  ]} />
                <SubSection label="Unsicherheit ausdrücken" sectionKey="allg-unsicherheit"
                  customPhrases={customPhrases['allg-unsicherheit']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Ich bin mir nicht ganz sicher, aber ich glaube, dass ...', en: 'I am not entirely sure, but I believe that ...' },
                    { de: 'Soweit ich weiß, ...', en: 'As far as I know, ...' },
                    { de: 'Wenn ich mich nicht irre, ...', en: 'If I am not mistaken, ...' },
                    { de: 'Es könnte sein, dass ...', en: 'It could be that ...' },
                  ]} />
                <SubSection label="Verallgemeinern" sectionKey="allg-verallgemeinern"
                  customPhrases={customPhrases['allg-verallgemeinern']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Im Allgemeinen kann man sagen, dass ...', en: 'In general, one can say that ...' },
                    { de: 'In der Regel ist es so, dass ...', en: 'As a rule, it is the case that ...' },
                    { de: 'Grundsätzlich gilt, dass ...', en: 'As a matter of principle, ...' },
                    { de: 'Man kann davon ausgehen, dass ...', en: 'One can assume that ...' },
                  ]} />
                <SubSection label="Einschränken" sectionKey="allg-einschraenken"
                  customPhrases={customPhrases['allg-einschraenken']} onAdd={addPhrase} onRemove={removePhrase}
                  isHighlighted={isHighlighted} onToggleHighlight={toggleHighlight}
                  phrases={[
                    { de: 'Das gilt allerdings nur für ...', en: 'However, this only applies to ...' },
                    { de: 'Man muss dabei berücksichtigen, dass ...', en: 'One must take into account that ...' },
                    { de: 'Natürlich gibt es auch Ausnahmen.', en: 'Of course, there are also exceptions.' },
                    { de: 'Das hängt natürlich davon ab, ob / wie ...', en: 'That naturally depends on whether / how ...' },
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
                        <TableHead className="w-[40px]" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quickRef.map((r) => (
                        <TableRow key={r.fn}>
                          <TableCell className="font-medium text-foreground text-sm">{r.fn}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{r.items}</TableCell>
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
