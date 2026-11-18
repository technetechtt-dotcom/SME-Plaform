import { pool } from './db.js';
const email = process.env.PLATFORM_ADMIN_EMAIL?.trim().toLowerCase();
if (!email) { console.error('Set PLATFORM_ADMIN_EMAIL to an existing verified user email'); process.exitCode=1; }
else {
  try {
    const {rows}=await pool.query(`INSERT INTO platform_admins(user_id)
      SELECT id FROM users WHERE email=$1 AND verified_at IS NOT NULL AND disabled_at IS NULL
      ON CONFLICT DO NOTHING RETURNING user_id`,[email]);
    if(!rows.length) { console.error('No verified active account was granted access (or already granted).'); process.exitCode=1; }
    else console.log('Platform administrator granted:',rows[0].user_id);
  } catch(err){console.error(err.message);process.exitCode=1;}
}
await pool.end();
