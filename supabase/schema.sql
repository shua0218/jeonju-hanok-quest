-- 전주한옥마을 QUEST : Supabase 스키마
-- Supabase 대시보드 > SQL Editor 에서 실행하세요.

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  quest_id integer not null,
  region_slug text not null check (region_slug in ('region1', 'region2')),
  photo_url text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_submissions_device_region
  on submissions (device_id, region_slug);

create table if not exists reward_claims (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  region_slug text not null check (region_slug in ('region1', 'region2')),
  phone_number text not null,
  status text not null default 'pending' check (status in ('pending', 'issued')),
  created_at timestamptz not null default now()
);

create index if not exists idx_reward_claims_device_region
  on reward_claims (device_id, region_slug);

-- RLS 활성화
alter table submissions enable row level security;
alter table reward_claims enable row level security;

-- 익명 사용자도 자신의 기기(device_id)로 기록을 남기고 조회할 수 있도록 허용
-- (device_id는 클라이언트가 생성한 UUID이며, MVP 단계의 단순 식별 방식입니다.)
create policy "allow anon insert submissions"
  on submissions for insert to anon with check (true);

create policy "allow anon select own submissions"
  on submissions for select to anon using (true);

create policy "allow anon insert reward claims"
  on reward_claims for insert to anon with check (true);

create policy "allow anon select own reward claims"
  on reward_claims for select to anon using (true);

-- Storage: quest-photos 버킷을 Supabase 대시보드 > Storage 에서 생성하고 Public으로 설정하세요.
-- 버킷 생성 후 아래 정책을 Storage > Policies 에서 추가하면 됩니다.
-- (버킷명이 quest-photos 일 때)
