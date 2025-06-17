import { devices, bandwidthMetrics, systemMetrics, securityEvents, idsRules, passwordVaults, passwordEntries, type Device, type InsertDevice, type BandwidthMetric, type InsertBandwidthMetric, type SystemMetric, type InsertSystemMetric, type SecurityEvent, type InsertSecurityEvent, type IdsRule, type InsertIdsRule, type PasswordVault, type InsertPasswordVault, type PasswordEntry, type InsertPasswordEntry } from "@shared/schema";
// Importiert die Datenbankinstanz.
import { db } from "./db";
// Importiert 'eq' für Gleichheitsabfragen und 'desc' für absteigende Sortierung von Drizzle ORM.
import { eq, desc } from "drizzle-orm";

/**
 * Definiert das Interface für die Speicherschicht, die alle Datenzugriffsmethoden bereitstellt.
 */
export interface IStorage {
  // Device operations
  getDevices(): Promise<Device[]>;
  getDevice(id: number): Promise<Device | undefined>;
  createDevice(device: InsertDevice): Promise<Device>;
  updateDevice(id: number, device: Partial<InsertDevice>): Promise<Device | undefined>;
  deleteDevice(id: number): Promise<boolean>;
  
  // Bandwidth metrics operations
  getBandwidthMetrics(deviceId?: number, limit?: number): Promise<BandwidthMetric[]>;
  createBandwidthMetric(metric: InsertBandwidthMetric): Promise<BandwidthMetric>;
  
  // System metrics operations
  getLatestSystemMetrics(): Promise<SystemMetric | undefined>;
  createSystemMetric(metric: InsertSystemMetric): Promise<SystemMetric>;
  getSystemMetricsHistory(limit?: number): Promise<SystemMetric[]>;
  
  // Security events operations (IDS)
  getSecurityEvents(limit?: number): Promise<SecurityEvent[]>;
  getSecurityEventsByStatus(status: string, limit?: number): Promise<SecurityEvent[]>;
  createSecurityEvent(event: InsertSecurityEvent): Promise<SecurityEvent>;
  updateSecurityEvent(id: number, event: Partial<InsertSecurityEvent>): Promise<SecurityEvent | undefined>;
  deleteSecurityEvent(id: number): Promise<boolean>;
  
  // IDS rules operations
  getIdsRules(): Promise<IdsRule[]>;
  getIdsRule(id: number): Promise<IdsRule | undefined>;
  createIdsRule(rule: InsertIdsRule): Promise<IdsRule>;
  updateIdsRule(id: number, rule: Partial<InsertIdsRule>): Promise<IdsRule | undefined>;
  deleteIdsRule(id: number): Promise<boolean>;
  
  // Password Manager operations
  getPasswordVaults(): Promise<PasswordVault[]>;
  getPasswordVault(id: number): Promise<PasswordVault | undefined>;
  createPasswordVault(vault: InsertPasswordVault): Promise<PasswordVault>;
  updatePasswordVault(id: number, vault: Partial<InsertPasswordVault>): Promise<PasswordVault | undefined>;
  deletePasswordVault(id: number): Promise<boolean>;
  
  getPasswordEntries(vaultId?: number): Promise<PasswordEntry[]>;
  getPasswordEntry(id: number): Promise<PasswordEntry | undefined>;
  createPasswordEntry(entry: InsertPasswordEntry): Promise<PasswordEntry>;
  updatePasswordEntry(id: number, entry: Partial<InsertPasswordEntry>): Promise<PasswordEntry | undefined>;
  deletePasswordEntry(id: number): Promise<boolean>;
}

/**
 * Implementierung des Speichers, der alle Daten im Arbeitsspeicher (Maps) hält.
 * Diese Klasse dient zu Demonstrations- und Testzwecken und speichert keine Daten persistent.
 */
export class MemStorage implements IStorage {
  private devices: Map<number, Device>;
  private bandwidthMetrics: Map<number, BandwidthMetric>;
  private systemMetrics: Map<number, SystemMetric>;
  private securityEvents: Map<number, SecurityEvent>;
  private idsRules: Map<number, IdsRule>;
  private passwordVaults: Map<number, PasswordVault>;
  private passwordEntries: Map<number, PasswordEntry>;
  private currentDeviceId: number;
  private currentBandwidthMetricId: number;
  private currentSystemMetricId: number;
  private currentSecurityEventId: number;
  private currentIdsRuleId: number;
  private currentPasswordVaultId: number;
  private currentPasswordEntryId: number;

  /**
   * Konstruktor für MemStorage.
   * Initialisiert alle Maps und Zähler für die IDs und lädt Beispieldaten.
   */
  constructor() {
    // Initialisiert Maps zum Speichern von Daten im Arbeitsspeicher.
    this.devices = new Map();
    this.bandwidthMetrics = new Map();
    this.systemMetrics = new Map();
    this.securityEvents = new Map();
    this.idsRules = new Map();
    this.passwordVaults = new Map();
    this.passwordEntries = new Map();
    // Initialisiert Zähler für eindeutige IDs.
    this.currentDeviceId = 1;
    this.currentBandwidthMetricId = 1;
    this.currentSystemMetricId = 1;
    this.currentSecurityEventId = 1;
    this.currentIdsRuleId = 1;
    this.currentPasswordVaultId = 1;
    this.currentPasswordEntryId = 1;
    
    // Initialisiert mit Beispieldaten.
    this.initializeSampleData();
  }
  /**
   * Ruft alle Passwort-Tresore ab.
   * @returns Ein Promise, das ein Array aller Passwort-Tresore zurückgibt.
   */
  async getPasswordVaults(): Promise<PasswordVault[]> {
    // Im Speicher: Gibt einfach alle vorhandenen Tresore zurück.
    return Array.from(this.passwordVaults.values());
  }

  /**
   * Ruft einen einzelnen Passwort-Tresor anhand seiner ID ab.
   * @param id Die ID des abzurufenden Passwort-Tresors.
   * @returns Ein Promise, das den gefundenen Passwort-Tresor oder undefined zurückgibt.
   */
  async getPasswordVault(id: number): Promise<PasswordVault | undefined> {
    // Stellt sicher, dass die Map initialisiert ist.
    if (!this["passwordVaults"]) {
      this["passwordVaults"] = new Map<number, PasswordVault>();
    }
    return this["passwordVaults"].get(id);
  }
  /**
   * Erstellt einen neuen Passwort-Tresor.
   * @param vault Die Daten des zu erstellenden Passwort-Tresors.
   * @returns Ein Promise, das den erstellten Passwort-Tresor zurückgibt.
   */
  createPasswordVault(vault: InsertPasswordVault): Promise<PasswordVault> {
    const newVault = {
      id: this.currentPasswordVaultId++,
      ...vault,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.passwordVaults.set(newVault.id, {
      id: newVault.id,
      name: newVault.name,
      description: newVault.description ?? null,
      createdAt: newVault.createdAt,
      updatedAt: newVault.updatedAt
    });
    return Promise.resolve({
      id: newVault.id,
      name: newVault.name,
      description: newVault.description ?? null,
      createdAt: newVault.createdAt,
      updatedAt: newVault.updatedAt
    });
  }

  /**
   * Aktualisiert einen bestehenden Passwort-Tresor.
   * @param id Die ID des zu aktualisierenden Passwort-Tresors.
   * @param vault Die zu aktualisierenden Daten des Passwort-Tresors.
   * @returns Ein Promise, das den aktualisierten Passwort-Tresor oder undefined zurückgibt, falls nicht gefunden.
   */
  updatePasswordVault(id: number, vault: Partial<InsertPasswordVault>): Promise<PasswordVault | undefined> {
    const existingVault = this.passwordVaults.get(id);
    if (!existingVault) {
      return Promise.resolve(undefined);
    }
    const updatedVault = { ...existingVault, ...vault, updatedAt: new Date() };
    this.passwordVaults.set(id, updatedVault);
    return Promise.resolve(updatedVault);
  }

  /**
   * Löscht einen Passwort-Tresor anhand seiner ID.
   * @param id Die ID des zu löschenden Passwort-Tresors.
   * @returns Ein Promise, das true zurückgibt, wenn der Tresor gelöscht wurde, sonst false.
   */
  deletePasswordVault(id: number): Promise<boolean> {
    return Promise.resolve(this.passwordVaults.delete(id));
  }

  /**
   * Ruft alle Passworteinträge ab, optional gefiltert nach Tresor-ID.
   * @param vaultId Optional: Die ID des Tresors, dessen Einträge abgerufen werden sollen.
   * @returns Ein Promise, das ein Array von Passworteinträgen zurückgibt.
   */
  getPasswordEntries(vaultId?: number): Promise<PasswordEntry[]> {
    let entries = Array.from(this.passwordEntries.values());
    if (vaultId) {
      entries = entries.filter(entry => entry.vaultId === vaultId);
    }
    return Promise.resolve(entries);
  }

  /**
   * Ruft einen einzelnen Passworteintrag anhand seiner ID ab.
   * @param id Die ID des abzurufenden Passworteintrags.
   * @returns Ein Promise, das den gefundenen Passworteintrag oder undefined zurückgibt.
   */
  getPasswordEntry(id: number): Promise<PasswordEntry | undefined> {
    return Promise.resolve(this.passwordEntries.get(id));
  }

  /**
   * Erstellt einen neuen Passworteintrag.
   * @param entry Die Daten des zu erstellenden Passworteintrags.
   * @returns Ein Promise, das den erstellten Passworteintrag zurückgibt.
   */
  createPasswordEntry(entry: InsertPasswordEntry): Promise<PasswordEntry> {
    const newEntry = {
      id: this.currentPasswordEntryId++,
      ...entry,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastUsed: null, // Set to null initially
    };
    this.passwordEntries.set(newEntry.id, {
      id: newEntry.id,
      createdAt: newEntry.createdAt,
      updatedAt: newEntry.updatedAt,
      vaultId: newEntry.vaultId,
      title: newEntry.title,
      username: newEntry.username ?? null,
      email: newEntry.email ?? null,
      encryptedPassword: newEntry.encryptedPassword,
      website: newEntry.website ?? null,
      notes: newEntry.notes ?? null,
      category: newEntry.category ?? null,
      isFavorite: newEntry.isFavorite ?? false,
      lastUsed: newEntry.lastUsed
    });
    return Promise.resolve({
      id: newEntry.id,
      createdAt: newEntry.createdAt,
      updatedAt: newEntry.updatedAt,
      vaultId: newEntry.vaultId,
      title: newEntry.title,
      username: newEntry.username ?? null,
      email: newEntry.email ?? null,
      encryptedPassword: newEntry.encryptedPassword,
      website: newEntry.website ?? null,
      notes: newEntry.notes ?? null,
      category: newEntry.category ?? null,
      isFavorite: newEntry.isFavorite ?? false,
      lastUsed: newEntry.lastUsed
    });
  }

  /**
   * Aktualisiert einen bestehenden Passworteintrag.
   * @param id Die ID des zu aktualisierenden Passworteintrags.
   * @param entry Die zu aktualisierenden Daten des Passworteintrags.
   * @returns Ein Promise, das den aktualisierten Passworteintrag oder undefined zurückgibt, falls nicht gefunden.
   */
  updatePasswordEntry(id: number, entry: Partial<InsertPasswordEntry>): Promise<PasswordEntry | undefined> {
    const existingEntry = this.passwordEntries.get(id);
    if (!existingEntry) {
      return Promise.resolve(undefined);
    }
    const updatedEntry = { ...existingEntry, ...entry, updatedAt: new Date() };
    this.passwordEntries.set(id, updatedEntry);
    return Promise.resolve(updatedEntry);
  }

  /**
   * Löscht einen Passworteintrag anhand seiner ID.
   * @param id Die ID des zu löschenden Passworteintrags.
   * @returns Ein Promise, das true zurückgibt, wenn der Eintrag gelöscht wurde, sonst false.
   */
  deletePasswordEntry(id: number): Promise<boolean> {
    return Promise.resolve(this.passwordEntries.delete(id));
  }

  /**
   * Initialisiert die Speicherschicht mit Beispieldaten für Geräte, Systemmetriken und IDS-Regeln.
   */
  private initializeSampleData() {
    // Erstellt Beispieldaten für Geräte.
    const sampleDevices: InsertDevice[] = [
      {
        name: "Core Router R1",
        type: "router",
        ipAddress: "192.168.1.1",
        status: "online",
        bandwidth: 450,
        maxBandwidth: 1000,
        model: "Cisco ASR 1000",
        location: "Data Center A",
      },
      {
        name: "Switch SW-01",
        type: "switch",
        ipAddress: "192.168.1.10",
        status: "online",
        bandwidth: 320,
        maxBandwidth: 600,
        model: "HP ProCurve 2920",
        location: "Floor 1",
      },
      {
        name: "Access Point AP-01",
        type: "access_point",
        ipAddress: "192.168.1.20",
        status: "warning",
        bandwidth: 890,
        maxBandwidth: 1000,
        model: "Ubiquiti UniFi",
        location: "Floor 2",
      },
      {
        name: "Firewall FW-01",
        type: "firewall",
        ipAddress: "192.168.1.5",
        status: "offline",
        bandwidth: 0,
        maxBandwidth: 500,
        model: "Fortinet FortiGate",
        location: "DMZ",
      },
    ];

    // Fügt die Beispieldaten der Geräte-Map hinzu.
    sampleDevices.forEach(device => {
      const id = this.currentDeviceId++;
      const fullDevice: Device = {
        id,
        name: device.name,
        type: device.type,
        status: device.status ?? "",
        ipAddress: device.ipAddress,
        bandwidth: device.bandwidth ?? 0,
        maxBandwidth: device.maxBandwidth ?? 0,
        lastActivity: new Date(),
        model: device.model ?? null,
        location: device.location ?? null,
      };
      this.devices.set(id, fullDevice);
    });

    // Erstellt anfängliche Systemmetriken.
    const initialMetrics: InsertSystemMetric = {
      activeDevices: 127,
      totalBandwidth: 2.4,
      warnings: 3,
      uptime: 99.9,
    };
    
    // Erstellt ein Systemmetrik-Objekt und fügt es der Map hinzu.
    const systemMetric: SystemMetric = {
      ...initialMetrics,
      id: this.currentSystemMetricId++,
      timestamp: new Date(),
    };
    this.systemMetrics.set(systemMetric.id, systemMetric);

    // Initialisiert Beispieldaten für IDS-Regeln.
    const sampleIdsRules: InsertIdsRule[] = [
      {
        name: "SSH Brute Force Detection",
        description: "Erkennt wiederholte SSH-Anmeldeversuche von derselben IP",
        pattern: "^.*sshd.*Failed password.*from\\s+(\\d+\\.\\d+\\.\\d+\\.\\d+)",
        severity: "high",
        enabled: true,
      },
      {
        name: "Port Scan Detection",
        description: "Erkennt verdächtige Port-Scanning-Aktivitäten",
        pattern: "TCP.*SYN.*multiple_ports",
        severity: "medium",
        enabled: true,
      },
      {
        name: "Malware Communication",
        description: "Erkennt bekannte Malware-Kommunikationsmuster",
        pattern: ".*\\.exe.*suspicious_domain\\.com",
        severity: "critical",
        enabled: true,
      },
      {
        name: "Unusual Traffic Volume",
        description: "Erkennt ungewöhnlich hohe Datenübertragung",
        pattern: "bandwidth_threshold_exceeded",
        severity: "medium",
        enabled: true,
      },
    ];

    // Fügt die Beispieldaten der IDS-Regel-Map hinzu.
    sampleIdsRules.forEach(rule => {
      const id = this.currentIdsRuleId++;
      const fullRule: IdsRule = {
        ...rule,
        enabled: rule.enabled === undefined ? false : rule.enabled,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.idsRules.set(id, fullRule);
    });

    // Initialisiert Beispieldaten für Passwort-Tresore.
    const samplePasswordVaults: InsertPasswordVault[] = [
      {
        name: "Persönlicher Tresor",
        description: "Mein persönlicher Passwort-Tresor",
      },
      {
        name: "Arbeitstresor",
        description: "Passwörter für Arbeitskonten",
      },
    ];

    // Fügt die Beispieldaten der Passwort-Tresor-Map hinzu.
    samplePasswordVaults.forEach(vault => {
      const id = this.currentPasswordVaultId++;
      const fullVault: PasswordVault = {
        id: id,
// Remove redundant name assignment since it's already included in ...vault spread
        description: vault.description ?? null,
        ...vault,
// Remove duplicate id property since it's already included in the spread operator
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.passwordVaults.set(id, fullVault);
    });

    // Initialisiert Beispieldaten für Passworteinträge.
    const samplePasswordEntries: InsertPasswordEntry[] = [
      {
        vaultId: 1,
        title: "Beispiel-Website",
        username: "user@example.com",
        encryptedPassword: "securepassword123",
        website: "https://www.example.com",
        notes: "Dies ist ein Beispiel-Passworteintrag.",
      },
      {
        vaultId: 1,
        title: "Online-Banking",
        username: "banking_user",
        encryptedPassword: "banksecure!",
        website: "https://www.mybank.com",
        notes: "Wichtig: MFA aktiviert.",
      },
      {
        vaultId: 2,
        title: "Firmen-VPN",
        username: "vpn_user",
        encryptedPassword: "corporateVPN#",
        website: "https://vpn.company.com",
        notes: "Nur für den internen Gebrauch.",
      },
    ];

    // Fügt die Beispieldaten der Passworteintrag-Map hinzu.
    samplePasswordEntries.forEach(entry => {
      const id = this.currentPasswordEntryId++;
      const fullEntry: PasswordEntry = {
        id: id,
        createdAt: new Date(),
        updatedAt: new Date(),
// vaultId is already included in the spread operator below, so this line can be removed
// Remove redundant title assignment since it's included in the spread operator below
        username: entry.username ?? null,
        email: entry.email ?? null,
// Remove this line since encryptedPassword is already included in the spread operator below
        website: entry.website ?? null,
        notes: entry.notes ?? null,
        category: entry.category ?? null,
        isFavorite: entry.isFavorite ?? false,
        lastUsed: null,
        ...entry,
      };
      this.passwordEntries.set(id, fullEntry);
    });

    // Initialize sample security events
    const sampleSecurityEvents: InsertSecurityEvent[] = [
      {
        eventType: "brute_force",
        severity: "high",
        sourceIp: "45.123.45.67",
        targetIp: "192.168.1.1",
        description: "Mehrfache fehlgeschlagene SSH-Anmeldeversuche erkannt",
        status: "new",
        deviceId: 1,
      },
      {
        eventType: "port_scan",
        severity: "medium",
        sourceIp: "178.62.199.34",
        targetIp: "192.168.1.10",
        description: "Port-Scan-Aktivität von externer IP erkannt",
        status: "investigating",
        deviceId: 2,
      },
      {
        eventType: "unusual_traffic",
        severity: "medium",
        sourceIp: "192.168.1.20",
        targetIp: "203.0.113.5",
        description: "Ungewöhnlich hoher ausgehender Datenverkehr",
        status: "new",
        deviceId: 3,
      },
      {
        eventType: "intrusion_attempt",
        severity: "critical",
        sourceIp: "198.51.100.23",
        targetIp: "192.168.1.5",
        description: "Verdächtiger Einbruchsversuch in Firewall erkannt",
        status: "resolved",
        deviceId: 4,
      },
    ];

    // Fügt die Beispieldaten der Sicherheitsereignis-Map hinzu.
    sampleSecurityEvents.forEach(event => {
      const id = this.currentSecurityEventId++;
      const fullEvent: SecurityEvent = {
        ...event,
        status: event.status ?? "",
        id,
        timestamp: new Date(Date.now() - Math.random() * 86400000), // Random time within last 24h
        targetIp: event.targetIp ?? null,
        deviceId: event.deviceId ?? null,
      };
      this.securityEvents.set(id, fullEvent);
    });
  }

  /**
   * Ruft alle Geräte ab.
   * @returns Ein Promise, das ein Array aller Geräte zurückgibt.
   */
  async getDevices(): Promise<Device[]> {
    return Array.from(this.devices.values());
  }

  /**
   * Ruft ein einzelnes Gerät anhand seiner ID ab.
   * @param id Die ID des abzurufenden Geräts.
   * @returns Ein Promise, das das gefundene Gerät oder undefined zurückgibt.
   */
  async getDevice(id: number): Promise<Device | undefined> {
    return this.devices.get(id);
  }

  /**
   * Erstellt ein neues Gerät.
   * @param insertDevice Die Daten des zu erstellenden Geräts.
   * @returns Ein Promise, das das erstellte Gerät zurückgibt.
   */
  async createDevice(insertDevice: InsertDevice): Promise<Device> {
    const id = this.currentDeviceId++;
    const device: Device = {
      ...insertDevice,
      id,
      lastActivity: new Date(),
      status: insertDevice.status ?? "",
      bandwidth: insertDevice.bandwidth ?? 0,
      maxBandwidth: insertDevice.maxBandwidth ?? 0,
      model: insertDevice.model ?? null,
      location: insertDevice.location ?? null,
    };
    this.devices.set(id, device);
    return device;
  }

  /**
   * Aktualisiert ein bestehendes Gerät.
   * @param id Die ID des zu aktualisierenden Geräts.
   * @param updates Die zu aktualisierenden Daten des Geräts.
   * @returns Ein Promise, das das aktualisierte Gerät oder undefined zurückgibt, falls nicht gefunden.
   */
  async updateDevice(id: number, updates: Partial<InsertDevice>): Promise<Device | undefined> {
    const device = this.devices.get(id);
    if (!device) return undefined;

    const updatedDevice: Device = {
      ...device,
      ...updates,
      lastActivity: new Date(),
    };
    this.devices.set(id, updatedDevice);
    return updatedDevice;
  }

  /**
   * Löscht ein Gerät anhand seiner ID.
   * @param id Die ID des zu löschenden Geräts.
   * @returns Ein Promise, das true zurückgibt, wenn das Gerät gelöscht wurde, sonst false.
   */
  async deleteDevice(id: number): Promise<boolean> {
    return this.devices.delete(id);
  }

  /**
   * Ruft Bandbreitenmetriken ab, optional gefiltert nach Geräte-ID und begrenzt durch ein Limit.
   * @param deviceId Optional: Die ID des Geräts, dessen Metriken abgerufen werden sollen.
   * @param limit Optional: Die maximale Anzahl der zurückzugebenden Metriken. Standard ist 50.
   * @returns Ein Promise, das ein Array von Bandbreitenmetriken zurückgibt.
   */
  async getBandwidthMetrics(deviceId?: number, limit: number = 50): Promise<BandwidthMetric[]> {
    let metrics = Array.from(this.bandwidthMetrics.values());
    
    if (deviceId) {
      metrics = metrics.filter(m => m.deviceId === deviceId);
    }
    
    return metrics
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Erstellt eine neue Bandbreitenmetrik.
   * @param insertMetric Die Daten der zu erstellenden Bandbreitenmetrik.
   * @returns Ein Promise, das die erstellte Bandbreitenmetrik zurückgibt.
   */
  async createBandwidthMetric(insertMetric: InsertBandwidthMetric): Promise<BandwidthMetric> {
    const id = this.currentBandwidthMetricId++;
    const metric: BandwidthMetric = {
      ...insertMetric,
      id,
      timestamp: new Date(),
      deviceId: insertMetric.deviceId ?? null,
    };
    this.bandwidthMetrics.set(id, metric);
    return metric;
  }

  /**
   * Ruft die neuesten Systemmetriken ab.
   * @returns Ein Promise, das die neuesten Systemmetriken oder undefined zurückgibt.
   */
  async getLatestSystemMetrics(): Promise<SystemMetric | undefined> {
    const metrics = Array.from(this.systemMetrics.values());
    return metrics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  }

  /**
   * Erstellt eine neue Systemmetrik.
   * @param insertMetric Die Daten der zu erstellenden Systemmetrik.
   * @returns Ein Promise, das die erstellte Systemmetrik zurückgibt.
   */
  async createSystemMetric(insertMetric: InsertSystemMetric): Promise<SystemMetric> {
    const id = this.currentSystemMetricId++;
    const metric: SystemMetric = {
      ...insertMetric,
      id,
      timestamp: new Date(),
    };
    this.systemMetrics.set(id, metric);
    return metric;
  }

  /**
   * Ruft den Verlauf der Systemmetriken ab, begrenzt durch ein Limit.
   * @param limit Optional: Die maximale Anzahl der zurückzugebenden Metriken. Standard ist 24.
   * @returns Ein Promise, das ein Array von Systemmetriken zurückgibt.
   */
  async getSystemMetricsHistory(limit: number = 24): Promise<SystemMetric[]> {
    return Array.from(this.systemMetrics.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Operationen für Sicherheitsereignisse (IDS)
  /**
   * Ruft Sicherheitsereignisse ab, begrenzt durch ein Limit.
   * @param limit Optional: Die maximale Anzahl der zurückzugebenden Ereignisse. Standard ist 50.
   * @returns Ein Promise, das ein Array von Sicherheitsereignissen zurückgibt.
   */
  async getSecurityEvents(limit: number = 50): Promise<SecurityEvent[]> {
    return Array.from(this.securityEvents.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Ruft Sicherheitsereignisse nach Status ab, begrenzt durch ein Limit.
   * @param status Der Status, nach dem gefiltert werden soll (z.B. 'new', 'investigating', 'resolved').
   * @param limit Optional: Die maximale Anzahl der zurückzugebenden Ereignisse. Standard ist 50.
   * @returns Ein Promise, das ein Array von Sicherheitsereignissen zurückgibt.
   */
  async getSecurityEventsByStatus(status: string, limit: number = 50): Promise<SecurityEvent[]> {
    return Array.from(this.securityEvents.values())
      .filter(event => event.status === status)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Erstellt ein neues Sicherheitsereignis.
   * @param insertEvent Die Daten des zu erstellenden Sicherheitsereignisses.
   * @returns Ein Promise, das das erstellte Sicherheitsereignis zurückgibt.
   */
  async createSecurityEvent(insertEvent: InsertSecurityEvent): Promise<SecurityEvent> {
    const id = this.currentSecurityEventId++;
    const event: SecurityEvent = {
      ...insertEvent,
      id,
      timestamp: new Date(),
      status: insertEvent.status ?? "",
      deviceId: insertEvent.deviceId ?? null,
      targetIp: insertEvent.targetIp ?? null,
    };
    this.securityEvents.set(id, event);
    return event;
  }

  /**
   * Aktualisiert ein bestehendes Sicherheitsereignis.
   * @param id Die ID des zu aktualisierenden Sicherheitsereignisses.
   * @param updates Die zu aktualisierenden Daten des Sicherheitsereignisses.
   * @returns Ein Promise, das das aktualisierte Sicherheitsereignis oder undefined zurückgibt, falls nicht gefunden.
   */
  async updateSecurityEvent(id: number, updates: Partial<InsertSecurityEvent>): Promise<SecurityEvent | undefined> {
    const event = this.securityEvents.get(id);
    if (!event) return undefined;

    const updatedEvent: SecurityEvent = {
      ...event,
      ...updates,
    };
    this.securityEvents.set(id, updatedEvent);
    return updatedEvent;
  }

  /**
   * Löscht ein Sicherheitsereignis anhand seiner ID.
   * @param id Die ID des zu löschenden Sicherheitsereignisses.
   * @returns Ein Promise, das true zurückgibt, wenn das Ereignis gelöscht wurde, sonst false.
   */
  async deleteSecurityEvent(id: number): Promise<boolean> {
    return this.securityEvents.delete(id);
  }

  // Operationen für IDS-Regeln
  /**
   * Ruft alle IDS-Regeln ab.
   * @returns Ein Promise, das ein Array aller IDS-Regeln zurückgibt.
   */
  async getIdsRules(): Promise<IdsRule[]> {
    return Array.from(this.idsRules.values());
  }

  /**
   * Ruft eine einzelne IDS-Regel anhand ihrer ID ab.
   * @param id Die ID der abzurufenden IDS-Regel.
   * @returns Ein Promise, das die gefundene IDS-Regel oder undefined zurückgibt.
   */
  async getIdsRule(id: number): Promise<IdsRule | undefined> {
    return this.idsRules.get(id);
  }

  /**
   * Erstellt eine neue IDS-Regel.
   * @param insertRule Die Daten der zu erstellenden IDS-Regel.
   * @returns Ein Promise, das die erstellte IDS-Regel zurückgibt.
   */
  async createIdsRule(insertRule: InsertIdsRule): Promise<IdsRule> {
    const id = this.currentIdsRuleId++;
    const rule: IdsRule = {
      ...insertRule,
      enabled: insertRule.enabled === undefined ? false : insertRule.enabled,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.idsRules.set(id, rule);
    return rule;
  }

  /**
   * Aktualisiert eine bestehende IDS-Regel.
   * @param id Die ID der zu aktualisierenden IDS-Regel.
   * @param updates Die zu aktualisierenden Daten der IDS-Regel.
   * @returns Ein Promise, das die aktualisierte IDS-Regel oder undefined zurückgibt, falls nicht gefunden.
   */
  async updateIdsRule(id: number, updates: Partial<InsertIdsRule>): Promise<IdsRule | undefined> {
    const rule = this.idsRules.get(id);
    if (!rule) return undefined;

    const updatedRule: IdsRule = {
      ...rule,
      ...updates,
      updatedAt: new Date(),
    };
    this.idsRules.set(id, updatedRule);
    return updatedRule;
  }

  /**
   * Löscht eine IDS-Regel anhand ihrer ID.
   * @param id Die ID der zu löschenden IDS-Regel.
   * @returns Ein Promise, das true zurückgibt, wenn die Regel gelöscht wurde, sonst false.
   */
  async deleteIdsRule(id: number): Promise<boolean> {
    return this.idsRules.delete(id);
  }
}

/**
 * Implementierung des Speichers, der Daten in einer relationalen Datenbank (PostgreSQL) über Drizzle ORM hält.
 * Diese Klasse bietet persistente Speicherung für alle Daten.
 */
export class DatabaseStorage implements IStorage {
  private initialized = false;

  /**
   * Initialisiert die Datenbank mit Beispieldaten, falls noch keine Daten vorhanden sind.
   * Stellt sicher, dass die Datenbank nur einmal initialisiert wird.
   */
  private async initializeData() {
    if (this.initialized) return;
    
    // Check if we already have data
    const existingDevices = await db.select().from(devices).limit(1);
    if (existingDevices.length > 0) {
      this.initialized = true;
      return;
    }

    // Initialize with sample data only if database is empty
    const sampleDevices = [
      {
        name: "Core Router R1",
        type: "router",
        ipAddress: "192.168.1.1",
        status: "online",
        bandwidth: 450,
        maxBandwidth: 1000,
        model: "Cisco ASR 1000",
        location: "Data Center A",
      },
      {
        name: "Switch SW-01", 
        type: "switch",
        ipAddress: "192.168.1.10",
        status: "online",
        bandwidth: 320,
        maxBandwidth: 600,
        model: "HP ProCurve 2920",
        location: "Floor 1",
      },
      {
        name: "Access Point AP-01",
        type: "access_point", 
        ipAddress: "192.168.1.20",
        status: "warning",
        bandwidth: 890,
        maxBandwidth: 1000,
        model: "Ubiquiti UniFi",
        location: "Floor 2",
      },
      {
        name: "Firewall FW-01",
        type: "firewall",
        ipAddress: "192.168.1.5", 
        status: "offline",
        bandwidth: 0,
        maxBandwidth: 500,
        model: "Fortinet FortiGate",
        location: "DMZ",
      },
    ];

    await db.insert(devices).values(sampleDevices);

    // Add initial system metrics
    await db.insert(systemMetrics).values({
      activeDevices: 127,
      totalBandwidth: 2.4,
      warnings: 3,
      uptime: 99.9,
    });

    // Add sample IDS rules
    const sampleIdsRules = [
      {
        name: "SSH Brute Force Detection",
        description: "Erkennt wiederholte SSH-Anmeldeversuche von derselben IP",
        pattern: "^.*sshd.*Failed password.*from\\s+(\\d+\\.\\d+\\.\\d+\\.\\d+)",
        severity: "high",
        enabled: true,
      },
      {
        name: "Port Scan Detection", 
        description: "Erkennt verdächtige Port-Scanning-Aktivitäten",
        pattern: "TCP.*SYN.*multiple_ports",
        severity: "medium",
        enabled: true,
      },
      {
        name: "Malware Communication",
        description: "Erkennt bekannte Malware-Kommunikationsmuster", 
        pattern: ".*\\.exe.*suspicious_domain\\.com",
        severity: "critical",
        enabled: true,
      },
      {
        name: "Unusual Traffic Volume",
        description: "Erkennt ungewöhnlich hohe Datenübertragung",
        pattern: "bandwidth_threshold_exceeded",
        severity: "medium", 
        enabled: true,
      },
    ];

    await db.insert(idsRules).values(sampleIdsRules);

    // Add sample security events
    const sampleSecurityEvents = [
      {
        eventType: "brute_force",
        severity: "high",
        sourceIp: "45.123.45.67",
        targetIp: "192.168.1.1",
        description: "Mehrfache fehlgeschlagene SSH-Anmeldeversuche erkannt",
        status: "new",
        deviceId: 1,
      },
      {
        eventType: "port_scan",
        severity: "medium", 
        sourceIp: "178.62.199.34",
        targetIp: "192.168.1.10",
        description: "Port-Scan-Aktivität von externer IP erkannt",
        status: "investigating",
        deviceId: 2,
      },
      {
        eventType: "unusual_traffic",
        severity: "medium",
        sourceIp: "192.168.1.20",
        targetIp: "203.0.113.5", 
        description: "Ungewöhnlich hoher ausgehender Datenverkehr",
        status: "new",
        deviceId: 3,
      },
      {
        eventType: "intrusion_attempt",
        severity: "critical",
        sourceIp: "198.51.100.23",
        targetIp: "192.168.1.5",
        description: "Verdächtiger Einbruchsversuch in Firewall erkannt", 
        status: "resolved",
        deviceId: 4,
      },
    ];

    await db.insert(securityEvents).values(sampleSecurityEvents);

    // Add default password vault
    const [defaultVault] = await db.insert(passwordVaults).values({
      name: "Standard Vault",
      description: "Haupttresor für Netzwerk-Passwörter und Zugangsdaten",
    }).returning();

    // Add sample password entries (encrypted with a simple method for demo)
    const samplePasswordEntries = [
      {
        vaultId: defaultVault.id,
        title: "Router Admin",
        username: "admin",
        email: "admin@company.com",
        encryptedPassword: "encrypted_admin_password_123",
        website: "https://192.168.1.1",
        notes: "Hauptrouter-Administratorzugang",
        category: "Network Equipment",
        isFavorite: true,
      },
      {
        vaultId: defaultVault.id,
        title: "Switch Management",
        username: "netadmin",
        email: "network@company.com", 
        encryptedPassword: "encrypted_switch_password_456",
        website: "https://192.168.1.10",
        notes: "Switch-Verwaltungszugang",
        category: "Network Equipment",
        isFavorite: false,
      },
      {
        vaultId: defaultVault.id,
        title: "Firewall Console",
        username: "fwadmin",
        encryptedPassword: "encrypted_firewall_password_789",
        website: "https://192.168.1.5",
        notes: "Firewall-Konfigurationszugang",
        category: "Security",
        isFavorite: true,
      },
    ];

    await db.insert(passwordEntries).values(samplePasswordEntries);

    this.initialized = true;
  }

  async getDevices(): Promise<Device[]> {
    await this.initializeData();
    return await db.select().from(devices);
  }

  async getDevice(id: number): Promise<Device | undefined> {
    const [device] = await db.select().from(devices).where(eq(devices.id, id));
    return device || undefined;
  }

  async createDevice(insertDevice: InsertDevice): Promise<Device> {
    const [device] = await db
      .insert(devices)
      .values(insertDevice)
      .returning();
    return device;
  }

  async updateDevice(id: number, updates: Partial<InsertDevice>): Promise<Device | undefined> {
    const [device] = await db
      .update(devices)
      .set(updates)
      .where(eq(devices.id, id))
      .returning();
    return device || undefined;
  }

  async deleteDevice(id: number): Promise<boolean> {
    const result = await db.delete(devices).where(eq(devices.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getBandwidthMetrics(deviceId?: number, limit: number = 50): Promise<BandwidthMetric[]> {
    if (deviceId) {
      return await db
        .select()
        .from(bandwidthMetrics)
        .where(eq(bandwidthMetrics.deviceId, deviceId))
        .orderBy(desc(bandwidthMetrics.timestamp))
        .limit(limit);
    } else {
      return await db
        .select()
        .from(bandwidthMetrics)
        .orderBy(desc(bandwidthMetrics.timestamp))
        .limit(limit);
    }
  }

  async createBandwidthMetric(insertMetric: InsertBandwidthMetric): Promise<BandwidthMetric> {
    const [metric] = await db
      .insert(bandwidthMetrics)
      .values(insertMetric)
      .returning();
    return metric;
  }

  async getLatestSystemMetrics(): Promise<SystemMetric | undefined> {
    const [metric] = await db
      .select()
      .from(systemMetrics)
      .orderBy(desc(systemMetrics.timestamp))
      .limit(1);
    return metric || undefined;
  }

  async createSystemMetric(insertMetric: InsertSystemMetric): Promise<SystemMetric> {
    const [metric] = await db
      .insert(systemMetrics)
      .values(insertMetric)
      .returning();
    return metric;
  }

  async getSystemMetricsHistory(limit: number = 24): Promise<SystemMetric[]> {
    return await db
      .select()
      .from(systemMetrics)
      .orderBy(desc(systemMetrics.timestamp))
      .limit(limit);
  }

  // Security events operations (IDS)
  async getSecurityEvents(limit: number = 50): Promise<SecurityEvent[]> {
    return await db
      .select()
      .from(securityEvents)
      .orderBy(desc(securityEvents.timestamp))
      .limit(limit);
  }

  async getSecurityEventsByStatus(status: string, limit: number = 50): Promise<SecurityEvent[]> {
    return await db
      .select()
      .from(securityEvents)
      .where(eq(securityEvents.status, status))
      .orderBy(desc(securityEvents.timestamp))
      .limit(limit);
  }

  async createSecurityEvent(insertEvent: InsertSecurityEvent): Promise<SecurityEvent> {
    const [event] = await db
      .insert(securityEvents)
      .values(insertEvent)
      .returning();
    return event;
  }

  async updateSecurityEvent(id: number, updates: Partial<InsertSecurityEvent>): Promise<SecurityEvent | undefined> {
    const [event] = await db
      .update(securityEvents)
      .set(updates)
      .where(eq(securityEvents.id, id))
      .returning();
    return event || undefined;
  }

  async deleteSecurityEvent(id: number): Promise<boolean> {
    const result = await db.delete(securityEvents).where(eq(securityEvents.id, id));
    return (result.rowCount || 0) > 0;
  }

  // IDS rules operations
  async getIdsRules(): Promise<IdsRule[]> {
    return await db.select().from(idsRules);
  }

  async getIdsRule(id: number): Promise<IdsRule | undefined> {
    const [rule] = await db.select().from(idsRules).where(eq(idsRules.id, id));
    return rule || undefined;
  }

  async createIdsRule(insertRule: InsertIdsRule): Promise<IdsRule> {
    const [rule] = await db
      .insert(idsRules)
      .values(insertRule)
      .returning();
    return rule;
  }

  async updateIdsRule(id: number, updates: Partial<InsertIdsRule>): Promise<IdsRule | undefined> {
    const [rule] = await db
      .update(idsRules)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(idsRules.id, id))
      .returning();
    return rule || undefined;
  }

  async deleteIdsRule(id: number): Promise<boolean> {
    const result = await db.delete(idsRules).where(eq(idsRules.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Password Manager operations
  async getPasswordVaults(): Promise<PasswordVault[]> {
    await this.initializeData();
    return await db.select().from(passwordVaults);
  }

  async getPasswordVault(id: number): Promise<PasswordVault | undefined> {
    const [vault] = await db.select().from(passwordVaults).where(eq(passwordVaults.id, id));
    return vault || undefined;
  }

  async createPasswordVault(insertVault: InsertPasswordVault): Promise<PasswordVault> {
    const [vault] = await db
      .insert(passwordVaults)
      .values(insertVault)
      .returning();
    return vault;
  }

  async updatePasswordVault(id: number, updates: Partial<InsertPasswordVault>): Promise<PasswordVault | undefined> {
    const [vault] = await db
      .update(passwordVaults)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(passwordVaults.id, id))
      .returning();
    return vault || undefined;
  }

  async deletePasswordVault(id: number): Promise<boolean> {
    const result = await db.delete(passwordVaults).where(eq(passwordVaults.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getPasswordEntries(vaultId?: number): Promise<PasswordEntry[]> {
    await this.initializeData();
    if (vaultId) {
      return await db
        .select()
        .from(passwordEntries)
        .where(eq(passwordEntries.vaultId, vaultId))
        .orderBy(desc(passwordEntries.lastUsed));
    } else {
      return await db
        .select()
        .from(passwordEntries)
        .orderBy(desc(passwordEntries.lastUsed));
    }
  }

  async getPasswordEntry(id: number): Promise<PasswordEntry | undefined> {
    const [entry] = await db.select().from(passwordEntries).where(eq(passwordEntries.id, id));
    return entry || undefined;
  }

  async createPasswordEntry(insertEntry: InsertPasswordEntry): Promise<PasswordEntry> {
    const [entry] = await db
      .insert(passwordEntries)
      .values(insertEntry)
      .returning();
    return entry;
  }

  async updatePasswordEntry(id: number, updates: Partial<InsertPasswordEntry>): Promise<PasswordEntry | undefined> {
    const [entry] = await db
      .update(passwordEntries)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(passwordEntries.id, id))
      .returning();
    return entry || undefined;
  }

  async deletePasswordEntry(id: number): Promise<boolean> {
    const result = await db.delete(passwordEntries).where(eq(passwordEntries.id, id));
    return (result.rowCount || 0) > 0;
  }
}

export const storage = new DatabaseStorage();