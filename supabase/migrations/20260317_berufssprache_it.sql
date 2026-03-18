-- ============================================================
-- IT Deutsch (berufssprache_it) — Schema + Exercise Seeds
-- ============================================================

-- 1. Extend exercises.area CHECK to include berufssprache_it
ALTER TABLE public.exercises DROP CONSTRAINT IF EXISTS exercises_area_check;
ALTER TABLE public.exercises ADD CONSTRAINT exercises_area_check
  CHECK (area IN ('vocabulary', 'grammar', 'reading', 'listening', 'sprachbausteine', 'berufssprache_it'));

-- 2. Extend personal_vocabulary.source_type CHECK
ALTER TABLE public.personal_vocabulary DROP CONSTRAINT IF EXISTS personal_vocabulary_source_type_check;
ALTER TABLE public.personal_vocabulary ADD CONSTRAINT personal_vocabulary_source_type_check
  CHECK (source_type IN ('reading', 'vocabulary', 'grammar', 'manual', 'writing', 'berufssprache_it'));

-- 3. Seed IT dictionary entries (50 nouns + 50 verbs)
INSERT INTO public.dictionary (word_de, article, translation_en, word_type) VALUES
-- IT Power Nouns
('Implementierung', 'die', 'implementation', 'noun'),
('Skalierbarkeit', 'die', 'scalability', 'noun'),
('Belastbarkeit', 'die', 'resilience, load capacity', 'noun'),
('Redundanz', 'die', 'redundancy', 'noun'),
('Schnittstelle', 'die', 'interface, API', 'noun'),
('Wartbarkeit', 'die', 'maintainability', 'noun'),
('Zukunftsfähigkeit', 'die', 'future-proofing', 'noun'),
('Durchgängigkeit', 'die', 'consistency, end-to-end integration', 'noun'),
('Alleinstellungsmerkmal', 'das', 'USP, unique selling point', 'noun'),
('Machbarkeitsstudie', 'die', 'feasibility study', 'noun'),
('Vorgehensweise', 'die', 'approach, methodology', 'noun'),
('Zielsetzung', 'die', 'goal setting, objectives', 'noun'),
('Fehlerbehebung', 'die', 'bug fixing, troubleshooting', 'noun'),
('Engpassanalyse', 'die', 'bottleneck analysis', 'noun'),
('Ressourcenplanung', 'die', 'resource planning', 'noun'),
('Qualitätssicherung', 'die', 'quality assurance', 'noun'),
('Abnahme', 'die', 'formal acceptance, sign-off', 'noun'),
('Meilenstein', 'der', 'milestone', 'noun'),
('Aufwandsschätzung', 'die', 'effort estimation', 'noun'),
('Nachjustierung', 'die', 'readjustment, fine-tuning', 'noun'),
('Datensicherheit', 'die', 'data security', 'noun'),
('Zugriffsberechtigung', 'die', 'access authorization', 'noun'),
('Verschlüsselung', 'die', 'encryption', 'noun'),
('Sicherheitslücke', 'die', 'security vulnerability', 'noun'),
('Nachverfolgbarkeit', 'die', 'traceability', 'noun'),
('Ausfallsicherheit', 'die', 'fail-safety, uptime', 'noun'),
('Geheimhaltungsvereinbarung', 'die', 'NDA', 'noun'),
('Beweislast', 'die', 'burden of proof', 'noun'),
('Effizienzsteigerung', 'die', 'efficiency increase', 'noun'),
('Kostenoptimierung', 'die', 'cost optimization', 'noun'),
('Markteinführung', 'die', 'market launch', 'noun'),
('Mehrwert', 'der', 'added value', 'noun'),
('Kundenorientierung', 'die', 'customer centricity', 'noun'),
('Prozessautomatisierung', 'die', 'process automation', 'noun'),
('Fehlerquote', 'die', 'error rate', 'noun'),
('Auslastung', 'die', 'utilization, load', 'noun'),
('Wettbewerbsfähigkeit', 'die', 'competitiveness', 'noun'),
('Eigenverantwortung', 'die', 'personal responsibility, ownership', 'noun'),
('Kommunikationsfähigkeit', 'die', 'communication skills', 'noun'),
('Lösungsorientierung', 'die', 'solution-oriented mindset', 'noun'),
('Verhandlungssache', 'die', 'matter of negotiation', 'noun'),
('Kompromissbereitschaft', 'die', 'willingness to compromise', 'noun'),
('Führungskompetenz', 'die', 'leadership competence', 'noun'),
('Teamdynamik', 'die', 'team dynamics', 'noun'),
('Belastungsspitze', 'die', 'peak load, stress period', 'noun'),
('Erwartungshaltung', 'die', 'expectations', 'noun'),
('Performance-Metrik', 'die', 'performance metric', 'noun'),
('Compliance-Richtlinien', 'die', 'compliance guidelines', 'noun'),
('Datenschutzgrundverordnung', 'die', 'GDPR (DSGVO)', 'noun'),
('Hands-on-Mentalität', 'die', 'hands-on mentality', 'noun'),
-- IT Power Verbs
('gewährleisten', NULL, 'to ensure, guarantee', 'verb'),
('optimieren', NULL, 'to optimize', 'verb'),
('implementieren', NULL, 'to implement', 'verb'),
('vorantreiben', NULL, 'to drive forward', 'verb'),
('analysieren', NULL, 'to analyze', 'verb'),
('konzipieren', NULL, 'to design, conceive', 'verb'),
('koordinieren', NULL, 'to coordinate', 'verb'),
('etablieren', NULL, 'to establish', 'verb'),
('evaluieren', NULL, 'to evaluate', 'verb'),
('skalieren', NULL, 'to scale', 'verb'),
('abstimmen', NULL, 'to align, coordinate', 'verb'),
('beschleunigen', NULL, 'to accelerate', 'verb'),
('bewältigen', NULL, 'to manage, overcome', 'verb'),
('dokumentieren', NULL, 'to document', 'verb'),
('durchführen', NULL, 'to perform, execute', 'verb'),
('erarbeiten', NULL, 'to develop, work out', 'verb'),
('ermöglichen', NULL, 'to enable', 'verb'),
('fördern', NULL, 'to promote, foster', 'verb'),
('identifizieren', NULL, 'to identify', 'verb'),
('integrieren', NULL, 'to integrate', 'verb'),
('konfigurieren', NULL, 'to configure', 'verb'),
('leiten', NULL, 'to lead, manage', 'verb'),
('minimieren', NULL, 'to minimize', 'verb'),
('modernisieren', NULL, 'to modernize', 'verb'),
('prüfen', NULL, 'to check, verify', 'verb'),
('realisieren', NULL, 'to realize, execute', 'verb'),
('reduzieren', NULL, 'to reduce', 'verb'),
('sicherstellen', NULL, 'to ensure, make sure', 'verb'),
('steuern', NULL, 'to control, steer', 'verb'),
('strukturieren', NULL, 'to structure', 'verb'),
('überwachen', NULL, 'to monitor', 'verb'),
('übernehmen', NULL, 'to take over, assume', 'verb'),
('umsetzen', NULL, 'to implement, realize', 'verb'),
('unterstützen', NULL, 'to support', 'verb'),
('validieren', NULL, 'to validate', 'verb'),
('verbessern', NULL, 'to improve', 'verb'),
('vereinfachen', NULL, 'to simplify', 'verb'),
('verknüpfen', NULL, 'to link, connect', 'verb'),
('vermeiden', NULL, 'to avoid', 'verb'),
('verwalten', NULL, 'to manage, administer', 'verb'),
('verwenden', NULL, 'to use, utilize', 'verb'),
('vorschlagen', NULL, 'to suggest, propose', 'verb'),
('wiederherstellen', NULL, 'to restore', 'verb'),
('zusammenarbeiten', NULL, 'to collaborate', 'verb'),
('zuweisen', NULL, 'to assign, allocate', 'verb')
ON CONFLICT (word_de) DO NOTHING;

-- ============================================================
-- 4. EXERCISES — Topic: power_nomen (definition_match, fill_in, multiple_choice)
-- ============================================================

-- Power Nomen: Definition Match (5 exercises with pairs)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Strategie & Architektur', 'IT Nouns: Strategy & Architecture',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Implementierung", "definition": "Der Prozess, einen Plan in die Praxis umzusetzen"},
   {"word": "Die Skalierbarkeit", "definition": "Die Fähigkeit eines Systems, unter wachsender Last zu funktionieren"},
   {"word": "Die Schnittstelle", "definition": "Der Verbindungspunkt zwischen zwei Systemen oder Teams"},
   {"word": "Die Wartbarkeit", "definition": "Wie leicht ein System langfristig gepflegt werden kann"},
   {"word": "Die Machbarkeitsstudie", "definition": "Eine Untersuchung, ob ein Projekt technisch realisierbar ist"}
 ]}', '{}', 1, 1),

('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Prozesse & Agilität', 'IT Nouns: Processes & Agility',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Vorgehensweise", "definition": "Die methodische Art, wie man an eine Aufgabe herangeht"},
   {"word": "Die Fehlerbehebung", "definition": "Das Finden und Reparieren von Bugs im System"},
   {"word": "Die Engpassanalyse", "definition": "Eine Untersuchung, wo der Prozess ins Stocken gerät"},
   {"word": "Die Abnahme", "definition": "Die formale Genehmigung eines fertigen Projektteils"},
   {"word": "Die Aufwandsschätzung", "definition": "Die Berechnung, wie viel Arbeit eine Aufgabe erfordert"}
 ]}', '{}', 1, 2),

('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Sicherheit & Daten', 'IT Nouns: Security & Data',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Verschlüsselung", "definition": "Das Codieren von Daten zum Schutz vor unerlaubtem Zugriff"},
   {"word": "Die Sicherheitslücke", "definition": "Eine Schwachstelle, die von Angreifern ausgenutzt werden kann"},
   {"word": "Die Ausfallsicherheit", "definition": "Die Fähigkeit eines Systems, trotz Fehlern weiterzulaufen"},
   {"word": "Die Zugriffsberechtigung", "definition": "Das Recht, auf bestimmte Daten oder Systeme zuzugreifen"},
   {"word": "Die Nachverfolgbarkeit", "definition": "Die Möglichkeit, alle Änderungen lückenlos nachzuvollziehen"}
 ]}', '{}', 2, 3),

('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Performance & Ergebnisse', 'IT Nouns: Performance & Results',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Effizienzsteigerung", "definition": "Eine messbare Verbesserung der Leistungsfähigkeit"},
   {"word": "Der Mehrwert", "definition": "Der zusätzliche Nutzen, den eine Lösung bietet"},
   {"word": "Die Fehlerquote", "definition": "Der prozentuale Anteil fehlerhafter Ergebnisse"},
   {"word": "Die Kostenoptimierung", "definition": "Die Reduzierung von Ausgaben bei gleichbleibender Qualität"},
   {"word": "Die Wettbewerbsfähigkeit", "definition": "Die Fähigkeit, sich am Markt gegen Konkurrenten zu behaupten"}
 ]}', '{}', 2, 4),

('berufssprache_it', 'c1', 'power_nomen', 'definition_match', 'IT-Nomen: Soft Skills & Leadership', 'IT Nouns: Soft Skills & Leadership',
 'Ordne jedes Nomen der richtigen Definition zu.', 'Match each noun to its correct definition.',
 '{"pairs": [
   {"word": "Die Eigenverantwortung", "definition": "Persönliche Verantwortung für die eigene Arbeit übernehmen"},
   {"word": "Die Führungskompetenz", "definition": "Die Fähigkeit, ein Team erfolgreich zu leiten"},
   {"word": "Die Kompromissbereitschaft", "definition": "Die Bereitschaft, Zugeständnisse zu machen"},
   {"word": "Die Erwartungshaltung", "definition": "Was die Stakeholder als Ergebnis erwarten"},
   {"word": "Die Lösungsorientierung", "definition": "Die Einstellung, sich auf Lösungen statt auf Probleme zu konzentrieren"}
 ]}', '{}', 1, 5);

-- Power Nomen: Fill-in (5 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Architektur', 'IT Nouns in Context: Architecture',
 'Wähle das passende Nomen für den Satz.', 'Choose the correct noun for the sentence.',
 '{"sentence": "Bei der Auswahl des Tech-Stacks stand die horizontale _____ unter Hochlast im Vordergrund.", "options": ["Skalierbarkeit", "Wartbarkeit", "Redundanz"]}',
 '{"correct": 0}', 1, 6),

('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Sicherheit', 'IT Nouns in Context: Security',
 'Wähle das passende Nomen für den Satz.', 'Choose the correct noun for the sentence.',
 '{"sentence": "Die zeitnahe Schließung der kritischen _____ verhinderte einen potenziellen Datenabfluss.", "options": ["Sicherheitslücke", "Schnittstelle", "Engpassanalyse"]}',
 '{"correct": 0}', 2, 7),

('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Prozesse', 'IT Nouns in Context: Processes',
 'Wähle das passende Nomen für den Satz.', 'Choose the correct noun for the sentence.',
 '{"sentence": "Automatisierte Unit-Tests sind ein integraler Bestandteil unserer _____.", "options": ["Qualitätssicherung", "Machbarkeitsstudie", "Nachjustierung"]}',
 '{"correct": 0}', 1, 8),

('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Performance', 'IT Nouns in Context: Performance',
 'Wähle das passende Nomen für den Satz.', 'Choose the correct noun for the sentence.',
 '{"sentence": "Die Einführung von Containerisierung führte zu einer messbaren _____ im Deployment.", "options": ["Effizienzsteigerung", "Belastungsspitze", "Vorgehensweise"]}',
 '{"correct": 0}', 2, 9),

('berufssprache_it', 'c1', 'power_nomen', 'fill_in', 'IT-Nomen im Kontext: Leadership', 'IT Nouns in Context: Leadership',
 'Wähle das passende Nomen für den Satz.', 'Choose the correct noun for the sentence.',
 '{"sentence": "Wir fördern eine Kultur der _____, in der jeder Entwickler für seinen Code bürgt.", "options": ["Eigenverantwortung", "Teamdynamik", "Hands-on-Mentalität"]}',
 '{"correct": 0}', 1, 10);

-- Power Nomen: Multiple Choice (5 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Alleinstellungsmerkmal?', 'What does Alleinstellungsmerkmal mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Die KI-gestützte Fehlerprognose ist das technologische Alleinstellungsmerkmal unseres Produkts.", "options": ["Der einzigartige Vorteil gegenüber der Konkurrenz", "Ein technischer Fehler im System", "Die Hauptfunktion einer Software", "Ein Sicherheitszertifikat"]}',
 '{"correct": 0}',
 'Alleinstellungsmerkmal = USP (Unique Selling Point). Es beschreibt, was ein Produkt einzigartig macht.',
 'Alleinstellungsmerkmal = USP. It describes what makes a product unique.', 1, 11),

('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Belastbarkeit?', 'What does Belastbarkeit mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Wir haben die Belastbarkeit der API durch intensive Lasttests unter Extrembedingungen verifiziert.", "options": ["Die Fähigkeit, unter hohem Druck zu funktionieren", "Die Geschwindigkeit eines Systems", "Die Benutzerfreundlichkeit einer Oberfläche", "Die Anzahl der Nutzer"]}',
 '{"correct": 0}',
 'Belastbarkeit beschreibt, wie viel Last ein System (oder eine Person) aushalten kann.',
 'Belastbarkeit describes how much load a system (or person) can handle.', 2, 12),

('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Was bedeutet: Durchgängigkeit?', 'What does Durchgängigkeit mean?',
 'Wähle die richtige Bedeutung.', 'Choose the correct meaning.',
 '{"context": "Wir müssen die Durchgängigkeit des Datenflusses vom Frontend bis zum Data Warehouse gewährleisten.", "options": ["Lückenlose End-to-End-Integration", "Die Geschwindigkeit der Datenverarbeitung", "Die Anzahl der Datenpunkte", "Die Sicherheit der Datenübertragung"]}',
 '{"correct": 0}',
 'Durchgängigkeit bedeutet, dass etwas von Anfang bis Ende konsistent und ohne Unterbrechungen funktioniert.',
 'Durchgängigkeit means something works consistently from start to finish without interruptions.', 2, 13),

('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Welches Nomen passt?', 'Which noun fits?',
 'Der Manager fragt nach dem Fortschritt. Wähle das passende Nomen.', 'The manager asks about progress. Choose the right noun.',
 '{"context": "Mit dem Go-Live des Payment-Moduls haben wir einen entscheidenden _____ erreicht.", "options": ["Meilenstein", "Mehrwert", "Engpass", "Rückstand"]}',
 '{"correct": 0}',
 'Einen Meilenstein erreichen = to reach a milestone. Ein wichtiger Punkt im Projektverlauf.',
 'Einen Meilenstein erreichen = to reach a milestone. An important point in the project timeline.', 1, 14),

('berufssprache_it', 'c1', 'power_nomen', 'multiple_choice', 'Welches Nomen passt?', 'Which noun fits?',
 'Wähle das passende Nomen für den IT-Kontext.', 'Choose the correct noun for the IT context.',
 '{"context": "Vor dem Projektstart führen wir eine umfassende _____ bezüglich der Cloud-Migration durch.", "options": ["Machbarkeitsstudie", "Qualitätssicherung", "Fehlerbehebung", "Nachjustierung"]}',
 '{"correct": 0}',
 'Eine Machbarkeitsstudie prüft, ob ein Vorhaben technisch und wirtschaftlich realisierbar ist.',
 'A Machbarkeitsstudie examines whether a project is technically and economically feasible.', 2, 15);


-- ============================================================
-- 5. EXERCISES — Topic: power_verben (definition_match, fill_in, synonym_match)
-- ============================================================

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Kernkompetenzen', 'IT Verbs: Core Competencies',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "gewährleisten", "definition": "Sicherstellen, dass etwas zuverlässig funktioniert"},
   {"word": "vorantreiben", "definition": "Aktiv dafür sorgen, dass etwas Fortschritte macht"},
   {"word": "konzipieren", "definition": "Einen Plan oder ein Design auf hohem Niveau entwerfen"},
   {"word": "etablieren", "definition": "Etwas Neues als Standard einführen"},
   {"word": "evaluieren", "definition": "Verschiedene Optionen systematisch bewerten"}
 ]}', '{}', 1, 1),

('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Projektarbeit', 'IT Verbs: Project Work',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "abstimmen", "definition": "Mit dem Team synchronisieren und Einigkeit herstellen"},
   {"word": "durchführen", "definition": "Eine geplante Aktion ausführen"},
   {"word": "erarbeiten", "definition": "Etwas gemeinsam entwickeln und ausarbeiten"},
   {"word": "identifizieren", "definition": "Ein Problem oder eine Ursache finden und benennen"},
   {"word": "validieren", "definition": "Die Richtigkeit von etwas überprüfen"}
 ]}', '{}', 1, 2),

('berufssprache_it', 'c1', 'power_verben', 'definition_match', 'IT-Verben: Systemarbeit', 'IT Verbs: System Work',
 'Ordne jedes Verb der richtigen Bedeutung zu.', 'Match each verb to its correct meaning.',
 '{"pairs": [
   {"word": "skalieren", "definition": "Ein System für wachsende Anforderungen erweitern"},
   {"word": "überwachen", "definition": "Ein System kontinuierlich kontrollieren und beobachten"},
   {"word": "konfigurieren", "definition": "Die Einstellungen eines Systems anpassen"},
   {"word": "wiederherstellen", "definition": "Ein System nach einem Ausfall in den Normalzustand bringen"},
   {"word": "verwalten", "definition": "Die Infrastruktur organisieren und administrieren"}
 ]}', '{}', 2, 3);

-- Power Verben: Fill-in (5 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Entwicklung', 'IT Verbs in Context: Development',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Wir planen, im nächsten Quartal eine automatisierte CI/CD-Pipeline zu _____.", "options": ["implementieren", "vermeiden", "strukturieren"]}',
 '{"correct": 0}', 1, 4),

('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Team', 'IT Verbs in Context: Team',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Wir möchten Pair-Programming als Standard in unserem Entwicklungsprozess _____.", "options": ["etablieren", "reduzieren", "steuern"]}',
 '{"correct": 0}', 1, 5),

('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Architektur', 'IT Verbs in Context: Architecture',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Das System ist so aufgebaut, dass es bei Bedarf problemlos horizontal _____ kann.", "options": ["skalieren", "dokumentieren", "leiten"]}',
 '{"correct": 0}', 2, 6),

('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Sicherheit', 'IT Verbs in Context: Security',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Benutzereingaben müssen immer serverseitig auf ihre Richtigkeit _____ werden.", "options": ["validiert", "vorgeschlagen", "verknüpft"]}',
 '{"correct": 0}', 2, 7),

('berufssprache_it', 'c1', 'power_verben', 'fill_in', 'IT-Verben im Kontext: Monitoring', 'IT Verbs in Context: Monitoring',
 'Wähle das passende Verb.', 'Choose the correct verb.',
 '{"sentence": "Wir _____ die Systemgesundheit rund um die Uhr mit automatisierten Alerts.", "options": ["überwachen", "vereinfachen", "zuweisen"]}',
 '{"correct": 0}', 1, 8);

-- Power Verben: Synonym Match (3 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (1)', 'IT Verbs: Find Synonyms (1)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "gewährleisten", "synonym": "sicherstellen"},
   {"word": "vorantreiben", "synonym": "fördern / beschleunigen"},
   {"word": "konzipieren", "synonym": "entwerfen / planen"},
   {"word": "evaluieren", "synonym": "bewerten / prüfen"}
 ]}', '{"correct": []}', 1, 9),

('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (2)', 'IT Verbs: Find Synonyms (2)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "implementieren", "synonym": "einbauen / umsetzen"},
   {"word": "optimieren", "synonym": "verbessern"},
   {"word": "minimieren", "synonym": "verringern / reduzieren"},
   {"word": "ermöglichen", "synonym": "möglich machen"}
 ]}', '{"correct": []}', 1, 10),

('berufssprache_it', 'c1', 'power_verben', 'synonym_match', 'IT-Verben: Synonyme finden (3)', 'IT Verbs: Find Synonyms (3)',
 'Ordne jedes C1-Verb seinem einfacheren Äquivalent zu.', 'Match each C1 verb to its simpler equivalent.',
 '{"pairs": [
   {"word": "koordinieren", "synonym": "organisieren / abstimmen"},
   {"word": "bewältigen", "synonym": "schaffen / meistern"},
   {"word": "identifizieren", "synonym": "erkennen / finden"},
   {"word": "realisieren", "synonym": "umsetzen / verwirklichen"}
 ]}', '{"correct": []}', 2, 11);


-- ============================================================
-- 6. EXERCISES — Topic: kollokationen (match, fill_in)
-- ============================================================

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (1)', 'Collocations: Noun + Verb (1)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Eine Schnittstelle", "match": "implementieren"},
   {"word": "Die Skalierbarkeit", "match": "gewährleisten"},
   {"word": "Eine Sicherheitslücke", "match": "schließen"},
   {"word": "Einen Meilenstein", "match": "erreichen"},
   {"word": "Die Vorgehensweise", "match": "abstimmen"}
 ]}', '{}', 1, 1),

('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (2)', 'Collocations: Noun + Verb (2)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Einen Mehrwert", "match": "generieren"},
   {"word": "Eine Engpassanalyse", "match": "durchführen"},
   {"word": "Ein Konzept", "match": "erarbeiten"},
   {"word": "Maßnahmen", "match": "ergreifen"},
   {"word": "Einen Standard", "match": "etablieren"}
 ]}', '{}', 1, 2),

('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (3)', 'Collocations: Noun + Verb (3)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Verantwortung", "match": "übernehmen"},
   {"word": "Einen Termin", "match": "einhalten"},
   {"word": "Prioritäten", "match": "setzen"},
   {"word": "Die Verfügbarkeit", "match": "sicherstellen"},
   {"word": "Einen Bericht", "match": "vorlegen"}
 ]}', '{}', 2, 3),

('berufssprache_it', 'c1', 'kollokationen', 'match', 'Kollokationen: Nomen + Verb (4)', 'Collocations: Noun + Verb (4)',
 'Ordne jedem Nomen das passende Verb zu.', 'Match each noun to its ideal verb.',
 '{"pairs": [
   {"word": "Das Risiko", "match": "minimieren"},
   {"word": "Einen Konsens", "match": "erzielen"},
   {"word": "Die Performance", "match": "steigern"},
   {"word": "Eine Hypothese", "match": "validieren"},
   {"word": "Feedback", "match": "einholen"}
 ]}', '{}', 2, 4);

-- Kollokationen: Fill-in (5 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Schnittstelle', 'Collocation in Sentence: Interface',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Wir müssen die REST-Schnittstelle _____, um den Datenaustausch zu ermöglichen.", "options": ["implementieren", "ergreifen", "vorlegen"]}',
 '{"correct": 0}',
 'Schnittstelle + implementieren = eine Schnittstelle implementieren (to implement an interface).',
 'Schnittstelle + implementieren = to implement an interface.', 1, 5),

('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Maßnahmen', 'Collocation in Sentence: Measures',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Nach dem Vorfall haben wir sofort alle notwendigen Maßnahmen _____.", "options": ["ergriffen", "implementiert", "optimiert"]}',
 '{"correct": 0}',
 'Maßnahmen + ergreifen = Maßnahmen ergreifen (to take measures). Nicht „machen" oder „tun"!',
 'Maßnahmen + ergreifen = to take measures. Not „machen" or „tun"!', 2, 6),

('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Entscheidung', 'Collocation in Sentence: Decision',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Wir müssen heute eine Entscheidung bezüglich der Cloud-Strategie _____.", "options": ["herbeiführen", "einspielen", "anlegen"]}',
 '{"correct": 0}',
 'Entscheidung + herbeiführen = eine Entscheidung herbeiführen (to bring about a decision).',
 'Entscheidung + herbeiführen = to bring about a decision.', 2, 7),

('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Genehmigung', 'Collocation in Sentence: Approval',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Für den Zugriff auf die Live-Datenbank müssen Sie eine Genehmigung _____.", "options": ["einholen", "freigeben", "durchführen"]}',
 '{"correct": 0}',
 'Genehmigung + einholen = eine Genehmigung einholen (to obtain approval).',
 'Genehmigung + einholen = to obtain approval.', 1, 8),

('berufssprache_it', 'c1', 'kollokationen', 'fill_in', 'Kollokation im Satz: Komplexität', 'Collocation in Sentence: Complexity',
 'Wähle das passende Verb für die Kollokation.', 'Choose the correct verb for the collocation.',
 '{"sentence": "Wir sollten den Code vereinfachen, um die Komplexität des Projekts zu _____.", "options": ["reduzieren", "gewährleisten", "erarbeiten"]}',
 '{"correct": 0}',
 'Komplexität + reduzieren = Komplexität reduzieren (to reduce complexity).',
 'Komplexität + reduzieren = to reduce complexity.', 1, 9);


-- ============================================================
-- 7. EXERCISES — Topic: workshop_phrasen (multiple_choice, fill_in)
-- ============================================================

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Opening', 'Workshop: Opening',
 'Du moderierst einen Workshop. Wie eröffnest du professionell?', 'You are facilitating a workshop. How do you open professionally?',
 '{"context": "Du stehst vor dem Team und der Workshop beginnt.", "options": ["Schön, dass ihr alle da seid. Lasst uns kurz die Agenda durchgehen.", "Okay, fangen wir an. Wer hat etwas zu sagen?", "Können wir anfangen? Wir haben nicht viel Zeit.", "Guten Tag, ich bin hier um eine Präsentation zu halten."]}',
 '{"correct": 0}',
 'Eine professionelle Begrüßung + Agenda-Review zeigt Moderationskompetenz.',
 'A professional greeting + agenda review shows facilitation competence.', 1, 1),

('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Timeboxing', 'Workshop: Timeboxing',
 'Die Diskussion dauert zu lange. Was sagst du?', 'The discussion is taking too long. What do you say?',
 '{"context": "Ein Teilnehmer redet seit 10 Minuten über ein Detailthema.", "options": ["Wir müssen im Zeitplan bleiben, deshalb müssen wir jetzt weitermachen.", "Kannst du bitte aufhören zu reden?", "Das ist langweilig, lass uns weitermachen.", "Vielleicht können wir später darüber reden, wenn wir Zeit haben."]}',
 '{"correct": 0}',
 '„Im Zeitplan bleiben" ist eine sachliche, respektvolle Art, den Redner zu stoppen.',
 '"Im Zeitplan bleiben" is a factual, respectful way to stop the speaker.', 1, 2),

('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Themenparkplatz', 'Workshop: Parking Lot',
 'Ein wichtiges, aber nicht relevantes Thema kommt auf. Was sagst du?', 'An important but off-topic issue comes up. What do you say?',
 '{"context": "Jemand bringt ein Infrastrukturthema auf, das nicht auf der Agenda steht.", "options": ["Lass uns diesen Punkt auf den Themenparkplatz schieben.", "Das ist jetzt nicht wichtig.", "Darüber reden wir nie, das ist Zeitverschwendung.", "Schreib mir dazu eine E-Mail."]}',
 '{"correct": 0}',
 'Der „Themenparkplatz" ist eine professionelle Moderationstechnik, um Themen zu parken, ohne sie abzuwürgen.',
 'The "Themenparkplatz" (parking lot) is a professional facilitation technique to park topics without dismissing them.', 1, 3),

('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Engagement', 'Workshop: Engagement',
 'Einige Teilnehmer sind sehr still. Wie holst du sie ab?', 'Some participants are very quiet. How do you engage them?',
 '{"context": "Zwei Personen haben noch kein Wort gesagt.", "options": ["Ich möchte sicherstellen, dass heute jeder zu Wort kommt.", "Warum sagt ihr nichts? Habt ihr keine Meinung?", "Die Stillen sind bestimmt einverstanden.", "Wer nichts sagt, ist dafür."]}',
 '{"correct": 0}',
 '„Zu Wort kommen" = to have a say. Diese Formulierung ist einladend und druckfrei.',
 '"Zu Wort kommen" = to have a say. This phrasing is inviting and pressure-free.', 1, 4),

('berufssprache_it', 'c1', 'workshop_phrasen', 'multiple_choice', 'Workshop: Closing', 'Workshop: Closing',
 'Der Workshop endet. Wie schließt du professionell ab?', 'The workshop is ending. How do you close professionally?',
 '{"context": "Es ist 17:00 Uhr und alle sehen müde aus.", "options": ["Danke euch für eure aktive Teilnahme und den coolen Input.", "Okay, wir sind fertig. Tschüss.", "Endlich ist es vorbei.", "Ich hoffe, es war nicht zu langweilig."]}',
 '{"correct": 0}',
 'Eine wertschätzende Schlussformulierung stärkt die Teamdynamik.',
 'An appreciative closing strengthens team dynamics.', 1, 5);

-- Workshop Phrasen: Fill-in (5 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Transition', 'Workshop Phrase: Transition',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Damit möchte ich zum nächsten _____ überleiten.", "options": ["Agendapunkt", "Termin", "Feedback"]}',
 '{"correct": 0}', 1, 6),

('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Fokus', 'Workshop Phrase: Focus',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Lasst uns den _____ nun auf die technischen Details legen.", "options": ["Fokus", "Termin", "Meilenstein"]}',
 '{"correct": 0}', 1, 7),

('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Zusammenfassung', 'Workshop Phrase: Summary',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "_____ lässt sich sagen, dass wir uns hier einig sind.", "options": ["Zusammenfassend", "Leider", "Hoffentlich"]}',
 '{"correct": 0}', 1, 8),

('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Nächste Schritte', 'Workshop Phrase: Next Steps',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Lasst uns nun die konkreten nächsten _____ festlegen.", "options": ["Schritte", "Probleme", "Fragen"]}',
 '{"correct": 0}', 1, 9),

('berufssprache_it', 'c1', 'workshop_phrasen', 'fill_in', 'Workshop-Phrase: Blitzlicht', 'Workshop Phrase: Lightning Round',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Machen wir zum Ende ein kurzes _____: Wie geht es euch jetzt?", "options": ["Blitzlicht", "Feedback", "Protokoll"]}',
 '{"correct": 0}', 1, 10);


-- ============================================================
-- 8. EXERCISES — Topic: refinement_phrasen (multiple_choice, fill_in)
-- ============================================================

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Unklare Story', 'Refinement: Unclear Story',
 'Die User Story ist unklar. Was sagst du professionell?', 'The user story is unclear. What do you say professionally?',
 '{"context": "Der PO hat ein Ticket vorgestellt, aber niemand versteht das Ziel.", "options": ["Die User Story ist für mich aktuell noch nicht greifbar.", "Ich verstehe gar nichts.", "Das Ticket ist schlecht geschrieben.", "Können wir das einfach überspringen?"]}',
 '{"correct": 0}',
 '„Nicht greifbar" ist eine sachliche Art zu sagen, dass etwas zu vage ist.',
 '"Nicht greifbar" is a factual way to say something is too vague.', 1, 1),

('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Technische Schulden', 'Refinement: Technical Debt',
 'Jemand schlägt einen Quick Fix vor. Was ist deine professionelle Antwort?', 'Someone suggests a quick fix. What is your professional answer?',
 '{"context": "Ein Kollege sagt: Lass uns das einfach hardcoden, dann sind wir heute fertig.", "options": ["Das würde massiv neue technische Schulden verursachen.", "Nein, das ist eine schlechte Idee.", "Mir egal, mach was du willst.", "Ja klar, kein Problem."]}',
 '{"correct": 0}',
 '„Technische Schulden" ist der professionelle Begriff für Code-Kompromisse, die später Probleme verursachen.',
 '"Technische Schulden" (technical debt) is the professional term for code compromises that cause problems later.', 2, 2),

('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Akzeptanzkriterien', 'Refinement: Acceptance Criteria',
 'Die Akzeptanzkriterien sind nicht messbar. Was sagst du?', 'The acceptance criteria are not measurable. What do you say?',
 '{"context": "Das Kriterium lautet: Die App soll schneller sein.", "options": ["Das Kriterium \"schneller\" ist nicht messbar; wir brauchen Zahlen.", "Das ist zu vage, aber egal.", "Schneller klingt gut, reicht mir.", "Wer hat das geschrieben?"]}',
 '{"correct": 0}',
 'Akzeptanzkriterien müssen messbar und eindeutig sein, damit das QA-Team sie prüfen kann.',
 'Acceptance criteria must be measurable and unambiguous so the QA team can verify them.', 2, 3),

('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Bauchschmerzen', 'Refinement: Gut Feeling',
 'Du hast Bedenken. Wie äußerst du sie professionell?', 'You have concerns. How do you express them professionally?',
 '{"context": "Der PO möchte drei neue Features in den Sprint packen.", "options": ["Bei dieser Lösung habe ich ehrlich gesagt Bauchschmerzen.", "Nein, das mache ich nicht.", "Das ist zu viel, ich bin überfordert.", "Von mir aus, aber wenn es schiefgeht, bin ich nicht schuld."]}',
 '{"correct": 0}',
 '„Bauchschmerzen haben" = Bedenken haben. Eine sehr deutsche, idiomatische Art, Zweifel auszudrücken.',
 '"Bauchschmerzen haben" = to have concerns. A very German idiomatic way to express doubts.', 1, 4),

('berufssprache_it', 'c1', 'refinement_phrasen', 'multiple_choice', 'Refinement: Scope verhandeln', 'Refinement: Negotiating Scope',
 'Der PO will mehr Features. Wie verhandelst du professionell?', 'The PO wants more features. How do you negotiate professionally?',
 '{"context": "Es gibt zu viele Aufgaben für einen Sprint.", "options": ["Wir müssen eventuell beim Design Abstriche machen.", "Das ist unmöglich.", "Ihr müsst euch entscheiden, ich bin nur der Entwickler.", "Macht doch was ihr wollt."]}',
 '{"correct": 0}',
 '„Abstriche machen" = Kompromisse eingehen. Zeigt, dass du bereit bist zu verhandeln.',
 '"Abstriche machen" = to make trade-offs. Shows you are willing to negotiate.', 2, 5);

-- Refinement Phrasen: Fill-in (5 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Informationsbedarf', 'Refinement Phrase: Information Need',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Ich sehe hier noch erheblichen _____ seitens der Stakeholder.", "options": ["Informationsbedarf", "Bauchschmerzen", "Einwand"]}',
 '{"correct": 0}', 2, 6),

('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Lösungsansatz', 'Refinement Phrase: Solution Approach',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Welchen _____ würdest du hier favorisieren?", "options": ["Lösungsansatz", "Themenparkplatz", "Zeitplan"]}',
 '{"correct": 0}', 1, 7),

('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Scope', 'Refinement Phrase: Scope',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Wir müssen zuerst den _____ für dieses Feature sauber abgrenzen.", "options": ["Scope", "Mehrwert", "Protokoll"]}',
 '{"correct": 0}', 1, 8),

('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Aufwand', 'Refinement Phrase: Effort',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Ich glaube, wir _____ die Komplexität der Datenmigration.", "options": ["unterschätzen", "überleiten", "abschließen"]}',
 '{"correct": 0}', 2, 9),

('berufssprache_it', 'c1', 'refinement_phrasen', 'fill_in', 'Refinement-Phrase: Definition of Ready', 'Refinement Phrase: Definition of Ready',
 'Wähle die passende Phrase.', 'Choose the correct phrase.',
 '{"sentence": "Entspricht die Story unserer _____?", "options": ["Definition of Ready", "Aufwandsschätzung", "Engpassanalyse"]}',
 '{"correct": 0}', 1, 10);


-- ============================================================
-- 9. EXERCISES — Topic: redewendungen (match, multiple_choice)
-- ============================================================

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'match', 'Redewendungen: Bedeutung zuordnen (1)', 'Idioms: Match Meaning (1)',
 'Ordne jede Redewendung ihrer Bedeutung zu.', 'Match each idiom to its meaning.',
 '{"pairs": [
   {"word": "Nägel mit Köpfen machen", "match": "Eine Sache endgültig finalisieren"},
   {"word": "Den Rahmen sprengen", "match": "Den Scope/Budget überschreiten"},
   {"word": "Auf dem Schlauch stehen", "match": "Etwas nicht verstehen, verwirrt sein"},
   {"word": "Altlasten mitschleppen", "match": "Legacy-Probleme mit sich herumtragen"},
   {"word": "Butter bei die Fische", "match": "Zur Sache kommen, Fakten nennen"}
 ]}', '{}', 1, 1),

('berufssprache_it', 'c1', 'redewendungen', 'match', 'Redewendungen: Bedeutung zuordnen (2)', 'Idioms: Match Meaning (2)',
 'Ordne jede Redewendung ihrer Bedeutung zu.', 'Match each idiom to its meaning.',
 '{"pairs": [
   {"word": "Den Ball flach halten", "match": "Ruhig bleiben, nicht überreagieren"},
   {"word": "Zwei Fliegen mit einer Klappe", "match": "Zwei Probleme mit einer Lösung lösen"},
   {"word": "Auf dem Holzweg sein", "match": "Einen völlig falschen Ansatz verfolgen"},
   {"word": "Ein Fass aufmachen", "match": "Eine große Diskussion über etwas starten"},
   {"word": "In den sauren Apfel beißen", "match": "Etwas Unangenehmes tun, weil es nötig ist"}
 ]}', '{}', 1, 2),

('berufssprache_it', 'c1', 'redewendungen', 'match', 'Redewendungen: Bedeutung zuordnen (3)', 'Idioms: Match Meaning (3)',
 'Ordne jede Redewendung ihrer Bedeutung zu.', 'Match each idiom to its meaning.',
 '{"pairs": [
   {"word": "Die Kirche im Dorf lassen", "match": "Nicht überreagieren, realistisch bleiben"},
   {"word": "Über den Tellerrand schauen", "match": "Über den eigenen Horizont hinausdenken"},
   {"word": "Sich die Zähne ausbeißen", "match": "Vergeblich an einem Problem arbeiten"},
   {"word": "Den Hut aufhaben", "match": "Die Verantwortung für etwas tragen"},
   {"word": "Luft nach oben haben", "match": "Verbesserungspotenzial haben"}
 ]}', '{}', 2, 3),

('berufssprache_it', 'c1', 'redewendungen', 'match', 'Redewendungen: Bedeutung zuordnen (4)', 'Idioms: Match Meaning (4)',
 'Ordne jede Redewendung ihrer Bedeutung zu.', 'Match each idiom to its meaning.',
 '{"pairs": [
   {"word": "Das A und O", "match": "Das Allerwichtigste"},
   {"word": "Einen Bock schießen", "match": "Einen peinlichen Fehler machen"},
   {"word": "Mit dem Feuer spielen", "match": "Etwas Riskantes tun"},
   {"word": "In die Bresche springen", "match": "Für jemanden einspringen"},
   {"word": "Den Sack zumachen", "match": "Etwas abschließen und fertig machen"}
 ]}', '{}', 2, 4);

-- Redewendungen: Multiple Choice (6 exercises — scenario-based)
INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Scope Creep', 'Idiom in Meeting: Scope Creep',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Ein Feature ist viel zu groß für den aktuellen Sprint.", "options": ["Das würde den Rahmen sprengen.", "Das hat Hand und Fuß.", "Schwamm drüber!", "Hut ab!"]}',
 '{"correct": 0}',
 '„Den Rahmen sprengen" = to blow the scope. Perfekt für Scope-Creep-Situationen.',
 '"Den Rahmen sprengen" = to blow the scope. Perfect for scope creep situations.', 1, 5),

('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Quick Fix', 'Idiom in Meeting: Quick Fix',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Jemand schlägt einen Quickfix vor, aber du weißt, dass der Ansatz falsch ist.", "options": ["Ich glaube, da sind wir auf dem Holzweg.", "Hut ab, tolle Lösung!", "Schwamm drüber, vergiss es.", "Wir sitzen fest im Sattel."]}',
 '{"correct": 0}',
 '„Auf dem Holzweg sein" = to be on the wrong track. Höflicher als „Das ist falsch."',
 '"Auf dem Holzweg sein" = to be on the wrong track. More polite than "That''s wrong."', 1, 6),

('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Entscheidung', 'Idiom in Meeting: Decision',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Das Team diskutiert seit 30 Minuten ohne Ergebnis.", "options": ["Lasst uns jetzt Nägel mit Köpfen machen.", "Lasst uns den Ball flach halten.", "Lasst uns die Kirche im Dorf lassen.", "Lasst uns über den Tellerrand schauen."]}',
 '{"correct": 0}',
 '„Nägel mit Köpfen machen" = Schluss mit dem Reden, jetzt wird entschieden!',
 '"Nägel mit Köpfen machen" = Enough talking, time to decide!', 1, 7),

('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Panik', 'Idiom in Meeting: Panic',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Ein Kollege malt das Worst-Case-Szenario an die Wand nach einem kleinen Bug.", "options": ["Lass uns nicht gleich den Teufel an die Wand malen.", "Lass uns in den sauren Apfel beißen.", "Lass uns den Sack zumachen.", "Lass uns Altlasten mitschleppen."]}',
 '{"correct": 0}',
 '„Den Teufel an die Wand malen" = to paint the worst-case scenario. Man soll nicht übertreiben.',
 '"Den Teufel an die Wand malen" = to paint the worst-case scenario. Don''t overreact.', 1, 8),

('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Deploy', 'Idiom in Meeting: Deploy',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Jemand will am Freitag um 17:00 ohne Tests deployen.", "options": ["Ohne Tests zu deployen, heißt mit dem Feuer zu spielen.", "Das hat Luft nach oben.", "Schwamm drüber!", "Das ist ein alter Hut."]}',
 '{"correct": 0}',
 '„Mit dem Feuer spielen" = to play with fire. Perfekt für risikoreiche Entscheidungen.',
 '"Mit dem Feuer spielen" = to play with fire. Perfect for risky decisions.', 1, 9),

('berufssprache_it', 'c1', 'redewendungen', 'multiple_choice', 'Redewendung im Meeting: Bug übersehen', 'Idiom in Meeting: Missed Bug',
 'Welche Redewendung passt zur Situation?', 'Which idiom fits the situation?',
 '{"context": "Du hast einen offensichtlichen Bug in deinem Code übersehen.", "options": ["Hatte ich Tomaten auf den Augen?", "Der rote Faden fehlt mir.", "Das ist ein heißes Eisen.", "Da muss ich ins kalte Wasser springen."]}',
 '{"correct": 0}',
 '„Tomaten auf den Augen haben" = etwas Offensichtliches übersehen. Humorvoll und selbstkritisch.',
 '"Tomaten auf den Augen haben" = to miss something obvious. Humorous and self-critical.', 1, 10);


-- ============================================================
-- 10. EXERCISES — Topic: krisen_simulator (multiple_choice — scenario-based)
-- ============================================================

INSERT INTO public.exercises (area, level, topic, exercise_type, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('berufssprache_it', 'c1', 'krisen_simulator', 'multiple_choice', 'Krise: Der nuschelende Senior', 'Crisis: The Mumbly Senior',
 'Du hast akustisch nichts verstanden. Wie reagierst du souverän?', 'You didn''t catch anything acoustically. How do you react composedly?',
 '{"context": "Ein Senior Dev mit schlechtem Mikrofon nuschelt eine Anforderung und fragt: Ist das für dich so machbar?", "options": ["Sorry, das ist akustisch gerade nicht bei mir angekommen. Kannst du den Kernpunkt kurz zusammenfassen?", "Wie bitte? Mein Deutsch ist nicht so gut.", "Ja, klar, kein Problem. (Du hast nichts verstanden)", "Kannst du das wiederholen? Ich habe nichts gehört."]}',
 '{"correct": 0}',
 'Die C1-Strategie: Schuld auf die Akustik schieben, nicht auf deine Sprachkenntnisse. Und nach einer Zusammenfassung fragen, die leichter zu verstehen ist.',
 'The C1 strategy: Blame the acoustics, not your language skills. And ask for a summary, which is easier to understand.', 2, 1),

('berufssprache_it', 'c1', 'krisen_simulator', 'multiple_choice', 'Krise: Der Feature Creeper', 'Crisis: The Feature Creeper',
 'Der PO will „schnell noch" Features einbauen. Wie reagierst du?', 'The PO wants to "quickly" add features. How do you react?',
 '{"context": "Im Refinement sagt der PO: Ach, wenn wir schon dabei sind, können wir doch schnell noch diese drei Felder einbauen, oder?", "options": ["Ich habe Bauchschmerzen dabei, das jetzt noch reinzuquetschen. Das würde den zeitlichen Rahmen völlig sprengen.", "Nein, das ist zu viel Arbeit. Wir haben keine Zeit.", "Ja okay, machen wir dann halt.", "Das müssen wir mit dem Management besprechen."]}',
 '{"correct": 0}',
 '„Bauchschmerzen haben" + „den Rahmen sprengen" = professioneller Pushback mit Idiomen.',
 '"Bauchschmerzen haben" + "den Rahmen sprengen" = professional pushback using idioms.', 2, 2),

('berufssprache_it', 'c1', 'krisen_simulator', 'multiple_choice', 'Krise: Die Tech-Debt-Falle', 'Crisis: The Tech Debt Trap',
 'Jemand schlägt Hardcoding vor. Wie widersprichst du professionell?', 'Someone suggests hardcoding. How do you object professionally?',
 '{"context": "Ein Kollege sagt: Lass uns das einfach hardcoden, dann sind wir heute fertig.", "options": ["Ich glaube, da sind wir auf dem Holzweg. Wir sollten Nägel mit Köpfen machen und es direkt nachhaltig lösen.", "Das ist eine schlechte Idee. Das macht Probleme später.", "Von mir aus, es ist mir egal.", "Ich weiß nicht, vielleicht hat er recht."]}',
 '{"correct": 0}',
 'Drei Redewendungen in einer Antwort: „Holzweg" (falscher Ansatz), „Altlasten" (Legacy-Probleme), „Nägel mit Köpfen" (richtig finalisieren).',
 'Three idioms in one answer: "Holzweg" (wrong approach), "Altlasten" (legacy problems), "Nägel mit Köpfen" (finalize properly).', 3, 3),

('berufssprache_it', 'c1', 'krisen_simulator', 'multiple_choice', 'Krise: Die Unterbrechung', 'Crisis: The Interruption',
 'Jemand redet über dich hinweg. Wie holst du dir das Wort zurück?', 'Someone is talking over you. How do you reclaim the floor?',
 '{"context": "Du erklärst dein API-Design, und ein Kollege unterbricht dich ständig.", "options": ["Darf ich das kurz zu Ende führen? Ich bin gleich fertig, dann können wir gerne über deinen Einwand diskutieren.", "Warte, ich spreche!", "... (Du schweigst und lässt ihn reden)", "Okay, dann mach du das halt."]}',
 '{"correct": 0}',
 'Höflich aber bestimmt. „Einwand" kategorisiert die Unterbrechung und gibt dir die Kontrolle zurück.',
 'Polite but firm. "Einwand" (objection) categorizes the interruption and gives you back control.', 2, 4),

('berufssprache_it', 'c1', 'krisen_simulator', 'multiple_choice', 'Krise: Der Blackout', 'Crisis: The Blackout',
 'Du vergisst mitten in der Präsentation ein Wort. Was tust du?', 'You forget a word in the middle of a presentation. What do you do?',
 '{"context": "Du präsentierst, und plötzlich fällt dir das Wort für Verfügbarkeit nicht ein.", "options": ["Ich stehe gerade total auf dem Schlauch — mir fehlt der Fachbegriff. Aber worauf ich hinaus will, ist die Ausfallsicherheit des Systems.", "Äh... wie sagt man... the thing... sorry.", "Entschuldigung, mein Deutsch ist nicht so gut.", "... (Peinliches Schweigen)"]}',
 '{"correct": 0}',
 '„Auf dem Schlauch stehen" als Redewendung nutzen, um den Blackout humorvoll zu überbrücken, und dann mit einem Synonym weiterfahren.',
 'Use "auf dem Schlauch stehen" as an idiom to bridge the blackout humorously, then continue with a synonym.', 2, 5),

('berufssprache_it', 'c1', 'krisen_simulator', 'multiple_choice', 'Krise: Die vage Anforderung', 'Crisis: The Vague Requirement',
 'Der PO sagt: Mach es modern. Wie reagierst du?', 'The PO says: Make it modern. How do you react?',
 '{"context": "Der Stakeholder sagt nur: Das Design soll modern aussehen.", "options": ["Das ist noch etwas schwammig. Können wir das präzisieren, damit es greifbar wird?", "Okay, ich mach das irgendwie modern.", "Modern? Was soll das heißen?", "Das ist nicht meine Aufgabe."]}',
 '{"correct": 0}',
 '„Schwammig" = vage/unklar. „Greifbar" = tangibel/konkret. Professionelle Rückfrage statt Frustration.',
 '"Schwammig" = vague. "Greifbar" = tangible. Professional follow-up question instead of frustration.', 1, 6),

('berufssprache_it', 'c1', 'krisen_simulator', 'multiple_choice', 'Krise: Der Blame Game', 'Crisis: The Blame Game',
 'Man gibt dir die Schuld am Crash. Wie reagierst du?', 'You are blamed for the crash. How do you react?',
 '{"context": "Ein Kollege sagt: Dein Code hat den Crash verursacht.", "options": ["Lass uns nicht den Teufel an die Wand malen. Wir müssen erst die Logs auswerten.", "Das war ich nicht!", "Ich habe nur gemacht, was im Ticket stand.", "Sorry, tut mir leid."]}',
 '{"correct": 0}',
 'Panik und Schuldzuweisungen ablenken → Daten-basierte Analyse vorschlagen.',
 'Deflect panic and blame → suggest data-based analysis.', 2, 7),

('berufssprache_it', 'c1', 'krisen_simulator', 'multiple_choice', 'Krise: Das endlose Meeting', 'Crisis: The Endless Meeting',
 'Das Meeting dauert zu lange. Wie setzt du eine Grenze?', 'The meeting is dragging on. How do you set a boundary?',
 '{"context": "Die Diskussion geht seit 45 Minuten im Kreis. Niemand will eine Entscheidung treffen.", "options": ["Wir müssen im Zeitplan bleiben. Sollen wir den Rest auf den Themenparkplatz schieben?", "Ich hab Feierabend, tschüss.", "Können wir bitte aufhören?", "Mir ist langweilig."]}',
 '{"correct": 0}',
 '„Themenparkplatz" = Parking Lot. Eine professionelle Moderationstechnik, um den Zeitplan zu schützen.',
 '"Themenparkplatz" = Parking Lot. A professional facilitation technique to protect the schedule.', 1, 8),

('berufssprache_it', 'c1', 'krisen_simulator', 'multiple_choice', 'Krise: Die Extra-Aufgabe', 'Crisis: The Extra Task',
 'Man will dir eine zusätzliche Aufgabe geben. Wie setzt du Grenzen?', 'Someone wants to assign you an extra task. How do you set boundaries?',
 '{"context": "Im Meeting sagt jemand: Kannst du das auch noch schnell machen?", "options": ["Ich würde gerne helfen, aber meine Kapazitäten sind für diesen Sprint ausgelastet.", "Nein, das mache ich nicht.", "Klar, kein Problem. (Obwohl du bereits überlastet bist)", "Das ist nicht mein Job."]}',
 '{"correct": 0}',
 '„Kapazitäten ausgelastet" = capacity fully utilized. Professionelle Grenzziehung ohne „Nein" zu sagen.',
 '"Kapazitäten ausgelastet" = capacity fully utilized. Professional boundary-setting without saying "no."', 1, 9),

('berufssprache_it', 'c1', 'krisen_simulator', 'multiple_choice', 'Krise: Die stumme Runde', 'Crisis: The Silent Room',
 'Niemand sagt etwas. Wie brichst du das Schweigen?', 'Nobody is talking. How do you break the silence?',
 '{"context": "Du hast eine Frage gestellt, aber alle schweigen.", "options": ["Ich möchte kurz ein Stimmungsbild einholen. Was ist eure Einschätzung?", "Sagt doch mal was!", "Okay, dann sind wohl alle einverstanden.", "Wenn niemand etwas sagt, mache ich einfach weiter."]}',
 '{"correct": 0}',
 '„Stimmungsbild einholen" = to take the pulse of the room. Einladend, ohne Druck zu erzeugen.',
 '"Stimmungsbild einholen" = to take the pulse of the room. Inviting without creating pressure.', 1, 10);
