import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRequiredAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NAV_CONTAINER, TAB_TRIGGER_BLUE } from '@/components/shared/navStyles';
import { ScrollNav } from '@/components/shared/ScrollNav';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, PenLine, AlertCircle, Copy, CheckCheck, Trash2, Filter, MessagesSquare, PlayCircle, AlignLeft, CheckCircle, Braces, Link2, Volume2 } from 'lucide-react';
import { usePlayAll } from '@/hooks/usePlayAll';
import { PlayAllButton } from '@/components/PlayAllButton';
import { toast } from '@/hooks/use-toast';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useHighlightedPhrases } from '@/hooks/useHighlightedPhrases';
import { useCustomPhrases } from '@/hooks/useCustomPhrases';
import { AddConnectorInput } from '@/components/writing-tips/AddConnectorInput';
import { StarredButton } from '@/components/shared/StarredButton';
import { SelectionHint, markHintInteraction } from '@/components/shared/SelectionHint';
import { TertiaryNav } from '@/components/shared/TertiaryNav';
import type { TertiaryNavItem } from '@/components/shared/TertiaryNav';
import type { Tables } from '@/integrations/supabase/types';

// ─── TTS Audio ───

const ttsAudio: Record<string, Record<string, string>> = {
  'schreiben-einleitung': import.meta.glob('/src/assets/audio/schreiben-einleitung/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'schreiben-hauptteil': import.meta.glob('/src/assets/audio/schreiben-hauptteil/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'schreiben-schluss': import.meta.glob('/src/assets/audio/schreiben-schluss/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  'schreiben-strukturen': import.meta.glob('/src/assets/audio/schreiben-strukturen/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
};

function getTtsUrl(section: string, index: number): string | undefined {
  const map = ttsAudio[section];
  if (!map) return undefined;
  const padded = String(index + 1).padStart(2, '0');
  return map[`/src/assets/audio/${section}/${section}-${padded}.mp3`];
}

const TAB_TO_AUDIO: Record<string, string> = {
  einleitung: 'schreiben-einleitung',
  hauptteil: 'schreiben-hauptteil',
  schluss: 'schreiben-schluss',
  'c1-strukturen': 'schreiben-strukturen',
};

type WritingPrompt = Tables<'writing_prompts'>;
type WritingSubmission = Tables<'writing_submissions'>;
type WritingLevel = 'rusty' | 'solid_b2' | 'almost_c1';

interface CriterionResult {
  grade: string;
  feedback_de: string;
  feedback_en: string;
  corrections?: Correction[];
}

interface Correction {
  original: string;
  corrected: string;
  category: string;
  explanation_de: string;
  explanation_en: string;
}

interface EvaluationResponse {
  aufgabengerechtheit: CriterionResult;
  korrektheit: CriterionResult & { corrections?: Correction[] };
  repertoire: CriterionResult;
  kommunikative_gestaltung: CriterionResult;
  overall_feedback_de: string;
  overall_feedback_en: string;
  improved_version: string;
  total_points: number;
  max_points: number;
  error?: string;
  code?: string;
}

// ─── Tab config ──────────────────────────────────────

const LEVEL_TABS: { value: WritingLevel; label_de: string; label_en: string; subtitle_de: string; subtitle_en: string }[] = [
  { value: 'rusty', label_de: 'Eingerostet', label_en: 'Rusty', subtitle_de: 'Kurze Mikro-Übungen (30–80 Wörter)', subtitle_en: 'Short micro-exercises (30-80 words)' },
  { value: 'solid_b2', label_de: 'Solides B2', label_en: 'Solid B2', subtitle_de: 'Absatz-Antworten (100–180 Wörter)', subtitle_en: 'Paragraph responses (100-180 words)' },
  { value: 'almost_c1', label_de: 'C1 Prüfung', label_en: 'C1 Exam', subtitle_de: 'Vollständige Texte im telc-Format (~350 Wörter)', subtitle_en: 'Full texts in telc format (~350 words)' },
];

// ─── Build clipboard prompt ──────────────────────────

function buildCopyPrompt(prompt: WritingPrompt, userText: string): string {
  return `Du bist ein erfahrener Prüfer für die telc Deutsch C1 Prüfung. Bewerte den folgenden Text nach den offiziellen telc-Kriterien.

AUFGABENSTELLUNG:
Thema: ${prompt.title_de}
Kontext: ${prompt.context_de}
Textsorte: ${prompt.text_type}
Ziel-Wortanzahl: ~${prompt.target_word_count} Wörter

BEWERTUNGSKRITERIEN (jeweils A / B / C / D):

1. AUFGABENGERECHTHEIT (Erfüllung der Aufgabenstellung)
   A = Thema vollständig behandelt, klarer roter Faden, kritische Auseinandersetzung
   B = Anforderungen weitgehend erfüllt
   C = Anforderungen nur teilweise erfüllt
   D = Anforderungen nicht erfüllt

2. KORREKTHEIT (Grammatik, Rechtschreibung, Zeichensetzung)
   A = Sehr wenige / keine Fehler
   B = Fehler nur bei komplexen Strukturen
   C = Mehrere Fehler auch bei einfachen Strukturen
   D = Zahlreiche Fehler, Text teilweise unverständlich

3. REPERTOIRE (Wortschatz und Satzbau)
   A = Breiter Wortschatz, komplexe Satzformen
   B = Gelegentlich einfacher Wortschatz
   C = Häufig einfacher Wortschatz, Wiederholungen
   D = Fast nur einfache Strukturen

4. KOMMUNIKATIVE GESTALTUNG (Textaufbau und Konnektoren)
   A = Gut strukturiert, passende Verknüpfungen
   B = Weitgehend gut strukturiert
   C = Strukturbrüche, wenig Konnektoren
   D = Unklare Struktur

MEIN TEXT:
---
${userText}
---

Bitte gib mir:
1. Eine Note (A/B/C/D) für jedes der 4 Kriterien mit kurzer Begründung
2. Gesamtpunktzahl (A=12, B=8, C=4, D=0 pro Kriterium, max. 48)
3. Die wichtigsten Fehler mit Korrektur und Erklärung (Original → Korrektur, Kategorie: Morphologie/Syntax/Orthographie/Lexik/Stil)
4. Eine verbesserte Version meines Textes
5. 2-3 konkrete Tipps, was ich beim nächsten Mal besser machen kann`;
}

// ─── API Key Banner ───────────────────────────────────

function ApiKeyBanner() {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 px-4 py-3">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-xs sm:text-sm flex-1">{t('writing_no_api_alternative')}</p>
        <Link to="/settings" className="shrink-0 hidden sm:block">
          <Button variant="outline" size="sm">{t('nav_settings')}</Button>
        </Link>
      </div>
      <div className="flex justify-end mt-2 sm:hidden">
        <Link to="/settings">
          <Button variant="outline" size="sm">{t('nav_settings')}</Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Redemittel data ─────────────────────────────────

type Phrase = { de: string; en: string };
type RedemittelSubsection = { key: string; label: string; phrases: Phrase[] };
type RedemittelSection = { tab: string; label: string; subsections: RedemittelSubsection[] };

export const REDEMITTEL_SECTIONS: RedemittelSection[] = [
  {
    tab: 'einleitung', label: 'Einleitung',
    subsections: [
      { key: 'einl-aktualitaet', label: 'Aktualität herstellen', phrases: [
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
      ]},
      { key: 'einl-problem', label: 'Ein Problem einleiten', phrases: [
        { de: 'Viele Menschen / Unternehmen stoßen dabei an ihre Grenzen.', en: 'Many people / companies reach their limits in this regard.' },
        { de: 'Trotz zahlreicher Bemühungen bleibt ... ein ungelöstes Problem.', en: 'Despite numerous efforts, ... remains an unsolved problem.' },
        { de: 'Die Herausforderung besteht darin, dass ...', en: 'The challenge lies in the fact that ...' },
        { de: 'Es stellt sich die grundlegende Frage, inwieweit ...', en: 'The fundamental question arises as to what extent ...' },
        { de: 'Obwohl vielfach thematisiert, mangelt es nach wie vor an konkreten Lösungsansätzen.', en: 'Although frequently addressed, there is still a lack of concrete solutions.' },
        { de: 'Die Kluft zwischen Anspruch und Wirklichkeit wird im Bereich ... besonders deutlich.', en: 'The gap between aspiration and reality is particularly evident in the area of ...' },
      ]},
      { key: 'einl-ueberleitung', label: 'Zum Hauptteil überleiten', phrases: [
        { de: 'Im Folgenden sollen die Vor- und Nachteile von ... dargelegt werden.', en: 'In the following, the advantages and disadvantages of ... will be outlined.' },
        { de: 'Nachfolgend werden die wichtigsten Argumente dargestellt und mit einem Fazit abgeschlossen.', en: 'Below, the key arguments will be presented and concluded with a summary.' },
        { de: 'Dieser Fragestellung möchte ich im Folgenden unter verschiedenen Gesichtspunkten nachgehen.', en: 'I would like to explore this question from various perspectives in the following.' },
        { de: 'Um zu einem differenzierten Urteil zu gelangen, ist es notwendig, sowohl ... als auch ... in den Blick zu nehmen.', en: 'To reach a differentiated judgment, it is necessary to consider both ... and ...' },
      ]},
    ],
  },
  {
    tab: 'hauptteil', label: 'Hauptteil',
    subsections: [
      { key: 'haupt-argumente', label: 'Argumente einführen', phrases: [
        { de: 'Ein wesentlicher Aspekt ist ...', en: 'A key aspect is ...' },
        { de: 'Zunächst ist festzuhalten, dass ...', en: 'First of all, it should be noted that ...' },
        { de: 'Ein zentrales Argument für / gegen ... ist ...', en: 'A central argument for / against ... is ...' },
        { de: 'Einer der Hauptgründe für ... ist ...', en: 'One of the main reasons for ... is ...' },
        { de: 'Als erstes sei darauf hingewiesen, dass ...', en: 'First, it should be pointed out that ...' },
        { de: 'Ausschlaggebend für diese Entwicklung ist vor allem ...', en: 'The decisive factor for this development is above all ...' },
        { de: 'An erster Stelle steht die Tatsache, dass ...', en: 'In first place stands the fact that ...' },
        { de: 'Was besonders ins Gewicht fällt, ist ...', en: 'What is particularly significant is ...' },
      ]},
      { key: 'haupt-weitere', label: 'Weitere Argumente anfügen', phrases: [
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
      ]},
      { key: 'haupt-gegen', label: 'Gegenargumente einleiten', phrases: [
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
      ]},
      { key: 'haupt-beispiele', label: 'Beispiele anführen', phrases: [
        { de: 'Dies lässt sich am Beispiel von ... verdeutlichen.', en: 'This can be illustrated by the example of ...' },
        { de: 'Ein anschauliches Beispiel hierfür ist ...', en: 'A vivid example of this is ...' },
        { de: 'So zeigt sich etwa, dass ...', en: 'For instance, it can be seen that ...' },
        { de: 'Konkret bedeutet das: ...', en: 'Concretely, this means: ...' },
        { de: 'Exemplarisch sei hier ... angeführt.', en: 'As an example, ... may be cited here.' },
        { de: 'Besonders deutlich wird dies anhand von ...', en: 'This becomes particularly clear through ...' },
        { de: 'Wie ... eindrücklich belegt, ...', en: 'As ... impressively demonstrates, ...' },
        { de: 'Dies wird durch die Tatsache untermauert, dass ...', en: 'This is underpinned by the fact that ...' },
      ]},
    ],
  },
  {
    tab: 'schluss', label: 'Schluss',
    subsections: [
      { key: 'schl-fazit', label: 'Fazit ziehen', phrases: [
        { de: 'Zusammenfassend lässt sich feststellen, dass ...', en: 'In summary, it can be stated that ...' },
        { de: 'Nach Abwägung der Vor- und Nachteile lässt sich feststellen, dass ...', en: 'After weighing the pros and cons, it can be concluded that ...' },
        { de: 'Alles in allem zeigt sich, dass ...', en: 'All in all, it shows that ...' },
        { de: 'In der Gesamtbetrachtung überwiegen die ... gegenüber den ...', en: 'Overall, the ... outweigh the ...' },
        { de: 'Unter Berücksichtigung aller genannten Aspekte lässt sich konstatieren, dass ...', en: 'Taking all mentioned aspects into account, it can be stated that ...' },
        { de: 'Resümierend ist festzuhalten, dass ...', en: 'To summarize, it should be noted that ...' },
      ]},
      { key: 'schl-meinung', label: 'Eigene Meinung', phrases: [
        { de: 'Meiner Ansicht nach ...', en: 'In my view ...' },
        { de: 'Ich bin der Überzeugung, dass ...', en: 'I am convinced that ...' },
        { de: 'Meines Erachtens wäre es zielführender, ...', en: 'In my estimation, it would be more productive to ...' },
        { de: 'Ich persönlich neige zu der Auffassung, dass ...', en: 'I personally tend to the view that ...' },
      ]},
      { key: 'schl-ausblick', label: 'Ausblick', phrases: [
        { de: 'Es bleibt abzuwarten, wie sich ... entwickeln wird.', en: 'It remains to be seen how ... will develop.' },
        { de: 'Schließen möchte ich mit dem Gedanken, dass ...', en: 'I would like to close with the thought that ...' },
        { de: 'Die Zukunft wird zeigen, ob die genannten Maßnahmen die erhoffte Wirkung entfalten.', en: 'The future will show whether the mentioned measures will have the desired effect.' },
        { de: 'Entscheidend wird letztlich sein, inwieweit es gelingt, ...', en: 'Ultimately, the decisive factor will be the extent to which it is possible to ...' },
      ]},
    ],
  },
  {
    tab: 'c1-strukturen', label: 'Strukturen',
    subsections: [
      { key: 'c1-konjunktiv', label: 'Konjunktiv II für Distanz', phrases: [
        { de: '\u201EMan könnte argumentieren, dass...\u201C', en: '"One could argue that..."' },
        { de: '\u201EEs ließe sich einwenden, dass...\u201C', en: '"It could be objected that..."' },
        { de: '\u201EEs wäre denkbar, dass...\u201C', en: '"It would be conceivable that..."' },
        { de: '\u201EDem ließe sich entgegenhalten, dass...\u201C', en: '"One could counter this by saying that..."' },
        { de: '\u201EEs dürfte kaum zu bestreiten sein, dass...\u201C', en: '"It can hardly be denied that..."' },
        { de: '\u201EMan müsste sich fragen, ob...\u201C', en: '"One would have to ask whether..."' },
      ]},
      { key: 'c1-passiv', label: 'Passiv-Ersatzformen', phrases: [
        { de: '\u201E... lässt sich feststellen\u201C (= kann festgestellt werden)', en: '"... can be determined" (= can be established)' },
        { de: '\u201E... ist zu berücksichtigen\u201C (= muss berücksichtigt werden)', en: '"... is to be considered" (= must be taken into account)' },
        { de: '\u201E... bleibt zu klären\u201C (= muss noch geklärt werden)', en: '"... remains to be clarified" (= still needs to be resolved)' },
        { de: '\u201E... gilt als erwiesen\u201C (= wird als erwiesen betrachtet)', en: '"... is regarded as proven" (= is considered established)' },
        { de: '\u201E... bedarf einer genaueren Betrachtung\u201C (= muss genauer betrachtet werden)', en: '"... requires closer examination" (= needs to be examined more closely)' },
      ]},
      { key: 'c1-fvg', label: 'Funktionsverbgefüge', phrases: [
        { de: '\u201Ein Frage stellen\u201C statt \u201Ebezweifeln\u201C', en: '"to call into question" instead of "to doubt"' },
        { de: '\u201Ezur Diskussion stehen\u201C statt \u201Ediskutiert werden\u201C', en: '"to be up for discussion" instead of "to be discussed"' },
        { de: '\u201Ein Betracht ziehen\u201C statt \u201Eberücksichtigen\u201C', en: '"to take into consideration" instead of "to consider"' },
        { de: '\u201Ezum Ausdruck bringen\u201C statt \u201Eausdrücken\u201C', en: '"to give expression to" instead of "to express"' },
        { de: '\u201EStellung nehmen zu\u201C statt \u201Eseine Meinung sagen\u201C', en: '"to take a position on" instead of "to state one\'s opinion"' },
        { de: '\u201Ein Kauf nehmen\u201C statt \u201Eakzeptieren\u201C', en: '"to accept/tolerate" instead of "to accept"' },
      ]},
    ],
  },
];

const REDEMITTEL_CONNECTORS = [
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

// ─── Redemittel colors ───────────────────────────────

const REDEMITTEL_BADGE_COLORS: Record<string, string> = {
  'einl-aktualitaet': 'text-emerald-700 dark:text-emerald-300',
  'einl-problem': 'text-rose-700 dark:text-rose-300',
  'einl-ueberleitung': 'text-blue-700 dark:text-blue-300',
  'haupt-argumente': 'text-blue-700 dark:text-blue-300',
  'haupt-weitere': 'text-violet-700 dark:text-violet-300',
  'haupt-gegen': 'text-rose-700 dark:text-rose-300',
  'haupt-beispiele': 'text-amber-700 dark:text-amber-300',
  'schl-fazit': 'text-indigo-700 dark:text-indigo-300',
  'schl-meinung': 'text-emerald-700 dark:text-emerald-300',
  'schl-ausblick': 'text-cyan-700 dark:text-cyan-300',
  'c1-konjunktiv': 'text-violet-700 dark:text-violet-300',
  'c1-passiv': 'text-blue-700 dark:text-blue-300',
  'c1-fvg': 'text-amber-700 dark:text-amber-300',
};

const REDEMITTEL_BORDER_COLORS: Record<string, string> = {
  'einl-aktualitaet': 'border-l-emerald-400',
  'einl-problem': 'border-l-rose-400',
  'einl-ueberleitung': 'border-l-blue-400',
  'haupt-argumente': 'border-l-blue-400',
  'haupt-weitere': 'border-l-violet-400',
  'haupt-gegen': 'border-l-rose-400',
  'haupt-beispiele': 'border-l-amber-400',
  'schl-fazit': 'border-l-indigo-400',
  'schl-meinung': 'border-l-emerald-400',
  'schl-ausblick': 'border-l-cyan-400',
  'c1-konjunktiv': 'border-l-violet-400',
  'c1-passiv': 'border-l-blue-400',
  'c1-fvg': 'border-l-amber-400',
};

// ─── Flatten helper ──────────────────────────────────

type FlatRow = { idx: number; subsectionKey: string; subsectionLabel: string; de: string; en: string };

function flattenRedemittelSection(
  section: RedemittelSection,
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

// ─── Redemittel Tab Content ──────────────────────────

function RedemittelContent() {
  const { customConnectors, addConnector, removeConnector } = useCustomPhrases();
  const { isHighlighted, toggle: toggleHighlight } = useHighlightedPhrases('writing-tips-highlights');
  const [starredOnly, setStarredOnly] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('einleitung');
  const player = usePlayAll();

  const speakingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speak = useCallback((text: string, ttsUrl?: string) => {
    if (speakingRef.current) {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      speechSynthesis.cancel();
      speakingRef.current = false;
      return;
    }
    if (ttsUrl) {
      const audio = new Audio(ttsUrl);
      audioRef.current = audio;
      audio.onended = () => { speakingRef.current = false; audioRef.current = null; };
      speakingRef.current = true;
      audio.play();
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.onend = () => { speakingRef.current = false; };
    speakingRef.current = true;
    speechSynthesis.speak(u);
  }, []);

  // Stop play-all when filters change
  useEffect(() => { player.stop(); }, [starredOnly, categoryFilter]);

  const TERTIARY_ICONS: Record<string, typeof PlayCircle> = {
    einleitung: PlayCircle,
    hauptteil: AlignLeft,
    schluss: CheckCircle,
    'c1-strukturen': Braces,
    konnektoren: Link2,
  };

  const navItems: TertiaryNavItem[] = [
    ...REDEMITTEL_SECTIONS.map(s => ({ value: s.tab, label: s.label, icon: TERTIARY_ICONS[s.tab] })),
    { value: 'konnektoren', label: 'Konnektoren', icon: Link2 },
  ];

  const flatSections = useMemo(() => {
    const map: Record<string, FlatRow[]> = {};
    for (const s of REDEMITTEL_SECTIONS) {
      let rows = flattenRedemittelSection(s, starredOnly, isHighlighted);
      const filter = categoryFilter[s.tab];
      if (filter && filter !== 'Alle') {
        rows = rows.filter(r => r.subsectionKey === filter);
      }
      map[s.tab] = rows;
    }
    return map;
  }, [starredOnly, isHighlighted, categoryFilter]);

  const starredBtn = <StarredButton active={starredOnly} onClick={() => setStarredOnly(prev => !prev)} />;

  const activeSection = REDEMITTEL_SECTIONS.find(s => s.tab === activeTab);

  return (
    <div className="space-y-4">
      <TertiaryNav items={navItems} activeValue={activeTab} onChange={setActiveTab} color="blue" />
      <SelectionHint />

      {/* Phrase section content */}
      {activeSection && (
        <div className="space-y-4">
          <div className="mt-2 mb-4 flex items-center justify-end gap-2">{starredBtn}<PlayAllButton color="blue" player={player} getUrls={() => { const audio = TAB_TO_AUDIO[activeSection.tab]; return (flatSections[activeSection.tab] ?? []).map(r => audio ? getTtsUrl(audio, r.idx) : undefined).filter(Boolean) as string[]; }} /></div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-1 text-xs font-semibold text-muted-foreground">
                    <Select value={categoryFilter[activeSection.tab] ?? 'Alle'} onValueChange={(v) => setCategoryFilter(prev => ({ ...prev, [activeSection.tab]: v }))}>
                      <SelectTrigger className="h-auto w-auto justify-start text-left text-xs font-semibold border-0 bg-transparent shadow-none px-1">
                        <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alle">Alle Kategorien</SelectItem>
                        {activeSection.subsections.map(sub => (
                          <SelectItem key={sub.key} value={sub.key}>
                            <span className="flex items-center gap-2">
                              <span className={`inline-block w-2 h-2 rounded-full ${(REDEMITTEL_BORDER_COLORS[sub.key] ?? '').replace('border-l-', 'bg-')}`} />
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
                {flatSections[activeSection.tab]?.map((row, i, arr) => {
                  const sel = isHighlighted(row.de);
                  const prevKey = i > 0 ? arr[i - 1].subsectionKey : null;
                  const isNewGroup = prevKey !== null && prevKey !== row.subsectionKey;
                  return (
                    <TableRow
                      key={`${row.subsectionKey}-${row.idx}`}
                      onClick={() => { markHintInteraction('table'); toggleHighlight(row.de); }}
                      className={`cursor-pointer transition-colors ${isNewGroup ? 'border-t-4 border-t-muted' : ''} ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
                    >
                      <TableCell className={`border-l-4 ${REDEMITTEL_BORDER_COLORS[row.subsectionKey] ?? 'border-l-transparent'}`}>
                        <span className={`text-xs font-normal whitespace-nowrap ${REDEMITTEL_BADGE_COLORS[row.subsectionKey] ?? ''}`}>
                          {row.subsectionLabel}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); const audio = TAB_TO_AUDIO[activeSection.tab]; speak(row.de, audio ? getTtsUrl(audio, row.idx) : undefined); }}
                            className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                          {row.de}
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
            <Select value={categoryFilter[activeSection.tab] ?? 'Alle'} onValueChange={(v) => setCategoryFilter(prev => ({ ...prev, [activeSection.tab]: v }))}>
              <SelectTrigger className="w-full">
                <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alle">Alle Kategorien</SelectItem>
                {activeSection.subsections.map(sub => (
                  <SelectItem key={sub.key} value={sub.key}>{sub.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {flatSections[activeSection.tab]?.map((row, i, arr) => {
              const sel = isHighlighted(row.de);
              const prevKey = i > 0 ? arr[i - 1].subsectionKey : null;
              const isNewGroup = prevKey !== null && prevKey !== row.subsectionKey;
              return (
                <div
                  key={`${row.subsectionKey}-${row.idx}`}
                  onClick={() => { markHintInteraction('table'); toggleHighlight(row.de); }}
                  className={`relative rounded-lg border border-l-4 ${REDEMITTEL_BORDER_COLORS[row.subsectionKey] ?? ''} p-4 space-y-2 cursor-pointer transition-colors ${isNewGroup ? 'mt-6' : ''} ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-card'}`}
                >
                  <span className={`text-xs font-normal whitespace-nowrap ${REDEMITTEL_BADGE_COLORS[row.subsectionKey] ?? ''}`}>
                    {row.subsectionLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); const audio = TAB_TO_AUDIO[activeSection.tab]; speak(row.de, audio ? getTtsUrl(audio, row.idx) : undefined); }} className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <p className="text-sm font-medium text-foreground">{row.de}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{row.en}</p>
                </div>
              );
            })}
          </div>

          {starredOnly && (flatSections[activeSection.tab]?.length ?? 0) === 0 && (
            <div className="py-10 text-center text-sm space-y-2 bg-card rounded-lg border">
              <p className="text-muted-foreground">Noch keine Einträge markiert — klicke auf eine Zeile, um sie zu markieren.</p>
              <button className="text-primary text-sm font-medium hover:underline" onClick={() => setStarredOnly(false)}>Alle anzeigen</button>
            </div>
          )}
        </div>
      )}

      {/* Konnektoren */}
      {activeTab === 'konnektoren' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px] font-semibold">Funktion</TableHead>
                  <TableHead className="font-semibold">Konnektoren</TableHead>
                  <TableHead className="w-[40px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {REDEMITTEL_CONNECTORS.map((c) => (
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
        </div>
      )}
    </div>
  );
}

// ─── Grade helpers ────────────────────────────────────

const GRADE_POINTS: Record<string, number> = { A: 12, B: 8, C: 4, D: 0 };

function gradeColor(grade: string) {
  switch (grade) {
    case 'A': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
    case 'B': return 'text-primary bg-primary/10';
    case 'C': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
    case 'D': return 'text-destructive bg-destructive/10';
    default: return 'text-muted-foreground bg-muted';
  }
}

function ScoreCard({ label, grade }: { label: string; grade: string }) {
  if (!grade) return null;
  const points = GRADE_POINTS[grade] ?? 0;
  return (
    <div className={`rounded-lg p-3 text-center ${gradeColor(grade)}`}>
      <div className="text-xs font-medium opacity-80">{label}</div>
      <div className="text-lg font-bold">{grade} ({points}/12)</div>
    </div>
  );
}

// ─── Evaluation Display ──────────────────────────────

function EvaluationDisplay({ evaluation }: { evaluation: EvaluationResponse }) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const lang = profile?.ui_language || 'de';

  const corrections = evaluation.korrektheit?.corrections ?? [];
  const feedback = lang === 'de' ? evaluation.overall_feedback_de : evaluation.overall_feedback_en;

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
      <h3 className="text-lg font-semibold text-foreground">{t('eval_results')}</h3>

      <div className="grid grid-cols-2 gap-3">
        <ScoreCard label={t('eval_aufgabengerechtheit')} grade={evaluation.aufgabengerechtheit?.grade} />
        <ScoreCard label={t('eval_korrektheit')} grade={evaluation.korrektheit?.grade} />
        <ScoreCard label={t('eval_repertoire')} grade={evaluation.repertoire?.grade} />
        <ScoreCard label={t('eval_kommunikative_gestaltung')} grade={evaluation.kommunikative_gestaltung?.grade} />
      </div>

      <div className="text-center text-lg font-bold text-foreground">
        {t('eval_total')}: {evaluation.total_points}/{evaluation.max_points}
      </div>

      <Accordion type="multiple" className="w-full">
        {feedback && (
          <AccordionItem value="feedback">
            <AccordionTrigger>{t('eval_detailed_feedback')}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-foreground">
                {(['aufgabengerechtheit', 'korrektheit', 'repertoire', 'kommunikative_gestaltung'] as const).map((key) => {
                  const c = evaluation[key];
                  if (!c) return null;
                  const fb = lang === 'de' ? c.feedback_de : c.feedback_en;
                  return (
                    <div key={key}>
                      <p className="font-medium">{t(`eval_${key}` as any)} ({c.grade})</p>
                      <p className="text-muted-foreground">{fb}</p>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {corrections.length > 0 && (
          <AccordionItem value="corrections">
            <AccordionTrigger>{t('eval_corrections')}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {corrections.map((c, i) => (
                  <div key={i} className="rounded border border-border p-3 text-sm">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="line-through text-destructive">{c.original}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium text-emerald-600">{c.corrected}</span>
                      <Badge variant="secondary" className="text-[10px]">{c.category}</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      {lang === 'de' ? c.explanation_de : c.explanation_en}
                    </p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {evaluation.improved_version && (
          <AccordionItem value="improved">
            <AccordionTrigger>{t('eval_improved_version')}</AccordionTrigger>
            <AccordionContent>
              <p className="whitespace-pre-wrap text-sm text-foreground">{evaluation.improved_version}</p>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}

// ─── Writing Interface ────────────────────────────────

function WritingInterface({
  prompt,
  existingSubmission,
  hasApiKey,
  levelLabel,
  onBack,
  onSubmitted,
}: {
  prompt: WritingPrompt;
  existingSubmission?: WritingSubmission;
  hasApiKey: boolean;
  levelLabel: string;
  onBack: () => void;
  onSubmitted: (sub: WritingSubmission) => void;
}) {
  const { t } = useTranslation();
  const { profile } = useRequiredAuth();
  const lang = profile?.ui_language || 'de';

  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const context = lang === 'de' ? prompt.context_de : prompt.context_en;
  const starterQuotes = (prompt.starter_quotes as unknown as { text: string; source: string }[] | null) ?? [];

  const handleSubmit = async () => {
    if (!hasApiKey) {
      toast({ title: t('writing_api_key_needed'), variant: 'destructive' });
      return;
    }
    setSubmitting(true);

    try {
      const res = await supabase.functions.invoke('evaluate-writing', {
        body: {
          prompt_type: prompt.prompt_type,
          topic: prompt.title_de,
          context: prompt.context_de,
          user_text: text,
          prompt_id: prompt.id,
        },
      });

      if (res.error) throw res.error;
      const data = res.data as EvaluationResponse;

      if (data.error) {
        if (data.code === 'no_api_key') {
          toast({ title: data.error, variant: 'destructive' });
          return;
        }
        toast({ title: data.error, variant: 'destructive' });
        return;
      }

      setEvaluation(data);

      const { data: newSub } = await supabase
        .from('writing_submissions')
        .select('*')
        .eq('prompt_id', prompt.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (newSub) {
        onSubmitted(newSub as WritingSubmission);
      }
    } catch (err: any) {
      toast({ title: t('common_error'), description: err.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer" onClick={onBack}>
                {t('page_writing')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lang === 'de' ? prompt.title_de : prompt.title_en}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-foreground">
            {lang === 'de' ? prompt.title_de : prompt.title_en}
          </h2>
          {prompt.exam_format === 'telc' && <TelcBadge />}
        </div>
      </div>

      {!hasApiKey && <ApiKeyBanner />}

      {/* Context box */}
      <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
        <p className="text-sm text-foreground whitespace-pre-wrap">{context}</p>
      </div>

      {/* Starter quotes */}
      {starterQuotes.length > 0 && (
        <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-4">
          {starterQuotes.map((q, i) => (
            <blockquote key={i} className="border-l-2 border-primary pl-3 text-sm italic text-foreground">
              „{q.text}" — <span className="not-italic text-muted-foreground">{q.source}</span>
            </blockquote>
          ))}
        </div>
      )}

      {/* Target info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{t('writing_target')}: ~{prompt.target_word_count} {t('writing_word_count')}</span>
        {hasApiKey && <span>{t('writing_cost_note')}</span>}
      </div>

      {/* Textarea */}
      {!evaluation && (
        <>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={lang === 'de' ? 'Schreibe hier deinen Text...' : 'Write your text here...'}
            className="min-h-[200px] resize-y text-base bg-white dark:bg-card"
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-sm text-muted-foreground">
              {t('writing_word_count')}: {wordCount}/{prompt.target_word_count}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="text-xs sm:text-sm"
                onClick={() => {
                  navigator.clipboard.writeText(buildCopyPrompt(prompt, text));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                  toast({ title: t('writing_copied') });
                }}
                disabled={wordCount < 10}
              >
                {copied ? (
                  <><CheckCheck className="mr-2 h-4 w-4" />{t('writing_copied')}</>
                ) : (
                  <><Copy className="mr-2 h-4 w-4 shrink-0" /><span className="truncate">{t('writing_copy_prompt')}</span></>
                )}
              </Button>
              {hasApiKey && (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || wordCount < 10}
                  className="shrink-0"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('writing_evaluating')}
                    </>
                  ) : (
                    t('writing_submit')
                  )}
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Results */}
      {evaluation && <EvaluationDisplay evaluation={evaluation} />}

      {evaluation && (
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setEvaluation(null); setText(''); }}>
            {t('exercise_try_again')}
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Prompt List (for each level tab) ────────────────

function LevelPromptList({
  level,
  hasApiKey,
  onSelectPrompt,
}: {
  level: WritingLevel;
  hasApiKey: boolean;
  onSelectPrompt: (prompt: WritingPrompt) => void;
}) {
  const { user } = useRequiredAuth();
  const { profile } = useRequiredAuth();
  const { t } = useTranslation();
  const lang = profile?.ui_language || 'de';

  const [prompts, setPrompts] = useState<WritingPrompt[]>([]);
  const [submissions, setSubmissions] = useState<Map<string, WritingSubmission>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    setLoading(true);

    Promise.all([
      supabase.from('writing_prompts').select('*').eq('level', level).order('sort_order'),
      supabase.from('writing_submissions').select('*').eq('user_id', user.id),
    ]).then(([promptsRes, subsRes]) => {
      if (cancelled) return;
      setPrompts(promptsRes.data ?? []);
      const subMap = new Map<string, WritingSubmission>();
      (subsRes.data ?? []).forEach((s) => subMap.set(s.prompt_id, s as WritingSubmission));
      setSubmissions(subMap);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [user, level]);

  if (loading) {
    return <div className="flex items-center justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-3">
      {!hasApiKey && <ApiKeyBanner />}
      <div className="grid gap-3">
        {prompts.map((p) => {
          const sub = submissions.get(p.id);
          return (
            <Card
              key={p.id}
              className="cursor-pointer transition-colors hover:bg-accent/50"
              onClick={() => onSelectPrompt(p)}
            >
              <CardContent className="p-4 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-foreground">
                    {lang === 'de' ? p.title_de : p.title_en}
                  </span>
                  <div className="text-sm shrink-0">
                    {sub ? (
                      <Badge variant="default" className="text-[10px] sm:text-xs">
                        {t('writing_submitted')} ({sub.total_points ?? '?'} {t('eval_points')})
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] sm:text-xs">{t('writing_not_started')}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Badge variant="secondary" className="text-[10px] sm:text-xs capitalize">
                    {p.text_type.replace(/_/g, ' ')}
                  </Badge>
                  {p.exam_format === 'telc' && <TelcBadge />}
                  <span>~{p.target_word_count} {t('writing_word_count')}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────

export default function WritingPage() {
  const { user, profile } = useRequiredAuth();
  const { t } = useTranslation();
  const lang = profile?.ui_language || 'de';

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(searchParams.get('tab') || 'almost_c1');
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null);

  const hasApiKey = !!profile?.api_key_encrypted;

  const currentTabConfig = LEVEL_TABS.find(l => l.value === activeTab);
  const levelLabel = currentTabConfig ? (lang === 'de' ? currentTabConfig.label_de : currentTabConfig.label_en) : '';

  if (selectedPrompt) {
    return (
      <WritingInterface
        prompt={selectedPrompt}
        hasApiKey={hasApiKey}
        levelLabel={levelLabel}
        onBack={() => setSelectedPrompt(null)}
        onSubmitted={() => {}}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <PenLine className="h-6 w-6" />
          {t('page_writing')}
          <TelcBadge className="ml-1" />
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {lang === 'de' ? 'Übe das Schreiben von Texten auf Prüfungsniveau.' : 'Practice writing texts at exam level.'}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <ScrollNav>
          <TabsList className={`${NAV_CONTAINER} h-auto gap-1`}>
            {LEVEL_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`${TAB_TRIGGER_BLUE} gap-1.5`}
              >
                {lang === 'de' ? tab.label_de : tab.label_en}
              </TabsTrigger>
            ))}
            <TabsTrigger
              value="redemittel"
              className={`${TAB_TRIGGER_BLUE} gap-1.5`}
            >
              <MessagesSquare className="h-4 w-4" />Redemittel
            </TabsTrigger>
          </TabsList>
        </ScrollNav>

        {LEVEL_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              {lang === 'de' ? tab.subtitle_de : tab.subtitle_en}
            </p>
            <LevelPromptList
              level={tab.value}
              hasApiKey={hasApiKey}
              onSelectPrompt={setSelectedPrompt}
            />
          </TabsContent>
        ))}

        <TabsContent value="redemittel" className="mt-4">
          <RedemittelContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
