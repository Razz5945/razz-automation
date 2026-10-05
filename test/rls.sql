-- Run only as database administrator. All fixtures roll back.
begin;
insert into auth.users(id,email,raw_user_meta_data) values
('a1111111-1111-4111-8111-111111111111','razz-rls-a@example.invalid','{}'),
('b2222222-2222-4222-8222-222222222222','razz-rls-b@example.invalid','{}');
set local role authenticated;
set local request.jwt.claim.sub = 'a1111111-1111-4111-8111-111111111111';
insert into public.razz_workspaces(owner_id) values ('a1111111-1111-4111-8111-111111111111');
do $$ begin
 if (select count(*) from public.razz_workspaces) <> 1 then raise exception 'Owner cannot read own row'; end if;
 update public.razz_workspaces set revision=2 where owner_id='a1111111-1111-4111-8111-111111111111';
 if not found then raise exception 'Owner cannot update own row'; end if;
 begin
  update public.razz_workspaces set owner_id='b2222222-2222-4222-8222-222222222222';
  raise exception 'Owner transfer was allowed';
 exception when insufficient_privilege then null; end;
end $$;
set local request.jwt.claim.sub = 'b2222222-2222-4222-8222-222222222222';
do $$ begin
 if (select count(*) from public.razz_workspaces) <> 0 then raise exception 'Cross-account read allowed'; end if;
 update public.razz_workspaces set revision=3 where owner_id='a1111111-1111-4111-8111-111111111111';
 if found then raise exception 'Cross-account update allowed'; end if;
 begin
  insert into public.razz_workspaces(owner_id) values ('a1111111-1111-4111-8111-111111111111');
  raise exception 'Cross-account insert allowed';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role anon;
do $$ begin
 begin
  perform count(*) from public.razz_workspaces;
  raise exception 'Anonymous read allowed';
 exception when insufficient_privilege then null; end;
end $$;
rollback;
