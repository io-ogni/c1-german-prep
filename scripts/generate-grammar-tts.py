#!/usr/bin/env python3
"""Generate German TTS mp3s for NV-Verbindungen and Präpositionen example sentences."""

import json
import base64
import os
import subprocess
import urllib.request

PROJECT = "german-app-490611"
VOICE = "de-DE-Neural2-D"  # Male Neural2 voice
RATE = 0.95

def get_token():
    return subprocess.check_output(["gcloud", "auth", "print-access-token"]).decode().strip()

def synthesize(text, outfile, token):
    if os.path.exists(outfile):
        return "skip"
    body = json.dumps({
        "input": {"text": text},
        "voice": {"languageCode": "de-DE", "name": VOICE},
        "audioConfig": {"audioEncoding": "MP3", "speakingRate": RATE}
    }).encode()
    req = urllib.request.Request(
        "https://texttospeech.googleapis.com/v1/text:synthesize",
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "x-goog-user-project": PROJECT,
        }
    )
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read())
    audio = base64.b64decode(data["audioContent"])
    os.makedirs(os.path.dirname(outfile), exist_ok=True)
    with open(outfile, "wb") as f:
        f.write(audio)
    return "ok"

# ─── NV-Verbindungen examples ───

NV_EXAMPLES = [
    "Wir müssen bis Freitag eine Entscheidung über das Budget treffen.",
    "Die Lobbyisten versuchen, Einfluss auf die Gesetzgebung zu nehmen.",
    "Dabei spielt die finanzielle Situation eine entscheidende Rolle.",
    "Jeder Absolvent muss eine Wahl zwischen Karriere und Weiterbildung treffen.",
    "Die Gewerkschaften üben starken Druck auf die Arbeitgeber aus.",
    "Letztlich gab die Erfahrung des Bewerbers den Ausschlag.",
    "Der Vorstand hat einen Beschluss über die Umstrukturierung gefasst.",
    "Die Ministerin nahm öffentlich Stellung zu den Vorwürfen.",
    "Mehrere Anwohner erhoben Einwände gegen das Bauprojekt.",
    "Man muss Rücksicht auf die Bedürfnisse aller Beteiligten nehmen.",
    "Wir sollten ein offenes Gespräch über die Projektziele führen.",
    "Ich möchte Bezug auf Ihren letzten Vorschlag nehmen.",
    "Dieses Problem muss in der nächsten Sitzung zur Sprache gebracht werden.",
    "Das Amt gibt Auskunft über die geltenden Regelungen.",
    "Darf ich einen konkreten Vorschlag zur Verbesserung machen?",
    "Unser Unternehmen legt großen Wert auf transparente Kommunikation.",
    "Die Studie wirft grundlegende Fragen zur Methodik auf.",
    "Beide Parteien erheben Anspruch auf das Grundstück.",
    "Der Anwalt brachte einen überzeugenden Einwand gegen das Gutachten vor.",
    "Die Projektleiterin erstattete Bericht über den aktuellen Stand.",
    "Jeder Mitarbeiter kann einen wichtigen Beitrag zum Projekterfolg leisten.",
    "Sie können diesen Service kostenlos in Anspruch nehmen.",
    "Als Teamleiter müssen Sie die Verantwortung für das Ergebnis übernehmen.",
    "Die neue Mitarbeiterin nimmt ihre Aufgaben sehr gewissenhaft wahr.",
    "Der Kunde hat uns einen umfangreichen Auftrag erteilt.",
    "Im Auslandspraktikum konnte sie wertvolle Erfahrungen sammeln.",
    "Im Juni legt sie die telc C1-Prüfung ab.",
    "Ihre Arbeit hat international Anerkennung gefunden.",
    "Sie müssen einen schriftlichen Antrag auf Förderung stellen.",
    "Der Geschäftsführer muss vor dem Aufsichtsrat Rechenschaft ablegen.",
    "Die Regierung hat eine umfassende Reform in Gang gesetzt.",
    "Er brachte seine Bedenken deutlich zum Ausdruck.",
    "Das Team hat in den letzten Wochen erhebliche Fortschritte gemacht.",
    "Die Digitalisierung hat einen tiefgreifenden Wandel in der Arbeitswelt herbeigeführt.",
    "Die Forschungsergebnisse geben wichtige Impulse für die Praxis.",
    "Die Bürgerinitiative hat eine breite Diskussion in Bewegung gesetzt.",
    "Aufgrund der Marktlage müssen wir Anpassungen an unserer Strategie vornehmen.",
    "Die neuen Maßnahmen beginnen allmählich ihre Wirkung zu entfalten.",
    "Das Start-up hat mit seinem Geschäftsmodell einen neuen Trend gesetzt.",
    "Die Sparmaßnahmen hatten massive Stellenkürzungen zur Folge.",
    "Experten stellen die Wirksamkeit dieser Maßnahme in Frage.",
    "Die Stadt muss dringend Maßnahmen gegen die Luftverschmutzung ergreifen.",
    "Nur eine strukturelle Veränderung kann hier Abhilfe schaffen.",
    "Die neue Regelung bereitet kleinen Unternehmen erhebliche Schwierigkeiten.",
    "Wir müssen gemeinsam eine tragfähige Lösung für dieses Problem finden.",
    "Unternehmer müssen bereit sein, kalkulierte Risiken einzugehen.",
    "Mehrere Experten äußerten Bedenken hinsichtlich der Datensicherheit.",
    "Im Assessment-Center konnte er seine Führungsqualitäten unter Beweis stellen.",
    "Pendler nehmen lange Fahrzeiten in Kauf, um günstiger zu wohnen.",
    "Nach dem Skandal musste die Geschäftsführung Konsequenzen ziehen.",
    "Das neue Gesetz tritt am 1. Januar in Kraft.",
    "Die Staatsanwaltschaft hat Anklage gegen den Verdächtigen erhoben.",
    "Alle Betriebe müssen die geltenden Hygienevorschriften einhalten.",
    "Das Parlament hat ein neues Klimaschutzgesetz verabschiedet.",
    "Die beiden Firmen haben einen langfristigen Kooperationsvertrag abgeschlossen.",
    "Das Gericht wird nächste Woche ein Urteil in diesem Fall fällen.",
    "Das Opfer erstattete Anzeige bei der Polizei.",
    "Das Unternehmen hat wiederholt gegen das Arbeitsschutzgesetz verstoßen.",
    "Gegen den Bescheid können Sie innerhalb von 14 Tagen Widerspruch einlegen.",
    "Die Behörde hat die Baugenehmigung erteilt.",
    "Man sollte auch alternative Lösungen in Betracht ziehen.",
    "Die Opposition übt scharfe Kritik an der Regierungspolitik.",
    "Ich hege erhebliche Zweifel an der Durchführbarkeit dieses Plans.",
    "Die Ergebnisse müssen einer kritischen Prüfung unterzogen werden.",
    "Nach einem Jahr ist es Zeit, Bilanz über die Ergebnisse zu ziehen.",
    "Die Forscher kamen zu dem Schluss, dass die Hypothese bestätigt wurde.",
    "Ich vertrete die Auffassung, dass Prävention wirksamer ist als Strafe.",
    "Die Firma zieht eine Verlagerung des Standorts in Erwägung.",
    "Der Experte bezog klar Stellung zu den ethischen Fragen der KI.",
    "Es fällt ihr schwer, in dieser Debatte einen klaren Standpunkt einzunehmen.",
    "Diese Symptome stehen in direkter Verbindung mit dem Medikament.",
    "Die Universität stellt den Studierenden moderne Labore zur Verfügung.",
    "Es wird Zeit, die Renovierung endlich in Angriff zu nehmen.",
    "Individuelle Bedürfnisse sollten bei der Planung Berücksichtigung finden.",
    "Es ist schwierig, berufliche und private Interessen in Einklang zu bringen.",
    "Die steigende Arbeitslosigkeit steht in engem Zusammenhang mit der Automatisierung.",
    "Der Vorstand hat Kenntnis von den Beschwerden genommen.",
    "Die Dokumentation gewährt einen seltenen Einblick in die Arbeitsweise der Redaktion.",
    "Diese Theorie hat direkten Bezug zur aktuellen politischen Debatte.",
    "Die Regierung misst der Digitalisierung im Bildungswesen große Bedeutung bei.",
]

# ─── Präpositionen examples ───

PRAEP_EXAMPLES = [
    "Ich freue mich auf das Wochenende.",
    "Kleine Unternehmen sind auf staatliche Förderung angewiesen.",
    "Die Medien haben großen Einfluss auf die öffentliche Meinung.",
    "Meine Kritik bezieht sich auf die mangelnde Transparenz.",
    "Achten Sie auf die korrekte Verwendung der Präpositionen.",
    "Viele Pendler verzichten zugunsten der Umwelt auf das Auto.",
    "Der Bericht weist auf erhebliche Mängel im Bildungssystem hin.",
    "Sie ist stolz auf ihre beruflichen Erfolge.",
    "Jeder Arbeitnehmer hat Anspruch auf bezahlten Urlaub.",
    "Ich bin gespannt auf die Ergebnisse der Umfrage.",
    "Man gewöhnt sich schnell an die neue Umgebung.",
    "Ich erinnere mich gut an mein erstes Vorstellungsgespräch.",
    "Wir glauben an den Erfolg dieses Konzepts.",
    "Denken Sie bitte an die Abgabefrist.",
    "An der Konferenz haben über 200 Personen teilgenommen.",
    "Das Unternehmen zeigt großes Interesse an einer Zusammenarbeit.",
    "Immer mehr Beschäftigte leiden an Burnout.",
    "Niemand zweifelt an seiner fachlichen Kompetenz.",
    "Das Team arbeitet intensiv an einer neuen Version der Software.",
    "In vielen Branchen herrscht ein akuter Mangel an Fachkräften.",
    "Die Anwohner beschweren sich über den Baulärm.",
    "Das Unternehmen verfügt über ausreichend finanzielle Mittel.",
    "Ich denke schon lange über einen Berufswechsel nach.",
    "Die Medien berichten ausführlich über die Klimakonferenz.",
    "Informieren Sie sich rechtzeitig über die Zulassungsbedingungen.",
    "Die Zentrale hat die volle Kontrolle über alle regionalen Standorte.",
    "Er ärgert sich über die ständigen Verspätungen im Nahverkehr.",
    "Im Seminar diskutieren wir über aktuelle gesellschaftliche Entwicklungen.",
    "Ich bin erstaunt über die Geschwindigkeit der technologischen Entwicklung.",
    "Sie setzt sich seit Jahren für den Umweltschutz ein.",
    "Wer ist verantwortlich für die Budgetplanung?",
    "Immer mehr junge Menschen interessieren sich für nachhaltige Berufe.",
    "Die Mehrheit hat sich für den Vorschlag der Geschäftsführung entschieden.",
    "Wir bitten um Verständnis für die Unannehmlichkeiten.",
    "Dieses Verhaltensmuster ist typisch für hierarchische Organisationen.",
    "Ich bin Ihnen sehr dankbar für Ihre Unterstützung.",
    "Dieses Format eignet sich besonders für interaktive Workshops.",
    "Ein abgeschlossenes Studium ist Voraussetzung für diese Position.",
    "In meiner Masterarbeit beschäftige ich mich mit künstlicher Intelligenz.",
    "Der Umsatzrückgang hängt mit der wirtschaftlichen Lage zusammen.",
    "Die Kunden sind insgesamt zufrieden mit dem Service.",
    "Wir müssen mit einer Verzögerung von mehreren Wochen rechnen.",
    "Man muss sich kritisch mit den Ergebnissen auseinandersetzen.",
    "Sind Sie vertraut mit agilen Projektmanagement-Methoden?",
    "Lassen Sie uns mit einer kurzen Bestandsaufnahme beginnen.",
    "Haben Sie Erfahrung mit internationalen Projekten?",
    "Die Ergebnisse stimmen mit unseren Erwartungen überein.",
    "Der Erfolg hängt von mehreren Faktoren ab.",
    "Ich bin von der Qualität dieses Produkts überzeugt.",
    "Wir gehen von einer positiven Marktentwicklung aus.",
    "Beide Seiten können von dieser Kooperation profitieren.",
    "Besonders kleine Betriebe sind von der Krise betroffen.",
    "Das Publikum war begeistert von der Aufführung.",
    "Die Leitung hatte keine Kenntnis von den Verstößen.",
    "Die Firma bemüht sich um eine bessere Work-Life-Balance.",
    "In diesem Artikel geht es um die Zukunft der Arbeit.",
    "Es handelt sich um eine weitreichende strukturelle Veränderung.",
    "Wer kümmert sich um die Einarbeitung der neuen Kollegin?",
    "Ich bitte um eine kurze Rückmeldung bis Ende der Woche.",
    "Sie bewirbt sich um eine Stelle als Projektmanagerin.",
    "Die Sorge um den Arbeitsplatz belastet viele Beschäftigte.",
    "Viele Menschen fürchten sich vor den Folgen der Digitalisierung.",
    "Experten warnen vor den Risiken dieser Technologie.",
    "Die Impfung schützt vor schweren Krankheitsverläufen.",
    "Die Angst vor dem Versagen blockiert viele Studierende.",
    "Ich habe großen Respekt vor dieser Leistung.",
    "Man sollte sich vor voreiligen Schlüssen hüten.",
    "Jeder kann zur Verbesserung des Arbeitsklimas beitragen.",
    "Sind Sie bereit zu einem Kompromiss?",
    "Die Maßnahmen haben zu einer deutlichen Verbesserung geführt.",
    "Menschen neigen dazu, kurzfristige Lösungen zu bevorzugen.",
    "Die Fähigkeit zu kritischem Denken ist eine Schlüsselkompetenz.",
    "Für diese Position erwarten wir Bereitschaft zu gelegentlichen Dienstreisen.",
    "Ist das Team in der Lage, den Termin einzuhalten?",
    "Nach einem langen Winter sehnt man sich nach der Sonne.",
    "Der Journalist fragte nach den Gründen für die Entscheidung.",
    "Das Unternehmen strebt nach Marktführerschaft im Bereich E-Mobilität.",
    "Es besteht ein wachsender Bedarf nach qualifizierten IT-Fachkräften.",
    "Die Vergütung richtet sich nach Erfahrung und Qualifikation.",
    "Die Nachfrage nach nachhaltigen Produkten steigt kontinuierlich.",
    "Die Bürger wehren sich gegen den Abriss des historischen Gebäudes.",
    "Das Vorgehen verstößt gegen geltendes EU-Recht.",
    "Tausende Menschen protestierten gegen die Sparmaßnahmen.",
    "Der Widerstand gegen die Reform wächst in der Bevölkerung.",
    "Vieles spricht gegen eine kurzfristige Umsetzung.",
    "Das Team besteht aus zehn Fachleuten verschiedener Disziplinen.",
    "Daraus ergeben sich neue Möglichkeiten für die Zusammenarbeit.",
    "Die Probleme resultieren aus einer mangelhaften Planung.",
    "Welchen Schluss ziehen Sie aus diesen Ergebnissen?",
    "Sie hat sich in die Stadt und ihre Kultur verliebt.",
    "Das Vertrauen der Bürger in die Institutionen sinkt.",
    "Er vertiefte sich in die Analyse der Quartalszahlen.",
    "Die Stadt investiert massiv in den öffentlichen Nahverkehr.",
    "Das Praktikum gewährt einen wertvollen Einblick in die Branche.",
    "Die Herausforderung besteht in der praktischen Umsetzung.",
    "In diesem Punkt habe ich mich gründlich geirrt.",
    "Die beiden Ansätze unterscheiden sich in wesentlichen Punkten.",
]

if __name__ == "__main__":
    token = get_token()
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    print(f"Generating {len(NV_EXAMPLES)} NV-Verbindungen audio files...")
    for i, text in enumerate(NV_EXAMPLES):
        outfile = os.path.join(base, "src", "assets", "audio", "nv-verbindungen", f"nv-{str(i+1).zfill(2)}.mp3")
        status = synthesize(text, outfile, token)
        print(f"  [{i+1}/{len(NV_EXAMPLES)}] {status}: {text[:60]}...")

    print(f"\nGenerating {len(PRAEP_EXAMPLES)} Präpositionen audio files...")
    for i, text in enumerate(PRAEP_EXAMPLES):
        outfile = os.path.join(base, "src", "assets", "audio", "praepositionen", f"praep-{str(i+1).zfill(2)}.mp3")
        status = synthesize(text, outfile, token)
        print(f"  [{i+1}/{len(PRAEP_EXAMPLES)}] {status}: {text[:60]}...")

    print("\nDone!")
