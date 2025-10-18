-- Create privileges table
create table if not exists public.privileges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  category text not null check (category in ('streaming', 'antivirus', 'lounge', 'restaurant', 'events', 'other')),
  icon text,
  required_grade text not null check (required_grade in ('none', 'bronze', 'silver', 'gold', 'diamond')),
  required_subscription text check (required_subscription in ('none', 'pro', 'premium')),
  limit_type text not null check (limit_type in ('unlimited', 'count', 'amount')),
  limit_value numeric(15, 2),
  limit_period text check (limit_period in ('daily', 'weekly', 'monthly', 'yearly')),
  cost_in_privileges numeric(15, 2) default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.privileges enable row level security;

-- Everyone can view active privileges
create policy "privileges_select_all"
  on public.privileges for select
  using (is_active = true);

-- Only admins can modify privileges
create policy "privileges_admin_all"
  on public.privileges for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );
