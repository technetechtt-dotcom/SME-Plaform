import { useCallback, useEffect, useState } from 'react';
type Organisation={id:string;name:string;slug:string;status:'pending'|'active'|'suspended'};
const base=(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/,'');
async function api(path:string,options:RequestInit={}) {
 const res=await fetch(base+path,{...options,credentials:'include',headers:{'Content-Type':'application/json',...options.headers}});
 const data=await res.json().catch(()=>({}));
 if(!res.ok)throw new Error(data.error||'Request failed');
 return data;
}
export function PlatformAdminPanel(){
 const [status,setStatus]=useState<'pending'|'active'|'suspended'>('pending');
 const [items,setItems]=useState<Organisation[]>([]);
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const load=useCallback(async()=>{
  setBusy(true);setError('');
  try{const r=await api('/platform-admin/organisations?status='+status);setItems(r.data);}
  catch(e){setError((e as Error).message);}
  finally{setBusy(false);}
 },[status]);
 useEffect(()=>{void load();},[load]);
 const decide=async (id:string,next:'active'|'suspended')=>{
  if(!window.confirm(next==='active'?'Approve this organisation?':'Suspend this organisation?'))return;
  setBusy(true);setError('');
  try{await api('/platform-admin/organisations/'+id+'/decision',{method:'POST',body:JSON.stringify({status:next})});await load();}
  catch(e){setError((e as Error).message);}
  finally{setBusy(false);}
 };
 return <section className="rounded-xl border bg-white p-4 sm:p-6 space-y-4">
  <h2 className="text-xl font-semibold">Platform administration</h2>
  <p className="text-sm text-gray-600">Organisation review and activation. Every decision is recorded in the audit log.</p>
  {error&&<p role="alert" className="rounded bg-red-50 p-3 text-red-700">{error}</p>}
  <div className="flex flex-wrap gap-2">
   {(['pending','active','suspended'] as const).map(s=><button key={s} type="button" onClick={()=>setStatus(s)} aria-pressed={status===s}
    className={`rounded px-3 py-2 capitalize ${status===s?'bg-gray-900 text-white':'border'}`}>{s}</button>)}
   <button type="button" onClick={()=>void load()} className="rounded border px-3 py-2">Refresh</button>
  </div>
  {busy&&<p role="status">Loading…</p>}
  {!busy&&items.length===0&&<p>No {status} organisations found.</p>}
  <ul className="divide-y">
   {items.map(org=><li key={org.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div><p className="font-medium break-words">{org.name}</p><p className="text-sm text-gray-500">{org.slug}</p></div>
    <div className="flex gap-2">
     {org.status!=='active'&&<button disabled={busy} type="button" onClick={()=>void decide(org.id,'active')} className="rounded bg-green-700 text-white px-3 py-2 disabled:opacity-50">Approve</button>}
     {org.status!=='suspended'&&<button disabled={busy} type="button" onClick={()=>void decide(org.id,'suspended')} className="rounded border px-3 py-2 disabled:opacity-50">Suspend</button>}
    </div>
   </li>)}
  </ul>
 </section>;
}
