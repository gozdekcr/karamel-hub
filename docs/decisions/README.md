# Architecture Decision Records

One file per decision. Only `Accepted` ADRs are binding. A committed Accepted ADR's
decision is never edited; a change is a new ADR that supersedes it. An ADR that has not
been committed yet may be edited directly. Use [0000-template.md](0000-template.md).

| ADR | Title | Status |
| --- | --- | --- |
| [0001](0001-backend-supabase.md) | Backend: Supabase | Accepted |
| [0002](0002-frontend-layering.md) | Frontend layering | Partially superseded by [0024](0024-gamification-catalog-in-database.md); extended by [0029](0029-phase-1-folder-structure.md) |
| [0003](0003-timer-and-session-model.md) | Timer and session model | Accepted |
| [0004](0004-room-model.md) | Room model | Superseded by [0013](0013-room-model-multiple-owners.md) |
| [0005](0005-room-statistics.md) | Room statistics | Accepted |
| [0006](0006-realtime-and-privacy.md) | Realtime and privacy | Accepted |
| [0007](0007-forgotten-timer-and-session-editing.md) | Forgotten timer and session editing | Accepted |
| [0008](0008-coin-ledger.md) | Coin ledger and server-side rewards | Accepted |
| [0009](0009-server-state-tanstack-query.md) | Server state: TanStack Query | Accepted |
| [0010](0010-i18n-principle.md) | i18n principle | Accepted |
| [0011](0011-sessions-never-overlap.md) | Sessions never overlap | Accepted |
| [0012](0012-room-member-limit.md) | Room member limit | Accepted |
| [0013](0013-room-model-multiple-owners.md) | Room model with multiple owners | Superseded by [0014](0014-room-model-creator-role.md) |
| [0014](0014-room-model-creator-role.md) | Room model with multiple owners and a creator role | Accepted |
| [0015](0015-frontend-libraries.md) | Frontend libraries: i18n, router, charts, validation | Accepted |
| [0016](0016-database-implementation-rules.md) | Database implementation rules: overlap constraint, room-visible data, heartbeat | Accepted |
| [0017](0017-realtime-private-channels.md) | Realtime: private channels for room Presence | Accepted |
| [0018](0018-local-development-and-testing.md) | Local development, migrations and testing | Accepted |
| [0019](0019-react-typescript-vite.md) | React, TypeScript and Vite | Accepted |
| [0020](0020-cat-unlocks.md) | Cat unlocks | Partially superseded by [0028](0028-first-version-catalog.md) |
| [0021](0021-coin-economy-and-shop.md) | Coin economy and shop | Partially superseded by [0028](0028-first-version-catalog.md) |
| [0022](0022-streak-definition.md) | Streak definition | Accepted |
| [0023](0023-invite-link-visible-to-members.md) | Invite link visible to all members | Accepted |
| [0024](0024-gamification-catalog-in-database.md) | Gamification catalog and reward calculations in the database | Accepted |
| [0025](0025-study-goals.md) | Profiles, user settings and study goals | Accepted |
| [0026](0026-account-deletion.md) | Account deletion | Accepted |
| [0027](0027-security-baseline.md) | Security baseline for the friend-group stage | Accepted |
| [0028](0028-first-version-catalog.md) | First-version cat and item catalog | Accepted |
| [0029](0029-phase-1-folder-structure.md) | Phase 1 folder structure and shared test cases | Accepted |
