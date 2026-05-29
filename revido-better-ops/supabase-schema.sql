-- Run this in your Supabase SQL editor to create the procedures table

create table if not exists procedures (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null check (category in ('improve', 'add', 'remove')),
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'done')),
  month date not null,
  carried_from uuid references procedures(id),
  created_at timestamptz default now()
);

create index if not exists idx_procedures_month on procedures(month);
