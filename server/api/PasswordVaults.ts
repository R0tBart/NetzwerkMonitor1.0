import { Router } from "express";
import { db } from "../db";
import { passwordVaults, passwordEntries } from "@shared/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/api/password-vaults", async (_req, res) => {
  try {
    const vaults = await db.select().from(passwordVaults);
    res.json(vaults);
  } catch (error) {
    console.error("Fehler beim Laden der Password Vaults:", error);
    res.status(500).json({ message: "Failed to fetch password vaults" });
  }
});

router.get("/api/password-vaults/:id/entries", async (req, res) => {
  try {
    const entries = await db.select().from(passwordEntries).where(eq(passwordEntries.vaultId, Number(req.params.id)));
    res.json(entries);
  } catch (error) {
    console.error("Fehler beim Laden der Password Entries:", error);
    res.status(500).json({ message: "Failed to fetch password entries" });
  }
});

export default router;