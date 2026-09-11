# GeoVision AI

### Intelligent Geospatial Intelligence & GIS Orchestration

GeoVision AI is a web-based geospatial intelligence platform designed to bring satellite observations, spatial analysis, temporal comparison, and AI-assisted GIS workflows into a single interactive environment.

The platform is built around a simple idea:

> **Turn complex geospatial questions into structured, explainable spatial workflows.**

Instead of requiring users to work independently with raw satellite imagery, disconnected GIS tools, and separate analysis utilities, GeoVision AI provides a unified environment for exploring the Earth, selecting geographic regions, comparing temporal observations, managing analysis workflows, and visualizing geospatial information.

---

## Live Application

**Web Application:**
https://geovision-ai-two.vercel.app/

**Backend API:**
https://geovision-ai-gr3h.onrender.com/

**API Health Check:**
https://geovision-ai-gr3h.onrender.com/api/health

**GitHub Repository:**
https://github.com/ftrudra7/GeoVision-AI

---

## Overview

Geospatial analysis typically involves multiple stages:

* Identifying an area of interest
* Finding appropriate datasets
* Preparing spatial and temporal data
* Selecting suitable analytical operations
* Comparing observations across time
* Interpreting spatial information
* Presenting results in an accessible format

GeoVision AI brings these stages together into a unified geospatial workspace.

A typical analysis can begin with a natural-language question such as:

```text
What changed in this region between 2020 and 2024?
```

The platform is designed around a workflow such as:

```text
Natural-language query
        ↓
Region selection
        ↓
Dataset selection
        ↓
Temporal comparison
        ↓
Geospatial processing
        ↓
Analysis
        ↓
Visualization
```

The long-term objective is to evolve this workflow into an intelligent GIS orchestration layer capable of translating natural-language spatial requests into structured and executable geospatial workflows.

---

# Key Features

## Interactive 3D Earth

GeoVision AI uses **CesiumJS** to provide an interactive planetary environment instead of treating maps as a conventional dashboard component.

Users can:

* Explore the Earth
* Navigate between geographic regions
* Zoom and orbit
* Inspect spatial areas
* Visualize geographic layers
* Select analysis regions
* Maintain spatial context throughout an analysis

---

## Temporal Geospatial Analysis

Many geographic phenomena are best understood by comparing observations across time.

GeoVision AI therefore incorporates temporal analysis into the core interface.

Example:

```text
2020 ─────────────────── 2024
```

This enables workflows around:

* Temporal comparison
* Change detection
* Historical inspection
* Geographic change analysis
* Multi-period visualization

---

## Geospatial Layers

The command center is designed around independent spatial information layers.

Example layers include:

* Satellite imagery
* Urban density
* Transportation networks
* Vegetation indicators
* Hydrological features
* Analysis boundaries

Each layer can be independently represented within the geospatial workspace.

---

## AI-Assisted Spatial Analysis

GeoVision AI provides an analysis-oriented interface where a natural-language spatial question can be converted into a structured workflow.

The system is designed to represent stages such as:

```text
Understanding query
        ↓
Selecting region
        ↓
Loading imagery
        ↓
Comparing temporal layers
        ↓
Generating analysis
```

The interface focuses on making the analysis process understandable rather than presenting the result as an unexplained black box.

---

## Workflow Execution Trace

The command center contains a workflow trace representing the stages involved in an analysis.

Example:

```text
Understanding query
        ↓
Selecting region
        ↓
Loading imagery
        ↓
Comparing temporal layers
        ↓
Generating analysis
```

This provides a structured representation of the analysis workflow and creates a foundation for future intelligent GIS orchestration.

---

## User Authentication

GeoVision AI includes an authentication foundation with:

* Account registration
* Login
* JWT authentication
* Password hashing
* Protected application routes
* Authenticated user sessions
* Logout

---

## Project Management

Authenticated users can work with projects through the API.

Supported operations include:

* Create project
* View projects
* View individual projects
* Update projects
* Delete projects

---

## Analysis History

The platform maintains an analysis-oriented workflow that can be extended to store and retrieve previous spatial analyses.

This provides a foundation for:

* Historical analysis
* Comparison
* Reproducibility
* Project-based geospatial workflows

---

# System Architecture

At a high level, GeoVision AI follows a modular full-stack architecture:

```text
┌─────────────────────────────────────────────┐
│                  USER / ANALYST             │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│           REACT + CESIUM FRONTEND           │
│                                             │
│ UI • 3D EARTH • MAP LAYERS • WORKFLOWS      │
│ ANALYSIS INTERFACE • TEMPORAL CONTROLS      │
└──────────────────────┬──────────────────────┘
                       │
                       │ REST API
                       ▼
┌─────────────────────────────────────────────┐
│              NODE.JS + EXPRESS              │
│                                             │
│ AUTH • PROJECTS • ANALYSES • HISTORY        │
│ API ROUTES • BUSINESS LOGIC                 │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                   SQLITE                    │
│                                             │
│ USERS • PROJECTS • ANALYSES • HISTORY       │
└─────────────────────────────────────────────┘
```

The architecture is intentionally modular so that more advanced geospatial processing and machine-learning services can be introduced later without replacing the existing web platform.

---

# Technology Stack

## Frontend

| Technology       | Purpose                               |
| ---------------- | ------------------------------------- |
| React            | Component-based application UI        |
| Vite             | Development server and build tooling  |
| JavaScript / JSX | Application development               |
| Tailwind CSS     | Utility-first styling                 |
| Framer Motion    | UI animations and transitions         |
| React Router     | Client-side routing                   |
| Axios            | REST API communication                |
| CesiumJS         | 3D Earth and geospatial visualization |
| Resium           | React integration for Cesium          |
| Lucide React     | Interface icons                       |
| DOMPurify        | Content sanitization                  |

## Backend

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| Node.js        | JavaScript runtime             |
| Express.js     | REST API framework             |
| JSON Web Token | Authentication                 |
| bcryptjs       | Password hashing               |
| CORS           | Cross-origin API communication |
| dotenv         | Environment configuration      |

## Database

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| SQLite            | Lightweight relational database |
| Node SQLite layer | Application database access     |
| Foreign keys      | Relational data integrity       |

The current backend initializes the SQLite database when the server starts.

## Geospatial Visualization

### CesiumJS

CesiumJS is the primary planetary visualization engine.

It provides the foundation for:

* 3D Earth visualization
* Camera navigation
* Geographic positioning
* Spatial context
* Interactive geospatial exploration
* Future imagery and terrain integrations

### Resium

Resium provides React components and lifecycle integration for CesiumJS.

---

# Project Structure

```text
GeoVision-AI/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── cesium/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── globe/
│   │   │   ├── landing/
│   │   │   ├── navigation/
│   │   │   └── ui/
│   │   │
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── package.json
├── vercel.json
└── README.md
```

---

# Application Pages

The application is organized around several primary areas:

```text
/
├── landing
├── signin
├── signup
└── dashboard
    ├── overview
    ├── new analysis
    ├── projects
    ├── history
    ├── datasets
    ├── workflows
    └── settings
```

The dashboard is designed as a **geospatial command center** rather than a conventional administrative dashboard.

---

# GeoVision Command Center

The authenticated workspace combines the 3D Earth with analytical interface components.

The command center includes:

```text
┌─────────────────────────────────────────────┐
│             ANALYSIS QUERY                  │
│                                             │
│ What changed in this region between         │
│ 2020 and 2024?                              │
└─────────────────────────────────────────────┘

┌─────────────────┐      ┌────────────────────┐
│ GEOSPATIAL      │      │ WORKFLOW EXECUTION │
│ LAYERS          │      │ TRACE              │
│                 │      │                    │
│ satellite       │      │ understanding      │
│ urban density   │      │ selecting region   │
│ vegetation      │      │ loading imagery    │
│ water           │      │ comparing layers   │
└─────────────────┘      └────────────────────┘

┌─────────────────────────────────────────────┐
│           TEMPORAL OBSERVATION              │
│                                             │
│ 2020 ─── 2021 ─── 2022 ─── 2023 ─── 2024  │
└─────────────────────────────────────────────┘
```

---

# Authentication

The backend exposes authentication endpoints for account creation and session management.

Authentication uses:

```text
User credentials
      ↓
bcrypt password hashing
      ↓
JWT authentication
      ↓
Protected API routes
```

JWT tokens are used to identify authenticated users when accessing protected resources.

---

# API

## Health Check

```http
GET /api/health
```

Production endpoint:

https://geovision-ai-gr3h.onrender.com/api/health

---

# Authentication API

## Create Account

```http
POST /api/auth/signup
```

Example request:

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "your-password"
}
```

## Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

## Current User

```http
GET /api/auth/me
```

Requires authentication.

## Logout

```http
POST /api/auth/logout
```

---

# Project API

## List Projects

```http
GET /api/projects
```

## Create Project

```http
POST /api/projects
```

## Get Project

```http
GET /api/projects/:id
```

## Update Project

```http
PUT /api/projects/:id
```

## Delete Project

```http
DELETE /api/projects/:id
```

---

# Analysis API

## List Analyses

```http
GET /api/analyses
```

## Create Analysis

```http
POST /api/analyses
```

## Get Analysis

```http
GET /api/analyses/:id
```

## Delete Analysis

```http
DELETE /api/analyses/:id
```

---

# History API

```http
GET /api/history
```

Returns the authenticated user's analysis/activity history.

---

# Local Development

## Requirements

Before running GeoVision AI locally, install:

* Node.js
* npm
* Git

Docker is not required.

---

## 1. Clone the Repository

```bash
git clone https://github.com/ftrudra7/GeoVision-AI.git
cd GeoVision-AI
```

---

## 2. Start the Backend

Open a terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/api/health
```

---

## 3. Start the Frontend

Open another terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

# Environment Variables

## Backend

Create:

```text
backend/.env
```

Example:

```env
NODE_ENV=development
PORT=8000
JWT_SECRET=replace_with_a_secure_random_secret
FRONTEND_URL=http://localhost:5173
```

> Never commit real secrets to GitHub.

## Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:8000
```

For production, the frontend should point to the deployed backend API.

---

# Deployment

## Frontend

GeoVision AI's frontend is deployed using **Vercel**.

Production URL:

https://geovision-ai-two.vercel.app/

The frontend is built with Vite and served as a single-page React application.

## Backend

The backend is deployed using **Render**.

Production API:

https://geovision-ai-gr3h.onrender.com/

Health endpoint:

https://geovision-ai-gr3h.onrender.com/api/health

---

# Data Flow

A typical user interaction follows this architecture:

```text
User
 │
 ▼
React Interface
 │
 ▼
Natural-language spatial query
 │
 ▼
Analysis configuration
 │
 ├── region
 ├── analysis type
 ├── dataset
 └── temporal range
 │
 ▼
Express API
 │
 ▼
Analysis / workflow layer
 │
 ▼
SQLite persistence
 │
 ▼
Geospatial visualization
 │
 ▼
User-facing analysis interface
```

---

# Geospatial Analysis Concept

GeoVision AI is designed to support workflows such as:

## Change Detection

```text
Region
  ↓
2020 imagery
  ↓
2024 imagery
  ↓
Temporal comparison
  ↓
Change analysis
  ↓
Map visualization
```

## Spatial Risk Analysis

```text
Satellite data
      +
Environmental data
      +
Geospatial context
      ↓
Spatial analysis
      ↓
Risk indicators
      ↓
Interactive visualization
```

## Intelligent GIS Workflow

```text
Natural-language request
        ↓
Query understanding
        ↓
Analysis planning
        ↓
Data discovery
        ↓
Spatial preprocessing
        ↓
Geoprocessing
        ↓
Validation
        ↓
Visualization
```

---

# Roadmap

GeoVision AI is being developed incrementally. The current implementation establishes the full-stack platform and geospatial interface, while more advanced processing and machine-learning capabilities are planned as future extensions.

## Phase 1 — Platform Foundation

* React frontend
* Vite build system
* Node.js backend
* Express REST API
* SQLite database
* JWT authentication
* Password hashing
* Project management
* Analysis history
* Cesium 3D Earth
* Interactive dashboard
* Production deployment

## Phase 2 — Advanced Geospatial Processing

Planned integrations:

* GeoPandas
* Rasterio
* GDAL
* Xarray
* Turf.js
* STAC
* Spatial indexing
* Raster processing pipelines
* Vector processing workflows

## Phase 3 — AI / Machine Learning

Potential future models include:

* Change detection
* Satellite image classification
* Land-cover classification
* Super-resolution
* Hazard detection
* Spatial forecasting
* Risk scoring
* Multi-hazard analysis

Potential frameworks and services may include:

* PyTorch
* TensorFlow
* Hugging Face
* Custom computer-vision models
* Model-serving APIs

## Phase 4 — Intelligent GIS Orchestration

The longer-term objective is to introduce an intelligent orchestration layer capable of transforming natural-language spatial questions into structured GIS workflows.

For example:

```text
User:

"Identify areas that experienced significant land-use
change between 2020 and 2024."
```

Potential workflow:

```text
1. Understand spatial intent
        ↓
2. Identify geographic region
        ↓
3. Determine temporal range
        ↓
4. Discover appropriate datasets
        ↓
5. Prepare imagery
        ↓
6. Align spatial / temporal data
        ↓
7. Execute change-detection workflow
        ↓
8. Validate output
        ↓
9. Generate visualization
        ↓
10. Present analysis
```

---

# Future Data Sources

The platform is designed to support integration with external geospatial datasets and Earth-observation sources.

Potential sources include:

* Sentinel-1
* Sentinel-2
* MODIS
* VIIRS
* Digital Elevation Models
* OpenStreetMap
* Weather datasets
* Environmental datasets
* STAC catalogs

> These integrations represent planned expansion of the platform and should not be interpreted as all being connected to the current production deployment.

---

# Future AI / GIS Architecture

The planned architecture can evolve toward:

```text
                         USER
                           │
                           ▼
                 NATURAL LANGUAGE QUERY
                           │
                           ▼
                     AI PLANNING LAYER
                           │
                           ▼
                   ANALYSIS PLAN / WORKFLOW
                           │
                           ▼
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
       DATA DISCOVERY             GIS TOOL SELECTION
              │                         │
              └────────────┬────────────┘
                           ▼
                  GEOSPATIAL PROCESSING
                           │
                           ▼
                    ANALYSIS / ML MODELS
                           │
                           ▼
                        VALIDATION
                           │
                           ▼
                  MAPS + METRICS + INSIGHTS
                           │
                           ▼
                     GEOVISION
                   COMMAND CENTER
```

---

# Design Philosophy

GeoVision AI is designed around a **spatial-first interface**.

Instead of presenting geospatial information as a conventional administrative dashboard, the platform treats the Earth itself as the primary visual context.

The design language combines:

* Cinematic planetary visualization
* Interactive 3D Earth
* Dark analytical workspaces
* Glassmorphism
* Minimal information hierarchy
* Editorial storytelling
* Spatial interaction
* Temporal visualization

The experience is divided into two primary visual modes.

### Landing Experience

```text
Cinematic
Narrative
Exploratory
```

### Command Center

```text
Analytical
Interactive
Operational
```

The same planetary visual language connects both experiences.

---

# Security Considerations

GeoVision AI uses JWT-based authentication and bcryptjs password hashing.

For production environments:

* Never commit `.env` files
* Never commit production credentials
* Use a strong randomly generated JWT secret
* Configure CORS explicitly
* Protect authenticated API routes
* Avoid exposing private API credentials in frontend code
* Do not expose privileged Cesium or external service credentials
* Do not commit production database files containing sensitive user information

---

# Scalability Direction

The current architecture is intentionally lightweight.

As the platform grows, the system can be extended with:

```text
Current
│
├── React
├── Cesium
├── Node.js
├── Express
└── SQLite
        │
        ▼
Future
├── Advanced geospatial processing
├── Satellite data catalogs
├── ML inference services
├── Object storage
├── Scalable databases
├── Distributed processing
├── Monitoring
└── Automated deployment
```

The objective is to evolve the application without requiring a complete rewrite of the existing frontend or API architecture.

---

# Project Links

| Resource         | Link                                                    |
| ---------------- | ------------------------------------------------------- |
| Live Application | https://geovision-ai-two.vercel.app/                    |
| Sign In          | https://geovision-ai-two.vercel.app/signin              |
| Sign Up          | https://geovision-ai-two.vercel.app/signup              |
| Dashboard        | https://geovision-ai-two.vercel.app/dashboard           |
| Projects         | https://geovision-ai-two.vercel.app/dashboard/projects  |
| History          | https://geovision-ai-two.vercel.app/dashboard/history   |
| Datasets         | https://geovision-ai-two.vercel.app/dashboard/datasets  |
| Workflows        | https://geovision-ai-two.vercel.app/dashboard/workflows |
| Settings         | https://geovision-ai-two.vercel.app/dashboard/settings  |
| Backend API      | https://geovision-ai-gr3h.onrender.com/                 |
| API Health       | https://geovision-ai-gr3h.onrender.com/api/health       |
| GitHub           | https://github.com/ftrudra7/GeoVision-AI                |

---

# Repository

```text
https://github.com/ftrudra7/GeoVision-AI
```

Clone the repository:

```bash
git clone https://github.com/ftrudra7/GeoVision-AI.git
```

---

# License

This project is developed as an academic capstone project.

Refer to the repository for the applicable licensing and usage terms.

---

> **GeoVision AI — From Earth Data to Spatial Intelligence.**
