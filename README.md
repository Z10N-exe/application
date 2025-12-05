# BEN — Nike-style Store

Production-ready monorepo with a NestJS backend and React + Vite frontend.

## Tech Stack

- Backend: NestJS + Prisma, SQLite (dev), JWT auth
- Frontend: React, Vite, React Router, React Query, Tailwind

## Environments & Secrets

Backend env vars:

- `PORT` — server port (Render provides this automatically)
- `JWT_SECRET` — required, set to a strong secret
- `DATABASE_URL` — Prisma connection string
  - Dev (local): `file:./backend/prisma/dev.db`
  - Render (with persistent disk): `file:/var/data/dev.db`

Frontend env vars:

- `VITE_API_BASE_URL` — base URL for the backend API
  - Dev: `/api` (via Vite proxy)
  - Prod: `https://<your-render-service>.onrender.com`

## Local Development

1. Install deps in both apps:
   - `cd backend && npm i`
   - `cd ../frontend && npm i`
2. Generate Prisma client and run migrations:
   - `cd backend`
   - `npm run prisma:generate`
   - `npm run prisma:migrate`
   - Optional seed: `npm run prisma:seed`
3. Start backend (port 3000):
   - `npm run start:dev`
4. Start frontend (port 5173):
   - `cd ../frontend && npm run dev`

The frontend dev server proxies `/api/*` to `http://localhost:3000`.

## Production Deploy

### Backend on Render

1. Create a new Web Service and point to this repo.
2. Set Root Directory to `backend`.
3. Add Environment Variables:
   - `NODE_ENV=production`
   - `JWT_SECRET=<strong-secret>`
   - `DATABASE_URL=file:/var/data/dev.db`
   - Optionally set `CORS_ORIGIN=https://<your-vercel-domain>`
4. Add a Persistent Disk (e.g., 1GB) mounted at `/var/data`.
5. Build Command:
   - `npm ci && npm run build && npx prisma generate`
6. Start Command:
   - `npx prisma migrate deploy && node dist/main.js`
7. Optional: Run seed once after first deploy:
   - `npm run prisma:seed`

Notes:

- The app reads `PORT` from env; Render provides it automatically.
- Prisma uses `DATABASE_URL` (configured via env) for SQLite file on the disk.

### Frontend on Vercel

1. Import the repo into Vercel.
2. Set Root Directory to `frontend`.
3. Build & Output:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Environment Variables:
   - `VITE_API_BASE_URL=https://<your-render-service>.onrender.com`
5. Deploy.

Routing & assets:

- React Router runs as SPA; Vercel handles this by default.
- `frontend/vite.config.ts` uses `publicDir: 'images'` to ship images.

## Production Checklist

- Backend
  - Uses `process.env.PORT` and `JWT_SECRET`
  - CORS origin can be restricted via `CORS_ORIGIN`
  - Prisma `DATABASE_URL` provided via env
  - `npm run build` produces `dist/` and starts with `node dist/main.js`
- Frontend
  - `VITE_API_BASE_URL` set to backend URL
  - `npm run build` produces `dist/` for Vercel
  - Responsive UI verified across breakpoints

## Conventional Commits

Use conventional commits (e.g., `feat: ...`, `fix: ...`, `style: ...`). Make the repo public for automated deploys.

## Testing

- Backend: `npm test` (Jest)
- Frontend: `npm test` (Vitest)

