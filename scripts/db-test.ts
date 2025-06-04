import { pool } from '../server/db';

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Verbindung erfolgreich:', result.rows[0]);
  } catch (error) {
    console.error('❌ Fehler bei der Verbindung:', error);
  } finally {
    await pool.end();
  }
})();