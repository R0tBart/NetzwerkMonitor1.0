import { Router } from "express";
import { db } from "../db";
import { securityEvents } from "@shared/schema";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/api/security-events", async (_req, res) => {
  try {
    const events = await db.select().from(securityEvents).orderBy(desc(securityEvents.timestamp)).limit(100);
    res.json(events);
  } catch (error) {
    console.error("Fehler beim Laden der Security Events:", error);
    res.status(500).json({ message: "Failed to fetch security events" });
  }
});

export default router;