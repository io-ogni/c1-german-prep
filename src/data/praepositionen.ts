export interface PraepItem {
  verb_or_adj: string;
  preposition: string;
  en: string;
  example: string;
  type: 'verb' | 'nomen' | 'adj';
}

export const PRAEP_CATEGORIES = [
  'auf (+Akk)',
  'an (+Akk)',
  'an (+Dat)',
  'über (+Akk)',
  'für (+Akk)',
  'mit (+Dat)',
  'von (+Dat)',
  'um (+Akk)',
  'vor (+Dat)',
  'zu (+Dat)',
  'nach (+Dat)',
  'gegen (+Akk)',
  'aus (+Dat)',
  'in (+Akk)',
  'in (+Dat)',
] as const;

export const PRAEPOSITIONEN: PraepItem[] = [
  // ═══ auf (+Akk) ═══
  { verb_or_adj: 'sich freuen auf', preposition: 'auf (+Akk)', en: 'to look forward to', example: 'Ich freue mich auf das Wochenende.', type: 'verb' },
  { verb_or_adj: 'angewiesen sein auf', preposition: 'auf (+Akk)', en: 'to be dependent on', example: 'Kleine Unternehmen sind auf staatliche Förderung angewiesen.', type: 'adj' },
  { verb_or_adj: 'Einfluss auf', preposition: 'auf (+Akk)', en: 'influence on', example: 'Die Medien haben großen Einfluss auf die öffentliche Meinung.', type: 'nomen' },
  { verb_or_adj: 'sich beziehen auf', preposition: 'auf (+Akk)', en: 'to refer to', example: 'Meine Kritik bezieht sich auf die mangelnde Transparenz.', type: 'verb' },
  { verb_or_adj: 'achten auf', preposition: 'auf (+Akk)', en: 'to pay attention to', example: 'Achten Sie auf die korrekte Verwendung der Präpositionen.', type: 'verb' },
  { verb_or_adj: 'verzichten auf', preposition: 'auf (+Akk)', en: 'to do without / to forgo', example: 'Viele Pendler verzichten zugunsten der Umwelt auf das Auto.', type: 'verb' },
  { verb_or_adj: 'hinweisen auf', preposition: 'auf (+Akk)', en: 'to point out', example: 'Der Bericht weist auf erhebliche Mängel im Bildungssystem hin.', type: 'verb' },
  { verb_or_adj: 'stolz auf', preposition: 'auf (+Akk)', en: 'proud of', example: 'Sie ist stolz auf ihre beruflichen Erfolge.', type: 'adj' },
  { verb_or_adj: 'Anspruch auf', preposition: 'auf (+Akk)', en: 'entitlement to / claim to', example: 'Jeder Arbeitnehmer hat Anspruch auf bezahlten Urlaub.', type: 'nomen' },
  { verb_or_adj: 'gespannt auf', preposition: 'auf (+Akk)', en: 'curious about / eager for', example: 'Ich bin gespannt auf die Ergebnisse der Umfrage.', type: 'adj' },

  // ═══ an (+Akk) ═══
  { verb_or_adj: 'sich gewöhnen an', preposition: 'an (+Akk)', en: 'to get used to', example: 'Man gewöhnt sich schnell an die neue Umgebung.', type: 'verb' },
  { verb_or_adj: 'sich erinnern an', preposition: 'an (+Akk)', en: 'to remember', example: 'Ich erinnere mich gut an mein erstes Vorstellungsgespräch.', type: 'verb' },
  { verb_or_adj: 'glauben an', preposition: 'an (+Akk)', en: 'to believe in', example: 'Wir glauben an den Erfolg dieses Konzepts.', type: 'verb' },
  { verb_or_adj: 'denken an', preposition: 'an (+Akk)', en: 'to think of', example: 'Denken Sie bitte an die Abgabefrist.', type: 'verb' },

  // ═══ an (+Dat) ═══
  { verb_or_adj: 'teilnehmen an', preposition: 'an (+Dat)', en: 'to participate in', example: 'An der Konferenz haben über 200 Personen teilgenommen.', type: 'verb' },
  { verb_or_adj: 'Interesse an', preposition: 'an (+Dat)', en: 'interest in', example: 'Das Unternehmen zeigt großes Interesse an einer Zusammenarbeit.', type: 'nomen' },
  { verb_or_adj: 'leiden an', preposition: 'an (+Dat)', en: 'to suffer from', example: 'Immer mehr Beschäftigte leiden an Burnout.', type: 'verb' },
  { verb_or_adj: 'zweifeln an', preposition: 'an (+Dat)', en: 'to doubt', example: 'Niemand zweifelt an seiner fachlichen Kompetenz.', type: 'verb' },
  { verb_or_adj: 'arbeiten an', preposition: 'an (+Dat)', en: 'to work on', example: 'Das Team arbeitet intensiv an einer neuen Version der Software.', type: 'verb' },
  { verb_or_adj: 'Mangel an', preposition: 'an (+Dat)', en: 'lack of', example: 'In vielen Branchen herrscht ein akuter Mangel an Fachkräften.', type: 'nomen' },

  // ═══ über (+Akk) ═══
  { verb_or_adj: 'sich beschweren über', preposition: 'über (+Akk)', en: 'to complain about', example: 'Die Anwohner beschweren sich über den Baulärm.', type: 'verb' },
  { verb_or_adj: 'verfügen über', preposition: 'über (+Akk)', en: 'to have at one\'s disposal', example: 'Das Unternehmen verfügt über ausreichend finanzielle Mittel.', type: 'verb' },
  { verb_or_adj: 'nachdenken über', preposition: 'über (+Akk)', en: 'to think about', example: 'Ich denke schon lange über einen Berufswechsel nach.', type: 'verb' },
  { verb_or_adj: 'berichten über', preposition: 'über (+Akk)', en: 'to report on', example: 'Die Medien berichten ausführlich über die Klimakonferenz.', type: 'verb' },
  { verb_or_adj: 'sich informieren über', preposition: 'über (+Akk)', en: 'to inform oneself about', example: 'Informieren Sie sich rechtzeitig über die Zulassungsbedingungen.', type: 'verb' },
  { verb_or_adj: 'Kontrolle über', preposition: 'über (+Akk)', en: 'control over', example: 'Die Zentrale hat die volle Kontrolle über alle regionalen Standorte.', type: 'nomen' },
  { verb_or_adj: 'sich ärgern über', preposition: 'über (+Akk)', en: 'to be annoyed about', example: 'Er ärgert sich über die ständigen Verspätungen im Nahverkehr.', type: 'verb' },
  { verb_or_adj: 'diskutieren über', preposition: 'über (+Akk)', en: 'to discuss', example: 'Im Seminar diskutieren wir über aktuelle gesellschaftliche Entwicklungen.', type: 'verb' },
  { verb_or_adj: 'erstaunt über', preposition: 'über (+Akk)', en: 'astonished at', example: 'Ich bin erstaunt über die Geschwindigkeit der technologischen Entwicklung.', type: 'adj' },

  // ═══ für (+Akk) ═══
  { verb_or_adj: 'sich einsetzen für', preposition: 'für (+Akk)', en: 'to advocate for', example: 'Sie setzt sich seit Jahren für den Umweltschutz ein.', type: 'verb' },
  { verb_or_adj: 'verantwortlich für', preposition: 'für (+Akk)', en: 'responsible for', example: 'Wer ist verantwortlich für die Budgetplanung?', type: 'adj' },
  { verb_or_adj: 'sich interessieren für', preposition: 'für (+Akk)', en: 'to be interested in', example: 'Immer mehr junge Menschen interessieren sich für nachhaltige Berufe.', type: 'verb' },
  { verb_or_adj: 'sich entscheiden für', preposition: 'für (+Akk)', en: 'to decide in favor of', example: 'Die Mehrheit hat sich für den Vorschlag der Geschäftsführung entschieden.', type: 'verb' },
  { verb_or_adj: 'Verständnis für', preposition: 'für (+Akk)', en: 'understanding for', example: 'Wir bitten um Verständnis für die Unannehmlichkeiten.', type: 'nomen' },
  { verb_or_adj: 'typisch für', preposition: 'für (+Akk)', en: 'typical of', example: 'Dieses Verhaltensmuster ist typisch für hierarchische Organisationen.', type: 'adj' },
  { verb_or_adj: 'dankbar für', preposition: 'für (+Akk)', en: 'grateful for', example: 'Ich bin Ihnen sehr dankbar für Ihre Unterstützung.', type: 'adj' },
  { verb_or_adj: 'sich eignen für', preposition: 'für (+Akk)', en: 'to be suitable for', example: 'Dieses Format eignet sich besonders für interaktive Workshops.', type: 'verb' },
  { verb_or_adj: 'Voraussetzung für', preposition: 'für (+Akk)', en: 'prerequisite for', example: 'Ein abgeschlossenes Studium ist Voraussetzung für diese Position.', type: 'nomen' },

  // ═══ mit (+Dat) ═══
  { verb_or_adj: 'sich beschäftigen mit', preposition: 'mit (+Dat)', en: 'to deal with', example: 'In meiner Masterarbeit beschäftige ich mich mit künstlicher Intelligenz.', type: 'verb' },
  { verb_or_adj: 'zusammenhängen mit', preposition: 'mit (+Dat)', en: 'to be connected with', example: 'Der Umsatzrückgang hängt mit der wirtschaftlichen Lage zusammen.', type: 'verb' },
  { verb_or_adj: 'zufrieden mit', preposition: 'mit (+Dat)', en: 'satisfied with', example: 'Die Kunden sind insgesamt zufrieden mit dem Service.', type: 'adj' },
  { verb_or_adj: 'rechnen mit', preposition: 'mit (+Dat)', en: 'to expect / to count on', example: 'Wir müssen mit einer Verzögerung von mehreren Wochen rechnen.', type: 'verb' },
  { verb_or_adj: 'sich auseinandersetzen mit', preposition: 'mit (+Dat)', en: 'to engage critically with', example: 'Man muss sich kritisch mit den Ergebnissen auseinandersetzen.', type: 'verb' },
  { verb_or_adj: 'vertraut mit', preposition: 'mit (+Dat)', en: 'familiar with', example: 'Sind Sie vertraut mit agilen Projektmanagement-Methoden?', type: 'adj' },
  { verb_or_adj: 'beginnen mit', preposition: 'mit (+Dat)', en: 'to begin with', example: 'Lassen Sie uns mit einer kurzen Bestandsaufnahme beginnen.', type: 'verb' },
  { verb_or_adj: 'Erfahrung mit', preposition: 'mit (+Dat)', en: 'experience with', example: 'Haben Sie Erfahrung mit internationalen Projekten?', type: 'nomen' },
  { verb_or_adj: 'übereinstimmen mit', preposition: 'mit (+Dat)', en: 'to agree with / to correspond to', example: 'Die Ergebnisse stimmen mit unseren Erwartungen überein.', type: 'verb' },

  // ═══ von (+Dat) ═══
  { verb_or_adj: 'abhängen von', preposition: 'von (+Dat)', en: 'to depend on', example: 'Der Erfolg hängt von mehreren Faktoren ab.', type: 'verb' },
  { verb_or_adj: 'überzeugt von', preposition: 'von (+Dat)', en: 'convinced of', example: 'Ich bin von der Qualität dieses Produkts überzeugt.', type: 'adj' },
  { verb_or_adj: 'ausgehen von', preposition: 'von (+Dat)', en: 'to assume / to proceed from', example: 'Wir gehen von einer positiven Marktentwicklung aus.', type: 'verb' },
  { verb_or_adj: 'profitieren von', preposition: 'von (+Dat)', en: 'to profit from', example: 'Beide Seiten können von dieser Kooperation profitieren.', type: 'verb' },
  { verb_or_adj: 'betroffen von', preposition: 'von (+Dat)', en: 'affected by', example: 'Besonders kleine Betriebe sind von der Krise betroffen.', type: 'adj' },
  { verb_or_adj: 'begeistert von', preposition: 'von (+Dat)', en: 'enthusiastic about', example: 'Das Publikum war begeistert von der Aufführung.', type: 'adj' },
  { verb_or_adj: 'Kenntnis von', preposition: 'von (+Dat)', en: 'knowledge of', example: 'Die Leitung hatte keine Kenntnis von den Verstößen.', type: 'nomen' },

  // ═══ um (+Akk) ═══
  { verb_or_adj: 'sich bemühen um', preposition: 'um (+Akk)', en: 'to strive for', example: 'Die Firma bemüht sich um eine bessere Work-Life-Balance.', type: 'verb' },
  { verb_or_adj: 'es geht um', preposition: 'um (+Akk)', en: 'it\'s about', example: 'In diesem Artikel geht es um die Zukunft der Arbeit.', type: 'verb' },
  { verb_or_adj: 'sich handeln um', preposition: 'um (+Akk)', en: 'to be a matter of', example: 'Es handelt sich um eine weitreichende strukturelle Veränderung.', type: 'verb' },
  { verb_or_adj: 'sich kümmern um', preposition: 'um (+Akk)', en: 'to take care of', example: 'Wer kümmert sich um die Einarbeitung der neuen Kollegin?', type: 'verb' },
  { verb_or_adj: 'bitten um', preposition: 'um (+Akk)', en: 'to ask for', example: 'Ich bitte um eine kurze Rückmeldung bis Ende der Woche.', type: 'verb' },
  { verb_or_adj: 'sich bewerben um', preposition: 'um (+Akk)', en: 'to apply for', example: 'Sie bewirbt sich um eine Stelle als Projektmanagerin.', type: 'verb' },
  { verb_or_adj: 'Sorge um', preposition: 'um (+Akk)', en: 'concern about', example: 'Die Sorge um den Arbeitsplatz belastet viele Beschäftigte.', type: 'nomen' },

  // ═══ vor (+Dat) ═══
  { verb_or_adj: 'sich fürchten vor', preposition: 'vor (+Dat)', en: 'to be afraid of', example: 'Viele Menschen fürchten sich vor den Folgen der Digitalisierung.', type: 'verb' },
  { verb_or_adj: 'warnen vor', preposition: 'vor (+Dat)', en: 'to warn about', example: 'Experten warnen vor den Risiken dieser Technologie.', type: 'verb' },
  { verb_or_adj: 'schützen vor', preposition: 'vor (+Dat)', en: 'to protect from', example: 'Die Impfung schützt vor schweren Krankheitsverläufen.', type: 'verb' },
  { verb_or_adj: 'Angst vor', preposition: 'vor (+Dat)', en: 'fear of', example: 'Die Angst vor dem Versagen blockiert viele Studierende.', type: 'nomen' },
  { verb_or_adj: 'Respekt vor', preposition: 'vor (+Dat)', en: 'respect for', example: 'Ich habe großen Respekt vor dieser Leistung.', type: 'nomen' },
  { verb_or_adj: 'sich hüten vor', preposition: 'vor (+Dat)', en: 'to beware of', example: 'Man sollte sich vor voreiligen Schlüssen hüten.', type: 'verb' },

  // ═══ zu (+Dat) ═══
  { verb_or_adj: 'beitragen zu', preposition: 'zu (+Dat)', en: 'to contribute to', example: 'Jeder kann zur Verbesserung des Arbeitsklimas beitragen.', type: 'verb' },
  { verb_or_adj: 'bereit zu', preposition: 'zu (+Dat)', en: 'ready for / willing to', example: 'Sind Sie bereit zu einem Kompromiss?', type: 'adj' },
  { verb_or_adj: 'führen zu', preposition: 'zu (+Dat)', en: 'to lead to', example: 'Die Maßnahmen haben zu einer deutlichen Verbesserung geführt.', type: 'verb' },
  { verb_or_adj: 'neigen zu', preposition: 'zu (+Dat)', en: 'to tend towards', example: 'Menschen neigen dazu, kurzfristige Lösungen zu bevorzugen.', type: 'verb' },
  { verb_or_adj: 'Fähigkeit zu', preposition: 'zu (+Dat)', en: 'ability to', example: 'Die Fähigkeit zu kritischem Denken ist eine Schlüsselkompetenz.', type: 'nomen' },
  { verb_or_adj: 'Bereitschaft zu', preposition: 'zu (+Dat)', en: 'willingness to', example: 'Für diese Position erwarten wir Bereitschaft zu gelegentlichen Dienstreisen.', type: 'nomen' },
  { verb_or_adj: 'in der Lage sein zu', preposition: 'zu (+Dat)', en: 'to be able to', example: 'Ist das Team in der Lage, den Termin einzuhalten?', type: 'verb' },

  // ═══ nach (+Dat) ═══
  { verb_or_adj: 'sich sehnen nach', preposition: 'nach (+Dat)', en: 'to long for', example: 'Nach einem langen Winter sehnt man sich nach der Sonne.', type: 'verb' },
  { verb_or_adj: 'fragen nach', preposition: 'nach (+Dat)', en: 'to ask about', example: 'Der Journalist fragte nach den Gründen für die Entscheidung.', type: 'verb' },
  { verb_or_adj: 'streben nach', preposition: 'nach (+Dat)', en: 'to strive for', example: 'Das Unternehmen strebt nach Marktführerschaft im Bereich E-Mobilität.', type: 'verb' },
  { verb_or_adj: 'Bedarf nach', preposition: 'nach (+Dat)', en: 'need for', example: 'Es besteht ein wachsender Bedarf nach qualifizierten IT-Fachkräften.', type: 'nomen' },
  { verb_or_adj: 'sich richten nach', preposition: 'nach (+Dat)', en: 'to go by / to comply with', example: 'Die Vergütung richtet sich nach Erfahrung und Qualifikation.', type: 'verb' },
  { verb_or_adj: 'Nachfrage nach', preposition: 'nach (+Dat)', en: 'demand for', example: 'Die Nachfrage nach nachhaltigen Produkten steigt kontinuierlich.', type: 'nomen' },

  // ═══ gegen (+Akk) ═══
  { verb_or_adj: 'sich wehren gegen', preposition: 'gegen (+Akk)', en: 'to resist / to fight against', example: 'Die Bürger wehren sich gegen den Abriss des historischen Gebäudes.', type: 'verb' },
  { verb_or_adj: 'verstoßen gegen', preposition: 'gegen (+Akk)', en: 'to violate', example: 'Das Vorgehen verstößt gegen geltendes EU-Recht.', type: 'verb' },
  { verb_or_adj: 'protestieren gegen', preposition: 'gegen (+Akk)', en: 'to protest against', example: 'Tausende Menschen protestierten gegen die Sparmaßnahmen.', type: 'verb' },
  { verb_or_adj: 'Widerstand gegen', preposition: 'gegen (+Akk)', en: 'resistance against', example: 'Der Widerstand gegen die Reform wächst in der Bevölkerung.', type: 'nomen' },
  { verb_or_adj: 'sprechen gegen', preposition: 'gegen (+Akk)', en: 'to speak against', example: 'Vieles spricht gegen eine kurzfristige Umsetzung.', type: 'verb' },

  // ═══ aus (+Dat) ═══
  { verb_or_adj: 'bestehen aus', preposition: 'aus (+Dat)', en: 'to consist of', example: 'Das Team besteht aus zehn Fachleuten verschiedener Disziplinen.', type: 'verb' },
  { verb_or_adj: 'sich ergeben aus', preposition: 'aus (+Dat)', en: 'to result from', example: 'Daraus ergeben sich neue Möglichkeiten für die Zusammenarbeit.', type: 'verb' },
  { verb_or_adj: 'resultieren aus', preposition: 'aus (+Dat)', en: 'to result from', example: 'Die Probleme resultieren aus einer mangelhaften Planung.', type: 'verb' },
  { verb_or_adj: 'Schluss aus', preposition: 'aus (+Dat)', en: 'conclusion from', example: 'Welchen Schluss ziehen Sie aus diesen Ergebnissen?', type: 'nomen' },

  // ═══ in (+Akk) ═══
  { verb_or_adj: 'sich verlieben in', preposition: 'in (+Akk)', en: 'to fall in love with', example: 'Sie hat sich in die Stadt und ihre Kultur verliebt.', type: 'verb' },
  { verb_or_adj: 'Vertrauen in', preposition: 'in (+Akk)', en: 'trust in', example: 'Das Vertrauen der Bürger in die Institutionen sinkt.', type: 'nomen' },
  { verb_or_adj: 'sich vertiefen in', preposition: 'in (+Akk)', en: 'to immerse oneself in', example: 'Er vertiefte sich in die Analyse der Quartalszahlen.', type: 'verb' },
  { verb_or_adj: 'investieren in', preposition: 'in (+Akk)', en: 'to invest in', example: 'Die Stadt investiert massiv in den öffentlichen Nahverkehr.', type: 'verb' },
  { verb_or_adj: 'Einblick in', preposition: 'in (+Akk)', en: 'insight into', example: 'Das Praktikum gewährt einen wertvollen Einblick in die Branche.', type: 'nomen' },

  // ═══ in (+Dat) ═══
  { verb_or_adj: 'bestehen in', preposition: 'in (+Dat)', en: 'to consist in', example: 'Die Herausforderung besteht in der praktischen Umsetzung.', type: 'verb' },
  { verb_or_adj: 'sich irren in', preposition: 'in (+Dat)', en: 'to be mistaken about', example: 'In diesem Punkt habe ich mich gründlich geirrt.', type: 'verb' },
  { verb_or_adj: 'sich unterscheiden in', preposition: 'in (+Dat)', en: 'to differ in', example: 'Die beiden Ansätze unterscheiden sich in wesentlichen Punkten.', type: 'verb' },
];
