import express, { type Express } from "express";
// Importiert das Dateisystemmodul von Node.js.
import fs from "fs";
// Importiert das Pfadmodul von Node.js zur Handhabung von Dateipfaden.
import path from "path";
// Importiert Funktionen von Vite, um einen Entwicklungsserver zu erstellen und einen Logger zu initialisieren.
import { createServer as createViteServer, createLogger } from "vite";
// Importiert den Typ 'Server' aus dem HTTP-Modul.
import { type Server } from "http";
// Importiert die Vite-Konfiguration aus der übergeordneten Datei.
import viteConfig from "../vite.config";
// Importiert 'nanoid' zur Generierung kurzer, eindeutiger IDs.
import { nanoid } from "nanoid";

// Erstellt einen Vite-Logger für die Konsolenausgabe.
const viteLogger = createLogger();

/**
 * Protokolliert eine Nachricht mit Zeitstempel und Quelle.
 * @param message Die zu protokollierende Nachricht.
 * @param source Die Quelle der Nachricht (Standard: 'express').
 */
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

/**
 * Richten Sie den Vite-Entwicklungsserver ein.
 * @param app Die Express-Anwendungsinstanz.
 * @param server Die HTTP-Serverinstanz.
 */
export async function setupVite(app: Express, server: Server) {
  // Optionen für den Vite-Server, einschließlich Middleware-Modus, HMR und erlaubter Hosts.
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
  };

  // Erstellt den Vite-Entwicklungsserver.
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true,
    },
    appType: "custom",
  });

  // Verwendet die Vite-Middleware in der Express-App.
  app.use(vite.middlewares);
  // Behandelt alle eingehenden Anfragen, um die HTML-Datei zu transformieren und zu senden.
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Löst den Pfad zur Client-HTML-Vorlage auf.
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // Lädt die HTML-Vorlage und fügt einen Cache-Buster hinzu, um das Neuladen zu erzwingen.
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      // Transformiert die HTML-Seite mit Vite und sendet sie als Antwort.
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      // Behandelt Fehler während der HTML-Transformation und leitet sie an die nächste Middleware weiter.

      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

/**
 * Stellt statische Dateien aus dem 'public'-Verzeichnis bereit.
 * @param app Die Express-Anwendungsinstanz.
 */
export function serveStatic(app: Express) {
  // Löst den Pfad zum 'public'-Verzeichnis auf, in dem die gebauten Frontend-Dateien liegen.
  const distPath = path.resolve(import.meta.dirname, "public");

  // Überprüft, ob das 'public'-Verzeichnis existiert. Wenn nicht, wird ein Fehler geworfen.
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Stellt statische Dateien aus dem 'distPath' bereit.
  app.use(express.static(distPath));

  // Leitet alle nicht gefundenen Anfragen an die 'index.html' im 'distPath' weiter (für SPA-Routing).
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
