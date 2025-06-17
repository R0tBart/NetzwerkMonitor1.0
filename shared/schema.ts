// Importiert die notwendigen Typen und Funktionen von 'drizzle-orm/pg-core' für die Definition von PostgreSQL-Tabellen.
import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
// Importiert 'createInsertSchema' von 'drizzle-zod' zur automatischen Generierung von Zod-Schemas für Inserts.
import { createInsertSchema } from "drizzle-zod";
// Importiert 'z' von 'zod' für die Schema-Validierung und Typinferenz.
import { z } from "zod";

/**
 * Definiert die 'Device'-Tabelle in der Datenbank.
 * Ein Gerät repräsentiert ein Netzwerkgerät mit seinen Eigenschaften.
 */
export const devices = pgTable("Device", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // router, switch, access_point, firewall
  ipAddress: text("ip_address").notNull().unique(),
  status: text("status").notNull().default("online"), // online, warning, offline, maintenance
  bandwidth: real("bandwidth").notNull().default(0), // in MB/s
  maxBandwidth: real("max_bandwidth").notNull().default(1000),
  lastActivity: timestamp("last_activity").notNull().defaultNow(),
  model: text("model"),
  location: text("location"),
});

/**
 * Definiert die 'BandwidthMetric'-Tabelle in der Datenbank.
 * Diese Tabelle speichert Bandbreitenmetriken für Geräte.
 */
export const bandwidthMetrics = pgTable("BandwidthMetric", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").references(() => devices.id),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  incoming: real("incoming").notNull(), // GB/s
  outgoing: real("outgoing").notNull(), // GB/s
});

/**
 * Definiert die 'SystemMetric'-Tabelle in der Datenbank.
 * Diese Tabelle speichert Systemmetriken wie aktive Geräte, Gesamtbandbreite, Warnungen und Betriebszeit.
 */
export const systemMetrics = pgTable("SystemMetric", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  activeDevices: integer("active_devices").notNull(),
  totalBandwidth: real("total_bandwidth").notNull(),
  warnings: integer("warnings").notNull(),
  uptime: real("uptime").notNull(), // percentage
});

/**
 * Definiert die 'SecurityEvent'-Tabelle in der Datenbank.
 * Diese Tabelle speichert Sicherheitsereignisse wie Intrusion-Versuche, Malware-Erkennung usw.
 */
export const securityEvents = pgTable("SecurityEvent", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  eventType: text("event_type").notNull(), // intrusion_attempt, malware_detected, unusual_traffic, port_scan, brute_force
  severity: text("severity").notNull(), // low, medium, high, critical
  sourceIp: text("source_ip").notNull(),
  targetIp: text("target_ip"),
  description: text("description").notNull(),
  status: text("status").notNull().default("new"), // new, investigating, resolved, false_positive
  deviceId: integer("device_id").references(() => devices.id),
});

/**
 * Definiert die 'IdsRule'-Tabelle in der Datenbank.
 * Diese Tabelle speichert Regeln für das Intrusion Detection System (IDS).
 */
export const idsRules = pgTable("IdsRule", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  pattern: text("pattern").notNull(), // regex or signature pattern
  severity: text("severity").notNull(), // low, medium, high, critical
  enabled: boolean("enabled").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Tabellen für den Passwort-Manager
/**
 * Definiert die 'PasswordVault'-Tabelle in der Datenbank.
 * Diese Tabelle speichert Passwort-Tresore, die Sammlungen von Passworteinträgen sind.
 */
export const passwordVaults = pgTable("PasswordVault", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Definiert die 'PasswordEntrie'-Tabelle in der Datenbank.
 * Diese Tabelle speichert einzelne Passworteinträge, die zu einem Passwort-Tresor gehören.
 */
export const passwordEntries = pgTable("PasswordEntrie", {
  id: serial("id").primaryKey(),
  vaultId: integer("vault_id").references(() => passwordVaults.id, { onDelete: "cascade" }).notNull(),
  title: text("title").notNull(),
  username: text("username"),
  email: text("email"),
  encryptedPassword: text("encrypted_password").notNull(),
  website: text("website"),
  notes: text("notes"),
  category: text("category"),
  isFavorite: boolean("is_favorite").notNull().default(false),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Zod-Schema für das Einfügen neuer Geräte.
 * Leitet die Struktur aus dem 'devices'-Schema ab und wählt spezifische Felder aus.
 */
export const insertDeviceSchema = createInsertSchema(devices).pick({
  name: true,
  type: true,
  ipAddress: true,
  status: true,
  bandwidth: true,
  maxBandwidth: true,
  model: true,
  location: true,
});

/**
 * Zod-Schema für das Einfügen neuer Bandbreitenmetriken.
 * Leitet die Struktur aus dem 'bandwidthMetrics'-Schema ab und wählt spezifische Felder aus.
 */
export const insertBandwidthMetricSchema = createInsertSchema(bandwidthMetrics).pick({
  deviceId: true,
  incoming: true,
  outgoing: true,
});

/**
 * Zod-Schema für das Einfügen neuer Systemmetriken.
 * Leitet die Struktur aus dem 'systemMetrics'-Schema ab und wählt spezifische Felder aus.
 */
export const insertSystemMetricSchema = createInsertSchema(systemMetrics).pick({
  activeDevices: true,
  totalBandwidth: true,
  warnings: true,
  uptime: true,
});

/**
 * Zod-Schema für das Einfügen neuer Sicherheitsereignisse.
 * Leitet die Struktur aus dem 'securityEvents'-Schema ab und wählt spezifische Felder aus.
 */
export const insertSecurityEventSchema = createInsertSchema(securityEvents).pick({
  eventType: true,
  severity: true,
  sourceIp: true,
  targetIp: true,
  description: true,
  status: true,
  deviceId: true,
});

/**
 * Zod-Schema für das Einfügen neuer IDS-Regeln.
 * Leitet die Struktur aus dem 'idsRules'-Schema ab und wählt spezifische Felder aus.
 */
export const insertIdsRuleSchema = createInsertSchema(idsRules).pick({
  name: true,
  description: true,
  pattern: true,
  severity: true,
  enabled: true,
});

/**
 * Zod-Schema für das Einfügen neuer Passwort-Tresore.
 * Leitet die Struktur aus dem 'passwordVaults'-Schema ab und wählt spezifische Felder aus.
 */
export const insertPasswordVaultSchema = createInsertSchema(passwordVaults).pick({
  name: true,
  description: true,
});

/**
 * Zod-Schema für das Einfügen neuer Passworteinträge.
 * Leitet die Struktur aus dem 'passwordEntries'-Schema ab und wählt spezifische Felder aus.
 */
export const insertPasswordEntrySchema = createInsertSchema(passwordEntries).pick({
  vaultId: true,
  title: true,
  username: true,
  email: true,
  encryptedPassword: true,
  website: true,
  notes: true,
  category: true,
  isFavorite: true,
});

/** Typ für das Einfügen eines Geräts, abgeleitet vom Zod-Schema. */
export type InsertDevice = z.infer<typeof insertDeviceSchema>;
/** Typ für die Auswahl eines Geräts, abgeleitet vom Drizzle-Schema. */
export type Device = typeof devices.$inferSelect;
/** Typ für das Einfügen einer Bandbreitenmetrik, abgeleitet vom Zod-Schema. */
export type InsertBandwidthMetric = z.infer<typeof insertBandwidthMetricSchema>;
/** Typ für die Auswahl einer Bandbreitenmetrik, abgeleitet vom Drizzle-Schema. */
export type BandwidthMetric = typeof bandwidthMetrics.$inferSelect;
/** Typ für das Einfügen einer Systemmetrik, abgeleitet vom Zod-Schema. */
export type InsertSystemMetric = z.infer<typeof insertSystemMetricSchema>;
/** Typ für die Auswahl einer Systemmetrik, abgeleitet vom Drizzle-Schema. */
export type SystemMetric = typeof systemMetrics.$inferSelect;
/** Typ für das Einfügen eines Sicherheitsereignisses, abgeleitet vom Zod-Schema. */
export type InsertSecurityEvent = z.infer<typeof insertSecurityEventSchema>;
/** Typ für die Auswahl eines Sicherheitsereignisses, abgeleitet vom Drizzle-Schema. */
export type SecurityEvent = typeof securityEvents.$inferSelect;
/** Typ für das Einfügen einer IDS-Regel, abgeleitet vom Zod-Schema. */
export type InsertIdsRule = z.infer<typeof insertIdsRuleSchema>;
/** Typ für die Auswahl einer IDS-Regel, abgeleitet vom Drizzle-Schema. */
export type IdsRule = typeof idsRules.$inferSelect;
/** Typ für das Einfügen eines Passwort-Tresors, abgeleitet vom Zod-Schema. */
export type InsertPasswordVault = z.infer<typeof insertPasswordVaultSchema>;
/** Typ für die Auswahl eines Passwort-Tresors, abgeleitet vom Drizzle-Schema. */
export type PasswordVault = typeof passwordVaults.$inferSelect;
/** Typ für das Einfügen eines Passworteintrags, abgeleitet vom Zod-Schema. */
export type InsertPasswordEntry = z.infer<typeof insertPasswordEntrySchema>;
/** Typ für die Auswahl eines Passworteintrags, abgeleitet vom Drizzle-Schema. */
export type PasswordEntry = typeof passwordEntries.$inferSelect;
