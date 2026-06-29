# ATE Intelligence Platform

Enterprise-grade Automated Test Equipment (ATE) dashboard built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Lucide Icons, Framer Motion, and React Query.

## Quick Start

```bash
cd ate-dashboard
npm install
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) or [http://localhost:3000/scan-chain](http://localhost:3000/scan-chain)

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Framework & routing |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui | UI components |
| Recharts | Charts & sparklines |
| Lucide React | Icons |
| Framer Motion | Animations |
| React Query | Data fetching layer |

## Pages

| Route | Description |
|---|---|
| `/dashboard` | Executive dashboard with KPIs, wafer heatmap, pattern table, cost chart, optimization engine |
| `/scan-chain` | Scan Chain Analysis dashboard with 4 tabs (Overview, Pattern Analysis, Failure Analysis, Scan Diagnosis) |
| `/mbist` | MBIST Analysis dashboard with 5 tabs (Overview, Memory Health, Failure Analysis, Diagnosis, AI Recommendation) |
| `/lbist` | LBIST Analysis dashboard with 5 tabs (Overview, Coverage Analysis, Failure Analysis, Diagnosis, AI Recommendation) |
| `/recommendation-analysis` | Centralized AI Recommendation Analysis with 5 tabs (Overview, Scan Chain, MBIST, LBIST, Wafer Analysis) |
| `/cost-intelligence` | Cost Intelligence dashboard with 6 tabs (Overview, Scan Chain, MBIST, LBIST, Wafer, AI Cost Optimization) |
| `/alerts` | Enterprise Alerts dashboard with 7 tabs consolidating all module alerts |
| `/dashboard/recommendation-analysis` | Redirects to `/recommendation-analysis` |
| `/settings` | Theme Settings & Account Presets |
| `/` | Redirects to `/dashboard` |

## Project Structure

```
src/
├── app/
│   ├── dashboard/page.tsx      # Main dashboard (integration)
│   ├── scan-chain/page.tsx     # Scan Chain Analysis dashboard
│   ├── mbist/page.tsx          # MBIST Analysis dashboard
│   ├── lbist/page.tsx          # LBIST Analysis dashboard
│   ├── recommendation-analysis/page.tsx  # Recommendation Analysis dashboard
│   ├── dashboard/recommendation-analysis/page.tsx  # Legacy redirect
│   ├── settings/page.tsx       # Theme + Account settings
│   ├── layout.tsx              # Root layout (Inter font, providers)
│   ├── page.tsx                # Redirect
│   └── globals.css             # Enterprise theme tokens + glass styles
├── components/
│   ├── layout/                 # Sidebar, TopNavbar, DashboardLayout
│   ├── cards/                  # Executive KPI cards
│   ├── charts/                 # Wafer heatmap, cost trend chart
│   ├── tables/                 # Pattern analysis table
│   ├── scan-chain/             # Scan Chain Analysis components
│   ├── mbist/                  # MBIST Analysis components
│   ├── lbist/                  # LBIST Analysis components
│   ├── recommendation/         # Recommendation Analysis components
│   │   └── tabs/               # Overview, Scan Chain, MBIST, LBIST, Wafer tabs
│   ├── optimization/           # Optimization engine controls
│   ├── results/                # Optimization results panel
│   ├── providers/              # React Query provider
│   └── ui/                     # shadcn/ui components
├── contexts/
│   └── ThemeContext.tsx        # Theme persistence (localStorage)
├── lib/
│   ├── dummyData.ts            # Executive dashboard mock data
│   ├── scanChainData.ts        # Scan Chain Analysis mock data
│   ├── mbistData.ts            # MBIST Analysis mock data
│   ├── lbistData.ts            # LBIST Analysis mock data
│   └── recommendationData.ts   # Recommendation Analysis mock data
├── types/
│   ├── dashboard.ts            # Dashboard data types
│   ├── scanChain.ts            # Scan Chain Analysis types
│   ├── mbist.ts                # MBIST Analysis types
│   ├── lbist.ts                # LBIST Analysis types
│   └── recommendation.ts       # Recommendation Analysis types
│   └── theme.ts                # Theme & account preset types
└── styles/
    └── globals.css             # Layout grid, responsive breakpoints
```

## Prompt → Code Mapping

This project was built incrementally using Cursor AI prompts. Each prompt generated specific files and components.

| Step | Prompt | Files / Components Created |
|---|---|---|
| **STEP 1** | Project Setup | `package.json`, shadcn init, `src/components/ui/*`, `src/lib/utils.ts` |
| **STEP 2** | Folder Structure | `src/types/`, `src/lib/`, `src/hooks/`, `src/styles/` scaffolding |
| **STEP 3** | Layout | `DashboardLayout.tsx`, `Sidebar.tsx`, `TopNavbar.tsx`, layout CSS grid |
| **STEP 4** | Sidebar | Full nav menu, Quick Filters card, Alerts badge, `#0A1020` background |
| **STEP 5** | Top Navbar | 72px sticky navbar, search, notifications, user profile, action buttons |
| **STEP 6** | KPI Cards | `ExecutiveCard.tsx`, `ExecutiveKPIGrid`, 6 sparkline cards |
| **STEP 7** | Wafer Heatmap | `WaferHeatmap.tsx` — HTML Canvas 40×40 circular wafer with pan/zoom |
| **STEP 8** | Pattern Table | `PatternTable.tsx` — sortable, searchable, paginated enterprise table |
| **STEP 9** | Cost Trend Chart | `CostTrendChart.tsx` — Recharts dual-axis line chart (7 days) |
| **STEP 10** | Optimization Engine | `OptimizationEngine.tsx` — 3 sliders + AI run button |
| **STEP 11** | Optimization Results | `OptimizationResult.tsx` — projected savings display |
| **STEP 12** | Final Polish | Dashboard integration, Inter font, glassmorphism, responsive design |
| **SETTINGS** | Settings Page | `settings/page.tsx`, `ThemeContext.tsx`, `types/theme.ts` |
| **INTEGRATION** | Dashboard Page | `dashboard/page.tsx` wires all components with dummy data |
| **STEP 13** | Scan Chain Analysis Dashboard | `/scan-chain` page, 4 tabs, KPIs, charts, tables, AI diagnosis |
| **STEP 14** | Record All Prompts | `prompts.csv` and this README prompt archive |
| **STEP 15** | Automatic Prompt Recording | Cursor hooks auto-record prompts to CSV + README |
| **STEP 16** | Recommendation Analysis Sidebar | Sidebar nav item + `/dashboard/recommendation-analysis` page |
| **STEP 17** | MBIST Analysis Dashboard | `/mbist` page, 5 tabs, KPIs, charts, tables, AI diagnosis |
| **STEP 18** | LBIST Analysis Dashboard | `/lbist` page, 5 tabs, KPIs, charts, tables, AI diagnosis |
| **STEP 19** | Recommendation Analysis Dashboard | `/recommendation-analysis` page, 5 tabs, unified AI recommendations |

Full prompt log (CSV): [`prompts.csv`](./prompts.csv)

---

## Full Prompt Archive

All Cursor AI prompts used to build this project are recorded below and in [`prompts.csv`](./prompts.csv).

### STEP 1 — Project Setup

```
Create Next.js app with TypeScript Tailwind ESLint App Router src directory.
Install recharts framer-motion react-icons lucide-react react-query clsx tailwind-merge.
Init shadcn and add button card table dropdown-menu input select slider avatar badge.
```

### STEP 2 — Folder Structure

```
Define src folder structure for dashboard components layout cards charts tables
filters optimization results lib types hooks styles.
```

### STEP 3 — Layout (Cursor Prompt 1)

```
Premium enterprise dashboard layout: 280px sidebar 72px navbar 24px padding/gap CSS Grid
glassmorphism purple accent dark theme responsive.
Background #090B12 Cards #111827 Border #2D3748 Accent #7C3AED Rounded 20px.
```

### STEP 4 — Sidebar (Cursor Prompt 2)

```
280px sidebar #0A1020 background.
Header: ATE Intelligence / Enterprise Platform.
Navigation: Dashboard, Scan Chain Analysis, MBIST Analysis, LBIST Analysis,
Wafer Analysis, Cost Intelligence, Alerts, Settings.
Active menu: purple gradient, rounded-xl, glow. Icons for every menu.
Quick Filters: Date Range, Fab, Tester, Product, Reset Filters. Alerts badge 5.
Sidebar fixed.
```

### STEP 5 — Top Navbar (Cursor Prompt 3)

```
72px sticky navbar. Left: page title Executive Dashboard.
Center: large search bar. Right: Calendar, Notifications, Profile,
Export Report, AI Optimize. User Alex Johnson Admin. Notification badge 12.
Glass backdrop blur.
```

### STEP 6 — Executive KPI Cards (Cursor Prompt 4)

```
Six KPI cards in 6-column grid. Each card: icon, title, large value, weekly trend, sparkline, hover animation.
Metrics: Total Test Cost, Cost per Wafer, Cost per Die, Test Time, Yield, ROI Improvement.
Recharts AreaChart sparklines, Framer Motion entrance. Glass card, gradient border.
```

### STEP 7 — Wafer Heatmap (Cursor Prompt 5)

```
Wafer Cost Heatmap — canvas 40×40 circular wafer grid.
Pan, zoom, reset, fullscreen. Overlay dropdown: fail density, yield, cost.
Color legend: green, yellow, orange, red. Tooltip on hover.
```

### STEP 8 — Pattern Analysis Table (Cursor Prompt 6)

```
Enterprise table columns: Pattern ID, Test Time, Cost, Fail Rate, Detect Power,
ROI Score, Recommendation. Badges: Keep, Review, Remove.
Sticky header, pagination, search, sorting, hover row highlight.
```

### STEP 9 — Cost Trend Chart (Cursor Prompt 7)

```
Recharts line chart: Total Cost and Cost per Wafer over 7 days (Mon–Sun).
Smooth animated lines, dark theme, legend.
```

### STEP 10 — Optimization Engine (Cursor Prompt 8)

```
Three sliders: Maximum Cost, Yield Target, Maximum Test Time with live values.
Run AI Optimization purple button with sparkle icon and animated loading state.
```

### STEP 11 — Optimization Results (Cursor Prompt 9)

```
Result card after optimization: cost reduction, time savings, projected yield,
patterns reduced, total savings. Green positive values.
View Optimized Pattern Set button with hover animation.
```

### STEP 12 — Final Polish (Cursor Prompt 10)

```
Inter font, glassmorphism, gradient borders, hover lift, responsive
(desktop / tablet / mobile). Integrate all components, dummy JSON, production ready,
enterprise SaaS quality comparable to Synopsys, Siemens, NVIDIA, Intel dashboards.
```

### SETTINGS — Settings Page

```
Theme Settings: appearance, accent, sidebar, card, font, compact, animations, reset.
Account Presets: profile, role, department, dashboard, language, timezone, notifications, save.
Persist to localStorage. Live theme preview.
```

### INTEGRATION — Dashboard Page Integration

```
Wire all components into main dashboard page with shared dummy data and responsive grid layout.
Redirect root / to /dashboard.
```

### STEP 13 — Scan Chain Analysis Dashboard

```
Cursor AI Prompt – Scan Chain Analysis Dashboard

Create a premium enterprise "Scan Chain Analysis" dashboard for the ATE Intelligence Enterprise Platform.

Technology Stack: Next.js 15, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, Recharts, Lucide React Icons.

Theme: Dark Enterprise — Background #090B12, Cards #111827, Border #2D3748,
Primary Accent #7C3AED, Rounded Corner 20px, Glass Effect, smooth animations, responsive.

LEFT SIDEBAR: ATE Intelligence / Enterprise Platform. Navigation: Dashboard,
Scan Chain Analysis (Active), MBIST Analysis, LBIST Analysis, Wafer Analysis,
Cost Intelligence, Alerts, Settings. Active menu: purple gradient, rounded-xl, glow border.
Icons for every menu. Sidebar fixed.

TOP NAVIGATION: Page title "Scan Chain Analysis". Center search bar placeholder
"Search scan chains, patterns, chips, flops...". Right: Calendar, Notifications,
Profile, Export Report, AI Diagnose. Sticky navigation.

SECONDARY NAVIGATION: Horizontal tabs below page title — Overview, Pattern Analysis,
Failure Analysis, Scan Diagnosis. Overview active by default. Active tab: purple underline,
bold text, smooth tab animation. Changing tabs switches page content.

OVERVIEW TAB:
- 6 KPI cards: Total Scan Chains, Failing Scan Chains, Failing Flops, Scan Coverage,
  Average Test Time, Pattern Count (icon, title, value, trend, sparkline, hover)
- Scan Chain Health Summary donut (Healthy, Warning, Failing, Unknown, center: Total Chains)
- Top Failing Chips horizontal bar chart (Top 10)
- Scan Chain Heatmap grid (green, yellow, orange, red, legend)
- Recent Failing Scan Chains enterprise table (Chain ID, Pattern ID, Chip, Fail Cycle,
  Fail Type, Suspected Root Cause, Diagnosis Status, Action — search, pagination, sorting)
- Failure Distribution pie (Stuck At, Transition, Bridging, Timing, Unknown)
- AI Diagnosis Summary card + Run AI Diagnosis button

PATTERN ANALYSIS TAB: KPIs, charts (Execution Trend, Cost, Coverage, Density),
tables (Pattern Summary, Pattern Recommendations).

FAILURE ANALYSIS TAB: KPIs, charts (Failure Trend, Type Distribution, Failing Regions,
Failure Density), tables (Failure Records, Root Cause Analysis, AI Recommendation).

SCAN DIAGNOSIS TAB: KPIs, charts (Diagnosis Timeline, Chain Connectivity Graph,
Failure Propagation, AI Confidence), tables (Diagnosis Report, Suspected Scan Cells,
Recommended Debug Points, Repair Priority).

COMMON DESIGN: Glass cards, border, hover lift, shadow, rounded 20px, 24px spacing.
Grid: desktop 2xl, tablet 2 columns, mobile 1 column.
Animations: fade, slide, scale, hover glow, sparkline.
Typography: Inter, bold white headers, gray subtitles, large colored values.
Reusable components, dummy JSON, separate components, clean folder structure,
responsive, production ready, enterprise SaaS quality.
```

### STEP 14 — Record All Prompts

```
Record the all prompt in csv and readme file.
```


### STEP 15 — Automatic Prompt Recording

_Auto-recorded on 2026-06-29_

```
make the automatic record the prompt in csv and readme file
```

### STEP 16 — Recommendation Analysis Sidebar

```
Add Recommendation Analysis to sidebar between Cost Intelligence and Alerts.
Sparkles icon, route /dashboard/recommendation-analysis.
Purple gradient active state, hover scale, accessibility.
Do not redesign sidebar — only insert new menu item.
```

### STEP 17 — MBIST Analysis Dashboard

```
Create premium enterprise MBIST Analysis dashboard for ATE Intelligence Enterprise Platform.
Tabs: Overview, Memory Health, Failure Analysis, Diagnosis, AI Recommendation.
Overview: 6 KPIs, memory health donut, failure by bank bar chart, memory heatmap,
recent failures table, failure type pie, AI diagnosis summary.
Memory Health: utilization, temperature, access, density charts.
Failure Analysis: failure trend, type distribution, by bank, heatmap, records table.
Diagnosis: timeline, correlation, connectivity graph, root cause graph, diagnosis tables.
AI Recommendation: risk cards, recommendations table with priority and yield gain.
Route: /mbist. Header subtitle: Memory Built-In Self-Test Analytics and Diagnosis.
```

### STEP 18 — LBIST Analysis Dashboard

```
Create premium enterprise LBIST Analysis dashboard.
Subtitle: Logic Built-In Self-Test Analytics, Coverage and Diagnosis.
Tabs: Overview, Coverage Analysis, Failure Analysis, Diagnosis, AI Recommendation.
Overview: 6 KPIs, coverage donut, failure by module bar chart, logic coverage heatmap,
recent failures table, failure distribution pie, AI diagnosis summary.
Coverage Analysis: coverage trend, by block, pattern efficiency, fault detection, heatmap.
Failure Analysis: failure trend, type distribution, by block, density, records tables.
Diagnosis: timeline, correlation, connectivity graph, coverage correlation, diagnosis tables.
AI Recommendation: 7 risk cards, recommendations table with priority and expected benefit.
Route: /lbist.
```

### STEP 19 — Recommendation Analysis Dashboard

```
Create premium enterprise Recommendation Analysis dashboard — centralized AI recommendation module
consolidating Scan Chain, MBIST, LBIST, and Wafer Analysis insights.
Route: /recommendation-analysis. Header subtitle: AI-powered unified recommendations across
Scan Chain, MBIST, LBIST and Wafer Analysis. Primary action: Generate AI Recommendations.
Tabs: Overview, Scan Chain, MBIST, LBIST, Wafer Analysis.
Overview: 6 KPIs, source donut, priority bar chart, trend line chart, unified recommendation table,
AI executive summary, recommendation engine panel, animated workflow, bottom AI summary.
Module tabs: domain KPIs, charts, and recommendation tables per analysis module.
Priority badges: Critical (red), High (orange), Medium (yellow), Low (green).
```

<!-- PROMPT_ARCHIVE_END -->

## Automatic Prompt Recording

Cursor hooks automatically record every Agent prompt you submit.

### How it works

| Event | Hook | Action |
|---|---|---|
| You submit a prompt | `beforeSubmitPrompt` | Appends a new row to `prompts.csv` and a section to **Full Prompt Archive** in `README.md` |
| Agent edits a file | `afterFileEdit` | Tracks edited file paths for the current session |
| Agent turn completes | `stop` | Updates the CSV row with **Generated Files** and **Generated Components** |

### Hook files

```
.cursor/
├── hooks.json
└── hooks/
    ├── prompt-recorder.mjs      # Shared CSV + README logic
    ├── record-prompt-start.mjs  # Runs on prompt submit
    ├── record-prompt-stop.mjs   # Runs when agent stops
    └── track-file-edit.mjs      # Tracks edited files
```

### Setup

1. Open this repo in Cursor (`c1-com` or `ate-dashboard` workspace).
2. Trust the workspace when Cursor prompts you — project hooks only run in trusted workspaces.
3. Hooks reload automatically when `hooks.json` changes. Restart Cursor if they do not appear.

Verify in Cursor: **Settings → Hooks** (or the **Hooks** output channel).

### Notes

- Duplicate back-to-back prompts are skipped.
- `prompts.csv` and `README.md` edits from the recorder itself are not counted as generated files.
- Session state is stored in `.cursor/hooks/.session-state.json` (gitignored).
- Manual fallback: `npm run record-prompt -- "Your prompt text here"`

## Design Tokens

| Token | Value |
|---|---|
| Background | `#090B12` |
| Card | `#111827` |
| Sidebar | `#0A1020` |
| Border | `#2D3748` |
| Accent | `#7C3AED` (Purple) |
| Border Radius | `20px` (rounded-xl cards) |
| Sidebar Width | `280px` |
| Navbar Height | `72px` |
| Content Padding | `24px` |
| Content Gap | `24px` |

## Settings

Navigate to **Settings** in the sidebar (`/settings`).

### Theme Settings (persisted to localStorage)

```json
{
  "appearance": "dark",
  "primaryColor": "purple",
  "sidebarStyle": "default",
  "cardStyle": "glass",
  "fontSize": "medium",
  "compactMode": false,
  "animations": true
}
```

### Account Presets (persisted to localStorage)

```json
{
  "name": "Alex Johnson",
  "email": "alex@company.com",
  "role": "Admin",
  "department": "ATE Engineering",
  "defaultDashboard": "Executive Dashboard",
  "language": "English",
  "timezone": "Asia/Kolkata",
  "notifications": {
    "email": true,
    "push": true,
    "desktop": true
  }
}
```

## Dummy Data

All dashboard data lives in `src/lib/dummyData.ts`:

- `executiveKPIs` — 6 KPI metrics with sparkline arrays
- `patternAnalysisData` — 8 test pattern rows
- `costTrendData` — 7-day cost trend
- `defaultOptimizationResults` — optimization output
- `generateWaferHeatData()` — 40×40 wafer grid generator

Scan Chain data in `src/lib/scanChainData.ts`:

- `overviewKPIs`, `patternKPIs`, `failureKPIs`, `diagnosisKPIs` — tab-specific KPI metrics
- `chainHealthData`, `topFailingChips`, `failingChainsData`, `failureDistribution`
- `aiDiagnosisSummary`, `patternSummaryData`, `failureRecords`, `diagnosisReports`
- `generateScanChainHeatmap()` — 16×24 scan chain grid generator

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| Desktop (2xl) | 6-column KPI grid, sidebar visible |
| ≤1536px | 3-column KPI grid |
| ≤1024px (Tablet) | Sidebar hidden, 2-column KPI grid |
| ≤640px (Mobile) | Single column KPI, reduced padding |

## License

Private — internal enterprise use.

---

## Component Details

### ExecutiveCard / ExecutiveKPIGrid
- Renders 6 KPI metrics: **Total Test Cost**, **Cost per Wafer**, **Cost per Die**, **Test Time**, **Yield**, **ROI Improvement**
- Each card has: icon, value, % change badge (green/red), Recharts `AreaChart` sparkline
- Staggered Framer Motion entrance animation (each card delays by `index * 60ms`)

### WaferHeatmap
- HTML `<canvas>` rendering a **40×40 die grid** in a circular wafer shape
- Features: **Pan**, **Zoom** (up to 3×), **Reset**, **Fullscreen** toggle
- Hover **tooltip** showing die coordinates + value %
- 3 overlay modes: **Cost** / **Yield** / **Fail Density**
- Color scale: 🟢 Low → 🟡 Medium → 🟠 High → 🔴 High Cost

### CostTrendChart
- Recharts dual-axis line chart
- Plots 7 days: **Total Cost** (left axis) + **Cost per Wafer** (right axis)

### PatternTable
- 8 test pattern rows: PAT-001 to PAT-008
- Columns: Pattern ID, Test Time (s), Cost ($), Fail Rate (%), Detection Power (%), ROI Score, Recommendation
- Recommendations color-coded: **Keep** (green) / **Review** (yellow) / **Remove** (red)
- Sortable + searchable + paginated

### OptimizationEngine
- 3 sliders: **Maximum Cost** ($1k–$5k), **Yield Target** (85%–99%), **Maximum Test Time** (20–120s)
- "Run AI Optimization" button with spinning Framer Motion animation during run
- 1.8 second simulated async run → outputs `OptimizationResults`

### OptimizationResult
- Displays after optimization run: Cost Reduction %, Time Savings %, Projected Yield %, Patterns Reduced, Total Savings $

### Sidebar
- Brand logo + title at top
- Nav links with pathname + hash tracking:
  - Dashboard (`/dashboard`), Scan Chain Analysis (`/scan-chain`), MBIST Analysis (`/mbist`), LBIST Analysis (`/lbist`), Recommendation Analysis (`/recommendation-analysis`), Wafer/Cost (hash anchors), Alerts (badge: 5), Settings
- **Quick Filters** panel at bottom: Date Range, Fab, Tester, Product (dropdowns) + Reset button

### TopNavbar
- Sticky 72px header with backdrop blur
- Search input (patterns, lots, wafers, equipment)
- Calendar button, Bell button (badge: 12), User avatar (Alex Johnson / Admin)
- Export Report button + **AI Optimize** / **AI Diagnose** button (purple glow, configurable per page)

### Scan Chain Analysis (`/scan-chain`)
- **4 tabs**: Overview, Pattern Analysis, Failure Analysis, Scan Diagnosis
- **Overview**: 6 KPI cards, health donut, failing chips bar chart, grid heatmap, failing chains table, failure pie, AI diagnosis card
- **Pattern Analysis**: pattern KPIs, execution/cost/coverage/density charts, summary + recommendation tables
- **Failure Analysis**: failure KPIs, trend/type/region/density charts, records + root cause + AI recommendation tables
- **Scan Diagnosis**: diagnosis KPIs, timeline, connectivity graph, propagation, confidence charts, diagnosis tables
- Animated tab switching (Framer Motion), reusable `DataTable`, `KPICard`, `ChartCard` components

---

## Data Models (TypeScript Types)

```typescript
// Executive KPI card
interface ExecutiveKPI {
  id: string;
  title: string;
  value: string;
  change: number;        // percentage change
  trend: "up" | "down";
  sparkline: number[];   // 7-point array
}

// Pattern analysis row
interface PatternRow {
  id: string;            // "PAT-001" etc.
  testTime: number;      // seconds
  cost: number;          // dollars
  failRate: number;      // percentage
  detectPower: number;   // percentage
  roiScore: number;      // 0–100
  recommendation: "Keep" | "Review" | "Remove";
}

// Cost trend point
interface CostTrendPoint {
  day: string;           // "Mon"–"Sun"
  totalCost: number;
  costPerWafer: number;
}

// Optimization inputs
interface OptimizationParams {
  maxCost: number;
  yieldTarget: number;
  maxTestTime: number;
}

// Optimization output
interface OptimizationResults {
  costReduction: number;
  timeSavings: number;
  projectedYield: number;
  patternsReduced: number;
  totalSavings: number;
}
```

---

## Current State & Known Gaps

| Feature | Status | Notes |
|---|---|---|
| Dashboard UI | ✅ Complete | All components wired and rendering |
| Scan Chain Analysis | ✅ Complete | 4 tabs, KPIs, charts, tables, AI diagnosis card |
| MBIST Analysis | ✅ Complete | 5 tabs, KPIs, charts, tables, AI diagnosis |
| LBIST Analysis | ✅ Complete | 5 tabs, KPIs, charts, tables, AI diagnosis |
| Recommendation Analysis | ✅ Complete | 5 tabs, unified AI recommendations, module-specific views |
| Cost Intelligence | ✅ Complete | 6 tabs, cost contribution, AI optimization, enterprise summary |
| Alerts | ✅ Complete | 7 tabs, real-time alert center, workflow, executive summary |
| Settings persistence | ✅ Complete | Saved to `localStorage` |
| Wafer Heatmap | ✅ Complete | Pan, zoom, fullscreen, 3 overlays |
| Pattern Table | ✅ Complete | Sort, search, paginate |
| Real backend / API | ⚠️ Not implemented | All data is mocked in `dummyData.ts` |
| AI Optimization | ⚠️ Simulated | Uses `setTimeout` (1.8s) — no real model |
| Sidebar filters | ⚠️ UI only | Dropdowns don't filter charts/tables |
| Search bar | ⚠️ Cosmetic | No search logic implemented |
| Export Report | ⚠️ No-op | Button renders but has no functionality |
| Alert badges | ⚠️ Hardcoded | 12 on bell, 5 on Alerts nav item |
