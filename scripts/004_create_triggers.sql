-- Trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, 
    first_name, 
    last_name, 
    middle_name,
    birth_date, 
    phone,
    balance
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    coalesce(new.raw_user_meta_data ->> 'middle_name', null),
    coalesce((new.raw_user_meta_data ->> 'birth_date')::date, current_date),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce((new.raw_user_meta_data ->> 'balance')::numeric, 0)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Add updated_at triggers
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.update_updated_at();

drop trigger if exists privileges_updated_at on public.privileges;
create trigger privileges_updated_at
  before update on public.privileges
  for each row
  execute function public.update_updated_at();

drop trigger if exists user_privileges_updated_at on public.user_privileges;
create trigger user_privileges_updated_at
  before update on public.user_privileges
  for each row
  execute function public.update_updated_at();
