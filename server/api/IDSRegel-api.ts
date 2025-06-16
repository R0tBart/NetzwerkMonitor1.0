// Importiert die notwendigen Module von express, der Datenbank und dem Schema.
import { Router } from "express";
import { db } from "../db";
import { idsRules } from "@shared/schema";
import { desc } from "drizzle-orm";

// Erstellt einen neuen Router für die IDS-Regel-API-Endpunkte.
const router = Router();

/**
 * @brief GET-Endpunkt für IDS-Regeln.
 * @details Ruft die neuesten 100 IDS-Regeln aus der Datenbank ab, sortiert nach dem letzten Update-Zeitstempel.
 * @param {Request} _req - Das Anfrageobjekt (nicht verwendet).
 * @param {Response} res - Das Antwortobjekt, das die abgerufenen Regeln oder einen Fehler zurückgibt.
 */
router.get("/api/ids-rules", async (_req, res) => {
  try {
    // Führt die Datenbankabfrage aus, um die neuesten 100 IDS-Regeln abzurufen.
    const rules = await db.select().from(idsRules).orderBy(desc(idsRules.updatedAt)).limit(100);
    // Sendet die abgerufenen Regeln als JSON-Antwort.
    res.json(rules);
  } catch (error) {
    // Fängt Fehler ab, protokolliert sie und sendet eine Fehlerantwort.
    console.error("Fehler beim Laden der IDS-Regeln:", error);
    res.status(500).json({ message: "Failed to fetch IDS rules" });
  }
});

// Exportiert den Router, um ihn in anderen Teilen der Anwendung nutzen zu können.
export default router;