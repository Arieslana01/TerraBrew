# TerraBrew System Architecture & Layer Diagram

This document describes the architectural layout, data flow, and layers of the TerraBrew application, including the new **Batch Planner & Scraper** feature. 

---

## 1. Layers & Component Architecture

Below is the layered representation of the system. You can copy the code block below and insert it directly into Draw.io under **Arrange -> Insert -> Advanced -> Mermaid** to instantly generate an editable vector diagram.

```mermaid
graph TD
    %% Styling definitions
    classDef client fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;
    classDef router fill:#fae8ff,stroke:#d946ef,stroke-width:2px,color:#86198f;
    classDef server fill:#fef9c3,stroke:#ca8a04,stroke-width:2px,color:#854d0e;
    classDef external fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef db fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef mock fill:#f3f4f6,stroke:#9ca3af,stroke-width:2px,color:#374151;

    %% Presentation Layer
    subgraph Presentation_Layer [Presentation Layer - Client Browser]
        Landing["Landing Page (index.tsx)<br/>• Header Auth Trigger<br/>• Profile Dropdown"]:::client
        Predictor["Smart Predictor UI (dashboard.index.tsx)<br/>• Weather Inputs / Geocoding<br/>• Preprocessing Fit Rules"]:::client
        Planner["Batch Planner UI (dashboard.index.tsx)<br/>• Keyboard Split Inputs<br/>• Allocation Progress Bars"]:::client
        Learn["Learning Center (dashboard.learn.tsx)<br/>• Popup Dialog Modal<br/>• Hover Contrast Button"]:::client
        Cert["Certifications UI (dashboard.certification.tsx)<br/>• Multi-step Ecoscore Calculator<br/>• Cooperative Tables"]:::client
    end

    %% Routing Layer
    subgraph Routing_Layer [Routing & Navigation Layer]
        Router["@tanstack/react-router<br/>(File-based Client Router)"]:::router
    end

    %% Server Actions Layer
    subgraph Server_Actions_Layer [Server RPC Layer - TanStack Start]
        AuthRPC["Auth RPC Functions<br/>• registerUser()<br/>• loginUser()"]:::server
        PriceRPC["Price RPC Function<br/>• getLiveCoffeePrice()"]:::server
        CertRPC["Certification RPC Functions<br/>• submitCertification()<br/>• validateCertification()"]:::server
        HistoryRPC["History RPC Functions<br/>• savePrediction()<br/>• getPredictionsHistory()"]:::server
    end

    %% External Integrations Layer
    subgraph External_Integration_Layer [External Integrations & APIs]
        MeteoAPI["Open-Meteo Geocoding & Weather API<br/>• Coordinates lookup<br/>• Parameters sync"]:::external
        TradingEconomics["TradingEconomics Scraper<br/>• Live Coffee Futures Index"]:::external
        GeminiAPI["Gemini 2.5 Flash API<br/>• Chatbot Terry (AI Advisor)"]:::external
    end

    %% Data Access & Logic Layer
    subgraph Data_Layer [Data Access & Fallback Layer]
        DBClient["Database Client (postgres driver)<br/>• schema definitions"]:::db
        MockDB["In-Memory Mock Fallback System<br/>• mockProfiles [ ]<br/>• mockCertifications [ ]<br/>• mockPredictions [ ]"]:::mock
    end

    %% Physical Data Stores
    subgraph Physical_Stores [Physical Storage]
        PostgreSQL[("PostgreSQL Database<br/>• Profiles Table<br/>• Predictions Table<br/>• Certifications Table")]:::db
    end

    %% Diagram Connectors
    Landing -->|Client route| Router
    Predictor -->|Client route| Router
    Planner -->|Client route| Router
    Learn -->|Client route| Router
    Cert -->|Client route| Router

    Router -->|Triggers RPC| Server_Actions_Layer

    AuthRPC -->|Checks Connection| DBClient
    PriceRPC -->|Scrapes web page| TradingEconomics
    CertRPC -->|Checks Connection| DBClient
    HistoryRPC -->|Checks Connection| DBClient

    Predictor -->|Fetches sync| MeteoAPI
    Server_Actions_Layer -->|Chat requests| GeminiAPI

    DBClient -->|Connected| PostgreSQL
    DBClient -->|Offline / Fail| MockDB

    AuthRPC -->|Fallback Write/Read| MockDB
    CertRPC -->|Fallback Write/Read| MockDB
    HistoryRPC -->|Fallback Write/Read| MockDB
```

---

## 2. Layer Definitions & System Responsibilities

### 1. Presentation Layer (Frontend React Components)
Responsible for capturing user inputs, triggering visual transitions (such as loader spins and dynamic split allocation progress bars), and rendering interactive charts (Pie Charts, Bar Charts, and Polar Radar Charts).
*   **Weather Predictor View**: Manages local variables for rainfall, humidity, and temperature.
*   **Batch Planner View**: Validates that custom splits equal exactly 100% and contains the "Process Batch Allocation" click trigger.
*   **Auth Menu Dropdown**: Displays initials in the top nav and updates dynamically based on current user authentication states.

### 2. Routing & Navigation Layer
Powered by `@tanstack/react-router`, providing type-safe file-based client-side routing. Navigates between landing page pathways (`/`) and internal validation spaces (`/dashboard/*`).

### 3. Server Actions Layer (TanStack Start RPC)
Handles asynchronous RPC (Remote Procedure Call) methods using `createServerFn`. Executes server-side code hidden from client browsers to protect private keys and bypass security restrictions (like CORS headers).
*   **Scraper**: The `getLiveCoffeePrice()` server action fetches the external HTML from TradingEconomics and parses values directly in the server process.

### 4. External Integrations Layer
Connects to 3rd-party services to enrich TerraBrew's operational capabilities:
*   **Open-Meteo API**: Synced client-side to coordinate temperature and rainfall patterns.
*   **Gemini 2.5 API**: Prompts Terry the Chatbot using AI system instructions for speciality coffee guidelines.
*   **TradingEconomics API**: Leverages HTML source pattern-matching to parse global Arabica indices.

### 5. Data Access & Fallback Layer
Coordinates credentials validation and histories saving. Incorporates a database availability listener:
*   **Active Mode**: Communicates with the PostgreSQL server using raw SQL queries to insert profiles, predictions, and auditor validations.
*   **Mock Fallback Mode**: Activates if Postgres is unreachable. Intercepts database calls and updates local array storages, ensuring the website continues to function smoothly.

---

## 3. Tech Stack Architecture Summary (Tailored)

The system follows a three-tier architecture. The **presentation layer** renders ClimateSense inputs, BrewMatch recommendations, EcoScore dashboards, RiskGuard alerts, and TerraAI (Terry Chatbot) interface. The **application layer** handles routing between the client UI and the server RPC actions using TanStack Start's server functions (`createServerFn`), computing sustainability indices and agronomic risk thresholds. The **prediction and computation layer** accepts environmental inputs (temperature, humidity, rainfall, and water availability) and returns ranked processing method compatibilities across washed, honey, natural, semi-washed, and wine (controlled fermentation) methods. Heuristic fit scores drive RiskGuard risk profile sync alerts. **TerraAI** (Terry Chatbot) is powered by the Gemini 2.5 Flash API, configured via detailed post-harvest coffee domain parameters, enabling context-aware, explainable guidance for farmers and auditors.

---

## 4. Data Sourcing & Deployment Infrastructure (Tailored)

Primary data comes from user-submitted environmental parameters, supplemented by real-time climate telemetry auto-filled via the Open-Meteo Geocoding and Weather API. Future integration with BMKG's open weather API will enable localized Indonesian weather alerts. The unified full-stack application is built on TanStack Start (Vite & Nitro), storing persistent data in a PostgreSQL database, supplemented by an active server-side in-memory mock database fallback. This forms a highly resilient, low-latency infrastructure accessible across Indonesian farming regions.
