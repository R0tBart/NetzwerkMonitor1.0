// Importiert die notwendigen Module von express, der Datenbank und dem Schema.
import { Router } from "express";
import { db } from "../db";
import { systemMetrics } from "@shared/schema";
import { desc } from "drizzle-orm";

// Erstellt einen neuen Router für die Systemmetrik-API-Endpunkte.
const router = Router();

/**
 * @brief GET-Endpunkt für die neuesten Systemmetriken.
 * @details Ruft die neueste Systemmetrik aus der Datenbank ab und gibt sie als JSON-Antwort zurück.
 * @param {Request} _req - Das Anfrageobjekt (nicht verwendet).
 * @param {Response} res - Das Antwortobjekt, das die neueste Metrik oder einen Fehler zurückgibt.
 */
router.get("/api/system-metrics/latest", async (_req, res) => {
  try {
    // Führt die Datenbankabfrage aus, um die neueste Systemmetrik abzurufen.
    const latest = await db.select().from(systemMetrics).orderBy(desc(systemMetrics.timestamp)).limit(1);
    // Sendet die abgerufene Metrik als JSON-Antwort, oder ein leeres Objekt, falls keine Metrik gefunden wurde.
    res.json(latest[0] || {});
  } catch (error) {
    // Fängt Fehler ab, protokolliert sie und sendet eine Fehlerantwort.
    console.error("Fehler beim Laden der System-Metriken:", error);
    res.status(500).json({ message: "Failed to fetch system metrics" });
  }
});

// Exportiert den Router, um ihn in anderen Teilen der Anwendung nutzen zu können.
export default router;