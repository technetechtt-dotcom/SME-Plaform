import { readdir,readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pool,transaction } from './db.js';
const folder=fileURLToPath(new URL('../migrations/',import.meta.url));
try {
  await pool.query(`CREATE TABLE IF NOT EXISTS schema_migrations (filename text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
  const migrations=(await readdir(folder)).filter(x=>/^\d+_.+\.sql$/.test(x)).sort();
  for(const filename of migrations) {
    const {rows}=await pool.query('SELECT 1 FROM schema_migrations WHERE filename=$1',[filename]);
    if(rows.length)continue;
    const sql=await readFile(new URL('../migrations/'+filename,import.meta.url),'utf8');
    await transaction(async client=>{
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations(filename) VALUES($1)',[filename]);
    });
    console.log('Applied:',filename);
  }
}finally{await pool.end();}
