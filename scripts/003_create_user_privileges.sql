-- Create user_privileges table to track usage
create table if not exists public.user_privileges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  privilege_id uuid not null references public.privileges(id) on delete cascade,
  used_count numeric(15, 2) default 0,
  used_amount numeric(15, 2) default 0,
  last_used_at timestamp with time zone,
  period_start timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, privilege_id)
);

-- Enable RLS
alter table public.user_privileges enable row level security;

-- Users can view their own privilege usage
create policy "user_privileges_select_own"
  on public.user_privileges for select
  using (auth.uid() = user_id);

-- Users can update their own privilege usage
create policy "user_privileges_update_own"
  on public.user_privileges for update
  using (auth.uid() = user_id);

-- Users can insert their own privilege usage
create policy "user_privileges_insert_own"
  on public.user_privileges for insert
  with check (auth.uid() = user_id);

-- Admins can view all
create policy "user_privileges_admin_select"
  on public.user_privileges for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Admins can update all
create policy "user_privileges_admin_update"
  on public.user_privileges for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );
