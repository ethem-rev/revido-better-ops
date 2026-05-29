create or replace function verify_user(p_username text, p_password text)
returns table(id uuid, username text, is_admin boolean) as $$
begin
  return query
  select u.id, u.username, u.is_admin
  from users u
  where u.username = p_username
  and u.password_hash = crypt(p_password, u.password_hash);
end;
$$ language plpgsql security definer;
