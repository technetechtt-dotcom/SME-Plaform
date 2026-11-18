import { useEffect, useState } from 'react';
const base=(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/,'');
async function api(path:string,options:RequestInit={}) {
 const r=await fetch(base+path,{...options,credentials:'include',headers:{'Content-Type':'application/json',...options.headers}});
 const data=await r.json().catch(()=>({}));
 if(!r.ok)throw new Error(data.error||'Request failed');
 return data;
}
export function InviteMember({tenant,onSuccess}:{tenant:string;onSuccess:()=>void}){
 const[email,setEmail]=useState('');const[role,setRole]=useState('mentor');
 const[message,setMessage]=useState('');const[error,setError]=useState('');const[busy,setBusy]=useState(false);
 const submit=async(e:React.FormEvent)=>{
  e.preventDefault();setBusy(true);setError('');setMessage('');
  try{await api(`/organisations/${tenant}/invitations`,{method:'POST',body:JSON.stringify({email,role})});
   setEmail('');setMessage('Invitation sent');onSuccess();}
  catch(e){setError((e as Error).message);}
  finally{setBusy(false);}
 };
 return <form onSubmit={submit} className="rounded-lg border p-4 space-y-3">
  <h3 className="font-semibold">Invite a member</h3>
  <label className="block text-sm">Email address<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded border p-2"/></label>
  <label className="block text-sm">Role<select value={role} onChange={e=>setRole(e.target.value)} className="mt-1 w-full rounded border p-2">
  <option value="admin">Administrator</option><option value="mentor">Mentor</option><option value="beneficiary">SME beneficiary</option><option value="viewer">Viewer</option>
  </select></label>
  {error&&<p role="alert" className="text-red-700">{error}</p>}
  {message&&<p role="status" className="text-green-700">{message}</p>}
  <button type="submit" disabled={busy} className="rounded bg-gray-900 text-white px-4 py-2 disabled:opacity-50">Send invitation</button>
 </form>;
}
type Programme={id:string;name:string;status:string};
export function ApplyToProgramme({tenant,onSuccess}:{tenant:string;onSuccess:()=>void}){
 const[programmes,setProgrammes]=useState<Programme[]>([]);
 const[programmeId,setProgrammeId]=useState('');const[businessName,setBusinessName]=useState('');
 const[message,setMessage]=useState('');const[error,setError]=useState('');const[busy,setBusy]=useState(false);
 useEffect(()=>{
  let cancel=false;setError('');
  api(`/organisations/${tenant}/programmes?limit=100`).then(r=>{
   if(cancel)return;
   const list=(r.data as Programme[]).filter(p=>p.status==='published');
   setProgrammes(list);setProgrammeId(list[0]?.id||'');
  }).catch(e=>{if(!cancel)setError((e as Error).message);});
  return()=>{cancel=true};
 },[tenant]);
 const submit=async(e:React.FormEvent)=>{
  e.preventDefault();setBusy(true);setError('');setMessage('');
  try{await api(`/organisations/${tenant}/applications`,{method:'POST',body:JSON.stringify({programmeId,businessName})});
   setBusinessName('');setMessage('Application submitted.');onSuccess();}
  catch(e){setError((e as Error).message);}
  finally{setBusy(false);}
 };
 return <form onSubmit={submit} className="rounded-lg border p-4 space-y-3">
  <h3 className="font-semibold">Apply to a programme</h3>
  <label className="block text-sm">Published programme<select required value={programmeId} onChange={e=>setProgrammeId(e.target.value)} className="mt-1 w-full rounded border p-2">
   {programmes.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
  </select></label>
  <label className="block text-sm">Business name<input required minLength={2} maxLength={200} value={businessName} onChange={e=>setBusinessName(e.target.value)} className="mt-1 w-full rounded border p-2"/></label>
  {error&&<p role="alert" className="text-red-700">{error}</p>}
  {message&&<p role="status" className="text-green-700">{message}</p>}
  {!programmes.length&&<p className="text-sm text-amber-700">No published programmes available to apply for.</p>}
  <button type="submit" disabled={busy||!programmeId} className="rounded bg-gray-900 text-white px-4 py-2 disabled:opacity-50">Submit application</button>
 </form>;
}
