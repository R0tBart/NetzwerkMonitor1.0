import { pool } from '../server/db';

/**
 * @brief Zeigt alle Tabellen in der öffentlichen Schema der Datenbank an.
 * @details Diese Funktion führt eine SQL-Abfrage aus, um die Namen aller Tabellen
 *          im 'public'-Schema der Datenbank abzurufen und sie in einer formatierten
 *          Tabelle auf der Konsole auszugeben. Sie fängt Fehler ab, die während
 *          des Abrufs auftreten können, und beendet den Datenbank-Pool nach Abschluss.
 */
async function showTables() {
  try {
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    console.log('\n📊 Tabellen in der Datenbank:');
    console.table(result.rows);
  } catch (error) {
    console.error('❌ Fehler beim Abrufen der Tabellen:', error);
  } finally {
    await pool.end();
  }
}

showTables();