export type Language = 'de' | 'en';

export const translations = {
  // Navigation
  'nav.home': { de: 'Startseite', en: 'Home' },
  'nav.vocabulary': { de: 'Wortschatz', en: 'Vocabulary' },
  'nav.grammar': { de: 'Grammatik', en: 'Grammar' },
  'nav.writing': { de: 'Schreiben', en: 'Writing' },
  'nav.reading': { de: 'Lesen', en: 'Reading' },
  'nav.listening': { de: 'Hören', en: 'Listening' },
  'nav.examPrep': { de: 'Prüfungsvorbereitung', en: 'Exam Prep' },
  'nav.myVocabulary': { de: 'Mein Wortschatz', en: 'My Vocabulary' },
  'nav.myTexts': { de: 'Meine Texte', en: 'My Texts' },
  'nav.settings': { de: 'Einstellungen', en: 'Settings' },
  'nav.logout': { de: 'Abmelden', en: 'Log out' },

  // Auth
  'auth.login': { de: 'Anmelden', en: 'Log in' },
  'auth.signup': { de: 'Registrieren', en: 'Sign up' },
  'auth.email': { de: 'E-Mail', en: 'Email' },
  'auth.password': { de: 'Passwort', en: 'Password' },
  'auth.displayName': { de: 'Anzeigename', en: 'Display Name' },
  'auth.forgotPassword': { de: 'Passwort vergessen?', en: 'Forgot password?' },
  'auth.resetPassword': { de: 'Passwort zurücksetzen', en: 'Reset password' },
  'auth.noAccount': { de: 'Noch kein Konto?', en: "Don't have an account?" },
  'auth.hasAccount': { de: 'Bereits ein Konto?', en: 'Already have an account?' },
  'auth.resetSent': { de: 'Link zum Zurücksetzen gesendet!', en: 'Reset link sent!' },
  'auth.checkEmail': { de: 'Bitte überprüfen Sie Ihre E-Mail, um Ihr Konto zu bestätigen.', en: 'Please check your email to confirm your account.' },

  // Common
  'common.loading': { de: 'Laden...', en: 'Loading...' },
  'common.save': { de: 'Speichern', en: 'Save' },
  'common.cancel': { de: 'Abbrechen', en: 'Cancel' },
  'common.submit': { de: 'Absenden', en: 'Submit' },
  'common.correct': { de: 'Richtig!', en: 'Correct!' },
  'common.incorrect': { de: 'Leider falsch.', en: 'Incorrect.' },
  'common.next': { de: 'Weiter', en: 'Next' },
  'common.back': { de: 'Zurück', en: 'Back' },
  'common.exercises': { de: 'Übungen', en: 'exercises' },

  // Home
  'home.welcome': { de: 'Willkommen bei C1 Werkstatt', en: 'Welcome to C1 Werkstatt' },
  'home.subtitle': { de: 'Dein Weg zum C1-Zertifikat', en: 'Your path to C1 certification' },

  // Settings
  'settings.title': { de: 'Einstellungen', en: 'Settings' },
  'settings.language': { de: 'Sprache der Benutzeroberfläche', en: 'UI Language' },
  'settings.german': { de: 'Deutsch', en: 'German' },
  'settings.english': { de: 'Englisch', en: 'English' },
  'settings.level': { de: 'Schreibniveau', en: 'Writing Level' },

  // Levels
  'level.b2refresh': { de: 'B2 Auffrischung', en: 'B2 Refresh' },
  'level.c1new': { de: 'C1 Neu', en: 'C1 New' },

  // Pages
  'page.vocabulary': { de: 'Wortschatz', en: 'Vocabulary' },
  'page.grammar': { de: 'Grammatik', en: 'Grammar' },
  'page.writing': { de: 'Schreiben', en: 'Writing' },
  'page.reading': { de: 'Lesen', en: 'Reading' },
  'page.listening': { de: 'Hören', en: 'Listening' },
  'page.examPrep': { de: 'Prüfungsvorbereitung', en: 'Exam Prep' },
  'page.myVocabulary': { de: 'Mein Wortschatz', en: 'My Vocabulary' },
  'page.myTexts': { de: 'Meine Texte', en: 'My Texts' },
  'page.comingSoon': { de: 'Demnächst verfügbar', en: 'Coming soon' },
} as const;

export type TranslationKey = keyof typeof translations;
