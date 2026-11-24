-- P1-03b: the same default privileges locally and on the hosted project (task 017-v2).
--
-- The hosted project was created with "Automatically expose new tables" off: new objects in
-- "public" give anon and authenticated no read/write rights (tables keep only TRUNCATE,
-- REFERENCES, TRIGGER, MAINTAIN; sequences and functions nothing). The local stack still
-- grants everything to authenticated. This migration removes every default grant in
-- "public" for the API roles in both places, so every table, sequence and function gets
-- its rights only from an explicit GRANT in its own migration (Supabase "full opt-out";
-- ADR-0027: EXECUTE only for the API functions).
--
-- Each table migration therefore contains, for example:
--   grant select, insert, update, delete on table public.<table> to authenticated;
-- and each API function:
--   grant execute on function public.<function>(<args>) to authenticated;

alter default privileges for role postgres in schema public
  revoke all on tables from anon, authenticated, service_role;

alter default privileges for role postgres in schema public
  revoke all on sequences from anon, authenticated, service_role;

alter default privileges for role postgres in schema public
  revoke all on functions from anon, authenticated, service_role;
