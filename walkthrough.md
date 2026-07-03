# Walkthrough - Translations, Popups, Batch Planner & Dedicated Pro Route

This walkthrough details the translations, popups, batch allocation calculations, and the final separation of the **Batch Planner & Prices** feature into its own dedicated sidebar navigation page.

---

## 1. Route Separation & Sidebar Navigation

To isolate the Pro-tier Batch Planner and keep the main workspace clean, we separated the tabs into individual routes:

### Navigation Sidebar
- Modified [AppSidebar.tsx](file:///Users/ladyakalascha/TerraBrew/src/components/AppSidebar.tsx) to add **"Batch Planner & Prices"** under the workspace navigation items, linking to `/dashboard/batch-planner`.
- Handled role validation to ensure it updates correctly depending on the logged-in profile.

### Dedicated Route: Batch Planner & Prices
- Created a new route file [dashboard.batch-planner.tsx](file:///Users/ladyakalascha/TerraBrew/src/routes/dashboard.batch-planner.tsx).
- Ported the entire interactive batch planner workspace (quantity sliders, numeric percentage split inputs, dynamic allocation visualizers, live commodities pricing indexes, metrics grid, and Recharts charts) into this file.
- Cleaned up page headers to reflect its standalone status.

### Aligned Dashboard Home
- Refactored [dashboard.index.tsx](file:///Users/ladyakalascha/TerraBrew/src/routes/dashboard.index.tsx) to remove tabs and planner state variables/logic.
- The home dashboard is now a dedicated **Smart Post-Harvest Predictor** (Best Coffee Process) page rendering weather sync inputs, prediction logs, and sensory/parameter charts.

---

## 2. Interactive Batch Planner & Revenue Predictor (Pro)

The standalone **Batch Planner** is fully responsive and integrates the following computational and visual features:

### Live Pricing Scraper
- Automatically scrapes global Arabica futures index prices from `TradingEconomics` server-side, parsing and converting US cents/pound to USD/kg and IDR/kg.

### Dynamic Analytics & Visuals
- **Yield Calculation**: Converted cherry harvest to green coffee beans at an 18% ratio.
- **Projected Revenue**: Applies specialty multipliers per process (Washed: 1.0, Semi-Washed: 1.05, Honey: 1.20, Wine: 1.50, Natural: 1.15).
- **Water Footprint**: Compares water consumption against a 100% Washed baseline to compute water savings.
- **Process Allocation Charts**: Displays a Recharts **Pie Chart** (splits) and a **Bar Chart** (water liters vs projected revenue per method).

---

## 3. Verification Results

### Build Verification
- Verified compilation successfully across the refactored layout:
  ```bash
  npm run build
  ```
- Build completed successfully, generating the standalone chunks:
  - `dist/client/assets/dashboard.batch-planner-f6TASRcm.js` (32.62 kB)
  - `dist/client/assets/dashboard.index-BHm_WzBM.js` (74.36 kB)
