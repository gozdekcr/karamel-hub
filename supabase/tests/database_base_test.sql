-- P1-03 Database base: extensions, the private schema, RLS everywhere in the exposed
-- schemas, and default privileges (SECURITY.md §3.1: R1, R11, F3, F4).
-- Everything runs inside a transaction that is rolled back, so probe objects never stay.
begin;
select plan(19);

-- Extensions ---------------------------------------------------------------------------
select has_extension('extensions', 'btree_gist', 'btree_gist is installed in schema extensions');
select has_extension('extensions', 'pgcrypto', 'pgcrypto is installed in schema extensions');

-- Private schema -----------------------------------------------------------------------
select has_schema('private', 'schema private exists');
select ok(not has_schema_privilege('anon', 'private', 'usage'), 'anon cannot use schema private');
select ok(has_schema_privilege('authenticated', 'private', 'usage'), 'authenticated can use schema private (RLS helpers)');
select ok(not has_schema_privilege('authenticated', 'private', 'create'), 'authenticated cannot create objects in schema private');

-- Whole-schema checks on the current database ------------------------------------------
-- R1: every table in an exposed schema has RLS enabled.
create temporary view tables_without_rls as
  select n.nspname || '.' || c.relname as name
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname in ('public', 'graphql_public')
    and c.relkind in ('r', 'p')
    and not c.relrowsecurity;

-- F3: no function in our schemas is executable by anon or by PUBLIC.
create temporary view functions_open_to_anon as
  select p.oid::regprocedure::text as name
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  where n.nspname in ('public', 'private')
    and (
      has_function_privilege('anon', p.oid, 'execute')
      or exists (
        select 1 from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
        where a.grantee = 0 and a.privilege_type = 'EXECUTE'
      )
    );

select is_empty('select name from tables_without_rls', 'every table in the exposed schemas has RLS enabled');
select is_empty('select name from functions_open_to_anon', 'no function in public or private is executable by anon or PUBLIC');

-- Default privileges for objects that later migrations create ---------------------------
-- A probe table created the way a migration would create one.
create table public._probe_table (id int);
select ok(
  not has_table_privilege('anon', 'public._probe_table', 'select, insert, update, delete'),
  'new table in public: anon has no privileges'
);
select ok(
  has_table_privilege('authenticated', 'public._probe_table', 'select'),
  'new table in public: authenticated keeps its grant (RLS decides the rows)'
);
-- The R1 check really finds a table without RLS ...
select is((select array_agg(name) from tables_without_rls), array['public._probe_table'],
  'the RLS check reports a table without RLS');
-- ... and stops reporting it once RLS is enabled.
alter table public._probe_table enable row level security;
select is_empty('select name from tables_without_rls', 'the RLS check passes once RLS is enabled');

-- A probe function in public (where API functions live).
create function public._probe_api() returns int language sql as 'select 1';
select ok(not has_function_privilege('anon', 'public._probe_api()', 'execute'), 'new function in public: anon cannot execute it');
select ok(has_function_privilege('authenticated', 'public._probe_api()', 'execute'), 'new function in public: authenticated can execute it');

-- A probe function in private (where helpers and internal functions live).
create function private._probe_internal() returns int language sql as 'select 1';
select ok(not has_function_privilege('anon', 'private._probe_internal()', 'execute'), 'new function in private: anon cannot execute it');
select ok(not has_function_privilege('authenticated', 'private._probe_internal()', 'execute'), 'new function in private: authenticated cannot execute it without a grant');

-- The F3 check still passes with both probes present (no PUBLIC or anon grant) ...
select is_empty('select name from functions_open_to_anon', 'the probe functions are not open to anon or PUBLIC');
-- ... and really finds a function that is open to anon.
grant execute on function public._probe_api() to anon;
select is((select array_agg(name) from functions_open_to_anon), array['_probe_api()'],
  'the function check reports a function executable by anon');

-- Invite tokens: 32 random bytes are available (ADR-0027).
select is(length(extensions.gen_random_bytes(32)), 32, 'gen_random_bytes(32) returns 32 bytes');

select * from finish();
rollback;
