import { z } from 'zod';
import { pool, transaction } from './db.js';
import { token, digest, normaliseEmail, hashPassword, verifyPassword, sessionDays, cookieName, cookieOptions, newTokenExpiry } from './security.js';
import { sendLink } from './email.js';
const email = z.email().max(254);
const password = z.string().min(12).max(128);
const credentials = z.object({ email, password });
const orgInput = credentials.extend({ organisationName: z.string().trim().min(2).max(200), slug: z.string().regex(/^[a-z0-9-]{3,80}$/) });
async function issueSession(reply, userId) {
  const raw = token();
  await pool.query('INSERT INTO sessions(user_id,token_hash,expires_at) VALUES ($1,$2,$3)', [userId, digest(raw), new Date(Date.now() + sessionDays * 86400000)]);
  reply.setCookie(cookieName, raw, cookieOptions());
}
async function audit(orgId, actorId, action, metadata = {}) {
  await pool.query('INSERT INTO audit_events(organisation_id,actor_id,action,metadata) VALUES ($1,$2,$3,$4)', [orgId,actorId,action,metadata]);
}
export async function requireUser(request, reply) {
  const raw = request.cookies[cookieName];
  if (!raw) return reply.code(401).send({ error: 'Unauthenticated' });
  const { rows } = await pool.query(`SELECT u.id,u.email,u.verified_at,u.disabled_at,s.id AS session_id
    FROM sessions s JOIN users u ON u.id=s.user_id
    WHERE s.token_hash=$1 AND s.revoked_at IS NULL AND s.expires_at>now()`, [digest(raw)]);
  const user = rows[0];
  if (!user || user.disabled_at || !user.verified_at) return reply.code(401).send({ error: 'Unauthenticated' });
  request.user = user;
}
export async function requireTenant(request, reply) {
  await requireUser(request, reply);
  if (reply.sent) return;
  const { rows } = await pool.query(`SELECT m.role,o.status FROM memberships m JOIN organisations o ON o.id=m.organisation_id
   WHERE m.organisation_id=$1 AND m.user_id=$2 AND m.active=true`, [request.params.orgId,request.user.id]);
  if (!rows[0] || rows[0].status!=='active') return reply.code(403).send({ error: 'Access denied' });
  request.tenant = { id: request.params.orgId, role: rows[0].role };
}
export function allow(...roles) {
  return async (request, reply) => {
    await requireTenant(request,reply);
    if (!reply.sent && !roles.includes(request.tenant.role)) return reply.code(403).send({ error:'Insufficient permissions' });
  };
}
export async function authRoutes(app) {
  app.post('/auth/register-organisation', async (request,reply) => {
    const data = orgInput.parse(request.body);
    const raw = token(), mail = normaliseEmail(data.email);
    const result = await transaction(async client => {
      const hash = await hashPassword(data.password);
      const org = await client.query('INSERT INTO organisations(name,slug) VALUES($1,$2) RETURNING id',[data.organisationName,data.slug]);
      const user = await client.query('INSERT INTO users(email,password_hash) VALUES($1,$2) RETURNING id',[mail,hash]);
      await client.query('INSERT INTO memberships(organisation_id,user_id,role) VALUES($1,$2,$3)',[org.rows[0].id,user.rows[0].id,'owner']);
      await client.query('INSERT INTO auth_tokens(user_id,purpose,token_hash,expires_at) VALUES($1,$2,$3,$4)',[user.rows[0].id,'verify',digest(raw),newTokenExpiry(60*24)]);
      return { organisationId:org.rows[0].id, userId:user.rows[0].id };
    });
    try { await sendLink(mail,'Verify your SME-Plaform account','/?action=verify',raw); }
    catch(error) { request.log.error(error); return reply.code(503).send({ error:'Email delivery unavailable; contact support to complete verification' }); }
    await audit(result.organisationId,result.userId,'organisation.registered');
    return reply.code(201).send({ message:'Verification email sent. Organisation pending approval.' });
  });
  app.post('/auth/register-invited',async(request,reply)=>{
    const data=credentials.extend({invitationToken:z.string().min(30)}).parse(request.body);
    const mail=normaliseEmail(data.email);
    const hash=await hashPassword(data.password);
    const accepted=await transaction(async client=>{
      const {rows}=await client.query(`UPDATE invitations SET accepted_at=now()
        WHERE token_hash=$1 AND email=$2 AND accepted_at IS NULL AND expires_at>now()
        RETURNING organisation_id,role`,[digest(data.invitationToken),mail]);
      if(!rows[0])return false;
      const user=await client.query('INSERT INTO users(email,password_hash,verified_at) VALUES($1,$2,now()) RETURNING id',[mail,hash]);
      await client.query('INSERT INTO memberships(organisation_id,user_id,role) VALUES($1,$2,$3)',
        [rows[0].organisation_id,user.rows[0].id,rows[0].role]);
      return true;
    });
    if(!accepted)return reply.code(400).send({error:'Invalid or expired invitation'});
    return reply.code(201).send({message:'Invited account created. You can sign in.'});
  });
  app.post('/auth/login', async (request,reply) => {
    const data = credentials.parse(request.body), mail = normaliseEmail(data.email);
    const {rows}=await pool.query('SELECT * FROM users WHERE email=$1',[mail]);
    const user=rows[0];
    // Equalise work for unknown accounts to reduce account enumeration.
    const dummy = '$argon2id$v=19$m=65536,t=3,p=1$u5JlqR78xEavf5g4/hV7cA$47oQ9QJ4wNxgF5/Tqohe7hrRnOgwqk6/Y2JQc8ua6CI';
    let valid = false;
    try { valid = await verifyPassword(user?.password_hash || dummy,data.password); } catch { valid=false; }
    if(!user || !valid || user.disabled_at || (user.locked_until && new Date(user.locked_until)>new Date())) {
      if(user) await pool.query(`UPDATE users SET failed_attempts=failed_attempts+1, locked_until=CASE WHEN failed_attempts>=4 THEN now()+interval '15 minutes' ELSE locked_until END WHERE id=$1`,[user.id]);
      return reply.code(401).send({error:'Invalid credentials or account unavailable'});
    }
    if(!user.verified_at) return reply.code(403).send({error:'Email verification required'});
    await pool.query('UPDATE users SET failed_attempts=0,locked_until=NULL WHERE id=$1',[user.id]);
    await issueSession(reply,user.id);
    await audit(null,user.id,'auth.login');
    return { user:{id:user.id,email:user.email} };
  });
  app.get('/auth/me',{preHandler:requireUser},async request=>{
    const {rows}=await pool.query(`SELECT o.id,o.name,o.status,m.role FROM memberships m JOIN organisations o ON o.id=m.organisation_id WHERE m.user_id=$1 AND m.active=true ORDER BY o.name`,[request.user.id]);
    return {user:{id:request.user.id,email:request.user.email},memberships:rows};
  });
  app.post('/auth/logout',{preHandler:requireUser},async(request,reply)=>{
    await pool.query('UPDATE sessions SET revoked_at=now() WHERE id=$1',[request.user.session_id]);
    reply.clearCookie(cookieName,{path:'/'});
    return {ok:true};
  });
  app.post('/auth/refresh',{preHandler:requireUser},async(request,reply)=>{
    await pool.query('UPDATE sessions SET revoked_at=now() WHERE id=$1',[request.user.session_id]);
    await issueSession(reply,request.user.id);
    return {ok:true};
  });
  app.post('/auth/forgot-password',async(request,reply)=>{
    const parsed=z.object({email}).parse(request.body);
    const {rows}=await pool.query('SELECT id FROM users WHERE email=$1 AND disabled_at IS NULL',[normaliseEmail(parsed.email)]);
    if(rows[0]){
      const raw=token();
      await pool.query('INSERT INTO auth_tokens(user_id,purpose,token_hash,expires_at) VALUES($1,$2,$3,$4)',[rows[0].id,'reset',digest(raw),newTokenExpiry(30)]);
      try {await sendLink(normaliseEmail(parsed.email),'Reset your SME-Plaform password','/?action=reset',raw);}
      catch(error){request.log.error(error);}
    }
    return {message:'If this account exists, a reset link will be sent'};
  });
  app.post('/auth/consume-token',async(request,reply)=>{
    const data=z.object({token:z.string().min(30),purpose:z.enum(['verify','reset']),newPassword:password.optional()}).parse(request.body);
    if(data.purpose==='reset' && !data.newPassword) return reply.code(400).send({error:'New password required'});
    const hashed=data.newPassword?await hashPassword(data.newPassword):null;
    const ok=await transaction(async client=>{
      const {rows}=await client.query(`UPDATE auth_tokens SET consumed_at=now() WHERE token_hash=$1 AND purpose=$2 AND consumed_at IS NULL AND expires_at>now() RETURNING user_id`,[digest(data.token),data.purpose]);
      if(!rows[0]) return false;
      if(data.purpose==='verify') await client.query('UPDATE users SET verified_at=now() WHERE id=$1',[rows[0].user_id]);
      else {
        await client.query('UPDATE users SET password_hash=$2,failed_attempts=0,locked_until=NULL WHERE id=$1',[rows[0].user_id,hashed]);
        await client.query('UPDATE sessions SET revoked_at=now() WHERE user_id=$1',[rows[0].user_id]);
      }
      return true;
    });
    if(!ok) return reply.code(400).send({error:'Invalid or expired token'});
    return {ok:true};
  });
  app.get('/auth/export',{preHandler:requireUser},async request=>{
    const {rows:memberships}=await pool.query('SELECT organisation_id,role,active FROM memberships WHERE user_id=$1',[request.user.id]);
    return {user:{email:request.user.email},memberships};
  });
  app.post('/auth/request-deletion',{preHandler:requireUser},async request=>{
    await pool.query('UPDATE users SET disabled_at=now() WHERE id=$1',[request.user.id]);
    await pool.query('UPDATE sessions SET revoked_at=now() WHERE user_id=$1',[request.user.id]);
    await audit(null,request.user.id,'auth.deletion_requested');
    return {message:'Account disabled pending retention review and deletion processing'};
  });
}
