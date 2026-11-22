# GeoVision AI 🌍

### An AI-powered geospatial intelligence and spatial decision-support platform

GeoVision AI is an intelligent geospatial analysis platform designed to
make complex Geographic Information System (GIS) operations more
accessible through natural language.

The project aims to connect **Large Language Models (LLMs), Geographic
Information Systems (GIS), and Earth Observation (EO) data**. Users
describe a geographical problem in plain language; the platform is
designed to translate that request into a structured geospatial
workflow, execute the relevant analysis, and present the findings
through interactive maps and evidence-backed reports.

Example questions include:

- How has urban expansion changed in Delhi NCR between 2020 and 2025?
- Which areas are most vulnerable to flooding?
- Identify regions experiencing significant vegetation loss.
- Find suitable locations for a new hospital based on population density
  and accessibility.
- Compare land-use patterns across two different time periods.

> **Our vision:** Make geospatial intelligence accessible to everyone —
> not just GIS specialists.

------------------------------------------------------------------------

## Table of Contents

- [Project Overview](#-project-overview)
- [The Problem](#-the-problem)
- [Our Approach](#-our-approach)
- [Satellite Data Sources](#-satellite-data-sources)
- [Core Capabilities](#-core-capabilities)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [How It Works](#-how-it-works)
- [Example Use Cases](#-example-use-cases)
- [Current Implementation](#-current-implementation)
- [Research Foundation](#-research-foundation)
- [Future Roadmap](#-future-roadmap)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Running the Project](#-running-the-project)
- [Security Considerations](#-security-considerations)
- [Contributing](#-contributing)
- [License](#-license)

------------------------------------------------------------------------

## 🌐 Project Overview

Traditional GIS workflows often require specialized knowledge, multiple
software tools, manual dataset discovery, and considerable time to
perform even relatively straightforward spatial analyses.

Meanwhile, satellite imagery, geospatial databases, and Earth
Observation datasets are becoming increasingly accessible. However,
converting this information into reliable insights remains a technical
challenge.

GeoVision AI explores a more accessible approach through five connected
capabilities:

1.  **Natural-language understanding:** Understand geographical
    questions and identify the user’s analytical intent.
2.  **Geospatial data discovery:** Find relevant satellite imagery and
    spatial datasets for a location and time period.
3.  **AI-driven workflow orchestration:** Translate user requests into
    structured GIS operations.
4.  **Geospatial computation:** Perform remote-sensing calculations,
    raster processing, vector analysis, and temporal comparisons.
5.  **Interactive visualization:** Present findings through maps,
    analytical summaries, and explainable reports.

The long-term objective is to develop an autonomous geospatial
intelligence system capable of reasoning about geographical problems
rather than simply displaying geographical information.

------------------------------------------------------------------------

## 🚨 The Problem

Despite the increasing availability of geospatial data, several
challenges remain:

| Challenge               | Description                                                                            |
|:------------------------|:---------------------------------------------------------------------------------------|
| Technical complexity    | GIS operations require familiarity with specialized tools and concepts.                |
| Data fragmentation      | Satellite imagery and geographical datasets are distributed across multiple platforms. |
| Workflow complexity     | A single analysis may require several interconnected operations.                       |
| Limited accessibility   | Non-specialists can struggle to translate geographical questions into GIS workflows.   |
| Lack of explainability  | Analytical outputs may not clearly communicate how a result was obtained.              |
| Time-consuming analysis | Data preparation, processing, and visualization can require substantial manual effort. |

GeoVision AI aims to address these challenges through an intelligent
interface that connects natural-language understanding with actual
geospatial computation.

------------------------------------------------------------------------

## 💡 Our Approach

GeoVision AI follows a layered approach to geospatial intelligence.

### 1. Natural Language Understanding

Users describe a geographical problem using ordinary language.

Example:

> Analyze vegetation degradation in the selected region over the last
> five years.

The system identifies the analytical objective, geographical area, time
range, and expected output.

### 2. Geospatial Data Discovery

The system is designed to identify relevant datasets based on
geographical boundaries, temporal constraints, sensor characteristics,
and analytical requirements.

Potential sources include:

- MODIS Terra
- MODIS Aqua
- Sentinel-1
- Sentinel-2
- Digital Elevation Models (DEMs)
- OpenStreetMap data
- Population and demographic datasets
- Other publicly available Earth Observation datasets

### 3. Workflow Planning

The natural-language request is translated into a structured analytical
workflow. Depending on the problem, this may involve:

- Dataset discovery
- Coordinate reference system validation
- Raster preprocessing
- Cloud and shadow masking
- Spectral index calculation
- Spatial overlays
- Temporal comparisons
- Classification and change detection

### 4. Geospatial Execution

The planned workflow is intended to be executed using dedicated
geospatial processing tools. The LLM coordinates and explains the
workflow; deterministic geospatial tools perform the numerical and
spatial operations.

### 5. Visualization and Explainability

The final output aims to include:

- Interactive geographical visualizations
- Analytical summaries
- Spatial statistics
- Data source information
- Workflow execution history
- Methodology, assumptions, and limitations

------------------------------------------------------------------------

## 🛰️ Satellite Data Sources

The planned Earth Observation foundation of GeoVision AI includes four
primary satellite data sources.

### 1. MODIS — Terra

The Moderate Resolution Imaging Spectroradiometer (MODIS) instrument
aboard NASA’s Terra satellite provides broad-scale, frequent
observations of Earth’s land, oceans, and atmosphere.

**Potential applications:**

- Long-term vegetation monitoring
- Land-surface temperature analysis
- Environmental trend analysis
- Large-scale land-cover monitoring
- Regional and continental-scale observations

**Potential products:**

- MOD13Q1 — Terra Vegetation Indices, including NDVI and EVI
- MOD11A2 — Terra Land Surface Temperature and Emissivity

### 2. MODIS — Aqua

Aqua also carries a MODIS instrument. Its observations complement
Terra’s and provide another daily observation opportunity, subject to
acquisition timing, product availability, and quality.

**Potential applications:**

- Vegetation condition monitoring
- Land-surface temperature analysis
- Environmental monitoring
- Temporal analysis and comparison
- Large-scale Earth system observations

**Potential products:**

- MYD13Q1 — Aqua Vegetation Indices, including NDVI and EVI
- MYD11A2 — Aqua Land Surface Temperature and Emissivity

> **Naming note:** “MODIS 1” and “MODIS 2” are not official product
> names. This README interprets them as **Terra MODIS and Aqua MODIS**,
> respectively. Confirm this mapping before treating it as final. MODIS
> is an instrument; Terra and Aqua are the satellite platforms.

### 3. Sentinel-1

Sentinel-1 is part of the European Union’s Copernicus programme and
carries a Synthetic Aperture Radar (SAR) instrument.

Unlike optical sensors, radar can acquire observations through cloud
cover and during day or night, making it especially useful for
applications where clouds are a major obstacle.

**Potential applications:**

- Flood extent mapping
- Surface-water monitoring
- Ground deformation analysis
- Surface change detection
- Selected agricultural and land-monitoring applications

**Potential data products:**

- GRD — Ground Range Detected
- SLC — Single Look Complex

For many initial flood-mapping workflows, Sentinel-1 GRD is a practical
starting point. Processing may include orbit correction, noise removal,
calibration, terrain correction, and suitable thresholding or
classification.

### 4. Sentinel-2

Sentinel-2 is a Copernicus optical Earth Observation mission that
provides multispectral imagery at several spatial resolutions.

Its spectral bands support vegetation, water, soil, and built-up area
analysis.

**Potential applications:**

- Vegetation monitoring
- Land-use and land-cover classification
- Urban expansion analysis
- Water-body mapping
- Environmental monitoring
- Multitemporal change detection

**Potential data products:**

- Level-1C — Top-of-atmosphere reflectance
- Level-2A — Bottom-of-atmosphere / surface reflectance

Level-2A surface reflectance is a useful starting point for many
spectral-index workflows.

### Dataset comparison

| Dataset     | Sensor type             | Main strengths                                          | Example applications                        |
|:------------|:------------------------|:--------------------------------------------------------|:--------------------------------------------|
| MODIS Terra | Optical / multispectral | Frequent, broad-scale observations and long time series | Vegetation trends, land-surface temperature |
| MODIS Aqua  | Optical / multispectral | Complementary observations and temporal coverage        | Vegetation and environmental monitoring     |
| Sentinel-1  | SAR / radar             | Day-night and cloud-penetrating acquisition             | Flood mapping, surface change               |
| Sentinel-2  | Optical / multispectral | Detailed multispectral observations                     | Urban growth, vegetation, land cover        |

### Which dataset should be used?

| Analysis objective                      | Recommended starting datasets                    |
|:----------------------------------------|:-------------------------------------------------|
| Vegetation monitoring                   | Sentinel-2 and MODIS                             |
| Urban expansion                         | Sentinel-2                                       |
| Flood extent mapping                    | Sentinel-1                                       |
| Land-use / land-cover mapping           | Sentinel-2, with MODIS for broader-scale context |
| Land-surface temperature                | MODIS                                            |
| Long-term regional environmental trends | MODIS                                            |
| Flood analysis during cloudy conditions | Sentinel-1                                       |
| Detailed vegetation condition           | Sentinel-2                                       |

Dataset selection must also consider spatial resolution, revisit
frequency, acquisition date, cloud cover, quality flags, and the size of
the area of interest. MODIS and Sentinel imagery have different spatial
resolutions and should not be compared as if they were interchangeable.

### Data discovery and access

The platform is intended to use standardized discovery interfaces where
possible, particularly the SpatioTemporal Asset Catalog (STAC)
ecosystem.

Useful resources:

- [NASA Earthdata —
  MODIS](https://www.earthdata.nasa.gov/data/instruments/modis)
- [NASA Earthdata Search](https://search.earthdata.nasa.gov/)
- [Copernicus Data Space Ecosystem](https://dataspace.copernicus.eu/)
- [Copernicus Sentinel-1
  mission](https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-1)
- [Copernicus Sentinel-2
  mission](https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-2)
- [STAC specification](https://www.ogc.org/standards/stac/)

------------------------------------------------------------------------

## 🚀 Core Capabilities

The following describes the platform’s intended capabilities.
Implementation status is documented separately in [Current
Implementation](#-current-implementation).

### 🧠 AI-powered Geospatial Analysis

Translate natural-language questions into structured geographical
analysis requests.

### 🛰️ Earth Observation Intelligence

Integrate MODIS and Sentinel satellite datasets to support environmental
monitoring and geographical analysis.

### 📊 Temporal Change Detection

Compare geographical conditions across different time periods to
identify:

- Urban expansion
- Deforestation
- Vegetation degradation
- Land-use and land-cover changes
- Environmental transformations

### 🌊 Flood Analysis

Use radar observations and relevant terrain or hydrological information
to map potential flood extent and assess flood-related exposure.

Flood susceptibility and flood forecasting require additional inputs and
validation; satellite imagery alone does not establish future flood
probability.

### 🏙️ Spatial Suitability Analysis

Identify potentially suitable geographical locations for infrastructure
and public services using weighted spatial criteria.

Potential applications include:

- Hospital placement
- School accessibility
- Emergency service coverage
- Urban infrastructure planning

### 🌍 Interactive 3D Geospatial Visualization

Explore geographical regions using a Cesium-powered 3D globe and
interactive map interface.

### 📑 Explainable Analytical Reports

Present analytical findings alongside the underlying methodology, data
sources, and execution details.

------------------------------------------------------------------------

## 🏗️ System Architecture

GeoVision AI is designed around a modular architecture that separates
application management, AI orchestration, and geospatial processing.

### High-level architecture

``` text
                         USER
                           |
                           v
                React + Vite Frontend
                           |
                  Natural Language Query
                           |
                           v
                Node.js / Express API
                           |
                Authentication & Validation
                           |
                           v
                 AI Orchestration Layer
                           |
                 Intent & Workflow Planning
                           |
                           v
              Geospatial Processing Engine
                           |
              +------------+-------------+
              |            |             |
              v            v             v
           MODIS        Sentinel-1    Sentinel-2
         Terra/Aqua         SAR          Optical
              |            |             |
              +------------+-------------+
                           |
                   Data Preprocessing
                           |
                Raster & Vector Analysis
                           |
                  Results & Provenance
                           |
                           v
                Visualization & Reporting
                           |
                           v
                  Interactive Map
```

*This is the intended architecture. Some components are part of the
current application, while others are planned integrations.*

### Architectural components

| Component         | Responsibility                                                        |
|:------------------|:----------------------------------------------------------------------|
| Frontend          | User interface, analysis requests, map visualization, and dashboards  |
| Backend API       | Authentication, project management, request handling, and persistence |
| AI orchestration  | Intent understanding, workflow planning, and tool selection           |
| Data discovery    | Finding satellite imagery and geospatial datasets                     |
| Geospatial engine | Raster processing, vector analysis, and spatial computation           |
| Visualization     | Displaying spatial outputs and analytical insights                    |

### Proposed processing architecture

The existing Node.js backend can continue handling application-level
responsibilities, while a dedicated Python service handles
computationally intensive geospatial operations.

- **Node.js:** API management, authentication, projects, and application
  services.
- **Python:** Remote sensing, GIS, scientific computing, and geospatial
  workflows.
- **LLM orchestration:** Interprets requests and coordinates approved
  tools.
- **Geospatial libraries:** Perform reproducible calculations and
  spatial operations.

------------------------------------------------------------------------

## 🛠️ Technology Stack

### Current application stack

| Technology    | Purpose                                |
|:--------------|:---------------------------------------|
| React         | Component-based user interface         |
| Vite          | Frontend development and build tooling |
| Tailwind CSS  | Styling and responsive layouts         |
| Framer Motion | Interface animations                   |
| CesiumJS      | 3D geographical visualization          |
| Resium        | React integration for Cesium           |
| Axios         | HTTP communication with backend APIs   |
| Node.js       | Backend runtime                        |
| Express.js    | REST API development                   |
| SQLite        | Application data persistence           |
| JWT           | Authentication and authorization       |
| bcrypt        | Password hashing                       |

### Planned geospatial and AI integrations

| Technology | Intended purpose                                          |
|:-----------|:----------------------------------------------------------|
| Python     | Geospatial processing service                             |
| FastAPI    | Python service API                                        |
| GeoPandas  | Vector data processing                                    |
| Rasterio   | Raster data processing                                    |
| Shapely    | Geometric operations                                      |
| NumPy      | Numerical computation                                     |
| GDAL       | Geospatial data transformation                            |
| STAC       | Discovery of Earth Observation assets                     |
| MODIS      | Broad-scale and frequent Earth observations               |
| Sentinel-1 | Radar-based Earth observations                            |
| Sentinel-2 | Multispectral optical imagery                             |
| LLM APIs   | Natural-language understanding and workflow orchestration |

------------------------------------------------------------------------

## ⚙️ How It Works

Consider the following example:

**User query:**

> Identify urban expansion in Delhi NCR between 2020 and 2025.

A fully implemented GeoVision AI workflow is intended to follow these
stages.

### Step 1: Query interpretation

Extract the relevant parameters:

``` json
{
  "objective": "urban_expansion_analysis",
  "region": "Delhi NCR",
  "start_year": 2020,
  "end_year": 2025,
  "analysis_type": "temporal_change_detection"
}
```

### Step 2: Area of Interest identification

Identify the geographical boundary corresponding to the requested region
and convert it into an appropriate spatial representation.

### Step 3: Dataset discovery

Find suitable Sentinel-2 imagery for the selected region and time
period. MODIS may provide broader-scale temporal context where
appropriate.

### Step 4: Preprocessing

Prepare the imagery through operations such as:

- Cloud and shadow masking for optical imagery
- Radar preprocessing for Sentinel-1
- Image filtering
- Spatial alignment
- Resolution harmonization where scientifically appropriate
- Band selection and quality checks

### Step 5: Feature extraction

Calculate relevant spectral indicators, such as the Normalized
Difference Built-up Index (NDBI):

\[ NDBI = \]

NDBI can help identify built-up characteristics, but it should not be
treated as definitive proof of urban expansion. Bare soil and other
land-cover types can produce similar spectral responses.

A reliable workflow should combine multiple indicators, classification
techniques, and validation data.

### Step 6: Temporal comparison

Compare the processed imagery and derived features across the selected
years to identify geographical changes.

### Step 7: Result generation

Generate:

- Spatial change maps
- Estimated area of change
- Statistical summaries
- Analytical methodology
- Data provenance
- Potential limitations and uncertainty

### Step 8: Visualization

Present the resulting analysis through an interactive geographical
interface.

------------------------------------------------------------------------

## 🌍 Example Use Cases

| Domain                   | Example application                                      | Potential datasets                              |
|:-------------------------|:---------------------------------------------------------|:------------------------------------------------|
| Urban planning           | Monitor urban expansion and infrastructure growth        | Sentinel-2                                      |
| Environmental monitoring | Identify vegetation loss and deforestation               | Sentinel-2, MODIS                               |
| Disaster management      | Map flood extent                                         | Sentinel-1                                      |
| Agriculture              | Monitor vegetation conditions                            | Sentinel-2, MODIS                               |
| Public infrastructure    | Identify suitable locations for hospitals and schools    | Vector, demographic, and other spatial datasets |
| Climate research         | Study environmental transformations and long-term trends | MODIS, Sentinel                                 |
| Smart cities             | Support data-driven urban planning                       | Sentinel-1, Sentinel-2, and contextual datasets |

------------------------------------------------------------------------

## 📦 Current Implementation

The repository currently contains the foundational application and
interface.

### Implemented application components

- React and Vite frontend.
- Node.js and Express backend.
- User authentication using JWT.
- Project creation and management.
- Analysis request handling and history.
- Cesium-based 3D globe integration.
- Analysis interface and result presentation.
- AI analyst interface foundation.
- Temporal comparison interface foundation.

### Important implementation notes

The current repository should be understood as an early-stage prototype
rather than a fully autonomous geospatial analysis engine.

Some analysis outputs and interactions are currently demonstrative or
simulated. In particular, the existing AI analyst uses predefined
keyword-based responses, and the analysis result flow does not yet
represent a complete pipeline of satellite retrieval, raster processing,
and validated change detection.

The following capabilities remain development goals:

- MODIS Terra and Aqua data discovery and retrieval.
- Sentinel-1 and Sentinel-2 data discovery and retrieval.
- Live satellite imagery ingestion.
- Raster and vector processing.
- Cloud masking and satellite image preprocessing.
- Real temporal change detection.
- Verified spatial suitability analysis.
- LLM-driven workflow orchestration.
- Evidence-backed analytical reporting.

This distinction is intentional: GeoVision AI is being developed toward
a more capable geospatial intelligence platform, and the roadmap
documents that progression.

------------------------------------------------------------------------

## 📚 Research Foundation

GeoVision AI draws inspiration from research at the intersection of
GIScience, remote sensing, artificial intelligence, and autonomous agent
systems.

The following papers provide a starting point for understanding the
research landscape.

| Research paper                                                                                                                                                 | Relevance                                             |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------|
| [GeoGPT: An Assistant for Understanding and Processing Geospatial Tasks](https://doi.org/10.1016/j.jag.2024.103976)                                            | Natural-language interaction with geospatial tasks.   |
| [GIS Copilot: Towards an Autonomous GIS Agent for Spatial Analysis](https://doi.org/10.1080/17538947.2025.2497489)                                             | LLM integration with GIS tools and spatial workflows. |
| [Bridging Natural Language and GIS: A Multi-Agent Framework for LLM-Driven Autonomous Geospatial Analysis](https://doi.org/10.1080/17538947.2026.2633849)      | Multi-agent orchestration for geospatial analysis.    |
| [GeoAnalystBench: A GeoAI Benchmark for Assessing Large Language Models for Spatial Analysis Workflow and Code Generation](https://doi.org/10.1111/tgis.70135) | Evaluation of LLM-generated geospatial workflows.     |
| [Foundation Models for Remote Sensing and Earth Observation: A Survey](https://doi.org/10.1109/MGRS.2025.3576766)                                              | Foundation models for Earth Observation.              |
| [Advances and Challenges in Deep Learning-Based Change Detection for Remote Sensing Images](https://doi.org/10.3390/rs16050804)                                | Remote-sensing change-detection methodologies.        |
| [From Large Language Models to Agentic Systems: A Systematic Review of Generative AI in GIScience](https://doi.org/10.1111/tgis.70400)                         | Emerging agentic approaches in GIScience.             |

### Potential research direction

A central research direction for GeoVision AI is:

**Explainable, Multi-Agent Geospatial Intelligence for Autonomous Earth
Observation and Spatial Decision Support.**

Potential areas of contribution include:

1.  Translating natural-language requests into structured spatial
    workflows.
2.  Discovering relevant geographical datasets automatically.
3.  Selecting analytical methods based on the user’s objective.
4.  Validating generated workflows before execution.
5.  Explaining analytical results with traceable data provenance.
6.  Improving reliability through specialized agents and deterministic
    geospatial tools.
7.  Evaluating how sensor choice and data resolution affect analytical
    results.

The goal is not simply to connect an LLM to a map. It is to investigate
how language models can coordinate real geospatial tools to solve
geographical problems in a reproducible and explainable way.

------------------------------------------------------------------------

## 🗺️ Future Roadmap

GeoVision AI is envisioned as an evolving platform.

### Phase 1 — Application foundation

- [x] React-based frontend.
- [x] Node.js and Express backend.
- [x] Authentication system.
- [x] Project management.
- [x] Cesium globe integration.
- [x] Analysis interface foundation.
- [ ] Production-grade API validation and authorization.
- [ ] Improved database and deployment configuration.

### Phase 2 — Satellite data and geospatial processing

- [ ] Introduce a Python/FastAPI processing service.
- [ ] Integrate GeoPandas and Rasterio.
- [ ] Add STAC-based satellite data discovery.
- [ ] Integrate MODIS Terra products.
- [ ] Integrate MODIS Aqua products.
- [ ] Retrieve Sentinel-1 GRD imagery.
- [ ] Retrieve Sentinel-2 Level-2A imagery.
- [ ] Implement raster preprocessing.
- [ ] Implement NDVI and NDBI calculations.
- [ ] Add basic vector and raster operations.

### Phase 3 — AI workflow orchestration

- [ ] Integrate an LLM-powered analysis planner.
- [ ] Implement structured geographical query interpretation.
- [ ] Develop tool selection and workflow execution.
- [ ] Add workflow validation.
- [ ] Introduce specialized geospatial agents.
- [ ] Implement error handling and workflow recovery.

### Phase 4 — Advanced geospatial intelligence

- [ ] Implement land-use and land-cover classification.
- [ ] Develop temporal change detection.
- [ ] Add Sentinel-1-based flood extent mapping.
- [ ] Implement vegetation monitoring with MODIS and Sentinel-2.
- [ ] Implement spatial suitability analysis.
- [ ] Introduce uncertainty estimation and result validation.
- [ ] Add explainable analytical reports.

### Phase 5 — Production and research

- [ ] Optimize large geospatial processing workloads.
- [ ] Introduce asynchronous analysis jobs.
- [ ] Add reproducible workflow execution.
- [ ] Improve map visualization and raster overlays.
- [ ] Benchmark workflow accuracy and execution reliability.
- [ ] Evaluate the system against existing GeoAI approaches.

------------------------------------------------------------------------

## 📁 Project Structure

The repository is organized into separate frontend and backend
applications.

``` text
GeoVision-AI/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── ...
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
├── README.md
└── vercel.json
```

*This is a high-level representation of the repository. Individual files
and directories may vary as development progresses.*

------------------------------------------------------------------------

## 🚀 Getting Started

Follow these instructions to run the existing application locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (use a version compatible with the project dependencies).
- npm.
- Git.
- A code editor such as Visual Studio Code.

### 1. Clone the repository

``` bash
git clone https://github.com/ftrudra7/GeoVision-AI.git
cd GeoVision-AI
```

### 2. Set up the backend

``` bash
cd backend
npm install
```

Configure the backend environment variables as described below.

Start the backend:

``` bash
npm run dev
```

If the project does not define a development script, use the start
command available in its `package.json`.

### 3. Set up the frontend

Open a new terminal:

``` bash
cd frontend
npm install
```

Configure the frontend environment variables.

Start the development server:

``` bash
npm run dev
```

### 4. Access the application

Open the local development URL printed by Vite in your terminal.

The backend will run on the port configured in its environment or server
configuration.

------------------------------------------------------------------------

## 🔐 Environment Configuration

Create the necessary `.env` files locally. Never commit API keys,
database credentials, or authentication secrets.

### Backend

Example configuration:

``` env
PORT=5000
JWT_SECRET=replace_with_a_secure_random_secret
NODE_ENV=development
```

Add any additional variables required by the actual backend
configuration.

### Frontend

Example configuration:

``` env
VITE_API_URL=http://localhost:5000
```

Make sure the variable name matches the Axios base URL configuration
used by the application.

**Important:** Vite exposes variables prefixed with `VITE_` to
browser-side code. Never store private API keys or backend secrets in
frontend environment variables.

------------------------------------------------------------------------

## 🔒 Security Considerations

Security is important for a platform that handles user accounts,
projects, and analytical data.

The production version should include:

- Strong, unique JWT secrets stored in environment variables.
- Password hashing using bcrypt.
- Authentication and authorization checks on protected endpoints.
- User ownership validation for project and analysis resources.
- Strict CORS origin configuration.
- Input validation and request sanitization.
- Secure database and file storage configuration.
- Appropriate rate limiting for API endpoints.
- Secure handling of satellite data and uploaded geospatial files.

------------------------------------------------------------------------

## 🤝 Contributing

Contributions, suggestions, and discussions are welcome.

If you are interested in GIS, remote sensing, GeoAI, LLMs, or full-stack
development, there are several ways to contribute.

### Contribution guidelines

1.  Fork the repository.
2.  Create a new feature branch.
3.  Make your changes.
4.  Test your implementation.
5.  Commit your changes with meaningful messages.
6.  Open a pull request describing the changes.

Example:

``` bash
git checkout -b feature/geospatial-analysis
git add .
git commit -m "feat: add geospatial analysis module"
git push origin feature/geospatial-analysis
```

Please keep pull requests focused and include relevant documentation
where appropriate.

------------------------------------------------------------------------

## 🎯 Project Vision

Geographical problems are rarely solved by looking at a map alone.

They require understanding geographical context, finding the right
datasets, applying suitable analytical methods, and interpreting the
results.

GeoVision AI aims to bring these capabilities together into a single
intelligent platform.

By combining the reasoning capabilities of modern AI systems with the
precision of geospatial computation, the project explores a future where
users can interact with geographical data as naturally as they interact
with an AI assistant.

**From geographical questions to evidence-backed spatial intelligence.**

------------------------------------------------------------------------

## 👨‍💻 Author

**Rudra Jha**

Computer Science Engineering \| AI & Geospatial Intelligence

- GitHub: [@ftrudra7](https://github.com/ftrudra7)
- Project repository: [GeoVision
  AI](https://github.com/ftrudra7/GeoVision-AI)

------------------------------------------------------------------------

## 📄 License

A license has not yet been specified for this repository.

Before distributing or accepting external contributions, add an
appropriate open-source license and include its terms here.

------------------------------------------------------------------------

<p align="center">

<b>GeoVision AI 🌍</b><br/> <i>Making geospatial intelligence more
accessible, explainable, and actionable.</i>

</p>