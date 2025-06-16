// Importiert Express und Typen für Request, Response, NextFunction.
import express, { type Request, Response, NextFunction } from "express";
// Importiert die Funktion zum Registrieren der Routen.
import { registerRoutes } from "./routes";
// Importiert Funktionen für Vite-Setup, statische Dateibereitstellung und Logging.
import { setupVite, serveStatic, log } from "./vite";

// Erstellt eine neue Express-Anwendung.
const app = express();
// Verwendet Middleware, um JSON-Anfragen zu parsen.
app.use(express.json());
// Verwendet Middleware, um URL-kodierte Anfragen zu parsen.
app.use(express.urlencoded({ extended: false }));

// Middleware zur Protokollierung von Anfragen und Antworten.
app.use((req, res, next) => {
  // Startzeit der Anfrage erfassen.
  const start = Date.now();
  // Pfad der Anfrage.
  const path = req.path;
  // Variable zum Speichern der JSON-Antwort.
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Speichert die ursprüngliche res.json-Funktion.
  const originalResJson = res.json;
  // Überschreibt res.json, um die Antwort zu erfassen.
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  // Event-Listener, der ausgelöst wird, wenn die Antwort beendet ist.
  res.on("finish", () => {
    // Berechnet die Dauer der Anfrage.
    const duration = Date.now() - start;
    // Protokolliert nur API-Anfragen.
    if (path.startsWith("/api")) {
      // Erstellt die Protokollzeile.
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      // Fügt die JSON-Antwort hinzu, falls vorhanden.
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      // Kürzt die Protokollzeile, wenn sie zu lang ist.
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      // Protokolliert die Zeile.
      log(logLine);
    }
  });

  // Ruft die nächste Middleware auf.
  next();
});

// Asynchrone Funktion zum Starten des Servers.
(async () => {
  // Registriert die API-Routen und erhält den HTTP-Server.
  const server = await registerRoutes(app);

  // Fehlerbehandlungs-Middleware.
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // Setzt den Statuscode des Fehlers oder Standard auf 500.
    const status = err.status || err.statusCode || 500;
    // Setzt die Fehlermeldung oder Standard auf "Internal Server Error".
    const message = err.message || "Internal Server Error";

    // Sendet den Fehlerstatus und die Nachricht als JSON-Antwort.
    res.status(status).json({ message });
    // Wirft den Fehler weiter.
    throw err;
  });

  // Wichtig: Vite nur in der Entwicklungsumgebung und nach dem Einrichten
  // aller anderen Routen einrichten, damit die Catch-All-Route
  // die anderen Routen nicht stört.
  if (app.get("env") === "development") {
    // Richte Vite für die Entwicklung ein.
    await setupVite(app, server);
  } else {
    // Statische Dateien im Produktionsmodus bereitstellen.
    serveStatic(app);
  }

  // Der Server wird IMMER auf Port 5000 bereitgestellt.
  // Dies dient sowohl der API als auch dem Client.
  app.listen(5000, () => {
    // Protokolliert, dass der Server auf Port 5000 lauscht.
    log("Listening on port 5000");
  });
})();
