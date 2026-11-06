import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pool, transaction } from './db.js';
const file = fileURLToPath(new URL('../migrations/001_initial.sql', import.meta.url));
const sql = await readFile(file, 'utf8');
try {
  await transaction(async client => { await client.query(sql); });
  console.log('Migration completed');
} finally { await pool.end(); }
