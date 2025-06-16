// routes/bandwidthMetrics.ts

import { Router } from "express";
import { db } from "../db";
import { bandwidthMetrics } from "@shared/schema";
import { desc, gte, and } from "drizzle-orm";

const router = Router();

router.get("/api/bandwidth-metrics", async (req, res) => {
  try {
    const { limit, days } = req.query as { limit?: string; days?: string };

    const filters = [];

    // Optionaler Filter: letzte X Tage
    if (days) {
      const numDays = parseInt(days, 10);
      if (!isNaN(numDays)) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - numDays);
        filters.push(gte(bandwidthMetrics.timestamp, startDate));
      }
    }

    // Limit setzen (Default: 100)
    let queryLimit = 100;
    if (limit) {
      const numLimit = parseInt(limit, 10);
      if (!isNaN(numLimit)) {
        queryLimit = numLimit;
      }
    }

    const query = db
      .select()
      .from(bandwidthMetrics)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(desc(bandwidthMetrics.timestamp))
      .limit(queryLimit);

    const metrics = await query;
    res.json(metrics);
  } catch (error) {
    console.error("Fehler beim Laden der Bandbreiten-Metriken:", error);
    res.status(500).json({ message: "Failed to fetch bandwidth metrics" });
  }
});

export default router;
