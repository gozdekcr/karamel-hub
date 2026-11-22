# 003 — Technical research

Date: 2026-11-22

(Translated to English from the user's Turkish prompt.)

> Start task 003, technical research. Goal: research the open technical choices before
> Phase 1. Do not decide; give a "Proposed" recommendation for each topic.
>
> Topics:
> 1. i18n library (react-i18next and alternatives)
> 2. Router (React Router vs TanStack Router)
> 3. Chart library (Recharts and alternatives)
> 4. Hosting (Vercel, Netlify, Cloudflare Pages; is the free plan enough?)
> 5. Exclusion constraint and btree_gist support in Supabase (ADR-0011)
> 6. Realtime/Presence free plan limits (ADR-0006)
> 7. Secure setup, with RLS, of the view that shows members only time (ADR-0006)
> 8. Where the heartbeat should be stored, and what the write cost is (#1)
> 9. Local development and migration management with the Supabase CLI
> 10. Vitest, Playwright and RLS testing (pgTAP etc.)
>
> For each topic: 2–3 options, a short comparison (maintenance status, TypeScript support,
> fit with the ADRs, learning value, free usage), a recommendation, source links, the check
> date and version numbers.
>
> Rules:
> - Open and read the source pages; do not rely on search summaries. Mark what you cannot
>   verify as [not verified].
> - Do not install anything, do not write code.
> - Output: `docs/TECH_RESEARCH.md`. Put the recommendations into `OPEN_QUESTIONS.md`.
>   Write a report file.
> - Do not commit; present the report.
