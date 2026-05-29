alter table users enable row level security;

create policy "Allow all access to users" on users
  for all
  using (true)
  with check (true);
