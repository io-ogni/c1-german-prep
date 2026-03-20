import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { Languages, Zap, Link2, Presentation, GitBranch, Shield, AlertTriangle, Star, Volume2, Filter, MousePointerClick, Monitor } from 'lucide-react';
import { StarredButton } from '@/components/shared/StarredButton';
import { useTableClickHint } from '@/hooks/useTableClickHint';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ITDeutschNav } from '@/components/layout/ITDeutschNav';
import { useAuth } from '@/contexts/AuthContext';
import { PlayAllButton } from '@/components/PlayAllButton';
import { usePlayAll } from '@/hooks/usePlayAll';
import { PILL_CONTAINER, TAB_TRIGGER_FUCHSIA } from '@/components/shared/navStyles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// ─── TTS Audio (Google Cloud Neural2) ───
const ttsAudio: Record<string, Record<string, string>> = {
  nouns: import.meta.glob('/src/assets/audio/nouns/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  verbs: import.meta.glob('/src/assets/audio/verbs/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  kollokationen: import.meta.glob('/src/assets/audio/kollokationen/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  workshop: import.meta.glob('/src/assets/audio/workshop/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  refinement: import.meta.glob('/src/assets/audio/refinement/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  souveranitaet: import.meta.glob('/src/assets/audio/souveranitaet/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
  notfallkit: import.meta.glob('/src/assets/audio/notfallkit/*.mp3', { eager: true, import: 'default' }) as Record<string, string>,
};
function getTtsUrl(section: string, index: number): string | undefined {
  const map = ttsAudio[section];
  if (!map) return undefined;
  const padded = String(index + 1).padStart(2, '0');
  return map[`/src/assets/audio/${section}/${section}-${padded}.mp3`];
}

// ─── 50 Power Nouns ───
export const NOUNS = [
  { de: 'Die Implementierung', en: 'Implementation', example: 'Die schrittweise Implementierung der Microservices-Architektur hat die Systemkomplexität deutlich reduziert.' },
  { de: 'Die Skalierbarkeit', en: 'Scalability', example: 'Bei der Auswahl des Tech-Stacks stand die horizontale Skalierbarkeit unter Hochlast im Vordergrund.' },
  { de: 'Die Belastbarkeit', en: 'Resilience / Load capacity', example: 'Wir haben die Belastbarkeit der API durch intensive Lasttests unter Extrembedingungen verifiziert.' },
  { de: 'Die Redundanz', en: 'Redundancy', example: 'Um Datenverlust auszuschließen, haben wir eine geografische Redundanz für unsere Datenbanken etabliert.' },
  { de: 'Die Schnittstelle', en: 'Interface / API', example: 'Eine saubere Dokumentation der Schnittstelle ist essenziell für die nahtlose Integration von Drittanbietern.' },
  { de: 'Die Wartbarkeit', en: 'Maintainability', example: 'Durch konsequentes Refactoring wurde die langfristige Wartbarkeit des Legacy-Codes sichergestellt.' },
  { de: 'Die Zukunftsfähigkeit', en: 'Future-proofing', example: 'Diese technologische Entscheidung sichert die Zukunftsfähigkeit unserer gesamten Plattform.' },
  { de: 'Die Durchgängigkeit', en: 'Consistency / Continuity', example: 'Wir müssen die Durchgängigkeit des Datenflusses vom Frontend bis zum Data Warehouse gewährleisten.' },
  { de: 'Das Alleinstellungsmerkmal', en: 'USP (Unique Selling Point)', example: 'Die KI-gestützte Fehlerprognose ist das technologische Alleinstellungsmerkmal unseres Produkts.' },
  { de: 'Die Machbarkeitsstudie', en: 'Feasibility study', example: 'Vor dem Projektstart führen wir eine umfassende Machbarkeitsstudie bezüglich der Cloud-Migration durch.' },
  { de: 'Die Vorgehensweise', en: 'Approach / Methodology', example: 'Unsere agile Vorgehensweise erlaubt es uns, flexibel auf sich ändernde Marktanforderungen zu reagieren.' },
  { de: 'Die Zielsetzung', en: 'Goal setting / Objectives', example: 'Eine klare Zielsetzung ist die Grundvoraussetzung für ein effizientes Sprint-Backlog.' },
  { de: 'Die Fehlerbehebung', en: 'Bug fixing / Patching', example: 'Die Fehlerbehebung im Produktivsystem genießt aktuell unsere höchste Priorität.' },
  { de: 'Die Engpassanalyse', en: 'Bottleneck analysis', example: 'Mithilfe einer Engpassanalyse konnten wir die Verzögerungen in der Deployment-Pipeline identifizieren.' },
  { de: 'Die Ressourcenplanung', en: 'Resource planning', example: 'Eine vorausschauende Ressourcenplanung verhindert Burnout-Szenarien während der Release-Phase.' },
  { de: 'Die Qualitätssicherung', en: 'Quality Assurance (QA)', example: 'Automatisierte Unit-Tests sind ein integraler Bestandteil unserer Qualitätssicherung.' },
  { de: 'Die Abnahme', en: 'Formal acceptance / Sign-off', example: 'Nach erfolgreichem UAT erfolgt die formale Abnahme durch den Product Owner.' },
  { de: 'Der Meilenstein', en: 'Milestone', example: 'Mit dem Go-Live des Payment-Moduls haben wir einen entscheidenden Meilenstein erreicht.' },
  { de: 'Die Aufwandsschätzung', en: 'Effort estimation', example: 'Unsere Aufwandsschätzung basierte auf historischen Daten vergleichbarer User Stories.' },
  { de: 'Die Nachjustierung', en: 'Readjustment / Fine-tuning', example: 'Nach dem ersten Feedback der Beta-Tester ist eine feingliedrige Nachjustierung der UI erforderlich.' },
  { de: 'Die Datensicherheit', en: 'Data security', example: 'Höchste Datensicherheit wird durch eine durchgehende Ende-zu-Ende-Verschlüsselung garantiert.' },
  { de: 'Die DSGVO', en: 'GDPR', example: 'Sämtliche Prozesse wurden im Hinblick auf die Konformität mit der DSGVO auditiert.' },
  { de: 'Die Zugriffsberechtigung', en: 'Access authorization', example: 'Das Prinzip der minimalen Zugriffsberechtigung schützt unsere sensiblen Kundendaten.' },
  { de: 'Die Verschlüsselung', en: 'Encryption', example: 'Ohne eine robuste Verschlüsselung ist der Transfer personenbezogener Daten unzulässig.' },
  { de: 'Die Compliance-Richtlinien', en: 'Compliance guidelines', example: 'Wir schulen alle Entwickler regelmäßig bezüglich unserer internen Compliance-Richtlinien.' },
  { de: 'Die Sicherheitslücke', en: 'Security vulnerability', example: 'Die zeitnahe Schließung der kritischen Sicherheitslücke verhinderte einen potenziellen Datenabfluss.' },
  { de: 'Die Nachverfolgbarkeit', en: 'Traceability', example: 'Audit-Logs gewährleisten die lückenlose Nachverfolgbarkeit aller Systemänderungen.' },
  { de: 'Die Ausfallsicherheit', en: 'Fail-safety / Uptime', example: 'Durch Load-Balancing erreichen wir eine Ausfallsicherheit von 99,99 %.' },
  { de: 'Die Geheimhaltungsvereinbarung', en: 'NDA', example: 'Vor Einsicht in den Quellcode muss eine entsprechende Geheimhaltungsvereinbarung unterzeichnet werden.' },
  { de: 'Die Beweislast', en: 'Burden of proof', example: 'Im Falle eines Systemausfalls liegt die Beweislast beim externen Hosting-Anbieter.' },
  { de: 'Die Effizienzsteigerung', en: 'Efficiency increase', example: 'Die Einführung von Containerisierung führte zu einer messbaren Effizienzsteigerung im Deployment.' },
  { de: 'Die Kostenoptimierung', en: 'Cost optimization', example: 'Durch den Wechsel zu Serverless Computing konnten wir eine signifikante Kostenoptimierung erzielen.' },
  { de: 'Die Performance-Metrik', en: 'Performance metric', example: 'Wir überwachen jede relevante Performance-Metrik in Echtzeit über unser Dashboard.' },
  { de: 'Die Markteinführung', en: 'Market launch', example: 'Die Markteinführung der App wurde durch eine großangelegte Marketingkampagne begleitet.' },
  { de: 'Der Mehrwert', en: 'Added value', example: 'Unser Ziel ist es, dem Endnutzer durch innovative Features einen echten Mehrwert zu bieten.' },
  { de: 'Die Kundenorientierung', en: 'Customer centricity', example: 'Bei der Priorisierung der Roadmap steht die Kundenorientierung an erster Stelle.' },
  { de: 'Die Prozessautomatisierung', en: 'Process automation', example: 'Durch konsequente Prozessautomatisierung haben wir manuelle Fehlerquellen eliminiert.' },
  { de: 'Die Fehlerquote', en: 'Error rate', example: 'Seit der Einführung von Pair-Programming ist die Fehlerquote im Code merklich gesunken.' },
  { de: 'Die Auslastung', en: 'Utilization / Load', example: 'Wir müssen die Auslastung der Serverkapazitäten optimieren, um Latenzen zu vermeiden.' },
  { de: 'Die Wettbewerbsfähigkeit', en: 'Competitiveness', example: 'Kontinuierliche Innovation ist der Schlüssel zur Sicherung unserer globalen Wettbewerbsfähigkeit.' },
  { de: 'Die Eigenverantwortung', en: 'Personal responsibility', example: 'Wir fördern eine Kultur der Eigenverantwortung, in der jeder Entwickler für seinen Code bürgt.' },
  { de: 'Die Kommunikationsfähigkeit', en: 'Communication skills', example: 'In bereichsübergreifenden Projekten ist die Kommunikationsfähigkeit der Techniker entscheidend.' },
  { de: 'Die Lösungsorientierung', en: 'Solution orientation', example: 'Trotz technischer Hürden bewies das Team eine beeindruckende Lösungsorientierung.' },
  { de: 'Die Verhandlungssache', en: 'Matter of negotiation', example: 'Die genaue Ausgestaltung des Budgets für neue Lizenzen ist noch Verhandlungssache.' },
  { de: 'Die Kompromissbereitschaft', en: 'Willingness to compromise', example: 'Bei Architekturfragen ist oft eine gewisse Kompromissbereitschaft zwischen Dev und Ops nötig.' },
  { de: 'Die Führungskompetenz', en: 'Leadership competence', example: 'Neben technischem Know-how ist Führungskompetenz für diese Senior-Stelle unverzichtbar.' },
  { de: 'Die Teamdynamik', en: 'Team dynamics', example: 'Regelmäßige Teamevents stärken die Teamdynamik und das gegenseitige Vertrauen.' },
  { de: 'Die Belastungsspitze', en: 'Peak load / Stress period', example: 'Während der Black-Friday-Woche müssen wir auf extreme Belastungsspitzen vorbereitet sein.' },
  { de: 'Die Erwartungshaltung', en: 'Expectations / Mindset', example: 'Um Frust zu vermeiden, müssen wir die Erwartungshaltung der Stakeholder frühzeitig managen.' },
  { de: 'Die Hands-on-Mentalität', en: 'Hands-on mentality', example: 'In unserem Startup schätzen wir Entwickler mit einer ausgeprägten Hands-on-Mentalität.' },
];

// ─── 50 Power Verbs ───
export const VERBS = [
  { de: 'gewährleisten', en: 'to ensure / guarantee', example: 'Wir müssen die Datensicherheit auch bei hohen Zugriffszahlen gewährleisten.' },
  { de: 'optimieren', en: 'to optimize', example: 'Die neuen Algorithmen helfen uns dabei, die Serverlast signifikant zu optimieren.' },
  { de: 'implementieren', en: 'to implement', example: 'Wir planen, im nächsten Quartal eine automatisierte CI/CD-Pipeline zu implementieren.' },
  { de: 'vorantreiben', en: 'to drive forward', example: 'Unser Team will die Umstellung auf eine Cloud-Native-Architektur aktiv vorantreiben.' },
  { de: 'analysieren', en: 'to analyze', example: 'Wir analysieren derzeit die Logfiles, um die Ursache für den Systemabsturz zu finden.' },
  { de: 'konzipieren', en: 'to design / conceive', example: 'Ich habe die Aufgabe, ein modulares Design-System für unsere Web-Apps zu konzipieren.' },
  { de: 'koordinieren', en: 'to coordinate', example: 'Als Lead-Developer koordiniere ich die Zusammenarbeit zwischen Backend und Frontend.' },
  { de: 'etablieren', en: 'to establish', example: 'Wir möchten Pair-Programming als Standard in unserem Entwicklungsprozess etablieren.' },
  { de: 'evaluieren', en: 'to evaluate', example: 'Wir evaluieren momentan verschiedene NoSQL-Datenbanken für unser neues Projekt.' },
  { de: 'skalieren', en: 'to scale', example: 'Das System ist so aufgebaut, dass es bei Bedarf problemlos horizontal skalieren kann.' },
  { de: 'abstimmen', en: 'to align / coordinate', example: 'Wir müssen die API-Spezifikationen eng mit dem Mobil-Team abstimmen.' },
  { de: 'beschleunigen', en: 'to accelerate', example: 'Die Einführung von Docker konnte unsere Deployment-Zyklen massiv beschleunigen.' },
  { de: 'bewältigen', en: 'to manage / overcome', example: 'Mit der neuen Infrastruktur können wir auch extreme Lastspitzen mühelos bewältigen.' },
  { de: 'dokumentieren', en: 'to document', example: 'Es ist unerlässlich, jede Code-Änderung für die langfristige Wartbarkeit zu dokumentieren.' },
  { de: 'durchführen', en: 'to perform / execute', example: 'Wir werden am Wochenende ein umfassendes Datenbank-Audit durchführen.' },
  { de: 'erarbeiten', en: 'to develop / work out', example: 'Wir müssen gemeinsam eine Lösung für das Problem der Dateninkonsistenz erarbeiten.' },
  { de: 'ermöglichen', en: 'to enable', example: 'Die neue Schnittstelle wird es Partnern ermöglichen, ihre Dienste direkt anzubinden.' },
  { de: 'erreichen', en: 'to achieve / reach', example: 'Durch Refactoring konnten wir eine Reduzierung der Latenz um 200ms erreichen.' },
  { de: 'fördern', en: 'to promote / foster', example: 'Wir fördern den Wissensaustausch durch regelmäßige Tech-Talks im Team.' },
  { de: 'identifizieren', en: 'to identify', example: 'Mithilfe von Monitoring-Tools konnten wir den Speicherfresser schnell identifizieren.' },
  { de: 'integrieren', en: 'to integrate', example: 'Das neue Messaging-Modul lässt sich nahtlos in die bestehende Architektur integrieren.' },
  { de: 'konfigurieren', en: 'to configure', example: 'Ich muss die Firewall-Regeln neu konfigurieren, um den Zugriff einzuschränken.' },
  { de: 'leiten', en: 'to lead / manage', example: 'In meinem letzten Projekt habe ich ein Team von fünf Entwicklern erfolgreich geleitet.' },
  { de: 'lösen', en: 'to solve', example: 'Wir haben das Skalierungsproblem durch den Einsatz von Caching-Layern gelöst.' },
  { de: 'minimieren', en: 'to minimize', example: 'Unser Ziel ist es, die Downtime während des Updates auf ein Minimum zu minimieren.' },
  { de: 'modernisieren', en: 'to modernize', example: 'Wir müssen unsere Legacy-Systeme schrittweise modernisieren, um wettbewerbsfähig zu bleiben.' },
  { de: 'prüfen', en: 'to check / verify', example: 'Bitte prüfen Sie den Pull-Request hinsichtlich der Einhaltung unserer Coding-Standards.' },
  { de: 'realisieren', en: 'to realize / execute', example: 'Wir haben das neue Feature innerhalb von zwei Sprints komplett realisiert.' },
  { de: 'reduzieren', en: 'to reduce', example: 'Durch Kompression konnten wir das übertragene Datenvolumen deutlich reduzieren.' },
  { de: 'sicherstellen', en: 'to ensure / make sure', example: 'Wir müssen sicherstellen, dass alle Backups regelmäßig und korrekt ausgeführt werden.' },
  { de: 'steuern', en: 'to control / steer', example: 'Das System steuert die Verteilung der Anfragen automatisch über verschiedene Regionen.' },
  { de: 'strukturieren', en: 'to structure', example: 'Ich habe geholfen, das Jira-Board neu zu strukturieren, um die Übersicht zu verbessern.' },
  { de: 'überwachen', en: 'to monitor', example: 'Wir überwachen die Systemgesundheit rund um die Uhr mit automatisierten Alerts.' },
  { de: 'übernehmen', en: 'to take over / assume', example: 'Ich werde die Verantwortung für das Release-Management im nächsten Monat übernehmen.' },
  { de: 'umsetzen', en: 'to implement / realize', example: 'Wir haben die Anforderungen des Kunden technisch präzise umgesetzt.' },
  { de: 'unterstützen', en: 'to support', example: 'Die neue Plattform wird mehrere Programmiersprachen nativ unterstützen.' },
  { de: 'validieren', en: 'to validate', example: 'Benutzereingaben müssen immer serverseitig auf ihre Richtigkeit validiert werden.' },
  { de: 'verbessern', en: 'to improve', example: 'Wir arbeiten ständig daran, die Benutzererfahrung unserer App zu verbessern.' },
  { de: 'vereinfachen', en: 'to simplify', example: 'Durch die Abstraktion konnten wir die Handhabung der API massiv vereinfachen.' },
  { de: 'verfügen über', en: 'to have at disposal', example: 'Unsere Plattform verfügt über eine hochmoderne Verschlüsselungstechnologie.' },
  { de: 'verknüpfen', en: 'to link / connect', example: 'Wir müssen die Kundendaten mit den Transaktionsprotokollen sinnvoll verknüpfen.' },
  { de: 'vermeiden', en: 'to avoid', example: 'Durch sauberen Code lassen sich viele Bugs bereits im Vorfeld vermeiden.' },
  { de: 'verwalten', en: 'to manage / administer', example: 'Mit Kubernetes können wir unsere Container-Infrastruktur effizient verwalten.' },
  { de: 'verwenden', en: 'to use / utilize', example: 'Wir verwenden modernste Frameworks, um die Entwicklungszeit zu verkürzen.' },
  { de: 'verzögern', en: 'to delay', example: 'Unvorhergesehene API-Änderungen könnten den Release-Termin leider verzögern.' },
  { de: 'vorschlagen', en: 'to suggest / propose', example: 'Ich würde vorschlagen, auf eine ereignisgesteuerte Architektur umzusteigen.' },
  { de: 'warten', en: 'to maintain', example: 'Als DevOps-Engineer warte ich die Server und installiere regelmäßig Sicherheitsupdates.' },
  { de: 'wiederherstellen', en: 'to restore', example: 'Im Notfall können wir das gesamte System innerhalb von Minuten wiederherstellen.' },
  { de: 'zusammenarbeiten', en: 'to collaborate', example: 'Wir arbeiten eng mit der Design-Abteilung zusammen, um die Usability zu steigern.' },
  { de: 'zuweisen', en: 'to assign / allocate', example: 'Die Aufgaben im Sprint wurden den Entwicklern basierend auf ihrer Expertise zugewiesen.' },
];

// ─── 50 Collocations ───
export const COLLOCATIONS = [
  { noun: 'Die Schnittstelle', verb: 'implementieren', phrase: 'Eine Schnittstelle implementieren', en: 'To implement an interface', example: 'Wir müssen die REST-Schnittstelle implementieren, um den Datenaustausch zu ermöglichen.' },
  { noun: 'Die Skalierbarkeit', verb: 'gewährleisten', phrase: 'Die Skalierbarkeit gewährleisten', en: 'To ensure scalability', example: 'Das System wurde so entworfen, dass wir die horizontale Skalierbarkeit gewährleisten.' },
  { noun: 'Die Sicherheitslücke', verb: 'schließen', phrase: 'Eine Sicherheitslücke schließen', en: 'To patch a vulnerability', example: 'Es ist von höchster Priorität, dass wir diese kritische Sicherheitslücke umgehend schließen.' },
  { noun: 'Den Meilenstein', verb: 'erreichen', phrase: 'Einen Meilenstein erreichen', en: 'To reach a milestone', example: 'Mit dem erfolgreichen Beta-Test haben wir einen wichtigen Meilenstein erreicht.' },
  { noun: 'Die Vorgehensweise', verb: 'abstimmen', phrase: 'Die Vorgehensweise abstimmen', en: 'To coordinate the approach', example: 'Bevor wir mit dem Refactoring beginnen, sollten wir die Vorgehensweise kurz abstimmen.' },
  { noun: 'Den Mehrwert', verb: 'generieren', phrase: 'Einen Mehrwert generieren', en: 'To generate added value', example: 'Die neue Analyse-Funktion wird für unsere Endnutzer einen erheblichen Mehrwert generieren.' },
  { noun: 'Die Engpassanalyse', verb: 'durchführen', phrase: 'Eine Engpassanalyse durchführen', en: 'To conduct a bottleneck analysis', example: 'Wir müssen eine Engpassanalyse durchführen, um die Latenzprobleme im Backend zu klären.' },
  { noun: 'Das Konzept', verb: 'erarbeiten', phrase: 'Ein Konzept erarbeiten', en: 'To develop a concept', example: 'Das Team hat ein innovatives Konzept zur Migration der Legacy-Daten erarbeitet.' },
  { noun: 'Die Redundanz', verb: 'schaffen', phrase: 'Eine Redundanz schaffen', en: 'To create redundancy', example: 'Durch die Spiegelung der Server konnten wir die notwendige Redundanz schaffen.' },
  { noun: 'Die Anforderung', verb: 'umsetzen', phrase: 'Anforderungen umsetzen', en: 'To implement requirements', example: 'Wir haben alle technischen Anforderungen des Kunden fristgerecht umgesetzt.' },
  { noun: 'Den Prozess', verb: 'optimieren', phrase: 'Prozesse optimieren', en: 'To optimize processes', example: 'Durch den Einsatz von KI konnten wir die internen Freigabeprozesse deutlich optimieren.' },
  { noun: 'Die Kapazität', verb: 'auslasten', phrase: 'Kapazitäten auslasten', en: 'To utilize capacity', example: 'In der aktuellen Projektphase sind unsere personellen Kapazitäten vollständig ausgelastet.' },
  { noun: 'Die Entscheidung', verb: 'herbeiführen', phrase: 'Eine Entscheidung herbeiführen', en: 'To bring about a decision', example: 'Wir müssen heute eine Entscheidung bezüglich der Cloud-Strategie herbeiführen.' },
  { noun: 'Den Fehler', verb: 'beheben', phrase: 'Einen Fehler beheben', en: 'To fix a bug/error', example: 'Das Entwicklungsteam konnte den kritischen Fehler im Produktivsystem bereits beheben.' },
  { noun: 'Den Zugriff', verb: 'beschränken', phrase: 'Den Zugriff beschränken', en: 'To restrict access', example: 'Aus Sicherheitsgründen müssen wir den Zugriff auf die Datenbank streng beschränken.' },
  { noun: 'Die Kosten', verb: 'senken', phrase: 'Kosten senken', en: 'To reduce costs', example: 'Durch Serverless Computing konnten wir die monatlichen Infrastrukturkosten massiv senken.' },
  { noun: 'Das Risiko', verb: 'minimieren', phrase: 'Das Risiko minimieren', en: 'To minimize risk', example: 'Umfangreiche Unit-Tests helfen uns dabei, das Risiko von Regressionen zu minimieren.' },
  { noun: 'Die Maßnahmen', verb: 'ergreifen', phrase: 'Maßnahmen ergreifen', en: 'To take measures', example: 'Nach dem Vorfall haben wir sofort alle notwendigen Maßnahmen ergriffen.' },
  { noun: 'Den Standard', verb: 'etablieren', phrase: 'Einen Standard etablieren', en: 'To establish a standard', example: 'Wir möchten Clean Code als verbindlichen Standard in unserer Abteilung etablieren.' },
  { noun: 'Die Hypothese', verb: 'validieren', phrase: 'Eine Hypothese validieren', en: 'To validate a hypothesis', example: 'Wir führen A/B-Tests durch, um unsere Hypothese zum Nutzerverhalten zu validieren.' },
  { noun: 'Den Rückstand', verb: 'aufholen', phrase: 'Einen Rückstand aufholen', en: 'To catch up on a backlog', example: 'Durch zwei Sprints mit Fokus auf Bugfixing konnten wir den technischen Rückstand aufholen.' },
  { noun: 'Die Performance', verb: 'steigern', phrase: 'Die Performance steigern', en: 'To increase performance', example: 'Das Caching-Modul wurde implementiert, um die Performance der Webseite zu steigern.' },
  { noun: 'Den Konsens', verb: 'erzielen', phrase: 'Einen Konsens erzielen', en: 'To reach a consensus', example: 'Nach langer Diskussion konnten wir im Team einen Konsens über das Framework erzielen.' },
  { noun: 'Das System', verb: 'warten', phrase: 'Das System warten', en: 'To maintain the system', example: 'Ein spezialisiertes Team ist dafür zuständig, das System kontinuierlich zu warten.' },
  { noun: 'Die Daten', verb: 'auswerten', phrase: 'Daten auswerten', en: 'To analyze/evaluate data', example: 'Die Marketingabteilung muss die erhobenen Daten für den Quartalsbericht auswerten.' },
  { noun: 'Den Vertrag', verb: 'unterzeichnen', phrase: 'Einen Vertrag unterzeichnen', en: 'To sign a contract', example: 'Bevor wir starten können, müssen beide Parteien den Vertrag unterzeichnen.' },
  { noun: 'Die Erwartung', verb: 'erfüllen', phrase: 'Erwartungen erfüllen', en: 'To meet expectations', example: 'Das neue Release muss die hohen Erwartungen unserer Großkunden erfüllen.' },
  { noun: 'Die Verantwortung', verb: 'übernehmen', phrase: 'Verantwortung übernehmen', en: 'To take ownership', example: 'In dieser Position müssen Sie die volle Verantwortung für das Budget übernehmen.' },
  { noun: 'Den Termin', verb: 'einhalten', phrase: 'Einen Termin einhalten', en: 'To meet a deadline', example: 'Trotz der Verzögerungen konnten wir den Termin für den Go-Live einhalten.' },
  { noun: 'Das Budget', verb: 'freigeben', phrase: 'Das Budget freigeben', en: 'To approve the budget', example: 'Sobald die Planung steht, wird die Geschäftsleitung das Budget freigeben.' },
  { noun: 'Die Lösung', verb: 'konzipieren', phrase: 'Eine Lösung konzipieren', en: 'To design a solution', example: 'Wir müssen eine Lösung konzipieren, die sowohl sicher als auch benutzerfreundlich ist.' },
  { noun: 'Die Effizienz', verb: 'erhöhen', phrase: 'Die Effizienz erhöhen', en: 'To increase efficiency', example: 'Die Automatisierung soll die Effizienz unserer Workflows signifikant erhöhen.' },
  { noun: 'Den Wissensaustausch', verb: 'fördern', phrase: 'Wissensaustausch fördern', en: 'To promote knowledge sharing', example: 'Interne Workshops sind ideal, um den Wissensaustausch zwischen den Teams zu fördern.' },
  { noun: 'Die Architektur', verb: 'entwerfen', phrase: 'Eine Architektur entwerfen', en: 'To design an architecture', example: 'Ich wurde beauftragt, eine neue Architektur für die Microservices zu entwerfen.' },
  { noun: 'Die Komplexität', verb: 'reduzieren', phrase: 'Komplexität reduzieren', en: 'To reduce complexity', example: 'Wir sollten den Code vereinfachen, um die Komplexität des Projekts zu reduzieren.' },
  { noun: 'Das Update', verb: 'einspielen', phrase: 'Ein Update einspielen', en: 'To deploy an update', example: 'Wir werden heute Nacht ein kritisches Update auf den Server einspielen.' },
  { noun: 'Die Ressource', verb: 'allozieren', phrase: 'Ressourcen allozieren', en: 'To allocate resources', example: 'Wir müssen mehr Ressourcen für die Qualitätssicherung allozieren.' },
  { noun: 'Den Code', verb: 'reviewen', phrase: 'Code reviewen', en: 'To review code', example: 'Könntest du bitte meinen Code reviewen, bevor ich den Merge-Request sende?' },
  { noun: 'Die Strategie', verb: 'festlegen', phrase: 'Eine Strategie festlegen', en: 'To define a strategy', example: 'Im nächsten Meeting werden wir die langfristige Strategie der IT-Abteilung festlegen.' },
  { noun: 'Die Schwachstelle', verb: 'identifizieren', phrase: 'Eine Schwachstelle identifizieren', en: 'To identify a weak point', example: 'Der Penetrationstest hat eine kritische Schwachstelle in der Firewall identifiziert.' },
  { noun: 'Die Genehmigung', verb: 'einholen', phrase: 'Eine Genehmigung einholen', en: 'To obtain approval', example: 'Für den Zugriff auf die Live-Datenbank müssen Sie eine Genehmigung einholen.' },
  { noun: 'Die Verbindung', verb: 'herstellen', phrase: 'Eine Verbindung herstellen', en: 'To establish a connection', example: 'Das Programm kann derzeit keine Verbindung zum Datenbankserver herstellen.' },
  { noun: 'Die Dokumentation', verb: 'erstellen', phrase: 'Eine Dokumentation erstellen', en: 'To create documentation', example: 'Es ist wichtig, dass wir für jede neue Funktion eine saubere Dokumentation erstellen.' },
  { noun: 'Das Feedback', verb: 'einholen', phrase: 'Feedback einholen', en: 'To gather feedback', example: 'Wir sollten frühzeitig Feedback von den Endanwendern einholen.' },
  { noun: 'Die Konfiguration', verb: 'anpassen', phrase: 'Die Konfiguration anpassen', en: 'To adjust the configuration', example: 'Ich muss die Konfiguration anpassen, damit der Logger im Debug-Modus läuft.' },
  { noun: 'Das Deployment', verb: 'durchführen', phrase: 'Ein Deployment durchführen', en: 'To perform a deployment', example: 'Wir werden das Deployment heute um 22:00 Uhr durchführen, um den Betrieb nicht zu stören.' },
  { noun: 'Die Priorität', verb: 'setzen', phrase: 'Prioritäten setzen', en: 'To set priorities', example: 'Aufgrund der Deadline müssen wir jetzt klare Prioritäten setzen.' },
  { noun: 'Das Backup', verb: 'anlegen', phrase: 'Ein Backup anlegen', en: 'To create a backup', example: 'Vor jedem großen Datenbank-Update müssen wir ein manuelles Backup anlegen.' },
  { noun: 'Die Verfügbarkeit', verb: 'sicherstellen', phrase: 'Die Verfügbarkeit sicherstellen', en: 'To ensure availability', example: 'Loadbalancer helfen uns dabei, die Verfügbarkeit der Plattform sicherzustellen.' },
  { noun: 'Den Bericht', verb: 'vorlegen', phrase: 'Einen Bericht vorlegen', en: 'To submit a report', example: 'Der Projektleiter muss der Geschäftsführung wöchentlich einen Bericht vorlegen.' },
];

// ─── 50 Workshop Facilitation Phrases ───
export const WORKSHOP_PHRASES = [
  { phase: 'Opening', category: 'Welcome', de: 'Schön, dass ihr da seid', en: 'Great that you\'re here', example: 'Schön, dass ihr alle da seid zu unserem Workshop zur Cloud-Strategie.' },
  { phase: 'Opening', category: 'Purpose', de: 'Wir wollen heute...', en: 'Today we want to...', example: 'Wir wollen heute gemeinsam einen Fahrplan für das nächste Quartal aufstellen.' },
  { phase: 'Opening', category: 'Agenda', de: 'Die Agenda', en: 'The agenda', example: 'Lass uns kurz die Agenda für den Vormittag durchgehen.' },
  { phase: 'Opening', category: 'Housekeeping', de: 'Zeitplan', en: 'Time schedule', example: 'Unser Zeitplan sieht vor, dass wir gegen 12:00 Uhr in die Pause gehen.' },
  { phase: 'Opening', category: 'Expectations', de: 'Erwartungen', en: 'Expectations', example: 'Ich würde gerne zuerst eure Erwartungen an den heutigen Tag abfragen.' },
  { phase: 'Opening', category: 'Icebreaker', de: 'Zum Einstieg', en: 'To start off', example: 'Zum Einstieg machen wir eine kurze Vorstellungsrunde.' },
  { phase: 'Opening', category: 'Role', de: 'Moderieren', en: 'To facilitate', example: 'Ich werde heute moderieren und euch durch die verschiedenen Sessions führen.' },
  { phase: 'Flow', category: 'Transition', de: 'Überleiten zu', en: 'To transition to', example: 'Damit möchte ich zum nächsten Punkt überleiten.' },
  { phase: 'Flow', category: 'Context', de: 'Hinsichtlich', en: 'Regarding', example: 'Hinsichtlich des Budgets müssen wir heute klare Prioritäten setzen.' },
  { phase: 'Flow', category: 'Focus', de: 'Den Fokus legen', en: 'To put the focus on', example: 'Lasst uns den Fokus jetzt auf die technischen Details legen.' },
  { phase: 'Flow', category: 'Elaborate', de: 'Näher eingehen', en: 'To go into detail', example: 'Darauf werden wir später im Deep Dive noch näher eingehen.' },
  { phase: 'Flow', category: 'Recap', de: 'Zusammenfassend', en: 'In summary', example: 'Zusammenfassend lässt sich sagen, dass wir uns hier einig sind.' },
  { phase: 'Flow', category: 'Visualizing', de: 'Festhalten', en: 'To record/write down', example: 'Ich werde eure Ideen direkt am Whiteboard festhalten.' },
  { phase: 'Flow', category: 'Examples', de: 'Veranschaulichen', en: 'To illustrate', example: 'Kannst du das bitte anhand eines Beispiels veranschaulichen?' },
  { phase: 'Interruption', category: 'Politeness', de: 'Darf ich kurz...?', en: 'May I briefly...?', example: 'Darf ich kurz einhaken, damit wir nicht vom Thema abkommen?' },
  { phase: 'Interruption', category: 'Timekeeping', de: 'Im Zeitplan bleiben', en: 'To stay on schedule', example: 'Wir müssen im Zeitplan bleiben, deshalb müssen wir jetzt weitermachen.' },
  { phase: 'Interruption', category: 'Redirecting', de: 'Zurückkommen auf', en: 'To come back to', example: 'Könnten wir bitte wieder auf das Hauptproblem zurückkommen?' },
  { phase: 'Interruption', category: 'Parking Lot', de: 'Themenparkplatz', en: 'Parking lot (topics)', example: 'Lass uns diesen Punkt auf den Themenparkplatz schieben.' },
  { phase: 'Interruption', category: 'Brevity', de: 'Dich kurz fassen', en: 'To be brief', example: 'Ich muss dich bitten, dich jetzt etwas kurz zu fassen.' },
  { phase: 'Interruption', category: 'Clarification', de: 'Präzisieren', en: 'To clarify/specify', example: 'Kannst du deine Aussage bitte noch einmal präzisieren?' },
  { phase: 'Change Topic', category: 'New Phase', de: 'Einen Punkt aufwerfen', en: 'To raise a point', example: 'Ich möchte nun einen neuen Punkt aufwerfen.' },
  { phase: 'Change Topic', category: 'Switching', de: 'Wechseln zu', en: 'To switch to', example: 'Lasst uns nun zur methodischen Ebene wechseln.' },
  { phase: 'Change Topic', category: 'Pivot', de: 'Davon abgesehen', en: 'Apart from that', example: 'Davon abgesehen sollten wir auch die Security-Aspekte prüfen.' },
  { phase: 'Change Topic', category: 'Expanding', de: 'Den Blick weiten', en: 'To broaden the view', example: 'Ich würde gerne den Blick weiten und das große Ganze betrachten.' },
  { phase: 'Change Topic', category: 'Breaking down', de: 'Herunterbrechen', en: 'To break down', example: 'Lasst uns das auf die operative Ebene herunterbrechen.' },
  { phase: 'Conflict', category: 'Neutrality', de: 'Objektiv betrachten', en: 'To look at objectively', example: 'Lasst uns die Situation sachlich und objektiv betrachten.' },
  { phase: 'Conflict', category: 'Differing views', de: 'Widersprüchlich', en: 'Contradictory', example: 'Hier scheinen eure Meinungen etwas widersprüchlich zu sein.' },
  { phase: 'Conflict', category: 'Compromise', de: 'Kompromiss finden', en: 'To find a compromise', example: 'Wie können wir hier einen tragfähigen Kompromiss finden?' },
  { phase: 'Conflict', category: 'Mediation', de: 'Vermitteln', en: 'To mediate', example: 'Ich versuche hier zwischen euren beiden Positionen zu vermitteln.' },
  { phase: 'Conflict', category: 'Postponing', de: 'Vertagen', en: 'To postpone/adjourn', example: 'Ich schlage vor, wir vertagen diese Diskussion auf morgen.' },
  { phase: 'Engagement', category: 'Encouraging', de: 'Beitragen', en: 'To contribute', example: 'Wer möchte noch etwas zu diesem Thema beitragen?' },
  { phase: 'Engagement', category: 'Input', de: 'Deine Einschätzung', en: 'Your assessment', example: 'Mich würde hierzu brennend deine Einschätzung interessieren.' },
  { phase: 'Engagement', category: 'Silent users', de: 'Zu Wort kommen', en: 'To have a say', example: 'Ich möchte sicherstellen, dass heute jeder zu Wort kommt.' },
  { phase: 'Engagement', category: 'Feedback', de: 'Feedback einholen', en: 'To get feedback', example: 'Ich möchte an dieser Stelle kurz ein Stimmungsbild von euch einholen.' },
  { phase: 'Engagement', category: 'Opening floor', de: 'Die Runde öffnen', en: 'To open the floor', example: 'Ich möchte die Runde nun für eure Fragen öffnen.' },
  { phase: 'Action', category: 'Responsibility', de: 'Verantwortlich sein', en: 'To be responsible', example: 'Wer von euch wird für die Umsetzung verantwortlich sein?' },
  { phase: 'Action', category: 'Next Steps', de: 'Nächste Schritte', en: 'Next steps', example: 'Lasst uns nun die konkreten nächsten Schritte festlegen.' },
  { phase: 'Action', category: 'Deadline', de: 'Deadline setzen', en: 'To set a deadline', example: 'Wir sollten uns hierfür eine realistische Deadline setzen.' },
  { phase: 'Action', category: 'Documentation', de: 'Protokoll schreiben', en: 'To take minutes', example: 'Wer würde sich bereit erklären, heute Protokoll zu schreiben?' },
  { phase: 'Action', category: 'Follow-up', de: 'Nachfassen', en: 'To follow up', example: 'Ich werde nächste Woche diesbezüglich noch einmal bei euch nachfassen.' },
  { phase: 'Closing', category: 'Finalizing', de: 'Abschließen', en: 'To conclude', example: 'Lasst uns diesen Workshop nun offiziell abschließen.' },
  { phase: 'Closing', category: 'Takeaway', de: 'Learning', en: 'Key takeaway', example: 'Was ist für euch das wichtigste Learning des Tages?' },
  { phase: 'Closing', category: 'Gratitude', de: 'Danke euch', en: 'Thank you all', example: 'Danke euch für eure aktive Teilnahme und den coolen Input.' },
  { phase: 'Closing', category: 'Outlook', de: 'Ausblick', en: 'Outlook/Future view', example: 'Zum Abschluss möchte ich noch einen kurzen Ausblick geben.' },
  { phase: 'Closing', category: 'Feedback loop', de: 'Blitzlicht', en: 'Lightning round', example: 'Machen wir zum Ende ein kurzes Blitzlicht: Wie geht\'s euch jetzt?' },
  { phase: 'Idioms', category: 'On Point', de: 'Auf den Punkt bringen', en: 'To get to the point', example: 'Danke, das hat das Problem perfekt auf den Punkt gebracht.' },
  { phase: 'Idioms', category: 'Common ground', de: 'Nenner', en: 'Common denominator', example: 'Wir müssen hier einen gemeinsamen Nenner finden.' },
  { phase: 'Idioms', category: 'Deep dive', de: 'Eintauchen', en: 'To dive into', example: 'Lasst uns tief in die Materie eintauchen.' },
  { phase: 'Idioms', category: 'Red thread', de: 'Roter Faden', en: 'Common thread', example: 'Der rote Faden fehlt mir in eurer Argumentation noch etwas.' },
  { phase: 'Idioms', category: 'Closing gap', de: 'Lücke schließen', en: 'To close the gap', example: 'Wir müssen die Lücke zwischen Theorie und Praxis endlich schließen.' },
];

// ─── 50 Refinement Phrases ───
export const REFINEMENT_PHRASES = [
  { category: 'Opening', de: 'Das Ticket durchgehen', en: 'To go through the ticket', example: 'Lass uns kurz das erste Ticket durchgehen.' },
  { category: 'Opening', de: 'Den Scope abgrenzen', en: 'To define/limit the scope', example: 'Wir müssen zuerst den Scope für dieses Feature sauber abgrenzen.' },
  { category: 'Unclear Story', de: 'Nicht greifbar', en: 'Not tangible/vague', example: 'Die User Story ist für mich aktuell noch nicht greifbar.' },
  { category: 'Unclear Story', de: 'Schwammig', en: 'Spongy/vague', example: 'Die Beschreibung ist noch etwas schwammig formuliert.' },
  { category: 'Unclear Story', de: 'Informationsbedarf', en: 'Need for information', example: 'Ich sehe hier noch erheblichen Informationsbedarf seitens der Stakeholder.' },
  { category: 'Unclear Story', de: 'Lückenhaft', en: 'Gappy/incomplete', example: 'Die Dokumentation der Edge-Cases ist leider noch lückenhaft.' },
  { category: 'Unclear Story', de: 'Präzisieren', en: 'To specify/make precise', example: 'Kannst du das Ziel der Story bitte noch einmal präzisieren?' },
  { category: 'Value/User', de: 'Der Mehrwert', en: 'Added value', example: 'Ich sehe ehrlich gesagt noch keinen echten Mehrwert für den Endnutzer.' },
  { category: 'Value/User', de: 'Das Nutzerbedürfnis', en: 'User need', example: 'Entspricht das wirklich einem tatsächlichen Nutzerbedürfnis?' },
  { category: 'Value/User', de: 'Die Daseinsberechtigung', en: 'Reason for existence', example: 'Ohne dieses Feature verliert die Story ihre Daseinsberechtigung.' },
  { category: 'Value/User', de: 'Relevanz', en: 'Relevance', example: 'Hinsichtlich der Conversion-Rate hat das Ticket keine hohe Relevanz.' },
  { category: 'Value/User', de: 'Impact', en: 'Impact', example: 'Welchen Impact versprechen wir uns von dieser Änderung?' },
  { category: 'Acceptance Criteria', de: 'Die Akzeptanzkriterien', en: 'Acceptance criteria', example: 'Sind die Akzeptanzkriterien bereits final abgestimmt?' },
  { category: 'Acceptance Criteria', de: 'Abnahmekriterien', en: 'Acceptance criteria', example: 'Wer legt die Abnahmekriterien für dieses Modul fest?' },
  { category: 'Acceptance Criteria', de: 'Messbar', en: 'Measurable', example: 'Das Kriterium \'schneller\' ist nicht messbar; wir brauchen Zahlen.' },
  { category: 'Acceptance Criteria', de: 'Eindeutig', en: 'Unique/clear', example: 'Das Ergebnis muss für das QA-Team eindeutig erkennbar sein.' },
  { category: 'Acceptance Criteria', de: 'Voraussetzung', en: 'Prerequisite', example: 'Das ist eine zwingende Voraussetzung für den Release.' },
  { category: 'Implementation', de: 'Technisch umsetzbar', en: 'Technically feasible', example: 'Ist dieser Ansatz in der aktuellen Architektur technisch umsetzbar?' },
  { category: 'Implementation', de: 'Der Lösungsansatz', en: 'Proposed solution', example: 'Welchen Lösungsansatz würdest du hier favorisieren?' },
  { category: 'Implementation', de: 'Technische Schulden', en: 'Technical debt', example: 'Das würde massiv neue technische Schulden verursachen.' },
  { category: 'Implementation', de: 'Overengineering', en: 'Overengineering', example: 'Pass auf, dass wir hier kein Overengineering betreiben.' },
  { category: 'Implementation', de: 'Quick-and-Dirty', en: 'Quick-and-Dirty', example: 'Suchen wir eine nachhaltige Lösung oder reicht ein Quick-and-Dirty-Fix?' },
  { category: 'Implementation', de: 'Refactoring', en: 'Refactoring', example: 'Bevor wir das implementieren, ist ein Refactoring notwendig.' },
  { category: 'Implementation', de: 'Abhängigkeiten', en: 'Dependencies', example: 'Welche Abhängigkeiten zu anderen Services müssen wir beachten?' },
  { category: 'Implementation', de: 'Schnittstellen', en: 'Interfaces/APIs', example: 'Wie sieht die Schnittstelle zum Legacy-System aus?' },
  { category: 'Negotiation', de: 'Kompromissbereit', en: 'Willing to compromise', example: 'In diesem Punkt bin ich kompromissbereit, solange die Performance stimmt.' },
  { category: 'Negotiation', de: 'Abstriche machen', en: 'To make trade-offs', example: 'Wir müssen eventuell beim Design Abstriche machen.' },
  { category: 'Negotiation', de: 'Veto einlegen', en: 'To veto', example: 'Hier muss ich als Architekt ein Veto einlegen.' },
  { category: 'Negotiation', de: 'Verhandlungssache', en: 'Matter of negotiation', example: 'Die Priorisierung der Sub-Tasks ist noch Verhandlungssache.' },
  { category: 'Negotiation', de: 'Aushandeln', en: 'To negotiate/work out', example: 'Das müssen wir direkt mit dem Product Owner aushandeln.' },
  { category: 'Estimation', de: 'Aufwand schätzen', en: 'To estimate effort', example: 'Lass uns kurz den Aufwand für diesen Task schätzen.' },
  { category: 'Estimation', de: 'Unterschätzen', en: 'To underestimate', example: 'Ich glaube, wir unterschätzen die Komplexität der Datenmigration.' },
  { category: 'Estimation', de: 'Größenordnung', en: 'Magnitude/order of magnitude', example: 'In welcher Größenordnung bewegen wir uns bei den Story Points?' },
  { category: 'Estimation', de: 'Puffer einplanen', en: 'To plan in a buffer', example: 'Wir sollten hier unbedingt einen Puffer einplanen.' },
  { category: 'Critique', de: 'Zu kurz gedacht', en: 'Not thought through', example: 'Meiner Meinung nach ist dieser Ansatz zu kurz gedacht.' },
  { category: 'Critique', de: 'Hinterfragen', en: 'To question/scrutinize', example: 'Wir sollten die Notwendigkeit dieses Features kritisch hinterfragen.' },
  { category: 'Critique', de: 'Ein Einwand', en: 'An objection', example: 'Ich habe einen Einwand bezüglich der Skalierbarkeit.' },
  { category: 'Critique', de: 'Bauchschmerzen', en: 'Gut feeling (neg)/concerns', example: 'Bei dieser Lösung habe ich ehrlich gesagt Bauchschmerzen.' },
  { category: 'Critique', de: 'Das geht nicht auf', en: 'That doesn\'t add up/work', example: 'Logisch betrachtet geht das so einfach nicht auf.' },
  { category: 'Critique', de: 'Widerspruch', en: 'Contradiction', example: 'Das steht im Widerspruch zu unseren bisherigen Standards.' },
  { category: 'Agile Process', de: 'Ready for Dev', en: 'Ready for Dev', example: 'Ist das Ticket jetzt offiziell Ready for Dev?' },
  { category: 'Agile Process', de: 'Definition of Ready', en: 'Definition of Ready', example: 'Entspricht die Story unserer Definition of Ready?' },
  { category: 'Agile Process', de: 'Runterbrechen', en: 'To break down', example: 'Können wir das Ticket in kleinere Sub-Tasks runterbrechen?' },
  { category: 'Agile Process', de: 'Auslagern', en: 'To outsource/move out', example: 'Lass uns die UI-Anpassungen in ein separates Ticket auslagern.' },
  { category: 'Agile Process', de: 'Priorisieren', en: 'To prioritize', example: 'Wir müssen die Backlog-Items neu priorisieren.' },
  { category: 'Idioms', de: 'Auf dem Schirm haben', en: 'To have on the radar', example: 'Das müssen wir für den nächsten Sprint auf dem Schirm haben.' },
  { category: 'Idioms', de: 'Flaschenhals', en: 'Bottleneck', example: 'Die Datenbank könnte hier zum Flaschenhals werden.' },
  { category: 'Idioms', de: 'Eierlegende Wollmilchsau', en: 'All-in-one (unrealistic)', example: 'Das Ticket klingt nach der eierlegenden Wollmilchsau.' },
  { category: 'Idioms', de: 'Nägel mit Köpfen', en: 'To do things right/final', example: 'Lass uns jetzt Nägel mit Köpfen machen und die Story finalisieren.' },
  { category: 'Closing', de: 'Mitnehmen', en: 'To take away/follow up', example: 'Ich nehme das Thema mit und kläre es bis morgen.' },
];

// ─── Composure Kit ───
export const COMPOSURE_PHRASES = [
  { situation: 'Technische Probleme', de: 'Irgendwie streikt meine Technik gerade. Gebt mir bitte eine Sekunde für einen Neustart.', en: 'My tech is on strike. Give me a second for a restart.' },
  { situation: 'Technische Probleme', de: 'Könnt ihr meinen Bildschirm sehen? Bei mir scheint die Übertragung gerade zu hängen.', en: 'Can you see my screen? The transmission seems to be hanging on my end.' },
  { situation: 'Technische Probleme', de: 'Mein Akku verabschiedet sich gerade. Ich muss kurz das Ladekabel holen, bin gleich wieder da!', en: 'My battery is saying goodbye. Need to grab the cable, back in a sec!' },
  { situation: 'Technische Probleme', de: 'Ich habe gerade massive Verbindungsprobleme. Ich schalte mal meine Kamera aus, um Bandbreite zu sparen.', en: 'I\'m having massive connection issues. Turning off my camera to save bandwidth.' },
  { situation: 'Unterbrochen werden', de: 'Einen Moment bitte, ich würde den Gedanken gerne erst kurz zu Ende führen.', en: 'One moment please, I\'d like to finish this thought first.' },
  { situation: 'Unterbrochen werden', de: 'Lass mich bitte kurz ausreden, dann können wir direkt über deinen Punkt diskutieren.', en: 'Please let me finish, then we can discuss your point immediately.' },
  { situation: 'Unterbrochen werden', de: 'Ich bin gleich fertig, dann gebe ich das Wort gerne an dich weiter.', en: 'I\'m almost done, then I\'ll gladly pass the word to you.' },
  { situation: 'Unterbrochen werden', de: 'Warte mal kurz, wir sind gerade noch bei einem anderen Thema. Wir kommen gleich auf deinen Punkt zurück.', en: 'Wait a second, we\'re on a different topic. We\'ll get back to your point shortly.' },
  { situation: 'Wortsuche', de: 'Mir fehlt gerade das deutsche Wort dafür, aber im Grunde geht es darum, dass...', en: 'I\'m missing the German word, but basically it\'s about...' },
  { situation: 'Wortsuche', de: 'Ich stehe gerade total auf dem Schlauch – wie heißt nochmal der Fachbegriff für...?', en: 'I\'m totally stuck — what was the technical term for...?' },
  { situation: 'Wortsuche', de: 'Ich versuche gerade, das Ganze ein bisschen zu strukturieren. Gebt mir einen Moment zum Nachdenken.', en: 'I\'m trying to structure this. Give me a moment to think.' },
  { situation: 'Wortsuche', de: 'Das ist ein komplexes Thema. Ich muss das kurz sacken lassen, bevor ich dazu etwas sage.', en: 'That\'s a complex topic. I need to let it sink in before I say something.' },
  { situation: 'Re-Sync', de: 'Können wir uns kurz resetten? Ich glaube, wir reden gerade aneinander vorbei.', en: 'Can we reset? I think we\'re talking past each other.' },
  { situation: 'Re-Sync', de: 'Bevor wir uns in Details verlieren: Was war eigentlich die ursprüngliche Fragestellung?', en: 'Before we lose ourselves in details: What was the original question?' },
  { situation: 'Re-Sync', de: 'Ich bin gerade etwas abgehängt. Können wir kurz den Stand der Dinge zusammenfassen?', en: 'I\'m a bit left behind. Can we briefly summarize the current status?' },
  { situation: 'Re-Sync', de: 'Könntest du das bitte in zwei Sätzen zusammenfassen? Ich möchte sichergehen, dass wir vom Gleichen reden.', en: 'Can you summarize that in two sentences? I want to make sure we\'re talking about the same thing.' },
  { situation: 'Aufgabe ablehnen', de: 'Das würde ich gerne machen, aber meine Kapazitäten sind für diesen Sprint bereits voll ausgelastet.', en: 'I\'d like to do that, but my capacity for this sprint is already fully utilized.' },
  { situation: 'Aufgabe ablehnen', de: 'Das fällt eigentlich eher in den Bereich von Team X. Sollen wir das dort mal platzieren?', en: 'That actually falls into Team X\'s area. Should we place it there?' },
  { situation: 'Aufgabe ablehnen', de: 'Ich kann das gerne übernehmen, aber dann müssen wir ein anderes Ticket nach hinten schieben.', en: 'I can take it over, but then we have to push another ticket back.' },
];

// ─── Crisis Simulator ───
export const CRISIS_TRIGGERS = [
  { trigger: 'Vage Anforderung: "Mach es halt modern."', response: 'Das ist noch etwas schwammig. Können wir das präzisieren, damit es greifbar wird?', strategy: 'Forces clarity without being rude.' },
  { trigger: 'Blame Game: "Dein Code hat den Crash verursacht."', response: 'Lass uns nicht den Teufel an die Wand malen. Wir müssen erst die Logs auswerten.', strategy: 'Deflects panic/blame; moves to data.' },
  { trigger: 'Jemand redet über dich hinweg.', response: 'Darf ich das kurz zu Ende führen? Ich bin gleich fertig, dann gebe ich das Wort weiter.', strategy: 'Reclaims the floor firmly.' },
  { trigger: '"Hardcode es einfach erstmal."', response: 'Ich habe Bauchschmerzen dabei. Wir sollten keine neuen Altlasten produzieren.', strategy: 'Uses "gut feeling" as a professional veto.' },
  { trigger: 'Dir fällt der Fachbegriff nicht ein.', response: 'Ich stehe gerade total auf dem Schlauch. Wie heißt nochmal der Fachbegriff für...?', strategy: 'Humorous admission of a gap.' },
  { trigger: 'Jemand redet Jargon-Salat.', response: 'Können wir das kurz resetten? Ich glaube, wir haben gerade den roten Faden verloren.', strategy: 'Pulls the team back to reality.' },
  { trigger: '"Kannst du das noch schnell machen?"', response: 'Ich würde gerne helfen, aber meine Kapazitäten sind für diesen Sprint ausgelastet.', strategy: 'Professional boundary setting.' },
  { trigger: 'Kolleg:in ist zu leise.', response: 'Das ist bei mir akustisch gerade nicht angekommen. Kannst du das kurz wiederholen?', strategy: 'Blames the sound, not the person.' },
  { trigger: 'Du brauchst eine "dumme" Info.', response: 'Nur um sicherzugehen, dass wir vom Gleichen reden: Wie definieren wir hier...?', strategy: 'Frames a basic question as "alignment."' },
  { trigger: 'Das Meeting zieht sich endlos.', response: 'Wir müssen im Zeitplan bleiben. Sollen wir den Rest auf den Themenparkplatz schieben?', strategy: 'Enforces the schedule.' },
  { trigger: '"Ich glaube nicht, dass das funktioniert."', response: 'Welchen Lösungsansatz würdest du denn favorisieren, um das Risiko zu minimieren?', strategy: 'Turns a critic into a contributor.' },
  { trigger: 'Jemand kommt zu spät ins Meeting.', response: 'Wir sind gerade mitten in der Engpassanalyse. Ich gebe dir nachher ein kurzes Update.', strategy: 'Keeps the flow; avoids re-explaining.' },
  { trigger: 'Schlechte Verbindung beim Gegenüber.', response: 'Deine Leitung hackt gerade ein bisschen. Kannst du den letzten Satz noch einmal sagen?', strategy: 'Technical troubleshooting.' },
  { trigger: 'Keiner will sich entscheiden.', response: 'Lass uns jetzt Nägel mit Köpfen machen und eine Entscheidung herbeiführen.', strategy: 'Drives the meeting to a result.' },
  { trigger: '"Lass uns noch 5 Features einbauen."', response: 'Das würde den Rahmen sprengen. Lass uns das für das nächste Release auslagern.', strategy: 'Protects the current sprint.' },
  { trigger: '"Lass uns ein eigenes Framework bauen!"', response: 'Pass auf, dass wir hier kein Overengineering betreiben. Reicht ein MVP?', strategy: 'Focuses on pragmatism.' },
  { trigger: '"Warum machen wir das überhaupt?"', response: 'Welchen Mehrwert generieren wir hier eigentlich für den Endnutzer?', strategy: 'Questions the "Why" at a C1 level.' },
  { trigger: 'Stakeholder wird emotional.', response: 'Lasst uns bitte sachlich und objektiv bleiben, um eine Lösung zu finden.', strategy: 'De-escalates through professionalism.' },
  { trigger: 'Stille im Meeting — keiner sagt was.', response: 'Ich möchte kurz ein Stimmungsbild einholen. Was ist eure Einschätzung?', strategy: 'Forces engagement.' },
  { trigger: 'Du musst den Call beenden.', response: 'Ich bin leider schon auf dem Sprung. Lass uns den Rest per Slack klären.', strategy: 'Quick, professional exit.' },
  { trigger: 'Du hast den Faden verloren.', response: 'Könntest du das für mich noch einmal kurz zusammenfassen? Ich habe gerade den Faden verloren.', strategy: 'Honest admission invites a recap.' },
  { trigger: 'Du willst zu Wort kommen.', response: 'Darf ich da ganz kurz einhaken? Ich hätte dazu eine Anmerkung.', strategy: 'Quick, polite interjection.' },
  { trigger: 'Jemand dominiert die Diskussion.', response: 'Danke für den Input! Lass uns das Thema hier kurz parken und auch die anderen zu Wort kommen lassen.', strategy: 'Inclusive topic-parking.' },
  { trigger: 'Du willst die Kernfrage schützen.', response: 'Das ist ein wichtiger Punkt, aber lass uns den Fokus wieder auf die Kernfrage lenken.', strategy: 'Validates, then refocuses.' },
  { trigger: 'Dein Mikro verschluckt Wörter.', response: 'Ich glaube, dein Mikrofon schluckt ein paar Wörter. Kannst du das nochmal wiederholen?', strategy: 'Blames the hardware, not the person.' },
];

const BORDER_COLORS: Record<string, string> = {
  Opening: 'border-l-emerald-400', Flow: 'border-l-blue-400', Interruption: 'border-l-amber-400',
  'Change Topic': 'border-l-violet-400', Conflict: 'border-l-rose-400', Engagement: 'border-l-cyan-400',
  Action: 'border-l-orange-400', Closing: 'border-l-indigo-400', Idioms: 'border-l-pink-400',
  'Unclear Story': 'border-l-amber-400', 'Value/User': 'border-l-teal-400',
  'Acceptance Criteria': 'border-l-lime-400', Implementation: 'border-l-blue-400',
  Negotiation: 'border-l-violet-400', Estimation: 'border-l-orange-400', Critique: 'border-l-rose-400',
  'Agile Process': 'border-l-cyan-400',
  'Technische Probleme': 'border-l-red-400', 'Unterbrochen werden': 'border-l-amber-400',
  'Wortsuche': 'border-l-violet-400', 'Re-Sync': 'border-l-blue-400', 'Aufgabe ablehnen': 'border-l-rose-400',
};

const PHASE_COLORS: Record<string, string> = {
  Opening: 'text-emerald-700 dark:text-emerald-300',
  Flow: 'text-blue-700 dark:text-blue-300',
  Interruption: 'text-amber-700 dark:text-amber-300',
  'Change Topic': 'text-violet-700 dark:text-violet-300',
  Conflict: 'text-rose-700 dark:text-rose-300',
  Engagement: 'text-cyan-700 dark:text-cyan-300',
  Action: 'text-orange-700 dark:text-orange-300',
  Closing: 'text-indigo-700 dark:text-indigo-300',
  Idioms: 'text-pink-700 dark:text-pink-300',
  'Unclear Story': 'text-amber-700 dark:text-amber-300',
  'Value/User': 'text-teal-700 dark:text-teal-300',
  'Acceptance Criteria': 'text-lime-700 dark:text-lime-300',
  Implementation: 'text-blue-700 dark:text-blue-300',
  Negotiation: 'text-violet-700 dark:text-violet-300',
  Estimation: 'text-orange-700 dark:text-orange-300',
  Critique: 'text-rose-700 dark:text-rose-300',
  'Agile Process': 'text-cyan-700 dark:text-cyan-300',
  'Technische Probleme': 'text-red-700 dark:text-red-300',
  'Unterbrochen werden': 'text-amber-700 dark:text-amber-300',
  'Wortsuche': 'text-violet-700 dark:text-violet-300',
  'Re-Sync': 'text-blue-700 dark:text-blue-300',
  'Aufgabe ablehnen': 'text-rose-700 dark:text-rose-300',
};

const WORKSHOP_PHASES = ['Alle', 'Opening', 'Flow', 'Interruption', 'Change Topic', 'Conflict', 'Engagement', 'Action', 'Closing', 'Idioms'] as const;
const REFINEMENT_CATEGORIES = ['Alle', 'Opening', 'Unclear Story', 'Value/User', 'Acceptance Criteria', 'Implementation', 'Negotiation', 'Estimation', 'Critique', 'Agile Process', 'Idioms', 'Closing'] as const;
const COMPOSURE_SITUATIONS = ['Alle', 'Technische Probleme', 'Unterbrochen werden', 'Wortsuche', 'Re-Sync', 'Aufgabe ablehnen'] as const;

const LABEL_DE: Record<string, string> = {
  Opening: 'Eröffnung', Flow: 'Gesprächsfluss', Interruption: 'Unterbrechung',
  'Change Topic': 'Themenwechsel', Conflict: 'Konflikt', Engagement: 'Beteiligung',
  Action: 'Maßnahmen', Closing: 'Abschluss', Idioms: 'Redewendungen',
  'Unclear Story': 'Unklare Story', 'Value/User': 'Nutzen/User',
  'Acceptance Criteria': 'Akzeptanzkriterien', Implementation: 'Umsetzung',
  Negotiation: 'Verhandlung', Estimation: 'Schätzung', Critique: 'Kritik',
  'Agile Process': 'Agiler Prozess',
};


const STORAGE_KEY = 'it-vokabular-highlights';

function loadHighlights(userId: string): Set<string> {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}-${userId}`);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveHighlights(userId: string, set: Set<string>) {
  localStorage.setItem(`${STORAGE_KEY}-${userId}`, JSON.stringify([...set]));
}

export default function ITVokabularPage() {
  const { t, lang } = useTranslation();
  const auth = useAuth();
  const userId = auth?.user?.id ?? 'anon';
  const [workshopPhase, setWorkshopPhase] = useState('Alle');
  const [refinementCategory, setRefinementCategory] = useState('Alle');
  const [composureSituation, setComposureSituation] = useState('Alle');
  const [starredOnly, setStarredOnly] = useState(false);
  const player = usePlayAll();
  const speakingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = useCallback((text: string, ttsUrl?: string) => {
    // Stop current playback
    if (speakingRef.current) {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      speechSynthesis.cancel();
      speakingRef.current = false;
      return;
    }
    // Prefer pre-generated mp3
    if (ttsUrl) {
      const audio = new Audio(ttsUrl);
      audioRef.current = audio;
      audio.onended = () => { speakingRef.current = false; audioRef.current = null; };
      speakingRef.current = true;
      audio.play();
      return;
    }
    // Fallback to browser TTS
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.onend = () => { speakingRef.current = false; };
    speakingRef.current = true;
    speechSynthesis.speak(u);
  }, []);
  // Stop play-all when filters change
  useEffect(() => { player.stop(); }, [starredOnly, workshopPhase, refinementCategory, composureSituation]);

  const [selectedRows, setSelectedRows] = useState<Set<string>>(() => loadHighlights(userId));
  const { showClickHint, dismissClickHint } = useTableClickHint();

  useEffect(() => { saveHighlights(userId, selectedRows); }, [userId, selectedRows]);

  const toggleRow = useCallback((key: string) => {
    dismissClickHint();
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  // Indexed wrappers so star keys survive filtering
  type Indexed<T> = T & { _i: number };
  const indexAll = <T,>(arr: readonly T[], prefix: string): Indexed<T>[] =>
    arr.map((item, i) => ({ ...item, _i: i })).filter(item => !starredOnly || selectedRows.has(`${prefix}-${item._i}`));

  const filteredNouns = useMemo(() => indexAll(NOUNS, 'nomen'), [starredOnly, selectedRows]);
  const filteredVerbs = useMemo(() => indexAll(VERBS, 'verben'), [starredOnly, selectedRows]);
  const filteredCollocations = useMemo(() => indexAll(COLLOCATIONS, 'koll'), [starredOnly, selectedRows]);

  const filteredWorkshop = useMemo(
    () => indexAll(WORKSHOP_PHRASES, 'ws').filter(p => workshopPhase === 'Alle' || p.phase === workshopPhase),
    [workshopPhase, starredOnly, selectedRows]
  );

  const filteredRefinement = useMemo(
    () => indexAll(REFINEMENT_PHRASES, 'ref').filter(p => refinementCategory === 'Alle' || p.category === refinementCategory),
    [refinementCategory, starredOnly, selectedRows]
  );

  const filteredComposure = useMemo(
    () => indexAll(COMPOSURE_PHRASES, 'souv').filter(p => composureSituation === 'Alle' || p.situation === composureSituation),
    [composureSituation, starredOnly, selectedRows]
  );

  const filteredCrisis = useMemo(() => indexAll(CRISIS_TRIGGERS, 'krise'), [starredOnly, selectedRows]);

  const starredBtn = <StarredButton active={starredOnly} onClick={() => setStarredOnly(prev => !prev)} />;

  const emptyStarred = starredOnly ? (
    <div className="py-10 text-center text-sm text-muted-foreground">
      Noch keine Einträge markiert — klicke auf eine Zeile in der Tabelle, um sie zu markieren.
    </div>
  ) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          {t('nav_it_deutsch')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Berufssprache für die IT-Branche — Vokabular, Redewendungen und Dialoge für den Arbeitsalltag.</p>
      </div>
      <ITDeutschNav />
      <p className="text-sm text-muted-foreground">
        {lang === 'de'
          ? 'Dein komplettes C1-Toolkit: Wortschatz, Kollokationen, Phrasen und Notfall-Kit für den IT-Arbeitsalltag.'
          : 'Your complete C1 toolkit: vocabulary, collocations, phrases and emergency kit for daily IT work.'}
      </p>

      <Tabs defaultValue="nomen">
        <TabsList className={PILL_CONTAINER}>
          <TabsTrigger value="nomen" className={TAB_TRIGGER_FUCHSIA}><Languages className="h-3.5 w-3.5" /> Nomen</TabsTrigger>
          <TabsTrigger value="verben" className={TAB_TRIGGER_FUCHSIA}><Zap className="h-3.5 w-3.5" /> Verben</TabsTrigger>
          <TabsTrigger value="kollokationen" className={TAB_TRIGGER_FUCHSIA}><Link2 className="h-3.5 w-3.5" /> Kollokationen</TabsTrigger>
          <TabsTrigger value="workshop" className={TAB_TRIGGER_FUCHSIA}><Presentation className="h-3.5 w-3.5" /> Workshop</TabsTrigger>
          <TabsTrigger value="refinement" className={TAB_TRIGGER_FUCHSIA}><GitBranch className="h-3.5 w-3.5" /> Refinement</TabsTrigger>
          <TabsTrigger value="souveraenitaet" className={TAB_TRIGGER_FUCHSIA}><Shield className="h-3.5 w-3.5" /> Souveränität</TabsTrigger>
          <TabsTrigger value="krisen" className={TAB_TRIGGER_FUCHSIA}><AlertTriangle className="h-3.5 w-3.5" /> Notfall-Kit</TabsTrigger>
        </TabsList>

        {/* ── Nomen ── */}
        <TabsContent value="nomen">
          <div className="mt-2 mb-4 flex items-center justify-end gap-2">{starredBtn}<PlayAllButton player={player} getUrls={() => filteredNouns.map(n => getTtsUrl('nouns', n._i)).filter(Boolean) as string[]} /></div>
          {/* Desktop */}
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] text-xs font-semibold text-muted-foreground">#</TableHead>
                  <TableHead className="min-w-[200px] text-xs font-semibold text-muted-foreground">Deutsch</TableHead>
                  <TableHead className="min-w-[180px] text-xs font-semibold text-muted-foreground">English</TableHead>
                  <TableHead className="min-w-[400px] text-xs font-semibold text-muted-foreground">C1 Beispielsatz</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNouns.map((n, i) => {
                  const key = `nomen-${n._i}`;
                  const sel = selectedRows.has(key);
                  return (
                    <TableRow key={i} onClick={() => toggleRow(key)} className={`cursor-pointer transition-colors ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                      <TableCell className="text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className={`h-3.5 w-3.5 shrink-0 ${sel ? 'text-yellow-500 fill-yellow-400' : 'text-transparent'}`} />{i + 1}</span>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          {n.de}
                          {i === 0 && showClickHint && (
                            <span className="inline-flex items-center gap-1 animate-bounce">
                              <span className="bg-foreground/90 text-background text-xs font-medium px-2.5 py-1 rounded-full shadow-lg" style={{ fontFamily: '"Comic Sans MS", "Segoe Print", cursive' }}>Klick mich!</span>
                              <MousePointerClick className="h-5 w-5 text-foreground/80 -rotate-12" />
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{n.en}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); speak(n.example, getTtsUrl('nouns', n._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <span className="text-sm text-foreground">{n.example}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {filteredNouns.map((n, i) => {
              const key = `nomen-${n._i}`;
              const sel = selectedRows.has(key);
              return (
                <div key={i} onClick={() => toggleRow(key)} className={`relative rounded-lg border p-4 space-y-2 cursor-pointer transition-colors ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-card'}`}>
                  {sel && <Star className="h-4 w-4 text-yellow-500 fill-yellow-400 absolute top-2 right-2" />}
                  <p className="text-sm font-medium text-foreground">{n.de}</p>
                  <p className="text-sm text-muted-foreground">{n.en}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); speak(n.example, getTtsUrl('nouns', n._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <p className="text-sm text-foreground">{n.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredNouns.length === 0 && emptyStarred}
        </TabsContent>

        {/* ── Verben ── */}
        <TabsContent value="verben">
          <div className="mt-2 mb-4 flex items-center justify-end gap-2">{starredBtn}<PlayAllButton player={player} getUrls={() => filteredVerbs.map(v => getTtsUrl('verbs', v._i)).filter(Boolean) as string[]} /></div>
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] text-xs font-semibold text-muted-foreground">#</TableHead>
                  <TableHead className="min-w-[180px] text-xs font-semibold text-muted-foreground">Deutsch</TableHead>
                  <TableHead className="min-w-[180px] text-xs font-semibold text-muted-foreground">English</TableHead>
                  <TableHead className="min-w-[400px] text-xs font-semibold text-muted-foreground">C1 Beispielsatz</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVerbs.map((v, i) => {
                  const key = `verben-${v._i}`;
                  const sel = selectedRows.has(key);
                  return (
                    <TableRow key={i} onClick={() => toggleRow(key)} className={`cursor-pointer transition-colors ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                      <TableCell className="text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className={`h-3.5 w-3.5 shrink-0 ${sel ? 'text-yellow-500 fill-yellow-400' : 'text-transparent'}`} />{i + 1}</span>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-foreground">{v.de}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{v.en}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); speak(v.example, getTtsUrl('verbs', v._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <span className="text-sm text-foreground">{v.example}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden space-y-3">
            {filteredVerbs.map((v, i) => {
              const key = `verben-${v._i}`;
              const sel = selectedRows.has(key);
              return (
                <div key={i} onClick={() => toggleRow(key)} className={`relative rounded-lg border p-4 space-y-2 cursor-pointer transition-colors ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-card'}`}>
                  {sel && <Star className="h-4 w-4 text-yellow-500 fill-yellow-400 absolute top-2 right-2" />}
                  <p className="text-sm font-medium text-foreground">{v.de}</p>
                  <p className="text-sm text-muted-foreground">{v.en}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); speak(v.example, getTtsUrl('verbs', v._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <p className="text-sm text-foreground">{v.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredVerbs.length === 0 && emptyStarred}
        </TabsContent>

        {/* ── Kollokationen ── */}
        <TabsContent value="kollokationen">
          <div className="mt-2 mb-4 flex items-center justify-end gap-2">{starredBtn}<PlayAllButton player={player} getUrls={() => filteredCollocations.map(c => getTtsUrl('kollokationen', c._i)).filter(Boolean) as string[]} /></div>
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] text-xs font-semibold text-muted-foreground">#</TableHead>
                  <TableHead className="min-w-[140px] text-xs font-semibold text-muted-foreground">Nomen</TableHead>
                  <TableHead className="min-w-[120px] text-xs font-semibold text-muted-foreground">Verb</TableHead>
                  <TableHead className="min-w-[160px] text-xs font-semibold text-muted-foreground">English</TableHead>
                  <TableHead className="min-w-[400px] text-xs font-semibold text-muted-foreground">C1 Beispielsatz</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCollocations.map((c, i) => {
                  const key = `koll-${c._i}`;
                  const sel = selectedRows.has(key);
                  return (
                    <TableRow key={i} onClick={() => toggleRow(key)} className={`cursor-pointer transition-colors ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                      <TableCell className="text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className={`h-3.5 w-3.5 shrink-0 ${sel ? 'text-yellow-500 fill-yellow-400' : 'text-transparent'}`} />{i + 1}</span>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-foreground">{c.noun}</TableCell>
                      <TableCell className="text-sm font-medium text-primary">{c.verb}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.en}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); speak(c.example, getTtsUrl('kollokationen', c._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <span className="text-sm text-foreground">{c.example}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden space-y-3">
            {filteredCollocations.map((c, i) => {
              const key = `koll-${c._i}`;
              const sel = selectedRows.has(key);
              return (
                <div key={i} onClick={() => toggleRow(key)} className={`relative rounded-lg border p-4 space-y-2 cursor-pointer transition-colors ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-card'}`}>
                  {sel && <Star className="h-4 w-4 text-yellow-500 fill-yellow-400 absolute top-2 right-2" />}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground">{c.noun}</span>
                    <span className="text-sm font-medium text-primary">+ {c.verb}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{c.en}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); speak(c.example, getTtsUrl('kollokationen', c._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <p className="text-sm text-foreground">{c.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredCollocations.length === 0 && emptyStarred}
        </TabsContent>

        {/* ── Workshop ── */}
        <TabsContent value="workshop">
          <div className="mt-2 mb-4 flex items-center justify-end gap-2">{starredBtn}<PlayAllButton player={player} getUrls={() => filteredWorkshop.map(p => getTtsUrl('workshop', p._i)).filter(Boolean) as string[]} /></div>
          <div className="md:hidden mb-3">
            <Select value={workshopPhase} onValueChange={setWorkshopPhase}>
              <SelectTrigger className="w-full">
                <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WORKSHOP_PHASES.map((phase) => (
                  <SelectItem key={phase} value={phase}>{LABEL_DE[phase] || phase}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] text-xs font-semibold text-muted-foreground">#</TableHead>
                  <TableHead className="min-w-[180px] p-1">
                    <Select value={workshopPhase} onValueChange={setWorkshopPhase}>
                      <SelectTrigger className="h-8 w-full text-xs font-semibold border-0 bg-transparent shadow-none">
                        <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {WORKSHOP_PHASES.map((phase) => (
                          <SelectItem key={phase} value={phase}>
                            <span className="flex items-center gap-2">
                              {phase !== 'Alle' && <span className={`inline-block w-2 h-2 rounded-full ${(BORDER_COLORS[phase] ?? '').replace('border-l-', 'bg-')}`} />}
                              {LABEL_DE[phase] || phase}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableHead>
                  <TableHead className="min-w-[200px] text-xs font-semibold text-muted-foreground">Deutsch</TableHead>
                  <TableHead className="min-w-[160px] text-xs font-semibold text-muted-foreground">Englisch</TableHead>
                  <TableHead className="min-w-[400px] text-xs font-semibold text-muted-foreground">C1-Beispielsatz</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkshop.map((p, i) => {
                  const key = `ws-${p._i}`;
                  const sel = selectedRows.has(key);
                  const prevPhase = i > 0 ? filteredWorkshop[i - 1].phase : null;
                  const isNewGroup = prevPhase !== null && prevPhase !== p.phase;
                  return (
                    <TableRow key={p._i} onClick={() => toggleRow(key)} className={`cursor-pointer transition-colors ${isNewGroup ? 'border-t-4 border-t-muted' : ''} ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                      <TableCell className={`text-xs text-muted-foreground border-l-4 ${BORDER_COLORS[p.phase] ?? 'border-l-transparent'}`}>
                        <span className="flex items-center gap-1"><Star className={`h-3.5 w-3.5 shrink-0 ${sel ? 'text-yellow-500 fill-yellow-400' : 'text-transparent'}`} />{p._i + 1}</span>
                      </TableCell>
                      <TableCell><span className={`text-xs font-normal whitespace-nowrap ${PHASE_COLORS[p.phase] ?? ''}`}>{LABEL_DE[p.phase] || p.phase}</span></TableCell>
                      <TableCell className="text-sm font-medium text-foreground">{p.de}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.en}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); speak(p.example, getTtsUrl('workshop', p._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <span className="text-sm text-foreground">{p.example}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden space-y-3">
            {filteredWorkshop.map((p, i) => {
              const key = `ws-${p._i}`;
              const sel = selectedRows.has(key);
              const prevPhase = i > 0 ? filteredWorkshop[i - 1].phase : null;
              const isNewGroup = prevPhase !== null && prevPhase !== p.phase;
              return (
                <div key={p._i} onClick={() => toggleRow(key)} className={`relative rounded-lg border border-l-4 ${BORDER_COLORS[p.phase] ?? ''} p-4 space-y-2 cursor-pointer transition-colors ${isNewGroup ? 'mt-6' : ''} ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-card'}`}>
                  {sel && <Star className="h-4 w-4 text-yellow-500 fill-yellow-400 absolute top-2 right-2" />}
                  <span className={`text-xs font-normal whitespace-nowrap ${PHASE_COLORS[p.phase] ?? ''}`}>{LABEL_DE[p.phase] || p.phase}</span>
                  <p className="text-sm font-medium text-foreground">{p.de}</p>
                  <p className="text-sm text-muted-foreground">{p.en}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); speak(p.example, getTtsUrl('workshop', p._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <p className="text-sm text-foreground">{p.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredWorkshop.length === 0 && emptyStarred}
        </TabsContent>

        {/* ── Refinement ── */}
        <TabsContent value="refinement">
          <div className="mt-2 mb-4 flex items-center justify-end gap-2">{starredBtn}<PlayAllButton player={player} getUrls={() => filteredRefinement.map(p => getTtsUrl('refinement', p._i)).filter(Boolean) as string[]} /></div>
          <div className="md:hidden mb-3">
            <Select value={refinementCategory} onValueChange={setRefinementCategory}>
              <SelectTrigger className="w-full">
                <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REFINEMENT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{LABEL_DE[cat] || cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] text-xs font-semibold text-muted-foreground">#</TableHead>
                  <TableHead className="min-w-[180px] p-1">
                    <Select value={refinementCategory} onValueChange={setRefinementCategory}>
                      <SelectTrigger className="h-8 w-full text-xs font-semibold border-0 bg-transparent shadow-none">
                        <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {REFINEMENT_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            <span className="flex items-center gap-2">
                              {cat !== 'Alle' && <span className={`inline-block w-2 h-2 rounded-full ${(BORDER_COLORS[cat] ?? '').replace('border-l-', 'bg-')}`} />}
                              {LABEL_DE[cat] || cat}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableHead>
                  <TableHead className="min-w-[200px] text-xs font-semibold text-muted-foreground">Deutsch</TableHead>
                  <TableHead className="min-w-[180px] text-xs font-semibold text-muted-foreground">Englisch</TableHead>
                  <TableHead className="min-w-[400px] text-xs font-semibold text-muted-foreground">C1-Beispielsatz</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRefinement.map((p, i) => {
                  const key = `ref-${p._i}`;
                  const sel = selectedRows.has(key);
                  const prevCat = i > 0 ? filteredRefinement[i - 1].category : null;
                  const isNewGroup = prevCat !== null && prevCat !== p.category;
                  return (
                    <TableRow key={p._i} onClick={() => toggleRow(key)} className={`cursor-pointer transition-colors ${isNewGroup ? 'border-t-4 border-t-muted' : ''} ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                      <TableCell className={`text-xs text-muted-foreground border-l-4 ${BORDER_COLORS[p.category] ?? 'border-l-transparent'}`}>
                        <span className="flex items-center gap-1"><Star className={`h-3.5 w-3.5 shrink-0 ${sel ? 'text-yellow-500 fill-yellow-400' : 'text-transparent'}`} />{p._i + 1}</span>
                      </TableCell>
                      <TableCell><span className={`text-xs font-normal whitespace-nowrap ${PHASE_COLORS[p.category] ?? ''}`}>{LABEL_DE[p.category] || p.category}</span></TableCell>
                      <TableCell className="text-sm font-medium text-foreground">{p.de}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.en}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); speak(p.example, getTtsUrl('refinement', p._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <span className="text-sm text-foreground">{p.example}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden space-y-3">
            {filteredRefinement.map((p, i) => {
              const key = `ref-${p._i}`;
              const sel = selectedRows.has(key);
              const prevCat = i > 0 ? filteredRefinement[i - 1].category : null;
              const isNewGroup = prevCat !== null && prevCat !== p.category;
              return (
                <div key={p._i} onClick={() => toggleRow(key)} className={`relative rounded-lg border border-l-4 ${BORDER_COLORS[p.category] ?? ''} p-4 space-y-2 cursor-pointer transition-colors ${isNewGroup ? 'mt-6' : ''} ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-card'}`}>
                  {sel && <Star className="h-4 w-4 text-yellow-500 fill-yellow-400 absolute top-2 right-2" />}
                  <span className={`text-xs font-normal whitespace-nowrap ${PHASE_COLORS[p.category] ?? ''}`}>{LABEL_DE[p.category] || p.category}</span>
                  <p className="text-sm font-medium text-foreground">{p.de}</p>
                  <p className="text-sm text-muted-foreground">{p.en}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); speak(p.example, getTtsUrl('refinement', p._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <p className="text-sm text-foreground">{p.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredRefinement.length === 0 && emptyStarred}
        </TabsContent>

        {/* ── Souveränität ── */}
        <TabsContent value="souveraenitaet">
          <div className="mt-2 mb-4 flex items-center justify-end gap-2">{starredBtn}<PlayAllButton player={player} getUrls={() => filteredComposure.map(p => getTtsUrl('souveranitaet', p._i)).filter(Boolean) as string[]} /></div>
          <div className="md:hidden mb-3">
            <Select value={composureSituation} onValueChange={setComposureSituation}>
              <SelectTrigger className="w-full">
                <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COMPOSURE_SITUATIONS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] text-xs font-semibold text-muted-foreground">#</TableHead>
                  <TableHead className="min-w-[180px] p-1">
                    <Select value={composureSituation} onValueChange={setComposureSituation}>
                      <SelectTrigger className="h-8 w-full text-xs font-semibold border-0 bg-transparent shadow-none">
                        <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPOSURE_SITUATIONS.map((s) => (
                          <SelectItem key={s} value={s}>
                            <span className="flex items-center gap-2">
                              {s !== 'Alle' && <span className={`inline-block w-2 h-2 rounded-full ${(BORDER_COLORS[s] ?? '').replace('border-l-', 'bg-')}`} />}
                              {s}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableHead>
                  <TableHead className="min-w-[400px] text-xs font-semibold text-muted-foreground">Deutsch</TableHead>
                  <TableHead className="min-w-[300px] text-xs font-semibold text-muted-foreground">English</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComposure.map((p, i) => {
                  const key = `souv-${p._i}`;
                  const sel = selectedRows.has(key);
                  const prevSit = i > 0 ? filteredComposure[i - 1].situation : null;
                  const isNewGroup = prevSit !== null && prevSit !== p.situation;
                  return (
                    <TableRow key={p._i} onClick={() => toggleRow(key)} className={`cursor-pointer transition-colors ${isNewGroup ? 'border-t-4 border-t-muted' : ''} ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                      <TableCell className={`text-xs text-muted-foreground border-l-4 ${BORDER_COLORS[p.situation] ?? 'border-l-transparent'}`}>
                        <span className="flex items-center gap-1"><Star className={`h-3.5 w-3.5 shrink-0 ${sel ? 'text-yellow-500 fill-yellow-400' : 'text-transparent'}`} />{p._i + 1}</span>
                      </TableCell>
                      <TableCell><span className={`text-xs font-normal whitespace-nowrap ${PHASE_COLORS[p.situation] ?? ''}`}>{p.situation}</span></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); speak(p.de, getTtsUrl('souveranitaet', p._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <span className="text-sm font-medium text-foreground">{p.de}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.en}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden space-y-3">
            {filteredComposure.map((p, i) => {
              const key = `souv-${p._i}`;
              const sel = selectedRows.has(key);
              const prevSit = i > 0 ? filteredComposure[i - 1].situation : null;
              const isNewGroup = prevSit !== null && prevSit !== p.situation;
              return (
                <div key={p._i} onClick={() => toggleRow(key)} className={`relative rounded-lg border border-l-4 ${BORDER_COLORS[p.situation] ?? ''} p-4 space-y-2 cursor-pointer transition-colors ${isNewGroup ? 'mt-6' : ''} ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-card'}`}>
                  {sel && <Star className="h-4 w-4 text-yellow-500 fill-yellow-400 absolute top-2 right-2" />}
                  <span className={`text-xs font-normal whitespace-nowrap ${PHASE_COLORS[p.situation] ?? ''}`}>{p.situation}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); speak(p.de, getTtsUrl('souveranitaet', p._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <p className="text-sm font-medium text-foreground">{p.de}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.en}</p>
                </div>
              );
            })}
          </div>
          {filteredComposure.length === 0 && emptyStarred}
        </TabsContent>

        {/* ── Notfall-Kit ── */}
        <TabsContent value="krisen">
          <div className="mt-2 mb-4 flex items-center justify-end gap-2">{starredBtn}<PlayAllButton player={player} getUrls={() => filteredCrisis.map(c => getTtsUrl('notfallkit', c._i)).filter(Boolean) as string[]} /></div>
          <div className="hidden md:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] text-xs font-semibold text-muted-foreground">#</TableHead>
                  <TableHead className="min-w-[250px] text-xs font-semibold text-muted-foreground">Krise / Trigger</TableHead>
                  <TableHead className="min-w-[350px] text-xs font-semibold text-muted-foreground">C1 Kill-Phrase</TableHead>
                  <TableHead className="min-w-[200px] text-xs font-semibold text-muted-foreground">Strategie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCrisis.map((c, i) => {
                  const key = `krise-${c._i}`;
                  const sel = selectedRows.has(key);
                  return (
                    <TableRow key={i} onClick={() => toggleRow(key)} className={`cursor-pointer transition-colors ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                      <TableCell className="text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className={`h-3.5 w-3.5 shrink-0 ${sel ? 'text-yellow-500 fill-yellow-400' : 'text-transparent'}`} />{i + 1}</span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.trigger}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); speak(c.response, getTtsUrl('notfallkit', c._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <span className="text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400">{c.response}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.strategy}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden space-y-3">
            {filteredCrisis.map((c, i) => {
              const key = `krise-${c._i}`;
              const sel = selectedRows.has(key);
              return (
                <div key={i} onClick={() => toggleRow(key)} className={`relative rounded-lg border p-4 space-y-2 cursor-pointer transition-colors ${sel ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-card'}`}>
                  {sel && <Star className="h-4 w-4 text-yellow-500 fill-yellow-400 absolute top-2 right-2" />}
                  <p className="text-sm text-muted-foreground">{c.trigger}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); speak(c.response, getTtsUrl('notfallkit', c._i)); }} className="shrink-0 text-muted-foreground hover:text-fuchsia-500 transition-colors">
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <p className="text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400">{c.response}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.strategy}</p>
                </div>
              );
            })}
          </div>
          {filteredCrisis.length === 0 && emptyStarred}
        </TabsContent>

      </Tabs>
    </div>
  );
}
