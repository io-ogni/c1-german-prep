-- ============================================================
-- C1-C2 Grammar Topics: 84 exercises across 5 topics
-- konjunktiv_i, partizipialgruppen, modalpartikeln,
-- funktionsverbgefuege, komplexe_satzstrukturen
-- ============================================================

-- ============================================================
-- 1. KONJUNKTIV I (Indirekte Rede) — 20 exercises
-- ============================================================

-- Transform: Direct speech -> Indirect speech (8 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'konjunktiv_i', 'transform', NULL,
 'Konjunktiv I: sein', 'Konjunktiv I: sein',
 'Formulieren Sie die direkte Rede in indirekte Rede um.', 'Rephrase from direct to indirect speech.',
 '{"instruction": "Formulieren Sie in indirekter Rede:", "original": "Der Minister sagte: \"Ich bin zuversichtlich.\""}',
 '{"correct": "Der Minister sagte, er sei zuversichtlich.", "accept_also": ["Der Minister sagte, dass er zuversichtlich sei."]}',
 'Konjunktiv I von \"sein\" in der 3. Person Singular: sei. Das Personalpronomen wechselt von \"ich\" zu \"er\".',
 'Konjunktiv I of "sein" in 3rd person singular: sei. The personal pronoun shifts from "ich" to "er".',
 2, 1),

('grammar', 'c1', 'konjunktiv_i', 'transform', NULL,
 'Konjunktiv I: haben', 'Konjunktiv I: haben',
 'Formulieren Sie die direkte Rede in indirekte Rede um.', 'Rephrase from direct to indirect speech.',
 '{"instruction": "Formulieren Sie in indirekter Rede:", "original": "Die Sprecherin erklärte: \"Wir haben genug Ressourcen.\""}',
 '{"correct": "Die Sprecherin erklärte, sie hätten genug Ressourcen.", "accept_also": ["Die Sprecherin erklärte, dass sie genug Ressourcen hätten."]}',
 'Konjunktiv I von \"haben\" in der 3. Person Plural wäre \"sie haben\" — identisch mit dem Indikativ. Deshalb weicht man auf Konjunktiv II aus: sie hätten.',
 'Konjunktiv I of "haben" in 3rd person plural would be "sie haben" — identical to the indicative. Therefore we use Konjunktiv II instead: sie hätten.',
 3, 2),

('grammar', 'c1', 'konjunktiv_i', 'transform', NULL,
 'Konjunktiv I: werden', 'Konjunktiv I: werden',
 'Formulieren Sie die direkte Rede in indirekte Rede um.', 'Rephrase from direct to indirect speech.',
 '{"instruction": "Formulieren Sie in indirekter Rede:", "original": "Der Forscher betonte: \"Die Ergebnisse werden bald vorliegen.\""}',
 '{"correct": "Der Forscher betonte, die Ergebnisse würden bald vorliegen.", "accept_also": ["Der Forscher betonte, dass die Ergebnisse bald vorliegen würden."]}',
 'Konjunktiv I von \"werden\" in der 3. Person Plural wäre \"sie werden\" — identisch mit dem Indikativ. Daher Konjunktiv II: würden.',
 'Konjunktiv I of "werden" in 3rd person plural would be "sie werden" — same as indicative. Therefore Konjunktiv II: würden.',
 3, 3),

('grammar', 'c1', 'konjunktiv_i', 'transform', NULL,
 'Konjunktiv I: Modalverb können', 'Konjunktiv I: Modal verb können',
 'Formulieren Sie die direkte Rede in indirekte Rede um.', 'Rephrase from direct to indirect speech.',
 '{"instruction": "Formulieren Sie in indirekter Rede:", "original": "Die Ärztin sagte: \"Der Patient kann morgen entlassen werden.\""}',
 '{"correct": "Die Ärztin sagte, der Patient könne morgen entlassen werden.", "accept_also": ["Die Ärztin sagte, dass der Patient morgen entlassen werden könne."]}',
 'Konjunktiv I von \"können\" in der 3. Person Singular: könne.',
 'Konjunktiv I of "können" in 3rd person singular: könne.',
 2, 4),

('grammar', 'c1', 'konjunktiv_i', 'transform', NULL,
 'Konjunktiv I: Modalverb müssen', 'Konjunktiv I: Modal verb müssen',
 'Formulieren Sie die direkte Rede in indirekte Rede um.', 'Rephrase from direct to indirect speech.',
 '{"instruction": "Formulieren Sie in indirekter Rede:", "original": "Der Chef erklärte: \"Alle Mitarbeiter müssen die neue Richtlinie beachten.\""}',
 '{"correct": "Der Chef erklärte, alle Mitarbeiter müssten die neue Richtlinie beachten.", "accept_also": ["Der Chef erklärte, dass alle Mitarbeiter die neue Richtlinie beachten müssten."]}',
 'Konjunktiv I von \"müssen\" in der 3. Person Plural wäre \"sie müssen\" — identisch mit dem Indikativ. Deshalb Konjunktiv II: müssten.',
 'Konjunktiv I of "müssen" in 3rd person plural would be "sie müssen" — same as indicative. Therefore Konjunktiv II: müssten.',
 3, 5),

('grammar', 'c1', 'konjunktiv_i', 'transform', NULL,
 'Konjunktiv I: Vergangenheit mit sein', 'Konjunktiv I: Past with sein',
 'Formulieren Sie die direkte Rede in indirekte Rede um.', 'Rephrase from direct to indirect speech.',
 '{"instruction": "Formulieren Sie in indirekter Rede:", "original": "Die Zeugin berichtete: \"Der Verdächtige ist gegen Mitternacht geflohen.\""}',
 '{"correct": "Die Zeugin berichtete, der Verdächtige sei gegen Mitternacht geflohen.", "accept_also": ["Die Zeugin berichtete, dass der Verdächtige gegen Mitternacht geflohen sei."]}',
 'Vergangenheit in der indirekten Rede: Konjunktiv I von \"sein\" + Partizip II. Er ist geflohen -> er sei geflohen.',
 'Past tense in indirect speech: Konjunktiv I of "sein" + past participle. Er ist geflohen -> er sei geflohen.',
 2, 6),

('grammar', 'c1', 'konjunktiv_i', 'transform', NULL,
 'Konjunktiv I: Vergangenheit mit haben', 'Konjunktiv I: Past with haben',
 'Formulieren Sie die direkte Rede in indirekte Rede um.', 'Rephrase from direct to indirect speech.',
 '{"instruction": "Formulieren Sie in indirekter Rede:", "original": "Der Journalist schrieb: \"Die Regierung hat den Gesetzentwurf abgelehnt.\""}',
 '{"correct": "Der Journalist schrieb, die Regierung habe den Gesetzentwurf abgelehnt.", "accept_also": ["Der Journalist schrieb, dass die Regierung den Gesetzentwurf abgelehnt habe."]}',
 'Vergangenheit in der indirekten Rede: Konjunktiv I von \"haben\" + Partizip II. Die Regierung hat abgelehnt -> die Regierung habe abgelehnt.',
 'Past tense in indirect speech: Konjunktiv I of "haben" + past participle. Die Regierung hat abgelehnt -> die Regierung habe abgelehnt.',
 2, 7),

('grammar', 'c1', 'konjunktiv_i', 'transform', NULL,
 'Konjunktiv I: Reguläres Verb', 'Konjunktiv I: Regular verb',
 'Formulieren Sie die direkte Rede in indirekte Rede um.', 'Rephrase from direct to indirect speech.',
 '{"instruction": "Formulieren Sie in indirekter Rede:", "original": "Die Professorin meinte: \"Die Studie zeigt eindeutige Ergebnisse.\""}',
 '{"correct": "Die Professorin meinte, die Studie zeige eindeutige Ergebnisse.", "accept_also": ["Die Professorin meinte, dass die Studie eindeutige Ergebnisse zeige."]}',
 'Konjunktiv I von \"zeigen\" in der 3. Person Singular: zeige (Stamm + e).',
 'Konjunktiv I of "zeigen" in 3rd person singular: zeige (stem + e).',
 2, 8);

-- Fill_in with options: Pick correct Konjunktiv I form (6 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'konjunktiv_i', 'fill_in', NULL,
 'K1-Form: sein', 'K1 form: sein',
 'Ergänzen Sie die richtige Konjunktiv-I-Form.', 'Fill in the correct Konjunktiv I form.',
 '{"sentence": "Der Sprecher betonte, die Lage ___ ernst.", "options": ["sei", "ist", "wäre"]}',
 '{"correct": 0}',
 'Konjunktiv I von \"sein\", 3. Person Singular: sei.',
 'Konjunktiv I of "sein", 3rd person singular: sei.',
 2, 9),

('grammar', 'c1', 'konjunktiv_i', 'fill_in', NULL,
 'K1-Form: haben (Plural)', 'K1 form: haben (plural)',
 'Ergänzen Sie die richtige Konjunktiv-Form.', 'Fill in the correct Konjunktiv form.',
 '{"sentence": "Die Medien berichteten, die Demonstranten ___ keine Genehmigung.", "options": ["hätten", "haben", "habe"]}',
 '{"correct": 0}',
 'Konjunktiv I von \"haben\" in der 3. Person Plural wäre \"haben\" — gleich wie Indikativ. Deshalb Konjunktiv II: hätten.',
 'Konjunktiv I of "haben" in 3rd person plural would be "haben" — same as indicative. Therefore Konjunktiv II: hätten.',
 3, 10),

('grammar', 'c1', 'konjunktiv_i', 'fill_in', NULL,
 'K1-Form: werde', 'K1 form: werde',
 'Ergänzen Sie die richtige Konjunktiv-I-Form.', 'Fill in the correct Konjunktiv I form.',
 '{"sentence": "Der CEO versicherte, das Unternehmen ___ neue Stellen schaffen.", "options": ["werde", "wird", "würde"]}',
 '{"correct": 0}',
 'Konjunktiv I von \"werden\", 3. Person Singular: werde. Hier ist die Form eindeutig, also kein Ausweichen auf K2 nötig.',
 'Konjunktiv I of "werden", 3rd person singular: werde. The form is unambiguous here, so no need to use K2.',
 2, 11),

('grammar', 'c1', 'konjunktiv_i', 'fill_in', NULL,
 'K1-Form: können', 'K1 form: können',
 'Ergänzen Sie die richtige Konjunktiv-I-Form.', 'Fill in the correct Konjunktiv I form.',
 '{"sentence": "Die Wissenschaftlerin erklärte, man ___ die Ergebnisse reproduzieren.", "options": ["könne", "kann", "könnte"]}',
 '{"correct": 0}',
 'Konjunktiv I von \"können\", 3. Person Singular (man): könne.',
 'Konjunktiv I of "können", 3rd person singular (man): könne.',
 2, 12),

('grammar', 'c1', 'konjunktiv_i', 'fill_in', NULL,
 'K1-Form: geben (Plural)', 'K1 form: geben (plural)',
 'Ergänzen Sie die richtige Konjunktiv-Form.', 'Fill in the correct Konjunktiv form.',
 '{"sentence": "Laut dem Bericht ___ es mehrere Ursachen für das Problem.", "options": ["gebe", "gibt", "gäbe"]}',
 '{"correct": 0}',
 'Konjunktiv I von \"geben\", 3. Person Singular (es): gebe. Die Form unterscheidet sich vom Indikativ \"gibt\", also ist K1 korrekt.',
 'Konjunktiv I of "geben", 3rd person singular (es): gebe. The form differs from indicative "gibt", so K1 is correct.',
 2, 13),

('grammar', 'c1', 'konjunktiv_i', 'fill_in', NULL,
 'K1-Form: Vergangenheit', 'K1 form: Past tense',
 'Ergänzen Sie die richtige Konjunktiv-I-Form.', 'Fill in the correct Konjunktiv I form.',
 '{"sentence": "Der Zeuge gab an, er ___ den Unfall genau beobachtet.", "options": ["habe", "hat", "hätte"]}',
 '{"correct": 0}',
 'Vergangenheit in indirekter Rede: Konjunktiv I von \"haben\" + Partizip II. 3. Person Singular: habe.',
 'Past tense in indirect speech: Konjunktiv I of "haben" + past participle. 3rd person singular: habe.',
 2, 14);

-- Multiple choice: Identify correct indirect speech (4 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'konjunktiv_i', 'multiple_choice', NULL,
 'Indirekte Rede erkennen (1)', 'Recognizing indirect speech (1)',
 'Welcher Satz gibt die direkte Rede korrekt in indirekter Rede wieder?', 'Which sentence correctly transforms the direct speech into indirect speech?',
 '{"sentence": "Die Kollegin sagte: \"Ich brauche mehr Zeit.\"", "options": ["Die Kollegin sagte, sie brauche mehr Zeit.", "Die Kollegin sagte, sie braucht mehr Zeit.", "Die Kollegin sagte, sie brauchte mehr Zeit.", "Die Kollegin sagte, sie brauchen mehr Zeit."]}',
 '{"correct": 0}',
 'Konjunktiv I von \"brauchen\", 3. Person Singular: brauche. Option B (Indikativ) und C (Präteritum) sind keine korrekte indirekte Rede.',
 'Konjunktiv I of "brauchen", 3rd person singular: brauche. Option B (indicative) and C (past tense) are not correct indirect speech.',
 2, 15),

('grammar', 'c1', 'konjunktiv_i', 'multiple_choice', NULL,
 'Indirekte Rede erkennen (2)', 'Recognizing indirect speech (2)',
 'Welcher Satz gibt die direkte Rede korrekt in indirekter Rede wieder?', 'Which sentence correctly transforms the direct speech into indirect speech?',
 '{"sentence": "Der Politiker erklärte: \"Wir werden die Steuern senken.\"", "options": ["Der Politiker erklärte, sie würden die Steuern senken.", "Der Politiker erklärte, sie werden die Steuern senken.", "Der Politiker erklärte, sie sollen die Steuern senken.", "Der Politiker erklärte, sie wollen die Steuern senken."]}',
 '{"correct": 0}',
 '\"Wir werden\" in K1 wäre \"sie werden\" — identisch mit dem Indikativ. Deshalb K2: sie würden.',
 '"Wir werden" in K1 would be "sie werden" — identical to indicative. Therefore K2: sie würden.',
 2, 16),

('grammar', 'c1', 'konjunktiv_i', 'multiple_choice', NULL,
 'Indirekte Rede erkennen (3)', 'Recognizing indirect speech (3)',
 'Welcher Satz gibt die direkte Rede korrekt in indirekter Rede wieder?', 'Which sentence correctly transforms the direct speech into indirect speech?',
 '{"sentence": "Der Arzt sagte: \"Der Patient hat sich gut erholt.\"", "options": ["Der Arzt sagte, der Patient habe sich gut erholt.", "Der Arzt sagte, der Patient hat sich gut erholt.", "Der Arzt sagte, der Patient sei sich gut erholt.", "Der Arzt sagte, der Patient hätte sich gut erholt."]}',
 '{"correct": 0}',
 'Vergangenheit mit \"haben\": K1 = habe + Partizip II. \"Sich erholen\" bildet das Perfekt mit \"haben\", nicht mit \"sein\".',
 'Past tense with "haben": K1 = habe + past participle. "Sich erholen" forms the perfect tense with "haben", not "sein".',
 2, 17),

('grammar', 'c1', 'konjunktiv_i', 'multiple_choice', NULL,
 'Indirekte Rede erkennen (4)', 'Recognizing indirect speech (4)',
 'Welcher Satz gibt die direkte Rede korrekt in indirekter Rede wieder?', 'Which sentence correctly transforms the direct speech into indirect speech?',
 '{"sentence": "Die Nachrichtensendung meldete: \"Es gibt keine Überlebenden.\"", "options": ["Die Nachrichtensendung meldete, es gebe keine Überlebenden.", "Die Nachrichtensendung meldete, es gäbe keine Überlebenden.", "Die Nachrichtensendung meldete, es gibt keine Überlebenden.", "Die Nachrichtensendung meldete, es gegeben keine Überlebenden."]}',
 '{"correct": 0}',
 'K1 von \"geben\", 3. Person Singular: gebe. K2 (gäbe) wird nur verwendet, wenn K1 und Indikativ identisch sind — hier nicht der Fall.',
 'K1 of "geben", 3rd person singular: gebe. K2 (gäbe) is only used when K1 and indicative are identical — not the case here.',
 2, 18);

-- Sentence build: Combine reporting verb with quoted statement (2 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'konjunktiv_i', 'sentence_build', NULL,
 'Indirekte Rede bilden (1)', 'Building indirect speech (1)',
 'Verbinden Sie die beiden Sätze zu einem Satz mit indirekter Rede.', 'Combine the two sentences into one using indirect speech.',
 '{"sentence_a": "Die Gewerkschaft teilte mit.", "sentence_b": "Die Verhandlungen sind gescheitert."}',
 '{"correct": "Die Gewerkschaft teilte mit, die Verhandlungen seien gescheitert.", "accept_also": ["Die Gewerkschaft teilte mit, dass die Verhandlungen gescheitert seien."]}',
 '\"Sind gescheitert\" wird zu \"seien gescheitert\" (K1 von \"sein\" + Partizip II). \"Scheitern\" bildet das Perfekt mit \"sein\".',
 '"Sind gescheitert" becomes "seien gescheitert" (K1 of "sein" + past participle). "Scheitern" forms the perfect with "sein".',
 3, 19),

('grammar', 'c1', 'konjunktiv_i', 'sentence_build', NULL,
 'Indirekte Rede bilden (2)', 'Building indirect speech (2)',
 'Verbinden Sie die beiden Sätze zu einem Satz mit indirekter Rede.', 'Combine the two sentences into one using indirect speech.',
 '{"sentence_a": "Der Pressesprecher bestätigte.", "sentence_b": "Der Vorstand wird nächste Woche zurücktreten."}',
 '{"correct": "Der Pressesprecher bestätigte, der Vorstand werde nächste Woche zurücktreten.", "accept_also": ["Der Pressesprecher bestätigte, dass der Vorstand nächste Woche zurücktreten werde."]}',
 'K1 von \"werden\", 3. Person Singular: werde. Im Nebensatz mit \"dass\" steht das konjugierte Verb am Ende.',
 'K1 of "werden", 3rd person singular: werde. In a subordinate clause with "dass", the conjugated verb goes to the end.',
 3, 20);


-- ============================================================
-- 2. PARTIZIPIALGRUPPEN (Extended Participial Phrases) — 16 exercises
-- ============================================================

-- Transform: Relative clause -> Participial phrase (6 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'partizipialgruppen', 'transform', NULL,
 'Partizip II: Passiv-Relativsatz', 'Partizip II: Passive relative clause',
 'Formulieren Sie den Relativsatz als Partizipialgruppe um.', 'Rephrase the relative clause as a participial phrase.',
 '{"instruction": "Ersetzen Sie den Relativsatz durch eine Partizipialgruppe:", "original": "Das Buch, das viel diskutiert wird, erscheint im Herbst."}',
 '{"correct": "Das viel diskutierte Buch erscheint im Herbst.", "accept_also": []}',
 'Partizip II (diskutiert) + Adjektivendung (-e, Nominativ Neutrum): diskutierte. Passiv-Relativsätze werden zu Partizip-II-Konstruktionen.',
 'Partizip II (diskutiert) + adjective ending (-e, nominative neuter): diskutierte. Passive relative clauses become Partizip II constructions.',
 2, 1),

('grammar', 'c1', 'partizipialgruppen', 'transform', NULL,
 'Partizip I: Aktiv-Relativsatz', 'Partizip I: Active relative clause',
 'Formulieren Sie den Relativsatz als Partizipialgruppe um.', 'Rephrase the relative clause as a participial phrase.',
 '{"instruction": "Ersetzen Sie den Relativsatz durch eine Partizipialgruppe:", "original": "Die Kosten, die ständig steigen, belasten den Haushalt."}',
 '{"correct": "Die ständig steigenden Kosten belasten den Haushalt.", "accept_also": []}',
 'Partizip I (steigend) + Adjektivendung (-en, Nominativ Plural): steigenden. Aktive Relativsätze im Präsens werden zu Partizip-I-Konstruktionen.',
 'Partizip I (steigend) + adjective ending (-en, nominative plural): steigenden. Active relative clauses in present tense become Partizip I constructions.',
 2, 2),

('grammar', 'c1', 'partizipialgruppen', 'transform', NULL,
 'Partizip II mit Präpositionalphrase', 'Partizip II with prepositional phrase',
 'Formulieren Sie den Relativsatz als Partizipialgruppe um.', 'Rephrase the relative clause as a participial phrase.',
 '{"instruction": "Ersetzen Sie den Relativsatz durch eine Partizipialgruppe:", "original": "Der Bericht, der von der Kommission verfasst wurde, enthält alarmierende Daten."}',
 '{"correct": "Der von der Kommission verfasste Bericht enthält alarmierende Daten.", "accept_also": []}',
 'Partizip II (verfasst) + Adjektivendung (-e, Nominativ Maskulin). Die Präpositionalphrase \"von der Kommission\" steht vor dem Partizip.',
 'Partizip II (verfasst) + adjective ending (-e, nominative masculine). The prepositional phrase "von der Kommission" precedes the participle.',
 3, 3),

('grammar', 'c1', 'partizipialgruppen', 'transform', NULL,
 'Partizip I: komplexer Relativsatz', 'Partizip I: complex relative clause',
 'Formulieren Sie den Relativsatz als Partizipialgruppe um.', 'Rephrase the relative clause as a participial phrase.',
 '{"instruction": "Ersetzen Sie den Relativsatz durch eine Partizipialgruppe:", "original": "Die Mitarbeiter, die in der Nachtschicht arbeiten, erhalten einen Zuschlag."}',
 '{"correct": "Die in der Nachtschicht arbeitenden Mitarbeiter erhalten einen Zuschlag.", "accept_also": []}',
 'Partizip I (arbeitend) + Adjektivendung (-en, Nominativ Plural). Die adverbiale Bestimmung \"in der Nachtschicht\" wird vorangestellt.',
 'Partizip I (arbeitend) + adjective ending (-en, nominative plural). The adverbial phrase "in der Nachtschicht" is placed before the participle.',
 3, 4),

('grammar', 'c1', 'partizipialgruppen', 'transform', NULL,
 'Partizip II: Perfekt-Relativsatz', 'Partizip II: Perfect tense relative clause',
 'Formulieren Sie den Relativsatz als Partizipialgruppe um.', 'Rephrase the relative clause as a participial phrase.',
 '{"instruction": "Ersetzen Sie den Relativsatz durch eine Partizipialgruppe:", "original": "Die Daten, die kürzlich veröffentlicht wurden, widersprechen der Theorie."}',
 '{"correct": "Die kürzlich veröffentlichten Daten widersprechen der Theorie.", "accept_also": []}',
 'Partizip II (veröffentlicht) + Adjektivendung (-en, Nominativ Plural): veröffentlichten. Das Adverb \"kürzlich\" bleibt erhalten.',
 'Partizip II (veröffentlicht) + adjective ending (-en, nominative plural): veröffentlichten. The adverb "kürzlich" is retained.',
 2, 5),

('grammar', 'c1', 'partizipialgruppen', 'transform', NULL,
 'Partizip I: reflexives Verb', 'Partizip I: reflexive verb',
 'Formulieren Sie den Relativsatz als Partizipialgruppe um.', 'Rephrase the relative clause as a participial phrase.',
 '{"instruction": "Ersetzen Sie den Relativsatz durch eine Partizipialgruppe:", "original": "Die Technologie, die sich rasant entwickelt, verändert den Arbeitsmarkt."}',
 '{"correct": "Die sich rasant entwickelnde Technologie verändert den Arbeitsmarkt.", "accept_also": []}',
 'Partizip I (entwickelnd) + Adjektivendung (-e, Nominativ Feminin). Bei reflexiven Verben bleibt \"sich\" in der Partizipialgruppe erhalten.',
 'Partizip I (entwickelnd) + adjective ending (-e, nominative feminine). With reflexive verbs, "sich" is retained in the participial phrase.',
 3, 6);

-- Sentence build: Two sentences -> one with participial phrase (4 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'partizipialgruppen', 'sentence_build', NULL,
 'Partizipialgruppe bilden (1)', 'Building participial phrases (1)',
 'Verbinden Sie die beiden Sätze mithilfe einer Partizipialgruppe.', 'Combine the two sentences using a participial phrase.',
 '{"sentence_a": "Der Antrag wurde einstimmig angenommen.", "sentence_b": "Er tritt ab sofort in Kraft."}',
 '{"correct": "Der einstimmig angenommene Antrag tritt ab sofort in Kraft.", "accept_also": []}',
 'Partizip II von \"annehmen\": angenommen. Mit Adjektivendung -e (Nominativ Maskulin): angenommene.',
 'Partizip II of "annehmen": angenommen. With adjective ending -e (nominative masculine): angenommene.',
 3, 7),

('grammar', 'c1', 'partizipialgruppen', 'sentence_build', NULL,
 'Partizipialgruppe bilden (2)', 'Building participial phrases (2)',
 'Verbinden Sie die beiden Sätze mithilfe einer Partizipialgruppe.', 'Combine the two sentences using a participial phrase.',
 '{"sentence_a": "Die Zahl der Pendler wächst stetig.", "sentence_b": "Sie stellt die Infrastruktur vor Herausforderungen."}',
 '{"correct": "Die stetig wachsende Zahl der Pendler stellt die Infrastruktur vor Herausforderungen.", "accept_also": []}',
 'Partizip I von \"wachsen\": wachsend. Mit Adjektivendung -e (Nominativ Feminin): wachsende.',
 'Partizip I of "wachsen": wachsend. With adjective ending -e (nominative feminine): wachsende.',
 3, 8),

('grammar', 'c1', 'partizipialgruppen', 'sentence_build', NULL,
 'Partizipialgruppe bilden (3)', 'Building participial phrases (3)',
 'Verbinden Sie die beiden Sätze mithilfe einer Partizipialgruppe.', 'Combine the two sentences using a participial phrase.',
 '{"sentence_a": "Das Projekt wurde vom Ministerium finanziert.", "sentence_b": "Es läuft noch bis Ende des Jahres."}',
 '{"correct": "Das vom Ministerium finanzierte Projekt läuft noch bis Ende des Jahres.", "accept_also": []}',
 'Partizip II von \"finanzieren\": finanziert. Mit Präpositionalphrase: \"vom Ministerium finanzierte\" (Nominativ Neutrum).',
 'Partizip II of "finanzieren": finanziert. With prepositional phrase: "vom Ministerium finanzierte" (nominative neuter).',
 3, 9),

('grammar', 'c1', 'partizipialgruppen', 'sentence_build', NULL,
 'Partizipialgruppe bilden (4)', 'Building participial phrases (4)',
 'Verbinden Sie die beiden Sätze mithilfe einer Partizipialgruppe.', 'Combine the two sentences using a participial phrase.',
 '{"sentence_a": "Die Maßnahme betrifft alle Abteilungen.", "sentence_b": "Sie wurde gestern beschlossen."}',
 '{"correct": "Die gestern beschlossene Maßnahme betrifft alle Abteilungen.", "accept_also": []}',
 'Partizip II von \"beschließen\": beschlossen. Mit Adjektivendung -e (Nominativ Feminin): beschlossene.',
 'Partizip II of "beschließen": beschlossen. With adjective ending -e (nominative feminine): beschlossene.',
 3, 10);

-- Fill_in: Complete the participial construction (4 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'partizipialgruppen', 'fill_in', NULL,
 'Partizip I oder II? (1)', 'Partizip I or II? (1)',
 'Ergänzen Sie die korrekte Partizipform mit Endung.', 'Fill in the correct participle form with ending.',
 '{"sentence": "Die stark ___ Preise beunruhigen die Verbraucher.", "hint": "steigen, Nominativ Plural"}',
 '{"correct": "steigenden"}',
 'Partizip I: steigend (Aktion läuft gerade). Nominativ Plural mit bestimmtem Artikel: -en. Die steigenden Preise.',
 'Partizip I: steigend (action is ongoing). Nominative plural with definite article: -en. Die steigenden Preise.',
 2, 11),

('grammar', 'c1', 'partizipialgruppen', 'fill_in', NULL,
 'Partizip I oder II? (2)', 'Partizip I or II? (2)',
 'Ergänzen Sie die korrekte Partizipform mit Endung.', 'Fill in the correct participle form with ending.',
 '{"sentence": "Der gut ___ Kandidat überzeugte im Bewerbungsgespräch.", "hint": "vorbereiten, Nominativ Maskulin"}',
 '{"correct": "vorbereitete"}',
 'Partizip II: vorbereitet (abgeschlossene Handlung, passivisch). Nominativ Maskulin mit bestimmtem Artikel: -e. Der vorbereitete Kandidat.',
 'Partizip II: vorbereitet (completed action, passive meaning). Nominative masculine with definite article: -e. Der vorbereitete Kandidat.',
 2, 12),

('grammar', 'c1', 'partizipialgruppen', 'fill_in', NULL,
 'Partizip I oder II? (3)', 'Partizip I or II? (3)',
 'Ergänzen Sie die korrekte Partizipform mit Endung.', 'Fill in the correct participle form with ending.',
 '{"sentence": "Wir reagierten auf die von Kunden ___ Beschwerden.", "hint": "einreichen, Akkusativ Plural"}',
 '{"correct": "eingereichten"}',
 'Partizip II: eingereicht (abgeschlossene Handlung, Passiv). Akkusativ Plural mit bestimmtem Artikel: -en. Die eingereichten Beschwerden.',
 'Partizip II: eingereicht (completed action, passive). Accusative plural with definite article: -en. Die eingereichten Beschwerden.',
 3, 13),

('grammar', 'c1', 'partizipialgruppen', 'fill_in', NULL,
 'Partizip I oder II? (4)', 'Partizip I or II? (4)',
 'Ergänzen Sie die korrekte Partizipform mit Endung.', 'Fill in the correct participle form with ending.',
 '{"sentence": "Ein überraschend gut ___ Vortrag beeindruckte das Publikum.", "hint": "gelingen, Nominativ Maskulin"}',
 '{"correct": "gelungener"}',
 'Partizip II: gelungen (Ergebnis). Nominativ Maskulin mit unbestimmtem Artikel (ein): -er. Ein gelungener Vortrag.',
 'Partizip II: gelungen (result). Nominative masculine with indefinite article (ein): -er. Ein gelungener Vortrag.',
 3, 14);

-- Multiple choice: Which sentence correctly uses the participial phrase? (2 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'partizipialgruppen', 'multiple_choice', NULL,
 'Korrekte Partizipialgruppe (1)', 'Correct participial phrase (1)',
 'Welcher Satz enthält eine korrekte Partizipialgruppe?', 'Which sentence contains a correct participial phrase?',
 '{"sentence": "Welcher Satz ist grammatisch korrekt?", "options": ["Die seit Wochen anhaltende Dürre gefährdet die Ernte.", "Die seit Wochen angehaltene Dürre gefährdet die Ernte.", "Die seit Wochen anhaltenden Dürre gefährdet die Ernte.", "Die seit Wochen angehaltenen Dürre gefährdet die Ernte."]}',
 '{"correct": 0}',
 'Partizip I von \"anhalten\" (= andauern): anhaltend. Nominativ Feminin mit bestimmtem Artikel: -e. Partizip II \"angehalten\" bedeutet \"gestoppt\" und passt semantisch nicht.',
 'Partizip I of "anhalten" (= to persist): anhaltend. Nominative feminine with definite article: -e. Partizip II "angehalten" means "stopped" and does not fit semantically.',
 2, 15),

('grammar', 'c1', 'partizipialgruppen', 'multiple_choice', NULL,
 'Korrekte Partizipialgruppe (2)', 'Correct participial phrase (2)',
 'Welcher Satz enthält eine korrekte Partizipialgruppe?', 'Which sentence contains a correct participial phrase?',
 '{"sentence": "Welcher Satz ist grammatisch korrekt?", "options": ["Das in der Presse heftig kritisierte Gesetz wurde zurückgezogen.", "Das in der Presse heftig kritisierende Gesetz wurde zurückgezogen.", "Das in der Presse heftig kritisiertes Gesetz wurde zurückgezogen.", "Das in der Presse heftig kritisiert Gesetz wurde zurückgezogen."]}',
 '{"correct": 0}',
 'Das Gesetz wird kritisiert (Passiv) -> Partizip II: kritisiert. Nominativ Neutrum mit bestimmtem Artikel: -e. Partizip I (kritisierend) wäre aktiv und passt nicht — das Gesetz kritisiert nicht, sondern wird kritisiert.',
 'The law is being criticized (passive) -> Partizip II: kritisiert. Nominative neuter with definite article: -e. Partizip I (kritisierend) would be active and doesn''t fit — the law isn''t criticizing, it''s being criticized.',
 2, 16);


-- ============================================================
-- 3. MODALPARTIKELN — 16 exercises
-- ============================================================

-- Multiple choice: Pick the right Modalpartikel (8 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'modalpartikeln', 'multiple_choice', NULL,
 'Modalpartikel: Beruhigung', 'Modal particle: Reassurance',
 'Welche Modalpartikel passt am besten in den Satz?', 'Which modal particle fits best?',
 '{"sentence": "Mach dir keine Sorgen, das wird ___ alles gut.", "options": ["schon", "halt", "eigentlich", "eben"]}',
 '{"correct": 0}',
 '\"Schon\" drückt hier zuversichtliche Beruhigung aus: Es wird schon gut gehen. Es signalisiert dem Gesprächspartner, dass man optimistisch ist.',
 '"Schon" expresses reassuring confidence here: It will be fine. It signals optimism to the listener.',
 2, 1),

('grammar', 'c1', 'modalpartikeln', 'multiple_choice', NULL,
 'Modalpartikel: Widerspruch', 'Modal particle: Contradiction',
 'Welche Modalpartikel passt am besten in den Satz?', 'Which modal particle fits best?',
 '{"sentence": "Du kannst ___ nicht einfach kündigen, ohne einen neuen Job zu haben!", "options": ["doch", "mal", "wohl", "ja"]}',
 '{"correct": 0}',
 '\"Doch\" drückt hier Widerspruch oder Empörung aus. Der Sprecher widerspricht einer Handlung oder Absicht.',
 '"Doch" expresses contradiction or indignation here. The speaker objects to an action or intention.',
 2, 2),

('grammar', 'c1', 'modalpartikeln', 'multiple_choice', NULL,
 'Modalpartikel: Aufforderung abschwächen', 'Modal particle: Softening a request',
 'Welche Modalpartikel passt am besten in den Satz?', 'Which modal particle fits best?',
 '{"sentence": "Kannst du ___ kurz die Tür zumachen?", "options": ["mal", "halt", "ja", "wohl"]}',
 '{"correct": 0}',
 '\"Mal\" macht eine Bitte informeller und freundlicher. \"Kannst du mal...\" klingt weniger fordernd als \"Kannst du...\".',
 '"Mal" makes a request more informal and friendly. "Kannst du mal..." sounds less demanding than "Kannst du...".',
 2, 3),

('grammar', 'c1', 'modalpartikeln', 'multiple_choice', NULL,
 'Modalpartikel: Selbstverständlichkeit', 'Modal particle: Stating the obvious',
 'Welche Modalpartikel passt am besten in den Satz?', 'Which modal particle fits best?',
 '{"sentence": "Du weißt ___, dass die Deadline morgen ist.", "options": ["ja", "mal", "halt", "schon"]}',
 '{"correct": 0}',
 '\"Ja\" signalisiert, dass der Sprecher davon ausgeht, dass der Hörer die Information bereits kennt — etwas Offensichtliches.',
 '"Ja" signals that the speaker assumes the listener already knows this — something obvious.',
 2, 4),

('grammar', 'c1', 'modalpartikeln', 'multiple_choice', NULL,
 'Modalpartikel: Resignation', 'Modal particle: Resignation',
 'Welche Modalpartikel passt am besten in den Satz?', 'Which modal particle fits best?',
 '{"sentence": "Da kann man ___ nichts machen.", "options": ["eben", "mal", "doch", "eigentlich"]}',
 '{"correct": 0}',
 '\"Eben\" (oder \"halt\") drückt Resignation oder Akzeptanz aus: So ist es nun mal, man kann es nicht ändern.',
 '"Eben" (or "halt") expresses resignation or acceptance: That''s just the way it is, you can''t change it.',
 2, 5),

('grammar', 'c1', 'modalpartikeln', 'multiple_choice', NULL,
 'Modalpartikel: Vermutung', 'Modal particle: Probability',
 'Welche Modalpartikel passt am besten in den Satz?', 'Which modal particle fits best?',
 '{"sentence": "Er ist nicht im Büro. Er ist ___ schon nach Hause gegangen.", "options": ["wohl", "ja", "doch", "mal"]}',
 '{"correct": 0}',
 '\"Wohl\" drückt eine Vermutung oder Wahrscheinlichkeit aus. Der Sprecher ist sich nicht sicher, hält es aber für wahrscheinlich.',
 '"Wohl" expresses an assumption or probability. The speaker is not sure but considers it likely.',
 2, 6),

('grammar', 'c1', 'modalpartikeln', 'multiple_choice', NULL,
 'Modalpartikel: Einschränkung', 'Modal particle: Qualification',
 'Welche Modalpartikel passt am besten in den Satz?', 'Which modal particle fits best?',
 '{"sentence": "___ wollte ich etwas ganz anderes fragen.", "options": ["Eigentlich", "Halt", "Eben", "Wohl"]}',
 '{"correct": 0}',
 '\"Eigentlich\" leitet eine Korrektur oder einen Themenwechsel ein und signalisiert, dass das Folgende von dem abweicht, was man erwarten könnte.',
 '"Eigentlich" introduces a correction or topic change and signals that what follows differs from what one might expect.',
 3, 7),

('grammar', 'c1', 'modalpartikeln', 'multiple_choice', NULL,
 'Modalpartikel: Akzeptanz im Alltag', 'Modal particle: Everyday acceptance',
 'Welche Modalpartikel passt am besten in den Satz?', 'Which modal particle fits best?',
 '{"sentence": "Wenn der Bus nicht kommt, gehen wir ___ zu Fuß.", "options": ["halt", "ja", "wohl", "eigentlich"]}',
 '{"correct": 0}',
 '\"Halt\" drückt pragmatische Akzeptanz aus — es gibt keine bessere Alternative, also macht man das Naheliegende. Ähnlich wie \"eben\".',
 '"Halt" expresses pragmatic acceptance — there''s no better alternative, so one does the obvious thing. Similar to "eben".',
 2, 8);

-- Fill_in with options: Insert the fitting Modalpartikel (4 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'modalpartikeln', 'fill_in', NULL,
 'Modalpartikel einsetzen (1)', 'Insert modal particle (1)',
 'Wählen Sie die passende Modalpartikel.', 'Choose the fitting modal particle.',
 '{"sentence": "Komm ___ vorbei, wenn du Zeit hast!", "options": ["doch", "eben", "wohl"]}',
 '{"correct": 0}',
 '\"Doch\" verstärkt hier die Einladung und macht sie nachdrücklicher und herzlicher.',
 '"Doch" strengthens the invitation here, making it more emphatic and warm.',
 2, 9),

('grammar', 'c1', 'modalpartikeln', 'fill_in', NULL,
 'Modalpartikel einsetzen (2)', 'Insert modal particle (2)',
 'Wählen Sie die passende Modalpartikel.', 'Choose the fitting modal particle.',
 '{"sentence": "Das ist ___ nicht so schwer, wie du denkst.", "options": ["doch", "halt", "mal"]}',
 '{"correct": 0}',
 '\"Doch\" widerspricht hier der Annahme des Gesprächspartners: Du denkst, es ist schwer, aber es ist es nicht.',
 '"Doch" contradicts the listener''s assumption here: You think it''s hard, but it isn''t.',
 2, 10),

('grammar', 'c1', 'modalpartikeln', 'fill_in', NULL,
 'Modalpartikel einsetzen (3)', 'Insert modal particle (3)',
 'Wählen Sie die passende Modalpartikel.', 'Choose the fitting modal particle.',
 '{"sentence": "Das hättest du ___ früher sagen können!", "options": ["ja", "halt", "eigentlich"]}',
 '{"correct": 0}',
 '\"Ja\" drückt hier einen Vorwurf mit dem Unterton aus: Das ist doch offensichtlich! Du hättest es wissen müssen.',
 '"Ja" expresses a reproach here with the undertone: That''s obvious! You should have known.',
 2, 11),

('grammar', 'c1', 'modalpartikeln', 'fill_in', NULL,
 'Modalpartikel einsetzen (4)', 'Insert modal particle (4)',
 'Wählen Sie die passende Modalpartikel.', 'Choose the fitting modal particle.',
 '{"sentence": "Ich schaue mir das Angebot ___ noch einmal an.", "options": ["mal", "ja", "eben"]}',
 '{"correct": 0}',
 '\"Mal\" signalisiert eine beiläufige, unverbindliche Absicht. Es macht die Aussage weniger verbindlich.',
 '"Mal" signals a casual, noncommittal intention. It makes the statement less binding.',
 2, 12);

-- Match: Modalpartikel -> function/nuance (2 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'modalpartikeln', 'match', NULL,
 'Modalpartikeln: Funktionen (1)', 'Modal particles: Functions (1)',
 'Ordnen Sie jede Modalpartikel ihrer Funktion zu.', 'Match each modal particle to its function.',
 '{"pairs": [{"word": "doch", "match": "Widerspruch, Ermutigung"}, {"word": "mal", "match": "Abschwächung einer Bitte"}, {"word": "ja", "match": "Verweis auf Bekanntes"}, {"word": "wohl", "match": "Vermutung, Wahrscheinlichkeit"}]}',
 '{}',
 'Doch = Widerspruch/Ermutigung. Mal = Abschwächung. Ja = etwas Offensichtliches. Wohl = Vermutung.',
 'Doch = contradiction/encouragement. Mal = softening. Ja = something obvious. Wohl = assumption.',
 1, 13),

('grammar', 'c1', 'modalpartikeln', 'match', NULL,
 'Modalpartikeln: Funktionen (2)', 'Modal particles: Functions (2)',
 'Ordnen Sie jede Modalpartikel ihrer Funktion zu.', 'Match each modal particle to its function.',
 '{"pairs": [{"word": "halt", "match": "Resignation, pragmatische Akzeptanz"}, {"word": "eben", "match": "Unveränderlichkeit, so ist es"}, {"word": "schon", "match": "Zuversicht, Beruhigung"}, {"word": "eigentlich", "match": "Einschränkung, Themenwechsel"}]}',
 '{}',
 'Halt = Resignation. Eben = Unveränderlichkeit. Schon = Zuversicht. Eigentlich = Einschränkung/Korrektur.',
 'Halt = resignation. Eben = unchangeability. Schon = confidence. Eigentlich = qualification/correction.',
 2, 14);

-- Fill_in free text: Write the missing Modalpartikel (2 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'modalpartikeln', 'fill_in', NULL,
 'Modalpartikel erkennen (1)', 'Recognizing modal particles (1)',
 'Welche Modalpartikel fehlt? Der Sprecher will eine Vermutung ausdrücken.', 'Which modal particle is missing? The speaker wants to express an assumption.',
 '{"sentence": "Sie hat ___ den Zug verpasst.", "hint": "Drückt eine Vermutung aus"}',
 '{"correct": "wohl"}',
 '\"Wohl\" drückt aus, dass der Sprecher etwas vermutet, aber nicht sicher weiß.',
 '"Wohl" expresses that the speaker suspects something but doesn''t know for certain.',
 3, 15),

('grammar', 'c1', 'modalpartikeln', 'fill_in', NULL,
 'Modalpartikel erkennen (2)', 'Recognizing modal particles (2)',
 'Welche Modalpartikel fehlt? Der Sprecher will die Bitte freundlicher machen.', 'Which modal particle is missing? The speaker wants to soften the request.',
 '{"sentence": "Könnten Sie ___ das Fenster öffnen?", "hint": "Macht eine Bitte höflicher und informeller"}',
 '{"correct": "mal"}',
 '\"Mal\" macht eine Aufforderung oder Bitte weniger direkt und freundlicher.',
 '"Mal" makes a request less direct and more friendly.',
 3, 16);


-- ============================================================
-- 4. FUNKTIONSVERBGEFUEGE (Advanced) — 16 exercises
-- ============================================================

-- Match: FVG -> simple verb equivalent (4 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'funktionsverbgefuege', 'match', NULL,
 'FVG und einfache Verben (1)', 'FVG and simple verbs (1)',
 'Ordnen Sie jedes Funktionsverbgefüge dem entsprechenden einfachen Verb zu.', 'Match each FVG to its simple verb equivalent.',
 '{"pairs": [{"word": "zur Diskussion stellen", "match": "diskutieren"}, {"word": "in Erwägung ziehen", "match": "erwägen"}, {"word": "Einfluss nehmen auf", "match": "beeinflussen"}, {"word": "in Anspruch nehmen", "match": "beanspruchen/nutzen"}]}',
 '{}',
 'Funktionsverbgefüge sind typisch für die formelle Schriftsprache und bestehen aus einem bedeutungsarmen Verb + einer Nomen-Präposition-Verbindung.',
 'Funktionsverbgefüge are typical of formal written language and consist of a semantically light verb + a noun-preposition combination.',
 2, 1),

('grammar', 'c1', 'funktionsverbgefuege', 'match', NULL,
 'FVG und einfache Verben (2)', 'FVG and simple verbs (2)',
 'Ordnen Sie jedes Funktionsverbgefüge dem entsprechenden einfachen Verb zu.', 'Match each FVG to its simple verb equivalent.',
 '{"pairs": [{"word": "unter Beweis stellen", "match": "beweisen"}, {"word": "in Kauf nehmen", "match": "akzeptieren"}, {"word": "zum Einsatz kommen", "match": "eingesetzt werden"}, {"word": "Bezug nehmen auf", "match": "sich beziehen auf"}]}',
 '{}',
 'Diese FVG kommen häufig in offiziellen Dokumenten, Berichten und wissenschaftlichen Texten vor.',
 'These FVG frequently appear in official documents, reports, and academic texts.',
 2, 2),

('grammar', 'c1', 'funktionsverbgefuege', 'match', NULL,
 'FVG und einfache Verben (3)', 'FVG and simple verbs (3)',
 'Ordnen Sie jedes Funktionsverbgefüge dem entsprechenden einfachen Verb zu.', 'Match each FVG to its simple verb equivalent.',
 '{"pairs": [{"word": "in Betracht ziehen", "match": "berücksichtigen"}, {"word": "zum Ausdruck bringen", "match": "ausdrücken"}, {"word": "in Kraft treten", "match": "gültig werden"}, {"word": "Stellung nehmen zu", "match": "sich äußern zu"}]}',
 '{}',
 'Viele FVG haben eine passive oder aktive Variante: \"in Kraft treten\" (aktiv) vs. \"in Kraft setzen\" (kausativ).',
 'Many FVG have an active or passive variant: "in Kraft treten" (active) vs. "in Kraft setzen" (causative).',
 2, 3),

('grammar', 'c1', 'funktionsverbgefuege', 'match', NULL,
 'FVG und einfache Verben (4)', 'FVG and simple verbs (4)',
 'Ordnen Sie jedes Funktionsverbgefüge dem entsprechenden einfachen Verb zu.', 'Match each FVG to its simple verb equivalent.',
 '{"pairs": [{"word": "Kritik üben an", "match": "kritisieren"}, {"word": "zur Verfügung stellen", "match": "bereitstellen"}, {"word": "in Frage stellen", "match": "bezweifeln"}, {"word": "Kenntnis nehmen von", "match": "zur Kenntnis nehmen/erfahren"}]}',
 '{}',
 'Einige FVG sind so gebräuchlich, dass sie kaum noch als formell empfunden werden (z.B. \"in Frage stellen\", \"zur Verfügung stellen\").',
 'Some FVG are so common that they are barely perceived as formal anymore (e.g., "in Frage stellen", "zur Verfügung stellen").',
 2, 4);

-- Fill_in with options: Complete the FVG (6 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'funktionsverbgefuege', 'fill_in', NULL,
 'FVG ergänzen (1)', 'Complete the FVG (1)',
 'Wählen Sie das passende Nomen, um das Funktionsverbgefüge zu vervollständigen.', 'Choose the correct noun to complete the FVG.',
 '{"sentence": "Die neue Regelung wurde in ___ gestellt.", "options": ["Frage", "Kraft", "Betracht"]}',
 '{"correct": 0}',
 '\"In Frage stellen\" = bezweifeln. \"In Kraft setzen\" wäre auch möglich, aber \"in Kraft stellen\" existiert nicht. \"In Betracht ziehen\", nicht \"stellen\".',
 '"In Frage stellen" = to question/doubt. "In Kraft setzen" would also work, but "in Kraft stellen" doesn''t exist. "In Betracht ziehen", not "stellen".',
 2, 5),

('grammar', 'c1', 'funktionsverbgefuege', 'fill_in', NULL,
 'FVG ergänzen (2)', 'Complete the FVG (2)',
 'Wählen Sie das passende Verb, um das Funktionsverbgefüge zu vervollständigen.', 'Choose the correct verb to complete the FVG.',
 '{"sentence": "Der Ausschuss hat zu dem Vorschlag ___ genommen.", "options": ["Stellung", "Kenntnis", "Bezug"]}',
 '{"correct": 0}',
 '\"Stellung nehmen zu\" = sich äußern zu. \"Kenntnis nehmen von\" und \"Bezug nehmen auf\" hätten andere Präpositionen.',
 '"Stellung nehmen zu" = to comment on. "Kenntnis nehmen von" and "Bezug nehmen auf" would require different prepositions.',
 2, 6),

('grammar', 'c1', 'funktionsverbgefuege', 'fill_in', NULL,
 'FVG ergänzen (3)', 'Complete the FVG (3)',
 'Wählen Sie das passende Nomen, um das Funktionsverbgefüge zu vervollständigen.', 'Choose the correct noun to complete the FVG.',
 '{"sentence": "Die Firma stellt ihren Kunden einen Berater zur ___ .", "options": ["Verfügung", "Diskussion", "Kenntnis"]}',
 '{"correct": 0}',
 '\"Zur Verfügung stellen\" = bereitstellen. \"Zur Diskussion stellen\" = zum Diskutieren anbieten. \"Zur Kenntnis\" nimmt man etwas.',
 '"Zur Verfügung stellen" = to provide/make available. "Zur Diskussion stellen" = to open for discussion. "Zur Kenntnis" — one takes note of something.',
 2, 7),

('grammar', 'c1', 'funktionsverbgefuege', 'fill_in', NULL,
 'FVG ergänzen (4)', 'Complete the FVG (4)',
 'Wählen Sie das passende Nomen, um das Funktionsverbgefüge zu vervollständigen.', 'Choose the correct noun to complete the FVG.',
 '{"sentence": "Man muss gewisse Nachteile in ___ nehmen.", "options": ["Kauf", "Anspruch", "Betracht"]}',
 '{"correct": 0}',
 '\"In Kauf nehmen\" = akzeptieren (etwas Negatives). \"In Anspruch nehmen\" = nutzen. \"In Betracht ziehen\" = erwägen (mit \"ziehen\", nicht \"nehmen\").',
 '"In Kauf nehmen" = to accept (something negative). "In Anspruch nehmen" = to use. "In Betracht ziehen" = to consider (with "ziehen", not "nehmen").',
 2, 8),

('grammar', 'c1', 'funktionsverbgefuege', 'fill_in', NULL,
 'FVG ergänzen (5)', 'Complete the FVG (5)',
 'Wählen Sie die passende Präposition, um das Funktionsverbgefüge zu vervollständigen.', 'Choose the correct preposition to complete the FVG.',
 '{"sentence": "Das neue Gesetz tritt am 1. Januar ___ Kraft.", "options": ["in", "zur", "unter"]}',
 '{"correct": 0}',
 '\"In Kraft treten\" = gültig werden. Die Präposition ist immer \"in\".',
 '"In Kraft treten" = to come into effect. The preposition is always "in".',
 2, 9),

('grammar', 'c1', 'funktionsverbgefuege', 'fill_in', NULL,
 'FVG ergänzen (6)', 'Complete the FVG (6)',
 'Wählen Sie das passende Nomen, um das Funktionsverbgefüge zu vervollständigen.', 'Choose the correct noun to complete the FVG.',
 '{"sentence": "Der Redner brachte seine Bedenken klar zum ___ .", "options": ["Ausdruck", "Einsatz", "Beweis"]}',
 '{"correct": 0}',
 '\"Zum Ausdruck bringen\" = ausdrücken. \"Zum Einsatz bringen\" = einsetzen. \"Unter Beweis stellen\" = beweisen (andere Präposition).',
 '"Zum Ausdruck bringen" = to express. "Zum Einsatz bringen" = to deploy. "Unter Beweis stellen" = to prove (different preposition).',
 3, 10);

-- Transform: Simple verb -> FVG reformulation (4 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'funktionsverbgefuege', 'transform', NULL,
 'Verb -> FVG (1)', 'Verb -> FVG (1)',
 'Formulieren Sie den Satz mit einem Funktionsverbgefüge um.', 'Rephrase the sentence using a Funktionsverbgefüge.',
 '{"instruction": "Ersetzen Sie das unterstrichene Verb durch ein FVG:", "original": "Man kritisierte den Vorschlag heftig."}',
 '{"correct": "An dem Vorschlag wurde heftig Kritik geübt.", "accept_also": ["Am Vorschlag wurde heftig Kritik geübt."]}',
 '\"Kritisieren\" -> \"Kritik üben an\" (+ Dativ). In der formellen Umformung wird oft das Passiv verwendet.',
 '"Kritisieren" -> "Kritik üben an" (+ dative). In the formal rephrasing, the passive voice is often used.',
 3, 11),

('grammar', 'c1', 'funktionsverbgefuege', 'transform', NULL,
 'Verb -> FVG (2)', 'Verb -> FVG (2)',
 'Formulieren Sie den Satz mit einem Funktionsverbgefüge um.', 'Rephrase the sentence using a Funktionsverbgefüge.',
 '{"instruction": "Ersetzen Sie das unterstrichene Verb durch ein FVG:", "original": "Die Behörde berücksichtigt alternative Lösungen."}',
 '{"correct": "Die Behörde zieht alternative Lösungen in Betracht.", "accept_also": ["Alternative Lösungen werden von der Behörde in Betracht gezogen."]}',
 '\"Berücksichtigen\" -> \"in Betracht ziehen\". Das FVG klingt formeller und ist typisch für Behördensprache.',
 '"Berücksichtigen" -> "in Betracht ziehen". The FVG sounds more formal and is typical of administrative language.',
 3, 12),

('grammar', 'c1', 'funktionsverbgefuege', 'transform', NULL,
 'Verb -> FVG (3)', 'Verb -> FVG (3)',
 'Formulieren Sie den Satz mit einem Funktionsverbgefüge um.', 'Rephrase the sentence using a Funktionsverbgefüge.',
 '{"instruction": "Ersetzen Sie das unterstrichene Verb durch ein FVG:", "original": "Der Sportler bewies seine Ausdauer eindrucksvoll."}',
 '{"correct": "Der Sportler stellte seine Ausdauer eindrucksvoll unter Beweis.", "accept_also": []}',
 '\"Beweisen\" -> \"unter Beweis stellen\". Beachten Sie: \"unter\", nicht \"zum\" oder \"in\".',
 '"Beweisen" -> "unter Beweis stellen". Note: "unter", not "zum" or "in".',
 3, 13),

('grammar', 'c1', 'funktionsverbgefuege', 'transform', NULL,
 'Verb -> FVG (4)', 'Verb -> FVG (4)',
 'Formulieren Sie den Satz mit einem Funktionsverbgefüge um.', 'Rephrase the sentence using a Funktionsverbgefüge.',
 '{"instruction": "Ersetzen Sie das unterstrichene Verb durch ein FVG:", "original": "Die Opposition beeinflusst die Gesetzgebung kaum."}',
 '{"correct": "Die Opposition nimmt auf die Gesetzgebung kaum Einfluss.", "accept_also": ["Die Opposition nimmt kaum Einfluss auf die Gesetzgebung."]}',
 '\"Beeinflussen\" -> \"Einfluss nehmen auf\" (+ Akkusativ). Das FVG erlaubt eine differenziertere Aussage (z.B. \"großen/keinen Einfluss nehmen\").',
 '"Beeinflussen" -> "Einfluss nehmen auf" (+ accusative). The FVG allows for more nuanced statements (e.g., "großen/keinen Einfluss nehmen").',
 3, 14);

-- Multiple choice: Which FVG fits this formal context? (2 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'funktionsverbgefuege', 'multiple_choice', NULL,
 'Passendes FVG (1)', 'Fitting FVG (1)',
 'Welches Funktionsverbgefüge passt in den formellen Kontext?', 'Which FVG fits this formal context?',
 '{"sentence": "Der Vorstand hat beschlossen, den Sachverhalt genauer ___ .", "options": ["in Augenschein zu nehmen", "unter die Lupe zu nehmen", "in Betracht zu ziehen", "zur Diskussion zu stellen"]}',
 '{"correct": 0}',
 '\"In Augenschein nehmen\" = persönlich prüfen, sich etwas genauer ansehen. Formeller als \"unter die Lupe nehmen\" (eher umgangssprachlich). \"In Betracht ziehen\" = erwägen, passt semantisch nicht.',
 '"In Augenschein nehmen" = to inspect personally. More formal than "unter die Lupe nehmen" (more colloquial). "In Betracht ziehen" = to consider, doesn''t fit semantically.',
 2, 15),

('grammar', 'c1', 'funktionsverbgefuege', 'multiple_choice', NULL,
 'Passendes FVG (2)', 'Fitting FVG (2)',
 'Welches Funktionsverbgefüge passt in den formellen Kontext?', 'Which FVG fits this formal context?',
 '{"sentence": "Die Ergebnisse der Studie müssen bei der Entscheidung ___ werden.", "options": ["in Betracht gezogen", "in Kauf genommen", "unter Beweis gestellt", "zum Ausdruck gebracht"]}',
 '{"correct": 0}',
 '\"In Betracht ziehen\" = berücksichtigen. Die Ergebnisse sollen berücksichtigt werden. \"In Kauf nehmen\" = akzeptieren (Negatives). \"Unter Beweis stellen\" = beweisen.',
 '"In Betracht ziehen" = to consider/take into account. The results should be considered. "In Kauf nehmen" = to accept (something negative). "Unter Beweis stellen" = to prove.',
 2, 16);


-- ============================================================
-- 5. KOMPLEXE SATZSTRUKTUREN (Verbstellung & Subordination) — 16 exercises
-- ============================================================

-- Sentence build: Combine with complex connectors (4 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'komplexe_satzstrukturen', 'sentence_build', NULL,
 'je...desto-Konstruktion', 'je...desto construction',
 'Verbinden Sie die beiden Sätze mit je...desto.', 'Combine the two sentences using je...desto.',
 '{"sentence_a": "Man übt viel.", "sentence_b": "Die Aussprache wird besser."}',
 '{"correct": "Je mehr man übt, desto besser wird die Aussprache.", "accept_also": ["Je mehr man übt, umso besser wird die Aussprache."]}',
 'Je + Komparativ + Nebensatz (Verb am Ende), desto/umso + Komparativ + Hauptsatz (Verb an 2. Stelle). Nach \"desto\" steht das Verb direkt nach dem Komparativ.',
 'Je + comparative + subordinate clause (verb at end), desto/umso + comparative + main clause (verb in 2nd position). After "desto" the verb follows directly after the comparative.',
 2, 1),

('grammar', 'c1', 'komplexe_satzstrukturen', 'sentence_build', NULL,
 'nicht nur...sondern auch', 'nicht nur...sondern auch',
 'Verbinden Sie die beiden Sätze mit nicht nur...sondern auch.', 'Combine the two sentences using nicht nur...sondern auch.',
 '{"sentence_a": "Die Firma spart Kosten.", "sentence_b": "Die Firma steigert die Qualität."}',
 '{"correct": "Die Firma spart nicht nur Kosten, sondern steigert auch die Qualität.", "accept_also": ["Nicht nur spart die Firma Kosten, sondern sie steigert auch die Qualität."]}',
 '\"Nicht nur\" steht vor dem ersten Element, \"sondern auch\" leitet den zweiten Teil ein. Bei gleichem Subjekt kann es weggelassen werden.',
 '"Nicht nur" precedes the first element, "sondern auch" introduces the second part. With the same subject, it can be omitted.',
 2, 2),

('grammar', 'c1', 'komplexe_satzstrukturen', 'sentence_build', NULL,
 'zwar...aber-Konstruktion', 'zwar...aber construction',
 'Verbinden Sie die beiden Sätze mit zwar...aber.', 'Combine the two sentences using zwar...aber.',
 '{"sentence_a": "Der Plan klingt überzeugend.", "sentence_b": "Die Umsetzung ist unrealistisch."}',
 '{"correct": "Der Plan klingt zwar überzeugend, aber die Umsetzung ist unrealistisch.", "accept_also": ["Zwar klingt der Plan überzeugend, aber die Umsetzung ist unrealistisch."]}',
 '\"Zwar\" steht im ersten Hauptsatz (Mittelfeld oder Vorfeld mit Inversion). \"Aber\" leitet den zweiten Hauptsatz ein.',
 '"Zwar" appears in the first main clause (middle field or front field with inversion). "Aber" introduces the second main clause.',
 2, 3),

('grammar', 'c1', 'komplexe_satzstrukturen', 'sentence_build', NULL,
 'weder...noch-Konstruktion', 'weder...noch construction',
 'Verbinden Sie die beiden Sätze mit weder...noch.', 'Combine the two sentences using weder...noch.',
 '{"sentence_a": "Er hat sich nicht entschuldigt.", "sentence_b": "Er hat keine Erklärung gegeben."}',
 '{"correct": "Er hat sich weder entschuldigt noch eine Erklärung gegeben.", "accept_also": ["Weder hat er sich entschuldigt, noch hat er eine Erklärung gegeben."]}',
 '\"Weder...noch\" verbindet zwei verneinte Aussagen. Die Negation \"nicht/kein\" entfällt, da \"weder...noch\" bereits negativ ist.',
 '"Weder...noch" connects two negated statements. The negation "nicht/kein" is dropped because "weder...noch" is already negative.',
 3, 4);

-- Fill_in: Correct word order in subordinate clauses (4 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'komplexe_satzstrukturen', 'fill_in', NULL,
 'Doppelter Infinitiv: Modalverb', 'Double infinitive: Modal verb',
 'Ergänzen Sie den Nebensatz mit der korrekten Wortstellung.', 'Complete the subordinate clause with the correct word order.',
 '{"sentence": "Ich weiß, dass er das Buch nicht ___.", "options": ["hat lesen können", "lesen gekonnt hat", "können lesen hat"]}',
 '{"correct": 0}',
 'Bei Modalverben im Perfekt im Nebensatz gilt die Ersatzinfinitivregel: Das finite Verb (hat) steht VOR den beiden Infinitiven. \"Hat lesen können\" statt \"lesen gekonnt hat\".',
 'With modal verbs in perfect tense in subordinate clauses, the substitute infinitive rule applies: the finite verb (hat) comes BEFORE the two infinitives. "Hat lesen können" instead of "lesen gekonnt hat".',
 3, 5),

('grammar', 'c1', 'komplexe_satzstrukturen', 'fill_in', NULL,
 'Verschachtelte Nebensätze', 'Nested subordinate clauses',
 'Ergänzen Sie den Satz mit der korrekten Wortstellung.', 'Complete the sentence with the correct word order.',
 '{"sentence": "Er sagte, dass er glaube, dass die Reform ___ .", "options": ["notwendig sei", "sei notwendig", "notwendig ist"]}',
 '{"correct": 0}',
 'In verschachtelten Nebensätzen steht das konjugierte Verb immer am Ende jedes Nebensatzes. Im innersten Nebensatz: \"die Reform notwendig sei\" (Konjunktiv I in indirekter Rede).',
 'In nested subordinate clauses, the conjugated verb always goes at the end of each subordinate clause. In the innermost clause: "die Reform notwendig sei" (Konjunktiv I in indirect speech).',
 3, 6),

('grammar', 'c1', 'komplexe_satzstrukturen', 'fill_in', NULL,
 'Doppelter Infinitiv: lassen', 'Double infinitive: lassen',
 'Ergänzen Sie den Nebensatz mit der korrekten Wortstellung.', 'Complete the subordinate clause with the correct word order.',
 '{"sentence": "Es ist bekannt, dass die Firma viele Stellen ___.", "options": ["hat streichen lassen", "streichen gelassen hat", "lassen streichen hat"]}',
 '{"correct": 0}',
 '\"Lassen\" bildet wie Modalverben den Ersatzinfinitiv: \"hat streichen lassen\" (nicht \"streichen gelassen hat\"). Das finite Verb steht im Nebensatz vor den Infinitiven.',
 '"Lassen" forms a substitute infinitive like modal verbs: "hat streichen lassen" (not "streichen gelassen hat"). The finite verb precedes the infinitives in the subordinate clause.',
 3, 7),

('grammar', 'c1', 'komplexe_satzstrukturen', 'fill_in', NULL,
 'Nebensatz mit Infinitivkonstruktion', 'Subordinate clause with infinitive construction',
 'Ergänzen Sie den Satz mit der korrekten Wortstellung.', 'Complete the sentence with the correct word order.',
 '{"sentence": "Sie behauptet, den Vertrag nicht ___ .", "options": ["unterschrieben zu haben", "zu haben unterschrieben", "haben unterschrieben zu"]}',
 '{"correct": 0}',
 'In Infinitivkonstruktionen mit Perfekt: Partizip II + \"zu haben\" (oder \"zu sein\"). \"Unterschrieben zu haben\" = behauptet, es in der Vergangenheit nicht getan zu haben.',
 'In infinitive constructions with perfect tense: past participle + "zu haben" (or "zu sein"). "Unterschrieben zu haben" = claims not to have done it in the past.',
 3, 8);

-- Multiple choice: Which sentence has correct word order? (4 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'komplexe_satzstrukturen', 'multiple_choice', NULL,
 'Korrekte Wortstellung (1)', 'Correct word order (1)',
 'Welcher Satz hat die korrekte Wortstellung?', 'Which sentence has the correct word order?',
 '{"sentence": "Wählen Sie den grammatisch korrekten Satz.", "options": ["Obwohl er den Bericht hätte früher abgeben sollen, hat niemand sich beschwert.", "Obwohl er den Bericht früher hätte abgeben sollen, hat sich niemand beschwert.", "Obwohl er den Bericht früher abgeben gesollt hätte, hat sich niemand beschwert.", "Obwohl er früher den Bericht abgeben hätte sollen, hat niemand beschwert sich."]}',
 '{"correct": 1}',
 'Doppelter Infinitiv im Nebensatz: \"hätte\" steht vor den Infinitiven. Im Hauptsatz: Reflexivpronomen \"sich\" steht nach dem finiten Verb.',
 'Double infinitive in subordinate clause: "hätte" precedes the infinitives. In the main clause: reflexive pronoun "sich" follows the finite verb.',
 3, 9),

('grammar', 'c1', 'komplexe_satzstrukturen', 'multiple_choice', NULL,
 'Korrekte Wortstellung (2)', 'Correct word order (2)',
 'Welcher Satz hat die korrekte Wortstellung?', 'Which sentence has the correct word order?',
 '{"sentence": "Wählen Sie den grammatisch korrekten Satz.", "options": ["Je länger die Verhandlungen dauern, desto schwieriger wird eine Einigung.", "Je die Verhandlungen länger dauern, desto eine Einigung schwieriger wird.", "Je länger dauern die Verhandlungen, desto schwieriger eine Einigung wird.", "Je länger die Verhandlungen dauern, desto wird schwieriger eine Einigung."]}',
 '{"correct": 0}',
 'Je + Komparativ + Nebensatz (Verb am Ende). Desto + Komparativ + Verb + Subjekt (Inversionsstellung im Hauptsatz).',
 'Je + comparative + subordinate clause (verb at end). Desto + comparative + verb + subject (inversion in main clause).',
 2, 10),

('grammar', 'c1', 'komplexe_satzstrukturen', 'multiple_choice', NULL,
 'Korrekte Wortstellung (3)', 'Correct word order (3)',
 'Welcher Satz hat die korrekte Wortstellung?', 'Which sentence has the correct word order?',
 '{"sentence": "Wählen Sie den grammatisch korrekten Satz.", "options": ["Nachdem die Ergebnisse vorgelegen hatten, wurde die Strategie angepasst.", "Nachdem die Ergebnisse hatten vorgelegen, wurde die Strategie angepasst.", "Nachdem vorgelegen hatten die Ergebnisse, wurde die Strategie angepasst.", "Nachdem die Ergebnisse vorgelegen gehabt haben, wurde angepasst die Strategie."]}',
 '{"correct": 0}',
 'Im Nebensatz mit \"nachdem\" steht das Hilfsverb (hatten) am Ende. \"Vorgelegen hatten\" — Plusquamperfekt, weil die Handlung VOR der anderen abgeschlossen war.',
 'In a subordinate clause with "nachdem", the auxiliary verb (hatten) goes at the end. "Vorgelegen hatten" — past perfect, because the action was completed BEFORE the other one.',
 2, 11),

('grammar', 'c1', 'komplexe_satzstrukturen', 'multiple_choice', NULL,
 'Korrekte Wortstellung (4)', 'Correct word order (4)',
 'Welcher Satz hat die korrekte Wortstellung?', 'Which sentence has the correct word order?',
 '{"sentence": "Wählen Sie den grammatisch korrekten Satz.", "options": ["Insofern die Daten verlässlich sind, als sie von unabhängigen Forschern stammen, können wir sie verwenden.", "Insofern als die Daten von unabhängigen Forschern stammen, sind sie verlässlich und wir können sie verwenden.", "Die Daten sind insofern verlässlich, als sie von unabhängigen Forschern stammen.", "Die Daten sind insofern, als von unabhängigen Forschern stammen, verlässlich."]}',
 '{"correct": 2}',
 '\"Insofern...als\" ist eine korrelative Konjunktion. \"Insofern\" steht im Hauptsatz, \"als\" leitet den Nebensatz ein (Verb am Ende). Korrekt: \"insofern verlässlich, als sie...stammen.\"',
 '"Insofern...als" is a correlative conjunction. "Insofern" appears in the main clause, "als" introduces the subordinate clause (verb at end). Correct: "insofern verlässlich, als sie...stammen."',
 3, 12);

-- Transform: Rewrite with different subordination structure (4 exercises)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('grammar', 'c1', 'komplexe_satzstrukturen', 'transform', NULL,
 'Hauptsatz -> Nebensatz', 'Main clause -> subordinate clause',
 'Formulieren Sie den Hauptsatz als Nebensatz um (verwenden Sie die angegebene Konjunktion).', 'Rephrase the main clause as a subordinate clause (use the given conjunction).',
 '{"instruction": "Verwenden Sie \"obwohl\":", "original": "Die Wirtschaft wächst. Trotzdem steigt die Arbeitslosigkeit."}',
 '{"correct": "Obwohl die Wirtschaft wächst, steigt die Arbeitslosigkeit.", "accept_also": ["Die Arbeitslosigkeit steigt, obwohl die Wirtschaft wächst."]}',
 '\"Trotzdem\" (Adverb, Hauptsatz) wird zu \"obwohl\" (Konjunktion, Nebensatz). Im Nebensatz steht das Verb am Ende: \"obwohl die Wirtschaft wächst\".',
 '"Trotzdem" (adverb, main clause) becomes "obwohl" (conjunction, subordinate clause). In the subordinate clause, the verb goes to the end: "obwohl die Wirtschaft wächst".',
 3, 13),

('grammar', 'c1', 'komplexe_satzstrukturen', 'transform', NULL,
 'Aktivsatz -> Passivsatz im Nebensatz', 'Active -> passive in subordinate clause',
 'Formulieren Sie den Satz ins Passiv um und behalten Sie die Nebensatzstruktur bei.', 'Rephrase into passive voice while maintaining the subordinate clause structure.',
 '{"instruction": "Formulieren Sie den dass-Satz im Passiv:", "original": "Er erwartet, dass das Team das Projekt bis Freitag abschließt."}',
 '{"correct": "Er erwartet, dass das Projekt bis Freitag abgeschlossen wird.", "accept_also": ["Er erwartet, dass das Projekt bis Freitag vom Team abgeschlossen wird."]}',
 'Passiv im Nebensatz: Das Akkusativobjekt (das Projekt) wird Subjekt. \"Abschließt\" -> \"abgeschlossen wird\". Das finite Verb \"wird\" steht am Ende des Nebensatzes.',
 'Passive in subordinate clause: The accusative object (das Projekt) becomes the subject. "Abschließt" -> "abgeschlossen wird". The finite verb "wird" goes to the end of the subordinate clause.',
 3, 14),

('grammar', 'c1', 'komplexe_satzstrukturen', 'transform', NULL,
 'Nebensatz -> Nominalisierung', 'Subordinate clause -> Nominalization',
 'Ersetzen Sie den Nebensatz durch eine Nominalisierung.', 'Replace the subordinate clause with a nominalization.',
 '{"instruction": "Ersetzen Sie den dass-Satz:", "original": "Die Tatsache, dass die Kosten gestiegen sind, beunruhigt den Vorstand."}',
 '{"correct": "Der Anstieg der Kosten beunruhigt den Vorstand.", "accept_also": ["Die Kostensteigerung beunruhigt den Vorstand.", "Der Kostenanstieg beunruhigt den Vorstand."]}',
 'Nebensätze lassen sich oft durch Nominalisierungen ersetzen: \"dass die Kosten gestiegen sind\" -> \"der Anstieg der Kosten\" oder \"die Kostensteigerung\". Das macht den Stil kompakter und formeller.',
 'Subordinate clauses can often be replaced by nominalizations: "dass die Kosten gestiegen sind" -> "der Anstieg der Kosten" or "die Kostensteigerung". This makes the style more compact and formal.',
 3, 15),

('grammar', 'c1', 'komplexe_satzstrukturen', 'transform', NULL,
 'Zwei Hauptsätze -> komplexer Satz', 'Two main clauses -> complex sentence',
 'Verbinden Sie die Sätze mit der angegebenen Konjunktion.', 'Combine the sentences using the given conjunction.',
 '{"instruction": "Verwenden Sie \"sowohl...als auch\":", "original": "Das Unternehmen investiert in Forschung. Das Unternehmen investiert in Weiterbildung."}',
 '{"correct": "Das Unternehmen investiert sowohl in Forschung als auch in Weiterbildung.", "accept_also": []}',
 '\"Sowohl...als auch\" verbindet zwei gleichwertige Elemente. Bei gleicher Satzstruktur werden die gemeinsamen Teile nur einmal genannt. Die Präposition \"in\" wird bei beiden Elementen wiederholt.',
 '"Sowohl...als auch" connects two equal elements. With the same sentence structure, shared parts are mentioned only once. The preposition "in" is repeated for both elements.',
 2, 16);
