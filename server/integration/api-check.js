import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { pool } from '../src/db.js';
import { hashPassword } from '../src/security.js';

const origin=process.env.WEB_ORIGIN||'http://localhost:5173';
const api='http://127.0.0.1:'+Number(process.env.PORT||4000)+'/api';
const suffix=randomUUID().slice(0,8);
const first='integration-a-'+suffix,other='integration-b-'+suffix;
const pwd='ThisIsATestPassword!2026';

async function call(path,{cookie,method='GET',body}={}){
 const res=await fetch(api+path,{
  method,
  headers:{Origin:origin,...(cookie?{Cookie:cookie}:{}),...(body?{'Content-Type':'application/json'}:{})},
  ...(body?{body:JSON.stringify(body)}:{})
 });
 const data=await res.json().catch(()=>({}));
 return {status:res.status,data,cookie:res.headers.get('set-cookie')?.split(';')[0]};
}
async function member(orgId,email,role){
 const hash=await hashPassword(pwd);
 const {rows}=await pool.query('INSERT INTO users(email,password_hash,verified_at) VALUES($1,$2,now()) RETURNING id',[email,hash]);
 await pool.query('INSERT INTO memberships(organisation_id,user_id,role) VALUES($1,$2,$3)',[orgId,rows[0].id,role]);
 return rows[0].id;
}
async function main(){
 const organisations=await pool.query(`INSERT INTO organisations(name,slug,status) VALUES
  ($1,$2,'active'),($3,$4,'active') RETURNING id`,['Integration A',first,'Integration B',other]);
 const [a,b]=organisations.rows.map(r=>r.id);
 const adminEmail='admin-'+suffix+'@example.test';
 await member(a,adminEmail,'admin');
 const mentorEmail='mentor-'+suffix+'@example.test';
 await member(a,mentorEmail,'mentor');
 const smeEmail='sme-'+suffix+'@example.test';
 await member(a,smeEmail,'beneficiary');
 const login=async email=>{
  const r=await call('/auth/login',{method:'POST',body:{email,password:pwd}});
  assert.equal(r.status,200,JSON.stringify(r.data));
  assert.ok(r.cookie);
  return r.cookie;
 };
 const admin=await login(adminEmail), mentor=await login(mentorEmail), sme=await login(smeEmail);
 assert.equal((await call('/organisations/'+b+'/programmes',{cookie:admin})).status,403,'cross-tenant access denied');
 const created=await call('/organisations/'+a+'/programmes',{cookie:admin,method:'POST',body:{name:'Test programme',budgetCents:10000}});
 assert.equal(created.status,201,JSON.stringify(created.data));
 const id=created.data.id;
 assert.equal((await call('/organisations/'+a+'/programmes',{cookie:sme})).data.data.length,0,'draft hidden from beneficiary');
 assert.equal((await call('/organisations/'+a+'/programmes/'+id,{cookie:admin,method:'PATCH',body:{status:'published'}})).status,200);
 assert.equal((await call('/organisations/'+a+'/programmes',{cookie:sme})).data.data.length,1,'published programme visible');
 const application=await call('/organisations/'+a+'/applications',{cookie:sme,method:'POST',body:{programmeId:id,businessName:'Test SME'}});
 assert.equal(application.status,201,JSON.stringify(application.data));
 assert.equal((await call('/organisations/'+a+'/applications/'+application.data.id,{cookie:admin,method:'PATCH',body:{status:'approved'}})).status,200);
 assert.equal((await call('/organisations/'+a+'/applications/'+application.data.id,{cookie:admin,method:'PATCH',body:{status:'review'}})).status,409,'cannot rewind approved application');
 const signoff=await call('/organisations/'+a+'/signoffs',{cookie:mentor,method:'POST',body:{programmeId:id,amountCents:5000}});
 assert.equal(signoff.status,201,JSON.stringify(signoff.data));
 const url='/organisations/'+a+'/signoffs/'+signoff.data.id+'/decision';
 assert.equal((await call(url,{cookie:mentor,method:'POST',body:{decision:'approved'}})).status,403,'mentor cannot approve');
 assert.equal((await call(url,{cookie:admin,method:'POST',body:{decision:'approved'}})).status,200,'admin approval');
 assert.equal((await call(url,{cookie:admin,method:'POST',body:{decision:'approved'}})).status,409,'duplicate approval rejected');
 const own=await call('/organisations/'+a+'/signoffs',{cookie:admin,method:'POST',body:{programmeId:id,amountCents:500}});
 assert.equal(own.status,201);
 assert.equal((await call('/organisations/'+a+'/signoffs/'+own.data.id+'/decision',{cookie:admin,method:'POST',body:{decision:'approved'}})).status,403,'maker cannot approve own signoff');
 const {rows}=await pool.query('SELECT COUNT(*)::int AS count, COALESCE(SUM(amount_cents),0)::bigint AS total FROM ledger_entries WHERE organisation_id=$1',[a]);
 assert.equal(rows[0].count,1);
 assert.equal(BigInt(rows[0].total),5000n);
 console.log('Integration checks passed: login, tenant isolation, publication, applications, maker-checker and idempotency');
}
try{await main();}catch(err){console.error(err);process.exitCode=1;}finally{await pool.end();}
