import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { Star, Trash2, MousePointerClick, Volume2, Mic } from 'lucide-react';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search, Presentation, MessageSquare, FileText, MessagesSquare, Zap, Drama } from 'lucide-react';
import { useCustomPhrases } from '@/hooks/useCustomPhrases';
import { useHighlightedPhrases } from '@/hooks/useHighlightedPhrases';
import { AddConnectorInput } from '@/components/writing-tips/AddConnectorInput';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { NAV_CONTAINER, TAB_TRIGGER_BLUE } from '@/components/shared/navStyles';
import { StarredButton } from '@/components/shared/StarredButton';
import { useTableClickHint } from '@/hooks/useTableClickHint';
import { c1Expressions } from '@/data/c1Expressions';
import { PlayAllButton } from '@/components/PlayAllButton';
import { usePlayAll } from '@/hooks/usePlayAll';

const expressionImages = import.meta.glob('/src/assets/expressions/*.png', { eager: true, import: 'default' }) as Record<string, string>;

// ─── TTS Audio ───

const ttsAudio: Record<string, Record<string, string>> = {
  'sprechen-praesentation': import.meta.glob('/src/assets/audio/sprechen-praesentation/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'sprechen-diskussion': import.meta.glob('/src/assets/audio/sprechen-diskussion/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'sprechen-zusammenfassung': import.meta.glob('/src/assets/audio/sprechen-zusammenfassung/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'sprechen-redemittel': import.meta.glob('/src/assets/audio/sprechen-redemittel/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'expressions': import.meta.glob('/src/assets/audio/expressions/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
};

function getTtsUrl(section: string, index: number): string | undefined {
  const map = ttsAudio[section];
  if (!map) return undefined;
  const padded = String(index + 1).padStart(2, '0');
  return map[`/src/assets/audio/${section}/${section}-${padded}.mp3`];
}

const TAB_TO_AUDIO: Record<string, string> = {
  praesentation: 'sprechen-praesentation',
  diskussion: 'sprechen-diskussion',
  zusammenfassung: 'sprechen-zusammenfassung',
  redemittel: 'sprechen-redemittel',
};
function getExpressionImage(id: number): string | undefined {
  return expressionImages[`/src/assets/expressions/expr-${id}.png`];
}

// ─── Data ───

type Phrase = { de: string; en: string };
type Subsection = { key: string; label: string; phrases: Phrase[] };
type Section = { tab: string; subsections: Subsection[] };

export const SECTIONS: Section[] = [
  {
    tab: 'praesentation',
    subsections: [
      { key: 'praes-begruessung', label: 'Begrüßung und Thema vorstellen', phrases: [
        { de: 'Guten Tag, ich möchte Ihnen heute das Thema ... vorstellen.', en: 'Good day, I would like to present the topic of ... to you today.' },
        { de: 'In meinem Vortrag geht es um die Frage, ob / wie / warum ...', en: 'My presentation addresses the question of whether / how / why ...' },
        { de: 'Ich habe dieses Thema gewählt, weil ...', en: 'I chose this topic because ...' },
        { de: 'Das Thema ... ist derzeit besonders aktuell, da ...', en: 'The topic of ... is particularly relevant right now because ...' },
        { de: 'Ich freue mich, Ihnen heute etwas über ... erzählen zu dürfen.', en: 'I am pleased to be able to tell you about ... today.' },
        { de: 'Gestatten Sie mir, Ihnen heute einige Überlegungen zum Thema ... vorzustellen.', en: 'Allow me to present some thoughts on the topic of ... today.' },
        { de: 'Mein heutiger Beitrag widmet sich der Frage ...', en: 'My contribution today is dedicated to the question of ...' },
        { de: 'Erlauben Sie mir, auf ein Thema einzugehen, das uns alle betrifft: ...', en: 'Allow me to address a topic that concerns us all: ...' },
        { de: 'Ich möchte mich heute einem Thema zuwenden, das in jüngster Zeit viel Aufmerksamkeit erregt hat.', en: 'I would like to turn today to a topic that has attracted a lot of attention recently.' },
      ]},
      { key: 'praes-gliederung', label: 'Gliederung ankündigen', phrases: [
        { de: 'Mein Vortrag gliedert sich in drei Teile: Zunächst ..., dann ..., und schließlich ...', en: 'My presentation is divided into three parts: First ..., then ..., and finally ...' },
        { de: 'Ich werde zunächst auf ... eingehen, anschließend ... und zum Schluss ...', en: 'I will first address ..., then ... and finally ...' },
        { de: 'Ich möchte drei Aspekte ansprechen: ...', en: 'I would like to address three aspects: ...' },
        { de: 'Meine Ausführungen umfassen folgende Schwerpunkte: ...', en: 'My remarks cover the following key points: ...' },
        { de: 'Ich habe meinen Vortrag wie folgt gegliedert: ...', en: 'I have structured my presentation as follows: ...' },
      ]},
      { key: 'praes-ueberleitung', label: 'Zum nächsten Punkt überleiten', phrases: [
        { de: 'Damit komme ich zum nächsten Punkt: ...', en: 'This brings me to the next point: ...' },
        { de: 'Nun möchte ich auf ... eingehen.', en: 'Now I would like to address ...' },
        { de: 'Ein weiterer wichtiger Aspekt ist ...', en: 'Another important aspect is ...' },
        { de: 'Kommen wir nun zu der Frage, ob / wie / warum ...', en: 'Let us now turn to the question of whether / how / why ...' },
        { de: 'Das bringt mich zu meinem nächsten Punkt: ...', en: 'That brings me to my next point: ...' },
        { de: 'Eng damit verbunden ist die Frage nach ...', en: 'Closely connected to this is the question of ...' },
        { de: 'An dieser Stelle möchte ich den Fokus auf ... verlagern.', en: 'At this point, I would like to shift the focus to ...' },
        { de: 'Lassen Sie mich nun einen anderen Blickwinkel einnehmen.', en: 'Let me now take a different perspective.' },
      ]},
      { key: 'praes-beispiele', label: 'Beispiele aus eigener Erfahrung', phrases: [
        { de: 'Aus meiner persönlichen Erfahrung kann ich sagen, dass ...', en: 'From my personal experience, I can say that ...' },
        { de: 'In meinem Heimatland ist es so, dass ...', en: 'In my home country, it is the case that ...' },
        { de: 'Ich habe selbst erlebt, dass ...', en: 'I have personally experienced that ...' },
        { de: 'Ein Beispiel aus meinem Alltag: ...', en: 'An example from my daily life: ...' },
      ]},
      { key: 'praes-abschluss', label: 'Vortrag abschließen', phrases: [
        { de: 'Zusammenfassend möchte ich sagen, dass ...', en: 'In summary, I would like to say that ...' },
        { de: 'Damit bin ich am Ende meines Vortrags angelangt.', en: 'With that, I have reached the end of my presentation.' },
        { de: 'Abschließend lässt sich festhalten, dass ...', en: 'In conclusion, it can be noted that ...' },
        { de: 'Vielen Dank für Ihre Aufmerksamkeit. Haben Sie Fragen?', en: 'Thank you for your attention. Do you have any questions?' },
      ]},
    ],
  },
  {
    tab: 'diskussion',
    subsections: [
      { key: 'disk-meinung', label: 'Eigene Meinung äußern', phrases: [
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
      ]},
      { key: 'disk-zustimmen', label: 'Zustimmen', phrases: [
        { de: 'Da stimme ich Ihnen vollkommen zu.', en: 'I fully agree with you on that.' },
        { de: 'Genauso sehe ich das auch.', en: 'That is exactly how I see it too.' },
        { de: 'Das ist ein sehr guter Punkt.', en: 'That is a very good point.' },
        { de: 'Da haben Sie absolut recht.', en: 'You are absolutely right about that.' },
        { de: 'Das entspricht auch meiner Erfahrung.', en: 'That matches my experience as well.' },
        { de: 'Dem kann ich nur zustimmen.', en: 'I can only agree with that.' },
      ]},
      { key: 'disk-teilweise', label: 'Teilweise zustimmen', phrases: [
        { de: 'Da haben Sie einerseits recht, aber ...', en: 'On the one hand you are right, but ...' },
        { de: 'Das stimmt zwar, allerdings ...', en: 'That is true, however ...' },
        { de: 'Grundsätzlich teile ich Ihre Meinung, jedoch ...', en: 'Fundamentally I share your opinion, however ...' },
        { de: 'Bis zu einem gewissen Punkt stimme ich zu, aber ...', en: 'Up to a certain point I agree, but ...' },
        { de: 'Das mag sein, dennoch sollte man bedenken, dass ...', en: 'That may be so, yet one should consider that ...' },
      ]},
      { key: 'disk-widersprechen', label: 'Höflich widersprechen', phrases: [
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
      ]},
      { key: 'disk-nachfragen', label: 'Nachfragen', phrases: [
        { de: 'Könnten Sie das bitte näher erläutern?', en: 'Could you please elaborate on that?' },
        { de: 'Was genau meinen Sie damit?', en: 'What exactly do you mean by that?' },
        { de: 'Haben Sie dafür ein konkretes Beispiel?', en: 'Do you have a concrete example for that?' },
        { de: 'Wie kommen Sie zu dieser Einschätzung?', en: 'How did you arrive at this assessment?' },
        { de: 'Darf ich nachfragen: ...?', en: 'May I ask a follow-up question: ...?' },
      ]},
      { key: 'disk-partner', label: 'Auf den Partner eingehen', phrases: [
        { de: 'Sie haben vorhin erwähnt, dass ... — dazu möchte ich sagen ...', en: 'You mentioned earlier that ... — I would like to say ...' },
        { de: 'Wenn ich Sie richtig verstanden habe, meinen Sie, dass ...', en: 'If I understood you correctly, you mean that ...' },
        { de: 'Das ist ein interessanter Gedanke. Ich möchte hinzufügen, dass ...', en: 'That is an interesting thought. I would like to add that ...' },
        { de: 'Was halten Sie denn von ...?', en: 'What do you think about ...?' },
        { de: 'Wie sehen Sie das?', en: 'How do you see it?' },
      ]},
      { key: 'disk-kompromiss', label: 'Kompromiss finden', phrases: [
        { de: 'Vielleicht können wir uns darauf einigen, dass ...', en: 'Perhaps we can agree that ...' },
        { de: 'Ein Kompromiss wäre vielleicht ...', en: 'A compromise might be ...' },
        { de: 'Wir sind uns zumindest einig, dass ...', en: 'We at least agree that ...' },
        { de: 'Lassen Sie uns einen Mittelweg finden.', en: 'Let us find a middle ground.' },
        { de: 'Könnten wir uns auf folgenden gemeinsamen Nenner verständigen: ...?', en: 'Could we agree on the following common ground: ...?' },
        { de: 'Beide Seiten haben berechtigte Punkte — vielleicht liegt die Wahrheit in der Mitte.', en: 'Both sides have valid points — perhaps the truth lies in the middle.' },
        { de: 'Trotz unserer unterschiedlichen Standpunkte lässt sich festhalten, dass ...', en: 'Despite our different viewpoints, it can be stated that ...' },
      ]},
    ],
  },
  {
    tab: 'zusammenfassung',
    subsections: [
      { key: 'zusammen-gehoert', label: 'Zusammenfassung des Gehörten', phrases: [
        { de: 'Der Text / Die Sendung handelt von ...', en: 'The text / broadcast is about ...' },
        { de: 'Im Wesentlichen geht es darum, dass ...', en: 'Essentially, it is about ...' },
        { de: 'Die wichtigsten Punkte sind ...', en: 'The most important points are ...' },
        { de: 'Es wird berichtet, dass ...', en: 'It is reported that ...' },
        { de: 'Der Autor / Die Autorin vertritt die These, dass ...', en: 'The author argues that ...' },
      ]},
      { key: 'zusammen-stellungnahme', label: 'Eigene Stellungnahme', phrases: [
        { de: 'Dazu möchte ich anmerken, dass ...', en: 'On this, I would like to note that ...' },
        { de: 'Ich finde es bemerkenswert, dass ...', en: 'I find it noteworthy that ...' },
        { de: 'In Bezug auf mein Heimatland kann ich sagen, dass ...', en: 'With regard to my home country, I can say that ...' },
      ]},
    ],
  },
  {
    tab: 'redemittel',
    subsections: [
      { key: 'allg-bedenkzeit', label: 'Um Bedenkzeit bitten', phrases: [
        { de: 'Das ist eine gute Frage. Lassen Sie mich kurz überlegen.', en: 'That is a good question. Let me think about it briefly.' },
        { de: 'Darüber habe ich noch nicht so genau nachgedacht, aber ...', en: 'I haven\'t thought about that in detail yet, but ...' },
        { de: 'Spontan würde ich sagen, dass ...', en: 'Off the top of my head, I would say that ...' },
      ]},
      { key: 'allg-umformulieren', label: 'Etwas umformulieren', phrases: [
        { de: 'Anders gesagt: ...', en: 'In other words: ...' },
        { de: 'Was ich damit sagen möchte, ist ...', en: 'What I mean to say is ...' },
        { de: 'Ich formuliere es mal anders: ...', en: 'Let me put it differently: ...' },
        { de: 'Mit anderen Worten: ...', en: 'In other words: ...' },
      ]},
      { key: 'allg-unterbrechen', label: 'Unterbrechen / unterbrochen werden', phrases: [
        { de: 'Entschuldigung, darf ich kurz etwas dazu sagen?', en: 'Excuse me, may I briefly add something?' },
        { de: 'Einen Moment, ich möchte meinen Gedanken noch zu Ende führen.', en: 'One moment, I would like to finish my thought.' },
        { de: 'Lassen Sie mich bitte noch kurz ausreden.', en: 'Please let me finish briefly.' },
        { de: 'Verzeihung, dass ich Sie unterbreche, aber ...', en: 'Forgive me for interrupting, but ...' },
      ]},
      { key: 'allg-unsicherheit', label: 'Unsicherheit ausdrücken', phrases: [
        { de: 'Ich bin mir nicht ganz sicher, aber ich glaube, dass ...', en: 'I am not entirely sure, but I believe that ...' },
        { de: 'Soweit ich weiß, ...', en: 'As far as I know, ...' },
        { de: 'Wenn ich mich nicht irre, ...', en: 'If I am not mistaken, ...' },
        { de: 'Es könnte sein, dass ...', en: 'It could be that ...' },
      ]},
      { key: 'allg-verallgemeinern', label: 'Verallgemeinern', phrases: [
        { de: 'Im Allgemeinen kann man sagen, dass ...', en: 'In general, one can say that ...' },
        { de: 'In der Regel ist es so, dass ...', en: 'As a rule, it is the case that ...' },
        { de: 'Grundsätzlich gilt, dass ...', en: 'As a matter of principle, ...' },
        { de: 'Man kann davon ausgehen, dass ...', en: 'One can assume that ...' },
      ]},
      { key: 'allg-einschraenken', label: 'Einschränken', phrases: [
        { de: 'Das gilt allerdings nur für ...', en: 'However, this only applies to ...' },
        { de: 'Man muss dabei berücksichtigen, dass ...', en: 'One must take into account that ...' },
        { de: 'Natürlich gibt es auch Ausnahmen.', en: 'Of course, there are also exceptions.' },
        { de: 'Das hängt natürlich davon ab, ob / wie ...', en: 'That naturally depends on whether / how ...' },
      ]},
    ],
  },
];

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


// ─── Colors ───

const BADGE_COLORS: Record<string, string> = {
  'praes-begruessung': 'text-emerald-700 dark:text-emerald-300',
  'praes-gliederung': 'text-blue-700 dark:text-blue-300',
  'praes-ueberleitung': 'text-violet-700 dark:text-violet-300',
  'praes-beispiele': 'text-amber-700 dark:text-amber-300',
  'praes-abschluss': 'text-indigo-700 dark:text-indigo-300',
  'disk-meinung': 'text-blue-700 dark:text-blue-300',
  'disk-zustimmen': 'text-emerald-700 dark:text-emerald-300',
  'disk-teilweise': 'text-cyan-700 dark:text-cyan-300',
  'disk-widersprechen': 'text-rose-700 dark:text-rose-300',
  'disk-nachfragen': 'text-violet-700 dark:text-violet-300',
  'disk-partner': 'text-teal-700 dark:text-teal-300',
  'disk-kompromiss': 'text-amber-700 dark:text-amber-300',
  'zusammen-gehoert': 'text-blue-700 dark:text-blue-300',
  'zusammen-stellungnahme': 'text-emerald-700 dark:text-emerald-300',
  'allg-bedenkzeit': 'text-amber-700 dark:text-amber-300',
  'allg-umformulieren': 'text-blue-700 dark:text-blue-300',
  'allg-unterbrechen': 'text-rose-700 dark:text-rose-300',
  'allg-unsicherheit': 'text-violet-700 dark:text-violet-300',
  'allg-verallgemeinern': 'text-cyan-700 dark:text-cyan-300',
  'allg-einschraenken': 'text-orange-700 dark:text-orange-300',
};

const BORDER_COLORS: Record<string, string> = {
  'praes-begruessung': 'border-l-emerald-400',
  'praes-gliederung': 'border-l-blue-400',
  'praes-ueberleitung': 'border-l-violet-400',
  'praes-beispiele': 'border-l-amber-400',
  'praes-abschluss': 'border-l-indigo-400',
  'disk-meinung': 'border-l-blue-400',
  'disk-zustimmen': 'border-l-emerald-400',
  'disk-teilweise': 'border-l-cyan-400',
  'disk-widersprechen': 'border-l-rose-400',
  'disk-nachfragen': 'border-l-violet-400',
  'disk-partner': 'border-l-teal-400',
  'disk-kompromiss': 'border-l-amber-400',
  'zusammen-gehoert': 'border-l-blue-400',
  'zusammen-stellungnahme': 'border-l-emerald-400',
  'allg-bedenkzeit': 'border-l-amber-400',
  'allg-umformulieren': 'border-l-blue-400',
  'allg-unterbrechen': 'border-l-rose-400',
  'allg-unsicherheit': 'border-l-violet-400',
  'allg-verallgemeinern': 'border-l-cyan-400',
  'allg-einschraenken': 'border-l-orange-400',
};


// ─── Flatten helper ───

type FlatRow = { idx: number; subsectionKey: string; subsectionLabel: string; de: string; en: string };

function flattenSection(
  section: Section,
  starredOnly: boolean,
  isHighlighted: (phrase: string) => boolean,
): FlatRow[] {
  const rows: FlatRow[] = [];
  let idx = 0;
  for (const sub of section.subsections) {
    for (const p of sub.phrases) {
      rows.push({ idx: idx++, subsectionKey: sub.key, subsectionLabel: sub.label, de: p.de, en: p.en });
    }
  }
  if (starredOnly) return rows.filter(r => isHighlighted(r.de));
  return rows;
}

// ─── Component ───

export default function SpeakingPage() {
  const { lang } = useTranslation();
  const { customConnectors, addConnector, removeConnector } = useCustomPhrases('speaking-custom');
  const { isHighlighted, toggle: toggleHighlight } = useHighlightedPhrases('speaking-highlights');
  const { showClickHint: showTableHint, dismissClickHint } = useTableClickHint();
  const [starredOnly, setStarredOnly] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<Record<string, string>>({});
  const [exprSearch, setExprSearch] = useState('');
  const player = usePlayAll();

  const speakingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [speakingUrl, setSpeakingUrl] = useState<string | null>(null);
  const speak = useCallback((text: string, ttsUrl?: string) => {
    // Stop any current audio
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    speechSynthesis.cancel();

    // If same URL is playing, just stop (toggle off)
    if (speakingRef.current && ttsUrl && speakingUrl === ttsUrl) {
      speakingRef.current = false;
      setSpeakingUrl(null);
      return;
    }

    speakingRef.current = false;
    setSpeakingUrl(null);

    if (ttsUrl) {
      const audio = new Audio(ttsUrl);
      audioRef.current = audio;
      audio.onended = () => { speakingRef.current = false; setSpeakingUrl(null); audioRef.current = null; };
      speakingRef.current = true;
      setSpeakingUrl(ttsUrl);
      player.stop();
      audio.play();
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.onend = () => { speakingRef.current = false; setSpeakingUrl(null); };
    speakingRef.current = true;
    speechSynthesis.speak(u);
  }, [speakingUrl, player]);

  // Stop play-all when filters change
  useEffect(() => { player.stop(); }, [starredOnly, categoryFilter, exprSearch]);

  const filteredExpressions = useMemo(() => {
    let list = c1Expressions;
    if (starredOnly) list = list.filter(p => isHighlighted(p.german));
    if (exprSearch) {
      const q = exprSearch.toLowerCase();
      list = list.filter(p => p.german.toLowerCase().includes(q) || p.english.toLowerCase().includes(q) || p.example.toLowerCase().includes(q));
    }
    return list;
  }, [exprSearch, starredOnly, isHighlighted]);

  const flatSections = useMemo(() => {
    const map: Record<string, FlatRow[]> = {};
    for (const s of SECTIONS) {
      let rows = flattenSection(s, starredOnly, isHighlighted);
      const filter = categoryFilter[s.tab];
      if (filter && filter !== 'Alle') {
        rows = rows.filter(r => r.subsectionKey === filter);
      }
      map[s.tab] = rows;
    }
    return map;
  }, [starredOnly, isHighlighted, categoryFilter]);

  const handleToggle = useCallback((de: string) => {
    dismissClickHint();
    toggleHighlight(de);
  }, [toggleHighlight, dismissClickHint]);

  const starredBtn = <StarredButton active={starredOnly} onClick={() => setStarredOnly(prev => !prev)} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Mic className="h-6 w-6" />
          {lang === 'de' ? 'Mündlicher Ausdruck' : 'Speaking'}
          <TelcBadge className="ml-1" />
        </h1>
        <p className="text-sm text-muted-foreground">
          {lang === 'de'
            ? 'Redemittel für die mündliche Prüfung — auswendig lernen!'
            : 'Phrases for the oral exam — learn by heart!'}
        </p>
      </div>

      <Tabs defaultValue="redewendungen">
        <TabsList className={`${NAV_CONTAINER} h-auto gap-1`}>
          <TabsTrigger value="redewendungen" className={`${TAB_TRIGGER_BLUE} gap-1.5`}><Drama className="h-4 w-4" />Redewendungen</TabsTrigger>
          <TabsTrigger value="praesentation" className={`${TAB_TRIGGER_BLUE} gap-1.5`}><Presentation className="h-4 w-4" />Präsentation</TabsTrigger>
          <TabsTrigger value="diskussion" className={`${TAB_TRIGGER_BLUE} gap-1.5`}><MessageSquare className="h-4 w-4" />Diskussion</TabsTrigger>
          <TabsTrigger value="zusammenfassung" className={`${TAB_TRIGGER_BLUE} gap-1.5`}><FileText className="h-4 w-4" />Zusammenfassung</TabsTrigger>
          <TabsTrigger value="redemittel" className={`${TAB_TRIGGER_BLUE} gap-1.5`}><MessagesSquare className="h-4 w-4" />Redemittel</TabsTrigger>
          <TabsTrigger value="schnellreferenz" className={`${TAB_TRIGGER_BLUE} gap-1.5`}><Zap className="h-4 w-4" />Schnellreferenz</TabsTrigger>
        </TabsList>

        {/* Phrase tabs */}
        {SECTIONS.map(section => (
          <TabsContent key={section.tab} value={section.tab} className="mt-4 space-y-4">
            <div className="mt-2 mb-4 flex items-center justify-end gap-2">{starredBtn}<PlayAllButton color="blue" player={player} getUrls={() => { const audio = TAB_TO_AUDIO[section.tab]; return (flatSections[section.tab] ?? []).map(r => audio ? getTtsUrl(audio, r.idx) : undefined).filter(Boolean) as string[]; }} /></div>

            {/* Desktop table */}
            <div className="hidden md:block rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-xs font-semibold text-muted-foreground">#</TableHead>
                    <TableHead className="w-[220px] p-1 text-xs font-semibold text-muted-foreground">
                      <Select value={categoryFilter[section.tab] ?? 'Alle'} onValueChange={(v) => setCategoryFilter(prev => ({ ...prev, [section.tab]: v }))}>
                        <SelectTrigger className="h-8 w-full text-xs font-semibold border-0 bg-transparent shadow-none">
                          <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Alle">Alle Kategorien</SelectItem>
                          {section.subsections.map(sub => (
                            <SelectItem key={sub.key} value={sub.key}>
                              <span className="flex items-center gap-2">
                                <span className={`inline-block w-2 h-2 rounded-full ${(BORDER_COLORS[sub.key] ?? '').replace('border-l-', 'bg-')}`} />
                                {sub.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Deutsch</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">English</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flatSections[section.tab]?.map((row, i, arr) => {
                    const sel = isHighlighted(row.de);
                    const prevKey = i > 0 ? arr[i - 1].subsectionKey : null;
                    const isNewGroup = prevKey !== null && prevKey !== row.subsectionKey;
                    const audioSection = TAB_TO_AUDIO[section.tab];
                    return (
                      <TableRow
                        key={`${row.subsectionKey}-${row.idx}`}
                        onClick={() => handleToggle(row.de)}
                        className={`cursor-pointer transition-colors ${isNewGroup ? 'border-t-4 border-t-muted' : ''} ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
                      >
                        <TableCell className={`text-xs text-muted-foreground border-l-4 ${BORDER_COLORS[row.subsectionKey] ?? 'border-l-transparent'}`}>
                          <span className="flex items-center gap-1">
                            <Star className={`h-3.5 w-3.5 shrink-0 ${sel ? 'text-yellow-500 fill-yellow-400' : 'text-transparent'}`} />
                            {row.idx + 1}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs font-normal whitespace-nowrap ${BADGE_COLORS[row.subsectionKey] ?? ''}`}>
                            {row.subsectionLabel}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-foreground">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); speak(row.de, audioSection ? getTtsUrl(audioSection, row.idx) : undefined); }}
                              className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Volume2 className="h-4 w-4" />
                            </button>
                            {row.de}
                            {i === 0 && showTableHint && (
                              <span className="inline-flex items-center gap-1 animate-bounce ml-2">
                                <span className="bg-foreground/90 text-background text-xs font-medium px-2.5 py-1 rounded-full shadow-lg whitespace-nowrap" style={{ fontFamily: '"Comic Sans MS", "Segoe Print", cursive' }}>Klick mich!</span>
                                <MousePointerClick className="h-5 w-5 text-foreground/80 -rotate-12" />
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{row.en}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile filter */}
            <div className="md:hidden mb-3">
              <Select value={categoryFilter[section.tab] ?? 'Alle'} onValueChange={(v) => setCategoryFilter(prev => ({ ...prev, [section.tab]: v }))}>
                <SelectTrigger className="w-full">
                  <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alle">Alle Kategorien</SelectItem>
                  {section.subsections.map(sub => (
                    <SelectItem key={sub.key} value={sub.key}>{sub.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {flatSections[section.tab]?.map((row, i, arr) => {
                const sel = isHighlighted(row.de);
                const prevKey = i > 0 ? arr[i - 1].subsectionKey : null;
                const isNewGroup = prevKey !== null && prevKey !== row.subsectionKey;
                const audioSection = TAB_TO_AUDIO[section.tab];
                return (
                  <div
                    key={`${row.subsectionKey}-${row.idx}`}
                    onClick={() => handleToggle(row.de)}
                    className={`relative rounded-lg border border-l-4 ${BORDER_COLORS[row.subsectionKey] ?? ''} p-4 space-y-2 cursor-pointer transition-colors ${isNewGroup ? 'mt-6' : ''} ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-card'}`}
                  >
                    {sel && <Star className="h-4 w-4 text-yellow-500 fill-yellow-400 absolute top-2 right-2" />}
                    <span className={`text-xs font-normal whitespace-nowrap ${BADGE_COLORS[row.subsectionKey] ?? ''}`}>
                      {row.subsectionLabel}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); speak(row.de, audioSection ? getTtsUrl(audioSection, row.idx) : undefined); }} className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <p className="text-sm font-medium text-foreground">{row.de}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{row.en}</p>
                  </div>
                );
              })}
            </div>

            {starredOnly && (flatSections[section.tab]?.length ?? 0) === 0 && (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Noch keine Einträge markiert — klicke auf eine Zeile in der Tabelle, um sie zu markieren.
              </div>
            )}
          </TabsContent>
        ))}

        {/* Schnellreferenz */}
        <TabsContent value="schnellreferenz" className="mt-4 space-y-4">
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px] text-xs font-semibold text-muted-foreground">Funktion</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground">Redemittel</TableHead>
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
        </TabsContent>

        {/* Redewendungen */}
        <TabsContent value="redewendungen" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={exprSearch} onChange={(e) => setExprSearch(e.target.value)} placeholder="Redewendung suchen..." className="pl-9" />
            </div>
            {starredBtn}
            <PlayAllButton color="blue" player={player} getUrls={() => filteredExpressions.map(e => getTtsUrl('expressions', e.id - 1)).filter(Boolean) as string[]} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExpressions.map((expr) => {
              const image = getExpressionImage(expr.id);
              const starred = isHighlighted(expr.german);
              const ttsUrl = getTtsUrl('expressions', expr.id - 1);
              const isPlaying = speakingRef.current && speakingUrl === ttsUrl;
              return (
                <div key={expr.id}
                  className={cn('relative rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md', starred && 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800')}>
                  <button
                    onClick={() => toggleHighlight(expr.german)}
                    className="absolute top-3 left-3 z-10"
                  >
                    <Star className={cn('h-4 w-4 transition-colors', starred ? 'fill-yellow-400 text-yellow-500' : 'text-muted-foreground/40 hover:text-yellow-400')} />
                  </button>
                  <div>
                    {image && (
                      <div className="relative mb-3 overflow-hidden rounded-lg bg-muted/30 flex items-center justify-center">
                        <img src={image} alt={expr.german} className="w-full h-40 object-contain" loading="lazy" />
                      </div>
                    )}
                    <div className="flex items-start gap-2 mb-1">
                      <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold w-5 h-5 shrink-0 mt-0.5">{expr.id}</span>
                      <p className="font-semibold text-base text-foreground leading-snug pr-6">{expr.german}</p>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">{expr.english}</p>
                    <div className="flex items-start gap-2 mt-3">
                      {ttsUrl ? (
                        <button
                          onClick={() => speak(expr.example, ttsUrl)}
                          className="shrink-0 mt-0.5 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Volume2 className={cn('h-4 w-4', isPlaying && 'text-primary')} />
                        </button>
                      ) : (
                        <span className="w-4 shrink-0" />
                      )}
                      <p className="text-xs text-foreground font-medium leading-relaxed">{expr.example}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredExpressions.length === 0 && (
            <div className="py-10 text-center text-muted-foreground text-sm">
              {starredOnly
                ? 'Noch keine Redewendungen markiert — klicke auf den Stern, um eine zu markieren.'
                : 'Keine Redewendung gefunden.'}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
