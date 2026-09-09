# GeoVision AI

## Overview
GeoVision AI is an intelligent geospatial analysis platform where users can ask complex spatial questions in natural language. The system plans and executes GIS workflows using LLMs, satellite imagery, geospatial datasets, and geoprocessing tools.

**Note:** This repository currently implements the "Day 1" foundation:
- Premium Landing Page
- Real Authentication (PostgreSQL, JWT, pwdlib with Argon2)
- Interactive Dashboard UI (Geospatial Command Center)
- Simulated Map, Layer Controls, Timeline, and Analysis Trace.

## Architecture
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend:** FastAPI, SQLAlchemy, Pydantic
- **Database:** PostgreSQL (Configured with SQLite fallback for local development)

## Setup

### 1. Database
For local development, the backend is pre-configured to use SQLite (`geovision.db`). 
To switch to PostgreSQL, use the provided `docker-compose.yml` and update `backend/.env`.

### 2. Backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # Windows
# source venv/bin/activate # Linux/Mac
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/health`

## Future Roadmap
- LLM workflow planner
- RAG over GIS documentation
- GIS tool registry
- Real satellite imagery & change detection
- PostGIS integration
