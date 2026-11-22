# 008 — Security design (v2)

Date: 2026-11-22

(Translated to English from the user's Turkish prompt.)

> - #6: Your proposal is accepted. Email verification is off for the friend-group stage;
>   it will be turned on with our own SMTP before the release (🚀).
> - #59–#64: All your proposals are accepted. For #60: API functions in the exposed schema,
>   each one checks `auth.uid()`, the `EXECUTE` privilege is revoked from `anon`; helpers in
>   a non-exposed schema. pgcrypto will be verified in Phase 1.
> - Add the new key format (`sb_publishable_…`) to the Phase 1 setup checklist.
> - Record these in the relevant ADRs, SECURITY.md and OPEN_QUESTIONS. Do not commit.
