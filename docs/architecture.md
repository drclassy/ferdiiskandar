
# Architecture Notes

## Current Structure

- Frontend and API in one Next.js project.
- Chat endpoint at `app/api/chat/route.ts`.
- Test suite with Vitest and Testing Library.

## Future Improvements

- Add OpenTelemetry instrumentation for API and rendering paths.
- Introduce standardized error payload model aligned with RFC 9457.
- Add reusable workflow templates and OIDC-based deploy auth.
