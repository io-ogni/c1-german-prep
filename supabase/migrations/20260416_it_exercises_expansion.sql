-- ============================================================
-- IT Deutsch Exercises Expansion
-- Adds 195 new exercises across 6 topics:
-- power_nomen: +45 (15→60)
-- power_verben: +49 (11→60)
-- kollokationen: +41 (9→50)
-- workshop_phrasen: +30 (10→40)
-- refinement_phrasen: +20 (10→30)
-- redewendungen: +10 (10→20)
-- ============================================================

-- ============================================================
-- Power Nomen + Power Verben — New Exercises Batch
-- 45 Nomen exercises (sort_order 16-60)
-- 49 Verben exercises (sort_order 12-60)
-- Generated 2026-04-16
-- ============================================================


-- ============================================================
-- SECTION 1: POWER NOMEN
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1A. Definition Match (15 exercises, sort_order 16-30)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Datenschutz & Compliance', 'IT Nouns: Data Protection & Compliance',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Datensicherheit", "definition": "Der Schutz von Daten vor unerlaubtem Zugriff und Verlust"},
   {"word": "Die DSGVO", "definition": "Die europäische Verordnung zum Schutz personenbezogener Daten"},
   {"word": "Die Compliance-Richtlinien", "definition": "Interne Vorschriften zur Einhaltung gesetzlicher Regelungen"},
   {"word": "Die Geheimhaltungsvereinbarung", "definition": "Ein Vertrag, der die Weitergabe vertraulicher Informationen verbietet"},
   {"word": "Die Beweislast", "definition": "Die Pflicht, im Streitfall die eigene Aussage zu belegen"}
 ]}', '{}', 2, 16);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Markt & Strategie', 'IT Nouns: Market & Strategy',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Markteinführung", "definition": "Der Zeitpunkt, an dem ein Produkt erstmals für Kunden verfügbar wird"},
   {"word": "Die Kundenorientierung", "definition": "Die strategische Ausrichtung aller Entscheidungen am Kundenbedürfnis"},
   {"word": "Die Zielsetzung", "definition": "Die Festlegung konkreter, messbarer Ziele für ein Vorhaben"},
   {"word": "Die Prognose", "definition": "Eine datenbasierte Vorhersage zukünftiger Entwicklungen"},
   {"word": "Die Interoperabilität", "definition": "Die Fähigkeit verschiedener Systeme, nahtlos zusammenzuarbeiten"}
 ]}', '{}', 2, 17);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Infrastruktur & Betrieb', 'IT Nouns: Infrastructure & Operations',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Redundanz", "definition": "Die mehrfache Auslegung kritischer Komponenten zur Absicherung"},
   {"word": "Die Auslastung", "definition": "Der Grad, zu dem eine Ressource tatsächlich genutzt wird"},
   {"word": "Die Belastungsspitze", "definition": "Ein Zeitraum mit ungewöhnlich hoher Systemlast"},
   {"word": "Der Server", "definition": "Ein Rechner, der Dienste und Daten für andere Systeme bereitstellt"},
   {"word": "Das Hosting", "definition": "Die Bereitstellung von Serverkapazitäten für Anwendungen"}
 ]}', '{}', 1, 18);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Automatisierung & Prozesse', 'IT Nouns: Automation & Processes',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Prozessautomatisierung", "definition": "Die Überführung manueller Abläufe in automatisch gesteuerte Workflows"},
   {"word": "Die Nachjustierung", "definition": "Eine gezielte Feinjustierung nach ersten Testergebnissen"},
   {"word": "Die Ressourcenplanung", "definition": "Die vorausschauende Verteilung von Personal und Budget"},
   {"word": "Die Freigabe", "definition": "Die formale Erlaubnis, eine Änderung in Produktion zu bringen"},
   {"word": "Der Prozess", "definition": "Ein definierter Ablauf mit festgelegten Schritten und Verantwortlichkeiten"}
 ]}', '{}', 1, 19);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Teamarbeit & Kultur', 'IT Nouns: Teamwork & Culture',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Teamdynamik", "definition": "Das Zusammenspiel und die Wechselwirkungen innerhalb eines Teams"},
   {"word": "Die Hands-on-Mentalität", "definition": "Die Bereitschaft, selbst aktiv anzupacken statt nur zu delegieren"},
   {"word": "Die Kommunikationsfähigkeit", "definition": "Die Kompetenz, Informationen klar und effektiv zu vermitteln"},
   {"word": "Die Verhandlungssache", "definition": "Ein Punkt, über den noch verhandelt werden muss"},
   {"word": "Der Perspektivwechsel", "definition": "Die bewusste Einnahme eines anderen Standpunkts zur Problemlösung"}
 ]}', '{}', 1, 20);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Metriken & Qualität', 'IT Nouns: Metrics & Quality',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Performance-Metrik", "definition": "Ein messbarer Kennwert zur Bewertung der Systemleistung"},
   {"word": "Die Effizienz", "definition": "Das Verhältnis zwischen eingesetzten Ressourcen und erzieltem Ergebnis"},
   {"word": "Die Qualität", "definition": "Der Grad, zu dem ein Produkt die Anforderungen erfüllt"},
   {"word": "Die Statistik", "definition": "Eine zahlenbasierte Auswertung zur Analyse von Mustern"},
   {"word": "Das Ergebnis", "definition": "Das messbare Resultat einer Aktion oder eines Tests"}
 ]}', '{}', 1, 21);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Softwarearchitektur', 'IT Nouns: Software Architecture',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Architektur", "definition": "Die grundlegende Struktur und Organisation eines Softwaresystems"},
   {"word": "Die Komponente", "definition": "Ein eigenständiger, wiederverwendbarer Baustein einer Anwendung"},
   {"word": "Die Applikation", "definition": "Ein Softwareprogramm, das einen bestimmten Anwendungszweck erfüllt"},
   {"word": "Die Struktur", "definition": "Die Art und Weise, wie Elemente innerhalb eines Systems angeordnet sind"},
   {"word": "Das Grundprinzip", "definition": "Eine grundlegende Regel, auf der eine Architekturentscheidung basiert"}
 ]}', '{}', 1, 22);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Produktentwicklung', 'IT Nouns: Product Development',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Das Feature", "definition": "Eine bestimmte Funktionalität oder Eigenschaft eines Produkts"},
   {"word": "Das Produkt", "definition": "Das Ergebnis eines Entwicklungsprozesses, das an Kunden geliefert wird"},
   {"word": "Das Konzept", "definition": "Ein ausgearbeiteter Plan oder Entwurf für ein Vorhaben"},
   {"word": "Die Methode", "definition": "Ein systematisches Verfahren zur Erreichung eines bestimmten Ziels"},
   {"word": "Die Anfrage", "definition": "Eine formelle Bitte um Information, Ressourcen oder eine Aktion"}
 ]}', '{}', 1, 23);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Problemanalyse', 'IT Nouns: Problem Analysis',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Ursache", "definition": "Der eigentliche Auslöser eines Fehlers oder Problems"},
   {"word": "Der Bug", "definition": "Ein Programmfehler, der zu unerwartetem Verhalten führt"},
   {"word": "Der Störfall", "definition": "Ein unvorhergesehenes Ereignis, das den Betrieb beeinträchtigt"},
   {"word": "Die Kettenreaktion", "definition": "Eine Folge von Ereignissen, bei der jedes das nächste auslöst"},
   {"word": "Die Analyse", "definition": "Die systematische Untersuchung eines Problems zur Ursachenfindung"}
 ]}', '{}', 1, 24);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Governance & Standards', 'IT Nouns: Governance & Standards',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Richtlinie", "definition": "Eine verbindliche Vorgabe, die das Handeln in einer Organisation regelt"},
   {"word": "Die Normung", "definition": "Die Festlegung einheitlicher technischer Standards"},
   {"word": "Die Regel", "definition": "Eine festgelegte Vorschrift, an die sich alle Beteiligten halten müssen"},
   {"word": "Die Norm", "definition": "Ein anerkannter Standard, der Qualitätsanforderungen definiert"},
   {"word": "Die Referenz", "definition": "Ein Bezugspunkt oder Nachschlagewerk für technische Spezifikationen"}
 ]}', '{}', 2, 25);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Risiko & Sicherheit', 'IT Nouns: Risk & Security',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Das Risiko", "definition": "Die Möglichkeit, dass ein negatives Ereignis eintritt"},
   {"word": "Die Gefahr", "definition": "Eine konkrete Bedrohung, die Schaden verursachen kann"},
   {"word": "Die Zukunftsfähigkeit", "definition": "Die Eigenschaft, auch langfristig wettbewerbsfähig und aktuell zu bleiben"},
   {"word": "Die Benachrichtigung", "definition": "Eine automatische Mitteilung über ein Systemereignis an den Nutzer"},
   {"word": "Das Netzwerk", "definition": "Ein Verbund aus miteinander verbundenen Rechnern und Geräten"}
 ]}', '{}', 2, 26);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Projekt & Planung', 'IT Nouns: Project & Planning',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Das Projekt", "definition": "Ein zeitlich begrenztes Vorhaben mit definiertem Ziel und Budget"},
   {"word": "Die Aufgabe", "definition": "Eine konkrete Tätigkeit, die einem Teammitglied zugewiesen wird"},
   {"word": "Die Priorität", "definition": "Die Rangordnung, in der Aufgaben abgearbeitet werden sollen"},
   {"word": "Das Kriterium", "definition": "Ein Maßstab, anhand dessen eine Entscheidung getroffen wird"},
   {"word": "Der Bedarf", "definition": "Die Notwendigkeit oder Nachfrage nach einer bestimmten Ressource"}
 ]}', '{}', 1, 27);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: System & Umgebung', 'IT Nouns: System & Environment',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Das System", "definition": "Eine Gesamtheit von Komponenten, die als Einheit zusammenwirken"},
   {"word": "Die Umgebung", "definition": "Die technische Infrastruktur, in der eine Software betrieben wird"},
   {"word": "Die Software", "definition": "Die Gesamtheit aller Programme und Anwendungen eines Rechners"},
   {"word": "Die Funktion", "definition": "Eine abgegrenzte Fähigkeit, die eine Software dem Nutzer bereitstellt"},
   {"word": "Der Algorithmus", "definition": "Eine schrittweise Vorschrift zur Lösung eines Problems"}
 ]}', '{}', 1, 28);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Daten & Profile', 'IT Nouns: Data & Profiles',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Das Profil", "definition": "Eine Sammlung nutzerbezogener Einstellungen und Informationen"},
   {"word": "Das Formular", "definition": "Eine strukturierte Eingabemaske zur Erfassung von Daten"},
   {"word": "Das Merkmal", "definition": "Eine charakteristische Eigenschaft, die ein Objekt beschreibt"},
   {"word": "Die Eigenschaft", "definition": "Ein bestimmtes Attribut, das über Parameter konfiguriert wird"},
   {"word": "Die Definition", "definition": "Die präzise Festlegung, was ein Begriff oder Kriterium bedeutet"}
 ]}', '{}', 1, 29);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Organisation & Aufbau', 'IT Nouns: Organization & Structure',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Organisation", "definition": "Eine Einheit, die mehrere Teams und Projekte verwaltet"},
   {"word": "Der Aufbau", "definition": "Die innere Gliederung und Anordnung einer Anwendung"},
   {"word": "Das Gefüge", "definition": "Das Gesamtgefüge aus zusammenwirkenden Teilen eines Systems"},
   {"word": "Die Ebene", "definition": "Eine logische oder technische Schicht innerhalb einer Architektur"},
   {"word": "Der Bildschirm", "definition": "Die Anzeigefläche, auf der dem Nutzer Inhalte dargestellt werden"}
 ]}', '{}', 1, 30);


-- ────────────────────────────────────────────────────────────
-- 1B. Fill-in (15 exercises, sort_order 31-45)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Redundanz', 'IT Nouns in Context: Redundancy',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Um Datenverlust auszuschließen, haben wir eine geografische _____ für unsere Datenbanken etabliert.", "options": ["Redundanz", "Auslastung", "Normung"]}',
 '{"correct": 0}', 2, 31);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Zukunftsfähigkeit', 'IT Nouns in Context: Future-Proofing',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Diese technologische Entscheidung sichert die _____ unserer gesamten Plattform.", "options": ["Zukunftsfähigkeit", "Compliance-Richtlinien", "Kettenreaktion"]}',
 '{"correct": 0}', 2, 32);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Datensicherheit', 'IT Nouns in Context: Data Security',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Höchste _____ wird durch eine durchgehende Ende-zu-Ende-Verschlüsselung garantiert.", "options": ["Datensicherheit", "Prognose", "Methode"]}',
 '{"correct": 0}', 2, 33);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: DSGVO', 'IT Nouns in Context: GDPR',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Sämtliche Prozesse wurden im Hinblick auf die Konformität mit der _____ auditiert.", "options": ["DSGVO", "Normung", "Freigabe"]}',
 '{"correct": 0}', 2, 34);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Markteinführung', 'IT Nouns in Context: Market Launch',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Die _____ der App wurde durch eine großangelegte Marketingkampagne begleitet.", "options": ["Markteinführung", "Geheimhaltungsvereinbarung", "Ressourcenplanung"]}',
 '{"correct": 0}', 1, 35);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Prozessautomatisierung', 'IT Nouns in Context: Process Automation',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Durch konsequente _____ haben wir manuelle Fehlerquellen eliminiert.", "options": ["Prozessautomatisierung", "Teamdynamik", "Beweislast"]}',
 '{"correct": 0}', 2, 36);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Kundenorientierung', 'IT Nouns in Context: Customer Centricity',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Bei der Priorisierung der Roadmap steht die _____ an erster Stelle.", "options": ["Kundenorientierung", "Belastungsspitze", "Statistik"]}',
 '{"correct": 0}', 1, 37);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Auslastung', 'IT Nouns in Context: Utilization',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Wir müssen die _____ der Serverkapazitäten optimieren, um Latenzen zu vermeiden.", "options": ["Auslastung", "Richtlinie", "Architektur"]}',
 '{"correct": 0}', 1, 38);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Compliance', 'IT Nouns in Context: Compliance',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Wir schulen alle Entwickler regelmäßig bezüglich unserer internen _____.", "options": ["Compliance-Richtlinien", "Performance-Metrik", "Nachjustierung"]}',
 '{"correct": 0}', 2, 39);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Kommunikation', 'IT Nouns in Context: Communication',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "In bereichsübergreifenden Projekten ist die _____ der Techniker entscheidend.", "options": ["Kommunikationsfähigkeit", "Redundanz", "Freigabe"]}',
 '{"correct": 0}', 1, 40);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Kettenreaktion', 'IT Nouns in Context: Chain Reaction',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Ein einziger fehlgeschlagener Microservice kann eine _____ im gesamten System auslösen.", "options": ["Kettenreaktion", "Normung", "Verhandlungssache"]}',
 '{"correct": 0}', 2, 41);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Interoperabilität', 'IT Nouns in Context: Interoperability',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Die _____ zwischen den verschiedenen Systemen wird über standardisierte APIs sichergestellt.", "options": ["Interoperabilität", "Hands-on-Mentalität", "Beweislast"]}',
 '{"correct": 0}', 2, 42);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Belastungsspitze', 'IT Nouns in Context: Peak Load',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Während der Black-Friday-Woche müssen wir auf extreme _____ vorbereitet sein.", "options": ["Belastungsspitzen", "Prognosen", "Definitionen"]}',
 '{"correct": 0}', 2, 43);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Normung', 'IT Nouns in Context: Standardization',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Die _____ der API-Schnittstellen erleichtert die Integration erheblich.", "options": ["Normung", "Gefahr", "Ursache"]}',
 '{"correct": 0}', 2, 44);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Geheimhaltung', 'IT Nouns in Context: NDA',
 'Wähle das passende Nomen.', 'Choose the correct noun.',
 '{"sentence": "Vor Einsicht in den Quellcode muss eine entsprechende _____ unterzeichnet werden.", "options": ["Geheimhaltungsvereinbarung", "Zielsetzung", "Komponente"]}',
 '{"correct": 0}', 2, 45);


-- ────────────────────────────────────────────────────────────
-- 1C. Multiple Choice (15 exercises, sort_order 46-60)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Redundanz?', 'What does Redundanz mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Um Datenverlust auszuschließen, haben wir eine geografische Redundanz für unsere Datenbanken etabliert.", "options": ["Die mehrfache Absicherung kritischer Systeme durch Duplikation", "Die Entfernung unnötiger Dateien aus dem System", "Die Optimierung der Datenbankabfragen", "Die Verschlüsselung sensibler Daten"]}',
 '{"correct": 0}',
 'Redundanz bedeutet, dass kritische Komponenten mehrfach vorhanden sind, damit bei einem Ausfall eine Ersatzkomponente einspringt.',
 'Redundanz means critical components exist multiple times so that a backup takes over in case of failure.', 2, 46);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Zukunftsfähigkeit?', 'What does Zukunftsfähigkeit mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Diese technologische Entscheidung sichert die Zukunftsfähigkeit unserer gesamten Plattform.", "options": ["Die Eigenschaft, auch langfristig funktional und wettbewerbsfähig zu bleiben", "Die Fähigkeit, Daten in die Zukunft zu prognostizieren", "Die Möglichkeit, ein Produkt rückwirkend zu verbessern", "Die Kompatibilität mit zukünftigen Betriebssystemen"]}',
 '{"correct": 0}',
 'Zukunftsfähigkeit beschreibt, dass eine Lösung so konzipiert ist, dass sie auch bei sich ändernden Anforderungen relevant bleibt.',
 'Zukunftsfähigkeit describes that a solution is designed to remain relevant even as requirements change.', 2, 47);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Prozessautomatisierung?', 'What does Prozessautomatisierung mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Durch konsequente Prozessautomatisierung haben wir manuelle Fehlerquellen eliminiert.", "options": ["Die Umwandlung manueller Abläufe in automatisch gesteuerte Workflows", "Die manuelle Überprüfung aller Systemprozesse", "Die Dokumentation bestehender Arbeitsabläufe", "Die Schulung von Mitarbeitern für neue Prozesse"]}',
 '{"correct": 0}',
 'Prozessautomatisierung bedeutet, wiederkehrende manuelle Tätigkeiten durch automatische Abläufe zu ersetzen.',
 'Prozessautomatisierung means replacing recurring manual tasks with automated workflows.', 2, 48);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Interoperabilität?', 'What does Interoperabilität mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Die Interoperabilität zwischen den verschiedenen Systemen wird über standardisierte APIs sichergestellt.", "options": ["Die Fähigkeit unterschiedlicher Systeme, nahtlos zusammenzuarbeiten", "Die Geschwindigkeit der Datenübertragung zwischen Systemen", "Die Verschlüsselung bei der Kommunikation zwischen Systemen", "Die Trennung verschiedener Systeme aus Sicherheitsgründen"]}',
 '{"correct": 0}',
 'Interoperabilität ist die Fähigkeit verschiedener Systeme, Daten und Funktionen reibungslos auszutauschen.',
 'Interoperabilität is the ability of different systems to seamlessly exchange data and functionality.', 2, 49);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Welches Nomen passt: Beweislast?', 'Which noun fits: Burden of Proof?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Im Falle eines Systemausfalls liegt die Beweislast beim externen Hosting-Anbieter.", "options": ["Die Pflicht, die eigene Aussage oder Unschuld zu belegen", "Die Last auf den Servern bei hohem Traffic", "Die Menge an gespeicherten Beweisdokumenten", "Die Kosten für forensische Untersuchungen"]}',
 '{"correct": 0}',
 'Beweislast ist ein juristischer Begriff: Wer die Beweislast trägt, muss nachweisen, dass seine Position korrekt ist.',
 'Beweislast is a legal term: whoever bears the burden of proof must demonstrate that their position is correct.', 2, 50);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Welches Nomen passt: Kettenreaktion?', 'Which noun fits: Chain Reaction?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Ein einziger fehlgeschlagener Microservice kann eine Kettenreaktion im gesamten System auslösen.", "options": ["Eine Abfolge von Fehlern, bei der jeder den nächsten verursacht", "Eine Sicherheitskette für Serverracks", "Ein Blockchain-basiertes Validierungssystem", "Die Verkettung von Datenbankabfragen"]}',
 '{"correct": 0}',
 'Eine Kettenreaktion beschreibt, wie ein Fehler weitere Fehler nach sich zieht — typisch für eng gekoppelte Systeme.',
 'A Kettenreaktion describes how one error triggers further errors -- typical for tightly coupled systems.', 2, 51);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Performance-Metrik?', 'What does Performance-Metrik mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Wir überwachen jede relevante Performance-Metrik in Echtzeit über unser Dashboard.", "options": ["Ein messbarer Kennwert zur Bewertung der Systemleistung", "Ein Tool zur Visualisierung von Daten", "Ein Framework für automatisierte Tests", "Eine Methode zur Teamleistungsbewertung"]}',
 '{"correct": 0}',
 'Eine Performance-Metrik ist ein konkreter, messbarer Wert wie Latenz, Throughput oder Error Rate.',
 'A Performance-Metrik is a concrete, measurable value such as latency, throughput, or error rate.', 1, 52);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Welches Nomen passt: Ressourcenplanung?', 'Which noun fits: Resource Planning?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Eine vorausschauende Ressourcenplanung verhindert Burnout-Szenarien während der Release-Phase.", "options": ["Die strategische Verteilung von Personal, Zeit und Budget auf Aufgaben", "Die Planung des Serverbedarfs für die nächsten Jahre", "Die automatische Skalierung von Cloud-Ressourcen", "Die Dokumentation aller verfügbaren Tools"]}',
 '{"correct": 0}',
 'Ressourcenplanung umfasst die vorausschauende Zuweisung von Personal, Budget und Zeit, um Überlastung zu vermeiden.',
 'Ressourcenplanung encompasses the forward-looking allocation of staff, budget, and time to avoid overload.', 1, 53);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Geheimhaltungsvereinbarung?', 'What does Geheimhaltungsvereinbarung mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Vor Einsicht in den Quellcode muss eine entsprechende Geheimhaltungsvereinbarung unterzeichnet werden.", "options": ["Ein Vertrag, der die Weitergabe vertraulicher Informationen untersagt", "Eine technische Maßnahme zur Verschlüsselung von Daten", "Eine interne Richtlinie für den Umgang mit Passwörtern", "Ein Protokoll für die sichere Datenübertragung"]}',
 '{"correct": 0}',
 'Geheimhaltungsvereinbarung = NDA (Non-Disclosure Agreement). Ein Vertrag, der beide Parteien zur Vertraulichkeit verpflichtet.',
 'Geheimhaltungsvereinbarung = NDA (Non-Disclosure Agreement). A contract that obliges both parties to confidentiality.', 2, 54);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Welches Nomen passt: Nachjustierung?', 'Which noun fits: Readjustment?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Nach dem ersten Feedback der Beta-Tester ist eine feingliedrige Nachjustierung der UI erforderlich.", "options": ["Eine gezielte Korrektur oder Feinjustierung nach ersten Ergebnissen", "Eine komplette Neuentwicklung des Produkts", "Die endgültige Abnahme durch den Kunden", "Das Zurücksetzen auf eine frühere Version"]}',
 '{"correct": 0}',
 'Nachjustierung = kleine, gezielte Anpassungen. Nicht zu verwechseln mit einem Rewrite oder Rollback.',
 'Nachjustierung = small, targeted adjustments. Not to be confused with a rewrite or rollback.', 1, 55);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Normung?', 'What does Normung mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Die Normung der API-Schnittstellen erleichtert die Integration erheblich.", "options": ["Die Festlegung einheitlicher Standards für technische Spezifikationen", "Die Komprimierung von Daten auf ein Normalmaß", "Die Sicherheitsprüfung eines Systems", "Die Kalibrierung von Testdaten"]}',
 '{"correct": 0}',
 'Normung beschreibt den Prozess, verbindliche Standards zu definieren, damit Systeme kompatibel zusammenarbeiten können.',
 'Normung describes the process of defining binding standards so that systems can work together compatibly.', 2, 56);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Hands-on-Mentalität?', 'What does Hands-on-Mentalität mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "In unserem Startup schätzen wir Entwickler mit einer ausgeprägten Hands-on-Mentalität.", "options": ["Die Bereitschaft, selbst aktiv anzupacken statt nur zu delegieren", "Die Fähigkeit, mit der Tastatur schnell zu tippen", "Die Gewohnheit, alles manuell statt automatisiert zu machen", "Die Präferenz für physische statt virtuelle Meetings"]}',
 '{"correct": 0}',
 'Hands-on-Mentalität = Man wartet nicht auf Anweisungen, sondern packt selbst an. Besonders in Startups geschätzt.',
 'Hands-on-Mentalität = You don''t wait for instructions but take action yourself. Especially valued in startups.', 1, 57);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Welches Nomen passt: Verhandlungssache?', 'Which noun fits: Matter of Negotiation?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Die genaue Ausgestaltung des Budgets für neue Lizenzen ist noch Verhandlungssache.", "options": ["Ein Punkt, über den noch diskutiert und verhandelt werden muss", "Eine Aufgabe, die automatisch abgewickelt wird", "Ein bereits beschlossener Budgetposten", "Eine technische Abhängigkeit zwischen Modulen"]}',
 '{"correct": 0}',
 'Verhandlungssache = Noch nicht entschieden, muss zwischen den Parteien ausgehandelt werden.',
 'Verhandlungssache = Not yet decided, needs to be negotiated between the parties.', 1, 58);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Prognose?', 'What does Prognose mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Die KI-basierte Prognose sagt den Absatz für die nächsten 30 Tage voraus.", "options": ["Eine datengestützte Vorhersage zukünftiger Entwicklungen", "Ein Bericht über vergangene Ereignisse", "Eine manuelle Schätzung ohne Datengrundlage", "Ein Dashboardfilter für historische Daten"]}',
 '{"correct": 0}',
 'Prognose = Vorhersage auf Basis von Daten und Modellen. Wird im IT-Kontext oft für ML-basierte Predictions verwendet.',
 'Prognose = prediction based on data and models. Often used in IT context for ML-based predictions.', 1, 59);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Perspektivwechsel?', 'What does Perspektivwechsel mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Ein Perspektivwechsel hilft oft, festgefahrene Diskussionen im Team aufzulösen.", "options": ["Die bewusste Einnahme eines anderen Standpunkts", "Ein Wechsel der Bildschirmansicht im Programm", "Ein Rollentausch zwischen Entwicklern und Testern", "Die Rotation von Teammitgliedern zwischen Projekten"]}',
 '{"correct": 0}',
 'Perspektivwechsel = Sich in die Position eines anderen versetzen, um neue Lösungsansätze zu finden.',
 'Perspektivwechsel = putting yourself in another person''s position to find new approaches.', 1, 60);


-- ============================================================
-- SECTION 2: POWER VERBEN
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 2A. Definition Match (15 exercises, sort_order 12-26)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Analyse & Prüfung', 'IT Verbs: Analysis & Verification',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "analysieren", "definition": "Daten oder Logfiles systematisch untersuchen, um Ursachen zu finden"},
   {"word": "prüfen", "definition": "Die Korrektheit oder Einhaltung von Standards kontrollieren"},
   {"word": "dokumentieren", "definition": "Änderungen und Entscheidungen schriftlich für die Nachwelt festhalten"},
   {"word": "strukturieren", "definition": "Informationen oder Code in eine logische Ordnung bringen"},
   {"word": "lösen", "definition": "Ein technisches Problem durch gezielte Maßnahmen beseitigen"}
 ]}', '{}', 1, 12);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Veränderung & Fortschritt', 'IT Verbs: Change & Progress',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "modernisieren", "definition": "Veraltete Systeme auf einen aktuellen technischen Stand bringen"},
   {"word": "beschleunigen", "definition": "Einen Prozess oder Ablauf schneller machen"},
   {"word": "verbessern", "definition": "Die Qualität oder Leistung eines bestehenden Systems steigern"},
   {"word": "vereinfachen", "definition": "Einen komplexen Vorgang auf das Wesentliche reduzieren"},
   {"word": "reduzieren", "definition": "Etwas in Umfang, Menge oder Komplexität verringern"}
 ]}', '{}', 1, 13);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Integration & Verknüpfung', 'IT Verbs: Integration & Linking',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "integrieren", "definition": "Ein neues Modul nahtlos in eine bestehende Architektur einbinden"},
   {"word": "verknüpfen", "definition": "Zwei Datenquellen oder Systeme sinnvoll miteinander verbinden"},
   {"word": "zusammenarbeiten", "definition": "Gemeinsam mit anderen an einem Ziel arbeiten"},
   {"word": "unterstützen", "definition": "Einem Team oder System zusätzliche Hilfe oder Ressourcen bereitstellen"},
   {"word": "zuweisen", "definition": "Einer Person oder Ressource eine bestimmte Aufgabe zuordnen"}
 ]}', '{}', 1, 14);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Planung & Steuerung', 'IT Verbs: Planning & Control',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "steuern", "definition": "Die Verteilung und den Ablauf von Prozessen kontrollieren"},
   {"word": "leiten", "definition": "Ein Team oder Projekt als verantwortliche Person führen"},
   {"word": "vorschlagen", "definition": "Eine Idee oder einen Ansatz zur Diskussion einbringen"},
   {"word": "sicherstellen", "definition": "Garantieren, dass ein bestimmter Zustand erreicht oder eingehalten wird"},
   {"word": "vermeiden", "definition": "Aktiv verhindern, dass ein Problem überhaupt entsteht"}
 ]}', '{}', 1, 15);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Umsetzung & Verantwortung', 'IT Verbs: Execution & Ownership',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "umsetzen", "definition": "Anforderungen in funktionierenden Code oder Prozesse überführen"},
   {"word": "übernehmen", "definition": "Die Verantwortung für einen Bereich oder eine Aufgabe auf sich nehmen"},
   {"word": "erreichen", "definition": "Ein definiertes Ziel oder eine Verbesserung tatsächlich erzielen"},
   {"word": "fördern", "definition": "Wissensaustausch oder die Entwicklung von Teammitgliedern aktiv unterstützen"},
   {"word": "verwenden", "definition": "Ein bestimmtes Tool oder Framework für eine Aufgabe einsetzen"}
 ]}', '{}', 1, 16);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Risiko & Prävention', 'IT Verbs: Risk & Prevention',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "vermeiden", "definition": "Proaktiv verhindern, dass ein Fehler oder Problem entsteht"},
   {"word": "warten", "definition": "Server und Systeme regelmäßig pflegen und aktualisieren"},
   {"word": "verzögern", "definition": "Einen geplanten Termin ungewollt nach hinten verschieben"},
   {"word": "prüfen", "definition": "Einen Pull-Request oder eine Konfiguration auf Richtigkeit kontrollieren"},
   {"word": "reduzieren", "definition": "Das übertragene Datenvolumen oder die Fehlerquote verringern"}
 ]}', '{}', 2, 17);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Kommunikation & Zusammenarbeit', 'IT Verbs: Communication & Collaboration',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "zusammenarbeiten", "definition": "Eng mit einer anderen Abteilung an einem gemeinsamen Ziel arbeiten"},
   {"word": "vorschlagen", "definition": "Dem Team eine Alternative oder einen neuen Ansatz empfehlen"},
   {"word": "dokumentieren", "definition": "Technische Entscheidungen nachvollziehbar verschriftlichen"},
   {"word": "leiten", "definition": "Als Verantwortlicher ein Projekt oder Team führen"},
   {"word": "fördern", "definition": "Regelmäßige Tech-Talks oder Wissensaustausch im Team anregen"}
 ]}', '{}', 1, 18);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Optimierung & Effizienz', 'IT Verbs: Optimization & Efficiency',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "beschleunigen", "definition": "Deployment-Zyklen oder Prozesse merklich schneller machen"},
   {"word": "vereinfachen", "definition": "Die Handhabung einer API oder eines Workflows zugänglicher machen"},
   {"word": "verbessern", "definition": "Die Benutzererfahrung oder Codequalität kontinuierlich steigern"},
   {"word": "modernisieren", "definition": "Legacy-Systeme schrittweise durch aktuelle Technologien ersetzen"},
   {"word": "steuern", "definition": "Die Verteilung von Anfragen automatisch über Regionen kontrollieren"}
 ]}', '{}', 1, 19);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Ressourcen & Zuweisung', 'IT Verbs: Resources & Allocation',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "zuweisen", "definition": "Aufgaben im Sprint basierend auf Expertise verteilen"},
   {"word": "verfügen über", "definition": "Über eine bestimmte Technologie oder Ressource verfügen"},
   {"word": "verwenden", "definition": "Modernste Frameworks für die Entwicklung einsetzen"},
   {"word": "unterstützen", "definition": "Mehrere Programmiersprachen auf einer Plattform nativ anbieten"},
   {"word": "warten", "definition": "Server pflegen und regelmäßig Sicherheitsupdates installieren"}
 ]}', '{}', 1, 20);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Problemlösung', 'IT Verbs: Problem Solving',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "lösen", "definition": "Ein Skalierungsproblem durch technische Maßnahmen beseitigen"},
   {"word": "analysieren", "definition": "Logfiles untersuchen, um die Ursache eines Absturzes zu finden"},
   {"word": "sicherstellen", "definition": "Durch Maßnahmen garantieren, dass Backups korrekt laufen"},
   {"word": "integrieren", "definition": "Ein neues Modul in eine bestehende Systemlandschaft einfügen"},
   {"word": "erreichen", "definition": "Durch gezieltes Refactoring eine messbare Verbesserung erzielen"}
 ]}', '{}', 2, 21);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Führung & Delegation', 'IT Verbs: Leadership & Delegation',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "leiten", "definition": "Ein Team von Entwicklern als Lead erfolgreich führen"},
   {"word": "übernehmen", "definition": "Die Verantwortung für das Release-Management auf sich nehmen"},
   {"word": "zuweisen", "definition": "Aufgaben basierend auf der Expertise der Entwickler verteilen"},
   {"word": "strukturieren", "definition": "Ein Jira-Board neu ordnen, um die Übersicht zu verbessern"},
   {"word": "umsetzen", "definition": "Kundenanforderungen technisch präzise in Code überführen"}
 ]}', '{}', 1, 22);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Migration & Transformation', 'IT Verbs: Migration & Transformation',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "modernisieren", "definition": "Bestehende Systeme auf aktuelle Technologien umstellen"},
   {"word": "integrieren", "definition": "Ein Messaging-Modul nahtlos in die Architektur einbinden"},
   {"word": "verknüpfen", "definition": "Kundendaten mit Transaktionsprotokollen sinnvoll zusammenführen"},
   {"word": "beschleunigen", "definition": "Durch Docker die Deployment-Zyklen massiv verkürzen"},
   {"word": "umsetzen", "definition": "Anforderungen eines Kunden technisch in die Praxis überführen"}
 ]}', '{}', 2, 23);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Qualität & Wartung', 'IT Verbs: Quality & Maintenance',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "warten", "definition": "Server regelmäßig pflegen und Sicherheitsupdates einspielen"},
   {"word": "dokumentieren", "definition": "Jede Code-Änderung für die langfristige Wartbarkeit aufzeichnen"},
   {"word": "verbessern", "definition": "Die Benutzererfahrung der App ständig weiterentwickeln"},
   {"word": "prüfen", "definition": "Einen Pull-Request auf Einhaltung der Coding-Standards kontrollieren"},
   {"word": "vereinfachen", "definition": "Durch Abstraktion die Handhabung einer API zugänglicher machen"}
 ]}', '{}', 1, 24);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Zeitmanagement & Hindernisse', 'IT Verbs: Time Management & Obstacles',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "verzögern", "definition": "Einen Release-Termin durch unvorhergesehene Probleme nach hinten schieben"},
   {"word": "vermeiden", "definition": "Durch sauberen Code viele Bugs bereits im Vorfeld verhindern"},
   {"word": "steuern", "definition": "Die Verteilung der Anfragen automatisch über Regionen lenken"},
   {"word": "sicherstellen", "definition": "Garantieren, dass alle Backups regelmäßig und korrekt laufen"},
   {"word": "übernehmen", "definition": "Ab nächstem Monat die Verantwortung für ein Aufgabengebiet tragen"}
 ]}', '{}', 2, 25);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Technische Fähigkeiten', 'IT Verbs: Technical Capabilities',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "verfügen über", "definition": "Eine hochmoderne Technologie als Teil der Plattform haben"},
   {"word": "verwenden", "definition": "Bestimmte Frameworks gezielt einsetzen, um die Entwicklung zu verkürzen"},
   {"word": "unterstützen", "definition": "Mehrere Programmiersprachen nativ auf der Plattform anbieten"},
   {"word": "lösen", "definition": "Ein Skalierungsproblem durch den Einsatz von Caching beheben"},
   {"word": "reduzieren", "definition": "Durch Kompression das übertragene Datenvolumen deutlich senken"}
 ]}', '{}', 2, 26);


-- ────────────────────────────────────────────────────────────
-- 2B. Fill-in (17 exercises, sort_order 27-43)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Analyse', 'IT Verbs in Context: Analysis',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Wir _____ derzeit die Logfiles, um die Ursache für den Systemabsturz zu finden.", "options": ["analysieren", "zuweisen", "verzögern"]}',
 '{"correct": 0}', 1, 27);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Beschleunigung', 'IT Verbs in Context: Acceleration',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Die Einführung von Docker konnte unsere Deployment-Zyklen massiv _____.", "options": ["beschleunigen", "vermeiden", "strukturieren"]}',
 '{"correct": 0}', 1, 28);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Dokumentation', 'IT Verbs in Context: Documentation',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Es ist unerlässlich, jede Code-Änderung für die langfristige Wartbarkeit zu _____.", "options": ["dokumentieren", "verzögern", "steuern"]}',
 '{"correct": 0}', 1, 29);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Integration', 'IT Verbs in Context: Integration',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Das neue Messaging-Modul lässt sich nahtlos in die bestehende Architektur _____.", "options": ["integrieren", "vermeiden", "warten"]}',
 '{"correct": 0}', 1, 30);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Führung', 'IT Verbs in Context: Leadership',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "In meinem letzten Projekt habe ich ein Team von fünf Entwicklern erfolgreich _____.", "options": ["geleitet", "reduziert", "verknüpft"]}',
 '{"correct": 0}', 1, 31);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Problemlösung', 'IT Verbs in Context: Problem Solving',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Wir haben das Skalierungsproblem durch den Einsatz von Caching-Layern _____.", "options": ["gelöst", "vorgeschlagen", "zugewiesen"]}',
 '{"correct": 0}', 1, 32);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Modernisierung', 'IT Verbs in Context: Modernization',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Wir müssen unsere Legacy-Systeme schrittweise _____, um wettbewerbsfähig zu bleiben.", "options": ["modernisieren", "zuweisen", "dokumentieren"]}',
 '{"correct": 0}', 2, 33);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Code-Review', 'IT Verbs in Context: Code Review',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Bitte _____ Sie den Pull-Request hinsichtlich der Einhaltung unserer Coding-Standards.", "options": ["prüfen", "fördern", "verwenden"]}',
 '{"correct": 0}', 1, 34);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Datenvolumen', 'IT Verbs in Context: Data Volume',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Durch Kompression konnten wir das übertragene Datenvolumen deutlich _____.", "options": ["reduzieren", "leiten", "zusammenarbeiten"]}',
 '{"correct": 0}', 1, 35);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Backups', 'IT Verbs in Context: Backups',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Wir müssen _____, dass alle Backups regelmäßig und korrekt ausgeführt werden.", "options": ["sicherstellen", "vereinfachen", "beschleunigen"]}',
 '{"correct": 0}', 2, 36);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Steuerung', 'IT Verbs in Context: Control',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Das System _____ die Verteilung der Anfragen automatisch über verschiedene Regionen.", "options": ["steuert", "wartet", "verzögert"]}',
 '{"correct": 0}', 2, 37);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Struktur', 'IT Verbs in Context: Structure',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Ich habe geholfen, das Jira-Board neu zu _____, um die Übersicht zu verbessern.", "options": ["strukturieren", "reduzieren", "sicherstellen"]}',
 '{"correct": 0}', 1, 38);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Verantwortung', 'IT Verbs in Context: Responsibility',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Ich werde die Verantwortung für das Release-Management im nächsten Monat _____.", "options": ["übernehmen", "vermeiden", "analysieren"]}',
 '{"correct": 0}', 1, 39);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Umsetzung', 'IT Verbs in Context: Implementation',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Wir haben die Anforderungen des Kunden technisch präzise _____.", "options": ["umgesetzt", "verzögert", "gewartet"]}',
 '{"correct": 0}', 1, 40);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Plattform', 'IT Verbs in Context: Platform',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Die neue Plattform wird mehrere Programmiersprachen nativ _____.", "options": ["unterstützen", "steuern", "prüfen"]}',
 '{"correct": 0}', 1, 41);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Verzögerung', 'IT Verbs in Context: Delay',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Unvorhergesehene API-Änderungen könnten den Release-Termin leider _____.", "options": ["verzögern", "fördern", "lösen"]}',
 '{"correct": 0}', 2, 42);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Zusammenarbeit', 'IT Verbs in Context: Collaboration',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Wir _____ eng mit der Design-Abteilung zusammen, um die Usability zu steigern.", "options": ["arbeiten", "weisen", "verwenden"]}',
 '{"correct": 0}', 1, 43);


-- ────────────────────────────────────────────────────────────
-- 2C. Synonym Match (17 exercises, sort_order 44-60)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (4)', 'IT Verbs: Find Synonyms (4)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "analysieren", "synonym": "untersuchen"},
   {"word": "dokumentieren", "synonym": "aufschreiben / festhalten"},
   {"word": "strukturieren", "synonym": "ordnen / gliedern"},
   {"word": "lösen", "synonym": "beheben / klären"}
 ]}', '{"correct": []}', 1, 44);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (5)', 'IT Verbs: Find Synonyms (5)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "modernisieren", "synonym": "erneuern / auf den neuesten Stand bringen"},
   {"word": "beschleunigen", "synonym": "schneller machen"},
   {"word": "reduzieren", "synonym": "senken / weniger machen"},
   {"word": "vereinfachen", "synonym": "leichter machen"}
 ]}', '{"correct": []}', 1, 45);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (6)', 'IT Verbs: Find Synonyms (6)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "integrieren", "synonym": "einbinden / hinzufügen"},
   {"word": "verknüpfen", "synonym": "verbinden / zusammenführen"},
   {"word": "steuern", "synonym": "lenken / kontrollieren"},
   {"word": "leiten", "synonym": "führen / anleiten"}
 ]}', '{"correct": []}', 1, 46);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (7)', 'IT Verbs: Find Synonyms (7)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "sicherstellen", "synonym": "dafür sorgen / garantieren"},
   {"word": "umsetzen", "synonym": "machen / in die Tat umsetzen"},
   {"word": "übernehmen", "synonym": "auf sich nehmen"},
   {"word": "unterstützen", "synonym": "helfen / beistehen"}
 ]}', '{"correct": []}', 1, 47);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (8)', 'IT Verbs: Find Synonyms (8)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "vermeiden", "synonym": "verhindern / umgehen"},
   {"word": "verzögern", "synonym": "aufschieben / hinausschieben"},
   {"word": "vorschlagen", "synonym": "empfehlen / anbieten"},
   {"word": "zuweisen", "synonym": "zuteilen / geben"}
 ]}', '{"correct": []}', 1, 48);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (9)', 'IT Verbs: Find Synonyms (9)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "verbessern", "synonym": "besser machen / aufwerten"},
   {"word": "fördern", "synonym": "unterstützen / vorantreiben"},
   {"word": "erreichen", "synonym": "schaffen / erzielen"},
   {"word": "verwenden", "synonym": "benutzen / gebrauchen"}
 ]}', '{"correct": []}', 1, 49);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (10)', 'IT Verbs: Find Synonyms (10)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "warten", "synonym": "pflegen / instand halten"},
   {"word": "prüfen", "synonym": "kontrollieren / checken"},
   {"word": "zusammenarbeiten", "synonym": "gemeinsam arbeiten / kooperieren"},
   {"word": "verfügen über", "synonym": "haben / besitzen"}
 ]}', '{"correct": []}', 1, 50);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (11)', 'IT Verbs: Find Synonyms (11)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "analysieren", "synonym": "genau anschauen / auswerten"},
   {"word": "integrieren", "synonym": "einbauen / aufnehmen"},
   {"word": "modernisieren", "synonym": "aktualisieren / auffrischen"},
   {"word": "steuern", "synonym": "regeln / dirigieren"}
 ]}', '{"correct": []}', 2, 51);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (12)', 'IT Verbs: Find Synonyms (12)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "dokumentieren", "synonym": "protokollieren / aufnehmen"},
   {"word": "beschleunigen", "synonym": "vorantreiben / antreiben"},
   {"word": "reduzieren", "synonym": "herunterfahren / kürzen"},
   {"word": "lösen", "synonym": "aus der Welt schaffen / beseitigen"}
 ]}', '{"correct": []}', 2, 52);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (13)', 'IT Verbs: Find Synonyms (13)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "strukturieren", "synonym": "aufteilen / einteilen"},
   {"word": "vereinfachen", "synonym": "entschlacken / verschlanken"},
   {"word": "leiten", "synonym": "vorstehen / die Leitung haben"},
   {"word": "verbessern", "synonym": "optimieren / weiterentwickeln"}
 ]}', '{"correct": []}', 2, 53);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (14)', 'IT Verbs: Find Synonyms (14)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "sicherstellen", "synonym": "absichern / gewährleisten"},
   {"word": "umsetzen", "synonym": "durchführen / ausführen"},
   {"word": "vermeiden", "synonym": "aus dem Weg gehen / unterlassen"},
   {"word": "erreichen", "synonym": "hinbekommen / zustande bringen"}
 ]}', '{"correct": []}', 2, 54);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (15)', 'IT Verbs: Find Synonyms (15)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "übernehmen", "synonym": "sich kümmern um / verantworten"},
   {"word": "zuweisen", "synonym": "verteilen / übertragen"},
   {"word": "vorschlagen", "synonym": "ins Spiel bringen / nahelegen"},
   {"word": "unterstützen", "synonym": "zur Seite stehen / assistieren"}
 ]}', '{"correct": []}', 1, 55);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (16)', 'IT Verbs: Find Synonyms (16)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "verknüpfen", "synonym": "zusammenbringen / koppeln"},
   {"word": "verwenden", "synonym": "nutzen / anwenden"},
   {"word": "fördern", "synonym": "stärken / begünstigen"},
   {"word": "warten", "synonym": "sich kümmern um / betreuen"}
 ]}', '{"correct": []}', 1, 56);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (17)', 'IT Verbs: Find Synonyms (17)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "prüfen", "synonym": "nachsehen / überprüfen"},
   {"word": "zusammenarbeiten", "synonym": "an einem Strang ziehen / teamworken"},
   {"word": "verzögern", "synonym": "bremsen / aufhalten"},
   {"word": "verfügen über", "synonym": "zur Verfügung haben / ausgestattet sein mit"}
 ]}', '{"correct": []}', 2, 57);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (18)', 'IT Verbs: Find Synonyms (18)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "analysieren", "synonym": "durchleuchten / auf den Grund gehen"},
   {"word": "verbessern", "synonym": "verfeinern / nachbessern"},
   {"word": "integrieren", "synonym": "zusammenführen / anschließen"},
   {"word": "beschleunigen", "synonym": "in Schwung bringen / ankurbeln"}
 ]}', '{"correct": []}', 2, 58);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (19)', 'IT Verbs: Find Synonyms (19)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "reduzieren", "synonym": "eindämmen / heruntersetzen"},
   {"word": "leiten", "synonym": "den Hut aufhaben / verantwortlich sein"},
   {"word": "lösen", "synonym": "in den Griff bekommen / bereinigen"},
   {"word": "strukturieren", "synonym": "in Form bringen / sortieren"}
 ]}', '{"correct": []}', 2, 59);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (20)', 'IT Verbs: Find Synonyms (20)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "modernisieren", "synonym": "umbauen / auf Vordermann bringen"},
   {"word": "vereinfachen", "synonym": "abspecken / unkomplizierter machen"},
   {"word": "sicherstellen", "synonym": "dafür sorgen / sichergehen"},
   {"word": "umsetzen", "synonym": "auf die Beine stellen / realisieren"}
 ]}', '{"correct": []}', 2, 60);

-- ============================================================
-- Kollokationen (41 new) + Workshop Phrasen (30 new)
-- Generated 2026-04-16
-- sort_order: kollokationen 10-50, workshop_phrasen 11-40
-- ============================================================


-- ============================================================
-- SECTION 1: KOLLOKATIONEN — Match exercises (10, sort 10-19)
-- ============================================================

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (5)', 'Collocations: Noun + Verb (5)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Eine Redundanz", "match": "schaffen"},
   {"word": "Anforderungen", "match": "umsetzen"},
   {"word": "Prozesse", "match": "optimieren"},
   {"word": "Kapazitäten", "match": "auslasten"},
   {"word": "Einen Fehler", "match": "beheben"}
 ]}', '{}', 1, 10);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (6)', 'Collocations: Noun + Verb (6)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Den Zugriff", "match": "beschränken"},
   {"word": "Kosten", "match": "senken"},
   {"word": "Einen Rückstand", "match": "aufholen"},
   {"word": "Das System", "match": "warten"},
   {"word": "Daten", "match": "auswerten"}
 ]}', '{}', 1, 11);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (7)', 'Collocations: Noun + Verb (7)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Einen Vertrag", "match": "unterzeichnen"},
   {"word": "Erwartungen", "match": "erfüllen"},
   {"word": "Das Budget", "match": "freigeben"},
   {"word": "Eine Lösung", "match": "konzipieren"},
   {"word": "Die Effizienz", "match": "erhöhen"}
 ]}', '{}', 2, 12);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (8)', 'Collocations: Noun + Verb (8)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Wissensaustausch", "match": "fördern"},
   {"word": "Eine Architektur", "match": "entwerfen"},
   {"word": "Ein Update", "match": "einspielen"},
   {"word": "Ressourcen", "match": "allozieren"},
   {"word": "Code", "match": "reviewen"}
 ]}', '{}', 2, 13);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (9)', 'Collocations: Noun + Verb (9)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Eine Strategie", "match": "festlegen"},
   {"word": "Eine Schwachstelle", "match": "identifizieren"},
   {"word": "Eine Verbindung", "match": "herstellen"},
   {"word": "Eine Dokumentation", "match": "erstellen"},
   {"word": "Die Konfiguration", "match": "anpassen"}
 ]}', '{}', 2, 14);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (10)', 'Collocations: Noun + Verb (10)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Ein Deployment", "match": "durchführen"},
   {"word": "Ein Backup", "match": "anlegen"},
   {"word": "Eine Redundanz", "match": "schaffen"},
   {"word": "Einen Rückstand", "match": "aufholen"},
   {"word": "Das Budget", "match": "freigeben"}
 ]}', '{}', 2, 15);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (11)', 'Collocations: Noun + Verb (11)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Die Effizienz", "match": "erhöhen"},
   {"word": "Einen Fehler", "match": "beheben"},
   {"word": "Eine Strategie", "match": "festlegen"},
   {"word": "Ein Update", "match": "einspielen"},
   {"word": "Daten", "match": "auswerten"}
 ]}', '{}', 3, 16);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (12)', 'Collocations: Noun + Verb (12)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Kosten", "match": "senken"},
   {"word": "Eine Lösung", "match": "konzipieren"},
   {"word": "Eine Dokumentation", "match": "erstellen"},
   {"word": "Ressourcen", "match": "allozieren"},
   {"word": "Eine Verbindung", "match": "herstellen"}
 ]}', '{}', 3, 17);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (13)', 'Collocations: Noun + Verb (13)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Eine Architektur", "match": "entwerfen"},
   {"word": "Einen Vertrag", "match": "unterzeichnen"},
   {"word": "Die Konfiguration", "match": "anpassen"},
   {"word": "Ein Backup", "match": "anlegen"},
   {"word": "Wissensaustausch", "match": "fördern"}
 ]}', '{}', 3, 18);

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (14)', 'Collocations: Noun + Verb (14)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Das System", "match": "warten"},
   {"word": "Den Zugriff", "match": "beschränken"},
   {"word": "Eine Schwachstelle", "match": "identifizieren"},
   {"word": "Erwartungen", "match": "erfüllen"},
   {"word": "Code", "match": "reviewen"}
 ]}', '{}', 3, 19);


-- ============================================================
-- SECTION 1: KOLLOKATIONEN — Fill-in exercises (31, sort 20-50)
-- ============================================================

-- #9 Redundanz / schaffen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Redundanz', 'Collocation in Sentence: Redundancy',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Um die Ausfallsicherheit zu verbessern, sollten wir eine Redundanz _____.", "options": ["schaffen", "erzielen", "vorlegen"]}',
 '{"correct": 0}',
 'Redundanz + schaffen = eine Redundanz schaffen (to create redundancy).',
 'Redundanz + schaffen = to create redundancy.', 1, 20);

-- #10 Anforderung / umsetzen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Anforderung', 'Collocation in Sentence: Requirement',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Das Team hat alle Anforderungen aus dem letzten Sprint erfolgreich _____.", "options": ["umgesetzt", "geschaffen", "gewartet"]}',
 '{"correct": 0}',
 'Anforderung + umsetzen = Anforderungen umsetzen (to implement requirements).',
 'Anforderung + umsetzen = to implement requirements.', 1, 21);

-- #11 Prozess / optimieren
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Prozess', 'Collocation in Sentence: Process',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Im Rahmen der Retro haben wir beschlossen, unsere CI/CD-Prozesse zu _____.", "options": ["optimieren", "beschränken", "unterzeichnen"]}',
 '{"correct": 0}',
 'Prozess + optimieren = Prozesse optimieren (to optimize processes).',
 'Prozess + optimieren = to optimize processes.', 1, 22);

-- #12 Kapazität / auslasten
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Kapazität', 'Collocation in Sentence: Capacity',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Wir müssen die vorhandenen Kapazitäten besser _____.", "options": ["auslasten", "freigeben", "einspielen"]}',
 '{"correct": 0}',
 'Kapazität + auslasten = Kapazitäten auslasten (to utilize capacity).',
 'Kapazität + auslasten = to utilize capacity.', 2, 23);

-- #14 Fehler / beheben
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Fehler', 'Collocation in Sentence: Bug',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Der kritische Fehler im Payment-Modul muss bis morgen _____ werden.", "options": ["behoben", "ausgewertet", "alloziert"]}',
 '{"correct": 0}',
 'Fehler + beheben = einen Fehler beheben (to fix a bug/error).',
 'Fehler + beheben = to fix a bug/error.', 1, 24);

-- #15 Zugriff / beschränken
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Zugriff', 'Collocation in Sentence: Access',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Aus Sicherheitsgründen müssen wir den Zugriff auf die Produktionsdatenbank _____.", "options": ["beschränken", "aufholen", "erstellen"]}',
 '{"correct": 0}',
 'Zugriff + beschränken = den Zugriff beschränken (to restrict access).',
 'Zugriff + beschränken = to restrict access.', 1, 25);

-- #16 Kosten / senken
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Kosten', 'Collocation in Sentence: Costs',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Durch die Migration in die Cloud konnten wir die Infrastrukturkosten deutlich _____.", "options": ["senken", "entwerfen", "fördern"]}',
 '{"correct": 0}',
 'Kosten + senken = Kosten senken (to reduce costs).',
 'Kosten + senken = to reduce costs.', 1, 26);

-- #21 Rückstand / aufholen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Rückstand', 'Collocation in Sentence: Backlog',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Das Team plant einen zusätzlichen Sprint, um den Rückstand _____.", "options": ["aufzuholen", "auszuwerten", "anzupassen"]}',
 '{"correct": 0}',
 'Rückstand + aufholen = einen Rückstand aufholen (to catch up on a backlog).',
 'Rückstand + aufholen = to catch up on a backlog.', 2, 27);

-- #24 System / warten
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: System', 'Collocation in Sentence: System',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Während des Wartungsfensters müssen wir das System _____.", "options": ["warten", "festlegen", "schaffen"]}',
 '{"correct": 0}',
 'System + warten = das System warten (to maintain the system).',
 'System + warten = to maintain the system.', 1, 28);

-- #25 Daten / auswerten
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Daten', 'Collocation in Sentence: Data',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Wir müssen die Nutzungsdaten aus dem letzten Quartal _____.", "options": ["auswerten", "beheben", "konzipieren"]}',
 '{"correct": 0}',
 'Daten + auswerten = Daten auswerten (to analyze/evaluate data).',
 'Daten + auswerten = to analyze/evaluate data.', 1, 29);

-- #26 Vertrag / unterzeichnen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Vertrag', 'Collocation in Sentence: Contract',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Bevor wir mit der Implementierung beginnen, muss der Vertrag _____ werden.", "options": ["unterzeichnet", "ausgelastet", "eingespielt"]}',
 '{"correct": 0}',
 'Vertrag + unterzeichnen = einen Vertrag unterzeichnen (to sign a contract).',
 'Vertrag + unterzeichnen = to sign a contract.', 1, 30);

-- #27 Erwartung / erfüllen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Erwartung', 'Collocation in Sentence: Expectation',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Das MVP konnte die Erwartungen der Stakeholder vollständig _____.", "options": ["erfüllen", "senken", "beschränken"]}',
 '{"correct": 0}',
 'Erwartung + erfüllen = Erwartungen erfüllen (to meet expectations).',
 'Erwartung + erfüllen = to meet expectations.', 1, 31);

-- #30 Budget / freigeben
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Budget', 'Collocation in Sentence: Budget',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Die Geschäftsführung hat das Budget für das neue Tooling _____.", "options": ["freigegeben", "aufgeholt", "identifiziert"]}',
 '{"correct": 0}',
 'Budget + freigeben = das Budget freigeben (to approve the budget).',
 'Budget + freigeben = to approve the budget.', 2, 32);

-- #31 Lösung / konzipieren
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Lösung', 'Collocation in Sentence: Solution',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Der Architekt hat eine skalierbare Lösung für den Datenimport _____.", "options": ["konzipiert", "gewartet", "gesenkt"]}',
 '{"correct": 0}',
 'Lösung + konzipieren = eine Lösung konzipieren (to design a solution).',
 'Lösung + konzipieren = to design a solution.', 2, 33);

-- #32 Effizienz / erhöhen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Effizienz', 'Collocation in Sentence: Efficiency',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Durch Automatisierung der Tests konnten wir die Effizienz des Teams _____.", "options": ["erhöhen", "anlegen", "reviewen"]}',
 '{"correct": 0}',
 'Effizienz + erhöhen = die Effizienz erhöhen (to increase efficiency).',
 'Effizienz + erhöhen = to increase efficiency.', 1, 34);

-- #33 Wissensaustausch / fördern
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Wissensaustausch', 'Collocation in Sentence: Knowledge Sharing',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Pair Programming ist eine bewährte Methode, um den Wissensaustausch im Team zu _____.", "options": ["fördern", "unterzeichnen", "beheben"]}',
 '{"correct": 0}',
 'Wissensaustausch + fördern = Wissensaustausch fördern (to promote knowledge sharing).',
 'Wissensaustausch + fördern = to promote knowledge sharing.', 2, 35);

-- #34 Architektur / entwerfen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Architektur', 'Collocation in Sentence: Architecture',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Bevor wir mit der Entwicklung beginnen, müssen wir die Microservice-Architektur _____.", "options": ["entwerfen", "auslasten", "aufholen"]}',
 '{"correct": 0}',
 'Architektur + entwerfen = eine Architektur entwerfen (to design an architecture).',
 'Architektur + entwerfen = to design an architecture.', 2, 36);

-- #36 Update / einspielen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Update', 'Collocation in Sentence: Update',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Das Sicherheitsupdate muss heute Nacht noch _____ werden.", "options": ["eingespielt", "erfüllt", "alloziert"]}',
 '{"correct": 0}',
 'Update + einspielen = ein Update einspielen (to deploy an update).',
 'Update + einspielen = to deploy an update.', 1, 37);

-- #37 Ressource / allozieren
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Ressource', 'Collocation in Sentence: Resource',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Für das Q3-Projekt müssen wir zusätzliche Ressourcen _____.", "options": ["allozieren", "entwerfen", "warten"]}',
 '{"correct": 0}',
 'Ressource + allozieren = Ressourcen allozieren (to allocate resources).',
 'Ressource + allozieren = to allocate resources.', 2, 38);

-- #38 Code / reviewen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Code', 'Collocation in Sentence: Code',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Kannst du bitte den Pull Request _____, bevor wir mergen?", "options": ["reviewen", "freigeben", "schaffen"]}',
 '{"correct": 0}',
 'Code + reviewen = Code reviewen (to review code).',
 'Code + reviewen = to review code.', 1, 39);

-- #39 Strategie / festlegen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Strategie', 'Collocation in Sentence: Strategy',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Im Offsite haben wir die Produktstrategie für das nächste Jahr _____.", "options": ["festgelegt", "behoben", "ausgewertet"]}',
 '{"correct": 0}',
 'Strategie + festlegen = eine Strategie festlegen (to define a strategy).',
 'Strategie + festlegen = to define a strategy.', 2, 40);

-- #40 Schwachstelle / identifizieren
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Schwachstelle', 'Collocation in Sentence: Weak Point',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Der Penetrationstest hat mehrere Schwachstellen im System _____.", "options": ["identifiziert", "konzipiert", "gesenkt"]}',
 '{"correct": 0}',
 'Schwachstelle + identifizieren = eine Schwachstelle identifizieren (to identify a weak point).',
 'Schwachstelle + identifizieren = to identify a weak point.', 2, 41);

-- #42 Verbindung / herstellen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Verbindung', 'Collocation in Sentence: Connection',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Der Service kann keine Verbindung zur Datenbank _____.", "options": ["herstellen", "anlegen", "optimieren"]}',
 '{"correct": 0}',
 'Verbindung + herstellen = eine Verbindung herstellen (to establish a connection).',
 'Verbindung + herstellen = to establish a connection.', 1, 42);

-- #43 Dokumentation / erstellen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Dokumentation', 'Collocation in Sentence: Documentation',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Für die API muss noch eine technische Dokumentation _____ werden.", "options": ["erstellt", "beschränkt", "aufgeholt"]}',
 '{"correct": 0}',
 'Dokumentation + erstellen = eine Dokumentation erstellen (to create documentation).',
 'Dokumentation + erstellen = to create documentation.', 1, 43);

-- #45 Konfiguration / anpassen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Konfiguration', 'Collocation in Sentence: Configuration',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Nach dem Umzug auf den neuen Server müssen wir die Konfiguration _____.", "options": ["anpassen", "erfüllen", "fördern"]}',
 '{"correct": 0}',
 'Konfiguration + anpassen = die Konfiguration anpassen (to adjust the configuration).',
 'Konfiguration + anpassen = to adjust the configuration.', 1, 44);

-- #46 Deployment / durchführen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Deployment', 'Collocation in Sentence: Deployment',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Wir können das Deployment erst _____, wenn alle Tests grün sind.", "options": ["durchführen", "unterzeichnen", "schaffen"]}',
 '{"correct": 0}',
 'Deployment + durchführen = ein Deployment durchführen (to perform a deployment).',
 'Deployment + durchführen = to perform a deployment.', 1, 45);

-- #48 Backup / anlegen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Backup', 'Collocation in Sentence: Backup',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Vor jeder Migration muss ein vollständiges Backup _____ werden.", "options": ["angelegt", "festgelegt", "erhöht"]}',
 '{"correct": 0}',
 'Backup + anlegen = ein Backup anlegen (to create a backup).',
 'Backup + anlegen = to create a backup.', 1, 46);

-- Reuse covered collocations with new sentences (sort 47-50)

-- Skalierbarkeit / gewährleisten (new sentence)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Skalierbarkeit', 'Collocation in Sentence: Scalability',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Bei der Architekturentscheidung müssen wir die Skalierbarkeit langfristig _____.", "options": ["gewährleisten", "herstellen", "reviewen"]}',
 '{"correct": 0}',
 'Skalierbarkeit + gewährleisten = die Skalierbarkeit gewährleisten (to ensure scalability).',
 'Skalierbarkeit + gewährleisten = to ensure scalability.', 2, 47);

-- Meilenstein / erreichen (new sentence)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Meilenstein', 'Collocation in Sentence: Milestone',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Dank des gemeinsamen Einsatzes konnten wir den Meilenstein pünktlich _____.", "options": ["erreichen", "allozieren", "senken"]}',
 '{"correct": 0}',
 'Meilenstein + erreichen = einen Meilenstein erreichen (to reach a milestone).',
 'Meilenstein + erreichen = to reach a milestone.', 1, 48);

-- Performance / steigern (new sentence)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Performance', 'Collocation in Sentence: Performance',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Durch Caching und Indexierung konnten wir die Performance der Abfragen _____.", "options": ["steigern", "anpassen", "erstellen"]}',
 '{"correct": 0}',
 'Performance + steigern = die Performance steigern (to increase performance).',
 'Performance + steigern = to increase performance.', 2, 49);

-- Feedback / einholen (new sentence)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Feedback', 'Collocation in Sentence: Feedback',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Vor dem nächsten Release sollten wir unbedingt Feedback von den Beta-Testern _____.", "options": ["einholen", "entwerfen", "auslasten"]}',
 '{"correct": 0}',
 'Feedback + einholen = Feedback einholen (to gather feedback).',
 'Feedback + einholen = to gather feedback.', 1, 50);


-- ============================================================
-- SECTION 2: WORKSHOP PHRASEN — Multiple Choice (15, sort 11-25)
-- ============================================================

-- Opening: Housekeeping (Zeitplan)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Zeitplan klären', 'Workshop: Clarifying the Schedule',
 'Wie klärst du zu Beginn den Zeitplan?', 'How do you clarify the schedule at the start?',
 '{"context": "Der Workshop beginnt und du möchtest den Zeitrahmen kommunizieren.", "options": ["Kurz zum Zeitplan: Wir haben heute drei Stunden, inklusive einer Pause um halb zwölf.", "Wir machen einfach so lange, bis wir fertig sind.", "Ich hoffe, wir schaffen alles, aber versprechen kann ich nichts.", "Der Zeitplan ist mir egal, Hauptsache wir reden."]}',
 '{"correct": 0}',
 'Ein klarer Zeitplan zu Beginn gibt den Teilnehmern Orientierung und zeigt professionelle Moderation.',
 'A clear schedule at the start gives participants orientation and shows professional facilitation.', 1, 11);

-- Opening: Expectations (Erwartungen)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Erwartungen abfragen', 'Workshop: Gathering Expectations',
 'Wie fragst du die Erwartungen der Teilnehmer ab?', 'How do you gather participant expectations?',
 '{"context": "Nach der Begrüßung möchtest du wissen, was sich die Teilnehmer vom Workshop erhoffen.", "options": ["Bevor wir starten: Was sind eure Erwartungen an den heutigen Workshop?", "Ihr wisst ja, warum ihr hier seid, oder?", "Erwartungen sind eigentlich unwichtig, wir haben ja eine Agenda.", "Ich sage euch schon, was ihr hier lernt."]}',
 '{"correct": 0}',
 'Erwartungen abzufragen schafft Beteiligung und hilft, den Workshop auf die Bedürfnisse der Gruppe auszurichten.',
 'Gathering expectations creates engagement and helps align the workshop with the group''s needs.', 1, 12);

-- Opening: Icebreaker (Einstieg)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Einstieg gestalten', 'Workshop: Designing an Icebreaker',
 'Wie gestaltest du den Einstieg in den Workshop?', 'How do you design the workshop icebreaker?',
 '{"context": "Einige Teilnehmer kennen sich nicht und die Stimmung ist zurückhaltend.", "options": ["Zum Einstieg: Erzählt bitte kurz, woran ihr gerade arbeitet und was euch hierher führt.", "Okay, stellt euch alle vor, Name und Funktion, schnell bitte.", "Wir überspringen die Vorstellung, jeder kennt sich ja.", "Sagt mal alle, was euer Lieblingsbier ist."]}',
 '{"correct": 0}',
 '„Zum Einstieg" leitet eine Warm-up-Runde professionell ein und gibt Kontext für die Vorstellung.',
 '"Zum Einstieg" introduces a warm-up round professionally and gives context for introductions.', 1, 13);

-- Opening: Role (Moderieren)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Moderationsrolle klären', 'Workshop: Clarifying the Facilitator Role',
 'Wie klärst du deine Rolle als Moderator?', 'How do you clarify your role as facilitator?',
 '{"context": "Du bist gleichzeitig Teilnehmer und Moderator. Das Team ist unsicher, wer Entscheidungen trifft.", "options": ["Ich moderiere heute den Workshop. Meine Rolle ist es, uns durch die Agenda zu führen und sicherzustellen, dass wir zu Ergebnissen kommen.", "Ich bin der Chef hier, also macht, was ich sage.", "Ich moderiere nur, Entscheidungen sind nicht mein Problem.", "Jemand muss das ja machen, also mache ich das halt."]}',
 '{"correct": 0}',
 'Die eigene Moderationsrolle klar zu definieren verhindert Verwirrung und schafft Vertrauen.',
 'Clearly defining your facilitation role prevents confusion and builds trust.', 1, 14);

-- Flow: Context (Hinsichtlich)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Kontext geben', 'Workshop: Providing Context',
 'Wie gibst du Kontext zu einem neuen Themenblock?', 'How do you provide context for a new topic block?',
 '{"context": "Du wechselst zum Thema Roadmap-Priorisierung und willst den Hintergrund erklären.", "options": ["Hinsichtlich der Roadmap möchte ich kurz den aktuellen Stand der Kundenwünsche skizzieren.", "Also, Roadmap halt. Ihr wisst schon.", "Die Roadmap ist ein Desaster, das müsst ihr wissen.", "Dazu habe ich keine Meinung, sagt ihr was."]}',
 '{"correct": 0}',
 '„Hinsichtlich" ist eine formelle, präzise Überleitung, die den Bezugsrahmen für die Diskussion setzt.',
 '"Hinsichtlich" is a formal, precise transition that sets the frame of reference for the discussion.', 2, 15);

-- Flow: Elaborate (Näher eingehen)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Vertiefen', 'Workshop: Elaborating',
 'Ein Teilnehmer hat etwas Interessantes angedeutet. Wie bittest du um Vertiefung?', 'A participant hinted at something interesting. How do you ask them to elaborate?',
 '{"context": "Der Tech Lead erwähnt kurz ein Problem mit der API-Latenz, geht aber nicht ins Detail.", "options": ["Kannst du auf das Thema API-Latenz näher eingehen? Das scheint relevant zu sein.", "Das klingt langweilig, lass uns weitermachen.", "Erzähl mal alles, was du weißt, wir haben Zeit.", "Schreib mir das lieber in eine E-Mail."]}',
 '{"correct": 0}',
 '„Näher eingehen auf" = to go into more detail on. Eine professionelle Art, tiefere Einsichten einzufordern.',
 '"Näher eingehen auf" = to go into more detail on. A professional way to request deeper insights.', 2, 16);

-- Flow: Visualizing (Festhalten)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Ergebnisse festhalten', 'Workshop: Capturing Results',
 'Wie schlägst du vor, ein wichtiges Ergebnis zu dokumentieren?', 'How do you suggest documenting an important result?',
 '{"context": "Die Gruppe hat sich gerade auf drei Prioritäten geeinigt.", "options": ["Gut, lass uns das direkt am Board festhalten, damit es nicht verloren geht.", "Das merken wir uns einfach.", "Kann das jemand irgendwann aufschreiben?", "Ist ja klar, das muss man nicht festhalten."]}',
 '{"correct": 0}',
 '„Festhalten" = to capture/record. Ergebnisse sofort zu visualisieren ist eine Kernkompetenz der Moderation.',
 '"Festhalten" = to capture/record. Visualizing results immediately is a core facilitation skill.', 1, 17);

-- Flow: Examples (Veranschaulichen)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Beispiel einfordern', 'Workshop: Requesting an Example',
 'Die Diskussion bleibt abstrakt. Wie forderst du ein konkretes Beispiel ein?', 'The discussion stays abstract. How do you request a concrete example?',
 '{"context": "Das Team redet seit zehn Minuten über User Experience verbessern, ohne konkret zu werden.", "options": ["Könnt ihr das an einem konkreten Beispiel veranschaulichen?", "Redet doch mal Klartext!", "Das ist alles zu theoretisch, ich verstehe nichts.", "Egal, wir machen einfach weiter."]}',
 '{"correct": 0}',
 '„Veranschaulichen" = to illustrate. Konkrete Beispiele machen abstrakte Diskussionen greifbar.',
 '"Veranschaulichen" = to illustrate. Concrete examples make abstract discussions tangible.', 2, 18);

-- Interruption: Politeness (Darf ich kurz...?)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Höflich unterbrechen', 'Workshop: Polite Interruption',
 'Du musst eine laufende Diskussion unterbrechen. Wie machst du das höflich?', 'You need to interrupt an ongoing discussion. How do you do it politely?',
 '{"context": "Zwei Kollegen diskutieren hitzig über eine technische Lösung und vergessen die restliche Gruppe.", "options": ["Darf ich kurz einhaken? Ich möchte sicherstellen, dass alle den gleichen Kontext haben.", "Hey, seid mal ruhig!", "Moment, ihr redet zu viel.", "Unterbrechung: Ich bin jetzt dran."]}',
 '{"correct": 0}',
 '„Darf ich kurz...?" ist die höflichste Form, eine Diskussion zu unterbrechen, ohne die Teilnehmer zu brüskieren.',
 '"Darf ich kurz...?" is the most polite way to interrupt a discussion without offending participants.', 1, 19);

-- Interruption: Redirecting (Zurückkommen auf)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Zur Agenda zurückführen', 'Workshop: Redirecting to the Agenda',
 'Die Diskussion ist abgedriftet. Wie führst du zurück zum Thema?', 'The discussion has drifted. How do you redirect to the topic?',
 '{"context": "Das Team diskutiert seit fünf Minuten über das Office-Catering statt über Sprint-Planung.", "options": ["Spannender Punkt. Lass uns aber auf die Sprint-Planung zurückkommen, damit wir im Zeitplan bleiben.", "Das ist völlig irrelevant.", "Wer hat angefangen, über Essen zu reden?", "Na gut, reden wir halt über Catering."]}',
 '{"correct": 0}',
 '„Zurückkommen auf" = to come back to. Anerkennung + Redirect ist die professionelle Technik.',
 '"Zurückkommen auf" = to come back to. Acknowledgment + redirect is the professional technique.', 1, 20);

-- Conflict: Neutrality (Objektiv betrachten)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Neutralität wahren', 'Workshop: Maintaining Neutrality',
 'Zwei Teilnehmer sind gegensätzlicher Meinung. Wie bleibst du neutral?', 'Two participants disagree. How do you remain neutral?',
 '{"context": "Der Backend-Lead will Monolith, die Frontend-Leaderin will Microservices. Beide schauen dich an.", "options": ["Lass uns das objektiv betrachten: Welche Kriterien sind für die Entscheidung ausschlaggebend?", "Ich bin für Microservices, das ist moderner.", "Ihr müsst das unter euch klären, ich halte mich raus.", "Streitet euch nicht, das bringt nichts."]}',
 '{"correct": 0}',
 '„Objektiv betrachten" = to view objectively. Kriterienbasierte Diskussion entschärft persönliche Konflikte.',
 '"Objektiv betrachten" = to view objectively. Criteria-based discussion defuses personal conflicts.', 2, 21);

-- Conflict: Compromise (Kompromiss finden)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Kompromiss vorschlagen', 'Workshop: Suggesting a Compromise',
 'Die Diskussion ist festgefahren. Wie schlägst du einen Kompromiss vor?', 'The discussion is stuck. How do you suggest a compromise?',
 '{"context": "Das Team kann sich nicht einigen, ob der MVP in vier oder acht Wochen fertig sein soll.", "options": ["Können wir einen Kompromiss finden? Zum Beispiel: MVP-Kern in vier Wochen, erweiterte Features in acht.", "Macht doch einfach beides gleichzeitig.", "Dann entscheidet der Chef halt.", "Wenn ihr euch nicht einigt, machen wir gar nichts."]}',
 '{"correct": 0}',
 '„Einen Kompromiss finden" = to find a compromise. Ein konkreter Vorschlag hilft, die Diskussion zu lösen.',
 '"Einen Kompromiss finden" = to find a compromise. A concrete proposal helps resolve the discussion.', 2, 22);

-- Conflict: Postponing (Vertagen)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Thema vertagen', 'Workshop: Postponing a Topic',
 'Ein Thema braucht mehr Daten, die heute nicht vorliegen. Was sagst du?', 'A topic needs more data that isn''t available today. What do you say?',
 '{"context": "Die Diskussion über die neue Preisstruktur dreht sich im Kreis, weil die aktuellen Conversion-Daten fehlen.", "options": ["Ich schlage vor, diesen Punkt zu vertagen, bis uns die Conversion-Daten vorliegen.", "Wir entscheiden jetzt ohne Daten, das muss reichen.", "Daten sind überbewertet, verlasst euch auf euer Bauchgefühl.", "Das Thema lassen wir einfach fallen."]}',
 '{"correct": 0}',
 '„Vertagen" = to postpone/defer. Ein professioneller Weg, um Entscheidungen ohne Datengrundlage zu vermeiden.',
 '"Vertagen" = to postpone/defer. A professional way to avoid decisions without a data basis.', 2, 23);

-- Change Topic: Expanding (Den Blick weiten)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Perspektive erweitern', 'Workshop: Expanding the Perspective',
 'Die Diskussion ist zu eng gefasst. Wie erweiterst du die Perspektive?', 'The discussion is too narrow. How do you expand the perspective?',
 '{"context": "Das Team fokussiert nur auf technische Schulden, aber ihr müsst auch die Kundenperspektive einbeziehen.", "options": ["Lass uns den Blick weiten und auch die Kundenperspektive mit einbeziehen.", "Technische Schulden sind unwichtig.", "Reden wir über was anderes.", "Das ist mir zu eng, ich steige aus der Diskussion aus."]}',
 '{"correct": 0}',
 '„Den Blick weiten" = to broaden the view. Eine elegante Moderation, um weitere Perspektiven einzubringen.',
 '"Den Blick weiten" = to broaden the view. An elegant facilitation move to bring in additional perspectives.', 2, 24);

-- Idioms: Auf den Punkt bringen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Auf den Punkt kommen', 'Workshop: Getting to the Point',
 'Ein Teilnehmer redet langatmig. Wie bittest du um Kürze?', 'A participant talks at length. How do you ask for brevity?',
 '{"context": "Der Product Owner erklärt seit zehn Minuten die Hintergrundgeschichte eines Features.", "options": ["Kannst du es auf den Punkt bringen? Was genau ist die Entscheidung, die wir treffen müssen?", "Du redest zu viel, halt an.", "Kann jemand anders das erklären?", "Interessant, erzähl weiter, wir haben ja Zeit."]}',
 '{"correct": 0}',
 '„Auf den Punkt bringen" = to get to the point. Eine direkte, aber respektvolle Art, um Fokus einzufordern.',
 '"Auf den Punkt bringen" = to get to the point. A direct but respectful way to request focus.', 2, 25);


-- ============================================================
-- SECTION 2: WORKSHOP PHRASEN — Fill-in exercises (15, sort 26-40)
-- ============================================================

-- Housekeeping (Zeitplan)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Zeitplan', 'Workshop Phrase: Schedule',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Kurz zum _____: Wir haben heute drei Stunden und eine Pause um halb zwölf.", "options": ["Zeitplan", "Feedback", "Meilenstein"]}',
 '{"correct": 0}', 1, 26);

-- Expectations (Erwartungen)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Erwartungen', 'Workshop Phrase: Expectations',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Was sind eure _____ an den heutigen Workshop?", "options": ["Erwartungen", "Ergebnisse", "Beschwerden"]}',
 '{"correct": 0}', 1, 27);

-- Role (Moderieren)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Moderieren', 'Workshop Phrase: Facilitating',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Ich werde den heutigen Workshop _____ und uns durch die Agenda führen.", "options": ["moderieren", "protokollieren", "vertagen"]}',
 '{"correct": 0}', 1, 28);

-- Context (Hinsichtlich)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Hinsichtlich', 'Workshop Phrase: Regarding',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "_____ der Roadmap möchte ich kurz den aktuellen Stand der Kundenwünsche erläutern.", "options": ["Hinsichtlich", "Trotzdem", "Anschließend"]}',
 '{"correct": 0}', 2, 29);

-- Elaborate (Näher eingehen)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Näher eingehen', 'Workshop Phrase: Go Into Detail',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Kannst du auf das Latenz-Problem näher _____?", "options": ["eingehen", "aufwerfen", "abschließen"]}',
 '{"correct": 0}', 2, 30);

-- Visualizing (Festhalten)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Festhalten', 'Workshop Phrase: Capture',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Gut, lass uns das direkt am Board _____, damit es nicht verloren geht.", "options": ["festhalten", "vertagen", "vermitteln"]}',
 '{"correct": 0}', 1, 31);

-- Examples (Veranschaulichen)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Veranschaulichen', 'Workshop Phrase: Illustrate',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Könnt ihr das an einem konkreten Beispiel _____?", "options": ["veranschaulichen", "herunterbrechen", "vertagen"]}',
 '{"correct": 0}', 2, 32);

-- Redirecting (Zurückkommen auf)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Zurückkommen', 'Workshop Phrase: Coming Back',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Lass uns auf die Sprint-Planung _____, damit wir im Zeitplan bleiben.", "options": ["zurückkommen", "eintauchen", "aufwerfen"]}',
 '{"correct": 0}', 1, 33);

-- Conflict: Neutrality (Objektiv betrachten)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Objektiv betrachten', 'Workshop Phrase: View Objectively',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Lass uns das _____ betrachten: Welche Kriterien sind ausschlaggebend?", "options": ["objektiv", "widersprüchlich", "persönlich"]}',
 '{"correct": 0}', 2, 34);

-- Action: Deadline (Deadline setzen)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Deadline setzen', 'Workshop Phrase: Setting a Deadline',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Wir sollten für dieses Action Item eine klare _____ setzen.", "options": ["Deadline", "Agenda", "Redundanz"]}',
 '{"correct": 0}', 1, 35);

-- Action: Documentation (Protokoll schreiben)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Protokoll', 'Workshop Phrase: Minutes',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Wer übernimmt es, das _____ zu schreiben?", "options": ["Protokoll", "Deployment", "Backup"]}',
 '{"correct": 0}', 1, 36);

-- Action: Follow-up (Nachfassen)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Nachfassen', 'Workshop Phrase: Follow Up',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Ich werde nächste Woche bei den offenen Punkten _____.", "options": ["nachfassen", "abschließen", "eintauchen"]}',
 '{"correct": 0}', 1, 37);

-- Idioms: Nenner (Common ground)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Gemeinsamer Nenner', 'Workshop Phrase: Common Ground',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Lass uns einen gemeinsamen _____ finden, auf dem wir aufbauen können.", "options": ["Nenner", "Faden", "Punkt"]}',
 '{"correct": 0}', 2, 38);

-- Idioms: Roter Faden
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Roter Faden', 'Workshop Phrase: Red Thread',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Mir fehlt hier der rote _____. Wie hängen die Punkte zusammen?", "options": ["Faden", "Nenner", "Blick"]}',
 '{"correct": 0}', 2, 39);

-- Idioms: Lücke schließen
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Lücke schließen', 'Workshop Phrase: Closing the Gap',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Mit diesem Feature können wir die _____ zum Wettbewerb schließen.", "options": ["Lücke", "Runde", "Agenda"]}',
 '{"correct": 0}', 2, 40);

-- ============================================================
-- Batch Insert: Refinement Phrasen (20 new) + Redewendungen (10 new)
-- Generated 2026-04-16
-- ============================================================


-- ============================================================
-- SECTION 1: REFINEMENT PHRASEN — Multiple Choice (sort_order 11-20)
-- ============================================================

-- 11: Mehrwert (Value/User)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Fehlender Nutzen', 'Refinement: Missing Value',
 'Im Refinement wird ein neues Feature besprochen. Was sagst du?', 'A new feature is discussed in refinement. What do you say?',
 '{"context": "Der PO stellt ein Ticket vor, das ein internes Dashboard baut — aber kein Endnutzer wird es je sehen.", "options": ["Ich sehe ehrlich gesagt noch keinen echten Mehrwert für den Endnutzer.", "Das Dashboard sieht hübsch aus, lass uns das machen.", "Mir ist das egal, solange das Ticket fertig wird.", "Das klingt nach viel Arbeit."]}',
 '{"correct": 0}',
 '„Mehrwert" = added value. Im Refinement muss jedes Ticket seinen konkreten Nutzen rechtfertigen.',
 '"Mehrwert" = added value. In refinement, every ticket must justify its concrete benefit.', 2, 11);

-- 12: Nutzerbedürfnis (Value/User)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Nutzerfokus', 'Refinement: User Focus',
 'Der PO stellt ein Feature vor, das aus einem Stakeholder-Wunsch entstanden ist. Wie hinterfragst du es?', 'The PO presents a feature driven by a stakeholder request. How do you challenge it?',
 '{"context": "Ein Stakeholder will einen CSV-Export für Admins. Aber hat das jemals ein echter Nutzer gefragt?", "options": ["Entspricht das wirklich einem tatsächlichen Nutzerbedürfnis?", "Wenn der Stakeholder es will, machen wir es.", "CSV-Exporte sind immer nützlich.", "Wer braucht schon Datenexport?"]}',
 '{"correct": 0}',
 '„Nutzerbedürfnis" = user need. Professionelle Rückfrage, ob ein Feature wirklich vom Nutzer getrieben ist.',
 '"Nutzerbedürfnis" = user need. Professional question whether a feature is truly user-driven.', 2, 12);

-- 13: Technisch umsetzbar (Implementation)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Machbarkeit prüfen', 'Refinement: Checking Feasibility',
 'Ein Feature klingt toll, aber die Architektur könnte Probleme machen. Was fragst du?', 'A feature sounds great, but the architecture might cause issues. What do you ask?',
 '{"context": "Der PO will Echtzeit-Synchronisation zwischen Mobile und Web einführen.", "options": ["Ist dieser Ansatz in der aktuellen Architektur technisch umsetzbar?", "Das klingt super, machen wir.", "Das hat vorher auch immer funktioniert.", "Echtzeit ist heutzutage Standard, oder?"]}',
 '{"correct": 0}',
 '„Technisch umsetzbar" = technically feasible. Die zentrale Frage im Refinement, bevor der Aufwand geschätzt wird.',
 '"Technisch umsetzbar" = technically feasible. The central question in refinement before effort is estimated.', 2, 13);

-- 14: Overengineering (Implementation)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Zu viel des Guten', 'Refinement: Over-Designing',
 'Ein Kollege will eine extrem flexible Lösung bauen. Wie bremst du ihn professionell?', 'A colleague wants to build an extremely flexible solution. How do you slow them down professionally?',
 '{"context": "Der Lead schlägt ein Plugin-System mit 14 Konfigurationsoptionen für ein einfaches Feature vor.", "options": ["Pass auf, dass wir hier kein Overengineering betreiben.", "Klingt genial, mach das so.", "Mehr Optionen sind immer besser.", "14 Optionen sind vielleicht zu wenig."]}',
 '{"correct": 0}',
 '„Overengineering" wird im deutschen IT-Kontext als Lehnwort verwendet. Es bedeutet, eine Lösung unnötig komplex zu gestalten.',
 '"Overengineering" is used as a loanword in German IT. It means making a solution unnecessarily complex.', 2, 14);

-- 15: Veto einlegen (Negotiation)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Harte Grenze', 'Refinement: Hard Boundary',
 'Eine architektonische Entscheidung gefährdet die Systemstabilität. Was sagst du?', 'An architectural decision threatens system stability. What do you say?',
 '{"context": "Der PO will direkte Datenbankzugriffe aus dem Frontend erlauben, um Zeit zu sparen.", "options": ["Hier muss ich als Architekt ein Veto einlegen.", "Ja, können wir machen, spart Zeit.", "Ist mir eigentlich egal.", "Darüber können wir nächste Woche reden."]}',
 '{"correct": 0}',
 '„Veto einlegen" = to veto. Im Refinement hat das Entwicklungsteam das Recht, technisch inakzeptable Lösungen abzulehnen.',
 '"Veto einlegen" = to veto. In refinement, the dev team has the right to reject technically unacceptable solutions.', 3, 15);

-- 16: Aufwand schätzen (Estimation)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Estimation starten', 'Refinement: Starting Estimation',
 'Die Story ist verstanden. Wie leitest du zur Schätzung über?', 'The story is understood. How do you transition to estimation?',
 '{"context": "Alle Fragen zum Ticket sind geklärt. Es geht weiter.", "options": ["Lass uns kurz den Aufwand für diesen Task schätzen.", "Ich schätze mal drei Tage, fertig.", "Brauchen wir überhaupt eine Schätzung?", "Das dauert so lange wie es dauert."]}',
 '{"correct": 0}',
 '„Aufwand schätzen" = to estimate effort. Die Standardphrase, die den Übergang zur Estimation einleitet.',
 '"Aufwand schätzen" = to estimate effort. The standard phrase that transitions into estimation.', 1, 16);

-- 17: Puffer einplanen (Estimation)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Risikopuffer', 'Refinement: Risk Buffer',
 'Das Team schätzt ein Ticket mit vielen Unbekannten. Was empfiehlst du?', 'The team estimates a ticket with many unknowns. What do you recommend?',
 '{"context": "Die Migration auf eine neue API-Version hat viele unbekannte Edge Cases.", "options": ["Wir sollten hier unbedingt einen Puffer einplanen.", "Wird schon klappen, wir brauchen keinen Puffer.", "Edge Cases können wir ignorieren.", "Dann machen wir es halt schneller."]}',
 '{"correct": 0}',
 '„Puffer einplanen" = to build in a buffer. Besonders wichtig bei unbekannten Risiken und Abhängigkeiten.',
 '"Puffer einplanen" = to build in a buffer. Especially important with unknown risks and dependencies.', 2, 17);

-- 18: Hinterfragen (Critique)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Kritisch nachfragen', 'Refinement: Critical Questions',
 'Ein Feature wird als dringend präsentiert, aber die Begründung fehlt. Was sagst du?', 'A feature is presented as urgent, but the justification is missing. What do you say?',
 '{"context": "Der PO sagt: Das muss unbedingt in den nächsten Sprint, der Kunde wartet darauf.", "options": ["Wir sollten die Notwendigkeit dieses Features kritisch hinterfragen.", "Wenn der Kunde es will, machen wir es sofort.", "Okay, kein Problem.", "Kunden wissen immer am besten, was sie brauchen."]}',
 '{"correct": 0}',
 '„Hinterfragen" = to question critically. Professionelles Nachfragen, statt blind Anforderungen zu akzeptieren.',
 '"Hinterfragen" = to question critically. Professional inquiry rather than blindly accepting requirements.', 2, 18);

-- 19: Runterbrechen (Agile)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Ticket zu groß', 'Refinement: Ticket Too Large',
 'Ein Ticket ist viel zu groß für einen Sprint. Was schlägst du vor?', 'A ticket is way too large for one sprint. What do you suggest?',
 '{"context": "Das Team schätzt ein Ticket auf 21 Story Points.", "options": ["Können wir das Ticket in kleinere Sub-Tasks runterbrechen?", "21 Punkte sind machbar, wir schaffen das.", "Lasst es einfach so, wir fangen mal an.", "Das verschieben wir auf nächsten Monat."]}',
 '{"correct": 0}',
 '„Runterbrechen" = to break down. Typische agile Praxis, um große Tickets handhabbar zu machen.',
 '"Runterbrechen" = to break down. Typical agile practice to make large tickets manageable.', 1, 19);

-- 20: Flaschenhals (Idiom in Refinement)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Performance-Risiko', 'Refinement: Performance Risk',
 'Du siehst ein Architekturrisiko in einem Ticket. Wie benennst du es?', 'You see an architecture risk in a ticket. How do you name it?',
 '{"context": "Die geplante Lösung schreibt alle Events in eine einzige Datenbanktabelle.", "options": ["Die Datenbank könnte hier zum Flaschenhals werden.", "Eine Tabelle reicht immer.", "Performance ist kein Problem in 2026.", "Das können wir später optimieren."]}',
 '{"correct": 0}',
 '„Flaschenhals" = bottleneck. Ein metaphorischer, sehr gebräuchlicher IT-Begriff für Engpässe im System.',
 '"Flaschenhals" = bottleneck. A metaphorical, very common IT term for system bottlenecks.', 2, 20);


-- ============================================================
-- SECTION 1: REFINEMENT PHRASEN — Fill-in (sort_order 21-30)
-- ============================================================

-- 21: Daseinsberechtigung
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Daseinsberechtigung', 'Refinement Phrase: Raison d''Etre',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Ohne dieses Feature verliert die Story ihre _____.", "options": ["Daseinsberechtigung", "Schnittstelle", "Aufwandsschätzung"]}',
 '{"correct": 0}', 2, 21);

-- 22: Relevanz
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Relevanz', 'Refinement Phrase: Relevance',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Hinsichtlich der Conversion-Rate hat das Ticket keine hohe _____.", "options": ["Relevanz", "Voraussetzung", "Abhängigkeit"]}',
 '{"correct": 0}', 2, 22);

-- 23: Impact
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Impact', 'Refinement Phrase: Impact',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Welchen _____ versprechen wir uns von dieser Änderung?", "options": ["Impact", "Einwand", "Puffer"]}',
 '{"correct": 0}', 1, 23);

-- 24: Eindeutig
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Eindeutigkeit', 'Refinement Phrase: Unambiguity',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Das Ergebnis muss für das QA-Team _____ erkennbar sein.", "options": ["eindeutig", "schwammig", "lückenhaft"]}',
 '{"correct": 0}', 1, 24);

-- 25: Voraussetzung
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Voraussetzung', 'Refinement Phrase: Prerequisite',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Das ist eine zwingende _____ für den Release.", "options": ["Voraussetzung", "Verhandlungssache", "Größenordnung"]}',
 '{"correct": 0}', 2, 25);

-- 26: Abhängigkeiten
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Abhängigkeiten', 'Refinement Phrase: Dependencies',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Welche _____ zu anderen Services müssen wir beachten?", "options": ["Abhängigkeiten", "Akzeptanzkriterien", "Lösungsansätze"]}',
 '{"correct": 0}', 2, 26);

-- 27: Verhandlungssache
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Verhandlungssache', 'Refinement Phrase: Negotiable',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Die Priorisierung der Sub-Tasks ist noch _____.", "options": ["Verhandlungssache", "Voraussetzung", "Refactoring"]}',
 '{"correct": 0}', 1, 27);

-- 28: Größenordnung
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Größenordnung', 'Refinement Phrase: Ballpark',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "In welcher _____ bewegen wir uns bei den Story Points?", "options": ["Größenordnung", "Daseinsberechtigung", "Schnittstelle"]}',
 '{"correct": 0}', 1, 28);

-- 29: Widerspruch
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Widerspruch', 'Refinement Phrase: Contradiction',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Das steht im _____ zu unseren bisherigen Standards.", "options": ["Widerspruch", "Mehrwert", "Puffer"]}',
 '{"correct": 0}', 2, 29);

-- 30: Auslagern
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Auslagern', 'Refinement Phrase: Splitting Out',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Lass uns die UI-Anpassungen in ein separates Ticket _____.", "options": ["auslagern", "runterbrechen", "hinterfragen"]}',
 '{"correct": 0}', 1, 30);


-- ============================================================
-- SECTION 2: REDEWENDUNGEN — Match (sort_order 11-14)
-- ============================================================

-- Match 5 (sort 11): IDs 8, 22, 25, 26, 31
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'match', 'Redewendungen: Bedeutung zuordnen (5)', 'Idioms: Match Meaning (5)',
 'Ordne jede Redewendung ihrer Bedeutung zu.', 'Match each idiom to its meaning.',
 '{"pairs": [
   {"word": "Auf Nummer sicher gehen", "match": "Kein Risiko eingehen, vorsichtig handeln"},
   {"word": "Hand und Fuß haben", "match": "Gut durchdacht und überzeugend sein"},
   {"word": "Klar Schiff machen", "match": "Gründlich aufräumen und Ordnung schaffen"},
   {"word": "Einen Zahn zulegen", "match": "Das Tempo deutlich erhöhen"},
   {"word": "Auf Herz und Nieren prüfen", "match": "Etwas ganz gründlich und umfassend testen"}
 ]}', '{}', 2, 11);

-- Match 6 (sort 12): IDs 24, 29, 32, 37, 62
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'match', 'Redewendungen: Bedeutung zuordnen (6)', 'Idioms: Match Meaning (6)',
 'Ordne jede Redewendung ihrer Bedeutung zu.', 'Match each idiom to its meaning.',
 '{"pairs": [
   {"word": "An einem Strang ziehen", "match": "Gemeinsam in dieselbe Richtung arbeiten"},
   {"word": "Den Finger in die Wunde legen", "match": "Ein unangenehmes Problem direkt ansprechen"},
   {"word": "In Stein gemeißelt", "match": "Unveränderlich, nicht verhandelbar"},
   {"word": "Den Gürtel enger schnallen", "match": "Mit weniger Ressourcen auskommen müssen"},
   {"word": "Schwamm drüber!", "match": "Vergessen wir das, Thema erledigt"}
 ]}', '{}', 2, 12);

-- Match 7 (sort 13): IDs 33, 40, 42, 45, 59
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'match', 'Redewendungen: Bedeutung zuordnen (7)', 'Idioms: Match Meaning (7)',
 'Ordne jede Redewendung ihrer Bedeutung zu.', 'Match each idiom to its meaning.',
 '{"pairs": [
   {"word": "Den Mund zu voll nehmen", "match": "Mehr versprechen, als man halten kann"},
   {"word": "Alles auf eine Karte setzen", "match": "Alles auf einen einzigen Plan wetten"},
   {"word": "Das Zünglein an der Waage", "match": "Der entscheidende kleine Faktor"},
   {"word": "In den Kinderschuhen stecken", "match": "Noch ganz am Anfang der Entwicklung sein"},
   {"word": "Auf dem Trockenen sitzen", "match": "Blockiert sein, weil etwas Wichtiges fehlt"}
 ]}', '{}', 2, 13);

-- Match 8 (sort 14): IDs 27, 30, 34, 50, 65
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'match', 'Redewendungen: Bedeutung zuordnen (8)', 'Idioms: Match Meaning (8)',
 'Ordne jede Redewendung ihrer Bedeutung zu.', 'Match each idiom to its meaning.',
 '{"pairs": [
   {"word": "Vom Regen in die Traufe kommen", "match": "Von einem Problem in ein schlimmeres geraten"},
   {"word": "Sich im Kreis drehen", "match": "Immer wieder dasselbe diskutieren ohne Ergebnis"},
   {"word": "Den Karren aus dem Dreck ziehen", "match": "Ein gescheitertes Projekt noch retten"},
   {"word": "Das Handtuch werfen", "match": "Aufgeben, weil es keinen Sinn mehr hat"},
   {"word": "Ein zweischneidiges Schwert", "match": "Etwas mit großen Vorteilen und großen Risiken"}
 ]}', '{}', 3, 14);


-- ============================================================
-- SECTION 2: REDEWENDUNGEN — Multiple Choice (sort_order 15-20)
-- ============================================================

-- MC 15: Ins kalte Wasser springen (ID 16)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Neue Technologie', 'Idiom in Meeting: New Technology',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Ein Junior übernimmt ein Ticket mit einer Technologie, die er noch nie benutzt hat.", "options": ["Ich springe mal ins kalte Wasser und probiere das mit Rust.", "Ich gehe auf Nummer sicher und probiere das mit Rust.", "Ich lege einen Zahn zu und probiere das mit Rust.", "Ich werfe das Handtuch und probiere das mit Rust."]}',
 '{"correct": 0}',
 '„Ins kalte Wasser springen" = etwas Neues ohne Vorbereitung wagen. Passt perfekt, wenn man sich an unbekannte Technologien herantraut.',
 '"Ins kalte Wasser springen" = to jump in without preparation. Perfect when tackling unfamiliar technologies.', 1, 15);

-- MC 16: Schlafende Hunde wecken (ID 28)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Riskante Änderung', 'Idiom in Meeting: Risky Change',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Jemand will ein altes, aber funktionierendes Modul refactoren, das niemand versteht.", "options": ["Lass uns da nichts ändern, wir wollen keine schlafenden Hunde wecken.", "Lass uns da nichts ändern, das ist ein alter Hut.", "Lass uns da nichts ändern, das hat Hand und Fuß.", "Lass uns da nichts ändern, die Kirche im Dorf lassen."]}',
 '{"correct": 0}',
 '„Schlafende Hunde wecken" = ein funktionierendes, aber fragiles System anfassen und damit ungewollt Probleme auslösen.',
 '"Schlafende Hunde wecken" = to disturb a working but fragile system and unintentionally trigger problems.', 2, 16);

-- MC 17: Auf der Strecke bleiben (ID 46)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Qualitätsverlust', 'Idiom in Meeting: Quality Loss',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Das Team steht unter extremem Zeitdruck und überspringt Code Reviews.", "options": ["Durch den Zeitdruck darf die Code-Qualität nicht auf der Strecke bleiben.", "Durch den Zeitdruck müssen wir den Gürtel enger schnallen.", "Durch den Zeitdruck sind wir auf dem Holzweg.", "Durch den Zeitdruck sollten wir den Ball flach halten."]}',
 '{"correct": 0}',
 '„Auf der Strecke bleiben" = vernachlässigt werden, zu kurz kommen. Häufig im Kontext von Qualität unter Zeitdruck.',
 '"Auf der Strecke bleiben" = to fall by the wayside, to be neglected. Often used in the context of quality under time pressure.', 2, 17);

-- MC 18: Einen kühlen Kopf bewahren (ID 48)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Produktionsausfall', 'Idiom in Meeting: Production Outage',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Die Produktion ist ausgefallen. Alle im Team geraten in Panik.", "options": ["In der Krise müssen wir erst mal einen kühlen Kopf bewahren.", "In der Krise müssen wir erst mal ins kalte Wasser springen.", "In der Krise müssen wir erst mal Nägel mit Köpfen machen.", "In der Krise müssen wir erst mal über den Tellerrand schauen."]}',
 '{"correct": 0}',
 '„Einen kühlen Kopf bewahren" = ruhig und rational bleiben in einer Stresssituation. Das Gegenteil von „an die Decke gehen".',
 '"Einen kühlen Kopf bewahren" = to keep a cool head in a stressful situation. The opposite of "an die Decke gehen."', 1, 18);

-- MC 19: Auf dem Trockenen sitzen (ID 59)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Blockierte Arbeit', 'Idiom in Meeting: Blocked Work',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Das Frontend-Team wartet seit drei Tagen auf die API-Dokumentation vom Backend-Team.", "options": ["Ohne die Zugangsdaten sitzen wir total auf dem Trockenen.", "Ohne die Zugangsdaten stehen wir auf dem Schlauch.", "Ohne die Zugangsdaten sind wir auf dem Holzweg.", "Ohne die Zugangsdaten müssen wir den Ball flach halten."]}',
 '{"correct": 0}',
 '„Auf dem Trockenen sitzen" = blockiert sein, weil eine externe Abhängigkeit fehlt. Stärker als „warten müssen".',
 '"Auf dem Trockenen sitzen" = to be blocked because an external dependency is missing. Stronger than just "having to wait."', 2, 19);

-- MC 20: Luftschlösser bauen (ID 51)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Unrealistische Pläne', 'Idiom in Meeting: Unrealistic Plans',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Der Product Owner plant ein KI-Feature, das das Budget um das Zehnfache übersteigt und für das kein ML-Engineer im Team ist.", "options": ["Hört auf, Luftschlösser zu bauen, und bleibt realistisch.", "Hört auf, den Teufel an die Wand zu malen, und bleibt realistisch.", "Hört auf, ein Fass aufzumachen, und bleibt realistisch.", "Hört auf, mit dem Feuer zu spielen, und bleibt realistisch."]}',
 '{"correct": 0}',
 '„Luftschlösser bauen" = unrealistische Pläne schmieden, die keine Grundlage haben. Perfekt für Feature-Wünsche, die weit über dem Budget liegen.',
 '"Luftschlösser bauen" = to build castles in the air, making plans with no realistic foundation. Perfect for feature requests far beyond budget.', 2, 20);
