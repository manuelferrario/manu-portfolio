-- Optional schema for future persistence
-- Run in Supabase SQL editor if you want to store richer map content and visits.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  location text,
  linkedin_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.buildings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  zone_id text not null,
  name text not null,
  short_description text not null,
  story text not null,
  bullets jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  building_slug text,
  visitor_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.buildings enable row level security;
alter table public.visits enable row level security;

create policy "Profiles can read own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Profiles can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "Authenticated users can read buildings"
  on public.buildings
  for select
  to authenticated
  using (true);

create policy "Authenticated users can insert visits"
  on public.visits
  for insert
  to authenticated
  with check (auth.uid() = visitor_id);
