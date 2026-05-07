
# Ferdi Iskandar Site

A production-focused Next.js 15 and React 19 website with an AI chat endpoint and a component-level test suite.

## Architecture Overview

- `app/`: Next.js App Router pages, metadata routes, and API routes.
- `components/`: UI composition and page sections.
- `lib/`: Content modules, metadata, and shared utilities.
- `tests/`: Vitest + Testing Library tests for pages, components, and scripts.
- `scripts/`: Runtime guard scripts for Next.js command safety.

## Prerequisites

- Node.js 22 LTS or newer
- npm 10+

## Installation

```bash
npm install
```

## Configuration

1. Copy `.env.example` to `.env.local`.
2. Set `NVIDIA_API_KEY` for the chat API route.

## Usage

```bash
npm run dev
```

## Testing

```bash
npm run lint
npm run typecheck
npm test
```

## Deployment

- Build with `npm run build`.
- Start with `npm run start`.
- Recommended runtime: Node.js 22 LTS.

## Contributing

See `CONTRIBUTING.md` and `COMMIT_CONVENTION.md`.

## License

MIT (`LICENSE`).

## Maintainer

- Repository Maintainer: Project owner
- Security contact: `SECURITY.md`
