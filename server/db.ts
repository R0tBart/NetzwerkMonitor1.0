// Importiert dotenv, um Umgebungsvariablen zu laden.
import * as dotenv from "dotenv";
dotenv.config();

// Importiert Pool und neonConfig von @neondatabase/serverless für die Datenbankverbindung.
import { Pool, neonConfig } from '@neondatabase/serverless';
// Importiert drizzle für die ORM-Integration mit Neon.
import { drizzle } from 'drizzle-orm/neon-serverless';
// Importiert ws für WebSocket-Unterstützung, die von Neon benötigt wird.
import ws from "ws";
// Importiert das gesamte Schema für die Drizzle ORM-Konfiguration.
import * as schema from "@shared/schema";

// Konfiguriert neonConfig, um den WebSocket-Konstruktor zu verwenden.
neonConfig.webSocketConstructor = ws;

// Überprüft, ob die DATABASE_URL Umgebungsvariable gesetzt ist.
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL muss gesetzt sein. Haben Sie vergessen, eine Datenbank bereitzustellen?",
  );
}

// Erstellt einen neuen Datenbank-Pool mit der bereitgestellten Verbindungszeichenfolge.
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// Initialisiert Drizzle ORM mit dem Datenbank-Pool und dem Schema.
export const db = drizzle({ client: pool, schema });