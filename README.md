# TerraBrew

![TerraBrew Logo](https://img.shields.io/badge/TerraBrew-%F0%9F%8C%8D-green?style=for-the-badge)

## Sustainability in Every Bean

TerraBrew is an evidence-based climate-adaptive coffee post-harvest advisor. It helps coffee producers choose the best processing method for current environmental conditions, translating scientific post-harvest knowledge into practical recommendations while explaining quality, water use, and risk trade-offs.

## 🚀 Overview

This project provides:

- A climate-aware recommendation interface for coffee processing
- Science-based guidance for washed, honey, natural, semi-washed, and fermentation choices
- Insights on water efficiency, processing risk, and quality consistency
- A web dashboard built for global coffee contexts
- Support for local development with Vite

## 🧠 Problem Statement

Climate change is making coffee post-harvest processing increasingly unpredictable. Rising temperatures, irregular rainfall, fluctuating humidity, and water scarcity disrupt fermentation, drying, and processing efficiency, forcing producers to rely on inherited practices rather than evidence-based decision making.

Without accessible decision support, processing choices often lead to inconsistent coffee quality, excessive water consumption, processing failures, and reduced economic value. TerraBrew bridges this gap by translating scientific post-harvest knowledge into practical, climate-adaptive recommendations with clear trade-offs.

## 🧩 Built With

- `React 19`
- `Vite`
- `TypeScript`
- `TanStack Router`
- `Tailwind CSS`
- `React Query`
- `Drizzle ORM`
- `PostgreSQL` / `pg`
- `Recharts`
- `Radix UI`

## ⚙️ Getting Started

### Prerequisites

- Node.js (recommended 18+)
- npm

### Install

```bash
git clone https://github.com/Arieslana01/TerraBrew.git
cd 'TerraBrew New'
npm install
```

### Environment

Copy the `.env` template if it exists and update values as needed:

```bash
cp .env.example .env
```

If your repo does not include `.env.example`, create a `.env` file manually with all required entries.

### Run Local Server

```bash
npm run dev
```

Open the local URL shown in the terminal, for example:

```text
http://localhost:5173
```

If port `5173` is busy, Vite will use the next available port.

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint across the project |
| `npm run format` | Format code using Prettier |

## 🗂️ Project Structure

- `src/` — application source code
- `src/routes/` — route definitions for TanStack Router
- `src/components/` — reusable UI components
- `package.json` — project scripts and dependencies
- `vite.config.ts` — Vite configuration
- `tsconfig.json` — TypeScript settings

## 🧪 Notes

- The app uses `@tanstack/router` and a route generation plugin, so route files in `src/routes/` are important for navigation.
- If `npm run dev` reports a syntax or route transform error, inspect files under `src/routes/` for invalid JSX or TypeScript.
- The local web app is served by Vite, so make sure dependencies are installed before running.

## 📌 Troubleshooting

- If the app does not load, try deleting `node_modules` and reinstalling:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- If the development server starts on a different port, use the URL shown in the terminal output.

## � Contributors

- M. Aris Maulana — FullStack Developer
- Nafisah Z. Hasan — Agricultural Specialist
- Andreas B.S. — Business Specialist
- Ladya Kalascha — AI & Data Engineer

## �🙌 Contact

If you want to improve or extend the project, update this README with your feature notes and environment setup details.

---

Created for the TerraBrew project with local setup and development instructions.