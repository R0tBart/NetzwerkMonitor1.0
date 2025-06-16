// routes/bandwidthMetrics.ts

// Importiert die notwendigen Module von express, der Datenbank und dem Schema.
import { Router } from "express";
import { db } from "../db";
import { bandwidthMetrics } from "@shared/schema";
import { desc, gte, and } from "drizzle-orm";

// Erstellt einen neuen Router für die Bandbreitenmetrik-API-Endpunkte.
const router = Router();

/**
 * @brief GET-Endpunkt für Bandbreitenmetriken.
 * @details Ruft Bandbreitenmetriken aus der Datenbank ab. Unterstützt optionale Filterung
 *          nach der Anzahl der Tage (`days`) und einer Begrenzung der Ergebnisse (`limit`).
 *          Die Metriken werden absteigend nach dem Zeitstempel sortiert zurückgegeben.
 * @param {Request} req - Das Anfrageobjekt, das `limit` und `days` als Query-Parameter enthalten kann.
 * @param {Response} res - Das Antwortobjekt, das die abgerufenen Metriken oder einen Fehler zurückgibt.
 */
router.get("/api/bandwidth-metrics", async (req, res) => {
  try {
    const { limit, days } = req.query as { limit?: string; days?: string };

    // Initialisiert ein Array, um Filterbedingungen zu speichern.
    const filters = [];

    // Verarbeitet den optionalen 'days'-Filter, um Metriken der letzten X Tage abzurufen.
    if (days) {
      const numDays = parseInt(days, 10);
      if (!isNaN(numDays)) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - numDays);
        filters.push(gte(bandwidthMetrics.timestamp, startDate));
      }
    }

    // Setzt das Abfragelimit, standardmäßig auf 100, kann aber durch den 'limit'-Parameter überschrieben werden.
    let queryLimit = 100;
    if (limit) {
      const numLimit = parseInt(limit, 10);
      if (!isNaN(numLimit)) {
        queryLimit = numLimit;
      }
    }

    // Erstellt die Datenbankabfrage mit den angewendeten Filtern, Sortierung und Limit.
    const query = db
      .select()
      .from(bandwidthMetrics)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(desc(bandwidthMetrics.timestamp))
      .limit(queryLimit);

    // Führt die Abfrage aus und sendet die Ergebnisse als JSON-Antwort.
    const metrics = await query;
    res.json(metrics);
  } catch (error) {
    // Fängt Fehler ab, protokolliert sie und sendet eine Fehlerantwort.
    console.error("Fehler beim Laden der Bandbreiten-Metriken:", error);
    res.status(500).json({ message: "Failed to fetch bandwidth metrics" });
  }
});

// Exportiert den Router, um ihn in anderen Teilen der Anwendung nutzen zu können.
export default router;
