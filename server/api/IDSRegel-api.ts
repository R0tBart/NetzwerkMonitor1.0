import { Router } from "express";
import { db } from "../db";
import { idsRules } from "@shared/schema";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/api/ids-rules", async (_req, res) => {
  try {
    const rules = await db.select().from(idsRules).orderBy(desc(idsRules.updatedAt)).limit(100);
    res.json(rules);
  } catch (error) {
    console.error("Fehler beim Laden der IDS-Regeln:", error);
    res.status(500).json({ message: "Failed to fetch IDS rules" });
  }
});

export default router;