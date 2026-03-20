#!/usr/bin/env python3
"""Generate German TTS mp3s for Schreiben Redemittel phrases using Google Cloud TTS API (Neural2)."""

import json
import base64
import os
import subprocess
import urllib.request

PROJECT = "german-app-490611"
VOICE = "de-DE-Neural2-D"  # Male
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

# ─── Schreiben Redemittel phrases ───
# Order must match flattenRedemittelSection() in WritingPage.tsx (sequential idx per tab)

SECTIONS = {}

SECTIONS["schreiben-einleitung"] = [
    # Aktualität herstellen
    "In der heutigen Gesellschaft ist ... zu einer wichtigen Frage geworden.",
    "Heutzutage wird das Thema ... zunehmend diskutiert.",
    "Die Debatte um ... ist nach wie vor aktuell.",
    "In den letzten Jahren hat ... immer mehr an Bedeutung gewonnen.",
    "Kaum ein Thema wird derzeit so kontrovers diskutiert wie ...",
    "Angesichts der jüngsten Entwicklungen gewinnt die Frage nach ... erneut an Brisanz.",
    "Spätestens seit ... rückt ... verstärkt in den Fokus der öffentlichen Debatte.",
    "Die Tragweite dieser Problematik zeigt sich nicht zuletzt darin, dass ...",
    "In Anbetracht der gegenwärtigen Lage erscheint eine Auseinandersetzung mit ... unumgänglich.",
    "Das Thema ... hat in jüngster Zeit eine neue Dimension angenommen.",
    # Ein Problem einleiten
    "Viele Menschen und Unternehmen stoßen dabei an ihre Grenzen.",
    "Trotz zahlreicher Bemühungen bleibt ... ein ungelöstes Problem.",
    "Die Herausforderung besteht darin, dass ...",
    "Es stellt sich die grundlegende Frage, inwieweit ...",
    "Obwohl vielfach thematisiert, mangelt es nach wie vor an konkreten Lösungsansätzen.",
    "Die Kluft zwischen Anspruch und Wirklichkeit wird im Bereich ... besonders deutlich.",
    # Zum Hauptteil überleiten
    "Im Folgenden sollen die Vor- und Nachteile von ... dargelegt werden.",
    "Nachfolgend werden die wichtigsten Argumente dargestellt und mit einem Fazit abgeschlossen.",
    "Dieser Fragestellung möchte ich im Folgenden unter verschiedenen Gesichtspunkten nachgehen.",
    "Um zu einem differenzierten Urteil zu gelangen, ist es notwendig, sowohl ... als auch ... in den Blick zu nehmen.",
]

SECTIONS["schreiben-hauptteil"] = [
    # Argumente einführen
    "Ein wesentlicher Aspekt ist ...",
    "Zunächst ist festzuhalten, dass ...",
    "Ein zentrales Argument für oder gegen ... ist ...",
    "Einer der Hauptgründe für ... ist ...",
    "Als erstes sei darauf hingewiesen, dass ...",
    "Ausschlaggebend für diese Entwicklung ist vor allem ...",
    "An erster Stelle steht die Tatsache, dass ...",
    "Was besonders ins Gewicht fällt, ist ...",
    # Weitere Argumente anfügen
    "Darüber hinaus ist zu beachten, dass ...",
    "Des Weiteren sollte nicht vergessen werden, dass ...",
    "Hinzu kommt, dass ...",
    "Überdies lässt sich anführen, dass ...",
    "Ferner ist zu berücksichtigen, dass ...",
    "Nicht zuletzt spielt ... eine entscheidende Rolle.",
    "Ein damit eng verknüpfter Aspekt betrifft ...",
    "In engem Zusammenhang damit steht die Frage, ob ...",
    "Ergänzend sei angemerkt, dass ...",
    "Verstärkend wirkt sich zudem aus, dass ...",
    "Gleichsam bedeutsam ist in diesem Kontext ...",
    "Dieser Sachverhalt wird noch dadurch verstärkt, dass ...",
    # Gegenargumente einleiten
    "Dem steht jedoch gegenüber, dass ...",
    "Auf der anderen Seite muss man einräumen, dass ...",
    "Allerdings gibt es auch Schattenseiten.",
    "Kritiker wenden ein, dass ...",
    "Es darf jedoch nicht übersehen werden, dass ...",
    "Bei aller Berechtigung dieses Arguments muss man einwenden, dass ...",
    "So überzeugend dieses Argument auch klingen mag — es lässt ... außer Acht.",
    "Gleichwohl ist nicht von der Hand zu weisen, dass ...",
    "Diesen Vorteilen stehen indes gewichtige Nachteile gegenüber.",
    "Dieser Argumentation lässt sich entgegenhalten, dass ...",
    # Beispiele anführen
    "Dies lässt sich am Beispiel von ... verdeutlichen.",
    "Ein anschauliches Beispiel hierfür ist ...",
    "So zeigt sich etwa, dass ...",
    "Konkret bedeutet das: ...",
    "Exemplarisch sei hier ... angeführt.",
    "Besonders deutlich wird dies anhand von ...",
    "Wie ... eindrücklich belegt, ...",
    "Dies wird durch die Tatsache untermauert, dass ...",
]

SECTIONS["schreiben-schluss"] = [
    # Fazit ziehen
    "Zusammenfassend lässt sich feststellen, dass ...",
    "Nach Abwägung der Vor- und Nachteile lässt sich feststellen, dass ...",
    "Alles in allem zeigt sich, dass ...",
    "In der Gesamtbetrachtung überwiegen die ... gegenüber den ...",
    "Unter Berücksichtigung aller genannten Aspekte lässt sich konstatieren, dass ...",
    "Resümierend ist festzuhalten, dass ...",
    # Eigene Meinung
    "Meiner Ansicht nach ...",
    "Ich bin der Überzeugung, dass ...",
    "Meines Erachtens wäre es zielführender, ...",
    "Ich persönlich neige zu der Auffassung, dass ...",
    # Ausblick
    "Es bleibt abzuwarten, wie sich ... entwickeln wird.",
    "Schließen möchte ich mit dem Gedanken, dass ...",
    "Die Zukunft wird zeigen, ob die genannten Maßnahmen die erhoffte Wirkung entfalten.",
    "Entscheidend wird letztlich sein, inwieweit es gelingt, ...",
]

SECTIONS["schreiben-strukturen"] = [
    # Konjunktiv II für Distanz
    "Man könnte argumentieren, dass...",
    "Es ließe sich einwenden, dass...",
    "Es wäre denkbar, dass...",
    "Dem ließe sich entgegenhalten, dass...",
    "Es dürfte kaum zu bestreiten sein, dass...",
    "Man müsste sich fragen, ob...",
    # Passiv-Ersatzformen
    "... lässt sich feststellen.",
    "... ist zu berücksichtigen.",
    "... bleibt zu klären.",
    "... gilt als erwiesen.",
    "... bedarf einer genaueren Betrachtung.",
    # Funktionsverbgefüge
    "in Frage stellen statt bezweifeln",
    "zur Diskussion stehen statt diskutiert werden",
    "in Betracht ziehen statt berücksichtigen",
    "zum Ausdruck bringen statt ausdrücken",
    "Stellung nehmen zu statt seine Meinung sagen",
    "in Kauf nehmen statt akzeptieren",
]

# ─── Generate ───

if __name__ == "__main__":
    token = get_token()
    base = os.path.join(os.path.dirname(__file__), "..", "src", "assets", "audio")

    total = sum(len(v) for v in SECTIONS.values())
    done = 0

    for section, phrases in SECTIONS.items():
        for i, text in enumerate(phrases):
            idx = str(i + 1).zfill(2)
            outfile = os.path.join(base, section, f"{section}-{idx}.mp3")
            # Clean text for TTS: remove "..." placeholders, clean up
            tts_text = text.replace("...", "").replace("/ ", "oder ").replace("  ", " ").strip()
            # Remove trailing punctuation if it's just leftover
            if tts_text.endswith(","):
                tts_text = tts_text[:-1].strip()
            status = synthesize(tts_text, outfile, token)
            done += 1
            print(f"[{done}/{total}] {status}: {section}/{section}-{idx}.mp3")

    print(f"\nDone! Generated audio for {total} phrases across {len(SECTIONS)} sections.")
