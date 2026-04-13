export interface NVVerbindung {
  de: string;
  en: string;
  example: string;
  category: string;
}

export const NV_CATEGORIES = [
  'Entscheidungen & Einfluss',
  'Kommunikation',
  'Arbeit & Leistung',
  'Veränderung & Entwicklung',
  'Probleme & Lösungen',
  'Recht & Regeln',
  'Bewertung & Meinung',
  'Zustand & Beziehung',
] as const;

export const NV_VERBINDUNGEN: NVVerbindung[] = [
  // ═══ Entscheidungen & Einfluss ═══
  { de: 'eine Entscheidung treffen', en: 'to make a decision', example: 'Wir müssen bis Freitag eine Entscheidung über das Budget treffen.', category: 'Entscheidungen & Einfluss' },
  { de: 'Einfluss nehmen auf', en: 'to exert influence on', example: 'Die Lobbyisten versuchen, Einfluss auf die Gesetzgebung zu nehmen.', category: 'Entscheidungen & Einfluss' },
  { de: 'eine Rolle spielen', en: 'to play a role', example: 'Dabei spielt die finanzielle Situation eine entscheidende Rolle.', category: 'Entscheidungen & Einfluss' },
  { de: 'eine Wahl treffen', en: 'to make a choice', example: 'Jeder Absolvent muss eine Wahl zwischen Karriere und Weiterbildung treffen.', category: 'Entscheidungen & Einfluss' },
  { de: 'Druck ausüben auf', en: 'to put pressure on', example: 'Die Gewerkschaften üben starken Druck auf die Arbeitgeber aus.', category: 'Entscheidungen & Einfluss' },
  { de: 'den Ausschlag geben', en: 'to be the deciding factor', example: 'Letztlich gab die Erfahrung des Bewerbers den Ausschlag.', category: 'Entscheidungen & Einfluss' },
  { de: 'einen Beschluss fassen', en: 'to pass a resolution', example: 'Der Vorstand hat einen Beschluss über die Umstrukturierung gefasst.', category: 'Entscheidungen & Einfluss' },
  { de: 'Stellung nehmen zu', en: 'to take a position on', example: 'Die Ministerin nahm öffentlich Stellung zu den Vorwürfen.', category: 'Entscheidungen & Einfluss' },
  { de: 'Einwände erheben gegen', en: 'to raise objections against', example: 'Mehrere Anwohner erhoben Einwände gegen das Bauprojekt.', category: 'Entscheidungen & Einfluss' },
  { de: 'Rücksicht nehmen auf', en: 'to show consideration for', example: 'Man muss Rücksicht auf die Bedürfnisse aller Beteiligten nehmen.', category: 'Entscheidungen & Einfluss' },

  // ═══ Kommunikation ═══
  { de: 'ein Gespräch führen', en: 'to have a conversation', example: 'Wir sollten ein offenes Gespräch über die Projektziele führen.', category: 'Kommunikation' },
  { de: 'Bezug nehmen auf', en: 'to refer to', example: 'Ich möchte Bezug auf Ihren letzten Vorschlag nehmen.', category: 'Kommunikation' },
  { de: 'zur Sprache bringen', en: 'to bring up (a topic)', example: 'Dieses Problem muss in der nächsten Sitzung zur Sprache gebracht werden.', category: 'Kommunikation' },
  { de: 'Auskunft geben über', en: 'to provide information about', example: 'Das Amt gibt Auskunft über die geltenden Regelungen.', category: 'Kommunikation' },
  { de: 'einen Vorschlag machen', en: 'to make a suggestion', example: 'Darf ich einen konkreten Vorschlag zur Verbesserung machen?', category: 'Kommunikation' },
  { de: 'Wert legen auf', en: 'to attach importance to', example: 'Unser Unternehmen legt großen Wert auf transparente Kommunikation.', category: 'Kommunikation' },
  { de: 'eine Frage aufwerfen', en: 'to raise a question', example: 'Die Studie wirft grundlegende Fragen zur Methodik auf.', category: 'Kommunikation' },
  { de: 'Anspruch erheben auf', en: 'to lay claim to', example: 'Beide Parteien erheben Anspruch auf das Grundstück.', category: 'Kommunikation' },
  { de: 'einen Einwand vorbringen', en: 'to raise an objection', example: 'Der Anwalt brachte einen überzeugenden Einwand gegen das Gutachten vor.', category: 'Kommunikation' },
  { de: 'Bericht erstatten über', en: 'to report on', example: 'Die Projektleiterin erstattete Bericht über den aktuellen Stand.', category: 'Kommunikation' },

  // ═══ Arbeit & Leistung ═══
  { de: 'einen Beitrag leisten', en: 'to make a contribution', example: 'Jeder Mitarbeiter kann einen wichtigen Beitrag zum Projekterfolg leisten.', category: 'Arbeit & Leistung' },
  { de: 'in Anspruch nehmen', en: 'to make use of / to claim', example: 'Sie können diesen Service kostenlos in Anspruch nehmen.', category: 'Arbeit & Leistung' },
  { de: 'Verantwortung übernehmen', en: 'to take responsibility', example: 'Als Teamleiter müssen Sie die Verantwortung für das Ergebnis übernehmen.', category: 'Arbeit & Leistung' },
  { de: 'Aufgaben wahrnehmen', en: 'to carry out duties', example: 'Die neue Mitarbeiterin nimmt ihre Aufgaben sehr gewissenhaft wahr.', category: 'Arbeit & Leistung' },
  { de: 'einen Auftrag erteilen', en: 'to place an order / to commission', example: 'Der Kunde hat uns einen umfangreichen Auftrag erteilt.', category: 'Arbeit & Leistung' },
  { de: 'Erfahrungen sammeln', en: 'to gain experience', example: 'Im Auslandspraktikum konnte sie wertvolle Erfahrungen sammeln.', category: 'Arbeit & Leistung' },
  { de: 'eine Prüfung ablegen', en: 'to take an exam', example: 'Im Juni legt sie die telc C1-Prüfung ab.', category: 'Arbeit & Leistung' },
  { de: 'Anerkennung finden', en: 'to gain recognition', example: 'Ihre Arbeit hat international Anerkennung gefunden.', category: 'Arbeit & Leistung' },
  { de: 'einen Antrag stellen', en: 'to submit an application', example: 'Sie müssen einen schriftlichen Antrag auf Förderung stellen.', category: 'Arbeit & Leistung' },
  { de: 'Rechenschaft ablegen über', en: 'to account for', example: 'Der Geschäftsführer muss vor dem Aufsichtsrat Rechenschaft ablegen.', category: 'Arbeit & Leistung' },

  // ═══ Veränderung & Entwicklung ═══
  { de: 'in Gang setzen', en: 'to set in motion', example: 'Die Regierung hat eine umfassende Reform in Gang gesetzt.', category: 'Veränderung & Entwicklung' },
  { de: 'zum Ausdruck bringen', en: 'to express', example: 'Er brachte seine Bedenken deutlich zum Ausdruck.', category: 'Veränderung & Entwicklung' },
  { de: 'Fortschritte machen', en: 'to make progress', example: 'Das Team hat in den letzten Wochen erhebliche Fortschritte gemacht.', category: 'Veränderung & Entwicklung' },
  { de: 'einen Wandel herbeiführen', en: 'to bring about change', example: 'Die Digitalisierung hat einen tiefgreifenden Wandel in der Arbeitswelt herbeigeführt.', category: 'Veränderung & Entwicklung' },
  { de: 'Impulse geben', en: 'to provide impulses / stimulus', example: 'Die Forschungsergebnisse geben wichtige Impulse für die Praxis.', category: 'Veränderung & Entwicklung' },
  { de: 'in Bewegung setzen', en: 'to set in motion', example: 'Die Bürgerinitiative hat eine breite Diskussion in Bewegung gesetzt.', category: 'Veränderung & Entwicklung' },
  { de: 'Anpassungen vornehmen', en: 'to make adjustments', example: 'Aufgrund der Marktlage müssen wir Anpassungen an unserer Strategie vornehmen.', category: 'Veränderung & Entwicklung' },
  { de: 'Wirkung entfalten', en: 'to take effect / to unfold its impact', example: 'Die neuen Maßnahmen beginnen allmählich ihre Wirkung zu entfalten.', category: 'Veränderung & Entwicklung' },
  { de: 'einen Trend setzen', en: 'to set a trend', example: 'Das Start-up hat mit seinem Geschäftsmodell einen neuen Trend gesetzt.', category: 'Veränderung & Entwicklung' },
  { de: 'zur Folge haben', en: 'to result in', example: 'Die Sparmaßnahmen hatten massive Stellenkürzungen zur Folge.', category: 'Veränderung & Entwicklung' },

  // ═══ Probleme & Lösungen ═══
  { de: 'in Frage stellen', en: 'to call into question', example: 'Experten stellen die Wirksamkeit dieser Maßnahme in Frage.', category: 'Probleme & Lösungen' },
  { de: 'Maßnahmen ergreifen', en: 'to take measures', example: 'Die Stadt muss dringend Maßnahmen gegen die Luftverschmutzung ergreifen.', category: 'Probleme & Lösungen' },
  { de: 'Abhilfe schaffen', en: 'to remedy / to provide relief', example: 'Nur eine strukturelle Veränderung kann hier Abhilfe schaffen.', category: 'Probleme & Lösungen' },
  { de: 'Schwierigkeiten bereiten', en: 'to cause difficulties', example: 'Die neue Regelung bereitet kleinen Unternehmen erhebliche Schwierigkeiten.', category: 'Probleme & Lösungen' },
  { de: 'eine Lösung finden', en: 'to find a solution', example: 'Wir müssen gemeinsam eine tragfähige Lösung für dieses Problem finden.', category: 'Probleme & Lösungen' },
  { de: 'Risiken eingehen', en: 'to take risks', example: 'Unternehmer müssen bereit sein, kalkulierte Risiken einzugehen.', category: 'Probleme & Lösungen' },
  { de: 'Bedenken äußern', en: 'to express concerns', example: 'Mehrere Experten äußerten Bedenken hinsichtlich der Datensicherheit.', category: 'Probleme & Lösungen' },
  { de: 'unter Beweis stellen', en: 'to demonstrate / to prove', example: 'Im Assessment-Center konnte er seine Führungsqualitäten unter Beweis stellen.', category: 'Probleme & Lösungen' },
  { de: 'in Kauf nehmen', en: 'to accept / to put up with', example: 'Pendler nehmen lange Fahrzeiten in Kauf, um günstiger zu wohnen.', category: 'Probleme & Lösungen' },
  { de: 'Konsequenzen ziehen', en: 'to draw consequences', example: 'Nach dem Skandal musste die Geschäftsführung Konsequenzen ziehen.', category: 'Probleme & Lösungen' },

  // ═══ Recht & Regeln ═══
  { de: 'in Kraft treten', en: 'to come into effect', example: 'Das neue Gesetz tritt am 1. Januar in Kraft.', category: 'Recht & Regeln' },
  { de: 'Anklage erheben', en: 'to press charges', example: 'Die Staatsanwaltschaft hat Anklage gegen den Verdächtigen erhoben.', category: 'Recht & Regeln' },
  { de: 'Vorschriften einhalten', en: 'to comply with regulations', example: 'Alle Betriebe müssen die geltenden Hygienevorschriften einhalten.', category: 'Recht & Regeln' },
  { de: 'ein Gesetz verabschieden', en: 'to pass a law', example: 'Das Parlament hat ein neues Klimaschutzgesetz verabschiedet.', category: 'Recht & Regeln' },
  { de: 'einen Vertrag abschließen', en: 'to conclude a contract', example: 'Die beiden Firmen haben einen langfristigen Kooperationsvertrag abgeschlossen.', category: 'Recht & Regeln' },
  { de: 'ein Urteil fällen', en: 'to pass a verdict', example: 'Das Gericht wird nächste Woche ein Urteil in diesem Fall fällen.', category: 'Recht & Regeln' },
  { de: 'Anzeige erstatten', en: 'to file a report / to press charges', example: 'Das Opfer erstattete Anzeige bei der Polizei.', category: 'Recht & Regeln' },
  { de: 'gegen ein Gesetz verstoßen', en: 'to violate a law', example: 'Das Unternehmen hat wiederholt gegen das Arbeitsschutzgesetz verstoßen.', category: 'Recht & Regeln' },
  { de: 'Widerspruch einlegen', en: 'to file an objection / to appeal', example: 'Gegen den Bescheid können Sie innerhalb von 14 Tagen Widerspruch einlegen.', category: 'Recht & Regeln' },
  { de: 'eine Genehmigung erteilen', en: 'to grant permission', example: 'Die Behörde hat die Baugenehmigung erteilt.', category: 'Recht & Regeln' },

  // ═══ Bewertung & Meinung ═══
  { de: 'in Betracht ziehen', en: 'to take into consideration', example: 'Man sollte auch alternative Lösungen in Betracht ziehen.', category: 'Bewertung & Meinung' },
  { de: 'Kritik üben an', en: 'to criticize', example: 'Die Opposition übt scharfe Kritik an der Regierungspolitik.', category: 'Bewertung & Meinung' },
  { de: 'Zweifel hegen an', en: 'to have doubts about', example: 'Ich hege erhebliche Zweifel an der Durchführbarkeit dieses Plans.', category: 'Bewertung & Meinung' },
  { de: 'einer Prüfung unterziehen', en: 'to subject to examination', example: 'Die Ergebnisse müssen einer kritischen Prüfung unterzogen werden.', category: 'Bewertung & Meinung' },
  { de: 'Bilanz ziehen', en: 'to take stock', example: 'Nach einem Jahr ist es Zeit, Bilanz über die Ergebnisse zu ziehen.', category: 'Bewertung & Meinung' },
  { de: 'zum Schluss kommen', en: 'to come to a conclusion', example: 'Die Forscher kamen zu dem Schluss, dass die Hypothese bestätigt wurde.', category: 'Bewertung & Meinung' },
  { de: 'die Auffassung vertreten', en: 'to hold the view', example: 'Ich vertrete die Auffassung, dass Prävention wirksamer ist als Strafe.', category: 'Bewertung & Meinung' },
  { de: 'in Erwägung ziehen', en: 'to consider / to contemplate', example: 'Die Firma zieht eine Verlagerung des Standorts in Erwägung.', category: 'Bewertung & Meinung' },
  { de: 'Stellung beziehen zu', en: 'to take a stance on', example: 'Der Experte bezog klar Stellung zu den ethischen Fragen der KI.', category: 'Bewertung & Meinung' },
  { de: 'einen Standpunkt einnehmen', en: 'to take a standpoint', example: 'Es fällt ihr schwer, in dieser Debatte einen klaren Standpunkt einzunehmen.', category: 'Bewertung & Meinung' },

  // ═══ Zustand & Beziehung ═══
  { de: 'in Verbindung stehen', en: 'to be connected with', example: 'Diese Symptome stehen in direkter Verbindung mit dem Medikament.', category: 'Zustand & Beziehung' },
  { de: 'zur Verfügung stellen', en: 'to make available', example: 'Die Universität stellt den Studierenden moderne Labore zur Verfügung.', category: 'Zustand & Beziehung' },
  { de: 'in Angriff nehmen', en: 'to tackle / to embark on', example: 'Es wird Zeit, die Renovierung endlich in Angriff zu nehmen.', category: 'Zustand & Beziehung' },
  { de: 'Berücksichtigung finden', en: 'to be taken into account', example: 'Individuelle Bedürfnisse sollten bei der Planung Berücksichtigung finden.', category: 'Zustand & Beziehung' },
  { de: 'in Einklang bringen', en: 'to reconcile / to harmonize', example: 'Es ist schwierig, berufliche und private Interessen in Einklang zu bringen.', category: 'Zustand & Beziehung' },
  { de: 'in Zusammenhang stehen mit', en: 'to be related to', example: 'Die steigende Arbeitslosigkeit steht in engem Zusammenhang mit der Automatisierung.', category: 'Zustand & Beziehung' },
  { de: 'Kenntnis nehmen von', en: 'to take note of', example: 'Der Vorstand hat Kenntnis von den Beschwerden genommen.', category: 'Zustand & Beziehung' },
  { de: 'Einblick gewähren in', en: 'to grant insight into', example: 'Die Dokumentation gewährt einen seltenen Einblick in die Arbeitsweise der Redaktion.', category: 'Zustand & Beziehung' },
  { de: 'Bezug haben zu', en: 'to be related to / to have relevance to', example: 'Diese Theorie hat direkten Bezug zur aktuellen politischen Debatte.', category: 'Zustand & Beziehung' },
  { de: 'Bedeutung beimessen', en: 'to attach importance to', example: 'Die Regierung misst der Digitalisierung im Bildungswesen große Bedeutung bei.', category: 'Zustand & Beziehung' },
];
