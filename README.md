# 4P3X Refractable Base OS™

**Powered by 4P3X Intelligent AI — Created by Kyzel Kreates**

---

## What This Project Is

**4P3X Refractable Base OS™** is a reusable, modular base structure designed to be safely refactored into multiple sector-specific dashboard and PWA products.

It is not a finished product for a single use case. It is a disciplined, reusable architecture that proves a single codebase can become many different things through controlled, deliberate refactoring — without rebuilding from scratch each time.

The name **Refractable** reflects this: just as light refracts into different spectrums from the same source, the same base architecture can refract into different products for different sectors.

---

## What "Refractable" Means

A refractable base means the core architecture — routing, layout, state management, PWA behaviour, lesson/review engine, demo/live mode logic, and reusable UI patterns — is preserved and stable.

Only the **content layer** changes when producing a new variant:
- Labels, names, and terminology
- Demo data and content configuration
- Sector-specific screens and modules
- Branding and colour themes

The result is faster, safer product development with predictable architecture across every variant.

---

## What It Demonstrates

- Reusable product architecture with clean separation of concerns
- AI-assisted development and embedded AI assistant layer
- Modular admin dashboard system
- Installable PWA-ready frontend structure
- Demo mode / live mode planning and switching
- Lesson and review flow engine
- Generic, reusable content and data structures
- Scalable refactoring discipline

---

## What It Can Become

By refactoring the content layer, this base can become:

- Learning and training platforms
- Compliance and workflow monitoring systems
- Support coordination tools
- Progress tracking dashboards
- Onboarding and orientation systems
- Coaching and mentoring platforms
- Health and care monitoring dashboards
- Fleet and operations management systems
- Project and task management portals
- Evidence management tools
- Any dashboard + PWA product that shares this pattern

---

## Core Concept

> One reusable base architecture → many product variants through controlled refactoring.

---

## Demo Mode vs Live Mode

**Demo Mode** is enabled by default. It loads pre-built example data so you can experience the full product flow — learners, lessons, progress, check-ins, and evidence — without requiring a backend or real user accounts.

**Live Mode** is intended for real product deployment. It turns off demo data and connects to a real backend (such as Supabase or Firebase) to support real users, persistent records, and live data.

Switch between modes in the **Settings → Demo Mode** toggle.

> Demo data is clearly marked and kept separate. It never mixes with live records.

---

## Architecture

```
4P3X Refractable Base OS™
├── Public Landing Page         — product explanation, demo/live status, shortcuts
├── Admin Dashboard             — modular admin monitoring dashboard
│   ├── Overview metrics
│   ├── Participant / learner management
│   ├── Activity and progress records
│   ├── Check-ins and evidence
│   ├── Review sessions
│   ├── Tasks and action plans
│   ├── Support risk monitoring
│   ├── Reports
│   ├── AI assistant layer (4 embedded assistants)
│   └── Settings (demo/live toggle, app config)
│
├── Learner PWA                 — installable mobile-first learner app
│   ├── Learner gate (select/session restore)
│   ├── Home screen (progress summary, next lesson)
│   ├── Modules (9 lessons across 3 modules)
│   ├── Lesson Review (content, checklist, reflection, mark reviewed)
│   ├── Daily check-in
│   ├── Evidence and completion
│   └── Progress tracking
│
├── Core Systems
│   ├── core_storage.js         — SSOT: Zustand state + localStorage persistence
│   ├── services_learning_lessonData.js  — lesson SSOT (9 generic lessons)
│   ├── services_careerlink_demoData.js  — demo data seed
│   ├── config_app.js           — app configuration constants
│   └── config_routes.js        — route registry
│
└── Infrastructure
    ├── React + Vite             — frontend build
    ├── React Router (hash)      — client-side routing (/#/route)
    ├── Zustand                  — global state management
    ├── Tailwind CSS + inline    — responsive styling
    ├── PWA (VitePWA + Workbox)  — installable, offline-capable
    ├── Supabase (optional)      — backend-ready connector (not required in demo)
    └── 4P3X AI Layer            — 4 embedded assistants (context-aware)
```

---

## Routing

Hash-based routing (`/#/route`) — works on all static hosts without server config.

| Route | Description |
|---|---|
| `/#/` | Public landing page |
| `/#/learner` | Learner PWA (primary) |
| `/#/dashboard` | Admin dashboard |
| `/#/admin` | Redirect → /dashboard |
| `/#/participants` | Participant management |
| `/#/evidence` | Evidence records |
| `/#/check-ins` | Check-in records |
| `/#/tasks` | Tasks |
| `/#/ai` | AI assistant panel |
| `/#/reports` | Reports |
| `/#/settings` | Settings |

---

## PWA Readiness

This project includes full installable PWA support:

- `manifest.webmanifest` — generated by VitePWA with name, icons, start URL, and shortcuts
- `sw.js` — Workbox-generated service worker with caching strategies
- Precache for all static assets
- Runtime caching for Google Fonts
- Standalone display mode
- `viewport-fit=cover` and `env(safe-area-inset-*)` for notch/home-bar devices
- iOS home screen support (`apple-mobile-web-app-capable`)

Install by opening in Chrome/Safari and selecting "Add to Home Screen" from the browser menu.

---

## AI Layer

The project includes **4P3X Intelligent AI** — four context-aware embedded assistants:

| # | Name | Role |
|---|---|---|
| 1 | 4P3X Intelligent AI 1 | Admin Guide — dashboard navigation and system explanation |
| 2 | 4P3X Intelligent AI 2 | Progress Insight — activity, check-ins, evidence interpretation |
| 3 | 4P3X Intelligent AI 3 | Learner Guide — PWA navigation, tasks, progress |
| 4 | 4P3X Intelligent AI 4 | Support Assistant — neutral, non-clinical support guidance |

The AI layer is configured in `services_ai_careerlinkAiRouter.js` and `services_ai_aiConfig.js`.
Responses are neutral, non-clinical, and aligned with the configured product type.
AI model configuration is managed via `config_app.js` and `productConfig.js`.

---

## How To Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Development server: `http://localhost:3000`

---

## Deployment

This project deploys as a **static site** with no server-side requirements.

**Vercel (recommended):**
1. Connect your GitHub repository to Vercel.
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. No environment variables required for demo mode.

For live mode with Supabase, set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

in your Vercel project environment variables.

**Any static host** (Netlify, GitHub Pages, Cloudflare Pages) also works.
Hash routing (`/#/route`) requires no server rewrite rules.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool |
| React Router DOM (hash) | Client-side routing |
| Zustand | Global state management |
| Tailwind CSS | Utility-first styling |
| Lucide React | Icon library |
| VitePWA + Workbox | Service worker and PWA manifest |
| Supabase JS (optional) | Backend connector (demo mode works without it) |
| Recharts | Data visualisation |
| localStorage | Local-first data persistence in demo mode |

---

## Creator

**Created by Kyzel Kreates**
**Powered by 4P3X Intelligent AI**

4P3X Refractable Base OS™ is a reusable base product template.
All variants and sector deployments are built from this foundation.

---

*4P3X Refractable Base OS™ — Powered by 4P3X Intelligent AI — Created by Kyzel Kreates*
