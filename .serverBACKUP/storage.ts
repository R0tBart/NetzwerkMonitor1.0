import { devices, bandwidthMetrics, systemMetrics, securityEvents, idsRules, passwordVaults, passwordEntries, type Device, type InsertDevice, type BandwidthMetric, type InsertBandwidthMetric, type SystemMetric, type InsertSystemMetric, type SecurityEvent, type InsertSecurityEvent, type IdsRule, type InsertIdsRule, type PasswordVault, type InsertPasswordVault, type PasswordEntry, type InsertPasswordEntry } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

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

  constructor() {
    this.devices = new Map();
    this.bandwidthMetrics = new Map();
    this.systemMetrics = new Map();
    this.securityEvents = new Map();
    this.idsRules = new Map();
    this.passwordVaults = new Map();
    this.passwordEntries = new Map();
    this.currentDeviceId = 1;
    this.currentBandwidthMetricId = 1;
    this.currentSystemMetricId = 1;
    this.currentSecurityEventId = 1;
    this.currentIdsRuleId = 1;
    this.currentPasswordVaultId = 1;
    this.currentPasswordEntryId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }
  async getPasswordVaults(): Promise<PasswordVault[]> {
    // In-memory: just return all vaults (if implemented)
    return Array.from(this.passwordVaults.values());
  }

  async getPasswordVault(id: number): Promise<PasswordVault | undefined> {
    if (!this["passwordVaults"]) {
      this["passwordVaults"] = new Map<number, PasswordVault>();
    }
    return this["passwordVaults"].get(id);
  }
  createPasswordVault(vault: InsertPasswordVault): Promise<PasswordVault> {
    throw new Error("Method not implemented.");
  }
  updatePasswordVault(id: number, vault: Partial<InsertPasswordVault>): Promise<PasswordVault | undefined> {
    throw new Error("Method not implemented.");
  }
  deletePasswordVault(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getPasswordEntries(vaultId?: number): Promise<PasswordEntry[]> {
    throw new Error("Method not implemented.");
  }
  getPasswordEntry(id: number): Promise<PasswordEntry | undefined> {
    throw new Error("Method not implemented.");
  }
  createPasswordEntry(entry: InsertPasswordEntry): Promise<PasswordEntry> {
    throw new Error("Method not implemented.");
  }
  updatePasswordEntry(id: number, entry: Partial<InsertPasswordEntry>): Promise<PasswordEntry | undefined> {
    throw new Error("Method not implemented.");
  }
  deletePasswordEntry(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  private initializeSampleData() {
    // Create sample devices
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

    // Create initial system metrics
    const initialMetrics: InsertSystemMetric = {
      activeDevices: 127,
      totalBandwidth: 2.4,
      warnings: 3,
      uptime: 99.9,
    };
    
    const systemMetric: SystemMetric = {
      ...initialMetrics,
      id: this.currentSystemMetricId++,
      timestamp: new Date(),
    };
    this.systemMetrics.set(systemMetric.id, systemMetric);

    // Initialize sample IDS rules
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

  async getDevices(): Promise<Device[]> {
    return Array.from(this.devices.values());
  }

  async getDevice(id: number): Promise<Device | undefined> {
    return this.devices.get(id);
  }

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

  async deleteDevice(id: number): Promise<boolean> {
    return this.devices.delete(id);
  }

  async getBandwidthMetrics(deviceId?: number, limit: number = 50): Promise<BandwidthMetric[]> {
    let metrics = Array.from(this.bandwidthMetrics.values());
    
    if (deviceId) {
      metrics = metrics.filter(m => m.deviceId === deviceId);
    }
    
    return metrics
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

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

  async getLatestSystemMetrics(): Promise<SystemMetric | undefined> {
    const metrics = Array.from(this.systemMetrics.values());
    return metrics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  }

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

  async getSystemMetricsHistory(limit: number = 24): Promise<SystemMetric[]> {
    return Array.from(this.systemMetrics.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Security events operations (IDS)
  async getSecurityEvents(limit: number = 50): Promise<SecurityEvent[]> {
    return Array.from(this.securityEvents.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async getSecurityEventsByStatus(status: string, limit: number = 50): Promise<SecurityEvent[]> {
    return Array.from(this.securityEvents.values())
      .filter(event => event.status === status)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

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

  async deleteSecurityEvent(id: number): Promise<boolean> {
    return this.securityEvents.delete(id);
  }

  // IDS rules operations
  async getIdsRules(): Promise<IdsRule[]> {
    return Array.from(this.idsRules.values());
  }

  async getIdsRule(id: number): Promise<IdsRule | undefined> {
    return this.idsRules.get(id);
  }

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

  async deleteIdsRule(id: number): Promise<boolean> {
    return this.idsRules.delete(id);
  }
}

export class DatabaseStorage implements IStorage {
  private initialized = false;

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
