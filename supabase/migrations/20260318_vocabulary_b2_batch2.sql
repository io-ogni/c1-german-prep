-- ============================================================
-- B2 Vocabulary Batch 2: 60 exercises across 4 topics
-- alltag_gesellschaft, arbeit_karriere,
-- medien_kommunikation, umwelt_natur
-- ============================================================

-- ============================================================
-- 1. ALLTAG & GESELLSCHAFT — 15 exercises (sort 25-39)
-- ============================================================

-- definition_match (4 exercises, sort 25-28)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'definition_match', NULL,
 'der Generationenkonflikt', 'generational conflict',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "der Generationenkonflikt", "options": ["Spannungen zwischen jüngeren und älteren Bevölkerungsgruppen", "Streit innerhalb einer Familie über Erbschaft", "Wettbewerb zwischen Schulklassen verschiedener Jahrgänge", "Unterschiede in der Mediennutzung"]}',
 '{"correct": 0}',
 'Ein Generationenkonflikt beschreibt gesellschaftliche Spannungen zwischen Altersgruppen, z. B. bei Themen wie Rente, Klimaschutz oder Digitalisierung.',
 'A generational conflict describes societal tensions between age groups, e.g. regarding pensions, climate protection or digitalisation.',
 2, 25),

('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'definition_match', NULL,
 'die Inklusion', 'inclusion',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Inklusion", "options": ["Einbeziehung aller Menschen in die Gesellschaft unabhängig von Einschränkungen", "Abgrenzung bestimmter Gruppen zum Schutz ihrer Interessen", "Förderung besonders begabter Schüler", "Zusammenschluss mehrerer Vereine"]}',
 '{"correct": 0}',
 'Inklusion bedeutet, dass alle Menschen gleichberechtigt an der Gesellschaft teilhaben können -- unabhängig von Behinderung, Herkunft oder anderen Merkmalen.',
 'Inclusion means that all people can participate equally in society -- regardless of disability, origin or other characteristics.',
 2, 26),

('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'definition_match', NULL,
 'das Ehrenamt', 'voluntary work',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "das Ehrenamt", "options": ["freiwillige unbezahlte Tätigkeit zum Wohl der Gemeinschaft", "eine besonders angesehene berufliche Position", "ein staatlich gefördertes Ausbildungsprogramm", "eine Auszeichnung für langjährige Mitarbeiter"]}',
 '{"correct": 0}',
 'Ein Ehrenamt ist eine freiwillige Tätigkeit, für die man kein Gehalt bekommt. In Deutschland engagieren sich Millionen Menschen ehrenamtlich.',
 'Voluntary work is an unpaid activity done for the benefit of the community. Millions of people in Germany do voluntary work.',
 2, 27),

('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'definition_match', NULL,
 'die Zivilcourage', 'civil courage',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Zivilcourage", "options": ["Mut, sich öffentlich für Gerechtigkeit einzusetzen", "höfliches Verhalten im öffentlichen Raum", "Pflicht zur Teilnahme an Wahlen", "Bereitschaft, Kompromisse einzugehen"]}',
 '{"correct": 0}',
 'Zivilcourage bedeutet, dass man den Mut hat, bei Unrecht einzugreifen -- auch wenn es unangenehm oder riskant sein kann.',
 'Civil courage means having the bravery to intervene when witnessing injustice -- even when it may be uncomfortable or risky.',
 2, 28);

-- fill_in (4 exercises, sort 29-32)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'fill_in', NULL,
 'Gesellschaftlicher Zusammenhalt', 'Social cohesion',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Der ___ in der Nachbarschaft hat sich durch gemeinsame Feste deutlich verbessert.", "options": ["Zusammenhalt", "Widerstand", "Wettbewerb", "Rückgang"]}',
 '{"correct": 0}',
 'Zusammenhalt beschreibt das Gefühl der Verbundenheit und gegenseitigen Unterstützung in einer Gemeinschaft.',
 'Zusammenhalt (cohesion) describes the feeling of togetherness and mutual support within a community.',
 2, 29),

('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'fill_in', NULL,
 'Bürgerschaftliches Engagement', 'Civic engagement',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Durch ihr ___ im Sportverein trägt sie aktiv zum Gemeinwohl bei.", "options": ["Engagement", "Einkommen", "Ergebnis", "Erlebnis"]}',
 '{"correct": 0}',
 'Engagement bedeutet freiwilligen Einsatz für eine Sache. Man engagiert sich für etwas.',
 'Engagement means voluntary commitment to a cause. You engage yourself for something.',
 2, 30),

('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'fill_in', NULL,
 'Zuwanderung und Integration', 'Immigration and integration',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die ___ hat die kulturelle Vielfalt in deutschen Städten stark verändert.", "options": ["Zuwanderung", "Abschiebung", "Auswanderung", "Umsiedlung"]}',
 '{"correct": 0}',
 'Zuwanderung bezeichnet die dauerhafte Einwanderung von Menschen in ein anderes Land. Das Gegenteil ist Abwanderung oder Auswanderung.',
 'Zuwanderung (immigration) refers to people permanently moving to another country. The opposite is Abwanderung or Auswanderung (emigration).',
 2, 31),

('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'fill_in', NULL,
 'Überalterung der Gesellschaft', 'Ageing society',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die ___ der Gesellschaft stellt das Rentensystem vor große Herausforderungen.", "options": ["Überalterung", "Überbevölkerung", "Überarbeitung", "Überforderung"]}',
 '{"correct": 0}',
 'Überalterung bedeutet, dass der Anteil älterer Menschen in der Bevölkerung ständig wächst, während weniger Kinder geboren werden.',
 'Überalterung (ageing) means the proportion of older people in the population keeps growing while fewer children are born.',
 2, 32);

-- synonym_match (2 exercises, sort 33-34)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'synonym_match', NULL,
 'Synonyme: Gesellschaft und Migration', 'Synonyms: Society and migration',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Zuwanderung", "synonym": "die Immigration"}, {"word": "der Zusammenhalt", "synonym": "die Solidarität"}, {"word": "die Teilhabe", "synonym": "die Mitbestimmung"}, {"word": "die Fürsorge", "synonym": "die Betreuung"}]}',
 '{"correct": []}',
 'Diese Wörter werden in gesellschaftlichen Diskussionen häufig synonym verwendet, auch wenn es feine Bedeutungsunterschiede geben kann.',
 'These words are frequently used synonymously in social discussions, even though there may be subtle differences in meaning.',
 2, 33),

('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'synonym_match', NULL,
 'Synonyme: Soziale Werte', 'Synonyms: Social values',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "ehrenamtlich", "synonym": "freiwillig"}, {"word": "ausgegrenzt", "synonym": "isoliert"}, {"word": "gleichberechtigt", "synonym": "gleichgestellt"}, {"word": "vielfältig", "synonym": "divers"}]}',
 '{"correct": []}',
 'Ehrenamtlich und freiwillig betonen beide den unbezahlten, freien Einsatz. Divers ist ein modernerer Begriff für vielfältig.',
 'Ehrenamtlich and freiwillig both emphasise unpaid, voluntary commitment. Divers is a more modern term for vielfältig.',
 2, 34);

-- word_family (2 exercises, sort 35-36)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'word_family', NULL,
 'Wortfamilie: engagieren', 'Word family: engage',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "engagieren", "target_type": "-> Nomen (das _____)"}',
 '{"correct": "Engagement", "accept_also": ["engagement"]}',
 'Das Verb engagieren wird zum Nomen das Engagement. Achtung: Die Schreibweise folgt dem französischen Ursprung.',
 'The verb engagieren becomes the noun das Engagement. Note: the spelling follows the French origin.',
 2, 35),

('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'word_family', NULL,
 'Wortfamilie: integrieren', 'Word family: integrate',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "integrieren", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Integration", "accept_also": ["integration"]}',
 'Das Verb integrieren wird zum Nomen die Integration. Integration ist ein zentrales Thema in der deutschen Gesellschaftspolitik.',
 'The verb integrieren becomes the noun die Integration. Integration is a central topic in German social policy.',
 2, 36);

-- fill_in harder (3 exercises, sort 37-39)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'fill_in', NULL,
 'Kollokation: Beitrag leisten', 'Collocation: make a contribution',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Jeder kann einen gesellschaftlichen ___ leisten.", "options": ["Beitrag", "Anteil", "Nutzen", "Vorteil"]}',
 '{"correct": 0}',
 'Die feste Wendung lautet: einen Beitrag leisten. Man leistet einen Beitrag zu etwas.',
 'The fixed expression is: einen Beitrag leisten (to make a contribution). You contribute to something.',
 3, 37),

('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'fill_in', NULL,
 'Kollokation: Ungleichheit abbauen', 'Collocation: reduce inequality',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die Regierung will soziale ___ abbauen.", "options": ["Ungleichheit", "Verschiedenheit", "Ungerechtigkeit", "Unterscheidung"]}',
 '{"correct": 0}',
 'Soziale Ungleichheit abbauen ist eine gängige Kollokation. Ungerechtigkeit klingt ähnlich, wird aber eher mit bekämpfen kombiniert.',
 'Soziale Ungleichheit abbauen (reduce social inequality) is a common collocation. Ungerechtigkeit sounds similar but is more commonly combined with bekämpfen.',
 3, 38),

('vocabulary', 'b2_refresh', 'alltag_gesellschaft', 'fill_in', NULL,
 'Kollokation: Zusammenhalt fördern', 'Collocation: promote cohesion',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Mit dem Stadtteilfest will man den ___ fördern.", "options": ["Zusammenhalt", "Zusammenschluss", "Zusammenhang", "Zusammenstoß"]}',
 '{"correct": 0}',
 'Den Zusammenhalt fördern ist die richtige Kollokation. Zusammenschluss bedeutet Fusion, Zusammenhang bedeutet Kontext, Zusammenstoß bedeutet Kollision.',
 'Den Zusammenhalt fördern (promote cohesion) is the correct collocation. Zusammenschluss means merger, Zusammenhang means context, Zusammenstoß means collision.',
 3, 39);

-- ============================================================
-- 2. ARBEIT & KARRIERE — 15 exercises (sort 25-39)
-- ============================================================

-- definition_match (4 exercises, sort 25-28)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'arbeit_karriere', 'definition_match', NULL,
 'das Homeoffice', 'home office',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "das Homeoffice", "options": ["Arbeitsplatz in der eigenen Wohnung", "ein privates Büro, das man mieten kann", "eine Abteilung für Wohnungsbau", "ein Raum für Videokonferenzen im Unternehmen"]}',
 '{"correct": 0}',
 'Homeoffice bezeichnet das Arbeiten von zu Hause aus. Seit der Pandemie ist Homeoffice in Deutschland weit verbreitet.',
 'Homeoffice refers to working from home. Since the pandemic, working from home has become widespread in Germany.',
 2, 25),

('vocabulary', 'b2_refresh', 'arbeit_karriere', 'definition_match', NULL,
 'die Elternzeit', 'parental leave',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Elternzeit", "options": ["gesetzlich garantierte Auszeit nach der Geburt eines Kindes", "Urlaub, den Großeltern mit Enkeln verbringen", "Elternabende in der Schule", "ein Programm zur Weiterbildung von Eltern"]}',
 '{"correct": 0}',
 'In Deutschland haben beide Elternteile Anspruch auf bis zu drei Jahre Elternzeit pro Kind.',
 'In Germany, both parents are entitled to up to three years of parental leave per child.',
 2, 26),

('vocabulary', 'b2_refresh', 'arbeit_karriere', 'definition_match', NULL,
 'der Fachkräftemangel', 'skills shortage',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "der Fachkräftemangel", "options": ["fehlendes qualifiziertes Personal in bestimmten Branchen", "Kürzung von Ausbildungsplätzen durch den Staat", "mangelnde Motivation bei Arbeitnehmern", "schlechte Bezahlung von Facharbeitern"]}',
 '{"correct": 0}',
 'Der Fachkräftemangel ist eines der größten wirtschaftlichen Probleme Deutschlands, besonders in der IT, im Handwerk und in der Pflege.',
 'The skills shortage is one of Germany''s biggest economic problems, especially in IT, trades and healthcare.',
 2, 27),

('vocabulary', 'b2_refresh', 'arbeit_karriere', 'definition_match', NULL,
 'die Gehaltsverhandlung', 'salary negotiation',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Gehaltsverhandlung", "options": ["Gespräch über die Höhe des Arbeitsentgelts", "Vergleich der Gehälter verschiedener Branchen", "gesetzliche Regelung des Mindestlohns", "automatische jährliche Gehaltserhöhung"]}',
 '{"correct": 0}',
 'Eine Gehaltsverhandlung ist ein Gespräch zwischen Arbeitnehmer und Arbeitgeber über die Bezahlung. Man führt eine Gehaltsverhandlung.',
 'A salary negotiation is a conversation between employee and employer about pay. You conduct (führen) a salary negotiation.',
 2, 28);

-- fill_in (4 exercises, sort 29-32)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'arbeit_karriere', 'fill_in', NULL,
 'Quereinsteiger im Beruf', 'Career changers',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Als ___ bringt sie frische Perspektiven aus einer anderen Branche mit.", "options": ["Quereinsteigerin", "Praktikantin", "Auszubildende", "Berufsanfaengerin"]}',
 '{"correct": 0}',
 'Ein Quereinsteiger ist jemand, der ohne klassische Ausbildung in einem neuen Berufsfeld arbeitet. Die weibliche Form ist Quereinsteigerin.',
 'A Quereinsteiger is someone who works in a new field without traditional training. The feminine form is Quereinsteigerin.',
 2, 29),

('vocabulary', 'b2_refresh', 'arbeit_karriere', 'fill_in', NULL,
 'Burnout am Arbeitsplatz', 'Burnout at work',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Dauerhafter Stress kann zu einem ___ führen.", "options": ["Burnout", "Ausfall", "Rückschlag", "Stillstand"]}',
 '{"correct": 0}',
 'Burnout ist ein Zustand emotionaler und körperlicher Erschöpfung durch chronische Überlastung am Arbeitsplatz.',
 'Burnout is a state of emotional and physical exhaustion caused by chronic overwork.',
 2, 30),

('vocabulary', 'b2_refresh', 'arbeit_karriere', 'fill_in', NULL,
 'Teilzeitarbeit', 'Part-time work',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Viele Eltern entscheiden sich für ___, um mehr Zeit für die Familie zu haben.", "options": ["Teilzeitarbeit", "Schichtarbeit", "Leiharbeit", "Schwarzarbeit"]}',
 '{"correct": 0}',
 'Teilzeitarbeit bedeutet, weniger als die reguläre Wochenarbeitszeit zu arbeiten, typischerweise 20-30 Stunden pro Woche.',
 'Part-time work means working fewer than the regular weekly hours, typically 20-30 hours per week.',
 2, 31),

('vocabulary', 'b2_refresh', 'arbeit_karriere', 'fill_in', NULL,
 'Tägliches Pendeln', 'Daily commuting',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Er muss täglich über eine Stunde zur Arbeit ___.", "options": ["pendeln", "wandern", "reisen", "umziehen"]}',
 '{"correct": 0}',
 'Pendeln beschreibt die regelmäßige Fahrt zwischen Wohnort und Arbeitsplatz. Eine Person, die pendelt, ist ein Pendler.',
 'Pendeln describes the regular journey between home and workplace. A person who commutes is a Pendler.',
 2, 32);

-- synonym_match (2 exercises, sort 33-34)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'arbeit_karriere', 'synonym_match', NULL,
 'Synonyme: Berufsleben', 'Synonyms: Working life',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "kündigen", "synonym": "das Arbeitsverhältnis beenden"}, {"word": "einstellen", "synonym": "anwerben"}, {"word": "sich bewerben", "synonym": "eine Bewerbung einreichen"}, {"word": "pendeln", "synonym": "zur Arbeit fahren"}]}',
 '{"correct": []}',
 'Im Berufsleben gibt es viele formelle Ausdrücke: kündigen ist formeller als aufhören, und einstellen ist formeller als einen Job geben.',
 'In working life there are many formal expressions: kündigen is more formal than aufhören, and einstellen is more formal than einen Job geben.',
 2, 33),

('vocabulary', 'b2_refresh', 'arbeit_karriere', 'synonym_match', NULL,
 'Synonyme: Arbeitswelt', 'Synonyms: World of work',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Überstunden", "synonym": "die Mehrarbeit"}, {"word": "der Quereinsteiger", "synonym": "der Branchenwechsler"}, {"word": "befristet", "synonym": "zeitlich begrenzt"}, {"word": "eigenverantwortlich", "synonym": "selbstständig"}]}',
 '{"correct": []}',
 'Überstunden und Mehrarbeit sind in Arbeitsverträgen austauschbar. Befristet bedeutet, dass ein Vertrag ein festes Enddatum hat.',
 'Überstunden and Mehrarbeit are interchangeable in employment contracts. Befristet means a contract has a fixed end date.',
 2, 34);

-- word_family (2 exercises, sort 35-36)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'arbeit_karriere', 'word_family', NULL,
 'Wortfamilie: qualifizieren', 'Word family: qualify',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "qualifizieren", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Qualifikation", "accept_also": ["qualifikation"]}',
 'Das Verb qualifizieren wird zum Nomen die Qualifikation. Man spricht von beruflichen Qualifikationen oder Zusatzqualifikationen.',
 'The verb qualifizieren becomes the noun die Qualifikation. One speaks of professional qualifications or additional qualifications.',
 2, 35),

('vocabulary', 'b2_refresh', 'arbeit_karriere', 'word_family', NULL,
 'Wortfamilie: beschäftigen', 'Word family: employ',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "beschäftigen", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Beschäftigung", "accept_also": ["beschäftigung"]}',
 'Das Verb beschäftigen wird zum Nomen die Beschäftigung. Man kann in einem Beschäftigungsverhältnis stehen.',
 'The verb beschäftigen becomes the noun die Beschäftigung. You can be in an employment relationship (Beschäftigungsverhältnis).',
 2, 36);

-- fill_in harder (3 exercises, sort 37-39)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'arbeit_karriere', 'fill_in', NULL,
 'Kollokation: lückenloser Lebenslauf', 'Collocation: complete CV',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Personalverantwortliche erwarten einen ___ Lebenslauf.", "options": ["lückenlosen", "vollständigen", "perfekten", "fehlerfreien"]}',
 '{"correct": 0}',
 'Die Kollokation lautet: ein lückenloser Lebenslauf. Das bedeutet, dass es keine unerklärten Zeiträume im beruflichen Werdegang gibt.',
 'The collocation is: ein lückenloser Lebenslauf (a CV without gaps). This means there are no unexplained time periods in your career history.',
 3, 37),

('vocabulary', 'b2_refresh', 'arbeit_karriere', 'fill_in', NULL,
 'Kollokation: flexible Arbeitszeiten', 'Collocation: flexible working hours',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Immer mehr Unternehmen bieten flexible ___ an.", "options": ["Arbeitszeiten", "Arbeitstage", "Arbeitsplätze", "Arbeitsmittel"]}',
 '{"correct": 0}',
 'Flexible Arbeitszeiten vereinbaren ist eine typische Kollokation. Gleitzeit ist ein Synonym für flexible Arbeitszeiten.',
 'Flexible Arbeitszeiten vereinbaren (agree on flexible working hours) is a typical collocation. Gleitzeit is a synonym for flexible working hours.',
 3, 38),

('vocabulary', 'b2_refresh', 'arbeit_karriere', 'fill_in', NULL,
 'Kollokation: Aufstiegschancen nutzen', 'Collocation: use career opportunities',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "In diesem Unternehmen kann man berufliche ___ nutzen.", "options": ["Aufstiegschancen", "Aussichten", "Möglichkeiten", "Gelegenheiten"]}',
 '{"correct": 0}',
 'Berufliche Aufstiegschancen nutzen ist die präziseste Kollokation. Aufstieg bedeutet hier den beruflichen Aufstieg in eine höhere Position.',
 'Berufliche Aufstiegschancen nutzen (use career advancement opportunities) is the most precise collocation. Aufstieg here means career advancement.',
 3, 39);

-- ============================================================
-- 3. MEDIEN & KOMMUNIKATION — 15 exercises (sort 21-35)
-- ============================================================

-- definition_match (4 exercises, sort 21-24)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'medien_kommunikation', 'definition_match', NULL,
 'die Desinformation', 'disinformation',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Desinformation", "options": ["absichtlich verbreitete Falschinformation", "fehlende Information über ein Thema", "veraltete Nachrichten", "ungenaue Übersetzung eines Textes"]}',
 '{"correct": 0}',
 'Desinformation unterscheidet sich von Fehlinformation: Bei Desinformation werden falsche Informationen bewusst und absichtlich verbreitet.',
 'Disinformation differs from misinformation: with disinformation, false information is spread deliberately and intentionally.',
 2, 21),

('vocabulary', 'b2_refresh', 'medien_kommunikation', 'definition_match', NULL,
 'der Algorithmus', 'algorithm',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "der Algorithmus", "options": ["automatisierte Rechenvorschrift zur Datenverarbeitung", "ein bestimmter Programmierstil", "eine Methode zur Verschlüsselung von Daten", "ein soziales Netzwerk im Internet"]}',
 '{"correct": 0}',
 'Ein Algorithmus ist eine Abfolge von Anweisungen, die ein Computer ausführt. Algorithmen bestimmen z. B., welche Inhalte in sozialen Medien angezeigt werden.',
 'An algorithm is a sequence of instructions executed by a computer. Algorithms determine, for example, which content is displayed on social media.',
 2, 22),

('vocabulary', 'b2_refresh', 'medien_kommunikation', 'definition_match', NULL,
 'die Filterblase', 'filter bubble',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Filterblase", "options": ["einseitige Informationsauswahl durch personalisierte Algorithmen", "technischer Schutz vor Spam-Nachrichten", "ein spezieller Suchfilter für Nachrichten", "eine Methode zur Faktenprüfung"]}',
 '{"correct": 0}',
 'In einer Filterblase sieht man nur noch Inhalte, die die eigene Meinung bestätigen, weil Algorithmen personalisierte Ergebnisse liefern.',
 'In a filter bubble you only see content that confirms your own opinion, because algorithms deliver personalised results.',
 2, 23),

('vocabulary', 'b2_refresh', 'medien_kommunikation', 'definition_match', NULL,
 'der Datenschutz', 'data protection',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "der Datenschutz", "options": ["Schutz persönlicher Daten vor Missbrauch", "Sicherung von Computerdaten gegen Verlust", "Verbot der Nutzung von sozialen Medien", "Verschlüsselung von E-Mails"]}',
 '{"correct": 0}',
 'Datenschutz schützt die Privatsphäre von Personen. In der EU regelt die DSGVO (Datenschutz-Grundverordnung) den Umgang mit persönlichen Daten.',
 'Data protection protects individuals'' privacy. In the EU, the GDPR (DSGVO) regulates the handling of personal data.',
 2, 24);

-- fill_in (4 exercises, sort 25-28)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'medien_kommunikation', 'fill_in', NULL,
 'Quellenprüfung', 'Source verification',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Vor dem Teilen einer Nachricht sollte man immer eine ___ durchführen.", "options": ["Quellenprüfung", "Rechtsprüfung", "Sprachprüfung", "Leistungsprüfung"]}',
 '{"correct": 0}',
 'Eine Quellenprüfung bedeutet, die Herkunft und Zuverlässigkeit einer Information zu überprüfen, bevor man sie weiterverbreitet.',
 'Source verification means checking the origin and reliability of information before sharing it further.',
 2, 25),

('vocabulary', 'b2_refresh', 'medien_kommunikation', 'fill_in', NULL,
 'Einfluss von Influencern', 'Influence of influencers',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Viele ___ verdienen ihr Geld mit Produktwerbung in sozialen Medien.", "options": ["Influencer", "Journalisten", "Redakteure", "Moderatoren"]}',
 '{"correct": 0}',
 'Influencer sind Personen, die in sozialen Medien viele Follower haben und deren Meinungen und Kaufentscheidungen beeinflussen.',
 'Influencers are people with many followers on social media who influence their opinions and purchasing decisions.',
 2, 26),

('vocabulary', 'b2_refresh', 'medien_kommunikation', 'fill_in', NULL,
 'Verschwörungstheorien', 'Conspiracy theories',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "___ verbreiten sich besonders schnell über soziale Netzwerke.", "options": ["Verschwörungstheorien", "Wettervorhersagen", "Börsenberichte", "Stellenanzeigen"]}',
 '{"correct": 0}',
 'Verschwörungstheorien sind unbelegte Erklärungen, die hinter Ereignissen geheime Pläne vermuten. Sie verbreiten sich besonders in Krisenzeiten.',
 'Conspiracy theories are unsubstantiated explanations that assume secret plans behind events. They spread especially during times of crisis.',
 2, 27),

('vocabulary', 'b2_refresh', 'medien_kommunikation', 'fill_in', NULL,
 'Meinungsfreiheit', 'Freedom of expression',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die ___ ist ein Grundrecht, hat aber auch Grenzen.", "options": ["Meinungsfreiheit", "Redefreiheit", "Pressefreiheit", "Bewegungsfreiheit"]}',
 '{"correct": 0}',
 'Die Meinungsfreiheit ist in Artikel 5 des deutschen Grundgesetzes verankert. Sie endet dort, wo andere Rechte verletzt werden.',
 'Freedom of expression is enshrined in Article 5 of the German Basic Law. It ends where other rights are violated.',
 2, 28);

-- synonym_match (2 exercises, sort 29-30)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'medien_kommunikation', 'synonym_match', NULL,
 'Synonyme: Nachrichtenmedien', 'Synonyms: News media',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Falschmeldung", "synonym": "die Fake News"}, {"word": "verbreiten", "synonym": "in Umlauf bringen"}, {"word": "die Quelle", "synonym": "der Ursprung"}, {"word": "manipulieren", "synonym": "beeinflussen"}]}',
 '{"correct": []}',
 'Falschmeldung ist der deutsche Begriff für Fake News. Verbreiten und in Umlauf bringen werden im Medienkontext häufig synonym verwendet.',
 'Falschmeldung is the German term for fake news. Verbreiten and in Umlauf bringen are frequently used synonymously in a media context.',
 2, 29),

('vocabulary', 'b2_refresh', 'medien_kommunikation', 'synonym_match', NULL,
 'Synonyme: Digitale Welt', 'Synonyms: Digital world',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Privatsphäre", "synonym": "der persönliche Bereich"}, {"word": "die Überwachung", "synonym": "die Kontrolle"}, {"word": "anonym", "synonym": "ohne Namensnennung"}, {"word": "viral", "synonym": "sich rasant verbreitend"}]}',
 '{"correct": []}',
 'Anonym bedeutet wörtlich ohne Namen. Viral kommt aus der Medizin -- ein viraler Inhalt verbreitet sich wie ein Virus.',
 'Anonym literally means without a name. Viral comes from medicine -- viral content spreads like a virus.',
 2, 30);

-- word_family (2 exercises, sort 31-32)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'medien_kommunikation', 'word_family', NULL,
 'Wortfamilie: veröffentlichen', 'Word family: publish',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "veröffentlichen", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Veröffentlichung", "accept_also": ["veröffentlichung"]}',
 'Das Verb veröffentlichen wird zum Nomen die Veröffentlichung. Man spricht von der Veröffentlichung eines Artikels oder Buches.',
 'The verb veröffentlichen becomes the noun die Veröffentlichung. One speaks of the publication of an article or book.',
 2, 31),

('vocabulary', 'b2_refresh', 'medien_kommunikation', 'word_family', NULL,
 'Wortfamilie: recherchieren', 'Word family: research',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "recherchieren", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Recherche", "accept_also": ["recherche"]}',
 'Das Verb recherchieren wird zum Nomen die Recherche. Journalisten führen Recherchen durch, bevor sie einen Artikel schreiben.',
 'The verb recherchieren becomes the noun die Recherche. Journalists conduct research before writing an article.',
 2, 32);

-- fill_in harder (3 exercises, sort 33-35)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'medien_kommunikation', 'fill_in', NULL,
 'Kollokation: gezielt verbreiten', 'Collocation: spread deliberately',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Fake News werden häufig ___ verbreitet, um die öffentliche Meinung zu beeinflussen.", "options": ["gezielt", "zufällig", "langsam", "heimlich"]}',
 '{"correct": 0}',
 'Gezielt verbreiten bedeutet, dass Falschinformationen absichtlich und mit einem bestimmten Ziel gestreut werden.',
 'Gezielt verbreiten means that disinformation is spread intentionally and with a specific goal.',
 3, 33),

('vocabulary', 'b2_refresh', 'medien_kommunikation', 'fill_in', NULL,
 'Kollokation: Privatsphäre schützen', 'Collocation: protect privacy',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Jeder hat das Recht, seine ___ im Internet zu schützen.", "options": ["Privatsphäre", "Meinung", "Identität", "Freiheit"]}',
 '{"correct": 0}',
 'Die Privatsphäre schützen ist eine wichtige Kollokation im Kontext von Datenschutz und digitalen Rechten.',
 'Die Privatsphäre schützen (protect privacy) is an important collocation in the context of data protection and digital rights.',
 3, 34),

('vocabulary', 'b2_refresh', 'medien_kommunikation', 'fill_in', NULL,
 'Kollokation: kritisch hinterfragen', 'Collocation: question critically',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Medienkompetenz bedeutet, Quellen kritisch zu ___.", "options": ["hinterfragen", "beantworten", "besprechen", "beschreiben"]}',
 '{"correct": 0}',
 'Kritisch hinterfragen ist ein fester Ausdruck. Hinterfragen ist stärker als fragen -- es bedeutet, den Wahrheitsgehalt zu prüfen.',
 'Kritisch hinterfragen is a fixed expression. Hinterfragen is stronger than fragen -- it means examining the truthfulness.',
 3, 35);

-- ============================================================
-- 4. UMWELT & NATUR — 15 exercises (sort 21-35)
-- ============================================================

-- definition_match (4 exercises, sort 21-24)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'umwelt_natur', 'definition_match', NULL,
 'die Kreislaufwirtschaft', 'circular economy',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Kreislaufwirtschaft", "options": ["Wirtschaftssystem, das Abfall minimiert und Rohstoffe wiederverwendet", "ein Wirtschaftsmodell mit jährlich wiederkehrenden Zyklen", "eine Form der Planwirtschaft", "Handel zwischen benachbarten Ländern"]}',
 '{"correct": 0}',
 'In einer Kreislaufwirtschaft werden Produkte so gestaltet, dass ihre Materialien am Ende der Nutzung wiederverwertet werden können.',
 'In a circular economy, products are designed so that their materials can be recycled at the end of their use.',
 2, 21),

('vocabulary', 'b2_refresh', 'umwelt_natur', 'definition_match', NULL,
 'der CO2-Fußabdruck', 'carbon footprint',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "der CO2-Fußabdruck", "options": ["Menge der verursachten Treibhausgasemissionen", "die Größe eines ökologischen Schutzgebiets", "ein Maß für die Luftqualität in Städten", "der Energieverbrauch eines einzelnen Haushalts"]}',
 '{"correct": 0}',
 'Der CO2-Fußabdruck misst, wie viel Kohlendioxid eine Person, ein Unternehmen oder ein Produkt verursacht.',
 'The carbon footprint measures how much carbon dioxide a person, company or product causes.',
 2, 22),

('vocabulary', 'b2_refresh', 'umwelt_natur', 'definition_match', NULL,
 'die Energiewende', 'energy transition',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "die Energiewende", "options": ["Umstellung von fossilen auf erneuerbare Energiequellen", "Senkung des Strompreises für Verbraucher", "Privatisierung der Energieversorgung", "Bau neuer Atomkraftwerke"]}',
 '{"correct": 0}',
 'Die Energiewende ist ein zentrales politisches Projekt in Deutschland: der Umstieg von Kohle, Öl und Gas auf Wind, Sonne und andere erneuerbare Energien.',
 'The Energiewende is a central political project in Germany: the transition from coal, oil and gas to wind, solar and other renewable energies.',
 2, 23),

('vocabulary', 'b2_refresh', 'umwelt_natur', 'definition_match', NULL,
 'das Artensterben', 'species extinction',
 'Wählen Sie die richtige Bedeutung des Wortes.', 'Choose the correct meaning of the word.',
 '{"word": "das Artensterben", "options": ["zunehmender Verlust von Tier- und Pflanzenarten", "natürlicher Kreislauf von Werden und Vergehen", "Verbot der Jagd auf bedrohte Tiere", "Rückgang der Bevölkerung in ländlichen Gebieten"]}',
 '{"correct": 0}',
 'Das Artensterben beschreibt das Verschwinden von Tier- und Pflanzenarten, oft durch Zerstörung von Lebensräumen und Klimawandel.',
 'Species extinction describes the disappearance of animal and plant species, often due to habitat destruction and climate change.',
 2, 24);

-- fill_in (4 exercises, sort 25-28)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'umwelt_natur', 'fill_in', NULL,
 'Mülltrennung im Alltag', 'Waste separation in daily life',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "In Deutschland ist die ___ seit vielen Jahren Pflicht.", "options": ["Mülltrennung", "Müllverbrennung", "Müllabfuhr", "Müllvermeidung"]}',
 '{"correct": 0}',
 'Mülltrennung bedeutet, verschiedene Abfallarten getrennt zu sammeln: Papier, Plastik, Glas, Biomüll und Restmüll.',
 'Mülltrennung means collecting different types of waste separately: paper, plastic, glass, organic waste and residual waste.',
 2, 25),

('vocabulary', 'b2_refresh', 'umwelt_natur', 'fill_in', NULL,
 'Klimaneutralität als Ziel', 'Climate neutrality as a goal',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Deutschland will bis 2045 ___ erreichen.", "options": ["Klimaneutralität", "Klimaschutz", "Klimaanpassung", "Klimawandel"]}',
 '{"correct": 0}',
 'Klimaneutralität bedeutet, dass nicht mehr Treibhausgase ausgestoßen werden, als die Natur aufnehmen kann.',
 'Climate neutrality means that no more greenhouse gases are emitted than nature can absorb.',
 2, 26),

('vocabulary', 'b2_refresh', 'umwelt_natur', 'fill_in', NULL,
 'Bewusstes Konsumverhalten', 'Conscious consumer behaviour',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Ein nachhaltiges ___ kann die Umweltbelastung deutlich reduzieren.", "options": ["Konsumverhalten", "Kauferlebnis", "Warenangebot", "Preisbewusstsein"]}',
 '{"correct": 0}',
 'Konsumverhalten beschreibt, wie und was Menschen kaufen und verbrauchen. Nachhaltiges Konsumverhalten bedeutet bewusster und weniger zu konsumieren.',
 'Consumer behaviour describes how and what people buy and consume. Sustainable consumer behaviour means consuming more consciously and less.',
 2, 27),

('vocabulary', 'b2_refresh', 'umwelt_natur', 'fill_in', NULL,
 'Ressourcenschonung', 'Resource conservation',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Durch Recycling leistet man einen wichtigen Beitrag zur ___.", "options": ["Ressourcenschonung", "Ressourcengewinnung", "Ressourcenverteilung", "Ressourcenplanung"]}',
 '{"correct": 0}',
 'Ressourcenschonung bedeutet, natürliche Rohstoffe sparsam und bewusst zu nutzen, damit sie nicht erschöpft werden.',
 'Resource conservation means using natural raw materials sparingly and consciously so they are not depleted.',
 2, 28);

-- synonym_match (2 exercises, sort 29-30)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'umwelt_natur', 'synonym_match', NULL,
 'Synonyme: Klimawandel', 'Synonyms: Climate change',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "die Erderwärmung", "synonym": "der Temperaturanstieg"}, {"word": "die Emissionen", "synonym": "die Schadstoffausstöße"}, {"word": "erneuerbar", "synonym": "regenerativ"}, {"word": "verringern", "synonym": "reduzieren"}]}',
 '{"correct": []}',
 'Erderwärmung und Temperaturanstieg beschreiben dasselbe Phänomen. Erneuerbar und regenerativ werden bei Energiequellen synonym verwendet.',
 'Erderwärmung and Temperaturanstieg describe the same phenomenon. Erneuerbar and regenerativ are used synonymously for energy sources.',
 2, 29),

('vocabulary', 'b2_refresh', 'umwelt_natur', 'synonym_match', NULL,
 'Synonyme: Umweltschutz', 'Synonyms: Environmental protection',
 'Ordnen Sie die Synonyme zu.', 'Match the synonyms.',
 '{"pairs": [{"word": "wegwerfen", "synonym": "entsorgen"}, {"word": "umweltschädlich", "synonym": "ökologisch bedenklich"}, {"word": "wiederverwendbar", "synonym": "mehrfach nutzbar"}, {"word": "die Dürre", "synonym": "die Trockenperiode"}]}',
 '{"correct": []}',
 'Entsorgen ist formeller als wegwerfen. Ökologisch bedenklich ist ein häufiger Ausdruck in Umweltberichten und politischen Debatten.',
 'Entsorgen is more formal than wegwerfen. Ökologisch bedenklich is a common expression in environmental reports and political debates.',
 2, 30);

-- word_family (2 exercises, sort 31-32)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'umwelt_natur', 'word_family', NULL,
 'Wortfamilie: verschmutzen', 'Word family: pollute',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "verschmutzen", "target_type": "-> Nomen (die _____)"}',
 '{"correct": "Verschmutzung", "accept_also": ["verschmutzung"]}',
 'Das Verb verschmutzen wird zum Nomen die Verschmutzung. Man spricht von Luft-, Wasser- oder Umweltverschmutzung.',
 'The verb verschmutzen becomes the noun die Verschmutzung. One speaks of air, water or environmental pollution.',
 2, 31),

('vocabulary', 'b2_refresh', 'umwelt_natur', 'word_family', NULL,
 'Wortfamilie: verbrauchen', 'Word family: consume',
 'Bilden Sie das passende Wort.', 'Form the appropriate word.',
 '{"word": "verbrauchen", "target_type": "-> Nomen (der _____)"}',
 '{"correct": "Verbrauch", "accept_also": ["verbrauch"]}',
 'Das Verb verbrauchen wird zum Nomen der Verbrauch. Man spricht vom Energieverbrauch, Wasserverbrauch oder Kraftstoffverbrauch.',
 'The verb verbrauchen becomes the noun der Verbrauch. One speaks of energy consumption, water consumption or fuel consumption.',
 2, 32);

-- fill_in harder (3 exercises, sort 33-35)
INSERT INTO public.exercises (area, level, topic, exercise_type, exam_format, title_de, title_en, instructions_de, instructions_en, content, solution, explanation_de, explanation_en, difficulty, sort_order) VALUES
('vocabulary', 'b2_refresh', 'umwelt_natur', 'fill_in', NULL,
 'Kollokation: Ausstoß senken', 'Collocation: reduce emissions',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Die Industrie muss den ___ drastisch senken.", "options": ["Ausstoß", "Verbrauch", "Umsatz", "Absatz"]}',
 '{"correct": 0}',
 'Den Ausstoß senken ist die präzise Kollokation für die Reduktion von Emissionen. Ausstoß bezieht sich hier auf Schadstoffe oder CO2.',
 'Den Ausstoß senken is the precise collocation for reducing emissions. Ausstoß here refers to pollutants or CO2.',
 3, 33),

('vocabulary', 'b2_refresh', 'umwelt_natur', 'fill_in', NULL,
 'Kollokation: nachhaltig wirtschaften', 'Collocation: operate sustainably',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Unternehmen müssen lernen, nachhaltig zu ___.", "options": ["wirtschaften", "arbeiten", "handeln", "produzieren"]}',
 '{"correct": 0}',
 'Nachhaltig wirtschaften bedeutet, ökonomisch erfolgreich zu sein, ohne die Umwelt oder zukünftige Generationen zu schädigen.',
 'Nachhaltig wirtschaften means being economically successful without harming the environment or future generations.',
 3, 34),

('vocabulary', 'b2_refresh', 'umwelt_natur', 'fill_in', NULL,
 'Kollokation: Ressourcen schonen', 'Collocation: conserve resources',
 'Ergänzen Sie den Satz mit dem passenden Wort.', 'Complete the sentence with the appropriate word.',
 '{"sentence": "Wir müssen natürliche ___ schonen, bevor sie erschöpft sind.", "options": ["Ressourcen", "Reserven", "Vorräte", "Schätze"]}',
 '{"correct": 0}',
 'Natürliche Ressourcen schonen ist eine feste Kollokation. Ressourcen umfasst Rohstoffe, Wasser, Boden und Energie.',
 'Natürliche Ressourcen schonen (conserve natural resources) is a fixed collocation. Ressourcen encompasses raw materials, water, soil and energy.',
 3, 35);
