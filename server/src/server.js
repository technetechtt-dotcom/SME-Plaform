import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { ZodError } from 'zod';
import { authRoutes } from './auth.js';
import { tenantRoutes } from './tenant.js';
const app=Fastify({logger:true,bodyLimit:1024*1024,trustProxy:false});
const origin=process.env.WEB_ORIGIN || 'http://localhost:5173';
await app.register(helmet);
await app.register(cookie);
await app.register(cors,{origin,credentials:true,methods:['GET','POST','PATCH','DELETE','OPTIONS']});
await app.register(rateLimit,{max:100,timeWindow:'1 minute'});
app.addHook('onRequest',async(request,reply)=>{
  if(['POST','PATCH','PUT','DELETE'].includes(request.method)){
    const sent=request.headers.origin;
    // Browser cookie writes must originate from the configured application.
    if(sent!==origin) return reply.code(403).send({error:'Untrusted request origin'});
  }
});
app.setErrorHandler((error,request,reply)=>{
  if(error instanceof ZodError) return reply.code(400).send({error:'Validation failed',details:error.issues.map(i=>({path:i.path,message:i.message}))});
  if(error.code==='23505') return reply.code(409).send({error:'Record already exists'});
  request.log.error(error);
  return reply.code(500).send({error:'Internal server error'});
});
app.get('/health',async()=>({status:'ok'}));
await app.register(authRoutes,{prefix:'/api'});
await app.register(tenantRoutes,{prefix:'/api'});
try {await app.listen({host:'0.0.0.0',port:Number(process.env.PORT||4000)});}
catch(error){app.log.error(error);process.exit(1);}
