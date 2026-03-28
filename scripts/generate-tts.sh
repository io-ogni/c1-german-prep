#!/bin/bash
# Batch generate German TTS mp3s using Google Cloud TTS API
# Usage: ./scripts/generate-tts.sh

set -e

TOKEN=$(gcloud auth print-access-token)
OUTPUT_DIR="src/assets/audio/souveranitaet"
VOICE="de-DE-Neural2-D"  # Male German voice. Alternatives: de-DE-Neural2-C (female)

mkdir -p "$OUTPUT_DIR"

# Souveränität phrases — German sentences only
PHRASES=(
  "Irgendwie streikt meine Technik gerade. Gebt mir bitte eine Sekunde für einen Neustart."
  "Könnt ihr meinen Bildschirm sehen? Bei mir scheint die Übertragung gerade zu hängen."
  "Mein Akku verabschiedet sich gerade. Ich muss kurz das Ladekabel holen, bin gleich wieder da!"
  "Ich habe gerade massive Verbindungsprobleme. Ich schalte mal meine Kamera aus, um Bandbreite zu sparen."
  "Einen Moment bitte, ich würde den Gedanken gerne erst kurz zu Ende führen."
  "Lass mich bitte kurz ausreden, dann können wir direkt über deinen Punkt diskutieren."
  "Ich bin gleich fertig, dann gebe ich das Wort gerne an dich weiter."
  "Warte mal kurz, wir sind gerade noch bei einem anderen Thema. Wir kommen gleich auf deinen Punkt zurück."
  "Mir fehlt gerade das deutsche Wort dafür, aber im Grunde geht es darum, dass..."
  "Ich stehe gerade total auf dem Schlauch – wie heißt nochmal der Fachbegriff für...?"
  "Ich versuche gerade, das Ganze ein bisschen zu strukturieren. Gebt mir einen Moment zum Nachdenken."
  "Das ist ein komplexes Thema. Ich muss das kurz sacken lassen, bevor ich dazu etwas sage."
  "Können wir uns kurz resetten? Ich glaube, wir reden gerade aneinander vorbei."
  "Bevor wir uns in Details verlieren: Was war eigentlich die ursprüngliche Fragestellung?"
  "Ich bin gerade etwas abgehängt. Können wir kurz den Stand der Dinge zusammenfassen?"
  "Könntest du das bitte in zwei Sätzen zusammenfassen? Ich möchte sichergehen, dass wir vom Gleichen reden."
  "Das würde ich gerne machen, aber meine Kapazitäten sind für diesen Sprint bereits voll ausgelastet."
  "Das fällt eigentlich eher in den Bereich von Team X. Sollen wir das dort mal platzieren?"
  "Ich kann das gerne übernehmen, aber dann müssen wir ein anderes Ticket nach hinten schieben."
)

echo "Generating ${#PHRASES[@]} TTS files with voice $VOICE..."
echo ""

for i in "${!PHRASES[@]}"; do
  idx=$((i + 1))
  padded=$(printf "%02d" $idx)
  outfile="$OUTPUT_DIR/souveranitaet-${padded}.mp3"

  if [ -f "$outfile" ]; then
    echo "  [$padded] Already exists, skipping"
    continue
  fi

  text="${PHRASES[$i]}"
  echo "  [$padded] $text"

  # Call Google Cloud TTS
  response=$(curl -s -X POST \
    "https://texttospeech.googleapis.com/v1/text:synthesize" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -H "x-goog-user-project: german-app-490611" \
    -d "{
      \"input\": {\"text\": \"$text\"},
      \"voice\": {\"languageCode\": \"de-DE\", \"name\": \"$VOICE\"},
      \"audioConfig\": {\"audioEncoding\": \"MP3\", \"speakingRate\": 0.95}
    }")

  # Extract base64 audio and decode to mp3
  echo "$response" | python3 -c "
import sys, json, base64
data = json.load(sys.stdin)
if 'audioContent' in data:
    audio = base64.b64decode(data['audioContent'])
    with open('$outfile', 'wb') as f:
        f.write(audio)
    print('    -> Saved $outfile')
else:
    print('    -> ERROR:', data.get('error', {}).get('message', 'Unknown error'))
    sys.exit(1)
"

done

echo ""
echo "Done! Generated files in $OUTPUT_DIR/"
ls -la "$OUTPUT_DIR/"
