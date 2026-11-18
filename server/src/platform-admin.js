import { z } from 'zod';
import { pool, transaction } from './db.js';
import { requireUser } from './auth.js';

export async function requirePlatformAdmin(request, reply) {
  await requireUser(request,reply);
  if(reply.sent)return;
  const {rows}=await pool.query('SELECT 1 FROM platform_admins WHERE user_id=$1',[request.user.id]);
  if(!rows.length)return reply.code(403).send({error:'Platform administrator access required'});
}
export async function platformAdminRoutes(app) {
  app.get('/platform-admin/me',{preHandler:requireUser},async request=>{
    const {rows}=await pool.query('SELECT 1 FROM platform_admins WHERE user_id=$1',[request.user.id]);
    return {isPlatformAdmin:rows.length>0};
  });
  app.get('/platform-admin/organisations',{preHandler:requirePlatformAdmin},async request=>{
    const q=z.object({status:z.enum(['pending','active','suspended']).default('pending'),page:z.coerce.number().int().min(1).default(1),limit:z.coerce.number().int().min(1).max(100).default(20)}).parse(request.query);
    const {rows}=await pool.query('SELECT id,name,slug,status,created_at FROM organisations WHERE status=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
    [q.status,q.limit,(q.page-1)*q.limit]);
    return {data:rows,page:q.page,limit:q.limit};
  });
  app.post('/platform-admin/organisations/:id/decision',{preHandler:requirePlatformAdmin},async(request,reply)=>{
    const id=z.uuid().parse(request.params.id);
    const data=z.object({status:z.enum(['active','suspended'])}).parse(request.body);
    const result=await transaction(async client=>{
      const {rows}=await client.query('SELECT status FROM organisations WHERE id=$1 FOR UPDATE',[id]);
      if(!rows.length)return null;
      const updated=await client.query('UPDATE organisations SET status=$2 WHERE id=$1 RETURNING id,name,status',[id,data.status]);
      await client.query(`INSERT INTO audit_events(organisation_id,actor_id,action,entity,entity_id,metadata)
        VALUES($1,$2,$3,'organisation',$4,$5)`,[id,request.user.id,'organisation.status_changed',id,{before:rows[0].status,after:data.status}]);
      return updated.rows[0];
    });
    if(!result)return reply.code(404).send({error:'Organisation not found'});
    return result;
  });
}
