import { Router } from "express";
import { db } from "../db";
import { systemMetrics } from "@shared/schema";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/api/system-metrics/latest", async (_req, res) => {
  try {
    const latest = await db.select().from(systemMetrics).orderBy(desc(systemMetrics.timestamp)).limit(1);
    res.json(latest[0] || {});
  } catch (error) {
    console.error("Fehler beim Laden der System-Metriken:", error);
    res.status(500).json({ message: "Failed to fetch system metrics" });
  }
});

export default router;