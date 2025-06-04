import { Router } from "express";
import { db } from "../db";
import { bandwidthMetrics } from "@shared/schema";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/api/bandwidth-metrics", async (_req, res) => {
  try {
    const metrics = await db.select().from(bandwidthMetrics).orderBy(desc(bandwidthMetrics.timestamp)).limit(100);
    res.json(metrics);
  } catch (error) {
    console.error("Fehler beim Laden der Bandbreiten-Metriken:", error);
    res.status(500).json({ message: "Failed to fetch bandwidth metrics" });
  }
});

export default router;