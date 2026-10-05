-- Separate table for version 0.2; no existing clients/applications tables are changed.
create table public.razz_workspaces (
 owner_id uuid primary key references auth.users(id) on delete cascade,
 data jsonb not null default '{"version":1,"clients":[],"jobs":[]}'::jsonb,
 revision bigint not null default 1 check (revision > 0),
 constraint valid_workspace_shape check (
 jsonb_typeof(data) = 'object' and data @> '{"version":1}'::jsonb
 and coalesce(jsonb_typeof(data->'clients') = 'array',false)
 and coalesce(jsonb_typeof(data->'jobs') = 'array',false)
 and pg_column_size(data) < 5000000)
);
alter table public.razz_workspaces enable row level security;
revoke all on public.razz_workspaces from anon, authenticated;
grant select,insert,update on public.razz_workspaces to authenticated;
create policy workspace_select on public.razz_workspaces for select to authenticated using ((select auth.uid()) = owner_id);
create policy workspace_insert on public.razz_workspaces for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy workspace_update on public.razz_workspaces for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
-- Existing signup trigger remains usable as a trigger, not as a public RPC.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
