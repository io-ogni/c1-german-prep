-- ============================================================
-- Listening Exercises Seed Data — telc C1 Hörverstehen
-- 2 complete sets × 3 parts = 6 exercises total
--
-- Set 1:
--   Teil 1 — Globalverstehen: Meinungen zur Vier-Tage-Woche (match)
--   Teil 2 — Detailverstehen: Burnout-Prävention am Arbeitsplatz (multiple_choice)
--   Teil 3 — Informationstransfer: Medienkompetenz im digitalen Zeitalter (fill_in)
--
-- Set 2:
--   Teil 1 — Globalverstehen: Meinungen über KI im Alltag (match)
--   Teil 2 — Detailverstehen: Stadtbegrünung und urbane Landwirtschaft (multiple_choice)
--   Teil 3 — Informationstransfer: Nachhaltige Mobilität der Zukunft (fill_in)
-- ============================================================

INSERT INTO exercises (
  area, level, topic, exercise_type, exam_format,
  title_de, title_en,
  instructions_de, instructions_en,
  content, solution,
  explanation_de, explanation_en,
  difficulty, sort_order
) VALUES

-- ============================================================
-- SET 1 — TEIL 1: GLOBALVERSTEHEN
-- Topic: Meinungen zur Vier-Tage-Woche
-- exercise_type: match | difficulty: 2 | sort_order: 1
-- ============================================================
(
  'listening', 'c1', 'globalverstehen', 'match', 'telc',
  'Hören: Meinungen zur Vier-Tage-Woche',
  'Listening: Opinions on the Four-Day Work Week',
  'Sie hören acht kurze Beiträge zum Thema Vier-Tage-Woche. Ordnen Sie jedem Sprecher die passende Aussage zu. Zwei Aussagen passen zu keinem Sprecher.',
  'You will hear eight short contributions on the topic of the four-day work week. Match each speaker to the appropriate statement. Two statements do not match any speaker.',
  '{
    "topic_title": "Meinungen zur Vier-Tage-Woche",
    "speakers": [
      {
        "id": 1,
        "transcript": "Also, ich arbeite seit zwanzig Jahren in der Pflege, und ich sag Ihnen ehrlich: Die Idee klingt schön, aber bei uns ist das schlicht nicht umsetzbar. Wir haben schon jetzt zu wenig Personal, und wenn dann alle nur noch vier Tage kommen wollen — na ja, sagen wir mal, die Patienten werden sich das nicht aussuchen können. Ich find das irgendwie... weltfremd, diese ganze Diskussion."
      },
      {
        "id": 2,
        "transcript": "Ich bin total dafür, ehrlich gesagt. Ich meine, Studien aus Island und Großbritannien zeigen doch eindeutig: Die Produktivität sinkt nicht, die Mitarbeiter sind gesünder, die Fehlzeiten gehen zurück. Warum klammern wir uns dann noch an das alte Modell? Das ist doch irgendwie... na, man fragt sich schon, ob da auch Interessen dahinterstecken, die mit Produktivität nichts zu tun haben."
      },
      {
        "id": 3,
        "transcript": "Mein Unternehmen hat das letztes Jahr eingeführt, für eine Pilotphase von sechs Monaten. Und ich sag Ihnen: Am Anfang war ich skeptisch. Aber nach den sechs Monaten wollte niemand mehr zurück. Der Umsatz ist sogar leicht gestiegen, weil die Leute konzentrierter gearbeitet haben. Das hat mich ehrlich überrascht."
      },
      {
        "id": 4,
        "transcript": "Also, als Mutter von zwei kleinen Kindern — ich mein, natürlich klingt ein freier Tag mehr verlockend. Aber ich frage mich: Wird das Gehalt dann auch angepasst? Weil wenn ich einen Tag weniger verdiene, dann ist das für mich keine Verbesserung. Und über diese Frage reden die meisten gar nicht. Das stört mich an der ganzen Debatte."
      },
      {
        "id": 5,
        "transcript": "Ich halte das für eine gefährliche Illusion. Im globalen Wettbewerb — ich arbeite in der Exportbranche — kann ich mir keine verkürzte Arbeitswoche leisten, wenn meine Konkurrenten in Asien sechs Tage arbeiten. Das klingt vielleicht altmodisch, aber Wettbewerbsfähigkeit ist nun mal keine Frage der Work-Life-Balance, sondern des Überlebens."
      },
      {
        "id": 6,
        "transcript": "Ich find das Thema superwichtig, gerade für junge Leute wie mich. Ich hab meinen letzten Job genau deswegen gekündigt, weil die Firma sich komplett geweigert hat, auch nur über flexible Modelle zu reden. Arbeitgeber, die das nicht anbieten, werden in fünf Jahren keine qualifizierten Leute mehr finden. So einfach ist das."
      },
      {
        "id": 7,
        "transcript": "Als Gewerkschaftsvertreter sehe ich das differenziert. Einerseits unterstützen wir natürlich Modelle, die den Beschäftigten nützen. Andererseits muss klar sein: Vier Tage dürfen nicht bedeuten, dass dieselbe Arbeit in weniger Zeit gepresst wird, unter Druck und mit schlechterer Qualität. Der Teufel steckt im Detail der Umsetzung."
      },
      {
        "id": 8,
        "transcript": "Ich forsche an der Universität zu Arbeitszeit und Wohlbefinden. Was uns die Daten zeigen: Es kommt weniger auf die Anzahl der Tage an als auf die Autonomie der Beschäftigten. Wer selbst entscheiden kann, wann und wie er arbeitet, ist zufriedener — unabhängig davon, ob das vier oder fünf Tage sind. Die Vier-Tage-Woche ist also eher ein Symbol als die eigentliche Lösung."
      }
    ],
    "statements": [
      {
        "id": "a",
        "text": "Ohne eine Garantie gleichbleibender Bezahlung bringt das neue Modell für viele Arbeitnehmer keinen echten Vorteil."
      },
      {
        "id": "b",
        "text": "Internationale Konkurrenz macht eine Arbeitszeitverkürzung für bestimmte Branchen wirtschaftlich nicht tragbar."
      },
      {
        "id": "c",
        "text": "Betriebe, die dieses Modell nicht anbieten, riskieren langfristig ihren Zugang zu gut ausgebildeten Fachkräften."
      },
      {
        "id": "d",
        "text": "Empirische Belege sprechen für das Modell, doch strukturelle Widerstände verhindern eine breitere Umsetzung."
      },
      {
        "id": "e",
        "text": "Entscheidend für die Arbeitszufriedenheit ist weniger die reine Tageszahl als die Selbstbestimmung über die eigene Arbeitszeit."
      },
      {
        "id": "f",
        "text": "In Berufen mit Personalknappheit ist eine Verkürzung der Arbeitszeit schlicht nicht mit dem Versorgungsauftrag vereinbar."
      },
      {
        "id": "g",
        "text": "Ein eigener Praxistest hat die anfängliche Skepsis gegenüber dem Modell durch positive Ergebnisse widerlegt."
      },
      {
        "id": "h",
        "text": "Das Modell verdient Unterstützung, solange es nicht dazu missbraucht wird, denselben Arbeitsumfang auf weniger Zeit zu verdichten."
      },
      {
        "id": "i",
        "text": "Die Vier-Tage-Woche stärkt vor allem die Vereinbarkeit von Familie und Beruf für Eltern kleiner Kinder."
      },
      {
        "id": "j",
        "text": "Jüngere Generationen betrachten flexible Arbeitsmodelle als selbstverständliche Mindestanforderung an ihren Arbeitgeber."
      }
    ]
  }',
  '{"1": "f", "2": "d", "3": "g", "4": "a", "5": "b", "6": "c", "7": "h", "8": "e"}',
  'Sprecher 1 (Pflegerin): Sie betont Personalmangel und Unvereinbarkeit mit dem Versorgungsauftrag → f. Sprecher 2 (Befürworter): Verweist auf Studien, fragt sich nach versteckten Interessen → d. Sprecher 3 (Unternehmer): Eigener Pilotversuch, anfangs skeptisch, positives Ergebnis → g. Sprecher 4 (Mutter): Gehaltsgarantie fehlt in der Debatte → a. Sprecher 5 (Exportbranche): Globaler Wettbewerb macht es unerschwinglich → b. Sprecher 6 (Junge Fachkraft): Hat wegen fehlendem Angebot gekündigt → c. Sprecher 7 (Gewerkschaft): Grundsätzlich dafür, aber Arbeitsverdichtung darf nicht folgen → h. Sprecher 8 (Forscher): Autonomie wichtiger als Tageszahl → e. Distraktor i (Familienvereinbarkeit als Hauptthema) und j (Junge als Mindestanforderung — ähnlich wie c, aber c ist spezifischer auf Fachkräfteverlust).',
  'Speaker 1 (nurse): emphasises staff shortages and incompatibility with care obligations → f. Speaker 2 (advocate): cites studies, hints at hidden interests blocking change → d. Speaker 3 (entrepreneur): own pilot test overcame initial scepticism → g. Speaker 4 (mother): pay guarantee missing from debate → a. Speaker 5 (export sector): global competition makes it unaffordable → b. Speaker 6 (young professional): quit job because of refusal to consider flexibility → c. Speaker 7 (union rep): supportive in principle, but warns against work intensification → h. Speaker 8 (researcher): autonomy matters more than number of days → e. Distractors: i (family-work balance as main theme) and j (young people treating it as basic expectation — close to c but c focuses on talent loss).',
  2, 1
),

-- ============================================================
-- SET 1 — TEIL 2: DETAILVERSTEHEN
-- Topic: Burnout-Prävention am Arbeitsplatz (Radio interview)
-- exercise_type: multiple_choice | difficulty: 2 | sort_order: 2
-- ============================================================
(
  'listening', 'c1', 'detailverstehen', 'multiple_choice', 'telc',
  'Hören: Burnout-Prävention am Arbeitsplatz',
  'Listening: Burnout Prevention in the Workplace',
  'Sie hören ein Radiofeature zum Thema Burnout-Prävention. Wählen Sie für jede Frage die richtige Antwort (a, b oder c).',
  'You will hear a radio feature on the topic of burnout prevention. Choose the correct answer (a, b or c) for each question.',
  '{
    "transcript": "Moderatorin: Guten Morgen und herzlich willkommen zu unserem Gesundheitsmagazin. Heute sprechen wir über ein Thema, das in deutschen Unternehmen immer relevanter wird: Burnout-Prävention am Arbeitsplatz. Zu Gast ist Dr. Miriam Schulte, Arbeitspsychologin an der Universität Mannheim und Autorin des Buches ''Ausgebrannt — und dann?'' Frau Dr. Schulte, wie verbreitet ist Burnout in Deutschland wirklich?\n\nDr. Schulte: Na ja, das ist eine Frage, bei der wir zunächst ein bisschen aufräumen müssen. Burnout ist keine offizielle psychiatrische Diagnose im ICD-11 — es ist ein Syndrom, das im Kontext von chronischem Arbeitsstress entsteht. Die Zahlen sind trotzdem alarmierend: Laut DAK-Gesundheitsreport 2024 haben sich Burnout-bedingte Fehltage in den letzten zehn Jahren verdreifacht. Das ist kein Hype, das ist ein strukturelles Problem.\n\nModeratorin: Woran liegt das? Ist das ein deutsches Phänomen?\n\nDr. Schulte: Nein, überhaupt nicht. Es ist ein globales Phänomen, das aber in Deutschland durch bestimmte Faktoren verstärkt wird. Zum einen durch die sogenannte ''Always-on''-Kultur — die Erwartung, per E-Mail oder Messenger jederzeit erreichbar zu sein. Zum anderen durch den zunehmenden Leistungsdruck in einer Arbeitswelt, die Effizienz über alles stellt. Ein dritter Faktor, der oft unterschätzt wird, ist das Gefühl mangelnder Kontrolle über die eigene Arbeit. Wenn Menschen das Gefühl haben, dass ihre Entscheidungen nichts bewirken, steigt das Burnout-Risiko dramatisch.\n\nModeratorin: Was können Unternehmen konkret tun?\n\nDr. Schulte: Viele Unternehmen setzen leider noch immer auf symptomorientierte Maßnahmen — Yoga-Kurse, Obstkörbe, Stressmanagement-Seminare. Das ist nicht falsch, aber es behandelt die Oberfläche. Was wirklich hilft, sind strukturelle Eingriffe. Erstens: klare Kommunikationsregeln. Wenn ein Unternehmen festlegt, dass nach 19 Uhr keine E-Mails mehr erwartet werden, und das auch wirklich umsetzt — nicht nur auf dem Papier — dann ist das eine messbare Entlastung. Zweitens: psychologische Sicherheit. Mitarbeiter müssen das Gefühl haben, dass sie Überlastung ansprechen können, ohne negative Konsequenzen zu befürchten. Und drittens — das ist mir persönlich sehr wichtig — Mitarbeiterbeteiligung bei der Arbeitsgestaltung. Wenn Menschen mitentscheiden, wie und wann sie ihre Aufgaben erledigen, sinkt das Stressniveau deutlich.\n\nModeratorin: Gibt es Branchen, die besonders betroffen sind?\n\nDr. Schulte: Traditionell spricht man von Sozial- und Gesundheitsberufen, Lehrern, Führungskräften. Aber wir sehen zunehmend, dass auch technische Berufe — IT, Softwareentwicklung — stark betroffen sind. Das liegt an der Projektkultur: kurze Deadlines, ständige Unterbrechungen, der sogenannte ''Context-Switch-Stress'', wenn man ständig zwischen Aufgaben wechselt. Was überraschend ist: Homeoffice hat das Problem nicht gelöst, sondern für viele verschärft. Die Grenze zwischen Privat und Beruf verschwimmt, die sozialen Pausen fallen weg.\n\nModeratorin: Welche Rolle spielen Führungskräfte?\n\nDr. Schulte: Eine zentrale. Studien zeigen, dass die direkte Führungskraft einen größeren Einfluss auf die psychische Gesundheit der Mitarbeiter hat als das Gesamtunternehmen. Eine Führungskraft, die selbst keine Grenzen setzt, die um Mitternacht E-Mails schreibt, sendet ein Signal — auch wenn sie das nicht beabsichtigt. Umgekehrt: Eine Führungskraft, die offen über eigene Belastungsgrenzen spricht, gibt ihrem Team Erlaubnis, dasselbe zu tun. Das nennen wir Rollenmodell-Effekt.\n\nModeratorin: Und was können einzelne Mitarbeiter für sich selbst tun?\n\nDr. Schulte: Ich bin da ehrlich gesagt etwas vorsichtig mit Ratschlägen, weil ich nicht möchte, dass die Verantwortung vollständig auf den Einzelnen abgewälzt wird. Das wäre ungerecht. Aber: Es gibt Faktoren, die man beeinflussen kann. Allem voran: die Fähigkeit, Nein zu sagen — und das ohne schlechtes Gewissen. Das klingt einfach, ist aber für viele Menschen sehr schwer, besonders wenn die Unternehmenskultur implizit Extrameilen erwartet. Zweitens: regelmäßige Erholung, die wirklich Erholung ist — also nicht E-Mails im Urlaub checken. Und drittens: soziale Verbindungen pflegen, auch am Arbeitsplatz. Isolation ist ein starker Prädiktor für Burnout.\n\nModeratorin: Gibt es neue Ansätze, die Sie besonders interessant finden?\n\nDr. Schulte: Ja, ich verfolge sehr gespannt die Forschung zur sogenannten ''Job Crafting''-Methode. Das ist ein Ansatz, bei dem Mitarbeiter aktiv ihre eigenen Aufgaben, Beziehungen und die Bedeutung ihrer Arbeit neu gestalten. Das ist kein Selbsthilfe-Ratgeber-Konzept, sondern empirisch gut belegt. Unternehmen wie SAP und BMW haben das in Pilotprojekten erprobt, mit messbaren Verbesserungen bei Engagement und Wohlbefinden. Der Grundgedanke ist: Menschen brauchen nicht weniger Arbeit, sondern sinnvollere Arbeit.\n\nModeratorin: Frau Dr. Schulte, vielen Dank für das aufschlussreiche Gespräch.\n\nDr. Schulte: Sehr gerne.",
    "questions": [
      {
        "number": 55,
        "stem": "Welche Aussage trifft auf Burnout laut Dr. Schulte zu?",
        "options": [
          {"id": "a", "text": "Es ist eine psychiatrische Erkrankung, die im ICD-11 offiziell klassifiziert ist."},
          {"id": "b", "text": "Es handelt sich um ein arbeitsplatzbezogenes Syndrom, das trotzdem statistisch erheblich zunimmt."},
          {"id": "c", "text": "Die steigenden Fallzahlen sind vor allem auf eine veränderte Diagnosepraxis zurückzuführen."}
        ]
      },
      {
        "number": 56,
        "stem": "Welchen Faktor hebt Dr. Schulte als besonders unterschätzt hervor?",
        "options": [
          {"id": "a", "text": "Die ständige Erreichbarkeit durch digitale Kommunikationsmittel."},
          {"id": "b", "text": "Den wachsenden Druck, möglichst effizient zu arbeiten."},
          {"id": "c", "text": "Das Fehlen eigener Handlungsspielräume bei der Arbeit."}
        ]
      },
      {
        "number": 57,
        "stem": "Wie bewertet Dr. Schulte Maßnahmen wie Yoga-Kurse und Stressseminare?",
        "options": [
          {"id": "a", "text": "Sie lehnt solche Angebote grundsätzlich ab, weil sie das eigentliche Problem verschleiern."},
          {"id": "b", "text": "Sie hält sie für sinnvoll, aber nicht ausreichend, weil sie nur an der Oberfläche ansetzen."},
          {"id": "c", "text": "Sie empfiehlt sie als erste Maßnahme, bevor tiefergehende Schritte eingeleitet werden."}
        ]
      },
      {
        "number": 58,
        "stem": "Was versteht Dr. Schulte unter ''psychologischer Sicherheit'' im Arbeitskontext?",
        "options": [
          {"id": "a", "text": "Die Möglichkeit, Überlastung offen anzusprechen, ohne berufliche Nachteile befürchten zu müssen."},
          {"id": "b", "text": "Den Schutz der Mitarbeiter vor psychisch belastenden Aufgaben durch klare Stellenbeschreibungen."},
          {"id": "c", "text": "Das Recht auf regelmäßige psychologische Beratung auf Kosten des Arbeitgebers."}
        ]
      },
      {
        "number": 59,
        "stem": "Was sagt Dr. Schulte über die Auswirkungen des Homeoffice auf Burnout?",
        "options": [
          {"id": "a", "text": "Homeoffice hat das Burnout-Risiko insgesamt deutlich gesenkt."},
          {"id": "b", "text": "Homeoffice hat für viele Menschen bestehende Stressquellen eher verstärkt als abgemildert."},
          {"id": "c", "text": "Homeoffice ist vor allem für technische Berufe vorteilhaft, da es Unterbrechungen reduziert."}
        ]
      },
      {
        "number": 60,
        "stem": "Worin besteht der ''Rollenmodell-Effekt'' laut Dr. Schulte?",
        "options": [
          {"id": "a", "text": "Führungskräfte, die selbst Grenzen respektieren, signalisieren ihrem Team, dass dies auch für sie erlaubt ist."},
          {"id": "b", "text": "Führungskräfte sollten eine Vorbildfunktion übernehmen, indem sie besonders viel arbeiten."},
          {"id": "c", "text": "Mitarbeiter orientieren sich eher an ihren Kollegen als an der Unternehmensleitung."}
        ]
      },
      {
        "number": 61,
        "stem": "Welche Haltung nimmt Dr. Schulte gegenüber individuellen Ratschlägen zur Burnout-Prävention ein?",
        "options": [
          {"id": "a", "text": "Sie gibt sie gerne, weil Selbstverantwortung der wirksamste Schutzfaktor ist."},
          {"id": "b", "text": "Sie äußert sie zurückhaltend, um nicht den Eindruck zu erwecken, das Problem liege beim Einzelnen."},
          {"id": "c", "text": "Sie lehnt sie vollständig ab, weil nur Unternehmen in der Pflicht stehen."}
        ]
      },
      {
        "number": 62,
        "stem": "Was ist laut Dr. Schulte der Kerngedanke der ''Job Crafting''-Methode?",
        "options": [
          {"id": "a", "text": "Arbeitnehmer sollen selbst entscheiden, wie viele Stunden sie täglich arbeiten."},
          {"id": "b", "text": "Mitarbeiter gestalten aktiv die Inhalte und Beziehungen ihrer Arbeit so um, dass sie sinnvoller werden."},
          {"id": "c", "text": "Unternehmen passen Stellenprofile regelmäßig an die individuellen Stärken ihrer Mitarbeiter an."}
        ]
      },
      {
        "number": 63,
        "stem": "Welche Berufsgruppe überrascht Dr. Schulte bei der Verbreitung von Burnout?",
        "options": [
          {"id": "a", "text": "Lehrende und pädagogische Berufe, die traditionell als besonders belastet gelten."},
          {"id": "b", "text": "Technische Fachkräfte wie IT-Spezialisten und Softwareentwickler."},
          {"id": "c", "text": "Führungskräfte im mittleren Management, die selten thematisiert werden."}
        ]
      },
      {
        "number": 64,
        "stem": "Welchen Faktor nennt Dr. Schulte als starken Prädiktor für Burnout?",
        "options": [
          {"id": "a", "text": "Zu viele Überstunden ohne finanziellen Ausgleich."},
          {"id": "b", "text": "Das Fehlen sozialer Kontakte am und außerhalb des Arbeitsplatzes."},
          {"id": "c", "text": "Eine zu geringe Qualifikation für die übertragenen Aufgaben."}
        ]
      }
    ]
  }',
  '{"55": "b", "56": "c", "57": "b", "58": "a", "59": "b", "60": "a", "61": "b", "62": "b", "63": "b", "64": "b"}',
  'Frage 55: Burnout ist kein ICD-11-Syndrom im psychiatrischen Sinne, aber die Zahlen steigen stark → b. Frage 56: Dr. Schulte hebt das Kontrollgefühl als ''oft unterschätzt'' hervor → c. Frage 57: "nicht falsch, aber behandelt die Oberfläche" → weder Ablehnung noch Empfehlung, sondern Einschränkung → b. Frage 58: Überlastung ansprechen ohne Konsequenzen → a. Frage 59: Homeoffice hat das Problem für viele verschärft → b. Frage 60: Führungskraft schreibt Mails um Mitternacht = Signal, Umkehrung = Erlaubnis für Team → a. Frage 61: "vorsichtig, weil ich nicht möchte, dass die Verantwortung vollständig auf den Einzelnen abgewälzt wird" → b. Frage 62: Menschen neu gestalten aktiv Aufgaben und Beziehungen → b. Frage 63: IT/Softwareentwicklung, nicht die klassischen Gruppen → b. Frage 64: "Isolation ist ein starker Prädiktor" → b.',
  'Q55: Burnout is not an ICD-11 psychiatric diagnosis but figures are rising sharply → b. Q56: Dr. Schulte calls lack of control "often underestimated" → c. Q57: "not wrong, but treats the surface" — neither rejection nor recommendation → b. Q58: speaking up about overload without consequences → a. Q59: home office sharpened the problem for many → b. Q60: leader sending emails at midnight = signal; opposite = giving team permission → a. Q61: "cautious because I do not want responsibility shifted entirely onto the individual" → b. Q62: workers actively reshape tasks and relationships to make them more meaningful → b. Q63: IT and software development, not the classic groups → b. Q64: "isolation is a strong predictor" → b.',
  2, 2
),

-- ============================================================
-- SET 1 — TEIL 3: INFORMATIONSTRANSFER
-- Topic: Medienkompetenz im digitalen Zeitalter (University lecture)
-- exercise_type: fill_in | difficulty: 3 | sort_order: 3
-- ============================================================
(
  'listening', 'c1', 'informationstransfer', 'fill_in', 'telc',
  'Hören: Medienkompetenz im digitalen Zeitalter',
  'Listening: Media Literacy in the Digital Age',
  'Sie hören einen Universitätsvortrag zum Thema Medienkompetenz. Füllen Sie die Lücken in den Notizen mit den Informationen aus dem Vortrag aus (maximal 4 Wörter pro Lücke).',
  'You will hear a university lecture on media literacy. Fill in the gaps in the notes with information from the lecture (maximum 4 words per gap).',
  '{
    "transcript": "Guten Morgen, meine Damen und Herren. Willkommen zur heutigen Vorlesung im Rahmen des Seminars ''Digitale Gesellschaft und Bildung''. Heute sprechen wir über Medienkompetenz im digitalen Zeitalter — ein Begriff, der in aller Munde ist, aber selten präzise definiert wird. Ich möchte heute vier Dimensionen von Medienkompetenz vorstellen und dann auf konkrete bildungspolitische Konsequenzen eingehen.\n\nBegreifen wir zunächst den Ursprung des Begriffs. Der Kommunikationswissenschaftler Dieter Baacke prägte in den 1970er Jahren den deutschen Begriff ''Medienkompetenz''. Er definierte sie als die Fähigkeit, Medien nicht nur zu nutzen, sondern sie auch kritisch zu reflektieren und aktiv an der Medienkultur teilzuhaben. Diese Definition ist überraschend aktuell — auch wenn Baacke damals noch nicht an das Internet dachte.\n\nHeute, in einer Welt, in der laut ARD/ZDF-Onlinestudie 2024 über 93 Prozent der Deutschen das Internet täglich nutzen, ist Medienkompetenz keine Zusatzqualifikation mehr, sondern eine Kulturtechnik — vergleichbar mit Lesen und Schreiben.\n\nKommen wir zur ersten Dimension: der technischen Kompetenz. Damit meine ich die Fähigkeit, digitale Geräte und Anwendungen sicher und effizient zu bedienen. Das klingt selbstverständlich, ist es aber nicht. Studien des Bitkom-Verbands zeigen, dass 34 Prozent der über 60-Jährigen in Deutschland angeben, grundlegende Sicherheitseinstellungen an ihren Geräten nicht vornehmen zu können. Technische Kompetenz ist also keineswegs flächendeckend vorhanden.\n\nDie zweite Dimension ist die informationskritische Kompetenz. Das ist die Fähigkeit, Informationen zu bewerten, Quellen zu prüfen und Desinformation zu erkennen. Dies ist vielleicht die dringlichste Aufgabe unserer Zeit. Das Reuters Institute Digital News Report 2024 zeigt, dass nur 23 Prozent der deutschen Bevölkerung angeben, regelmäßig die Quellen von Nachrichtenmeldungen zu überprüfen. Das ist erschreckend niedrig, wenn man bedenkt, welche Konsequenzen das für demokratische Meinungsbildung hat.\n\nEin zentrales Problem dabei sind algorithmische Filterblasen. Plattformen wie Facebook, TikTok oder YouTube zeigen uns primär Inhalte, die unsere bestehenden Überzeugungen bestätigen. Das führt zu einer Fragmentierung des öffentlichen Diskurses, bei der verschiedene gesellschaftliche Gruppen buchstäblich in unterschiedlichen Informationsrealitäten leben.\n\nDie dritte Dimension ist die kommunikative Kompetenz: die Fähigkeit, sich in digitalen Räumen verantwortungsvoll auszudrücken, andere zu respektieren und Konflikte produktiv zu lösen. Das umfasst auch den Umgang mit Hate Speech und Cybermobbing — Phänomene, mit denen laut einer JIM-Studie 2024 über 40 Prozent der Jugendlichen bereits Erfahrungen gemacht haben.\n\nDie vierte und vielleicht anspruchsvollste Dimension ist die kreative Kompetenz: die Fähigkeit, selbst digitale Inhalte zu produzieren und damit aktiv an der digitalen Gesellschaft teilzuhaben — nicht nur als Konsumenten, sondern als Produzenten. Das können Podcasts sein, Videoformate, Blogs oder auch Programmiercode.\n\nNun zur bildungspolitischen Dimension. Was bedeutet das alles für Schule und Hochschule? In Deutschland ist die Situation nach wie vor unbefriedigend. Der Digitalpakt Schule, 2019 mit fünf Milliarden Euro ausgestattet, hat zwar Infrastruktur geschaffen — Tablets, WLAN, interaktive Tafeln. Aber Infrastruktur allein schafft keine Medienkompetenz. Eine Metastudie der Bertelsmann-Stiftung aus dem Jahr 2023 kommt zum Schluss, dass der entscheidende Faktor nicht die verfügbare Technologie ist, sondern die Qualität der Lehrerfortbildung.\n\nFinland gilt in diesem Kontext als internationales Vorbild. Dort ist Medienkompetenz seit 2016 fächerübergreifendes Unterrichtsprinzip — nicht als eigenes Fach, sondern als integraler Bestandteil des gesamten Curriculums. Die Ergebnisse sind beeindruckend: Finnische Schülerinnen und Schüler erzielen in internationalen Tests zur Informationsbewertung regelmäßig Spitzenwerte.\n\nWas lässt sich daraus ableiten? Meine These lautet: Medienkompetenz kann nicht in einzelnen Medienkundesunden gelehrt werden. Sie muss als Querschnittskompetenz in alle Fächer integriert werden — und sie muss mit kritischem Denken verbunden sein. Das ist die eigentliche Herausforderung für das Bildungssystem des 21. Jahrhunderts.\n\nVielen Dank. Die Diskussion ist offen.",
    "note_form": [
      {
        "number": 1,
        "sentence_before": "Begriff ''Medienkompetenz'': geprägt von",
        "blank": "",
        "sentence_after": "in den 1970er Jahren."
      },
      {
        "number": 2,
        "sentence_before": "Laut ARD/ZDF-Onlinestudie 2024 nutzen",
        "blank": "",
        "sentence_after": "der Deutschen das Internet täglich."
      },
      {
        "number": 3,
        "sentence_before": "Medienkompetenz gilt heute als",
        "blank": "",
        "sentence_after": "— vergleichbar mit Lesen und Schreiben."
      },
      {
        "number": 4,
        "sentence_before": "1. Dimension: Technische Kompetenz — Problem: 34 % der",
        "blank": "",
        "sentence_after": "können Sicherheitseinstellungen nicht selbst vornehmen."
      },
      {
        "number": 5,
        "sentence_before": "2. Dimension: Informationskritische Kompetenz — laut Reuters Institute überprüfen nur",
        "blank": "",
        "sentence_after": "regelmäßig Quellen."
      },
      {
        "number": 6,
        "sentence_before": "Algorithmen erzeugen sogenannte",
        "blank": "",
        "sentence_after": ", die gesellschaftliche Gruppen voneinander isolieren."
      },
      {
        "number": 7,
        "sentence_before": "3. Dimension: Kommunikative Kompetenz — über 40 % der Jugendlichen haben laut JIM-Studie Erfahrungen mit",
        "blank": "",
        "sentence_after": "gemacht."
      },
      {
        "number": 8,
        "sentence_before": "4. Dimension: Kreative Kompetenz — Ziel ist aktive Teilhabe als",
        "blank": "",
        "sentence_after": ", nicht nur als Konsumenten."
      },
      {
        "number": 9,
        "sentence_before": "Laut Bertelsmann-Metastudie 2023 ist entscheidend nicht die Technologie, sondern",
        "blank": "",
        "sentence_after": "."
      },
      {
        "number": 10,
        "sentence_before": "Vorbild Finnland: Medienkompetenz seit 2016 als",
        "blank": "",
        "sentence_after": "in allen Fächern verankert."
      }
    ]
  }',
  '{"1": "Dieter Baacke", "2": "über 93 Prozent", "3": "Kulturtechnik", "4": "über 60-Jährigen", "5": "23 Prozent", "6": "Filterblasen", "7": "Hate Speech und Cybermobbing", "8": "Produzenten", "9": "die Qualität der Lehrerfortbildung", "10": "fächerübergreifendes Unterrichtsprinzip"}',
  'Lücke 1: "Dieter Baacke" — wird im Vortrag namentlich als Präger des Begriffs genannt. Lücke 2: "über 93 Prozent" — exakte Zahl aus der ARD/ZDF-Studie. Lücke 3: "Kulturtechnik" — expliziter Vergleich mit Lesen und Schreiben. Lücke 4: "über 60-Jährigen" — die genannte Altersgruppe. Lücke 5: "23 Prozent" — Reuters-Zahl für Quellenprüfung. Lücke 6: "Filterblasen" — Fachbegriff aus dem Vortrag. Lücke 7: "Hate Speech und Cybermobbing" — beide Begriffe aus der JIM-Studie-Passage. Lücke 8: "Produzenten" — Gegensatz zu Konsumenten. Lücke 9: "die Qualität der Lehrerfortbildung" — Kern der Bertelsmann-Studie. Lücke 10: "fächerübergreifendes Unterrichtsprinzip" — exakte Formulierung für Finnland.',
  'Gap 1: "Dieter Baacke" — named in the lecture as the coiner of the term. Gap 2: "über 93 Prozent" — exact figure from ARD/ZDF study. Gap 3: "Kulturtechnik" — explicitly compared to reading and writing. Gap 4: "über 60-Jährigen" — the age group mentioned. Gap 5: "23 Prozent" — Reuters figure for source-checking. Gap 6: "Filterblasen" — technical term used in the lecture. Gap 7: "Hate Speech und Cybermobbing" — both terms from the JIM-study passage. Gap 8: "Produzenten" — contrast to Konsumenten. Gap 9: "die Qualität der Lehrerfortbildung" — core finding of the Bertelsmann study. Gap 10: "fächerübergreifendes Unterrichtsprinzip" — exact phrasing used for Finland.',
  3, 3
),

-- ============================================================
-- SET 2 — TEIL 1: GLOBALVERSTEHEN
-- Topic: Meinungen über Künstliche Intelligenz im Alltag
-- exercise_type: match | difficulty: 2 | sort_order: 4
-- ============================================================
(
  'listening', 'c1', 'globalverstehen', 'match', 'telc',
  'Hören: Meinungen über Künstliche Intelligenz im Alltag',
  'Listening: Opinions on Artificial Intelligence in Everyday Life',
  'Sie hören acht kurze Beiträge zum Thema Künstliche Intelligenz im Alltag. Ordnen Sie jedem Sprecher die passende Aussage zu. Zwei Aussagen passen zu keinem Sprecher.',
  'You will hear eight short contributions on the topic of artificial intelligence in everyday life. Match each speaker to the appropriate statement. Two statements do not match any speaker.',
  '{
    "topic_title": "Meinungen über Künstliche Intelligenz im Alltag",
    "speakers": [
      {
        "id": 1,
        "transcript": "Ich nutze KI täglich — für E-Mails, für Recherche, zum Zusammenfassen von langen Texten. Ehrlich gesagt, ich versteh gar nicht mehr, wie ich ohne ausgekommen bin. Aber ich mach mir keine Illusionen: Ich weiß nicht genau, wie das funktioniert, was mit meinen Daten passiert, und ob das, was mir die KI sagt, auch stimmt. Das ist... na ja, sagen wir mal, ein blinder Fleck, den ich mit mir herumtrage."
      },
      {
        "id": 2,
        "transcript": "Was mich wirklich besorgt, ist nicht die Technik selbst, sondern wer sie kontrolliert. Das sind im Moment drei, vier amerikanische Konzerne. Wenn die entscheiden, welche Informationen die KI priorisiert, welche Meinungen als ''korrekt'' gelten — das ist eine enorme Machtkonzentration. Und dagegen haben wir als europäische Gesellschaft bisher kaum ein Gegengewicht entwickelt."
      },
      {
        "id": 3,
        "transcript": "Ich unterrichte Deutsch an einem Gymnasium, und das Thema KI macht mir Sorgen. Nicht weil die Schüler faul werden — die waren auch vorher nicht alle fleißig. Sondern weil ich nicht mehr sicher bin, was eigentlich noch getestet wird. Wenn ein Schüler einen perfekten Aufsatz abgibt, der von ChatGPT stammt — was sagt das über seine Fähigkeiten? Das Bildungssystem hat auf diese Frage noch keine ehrliche Antwort."
      },
      {
        "id": 4,
        "transcript": "Als Ärztin sehe ich durchaus Potenzial — KI kann bei der Diagnostik helfen, Befunde schneller auswerten, seltene Erkrankungen früher erkennen. Aber ich bin sehr vorsichtig mit dem Begriff ''KI-Diagnose''. Die Verantwortung muss beim Arzt bleiben. Eine KI kann Muster erkennen, aber sie kann nicht sagen: Was bedeutet das für diesen Menschen, mit seiner Geschichte, seinen Ängsten, seinem Leben?"
      },
      {
        "id": 5,
        "transcript": "Ich find die ganze Aufregung ehrlich gesagt übertrieben. Jede Technologie wird erst mal als Bedrohung gesehen — das Telefon, das Fernsehen, das Internet. Und dann gewöhnt man sich dran. KI ist ein Werkzeug. Ob es gut oder schlecht eingesetzt wird, hängt vom Menschen ab, nicht von der Maschine. Diese apokalyptischen Szenarien helfen niemandem."
      },
      {
        "id": 6,
        "transcript": "Ich arbeite in der Kreativbranche, als Grafikerin, und ja, ich merk den Druck. Kunden fragen schon: Kann ich das nicht einfach mit KI machen? Manchmal können sie das. Aber ich glaube, es gibt etwas, das KI nicht kann: verstehen, warum jemand etwas fühlt, wenn er ein Bild sieht. Das ist kein sentimentales Argument — das hat wirtschaftliche Konsequenzen, auch wenn die noch nicht alle sehen."
      },
      {
        "id": 7,
        "transcript": "Ich forsche zu KI-Ethik, und was mich am meisten beschäftigt, ist das Transparenzproblem. Viele KI-Systeme sind sogenannte ''Black Boxes'' — selbst die Entwickler können nicht vollständig erklären, wie eine Entscheidung zustande kommt. Das ist in Ordnung bei einer Playlist-Empfehlung. Aber wenn KI-Systeme über Kreditvergabe, Jobbewerber oder Strafmaße entscheiden — dann ist fehlende Nachvollziehbarkeit ein rechtsstaatliches Problem."
      },
      {
        "id": 8,
        "transcript": "Meine Mutter ist 78 und lebt allein. Sie hat jetzt einen KI-Assistenten, der ihr hilft, Termine zu verwalten, Erinnerungen zu setzen, manchmal auch einfach — na ja — jemanden zum Reden zu haben. Am Anfang fand ich das seltsam. Inzwischen bin ich dankbar. Sie ist selbstständiger geworden, nicht abhängiger. Das hat meine Meinung über KI ziemlich verändert."
      }
    ],
    "statements": [
      {
        "id": "a",
        "text": "KI bietet für ältere oder vulnerable Menschen konkrete Unterstützung im Alltag, was persönliche Vorbehalte relativiert hat."
      },
      {
        "id": "b",
        "text": "Die Fähigkeit von KI, Muster zu erkennen, ersetzt nicht das menschliche Verständnis individueller Lebensumstände."
      },
      {
        "id": "c",
        "text": "Wenn KI-gestützte Entscheidungen nicht nachvollziehbar sind, entsteht ein Problem für Grundrechte und Rechtssicherheit."
      },
      {
        "id": "d",
        "text": "Technologische Neuerungen werden stets zunächst als gefährlich wahrgenommen, bevor sie selbstverständlich werden."
      },
      {
        "id": "e",
        "text": "Das Bildungssystem kann mit den aktuellen Bewertungsmaßstäben nicht mehr zuverlässig feststellen, was Schüler wirklich können."
      },
      {
        "id": "f",
        "text": "Die intensive Nutzung von KI geht mit einer kritischen Unwissenheit über deren Funktionsweise und Datenumgang einher."
      },
      {
        "id": "g",
        "text": "Die Marktmacht weniger Technologiekonzerne über KI-Systeme bedroht das europäische Gleichgewicht im Informationsraum."
      },
      {
        "id": "h",
        "text": "KI kann kreative Prozesse unterstützen, wird aber das emotionale Verständnis menschlicher Kommunikation nicht ersetzen."
      },
      {
        "id": "i",
        "text": "KI-Systeme in der Medizin sollten vollständig autonom handeln dürfen, wenn sie nachweislich bessere Diagnosen liefern."
      },
      {
        "id": "j",
        "text": "Durch den Einsatz von KI werden ganze Berufsfelder überflüssig, was kurzfristig zu massiver Arbeitslosigkeit führen wird."
      }
    ]
  }',
  '{"1": "f", "2": "g", "3": "e", "4": "b", "5": "d", "6": "h", "7": "c", "8": "a"}',
  'Sprecher 1 (Vielnutzer): nutzt KI intensiv, aber "blinder Fleck" bei Daten/Funktion → f. Sprecher 2 (Kritiker): wenige US-Konzerne kontrollieren → Machtkonzentration → g. Sprecher 3 (Lehrerin): Bildungssystem weiß nicht mehr, was getestet wird → e. Sprecher 4 (Ärztin): KI erkennt Muster, ersetzt aber nicht Verständnis des individuellen Menschen → b. Sprecher 5 (Relativierer): jede neue Technik wird als Bedrohung gesehen, KI ist nur Werkzeug → d. Sprecher 6 (Grafikerin): KI kann nicht verstehen, warum ein Bild etwas fühlen lässt → h. Sprecher 7 (Forscher): Black-Box-Problem bei rechtlich relevanten Entscheidungen → c. Sprecher 8 (Sohn/Tochter): Mutter wurde selbstständiger, Meinung verändert → a. Distraktoren: i (autonome medizinische KI — niemand sagt das) und j (Massenarbeitslosigkeit — wird nicht behauptet).',
  'Speaker 1 (heavy user): uses AI daily but has a "blind spot" on data/function → f. Speaker 2 (critic): few US corporations control AI → power concentration → g. Speaker 3 (teacher): education system can no longer test what pupils actually know → e. Speaker 4 (doctor): AI detects patterns but cannot understand individual life circumstances → b. Speaker 5 (relativiser): every technology first seen as threat, AI is just a tool → d. Speaker 6 (graphic designer): AI cannot understand why a picture evokes a feeling → h. Speaker 7 (researcher): black-box problem in legally consequential decisions → c. Speaker 8 (adult child): mother became more independent, changed opinion → a. Distractors: i (fully autonomous medical AI — nobody says that) and j (mass unemployment — not claimed).',
  2, 4
),

-- ============================================================
-- SET 2 — TEIL 2: DETAILVERSTEHEN
-- Topic: Stadtbegrünung und urbane Landwirtschaft (Radio feature)
-- exercise_type: multiple_choice | difficulty: 2 | sort_order: 5
-- ============================================================
(
  'listening', 'c1', 'detailverstehen', 'multiple_choice', 'telc',
  'Hören: Stadtbegrünung und urbane Landwirtschaft',
  'Listening: Urban Greening and Urban Agriculture',
  'Sie hören ein Radiofeature zum Thema Stadtbegrünung und urbane Landwirtschaft. Wählen Sie für jede Frage die richtige Antwort (a, b oder c).',
  'You will hear a radio feature on the topic of urban greening and urban agriculture. Choose the correct answer (a, b or c) for each question.',
  '{
    "transcript": "Moderator: Willkommen bei ''Stadt der Zukunft'', dem Podcast des Deutschlandfunks über urbane Entwicklung. Mein heutiger Gast ist Prof. Dr. Carolin Weis, Stadtplanerin an der TU Berlin und Leiterin des Forschungsprojekts ''GreenCity 2030''. Frau Professor Weis, Stadtbegrünung ist gerade in aller Munde. Ist das ein echter Trend oder eine Modeerscheinung?\n\nProf. Weis: Das ist eine berechtigte Frage. Stadtbegrünung als Schlagwort gibt es seit den 1980er Jahren. Was sich verändert hat, ist die Dringlichkeit — und damit auch die Ernsthaftigkeit, mit der Kommunen das Thema angehen. Der Hitzesommer 2022 war für viele Städte ein Wendepunkt. In Teilen von Berlin und Frankfurt wurden Temperaturen von über 42 Grad gemessen — das ist kein angenehmes Wetter mehr, das ist ein Gesundheitsrisiko. Und das macht aus Stadtbegrünung eine Frage der öffentlichen Gesundheit.\n\nModerator: Was genau versteht man unter Stadtbegrünung? Das klingt nach Blumenkästen am Fenster.\n\nProf. Weis: Na ja, da schießen Sie ein bisschen über das Ziel hinaus. Stadtbegrünung ist ein Spektrum. Am einen Ende stehen tatsächlich kleine Maßnahmen — Baumpflanzungen, begrünte Gehwege, Fassadenbegrünung. Am anderen Ende stehen systemische Projekte: die Renaturierung von Flüssen, der Rückbau von versiegelten Flächen, die Integration von Grünkorridoren in die Stadtplanung. Das Besondere ist, dass diese Maßnahmen multifunktional sind — sie kühlen, sie filtern Luft, sie schaffen Lebensraum für Artenvielfalt, sie verbessern das psychische Wohlbefinden der Stadtbewohner. Die WHO empfiehlt mindestens 9 Quadratmeter Grünfläche pro Einwohner — die meisten deutschen Großstädte liegen deutlich darunter.\n\nModerator: Und wie passt urbane Landwirtschaft in dieses Bild?\n\nProf. Weis: Das ist eine sehr interessante Erweiterung des Konzepts. Urbane Landwirtschaft bedeutet: Nahrungsmittelproduktion in der Stadt — auf Dächern, in Innenräumen, in Gemeinschaftsgärten. Das dient nicht primär der Versorgungssicherheit — die Mengen sind viel zu gering, um einen relevanten Beitrag zur Ernährung einer Stadt zu leisten. Aber das ist nicht der Hauptzweck. Urbane Landwirtschaft schafft soziale Räume, sie vermittelt Wissen über Nahrungsmittelproduktion, sie fördert gemeinschaftliches Handeln. Und sie hat eine politische Dimension: In einer Zeit, in der viele Menschen den Kontakt zur Herkunft ihrer Lebensmittel verloren haben, ist das urban farming auch eine Form von gesellschaftlichem Bewusstsein.\n\nModerator: Gibt es Städte, die da besonders weit sind?\n\nProf. Weis: Singapur ist international das bekannteste Beispiel für systemische Stadtbegrünung — und das auf engstem Raum. Die Stadt hat es geschafft, trotz extrem hoher Bebauungsdichte einen Grünanteil von über 47 Prozent der Stadtfläche zu erhalten. Das ist bemerkenswert. In Europa ist Zürich ein Vorbild: Die Stadt hat seit 2010 eine verbindliche Grünraumstrategie, mit messbaren Zielen und regelmäßigem Monitoring. Was daran bemerkenswert ist: Die Maßnahmen werden konsequent evaluiert, und wenn etwas nicht funktioniert, wird nachgesteuert.\n\nModerator: Welche Hindernisse gibt es in deutschen Städten?\n\nProf. Weis: Das größte Hindernis ist Flächenkonkurrenz. In einer wachsenden Stadt konkurrieren Wohnen, Gewerbe, Verkehr und Grün um denselben Raum — und in diesem Wettbewerb verliert Grün meistens. Hinzu kommt die Frage der Finanzierung: Begrünungsmaßnahmen erfordern Investitionen, deren Nutzen häufig langfristig und diffus ist — weniger Hitzeopfer in 20 Jahren ist politisch schwerer zu verkaufen als eine neue Straße heute. Ein weiteres Hindernis, das selten diskutiert wird, sind Eigentumsverhältnisse: Viele Flächen, die für Begrünung geeignet wären, befinden sich in privater Hand, und die Eigentümer haben keinen wirtschaftlichen Anreiz zur Begrünung.\n\nModerator: Welche Instrumente haben Kommunen, um das zu ändern?\n\nProf. Weis: Zum einen regulatorische Instrumente — Bauvorschriften, die Gründächer oder Fassadenbegrünung vorschreiben. Hamburg ist da in Deutschland am weitesten: Seit 2020 müssen Neubauten Gründächer haben, wenn die Dachfläche für eine Begrünung geeignet ist. Zum anderen finanzielle Anreize — Förderprogramme, Steuervorteile. Die EU hat hier mit dem Programm ''NaturEU'' neue Mittel bereitgestellt. Und schließlich partizipative Instrumente: Bürgerinnen und Bürger in die Planung einzubeziehen erhöht nicht nur die Akzeptanz, sondern produziert oft bessere Lösungen, weil lokales Wissen eingeflossen ist.\n\nModerator: Ein letztes Thema: Was ist mit der Hitzeinselproblematik? Hilft Begrünung wirklich?\n\nProf. Weis: Ja, die Evidenz ist eindeutig. Eine Studie der Universität Manchester hat gezeigt, dass die Oberflächentemperatur in begrünten Stadtteilen im Sommer um bis zu 8 Grad Celsius niedriger liegen kann als in vergleichbaren unbegrünten Bereichen. Das ist kein marginaler Effekt, das ist ein erheblicher Unterschied — mit direkten Konsequenzen für Hitzetote, für Energieverbrauch in der Klimaanlage, für die Lebensqualität besonders vulnerabler Bevölkerungsgruppen. Die Frage ist also nicht ob, sondern wie schnell und in welchem Umfang.\n\nModerator: Frau Professor Weis, herzlichen Dank für dieses Gespräch.\n\nProf. Weis: Sehr gerne.",
    "questions": [
      {
        "number": 55,
        "stem": "Was hat laut Prof. Weis zu einer veränderten Ernsthaftigkeit beim Thema Stadtbegrünung geführt?",
        "options": [
          {"id": "a", "text": "Neue EU-Vorschriften, die Kommunen zur Begrünung verpflichten."},
          {"id": "b", "text": "Extreme Hitzeereignisse, die Begrünung zu einer Frage der öffentlichen Gesundheit gemacht haben."},
          {"id": "c", "text": "Wachsendes Interesse der Bevölkerung an nachhaltigem Stadtleben."}
        ]
      },
      {
        "number": 56,
        "stem": "Welche Aussage trifft auf die WHO-Empfehlung zur Grünfläche zu?",
        "options": [
          {"id": "a", "text": "Deutsche Großstädte erfüllen die Empfehlung von 9 Quadratmetern pro Einwohner in der Regel."},
          {"id": "b", "text": "Die meisten deutschen Großstädte liegen unter dem empfohlenen Grünflächenwert."},
          {"id": "c", "text": "Die WHO empfiehlt mehr als 20 Quadratmeter Grünfläche pro Einwohner."}
        ]
      },
      {
        "number": 57,
        "stem": "Welche Funktion schreibt Prof. Weis der urbanen Landwirtschaft vor allem zu?",
        "options": [
          {"id": "a", "text": "Sie soll die Lebensmittelversorgung der Stadtbevölkerung wesentlich verbessern."},
          {"id": "b", "text": "Sie dient vor allem sozialen, pädagogischen und gesellschaftspolitischen Zwecken."},
          {"id": "c", "text": "Sie ist ein wirtschaftlicher Faktor, der Städten neue Einnahmen ermöglicht."}
        ]
      },
      {
        "number": 58,
        "stem": "Was hebt Prof. Weis am Ansatz der Stadt Zürich besonders hervor?",
        "options": [
          {"id": "a", "text": "Zürich hat den höchsten Grünflächenanteil aller europäischen Städte."},
          {"id": "b", "text": "Die Grünraumstrategie wird konsequent überprüft und bei Bedarf angepasst."},
          {"id": "c", "text": "Zürich finanziert seine Begrünungsmaßnahmen vollständig aus EU-Mitteln."}
        ]
      },
      {
        "number": 59,
        "stem": "Welches Hindernis für Stadtbegrünung erwähnt Prof. Weis als selten diskutiert?",
        "options": [
          {"id": "a", "text": "Der Widerstand der Bevölkerung gegen Einschränkungen des Autoverkehrs."},
          {"id": "b", "text": "Private Eigentumsverhältnisse an geeigneten Flächen ohne wirtschaftlichen Begrünungsanreiz."},
          {"id": "c", "text": "Der Mangel an Fachkräften für die Planung und Umsetzung von Begrünungsprojekten."}
        ]
      },
      {
        "number": 60,
        "stem": "Welche Maßnahme hat Hamburg laut Prof. Weis im Jahr 2020 eingeführt?",
        "options": [
          {"id": "a", "text": "Eine Pflicht zur Fassadenbegrünung für alle Gebäude im Stadtzentrum."},
          {"id": "b", "text": "Eine Pflicht zur Anlage von Gründächern bei geeigneten Neubauten."},
          {"id": "c", "text": "Ein Förderprogramm für private Eigentümer, die Grünflächen anlegen."}
        ]
      },
      {
        "number": 61,
        "stem": "Welchen Vorteil nennt Prof. Weis für die Einbeziehung der Bürger in die Planung?",
        "options": [
          {"id": "a", "text": "Sie reduziert die Kosten für aufwendige Fachgutachten erheblich."},
          {"id": "b", "text": "Sie verbessert die Lösungen durch lokales Wissen und steigert die Akzeptanz."},
          {"id": "c", "text": "Sie beschleunigt Genehmigungsverfahren und spart so wertvolle Zeit."}
        ]
      },
      {
        "number": 62,
        "stem": "Welches Ergebnis zitiert Prof. Weis aus der Studie der Universität Manchester?",
        "options": [
          {"id": "a", "text": "Begrünte Stadtteile verzeichnen im Sommer bis zu 8 Grad niedrigere Oberflächentemperaturen."},
          {"id": "b", "text": "Der Energieverbrauch für Klimaanlagen sinkt in begrünten Stadtteilen um 8 Prozent."},
          {"id": "c", "text": "In begrünten Stadtteilen sterben im Sommer 8 Prozent weniger Menschen an Hitze."}
        ]
      },
      {
        "number": 63,
        "stem": "Warum ist es laut Prof. Weis politisch schwierig, Begrünungsprojekte zu finanzieren?",
        "options": [
          {"id": "a", "text": "Der Nutzen ist oft erst langfristig erkennbar und daher schwer gegenüber anderen Projekten durchzusetzen."},
          {"id": "b", "text": "Die Bevölkerung priorisiert Begrünung nicht, weshalb es keine politische Unterstützung gibt."},
          {"id": "c", "text": "Begrünungsprojekte sind teurer als andere Infrastrukturmaßnahmen und können nicht gefördert werden."}
        ]
      },
      {
        "number": 64,
        "stem": "Was sagt Prof. Weis abschließend über den Nutzen von Begrünung gegen den Hitzeinseleffekt?",
        "options": [
          {"id": "a", "text": "Die Wirkung ist wissenschaftlich noch nicht ausreichend belegt, um politische Entscheidungen zu begründen."},
          {"id": "b", "text": "Die Evidenz ist eindeutig, und die offene Frage ist nicht ob, sondern wie schnell und in welchem Umfang."},
          {"id": "c", "text": "Die Wirkung ist marginal und sollte nicht überbewertet werden."}
        ]
      }
    ]
  }',
  '{"55": "b", "56": "b", "57": "b", "58": "b", "59": "b", "60": "b", "61": "b", "62": "a", "63": "a", "64": "b"}',
  'Frage 55: "Der Hitzesommer 2022 war für viele Städte ein Wendepunkt" / "Frage der öffentlichen Gesundheit" → b. Frage 56: "die meisten deutschen Großstädte liegen deutlich darunter" (unter 9 m²) → b. Frage 57: "nicht primär der Versorgungssicherheit" — soziale Räume, Wissen, Gemeinschaft → b. Frage 58: "konsequent evaluiert, und wenn etwas nicht funktioniert, wird nachgesteuert" → b. Frage 59: "selten diskutiert" — Eigentumsverhältnisse privater Flächen → b. Frage 60: Hamburg 2020 → Gründächer für geeignete Neubauten → b. Frage 61: "erhöht nicht nur die Akzeptanz, sondern produziert oft bessere Lösungen" → b. Frage 62: "bis zu 8 Grad Celsius niedriger" Oberflächentemperatur → a. Frage 63: "weniger Hitzeopfer in 20 Jahren ist politisch schwerer zu verkaufen als eine neue Straße heute" → langer Zeithorizont → a. Frage 64: "Evidenz ist eindeutig... nicht ob, sondern wie schnell" → b.',
  'Q55: "the summer of 2022 was a turning point" / "question of public health" → b. Q56: "most German cities fall well below" 9 m² → b. Q57: "not primarily about food security" — social spaces, education, community → b. Q58: "consistently evaluated and adjusted when something does not work" → b. Q59: "rarely discussed" — private land ownership without greening incentive → b. Q60: Hamburg 2020 → green roofs on suitable new buildings → b. Q61: "not only increases acceptance but often produces better solutions" → b. Q62: "up to 8 degrees Celsius lower" surface temperature → a. Q63: "fewer heat deaths in 20 years is harder to sell politically than a new road today" → long time horizon → a. Q64: "evidence is clear... not whether but how quickly" → b.',
  2, 5
),

-- ============================================================
-- SET 2 — TEIL 3: INFORMATIONSTRANSFER
-- Topic: Nachhaltige Mobilität der Zukunft (Presentation)
-- exercise_type: fill_in | difficulty: 3 | sort_order: 6
-- ============================================================
(
  'listening', 'c1', 'informationstransfer', 'fill_in', 'telc',
  'Hören: Nachhaltige Mobilität der Zukunft',
  'Listening: Sustainable Mobility of the Future',
  'Sie hören einen Vortrag zum Thema Nachhaltige Mobilität. Füllen Sie die Lücken in den Notizen mit den Informationen aus dem Vortrag aus (maximal 4 Wörter pro Lücke).',
  'You will hear a presentation on sustainable mobility. Fill in the gaps in the notes with information from the presentation (maximum 4 words per gap).',
  '{
    "transcript": "Guten Tag. Ich freue mich, heute im Rahmen der Stuttgarter Mobilitätskonferenz über nachhaltige Mobilität sprechen zu dürfen. Mein Name ist Jonas Reiter, ich bin Verkehrsökonom und berate die Europäische Kommission in Fragen der Mobilitätspolitik.\n\nIch möchte heute fünf Thesen vorstellen, die ich für entscheidend halte, wenn wir über die Zukunft der Mobilität in Europa reden. Lassen Sie mich mit einer Zahl beginnen, die viele überrascht: Der Verkehrssektor ist in der EU für rund 25 Prozent der gesamten Treibhausgasemissionen verantwortlich — und ist der einzige große Sektor, in dem die Emissionen seit 1990 nicht gesunken, sondern gestiegen sind. Das ist der Ausgangspunkt.\n\nErste These: Die Elektrifizierung des Individualverkehrs allein reicht nicht aus. Wir hören oft, dass das Elektroauto die Antwort ist. Und es ist ein Teil der Antwort — aber nur ein Teil. Das Problem ist: Ein Elektroauto verbraucht immer noch Fläche, es erzeugt immer noch Feinstaub aus Reifen und Bremsen, es verstopft immer noch Innenstädte. Außerdem: Der Strombedarf für eine vollständig elektrifizierte Fahrzeugflotte in Deutschland würde den aktuellen Strombedarf des gesamten Landes um etwa 30 Prozent erhöhen. Das müssen wir ehrlich mitdenken.\n\nZweite These: Der Öffentliche Verkehr muss als Rückgrat verstanden werden, nicht als Lückenbüßer. In Deutschland fahren Züge — wenn sie fahren — oft zu selten, zu unzuverlässig, und zu teuer für das, was sie bieten. Das Deutschlandticket war ein Experiment, das gezeigt hat: Wenn der Preis stimmt, steigen Menschen um. 52 Millionen verkaufte Tickets im ersten Jahr — das ist beeindruckend. Aber das Ticket allein löst das Problem nicht, wenn das Netz nicht ausgebaut wird.\n\nDritte These: Fahrrad und Mikromobilität sind unterschätzte Säulen der städtischen Mobilität. In den Niederlanden werden 27 Prozent aller Wege mit dem Fahrrad zurückgelegt. In Deutschland sind es 11 Prozent. Der Unterschied liegt nicht an der Topografie, auch nicht am Klima — der Unterschied liegt an Infrastruktur und politischer Priorität. Städte wie Kopenhagen und Utrecht haben gezeigt: Wenn Radwege sicher, durchgängig und direkt sind, nutzen Menschen sie — auch im Regen.\n\nVierte These: Wir müssen über die Kosten der Nicht-Nachhaltigkeit sprechen. Stau, Luftverschmutzung, Flächenverbrauch, Unfälle — das sind keine externen Effekte, das sind echte wirtschaftliche Kosten, die irgendwer trägt. Eine Studie des Umweltbundesamts aus 2023 beziffert den volkswirtschaftlichen Schaden des Straßenverkehrs in Deutschland auf rund 150 Milliarden Euro pro Jahr. Das sind Kosten, die wir kollektiv tragen, ohne sie zu sehen. Eine ökologische Wahrheitspreisgebung — also Kraftstoffpreise, die diese Kosten abbilden — ist politisch heiß, aber ökonomisch unvermeidbar.\n\nFünfte These: Autonomes Fahren ist kein Heilsversprechen. Ich bin kein Feind der Technologie — aber die Erwartungen sind überzogen. Studien zeigen, dass vollständig autonome Fahrzeuge in gemischten Verkehrsumgebungen frühestens in den 2040er Jahren einsatzbereit sein könnten — und selbst dann nur unter bestimmten Bedingungen. Was autonomes Fahren kurzfristig leisten kann: Sicherheit erhöhen, durch Fahrerassistenzsysteme. Das ist wertvoll. Aber es löst das Stau- und das Flächenproblem nicht.\n\nLassen Sie mich mit einer Überlegung schließen: Mobilität ist kein Selbstzweck. Menschen wollen nicht fahren — sie wollen ankommen. Sie wollen Arbeit, Familie, Freunde, Erlebnisse erreichen. Wenn wir Mobilität von diesem Ziel her denken, entstehen andere Fragen: Wie nah sind Wohnorte an Arbeitsplätzen? Wie gut ist die Nutzungsmischung in Städten? Wie können digitale Kommunikation und physische Mobilität einander ergänzen? Das ist keine Verkehrspolitik mehr — das ist Stadtplanung, Raumordnung, Wirtschaftspolitik. Und genau da liegt die eigentliche Zukunft der Mobilität.\n\nVielen Dank.",
    "note_form": [
      {
        "number": 1,
        "sentence_before": "Anteil des Verkehrssektors an EU-Treibhausgasemissionen:",
        "blank": "",
        "sentence_after": "."
      },
      {
        "number": 2,
        "sentence_before": "Besonderheit: Emissionen des Verkehrs sind seit 1990 nicht gesunken, sondern",
        "blank": "",
        "sentence_after": "."
      },
      {
        "number": 3,
        "sentence_before": "These 1: Elektroautos erhöhen den deutschen Strombedarf um ca.",
        "blank": "",
        "sentence_after": ", wenn die gesamte Flotte umgestellt wird."
      },
      {
        "number": 4,
        "sentence_before": "These 2: Beim Deutschlandticket wurden im ersten Jahr",
        "blank": "",
        "sentence_after": "verkauft."
      },
      {
        "number": 5,
        "sentence_before": "These 3: In den Niederlanden werden",
        "blank": "",
        "sentence_after": "aller Wege mit dem Fahrrad zurückgelegt."
      },
      {
        "number": 6,
        "sentence_before": "Fahrradanteil in Deutschland:",
        "blank": "",
        "sentence_after": "aller Wege."
      },
      {
        "number": 7,
        "sentence_before": "Der Hauptunterschied zwischen Deutschland und den Niederlanden beim Fahrradnutzung liegt laut Vortrag an",
        "blank": "",
        "sentence_after": "."
      },
      {
        "number": 8,
        "sentence_before": "These 4: Volkswirtschaftlicher Schaden des Straßenverkehrs in Deutschland laut Umweltbundesamt 2023:",
        "blank": "",
        "sentence_after": "pro Jahr."
      },
      {
        "number": 9,
        "sentence_before": "These 5: Vollständig autonome Fahrzeuge in gemischtem Verkehr sind frühestens",
        "blank": "",
        "sentence_after": "einsatzbereit."
      },
      {
        "number": 10,
        "sentence_before": "Kernerkenntnis: Menschen wollen nicht fahren, sie wollen",
        "blank": "",
        "sentence_after": "."
      }
    ]
  }',
  '{"1": "rund 25 Prozent", "2": "gestiegen", "3": "30 Prozent", "4": "52 Millionen Tickets", "5": "27 Prozent", "6": "11 Prozent", "7": "Infrastruktur und politischer Priorität", "8": "rund 150 Milliarden Euro", "9": "in den 2040er Jahren", "10": "ankommen"}',
  'Lücke 1: "rund 25 Prozent" — explizit genannte Zahl. Lücke 2: "gestiegen" — Verkehr ist einziger großer Sektor mit steigenden Emissionen. Lücke 3: "30 Prozent" — Strombedarf bei vollständiger Elektrifizierung. Lücke 4: "52 Millionen Tickets" — Verkaufszahl im ersten Jahr des Deutschlandtickets. Lücke 5: "27 Prozent" — Fahrradanteil Niederlande. Lücke 6: "11 Prozent" — Fahrradanteil Deutschland. Lücke 7: "Infrastruktur und politischer Priorität" — beide Faktoren werden genannt. Lücke 8: "rund 150 Milliarden Euro" — Umweltbundesamt-Studie 2023. Lücke 9: "in den 2040er Jahren" — frühester Einsatzzeitpunkt für vollständige Autonomie. Lücke 10: "ankommen" — zentrales Zitat am Schluss.',
  'Gap 1: "rund 25 Prozent" — explicitly stated figure. Gap 2: "gestiegen" — transport is the only major sector with rising emissions. Gap 3: "30 Prozent" — electricity demand increase under full electrification. Gap 4: "52 Millionen Tickets" — sales in the first year of the Deutschlandticket. Gap 5: "27 Prozent" — cycling share in the Netherlands. Gap 6: "11 Prozent" — cycling share in Germany. Gap 7: "Infrastruktur und politischer Priorität" — both factors are named. Gap 8: "rund 150 Milliarden Euro" — Umweltbundesamt 2023 figure. Gap 9: "in den 2040er Jahren" — earliest deployment of full autonomy in mixed traffic. Gap 10: "ankommen" — central quote at the close of the presentation.',
  3, 6
);
