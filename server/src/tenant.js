import { z } from 'zod';
import { pool, transaction } from './db.js';
import { allow, requireTenant } from './auth.js';
import { token, digest, newTokenExpiry, normaliseEmail } from './security.js';
import { sendLink } from './email.js';

const uuid=z.uuid();
const page=z.coerce.number().int().min(1).max(100000).default(1);
const limit=z.coerce.number().int().min(1).max(100).default(20);
const requireAdmin=allow('owner','admin');
const requireStaff=allow('owner','admin','mentor');
const nonempty=z.string().trim().min(2).max(200);

async function audit(client,request,action,entity,id,details={}) {
  await client.query('INSERT INTO audit_events(organisation_id,actor_id,action,entity,entity_id,metadata) VALUES ($1,$2,$3,$4,$5,$6)',
    [request.tenant.id,request.user.id,action,entity,id,details]);
}
function paging(request) {
  const q=z.object({page,limit,search:z.string().trim().max(100).default('')}).parse(request.query||{});
  return { ...q,offset:(q.page-1)*q.limit };
}
export async function tenantRoutes(app) {
  app.get('/organisations/:orgId', {preHandler:requireTenant},async request=>{
    const {rows}=await pool.query('SELECT id,name,slug,status,created_at FROM organisations WHERE id=$1',[request.tenant.id]);
    return {organisation:rows[0],role:request.tenant.role};
  });
  app.get('/organisations/:orgId/users',{preHandler:requireAdmin},async request=>{
    const q=paging(request);
    const {rows}=await pool.query(`SELECT u.id,u.email,u.verified_at,u.disabled_at,m.role,m.active FROM memberships m
      JOIN users u ON u.id=m.user_id WHERE m.organisation_id=$1 AND u.email ILIKE $2
      ORDER BY u.created_at DESC LIMIT $3 OFFSET $4`,[request.tenant.id,'%'+q.search+'%',q.limit,q.offset]);
    return {data:rows,page:q.page,limit:q.limit};
  });
  app.patch('/organisations/:orgId/users/:userId',{preHandler:allow('owner')},async(request,reply)=>{
    const body=z.object({role:z.enum(['admin','mentor','beneficiary','viewer']).optional(),active:z.boolean().optional()})
      .refine(x=>x.role!==undefined||x.active!==undefined).parse(request.body);
    const id=uuid.parse(request.params.userId);
    const result=await transaction(async client=>{
      const {rows}=await client.query('SELECT role FROM memberships WHERE organisation_id=$1 AND user_id=$2 FOR UPDATE',[request.tenant.id,id]);
      if(!rows[0]||rows[0].role==='owner') return false;
      await client.query('UPDATE memberships SET role=COALESCE($3,role),active=COALESCE($4,active) WHERE organisation_id=$1 AND user_id=$2',[request.tenant.id,id,body.role??null,body.active??null]);
      await audit(client,request,'membership.updated','user',id,body);
      return true;
    });
    if(!result)return reply.code(404).send({error:'Member not found or owner protected'});
    return {ok:true};
  });
  app.post('/organisations/:orgId/invitations',{preHandler:requireAdmin},async(request,reply)=>{
    const input=z.object({email:z.email().max(254),role:z.enum(['admin','mentor','beneficiary','viewer'])}).parse(request.body);
    const raw=token(),email=normaliseEmail(input.email);
    await pool.query('INSERT INTO invitations(organisation_id,email,role,token_hash,expires_at,invited_by) VALUES($1,$2,$3,$4,$5,$6)',
      [request.tenant.id,email,input.role,digest(raw),newTokenExpiry(60*24*7),request.user.id]);
    try {await sendLink(email,'SME-Plaform invitation','/?action=invite',raw);}
    catch(error){request.log.error(error);return reply.code(503).send({error:'Invitation created but delivery failed; retry with a new invitation'});}
    return reply.code(201).send({message:'Invitation sent'});
  });
  app.post('/invitations/accept',{preHandler:async(request,reply)=>{ const {requireUser}=await import('./auth.js');await requireUser(request,reply); }},async(request,reply)=>{
    const data=z.object({token:z.string().min(30)}).parse(request.body);
    const result=await transaction(async client=>{
      const {rows}=await client.query(`UPDATE invitations SET accepted_at=now()
        WHERE token_hash=$1 AND accepted_at IS NULL AND expires_at>now()
        AND email=$2 RETURNING organisation_id,role`,[digest(data.token),request.user.email]);
      if(!rows[0])return null;
      await client.query(`INSERT INTO memberships(organisation_id,user_id,role) VALUES($1,$2,$3)
        ON CONFLICT(organisation_id,user_id) DO NOTHING`,[rows[0].organisation_id,request.user.id,rows[0].role]);
      return rows[0];
    });
    if(!result)return reply.code(400).send({error:'Invalid, expired or mismatched invitation'});
    return {ok:true};
  });
  app.get('/organisations/:orgId/programmes',{preHandler:requireTenant},async request=>{
    const q=paging(request);
    const {rows}=await pool.query(`SELECT * FROM programmes WHERE organisation_id=$1 AND name ILIKE $2 ORDER BY created_at DESC LIMIT $3 OFFSET $4`,
      [request.tenant.id,'%'+q.search+'%',q.limit,q.offset]);
    return {data:rows,page:q.page,limit:q.limit};
  });
  app.post('/organisations/:orgId/programmes',{preHandler:requireAdmin},async(request,reply)=>{
    const data=z.object({name:nonempty,description:z.string().max(10000).default(''),budgetCents:z.number().int().min(0).max(1000000000000).default(0)}).parse(request.body);
    const result=await transaction(async client=>{
      const {rows}=await client.query(`INSERT INTO programmes(organisation_id,name,description,budget_cents)
        VALUES($1,$2,$3,$4) RETURNING *`,[request.tenant.id,data.name,data.description,data.budgetCents]);
      await audit(client,request,'programme.created','programme',rows[0].id);
      return rows[0];
    });
    return reply.code(201).send(result);
  });
  app.patch('/organisations/:orgId/programmes/:id',{preHandler:requireAdmin},async(request,reply)=>{
    const id=uuid.parse(request.params.id);
    const data=z.object({name:nonempty.optional(),description:z.string().max(10000).optional(),
      status:z.enum(['draft','published','archived']).optional()}).parse(request.body);
    const {rows}=await pool.query(`UPDATE programmes SET name=COALESCE($3,name),description=COALESCE($4,description),
      status=COALESCE($5,status) WHERE id=$1 AND organisation_id=$2 RETURNING *`,
      [id,request.tenant.id,data.name??null,data.description??null,data.status??null]);
    if(!rows[0])return reply.code(404).send({error:'Programme not found'});
    return rows[0];
  });
  app.get('/organisations/:orgId/applications',{preHandler:requireStaff},async request=>{
    const q=paging(request);
    const {rows}=await pool.query(`SELECT * FROM applications WHERE organisation_id=$1 AND business_name ILIKE $2 ORDER BY created_at DESC LIMIT $3 OFFSET $4`,
      [request.tenant.id,'%'+q.search+'%',q.limit,q.offset]);
    return {data:rows,page:q.page,limit:q.limit};
  });
  app.post('/organisations/:orgId/applications',{preHandler:allow('beneficiary')},async(request,reply)=>{
    const data=z.object({programmeId:uuid,businessName:nonempty}).parse(request.body);
    const {rows}=await pool.query(`INSERT INTO applications(organisation_id,programme_id,applicant_id,business_name)
      SELECT $1,p.id,$3,$4 FROM programmes p WHERE p.id=$2 AND p.organisation_id=$1 AND p.status='published'
      RETURNING *`,[request.tenant.id,data.programmeId,request.user.id,data.businessName]);
    if(!rows[0])return reply.code(404).send({error:'Published programme not found'});
    return reply.code(201).send(rows[0]);
  });
  app.get('/organisations/:orgId/my-applications',{preHandler:requireTenant},async request=>{
    const {rows}=await pool.query('SELECT * FROM applications WHERE organisation_id=$1 AND applicant_id=$2 ORDER BY created_at DESC',
      [request.tenant.id,request.user.id]);
    return {data:rows};
  });
  app.patch('/organisations/:orgId/applications/:id',{preHandler:requireAdmin},async(request,reply)=>{
    const data=z.object({status:z.enum(['review','approved','rejected','enrolled'])}).parse(request.body);
    const {rows}=await pool.query(`UPDATE applications SET status=$3 WHERE id=$1 AND organisation_id=$2 RETURNING *`,
      [uuid.parse(request.params.id),request.tenant.id,data.status]);
    if(!rows[0])return reply.code(404).send({error:'Application not found'});
    return rows[0];
  });
  app.get('/organisations/:orgId/tasks',{preHandler:requireTenant},async request=>{
    const q=paging(request);
    const staff=['owner','admin','mentor'].includes(request.tenant.role);
    const {rows}=await pool.query(`SELECT * FROM tasks WHERE organisation_id=$1 AND ($2::boolean OR assignee_id=$3)
      AND title ILIKE $4 ORDER BY created_at DESC LIMIT $5 OFFSET $6`,
      [request.tenant.id,staff,request.user.id,'%'+q.search+'%',q.limit,q.offset]);
    return {data:rows,page:q.page,limit:q.limit};
  });
  app.post('/organisations/:orgId/tasks',{preHandler:requireStaff},async(request,reply)=>{
    const data=z.object({assigneeId:uuid,title:nonempty,description:z.string().max(10000).default(''),dueAt:z.iso.datetime().optional()}).parse(request.body);
    const {rows}=await pool.query(`INSERT INTO tasks(organisation_id,assignee_id,title,description,due_at)
      SELECT $1,$2,$3,$4,$5 WHERE EXISTS(SELECT 1 FROM memberships WHERE organisation_id=$1 AND user_id=$2 AND active)
      RETURNING *`,[request.tenant.id,data.assigneeId,data.title,data.description,data.dueAt??null]);
    if(!rows[0])return reply.code(400).send({error:'Assignee is not an active member'});
    return reply.code(201).send(rows[0]);
  });
  app.patch('/organisations/:orgId/tasks/:id',{preHandler:requireTenant},async(request,reply)=>{
    const data=z.object({status:z.enum(['assigned','submitted','returned','completed'])}).parse(request.body);
    const staff=['owner','admin','mentor'].includes(request.tenant.role);
    const allowed=staff?['assigned','returned','completed']:['submitted'];
    if(!allowed.includes(data.status))return reply.code(403).send({error:'Status transition forbidden'});
    const {rows}=await pool.query(`UPDATE tasks SET status=$3 WHERE id=$1 AND organisation_id=$2
      AND ($4::boolean OR assignee_id=$5) RETURNING *`,[uuid.parse(request.params.id),request.tenant.id,data.status,staff,request.user.id]);
    if(!rows[0])return reply.code(404).send({error:'Task not found'});
    return rows[0];
  });
  app.get('/organisations/:orgId/sessions',{preHandler:requireTenant},async request=>{
    const staff=['owner','admin'].includes(request.tenant.role);
    const {rows}=await pool.query(`SELECT * FROM mentor_sessions WHERE organisation_id=$1
      AND ($2::boolean OR mentor_id=$3 OR beneficiary_id=$3) ORDER BY starts_at DESC LIMIT 100`,
      [request.tenant.id,staff,request.user.id]);
    return {data:rows};
  });
  app.post('/organisations/:orgId/sessions',{preHandler:requireStaff},async(request,reply)=>{
    const data=z.object({mentorId:uuid,beneficiaryId:uuid,startsAt:z.iso.datetime(),notes:z.string().max(10000).default('')}).parse(request.body);
    const {rows}=await pool.query(`INSERT INTO mentor_sessions(organisation_id,mentor_id,beneficiary_id,starts_at,notes)
      SELECT $1,$2,$3,$4,$5 WHERE EXISTS(SELECT 1 FROM memberships WHERE organisation_id=$1 AND user_id=$2 AND active)
      AND EXISTS(SELECT 1 FROM memberships WHERE organisation_id=$1 AND user_id=$3 AND active)
      RETURNING *`,[request.tenant.id,data.mentorId,data.beneficiaryId,data.startsAt,data.notes]);
    if(!rows[0])return reply.code(400).send({error:'Session participants must belong to the organisation'});
    return reply.code(201).send(rows[0]);
  });
  app.get('/organisations/:orgId/returns',{preHandler:requireTenant},async request=>{
    const staff=['owner','admin','mentor'].includes(request.tenant.role);
    const {rows}=await pool.query(`SELECT * FROM monthly_returns WHERE organisation_id=$1 AND ($2::boolean OR user_id=$3) ORDER BY period DESC LIMIT 100`,
      [request.tenant.id,staff,request.user.id]);
    return {data:rows};
  });
  app.post('/organisations/:orgId/returns',{preHandler:allow('beneficiary')},async(request,reply)=>{
    const data=z.object({period:z.iso.date(),revenueCents:z.number().int().min(0),expensesCents:z.number().int().min(0),jobs:z.number().int().min(0).default(0)}).parse(request.body);
    const {rows}=await pool.query(`INSERT INTO monthly_returns(organisation_id,user_id,period,revenue_cents,expenses_cents,jobs)
      VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,[request.tenant.id,request.user.id,data.period,data.revenueCents,data.expensesCents,data.jobs]);
    return reply.code(201).send(rows[0]);
  });
  app.post('/organisations/:orgId/signoffs',{preHandler:requireStaff},async(request,reply)=>{
    const data=z.object({programmeId:uuid,amountCents:z.number().int().min(0).max(1000000000000)}).parse(request.body);
    const {rows}=await pool.query(`INSERT INTO milestone_signoffs(organisation_id,programme_id,amount_cents)
      SELECT $1,p.id,$3 FROM programmes p WHERE p.id=$2 AND p.organisation_id=$1 RETURNING *`,
      [request.tenant.id,data.programmeId,data.amountCents]);
    if(!rows[0])return reply.code(404).send({error:'Programme not found'});
    return reply.code(201).send(rows[0]);
  });
  app.post('/organisations/:orgId/signoffs/:id/decision',{preHandler:requireAdmin},async(request,reply)=>{
    const data=z.object({decision:z.enum(['approved','rejected'])}).parse(request.body);
    const id=uuid.parse(request.params.id);
    const result=await transaction(async client=>{
      const {rows}=await client.query('SELECT * FROM milestone_signoffs WHERE id=$1 AND organisation_id=$2 FOR UPDATE',[id,request.tenant.id]);
      const signoff=rows[0];
      if(!signoff)return {error:'Not found',code:404};
      if(signoff.status!=='requested')return {error:'Already processed',code:409};
      if(data.decision==='approved') {
        const {rows:budget}=await client.query('SELECT budget_cents FROM programmes WHERE id=$1 AND organisation_id=$2 FOR UPDATE',[signoff.programme_id,request.tenant.id]);
        const {rows:total}=await client.query('SELECT COALESCE(SUM(amount_cents),0)::bigint AS amount FROM ledger_entries WHERE organisation_id=$1 AND signoff_id IN (SELECT id FROM milestone_signoffs WHERE programme_id=$2)',[request.tenant.id,signoff.programme_id]);
        if(BigInt(total[0].amount)+BigInt(signoff.amount_cents)>BigInt(budget[0].budget_cents))return {error:'Programme budget exceeded',code:409};
        await client.query('INSERT INTO ledger_entries(organisation_id,signoff_id,amount_cents) VALUES($1,$2,$3)',[request.tenant.id,id,signoff.amount_cents]);
      }
      await client.query('UPDATE milestone_signoffs SET status=$3,decided_by=$4,decided_at=now() WHERE id=$1 AND organisation_id=$2',
        [id,request.tenant.id,data.decision,request.user.id]);
      await audit(client,request,'signoff.'+data.decision,'signoff',id,{amountCents:signoff.amount_cents});
      return {ok:true,decision:data.decision};
    });
    if(result.error)return reply.code(result.code).send({error:result.error});
    return result;
  });
  app.get('/organisations/:orgId/audit',{preHandler:requireAdmin},async request=>{
    const q=paging(request);
    const {rows}=await pool.query('SELECT * FROM audit_events WHERE organisation_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [request.tenant.id,q.limit,q.offset]);
    return {data:rows,page:q.page,limit:q.limit};
  });
}
