// Importiert die notwendigen Module von express, der Datenbank und dem Schema.
import { Router } from "express";
import { db } from "../db";
import { devices } from "@shared/schema";

// Erstellt einen neuen Router für die Geräte-API-Endpunkte.
const router = Router();

/**
 * @brief GET-Endpunkt für Geräte.
 * @details Ruft alle Geräte aus der Datenbank ab und gibt sie als JSON-Antwort zurück.
 * @param {Request} _req - Das Anfrageobjekt (nicht verwendet).
 * @param {Response} res - Das Antwortobjekt, das die abgerufenen Geräte oder einen Fehler zurückgibt.
 */
router.get("/api/devices", async (_req, res) => {
  try {
    // Führt die Datenbankabfrage aus, um alle Geräte abzurufen.
    const allDevices = await db.select().from(devices);
    // Sendet die abgerufenen Geräte als JSON-Antwort.
    res.json(allDevices);
  } catch (error) {
    // Fängt Fehler ab, protokolliert sie und sendet eine Fehlerantwort.
    console.error("Fehler beim Laden der Geräte:", error);
    res.status(500).json({ message: "Failed to fetch devices" });
  }
});

// Exportiert den Router, um ihn in anderen Teilen der Anwendung nutzen zu können.
export default router;