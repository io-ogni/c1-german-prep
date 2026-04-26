import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

export default function NutzungsbedingungenPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <Button variant="ghost" size="sm" onClick={() => navigate(auth?.user ? '/home' : '/')}>
        <ArrowLeft className="h-4 w-4 mr-1" /> {auth?.user ? 'Startseite' : 'Back to home'}
      </Button>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <FileText className="h-7 w-7" />
          Nutzungsbedingungen
        </h1>
        <p className="text-sm text-muted-foreground">Stand: April 2026</p>
      </div>

      <div className="space-y-8 text-sm text-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Geltungsbereich</h2>
          <p>
            Diese Nutzungsbedingungen gelten für die Nutzung der Web-App „C1 Werkstatt"
            (erreichbar unter c1-deutsch.ioana-ognibeni.eu), betrieben von Ioana Ognibeni.
            Mit der Registrierung akzeptierst du diese Bedingungen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. Leistungsbeschreibung</h2>
          <p>
            C1 Werkstatt ist eine kostenlose Web-App zur Vorbereitung auf die telc Deutsch C1 Prüfung.
            Sie bietet interaktive Übungen zu Wortschatz, Grammatik, Lesen, Hören, Schreiben und Sprechen
            sowie einen Bereich für IT-Fachsprache.
          </p>
          <p>
            Die App ist ein Lernwerkzeug und kein Ersatz für einen Sprachkurs oder eine offizielle Prüfungsvorbereitung.
            Die Bewertung von Schreibübungen durch KI ist ein Hilfsmittel und entspricht nicht der offiziellen telc-Bewertung.
          </p>
          <p>
            Die Web-App steht in keiner geschäftlichen oder organisatorischen Verbindung zur telc gGmbH.
            „telc" ist eine geschützte Marke der telc gGmbH.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">3. Registrierung und Konto</h2>
          <p>
            Für die Nutzung ist eine Registrierung mit E-Mail-Adresse und Passwort erforderlich.
            Die Nutzung ist Personen ab 16 Jahren gestattet. Jüngere Nutzer benötigen die Zustimmung
            der Erziehungsberechtigten.
            Du bist für die Sicherheit deiner Zugangsdaten verantwortlich.
            Das Konto kann jederzeit in den Einstellungen gelöscht werden — dabei werden alle
            gespeicherten Daten unwiderruflich entfernt.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">4. API-Schlüssel</h2>
          <p>
            Für die KI-gestützte Bewertung von Schreibübungen kannst du optional einen eigenen
            API-Schlüssel hinterlegen. Dieser wird verschlüsselt gespeichert (AES-256-GCM) und
            ausschließlich für die Bewertung deiner Texte verwendet.
            Du trägst die Kosten, die durch die Nutzung deines API-Schlüssels bei dem jeweiligen Anbieter entstehen.
            Du bist dafür verantwortlich, API-Limits beim Drittanbieter so zu konfigurieren, dass keine
            unerwarteten Kosten entstehen. Die Betreiberin haftet nicht für Missbrauch oder Kosten, die
            durch eine unsachgemäße Handhabung des Schlüssels entstehen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">5. Geistiges Eigentum</h2>
          <p>
            Die Inhalte der App (Texte, Übungen, Audiodateien, Illustrationen) sind urheberrechtlich geschützt.
            Eine Vervielfältigung, Verbreitung oder anderweitige Nutzung außerhalb der App ist ohne
            ausdrückliche Genehmigung nicht gestattet.
          </p>
          <p>
            Die von dir verfassten Texte (Schreibübungen) bleiben dein geistiges Eigentum.
            Sie werden ausschließlich für die KI-Bewertung verarbeitet und nicht an Dritte weitergegeben.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">6. Verfügbarkeit</h2>
          <p>
            Die App wird als kostenloses Angebot bereitgestellt. Es besteht kein Anspruch auf
            ununterbrochene Verfügbarkeit. Die Betreiberin behält sich vor, den Dienst jederzeit
            einzuschränken, zu ändern oder einzustellen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">7. Haftungsausschluss</h2>
          <p>
            Die Nutzung der App erfolgt auf eigenes Risiko. Die Betreiberin übernimmt keine Gewähr
            für die Richtigkeit, Vollständigkeit oder Aktualität der Lerninhalte.
            Die KI-basierten Korrekturen basieren auf Wahrscheinlichkeitsmodellen und können Fehler enthalten.
            Ein Bestehen der tatsächlichen telc-Prüfung kann durch die Nutzung der App nicht garantiert werden.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">8. Datenschutz</h2>
          <p>
            Informationen zur Verarbeitung personenbezogener Daten findest du in der{' '}
            <a href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">9. Änderungen</h2>
          <p>
            Die Betreiberin behält sich vor, diese Nutzungsbedingungen jederzeit zu ändern.
            Über wesentliche Änderungen wird auf der Webseite informiert.
            Die weitere Nutzung nach Änderung gilt als Zustimmung.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">10. Anwendbares Recht</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland.
            Gerichtsstand ist Augsburg, soweit gesetzlich zulässig.
          </p>
        </section>
      </div>
    </div>
  );
}
