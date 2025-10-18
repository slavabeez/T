-- Create profiles table with user information
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  middle_name text,
  birth_date date not null,
  phone text not null,
  balance numeric(15, 2) default 0,
  subscription_type text default 'none' check (subscription_type in ('none', 'pro', 'premium')),
  subscription_paid_until timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS Policies for profiles
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Admin can view all profiles
create policy "profiles_select_admin"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Add is_admin column
alter table public.profiles add column if not exists is_admin boolean default false;

-- Create function to calculate grade based on balance and subscription
create or replace function public.calculate_grade(user_balance numeric, subscription text)
returns text
language plpgsql
as $$
begin
  -- Bronze: paid subscription
  if subscription = 'pro' or subscription = 'premium' then
    return 'bronze';
  end if;
  
  -- Diamond: 10M+ balance
  if user_balance >= 10000000 then
    return 'diamond';
  end if;
  
  -- Gold: 5M+ balance
  if user_balance >= 5000000 then
    return 'gold';
  end if;
  
  -- Silver: 3M+ balance
  if user_balance >= 3000000 then
    return 'silver';
  end if;
  
  -- No grade
  return 'none';
end;
$$;

-- Create computed grade column
alter table public.profiles 
  add column if not exists grade text 
  generated always as (calculate_grade(balance, subscription_type)) stored;
