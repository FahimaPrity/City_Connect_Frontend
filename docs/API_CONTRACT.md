# API Contract (TBD items must be confirmed with the backend team)
| Method | Endpoint (assumed) | Role | Status |
|---|---|---|---|
| POST | /complaints/anonymous | Public | TBD — must return 16-char token |
| POST | /complaints | Citizen | TBD |
| POST | /track  {token} | Public | TBD — safe generic error on invalid token |
| GET | /complaints | Citizen/Ward/Dept (scoped by backend) | TBD |
| GET | /complaints/:id | Scoped | TBD |
| GET | /public/resolved | Public | TBD |
| GET | /analytics/trend | Mayor/staff | TBD |
| GET | /admin/{users,locations,departments,categories} | Admin | TBD |
| — | login, register, refresh, notifications, deadline extension, duplicate link, manual review | — | TBD |
All paths above are placeholders used by `src/lib/api.ts`; none are confirmed.
