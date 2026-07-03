# TerraBrew

![TerraBrew](https://img.shields.io/badge/TerraBrew-React%20%2B%20Vite-blue)

TerraBrew is a modern dashboard application for coffee batch planning, pricing insights, and post-harvest prediction workflows. It is built with Vite, React, TypeScript, TanStack Router, Tailwind CSS, and data-driven UI components.

## 🚀 Overview

This project provides:

- A route-based dashboard with dedicated workspace pages
- Batch planning and pricing calculations for coffee processes
- Charts and visual data driven by Recharts and Tailwind UI
- Role-aware sidebar navigation and page access
- Support for local development with Vite

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

## 🙌 Contact

If you want to improve or extend the project, update this README with your feature notes and environment setup details.

---

Created for the TerraBrew project with local setup and development instructions.