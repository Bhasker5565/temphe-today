-- Profile table for registered investors, linked 1:1 to Supabase Auth's auth.users.
-- Supabase Auth (auth.users) owns credentials/password hashing; this table only
-- stores the extra profile fields our app needs.
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null,
  mobile text,
  country text,
  investment_interest text,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up via Supabase Auth.
-- security definer is required so the trigger can write to public.users
-- even though the new user has no row/permissions yet at insert time.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, full_name, email, mobile, country, investment_interest)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    new.raw_user_meta_data ->> 'mobile',
    new.raw_user_meta_data ->> 'country',
    new.raw_user_meta_data ->> 'investment_interest'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
