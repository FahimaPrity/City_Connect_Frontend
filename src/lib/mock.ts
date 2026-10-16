// DEMO DATA ONLY — production-e dekhano hobe na (VITE_USE_MOCK=false)
export const STATUSES = ['SUBMITTED','UNDER_REVIEW','ASSIGNED','IN_PROGRESS','RESOLVED','CLOSED']
export const CATEGORIES = ['Road & Engineering','Waste Management','Health','Transport','Urban Planning','Estate & Property']
const t=['Broken streetlight on main road','Overflowing garbage bin','Pothole near school','Stagnant water in drain','Illegal parking at junction','Damaged footpath','Missed waste collection','Unsafe building signage']
export const complaints = t.map((title,i)=>({id:String(100+i),title,category:CATEGORIES[i%6],ward:`Ward ${i+3}`,zone:`Zone ${(i%4)+1}`,status:STATUSES[i%6],date:`2026-09-${String(20-i).padStart(2,'0')}`,deadline:`2026-10-${String(10+i).padStart(2,'0')}`,summary:'Demo complaint description for visual development.'}))
export const trend = ['May','Jun','Jul','Aug','Sep','Oct'].map((m,i)=>({m,received:40+i*7,resolved:28+i*8}))
export const resolved = complaints.slice(0,6).map(c=>({...c,id:c.id+'r',status:'RESOLVED'}))
export const config:any = {users:['Ward Clerk — assigned wards','Department Clerk — dept scope','Mayor','System Admin'],locations:['Zone 1','Zone 2','Zone 3','Zone 4'],departments:CATEGORIES,categories:CATEGORIES}
