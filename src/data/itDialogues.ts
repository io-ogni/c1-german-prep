// ─── IT Dialogue data ───
// Two categories: 'meeting' (voice/in-person) and 'slack' (written chat)

export interface DialogueLine {
  speaker: string;
  de: string;
  en: string;
}

export interface ITDialogue {
  id: string;
  title_de: string;
  title_en: string;
  description_de: string;
  description_en: string;
  category: 'meeting' | 'slack';
  context_de: string;
  context_en: string;
  speakers: { name: string; role: string }[];
  lines: DialogueLine[];
}

export const IT_DIALOGUES: ITDialogue[] = [
  // ═══════════════════════════════════════════════════
  // MEETINGS
  // ═══════════════════════════════════════════════════
  {
    id: 'discovery-session',
    title_de: 'Die Discovery-Session',
    title_en: 'The High-Stakes Discovery Session',
    description_de: 'Product Discovery mit Opportunity Solution Tree, Four Big Risks und Assumption Mapping',
    description_en: 'Product Discovery with Opportunity Solution Tree, Four Big Risks and Assumption Mapping',
    category: 'meeting',
    context_de: 'Das Trio: Sarah (PM), Jan (Product Designer/UX) und Lukas (Tech Lead). Sie evaluieren eine Lösung für den hohen Drop-off im Checkout.',
    context_en: 'The Trio: Sarah (PM), Jan (Product Designer/UX), and Lukas (Tech Lead). They are evaluating a solution for high checkout drop-off.',
    speakers: [
      { name: 'Sarah', role: 'PM' },
      { name: 'Jan', role: 'UX Designer' },
      { name: 'Lukas', role: 'Tech Lead' },
    ],
    lines: [
      { speaker: 'Sarah', de: 'Okay Team, lasst uns den Opportunity Solution Tree von Teresa Torres heranziehen. Unser Desired Outcome ist die Steigerung des Customer Lifetime Value um 15 %. Die Opportunity „Hoher Drop-off im Checkout" ist validiert. Jan, du hast die Solution „One-Click Checkout" im Baum. Aber bevor wir ins Delivery gehen, müssen wir die Four Big Risks prüfen.', en: 'Okay team, let\'s look at our Opportunity Solution Tree. Our desired outcome is to increase Customer Lifetime Value by 15%. The opportunity "High drop-off during checkout" is validated. Jan, you\'ve got the "One-Click Checkout" solution on the tree. But before we move into delivery, we need to check the four big risks.' },
      { speaker: 'Jan', de: 'Absolut. Ich fange beim Usability Risk an. Die Lösung klingt einfach, aber wir müssen evaluieren, ob die kognitive Last für den User zu hoch ist, wenn die Bestätigung fehlt. Wir dürfen nicht in die Build Trap tappen und einfach Features raushauen, die am Ende niemand kapiert. Ich will diese Woche noch User Interviews führen, um die Desirability zu klären.', en: 'Absolutely. I\'ll start with the usability risk. The solution sounds simple, but we need to evaluate whether the cognitive load is too high for the user if there\'s no confirmation step. We can\'t fall into the build trap and just ship features that no one understands. I want to run user interviews this week to clarify the desirability.' },
      { speaker: 'Lukas', de: 'Und ich grätsche direkt beim Feasibility Risk rein. Das ist mein Job als Tech Lead im Trio. Sarah, technisch gesehen ist One-Click bei unserer aktuellen Architektur ein Albtraum. Wir haben massive Altlasten im Backend. Wenn wir das jetzt ohne Refactoring implementieren, fliegen uns die Latenzzeiten um die Ohren. Wir können nicht einfach ins Blaue hinein entwickeln und hoffen, dass die API das aushält.', en: 'And I\'m jumping right in on the feasibility risk. That\'s my job as the tech lead in this trio. Sarah, technically speaking, one-click is a nightmare with our current architecture. We\'re carrying a massive amount of legacy debt. If we implement this now without refactoring, our latency will skyrocket. We can\'t just develop into the blue and hope the API holds up.' },
      { speaker: 'Sarah', de: 'Lukas, ich höre dich. Aber wir müssen auch das Value Risk und das Business Viability Risk betrachten. Wenn wir diese Opportunity ignorieren, erreichen wir unser Quartalsziel nicht. Wir müssen die Spreu vom Weizen trennen: Ist der Impact groß genug, um den technischen Aufwand zu rechtfertigen? Oder sind wir auf dem Holzweg?', en: 'Lukas, I hear you. But we also have to consider the value risk and the business viability risk. If we ignore this opportunity, we won\'t hit our quarterly goals. We need to separate the wheat from the chaff: is the impact high enough to justify the technical effort? Or are we on the wrong track?' },
      { speaker: 'Jan', de: 'Genau das ist der Punkt. Laut Teresa Torres sollten wir nicht nur eine Lösung betrachten. Was sind die Alternative Solutions im Tree? Vielleicht ist „Social Login" oder „Apple Pay Integration" eine niederschwelligere Lösung mit ähnlichem Impact, aber geringerem Feasibility Risk?', en: 'That\'s exactly the point. According to Teresa Torres, we shouldn\'t just look at one solution. What are the alternative solutions in the tree? Maybe "Social Login" or "Apple Pay Integration" is a lower-threshold solution with a similar impact but a lower feasibility risk?' },
      { speaker: 'Lukas', de: 'Das hat Hand und Fuß. Apple Pay würde uns viele Sorgen bei der Datensicherheit abnehmen. Aber Sarah, da müssen wir mit offenen Karten spielen: Jede dieser Lösungen erfordert eine saubere Schnittstelle. Wir können nicht ständig Quick-and-Dirty-Fixes machen, sonst ersticken wir in technischen Schulden.', en: 'That makes total sense. Apple Pay would take a lot of data security concerns off our hands. But Sarah, we have to play with open cards here: any of these solutions requires a clean interface. We can\'t keep doing quick-and-dirty fixes, or we\'ll drown in technical debt.' },
      { speaker: 'Sarah', de: 'Einverstanden. Wir machen jetzt Assumption Mapping. Jan, was ist deine gefährlichste Annahme?', en: 'Agreed. Let\'s do some assumption mapping. Jan, what\'s your most dangerous assumption?' },
      { speaker: 'Jan', de: 'Meine „Leap-of-Faith"-Annahme ist, dass Nutzer uns ihre Kreditkartendaten für die Speicherung anvertrauen. Wenn das nicht stimmt, hat die ganze Solution keine Daseinsberechtigung. Ich baue einen Low-Fi-Prototyp, um das zu testen. Wir müssen evidenzbasiert entscheiden.', en: 'My "leap-of-faith" assumption is that users trust us enough to store their credit card data. If that\'s not true, the entire solution has no reason for being. I\'ll build a low-fi prototype to test that. We need to make evidence-based decisions.' },
      { speaker: 'Lukas', de: 'Und meine kritische Annahme ist, dass unser Altsystem die Token-Verschlüsselung in Echtzeit schafft. Ich werde einen Spike durchführen, um das zu validieren. Ich will nicht, dass wir später den Karren aus dem Dreck ziehen müssen, weil wir die Performance unterschätzt haben.', en: 'And my critical assumption is that our legacy system can handle token encryption in real-time. I\'ll run a spike to validate that. I don\'t want us to have to pull the cart out of the mud later because we underestimated the performance requirements.' },
      { speaker: 'Sarah', de: 'Sehr gut. Das ist echtes Product Discovery. Wir minimieren die Risiken, bevor wir teure Engineering-Zeit verschwenden. Wir wollen Outcomes, keine Outputs. Wenn die Tests negativ ausfallen, dann stampfen wir die Idee ein – das gehört zum Prozess.', en: 'Great. This is real product discovery. We\'re minimizing risks before we waste expensive engineering time. We want outcomes, not outputs. If the tests come back negative, then we kill the idea—that\'s part of the process.' },
      { speaker: 'Jan', de: 'Genau, „Kill your darlings". Lieber jetzt den Fehler finden, als nach dem Release festzustellen, dass wir am Markt vorbeigeschossen sind.', en: 'Exactly, "kill your darlings." Better to find the flaw now than to realize after the release that we missed the mark.' },
      { speaker: 'Lukas', de: 'Okay, ich bin dabei. Ich mache die Engpassanalyse für den Spike. Aber Sarah, wir brauchen eine klare Deadline, wann wir die Entscheidung herbeiführen, ob wir „Go" oder „No-Go" sagen. Wir dürfen uns nicht in der Analyse-Paralyse verlieren.', en: 'Okay, I\'m in. I\'ll do the bottleneck analysis for the spike. But Sarah, we need a clear deadline for when we make a final decision on whether it\'s a "go" or a "no-go." We can\'t get lost in analysis paralysis.' },
      { speaker: 'Sarah', de: 'Abgemacht. Freitagmittag machen wir den Check-In. Dann schauen wir uns die Daten an und machen Nägel mit Köpfen. Jan, Lukas – danke für den Input. Ich habe jetzt ein viel besseres Gefühl, dass wir nicht in die Build Trap laufen.', en: 'Deal. We\'ll do a check-in on Friday at noon. We\'ll look at the data and nail it down. Jan, Lukas—thanks for the input. I feel much better now that I know we aren\'t walking straight into the build trap.' },
      { speaker: 'Jan', de: 'Alles klar, ich bin dann mal auf dem Sprung ins Research-Lab. Bis Freitag!', en: 'All right, I\'m off to the research lab. See you Friday!' },
      { speaker: 'Lukas', de: 'Und ich gehe zurück in die IDE. Wenn wir das hinkriegen, haben wir echt einen Meilenstein erreicht. Bis dann!', en: 'And I\'m headed back to the IDE. If we pull this off, we\'ve really reached a milestone. See ya!' },
    ],
  },
  {
    id: 'story-mapping',
    title_de: 'Die User Story Mapping Session',
    title_en: 'The User Story Mapping Session',
    description_de: 'User Story Mapping nach Jeff Patton — Backbone, Ribs und MVP-Schnittlinie definieren',
    description_en: 'User Story Mapping following Jeff Patton — defining backbone, ribs, and the MVP slice',
    category: 'meeting',
    context_de: 'Das Team steht vor einem digitalen Board und mappt die User Journey für eine neue Abo-Verwaltung. Teilnehmer: Sarah (PM), Jan (UX/Designer), Lukas (Tech Lead) und Katja (QA).',
    context_en: 'The team is standing in front of a digital board, mapping the user journey for a new subscription management feature. Participants: Sarah (PM), Jan (UX/Designer), Lukas (Tech Lead), and Katja (QA).',
    speakers: [
      { name: 'Sarah', role: 'PM' },
      { name: 'Jan', role: 'UX Designer' },
      { name: 'Lukas', role: 'Tech Lead' },
      { name: 'Katja', role: 'QA Lead' },
    ],
    lines: [
      { speaker: 'Sarah', de: 'Okay Leute, wir machen heute ein User Story Mapping nach Jeff Patton. Wir wollen weg von der flachen Liste im Backlog und hin zum Gesamtbild. Unser Ziel ist es, das Backbone, also das Rückgrat der User Journey, für die neue Abo-Verwaltung zu definieren.', en: 'Okay team, today we\'re doing a User Story Mapping session following Jeff Patton\'s framework. We want to move away from a flat backlog list and toward the big picture. Our goal is to define the backbone of the user journey for the new subscription management.' },
      { speaker: 'Jan', de: 'Genau. Ich habe die ersten User Tasks schon mal vorbereitet. Wir fangen ganz links an: „Abo auswählen", dann „Zahlungsdaten eingeben" und schließlich „Bestätigung erhalten". Das ist unser grober Flow, die Narrative Flow Line.', en: 'Right. I\'ve prepared the initial user tasks. We start on the far left: "Select subscription," then "Enter payment details," and finally "Receive confirmation." That\'s our high-level flow, the narrative flow line.' },
      { speaker: 'Lukas', de: 'Warte mal kurz, Jan. Bevor wir in die Tiefe gehen: Haben wir die technischen Abhängigkeiten für das „Abo-Upgrade" schon auf dem Schirm? Wenn ein User mitten im Monat wechselt, ist die Verrechnungslogik extrem komplex. Das ist für mich ein riesiges Feasibility Risk.', en: 'Hang on a second, Jan. Before we go deep: Do we have the technical dependencies for the "Subscription Upgrade" on our radar? If a user switches mid-month, the proration logic is extremely complex. For me, that\'s a massive feasibility risk.' },
      { speaker: 'Katja', de: 'Da muss ich Lukas recht geben. Und was passiert bei einem „Payment Failure"? Wir müssen die Edge-Cases direkt unter die jeweiligen Tasks hängen, also die „Ribs" (Rippen) an das Rückgrat bauen. Wenn wir das ignorieren, haben wir später beim Testen ein böses Erwachen.', en: 'I have to agree with Lukas. And what happens during a "payment failure"? We need to hang the edge cases directly under the respective tasks—basically building the "ribs" onto the backbone. If we ignore this, we\'ll have a rude awakening during testing later.' },
      { speaker: 'Sarah', de: 'Absolut. Lasst uns die Storys jetzt vertikal anordnen. Oben kommt das, was für das Skelett überlebenswichtig ist, und weiter unten die „Nice-to-have"-Features. Wir müssen jetzt die Schnittlinie für das MVP (Minimum Viable Product) ziehen.', en: 'Absolutely. Let\'s arrange the stories vertically now. At the top, we put what\'s vital for the skeleton, and further down, the "nice-to-have" features. We need to draw the slice for the MVP (Minimum Viable Product) now.' },
      { speaker: 'Jan', de: 'Wenn wir die Schnittlinie so hoch ansetzen, wie Lukas vorschlägt, fällt aber das „Gutschein-Modul" komplett raus. Ist das für die Vermarktung okay, Sarah? Oder schießen wir damit am Markt vorbei?', en: 'If we set the slice as high as Lukas suggests, the "Voucher Module" drops out completely. Is that okay for marketing, Sarah? Or are we missing the mark with that?' },
      { speaker: 'Sarah', de: 'Das ist ein zweischneidiges Schwert. Ohne Gutscheine verlieren wir Marketing-Power, aber wenn die Basis-Zahlung nicht stabil läuft, haben wir gar keine Kunden. Wir müssen die Kirche im Dorf lassen. Jeff Patton sagt: „Focus on outcomes, not features." Das Outcome ist ein erfolgreicher Kaufabschluss.', en: 'It\'s a double-edged sword. Without vouchers, we lose marketing power, but if the core payment isn\'t stable, we won\'t have any customers at all. Let\'s not get carried away. Jeff Patton says: "Focus on outcomes, not features." The outcome is a successful completed purchase.' },
      { speaker: 'Lukas', de: 'Danke, Sarah. Wenn wir das Gutschein-Modul in den zweiten Release schieben, können wir uns jetzt auf die Skalierbarkeit der Kern-Schnittstelle konzentrieren. Das nimmt mir den Druck raus und wir produzieren weniger technische Schulden.', en: 'Thanks, Sarah. If we push the voucher module to the second release, we can focus on the scalability of the core interface now. That takes the pressure off me, and we\'ll produce less technical debt.' },
      { speaker: 'Katja', de: 'Ich fange an, die Akzeptanzkriterien für die MVP-Storys zu schreiben. Wir müssen sicherstellen, dass die „Happy Path"-Storys wirklich Ready for Dev sind. Ich will nicht, dass wir während des Sprints wieder den Faden verlieren.', en: 'I\'ll start writing the acceptance criteria for the MVP stories. We need to make sure the "happy path" stories are truly Ready for Dev. I don\'t want us to lose the thread again during the sprint.' },
      { speaker: 'Jan', de: 'Ich verschiebe die „Social Sharing"-Funktion nach ganz unten. Das ist definitiv kein Teil des Walking Skeleton. Wir konzentrieren uns erst mal darauf, dass der User sein Abo überhaupt ohne Frust abschließen kann.', en: 'I\'m moving the "Social Sharing" function to the very bottom. That\'s definitely not part of the walking skeleton. We\'ll focus first on the user being able to complete their subscription without frustration.' },
      { speaker: 'Sarah', de: 'Perfekt. Wir haben jetzt ein gemeinsames Verständnis der User Journey. Wir haben die Risiken identifiziert und eine klare Priorisierung vorgenommen. Wir machen jetzt Nägel mit Köpfen: Das hier ist unser Scope für den nächsten Meilenstein.', en: 'Perfect. We now have a shared understanding of the user journey. We\'ve identified the risks and made a clear prioritization. Let\'s nail it down now: This is our scope for the next milestone.' },
      { speaker: 'Lukas', de: 'Gut. Ich fühle mich jetzt deutlich wohler mit dem Zeitplan. Wir haben nicht den Mund zu voll genommen, sondern einen realistischen Plan ausgearbeitet.', en: 'Good. I feel much more comfortable with the schedule now. We haven\'t bitten off more than we can chew; we\'ve worked out a realistic plan.' },
      { speaker: 'Katja', de: 'Dann mache ich jetzt einen Haken hinter die Session. Ich nehme die Storys mit und bereite die Testfälle vor.', en: 'Then I\'ll close the session now. I\'ll take the stories and prepare the test cases.' },
    ],
  },

  // ═══════════════════════════════════════════════════
  // SLACK
  // ═══════════════════════════════════════════════════
  {
    id: 'slack-debugging',
    title_de: 'Der Dev-to-Dev Deep Dive',
    title_en: 'The Dev-to-Dev Deep Dive',
    description_de: 'Troubleshooting eines kritischen Bugs im Payment-Gateway zwei Stunden vor dem Release',
    description_en: 'Troubleshooting a critical bug in the payment gateway two hours before release',
    category: 'slack',
    context_de: 'Lukas (Senior) und Marco (Junior) sind in einer privaten DM. Sie haben einen kritischen Bug im Payment-Gateway zwei Stunden vor einem Major Release.',
    context_en: 'Lukas (Senior) and Marco (Junior) are in a private DM. They are dealing with a critical bug in the payment gateway two hours before a major release.',
    speakers: [
      { name: 'Lukas', role: 'Senior Dev' },
      { name: 'Marco', role: 'Junior Dev' },
    ],
    lines: [
      { speaker: 'Lukas', de: 'Hey Marco, hast du eine Minute? Ich schaue mir gerade den Trace vom Payment-Gateway an und kriege echt Bauchschmerzen. Die Fehlerrate bei den Kreditkarten-Transaktionen ist seit dem letzten Merge um 15 % gestiegen. Hast du da irgendwas an der Schnittstelle geschraubt?', en: 'Hey Marco, do you have a minute? I\'m looking at the trace from the payment gateway and I\'m getting a really bad feeling. The error rate on credit card transactions has gone up by 15% since the last merge. Did you make any changes to the interface?' },
      { speaker: 'Marco', de: 'Hi Lukas! Oh je, das klingt gar nicht gut. Ich habe gestern nur ein kleines Refactoring bei den Validatoren gemacht, um die Wartbarkeit zu erhöhen. Aber eigentlich sollte das keine Auswirkungen auf die Logik haben. Ich dachte, wir hätten das Thema abgehakt.', en: 'Hi Lukas! Oh no, that doesn\'t sound good at all. Yesterday I only did a small refactoring on the validators to improve maintainability. But it shouldn\'t have had any impact on the logic. I thought we\'d already put that topic to bed.' },
      { speaker: 'Lukas', de: 'Tja, Theorie und Praxis... Ich glaube, wir haben hier ein Problem mit der Skalierbarkeit bei asynchronen Calls. Sobald mehr als 50 Requests gleichzeitig reinkommen, scheint der Thread-Pool vollzulaufen. Ich stehe gerade total auf dem Schlauch – warum haben wir das nicht in der Staging-Umgebung gesehen?', en: 'Well, theory and practice... I think we have a scalability problem with the async calls. As soon as more than 50 requests come in simultaneously, the thread pool seems to overflow. I\'m completely stumped right now — why didn\'t we catch this in the staging environment?' },
      { speaker: 'Marco', de: 'Wahrscheinlich, weil wir dort nicht mit echten Lastspitzen testen. Wir haben die Kapazitäten der Test-Datenbank wohl unterschätzt. Sollen wir mal eine Engpassanalyse mit den Live-Daten (natürlich anonymisiert) machen?', en: 'Probably because we don\'t test with real load spikes there. We probably underestimated the capacity of the test database. Should we run a bottleneck analysis with the live data (anonymized, of course)?' },
      { speaker: 'Lukas', de: 'Gute Idee, aber wir müssen vorsichtig sein. Wenn wir jetzt im Live-System rumfummeln, könnten wir schlafende Hunde wecken. Erinnere dich an das letzte Mal, als wir die Config im laufenden Betrieb geändert haben – das war ein böses Erwachen für alle.', en: 'Good idea, but we need to be careful. If we start poking around in the live system now, we might wake sleeping dogs. Remember last time we changed the config in production — that was a rude awakening for everyone.' },
      { speaker: 'Marco', de: 'Stimmt, das war ein Desaster. Aber wir können jetzt nicht einfach ein Auge zudrücken und hoffen, dass es keiner merkt. Wenn die Kunden nicht bezahlen können, wird der Chef heute Nachmittag an die Decke gehen.', en: 'True, that was a disaster. But we can\'t just turn a blind eye and hope nobody notices. If customers can\'t pay, the boss is going to hit the ceiling this afternoon.' },
      { speaker: 'Lukas', de: 'Definitiv. Okay, lass uns Nägel mit Köpfen machen. Ich ziehe mir den aktuellen Stand und schaue mir die Datenbank-Locks an. Kannst du derweil die Redundanz der Worker-Knoten prüfen? Vielleicht können wir die Last besser verteilen, um das Risiko zu minimieren.', en: 'Definitely. Okay, let\'s get down to brass tacks. I\'ll pull the current state and look at the database locks. In the meantime, can you check the redundancy of the worker nodes? Maybe we can distribute the load better to minimize the risk.' },
      { speaker: 'Marco', de: 'Mach ich. Aber Lukas, ganz ehrlich: Meinst du, das Refactoring war zu kurz gedacht? Vielleicht hätten wir erst die Altlasten im Code-Base beseitigen sollen, bevor wir die neue Validierung implementieren.', en: 'On it. But Lukas, honestly: do you think the refactoring was too short-sighted? Maybe we should have cleaned up the legacy debt in the codebase first before implementing the new validation.' },
      { speaker: 'Lukas', de: 'Hinterher ist man immer schlauer. Wir schleppen diese Altlasten schon seit zwei Jahren mit uns herum. Es war klar, dass uns das irgendwann mal einen Strich durch die Rechnung macht. Aber jetzt müssen wir erst mal den Karren aus dem Dreck ziehen.', en: 'Hindsight is 20/20. We\'ve been dragging this legacy debt around for two years. It was clear that it would come back to bite us at some point. But right now we need to pull the cart out of the mud first.' },
      { speaker: 'Marco', de: 'Okay, ich sehe gerade was in den Logs... Warte mal. Da wird ein Timeout geworfen, weil die Firewall die Verbindung zum Provider kappt. Das liegt gar nicht am Code!', en: 'Okay, I\'m seeing something in the logs... Wait a second. There\'s a timeout being thrown because the firewall is cutting the connection to the provider. It\'s not the code at all!' },
      { speaker: 'Lukas', de: 'Ernsthaft? Dann haben wir die ganze Zeit an der falschen Stelle gesucht? Da haben wir wohl beide den Wald vor lauter Bäumen nicht gesehen.', en: 'Seriously? Then we\'ve been looking in the wrong place the whole time? Looks like we both couldn\'t see the forest for the trees.' },
      { speaker: 'Marco', de: 'Sieht so aus. Das ist wieder so ein typisches zweischneidiges Schwert: Wir optimieren den Code, aber die Infrastruktur ist der eigentliche Flaschenhals.', en: 'Looks that way. This is another classic double-edged sword: we optimize the code, but the infrastructure is the actual bottleneck.' },
      { speaker: 'Lukas', de: 'Wahnsinn. Okay, ich kontaktiere sofort die Ops-Jungs. Wir müssen eine Entscheidung herbeiführen, ob wir das Deployment vertagen oder ob sie den Port schnell freischalten können.', en: 'Unbelievable. Okay, I\'m contacting the ops guys immediately. We need to reach a decision on whether we postpone the deployment or whether they can open the port quickly.' },
      { speaker: 'Marco', de: 'Hoffentlich klappt das. Ich habe keine Lust, das ganze Wochenende in die Bresche zu springen, nur weil die Firewall-Regeln nicht stimmen.', en: 'Hopefully that works out. I really don\'t feel like stepping into the breach all weekend just because the firewall rules are wrong.' },
      { speaker: 'Lukas', de: 'Ich auch nicht. Halt mich auf dem Laufenden. Ich gehe jetzt mal rüber in den Ops-Channel und schaue, ob ich dort jemanden erreiche. Wenn die nicht kooperieren, muss ich wohl ein Machtwort sprechen.', en: 'Me neither. Keep me in the loop. I\'m heading over to the ops channel to see if I can reach someone. If they don\'t cooperate, I\'ll have to put my foot down.' },
    ],
  },
  {
    id: 'slack-pre-demo',
    title_de: 'Die Pre-Demo-Krise',
    title_en: 'The Pre-Demo Crisis',
    description_de: 'Channel #project-apollo — 60 Minuten vor dem Sprint Review mit dem CEO',
    description_en: 'Channel #project-apollo — 60 minutes before the Sprint Review with the CEO',
    category: 'slack',
    context_de: 'Channel #project-apollo. 60 Minuten vor dem Sprint Review mit dem CEO. Teilnehmer: Sarah (PO), Jan (UX Designer), Katja (QA Lead), Lukas (Senior Dev).',
    context_en: 'Channel #project-apollo. 60 minutes before the Sprint Review with the CEO. Participants: Sarah (PO), Jan (UX Designer), Katja (QA Lead), Lukas (Senior Dev).',
    speakers: [
      { name: 'Sarah', role: 'PO' },
      { name: 'Jan', role: 'UX Designer' },
      { name: 'Lukas', role: 'Senior Dev' },
      { name: 'Katja', role: 'QA Lead' },
    ],
    lines: [
      { speaker: 'Sarah', de: '@here Leute, ich brauche mal kurz eure volle Aufmerksamkeit. Ich habe gerade die Demo-Umgebung für den CEO-Call vorbereitet und die neue Filter-Funktion getestet. Warum werden die Suchergebnisse erst nach 10 Sekunden geladen? Das können wir so unmöglich präsentieren.', en: '@here Folks, I need your full attention for a moment. I just set up the demo environment for the CEO call and tested the new filter feature. Why are the search results taking 10 seconds to load? There\'s absolutely no way we can present it like this.' },
      { speaker: 'Jan', de: 'Zehn Sekunden?! Das ist für die User Experience absolut tödlich. Wir haben im Workshop so viel Wert auf Performance gelegt. Wenn das so langsam ist, hat das ganze Feature keinen Mehrwert mehr.', en: 'Ten seconds?! That\'s absolutely fatal for the user experience. We put so much emphasis on performance in the workshop. If it\'s this slow, the whole feature has no added value anymore.' },
      { speaker: 'Lukas', de: 'Moment mal, jetzt lasst uns bitte die Kirche im Dorf lassen. Wir haben gestern erst die kompletten Produktdaten importiert. Die Datenbank-Indizes müssen erst noch neu aufgebaut werden. Das ist kein Bug, das ist ein Prozess.', en: 'Hold on, let\'s not blow this out of proportion. We only imported the full product data yesterday. The database indexes still need to be rebuilt. This isn\'t a bug, it\'s a process.' },
      { speaker: 'Katja', de: 'Lukas, ich muss dir da leider widersprechen. Ich habe das heute Morgen schon gemeldet. Die Indizes sind da, aber die Query ist einfach extrem ineffizient. Wir haben da ein Problem mit der Komplexität der Joins. Das wird bei steigenden Nutzerzahlen nicht skalieren.', en: 'Lukas, I\'m afraid I have to disagree with you there. I already reported this this morning. The indexes are there, but the query is just extremely inefficient. We have a problem with the complexity of the joins. This won\'t scale with growing user numbers.' },
      { speaker: 'Sarah', de: 'Katja hat recht. Wir können dem CEO nicht sagen: „Warten Sie kurz, die Datenbank baut sich gerade auf." Er will sehen, wie schnell unsere Lösung ist. Lukas, was können wir tun? Kannst du das Quick-and-Dirty für die Demo fixen?', en: 'Katja is right. We can\'t tell the CEO: "Just wait a moment, the database is still building up." He wants to see how fast our solution is. Lukas, what can we do? Can you do a quick-and-dirty fix for the demo?' },
      { speaker: 'Lukas', de: 'Ich habe echt Bauchschmerzen bei „Quick-and-Dirty". Das rächt sich später immer. Aber wenn es nur für die Demo ist... Wir könnten das Caching für diese eine Query hart erzwingen. Aber das ist keine nachhaltige Lösung, das ist nur Schall und Rauch.', en: 'I really have a bad feeling about "quick-and-dirty." That always comes back to haunt you. But if it\'s only for the demo... we could hard-force the caching for this one query. But that\'s not a sustainable solution, that\'s just smoke and mirrors.' },
      { speaker: 'Jan', de: 'Aber ganz ehrlich, Lukas: Wenn die Demo crasht, ist die langfristige Lösung auch egal, weil das Projekt dann eingestampft wird. Wir müssen jetzt an einem Strang ziehen, um den Go-Live nicht zu gefährden.', en: 'But honestly, Lukas: if the demo crashes, the long-term solution won\'t matter either, because the project will get killed. We need to pull together now to not jeopardize the go-live.' },
      { speaker: 'Katja', de: 'Ich sehe das auch so. Aber wir müssen das Risiko validieren. Wenn wir jetzt hektisch am Code rumschrauben, bauen wir uns vielleicht neue Sicherheitslücken ein. Ich müsste das danach auf jeden Fall noch mal auf Herz und Nieren prüfen.', en: 'I see it the same way. But we need to validate the risk. If we start frantically tinkering with the code, we might introduce new security vulnerabilities. I\'d definitely need to put it through its paces afterward.' },
      { speaker: 'Sarah', de: 'Lukas, wie lange brauchst du für einen Workaround? Wir müssen jetzt Nägel mit Köpfen machen. Der Call startet in 45 Minuten.', en: 'Lukas, how long do you need for a workaround? We need to get down to brass tacks. The call starts in 45 minutes.' },
      { speaker: 'Lukas', de: 'Wenn alles glattläuft, brauche ich 20 Minuten für den Fix und das Deployment. Aber ich brauche jemanden, der mir den Rücken freihält. Jan, kannst du die neuen Assets für die Startseite noch mal prüfen? Die scheinen auch extrem groß zu sein und bremsen den ersten Page-Load.', en: 'If everything goes smoothly, I need 20 minutes for the fix and deployment. But I need someone to have my back. Jan, can you check the new assets for the homepage again? They seem to be extremely large too and are slowing down the initial page load.' },
      { speaker: 'Jan', de: 'Oh, das ist mein Fehler. Ich habe die hochauflösenden PNGs hochgeladen. Ich werde die sofort optimieren und durch WebP-Dateien ersetzen. Da bin ich wohl ein bisschen über das Ziel hinausgeschossen.', en: 'Oh, that\'s my fault. I uploaded the high-resolution PNGs. I\'ll optimize them immediately and replace them with WebP files. I guess I overshot the mark a bit there.' },
      { speaker: 'Sarah', de: 'Gut. Dann haben wir einen Plan. Lukas fixt die Query, Jan optimiert die Bilder und Katja macht einen schnellen Sanity-Check auf der Staging-Umgebung.', en: 'Good. Then we have a plan. Lukas fixes the query, Jan optimizes the images, and Katja does a quick sanity check on the staging environment.' },
      { speaker: 'Katja', de: 'Alles klar. Ich habe aber noch einen Einwand: Was ist mit der mobilen Ansicht? Da hat der Filter vorhin auch gezickt.', en: 'Got it. But I still have one objection: what about the mobile view? The filter was acting up there earlier too.' },
      { speaker: 'Lukas', de: 'Eins nach dem anderen, Katja! Wir können nicht alle Fliegen mit einer Klappe schlagen. Fokus auf die Desktop-Demo für den CEO. Das Mobile-Thema schieben wir auf den Themenparkplatz für die Retro am Freitag.', en: 'One thing at a time, Katja! We can\'t kill all flies with one swat. Focus on the desktop demo for the CEO. We\'ll put the mobile topic in the parking lot for Friday\'s retro.' },
      { speaker: 'Sarah', de: 'Einverstanden. Lukas, gib Gas. Wenn du das hinkriegst, hast du bei mir echt einen Stein im Brett.', en: 'Agreed. Lukas, step on it. If you pull this off, you\'ll really be in my good books.' },
      { speaker: 'Jan', de: 'Ich bin schon dabei, die Bilder zu komprimieren. In 5 Minuten sind sie im Repo.', en: 'I\'m already on it, compressing the images. They\'ll be in the repo in 5 minutes.' },
      { speaker: 'Lukas', de: 'Alles klar. Ich bin jetzt im Tunnel. Ich melde mich, sobald der Fix eingespielt ist. Katja, halt dich bereit für den Test.', en: 'All right. I\'m in the zone now. I\'ll report back as soon as the fix is deployed. Katja, stand by for the test.' },
      { speaker: 'Katja', de: 'Bin auf Standby. Ich werde die Performance genau im Auge behalten.', en: 'I\'m on standby. I\'ll be keeping a close eye on the performance.' },
      { speaker: 'Sarah', de: 'Danke euch allen. Ich wusste, dass ich mich auf euch verlassen kann, wenn es brennt. Jetzt ziehen wir den Karren aus dem Dreck!', en: 'Thanks, everyone. I knew I could count on you when the heat is on. Now let\'s pull the cart out of the mud!' },
    ],
  },
];
