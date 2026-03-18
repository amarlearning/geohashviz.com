# AGENTS.md — GeohashViz.com

## Project Overview

GeohashViz.com is a React + TypeScript single-page application that visualizes geohashes on an interactive Leaflet map. Users paste geohash strings, see their bounding boxes rendered as purple rectangles, and optionally analyze distances between geohashes using multiple calculation modes.

**Live site:** https://geohashviz.com
**Hosting:** GitHub Pages
**Node.js requirement:** 20.x

---

## Quick Start

```bash
npm install        # Install dependencies
npm start          # Dev server at http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

---

## Build & Tooling

| Tool | Version | Purpose |
|------|---------|---------|
| Vite | 6.x | Build tool and dev server |
| TypeScript | 5.5.x | Type checking (`noEmit`, strict mode) |
| Vitest | 4.x | Test runner (jsdom environment, globals enabled) |
| React Testing Library | 13.x | Component testing utilities |
| Prettier | 3.x | Code formatting |
| Husky | 9.x | Git hooks |
| lint-staged | 16.x | Format only staged files on commit |

**Build output:** `dist/` (sourcemaps disabled in production)
**Dev server port:** 5173

---

## Scripts Reference

```bash
npm start              # Start dev server (alias for `vite`)
npm run build          # Production build (no sourcemaps)
npm run preview        # Serve production build
npm test               # Run tests in watch mode
npm run test:ci        # Run tests once (no watch) — use in CI
npm run format         # Format all src/**/*.{ts,tsx,css} with Prettier
npm run format:check   # Check formatting without writing
npm run type-check     # TypeScript type check only (tsc --noEmit)
npm run validate       # Full CI simulation: format:check + type-check + test:ci + build
npm run deploy         # Deploy dist/ to GitHub Pages via gh-pages
```

**Run `npm run validate` before opening a PR** to catch all issues locally.

---

## Running Tests

```bash
npm run test:ci        # Preferred for CI and one-off checks
npm test               # Watch mode for development
```

**Test framework:** Vitest with a Jest compatibility shim (`setupTests.ts` assigns `vi` to `globalThis.jest`), so tests can use either `vi.fn()` or `jest.fn()`.

**Test setup file:** `src/setupTests.ts` — imports `@testing-library/jest-dom` DOM matchers and the jest/vi shim.

**Test environment:** jsdom (configured in `vite.config.ts` under `test.environment`).

**Test file locations:** Co-located with the component they test (e.g., `GeohashRectangles.test.tsx` lives next to `GeohashRectangles.tsx`).

**Common test patterns:**
- Use `render` + `screen` from React Testing Library
- Clear `localStorage` in `beforeEach` when testing components that persist state
- Use `jest.fn()` (via compatibility shim) for mock callbacks
- Query by semantic roles (`getByRole`, `queryByText`) for accessibility coverage

---

## Code Style & Formatting

**Prettier config** (`.prettierrc`):
- `"semi": true` — semicolons required
- `"singleQuote": false` — double quotes
- `"trailingComma": "es5"` — trailing commas in arrays/objects
- `"tabWidth": 2`
- `"printWidth": 80`

**TypeScript:** Strict mode enabled. No `any` unless unavoidable. All types should be explicit at module boundaries.

**File naming:** PascalCase for React components and their files (`GeohashMap.tsx`), camelCase for utilities (`distanceCalculator.ts`).

**CSS:** Co-located CSS files per component (e.g., `GeohashMap.tsx` paired with `GeohashMap.css` if needed).

---

## Git Hooks

Husky runs automated checks on every commit and push:

**Pre-commit** (fast — runs on staged files only):
1. Format staged files with Prettier (lint-staged)
2. TypeScript type check (`tsc --noEmit`)
3. Run all tests (`vitest --run --passWithNoTests`)

**Pre-push** (full CI simulation):
1. Format all source files
2. TypeScript type check
3. Run all tests
4. Production build

To bypass hooks in emergencies: `git commit --no-verify` / `git push --no-verify` — **use sparingly**.

---

## CI/CD Pipeline

**GitHub Actions** (`.github/workflows/node.js.yml`):
- Triggers on push and PRs to `master`
- Matrix: Node.js 18.x and 20.x
- Steps: `npm ci` → build → `npm run test:ci`
- Deploys to GitHub Pages on merge to `master`

**Branch:** `master` is the main/production branch.

---

## Repository Structure

```
/
├── index.html                    # HTML entry point (mounts to #root)
├── vite.config.ts                # Vite + Vitest configuration
├── tsconfig.json                 # TypeScript config (strict, no emit)
├── .prettierrc                   # Prettier formatting rules
├── .husky/                       # Git hook scripts
│   ├── pre-commit
│   └── pre-push
├── .github/workflows/            # GitHub Actions CI
└── src/
    ├── index.tsx                 # React 18 app entry (StrictMode)
    ├── App.tsx                   # Root component + React Router routes
    ├── setupTests.ts             # Vitest setup (jest-dom + jest/vi shim)
    │
    ├── Algorithms/geohash/       # Core geohash algorithm (pure TypeScript)
    │   ├── GeohashEncoder.ts     # Validation + base32 encoding
    │   ├── GeohashBoundingBox.ts # Bounding box calculation (memoized)
    │   ├── GeohashTypes.ts       # Shared TypeScript types
    │   ├── GeohashError.ts       # Custom error class
    │   └── index.ts              # Public API barrel
    │
    ├── GeohashInput/             # Input form component
    ├── GeohashMap/               # Leaflet map container
    │   ├── GeohashMap.tsx        # Main map component
    │   ├── components/           # Map sub-components
    │   │   ├── BoundsFitter.tsx  # Auto-zoom to fit all geohashes
    │   │   └── GeohashRectangles.tsx  # Renders bounding box rectangles
    │   ├── config/
    │   │   ├── mapConfig.ts      # Zoom levels, center, bounds constants
    │   │   └── styleConfig.ts    # Color constants (purple, green)
    │   └── model/Geohash.tsx     # Geohash interface definition
    │
    ├── components/
    │   ├── AdvancedOptions/      # Collapsible advanced panel
    │   │   └── DistanceAnalysis/ # Distance feature (toggle, config, lines)
    │   │       ├── DistanceAnalysis.tsx   # Toggle + validation
    │   │       ├── DistanceConfig.tsx     # Mode/unit selectors
    │   │       ├── DistanceLines.tsx      # SVG arc overlays on map
    │   │       ├── ErrorBoundary.tsx      # Error fallback
    │   │       └── utils/
    │   │           ├── distanceCalculator.ts  # Haversine + 4 modes
    │   │           ├── distanceTypes.ts       # DistanceResult, modes, config
    │   │           └── validation.ts          # Config validation
    │   ├── CustomZoomControls.tsx
    │   ├── QuickActions.tsx
    │   └── StatusBar.tsx
    │
    └── pages/
        ├── Home.tsx              # Main page with all state management
        ├── About.tsx
        └── blog/                 # Static blog article components
```

---

## Key Architecture Patterns

### Geohash Algorithm

Implemented from scratch in `src/Algorithms/geohash/`. Uses standard base32 encoding with bit-interleaving:
- **Base32 charset:** `"0123456789bcdefghjkmnpqrstuvwxyz"` (excludes i, l, o, u)
- **Max length:** 12 characters
- `getBoundingBox()` alternates bits between longitude (even) and latitude (odd) refinements
- Bounding boxes are **memoized** to avoid recalculation

### Geohash Model

```typescript
interface Geohash {
  boundingBox: [[number, number], [number, number]];  // [[lat, lon], [lat, lon]]
  geohash: string;
}
```

### URL State

Geohashes are persisted in the URL as a query parameter:
`?view=gct,gcp,u4pruy`
The `Home.tsx` page reads this on mount and writes it on change.

### localStorage Persistence

Two keys are persisted:
- `geohashviz_distance_config` — distance analysis settings
- `geohashviz_advanced_options_expanded` — panel open/closed state

### Distance Analysis

Four calculation modes in `distanceCalculator.ts`, all using the **Haversine formula** (Earth radius: 6371 km):
- **reference** — distances from a selected geohash to all others
- **consecutive** — distances between sequential pairs (i → i+1)
- **nearest_neighbor** — closest geohash for each point
- **all_pairs** — all combinations, capped at 20 geohashes

Distance results are cached in a `Map<string, number>` with sorted cache keys (e.g., `"gct|gcp"`).

### Map Configuration

- **Tile provider:** OpenStreetMap
- **Default center:** `[21.54913, 79.002363]` (India)
- **Default zoom:** 4
- **Geohash color:** Purple (`#9C27B0`)
- **Reference geohash color:** Green (`#10b981`)

### State Management

All state lives in `Home.tsx` (no external state library):
- `geohashes` — valid `Geohash[]` objects for map rendering
- `allGeohashes` — all inputs including invalid (for StatusBar counts)
- `distanceConfig` — `DistanceConfig` object (mode, reference, units, enabled)
- `highlightState` — currently highlighted geohash or distance line pair
- `advancedOptionsExpanded` — panel visibility

### Keyboard Shortcuts

- `Shift+F` — zoom map to fit all geohashes
- `ESC` — clear distance line highlights

---

## Routing

React Router v7 SPA with these routes (defined in `App.tsx`):

| Path | Component |
|------|-----------|
| `/` | Home |
| `/about` | About |
| `/blogs` | BlogList |
| `/blogs/geohash-101` | Geohash101 |
| `/blogs/real-world-geohash-use-cases` | RealWorldUseCases |
| `/blogs/geohash-precision-guide` | GeohashPrecision |
| `/blogs/distance-analysis-feature` | DistanceAnalysisFeature |
| `/blogs/optimizing-geo-queries` | OptimizingGeoQueries |
| `/blogs/building-geohashviz` | BuildingGeohashViz |

---

## Common Tasks for Agents

### Adding a new geohash visualization feature
1. Add types to `src/Algorithms/geohash/GeohashTypes.ts` if needed
2. Implement pure logic in `src/Algorithms/geohash/` or `src/components/AdvancedOptions/DistanceAnalysis/utils/`
3. Wire state in `Home.tsx` and pass props down to map components
4. Co-locate CSS with the component file
5. Write tests alongside the component using `vitest` + React Testing Library

### Adding a new distance analysis mode
1. Add the mode string to `distanceTypes.ts`
2. Implement the calculation function in `distanceCalculator.ts`
3. Route to it in the main `calculateDistances()` switch
4. Update `DistanceConfig.tsx` to expose the new option in the UI
5. Add unit tests in `distanceCalculator.test.ts`

### Adding a blog post
1. Create `src/pages/blog/YourPostName.tsx` as a static React component
2. Import and add a route in `App.tsx`
3. Add an entry to `BlogList.tsx`

### Changing map tile provider
Edit `src/GeohashMap/config/mapConfig.ts` and update the tile URL/attribution in `GeohashMap.tsx`.

---

## Dependencies to Know

- **leaflet / react-leaflet** — map rendering; Leaflet CSS must be imported before the map mounts
- **react-router-dom v7** — client-side routing
- **react-bootstrap + bootstrap** — UI components and grid
- **@mui/material** — some UI elements (e.g., toggles, sliders)
- **web-vitals** — performance monitoring (loaded in `index.tsx`)
