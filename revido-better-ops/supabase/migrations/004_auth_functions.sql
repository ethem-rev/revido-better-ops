create or replace function create_user(p_username text, p_password text)
returns uuid as $$
declare
  new_id uuid;
begin
  insert into users (username, password_hash)
  values (p_username, crypt(p_password, gen_salt('bf')))
  returning id into new_id;
  return new_id;
end;
$$ language plpgsql security definer;

create or replace function verify_user(p_username text, p_password text)
returns table(id uuid, username text) as $$
begin
  return query
  select u.id, u.username
  from users u
  where u.username = p_username
  and u.password_hash = crypt(p_password, u.password_hash);
end;
$$ language plpgsql security definer;
