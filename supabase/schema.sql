-- ProgramCreator leads schema
-- Run this in the Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  brand_name text,
  lane text not null check (lane in ('creator', 'physical')),
  socials jsonb,
  follower_range text,
  website text,
  revenue_range text,
  has_product text check (has_product is null or has_product in ('yes', 'no', 'sort_of')),
  biggest_bottleneck text,
  goal_90_days text,
  ready_to_start text,
  budget_ack boolean,
  source text,
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'won', 'lost')),
  notes text,
  utm jsonb
);

create index if not exists leads_created_at_desc_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

-- Anon can insert only. Select/update/delete stay service-role only.
create policy "Allow anon insert leads"
  on public.leads
  for insert
  to anon
  with check (true);
