# City Connect — A Complaint Management Platform
React + TypeScript + Vite frontend. Backend is a separate team's REST API.

## Roles
Anonymous citizen, Verified citizen, Ward Clerk, Department Clerk, Mayor (read-only), System Admin.

## Routes (27)
Public: `/` `/about` `/complaints/new` `/track` `/resolved-complaints` `/login` `/register` `/unauthorized`
Citizen: `/citizen/dashboard` `/citizen/complaints` `/citizen/complaints/:id` `/citizen/profile`
Ward: `/ward/dashboard` `/ward/complaints` `/ward/complaints/:id` `/ward/public-progress`
Department: `/department/dashboard` `/department/complaints` `/department/complaints/:id`
Mayor: `/mayor/dashboard` `/mayor/reports`
Admin: `/admin/dashboard` `/admin/users` `/admin/locations` `/admin/departments` `/admin/categories`
Shared: `/notifications`

## Setup (Windows PowerShell / macOS / Linux)
```
npm install
copy .env.example .env      # macOS/Linux: cp .env.example .env
npm run dev
```
Open the printed URL (usually http://localhost:5173). Stop with **Ctrl+C**. Restart later with `npm run dev` in the same folder (no need to recreate).
Other scripts: `npm run typecheck`, `npm run build`.

## Demo mode
`VITE_USE_MOCK=true` shows labelled sample data. Demo logins (any password): `citizen`, `ward`, `department`, `mayor`, `admin`.
**Set `VITE_USE_MOCK=false` and `VITE_API_BASE_URL` for real backend.** Endpoints are listed in `docs/API_CONTRACT.md` (all TBD).

## Privacy
Tracking asks for the token only. Internal notes appear only in staff pages. Route guards are UX only; the backend enforces access.

## Structure
`src/lib` (api, mock) · `src/ui.tsx` (layouts, auth, shared components) · `src/pages/public.tsx` · `src/pages/portal.tsx` · `src/App.tsx` (routes)

## Known limitations
Create/edit actions for admin, deadlines, duplicates, notifications and real auth need backend endpoints. No `requirements.txt` — no Python tooling is used.
