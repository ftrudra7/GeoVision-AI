# geovision ai — planetary intelligence

> "micro1-level scroll storytelling applied to planetary intelligence."

geovision ai is an ai-powered geospatial intelligence platform where users explore the earth, inspect geographic regions, work with satellite imagery, compare temporal periods, detect geographic changes, and execute intelligent gis workflows.

---

## architecture

- **frontend:** react 18, vite, javascript (jsx/js), tailwind css, framer motion, cesium, resium, axios, react router, lucide react
- **backend:** node.js, express.js, javascript (js), jwt (`jsonwebtoken`), bcrypt (`bcryptjs`), cors, dotenv
- **database:** sqlite (`better-sqlite3` / node native `node:sqlite`), automated schema & foreign keys

---

## visual & experience identity

- **dark planetary aesthetic:** deep black (`#020408`), charcoal (`#0a0f1d`), restrained atmospheric blue (`#38bdf8`), glassmorphism with 1px white highlights and backdrop blur
- **typography:** aeonik pro geometric typography with modern sans fallbacks
- **lowercase design rule:** all visible text across landing, auth, and dashboard is formatted in lowercase
- **scroll storytelling:** 10-section editorial narrative with scroll-controlled cesium camera interpolation
- **3d / 2d synchronization:** synchronized dual cesium viewer with perspective 3d and orthographic nadir 2d sync
- **geospatial command center:** live interactive 3d cesium earth workspace with floating glass panels, natural-language spatial queries, animated workflow execution trace, temporal timeline slider (2020–2024), layer controls, and ai analyst drawer.

---

## local development setup

### 1. start the backend server

```bash
cd backend
npm install
npm run dev
```

the express api will run on `http://localhost:8000` (health check: `http://localhost:8000/api/health`).

### 2. start the frontend dev server

```bash
cd frontend
npm install
npm run dev
```

the vite development server will run on `http://localhost:5173`.

---

## api endpoints

- `GET /api/health` — health check
- `POST /api/auth/signup` — create user account
- `POST /api/auth/login` — sign in with jwt token
- `GET /api/auth/me` — fetch current authenticated user
- `POST /api/auth/logout` — logout
- `GET /api/projects` — list user projects
- `POST /api/projects` — create project
- `GET /api/projects/:id` — get project details
- `PUT /api/projects/:id` — update project
- `DELETE /api/projects/:id` — delete project
- `GET /api/analyses` — list analyses
- `POST /api/analyses` — execute & save spatial query
- `GET /api/analyses/:id` — get analysis details
- `DELETE /api/analyses/:id` — delete analysis
- `GET /api/history` — user activity trail
