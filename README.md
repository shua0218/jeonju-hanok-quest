# 전주한옥마을 QUEST

한옥마을 외곽지역(1구역/2구역)의 체험·장소를 방문하고 사진 인증으로 퀘스트를 완료하면
지역 상품권을 지급하는 모바일 웹 애플리케이션입니다.

## 기술 스택
- React + TypeScript + Vite
- Tailwind CSS
- TanStack Query
- react-router-dom
- Supabase (Database + Storage)
- lucide-react (아이콘)

## 폴더 구조
```
src/
  components/     QuestCard, ProgressBar, PhoneModal 등 UI 컴포넌트
  data/           1구역/2구역 퀘스트 데이터 (10개씩 총 20개)
  hooks/          Supabase 연동 TanStack Query 훅
  lib/            Supabase 클라이언트, 기기 식별(device_id)
  pages/          Home(구역 선택), Region(퀘스트 목록)
  types/          공통 타입 정의
supabase/
  schema.sql      Supabase에 실행할 테이블/RLS 스크립트
```

## 실행 방법
1. 의존성 설치
   ```
   npm install
   ```
2. `.env.example` 을 복사해 `.env` 생성 후 Supabase 프로젝트 URL/anon key 입력
   ```
   cp .env.example .env
   ```
3. Supabase 대시보드 SQL Editor에서 `supabase/schema.sql` 실행
4. Supabase 대시보드 Storage에서 `quest-photos` 버킷 생성 (Public 설정)
5. 개발 서버 실행
   ```
   npm run dev
   ```

## 핵심 로직
- **구역 페이지 분리**: `/region1`, `/region2` 라우트로 각 구역의 퀘스트 10개를 별도 표시합니다.
- **사진 인증**: 각 퀘스트 카드의 카메라 버튼을 누르면 모바일 카메라/갤러리가 열리고,
  선택한 사진은 Supabase Storage(`quest-photos`)에 업로드된 후 `submissions` 테이블에 기록됩니다.
- **기기 식별**: 로그인 없이 `localStorage`에 저장된 `device_id`(UUID)로 사용자를 구분합니다.
  실제 서비스 전환 시에는 Supabase Auth(휴대폰 인증 등)로 교체를 권장합니다.
- **3개 달성 → 상품권 신청**: 완료한 퀘스트 수가 3개 이상이 되면 전화번호 입력 모달이 뜨고,
  제출 시 `reward_claims` 테이블에 `pending` 상태로 저장됩니다. 이후 운영자가 대시보드에서
  확인 후 상품권을 발송하고 `status`를 `issued`로 변경하면 됩니다.
- **모바일 최적화**: 모든 페이지가 `max-w-md` 컨테이너로 고정되어 모바일 화면 비율에 맞춰 표시됩니다.

## GitHub 배포 참고
- 이 폴더 전체를 새 GitHub 저장소로 push 하시면 됩니다.
- Vercel/Netlify 등으로 배포 시 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 환경변수를
  배포 플랫폼에도 동일하게 등록해야 합니다.

## 향후 개선 아이디어
- 운영자용 대시보드(구역별 신청 현황, 상품권 발송 처리)
- 사진 GPS 메타데이터 또는 위치 기반 인증 강화
- 중복/부정 인증 방지를 위한 관리자 승인 플로우
- Supabase Auth(휴대폰 OTP)로 기기 식별을 대체해 데이터 신뢰도 향상
