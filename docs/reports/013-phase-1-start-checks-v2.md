# 013 — Phase 1 start checks (v2)

Date: 2026-11-24 · Prompt: [`../prompts/013-phase-1-start-checks-v2.md`](../prompts/013-phase-1-start-checks-v2.md) · Previous round: [`013-phase-1-start-checks.md`](013-phase-1-start-checks.md)

## 1. Files created or changed

- `docs/decisions/0031-release-path.md` — **new, Accepted**: Phases 1–4 friends only, new
  sign-ups closed once they have signed up; Phase 5 public launch with custom SMTP, email
  confirmation and the 🚀 items; Phase 5 starts with SMTP/domain research.
- `docs/decisions/0030-phase-1-environment.md` (not committed yet, edited directly) —
  frontend host: **Cloudflare Workers with static assets** (#9); #79 accepted; backup
  before each `db push`; no open points left.
- `docs/ROADMAP.md`
  - Phase 1: new **P1-03b Hosted project** (includes testing `supabase db dump
    --data-only` and the "close new sign-ups" step) and **P1-14 Deployment for the friend
    group** (Cloudflare; the user closes sign-ups after friends sign up); P1-02 says
    Nunito; scope, out of scope, dependencies and acceptance criteria updated; 15 tasks.
  - Definition of done: backup before each `db push` from P1-03b on.
  - Phase 5 rewritten as **Polish and public launch**: P5-01 … P5-04 unchanged; new
    **P5-05 Launch research** (SMTP provider, domain requirement), P5-06 Custom SMTP and
    email confirmation, P5-07 Abuse limits (incl. #48), P5-08 Browser hardening, P5-09
    Privacy and legal review (#32), P5-10 Public launch; 10 tasks.
  - "Later": the 🚀 bullet removed (moved into Phase 5). Phase 0 end check table: #78 and
    #9 marked resolved.
- `docs/UI_UX.md` §6.3 — Nunito only; headings 700–800, body 400–800, timer digits in
  Nunito; Fredoka removed with the reason.
- `docs/SECURITY.md` — context (friends only, sign-ups closed, public launch in Phase 5);
  🚀 items are done in Phase 5; new threat **S6** (stranger signs up during the friend
  stage); §3.4: pgcrypto line updated, new check "new sign-ups turned off"; X4 points to
  P5-08.
- `docs/CURRENT_STATE.md` — Users, Release, Email verification, Visual direction, Phase
  order, Where the app runs; ADR-0031 added; tech list (Cloudflare; still open: SMTP and
  domain).
- `docs/OPEN_QUESTIONS.md` — #9, #79, #80, #81 resolved and removed; #32 and #48 now
  "needed in Phase 5".
- `docs/decisions/README.md` — ADR-0031 listed.
- `docs/prompts/013-phase-1-start-checks-v2.md`, this report.

## 2. What was done, and what was NOT done or verified

- Only documents changed. No commands against Supabase or Cloudflare; no accounts.
- The sign-up switch was taken from the `config.toml` that CLI 3.3.0 generated in round 1
  (`enable_signup`: "Allow/disallow new user signups to your project. Existing users can
  still sign in."). **The hosted dashboard's exact menu and wording were not checked**; that
  is part of P1-03b.
- `supabase db dump --data-only` is **still not tested**; it is now a P1-03b test.
- Node 26: the user is installing it; not verified here.
- Nothing was committed.

## 3. Contradictions, ambiguities and interpretations

- **Where the "close sign-ups" step lives.** The user asked for it in the hosted setup
  task, but friends can only sign up after sign-in (P1-05) and deployment (P1-14).
  Interpretation: P1-03b writes the step down and finds the switch in the dashboard; the
  user actually closes sign-ups during P1-14, after friends have signed up. Both tasks
  mention it.
- **Account deletion vs public launch.** Account deletion is still "Later". A privacy
  review (#32, P5-09) may require it before a public launch (for example under GDPR/KVKK
  — **not verified**, this is an assumption). Phase 5's out-of-scope line says so; the
  user decides in P5-09.
- **ADR-0027** (committed, Accepted) has the consequence "anyone who finds the URL can
  sign up until the public launch". Its decision is unchanged, so it was not superseded;
  ADR-0031 limits that consequence. ADR-0019 and ADR-0027 still mention "OPEN_QUESTIONS
  #9"; the resolved list points from #9 to ADR-0030.
- **A friend who joins later** (e.g. for a room in Phase 3) cannot sign up while sign-ups
  are closed: the user reopens them briefly or creates the account in the dashboard
  (noted in ADR-0031 as an interpretation; checked in P1-03b).
- **Task IDs:** `P1-03b` keeps the later IDs stable (as proposed in #79).

## 4. Suggestions (out of scope)

- Add short invariants for ADR-0030/0031 to `CLAUDE.md` (e.g. "hosted database is never
  reset; dump before each `db push`") if the user wants agents to see them first.
