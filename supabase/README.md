# Supabase 설정 가이드

이 디렉토리에는 Supabase 데이터베이스 설정에 필요한 SQL 스크립트가 포함되어 있습니다.

## 📋 설정 순서

Supabase 대시보드의 SQL Editor에서 다음 순서대로 스크립트를 실행하세요:

### 1. RLS (Row Level Security) 정책 설정
```bash
파일: 01_rls_policies.sql
```

이 스크립트는 다음을 수행합니다:
- 모든 테이블에 RLS 활성화
- 사용자별 데이터 접근 권한 설정
- 보안 정책 생성

**중요:** 이 스크립트를 실행하기 전에 모든 테이블이 생성되어 있어야 합니다.

### 2. 트리거 및 함수 생성
```bash
파일: 02_triggers_functions.sql
```

이 스크립트는 다음을 수행합니다:
- `updated_at` 자동 업데이트 트리거
- 추천 코드 자동 생성 함수
- 신규 사용자 프로필 자동 생성 트리거
- 게시글 통계 자동 업데이트 트리거

### 3. 샘플 데이터 생성 (선택사항)
```bash
파일: 03_sample_data.sql
```

테스트를 위한 샘플 데이터를 생성합니다:
- 미션 데이터
- 경품 데이터
- 리워드 상품 데이터

## 🔧 Supabase 대시보드 설정

### 1. 프로젝트 생성
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 새 프로젝트 생성
3. 프로젝트 URL과 anon key 복사

### 2. 환경 변수 설정
`.env` 파일에 다음 정보를 입력하세요:
```env
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 데이터베이스 스키마 적용
1. Supabase Dashboard → SQL Editor 이동
2. 기존 테이블 스키마가 적용되어 있는지 확인
3. 위의 순서대로 SQL 스크립트 실행

## 📝 주요 기능

### RLS 정책
- **Profiles**: 사용자는 자신의 프로필만 수정 가능, 다른 사용자 프로필은 읽기만 가능
- **Missions**: 인증된 사용자만 활성화된 미션 조회 가능
- **Posts/Comments**: 인증된 사용자만 생성 가능, 본인 작성글만 수정 가능
- **Prizes**: 인증된 사용자만 활성화된 경품 조회 가능
- **Wallet**: 사용자는 자신의 트랜잭션만 조회 가능

### 자동 트리거
- **updated_at**: 레코드 수정 시 자동으로 타임스탬프 업데이트
- **프로필 생성**: 새 사용자 가입 시 자동으로 프로필 생성
- **게시글 통계**: 댓글 생성/삭제 시 자동으로 댓글 수 업데이트

## 🚨 주의사항

1. **RLS 정책**: 모든 테이블에 RLS가 활성화되어 있습니다. 관리자 작업 시 서비스 롤을 사용하거나 정책을 일시적으로 비활성화해야 할 수 있습니다.

2. **자동 프로필 생성**: `handle_new_user()` 트리거가 활성화되어 있으므로, 앱에서 별도로 프로필을 생성할 필요가 없습니다.

3. **샘플 데이터**: 프로덕션 환경에서는 샘플 데이터 스크립트를 실행하지 마세요.

## 🔍 트러블슈팅

### RLS 정책 오류
만약 "row-level security policy" 오류가 발생하면:
1. Supabase Dashboard → Authentication → Policies 확인
2. 해당 테이블의 정책이 올바르게 설정되었는지 확인
3. `auth.uid()`가 올바른 사용자 ID를 반환하는지 확인

### 트리거 실행 오류
트리거가 작동하지 않으면:
1. SQL Editor에서 `SELECT * FROM pg_trigger` 실행하여 트리거 확인
2. 함수가 올바르게 생성되었는지 확인
3. 트리거 재생성 시도

## 📚 추가 리소스

- [Supabase 공식 문서](https://supabase.com/docs)
- [RLS 가이드](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL 트리거 문서](https://www.postgresql.org/docs/current/triggers.html)
