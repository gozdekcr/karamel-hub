-- P1-03 Database base (ADR-0016, ADR-0027; SECURITY.md R1, R11, F3, F4).
-- No tables yet: this migration prepares extensions, the non-exposed schema and the
-- default privileges that every later table and function inherits.

-- 1. Extensions -------------------------------------------------------------------------
-- btree_gist: lets the "sessions never overlap" exclusion constraint compare user_id with
-- "=" inside a GiST index (ADR-0011, ADR-0016).
create extension if not exists btree_gist with schema extensions;
-- pgcrypto: gen_random_bytes() for 32-byte invite tokens (ADR-0027). Supabase installs it
-- already; the statement only makes the dependency explicit.
create extension if not exists pgcrypto with schema extensions;

-- 2. Non-exposed schema for RLS helpers and internal functions (ADR-0027, SECURITY.md F4) -
-- The Data API exposes only "public" and "graphql_public" (supabase/config.toml), so
-- nothing in "private" can be called over HTTP. Signed-in users need USAGE because RLS
-- policies call the helper functions with the caller's role; they get no CREATE.
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated, service_role;

-- 3. Functions are not executable by everyone (ADR-0027 item 3; SECURITY.md F3) ---------
-- PostgreSQL grants EXECUTE on every new function to PUBLIC. That default can only be
-- removed globally, not per schema. It applies to functions created later by "postgres",
-- the role that runs migrations.
alter default privileges for role postgres revoke execute on functions from public;
-- Supabase also grants EXECUTE on new functions in "public" to anon; remove that too.
-- API functions are granted to authenticated (Supabase's default in "public"); functions
-- in "private" get no grant unless a migration gives one.
alter default privileges for role postgres in schema public revoke execute on functions from anon;

-- 4. anon gets no privileges on new tables and sequences in "public" (SECURITY.md R11) ---
-- Signed-in users keep Supabase's default grants; RLS decides which rows they reach.
alter default privileges for role postgres in schema public revoke all on tables from anon;
alter default privileges for role postgres in schema public revoke all on sequences from anon;
