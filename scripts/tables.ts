import { pool } from '../server/db';

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