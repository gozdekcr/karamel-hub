# ADR-0001: Backend — Supabase

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

Users are on different computers and networks, so a hosted backend is required.
Peer-to-peer (WebRTC) only works while both peers are online and gives no persistent
history. The data is relational (users → courses → tasks → sessions; rooms → members) and
statistics need aggregation. Sign-up is public, so access control must be strong.

## Decision

Use **Supabase**: Auth, PostgreSQL and Realtime.

Backend logic lives in the database: RLS policies, views, RPC (Postgres) functions and
constraints. There is no custom API server for now.

## Alternatives considered

- **Firebase** — good presence, but NoSQL makes relational data and weekly/monthly
  aggregation harder.
- **PocketBase** — simple and has realtime, but we would host and operate the server.
- **Custom API (e.g. Spring Boot + WebSocket + PostgreSQL)** — most backend learning, but
  auth, websockets and deployment would roughly double the project's scope.

## Consequences

- SQL, RLS and Postgres functions become the main backend skills in this project.
- The anon key is public by design; all security depends on RLS (see `SECURITY.md`, planned).
- **Free plan risk:** projects with very low activity for about a week are paused. Data is
  kept, but the project must be resumed from the dashboard.
- A custom API can be revisited later if the project needs it.

## Open points

- Email verification on sign-up (OPEN_QUESTIONS #6).
