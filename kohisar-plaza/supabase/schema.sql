-- Kohisar Plaza admin: run once in Supabase → SQL Editor.
-- Before running, replace ADMIN_EMAIL_HERE (bottom of the file) with the email of your Supabase Auth admin user.

-- 1) Listings table -------------------------------------------------------
create table if not exists public.properties (
  id            text primary key default gen_random_uuid()::text,
  title         text not null,
  type          text not null check (type in ('flat', 'shop', 'office', 'studio')),
  bedrooms      smallint check (bedrooms in (1, 2, 3)),
  price_monthly integer not null check (price_monthly >= 0),
  location      text not null check (location in ('B17', 'FMC')),
  block         text,
  area_sqft     integer not null default 0 check (area_sqft >= 0),
  floor         smallint,
  furnished     boolean not null default false,
  available     boolean not null default true,
  is_new        boolean not null default false,
  is_featured   boolean not null default false,
  images        text[] not null default '{}',
  features      text[] not null default '{}',
  whatsapp_msg  text not null default '',
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

drop trigger if exists properties_touch on public.properties;
create trigger properties_touch before update on public.properties
for each row execute function public.touch_updated_at();

-- 2) Who is an admin -----------------------------------------------------
create table if not exists public.admins (
  email text primary key
);
alter table public.admins enable row level security;  -- no policies: not readable via the public API

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- 3) Row-level security: everyone can read, only admins can write --------
alter table public.properties enable row level security;

drop policy if exists "properties public read" on public.properties;
create policy "properties public read" on public.properties
  for select using (true);

drop policy if exists "properties admin insert" on public.properties;
create policy "properties admin insert" on public.properties
  for insert to authenticated with check (public.is_admin());

drop policy if exists "properties admin update" on public.properties;
create policy "properties admin update" on public.properties
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "properties admin delete" on public.properties;
create policy "properties admin delete" on public.properties
  for delete to authenticated using (public.is_admin());

-- 4) Photo storage --------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('property-images', 'property-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "property images admin insert" on storage.objects;
create policy "property images admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'property-images' and public.is_admin());

drop policy if exists "property images admin update" on storage.objects;
create policy "property images admin update" on storage.objects
  for update to authenticated using (bucket_id = 'property-images' and public.is_admin());

drop policy if exists "property images admin delete" on storage.objects;
create policy "property images admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'property-images' and public.is_admin());

-- 5) Current listings (copied from data/properties.ts) --------------------
insert into public.properties
  (id, title, type, bedrooms, price_monthly, location, block, area_sqft, floor, furnished, available, is_new, is_featured, images, features, whatsapp_msg, sort_order)
values
  ('1', '1-Bed Flat in Multi Gardens B17 — Kohisar Plaza', 'flat', 1, 22000, 'B17', 'Block C', 550, 3, false, true, true, true, array['https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1616137356540-b13b2a04a507?auto=format&fit=crop&w=800&q=80']::text[], array['Corner unit', 'MPCHS wide roads', 'Near FMC access road']::text[], '', 1),
  ('2', 'Furnished 1-Bed in FMC Multi Gardens — Kohisar Plaza', 'flat', 1, 28500, 'FMC', 'Block B', 520, 2, true, true, false, true, array['https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1616137356540-b13b2a04a507?auto=format&fit=crop&w=800&q=80']::text[], array['Furnished', 'Faisal Margalla City block', 'Family sector proximity']::text[], '', 2),
  ('3', '1-Bed Flat B17 MPCHS — Bright & Direct Owner', 'flat', 1, 20000, 'B17', 'Block A', 480, 4, false, true, false, false, array['https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1616137356540-b13b2a04a507?auto=format&fit=crop&w=800&q=80']::text[], array['Budget-friendly', 'Direct owner flat rent Multi Gardens B17']::text[], '', 3),
  ('4', '2-Bed Flat in Multi Gardens B17 Islamabad', 'flat', 2, 38000, 'B17', 'Block C', 850, 5, true, true, true, true, array['https://images.unsplash.com/photo-1616137356540-b13b2a04a507?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=800&q=80']::text[], array['Families welcome', '2 bathroom', 'Power backup option']::text[], '', 4),
  ('5', '2-Bed Unfurnished — MPCHS Multi Gardens B17', 'flat', 2, 32000, 'B17', 'Block D', 780, 2, false, true, false, true, array['https://images.unsplash.com/photo-1616137356540-b13b2a04a507?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=800&q=80']::text[], array['Spacious lounge', 'Near schools route']::text[], '', 5),
  ('6', '2-Bed FMC Faisal Margalla City — Modern Finish', 'flat', 2, 42000, 'FMC', 'Block E', 820, 6, false, true, false, false, array['https://images.unsplash.com/photo-1616137356540-b13b2a04a507?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=800&q=80']::text[], array['Margalla views', 'Premium locality within Multi Gardens']::text[], '', 6),
  ('7', '3-Bed Family Flat — Kohisar Plaza B17', 'flat', 3, 52000, 'B17', 'Block C', 1200, 4, false, true, false, true, array['https://images.unsplash.com/photo-1620207370579-ae2276efbdbe?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1616137356540-b13b2a04a507?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=800&q=80']::text[], array['3 bedrooms', 'Servant quarter option', 'Near park']::text[], '', 7),
  ('8', '3-Bed Corner — MPCHS B17 Multi Gardens', 'flat', 3, 61000, 'B17', 'Block A', 1350, 7, true, true, true, false, array['https://images.unsplash.com/photo-1620207370579-ae2276efbdbe?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1616137356540-b13b2a04a507?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=800&q=80']::text[], array['Fully furnished flat Multi Gardens B17', 'Dual balconies']::text[], '', 8),
  ('9', 'Shop for Rent — B17 Commercial Markaz', 'shop', null, 45000, 'B17', 'Markaz', 280, 0, false, true, false, true, array['https://images.unsplash.com/photo-1702724758750-9ff8d50f02e5?auto=format&fit=crop&w=800&q=80']::text[], array['High footfall', 'Shop for rent Multi Gardens B17']::text[], '', 9),
  ('10', 'Retail Shop — FMC Multi Gardens Islamabad', 'shop', null, 38000, 'FMC', 'Commercial strip', 240, 0, false, true, true, false, array['https://images.unsplash.com/photo-1702724758750-9ff8d50f02e5?auto=format&fit=crop&w=800&q=80']::text[], array['Glass front', 'Parking nearby']::text[], '', 10),
  ('11', 'Office / Studio — B17 MPCHS', 'office', null, 28000, 'B17', 'Block B', 320, 2, false, true, false, false, array['https://images.unsplash.com/photo-1720139290958-d8676702c3ed?auto=format&fit=crop&w=800&q=80']::text[], array['Office for rent Multi Gardens B17', 'Internet ready']::text[], '', 11),
  ('12', 'Furnished Studio — FMC Faisal Margalla City', 'studio', null, 24000, 'FMC', 'Block F', 380, 3, true, true, false, true, array['https://images.unsplash.com/photo-1630699376167-3870469e7598?auto=format&fit=crop&w=800&q=80']::text[], array['MPCHS B17 studio flat rent style layout', 'Ideal for singles']::text[], '', 12)
on conflict (id) do nothing;

-- 6) Your admin login (must match the user you created in Authentication → Users)
insert into public.admins (email) values ('ADMIN_EMAIL_HERE')
on conflict (email) do nothing;
