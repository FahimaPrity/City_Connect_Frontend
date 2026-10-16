import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicLayout, RoleGuard } from './ui'
import * as P from './pages/public'
import * as D from './pages/portal'
import Home from './pages/home'
import { RevealWatcher } from './motion'
const R=(role:any,paths:[string,JSX.Element][])=><Route key={role} element={<RoleGuard role={role}/>}>{paths.map(([p,e])=><Route key={p} path={p} element={e}/>)}</Route>
export default function App(){
  return <><RevealWatcher/><Routes>
    <Route element={<PublicLayout/>}><Route index element={<Home/>}/><Route path="about" element={<P.About/>}/><Route path="complaints/new" element={<P.Submit/>}/><Route path="track" element={<P.Track/>}/>
      <Route path="resolved-complaints" element={<P.ResolvedList/>}/><Route path="login" element={<P.Login/>}/><Route path="register" element={<P.Register/>}/><Route path="unauthorized" element={<P.Unauthorized/>}/></Route>
    {R('citizen',[['/citizen/dashboard',<D.Dashboard role="citizen"/>],['/citizen/complaints',<D.Complaints role="citizen"/>],['/citizen/complaints/:id',<D.Detail role="citizen"/>],['/citizen/profile',<D.Profile/>]])}
    {R('ward',[['/ward/dashboard',<D.Dashboard role="ward"/>],['/ward/complaints',<D.Complaints role="ward"/>],['/ward/complaints/:id',<D.Detail role="ward"/>],['/ward/public-progress',<D.PublicProgress/>]])}
    {R('department',[['/department/dashboard',<D.Dashboard role="department"/>],['/department/complaints',<D.Complaints role="department"/>],['/department/complaints/:id',<D.Detail role="department"/>]])}
    {R('mayor',[['/mayor/dashboard',<D.Dashboard role="mayor"/>],['/mayor/reports',<D.Reports/>]])}
    {R('admin',[['/admin/dashboard',<D.Dashboard role="admin"/>],['/admin/users',<D.Config kind="users" title="Staff & role management"/>],['/admin/locations',<D.Config kind="locations" title="Zone & ward management"/>],['/admin/departments',<D.Config kind="departments" title="Department management"/>],['/admin/categories',<D.Config kind="categories" title="Category & routing setup"/>]])}
    <Route path="/notifications" element={<NotifGate/>}><Route index element={<D.Notifications/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes></>
}
import { useAuth, DashboardLayout } from './ui'
function NotifGate(){const {user}=useAuth();return user?<DashboardLayout role={user.role}/>:<Navigate to="/login" replace/>}
