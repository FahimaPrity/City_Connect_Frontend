import * as M from './mock'
export const MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const BASE = import.meta.env.VITE_API_BASE_URL || ''
export class ApiError extends Error { status:number; constructor(m:string,s:number){super(m);this.status=s} }
const wait=(ms:number)=>new Promise(r=>setTimeout(r,ms))
export async function request<T>(path:string, mock:T, init?:RequestInit):Promise<T>{
  if(MOCK){ await wait(350); return mock }
  const token=sessionStorage.getItem('cc_token')
  const res=await fetch(BASE+path,{...init,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{}),...(init?.headers||{})}})
  if(!res.ok){ let msg='Request failed'; try{msg=(await res.json()).message||msg}catch{} throw new ApiError(msg,res.status) }
  return res.json()
}
export const api={
  complaints:()=>request<any[]>('/complaints',M.complaints),
  complaint:(id:string)=>request<any>(`/complaints/${id}`,M.complaints.find(c=>c.id===id)||M.complaints[0]),
  resolved:()=>request<any[]>('/public/resolved',M.resolved),
  trend:()=>request<any[]>('/analytics/trend',M.trend),
  config:(k:string)=>request<string[]>(`/admin/${k}`,M.config[k]||[]),
  track:(token:string)=>request<any>('/track',{status:'IN_PROGRESS',updates:[{date:'2026-10-02',text:'Complaint received'},{date:'2026-10-05',text:'Assigned to department'},{date:'2026-10-12',text:'Work in progress'}]},{method:'POST',body:JSON.stringify({token})}),
  submit:(body:any,anon:boolean)=>request<any>(anon?'/complaints/anonymous':'/complaints',{token:'DEMO'+Math.random().toString(36).slice(2,14).toUpperCase()},{method:'POST',body:JSON.stringify(body)}),
}
