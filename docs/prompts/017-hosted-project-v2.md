# 017 — Hosted project (v2)

Date: 2026-11-24

(Translated to English from the user's Turkish prompt.)

> Step 1 results:
> - supabase login: successful.
> - supabase link --project-ref hrkzjmtstuenwakiyntf: successful, it did not ask for a
>   password.
> - migration list --remote: Local has 20261124141306, Remote is empty.
>
> Step 2 results (hosted, default privileges of postgres):
> - public / S (sequences): {postgres=rwU/postgres}
> - public / f (functions): {postgres=X/postgres}
> - public / r (tables): {postgres=arwdDxtm/postgres, anon=Dxtm/postgres,
>   authenticated=Dxtm/postgres, ...} (the end of the line is cut off on screen)
> - There are storage rows too (we do not use them).
> Extensions: btree_gist not installed (installed NULL, default 1.7); pgcrypto 1.3
> installed.
>
> Your proposal is accepted: a second migration that aligns local with hosted + explicit
> grants on every table + updating the P1-03 test. Write the migration and test it locally;
> before sending anything to the hosted project, show what will go, and I will approve.
> I have not done the dashboard settings (step 3) yet; I will do them one by one later.
> Do not commit.
