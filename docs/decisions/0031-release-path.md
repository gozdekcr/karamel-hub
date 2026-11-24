# ADR-0031: Release path — friends only with sign-ups closed, public launch in Phase 5

- **Status:** Accepted
- **Date:** 2026-11-24

## Context

From Phase 1 the app runs on a hosted Supabase project and the user's friends use it
(ADR-0030). Sign-up is public by default, and email confirmation is off until a custom SMTP
server exists (ADR-0027, SECURITY.md S4): anyone who finds the URL could create an account
with any email address. ADR-0027 marks the public-launch items with 🚀 but does not say when
the public launch happens.

The local stack's `supabase/config.toml` (CLI 3.3.0) documents the switch: `enable_signup`
— "Allow/disallow new user signups to your project. Existing users can still sign in."

## Decision

Decided by the user in task 013-v2:

1. **Phases 1–4: friends only.** After the user's friends have signed up, the user turns
   off new sign-ups on the hosted project (Supabase dashboard, Auth settings). Existing
   users keep signing in. Email confirmation stays off (ADR-0027).
2. **Phase 5: public launch.** The app opens to everyone with **email-confirmed sign-up**:
   a custom SMTP server, email confirmation on, and the 🚀 items of SECURITY.md and
   ADR-0027 done before sign-ups are opened again.
3. Phase 5 starts with a **research task** for the SMTP provider and the domain
   requirement (a sending domain, the app's domain); the user decides from its report.

## Alternatives considered

- **Sign-ups open during Phases 1–4** (ADR-0027's consequence) — strangers who find the URL
  could sign up with any email address.
- **Email confirmation now** — needs custom SMTP (and likely a domain) before friends can
  use the app; ADR-0027 deferred it.
- **No public launch** — not the user's goal.

## Consequences

- Between the first deployment and closing sign-ups, sign-up is open; the URL is shared
  only with the friend group (OPEN_QUESTIONS #79, accepted).
- A friend who joins later needs sign-ups opened for a short time, or an account created
  by the user in the dashboard (accepted in task 013-v4; the exact dashboard steps are
  checked in P1-03b).
- The local stack keeps sign-ups on (`enable_signup = true`) for development and tests.
- Phase 5's scope changes from "going live for the friend group" to the public launch;
  privacy and legal review (#32) and the member-removal block (#48) must be decided in
  Phase 5.
- ADR-0027's decision is unchanged; its consequence "anyone who finds the URL can sign up
  until the public launch" is limited by item 1.

## Open points

- SMTP provider and domain (Phase 5 research task P5-05).
- #32 (privacy, legal, age policy) and #48 (removal block), before the launch.
