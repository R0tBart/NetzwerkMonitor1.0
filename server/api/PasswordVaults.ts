// Importiert die notwendigen Module von express, der Datenbank und dem Schema.
import { Router } from "express";
import { db } from "../db";
import { passwordVaults, passwordEntries } from "@shared/schema";
import { eq } from "drizzle-orm";

// Erstellt einen neuen Router für die Passwort-Tresor-API-Endpunkte.
const router = Router();

/**
 * @brief GET-Endpunkt für alle Passwort-Tresore.
 * @details Ruft alle Passwort-Tresore aus der Datenbank ab und gibt sie als JSON-Antwort zurück.
 * @param {Request} _req - Das Anfrageobjekt (nicht verwendet).
 * @param {Response} res - Das Antwortobjekt, das die abgerufenen Tresore oder einen Fehler zurückgibt.
 */
router.get("/api/password-vaults", async (_req, res) => {
  try {
    // Führt die Datenbankabfrage aus, um alle Passwort-Tresore abzurufen.
    const vaults = await db.select().from(passwordVaults);
    // Sendet die abgerufenen Tresore als JSON-Antwort.
    res.json(vaults);
  } catch (error) {
    // Fängt Fehler ab, protokolliert sie und sendet eine Fehlerantwort.
    console.error("Fehler beim Laden der Password Vaults:", error);
    res.status(500).json({ message: "Failed to fetch password vaults" });
  }
});

/**
 * @brief GET-Endpunkt für Passworteinträge innerhalb eines bestimmten Tresors.
 * @details Ruft alle Passworteinträge ab, die zu einem bestimmten Passwort-Tresor gehören.
 * @param {Request} req - Das Anfrageobjekt, das die `id` des Tresors in den Parametern enthält.
 * @param {Response} res - Das Antwortobjekt, das die abgerufenen Einträge oder einen Fehler zurückgibt.
 */
router.get("/api/password-vaults/:id/entries", async (req, res) => {
  try {
    // Führt die Datenbankabfrage aus, um Passworteinträge für den angegebenen Tresor abzurufen.
    const entries = await db.select().from(passwordEntries).where(eq(passwordEntries.vaultId, Number(req.params.id)));
    // Sendet die abgerufenen Einträge als JSON-Antwort.
    res.json(entries);
  } catch (error) {
    // Fängt Fehler ab, protokolliert sie und sendet eine Fehlerantwort.
    console.error("Fehler beim Laden der Password Entries:", error);
    res.status(500).json({ message: "Failed to fetch password entries" });
  }
});

// Exportiert den Router, um ihn in anderen Teilen der Anwendung nutzen zu können.
export default router;