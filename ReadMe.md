# NetzwerkMonitor 1.0

Ein modernes, webbasiertes Dashboard zur Überwachung und Verwaltung von Netzwerkinfrastruktur mit Material-Design und Darkmode.

---

## Funktionen

- **Dashboard**
  - Übersicht aller wichtigen Netzwerkmetriken
  - Live-Bandbreiten- und Gerätestatus-Charts
  - Geräte-Tabelle mit Filter, Sortierung und Aktionen
  - Export aller Dashboard-Daten als PDF

- **Geräte**
  - Vollständige Übersicht aller Netzwerkgeräte
  - Filter nach Gerätetyp (Router, Switch, Access Point, Firewall)
  - Sortierbare Tabelle
  - Geräte hinzufügen, bearbeiten, löschen

- **Analyse**
  - Anzeige von Analyse-/Statistikdaten (z.B. Traffic, Fehler, Verbindungen)
  - Export der Analysedaten als CSV, PDF oder JSON

- **Alerts**
  - Übersicht aller Warnungen und Benachrichtigungen
  - Anzeige von Typ, Nachricht und Zeitstempel

- **Einstellungen**
  - Dark Mode umschaltbar
  - 2-Faktor-Authentifizierung (Demo)
  - Passwort ändern (Demo)
  - Sicherheitslevel wählen

- **Weitere Seiten**
  - Security (Sicherheitsübersicht)
  - Passwords (Passwortverwaltung)
  - NotFound (404-Seite)

---

## Projektstruktur

```
NetzwerkMonitor1.0/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── device-table.tsx
│   │   │   │   ├── bandwidth-chart.tsx
│   │   │   │   ├── device-status-chart.tsx
│   │   │   │   └── metrics-overview.tsx
│   │   │   └── layout/
│   │   │       └── sidebar.tsx
│   │   ├── pages/
│   │   │   ├── dashboard.tsx
│   │   │   ├── devices.tsx
│   │   │   ├── analyse.tsx
│   │   │   ├── alerts.tsx
│   │   │   ├── settings.tsx
│   │   │   ├── passwords.tsx
│   │   │   ├── security.tsx
│   │   │   └── not-found.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── ...
├── shared/
│   └── schema/ (geteilte Typen & Schnittstellen)
├── server/
│   └── ... (Backend-API, Mock-Daten)
├── tsconfig.json
└── README.md
```

---

## Technischer Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Material-Design-Prinzipien
- **State/Queries:** React Query (`@tanstack/react-query`)
- **Routing:** Wouter (alternativ react-router möglich)
- **PDF-Export:** jsPDF & jsPDF-AutoTable
- **Icons:** Lucide
- **Darkmode:** Tailwind mit `dark:`-Klassen, Umschaltbar in den Einstellungen
- **Backend:** (Demo/Mock) API-Endpunkte für Geräte, Metriken, Analyse, Alerts

---

## Installation & Start

1. **Abhängigkeiten installieren**
   ```sh
   cd NetzwerkMonitor1.0/client
   npm install
   ```

2. **Entwicklungsserver starten**
   ```sh
   npm run dev
   ```

3. **Backend/Mock-API starten**  
   (falls vorhanden, siehe server/README.md)

---

## Wichtige Hinweise

- **Darkmode:** Kann in den Einstellungen aktiviert werden.
- **Export:** Dashboard und Analyse bieten Export als PDF, CSV, JSON.
- **Geräteverwaltung:** Geräte können hinzugefügt, bearbeitet und gelöscht werden.
- **Mock-Daten:** Beim ersten Start werden automatisch Testdaten generiert.

---

## Weiterentwicklung

- Integration echter Netzwerkdaten (SNMP, REST, etc.)
- Benutzerverwaltung & Authentifizierung
- Erweiterte Analyse- und Alert-Funktionen
- Responsive Design für mobile Nutzung

---

## Lizenz

MIT

---

**Viel Spaß mit NetzwerkMonitor 1.0!**