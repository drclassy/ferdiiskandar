# dr Ferdi Iskandar Founder Website + Abby AI Assistant

![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)
![Version](https://img.shields.io/badge/version-0.2.0-orange?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/next.js-15.5.15-black?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-19.x-149eca?style=flat-square&logo=react&logoColor=white)
![Node](https://img.shields.io/badge/node-%3E%3D22.x-339933?style=flat-square&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-2.x-729b11?style=flat-square&logo=vitest&logoColor=white)

> Editorial public website for dr Ferdi Iskandar, with an integrated AI assistant named Abby — structured as a founder dossier, not a generic landing page.

---

## Table of Contents

- [Overview](#overview)
- [Core Surfaces](#core-surfaces)
- [Architecture](#architecture)
- [Routes](#routes)
- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Knowledge Base](#knowledge-base)
- [AI Boundaries & Safety](#ai-boundaries--safety)
- [Testing & Verification](#testing--verification)
- [Security](#security)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository contains the personal website for **dr Ferdi Iskandar** — a physician, hospital CEO, and founder of Sentra Artificial Intelligence.

The site is intentionally structured as a **founder dossier** rather than a generic personal landing page:

- An editorial homepage with publication-grade hierarchy
- Curated public routes (about, works, notes, speaking, CV, news)
- An integrated AI assistant named **Abby** that helps visitors understand the founder's profile, journey, and collaboration surfaces

Abby is the primary AI experience. A legacy chat endpoint (powered by NVIDIA) remains available as a secondary path.

---

## Core Surfaces

### 1 — Editorial Founder Website

The public website is designed as a structured reading experience rather than a simple brochure.

| Field | Value |
|---|---|
| **Primary audience** | Public visitors, media, partners, healthcare leaders, event organizers |
| **Primary surface** | Editorial homepage + public route set |
| **Design language** | Founder dossier, publication-grade hierarchy, institutional editorial layout |
| **Goal** | Explain dr Ferdi Iskandar clearly and credibly |

### 2 — Abby AI Assistant

Abby is the personal AI assistant for dr Ferdi Iskandar's website.

| Field | Value |
|---|---|
| **Name** | Abby |
| **Role** | Personal AI assistant for dr Ferdi Iskandar |
| **Default language** | Bahasa Indonesia |
| **Knowledge source** | Markdown files in `content/abby/` |
| **Primary API** | `/api/abby` |

Abby is designed to feel warm, professional, concise, and reliable. Responses are normalized to plain text, and the assistant is positioned as a guide to dr Ferdi Iskandar's public profile, work, and collaboration surfaces rather than as a clinical decision engine.

### 3 — Secondary Chat Endpoint (Legacy)

| Field | Value |
|---|---|
| **Route** | `/api/chat` |
| **Provider** | NVIDIA NIM API |
| **Status** | Legacy — secondary |
| **Purpose** | Earlier guide-style interaction path |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 PUBLIC FOUNDER DOSSIER SITE                  │
│         homepage · about · works · notes · speaking          │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
   ┌────────────────┐  ┌──────────────┐  ┌───────────────┐
   │  Static Pages  │  │  Abby Widget │  │  Legacy Chat  │
   │  (App Router)  │  │  (Client UI) │  │  Widget       │
   └───────┬────────┘  └──────┬───────┘  └───────┬───────┘
           │                  │                   │
           ▼                  ▼                   ▼
   ┌──────────────────────────────────────────────────────┐
   │              NEXT.JS SERVER ROUTES                    │
   │  ┌────────────────────────────────────────────────┐   │
   │  │  /api/abby    │  /api/chat       │  /api/robots │  │
   │  │  (main AI)    │  (legacy NVIDIA) │  /sitemap    │   │
   │  └────────────────────────────────────────────────┘   │
   └──────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT & CONFIGURATION                  │
│  ┌──────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │  content/abby │  │ src/config/*.json│  │ src/prompts/  │ │
│  │  /*.md       │  │ abby config      │  │   *.md        │ │
│  │ (knowledge)  │  │ persona & rel.   │  │ system prompt │ │
│  └──────────────┘  └──────────────────┘  └───────────────┘ │
└──────────────────────────┬────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────────┐
              │      AI PROVIDER LAYER     │
              │                            │
              │  DeepSeek  ◀── default     │
              │  OpenAI    ◀── alternate   │
              │  NVIDIA    ◀── legacy only │
              └────────────────────────────┘
```

### Key Component Relationships

| Component | Depends On | Provides To |
|---|---|---|
| `app/layout.tsx` | Fonts, SmoothScrollProvider | Root layout shell |
| `components/AbbyWidget.tsx` | Abby API `/api/abby` | Chat UI overlay |
| `app/api/abby/route.ts` | AI provider SDKs, knowledge loader | JSON conversation API |
| `app/api/chat/route.ts` | NVIDIA NIM SDK | Legacy chat API |
| `lib/abby-knowledge.ts` | `content/abby/*.md` | Structured knowledge base |
| `lib/site-metadata.ts` | `lib/site-content.ts` | Route-aware metadata builder |

---

## Routes

| Route | Type | Purpose |
|---|---|---|
| `/` | Public page | Editorial homepage |
| `/about` | Public page | Full founder profile |
| `/works` | Public page | Selected systems and works |
| `/notes` | Public page | Writing / notes surface |
| `/speaking` | Public page | Speaking profile |
| `/cv` | Public page | CV and credentials surface |
| `/classy-news` | Public page | Classy News editorial |
| `/api/abby` | API | Main Abby assistant endpoint |
| `/api/chat` | API | Legacy chat endpoint (NVIDIA) |
| `/robots.txt` | Generated | Robots metadata |
| `/sitemap.xml` | Generated | Sitemap metadata |

---

## Quick Start

```bash
# 1. Install dependencies (from monorepo root)
pnpm install

# 2. Copy environment template
cd apps/corporate/ferdiiskandar
cp .env.example .env.local

# 3. Edit .env.local — add your AI provider API key:
#    AI_PROVIDER=deepseek
#    DEEPSEEK_API_KEY=your-key-here

# 4. Start development server
pnpm dev

# 5. Open http://localhost:3000
```

---

## Installation

### Option 1 — From the monorepo root

```bash
pnpm install
pnpm --filter @the-abyss/ferdiiskandar dev
```

### Option 2 — From the app directory

```bash
cd apps/corporate/ferdiiskandar
pnpm install
pnpm dev
```

### Option 3 — Build for production

```bash
pnpm build
pnpm start
```

### Runtime Guard

The build process is protected by `scripts/next-runtime-guard.mjs`:

- `pnpm build` is blocked if `next dev` is still active in the same app workspace
- The guard writes a lock file (`.next-runtime-lock.json`) during dev/build
- Remove the lock file or stop the dev server if build is blocked

---

## Prerequisites

| Dependency | Version | Purpose |
|---|---|---|
| Node.js | `>=22.0.0` | Runtime |
| pnpm | `>=9.0.0` (workspace-managed) | Package manager |
| Next.js | `15.5.15` | App framework |
| React | `^19.0.0` | UI runtime |
| TypeScript | `^5.x` (strict mode) | Language |
| Framer Motion | `^12.38.0` | Animation (used sparingly) |

---

## Configuration

Environment variables are defined in `.env.example`. Copy it to `.env.local` and fill in required values.

```env
# AI Provider selection: "deepseek" (default) or "openai"
AI_PROVIDER=deepseek

# DeepSeek (required when AI_PROVIDER=deepseek)
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com
ABBY_MODEL=deepseek-chat

# OpenAI (required when AI_PROVIDER=openai)
# OPENAI_API_KEY=
# ABBY_MODEL=gpt-4o-mini

# Legacy — used only by /api/chat (ChatGuide). Not required for Abby.
NVIDIA_API_KEY=
```

### Provider Behavior

| Mode | Endpoint | Notes |
|---|---|---|
| `AI_PROVIDER=deepseek` | `/api/abby` | Default Abby provider |
| `AI_PROVIDER=openai` | `/api/abby` | Alternate Abby provider |
| `NVIDIA_API_KEY` set | `/api/chat` | Legacy only — secondary chat path |

---

## API Reference

### `POST /api/abby`

The main Abby conversation endpoint.

**Request Body:**

```json
{
  "message": "Siapa dr Ferdi Iskandar?",
  "visitorMode": "public_visitor",
  "history": []
}
```

**Response:**

```json
{
  "reply": "dr Ferdi Iskandar adalah dokter, pemimpin rumah sakit, dan founder yang membangun karya di persimpangan healthcare, leadership, dan artificial intelligence."
}
```

### Operational Behavior

| Feature | Implementation |
|---|---|
| Rate limiting | Per-IP fixed-window (20 req / 60s) |
| Provider switching | Environment variable `AI_PROVIDER` |
| Request validation | Message required, 1–2000 characters |
| Timeout protection | 28s for Abby, 25s for legacy chat |
| Error mapping | Safe, non-leaking upstream error responses |
| Output normalization | Plain text, no Markdown |
| Cache control | `Cache-Control: no-store` on all API responses |

### `POST /api/chat` (Legacy)

Legacy chat endpoint powered by NVIDIA NIM. See [Security Best Practices Report](docs/security/security-best-practices-report.md) for security considerations.

---

## Knowledge Base

Abby reads structured content from `content/abby/` and merges it with `src/prompts/abby.system-prompt.md`.

**Knowledge files:**

| File | Purpose |
|---|---|
| `personal-profile.md` | Founder identity, bio, and ready-made responses |
| `professional-journey.md` | Career timeline and transition narratives |
| `speaking-profile.md` | Topics, bio, and stage introduction scripts |
| `thought-leadership.md` | Core principles and worldview |
| `projects-and-works.md` | Projects catalogue and filtering guidance |
| `media-kit.md` | Press materials and interview questions |
| `contact-and-collaboration.md` | Routing rules for outreach |
| `public-boundaries.md` | What Abby can and cannot say |
| `faq.md` | Common questions and answers |

**Supporting configuration:**

| File | Purpose |
|---|---|
| `src/config/abby.config.json` | Core API and behavior settings |
| `src/config/abby.persona.json` | Personality traits and tone |
| `src/config/abby.relationship.json` | Relationship and context rules |
| `src/config/abby.knowledge-index.json` | Knowledge file indexing |

---

## AI Boundaries & Safety

Abby is **not** a medical diagnosis engine and should never be presented as one.

| Boundary | Status |
|---|---|
| Medical diagnosis | ❌ Not allowed |
| Personal treatment advice | ❌ Not allowed |
| Clinical decision replacement | ❌ Not allowed |
| Website guidance | ✅ Primary purpose |
| Public profile explanation | ✅ Allowed |
| General educational health context | ✅ Allowed (non-diagnostic only) |

The site represents:
- A founder website
- An AI-guided public profile experience
- A knowledge-driven assistant surface

The site does **not** represent:
- An approved medical device
- A clinical triage system
- An EMR workflow engine

For the full threat model and security analysis, see [`docs/security/threat-model.md`](docs/security/threat-model.md).

---

## Testing & Verification

### Primary Commands

```bash
pnpm typecheck      # TypeScript type checking
pnpm lint            # ESLint with --max-warnings=0
pnpm test            # Run Vitest suite once
pnpm test:watch      # Run Vitest in watch mode
pnpm test:coverage   # Run Vitest with coverage report
pnpm build           # Production build
pnpm security:deps   # Dependency security audit (app-scoped)
pnpm knip            # Dead-code / unused export detection
```

### Test Coverage

Current test contracts:

- Sitemap contract
- Site metadata contract
- Site content contract
- Classy News content contract
- Next runtime guard behavior
- Smoke tooling baseline
- Navbar route awareness
- About page rendering

Coverage thresholds: **80%** lines, functions, branches, and statements.

---

## Security

For the full security policy, see [`SECURITY.md`](SECURITY.md). For the detailed threat model, see [`docs/security/threat-model.md`](docs/security/threat-model.md).

### Quick Summary

- No critical or high-severity vulnerabilities at audit time
- Secrets are server-side only (never exposed to browser or Git)
- API endpoints enforce rate limiting, request validation, and timeouts
- Global security headers configured in `next.config.mjs`
- Dependency audit: `pnpm security:deps`

---

## Project Structure

```
apps/corporate/ferdiiskandar/
├── app/                         # Next.js App Router routes
│   ├── about/                   # About page (full route)
│   ├── api/
│   │   ├── abby/route.ts        # Main AI assistant endpoint
│   │   └── chat/route.ts        # Legacy chat endpoint
│   ├── classy-news/
│   ├── cv/
│   ├── globals.css              # Primary editorial stylesheet
│   ├── layout.tsx               # Root layout with fonts/providers
│   ├── page.tsx                 # Homepage entry
│   └── robots.ts / sitemap.ts   # Generated metadata
├── components/                  # React components
│   ├── ui/                      # Shared UI primitives
│   ├── visual/                  # Visual / motion components
│   └── *.tsx                    # Page-level feature components
├── content/abby/                # Abby knowledge base (Markdown)
├── docs/                        # Architecture, specs, reports, governance, and archive docs
├── lib/                         # Utilities, content data, hooks
├── public/                      # Static assets and images
│   ├── icons/                   # Tech provider icons
│   └── images/                  # Team and product photos
├── src/
│   ├── config/                  # Abby JSON configs
│   └── prompts/                 # System prompts
├── tests/                       # Vitest and Playwright tests
└── scripts/                     # Build/runtime guards
```

---

## Roadmap

| Target | Focus | Status |
|---|---|---|
| v0.1.x | Founder dossier stabilization | ✅ Released |
| v0.1.x | `/about` route (layered authority page) | ✅ Released |
| v0.1.x | Abby knowledge refinement | Active |
| v0.2.x | Homepage content repositioning (cross-sector) | Active |
| v0.2.x | `/about` copy repositioning | Active |
| Later | `/systems` route | Planned |
| Later | `/notes` route | Planned |
| Later | `/contact` route | Planned |
| Later | Abby UX and visitor guidance refinement | Planned |

---

## Contributing

See [docs/governance/contributing.md](docs/governance/contributing.md) for development workflow, coding standards, and pull request requirements.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<!-- branding: drafted and raised by Classy — an architectural readme, constructed with engineering precision and editorial clarity -->
