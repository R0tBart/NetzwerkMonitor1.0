import { Router } from "express";
import { db } from "../db";
import { devices } from "@shared/schema";

const router = Router();

router.get("/api/devices", async (_req, res) => {
  try {
    const allDevices = await db.select().from(devices);
    res.json(allDevices);
  } catch (error) {
    console.error("Fehler beim Laden der Geräte:", error);
    res.status(500).json({ message: "Failed to fetch devices" });
  }
});

export default router;