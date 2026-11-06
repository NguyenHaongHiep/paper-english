-- Run this once in Supabase Dashboard > SQL Editor.
create table if not exists public.app_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_data enable row level security;

drop policy if exists "Users can read their own learning data" on public.app_data;
drop policy if exists "Users can create their own learning data" on public.app_data;
drop policy if exists "Users can update their own learning data" on public.app_data;

create policy "Users can read their own learning data"
  on public.app_data for select
  using (auth.uid() = user_id);

create policy "Users can create their own learning data"
  on public.app_data for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own learning data"
  on public.app_data for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
