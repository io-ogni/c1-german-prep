-- Translate vocabulary definition_match options from English to German
-- The correct answer is always at index 0 in the options array

-- ── alltag_gesellschaft ──
UPDATE exercises SET content = jsonb_set(content, '{options}', '["Aufsatz / schriftliche Abhandlung","Brief","Beschwerde","Zusammenfassung"]')
WHERE id = '2094c95a-554d-4046-b2bc-e0c27abf82ef';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Pflicht, für etwas einzustehen","Unterhaltung","Beziehung","Erfahrung"]')
WHERE id = 'dd229312-0145-4d2c-8d5a-cb348a056048';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["gleiche Rechte für alle","Verpflichtung","Vorurteil","Überlieferung"]')
WHERE id = '826e8554-1b22-46d1-b164-bf277bd24db0';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["vorgefasste Meinung ohne Grundlage","Vorteil","Ansicht","Urteil"]')
WHERE id = '1dbb88f2-6c58-4b1c-9896-dc897c926d03';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["allgemeines Wohlbefinden im Alltag","Lebenserwartung","Lebensstil","Lebensstandard"]')
WHERE id = 'e85a3653-27b3-4f65-ba62-261ba2b87e62';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Streit / kontroverse Diskussion","Vereinbarung","Feier","Termin"]')
WHERE id = '3dd4e463-5b0f-413a-bcfb-9db8c19eae5c';

-- ── arbeit_karriere ──
UPDATE exercises SET content = jsonb_set(content, '{options}', '["Unterlagen zur Stellensuche","Anzeige","Bewertung","Gespräch"]')
WHERE id = '3f99cd46-3397-47e8-80d8-c86c746e77c3';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["persönliches Gespräch im Bewerbungsverfahren","Präsentation","Beratung","Verhandlung"]')
WHERE id = '7a9c86bd-4aa9-4092-a2ee-362aacbd376a';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Beendigung des Arbeitsverhältnisses","Beförderung","Gehaltserhöhung","Stellenangebot"]')
WHERE id = 'c7cbaa26-d99b-4e6f-a051-0d61114378c0';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Aufstieg in eine höhere Position","Entlassung","Versetzung","Ruhestand"]')
WHERE id = 'f2366934-4e11-4cca-9e3e-230e374d33a1';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["berufliche Fortbildung","Schulbildung","Hochschulabschluss","Ausbildung"]')
WHERE id = '59f18c8f-3e20-45c0-86cc-886023574e6c';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Umstände am Arbeitsplatz","Stellenanforderungen","Arbeitsergebnisse","Arbeitsvertrag"]')
WHERE id = '3c8a04dd-504b-49c7-97c1-d14e130a055d';

-- ── konnektoren_redemittel ──
UPDATE exercises SET content = jsonb_set(content, '{options}', '["trotzdem / gleichwohl","deshalb","außerdem","weil"]')
WHERE id = '1ca81b15-f2d6-4a96-a189-feb15f025a3a';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["als Folge davon","trotz alledem","zusätzlich","andererseits"]')
WHERE id = 'df121298-3ba3-4c38-ba63-5241870d9144';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["trotz allem / dennoch","aus diesem Grund","mit anderen Worten","solange"]')
WHERE id = '055aef61-867b-4e93-aadb-2531d1b4ef5d';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["besonders da / umso mehr als","obwohl","anstatt","sobald"]')
WHERE id = 'abbdcdca-c04e-4875-899e-e661538b5560';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["in Anbetracht / mit Blick auf","trotz","anstelle von","abgesehen von"]')
WHERE id = '2b83dcce-c665-4c8c-a791-0e1bd46cda52';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["meiner Meinung nach","meines Wissens nach","meiner Erfahrung nach","zu meiner Überraschung"]')
WHERE id = '8fdc428b-2129-4ccd-a439-acad07b640f2';

-- ── kultur_bildung ──
UPDATE exercises SET content = jsonb_set(content, '{options}', '["finanzielle Förderung für das Studium","Studiengebühr","Studienkredit","akademischer Abschluss"]')
WHERE id = '7b203780-3fa7-4c0a-879f-87ee567f7435';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Eröffnungsveranstaltung einer Kunstausstellung","Abschlussfeier","Kunstauktion","Museumsführung"]')
WHERE id = '50f57159-c478-4656-86d2-2132819ae7c2';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["höchste akademische Qualifikation zur Professur","Doktorarbeit","Bachelorabschluss","Berufsausbildung"]')
WHERE id = 'cc907ba4-434b-4e35-ba63-821b74c4b155';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["gleiche Möglichkeiten für alle","gleiche Bezahlung","Meinungsfreiheit","Recht auf Bildung"]')
WHERE id = 'be200148-84e9-43a8-8281-9c78e6f2b2e7';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["über Generationen weitergegebene Traditionen und Werte","moderne Kunstbewegung","ausländischer kultureller Einfluss","Kulturaustauschprogramm"]')
WHERE id = 'dc7f1118-1c05-4b13-8dee-b5ad7c9746b8';

-- ── medien_kommunikation ──
UPDATE exercises SET content = jsonb_set(content, '{options}', '["Information über aktuelle Ereignisse","Werbeanzeige","Meinungsäußerung","Rezension"]')
WHERE id = '431dde4a-76c2-4c30-87ae-b7410e93fc9d';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["mediale Darstellung von Ereignissen","Unterhaltungssendung","Werbekampagne","Redaktionssitzung"]')
WHERE id = 'a9d6dd6c-a754-420a-ba94-7fd2e28b3fe2';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["öffentliche Veranstaltung für Journalisten","Zeitungsartikel","Redaktion","Sendung"]')
WHERE id = '62b60a85-334d-4ba7-b917-df074a1f6eb7';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Fähigkeit, Medien kritisch zu nutzen","Medienkonsum","Medienproduktion","Medienkritik"]')
WHERE id = '67276da4-ced0-4924-a4c6-c7842d959184';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["staatliche Kontrolle von Veröffentlichungen","Meinungsfreiheit","Veröffentlichung","Interview"]')
WHERE id = '22783c36-72ae-41c1-bad7-4fe23d601e01';

-- ── politik_wirtschaft ──
UPDATE exercises SET content = jsonb_set(content, '{options}', '["Erlass von Gesetzen","Rechtsprechung","Vollstreckung","Verfassung"]')
WHERE id = '5d780490-5e2f-4603-9710-4179b6bc4ab5';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Bündnis von Parteien zur Regierungsbildung","Oppositionspartei","Einparteienherrschaft","Verfassungsgericht"]')
WHERE id = '6f4fc1b7-795a-4bbe-985e-e3ecd4b6cc56';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Gesamtwert aller Güter und Dienstleistungen eines Landes","Haushaltsdefizit","Staatsverschuldung","Handelsbilanz"]')
WHERE id = 'a661b5e3-0a6d-40f3-9c99-75f4dd9d4364';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Abbau staatlicher Vorschriften","Zunahme staatlicher Kontrolle","Verstaatlichung","Steuerreform"]')
WHERE id = 'c9e61277-9c5b-4644-810a-6ae5059c7916';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["wirtschaftlicher Abschwung","Wirtschaftsboom","Geldentwertung","Handelsüberschuss"]')
WHERE id = 'a38700df-a643-45f8-a108-321b9e786068';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Fähigkeit, sich am Markt zu behaupten","Kooperationsbereitschaft","Marktmonopol","Staatssubvention"]')
WHERE id = 'c7a02445-c2fb-43b1-9e85-10e6e4ebe92d';

-- ── umwelt_natur ──
UPDATE exercises SET content = jsonb_set(content, '{options}', '["Belastung der Natur durch Schadstoffe","Naturschutz","Klimawandel","erneuerbare Energie"]')
WHERE id = '217efae4-aee0-4643-9888-eab3d258b2c7';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["langfristige Veränderung des Erdklimas","Wettervorhersage","Naturkatastrophe","Luftverschmutzung"]')
WHERE id = 'f098aced-b884-4c70-bc74-6c304b5bf9ae';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["verantwortungsvoller Umgang mit Ressourcen","Produktivität","Rentabilität","Effizienz"]')
WHERE id = 'a3426982-0613-4a98-aa91-e48eda8418de';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Erwärmung der Atmosphäre durch Gase","Ozonschicht","saurer Regen","Abholzung"]')
WHERE id = 'ce0b0553-1299-417a-b944-8183227481f2';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Vielfalt der Tier- und Pflanzenarten","Abholzung","Wiederverwertung","Solarenergie"]')
WHERE id = '20c41b8a-479f-4ab5-974e-447e5fcc5a91';

-- ── wissenschaft_technik ──
UPDATE exercises SET content = jsonb_set(content, '{options}', '["vorläufige Annahme, die überprüft werden muss","bewiesenes Naturgesetz","Versuchsergebnis","Forschungseinrichtung"]')
WHERE id = 'f43dff71-6309-4ff7-9a5e-a8067e8a4249';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["durch Forschung gewonnene Einsicht","persönliche Meinung","Laborinstrument","Forschungsstipendium"]')
WHERE id = '8803be89-92f0-4d76-96db-959d518ba5d5';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Technologie, die menschliches Denken simuliert","Computer-Hardware","Programmiersprache","digitale Datenbank"]')
WHERE id = 'e9ac0e69-dda0-47aa-b90c-714e405c25b7';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["Begutachtung durch unabhängige Fachleute","Studentenprüfung","Meinungsumfrage","staatliche Prüfung"]')
WHERE id = 'c2955d77-8a62-48b7-bcdc-060935294484';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["rechtlicher Schutz für eine Erfindung","wissenschaftliche Veröffentlichung","Forschungsmethode","Hochschulabschluss"]')
WHERE id = 'd94a79d0-ac60-4cf5-affc-9299da0c743d';

UPDATE exercises SET content = jsonb_set(content, '{options}', '["wissenschaftliche Doktorarbeit","Bachelorarbeit","Laborbericht","Konferenzvortrag"]')
WHERE id = 'e40b1ac3-c401-4e28-af86-e9b8f3a4ca1a';
