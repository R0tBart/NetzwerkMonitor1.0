# Server

Dieser Ordner enthält den Backend-Code für die Anwendung.

## Starten des Servers

Um den Server zu starten, navigieren Sie zum Hauptverzeichnis des Projekts und führen Sie den folgenden Befehl aus:

```bash
pnpm run dev
```

## API-Endpunkte

Die API-Endpunkte sind in den Unterordnern von `server/api` definiert.

## Datenbank

Die Datenbankkonfiguration und -interaktionen werden über `server/db.ts` und die Drizzle ORM-Migrationen verwaltet.

## Umgebungsvariablen

Stellen Sie sicher, dass die `.env`-Datei im Hauptverzeichnis des Projekts korrekt konfiguriert ist, insbesondere die `DATABASE_URL`.