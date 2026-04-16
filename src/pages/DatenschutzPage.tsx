import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';

export default function DatenschutzPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <Button variant="ghost" size="sm" onClick={() => navigate(auth?.user ? '/home' : '/')}>
        <ArrowLeft className="h-4 w-4 mr-1" /> {auth?.user ? 'Startseite' : 'Back to home'}
      </Button>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Shield className="h-7 w-7" />
          Datenschutzerklärung
        </h1>
        <p className="text-sm text-muted-foreground">Stand: April 2026</p>
      </div>

      <div className="space-y-8 text-sm text-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Verantwortliche</h2>
          <p>
            Ioana Ognibeni<br />
            Angaben gemäß § 5 TMG finden Sie im{' '}
            <a href="https://ioana-ognibeni.eu/impressum/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Impressum</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. Welche Daten werden erhoben?</h2>
          <p>Diese App erhebt und verarbeitet folgende personenbezogene Daten:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Registrierung:</strong> E-Mail-Adresse, Anzeigename (optional), Passwort (verschlüsselt gespeichert, nie im Klartext)</li>
            <li><strong>Lernfortschritt:</strong> Übungsergebnisse, abgeschlossene Aufgaben, Wiederholungsintervalle für Vokabeln, Streak-Daten</li>
            <li><strong>Geschriebene Texte:</strong> Von Ihnen im Schreibbereich eingereichte Texte sowie die KI-gestützte Bewertung</li>
            <li><strong>Einstellungen:</strong> Textgröße</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">3. Analytik (PostHog)</h2>
          <p>
            Wir verwenden <a href="https://posthog.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PostHog</a> (EU-Cloud, Frankfurt) für anonyme Nutzungsanalysen.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Keine Cookies — die anonyme ID wird in localStorage gespeichert</li>
            <li>Keine Weitergabe an Dritte</li>
            <li>Keine Aufzeichnung von Tastatureingaben oder persönlichen Daten</li>
            <li>Session Recording ist auf sensiblen Seiten (Login, Registrierung, Einstellungen, Passwort, Schreiben) deaktiviert</li>
            <li>Alle Eingabefelder sind von der Aufzeichnung ausgeschlossen</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">4. Fehlerverfolgung (Sentry)</h2>
          <p>
            Wir verwenden <a href="https://sentry.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Sentry</a> (EU, Deutschland) zur Erkennung von technischen Fehlern.
            Bei einem Fehler werden technische Informationen (Browser, Betriebssystem, Fehlermeldung) übermittelt — keine personenbezogenen Daten.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">5. Wo werden die Daten gespeichert?</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Supabase</strong> (Irland, EU) — Datenbank, Authentifizierung, Dateispeicherung</li>
            <li><strong>PostHog</strong> (Frankfurt, EU) — Anonyme Analytik</li>
            <li><strong>Sentry</strong> (Deutschland, EU) — Fehlerverfolgung</li>
            <li><strong>GitHub Pages</strong> (USA) — Hosting der statischen App-Dateien (kein Zugriff auf Nutzerdaten)</li>
          </ul>
          <p>Alle Dienste, die personenbezogene Daten verarbeiten, befinden sich innerhalb der EU.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">6. Verschlüsselung und Sicherheit</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>API-Schlüssel werden mit AES-256-GCM verschlüsselt gespeichert</li>
            <li>Row-Level Security (RLS) auf allen Datenbanktabellen — jeder Nutzer sieht nur seine eigenen Daten</li>
            <li>Passwörter werden mit bcrypt gehasht</li>
            <li>HTTPS-Verschlüsselung für alle Verbindungen</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">7. localStorage</h2>
          <p>Die App verwendet den lokalen Speicher Ihres Browsers (localStorage) für:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Markierte Vokabeln und Phrasen (werden beim Login mit der Datenbank synchronisiert)</li>
            <li>Anonyme PostHog-ID</li>
            <li>UI-Einstellungen (Textgröße, zuletzt angemeldeter Nutzer)</li>
            <li>Onboarding-Status</li>
          </ul>
          <p>Es werden keine Cookies gesetzt.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">8. Ihre Rechte</h2>
          <p>Sie haben jederzeit das Recht auf:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Auskunft</strong> — welche Daten über Sie gespeichert sind</li>
            <li><strong>Berichtigung</strong> — fehlerhafte Daten korrigieren lassen</li>
            <li><strong>Löschung</strong> — Ihr Konto und alle zugehörigen Daten vollständig löschen (unter <Link to="/settings" className="text-primary hover:underline">Einstellungen</Link>)</li>
            <li><strong>Widerspruch</strong> — der Datenverarbeitung widersprechen</li>
          </ul>
          <p>
            Kontakt: Schreiben Sie an die im{' '}
            <a href="https://ioana-ognibeni.eu/impressum/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Impressum</a>{' '}
            angegebene E-Mail-Adresse.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">9. Kontolöschung</h2>
          <p>
            Sie können Ihr Konto jederzeit unter{' '}
            <Link to="/settings" className="text-primary hover:underline">Einstellungen → Konto löschen</Link>{' '}
            vollständig löschen. Dabei werden alle Ihre Daten unwiderruflich entfernt:
            Profil, Lernfortschritt, Vokabeln, geschriebene Texte, und alle lokalen Daten im Browser.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">10. Änderungen</h2>
          <p>
            Diese Datenschutzerklärung kann bei Bedarf aktualisiert werden.
            Das Datum oben zeigt den Stand der letzten Aktualisierung.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t pt-6 text-center text-xs text-muted-foreground space-y-1">
        <p>
          <a href="https://ioana-ognibeni.eu/impressum/" target="_blank" rel="noopener noreferrer" className="hover:underline">Impressum</a>
          <span className="mx-2 text-muted-foreground/30">·</span>
          <Link to="/about" className="hover:underline">About</Link>
        </p>
        <p className="italic text-muted-foreground/60">telc is a registered trademark of telc gGmbH. This app is not affiliated with or endorsed by telc gGmbH.</p>
      </div>
    </div>
  );
}
