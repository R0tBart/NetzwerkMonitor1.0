// Importiert die notwendigen Module von express, der Datenbank und dem Schema.
import { Router } from "express";
import { db } from "../db";
import { securityEvents } from "@shared/schema";
import { desc } from "drizzle-orm";

// Erstellt einen neuen Router für die Sicherheitsereignis-API-Endpunkte.
const router = Router();

/**
 * @brief GET-Endpunkt für Sicherheitsereignisse.
 * @details Ruft die neuesten 100 Sicherheitsereignisse aus der Datenbank ab, sortiert nach dem Zeitstempel.
 * @param {Request} _req - Das Anfrageobjekt (nicht verwendet).
 * @param {Response} res - Das Antwortobjekt, das die abgerufenen Ereignisse oder einen Fehler zurückgibt.
 */
router.get("/api/security-events", async (_req, res) => {
  try {
    const events = await db.select().from(securityEvents).orderBy(desc(securityEvents.timestamp)).limit(100);
    res.json(events);
  } catch (error) {
    console.error("Fehler beim Laden der Security Events:", error);
    res.status(500).json({ message: "Failed to fetch security events" });
  }
});

// Exportiert den Router, um ihn in anderen Teilen der Anwendung nutzen zu können.
export default router;