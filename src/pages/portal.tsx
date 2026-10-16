import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { api } from '../lib/api'
import { CATEGORIES } from '../lib/mock'
import { useApi, State, StatusBadge, Metric, Flap, ComplaintTable, Head, useAuth, Role } from '../ui'

const TITLE:Record<Role,string>={citizen:'My dashboard',ward:'Ward overview',department:'Department overview',mayor:'City overview',admin:'System administration'}
export const Dashboard=({role}:{role:Role})=>{
  const c=useApi(api.complaints); const t=useApi(api.trend)
  return <><Head title={TITLE[role]} sub={role==='mayor'?'Read-only executive view':role==='citizen'?'Only your own complaints are shown':'Scoped to your assignment'}/>
  <State s={c}>{(d:any[])=>{const n=(s:string[])=>d.filter(x=>s.includes(x.status)).length
   return <div className="grid">
    <div className="grid g4"><Metric label="Pending" value={n(['SUBMITTED','UNDER_REVIEW','REVIEW_REQUIRED'])} hint="Awaiting review"/><Metric label="In progress" value={n(['ASSIGNED','IN_PROGRESS'])} hint="Being worked on"/><Metric label="Resolved / closed" value={n(['RESOLVED','CLOSED'])} hint="Completed"/><Metric label="Overdue" value={d.filter(x=>x.deadline<'2026-10-16'&&!['RESOLVED','CLOSED'].includes(x.status)).length} hint="Past deadline"/></div>
    <div className="grid g2"><div className="card"><h3>Complaint trend</h3><State s={t} empty="No trend data.">{(tr:any[])=><><div style={{height:260}} role="img" aria-label="Line chart of received versus resolved complaints per month"><ResponsiveContainer><AreaChart data={tr}><CartesianGrid stroke="#D9CFC7"/><XAxis dataKey="m"/><YAxis/><Tooltip/><Legend/><Area dataKey="received" stroke="#2B2622" fill="#C9B59C"/><Area dataKey="resolved" stroke="#3f6b4a" fill="#D9CFC7"/></AreaChart></ResponsiveContainer></div>
      <details><summary>View as table</summary><table><thead><tr><th>Month</th><th>Received</th><th>Resolved</th></tr></thead><tbody>{tr.map(r=><tr key={r.m}><td>{r.m}</td><td>{r.received}</td><td>{r.resolved}</td></tr>)}</tbody></table></details></>}</State></div>
     <div className="card"><h3>By category</h3>{CATEGORIES.map(k=>{const v=d.filter(x=>x.category===k).length;return <div className="bar-row" key={k}><span style={{width:130,fontSize:'.85rem'}}>{k}</span><i style={{width:`${v*40+6}px`}}/><b>{v}</b></div>})}</div></div>
    <div className="card"><h3>Recent complaints</h3><ComplaintTable rows={d.slice(0,5)} base={`/${role}/complaints`}/></div></div>}}</State></>
}
export const Complaints=({role}:{role:Role})=>{
  const c=useApi(api.complaints); const [q,setQ]=useState(''); const [st,setSt]=useState('')
  return <><Head title={role==='citizen'?'My complaints':'Complaints'} sub={role==='ward'?'Assigned wards only':role==='department'?'Assigned department only':undefined}/>
  <div className="row" style={{marginBottom:16}}><div><label htmlFor="s">Search</label><input id="s" value={q} onChange={e=>setQ(e.target.value)}/></div><div><label htmlFor="f">Status</label><select id="f" value={st} onChange={e=>setSt(e.target.value)}><option value="">All</option>{['SUBMITTED','UNDER_REVIEW','ASSIGNED','IN_PROGRESS','RESOLVED','CLOSED'].map(s=><option key={s}>{s}</option>)}</select></div></div>
  <div className="card"><State s={c}>{(d:any[])=>{const f=d.filter(x=>x.title.toLowerCase().includes(q.toLowerCase())&&(!st||x.status===st));return f.length?<ComplaintTable rows={f} base={`/${role}/complaints`}/>:<p>No complaints match these filters.</p>}}</State></div></>
}
export const Detail=({role}:{role:Role})=>{
  const {id}=useParams(); const c=useApi(()=>api.complaint(id!),[id]); const [note,setNote]=useState(''); const [saved,setSaved]=useState('')
  const staff=role==='ward'||role==='department'
  return <><Link to={`/${role}/complaints`} className="btn sm">← Back</Link><div style={{height:12}}/><State s={c}>{(d:any)=><div className="grid g2">
    <div className="card"><h1>{d.title}</h1><p><StatusBadge status={d.status}/> <span className="mute">#{d.id} · {d.category} · {d.zone}, {d.ward}</span></p><p>{d.summary}</p><p className="mute">Submitted {d.date} · Deadline {d.deadline}</p>
      <h3>Public progress</h3><div className="tl"><div><b>{d.date}</b><br/>Complaint received</div><div><b>Current</b><br/><StatusBadge status={d.status}/></div></div></div>
    {staff&&<div className="card" style={{borderLeft:'4px solid var(--bad)'}}><h3>Internal only</h3><p className="mute">Never shown to citizens or in public tracking.</p>
      {role==='department'&&<><label htmlFor="eng">Assign engineer / surveyor (name)</label><input id="eng"/></>}{role==='ward'&&<p className="note">Duplicates are linked, never deleted. False complaints go to manual review.</p>}
      <label htmlFor="nt">Internal note</label><textarea id="nt" rows={3} value={note} onChange={e=>setNote(e.target.value)}/>
      <button className="btn pri" style={{marginTop:12}} disabled={!note} onClick={()=>{setSaved('Note saved (demo — not sent to backend).');setNote('')}}>Save note</button>{saved&&<p role="status" className="mute">{saved}</p>}</div>}</div>}</State></>
}
export const PublicProgress=()=><><Head title="Public progress & deadlines" sub="Citizen-visible updates. Deadline extensions require a reason."/><div className="card"><State s={useApi(api.complaints)}>{(d:any[])=><div className="scroll"><table><thead><tr><th>ID</th><th>Title</th><th>Status</th><th>Deadline</th></tr></thead><tbody>{d.map(c=><tr key={c.id}><td>#{c.id}</td><td>{c.title}</td><td><StatusBadge status={c.status}/></td><td>{c.deadline}</td></tr>)}</tbody></table></div>}</State><p className="note" style={{marginTop:14}}>Deadline extension API: TBD (see docs/API_CONTRACT.md).</p></div></>
export const Reports=()=>{
  const c=useApi(api.complaints)
  return <><Head title="Reports & analytics" sub="Aggregates only. No anonymous identities."/><div className="card"><State s={c}>{(d:any[])=><><div className="grid g3"><Metric label="Total complaints" value={d.length}/><Metric label="Resolved" value={d.filter(x=>x.status==='RESOLVED').length}/><div className="card kpi"><span className="mute">Departments</span><Flap value={6}/></div></div><h3 style={{marginTop:20}}>Zone comparison</h3>{['Zone 1','Zone 2','Zone 3','Zone 4'].map(z=>{const v=d.filter(x=>x.zone===z).length;return <div className="bar-row" key={z}><span style={{width:70}}>{z}</span><i style={{width:v*60+6}}/><b>{v}</b></div>})}<p className="note">Export is disabled until the backend supports it.</p></>}</State></div></>
}
export const Config=({kind,title}:{kind:string;title:string})=>{
  const r=useApi(()=>api.config(kind),[kind])
  return <><Head title={title} sub="Loaded from admin configuration API. Changes require backend support."/><div className="card"><State s={r}>{(d:string[])=><table><tbody>{d.map(x=><tr key={x}><td>{x}</td><td style={{textAlign:'right'}}><button className="btn sm" disabled title="Needs backend endpoint">Edit</button></td></tr>)}</tbody></table>}</State></div></>
}
export const Notifications=()=><><Head title="Notifications"/><div className="card"><h3>No notifications</h3><p className="mute">Notification endpoint is not connected yet (documented in API_CONTRACT.md). Nothing here is fake.</p></div></>
export const Profile=()=>{const {user}=useAuth();return <><Head title="Profile"/><div className="card" style={{maxWidth:480}}><label htmlFor="pn">Display name</label><input id="pn" defaultValue={user?.name} readOnly/><p className="note" style={{marginTop:14}}>Profile editing depends on supported API fields.</p></div></>}
