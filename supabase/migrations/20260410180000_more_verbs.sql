-- More C1-relevant verbs: academic register, IT workplace, exam-relevant
INSERT INTO verb_conjugations (infinitiv, bedeutung_en, praesens_ich, praesens_du, praesens_er, praeteritum_ich, perfekt, konjunktiv_ii, is_irregular, is_separable, frequency_rank) VALUES

-- IT workplace verbs
('bereitstellen', 'to provide, to deploy', 'stelle bereit', 'stellst bereit', 'stellt bereit', 'stellte bereit', 'hat bereitgestellt', 'stellte bereit', FALSE, TRUE, 101),
('implementieren', 'to implement', 'implementiere', 'implementierst', 'implementiert', 'implementierte', 'hat implementiert', 'implementierte', FALSE, FALSE, 102),
('optimieren', 'to optimize', 'optimiere', 'optimierst', 'optimiert', 'optimierte', 'hat optimiert', 'optimierte', FALSE, FALSE, 103),
('priorisieren', 'to prioritize', 'priorisiere', 'priorisierst', 'priorisiert', 'priorisierte', 'hat priorisiert', 'priorisierte', FALSE, FALSE, 104),
('skalieren', 'to scale', 'skaliere', 'skalierst', 'skaliert', 'skalierte', 'hat skaliert', 'skalierte', FALSE, FALSE, 105),
('migrieren', 'to migrate', 'migriere', 'migrierst', 'migriert', 'migrierte', 'hat migriert', 'migrierte', FALSE, FALSE, 106),
('abstimmen', 'to coordinate, to align', 'stimme ab', 'stimmst ab', 'stimmt ab', 'stimmte ab', 'hat abgestimmt', 'stimmte ab', FALSE, TRUE, 107),
('nachvollziehen', 'to comprehend, to trace', 'vollziehe nach', 'vollziehst nach', 'vollzieht nach', 'vollzog nach', 'hat nachvollzogen', 'vollzöge nach', TRUE, TRUE, 108),
('einschätzen', 'to assess, to estimate', 'schätze ein', 'schätzt ein', 'schätzt ein', 'schätzte ein', 'hat eingeschätzt', 'schätzte ein', FALSE, TRUE, 109),
('umsetzen', 'to implement, to execute', 'setze um', 'setzt um', 'setzt um', 'setzte um', 'hat umgesetzt', 'setzte um', FALSE, TRUE, 110),

-- C1 exam / academic verbs
('erörtern', 'to discuss, to debate', 'erörtre', 'erörterst', 'erörtert', 'erörterte', 'hat erörtert', 'erörterte', FALSE, FALSE, 111),
('befürworten', 'to advocate, to support', 'befürworte', 'befürwortest', 'befürwortet', 'befürwortete', 'hat befürwortet', 'befürwortete', FALSE, FALSE, 112),
('widerlegen', 'to refute', 'widerlege', 'widerlegst', 'widerlegt', 'widerlegte', 'hat widerlegt', 'widerlegte', FALSE, FALSE, 113),
('erläutern', 'to explain in detail', 'erläutere', 'erläuterst', 'erläutert', 'erläuterte', 'hat erläutert', 'erläuterte', FALSE, FALSE, 114),
('anregen', 'to suggest, to stimulate', 'rege an', 'regst an', 'regt an', 'regte an', 'hat angeregt', 'regte an', FALSE, TRUE, 115),
('aufweisen', 'to show, to exhibit', 'weise auf', 'weist auf', 'weist auf', 'wies auf', 'hat aufgewiesen', 'wiese auf', TRUE, TRUE, 116),
('bedingen', 'to cause, to necessitate', 'bedinge', 'bedingst', 'bedingt', 'bedingte', 'hat bedingt', 'bedingte', FALSE, FALSE, 117),
('beruhen', 'to be based on', 'beruhe', 'beruhst', 'beruht', 'beruhte', 'hat beruht', 'beruhte', FALSE, FALSE, 118),
('einwenden', 'to object', 'wende ein', 'wendest ein', 'wendet ein', 'wandte ein', 'hat eingewandt', 'wendete ein', TRUE, TRUE, 119),
('heranziehen', 'to consult, to draw upon', 'ziehe heran', 'ziehst heran', 'zieht heran', 'zog heran', 'hat herangezogen', 'zöge heran', TRUE, TRUE, 120),

-- More common irregular verbs
('behalten', 'to keep, to retain', 'behalte', 'behältst', 'behält', 'behielt', 'hat behalten', 'behielte', TRUE, FALSE, 121),
('betreffen', 'to concern, to affect', 'betreffe', 'betriffst', 'betrifft', 'betraf', 'hat betroffen', 'beträfe', TRUE, FALSE, 122),
('überweisen', 'to transfer (money)', 'überweise', 'überweist', 'überweist', 'überwies', 'hat überwiesen', 'überwiese', TRUE, FALSE, 123),
('anbieten', 'to offer', 'biete an', 'bietest an', 'bietet an', 'bot an', 'hat angeboten', 'böte an', TRUE, TRUE, 124),
('zugeben', 'to admit', 'gebe zu', 'gibst zu', 'gibt zu', 'gab zu', 'hat zugegeben', 'gäbe zu', TRUE, TRUE, 125),
('einbeziehen', 'to include, to involve', 'beziehe ein', 'beziehst ein', 'bezieht ein', 'bezog ein', 'hat einbezogen', 'bezöge ein', TRUE, TRUE, 126),
('vorgehen', 'to proceed', 'gehe vor', 'gehst vor', 'geht vor', 'ging vor', 'ist vorgegangen', 'ginge vor', TRUE, TRUE, 127),
('nahelegen', 'to suggest, to recommend', 'lege nahe', 'legst nahe', 'legt nahe', 'legte nahe', 'hat nahegelegt', 'legte nahe', FALSE, TRUE, 128),
('überprüfen', 'to verify, to review', 'überprüfe', 'überprüfst', 'überprüft', 'überprüfte', 'hat überprüft', 'überprüfte', FALSE, FALSE, 129),
('abwägen', 'to weigh up, to consider', 'wäge ab', 'wägst ab', 'wägt ab', 'wog ab', 'hat abgewogen', 'wöge ab', TRUE, TRUE, 130);
