# Ferdiiskandar Security Threat Model

Date: 2026-05-13
Scope: `@the-abyss/ferdiiskandar` personal website and public AI assistant runtime.

## 1. Executive Summary

This app is a public Next.js website for dr Ferdi Iskandar with public editorial pages and two unauthenticated AI chat endpoints:

- `/api/abby`: primary Abby assistant, using DeepSeek by default and optionally OpenAI.
- `/api/chat`: legacy ChatGuide endpoint using NVIDIA NIM.

The highest-value assets are:

- AI provider API keys.
- Cost and availability of upstream AI providers.
- Integrity of Abby's system prompt and website knowledge base.
- Public professional reputation and medical-safety boundaries.
- Public website source, content, and static assets.

Current posture is suitable for a public personal website if the deployment platform protects environment variables and normalizes proxy headers. The main residual risk is abuse of public AI endpoints, especially rate-limit bypass if `x-forwarded-for` / `x-real-ip` can be spoofed by clients.

## 2. Assumptions

- The site is deployed as a public internet-facing Next.js app.
- TLS is terminated by the hosting platform or reverse proxy.
- Public pages are intentionally unauthenticated.
- `/api/abby` and `/api/chat` are intentionally public POST endpoints unless Chief later disables or restricts them.
- No database, user accounts, sessions, payment flow, PHI records, or patient portal behavior exists in this repo.
- Abby is a public-profile and general educational assistant, not a medical diagnosis engine or clinical decision-support system.
- Runtime secrets are provided through environment variables and are not committed to Git.

## 3. Assets

| Asset | Location | Security Goal |
|---|---|---|
| AI provider keys | Runtime env: `DEEPSEEK_API_KEY`, `OPENAI_API_KEY`, `NVIDIA_API_KEY` | Keep confidential; never expose to browser, logs, or Git |
| Abby system prompt | `src/prompts/abby.system-prompt.md` | Preserve instruction integrity |
| Abby knowledge base | `content/abby/*.md`, loaded by `lib/abby-knowledge.ts` | Preserve factual integrity and avoid prompt contamination |
| Public website content | `app/`, `components/`, `lib/`, `content/`, `public/` | Preserve availability and brand correctness |
| AI endpoint budget | `/api/abby`, `/api/chat` | Limit automated cost abuse |
| Security headers | `next.config.mjs`, API JSON headers | Reduce browser-side attack surface |
| Git repository | Source, config, docs, lockfile | Prevent secrets and local artifacts from being pushed |

## 4. Trust Boundaries

| Boundary | Trusted Side | Untrusted Side | Notes |
|---|---|---|---|
| Browser to Next.js app | Server route handlers | Any internet visitor | Public traffic can call pages and API routes |
| Next.js app to AI providers | Server-side fetch with bearer token | External AI provider APIs | Keys remain server-side |
| Runtime env to source repo | Hosting secret store | Git worktree and GitHub | `.env.local` must stay ignored |
| Reverse proxy to app | Hosting platform headers | Client-supplied headers | Rate limiter trusts `x-forwarded-for` / `x-real-ip` |
| AI model output to UI | Server-normalized reply | Untrusted model output | Reply may contain unsafe or reputationally risky content |
| Content files to prompt | Maintainer-authored markdown | Future edits or PRs | Prompt/knowledge changes affect assistant behavior |

## 5. Entry Points

| Entry Point | Type | Authentication | Main Risks |
|---|---|---|---|
| Public pages under `app/**` | GET pages | None | Defacement via source changes, stale public content |
| `/api/abby` | POST JSON | None | AI cost abuse, prompt injection, model hallucination, medical-safety drift |
| `/api/chat` | POST JSON | None | Legacy endpoint cost abuse, unneeded provider exposure |
| Static assets under `public/` | GET assets | None | Accidental publication of private media |
| Deployment env vars | Runtime config | Platform-controlled | Secret exposure if misconfigured |
| GitHub repository | Source distribution | GitHub auth | Secret or artifact leakage if ignored files are mishandled |

## 6. Existing Controls Observed

| Control | Evidence | Coverage |
|---|---|---|
| Security headers | `next.config.mjs` sets CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` | Browser hardening |
| API no-store headers | API routes return `Cache-Control: no-store` and JSON content type | Reduces caching of AI replies |
| Server-side provider keys | API keys are read only from `process.env` in route handlers | Keys are not browser-side |
| Request size validation | `/api/abby` and `/api/chat` reject missing, empty, and >2000 character messages | Limits prompt and request abuse |
| Request timeout | AI fetch uses `AbortSignal.timeout` | Limits hanging upstream calls |
| Basic rate limiting | `createFixedWindowRateLimiter`, 20 requests / 60s | Reduces casual abuse |
| Prompt/knowledge server load | `lib/abby-knowledge.ts` reads fixed local files | Avoids user-controlled file path reads |
| Dependency security script | `pnpm security:deps` exists | App-scoped dependency audit |
| Git hygiene | `.gitignore` blocks env, build, dependency, cache, AI-local artifacts | Reduces accidental push risk |
| Safe env example | `.env.example` uses empty placeholders | Documents config without secrets |

## 7. Threats and Abuse Cases

| ID | Threat | Likelihood | Impact | Existing Controls | Residual Risk |
|---|---|---:|---:|---|---|
| T1 | API key leakage through Git or public bundle | Low | High | `.env*` ignored except `.env.example`; keys read server-side | Low if `.env.local` is never committed |
| T2 | Public AI endpoint cost abuse | Medium | Medium | 20/min in-memory rate limit, message length cap, timeouts | Medium |
| T3 | Rate-limit bypass by spoofing `x-forwarded-for` | Medium | Medium | `getClientKey()` uses forwarded headers | Medium unless hosting normalizes headers |
| T4 | Prompt injection causing off-brand or unsafe Abby responses | Medium | Medium | System prompt, knowledge base, reply normalization | Medium |
| T5 | Abby provides medical advice beyond intended public profile scope | Medium | High | README documents non-diagnostic boundary; system prompt should enforce it | Medium |
| T6 | Legacy `/api/chat` endpoint remains public and unused | Medium | Medium | Validation, timeout, rate limit | Medium if not needed in production |
| T7 | Upstream AI provider returns sensitive error details | Low | Medium | Production hides most Abby upstream details; chat returns generic upstream failure | Low-medium because full upstream error text is logged server-side |
| T8 | XSS through AI model output rendered by client | Low | Medium | Abby normalizes markdown-like syntax; React escapes plain strings by default if rendered normally | Low, assuming no `dangerouslySetInnerHTML` for replies |
| T9 | Security header CSP too permissive for scripts/styles | Low | Medium | CSP present; production script/style allow `'unsafe-inline'` | Low-medium |
| T10 | Private media accidentally placed in `public/` | Low | Medium | Cleanup removed unreferenced assets; conservative public asset review | Low |
| T11 | Dependency vulnerability in app runtime | Low | Medium | `pnpm security:deps` script, lockfile committed | Low after audit passes |
| T12 | Denial of service from in-memory limiter on serverless/multi-instance deploy | Medium | Medium | Fixed-window limiter per process | Medium because buckets do not share state across instances |

## 8. Priority Findings

### P1. Confirm trusted proxy behavior for rate limiting

`lib/rate-limit.ts` uses `x-forwarded-for` first, then `x-real-ip`, then `unknown`. This is normal behind trusted proxies, but unsafe if a custom deployment lets clients supply those headers directly.

Recommended fix:

- If deploying to Vercel, document that Vercel-provided forwarding headers are trusted for this app.
- If deploying behind a custom proxy, strip inbound `x-forwarded-for` from clients and set it only at the proxy.
- For stronger production control, prefer platform edge rate limiting, WAF rules, or a shared Redis/upstash-style limiter.

### P2. Decide whether `/api/chat` should stay public

`/api/chat` is labeled legacy in `.env.example` but remains callable. If the website no longer uses ChatGuide, keeping it public increases provider surface and cost-abuse paths.

Recommended fix:

- If unused, remove route exposure or gate it behind an explicit feature flag such as `ENABLE_LEGACY_CHAT=true`.
- If kept, apply the same medical-safety and logging standards as `/api/abby`.

### P3. Add abuse controls for AI endpoints before wider launch

The current controls are good for a personal low-traffic site, but public AI endpoints can be scripted.

Recommended fix:

- Add per-route monitoring for 429 rates, upstream cost, and error spikes.
- Consider stricter limit for anonymous visitors, e.g. lower per-minute cap or daily quota.
- Add a deployment-side rate limit if the app is expected to receive public campaign traffic.

### P4. Keep medical-safety boundaries explicit in prompt and UI

The repo documents Abby as non-diagnostic, but the runtime safety depends on prompt wording and UI presentation.

Recommended fix:

- Ensure `src/prompts/abby.system-prompt.md` explicitly refuses diagnosis, treatment decisions, emergency guidance, and patient-specific clinical advice.
- Add tests or snapshot checks for refusal behavior if Abby becomes a major public feature.

## 9. Recommended Security Backlog

| Priority | Action | Owner Area |
|---|---|---|
| High | Confirm deployment target and trusted proxy header behavior | Deployment |
| High | Disable or feature-flag `/api/chat` if not required | API |
| Medium | Add provider-cost monitoring and alerting | Operations |
| Medium | Add shared/platform rate limit for production traffic | API / platform |
| Medium | Add AI safety regression tests for medical-advice refusal | Tests |
| Medium | Redact or bound upstream error logging if provider logs may contain prompt details | API |
| Low | Tighten production CSP by reducing inline script/style needs when feasible | Frontend |
| Low | Document production secret rotation steps in `SECURITY.md` | Docs |

## 10. Verification Evidence

| Check | Result |
|---|---|
| Reviewed `next.config.mjs` | Security headers and CSP present |
| Reviewed `app/api/abby/route.ts` | Server-side provider keys, validation, timeout, rate limit, no-store JSON headers |
| Reviewed `app/api/chat/route.ts` | Legacy public AI route with validation, timeout, rate limit |
| Reviewed `lib/rate-limit.ts` | In-memory fixed-window limiter keyed by forwarded headers |
| Reviewed `.env.example` | Empty placeholders only, no committed secrets |
| Prior `pnpm security:deps` | PASS in cleanup workflow |
| Prior `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build` | PASS in cleanup workflow |
| Current `git status --short` before this doc | Clean |

## 11. Current Verdict

Status: PASS WITH NOTES

The repository is acceptable to push from a security hygiene perspective after the completed cleanup, with one practical condition: decide the production stance for `/api/chat` and confirm rate-limit trust assumptions before high-visibility launch.

The most important next step is to confirm the deployment platform and either remove, gate, or intentionally retain the legacy `/api/chat` endpoint.
