create table initiatives (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  owner text not null,
  status text not null default 'New' check (status in ('New', 'In Progress', 'Improved', 'Failed')),
  month_assigned text not null,
  created_at timestamptz not null default now()
);

create index idx_initiatives_month on initiatives (month_assigned);
