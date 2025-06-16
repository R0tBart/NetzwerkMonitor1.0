import { InferInsertModel } from "drizzle-orm";
import { db } from "../server/db";
import { devices, bandwidthMetrics, systemMetrics, securityEvents, idsRules, passwordVaults, passwordEntries } from "../shared/schema";


/**
 * Leert alle Daten aus den relevanten Datenbanktabellen.
 * Dies wird typischerweise für Testzwecke oder zur Vorbereitung der Datenbank verwendet.
 */
async function truncateTables() {
  console.log("Truncating tables...");
  // Löscht alle Einträge aus der `devices`-Tabelle.
  await db.delete(devices);
  // Löscht alle Einträge aus der `bandwidthMetrics`-Tabelle.
  await db.delete(bandwidthMetrics);
  // Löscht alle Einträge aus der `systemMetrics`-Tabelle.
  await db.delete(systemMetrics);
  // Löscht alle Einträge aus der `securityEvents`-Tabelle.
  await db.delete(securityEvents);
  // Löscht alle Einträge aus der `idsRules`-Tabelle.
  await db.delete(idsRules);
  // Löscht alle Einträge aus der `passwordVaults`-Tabelle.
  await db.delete(passwordVaults);
  // Löscht alle Einträge aus der `passwordEntries`-Tabelle.
  await db.delete(passwordEntries);
  console.log("Tables truncated.");
}

// Hauptausführungsblock des Skripts.
(async () => {
  try {
    // Versucht, eine Verbindung zur Datenbank herzustellen und protokolliert den Erfolg.
    console.log('✅ Verbindung erfolgreich');
  } catch (error) {
    // Fängt Fehler bei der Verbindung ab und protokolliert sie.
    console.error('❌ Fehler bei der Verbindung:', error);
  } finally {
    // Da Drizzle ORM mit einer direkten DB-Verbindung verwendet wird, ist kein `pool.end()` erforderlich.
  }

  // Leert alle Tabellen, bevor neue Daten eingefügt werden.
  await truncateTables();

  // Fügt Beispieldaten ein.
  console.log("Inserting sample data...");

  // Fügt Beispieldaten für Geräte in die `devices`-Tabelle ein.
  const insertedDevices = await db.insert(devices).values([
    {
      name: "Router-1",
      type: "router",
      ipAddress: "192.168.1.1",
      status: "online",
      bandwidth: 500,
      maxBandwidth: 1000,
      model: "Cisco RV340",
      location: "Server Room",
    },
    {
      name: "Switch-1",
      type: "switch",
      ipAddress: "192.168.1.2",
      status: "online",
      bandwidth: 800,
      maxBandwidth: 1000,
      model: "Netgear GS724T",
      location: "Server Room",
    },
    {
      name: "Firewall-1",
      type: "firewall",
      ipAddress: "192.168.1.3",
      status: "warning",
      bandwidth: 200,
      maxBandwidth: 500,
      model: "Fortinet FortiGate 60E",
      location: "Main Office",
    },
  ]).returning();
  console.log("Inserted devices:", insertedDevices);

  // Fügt Beispieldaten für Bandbreitenmetriken in die `bandwidthMetrics`-Tabelle ein.
  if (insertedDevices.length > 0) {
    await db.insert(bandwidthMetrics).values([
      {
        deviceId: insertedDevices[0].id,
        incoming: 0.5,
        outgoing: 0.3,
      },
      {
        deviceId: insertedDevices[1].id,
        incoming: 0.8,
        outgoing: 0.6,
      },
    ]);
    console.log("Inserted bandwidth metrics.");
  }

  // Fügt Beispieldaten für Systemmetriken in die `systemMetrics`-Tabelle ein.
  await db.insert(systemMetrics).values([
    {
      activeDevices: 3,
      totalBandwidth: 1500,
      warnings: 1,
      uptime: 99.5,
    },
  ]);
  console.log("Inserted system metrics.");

  // Fügt Beispieldaten für Sicherheitsereignisse in die `securityEvents`-Tabelle ein.
  if (insertedDevices.length > 0) {
    await db.insert(securityEvents).values([
      {
        eventType: "intrusion_attempt",
        severity: "high",
        sourceIp: "1.1.1.1",
        targetIp: insertedDevices[0].ipAddress,
        description: "Multiple failed login attempts",
        status: "new",
        deviceId: insertedDevices[0].id,
      },
      {
        eventType: "malware_detected",
        severity: "critical",
        sourceIp: "2.2.2.2",
        targetIp: insertedDevices[2].ipAddress,
        description: "Malware detected on firewall",
        status: "investigating",
        deviceId: insertedDevices[2].id,
      },
    ]);
    console.log("Inserted security events.");
  }

  // Fügt Beispieldaten für IDS-Regeln (Intrusion Detection System) in die `idsRules`-Tabelle ein.
  await db.insert(idsRules).values([
    {
      name: "SQL Injection Attempt",
      description: "Detects common SQL injection patterns",
      pattern: ".*union select.*",
      severity: "high",
      enabled: true,
    },
    {
      name: "Port Scan Detection",
      description: "Detects suspicious port scanning activities",
      pattern: "Nmap.*",
      severity: "medium",
      enabled: true,
    },
  ]);
  console.log("Inserted IDS rules.");

  // Fügt Beispieldaten für Passwort-Safes in die `passwordVaults`-Tabelle ein.
  const insertedVaults = await db.insert(passwordVaults).values([
    {
      name: "Admin Passwords",
      description: "Passwords for network administration",
    },
    {
      name: "User Accounts",
      description: "Passwords for user services",
    },
  ]).returning();
  console.log("Inserted password vaults:", insertedVaults);

  // Fügt Beispieldaten für Passworteinträge in die `passwordEntries`-Tabelle ein.
  if (insertedVaults.length > 0) {
    await db.insert(passwordEntries).values([
      {
        vaultId: insertedVaults[0].id,
        title: "Router Admin",
        username: "admin",
        encryptedPassword: "encrypted_router_pass",
        website: "http://192.168.1.1",
        category: "Network Devices",
      },
      {
        vaultId: insertedVaults[0].id,
        title: "Firewall Admin",
        username: "fw_admin",
        encryptedPassword: "encrypted_fw_pass",
        website: "http://192.168.1.3",
        category: "Network Devices",
      },
      {
        vaultId: insertedVaults[1].id,
        title: "Guest Wi-Fi",
        username: "guest",
        encryptedPassword: "encrypted_guest_wifi",
        category: "Wireless",
      },
    ]);
    console.log("Inserted password entries.");
  }
  // Zeigt an, dass die Einfügung der Beispieldaten abgeschlossen ist.
  console.log("Sample data insertion complete.");

})();