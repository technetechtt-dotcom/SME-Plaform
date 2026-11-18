import { useCallback,useEffect,useState, type FormEvent } from 'react';
const base=(import.meta.env.VITE_API_BASE_URL||'').replace(/\/$/,'');
type RecordRow={id:string;[key:string]:unknown};
type View='sessions'|'returns'|'signoffs'|'audit';
type Props={tenant:string;role:string;view:View;currentUserId:string};
async function api(path:string,options:RequestInit={}){
 const response=await fetch(base+path,{...options,credentials:'include',headers:{'Content-Type':'application/json',...options.headers}});
 const result=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(result.error||'Request failed');
 return result;
}
const asText=(v:unknown)=>v===null||v===undefined?'—':String(v);
export function OperationalPages({tenant,role,view,currentUserId}:Props){
 const [items,setItems]=useState<RecordRow[]>([]);
 const [programmes,setProgrammes]=useState<Array<{id:string;name:string;status:string}>>([]);
 const [error,setError]=useState('');
 const [notice,setNotice]=useState('');
 const [busy,setBusy]=useState(false);
 const [refresh,setRefresh]=useState(0);
 const [period,setPeriod]=useState(new Date().toISOString().slice(0,7));
 const [revenue,setRevenue]=useState('');
 const [expenses,setExpenses]=useState('');
 const [jobs,setJobs]=useState('0');
 const [programmeId,setProgrammeId]=useState('');
 const [amount,setAmount]=useState('');
 const canApprove=['owner','admin'].includes(role);
 const canSubmitReturns=role==='beneficiary';
 const canRequestSignoff=['owner','admin','mentor'].includes(role);
 const load=useCallback(async()=>{
  setBusy(true);setError('');
  try{
   const data=await api(`/organisations/${tenant}/${view}?limit=100`);
   setItems(data.data||[]);
  }catch(e){setItems([]);setError((e as Error).message);}
  finally{setBusy(false);}
 },[tenant,view]);
 useEffect(()=>{void load();},[load,refresh]);
 useEffect(()=>{
  if(view!=='signoffs')return;
  let cancelled=false;
  api(`/organisations/${tenant}/programmes?limit=100`).then(r=>{
    if(cancelled)return;
    const list=(r.data||[]).filter((p:{status:string})=>p.status==='published');
    setProgrammes(list);setProgrammeId(list[0]?.id||'');
  }).catch(e=>{if(!cancelled)setError((e as Error).message);});
  return()=>{cancelled=true};
 },[tenant,view]);
 const submitReturn=async(e:FormEvent)=>{
  e.preventDefault();setBusy(true);setError('');setNotice('');
  const rev=Math.round(Number(revenue)*100),exp=Math.round(Number(expenses)*100),n=Number(jobs);
  if(![rev,exp,n].every(Number.isSafeInteger)||[rev,exp,n].some(x=>x<0)){setError('Enter valid nonnegative financial amounts and jobs.');setBusy(false);return;}
  try{
   await api(`/organisations/${tenant}/returns`,{method:'POST',body:JSON.stringify({period:period+'-01',revenueCents:rev,expensesCents:exp,jobs:n})});
   setNotice('Monthly return submitted.');setRevenue('');setExpenses('');setJobs('0');setRefresh(n=>n+1);
  }catch(e){setError((e as Error).message);}finally{setBusy(false);}
 };
 const requestSignoff=async(e:FormEvent)=>{
  e.preventDefault();setBusy(true);setError('');setNotice('');
  const cents=Math.round(Number(amount)*100);
  if(!Number.isSafeInteger(cents)||cents<=0){setError('Enter a positive amount.');setBusy(false);return;}
  try{
   await api(`/organisations/${tenant}/signoffs`,{method:'POST',body:JSON.stringify({programmeId,amountCents:cents})});
   setAmount('');setNotice('Signoff requested. A different authorised person must approve it.');setRefresh(n=>n+1);
  }catch(e){setError((e as Error).message);}finally{setBusy(false);}
 };
 const decide=async(id:string,decision:'approved'|'rejected')=>{
  if(!window.confirm(`Confirm ${decision} decision?`))return;
  setBusy(true);setError('');setNotice('');
  try{
   await api(`/organisations/${tenant}/signoffs/${id}/decision`,{method:'POST',body:JSON.stringify({decision})});
   setNotice('Decision recorded.');setRefresh(n=>n+1);
  }catch(e){setError((e as Error).message);}finally{setBusy(false);}
 };
 const title={sessions:'Mentoring sessions',returns:'Monthly business returns',signoffs:'Milestone approvals',audit:'Audit history'}[view];
 return <section className="space-y-5">
  <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-semibold">{title}</h2>
   <button type="button" className="border rounded px-3 py-2 text-sm" onClick={()=>void load()}>Refresh</button></div>
  {error&&<p role="alert" className="rounded bg-red-50 p-3 text-red-700">{error}</p>}
  {notice&&<p role="status" className="rounded bg-green-50 p-3 text-green-700">{notice}</p>}
  {view==='returns'&&canSubmitReturns&&<form onSubmit={submitReturn} className="rounded-lg border p-4 space-y-3">
   <h3 className="font-semibold">Submit monthly return</h3>
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <label className="text-sm">Month<input required type="month" value={period} onChange={e=>setPeriod(e.target.value)} className="mt-1 border rounded p-2 block w-full"/></label>
    <label className="text-sm">Revenue (ZAR)<input required type="number" min="0" step=".01" value={revenue} onChange={e=>setRevenue(e.target.value)} className="mt-1 border rounded p-2 block w-full"/></label>
    <label className="text-sm">Expenses (ZAR)<input required type="number" min="0" step=".01" value={expenses} onChange={e=>setExpenses(e.target.value)} className="mt-1 border rounded p-2 block w-full"/></label>
    <label className="text-sm">Jobs<input required type="number" min="0" step="1" value={jobs} onChange={e=>setJobs(e.target.value)} className="mt-1 border rounded p-2 block w-full"/></label>
   </div>
   <button type="submit" disabled={busy} className="rounded bg-gray-900 text-white px-4 py-2 disabled:opacity-50">Submit return</button>
  </form>}
  {view==='signoffs'&&canRequestSignoff&&<form onSubmit={requestSignoff} className="rounded-lg border p-4 space-y-3">
   <h3 className="font-semibold">Request milestone approval</h3>
   <label className="block text-sm">Programme<select className="mt-1 w-full border rounded p-2" value={programmeId} onChange={e=>setProgrammeId(e.target.value)} required>
     {programmes.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
   </select></label>
   <label className="block text-sm">Amount (ZAR)<input className="mt-1 block w-full border rounded p-2" required type="number" min=".01" step=".01" value={amount} onChange={e=>setAmount(e.target.value)}/></label>
   {!programmes.length&&<p className="text-sm text-amber-700">A published programme is required.</p>}
   <button disabled={busy||!programmeId} className="rounded bg-gray-900 text-white px-4 py-2 disabled:opacity-50">Request approval</button>
  </form>}
  <div className="rounded-lg border overflow-x-auto">
   <table className="w-full min-w-[580px] text-left text-sm">
    <thead className="bg-gray-100"><tr>
     <th className="p-3">Record</th><th className="p-3">Details</th><th className="p-3">Status</th>{view==='signoffs'&&canApprove&&<th className="p-3">Actions</th>}
    </tr></thead>
    <tbody className="divide-y">
     {!busy&&!items.length&&<tr><td colSpan={4} className="p-4 text-gray-500">No records found.</td></tr>}
     {items.map(item=><tr key={item.id}>
      <td className="p-3 break-words">{view==='audit'?asText(item.action):view==='sessions'?asText(item.starts_at):view==='returns'?asText(item.period):asText(item.programme_id)}</td>
      <td className="p-3 break-words">{view==='audit'?asText(item.entity):view==='sessions'?asText(item.notes):view==='returns'? `R${Number(item.revenue_cents||0)/100} revenue · ${asText(item.jobs)} jobs`:`R${Number(item.amount_cents||0)/100}`}</td>
      <td className="p-3">{view==='audit'?asText(item.created_at):view==='returns'?'Submitted':asText(item.status)}</td>
      {view==='signoffs'&&canApprove&&<td className="p-3">
       {item.status==='requested'&&item.requested_by!==currentUserId?<div className="flex gap-2">
        <button type="button" disabled={busy} className="rounded border px-2 py-1" onClick={()=>void decide(item.id,'approved')}>Approve</button>
        <button type="button" disabled={busy} className="rounded border px-2 py-1" onClick={()=>void decide(item.id,'rejected')}>Reject</button>
       </div>:<span className="text-gray-500">—</span>}
      </td>}
     </tr>)}
    </tbody>
   </table>
  </div>
  {busy&&<p role="status" className="text-gray-500">Loading…</p>}
 </section>;
}
