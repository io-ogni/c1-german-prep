import { Link } from 'react-router-dom';

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto prose prose-sm dark:prose-invert">
      <h1>Datenschutzerklärung</h1>
      <p className="text-muted-foreground">Stand: April 2026</p>

      <h2>1. Verantwortliche</h2>
      <p>
        Ioana Ognibeni<br />
        Angaben gemäß § 5 TMG finden Sie im{' '}
        <a href="https://ioana-ognibeni.eu/impressum/" target="_blank" rel="noopener noreferrer">Impressum</a>.
      </p>

      <h2>2. Welche Daten werden erhoben?</h2>
      <p>Diese App erhebt und verarbeitet folgende personenbezogene Daten:</p>
      <ul>
        <li><strong>Registrierung:</strong> E-Mail-Adresse, Anzeigename (optional), Passwort (verschlüsselt gespeichert, nie im Klartext)</li>
        <li><strong>Lernfortschritt:</strong> Übungsergebnisse, abgeschlossene Aufgaben, Wiederholungsintervalle für Vokabeln, Streak-Daten</li>
        <li><strong>Geschriebene Texte:</strong> Von Ihnen im Schreibbereich eingereichte Texte sowie die KI-gestützte Bewertung</li>
        <li><strong>Einstellungen:</strong> Sprachpräferenz (de/en), Textgröße</li>
      </ul>

      <h2>3. Analytik (PostHog)</h2>
      <p>
        Wir verwenden <a href="https://posthog.com" target="_blank" rel="noopener noreferrer">PostHog</a> (EU-Cloud, Frankfurt) für anonyme Nutzungsanalysen.
      </p>
      <ul>
        <li>Keine Cookies — die anonyme ID wird in localStorage gespeichert</li>
        <li>Keine Weitergabe an Dritte</li>
        <li>Keine Aufzeichnung von Tastatureingaben oder persönlichen Daten</li>
        <li>Session Recording ist auf sensiblen Seiten (Login, Registrierung, Einstellungen, Passwort) deaktiviert</li>
        <li>Alle Eingabefelder sind von der Aufzeichnung ausgeschlossen (ph-no-capture)</li>
      </ul>

      <h2>4. Fehlerverfolgung (Sentry)</h2>
      <p>
        Wir verwenden <a href="https://sentry.io" target="_blank" rel="noopener noreferrer">Sentry</a> (EU, Deutschland) zur Erkennung von technischen Fehlern.
        Bei einem Fehler werden technische Informationen (Browser, Betriebssystem, Fehlermeldung) übermittelt — keine personenbezogenen Daten.
      </p>

      <h2>5. Wo werden die Daten gespeichert?</h2>
      <ul>
        <li><strong>Supabase</strong> (Irland, EU) — Datenbank, Authentifizierung, Dateispeicherung</li>
        <li><strong>PostHog</strong> (Frankfurt, EU) — Anonyme Analytik</li>
        <li><strong>Sentry</strong> (Deutschland, EU) — Fehlerverfolgung</li>
        <li><strong>GitHub Pages</strong> (USA) — Hosting der statischen App-Dateien (kein Zugriff auf Nutzerdaten)</li>
      </ul>
      <p>Alle Dienste, die personenbezogene Daten verarbeiten, befinden sich innerhalb der EU.</p>

      <h2>6. Verschlüsselung und Sicherheit</h2>
      <ul>
        <li>API-Schlüssel werden mit AES-256-GCM verschlüsselt gespeichert</li>
        <li>Row-Level Security (RLS) auf allen Datenbanktabellen — jeder Nutzer sieht nur seine eigenen Daten</li>
        <li>Passwörter werden mit bcrypt gehasht</li>
        <li>HTTPS-Verschlüsselung für alle Verbindungen</li>
      </ul>

      <h2>7. localStorage</h2>
      <p>
        Die App verwendet den lokalen Speicher Ihres Browsers (localStorage) für:
      </p>
      <ul>
        <li>Markierte Vokabeln und Phrasen (werden beim Login mit der Datenbank synchronisiert)</li>
        <li>Anonyme PostHog-ID</li>
        <li>UI-Einstellungen (Textgröße, zuletzt angemeldeter Nutzer)</li>
        <li>Onboarding-Status</li>
      </ul>
      <p>Es werden keine Cookies gesetzt.</p>

      <h2>8. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li><strong>Auskunft</strong> — welche Daten über Sie gespeichert sind</li>
        <li><strong>Berichtigung</strong> — fehlerhafte Daten korrigieren lassen</li>
        <li><strong>Löschung</strong> — Ihr Konto und alle zugehörigen Daten vollständig löschen (unter <Link to="/settings">Einstellungen</Link>)</li>
        <li><strong>Widerspruch</strong> — der Datenverarbeitung widersprechen</li>
      </ul>
      <p>
        Kontakt: Schreiben Sie an die im{' '}
        <a href="https://ioana-ognibeni.eu/impressum/" target="_blank" rel="noopener noreferrer">Impressum</a>{' '}
        angegebene E-Mail-Adresse.
      </p>

      <h2>9. Kontolöschung</h2>
      <p>
        Sie können Ihr Konto jederzeit unter{' '}
        <Link to="/settings">Einstellungen → Konto löschen</Link>{' '}
        vollständig löschen. Dabei werden alle Ihre Daten unwiderruflich entfernt:
        Profil, Lernfortschritt, Vokabeln, geschriebene Texte, und alle lokalen Daten im Browser.
      </p>

      <h2>10. Änderungen</h2>
      <p>
        Diese Datenschutzerklärung kann bei Bedarf aktualisiert werden.
        Das Datum oben zeigt den Stand der letzten Aktualisierung.
      </p>
    </div>
  );
}
