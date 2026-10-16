import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Landmark, ShieldCheck, Eye, Scale, Send, Search, Wrench, CheckCircle2, Copy, ArrowRight } from 'lucide-react'
import { api, MOCK } from '../lib/api'
import { Photo } from '../motion'
import { CATEGORIES } from '../lib/mock'
import { useApi, State, StatusBadge, Flap, useAuth, HOME, Head, Role } from '../ui'

const Resolved=({c}:{c:any})=><article className="card"><StatusBadge status="RESOLVED"/><h3 style={{marginTop:10}}>{c.title}</h3><p className="mute">{c.category} · {c.zone}, {c.ward}</p><p>{c.summary}</p><small className="mute">Resolved {c.date}</small></article>
export function Home(){
  const r=useApi(api.resolved)
  const services=[
    {title:'Roads & streetlights',desc:'Potholes, damaged roads and street lighting.',img:'/images/report.jpg'},
    {title:'Waste & cleanliness',desc:'Missed collection, overflowing bins and litter.',img:'/images/community.jpg'},
    {title:'Public spaces',desc:'Parks, sidewalks and neighbourhood facilities.',img:'/images/team.jpg'}
  ]
  return <main className="public-home">
    <section className="hero2"><div className="wrap hero2g">
      <div className="hero-copy"><span className="pill"><Landmark size={16}/> A better-connected city</span>
        <h1>Your city.<br/><em>Your voice.</em><br/>Real change.</h1>
        <p className="lead">Report neighbourhood issues, follow progress, and help make public services more accountable — all in one place.</p>
        <div className="row hero-actions"><Link to="/complaints/new" className="btn pri"><Send size={18}/> Report an issue</Link><Link to="/track" className="btn"><Search size={18}/> Track a complaint</Link></div>
        <div className="hero-proof"><span><ShieldCheck size={17}/> Privacy-conscious</span><span><Eye size={17}/> Clear progress updates</span></div>
      </div>
      <div className="hero-photo-wrap"><img className="hero-photo" src="/images/hero.jpg" alt="A neighbourhood street representing local city services"/>
        <div className="hero-photo-shade"></div><div className="hero-float"><span className="live-dot"></span><div><b>One report can make a difference</b><small>From submission to resolution</small></div><CheckCircle2 size={24}/></div>
      </div>
    </div></section>
    <section className="wrap quick-stats"><div><b>01</b><span>Report a local issue</span></div><div><b>02</b><span>Follow its progress</span></div><div><b>03</b><span>See the outcome</span></div><div className="quick-stat-note"><ShieldCheck size={22}/><span>Designed around transparency and citizen privacy</span></div></section>
    <section className="sec wrap"><div className="section-heading"><div><span className="eyebrow">CITY SERVICES</span><h2>What needs attention<br/>in your neighbourhood?</h2></div><p className="mute">Choose an issue and send it to the right team. You can track the progress without sharing personal details publicly.</p></div>
      <div className="service-cards">{services.map((x,i)=><Link to="/complaints/new" className="service-card" key={x.title}><div className="service-img"><img src={x.img} alt={x.title}/><span>0{i+1}</span></div><div className="service-copy"><h3>{x.title}</h3><p>{x.desc}</p><span className="service-link">Report an issue <span>↗</span></span></div></Link>)}</div>
      <div className="all-categories"><span className="eyebrow">MORE CATEGORIES</span><div className="row">{CATEGORIES.map(c=><span className="badge" key={c}>{c}</span>)}</div></div>
    </section>
    <section className="process-band"><div className="wrap process-inner"><div><span className="eyebrow">SIMPLE BY DESIGN</span><h2>From report<br/>to resolution.</h2><p>Know what happens next at every step.</p><Link to="/about" className="text-link">Learn how City Connect works <span>→</span></Link></div>
      <ol className="process-steps">{[[Send,'Submit a report','Describe the issue and its location.'],[Search,'Review and route','The relevant team reviews the report.'],[Wrench,'Work in progress','The responsible department takes action.'],[CheckCircle2,'Resolution','The outcome is recorded and shared.']].map(([I,t,d]:any,i)=><li key={t}><span className="process-icon"><I size={21}/></span><div><small>STEP 0{i+1}</small><h3>{t}</h3><p>{d}</p></div></li>)}</ol>
    </div></section>
    <section className="sec wrap"><div className="section-heading"><div><span className="eyebrow">COMMUNITY IMPACT</span><h2>Progress people<br/>can see.</h2></div><p className="mute">Public updates help residents understand what has been reported and which issues have been resolved.</p></div>
      <div className="impact-grid"><div className="impact-photo"><img src="/images/feedback.jpg" alt="Community feedback and local service improvement"/><div className="impact-caption"><b>Better service starts with being heard.</b><span>Every report helps build a clearer picture of local needs.</span></div></div>
      <div className="impact-points"><div><span className="impact-number">01</span><div><h3>Privacy comes first</h3><p>Public tracking is designed to avoid exposing personal details.</p></div></div><div><span className="impact-number">02</span><div><h3>Updates you can follow</h3><p>Check the status and see progress without chasing multiple offices.</p></div></div><div><span className="impact-number">03</span><div><h3>Accountability matters</h3><p>Clear steps make it easier to understand how reports are handled.</p></div></div></div></div>
    </section>
    <section className="sec wrap resolved-section"><div className="section-heading"><div><span className="eyebrow">PUBLIC OUTCOMES</span><h2>Recently resolved</h2><p className="mute">Approved public cases, with personal details kept private.</p></div><Link className="btn" to="/resolved-complaints">View all cases <span>→</span></Link></div>
      <State s={r} empty="No approved resolved complaints yet.">{d=><div className="grid g3">{d.slice(0,3).map((c:any)=><Resolved key={c.id} c={c}/>)}</div>}</State>
    </section>
    <section className="wrap"><div className="cta polished-cta"><div><span className="eyebrow">YOUR NEIGHBOURHOOD, YOUR VOICE</span><h2>See something that needs fixing?</h2><p>Send a report in just a few minutes.</p></div><Link className="btn lg" to="/complaints/new">Submit a complaint <ArrowRight size={17}/></Link></div></section>
  </main>
}
export function About(){return <div className="wrap sec" style={{maxWidth:760}}><h1>About City Connect</h1><p>City Connect helps citizens report local problems and see them resolved with clear, public progress.</p>
  <h3>Privacy</h3><p>Anonymous complaints need no account. Identity is never shown publicly, and internal notes never appear in tracking.</p><h3>Workflow</h3><p>Submitted → Under review → Assigned → In progress → Resolved → Closed.</p><h3>Contact</h3><p className="mute">Support details to be confirmed by the project team.</p></div>}
export function ResolvedList(){
  const r=useApi(api.resolved); const [q,setQ]=useState('')
  return <div className="wrap sec"><Head title="Resolved complaints" sub="Approved public cases only. No personal details are shown."/>
   <label htmlFor="q">Search by title or category</label><input id="q" value={q} onChange={e=>setQ(e.target.value)} style={{maxWidth:420,marginBottom:20}}/>
   <State s={r}>{d=>{const f=d.filter((c:any)=>(c.title+c.category).toLowerCase().includes(q.toLowerCase()));return f.length?<div className="grid g3">{f.map((c:any)=><Resolved key={c.id} c={c}/>)}</div>:<div className="card">No matches for "{q}".</div>}}</State></div>
}
export function Track(){
  const [t,setT]=useState(''); const [res,setRes]=useState<any>(); const [err,setErr]=useState(''); const [busy,setBusy]=useState(false)
  const go=async(e:FormEvent)=>{e.preventDefault();setErr('');setRes(undefined)
    if(!/^[A-Za-z0-9]{16}$/.test(t)){setErr('Enter the 16-character tracking token.');return}
    setBusy(true);try{setRes(await api.track(t))}catch{setErr('We could not find a complaint for that token. Check it and try again.')}setBusy(false)}
  return <div className="wrap sec" style={{maxWidth:640}}><h1>Track a complaint</h1><form className="card" onSubmit={go} noValidate><label htmlFor="tk">Tracking token</label>
    <input id="tk" value={t} maxLength={16} onChange={e=>setT(e.target.value.trim())} autoComplete="off" aria-invalid={!!err} aria-describedby="tke"/><div id="tke" className="err" role="alert">{err}</div>
    <button className="btn pri" style={{marginTop:14}} disabled={busy}>{busy?'Checking…':'Track complaint'}</button></form>
    {res&&<div className="card" style={{marginTop:20}}><h3>Status: <StatusBadge status={res.status}/></h3><div className="tl">{res.updates.map((u:any)=><div key={u.date}><b>{u.date}</b><br/>{u.text}</div>)}</div></div>}</div>
}
export function Submit(){
  const {user}=useAuth(); const [anon,setAnon]=useState(true); const [f,setF]=useState<any>({}); const [e,setE]=useState<any>({}); const [tok,setTok]=useState(''); const [busy,setBusy]=useState(false)
  const set=(k:string)=>(ev:any)=>setF({...f,[k]:ev.target.value})
  const submit=async(ev:FormEvent)=>{ev.preventDefault();const x:any={}
    if((f.title||'').length<5)x.title='Title needs at least 5 characters.';if((f.description||'').length<20)x.description='Describe the problem in at least 20 characters.';
    ['category','zone','ward','location'].forEach(k=>{if(!f[k])x[k]='This field is required.'});if(!anon&&!user)x.identity='Sign in to submit as a verified citizen.'
    if(f.file&&f.file.size>5*1024*1024)x.file='File must be under 5 MB (final limit TBD by backend).'
    setE(x);if(Object.keys(x).length)return;setBusy(true)
    try{const {file,...body}=f;const r=await api.submit(body,anon);setTok(r.token)}catch(er:any){setE({form:er.message})}setBusy(false)}
  if(tok)return <div className="wrap sec" style={{maxWidth:600}}><div className="card"><CheckCircle2 size={32}/><h1>Complaint submitted</h1><p>Save this token. It is the only way to track an anonymous complaint.</p>
    <p style={{fontSize:'1.6rem',fontFamily:'Fraunces'}}>{tok}</p>{MOCK&&<p className="note">Demo token — not a real complaint.</p>}
    <div className="row"><button className="btn" onClick={()=>navigator.clipboard?.writeText(tok)}><Copy size={16}/>Copy token</button><Link className="btn pri" to="/track">Track now</Link></div></div></div>
  const Fld=(k:string,l:string,el?:any)=><div><label htmlFor={k}>{l}</label>{el||<input id={k} onChange={set(k)}/>}{e[k]&&<div className="err" role="alert">{e[k]}</div>}</div>
  return <div className="wrap sec" style={{maxWidth:720}}><h1>Submit a complaint</h1><form className="card" onSubmit={submit} noValidate>
    {Object.keys(e).length>0&&<div className="note" role="alert">Please fix {Object.keys(e).length} issue(s) below.</div>}
    <fieldset style={{border:0,padding:0}}><legend><b>How do you want to submit?</b></legend><label><input type="radio" checked={anon} onChange={()=>setAnon(true)}/> Anonymous — no account needed</label><label><input type="radio" checked={!anon} onChange={()=>setAnon(false)}/> Verified — linked to my account</label>{e.identity&&<div className="err">{e.identity} <Link to="/login">Login</Link></div>}</fieldset>
    {Fld('title','Title')}{Fld('description','Description',<textarea id="description" rows={4} onChange={set('description')}/>)}
    {Fld('category','Category',<select id="category" onChange={set('category')}><option value="">Select…</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select>)}
    <div className="grid s2">{Fld('zone','Zone')}{Fld('ward','Ward')}</div>{Fld('location','Exact issue location')}
    {Fld('file','Attachment (optional)',<input id="file" type="file" accept="image/*,.pdf" onChange={ev=>setF({...f,file:ev.target.files?.[0]})}/>)}
    <p className="note" style={{marginTop:16}}>Anonymous submissions do not store your identity. Zone and ward lists will load from the API once available.</p>
    {e.form&&<div className="err" role="alert">{e.form}</div>}<button className="btn pri" disabled={busy} style={{marginTop:14}}>{busy?'Submitting…':'Submit complaint'}</button></form></div>
}
export function Login(){
  const {login}=useAuth(); const nav=useNavigate(); const [u,setU]=useState(''); const [err,setErr]=useState('')
  const DEMO:Record<string,Role>={citizen:'citizen',ward:'ward',department:'department',mayor:'mayor',admin:'admin'}
  const go=(ev:FormEvent)=>{ev.preventDefault();const r=DEMO[u.toLowerCase()];if(!MOCK){setErr('Connect the real login endpoint (see docs/API_CONTRACT.md).');return}
    if(!r){setErr('Demo usernames: citizen, ward, department, mayor, admin (any password).');return}login(r,`${u} (demo)`);nav(HOME[r])}
  return <div className="wrap sec auth"><aside className="authside"><Photo name="feedback" alt="Citizen feedback and support" ratio="16/10" fallback={<Landmark size={34}/>}/><h2>Welcome to City Connect</h2><p>Report problems, follow progress and see your city get fixed. Anonymous reports need no account.</p></aside><div><h1>Log in</h1><form className="card" onSubmit={go}><label htmlFor="u">Username or email</label><input id="u" value={u} onChange={e=>setU(e.target.value)}/>
    <label htmlFor="p">Password</label><input id="p" type="password"/>{err&&<div className="err" role="alert">{err}</div>}<button className="btn pri" style={{marginTop:14}}>Log in</button>
    <p className="mute">New citizen? <Link to="/register">Create an account</Link></p></form></div></div>
}
export function Register(){
  const [done,setDone]=useState(false)
  return <div className="wrap sec auth"><aside className="authside"><Photo name="feedback" alt="Citizen feedback and support" ratio="16/10" fallback={<Landmark size={34}/>}/><h2>Welcome to City Connect</h2><p>Report problems, follow progress and see your city get fixed. Anonymous reports need no account.</p></aside><div><h1>Create a citizen account</h1>{done?<div className="card" role="status">Registration form captured (demo). Wire to the backend register endpoint.</div>:
  <form className="card" onSubmit={e=>{e.preventDefault();setDone(true)}}><label htmlFor="n">Full name</label><input id="n" required/><label htmlFor="e">Email</label><input id="e" type="email" required/><label htmlFor="pw">Password</label><input id="pw" type="password" minLength={8} required/>
  <p className="note" style={{marginTop:14}}>Staff accounts are created by a System Admin. Public sign-up is for citizens only.</p><button className="btn pri" style={{marginTop:14}}>Register</button></form>}</div></div>
}
export const Unauthorized=()=><div className="wrap sec" style={{maxWidth:560}}><div className="card"><h1>Access denied</h1><p>Your account does not have permission to view this page.</p><Link className="btn pri" to="/">Back to home</Link></div></div>
