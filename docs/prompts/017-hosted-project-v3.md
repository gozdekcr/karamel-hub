# 017 — Hosted project (v3)

Date: 2026-11-24

(Translated to English from the user's Turkish prompt.)

> Steps 4–6 results:
> - dry-run: only 20261124141306_database_base.sql and
>   20261124163331_align_default_privileges.sql were listed.
> - db push: both applied, "Finished supabase db push", no error.
> - migration list --remote: both migrations are in Local and Remote.
> - Default privileges: (all)/f {postgres=X/postgres}; public/S {postgres=rwU/postgres};
>   public/f {postgres=X/postgres}; public/r {postgres=arwdDxtm/postgres}. anon,
>   authenticated and service_role appear in none of them.
> - Extensions: pgcrypto 1.3 and btree_gist 1.7, both in the extensions schema.
> - private: anon_usage=false, auth_usage=true.
>
> Give the next step (backup test). I will do the dashboard settings (step 3) after that.
> Do not commit.
