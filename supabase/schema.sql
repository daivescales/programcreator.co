-- ProgramCreator leads schema (v5)
-- Run this in the Supabase SQL Editor.
--
-- If you already have an older `leads` table, drop and recreate:
--   drop table if exists public.leads cascade;

create extension if not exists "pgcrypto";

drop table if exists public.leads cascade;

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  brand_name text,
  lane text not null check (lane in ('creator', 'physical')),
  socials jsonb, -- {instagram, tiktok, youtube, website}
  follower_range text,
  has_product text check (has_product is null or has_product in ('yes', 'no', 'sort_of')),
  biggest_bottleneck text,
  investment_range text,
  ready_to_start text,
  terms_ack boolean,
  qualified boolean not null default true,
  status text not null default 'new' check (
    status in (
      'new',
      'not_qualified',
      'reviewing',
      'contacted',
      'booked',
      'won',
      'passed'
    )
  ),
  booked_at timestamptz,
  booking_ref text,
  sheet_row int,
  notes text,
  utm jsonb
);

create index leads_created_at_desc_idx on public.leads (created_at desc);
create index leads_email_idx on public.leads (email);
create index leads_status_idx on public.leads (status);

alter table public.leads enable row level security;

drop policy if exists "Allow anon insert leads" on public.leads;

-- Anon can insert only. Select/update/delete stay service-role only.
create policy "Allow anon insert leads"
  on public.leads
  for insert
  to anon
  with check (true);
