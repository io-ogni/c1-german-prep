-- ============================================================
-- C1 Vocabulary Batch 2: 60 exercises across 5 topics
-- wissenschaft_technik, politik_wirtschaft, kultur_bildung,
-- nomen_verb_verbindungen, konnektoren_redemittel
-- ============================================================

-- ============================================================
-- 1. WISSENSCHAFT & TECHNIK — 12 exercises (sort 25-36)
-- ============================================================

-- definition_match (3 exercises, sort 25-27)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'wissenschaft_technik', 'definition_match', NULL,
 'die Ethikkommission', 'the ethics committee',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Ethikkommission", "options": ["Gremium, das die moralische Vertretbarkeit von Forschung prueft", "Forschungsgruppe an einer Universitaet", "Pruefungsausschuss fuer Abschlussarbeiten", "Aufsichtsrat eines Unternehmens"]}',
 '{"correct": 0}',
 'Eine Ethikkommission bewertet, ob Forschungsvorhaben ethisch vertretbar sind -- besonders bei Studien mit Menschen oder Tieren.',
 'An ethics committee evaluates whether research projects are ethically justifiable -- especially for studies involving humans or animals.',
 2, 25),

('vocabulary', 'c1', 'wissenschaft_technik', 'definition_match', NULL,
 'die Reproduzierbarkeit', 'reproducibility',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Reproduzierbarkeit", "options": ["Moeglichkeit, ein Forschungsergebnis unter gleichen Bedingungen zu wiederholen", "Zuverlaessigkeit eines Messgeraets", "Genauigkeit einer statistischen Auswertung", "Vergleichbarkeit verschiedener Studien"]}',
 '{"correct": 0}',
 'Reproduzierbarkeit bedeutet, dass andere Forschende das gleiche Ergebnis erzielen, wenn sie das Experiment unter denselben Bedingungen wiederholen.',
 'Reproducibility means that other researchers achieve the same result when they repeat the experiment under the same conditions.',
 2, 26),

('vocabulary', 'c1', 'wissenschaft_technik', 'definition_match', NULL,
 'der Quantencomputer', 'the quantum computer',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "der Quantencomputer", "options": ["Rechner, der quantenmechanische Prinzipien zur Datenverarbeitung nutzt", "besonders schneller Standardcomputer", "Supercomputer fuer Simulationen", "Computer mit kuenstlicher Intelligenz"]}',
 '{"correct": 0}',
 'Ein Quantencomputer nutzt Quantenbits (Qubits), die im Gegensatz zu klassischen Bits gleichzeitig mehrere Zustaende annehmen koennen.',
 'A quantum computer uses quantum bits (qubits), which unlike classical bits can take on multiple states simultaneously.',
 2, 27);

-- fill_in (3 exercises, sort 28-30)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'wissenschaft_technik', 'fill_in', NULL,
 'Forschungsmethodik', 'Research methodology',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die ___ von Forschungsergebnissen ist ein Grundprinzip der Wissenschaft.", "options": ["Reproduzierbarkeit", "Verfuegbarkeit", "Verstaendlichkeit", "Bekanntheit"]}',
 '{"correct": 0}',
 'Reproduzierbarkeit ist ein zentrales Qualitaetskriterium in der Wissenschaft: Ergebnisse muessen wiederholbar sein.',
 'Reproducibility is a central quality criterion in science: results must be repeatable.',
 2, 28),

('vocabulary', 'c1', 'wissenschaft_technik', 'fill_in', NULL,
 'KI-Ethik', 'AI ethics',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Vor der klinischen Studie muss die ___ ihre Zustimmung erteilen.", "options": ["Ethikkommission", "Forschungsgruppe", "Geschaeftsleitung", "Redaktion"]}',
 '{"correct": 0}',
 'Klinische Studien am Menschen erfordern die Genehmigung einer Ethikkommission, um den Schutz der Teilnehmenden zu gewaehrleisten.',
 'Clinical studies on humans require the approval of an ethics committee to ensure the protection of participants.',
 2, 29),

('vocabulary', 'c1', 'wissenschaft_technik', 'fill_in', NULL,
 'Technologische Innovation', 'Technological innovation',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Der technologische ___ veraendert ganze Industriezweige.", "options": ["Fortschritt", "Vorsprung", "Vorteil", "Vorschlag"]}',
 '{"correct": 0}',
 'Technologischer Fortschritt bezeichnet die Weiterentwicklung von Technik und Wissen, die zu Veraenderungen in Wirtschaft und Gesellschaft fuehrt.',
 'Technological progress refers to the advancement of technology and knowledge that leads to changes in the economy and society.',
 2, 30);

-- synonym_match (3 exercises, sort 31-33)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'wissenschaft_technik', 'synonym_match', NULL,
 'Synonyme: Wissenschaftliche Begriffe', 'Synonyms: Scientific terms',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "bahnbrechend", "synonym": "revolutionaer"}, {"word": "die Studie", "synonym": "die Untersuchung"}, {"word": "nachweisen", "synonym": "belegen"}, {"word": "die Errungenschaft", "synonym": "die Leistung"}, {"word": "die Methodik", "synonym": "die Vorgehensweise"}]}',
 '{"correct": []}',
 'Diese Synonympaare stammen aus der Wissenschaftssprache. Bahnbrechend und revolutionaer beschreiben grundlegende Neuerungen.',
 'These synonym pairs come from scientific language. Bahnbrechend and revolutionaer describe fundamental innovations.',
 2, 31),

('vocabulary', 'c1', 'wissenschaft_technik', 'synonym_match', NULL,
 'Synonyme: Forschung und Technik', 'Synonyms: Research and technology',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Datenerhebung", "synonym": "die Datenerfassung"}, {"word": "simulieren", "synonym": "nachbilden"}, {"word": "die Innovation", "synonym": "die Neuerung"}, {"word": "validieren", "synonym": "ueberpruefen"}, {"word": "interdisziplinaer", "synonym": "fachuebergreifend"}]}',
 '{"correct": []}',
 'Interdisziplinaer bzw. fachuebergreifend bedeutet, dass mehrere Fachrichtungen zusammenarbeiten -- z. B. Medizin und Informatik.',
 'Interdisciplinary means that multiple disciplines work together -- e.g. medicine and computer science.',
 2, 32),

('vocabulary', 'c1', 'wissenschaft_technik', 'synonym_match', NULL,
 'Synonyme: Wissenschaftliches Arbeiten', 'Synonyms: Scientific work',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Prognose", "synonym": "die Vorhersage"}, {"word": "empirisch", "synonym": "auf Erfahrung beruhend"}, {"word": "die These", "synonym": "die Behauptung"}, {"word": "verifizieren", "synonym": "bestaetigen"}]}',
 '{"correct": []}',
 'Empirisch bedeutet, dass Erkenntnisse auf Beobachtung und Erfahrung beruhen -- im Gegensatz zu rein theoretischen Annahmen.',
 'Empirical means that findings are based on observation and experience -- as opposed to purely theoretical assumptions.',
 2, 33);

-- word_family (3 exercises, sort 34-36)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'wissenschaft_technik', 'word_family', NULL,
 'Wortfamilie: forschen', 'Word family: to research',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "forschen", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Forschung", "accept_also": ["die Forschung"]}',
 'forschen (Verb) -> die Forschung (Nomen). Beispiel: Die Forschung auf dem Gebiet der Quantenphysik macht grosse Fortschritte.',
 'forschen (verb) -> die Forschung (noun). Example: Research in the field of quantum physics is making great progress.',
 2, 34),

('vocabulary', 'c1', 'wissenschaft_technik', 'word_family', NULL,
 'Wortfamilie: analysieren', 'Word family: to analyse',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "analysieren", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Analyse", "accept_also": ["die Analyse"]}',
 'analysieren (Verb) -> die Analyse (Nomen). Beispiel: Die Analyse der Daten ergab ueberraschende Ergebnisse.',
 'analysieren (verb) -> die Analyse (noun). Example: The analysis of the data yielded surprising results.',
 2, 35),

('vocabulary', 'c1', 'wissenschaft_technik', 'word_family', NULL,
 'Wortfamilie: experimentieren', 'Word family: to experiment',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "experimentieren", "target_type": "-> Nomen (das _____)"}',
 '{"correct": "Experiment", "accept_also": ["das Experiment"]}',
 'experimentieren (Verb) -> das Experiment (Nomen). Beispiel: Das Experiment wurde unter kontrollierten Bedingungen durchgefuehrt.',
 'experimentieren (verb) -> das Experiment (noun). Example: The experiment was conducted under controlled conditions.',
 2, 36);

-- ============================================================
-- 2. POLITIK & WIRTSCHAFT — 12 exercises (sort 25-36)
-- ============================================================

-- definition_match (3 exercises, sort 25-27)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'politik_wirtschaft', 'definition_match', NULL,
 'die Schuldenbremse', 'the debt brake',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Schuldenbremse", "options": ["verfassungsrechtliche Begrenzung der Neuverschuldung", "Steuersenkung zur Wirtschaftsfoerderung", "Ausgabenkuerzung im Sozialbereich", "Haushaltssperre bei Ueberschuldung"]}',
 '{"correct": 0}',
 'Die Schuldenbremse ist seit 2009 im Grundgesetz verankert und begrenzt die jaehrliche Neuverschuldung von Bund und Laendern.',
 'The debt brake has been enshrined in the German constitution since 2009 and limits the annual new debt of the federal and state governments.',
 2, 25),

('vocabulary', 'c1', 'politik_wirtschaft', 'definition_match', NULL,
 'der Lobbyismus', 'lobbyism',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "der Lobbyismus", "options": ["Einflussnahme von Interessengruppen auf politische Entscheidungen", "Parteienwettbewerb im Wahlkampf", "oeffentliche Wahlkampfveranstaltung", "Regierungsbildung nach einer Wahl"]}',
 '{"correct": 0}',
 'Lobbyismus bezeichnet die systematische Einflussnahme von Interessengruppen (z. B. Unternehmen, Verbaende) auf politische Entscheidungstraeger.',
 'Lobbyism refers to the systematic influence of interest groups (e.g. companies, associations) on political decision-makers.',
 2, 26),

('vocabulary', 'c1', 'politik_wirtschaft', 'definition_match', NULL,
 'die Sanktion', 'the sanction',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Sanktion", "options": ["Strafmassnahme gegen Staaten oder Personen", "internationales Handelsabkommen", "staatliche Wirtschaftsfoerderung", "diplomatische Beziehung zwischen Laendern"]}',
 '{"correct": 0}',
 'Sanktionen sind wirtschaftliche oder politische Strafmassnahmen, die gegen Staaten oder Personen verhaengt werden, um bestimmtes Verhalten zu aendern.',
 'Sanctions are economic or political punitive measures imposed against states or individuals to change certain behaviour.',
 2, 27);

-- fill_in (3 exercises, sort 28-30)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'politik_wirtschaft', 'fill_in', NULL,
 'EU-Aussenpolitik', 'EU foreign policy',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die EU hat ___ gegen das Land verhaengt.", "options": ["Sanktionen", "Vertraege", "Subventionen", "Investitionen"]}',
 '{"correct": 0}',
 'Man verhaengt Sanktionen gegen jemanden. Die Kollokation Sanktionen verhaengen ist typisch fuer die politische Fachsprache.',
 'You impose sanctions against someone. The collocation Sanktionen verhaengen is typical of political terminology.',
 2, 28),

('vocabulary', 'c1', 'politik_wirtschaft', 'fill_in', NULL,
 'Demokratie und Einflussnahme', 'Democracy and influence',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Der ___ gefaehrdet die demokratische Entscheidungsfindung.", "options": ["Lobbyismus", "Foederalismus", "Populismus", "Journalismus"]}',
 '{"correct": 0}',
 'Lobbyismus kann die Demokratie gefaehrden, wenn Interessengruppen mehr Einfluss auf Gesetze nehmen als die Buergerinnen und Buerger.',
 'Lobbyism can endanger democracy when interest groups have more influence on legislation than citizens.',
 2, 29),

('vocabulary', 'c1', 'politik_wirtschaft', 'fill_in', NULL,
 'Staatliche Finanzpolitik', 'Government fiscal policy',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die ___ begrenzt die staatliche Neuverschuldung.", "options": ["Schuldenbremse", "Steuerpolitik", "Handelsbilanz", "Inflationsrate"]}',
 '{"correct": 0}',
 'Die Schuldenbremse ist ein finanzpolitisches Instrument, das im Grundgesetz festgelegt ist und die jaehrliche Nettokreditaufnahme begrenzt.',
 'The debt brake is a fiscal policy instrument enshrined in the German constitution that limits annual net borrowing.',
 2, 30);

-- synonym_match (3 exercises, sort 31-33)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'politik_wirtschaft', 'synonym_match', NULL,
 'Synonyme: Wirtschaftsbegriffe', 'Synonyms: Economic terms',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Rezession", "synonym": "der Wirtschaftsabschwung"}, {"word": "ratifizieren", "synonym": "einen Vertrag genehmigen"}, {"word": "die Konjunktur", "synonym": "die Wirtschaftslage"}, {"word": "die Transparenz", "synonym": "die Durchschaubarkeit"}, {"word": "die Souveraenitaet", "synonym": "die Unabhaengigkeit"}]}',
 '{"correct": []}',
 'Ratifizieren bedeutet, einen Vertrag formell zu genehmigen. Parlamente ratifizieren internationale Abkommen.',
 'Ratifizieren means to formally approve a treaty. Parliaments ratify international agreements.',
 2, 31),

('vocabulary', 'c1', 'politik_wirtschaft', 'synonym_match', NULL,
 'Synonyme: Staatliche Wirtschaft', 'Synonyms: State economy',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Subvention", "synonym": "die staatliche Foerderung"}, {"word": "die Inflation", "synonym": "die Geldentwertung"}, {"word": "die Privatisierung", "synonym": "der Verkauf staatlicher Unternehmen"}, {"word": "die Buerokratie", "synonym": "der Verwaltungsapparat"}, {"word": "reformieren", "synonym": "umgestalten"}]}',
 '{"correct": []}',
 'Privatisierung bedeutet, dass der Staat Unternehmen oder Dienstleistungen an private Eigentuemer verkauft -- z. B. die Deutsche Bahn oder die Post.',
 'Privatisation means that the state sells companies or services to private owners -- e.g. Deutsche Bahn or the postal service.',
 2, 32),

('vocabulary', 'c1', 'politik_wirtschaft', 'synonym_match', NULL,
 'Synonyme: Parlamentssprache', 'Synonyms: Parliamentary language',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Fraktion", "synonym": "die Parteiengruppe im Parlament"}, {"word": "die Legislaturperiode", "synonym": "die Amtszeit des Parlaments"}, {"word": "der Haushalt", "synonym": "der Staatsfinanzplan"}, {"word": "die Opposition", "synonym": "die Gegenpartei"}]}',
 '{"correct": []}',
 'Eine Fraktion ist die Gruppe der Abgeordneten einer Partei im Parlament. Die Opposition umfasst alle Fraktionen, die nicht zur Regierung gehoeren.',
 'A Fraktion is the group of a party''s members of parliament. The opposition comprises all factions that are not part of the government.',
 2, 33);

-- word_family (3 exercises, sort 34-36)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'politik_wirtschaft', 'word_family', NULL,
 'Wortfamilie: regieren', 'Word family: to govern',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "regieren", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Regierung", "accept_also": ["die Regierung"]}',
 'regieren (Verb) -> die Regierung (Nomen). Beispiel: Die Regierung hat neue Massnahmen zur Bekaempfung der Inflation angekuendigt.',
 'regieren (verb) -> die Regierung (noun). Example: The government announced new measures to combat inflation.',
 2, 34),

('vocabulary', 'c1', 'politik_wirtschaft', 'word_family', NULL,
 'Wortfamilie: verhandeln', 'Word family: to negotiate',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "verhandeln", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Verhandlung", "accept_also": ["die Verhandlung"]}',
 'verhandeln (Verb) -> die Verhandlung (Nomen). Beispiel: Die Verhandlungen ueber den Handelsvertrag dauerten mehrere Monate.',
 'verhandeln (verb) -> die Verhandlung (noun). Example: The negotiations on the trade agreement lasted several months.',
 2, 35),

('vocabulary', 'c1', 'politik_wirtschaft', 'word_family', NULL,
 'Wortfamilie: subventionieren', 'Word family: to subsidise',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "subventionieren", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Subvention", "accept_also": ["die Subvention"]}',
 'subventionieren (Verb) -> die Subvention (Nomen). Beispiel: Die Subventionen fuer erneuerbare Energien wurden erhoeht.',
 'subventionieren (verb) -> die Subvention (noun). Example: The subsidies for renewable energies were increased.',
 2, 36);

-- ============================================================
-- 3. KULTUR & BILDUNG — 12 exercises (sort 21-32)
-- ============================================================

-- definition_match (3 exercises, sort 21-23)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'kultur_bildung', 'definition_match', NULL,
 'die Lehrplanreform', 'the curriculum reform',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Lehrplanreform", "options": ["Ueberarbeitung der Unterrichtsinhalte und -ziele", "Bau neuer Schulgebaeude", "Lehrerfortbildung an Universitaeten", "Schulinspektion durch die Behoerden"]}',
 '{"correct": 0}',
 'Eine Lehrplanreform aendert, was und wie in Schulen unterrichtet wird. In Deutschland entscheiden die Bundeslaender ueber ihre Lehrplaene.',
 'A curriculum reform changes what and how is taught in schools. In Germany, the federal states decide on their curricula.',
 2, 21),

('vocabulary', 'c1', 'kultur_bildung', 'definition_match', NULL,
 'das duale Ausbildungssystem', 'the dual education system',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "das duale Ausbildungssystem", "options": ["Kombination aus betrieblicher Praxis und Berufsschulunterricht", "reines Hochschulstudium ohne Praxisanteile", "Fernstudium neben dem Beruf", "schulische Vollzeitausbildung ohne Betrieb"]}',
 '{"correct": 0}',
 'Das duale System ist ein deutsches Erfolgsmodell: Auszubildende lernen im Betrieb und besuchen parallel die Berufsschule.',
 'The dual system is a German success model: trainees learn on the job and attend vocational school in parallel.',
 2, 22),

('vocabulary', 'c1', 'kultur_bildung', 'definition_match', NULL,
 'der Numerus clausus', 'the numerus clausus',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "der Numerus clausus", "options": ["Zulassungsbeschraenkung fuer bestimmte Studienfaecher", "Studiengebuehr an privaten Hochschulen", "akademischer Grad nach dem Studium", "Pruefungsordnung einer Fakultaet"]}',
 '{"correct": 0}',
 'Der Numerus clausus (NC) begrenzt die Zahl der Studienplaetze. Faecher wie Medizin haben einen besonders hohen NC.',
 'The numerus clausus (NC) limits the number of study places. Subjects like medicine have a particularly high NC.',
 2, 23);

-- fill_in (3 exercises, sort 24-26)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'kultur_bildung', 'fill_in', NULL,
 'Hochschulzugang', 'University access',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Der ___ regelt die Zulassung zu beliebten Studiengaengen.", "options": ["Numerus clausus", "Studienabschluss", "Lehrplan", "Semesterbeitrag"]}',
 '{"correct": 0}',
 'Der Numerus clausus ist eine Zulassungsbeschraenkung, die besonders bei Faechern mit vielen Bewerbern angewandt wird.',
 'The numerus clausus is an admission restriction applied especially to subjects with many applicants.',
 2, 24),

('vocabulary', 'c1', 'kultur_bildung', 'fill_in', NULL,
 'Berufsausbildung', 'Vocational training',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Das ___ Ausbildungssystem verbindet Theorie und Praxis.", "options": ["duale", "akademische", "schulische", "staatliche"]}',
 '{"correct": 0}',
 'Das duale System kombiniert praktische Ausbildung im Betrieb mit theoretischem Unterricht in der Berufsschule.',
 'The dual system combines practical training in the company with theoretical instruction at vocational school.',
 2, 25),

('vocabulary', 'c1', 'kultur_bildung', 'fill_in', NULL,
 'Bildungsreform', 'Education reform',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die ___ soll den Unterricht an aktuelle Anforderungen anpassen.", "options": ["Lehrplanreform", "Schulpflicht", "Benotung", "Versetzung"]}',
 '{"correct": 0}',
 'Eine Lehrplanreform passt Unterrichtsinhalte an veraenderte gesellschaftliche und technologische Anforderungen an.',
 'A curriculum reform adapts teaching content to changed societal and technological requirements.',
 2, 26);

-- synonym_match (3 exercises, sort 27-29)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'kultur_bildung', 'synonym_match', NULL,
 'Synonyme: Bildungswesen', 'Synonyms: Education system',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Fortbildung", "synonym": "die Weiterqualifizierung"}, {"word": "die Hochschule", "synonym": "die Universitaet"}, {"word": "der Abschluss", "synonym": "das Zeugnis"}, {"word": "das Curriculum", "synonym": "der Lehrplan"}, {"word": "die Kompetenz", "synonym": "die Faehigkeit"}]}',
 '{"correct": []}',
 'Fortbildung und Weiterqualifizierung bezeichnen Massnahmen, um berufliche Kenntnisse zu vertiefen oder zu erweitern.',
 'Fortbildung and Weiterqualifizierung refer to measures to deepen or expand professional knowledge.',
 2, 27),

('vocabulary', 'c1', 'kultur_bildung', 'synonym_match', NULL,
 'Synonyme: Paedagogik', 'Synonyms: Pedagogy',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Alphabetisierung", "synonym": "das Lesen- und Schreibenlernen"}, {"word": "die Didaktik", "synonym": "die Unterrichtslehre"}, {"word": "die Paedagogik", "synonym": "die Erziehungswissenschaft"}, {"word": "die Evaluation", "synonym": "die Bewertung"}, {"word": "der Dozent", "synonym": "der Lehrende"}]}',
 '{"correct": []}',
 'Didaktik ist die Wissenschaft vom Lehren und Lernen -- sie befasst sich mit der Frage, wie Unterricht am besten gestaltet wird.',
 'Didactics is the science of teaching and learning -- it deals with the question of how instruction is best designed.',
 2, 28),

('vocabulary', 'c1', 'kultur_bildung', 'synonym_match', NULL,
 'Synonyme: Akademische Begriffe', 'Synonyms: Academic terms',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Promotion", "synonym": "die Doktorarbeit"}, {"word": "das Stipendium", "synonym": "die finanzielle Studienfoerderung"}, {"word": "immatrikulieren", "synonym": "sich an einer Hochschule einschreiben"}, {"word": "die Fakultaet", "synonym": "der Fachbereich"}]}',
 '{"correct": []}',
 'Immatrikulieren bedeutet, sich offiziell an einer Hochschule als Studierender einzuschreiben. Das Gegenteil ist exmatrikulieren.',
 'Immatrikulieren means to officially enrol as a student at a university. The opposite is exmatrikulieren.',
 2, 29);

-- word_family (3 exercises, sort 30-32)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'kultur_bildung', 'word_family', NULL,
 'Wortfamilie: bilden', 'Word family: to educate',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "bilden", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Bildung", "accept_also": ["die Bildung"]}',
 'bilden (Verb) -> die Bildung (Nomen). Beispiel: Bildung ist der Schluessel zu sozialer Teilhabe und beruflichem Erfolg.',
 'bilden (verb) -> die Bildung (noun). Example: Education is the key to social participation and professional success.',
 2, 30),

('vocabulary', 'c1', 'kultur_bildung', 'word_family', NULL,
 'Wortfamilie: promovieren', 'Word family: to do a doctorate',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "promovieren", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Promotion", "accept_also": ["die Promotion"]}',
 'promovieren (Verb) -> die Promotion (Nomen). Beispiel: Nach der Promotion arbeitete sie als Postdoktorandin an der Universitaet.',
 'promovieren (verb) -> die Promotion (noun). Example: After the doctorate she worked as a postdoctoral researcher at the university.',
 2, 31),

('vocabulary', 'c1', 'kultur_bildung', 'word_family', NULL,
 'Wortfamilie: lehren', 'Word family: to teach',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "lehren", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Lehre", "accept_also": ["die Lehre"]}',
 'lehren (Verb) -> die Lehre (Nomen). Die Lehre hat zwei Bedeutungen: die akademische Lehre (Unterricht) und die berufliche Lehre (Ausbildung).',
 'lehren (verb) -> die Lehre (noun). Die Lehre has two meanings: academic teaching and vocational apprenticeship.',
 2, 32);

-- ============================================================
-- 4. NOMEN-VERB-VERBINDUNGEN — 12 exercises (sort 25-36)
-- ============================================================

-- definition_match PAIRS (4 exercises, sort 25-28)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'nomen_verb_verbindungen', 'definition_match', NULL,
 'Nomen-Verb-Verbindungen I', 'Noun-verb combinations I',
 'Ordnen Sie die Nomen-Verb-Verbindung dem einfachen Verb zu.', 'Match the noun-verb combination to the simple verb.',
 '{"pairs": [{"word": "Stellung nehmen zu", "definition": "sich aeussern zu"}, {"word": "in Kraft treten", "definition": "gueltig werden"}, {"word": "Ruecksicht nehmen auf", "definition": "beruecksichtigen"}, {"word": "Einfluss ausueben auf", "definition": "beeinflussen"}]}',
 '{}',
 'Nomen-Verb-Verbindungen sind feste Ausdruecke, die in der formellen Sprache haeufig vorkommen. Sie ersetzen einfache Verben durch eine Nomen-Verb-Konstruktion.',
 'Noun-verb combinations are fixed expressions commonly found in formal language. They replace simple verbs with a noun-verb construction.',
 2, 25),

('vocabulary', 'c1', 'nomen_verb_verbindungen', 'definition_match', NULL,
 'Nomen-Verb-Verbindungen II', 'Noun-verb combinations II',
 'Ordnen Sie die Nomen-Verb-Verbindung dem einfachen Verb zu.', 'Match the noun-verb combination to the simple verb.',
 '{"pairs": [{"word": "unter Druck setzen", "definition": "bedraengen"}, {"word": "in Angriff nehmen", "definition": "beginnen"}, {"word": "Wert legen auf", "definition": "wichtig finden"}, {"word": "zum Ausdruck kommen", "definition": "sich zeigen"}]}',
 '{}',
 'In Angriff nehmen bedeutet, etwas aktiv zu beginnen. Wert legen auf bedeutet, dass einem etwas besonders wichtig ist.',
 'In Angriff nehmen means to actively start something. Wert legen auf means that something is particularly important to someone.',
 2, 26),

('vocabulary', 'c1', 'nomen_verb_verbindungen', 'definition_match', NULL,
 'Nomen-Verb-Verbindungen III', 'Noun-verb combinations III',
 'Ordnen Sie die Nomen-Verb-Verbindung dem einfachen Verb zu.', 'Match the noun-verb combination to the simple verb.',
 '{"pairs": [{"word": "in Betracht kommen", "definition": "infrage kommen"}, {"word": "Bescheid geben", "definition": "informieren"}, {"word": "zur Sprache bringen", "definition": "ansprechen"}, {"word": "Abschied nehmen", "definition": "sich verabschieden"}]}',
 '{}',
 'Zur Sprache bringen bedeutet, ein Thema anzusprechen oder zu thematisieren. Man bringt etwas zur Sprache, wenn man darueber reden moechte.',
 'Zur Sprache bringen means to bring up a topic. You bring something zur Sprache when you want to talk about it.',
 2, 27),

('vocabulary', 'c1', 'nomen_verb_verbindungen', 'definition_match', NULL,
 'Nomen-Verb-Verbindungen IV', 'Noun-verb combinations IV',
 'Ordnen Sie die Nomen-Verb-Verbindung dem einfachen Verb zu.', 'Match the noun-verb combination to the simple verb.',
 '{"pairs": [{"word": "in Verzug geraten", "definition": "sich verspaeten"}, {"word": "Rechenschaft ablegen", "definition": "sich verantworten"}, {"word": "Bezug nehmen auf", "definition": "sich beziehen auf"}, {"word": "einen Beitrag leisten", "definition": "beitragen"}]}',
 '{}',
 'Rechenschaft ablegen bedeutet, ueber sein Handeln Bericht zu erstatten und sich dafuer zu verantworten -- haeufig in formellen oder juristischen Kontexten.',
 'Rechenschaft ablegen means to account for one''s actions and take responsibility -- often in formal or legal contexts.',
 2, 28);

-- fill_in NVV in context (4 exercises, sort 29-32)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'nomen_verb_verbindungen', 'fill_in', NULL,
 'In Kraft treten', 'To come into force',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die neue Verordnung tritt am 1. Januar in ___ .", "options": ["Kraft", "Macht", "Staerke", "Wirkung"]}',
 '{"correct": 0}',
 'In Kraft treten ist eine feste Nomen-Verb-Verbindung und bedeutet, dass ein Gesetz oder eine Regelung gueltig wird.',
 'In Kraft treten is a fixed noun-verb combination meaning that a law or regulation becomes valid.',
 2, 29),

('vocabulary', 'c1', 'nomen_verb_verbindungen', 'fill_in', NULL,
 'Stellung nehmen', 'To take a position',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Der Minister hat zu den Vorwuerfen ___ genommen.", "options": ["Stellung", "Position", "Platz", "Haltung"]}',
 '{"correct": 0}',
 'Stellung nehmen zu etwas bedeutet, sich offiziell dazu aeussern. Die Nomen-Verb-Verbindung ist typisch fuer formelle Kommunikation.',
 'Stellung nehmen zu means to officially comment on something. This noun-verb combination is typical of formal communication.',
 2, 30),

('vocabulary', 'c1', 'nomen_verb_verbindungen', 'fill_in', NULL,
 'Ruecksicht nehmen', 'To show consideration',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Wir muessen auf die Beduerfnisse der Kunden ___ nehmen.", "options": ["Ruecksicht", "Vorsicht", "Einsicht", "Ansicht"]}',
 '{"correct": 0}',
 'Ruecksicht nehmen auf bedeutet, die Beduerfnisse anderer zu beruecksichtigen. Alle Optionen enden auf -sicht, aber nur Ruecksicht passt hier.',
 'Ruecksicht nehmen auf means to take others'' needs into consideration. All options end in -sicht, but only Ruecksicht fits here.',
 2, 31),

('vocabulary', 'c1', 'nomen_verb_verbindungen', 'fill_in', NULL,
 'Kritik ueben', 'To criticise',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die Opposition hat scharfe ___ an dem Gesetzentwurf geuebt.", "options": ["Kritik", "Pruefung", "Kontrolle", "Analyse"]}',
 '{"correct": 0}',
 'Kritik ueben an ist eine feste Nomen-Verb-Verbindung. Man uebt Kritik an etwas oder jemandem. Scharfe Kritik betont die Intensitaet.',
 'Kritik ueben an is a fixed noun-verb combination. You exercise criticism of something or someone. Scharfe Kritik emphasises the intensity.',
 2, 32);

-- fill_in NVV completion (4 exercises, sort 33-36)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'nomen_verb_verbindungen', 'fill_in', NULL,
 'In Angriff nehmen', 'To tackle',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Das Projekt wurde endlich in ___ genommen.", "options": ["Angriff", "Betrieb", "Arbeit", "Einsatz"]}',
 '{"correct": 0}',
 'In Angriff nehmen bedeutet, etwas aktiv zu beginnen oder anzupacken. Trotz des Wortes Angriff hat die Redewendung nichts mit Gewalt zu tun.',
 'In Angriff nehmen means to actively start or tackle something. Despite the word Angriff (attack), the expression has nothing to do with violence.',
 2, 33),

('vocabulary', 'c1', 'nomen_verb_verbindungen', 'fill_in', NULL,
 'Einfluss ausueben', 'To exert influence',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Sie hat grossen ___ auf die Entscheidung ausgeuebt.", "options": ["Einfluss", "Druck", "Wert", "Bezug"]}',
 '{"correct": 0}',
 'Einfluss ausueben auf bedeutet, jemanden oder etwas zu beeinflussen. Man uebt Einfluss aus -- man gibt keinen Einfluss.',
 'Einfluss ausueben auf means to influence someone or something. You exert influence -- you don''t give influence.',
 2, 34),

('vocabulary', 'c1', 'nomen_verb_verbindungen', 'fill_in', NULL,
 'Rechenschaft ablegen', 'To account for',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Der Zeuge musste vor Gericht ___ ablegen.", "options": ["Rechenschaft", "Aussage", "Bericht", "Erklaerung"]}',
 '{"correct": 0}',
 'Rechenschaft ablegen bedeutet, sich fuer sein Handeln zu verantworten. Achtung: Auch Aussage ablegen existiert, aber hier wird die NVV Rechenschaft ablegen getestet.',
 'Rechenschaft ablegen means to account for one''s actions. Note: Aussage ablegen also exists, but here the NVV Rechenschaft ablegen is being tested.',
 2, 35),

('vocabulary', 'c1', 'nomen_verb_verbindungen', 'fill_in', NULL,
 'Zum Ausdruck kommen', 'To be expressed',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die Ergebnisse kommen in dem Bericht zum ___ .", "options": ["Ausdruck", "Vorschein", "Ergebnis", "Schluss"]}',
 '{"correct": 0}',
 'Zum Ausdruck kommen bedeutet, dass etwas sichtbar oder deutlich wird. Achtung: Zum Vorschein kommen existiert auch, bedeutet aber etwas anderes (entdeckt werden).',
 'Zum Ausdruck kommen means that something becomes visible or clear. Note: Zum Vorschein kommen also exists but means something different (to be discovered).',
 2, 36);

-- ============================================================
-- 5. KONNEKTOREN & REDEMITTEL — 12 exercises (sort 25-36)
-- ============================================================

-- definition_match (3 exercises, sort 25-27)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'konnektoren_redemittel', 'definition_match', NULL,
 'sofern', 'provided that',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "sofern", "options": ["unter der Bedingung, dass / falls", "obwohl / trotz der Tatsache", "trotzdem / dennoch", "deshalb / aus diesem Grund"]}',
 '{"correct": 0}',
 'Sofern ist ein konditionaler Konnektor und bedeutet falls oder unter der Bedingung, dass. Beispiel: Sofern Sie Fragen haben, koennen Sie sich an uns wenden.',
 'Sofern is a conditional connector meaning if or provided that. Example: If you have questions, you can contact us.',
 2, 25),

('vocabulary', 'c1', 'konnektoren_redemittel', 'definition_match', NULL,
 'indessen', 'meanwhile',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "indessen", "options": ["waehrenddessen / in der Zwischenzeit", "folglich / deshalb", "trotzdem / dennoch", "ausserdem / darueber hinaus"]}',
 '{"correct": 0}',
 'Indessen hat zwei Bedeutungen: temporal (waehrenddessen) und adversativ (jedoch). Im C1-Kontext ist die temporale Bedeutung haeufiger in Pruefungen.',
 'Indessen has two meanings: temporal (meanwhile) and adversative (however). In the C1 context, the temporal meaning is more common in exams.',
 2, 26),

('vocabulary', 'c1', 'konnektoren_redemittel', 'definition_match', NULL,
 'geschweige denn', 'let alone',
 'Waehlen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "geschweige denn", "options": ["und noch viel weniger", "besonders weil", "andererseits / im Gegensatz", "insbesondere / vor allem"]}',
 '{"correct": 0}',
 'Geschweige denn verstaerkt eine Verneinung: Wenn schon A nicht zutrifft, dann erst recht nicht B. Beispiel: Er kann kaum laufen, geschweige denn rennen.',
 'Geschweige denn intensifies a negation: if A is already not the case, then B is even less so. Example: He can barely walk, let alone run.',
 2, 27);

-- fill_in connectors (3 exercises, sort 28-30)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'konnektoren_redemittel', 'fill_in', NULL,
 'Konzessiver Konnektor', 'Concessive connector',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Er hat die Pruefung bestanden, ___ er kaum gelernt hat.", "options": ["obgleich", "infolgedessen", "insofern", "sofern"]}',
 '{"correct": 0}',
 'Obgleich ist ein konzessiver Konnektor (wie obwohl) und drueckt einen Widerspruch aus: Das Ergebnis ist ueberraschend angesichts der Umstaende.',
 'Obgleich is a concessive connector (like obwohl) and expresses a contradiction: the result is surprising given the circumstances.',
 2, 28),

('vocabulary', 'c1', 'konnektoren_redemittel', 'fill_in', NULL,
 'Kausaler Konnektor', 'Causal connector',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die Firma expandiert, ___ sie neue Maerkte erschliessen will.", "options": ["da", "dennoch", "hingegen", "geschweige denn"]}',
 '{"correct": 0}',
 'Da ist ein kausaler Konnektor und gibt den Grund an. Es steht oft am Satzanfang oder im Nebensatz und ist formeller als weil.',
 'Da is a causal connector and states the reason. It often appears at the beginning of a sentence or in a subordinate clause and is more formal than weil.',
 2, 29),

('vocabulary', 'c1', 'konnektoren_redemittel', 'fill_in', NULL,
 'Zweiteiliger Konnektor', 'Two-part connector',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Weder hat er sich entschuldigt, ___ hat er Besserung versprochen.", "options": ["noch", "sondern", "aber", "denn"]}',
 '{"correct": 0}',
 'Weder ... noch ist ein zweiteiliger Konnektor, der zwei verneinte Aussagen verbindet. Er drueckt aus, dass keine der beiden Optionen zutrifft.',
 'Weder ... noch is a two-part connector linking two negated statements. It expresses that neither option applies.',
 2, 30);

-- synonym_match (3 exercises, sort 31-33)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'konnektoren_redemittel', 'synonym_match', NULL,
 'Synonyme: Formelle Konnektoren I', 'Synonyms: Formal connectors I',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "nichtsdestoweniger", "synonym": "trotzdem"}, {"word": "infolgedessen", "synonym": "deshalb"}, {"word": "indessen", "synonym": "waehrenddessen"}, {"word": "sofern", "synonym": "wenn / falls"}, {"word": "obendrein", "synonym": "ausserdem"}]}',
 '{"correct": []}',
 'Diese formellen Konnektoren werden haeufig in schriftlichen Texten und Pruefungen verwendet. Nichtsdestoweniger ist besonders gehoben.',
 'These formal connectors are frequently used in written texts and exams. Nichtsdestoweniger is particularly elevated in register.',
 2, 31),

('vocabulary', 'c1', 'konnektoren_redemittel', 'synonym_match', NULL,
 'Synonyme: Formelle Konnektoren II', 'Synonyms: Formal connectors II',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "indes", "synonym": "jedoch"}, {"word": "zumal", "synonym": "besonders weil"}, {"word": "ungeachtet", "synonym": "trotz"}, {"word": "insofern", "synonym": "in dieser Hinsicht"}, {"word": "gleichwohl", "synonym": "dennoch"}]}',
 '{"correct": []}',
 'Zumal verstaerkt eine Begruendung: Es regnet, zumal ein Sturm aufzieht. Gleichwohl ist ein gehobenes Synonym fuer trotzdem oder dennoch.',
 'Zumal intensifies a justification. Gleichwohl is an elevated synonym for trotzdem or dennoch.',
 2, 32),

('vocabulary', 'c1', 'konnektoren_redemittel', 'synonym_match', NULL,
 'Synonyme: Formelle Konnektoren III', 'Synonyms: Formal connectors III',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "folglich", "synonym": "also / deshalb"}, {"word": "ferner", "synonym": "ausserdem / darueber hinaus"}, {"word": "hingegen", "synonym": "dagegen / im Gegensatz"}, {"word": "allerdings", "synonym": "jedoch"}]}',
 '{"correct": []}',
 'Ferner ist ein additiver Konnektor der gehobenen Schriftsprache. Hingegen markiert einen Kontrast zwischen zwei Aussagen.',
 'Ferner is an additive connector of elevated written language. Hingegen marks a contrast between two statements.',
 2, 33);

-- fill_in Redemittel (3 exercises, sort 34-36)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'c1', 'konnektoren_redemittel', 'fill_in', NULL,
 'Redemittel: Meinungsaeusserung', 'Discourse phrases: Expressing opinion',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Aus meiner ___ laesst sich feststellen, dass...", "options": ["Sicht", "Lage", "Richtung", "Stelle"]}',
 '{"correct": 0}',
 'Aus meiner Sicht ist ein Redemittel, um eine persoenliche Meinung einzuleiten. Es ist formeller als ich finde oder ich denke.',
 'Aus meiner Sicht is a discourse phrase to introduce a personal opinion. It is more formal than ich finde or ich denke.',
 2, 34),

('vocabulary', 'c1', 'konnektoren_redemittel', 'fill_in', NULL,
 'Redemittel: Ergaenzung', 'Discourse phrases: Addition',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Es ist ___ zu erwaehnen, dass die Studie Schwaechen aufweist.", "options": ["ferner", "zuerst", "deswegen", "weil"]}',
 '{"correct": 0}',
 'Ferner bedeutet ausserdem oder darueber hinaus und wird verwendet, um einen zusaetzlichen Punkt hinzuzufuegen. Es ist typisch fuer formelle Texte.',
 'Ferner means furthermore or in addition and is used to add an additional point. It is typical of formal texts.',
 2, 35),

('vocabulary', 'c1', 'konnektoren_redemittel', 'fill_in', NULL,
 'Redemittel: Vergleich', 'Discourse phrases: Comparison',
 'Ergaenzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Im ___ zu den Vorjahren sind die Zahlen gestiegen.", "options": ["Vergleich", "Gegenteil", "Unterschied", "Widerspruch"]}',
 '{"correct": 0}',
 'Im Vergleich zu ist ein Redemittel fuer Vergleiche. Man sagt im Vergleich zu (nicht im Vergleich mit), wenn man Unterschiede hervorheben moechte.',
 'Im Vergleich zu is a discourse phrase for comparisons. You say im Vergleich zu (not im Vergleich mit) when you want to highlight differences.',
 2, 36);
