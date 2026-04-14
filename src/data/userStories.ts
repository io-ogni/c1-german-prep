export interface AcceptanceCriterion {
  de: string;
  en: string;
}

export interface UserStory {
  id: string;
  title_de: string;
  title_en: string;
  role_de: string;
  role_en: string;
  want_de: string;
  want_en: string;
  why_de: string;
  why_en: string;
  criteria: AcceptanceCriterion[];
}

export interface StoryDomain {
  id: string;
  name: string;
  icon: string;
  description_de: string;
  description_en: string;
  stories: UserStory[];
}

export const USER_STORY_DOMAINS: StoryDomain[] = [
  // ═══ FinTech ═══
  {
    id: 'fintech',
    name: 'FinTech',
    icon: '🏦',
    description_de: 'Mobile-Banking-App',
    description_en: 'Mobile banking app',
    stories: [
      {
        id: 'ft-1',
        title_de: 'Kontostand in Echtzeit anzeigen',
        title_en: 'Display account balance in real time',
        role_de: 'Als Kundin',
        role_en: 'As a customer',
        want_de: 'möchte ich meinen aktuellen Kontostand in Echtzeit sehen können',
        want_en: 'I want to see my current account balance in real time',
        why_de: 'damit ich meine täglichen Ausgaben besser kontrollieren kann',
        why_en: 'so that I can better control my daily spending',
        criteria: [
          { de: 'Der Kontostand wird beim Öffnen der App automatisch geladen.', en: 'The account balance is loaded automatically when the app is opened.' },
          { de: 'Die letzten 5 Transaktionen werden unterhalb des Kontostands angezeigt.', en: 'The last 5 transactions are displayed below the balance.' },
          { de: 'Pull-to-refresh aktualisiert den Kontostand.', en: 'Pull-to-refresh updates the balance.' },
          { de: 'Bei fehlender Internetverbindung wird der zuletzt bekannte Stand mit Zeitstempel angezeigt.', en: 'When offline, the last known balance is shown with a timestamp.' },
        ],
      },
      {
        id: 'ft-2',
        title_de: 'Geld an Kontakte überweisen',
        title_en: 'Transfer money to contacts',
        role_de: 'Als Nutzer',
        role_en: 'As a user',
        want_de: 'möchte ich Geld direkt an gespeicherte Kontakte überweisen können',
        want_en: 'I want to transfer money directly to saved contacts',
        why_de: 'damit ich Überweisungen schnell und ohne manuelle IBAN-Eingabe durchführen kann',
        why_en: 'so that I can make transfers quickly without manually entering IBANs',
        criteria: [
          { de: 'Kontakte mit hinterlegter IBAN werden in einer Empfängerliste angezeigt.', en: 'Contacts with stored IBANs are shown in a recipient list.' },
          { de: 'Der Nutzer kann den Betrag eingeben und einen Verwendungszweck hinzufügen.', en: 'The user can enter the amount and add a payment reference.' },
          { de: 'Vor der Ausführung wird eine Zusammenfassung zur Bestätigung angezeigt.', en: 'A summary is shown for confirmation before execution.' },
          { de: 'Die Überweisung erscheint sofort in der Transaktionshistorie.', en: 'The transfer appears immediately in the transaction history.' },
        ],
      },
    ],
  },

  // ═══ eCommerce ═══
  {
    id: 'ecommerce',
    name: 'eCommerce',
    icon: '🛒',
    description_de: 'Online-Shop',
    description_en: 'Online shop',
    stories: [
      {
        id: 'ec-1',
        title_de: 'Artikel in den Warenkorb legen',
        title_en: 'Add item to shopping cart',
        role_de: 'Als Kundin',
        role_en: 'As a customer',
        want_de: 'möchte ich Artikel aus der Produktübersicht direkt in den Warenkorb legen können',
        want_en: 'I want to add items from the product overview directly to the cart',
        why_de: 'damit ich meinen Einkauf fortsetzen kann, ohne jede Produktseite einzeln öffnen zu müssen',
        why_en: 'so that I can continue shopping without having to open each product page individually',
        criteria: [
          { de: 'Jeder Artikel hat einen "In den Warenkorb"-Button in der Übersicht.', en: 'Each item has an "Add to cart" button in the overview.' },
          { de: 'Nach dem Hinzufügen zeigt ein Badge am Warenkorb-Icon die aktuelle Anzahl.', en: 'After adding, a badge on the cart icon shows the current count.' },
          { de: 'Eine kurze Bestätigungsmeldung erscheint ("Artikel hinzugefügt").', en: 'A brief confirmation message appears ("Item added").' },
          { de: 'Bereits im Warenkorb befindliche Artikel zeigen die Menge statt des Buttons.', en: 'Items already in the cart show the quantity instead of the button.' },
        ],
      },
      {
        id: 'ec-2',
        title_de: 'Bestellung retournieren',
        title_en: 'Return an order',
        role_de: 'Als Käufer',
        role_en: 'As a buyer',
        want_de: 'möchte ich eine Retoure direkt über mein Kundenkonto einleiten können',
        want_en: 'I want to initiate a return directly from my customer account',
        why_de: 'damit ich defekte oder unpassende Artikel unkompliziert zurückschicken kann',
        why_en: 'so that I can return defective or unsuitable items easily',
        criteria: [
          { de: 'In der Bestellübersicht gibt es einen "Retoure einleiten"-Button pro Artikel.', en: 'In the order overview there is a "Start return" button per item.' },
          { de: 'Der Nutzer wählt einen Retourengrund aus einer vordefinierten Liste.', en: 'The user selects a return reason from a predefined list.' },
          { de: 'Ein Retourenlabel wird als PDF zum Download bereitgestellt.', en: 'A return label is provided as a PDF for download.' },
          { de: 'Der Retourenstatus ist in der Bestellhistorie einsehbar.', en: 'The return status is visible in the order history.' },
        ],
      },
    ],
  },

  // ═══ Medical / HealthTech ═══
  {
    id: 'medical',
    name: 'HealthTech',
    icon: '🏥',
    description_de: 'Patientenportal',
    description_en: 'Patient portal',
    stories: [
      {
        id: 'med-1',
        title_de: 'Arzttermin online buchen',
        title_en: 'Book a doctor appointment online',
        role_de: 'Als Patient',
        role_en: 'As a patient',
        want_de: 'möchte ich online einen Termin bei meinem Hausarzt buchen können',
        want_en: 'I want to book an appointment with my GP online',
        why_de: 'damit ich nicht in der Warteschleife der Praxis hänge',
        why_en: 'so that I don\'t have to wait on hold at the practice',
        criteria: [
          { de: 'Verfügbare Zeitfenster werden in einem Kalender dargestellt.', en: 'Available time slots are shown in a calendar view.' },
          { de: 'Der Patient kann den Grund des Besuchs aus einer Liste wählen.', en: 'The patient can select the visit reason from a list.' },
          { de: 'Nach der Buchung wird eine Bestätigung per E-Mail verschickt.', en: 'After booking, a confirmation is sent by email.' },
          { de: 'Termine können bis 24 Stunden vorher storniert werden.', en: 'Appointments can be cancelled up to 24 hours in advance.' },
        ],
      },
      {
        id: 'med-2',
        title_de: 'Befunde digital einsehen',
        title_en: 'View medical reports digitally',
        role_de: 'Als Patientin',
        role_en: 'As a patient',
        want_de: 'möchte ich meine Laborbefunde digital über das Portal abrufen können',
        want_en: 'I want to access my lab results digitally via the portal',
        why_de: 'damit ich meine Gesundheitsdaten jederzeit einsehen kann, ohne in der Praxis anzurufen',
        why_en: 'so that I can view my health data at any time without calling the practice',
        criteria: [
          { de: 'Neue Befunde werden mit einer Push-Benachrichtigung angekündigt.', en: 'New results are announced with a push notification.' },
          { de: 'Befunde sind chronologisch sortiert und nach Kategorie filterbar.', en: 'Results are sorted chronologically and filterable by category.' },
          { de: 'Auffällige Werte werden farblich hervorgehoben.', en: 'Abnormal values are highlighted in color.' },
        ],
      },
    ],
  },

  // ═══ Insurance / InsurTech ═══
  {
    id: 'insurance',
    name: 'InsurTech',
    icon: '🛡️',
    description_de: 'Schadensmeldung-Plattform',
    description_en: 'Claims platform',
    stories: [
      {
        id: 'ins-1',
        title_de: 'Schaden online melden',
        title_en: 'Report a claim online',
        role_de: 'Als Versicherungsnehmer',
        role_en: 'As a policyholder',
        want_de: 'möchte ich einen Schaden direkt über die App melden können',
        want_en: 'I want to report a claim directly through the app',
        why_de: 'damit die Bearbeitung sofort beginnen kann und ich den Status verfolgen kann',
        why_en: 'so that processing can start immediately and I can track the status',
        criteria: [
          { de: 'Der Nutzer wird durch einen geführten Prozess mit maximal 5 Schritten geleitet.', en: 'The user is guided through a process with a maximum of 5 steps.' },
          { de: 'Fotos des Schadens können direkt hochgeladen werden.', en: 'Photos of the damage can be uploaded directly.' },
          { de: 'Nach dem Absenden erhält der Nutzer eine Vorgangsnummer.', en: 'After submission the user receives a case number.' },
          { de: 'Der aktuelle Bearbeitungsstatus ist in der App einsehbar.', en: 'The current processing status is visible in the app.' },
        ],
      },
      {
        id: 'ins-2',
        title_de: 'Versicherungspolice vergleichen',
        title_en: 'Compare insurance policies',
        role_de: 'Als Interessentin',
        role_en: 'As a prospective customer',
        want_de: 'möchte ich verschiedene Versicherungstarife übersichtlich vergleichen können',
        want_en: 'I want to compare different insurance plans clearly',
        why_de: 'damit ich den für mich passenden Tarif schnell identifizieren kann',
        why_en: 'so that I can quickly identify the right plan for me',
        criteria: [
          { de: 'Bis zu 3 Tarife können nebeneinander verglichen werden.', en: 'Up to 3 plans can be compared side by side.' },
          { de: 'Unterschiede in den Leistungen werden farblich markiert.', en: 'Differences in benefits are highlighted in color.' },
          { de: 'Der monatliche Beitrag wird basierend auf den Eingabedaten berechnet.', en: 'The monthly premium is calculated based on input data.' },
        ],
      },
    ],
  },

  // ═══ Retail / POS ═══
  {
    id: 'retail',
    name: 'Retail',
    icon: '🏪',
    description_de: 'Warenwirtschaftssystem',
    description_en: 'Inventory management system',
    stories: [
      {
        id: 'ret-1',
        title_de: 'Bestand automatisch nachbestellen',
        title_en: 'Automatically reorder stock',
        role_de: 'Als Filialleiter',
        role_en: 'As a store manager',
        want_de: 'möchte ich automatische Nachbestellungen bei Unterschreitung des Mindestbestands auslösen können',
        want_en: 'I want to trigger automatic reorders when stock falls below the minimum level',
        why_de: 'damit Regallücken vermieden werden und die Verfügbarkeit gesichert ist',
        why_en: 'so that shelf gaps are avoided and availability is ensured',
        criteria: [
          { de: 'Für jeden Artikel kann ein Mindestbestand konfiguriert werden.', en: 'A minimum stock level can be configured for each item.' },
          { de: 'Bei Unterschreitung wird automatisch eine Bestellung beim Lieferanten ausgelöst.', en: 'When the level is reached, an order is automatically placed with the supplier.' },
          { de: 'Der Filialleiter erhält eine Benachrichtigung über jede automatische Bestellung.', en: 'The store manager receives a notification for each automatic order.' },
        ],
      },
      {
        id: 'ret-2',
        title_de: 'Inventur per Barcode-Scanner durchführen',
        title_en: 'Conduct inventory with barcode scanner',
        role_de: 'Als Lagermitarbeiterin',
        role_en: 'As a warehouse employee',
        want_de: 'möchte ich Artikel per Barcode-Scanner erfassen können',
        want_en: 'I want to scan items using a barcode scanner',
        why_de: 'damit die Inventur schneller und fehlerfreier abläuft',
        why_en: 'so that the inventory process is faster and more accurate',
        criteria: [
          { de: 'Die Smartphone-Kamera funktioniert als Barcode-Scanner.', en: 'The smartphone camera works as a barcode scanner.' },
          { de: 'Gescannte Artikel werden automatisch in der Inventurliste aktualisiert.', en: 'Scanned items are automatically updated in the inventory list.' },
          { de: 'Abweichungen zum Soll-Bestand werden rot hervorgehoben.', en: 'Deviations from expected stock are highlighted in red.' },
        ],
      },
    ],
  },

  // ═══ Project Management ═══
  {
    id: 'project-management',
    name: 'Projektmanagement',
    icon: '📋',
    description_de: 'Aufgabenverwaltung (monday.com-Stil)',
    description_en: 'Task management (monday.com-style)',
    stories: [
      {
        id: 'pm-1',
        title_de: 'Aufgabe einem Teammitglied zuweisen',
        title_en: 'Assign a task to a team member',
        role_de: 'Als Projektleiterin',
        role_en: 'As a project lead',
        want_de: 'möchte ich Aufgaben per Drag-and-Drop an Teammitglieder zuweisen können',
        want_en: 'I want to assign tasks to team members via drag-and-drop',
        why_de: 'damit die Zuständigkeiten klar verteilt sind und nichts untergeht',
        why_en: 'so that responsibilities are clearly distributed and nothing falls through the cracks',
        criteria: [
          { de: 'Aufgaben können per Drag-and-Drop auf Teamprofile gezogen werden.', en: 'Tasks can be dragged and dropped onto team profiles.' },
          { de: 'Das zugewiesene Teammitglied erhält eine Benachrichtigung.', en: 'The assigned team member receives a notification.' },
          { de: 'Der Name des Verantwortlichen wird auf der Aufgabenkarte angezeigt.', en: 'The assignee\'s name is displayed on the task card.' },
          { de: 'Eine Aufgabe kann mehreren Personen gleichzeitig zugewiesen werden.', en: 'A task can be assigned to multiple people simultaneously.' },
        ],
      },
      {
        id: 'pm-2',
        title_de: 'Sprint-Fortschritt im Dashboard anzeigen',
        title_en: 'Display sprint progress in dashboard',
        role_de: 'Als Scrum Master',
        role_en: 'As a Scrum Master',
        want_de: 'möchte ich den Sprint-Fortschritt auf einen Blick im Dashboard sehen können',
        want_en: 'I want to see the sprint progress at a glance in the dashboard',
        why_de: 'damit ich frühzeitig erkennen kann, ob das Sprint-Ziel gefährdet ist',
        why_en: 'so that I can identify early whether the sprint goal is at risk',
        criteria: [
          { de: 'Ein Burndown-Chart zeigt den verbleibenden Aufwand pro Tag.', en: 'A burndown chart shows the remaining effort per day.' },
          { de: 'Abgeschlossene, laufende und offene Aufgaben werden farblich unterschieden.', en: 'Completed, in-progress, and open tasks are visually distinguished.' },
          { de: 'Das Dashboard aktualisiert sich automatisch bei Statusänderungen.', en: 'The dashboard updates automatically when statuses change.' },
        ],
      },
    ],
  },

  // ═══ HR / People ═══
  {
    id: 'hr',
    name: 'HR / People',
    icon: '👥',
    description_de: 'Mitarbeiterportal',
    description_en: 'Employee portal',
    stories: [
      {
        id: 'hr-1',
        title_de: 'Urlaubsantrag einreichen',
        title_en: 'Submit a leave request',
        role_de: 'Als Mitarbeiterin',
        role_en: 'As an employee',
        want_de: 'möchte ich meinen Urlaubsantrag digital einreichen können',
        want_en: 'I want to submit my leave request digitally',
        why_de: 'damit der Genehmigungsprozess transparent und nachvollziehbar ist',
        why_en: 'so that the approval process is transparent and traceable',
        criteria: [
          { de: 'Der Resturlaubsanspruch wird im Formular angezeigt.', en: 'The remaining leave entitlement is shown in the form.' },
          { de: 'Überschneidungen mit Teamkollegen werden als Warnung angezeigt.', en: 'Overlaps with colleagues are shown as a warning.' },
          { de: 'Der Vorgesetzte erhält eine Benachrichtigung und kann direkt genehmigen oder ablehnen.', en: 'The supervisor receives a notification and can approve or reject directly.' },
          { de: 'Der Status des Antrags ist jederzeit einsehbar.', en: 'The request status is visible at any time.' },
        ],
      },
      {
        id: 'hr-2',
        title_de: 'Onboarding-Checkliste abarbeiten',
        title_en: 'Complete onboarding checklist',
        role_de: 'Als neue Mitarbeiterin',
        role_en: 'As a new employee',
        want_de: 'möchte ich eine strukturierte Onboarding-Checkliste in meinem Portal sehen',
        want_en: 'I want to see a structured onboarding checklist in my portal',
        why_de: 'damit ich weiß, welche Schritte ich in den ersten Wochen erledigen muss',
        why_en: 'so that I know which steps I need to complete in the first weeks',
        criteria: [
          { de: 'Die Checkliste ist nach Wochen gegliedert (Woche 1, Woche 2 usw.).', en: 'The checklist is organized by week (Week 1, Week 2, etc.).' },
          { de: 'Erledigte Punkte können abgehakt werden.', en: 'Completed items can be checked off.' },
          { de: 'Der HR-Manager sieht den Fortschritt des Onboardings.', en: 'The HR manager can see onboarding progress.' },
        ],
      },
    ],
  },

  // ═══ Logistics / Supply Chain ═══
  {
    id: 'logistics',
    name: 'Logistik',
    icon: '🚛',
    description_de: 'Sendungsverfolgung',
    description_en: 'Shipment tracking',
    stories: [
      {
        id: 'log-1',
        title_de: 'Lieferstatus in Echtzeit verfolgen',
        title_en: 'Track delivery status in real time',
        role_de: 'Als Empfänger',
        role_en: 'As a recipient',
        want_de: 'möchte ich den aktuellen Standort meiner Sendung auf einer Karte sehen können',
        want_en: 'I want to see the current location of my shipment on a map',
        why_de: 'damit ich den Lieferzeitpunkt besser planen kann',
        why_en: 'so that I can better plan for the delivery time',
        criteria: [
          { de: 'Der Sendungsstatus wird in einer Zeitleiste dargestellt.', en: 'The shipment status is shown in a timeline.' },
          { de: 'Die aktuelle Position des Fahrzeugs wird auf einer Karte angezeigt.', en: 'The current position of the vehicle is shown on a map.' },
          { de: 'Die voraussichtliche Ankunftszeit wird laufend aktualisiert.', en: 'The estimated arrival time is continuously updated.' },
        ],
      },
      {
        id: 'log-2',
        title_de: 'Lieferadresse nach Bestellung ändern',
        title_en: 'Change delivery address after ordering',
        role_de: 'Als Kundin',
        role_en: 'As a customer',
        want_de: 'möchte ich die Lieferadresse noch nach der Bestellung ändern können',
        want_en: 'I want to change the delivery address even after placing the order',
        why_de: 'damit ich die Lieferung an einen anderen Ort umleiten kann, falls sich meine Pläne ändern',
        why_en: 'so that I can redirect the delivery if my plans change',
        criteria: [
          { de: 'Die Adressänderung ist möglich, solange die Sendung noch nicht beim Zusteller ist.', en: 'Address change is possible as long as the shipment hasn\'t reached the courier yet.' },
          { de: 'Die neue Adresse wird auf Gültigkeit geprüft.', en: 'The new address is validated.' },
          { de: 'Der Nutzer erhält eine Bestätigung der Adressänderung.', en: 'The user receives confirmation of the address change.' },
        ],
      },
    ],
  },

  // ═══ EdTech ═══
  {
    id: 'edtech',
    name: 'EdTech',
    icon: '🎓',
    description_de: 'Lernplattform',
    description_en: 'Learning platform',
    stories: [
      {
        id: 'edu-1',
        title_de: 'Lernfortschritt im Dashboard anzeigen',
        title_en: 'Display learning progress in dashboard',
        role_de: 'Als Lernende',
        role_en: 'As a learner',
        want_de: 'möchte ich meinen Lernfortschritt übersichtlich in einem Dashboard sehen',
        want_en: 'I want to see my learning progress clearly in a dashboard',
        why_de: 'damit ich weiß, wie weit ich im Kurs bin und was noch aussteht',
        why_en: 'so that I know how far along I am in the course and what remains',
        criteria: [
          { de: 'Ein Fortschrittsbalken zeigt den Gesamtfortschritt pro Kurs.', en: 'A progress bar shows the total progress per course.' },
          { de: 'Abgeschlossene Module sind grün markiert, offene grau.', en: 'Completed modules are marked green, open ones grey.' },
          { de: 'Die geschätzte Restdauer wird angezeigt.', en: 'The estimated remaining time is displayed.' },
        ],
      },
      {
        id: 'edu-2',
        title_de: 'Zertifikat nach Kursabschluss herunterladen',
        title_en: 'Download certificate after course completion',
        role_de: 'Als Teilnehmer',
        role_en: 'As a participant',
        want_de: 'möchte ich nach Abschluss eines Kurses automatisch ein Zertifikat erhalten',
        want_en: 'I want to automatically receive a certificate after completing a course',
        why_de: 'damit ich meinen Lernerfolg dokumentieren und bei Bewerbungen verwenden kann',
        why_en: 'so that I can document my achievement and use it in applications',
        criteria: [
          { de: 'Das Zertifikat wird automatisch nach Bestehen der Abschlussprüfung generiert.', en: 'The certificate is generated automatically after passing the final exam.' },
          { de: 'Es enthält den Namen, den Kurs und das Datum.', en: 'It includes the name, course, and date.' },
          { de: 'Das Zertifikat kann als PDF heruntergeladen und geteilt werden.', en: 'The certificate can be downloaded and shared as a PDF.' },
        ],
      },
    ],
  },

  // ═══ Mobility / Transport ═══
  {
    id: 'mobility',
    name: 'Mobilität',
    icon: '🚌',
    description_de: 'ÖPNV- & Ridesharing-App',
    description_en: 'Public transit & ridesharing app',
    stories: [
      {
        id: 'mob-1',
        title_de: 'Verbindung mit Echtzeitdaten suchen',
        title_en: 'Search for connections with real-time data',
        role_de: 'Als Pendlerin',
        role_en: 'As a commuter',
        want_de: 'möchte ich Verbindungen mit aktuellen Verspätungsinformationen angezeigt bekommen',
        want_en: 'I want to see connections with current delay information',
        why_de: 'damit ich meine Route bei Störungen rechtzeitig anpassen kann',
        why_en: 'so that I can adjust my route in time when disruptions occur',
        criteria: [
          { de: 'Verspätungen werden in Minuten neben der planmäßigen Abfahrtszeit angezeigt.', en: 'Delays are shown in minutes next to the scheduled departure time.' },
          { de: 'Ausgefallene Verbindungen werden durchgestrichen dargestellt.', en: 'Cancelled connections are shown as struck through.' },
          { de: 'Alternative Routen werden automatisch vorgeschlagen.', en: 'Alternative routes are automatically suggested.' },
        ],
      },
      {
        id: 'mob-2',
        title_de: 'Fahrt im Voraus buchen',
        title_en: 'Book a ride in advance',
        role_de: 'Als Nutzer',
        role_en: 'As a user',
        want_de: 'möchte ich eine Fahrt für einen bestimmten Zeitpunkt im Voraus buchen können',
        want_en: 'I want to book a ride for a specific time in advance',
        why_de: 'damit ich sicher sein kann, dass zum gewünschten Zeitpunkt ein Fahrzeug verfügbar ist',
        why_en: 'so that I can be sure a vehicle is available at the desired time',
        criteria: [
          { de: 'Die Buchung ist mindestens 30 Minuten im Voraus möglich.', en: 'Booking is possible at least 30 minutes in advance.' },
          { de: 'Der geschätzte Preis wird vor der Buchung angezeigt.', en: 'The estimated price is shown before booking.' },
          { de: 'Eine Erinnerung wird 15 Minuten vor der Abfahrt gesendet.', en: 'A reminder is sent 15 minutes before departure.' },
        ],
      },
    ],
  },

  // ═══ SaaS / B2B ═══
  {
    id: 'saas',
    name: 'SaaS / B2B',
    icon: '📊',
    description_de: 'CRM- & Analyse-Tool',
    description_en: 'CRM & analytics tool',
    stories: [
      {
        id: 'saas-1',
        title_de: 'Bericht als PDF exportieren',
        title_en: 'Export report as PDF',
        role_de: 'Als Account-Managerin',
        role_en: 'As an account manager',
        want_de: 'möchte ich Kundenberichte als PDF exportieren können',
        want_en: 'I want to export customer reports as PDF',
        why_de: 'damit ich die Berichte in Kundenpräsentationen verwenden kann',
        why_en: 'so that I can use the reports in client presentations',
        criteria: [
          { de: 'Der Export enthält alle sichtbaren Diagramme und Tabellen.', en: 'The export includes all visible charts and tables.' },
          { de: 'Das Firmenlogo wird automatisch in die Kopfzeile eingefügt.', en: 'The company logo is automatically inserted in the header.' },
          { de: 'Der Zeitraum des Berichts ist auf dem Deckblatt angegeben.', en: 'The report period is stated on the cover page.' },
        ],
      },
      {
        id: 'saas-2',
        title_de: 'Daten per API-Schnittstelle importieren',
        title_en: 'Import data via API',
        role_de: 'Als Entwickler',
        role_en: 'As a developer',
        want_de: 'möchte ich Kundendaten über eine REST-API automatisch importieren können',
        want_en: 'I want to automatically import customer data via a REST API',
        why_de: 'damit manuelle Dateneingabe entfällt und die Datenqualität steigt',
        why_en: 'so that manual data entry is eliminated and data quality improves',
        criteria: [
          { de: 'Die API akzeptiert JSON-Daten im standardisierten Format.', en: 'The API accepts JSON data in a standardized format.' },
          { de: 'Fehlerhafte Datensätze werden mit einer aussagekräftigen Fehlermeldung zurückgewiesen.', en: 'Invalid records are rejected with a meaningful error message.' },
          { de: 'Erfolgreich importierte Datensätze werden in einem Protokoll dokumentiert.', en: 'Successfully imported records are documented in a log.' },
          { de: 'Die API unterstützt Batch-Importe von bis zu 1.000 Datensätzen pro Anfrage.', en: 'The API supports batch imports of up to 1,000 records per request.' },
        ],
      },
    ],
  },

  // ═══ Smart Home / IoT ═══
  {
    id: 'smart-home',
    name: 'Smart Home',
    icon: '🏠',
    description_de: 'Hausautomations-App',
    description_en: 'Home automation app',
    stories: [
      {
        id: 'sh-1',
        title_de: 'Szene per Sprachbefehl aktivieren',
        title_en: 'Activate a scene via voice command',
        role_de: 'Als Bewohnerin',
        role_en: 'As a resident',
        want_de: 'möchte ich vordefinierte Szenen per Sprachbefehl aktivieren können',
        want_en: 'I want to activate predefined scenes via voice command',
        why_de: 'damit ich das Licht und die Temperatur bequem vom Sofa aus steuern kann',
        why_en: 'so that I can control the lights and temperature comfortably from the couch',
        criteria: [
          { de: 'Szenen können über "Hey App, aktiviere [Szenenname]" gestartet werden.', en: 'Scenes can be started via "Hey App, activate [scene name]".' },
          { de: 'Die App bestätigt die Aktivierung mit einer akustischen Rückmeldung.', en: 'The app confirms the activation with an audible response.' },
          { de: 'Alle Geräte der Szene wechseln innerhalb von 3 Sekunden in den Zielzustand.', en: 'All devices in the scene switch to the target state within 3 seconds.' },
        ],
      },
      {
        id: 'sh-2',
        title_de: 'Benachrichtigung bei ungewöhnlicher Aktivität',
        title_en: 'Notification for unusual activity',
        role_de: 'Als Hauseigentümer',
        role_en: 'As a homeowner',
        want_de: 'möchte ich benachrichtigt werden, wenn die Sensoren ungewöhnliche Aktivitäten erkennen',
        want_en: 'I want to be notified when sensors detect unusual activity',
        why_de: 'damit ich im Urlaub über mögliche Einbrüche informiert werde',
        why_en: 'so that I am informed about possible break-ins while on vacation',
        criteria: [
          { de: 'Bewegungsmelder lösen bei Abwesenheit eine Push-Benachrichtigung aus.', en: 'Motion detectors trigger a push notification when away.' },
          { de: 'Die Benachrichtigung enthält einen Schnappschuss der Kamera.', en: 'The notification includes a camera snapshot.' },
          { de: 'Der Nutzer kann direkt aus der Benachrichtigung den Alarm aktivieren oder deaktivieren.', en: 'The user can activate or deactivate the alarm directly from the notification.' },
        ],
      },
    ],
  },
];
