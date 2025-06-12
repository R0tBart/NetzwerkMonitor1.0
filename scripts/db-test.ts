import { InferInsertModel } from "drizzle-orm";
import { db } from "../server/db";
import { devices, bandwidthMetrics, systemMetrics, securityEvents, idsRules, passwordVaults, passwordEntries } from "../shared/schema";


async function truncateTables() {
  console.log("Truncating tables...");
  await db.delete(devices);
  await db.delete(bandwidthMetrics);
  await db.delete(systemMetrics);
  await db.delete(securityEvents);
  await db.delete(idsRules);
  await db.delete(passwordVaults);
  await db.delete(passwordEntries);
  console.log("Tables truncated.");
}

(async () => {
  try {
    console.log('✅ Verbindung erfolgreich');
  } catch (error) {
    console.error('❌ Fehler bei der Verbindung:', error);
  } finally {
    // No pool.end() needed as we are using drizzle-orm with a direct db connection
  }

  await truncateTables();

  // Insert sample data
  console.log("Inserting sample data...");

  // Devices
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

  // Bandwidth Metrics
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

  // System Metrics
  await db.insert(systemMetrics).values([
    {
      activeDevices: 3,
      totalBandwidth: 1500,
      warnings: 1,
      uptime: 99.5,
    },
  ]);
  console.log("Inserted system metrics.");

  // Security Events
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

  // IDS Rules
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

  // Password Vaults
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

  // Password Entries
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
  console.log("Sample data insertion complete.");

})();