import type { Express } from "express";
// Importiert createServer und den Typ Server aus dem http-Modul.
import { createServer, type Server } from "http";
// Importiert das Speicherobjekt für den Datenbankzugriff.
import { storage } from "./storage";
// Importiert die Zod-Schemas für verschiedene Datentypen.
import { insertDeviceSchema, insertBandwidthMetricSchema, insertSystemMetricSchema, insertSecurityEventSchema, insertIdsRuleSchema, insertPasswordVaultSchema, insertPasswordEntrySchema } from "@shared/schema";
// Importiert Zod für die Schemavalidierung.
import { z } from "zod";

/**
 * Registriert alle API-Routen für die Express-Anwendung.
 * @param app Die Express-Anwendungsinstanz.
 * @returns Eine Promise, die den HTTP-Server auflöst.
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // Routen für Geräte
  /**
   * @swagger
   * /api/devices:
   *   get:
   *     summary: Ruft alle Geräte ab.
   *     description: Ruft eine Liste aller registrierten Geräte aus der Datenbank ab.
   *     responses:
   *       200:
   *         description: Eine Liste von Geräten wurde erfolgreich abgerufen.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Device'
   *       500:
   *         description: Serverfehler beim Abrufen der Geräte.
   */
  app.get("/api/devices", async (req, res) => {
    try {
      // Ruft alle Geräte aus dem Speicher ab.
      const devices = await storage.getDevices();
      // Sendet die Geräte als JSON-Antwort.
      res.json(devices);
    } catch (error) {
      // Bei einem Fehler wird ein Statuscode 500 mit einer Fehlermeldung gesendet.
      res.status(500).json({ message: "Failed to fetch devices" });
    }
  });

  /**
   * @swagger
   * /api/devices/{id}:
   *   get:
   *     summary: Ruft ein Gerät anhand seiner ID ab.
   *     description: Ruft ein einzelnes Gerät aus der Datenbank anhand seiner eindeutigen ID ab.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Die ID des abzurufenden Geräts.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Ein Gerät wurde erfolgreich abgerufen.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Device'
   *       400:
   *         description: Ungültige Geräte-ID.
   *       404:
   *         description: Gerät nicht gefunden.
   *       500:
   *         description: Serverfehler beim Abrufen des Geräts.
   */
  app.get("/api/devices/:id", async (req, res) => {
    try {
      // Extrahiert die Geräte-ID aus den Anfrageparametern und konvertiert sie in eine Ganzzahl.
      const id = parseInt(req.params.id);
      // Überprüft, ob die ID eine gültige Zahl ist.
      if (isNaN(id)) {
        return res.status(400).json({ message: "Ungültige Geräte-ID" });
      }
      // Ruft das Gerät anhand seiner ID aus dem Speicher ab.
      const device = await storage.getDevice(id);
      // Überprüft, ob das Gerät gefunden wurde.
      if (!device) {
        return res.status(404).json({ message: "Gerät nicht gefunden" });
      }
      // Sendet das Gerät als JSON-Antwort.
      res.json(device);
    } catch (error) {
      // Bei einem Fehler wird ein Statuscode 500 mit einer Fehlermeldung gesendet.
      res.status(500).json({ message: "Fehler beim Abrufen des Geräts" });
    }
  });

  /**
   * @swagger
   * /api/devices:
   *   post:
   *     summary: Fügt ein neues Gerät hinzu.
   *     description: Fügt ein neues Gerät zur Datenbank hinzu.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewDevice'
   *     responses:
   *       201:
   *         description: Gerät erfolgreich hinzugefügt.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Device'
   *       400:
   *         description: Ungültige Gerätedaten.
   *       500:
   *         description: Serverfehler beim Hinzufügen des Geräts.
   */
  app.post("/api/devices", async (req, res) => {
    try {
      // Parst die Anfragedaten mit dem insertDeviceSchema.
      const parsedDevice = insertDeviceSchema.parse(req.body);
      // Fügt das neue Gerät in die Datenbank ein.
      const newDevice = await storage.createDevice(parsedDevice);
      // Sendet die Antwort mit dem Status 201 (Created) und dem neuen Gerät.
      res.status(201).json(newDevice);
    } catch (error) {
      // Behandelt Zod-Validierungsfehler.
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Ungültige Gerätedaten", errors: error.errors });
      }
      // Behandelt andere Serverfehler.
      res.status(500).json({ message: "Fehler beim Hinzufügen des Geräts" });
    }
  });

  /**
   * @swagger
   * /api/devices/{id}:
   *   put:
   *     summary: Aktualisiert ein Gerät anhand seiner ID.
   *     description: Aktualisiert die Informationen eines bestehenden Geräts in der Datenbank.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Die ID des zu aktualisierenden Geräts.
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewDevice'
   *     responses:
   *       200:
   *         description: Gerät erfolgreich aktualisiert.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Device'
   *       400:
   *         description: Ungültige Geräte-ID oder ungültige Gerätedaten.
   *       404:
   *         description: Gerät nicht gefunden.
   *       500:
   *         description: Serverfehler beim Aktualisieren des Geräts.
   */
  app.put("/api/devices/:id", async (req, res) => {
    try {
      // Extrahiert die Geräte-ID aus den Anfrageparametern und konvertiert sie in eine Ganzzahl.
      const id = parseInt(req.params.id);
      // Überprüft, ob die ID eine gültige Zahl ist.
      if (isNaN(id)) {
        return res.status(400).json({ message: "Ungültige Geräte-ID" });
      }
      // Parst die Anfragedaten mit dem insertDeviceSchema.
      const parsedDevice = insertDeviceSchema.parse(req.body);
      // Aktualisiert das Gerät in der Datenbank.
      const updatedDevice = await storage.updateDevice(id, parsedDevice);
      // Überprüft, ob das Gerät gefunden und aktualisiert wurde.
      if (!updatedDevice) {
        return res.status(404).json({ message: "Gerät nicht gefunden" });
      }
      // Sendet das aktualisierte Gerät als JSON-Antwort.
      res.json(updatedDevice);
    } catch (error) {
      // Behandelt Zod-Validierungsfehler.
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Ungültige Gerätedaten", errors: error.errors });
      }
      // Behandelt andere Serverfehler.
      res.status(500).json({ message: "Fehler beim Aktualisieren des Geräts" });
    }
  });

  /**
   * @swagger
   * /api/devices/{id}:
   *   delete:
   *     summary: Löscht ein Gerät anhand seiner ID.
   *     description: Löscht ein Gerät aus der Datenbank.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Die ID des zu löschenden Geräts.
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Gerät erfolgreich gelöscht.
   *       400:
   *         description: Ungültige Geräte-ID.
   *       500:
   *         description: Serverfehler beim Löschen des Geräts.
   */
  app.delete("/api/devices/:id", async (req, res) => {
    try {
      // Extrahiert die Geräte-ID aus den Anfrageparametern und konvertiert sie in eine Ganzzahl.
      const id = parseInt(req.params.id);
      // Überprüft, ob die ID eine gültige Zahl ist.
      if (isNaN(id)) {
        return res.status(400).json({ message: "Ungültige Geräte-ID" });
      }
      // Löscht das Gerät aus der Datenbank.
      await storage.deleteDevice(id);
      // Sendet eine leere Antwort mit dem Status 204 (No Content).
      res.status(204).send();
    } catch (error) {
      // Behandelt Serverfehler.
      res.status(500).json({ message: "Fehler beim Löschen des Geräts" });
    }
  });

  // Bandwidth metrics routes
  app.get("/api/bandwidth-metrics", async (req, res) => {
    try {
      const deviceId = req.query.deviceId ? parseInt(req.query.deviceId as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const metrics = await storage.getBandwidthMetrics(deviceId, limit);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bandwidth metrics" });
    }
  });

  /**
   * @swagger
   * /api/bandwidth-metrics:
   *   post:
   *     summary: Fügt eine neue Bandbreitenmetrik hinzu.
   *     description: Fügt eine neue Bandbreitenmetrik zur Datenbank hinzu.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewBandwidthMetric'
   *     responses:
   *       201:
   *         description: Bandbreitenmetrik erfolgreich hinzugefügt.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BandwidthMetric'
   *       400:
   *         description: Ungültige Metrikdaten.
   *       500:
   *         description: Serverfehler beim Hinzufügen der Bandbreitenmetrik.
   */
  app.post("/api/bandwidth-metrics", async (req, res) => {
    try {
      // Parst die Anfragedaten mit dem insertBandwidthMetricSchema.
      const metricData = insertBandwidthMetricSchema.parse(req.body);
      // Erstellt eine neue Bandbreitenmetrik in der Datenbank.
      const metric = await storage.createBandwidthMetric(metricData);
      // Sendet die Antwort mit dem Status 201 (Created) und der neuen Metrik.
      res.status(201).json(metric);
    } catch (error) {
      // Behandelt Zod-Validierungsfehler.
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Ungültige Metrikdaten", errors: error.errors });
      }
      // Behandelt andere Serverfehler.
      res.status(500).json({ message: "Fehler beim Erstellen der Bandbreitenmetrik" });
    }
  });

  // Routen für Systemmetriken
  /**
   * @swagger
   * /api/system-metrics/latest:
   *   get:
   *     summary: Ruft die neuesten Systemmetriken ab.
   *     description: Ruft die aktuellsten Systemmetriken aus der Datenbank ab.
   *     responses:
   *       200:
   *         description: Die neuesten Systemmetriken wurden erfolgreich abgerufen.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SystemMetric'
   *       404:
   *         description: Keine Systemmetriken gefunden.
   *       500:
   *         description: Serverfehler beim Abrufen der Systemmetriken.
   */
  app.get("/api/system-metrics/latest", async (req, res) => {
    try {
      // Ruft die neuesten Systemmetriken aus dem Speicher ab.
      const metrics = await storage.getLatestSystemMetrics();
      // Überprüft, ob Metriken gefunden wurden.
      if (!metrics) {
        return res.status(404).json({ message: "Keine Systemmetriken gefunden" });
      }
      // Sendet die Metriken als JSON-Antwort.
      res.json(metrics);
    } catch (error) {
      // Behandelt Serverfehler.
      res.status(500).json({ message: "Fehler beim Abrufen der Systemmetriken" });
    }
  });

  /**
   * @swagger
   * /api/system-metrics/history:
   *   get:
   *     summary: Ruft den Verlauf der Systemmetriken ab.
   *     description: Ruft eine Liste der historischen Systemmetriken ab, optional begrenzt durch eine Anzahl.
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Die maximale Anzahl der abzurufenden Metriken.
   *     responses:
   *       200:
   *         description: Der Verlauf der Systemmetriken wurde erfolgreich abgerufen.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/SystemMetric'
   *       500:
   *         description: Serverfehler beim Abrufen des Verlaufs der Systemmetriken.
   */
  app.get("/api/system-metrics/history", async (req, res) => {
    try {
      // Extrahiert den 'limit'-Parameter aus der Anfrage und konvertiert ihn in eine Ganzzahl.
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      // Ruft den Verlauf der Systemmetriken aus dem Speicher ab.
      const metrics = await storage.getSystemMetricsHistory(limit);
      // Sendet die Metriken als JSON-Antwort.
      res.json(metrics);
    } catch (error) {
      // Behandelt Serverfehler.
      res.status(500).json({ message: "Fehler beim Abrufen des Verlaufs der Systemmetriken" });
    }
  });

  /**
   * @swagger
   * /api/system-metrics:
   *   post:
   *     summary: Fügt eine neue Systemmetrik hinzu.
   *     description: Fügt eine neue Systemmetrik zur Datenbank hinzu.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewSystemMetric'
   *     responses:
   *       201:
   *         description: Systemmetrik erfolgreich hinzugefügt.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SystemMetric'
   *       400:
   *         description: Ungültige Metrikdaten.
   *       500:
   *         description: Serverfehler beim Hinzufügen der Systemmetrik.
   */
  app.post("/api/system-metrics", async (req, res) => {
    try {
      // Parst die Anfragedaten mit dem insertSystemMetricSchema.
      const metricData = insertSystemMetricSchema.parse(req.body);
      // Erstellt eine neue Systemmetrik in der Datenbank.
      const metric = await storage.createSystemMetric(metricData);
      // Sendet die Antwort mit dem Status 201 (Created) und der neuen Metrik.
      res.status(201).json(metric);
    } catch (error) {
      // Behandelt Zod-Validierungsfehler.
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Ungültige Metrikdaten", errors: error.errors });
      }
      // Behandelt andere Serverfehler.
      res.status(500).json({ message: "Fehler beim Erstellen der Systemmetrik" });
    }
  });

  // Generate mock real-time data for demonstration
  app.post("/api/generate-mock-data", async (req, res) => {
    try {
      // Generate bandwidth metrics for the last 24 hours
      const now = new Date();
      const devices = await storage.getDevices();
      
      for (let i = 0; i < 24; i++) {
        const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
        
        // Generate bandwidth metrics for each device
        for (const device of devices) {
          if (device.status === "online" || device.status === "warning") {
            await storage.createBandwidthMetric({
              deviceId: device.id,
              incoming: Math.random() * 3,
              outgoing: Math.random() * 2.5,
            });
          }
        }
        
        // Generate system metrics
        await storage.createSystemMetric({
          activeDevices: Math.floor(120 + Math.random() * 10),
          totalBandwidth: 2 + Math.random() * 1,
          warnings: Math.floor(Math.random() * 5),
          uptime: 99 + Math.random() * 1,
        });
      }
      
      res.json({ message: "Mock data generated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate mock data" });
    }
  });

  // Routen für Sicherheitsereignisse
  /**
   * @swagger
   * /api/security-events:
   *   get:
   *     summary: Ruft Sicherheitsereignisse ab.
   *     description: Ruft eine Liste von Sicherheitsereignissen aus der Datenbank ab, optional gefiltert nach Status und begrenzt durch eine Anzahl.
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Die maximale Anzahl der abzurufenden Ereignisse.
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [new, acknowledged, resolved]
   *         description: Filtert Ereignisse nach ihrem Status.
   *     responses:
   *       200:
   *         description: Eine Liste von Sicherheitsereignissen wurde erfolgreich abgerufen.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/SecurityEvent'
   *       500:
   *         description: Serverfehler beim Abrufen der Sicherheitsereignisse.
   */
  app.get("/api/security-events", async (req, res) => {
    try {
      // Extrahiert den 'limit'-Parameter aus der Anfrage und konvertiert ihn in eine Ganzzahl.
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      // Extrahiert den 'status'-Parameter aus der Anfrage.
      const status = req.query.status as string;
      
      let events;
      // Überprüft, ob ein Statusfilter angewendet werden soll.
      if (status) {
        // Ruft Sicherheitsereignisse nach Status und Limit ab.
        events = await storage.getSecurityEventsByStatus(status, limit);
      } else {
        // Ruft alle Sicherheitsereignisse mit optionalem Limit ab.
        events = await storage.getSecurityEvents(limit);
      }
      
      // Sendet die Ereignisse als JSON-Antwort.
      res.json(events);
    } catch (error) {
      // Behandelt Serverfehler.
      res.status(500).json({ message: "Fehler beim Abrufen der Sicherheitsereignisse" });
    }
  });

  /**
   * @swagger
   * /api/security-events:
   *   post:
   *     summary: Fügt ein neues Sicherheitsereignis hinzu.
   *     description: Fügt ein neues Sicherheitsereignis zur Datenbank hinzu.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewSecurityEvent'
   *     responses:
   *       201:
   *         description: Sicherheitsereignis erfolgreich hinzugefügt.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SecurityEvent'
   *       400:
   *         description: Ungültige Ereignisdaten.
   *       500:
   *         description: Serverfehler beim Hinzufügen des Sicherheitsereignisses.
   */
  app.post("/api/security-events", async (req, res) => {
    try {
      // Parst die Anfragedaten mit dem insertSecurityEventSchema.
      const eventData = insertSecurityEventSchema.parse(req.body);
      // Erstellt ein neues Sicherheitsereignis in der Datenbank.
      const event = await storage.createSecurityEvent(eventData);
      // Sendet die Antwort mit dem Status 201 (Created) und dem neuen Ereignis.
      res.status(201).json(event);
    } catch (error) {
      // Behandelt Zod-Validierungsfehler.
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Ungültige Ereignisdaten", errors: error.errors });
      }
      // Behandelt andere Serverfehler.
      res.status(500).json({ message: "Fehler beim Erstellen des Sicherheitsereignisses" });
    }
  });

  app.put("/api/security-events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      
      const updateData = insertSecurityEventSchema.partial().parse(req.body);
      const event = await storage.updateSecurityEvent(id, updateData);
      
      if (!event) {
        return res.status(404).json({ message: "Security event not found" });
      }
      
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid event data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update security event" });
    }
  });

  app.delete("/api/security-events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      
      const deleted = await storage.deleteSecurityEvent(id);
      if (!deleted) {
        return res.status(404).json({ message: "Security event not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete security event" });
    }
  });

  // Routen für IDS-Regeln
  /**
   * @swagger
   * /api/ids-rules:
   *   get:
   *     summary: Ruft alle IDS-Regeln ab.
   *     description: Ruft eine Liste aller Intrusion Detection System (IDS)-Regeln aus der Datenbank ab.
   *     responses:
   *       200:
   *         description: Eine Liste von IDS-Regeln wurde erfolgreich abgerufen.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/IDSRule'
   *       500:
   *         description: Serverfehler beim Abrufen der IDS-Regeln.
   */
  app.get("/api/ids-rules", async (req, res) => {
    try {
      // Ruft alle IDS-Regeln aus dem Speicher ab.
      const rules = await storage.getIdsRules();
      // Sendet die Regeln als JSON-Antwort.
      res.json(rules);
    } catch (error) {
      // Behandelt Serverfehler.
      res.status(500).json({ message: "Fehler beim Abrufen der IDS-Regeln" });
    }
  });

  app.get("/api/ids-rules/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid rule ID" });
      }
      
      const rule = await storage.getIdsRule(id);
      if (!rule) {
        return res.status(404).json({ message: "IDS rule not found" });
      }
      
      res.json(rule);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch IDS rule" });
    }
  });

  /**
   * @swagger
   * /api/ids-rules:
   *   post:
   *     summary: Fügt eine neue IDS-Regel hinzu.
   *     description: Fügt eine neue Intrusion Detection System (IDS)-Regel zur Datenbank hinzu.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewIDSRule'
   *     responses:
   *       201:
   *         description: IDS-Regel erfolgreich hinzugefügt.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/IDSRule'
   *       400:
   *         description: Ungültige Regeldaten.
   *       500:
   *         description: Serverfehler beim Hinzufügen der IDS-Regel.
   */
  app.post("/api/ids-rules", async (req, res) => {
    try {
      // Parst die Anfragedaten mit dem insertIDSRuleSchema.
      const ruleData = insertIdsRuleSchema.parse(req.body);
      // Erstellt eine neue IDS-Regel in der Datenbank.
      const rule = await storage.createIdsRule(ruleData);
      // Sendet die Antwort mit dem Status 201 (Created) und der neuen Regel.
      res.status(201).json(rule);
    } catch (error) {
      // Behandelt Zod-Validierungsfehler.
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Ungültige Regeldaten", errors: error.errors });
      }
      // Behandelt andere Serverfehler.
      res.status(500).json({ message: "Fehler beim Erstellen der IDS-Regel" });
    }
  });

  /**
   * @swagger
   * /api/ids-rules/{id}:
   *   put:
   *     summary: Aktualisiert eine IDS-Regel.
   *     description: Aktualisiert eine bestehende Intrusion Detection System (IDS)-Regel anhand ihrer ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Die ID der zu aktualisierenden IDS-Regel.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateIDSRule'
   *     responses:
   *       200:
   *         description: IDS-Regel erfolgreich aktualisiert.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/IDSRule'
   *       400:
   *         description: Ungültige Regeldaten.
   *       404:
   *         description: IDS-Regel nicht gefunden.
   *       500:
   *         description: Serverfehler beim Aktualisieren der IDS-Regel.
   */
  app.put("/api/ids-rules/:id", async (req, res) => {
    try {
      // Extrahiert die ID aus den Anfrageparametern.
      const { id } = req.params;
      // Parst die Anfragedaten mit dem updateIDSRuleSchema.
      const ruleData = insertIdsRuleSchema.parse(req.body);
      // Aktualisiert die IDS-Regel in der Datenbank.
      const updatedRule = await storage.updateIdsRule(parseInt(id), ruleData);
      // Überprüft, ob die Regel aktualisiert wurde.
      if (updatedRule) {
        // Sendet die aktualisierte Regel als JSON-Antwort.
        res.json(updatedRule);
      } else {
        // Sendet eine 404-Antwort, wenn die Regel nicht gefunden wurde.
        res.status(404).json({ message: "IDS-Regel nicht gefunden" });
      }
    } catch (error) {
      // Behandelt Zod-Validierungsfehler.
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Ungültige Regeldaten", errors: error.errors });
      }
      // Behandelt andere Serverfehler.
      res.status(500).json({ message: "Fehler beim Aktualisieren der IDS-Regel" });
    }
  });

  /**
   * @swagger
   * /api/ids-rules/{id}:
   *   delete:
   *     summary: Löscht eine IDS-Regel.
   *     description: Löscht eine bestehende Intrusion Detection System (IDS)-Regel anhand ihrer ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Die ID der zu löschenden IDS-Regel.
   *     responses:
   *       204:
   *         description: IDS-Regel erfolgreich gelöscht.
   *       404:
   *         description: IDS-Regel nicht gefunden.
   *       500:
   *         description: Serverfehler beim Löschen der IDS-Regel.
   */
  app.delete("/api/ids-rules/:id", async (req, res) => {
    try {
      // Extrahiert die ID aus den Anfrageparametern.
      const { id } = req.params;
      // Löscht die IDS-Regel aus der Datenbank.
      const deleted = await storage.deleteIdsRule(Number(id));
      // Überprüft, ob die Regel gelöscht wurde.
      if (deleted) {
        // Sendet eine 204-Antwort (No Content) bei erfolgreicher Löschung.
        res.status(204).send();
      } else {
        // Sendet eine 404-Antwort, wenn die Regel nicht gefunden wurde.
        res.status(404).json({ message: "IDS-Regel nicht gefunden" });
      }
    } catch (error) {
      // Behandelt Serverfehler.
      res.status(500).json({ message: "Fehler beim Löschen der IDS-Regel" });
    }
  });

  // Password Manager routes
  app.get("/api/password-vaults", async (req, res) => {
    try {
      const vaults = await storage.getPasswordVaults();
      res.json(vaults);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch password vaults" });
    }
  });

  app.post("/api/password-vaults", async (req, res) => {
    try {
      const vaultData = insertPasswordVaultSchema.parse(req.body);
      const vault = await storage.createPasswordVault(vaultData);
      res.status(201).json(vault);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vault data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create password vault" });
    }
  });

  app.get("/api/password-entries", async (req, res) => {
    try {
      const vaultId = req.query.vaultId ? parseInt(req.query.vaultId as string) : undefined;
      const entries = await storage.getPasswordEntries(vaultId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch password entries" });
    }
  });

  app.post("/api/password-entries", async (req, res) => {
    try {
      const entryData = insertPasswordEntrySchema.parse(req.body);
      const entry = await storage.createPasswordEntry(entryData);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid entry data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create password entry" });
    }
  });

  app.put("/api/password-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid entry ID" });
      }
      
      const updateData = insertPasswordEntrySchema.partial().parse(req.body);
      const entry = await storage.updatePasswordEntry(id, updateData);
      
      if (!entry) {
        return res.status(404).json({ message: "Password entry not found" });
      }
      
      res.json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid entry data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update password entry" });
    }
  });

  app.delete("/api/password-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid entry ID" });
      }
      
      const deleted = await storage.deletePasswordEntry(id);
      if (!deleted) {
        return res.status(404).json({ message: "Password entry not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete password entry" });
    }
  });

  // Routen für Protokolle
  /**
   * @swagger
   * /api/logs:
   *   get:
   *     summary: Ruft alle Protokolle ab.
   *     description: Ruft eine Liste aller Protokolleinträge aus der Datenbank ab.
   *     responses:
   *       200:
   *         description: Eine Liste von Protokollen wurde erfolgreich abgerufen.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/LogEntry'
   *       500:
   *         description: Serverfehler beim Abrufen der Protokolle.
   */
  app.get("/api/logs", async (req, res) => {
    try {
      // Ruft alle Protokolle aus dem Speicher ab.
      const logs = await storage.getSecurityEvents(); // Using getSecurityEvents() instead since getSystemLogs() doesn't exist
      // Sendet die Protokolle als JSON-Antwort.
      res.json(logs);
    } catch (error) {
      // Behandelt Serverfehler.
      res.status(500).json({ message: "Fehler beim Abrufen der Protokolle" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
