import React, { useCallback, useEffect, useState } from 'react';
import { LogOutIcon, RefreshCwIcon } from 'lucide-react';

type Member = { id: string; name: string; status: string; role: string };
type User = { id: string; email: string };
type Programme = { id: string; name: string; description: string; status: string; budget_cents: string };
type Task = { id: string; title: string; status: string; due_at: string | null };
type Application = { id: string; business_name: string; status: string };
type View = 'programmes' | 'tasks' | 'applications' | 'members' | 'account';

const API = (import.meta.env.VITE_API_BASE_URL as string || '').replace(/\/$/,'');
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(API + path, {
    credentials: 'include',
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'Request failed');
  return result as T;
}
function Warning({message}: {message:string}) {
  return <div role="alert" className="rounded-md bg-red-50 p-3 text-red-800 text-sm">{message}</div>;
}
export function ApiPortal() {
  const [user,setUser]=useState<User|null>(null);
  const [members,setMembers]=useState<Member[]>([]);
  const [tenant,setTenant]=useState<string>('');
  const [view,setView]=useState<View>('programmes');
  const [items,setItems]=useState<Array<Programme | Task | Application | {id:string;email:string;role:string}>>([]);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [notice,setNotice]=useState('');
  const [mode,setMode]=useState<'login'|'register'|'forgot'|'reset'|'verify'|'invite'>('login');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const [slug,setSlug]=useState('');
  const [token,setToken]=useState('');
  const [programmeName,setProgrammeName]=useState('');
  const [refresh,setRefresh]=useState(0);
  const active=members.find(m=>m.id===tenant);
  const admin=active?.role==='owner'||active?.role==='admin';
  const readUser=useCallback(async()=>{
    try {
      const result=await request<{user:User;memberships:Member[]}>('/auth/me');
      setUser(result.user);
      setMembers(result.memberships);
      setTenant(old=>result.memberships.some(m=>m.id===old&&m.status==='active')?old:(result.memberships.find(m=>m.status==='active')?.id||''));
    } catch { setUser(null);setMembers([]);setTenant('');}
  },[]);
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const action=params.get('action'), t=params.get('token');
    if(t){setToken(t);if(action==='verify')setMode('verify');if(action==='reset')setMode('reset');if(action==='invite')setMode('invite');}
    void readUser();
  },[readUser]);
  useEffect(()=>{
    if(!tenant||!user){setItems([]);return;}
    let cancelled=false;
    const run=async()=>{
      setBusy(true);setError('');
      try {
        if(view==='account'){setItems([]);return;}
        const endpoint=view==='members'?'users':view==='applications'&&active?.role==='beneficiary'?'my-applications':view;
        const result=await request<{data:typeof items}>(`/organisations/${tenant}/${endpoint}`);
        if(!cancelled)setItems(result.data);
      }catch(e){if(!cancelled){setItems([]);setError((e as Error).message);}}
      finally{if(!cancelled)setBusy(false);}
    };
    void run();
    return()=>{cancelled=true;};
  },[tenant,user,view,refresh,active?.role]);
  const submitAuth=async(e:React.FormEvent)=>{
    e.preventDefault();setBusy(true);setError('');setNotice('');
    try {
      if(mode==='invite'){
        await request('/auth/register-invited',{method:'POST',body:JSON.stringify({email,password,invitationToken:token})});
        setNotice('Invitation accepted. Sign in to continue.');setPassword('');setMode('login');
        window.history.replaceState(null,'',window.location.pathname);
      }else if(mode==='login'){
        await request('/auth/login',{method:'POST',body:JSON.stringify({email,password})});
        await readUser();setPassword('');
      }else if(mode==='register'){
        await request('/auth/register-organisation',{method:'POST',body:JSON.stringify({email,password,organisationName:name,slug})});
        setNotice('Registration submitted. Check your email and await organisation approval.');setMode('login');setPassword('');
      }else if(mode==='forgot'){
        await request('/auth/forgot-password',{method:'POST',body:JSON.stringify({email})});
        setNotice('If the account exists, a reset link will be sent.');setMode('login');
      }else{
        await request('/auth/consume-token',{method:'POST',body:JSON.stringify({token,purpose:mode==='verify'?'verify':'reset',...(mode==='reset'?{newPassword:password}:{})})});
        setNotice(mode==='verify'?'Email verified. Sign in when your organisation is active.':'Password updated. Please sign in.');
        setPassword('');setToken('');setMode('login');
        window.history.replaceState(null,'',window.location.pathname);
      }
    }catch(e){setError((e as Error).message);}
    finally{setBusy(false);}
  };
  const logout=async()=>{
    try{await request('/auth/logout',{method:'POST'});}finally{setUser(null);setMembers([]);setTenant('');setItems([]);}
  };
  const createProgramme=async(e:React.FormEvent)=>{
    e.preventDefault();setBusy(true);setError('');
    try{
      await request(`/organisations/${tenant}/programmes`,{method:'POST',body:JSON.stringify({name:programmeName})});
      setProgrammeName('');setRefresh(x=>x+1);setNotice('Programme created in draft status.');
    }catch(e){setError((e as Error).message);}
    finally{setBusy(false);}
  };
  const updateProgramme=async(id:string,status:'published'|'archived')=>{
    try{
      await request(`/organisations/${tenant}/programmes/${id}`,{method:'PATCH',body:JSON.stringify({status})});
      setRefresh(x=>x+1);
    }catch(e){setError((e as Error).message);}
  };
  const exportAccount=async()=>{
    try{
      const data=await request<object>('/auth/export');
      const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');a.href=url;a.download='sme-account-export.json';a.click();URL.revokeObjectURL(url);
    }catch(e){setError((e as Error).message);}
  };
  if(!user){
    return <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-7 rounded-xl shadow border space-y-4">
        <h1 className="text-2xl font-semibold">SME-Plaform</h1>
        <p className="text-sm text-gray-600">Secure account portal · {mode==='login'?'Sign in':mode==='register'?'Register your organisation':mode==='forgot'?'Recover account':mode==='verify'?'Verify email':mode==='invite'?'Accept invitation':'Reset password'}</p>
        {error&&<Warning message={error}/>}
        {notice&&<p role="status" className="p-3 rounded-md bg-green-50 text-green-800 text-sm">{notice}</p>}
        <form onSubmit={submitAuth} className="space-y-3">
          {['login','register','forgot','invite'].includes(mode)&&<label className="block text-sm">Email address
            <input className="mt-1 w-full rounded-md border p-2" type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
          </label>}
          {mode==='register'&&<><label className="block text-sm">Organisation name
            <input className="mt-1 w-full rounded-md border p-2" required value={name} onChange={e=>setName(e.target.value)} minLength={2}/>
          </label><label className="block text-sm">Organisation slug
            <input className="mt-1 w-full rounded-md border p-2" required pattern="[a-z0-9-]{3,80}" value={slug} onChange={e=>setSlug(e.target.value)}/>
          </label></>}
          {['login','register','reset','invite'].includes(mode)&&<label className="block text-sm">{mode==='reset'?'New password':'Password'}
            <input className="mt-1 w-full rounded-md border p-2" type="password" required minLength={mode==='login'?1:12} value={password} onChange={e=>setPassword(e.target.value)} autoComplete={mode==='login'?'current-password':'new-password'}/>
          </label>}
          {['reset','verify','invite'].includes(mode)&&<label className="block text-sm">Verification token
            <input className="mt-1 w-full rounded-md border p-2" required value={token} onChange={e=>setToken(e.target.value)}/>
          </label>}
          <button disabled={busy} className="w-full rounded-md bg-gray-900 text-white p-2 disabled:opacity-50">{busy?'Processing…':mode==='login'?'Sign in':mode==='register'?'Register':mode==='forgot'?'Send reset link':mode==='verify'?'Verify':mode==='invite'?'Create invited account':'Update password'}</button>
        </form>
        <div className="flex flex-wrap gap-3 text-sm text-blue-700">
          <button onClick={()=>{setMode('login');setError('');}}>Sign in</button>
          <button onClick={()=>{setMode('register');setError('');}}>Register</button>
          <button onClick={()=>{setMode('forgot');setError('');}}>Forgot password?</button>
        </div>
        <p className="text-xs text-gray-500">New organisations require approval. This portal is a foundation and not yet production certified.</p>
      </div>
    </main>;
  }
  return <div className="min-h-screen bg-gray-50">
    <header className="bg-white border-b p-4 flex items-center justify-between gap-3 flex-wrap">
      <div><h1 className="font-semibold text-lg">SME-Plaform</h1><p className="text-xs text-gray-600">{user.email}</p></div>
      <div className="flex items-center gap-2">
        <button onClick={()=>setRefresh(x=>x+1)} className="rounded border p-2" aria-label="Refresh records"><RefreshCwIcon size={18}/></button>
        <button onClick={()=>void logout()} className="rounded border p-2 flex gap-2 items-center"><LogOutIcon size={18}/>Sign out</button>
      </div>
    </header>
    <main className="max-w-5xl mx-auto p-4 md:p-6 space-y-5">
      {error&&<Warning message={error}/>}
      {notice&&<p role="status" className="rounded bg-green-50 p-3 text-green-800">{notice}</p>}
      <section className="bg-white rounded-lg border p-4">
        <label className="block text-sm font-medium">Organisation
          <select value={tenant} onChange={e=>{setTenant(e.target.value);setView('programmes');}} className="mt-2 w-full rounded-md border p-2">
            {members.filter(m=>m.status==='active').map(m=><option key={m.id} value={m.id}>{m.name} ({m.role})</option>)}
            {!members.some(m=>m.status==='active')&&<option value="">No active organisation</option>}
          </select>
        </label>
        {!tenant&&<p className="mt-3 text-sm text-amber-800">Your organisation is awaiting activation. Contact the platform administrator.</p>}
      </section>
      {tenant&&<><nav aria-label="Portal pages" className="flex gap-2 flex-wrap">
        {(['programmes','tasks','applications',...(admin?['members']:[]),'account'] as View[]).map(item=><button key={item} aria-current={view===item?'page':undefined} onClick={()=>setView(item)}
          className={`rounded px-3 py-2 text-sm capitalize ${view===item?'bg-gray-900 text-white':'bg-white border text-gray-700'}`}>{item}</button>)}
      </nav>
      <section className="bg-white border rounded-xl p-4 md:p-6 space-y-4">
        <h2 className="text-xl font-semibold capitalize">{view}</h2>
        {view==='programmes'&&admin&&<form onSubmit={createProgramme} className="flex flex-wrap gap-2">
          <input aria-label="New programme name" value={programmeName} onChange={e=>setProgrammeName(e.target.value)} minLength={2} required placeholder="New programme name" className="border rounded p-2 flex-1 min-w-44"/>
          <button disabled={busy} className="rounded bg-gray-900 text-white px-4">Create draft</button>
        </form>}
        {view==='applications'&&active?.role==='beneficiary'&&<p className="text-sm text-gray-600">Apply from a published programme. Programme selection will be expanded in the complete beneficiary portal.</p>}
        {view==='account'?<div className="space-y-3">
          <p className="text-sm">Account: {user.email}</p>
          <button className="rounded border px-3 py-2" onClick={()=>void exportAccount()}>Export account summary</button>
          <p className="text-xs text-gray-500">Full legal data-subject export and erasure workflows remain pending.</p>
        </div>:busy?<p role="status">Loading…</p>:items.length===0?<p className="text-gray-500">No records available.</p>:
          <ul className="divide-y">
            {items.map(item=><li key={item.id} className="py-3 flex justify-between gap-3 items-center">
              <div><p className="font-medium">{'name' in item?item.name:'title' in item?item.title:'business_name' in item?item.business_name:'email' in item?item.email:'Record'}</p>
                <p className="text-xs text-gray-500">{'status' in item?item.status:'role' in item?item.role:''}</p>
              </div>
              {view==='programmes'&&admin&&'status' in item&&item.status==='draft'&&<button className="border rounded px-3 py-2 text-sm" onClick={()=>void updateProgramme(item.id,'published')}>Publish</button>}
              {view==='programmes'&&admin&&'status' in item&&item.status==='published'&&<button className="border rounded px-3 py-2 text-sm" onClick={()=>void updateProgramme(item.id,'archived')}>Archive</button>}
            </li>)}
          </ul>}
      </section></>}
    </main>
  </div>;
}
