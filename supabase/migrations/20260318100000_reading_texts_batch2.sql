-- ============================================================
-- Reading Texts Batch 2 — 20 new C1-level texts
-- 7 Textrekonstruktion + 5 Selektives Verstehen + 8 Detailverstehen
-- Topics from Gemini list: Education, Work, Environment, Media/Culture
-- ============================================================

-- ============================================================
-- TEXTREKONSTRUKTION (7 texts)
-- ============================================================

INSERT INTO reading_texts (title_de, title_en, text_content, text_type, exam_format, level, word_count, estimated_minutes, questions, sort_order) VALUES

-- TR 1: Digitalisierung in der Bildung
('Digitalisierung in der Bildung — Chance oder Risiko?', 'Digitalization in Education — Opportunity or Risk?',
'Die Corona-Pandemie hat die Schulen in Deutschland einem Stresstest unterzogen, den viele nicht bestanden haben. Innerhalb weniger Wochen musste der Unterricht auf digitale Formate umgestellt werden — mit teils katastrophalen Ergebnissen. [___1___] Die Kluft zwischen gut ausgestatteten Gymnasien in wohlhabenden Stadtteilen und unterfinanzierten Grundschulen in Brennpunktvierteln wurde schlagartig sichtbar.

Dabei ist die Idee des digitalen Lernens keineswegs neu. Länder wie Estland oder Finnland setzen seit über einem Jahrzehnt konsequent auf digitale Bildungskonzepte. [___2___] In Deutschland hingegen scheiterte die Umsetzung jahrelang an föderalen Zuständigkeiten, bürokratischen Hürden und einer weit verbreiteten Skepsis gegenüber neuen Technologien im Klassenzimmer.

Befürworter der Digitalisierung argumentieren, dass interaktive Lernplattformen den Unterricht individueller gestalten können. [___3___] Algorithmen erkennen Wissenslücken und schlagen gezielt Übungen vor, die genau zum Leistungsstand des jeweiligen Schülers passen.

Kritiker hingegen warnen vor den Schattenseiten. Die Bildungsforscherin Prof. Dr. Maja Kessler von der Universität Heidelberg betont: „Digitale Medien können den persönlichen Kontakt zwischen Lehrkraft und Schüler nicht ersetzen." [___4___] Insbesondere jüngere Kinder bräuchten die direkte menschliche Interaktion, um soziale Kompetenzen und emotionale Intelligenz zu entwickeln.

Ein weiteres Problem ist die Frage der Datensicherheit. [___5___] Elternverbände fordern strenge Datenschutzrichtlinien und Transparenz darüber, welche Informationen über Schülerinnen und Schüler gespeichert und ausgewertet werden.

Einig sind sich beide Seiten darin, dass die Lehrerausbildung modernisiert werden muss. [___6___] Nur wenn Lehrkräfte digitale Werkzeuge kompetent einsetzen können, wird die Digitalisierung der Bildung gelingen — und zwar als Ergänzung, nicht als Ersatz für guten Unterricht.',
'textrekonstruktion', 'telc', 'c1', 480, 20,
'{"gaps": 6, "options": [
  {"id": "a", "text": "Wenn Lernplattformen detaillierte Profile über das Lernverhalten von Minderjährigen erstellen, wirft das erhebliche datenschutzrechtliche Fragen auf."},
  {"id": "b", "text": "Anstatt Bildschirmzeit zu erhöhen, sollten Schulen wieder mehr auf Frontalunterricht und klassische Lehrmethoden setzen."},
  {"id": "c", "text": "Dort gehören Tablets und digitale Lernplattformen seit Langem zum Schulalltag, und die Ergebnisse in internationalen Vergleichsstudien sprechen für sich."},
  {"id": "d", "text": "Fehlende Endgeräte, instabile Internetverbindungen und überforderte Lehrkräfte prägten den Distanzunterricht an vielen Schulen."},
  {"id": "e", "text": "Gerade die Beziehungsarbeit — das Erkennen von Unsicherheiten, das motivierende Gespräch in der Pause — gelingt über einen Bildschirm nur unzureichend."},
  {"id": "f", "text": "Adaptive Lernsysteme passen sich dem Tempo und den Stärken jedes einzelnen Lernenden an und ermöglichen so eine echte Differenzierung im Unterricht."},
  {"id": "g", "text": "Bislang spielen digitale Kompetenzen im Lehramtsstudium eine untergeordnete Rolle — ein Zustand, den Experten als unhaltbar bezeichnen."},
  {"id": "h", "text": "Die meisten Schülerinnen und Schüler bevorzugen nach wie vor den klassischen Unterricht mit Tafel und Kreide."}
], "correct": {"1": "d", "2": "c", "3": "f", "4": "e", "5": "a", "6": "g"}}',
21),

-- TR 2: Work-Life-Balance / 4-Tage-Woche
('Die Vier-Tage-Woche — Utopie oder Zukunftsmodell?', 'The Four-Day Work Week — Utopia or Future Model?',
'Die Idee einer Vier-Tage-Woche elektrisiert die Arbeitswelt. Was vor wenigen Jahren noch als unrealistische Forderung abgetan wurde, wird inzwischen in mehreren Ländern erprobt — mit überraschend positiven Ergebnissen. [___1___] Die Produktivität blieb konstant oder stieg sogar, während Krankmeldungen und Kündigungsraten deutlich zurückgingen.

In Deutschland reagieren Arbeitgeber bislang zurückhaltend. Der Bundesverband der Deutschen Industrie warnt vor Wettbewerbsnachteilen, insbesondere in Branchen mit Fachkräftemangel. [___2___] Wenn dieselbe Arbeit in weniger Zeit erledigt werden müsse, steige der Druck auf die Beschäftigten — das Gegenteil von dem, was die Vier-Tage-Woche verspreche.

Gewerkschaften und Arbeitspsychologen halten dagegen. [___3___] Studien zeigten, dass ein Großteil der Arbeitszeit in Bürojobs durch ineffiziente Meetings, Ablenkungen und unnötige Verwaltungsaufgaben verschwendet werde. Eine Verdichtung auf vier Tage zwinge Unternehmen, ihre Prozesse zu überdenken.

Ein differenzierteres Bild ergibt sich bei genauerer Betrachtung einzelner Branchen. [___4___] In der Pflege, im Handwerk oder im Einzelhandel lässt sich die Arbeitszeit nicht einfach komprimieren, ohne dass zusätzliches Personal eingestellt wird — was die Kosten erhöht.

Die gesellschaftlichen Auswirkungen könnten jedoch weitreichend sein. Ein zusätzlicher freier Tag pro Woche ermöglicht mehr Zeit für Familie, Ehrenamt und persönliche Weiterbildung. [___5___] Auch die Gleichstellung könnte profitieren: Wenn beide Partner mehr Zeit für Care-Arbeit haben, verteilen sich Haushalt und Kinderbetreuung gerechter.

Die Debatte zeigt, dass die Frage nicht lautet, ob wir weniger arbeiten werden, sondern wie. [___6___] Die Herausforderung besteht darin, ein Modell zu finden, das sowohl die Bedürfnisse der Beschäftigten als auch die wirtschaftliche Leistungsfähigkeit berücksichtigt.',
'textrekonstruktion', 'telc', 'c1', 470, 20,
'{"gaps": 6, "options": [
  {"id": "a", "text": "Für Bürojobs und wissensbasierte Tätigkeiten funktioniert das Modell deutlich besser als für Berufe, die physische Anwesenheit erfordern."},
  {"id": "b", "text": "Verschiedene Pilotprojekte werden zeigen müssen, welche Arbeitszeitmodelle für welche Branchen und Unternehmensgrößen tatsächlich tragfähig sind."},
  {"id": "c", "text": "Das größte Pilotprojekt in Großbritannien mit über 60 teilnehmenden Unternehmen lieferte 2023 beeindruckende Daten."},
  {"id": "d", "text": "Die meisten Arbeitnehmer in Deutschland lehnen die Vier-Tage-Woche ab, weil sie Gehaltseinbußen befürchten."},
  {"id": "e", "text": "Auch die Kritik an einer möglichen Arbeitsverdichtung ist nicht unbegründet."},
  {"id": "f", "text": "Pendler würden zudem einen Tag weniger im Berufsverkehr verbringen, was den CO₂-Ausstoß messbar senken könnte."},
  {"id": "g", "text": "Sie argumentieren, dass nicht die Anzahl der Arbeitsstunden entscheidend sei, sondern deren Qualität."},
  {"id": "h", "text": "In skandinavischen Ländern ist die Vier-Tage-Woche bereits flächendeckend eingeführt worden."}
], "correct": {"1": "c", "2": "e", "3": "g", "4": "a", "5": "f", "6": "b"}}',
22),

-- TR 3: Bedingungsloses Grundeinkommen
('Bedingungsloses Grundeinkommen — Freiheit oder Faulheit?', 'Universal Basic Income — Freedom or Laziness?',
'Kaum eine sozialpolitische Idee wird so kontrovers diskutiert wie das bedingungslose Grundeinkommen (BGE). Jeder Bürger soll demnach einen festen monatlichen Betrag vom Staat erhalten — ohne Gegenleistung und unabhängig davon, ob er arbeitet oder nicht. [___1___] Sie reichen von der Beseitigung von Altersarmut bis hin zur Förderung von Kreativität und unternehmerischem Mut.

In Finnland wurde zwischen 2017 und 2018 ein vielbeachtetes Experiment durchgeführt: 2.000 zufällig ausgewählte Arbeitslose erhielten zwei Jahre lang 560 Euro monatlich ohne Bedingungen. [___2___] Die Teilnehmenden berichteten von weniger Stress, besserem Gesundheitszustand und höherem Vertrauen in die Zukunft — arbeiteten aber nicht mehr als die Kontrollgruppe.

In Deutschland startete 2021 das Projekt „Mein Grundeinkommen", bei dem 122 Personen drei Jahre lang 1.200 Euro monatlich erhielten. [___3___] Die wissenschaftliche Auswertung durch das Deutsche Institut für Wirtschaftsforschung läuft noch, aber erste Zwischenergebnisse deuten in eine ähnliche Richtung wie in Finnland.

Kritiker befürchten, dass ein BGE den Anreiz zur Arbeit zerstöre. Der Ökonom Prof. Dr. Markus Henkel argumentiert: „Warum sollte jemand einen anstrengenden Job annehmen, wenn der Staat ohnehin zahlt?" [___4___] Die meisten Menschen arbeiteten nicht nur des Geldes wegen, sondern auch wegen sozialer Kontakte, Anerkennung und Selbstverwirklichung.

Die Finanzierung bleibt die größte Hürde. Ein BGE von 1.200 Euro für alle 84 Millionen Einwohner Deutschlands würde jährlich über eine Billion Euro kosten. [___5___] Befürworter entgegnen, dass durch den Wegfall bestehender Sozialleistungen und den damit verbundenen Bürokratieabbau erhebliche Einsparungen möglich wären.

Die Debatte um das BGE ist letztlich eine Debatte über unser Menschenbild. [___6___] Die Antwort auf diese Frage wird bestimmen, welche Sozialpolitik wir als Gesellschaft wollen.',
'textrekonstruktion', 'telc', 'c1', 490, 20,
'{"gaps": 6, "options": [
  {"id": "a", "text": "Befürworter des BGE verweisen hingegen auf die psychologische Forschung, die diesem Einwand widerspricht."},
  {"id": "b", "text": "Die Ergebnisse waren ambivalent, aber aufschlussreich."},
  {"id": "c", "text": "Glauben wir, dass Menschen von Natur aus faul sind und nur unter Druck arbeiten — oder dass sie einen inneren Antrieb haben, etwas Sinnvolles zu tun?"},
  {"id": "d", "text": "Die Versprechen der Befürworter sind vielfältig und klingen verlockend."},
  {"id": "e", "text": "Selbst bei einer Gegenfinanzierung durch höhere Steuern wäre die fiskalische Belastung enorm."},
  {"id": "f", "text": "Die Studie wurde begleitet von einem Forschungsteam des DIW Berlin und umfasste sowohl quantitative als auch qualitative Erhebungen."},
  {"id": "g", "text": "In der Schweiz wurde 2016 in einer Volksabstimmung über die Einführung eines BGE abgestimmt — 77 Prozent lehnten den Vorschlag ab."},
  {"id": "h", "text": "Alle bisherigen Experimente weltweit haben gezeigt, dass ein BGE die Arbeitsmotivation vollständig zerstört."}
], "correct": {"1": "d", "2": "b", "3": "f", "4": "a", "5": "e", "6": "c"}}',
23),

-- TR 4: Nachhaltiger Konsum
('Kann individuelles Handeln das Klima retten?', 'Can Individual Action Save the Climate?',
'Die Frage, ob persönliche Konsumentscheidungen einen echten Unterschied im Kampf gegen den Klimawandel machen können, spaltet die Umweltbewegung. Auf der einen Seite stehen diejenigen, die an die Macht des Einzelnen glauben: Weniger Fleisch essen, seltener fliegen, Strom sparen. [___1___] Der ökologische Fußabdruck — ein Konzept, das ursprünglich vom Ölkonzern BP populär gemacht wurde — lenke die Verantwortung gezielt von den Verursachern auf die Verbraucher.

Die Zahlen sind tatsächlich ernüchternd. Selbst wenn alle 84 Millionen Deutschen ihren persönlichen CO₂-Ausstoß auf null senkten, würde das den globalen Ausstoß nur um etwa zwei Prozent reduzieren. [___2___] 100 Unternehmen sind für 71 Prozent der weltweiten industriellen Treibhausgasemissionen verantwortlich.

Dennoch wäre es falsch, individuelles Handeln als bedeutungslos abzutun. Die Umweltpsychologin Dr. Lena Schröder betont den sogenannten Spillover-Effekt: [___3___] Wer einmal anfängt, bewusster zu konsumieren, hinterfragt auch andere Gewohnheiten — und wird politisch aktiver.

Auch die Marktdynamik spielt eine Rolle. Der rasante Anstieg pflanzlicher Milchalternativen zeigt, wie veränderte Nachfrage ganze Industrien transformieren kann. [___4___] Die Lebensmittelindustrie reagiert auf Konsumentenverhalten — langsam, aber messbar.

Die Wahrheit liegt vermutlich in der Mitte. Individuelle Verhaltensänderungen allein werden die Klimakrise nicht lösen. [___5___] Politisches Engagement, Wahlentscheidungen und öffentlicher Druck auf Unternehmen sind mindestens ebenso wichtig wie der Verzicht auf das Steak.

Die eigentliche Gefahr besteht darin, dass individuelle Maßnahmen als Alibi dienen — als Ersatz für die notwendigen strukturellen Veränderungen. [___6___] Die Frage sollte nicht lauten: „Was kann ich persönlich tun?", sondern: „Was kann ich tun, damit sich das System ändert?"',
'textrekonstruktion', 'telc', 'c1', 460, 20,
'{"gaps": 6, "options": [
  {"id": "a", "text": "Auf der anderen Seite stehen Kritiker, die diese Appelle an das individuelle Gewissen für eine gefährliche Ablenkung halten."},
  {"id": "b", "text": "Wer sich gut fühlt, weil er Bio-Gemüse kauft, vergisst vielleicht, dass die eigentlichen Hebel in der Politik und der Industrie liegen."},
  {"id": "c", "text": "Persönliche Veränderungen können eine katalytische Wirkung haben, die weit über den unmittelbaren ökologischen Nutzen hinausgeht."},
  {"id": "d", "text": "Aber sie können den Boden bereiten für ein gesellschaftliches Umdenken, das strukturelle Reformen erst möglich macht."},
  {"id": "e", "text": "Hafer-, Soja- und Mandeldrinks machen inzwischen über 15 Prozent des gesamten Milchmarkts in Deutschland aus."},
  {"id": "f", "text": "Die Hauptverantwortung liegt bei den großen Emittenten aus Industrie und Energiewirtschaft."},
  {"id": "g", "text": "Jeder Mensch sollte täglich seinen persönlichen CO₂-Ausstoß berechnen und dokumentieren."},
  {"id": "h", "text": "Die meisten Umweltorganisationen lehnen individuelle Maßnahmen inzwischen vollständig ab."}
], "correct": {"1": "a", "2": "f", "3": "c", "4": "e", "5": "d", "6": "b"}}',
24),

-- TR 5: Fake News und Desinformation
('Fake News — Gefahr für die Demokratie', 'Fake News — A Threat to Democracy',
'Falschinformationen sind kein neues Phänomen. Propaganda, Gerüchte und gezielte Desinformation hat es zu allen Zeiten gegeben. Was sich verändert hat, ist die Geschwindigkeit, mit der sich falsche Nachrichten heute verbreiten. [___1___] Ein einziger viraler Tweet kann innerhalb von Stunden Millionen Menschen erreichen — und Faktenprüfer kommen kaum hinterher.

Die Mechanismen sozialer Medien begünstigen die Verbreitung von Falschinformationen. Algorithmen belohnen emotionale und polarisierende Inhalte, weil diese mehr Engagement erzeugen. [___2___] Nutzer werden in sogenannte Filterblasen eingeschlossen, in denen sie vorwiegend Informationen sehen, die ihre bestehende Meinung bestätigen.

Besonders problematisch wird es im Kontext von Wahlen. Die Politologin Prof. Dr. Sabine Wegner von der Freien Universität Berlin warnt: „Gezielte Desinformationskampagnen können das Vertrauen in demokratische Institutionen systematisch untergraben." [___3___] Vor den Bundestagswahlen 2025 identifizierten Fact-Checking-Organisationen über 800 nachweislich falsche oder irreführende Behauptungen in sozialen Netzwerken.

Doch wie können sich Bürgerinnen und Bürger schützen? Medienpädagogen empfehlen die sogenannte CRAAP-Methode: Prüfe die Aktualität, Relevanz, Autorität, Genauigkeit und den Zweck einer Information, bevor du sie glaubst oder teilst. [___4___] Eine gesunde Portion Skepsis ist im digitalen Zeitalter eine unverzichtbare Bürgerkompetenz.

Auch die Politik ist gefordert. Die EU hat mit dem Digital Services Act einen Rechtsrahmen geschaffen, der Plattformen stärker in die Pflicht nimmt. [___5___] Kritiker befürchten jedoch, dass zu strenge Regulierung die Meinungsfreiheit einschränken könnte.

Die Lösung wird letztlich in einer Kombination aus Bildung, Regulierung und technologischen Innovationen liegen. [___6___] Denn eine Demokratie kann nur funktionieren, wenn die Bürger in der Lage sind, informierte Entscheidungen zu treffen.',
'textrekonstruktion', 'telc', 'c1', 470, 20,
'{"gaps": 6, "options": [
  {"id": "a", "text": "Soziale Netzwerke müssen Falschinformationen schneller löschen und transparenter über ihre Algorithmen informieren."},
  {"id": "b", "text": "Über soziale Medien erreichen Falschmeldungen in Sekunden ein globales Publikum, noch bevor eine Richtigstellung möglich ist."},
  {"id": "c", "text": "Darüber hinaus hilft der Vergleich mehrerer unabhängiger Quellen, die Glaubwürdigkeit einer Nachricht einzuschätzen."},
  {"id": "d", "text": "Medienkompetenz sollte daher als Pflichtfach in den Schulunterricht aufgenommen werden."},
  {"id": "e", "text": "Empörung und Angst verbreiten sich schneller als nüchterne Fakten — ein Phänomen, das Psychologen als Emotional Contagion bezeichnen."},
  {"id": "f", "text": "Dies wurde bei Wahlen in mehreren europäischen Ländern bereits dokumentiert."},
  {"id": "g", "text": "Die meisten Menschen können Fake News zuverlässig erkennen und lassen sich davon nicht beeinflussen."},
  {"id": "h", "text": "Traditionelle Medien wie Zeitungen und öffentlich-rechtlicher Rundfunk spielen in der Informationsversorgung keine Rolle mehr."}
], "correct": {"1": "b", "2": "e", "3": "f", "4": "c", "5": "a", "6": "d"}}',
25),

-- TR 6: Massentourismus
('Massentourismus — Segen oder Fluch für beliebte Reiseziele?', 'Mass Tourism — Blessing or Curse for Popular Destinations?',
'Barcelona, Venedig, Dubrovnik — immer mehr Städte und Regionen ächzen unter dem Ansturm der Touristen. Der Begriff „Overtourism" beschreibt ein Phänomen, das weltweit an Brisanz gewinnt. [___1___] Anwohner klagen über Lärm, steigende Mieten und die Verdrängung lokaler Geschäfte durch Souvenirshops und Fast-Food-Ketten.

Die Zahlen sind beeindruckend: 2024 verzeichnete die Welttourismusorganisation erstmals wieder 1,5 Milliarden internationale Reisen — Tendenz steigend. [___2___] Billigfluglinien, Online-Buchungsplattformen und soziale Medien, die bestimmte Orte durch virale Fotos zu „Must-See-Destinationen" machen, haben Reisen demokratisiert — aber auch dessen Schattenseiten verschärft.

Die ökologischen Folgen sind erheblich. Der Tourismus verursacht etwa acht Prozent der globalen CO₂-Emissionen. [___3___] In Küstenregionen führt die Übernutzung zu Korallensterben, Wasserknappheit und Müllproblemen, die die lokale Infrastruktur überfordern.

Einige Städte haben begonnen, drastische Maßnahmen zu ergreifen. Venedig verlangt seit 2024 eine Eintrittsgebühr für Tagesbesucher. Amsterdam hat die Werbung für Tourismus eingestellt und die Zahl der Hotelzimmer gedeckelt. [___4___] Diese Maßnahmen stoßen in der Tourismusbranche auf Widerstand, werden von der lokalen Bevölkerung aber überwiegend begrüßt.

Nachhaltigerer Tourismus ist möglich, erfordert aber ein Umdenken auf allen Seiten. [___5___] Anstatt in drei Tagen sechs Sehenswürdigkeiten abzuhaken, sollten Reisende sich Zeit nehmen, einen Ort wirklich kennenzulernen — abseits der ausgetretenen Pfade.

Die zentrale Frage lautet: Wie viel Tourismus verträgt ein Ort? [___6___] Denn wenn ein Reiseziel durch den Tourismus seine Identität verliert, verliert es letztlich auch seine Attraktivität.',
'textrekonstruktion', 'telc', 'c1', 460, 20,
'{"gaps": 6, "options": [
  {"id": "a", "text": "Die Antwort darauf muss jede Destination für sich selbst finden — unter Einbeziehung der lokalen Bevölkerung, nicht allein der Tourismusindustrie."},
  {"id": "b", "text": "In Mallorca haben Bewohner wiederholt gegen die Touristenflut demonstriert, und in Dubrovnik wird die Zahl der Kreuzfahrtschiffe streng begrenzt."},
  {"id": "c", "text": "Reisende können einen Beitrag leisten, indem sie bewusster reisen: in der Nebensaison, mit der Bahn statt dem Flugzeug, und in lokalen Unterkünften statt in internationalen Hotelketten."},
  {"id": "d", "text": "Insbesondere der Flugverkehr — der am schnellsten wachsende Verkehrssektor — trägt überproportional zur Erderwärmung bei."},
  {"id": "e", "text": "Besonders betroffen sind historische Innenstädte und Küstenregionen, die für die Besuchermassen schlicht nicht ausgelegt sind."},
  {"id": "f", "text": "Der rasante Anstieg ist auf mehrere Faktoren zurückzuführen."},
  {"id": "g", "text": "Tourismus ist für viele Länder die wichtigste Einnahmequelle und darf unter keinen Umständen eingeschränkt werden."},
  {"id": "h", "text": "Die meisten Touristen verhalten sich respektvoll und hinterlassen keine negativen Spuren an ihrem Reiseziel."}
], "correct": {"1": "e", "2": "f", "3": "d", "4": "b", "5": "c", "6": "a"}}',
26),

-- TR 7: Gendern und Sprachwandel
('Gendern — Sprachgerechtigkeit oder Sprachverhunzung?', 'Gender-Neutral Language — Linguistic Justice or Linguistic Abuse?',
'Kaum ein sprachpolitisches Thema wird in Deutschland so leidenschaftlich diskutiert wie das Gendern. Sternchen, Doppelpunkt, Unterstrich oder Beidnennung — die Möglichkeiten, geschlechtergerechte Sprache umzusetzen, sind vielfältig. [___1___] Befürworter sehen darin einen überfälligen Schritt zur Gleichstellung, Gegner eine ideologisch motivierte Verunstaltung der deutschen Sprache.

Die linguistische Forschung liefert durchaus Argumente für gendergerechte Sprache. Studien der Freien Universität Berlin zeigen, dass Menschen beim generischen Maskulinum — etwa „die Ärzte" — tatsächlich eher an Männer denken. [___2___] Wenn stattdessen von „Ärztinnen und Ärzten" die Rede ist, stellen sich Versuchspersonen eine deutlich ausgeglichenere Geschlechterverteilung vor.

Gegner halten dagegen, dass das generische Maskulinum eine grammatische Form sei, keine biologische Aussage. Der Germanist Prof. Dr. Klaus Wirth argumentiert: „Sprache ist ein gewachsenes System. Man kann sie nicht per Dekret ändern, ohne Akzeptanz und Lesbarkeit zu gefährden." [___3___] Gerade in offiziellen Texten — Gesetzen, Formularen, Nachrichten — führten Genderformen zu unnötiger Komplexität.

In der Praxis zeigt sich ein pragmatischer Umgang. [___4___] Medien, Universitäten und Unternehmen haben jeweils eigene Richtlinien entwickelt, die von striktem Gendern bis zur Empfehlung neutraler Formulierungen reichen.

Interessant ist der Blick auf andere Sprachen. Im Englischen hat sich das singuläre „they" als geschlechtsneutrales Pronomen weitgehend durchgesetzt. Im Schwedischen wurde 2015 das neutrale Pronomen „hen" offiziell anerkannt. [___5___] Die morphologische Komplexität des Deutschen — mit seinen drei Genera und umfangreichen Deklinationen — macht eine elegante Lösung deutlich schwieriger.

Unabhängig von der eigenen Position zeigt die Debatte eines: Sprache ist nie neutral, sie formt unser Denken mit. [___6___] Und wie diese Veränderung aussehen wird, entscheidet letztlich nicht die Politik, sondern der alltägliche Sprachgebrauch von Millionen Menschen.',
'textrekonstruktion', 'telc', 'c1', 490, 20,
'{"gaps": 6, "options": [
  {"id": "a", "text": "Und ebenso wenig sind die Meinungen darüber, ob und wie gegendert werden sollte."},
  {"id": "b", "text": "Das sogenannte mentale Repräsentationsproblem ist empirisch gut belegt."},
  {"id": "c", "text": "Die Frage, ob und wie sich Sprache verändert, ist daher keine rein akademische, sondern eine zutiefst gesellschaftliche."},
  {"id": "d", "text": "Diese Beispiele zeigen, dass sprachliche Innovation möglich ist — aber jede Sprache braucht eine Lösung, die zu ihrer Struktur passt."},
  {"id": "e", "text": "Er verweist auf Umfragen, wonach eine Mehrheit der Bevölkerung das Gendern ablehnt oder zumindest als störend empfindet."},
  {"id": "f", "text": "Während einige Institutionen konsequent gendern, verzichten andere bewusst darauf — eine einheitliche Regelung gibt es nicht."},
  {"id": "g", "text": "Das Gendern hat die deutsche Sprache bereits unwiderruflich zerstört und sollte sofort verboten werden."},
  {"id": "h", "text": "Studien belegen eindeutig, dass gegenderte Texte schwerer verständlich sind als traditionell formulierte."}
], "correct": {"1": "a", "2": "b", "3": "e", "4": "f", "5": "d", "6": "c"}}',
27);


-- ============================================================
-- SELEKTIVES VERSTEHEN (5 texts)
-- ============================================================

INSERT INTO reading_texts (title_de, title_en, text_content, text_type, exam_format, level, word_count, estimated_minutes, questions, sort_order) VALUES

-- SV 1: Homeoffice vs. Präsenzpflicht
('Homeoffice oder Büro? — Fünf Perspektiven', 'Home Office or Office? — Five Perspectives',
'Fünf Berufstätige berichten über ihre Erfahrungen mit Homeoffice und Präsenzarbeit.

a) Claudia, 38, Teamleiterin in einer Versicherung
„Seit wir hybrid arbeiten, hat sich die Teamdynamik komplett verändert — und nicht zum Besseren. Die informellen Gespräche an der Kaffeemaschine, das spontane Brainstorming im Flur — all das fehlt. Meine Mitarbeiter sind produktiver geworden, ja. Aber die Innovationskraft hat nachgelassen. Die besten Ideen entstehen nicht im Videocall, sondern im zufälligen Austausch. Ich bin überzeugt, dass wir mindestens drei Tage pro Woche im Büro brauchen."

b) Patrick, 29, Softwareentwickler
„Ich war schon vor Corona ein Verfechter des Homeoffice. Programmieren erfordert tiefe Konzentration, und im Großraumbüro werde ich alle zehn Minuten unterbrochen. Zu Hause schaffe ich in fünf Stunden, wofür ich im Büro acht brauche. Außerdem spare ich mir zwei Stunden Pendelzeit pro Tag. Die benutze ich für Sport und Kochen. Meine Lebensqualität hat sich durch Homeoffice dramatisch verbessert."

c) Fatima, 45, Krankenhausverwaltung
„Die Debatte um Homeoffice ist für mich eine Luxusdiskussion. Ich arbeite in der Verwaltung eines Krankenhauses. Akten, Unterschriften, Abstimmungen mit den Stationen — das funktioniert nur vor Ort. Was mich ärgert: Meine Kolleginnen in der Zentrale arbeiten von zu Hause, verdienen mehr und haben flexiblere Zeiten. Das schafft eine Zwei-Klassen-Gesellschaft im eigenen Unternehmen."

d) Thomas, 52, Geschäftsführer eines Mittelständlers
„Wir haben Homeoffice ein Jahr lang ausprobiert und dann wieder eingestellt. Nicht weil die Leute faul waren — im Gegenteil. Aber der Zusammenhalt hat gelitten. Neue Mitarbeiter wurden nicht richtig integriert, und es gab eine schleichende Erosion der Unternehmenskultur. Mein Kompromiss: freitags darf jeder von zu Hause arbeiten. Mehr nicht."

e) Sandra, 34, alleinerziehende Projektmanagerin
„Homeoffice hat mir ermöglicht, überhaupt Vollzeit zu arbeiten. Ohne die Flexibilität, mein Kind morgens zur Schule zu bringen und nachmittags da zu sein, hätte ich auf eine Teilzeitstelle wechseln müssen. Allerdings verschwimmen die Grenzen: Ich beantworte abends noch Mails, während mein Sohn seine Hausaufgaben macht. Die Freiheit hat ihren Preis."',
'selektives_verstehen', 'telc', 'c1', 420, 15,
'{"instruction": "Wer sagt was? Ordnen Sie die Aussagen den Personen (a-e) zu.", "questions": [
  {"number": 1, "text": "Wer sieht im Homeoffice eine Voraussetzung für die eigene Berufstätigkeit?", "correct": "e"},
  {"number": 2, "text": "Wer hält spontane persönliche Begegnungen für unverzichtbar für Innovation?", "correct": "a"},
  {"number": 3, "text": "Wer kritisiert die ungleiche Verteilung von Homeoffice-Möglichkeiten im Unternehmen?", "correct": "c"},
  {"number": 4, "text": "Wer hat Homeoffice eingeführt und dann wieder größtenteils abgeschafft?", "correct": "d"},
  {"number": 5, "text": "Wer betont, dass konzentriertes Arbeiten zu Hause deutlich effizienter ist?", "correct": "b"},
  {"number": 6, "text": "Wer beschreibt die Schwierigkeit, Arbeit und Privatleben im Homeoffice zu trennen?", "correct": "e"}
]}',
28),

-- SV 2: Frauen in Führungspositionen
('Frauen in Führungspositionen — Fünf Stimmen', 'Women in Leadership — Five Voices',
'Fünf Personen äußern sich zur Geschlechterquote in Unternehmen.

a) Dr. Helga Brandt, Aufsichtsrätin
„Als ich vor 25 Jahren meine Karriere begann, war ich die einzige Frau im Vorstandszimmer. Heute sind wir drei von zwölf. Fortschritt? Ja. Genug? Bei Weitem nicht. Ohne die gesetzliche Quote von 2015 wäre selbst diese bescheidene Veränderung nicht eingetreten. Die Quote ist kein Idealinstrument, aber sie ist das einzige, das nachweislich funktioniert."

b) Maximilian Hofer, Personalleiter
„Ich habe grundsätzlich nichts gegen die Quote, aber sie führt in der Praxis zu Problemen. Wenn ich eine Frau einstelle, steht sofort der Verdacht im Raum, sie sei eine Quotenfrau. Das ist unfair gegenüber hochqualifizierten Kandidatinnen. Außerdem löst die Quote nicht das eigentliche Problem: solange Frauen den Großteil der Care-Arbeit leisten, werden sie in Führungspositionen unterrepräsentiert bleiben."

c) Sarah Petersen, Gründerin eines Tech-Startups
„In meinem Startup habe ich 60 Prozent Frauen in Führungspositionen — ohne Quote. Wie? Durch flexible Arbeitszeiten, Job-Sharing für Leitungspositionen und eine Kultur, in der niemand um 20 Uhr noch im Büro sitzen muss, um Engagement zu beweisen. Das Problem ist nicht, dass es keine qualifizierten Frauen gibt. Das Problem sind Strukturen, die für das Lebensmodell der 1960er-Jahre gebaut wurden."

d) Prof. Dr. Michael Roth, Wirtschaftsethiker
„Die Debatte um die Frauenquote lenkt von der eigentlichen Frage ab: Warum werden Frauen systematisch bei Beförderungen übergangen? Studien zeigen, dass identische Lebensläufe mit männlichem Namen deutlich häufiger zu Einladungen zum Vorstellungsgespräch führen. Solange diese unbewussten Vorurteile existieren, brauchen wir korrigierende Maßnahmen."

e) Anna-Lena Schwarz, Ingenieurin
„Ich bin gegen die Quote — und zwar als Frau. Ich möchte wissen, dass ich meinen Job wegen meiner Kompetenz bekommen habe, nicht wegen meines Geschlechts. Trotzdem sehe ich die Notwendigkeit: In meinem Ingenieurstudium waren wir 12 Prozent Frauen. Die Probleme beginnen viel früher — bei der Berufswahl, bei den Rollenvorbildern, bei der Art, wie Mädchen in der Schule für Technik begeistert werden."',
'selektives_verstehen', 'telc', 'c1', 420, 15,
'{"instruction": "Wer sagt was? Ordnen Sie die Aussagen den Personen (a-e) zu.", "questions": [
  {"number": 1, "text": "Wer sieht die Ursache des Problems in veralteten Unternehmensstrukturen?", "correct": "c"},
  {"number": 2, "text": "Wer verweist auf wissenschaftliche Belege für unbewusste Geschlechtervorurteile?", "correct": "d"},
  {"number": 3, "text": "Wer hält die Quote für das einzig wirksame Instrument?", "correct": "a"},
  {"number": 4, "text": "Wer befürchtet, dass die Quote qualifizierten Frauen schadet?", "correct": "b"},
  {"number": 5, "text": "Wer fordert, dass Veränderungen bereits in der Schulbildung beginnen müssen?", "correct": "e"},
  {"number": 6, "text": "Wer hat eine hohe Frauenquote ohne gesetzliche Vorgaben erreicht?", "correct": "c"}
]}',
29),

-- SV 3: Mobilität der Zukunft
('Mobilität der Zukunft — Fünf Visionen', 'Mobility of the Future — Five Visions',
'Fünf Experten beschreiben ihre Vision für die Mobilität von morgen.

a) Dr. Nina Hartmann, Verkehrsplanerin
„Die Zukunft der Mobilität liegt nicht im Elektroauto — sondern darin, überhaupt weniger Auto zu fahren. In den Niederlanden zeigt sich, was möglich ist, wenn man Radwege konsequent ausbaut und die Innenstädte autofrei macht. Wir brauchen keine besseren Autos, wir brauchen bessere Städte. Das bedeutet: kurze Wege, sichere Radwege, zuverlässiger ÖPNV."

b) Jens Krüger, Ingenieur bei einem Elektroautohersteller
„Das Elektroauto ist kein Allheilmittel, aber ein unverzichtbarer Baustein. Die Energiebilanz ist schon heute deutlich besser als beim Verbrenner — und sie verbessert sich mit jedem Prozent erneuerbarer Energie im Strommix. Das Hauptproblem ist die Ladeinfrastruktur: Solange man auf der Autobahn 30 Minuten auf einen freien Ladeplatz warten muss, werden viele beim Verbrenner bleiben."

c) Aylin Demir, Pendlerin aus dem Umland
„Ich fahre jeden Tag 45 Minuten mit dem Auto zur Arbeit, weil der Bus nur zweimal am Tag fährt. Wenn mir jemand sagt, ich soll auf den ÖPNV umsteigen, kann ich nur lachen. Auf dem Land gibt es keine Alternative zum Auto. Bevor man den Leuten das Autofahren madig macht, muss man ihnen eine echte Alternative bieten. Und die gibt es auf dem Land einfach nicht."

d) Prof. Dr. Hans-Peter Müller, Umweltökonom
„Kostenloser ÖPNV klingt verlockend, aber er ist ein Irrweg. Das Luxemburg-Experiment zeigt: Gratis-Tickets erhöhen die Fahrgastzahlen nur minimal, weil das Hauptproblem nicht der Preis ist, sondern die Qualität — Taktfrequenz, Pünktlichkeit, Komfort. Statt Gratistickets sollten wir in bessere Verbindungen investieren. Ein Bus, der alle 30 Minuten kommt, wird auch bei null Euro nicht attraktiv."

e) Maria Santos, Fahrradkurierin
„Ich bin das ganze Jahr über mit dem Lastenrad unterwegs. In der Innenstadt bin ich schneller als jeder Lieferwagen. Die größte Gefahr für mich sind nicht das Wetter oder die Steigungen, sondern die fehlende Infrastruktur: zu schmale Radwege, zugeparkte Radstreifen, Kreuzungen ohne Sichtschutz. Wenn die Politik die Verkehrswende ernst meint, muss sie zuerst die Radwege sicher machen."',
'selektives_verstehen', 'telc', 'c1', 430, 15,
'{"instruction": "Wer sagt was? Ordnen Sie die Aussagen den Personen (a-e) zu.", "questions": [
  {"number": 1, "text": "Wer kritisiert die mangelnde ÖPNV-Anbindung im ländlichen Raum?", "correct": "c"},
  {"number": 2, "text": "Wer hält kostenlosen Nahverkehr für den falschen Ansatz?", "correct": "d"},
  {"number": 3, "text": "Wer sieht das Hauptproblem der Elektromobilität in der Infrastruktur?", "correct": "b"},
  {"number": 4, "text": "Wer fordert vor allem sichere Fahrradwege?", "correct": "e"},
  {"number": 5, "text": "Wer plädiert für eine Stadtplanung, die Autofahren überflüssig macht?", "correct": "a"},
  {"number": 6, "text": "Wer berichtet aus eigener Erfahrung über gefährliche Verkehrssituationen?", "correct": "e"}
]}',
30),

-- SV 4: Studiengebühren
('Studiengebühren — Pro und Contra', 'Tuition Fees — Pro and Contra',
'Fünf Personen positionieren sich zur Frage, ob Studierende für ihr Studium bezahlen sollten.

a) Dr. Karin Löffler, Hochschulpräsidentin
„Unsere Universitäten sind chronisch unterfinanziert. Überfüllte Hörsäle, marode Gebäude, zu wenige Professuren — das ist die Realität an deutschen Hochschulen. Moderate Studiengebühren von 500 Euro pro Semester könnten die Situation spürbar verbessern. Natürlich nur mit einem robusten Stipendiensystem, das sicherstellt, dass niemand aus finanziellen Gründen auf ein Studium verzichten muss."

b) Lukas, 22, Student der Politikwissenschaft
„Studiengebühren widersprechen dem Grundsatz der Chancengleichheit. Kinder aus Akademikerfamilien studieren dreimal häufiger als Kinder aus Arbeiterfamilien. Gebühren würden diese Schere weiter öffnen. Bildung ist ein öffentliches Gut — sie sollte aus Steuermitteln finanziert werden, nicht aus den Taschen der Studierenden. Die Gesellschaft profitiert von gut ausgebildeten Bürgern."

c) Astrid Bergmann, Unternehmerin
„Ich habe selbst in England studiert und 9.000 Pfund pro Jahr bezahlt. Was ich dafür bekommen habe: moderne Bibliotheken, exzellente Betreuung, Karriereberatung. In Deutschland habe ich kein Seminar mit weniger als 80 Leuten erlebt. Man bekommt, wofür man zahlt. Und ja: Mein Studienkredit war nach fünf Berufsjahren abbezahlt."

d) Prof. Dr. Oliver Kessler, Bildungsökonom
„Die Daten sind eindeutig: In den Bundesländern, die zwischen 2006 und 2014 Studiengebühren erhoben, gab es keinen messbaren Rückgang der Studierendenzahlen. Die Befürchtung, Gebühren schreckten ab, hat sich empirisch nicht bestätigt. Was sich allerdings gezeigt hat: Die Qualität der Lehre verbesserte sich, weil Studierende als zahlende Kunden höhere Ansprüche stellten."

e) Mira, 26, Doktorandin aus einer Nicht-Akademiker-Familie
„Meine Eltern sind beide Handwerker. Dass ich studieren konnte, war nur möglich, weil es keine Gebühren gab. Selbst 500 Euro pro Semester wären für meine Familie eine ernsthafte Belastung gewesen. Stipendien sind keine Lösung — der bürokratische Aufwand ist enorm, und die Vergabe ist oft intransparent. BAföG allein reicht schon jetzt kaum zum Leben."',
'selektives_verstehen', 'telc', 'c1', 430, 15,
'{"instruction": "Wer sagt was? Ordnen Sie die Aussagen den Personen (a-e) zu.", "questions": [
  {"number": 1, "text": "Wer sieht in Studiengebühren eine Möglichkeit, die Qualität der Hochschulen zu verbessern?", "correct": "a"},
  {"number": 2, "text": "Wer argumentiert mit persönlicher Erfahrung aus dem britischen Hochschulsystem?", "correct": "c"},
  {"number": 3, "text": "Wer bezweifelt, dass Stipendien als Ausgleich ausreichen?", "correct": "e"},
  {"number": 4, "text": "Wer stützt sich auf empirische Daten aus deutschen Bundesländern?", "correct": "d"},
  {"number": 5, "text": "Wer betrachtet Bildung als öffentliches Gut?", "correct": "b"},
  {"number": 6, "text": "Wer berichtet, dass Gebühren die Erwartungen der Studierenden erhöhten?", "correct": "d"}
]}',
31),

-- SV 5: KI in der Wissenschaft
('Künstliche Intelligenz in der Wissenschaft — Fünf Meinungen', 'AI in Science — Five Opinions',
'Fünf Wissenschaftlerinnen und Wissenschaftler äußern sich zum Einsatz von KI im akademischen Betrieb.

a) Prof. Dr. Eva Richter, Informatikerin
„KI wird die Wissenschaft revolutionieren — und zwar zum Besseren. In meinem Fachgebiet nutzen wir Machine Learning, um riesige Datensätze zu analysieren, die kein Mensch je manuell auswerten könnte. In der Medizin beschleunigt KI die Medikamentenentwicklung. In der Klimaforschung verbessert sie Vorhersagemodelle. Wer KI aus der Wissenschaft fernhalten will, versteht die Möglichkeiten nicht."

b) Dr. Tobias Lang, Philosophiedozent
„Mein Problem ist nicht, dass Studierende ChatGPT benutzen. Mein Problem ist, dass sie es benutzen, ohne es zu deklarieren. Wir müssen den akademischen Umgang mit KI regeln: Wo ist sie ein legitimes Werkzeug? Wo beginnt Täuschung? Eine Hausarbeit, die von einer KI geschrieben wurde, ist kein Nachweis eigener Denkleistung. Aber eine KI als Recherche-Assistent einzusetzen — warum nicht?"

c) Maria Kowalski, Doktorandin der Biologie
„Ich nutze KI täglich: für Literaturrecherche, für die Auswertung von Genomdaten, sogar für die Formulierung englischer Fachtexte. Ohne KI würde meine Promotion doppelt so lange dauern. Gleichzeitig mache ich mir Sorgen: Wenn KI die Ergebnisse liefert, was ist dann noch mein eigener wissenschaftlicher Beitrag? Diese Frage beschäftigt mich."

d) Prof. Dr. Bernd Schuster, Rektor einer Universität
„Wir haben an unserer Universität klare Richtlinien erlassen: KI-generierte Texte müssen gekennzeichnet werden, und die eigenständige Denkleistung muss erkennbar bleiben. Prüfungsformate passen wir an — mehr mündliche Prüfungen, mehr Projektarbeit. Das ist aufwendig, aber notwendig. Die Universität muss sich an die Realität anpassen, nicht umgekehrt."

e) Dr. Sophia Chen, Forschungsethikerin
„Meine größte Sorge ist die Reproduzierbarkeit. Wenn ein KI-Modell zu einem Ergebnis kommt, können wir oft nicht nachvollziehen, wie. Diese Black-Box-Problematik untergräbt ein Grundprinzip der Wissenschaft: die Transparenz und Überprüfbarkeit von Ergebnissen. Bevor wir KI in der Forschung flächendeckend einsetzen, brauchen wir Standards für Erklärbarkeit."',
'selektives_verstehen', 'telc', 'c1', 430, 15,
'{"instruction": "Wer sagt was? Ordnen Sie die Aussagen den Personen (a-e) zu.", "questions": [
  {"number": 1, "text": "Wer fordert klare Regeln für den Einsatz von KI in Prüfungen?", "correct": "d"},
  {"number": 2, "text": "Wer sieht in der mangelnden Nachvollziehbarkeit von KI-Ergebnissen ein Grundsatzproblem?", "correct": "e"},
  {"number": 3, "text": "Wer nutzt KI als zeitsparendes Werkzeug, hinterfragt aber den eigenen Beitrag?", "correct": "c"},
  {"number": 4, "text": "Wer unterscheidet zwischen legitimem Einsatz und akademischer Täuschung?", "correct": "b"},
  {"number": 5, "text": "Wer betont die transformative Kraft von KI in verschiedenen Forschungsbereichen?", "correct": "a"},
  {"number": 6, "text": "Wer hat die Prüfungsformate an der eigenen Institution bereits angepasst?", "correct": "d"}
]}',
32);


-- ============================================================
-- DETAILVERSTEHEN (8 texts)
-- ============================================================

INSERT INTO reading_texts (title_de, title_en, text_content, text_type, exam_format, level, word_count, estimated_minutes, questions, sort_order) VALUES

-- DV 1: Fachkräftemangel
('Fachkräftemangel in Deutschland — Ursachen und Lösungen', 'Labor Shortage in Germany — Causes and Solutions',
'Der Fachkräftemangel in Deutschland hat ein kritisches Ausmaß erreicht. Laut einer Studie des Instituts der deutschen Wirtschaft (IW) konnten 2024 rund 570.000 Stellen nicht besetzt werden, weil qualifizierte Bewerber fehlten. Besonders betroffen sind das Gesundheitswesen, die IT-Branche, das Handwerk und die Ingenieurwissenschaften.

Die Ursachen sind vielfältig. Der demografische Wandel spielt eine zentrale Rolle: Die geburtenstarken Jahrgänge der Babyboomer gehen in den Ruhestand, während deutlich weniger junge Menschen nachrücken. Bis 2035 werden voraussichtlich sieben Millionen Erwerbstätige den Arbeitsmarkt verlassen — das entspricht etwa 15 Prozent der heutigen Erwerbsbevölkerung.

Gleichzeitig hat sich die Bildungslandschaft verändert. Die sogenannte „Akademisierung" — der Trend, dass immer mehr junge Menschen studieren statt eine Ausbildung zu beginnen — hat in einigen Bereichen zu einem Überangebot an Akademikern und einem gleichzeitigen Mangel an Facharbeitern geführt. Im Handwerk blieben 2024 rund 37 Prozent der Ausbildungsplätze unbesetzt.

Die Zuwanderung qualifizierter Arbeitskräfte gilt als ein wichtiger Lösungsansatz. Das 2023 verabschiedete Fachkräfteeinwanderungsgesetz erleichtert die Einwanderung für Fachkräfte aus Drittstaaten erheblich. Allerdings kritisieren Wirtschaftsverbände die nach wie vor langsamen Visaverfahren und die bürokratischen Hürden bei der Anerkennung ausländischer Berufsqualifikationen. In vielen Botschaften beträgt die Wartezeit für einen Termin mehrere Monate.

Ein weiterer Hebel ist die bessere Nutzung des inländischen Potenzials. Frauen arbeiten in Deutschland überdurchschnittlich häufig in Teilzeit — 49 Prozent im Vergleich zu 28 Prozent im EU-Durchschnitt. Der Ausbau der Kinderbetreuung und die Abschaffung steuerlicher Fehlanreize wie des Ehegattensplittings könnten mehr Frauen eine Vollzeittätigkeit ermöglichen.

Auch die Automatisierung bietet Chancen. In der Logistikbranche können autonome Systeme repetitive Aufgaben übernehmen und so den Bedarf an manueller Arbeitskraft reduzieren. Allerdings entstehen dadurch neue Qualifikationsanforderungen: Wer die automatisierten Systeme warten, programmieren und überwachen soll, braucht andere Kompetenzen als bisher.

Experten sind sich einig, dass es keine einzelne Lösung für den Fachkräftemangel gibt. Nur ein Bündel aus Zuwanderung, besserer Vereinbarkeit von Familie und Beruf, Attraktivierung der dualen Ausbildung und gezielter Automatisierung kann die Lücke schließen. Die Zeit drängt: Ohne wirksame Maßnahmen droht Deutschland laut IW-Prognosen bis 2040 ein jährlicher Wertschöpfungsverlust von rund 74 Milliarden Euro.',
'detailverstehen', 'telc', 'c1', 430, 20,
'{"instruction": "Lesen Sie den Text und entscheiden Sie: richtig (R), falsch (F) oder nicht im Text (N).", "statements": [
  {"number": 1, "text": "2024 konnten in Deutschland etwa 570.000 Stellen mangels qualifizierter Bewerber nicht besetzt werden.", "correct": "R"},
  {"number": 2, "text": "Der Fachkräftemangel betrifft ausschließlich die IT-Branche.", "correct": "F"},
  {"number": 3, "text": "Bis 2035 werden voraussichtlich sieben Millionen Erwerbstätige den Arbeitsmarkt verlassen.", "correct": "R"},
  {"number": 4, "text": "Die Akademisierung hat in allen Bereichen zu einem Fachkräftemangel geführt.", "correct": "F"},
  {"number": 5, "text": "Im Handwerk blieben 2024 mehr als ein Drittel der Ausbildungsplätze unbesetzt.", "correct": "R"},
  {"number": 6, "text": "Das Fachkräfteeinwanderungsgesetz wurde 2024 verabschiedet.", "correct": "F"},
  {"number": 7, "text": "In Deutschland arbeiten 49 Prozent der Frauen in Teilzeit.", "correct": "R"},
  {"number": 8, "text": "Die Abschaffung des Ehegattensplittings ist bereits beschlossen.", "correct": "N"},
  {"number": 9, "text": "Automatisierung reduziert zwar den Bedarf an manueller Arbeit, schafft aber neue Qualifikationsanforderungen.", "correct": "R"},
  {"number": 10, "text": "Ohne Gegenmaßnahmen droht Deutschland bis 2040 ein jährlicher Wertschöpfungsverlust von 74 Milliarden Euro.", "correct": "R"},
  {"number": 11, "text": "Japan hat ein ähnliches Fachkräfteeinwanderungsgesetz wie Deutschland verabschiedet.", "correct": "N"}
]}',
33),

-- DV 2: Globalisierung
('Globalisierung — Wohlstand für alle oder Gewinn für wenige?', 'Globalization — Prosperity for All or Profit for Few?',
'Die Globalisierung hat in den letzten Jahrzehnten zu einem beispiellosen Anstieg des weltweiten Wohlstands geführt. Zwischen 1990 und 2020 ist die Zahl der Menschen, die in extremer Armut leben, von 1,9 Milliarden auf unter 700 Millionen gesunken. Der internationale Handel hat Millionen von Arbeitsplätzen geschaffen, und der Zugang zu Technologie, Bildung und Gesundheitsversorgung hat sich in vielen Entwicklungsländern dramatisch verbessert.

Gleichzeitig hat die Globalisierung die Ungleichheit innerhalb vieler Länder verschärft. In den Industrieländern haben vor allem gering qualifizierte Arbeitnehmer unter der Verlagerung von Produktionsstätten in Niedriglohnländer gelitten. In den USA beispielsweise sind die Reallöhne der unteren 50 Prozent der Einkommensverteilung seit 1980 kaum gestiegen, während das reichste Prozent seinen Anteil am Gesamteinkommen verdoppelt hat.

Die Wirtschaftswissenschaftlerin Prof. Dr. Renate Stahl differenziert: „Globalisierung an sich ist weder gut noch schlecht. Es kommt darauf an, wie sie gestaltet wird. Ohne flankierende Sozialpolitik — Umschulungsprogramme, soziale Sicherungssysteme, progressive Besteuerung — produziert sie Gewinner und Verlierer."

Die ökologischen Kosten der Globalisierung werden zunehmend kritisch betrachtet. Der Transport von Waren über Tausende von Kilometern verursacht erhebliche CO₂-Emissionen. Eine in Neuseeland produzierte Kiwi, die per Schiff nach Hamburg transportiert wird, hat einen deutlich größeren ökologischen Fußabdruck als ein regionaler Apfel. Allerdings ist die Rechnung oft komplizierter: In manchen Fällen ist die Produktion im Ausland trotz des Transports energieeffizienter als die heimische Produktion in beheizten Gewächshäusern.

Die Covid-19-Pandemie hat die Verwundbarkeit globaler Lieferketten offengelegt. Plötzlich fehlten Mikrochips, Medikamente und Schutzausrüstung. Seitdem plädieren viele Politiker für eine stärkere Regionalisierung der Produktion — das sogenannte „Reshoring" oder „Friendshoring", bei dem Produktionsstätten in politisch verbündete Länder verlagert werden.

Ob die Ära der ungezügelten Globalisierung zu Ende geht, ist umstritten. Neue Handelsbarrieren, geopolitische Spannungen und der wachsende Protektionismus in vielen Ländern deuten auf einen Wandel hin. Die Ökonomin Stahl warnt jedoch: „Wer glaubt, Abschottung bringe Wohlstand, irrt. Die Antwort ist nicht weniger Globalisierung, sondern bessere Globalisierung — mit klaren Regeln, sozialer Absicherung und ökologischer Verantwortung."',
'detailverstehen', 'telc', 'c1', 420, 20,
'{"instruction": "Lesen Sie den Text und entscheiden Sie: richtig (R), falsch (F) oder nicht im Text (N).", "statements": [
  {"number": 1, "text": "Die Zahl der Menschen in extremer Armut ist zwischen 1990 und 2020 um mehr als eine Milliarde gesunken.", "correct": "R"},
  {"number": 2, "text": "Die Globalisierung hat die Ungleichheit sowohl zwischen als auch innerhalb von Ländern reduziert.", "correct": "F"},
  {"number": 3, "text": "In den USA sind die Reallöhne der unteren 50 Prozent seit 1980 deutlich gestiegen.", "correct": "F"},
  {"number": 4, "text": "Prof. Stahl hält Globalisierung für grundsätzlich schädlich.", "correct": "F"},
  {"number": 5, "text": "Importierte Produkte haben immer einen größeren ökologischen Fußabdruck als regionale Produkte.", "correct": "F"},
  {"number": 6, "text": "Die Covid-19-Pandemie hat Schwachstellen in globalen Lieferketten aufgedeckt.", "correct": "R"},
  {"number": 7, "text": "Friendshoring bedeutet die Verlagerung von Produktion in politisch verbündete Länder.", "correct": "R"},
  {"number": 8, "text": "China ist der größte Befürworter des Reshorings.", "correct": "N"},
  {"number": 9, "text": "Prof. Stahl plädiert für eine vollständige Abschaffung des internationalen Handels.", "correct": "F"},
  {"number": 10, "text": "Der wachsende Protektionismus in vielen Ländern deutet auf einen Wandel der Globalisierung hin.", "correct": "R"},
  {"number": 11, "text": "Deutschland hat als Reaktion auf die Pandemie alle Lieferketten regionalisiert.", "correct": "N"}
]}',
34),

-- DV 3: Demografischer Wandel
('Demografischer Wandel — Eine alternde Gesellschaft vor neuen Herausforderungen', 'Demographic Change — An Aging Society Faces New Challenges',
'Deutschland altert. Das Durchschnittsalter der Bevölkerung liegt bei 44,8 Jahren — und damit deutlich über dem weltweiten Durchschnitt von 30 Jahren. Die Geburtenrate verharrt seit Jahrzehnten bei rund 1,4 Kindern pro Frau, weit unter dem Bestandserhaltungsniveau von 2,1. Gleichzeitig steigt die Lebenserwartung kontinuierlich: Ein heute geborenes Mädchen wird im Durchschnitt 83 Jahre alt, ein Junge 78.

Die Konsequenzen für das Sozialsystem sind gravierend. Das umlagefinanzierte Rentensystem basiert auf dem Prinzip, dass die arbeitende Generation die Renten der Älteren finanziert. 1960 kamen auf einen Rentner sechs Beitragszahler. Heute sind es nur noch zwei, und bis 2040 wird das Verhältnis voraussichtlich auf 1,5 zu eins sinken.

Die Sozialwissenschaftlerin Dr. Katharina Weber sieht dringenden Handlungsbedarf: „Wir können nicht so tun, als ließe sich das bestehende System einfach fortschreiben. Entweder steigen die Beiträge, sinkt das Rentenniveau, oder das Renteneintrittsalter wird angehoben. Wahrscheinlich brauchen wir eine Kombination aus allem."

Auch das Gesundheitssystem steht vor enormen Herausforderungen. Mit zunehmendem Alter steigt der Bedarf an medizinischer Versorgung und Pflege. Schon heute fehlen in Deutschland rund 200.000 Pflegekräfte. Bis 2030 könnte die Lücke auf 500.000 anwachsen, wenn nicht massiv gegengesteuert wird — durch bessere Arbeitsbedingungen, höhere Löhne und die Anwerbung ausländischer Fachkräfte.

Der ländliche Raum ist vom demografischen Wandel besonders betroffen. Junge Menschen ziehen in die Städte, zurück bleiben überalterte Gemeinden mit schrumpfender Infrastruktur: Arztpraxen schließen, Schulen werden zusammengelegt, Buslinien eingestellt. In manchen Regionen Ostdeutschlands hat sich die Bevölkerung seit der Wiedervereinigung halbiert.

Allerdings gibt es auch positive Aspekte des Wandels. Die „Silver Economy" — Produkte und Dienstleistungen für ältere Menschen — wächst rasant. Ältere Menschen sind heute gesünder, aktiver und konsumfreudiger als je zuvor. Und viele engagieren sich ehrenamtlich: Laut dem Freiwilligensurvey 2024 sind 38 Prozent der über 65-Jährigen ehrenamtlich aktiv.

Die zentrale Frage ist, ob Deutschland den demografischen Wandel als Bedrohung oder als Gestaltungsaufgabe begreift. Die Zeit des Abwartens ist vorbei — die Babyboomer gehen jetzt in Rente, nicht irgendwann.',
'detailverstehen', 'telc', 'c1', 430, 20,
'{"instruction": "Lesen Sie den Text und entscheiden Sie: richtig (R), falsch (F) oder nicht im Text (N).", "statements": [
  {"number": 1, "text": "Das Durchschnittsalter in Deutschland liegt über dem weltweiten Durchschnitt.", "correct": "R"},
  {"number": 2, "text": "Die Geburtenrate in Deutschland liegt bei etwa 2,1 Kindern pro Frau.", "correct": "F"},
  {"number": 3, "text": "1960 kamen auf einen Rentner sechs Beitragszahler.", "correct": "R"},
  {"number": 4, "text": "Dr. Weber schlägt als einzige Lösung eine Erhöhung des Renteneintrittsalters vor.", "correct": "F"},
  {"number": 5, "text": "In Deutschland fehlen derzeit rund 200.000 Pflegekräfte.", "correct": "R"},
  {"number": 6, "text": "Die Pflegelücke könnte bis 2030 auf 500.000 anwachsen.", "correct": "R"},
  {"number": 7, "text": "Die Bundesregierung hat ein Sonderprogramm zur Anwerbung ausländischer Pflegekräfte gestartet.", "correct": "N"},
  {"number": 8, "text": "In manchen Regionen Ostdeutschlands hat sich die Bevölkerung seit der Wiedervereinigung halbiert.", "correct": "R"},
  {"number": 9, "text": "Ältere Menschen sind heute weniger aktiv als frühere Generationen.", "correct": "F"},
  {"number": 10, "text": "38 Prozent der über 65-Jährigen engagieren sich ehrenamtlich.", "correct": "R"},
  {"number": 11, "text": "Japan ist das Land mit dem höchsten Durchschnittsalter weltweit.", "correct": "N"}
]}',
35),

-- DV 4: Soziale Medien und Selbstbild
('Der Einfluss sozialer Medien auf das Selbstbild junger Menschen', 'The Influence of Social Media on Young People''s Self-Image',
'Die durchschnittliche Bildschirmzeit von 14- bis 17-Jährigen in Deutschland beträgt vier Stunden und 23 Minuten pro Tag — davon entfallen rund zweieinhalb Stunden auf soziale Medien. Was diese intensive Nutzung mit dem Selbstbild und der psychischen Gesundheit junger Menschen macht, beschäftigt Forschung, Eltern und Politik gleichermaßen.

Die Kinder- und Jugendpsychiaterin Dr. Julia Stern beobachtet einen besorgniserregenden Trend: „Seit 2015 ist die Zahl der Jugendlichen, die wegen Essstörungen, Depressionen oder Angststörungen behandelt werden, um über 40 Prozent gestiegen. Der Zusammenhang mit der Nutzung sozialer Medien ist statistisch signifikant — auch wenn Kausalität schwer zu beweisen ist."

Besonders problematisch sind die allgegenwärtigen Schönheitsfilter. Studien der Universität Mannheim zeigen, dass 67 Prozent der befragten Mädchen zwischen 13 und 17 Jahren regelmäßig Filter verwenden, die ihre Gesichtszüge verändern. Über die Hälfte gibt an, ohne Filter mit ihrem Aussehen unzufrieden zu sein. Der Fachbegriff dafür lautet „Snapchat Dysmorphie" — ein verzerrtes Selbstbild, das durch den ständigen Vergleich mit der gefilterten Version entsteht.

Influencer spielen in diesem Kontext eine ambivalente Rolle. Einerseits können sie als Vorbilder fungieren und wichtige Themen wie psychische Gesundheit enttabuisieren. Andererseits vermitteln viele Influencer ein unrealistisches Bild von Perfektion — perfekter Körper, perfekte Beziehung, perfekter Lifestyle —, das den Druck auf junge Follower erhöht.

Die Plattformen selbst tragen eine Mitverantwortung. Interne Dokumente von Meta, die 2021 durch die Whistleblowerin Frances Haugen öffentlich wurden, zeigten, dass das Unternehmen wusste, dass Instagram die psychische Gesundheit von Teenagern negativ beeinflusst — und dennoch nichts unternahm. Seitdem stehen die Plattformen unter wachsendem regulatorischem Druck.

Experten plädieren für einen differenzierten Umgang. Soziale Medien pauschal zu verteufeln sei wenig zielführend, so Dr. Stern. „Die Frage ist nicht, ob Jugendliche soziale Medien nutzen, sondern wie. Medienkompetenz — die Fähigkeit, Inhalte kritisch zu hinterfragen und den eigenen Konsum bewusst zu steuern — ist der beste Schutz." Auch der offene Dialog in der Familie und in der Schule sei entscheidend.

Einige Länder gehen inzwischen einen regulatorischen Weg. Australien hat 2024 ein Gesetz verabschiedet, das Kindern unter 16 Jahren die Nutzung sozialer Medien verbietet. In der EU wird ein ähnlicher Vorstoß diskutiert. Ob solche Verbote in der Praxis umsetzbar sind, bleibt allerdings fraglich.',
'detailverstehen', 'telc', 'c1', 450, 20,
'{"instruction": "Lesen Sie den Text und entscheiden Sie: richtig (R), falsch (F) oder nicht im Text (N).", "statements": [
  {"number": 1, "text": "Jugendliche zwischen 14 und 17 Jahren verbringen durchschnittlich mehr als vier Stunden täglich am Bildschirm.", "correct": "R"},
  {"number": 2, "text": "Die Zahl der Jugendlichen in psychiatrischer Behandlung ist seit 2015 um über 40 Prozent gestiegen.", "correct": "R"},
  {"number": 3, "text": "Dr. Stern hält den Zusammenhang zwischen sozialen Medien und psychischen Problemen für bewiesen.", "correct": "F"},
  {"number": 4, "text": "Mehr als die Hälfte der befragten Mädchen ist ohne Filter mit ihrem Aussehen unzufrieden.", "correct": "R"},
  {"number": 5, "text": "Alle Influencer vermitteln ein unrealistisches Schönheitsideal.", "correct": "F"},
  {"number": 6, "text": "Interne Meta-Dokumente zeigten, dass das Unternehmen die negativen Auswirkungen von Instagram auf Teenager kannte.", "correct": "R"},
  {"number": 7, "text": "Frances Haugen war eine Meta-Mitarbeiterin, die interne Dokumente öffentlich machte.", "correct": "R"},
  {"number": 8, "text": "Dr. Stern empfiehlt ein vollständiges Verbot sozialer Medien für Jugendliche.", "correct": "F"},
  {"number": 9, "text": "Australien hat ein Gesetz verabschiedet, das Kindern unter 16 die Nutzung sozialer Medien verbietet.", "correct": "R"},
  {"number": 10, "text": "In Deutschland gibt es bereits ein ähnliches Gesetz wie in Australien.", "correct": "N"},
  {"number": 11, "text": "TikTok ist die bei Jugendlichen am häufigsten genutzte Plattform.", "correct": "N"}
]}',
36),

-- DV 5: Lebenslanges Lernen
('Lebenslanges Lernen — Notwendigkeit oder Überforderung?', 'Lifelong Learning — Necessity or Overload?',
'Der Begriff „lebenslanges Lernen" hat sich von einem pädagogischen Ideal zu einer wirtschaftlichen Notwendigkeit gewandelt. In einer Welt, in der sich technologisches Wissen alle zwei bis drei Jahre verdoppelt, reicht eine einmalige Ausbildung nicht mehr aus, um ein ganzes Berufsleben lang kompetent zu bleiben.

Die Arbeitsmarktforscherin Dr. Simone Keller vom Institut für Arbeitsmarkt- und Berufsforschung (IAB) beziffert das Ausmaß des Wandels: „Etwa 30 Prozent der Tätigkeiten, die heute ausgeübt werden, gab es vor zehn Jahren noch nicht. Und umgekehrt sind viele Berufe, die 2010 zum Alltag gehörten, heute durch Automatisierung verschwunden oder grundlegend verändert." Besonders betroffen seien Routinetätigkeiten in der Verwaltung und der Produktion.

Trotz dieser Dringlichkeit nehmen in Deutschland nur 60 Prozent der Erwerbstätigen regelmäßig an beruflicher Weiterbildung teil — deutlich weniger als in skandinavischen Ländern, wo die Quote bei über 70 Prozent liegt. Die Gründe für die Zurückhaltung sind vielfältig: Zeitmangel, fehlende Angebote des Arbeitgebers und die Kosten spielen eine Rolle. Aber auch psychologische Faktoren sind relevant: Viele Menschen empfinden den permanenten Lernzwang als Stressfaktor.

Der Arbeitspsychologe Prof. Dr. Marcus Brinkmann warnt vor einer „Weiterbildungsmüdigkeit": „Wenn lebenslanges Lernen als permanenter Optimierungsdruck wahrgenommen wird, führt es nicht zu mehr Kompetenz, sondern zu Erschöpfung. Lernen muss freiwillig, sinnhaft und in den Arbeitsalltag integriert sein — nicht als zusätzliche Belastung am Feierabend."

Unternehmen experimentieren mit neuen Formaten. Microlearning — kurze Lerneinheiten von fünf bis zehn Minuten, die in den Arbeitsalltag eingebettet sind — zeigt vielversprechende Ergebnisse. Auch Mentoring-Programme und der systematische Wissensaustausch zwischen jüngeren und älteren Mitarbeitern gewinnen an Bedeutung.

Die Politik hat das Thema erkannt. Das 2019 eingeführte Qualifizierungschancengesetz ermöglicht es der Bundesagentur für Arbeit, Weiterbildungen auch für Beschäftigte zu fördern — nicht nur für Arbeitslose. Allerdings ist die Inanspruchnahme bisher gering, was Experten auf mangelnde Bekanntheit und bürokratische Hürden zurückführen.

Keller plädiert für einen kulturellen Wandel: „Wir müssen aufhören, Lernen als Phase zu betrachten, die mit dem Abschluss endet. Lernen ist ein Lebensprinzip. Aber es muss von der Gesellschaft ermöglicht werden — durch bezahlte Lernzeiten, niedrigschwellige Angebote und die Anerkennung informell erworbener Kompetenzen."',
'detailverstehen', 'telc', 'c1', 440, 20,
'{"instruction": "Lesen Sie den Text und entscheiden Sie: richtig (R), falsch (F) oder nicht im Text (N).", "statements": [
  {"number": 1, "text": "Technologisches Wissen verdoppelt sich alle zwei bis drei Jahre.", "correct": "R"},
  {"number": 2, "text": "Laut Dr. Keller gab es etwa 30 Prozent der heutigen Tätigkeiten vor zehn Jahren noch nicht.", "correct": "R"},
  {"number": 3, "text": "In Deutschland nehmen über 70 Prozent der Erwerbstätigen regelmäßig an Weiterbildung teil.", "correct": "F"},
  {"number": 4, "text": "In skandinavischen Ländern liegt die Weiterbildungsquote höher als in Deutschland.", "correct": "R"},
  {"number": 5, "text": "Prof. Brinkmann sieht permanenten Lernzwang als potenziellen Stressfaktor.", "correct": "R"},
  {"number": 6, "text": "Microlearning umfasst kurze Lerneinheiten von fünf bis zehn Minuten.", "correct": "R"},
  {"number": 7, "text": "Das Qualifizierungschancengesetz wurde 2019 eingeführt.", "correct": "R"},
  {"number": 8, "text": "Das Qualifizierungschancengesetz richtet sich ausschließlich an Arbeitslose.", "correct": "F"},
  {"number": 9, "text": "Die Inanspruchnahme des Qualifizierungschancengesetzes ist bisher gering.", "correct": "R"},
  {"number": 10, "text": "In Frankreich haben Arbeitnehmer ein gesetzliches Recht auf bezahlte Lernzeit.", "correct": "N"},
  {"number": 11, "text": "Dr. Keller fordert die Anerkennung informell erworbener Kompetenzen.", "correct": "R"}
]}',
37),

-- DV 6: Datenschutz
('Datenschutz im digitalen Zeitalter — Wie viel Privatsphäre geben wir auf?', 'Data Privacy in the Digital Age — How Much Privacy Are We Giving Up?',
'Wer morgens sein Smartphone entsperrt, hinterlässt ab diesem Moment eine lückenlose digitale Spur: Standortdaten, Suchverläufe, Einkaufsgewohnheiten, Kommunikationsmuster. Schätzungen zufolge werden pro Person täglich rund 1,7 Megabyte an Daten generiert — oft ohne bewusstes Zutun. Die Frage, wie mit diesen Daten umgegangen wird, gehört zu den drängendsten unserer Zeit.

Die Europäische Datenschutz-Grundverordnung (DSGVO), die 2018 in Kraft trat, gilt weltweit als das strengste Datenschutzgesetz. Sie gibt Bürgern das Recht auf Auskunft, Löschung und Widerspruch gegen die Verarbeitung ihrer personenbezogenen Daten. Unternehmen, die dagegen verstoßen, drohen Strafen von bis zu vier Prozent ihres weltweiten Jahresumsatzes.

In der Praxis klicken jedoch die meisten Menschen auf „Alle akzeptieren", wenn ein Cookie-Banner erscheint. Die Datenschutzexpertin Prof. Dr. Lisa Hartmann erklärt dieses Paradoxon: „Menschen sagen, dass ihnen Datenschutz wichtig ist, handeln aber nicht danach. Das liegt nicht an Gleichgültigkeit, sondern an Erschöpfung. Die Cookie-Banner sind so gestaltet, dass die datenschutzfreundliche Option möglichst umständlich ist. Das ist manipulatives Design — im Fachjargon Dark Patterns."

Besonders kontrovers wird der Umgang mit Gesundheitsdaten diskutiert. Die elektronische Patientenakte (ePA), die in Deutschland seit 2025 verpflichtend ist, speichert medizinische Daten zentral und macht sie für behandelnde Ärzte zugänglich. Befürworter betonen die Vorteile: schnellere Diagnosen, weniger Doppeluntersuchungen, bessere Notfallversorgung. Kritiker warnen vor dem Risiko eines Datenlecks — sensible Gesundheitsdaten in den falschen Händen könnten zu Diskriminierung bei Versicherungen oder Arbeitgebern führen.

Ein wachsendes Problem stellt die Gesichtserkennung dar. In China wird die Technologie flächendeckend eingesetzt, in der EU ist der Einsatz im öffentlichen Raum umstritten. Der EU AI Act von 2024 verbietet die biometrische Massenüberwachung grundsätzlich, erlaubt aber Ausnahmen für die Strafverfolgung. Bürgerrechtsorganisationen kritisieren diese Ausnahmen als Einfallstor für einen Überwachungsstaat.

Hartmann plädiert für einen Mittelweg: „Datenschutz darf kein Innovationshemmer sein, aber Innovation darf keine Ausrede für den Abbau von Grundrechten sein. Wir brauchen Technologien, die Privatsphäre by Design respektieren — also von vornherein datenschutzfreundlich konzipiert sind, statt den Datenschutz nachträglich aufzuflicken."',
'detailverstehen', 'telc', 'c1', 430, 20,
'{"instruction": "Lesen Sie den Text und entscheiden Sie: richtig (R), falsch (F) oder nicht im Text (N).", "statements": [
  {"number": 1, "text": "Pro Person werden täglich etwa 1,7 Megabyte an Daten generiert.", "correct": "R"},
  {"number": 2, "text": "Die DSGVO trat 2016 in Kraft.", "correct": "F"},
  {"number": 3, "text": "Unternehmen können bei DSGVO-Verstößen mit bis zu vier Prozent ihres weltweiten Jahresumsatzes bestraft werden.", "correct": "R"},
  {"number": 4, "text": "Die meisten Menschen wählen bei Cookie-Bannern die datenschutzfreundliche Option.", "correct": "F"},
  {"number": 5, "text": "Dark Patterns sind manipulative Designmuster, die Nutzer zu ungewollten Entscheidungen verleiten.", "correct": "R"},
  {"number": 6, "text": "Die elektronische Patientenakte ist in Deutschland seit 2025 verpflichtend.", "correct": "R"},
  {"number": 7, "text": "Prof. Hartmann lehnt die elektronische Patientenakte grundsätzlich ab.", "correct": "N"},
  {"number": 8, "text": "Der EU AI Act verbietet biometrische Massenüberwachung ohne jede Ausnahme.", "correct": "F"},
  {"number": 9, "text": "In China wird Gesichtserkennung flächendeckend eingesetzt.", "correct": "R"},
  {"number": 10, "text": "Privacy by Design bedeutet, dass Datenschutz von Anfang an in die Technologie integriert wird.", "correct": "R"},
  {"number": 11, "text": "Deutschland hat mehr DSGVO-Strafen verhängt als jedes andere EU-Land.", "correct": "N"}
]}',
38),

-- DV 7: Städtebau und Landflucht
('Landflucht und Urbanisierung — Warum junge Menschen die Provinz verlassen', 'Rural Flight and Urbanization — Why Young People Leave the Countryside',
'In Deutschland leben heute rund 77 Prozent der Bevölkerung in Städten — Tendenz steigend. Besonders junge Erwachsene zwischen 18 und 30 Jahren zieht es in die Metropolen: Berlin, München, Hamburg und Köln verzeichnen seit Jahren positive Wanderungssalden, während ländliche Regionen, vor allem in Ostdeutschland und Teilen Niedersachsens, kontinuierlich Einwohner verlieren.

Die Gründe sind vielfältig, aber ein Faktor sticht hervor: die Ausbildungs- und Arbeitsmöglichkeiten. Universitäten, Hochschulen und die Mehrheit der gut bezahlten Arbeitsplätze konzentrieren sich in den Städten. „Wer auf dem Land aufwächst und studieren will, muss wegziehen. Und wer einmal weg ist, kommt selten zurück", erklärt der Regionalforscher Dr. Andreas Kempf.

Aber auch weiche Faktoren spielen eine Rolle. Kulturelle Angebote, eine diverse Gastronomie, anonymere Lebensformen und eine offenere Haltung gegenüber unterschiedlichen Lebensentwürfen machen die Stadt attraktiv. Für queere Jugendliche oder Menschen mit Migrationshintergrund kann das ländliche Umfeld als beengend empfunden werden. Eine Studie der Universität Göttingen zeigt, dass 43 Prozent der jungen Erwachsenen die mangelnde Offenheit als Grund für ihren Wegzug nennen.

Die Folgen für die ländlichen Regionen sind gravierend. Wenn die Jungen gehen, fehlen Arbeitskräfte, Steuerzahler und ehrenamtlich Engagierte. Schulen werden geschlossen, der öffentliche Nahverkehr ausgedünnt, Arztpraxen aufgegeben. Es entsteht ein Teufelskreis: Je weniger Infrastruktur vorhanden ist, desto weniger Menschen wollen bleiben.

Es gibt jedoch Gegenbeispiele. In einigen Regionen gelingt es, durch gezielte Ansiedlung von Coworking-Spaces, schnelles Internet und eine aktive Willkommenskultur junge Familien und Digitalarbeiter anzulocken. Die Gemeinde Wiesenburg in Brandenburg etwa hat mit einem kreativen Dorferneuerungsprogramm Zuzügler aus Berlin gewonnen.

Die Corona-Pandemie hat den Trend kurzfristig gebremst. Steigende Mieten in den Städten und die Möglichkeit des Homeoffice machten das Landleben plötzlich wieder attraktiv. Allerdings zeigen aktuelle Daten, dass der Effekt nachlässt: Seit 2023 steigen die Wanderungszahlen in die Großstädte wieder an.

Experten warnen vor einer politischen Vernachlässigung des ländlichen Raums. Kempf betont: „Wenn sich Menschen auf dem Land abgehängt fühlen, hat das nicht nur wirtschaftliche, sondern auch politische Konsequenzen. Die Ergebnisse populistischer Parteien in strukturschwachen Regionen sprechen eine deutliche Sprache."',
'detailverstehen', 'telc', 'c1', 440, 20,
'{"instruction": "Lesen Sie den Text und entscheiden Sie: richtig (R), falsch (F) oder nicht im Text (N).", "statements": [
  {"number": 1, "text": "In Deutschland leben etwa 77 Prozent der Bevölkerung in Städten.", "correct": "R"},
  {"number": 2, "text": "Ländliche Regionen verlieren vor allem in Westdeutschland an Bevölkerung.", "correct": "F"},
  {"number": 3, "text": "Der wichtigste Grund für die Landflucht sind die Ausbildungs- und Arbeitsmöglichkeiten in den Städten.", "correct": "R"},
  {"number": 4, "text": "43 Prozent der jungen Erwachsenen nennen mangelnde Offenheit als Grund für ihren Wegzug.", "correct": "R"},
  {"number": 5, "text": "Wenn junge Menschen wegziehen, verschlechtert sich die Infrastruktur im ländlichen Raum.", "correct": "R"},
  {"number": 6, "text": "Die Gemeinde Wiesenburg hat erfolgreich Zuzügler aus Berlin angezogen.", "correct": "R"},
  {"number": 7, "text": "Die Bundesregierung hat ein Sonderprogramm zur Stärkung ländlicher Regionen gestartet.", "correct": "N"},
  {"number": 8, "text": "Die Corona-Pandemie hat die Landflucht langfristig gestoppt.", "correct": "F"},
  {"number": 9, "text": "Seit 2023 steigen die Wanderungszahlen in die Großstädte wieder an.", "correct": "R"},
  {"number": 10, "text": "Dr. Kempf sieht einen Zusammenhang zwischen ländlicher Vernachlässigung und dem Erstarken populistischer Parteien.", "correct": "R"},
  {"number": 11, "text": "Die Stadt München verliert seit Jahren Einwohner an das Umland.", "correct": "N"}
]}',
39),

-- DV 8: Ehrenamtliches Engagement
('Ehrenamt 2.0 — Wie sich freiwilliges Engagement verändert', 'Volunteering 2.0 — How Voluntary Work Is Changing',
'Rund 28,8 Millionen Menschen in Deutschland engagieren sich ehrenamtlich — das entspricht etwa 40 Prozent der Bevölkerung über 14 Jahren. Doch die Art, wie sich Menschen engagieren, hat sich in den letzten zwei Jahrzehnten grundlegend gewandelt. Die Zeiten, in denen man sich als junger Mensch einem Verein anschloss und dort bis zur Rente blieb, sind weitgehend vorbei.

Stattdessen dominiert heute ein projektbezogenes, flexibles Engagement. Plattformen wie betterplace.org, GoVolunteer oder nebenan.de vermitteln ehrenamtliche Einsätze, die sich in individuelle Zeitpläne einfügen — von der zweistündigen Kleidersortierung bis zum mehrwöchigen Mentoring-Programm. Die Soziologin Prof. Dr. Annette Fischer nennt das „Engagement à la carte": Man wählt aus, was passt, und verpflichtet sich nur so lange, wie man möchte.

Dieser Wandel hat Vor- und Nachteile. Einerseits öffnet er ehrenamtliches Engagement für Menschen, die sich klassische Vereinsstrukturen nicht leisten können — zeitlich oder kulturell. Berufstätige Eltern, Studierende oder Menschen mit unregelmäßigen Arbeitszeiten finden leichter einen Zugang. Andererseits fehlt den Organisationen die Planungssicherheit. „Wenn ich für die Tafel jeden Samstag drei Helfer brauche und nie weiß, wer kommt, wird die Organisation zur Dauerbelastung für die wenigen Stammkräfte", beschreibt Tafel-Koordinatorin Brigitte Holm das Problem.

Ein wachsendes Feld ist das sogenannte Skills-Based Volunteering: Fachleute stellen ihre beruflichen Kompetenzen unentgeltlich zur Verfügung. Ein Steuerberater macht die Buchhaltung für einen gemeinnützigen Verein, eine Grafikdesignerin gestaltet den Flyer für die Nachbarschaftsinitiative, ein IT-Spezialist richtet die Website für die Flüchtlingshilfe ein. Studien zeigen, dass diese Form des Engagements sowohl für die Organisationen als auch für die Freiwilligen den größten Mehrwert bietet.

Die Ungleichheit im Ehrenamt bleibt ein Problem. Menschen mit höherer Bildung und stabilem Einkommen engagieren sich deutlich häufiger als Geringqualifizierte oder Langzeitarbeitslose. Zudem ist das Engagement regional sehr unterschiedlich verteilt: In süddeutschen Gemeinden liegt die Ehrenamtsquote bei über 45 Prozent, in einigen ostdeutschen Kommunen unter 25 Prozent.

Fischer fordert strukturelle Reformen: „Ehrenamt darf kein Lückenfüller für staatliches Versagen sein. Wenn Tafeln die Ernährung sichern und Ehrenamtliche den Deutschunterricht für Geflüchtete übernehmen, dann stimmt etwas mit der staatlichen Grundversorgung nicht. Freiwilliges Engagement sollte gesellschaftliches Leben bereichern — nicht ersetzen, was der Staat leisten müsste."

Gleichzeitig betont sie den unersetzlichen Wert des Ehrenamts für den sozialen Zusammenhalt: „In einer Gesellschaft, die zunehmend fragmentiert ist, sind Orte der Begegnung — der Sportverein, die Freiwillige Feuerwehr, die Nachbarschaftshilfe — von unschätzbarem Wert. Hier treffen Menschen aufeinander, die sich sonst nie begegnen würden."',
'detailverstehen', 'telc', 'c1', 470, 20,
'{"instruction": "Lesen Sie den Text und entscheiden Sie: richtig (R), falsch (F) oder nicht im Text (N).", "statements": [
  {"number": 1, "text": "Rund 40 Prozent der Deutschen über 14 Jahren engagieren sich ehrenamtlich.", "correct": "R"},
  {"number": 2, "text": "Die meisten jungen Menschen binden sich heute langfristig an einen Verein.", "correct": "F"},
  {"number": 3, "text": "Prof. Fischer beschreibt das moderne Engagement als Engagement à la carte.", "correct": "R"},
  {"number": 4, "text": "Das flexible Engagement hat ausschließlich Vorteile für die Organisationen.", "correct": "F"},
  {"number": 5, "text": "Skills-Based Volunteering bedeutet, dass Fachleute ihre beruflichen Kompetenzen ehrenamtlich einsetzen.", "correct": "R"},
  {"number": 6, "text": "Menschen mit höherer Bildung engagieren sich häufiger ehrenamtlich.", "correct": "R"},
  {"number": 7, "text": "Die Ehrenamtsquote ist in Süddeutschland höher als in Ostdeutschland.", "correct": "R"},
  {"number": 8, "text": "Die Bundesregierung plant eine gesetzliche Ehrenamtspflicht für alle Bürger.", "correct": "N"},
  {"number": 9, "text": "Fischer kritisiert, dass Ehrenamt teilweise staatliche Aufgaben ersetzt.", "correct": "R"},
  {"number": 10, "text": "Die Tafel-Koordinatorin beklagt die mangelnde Planungssicherheit durch flexible Helfer.", "correct": "R"},
  {"number": 11, "text": "In Deutschland gibt es mehr als 600.000 eingetragene Vereine.", "correct": "N"}
]}',
40);
