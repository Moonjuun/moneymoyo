# Mock 데이터 추가 가이드

앱에서 데이터가 보이도록 하기 위해 Supabase에 샘플 데이터를 추가하는 방법을 안내합니다.

## 단계별 가이드

### 1단계: Supabase 대시보드 접속

1. [Supabase 대시보드](https://app.supabase.com)에 로그인
2. 프로젝트 선택
3. 왼쪽 메뉴에서 **SQL Editor** 클릭

### 2단계: 샘플 데이터 추가

아래 SQL 파일들을 순서대로 실행하세요:

#### 2-1. 미션, 경품, 리워드 상품 데이터 추가

```sql
-- supabase/03_sample_data.sql 파일의 내용을 복사하여 실행
-- 또는 아래 명령어를 실행:
```

**SQL Editor에서 실행할 내용:**

1. `supabase/03_sample_data.sql` 파일 열기
2. 1~50번 라인까지 복사 (미션, 경품, 리워드 상품 데이터)
3. SQL Editor에 붙여넣기
4. **RUN** 버튼 클릭

결과:
- ✅ 9개의 미션 추가됨
- ✅ 5개의 경품 추가됨
- ✅ 6개의 리워드 상품 추가됨

#### 2-2. 초기 재화 지급 (포인트 & 티켓)

**앱에서 먼저 로그인/회원가입을 완료하세요!**

그 다음, SQL Editor에서 실행:

```sql
-- 모든 사용자에게 초기 포인트와 티켓 지급
UPDATE public.profiles
SET
    points = GREATEST(points, 10000),  -- 최소 10,000 포인트 보장
    tickets = GREATEST(tickets, 50)    -- 최소 50 티켓 보장
WHERE points < 10000 OR tickets < 50;
```

또는 `supabase/04_add_initial_balance.sql` 파일을 실행하세요.

결과:
- ✅ 포인트: 10,000P 지급
- ✅ 티켓: 50장 지급

#### 2-3. 게시판 샘플 데이터 추가

**중요: 앱에서 먼저 로그인/회원가입을 완료해야 합니다!**

SQL Editor에서 실행:

```sql
-- supabase/03_sample_data.sql 파일의 게시판 데이터 부분 (52번 라인부터)
-- 또는 아래 코드를 직접 실행:
```

1. `supabase/03_sample_data.sql` 파일 열기
2. 52번 라인부터 끝까지 복사 (게시판 샘플 데이터)
3. SQL Editor에 붙여넣기
4. **RUN** 버튼 클릭

결과:
- ✅ 12개의 게시글 추가됨 (절약 팁 3개, 혜택 정보 3개, 무료행사 3개, 일반 3개)

### 3단계: 데이터 확인

SQL Editor에서 다음 쿼리를 실행하여 데이터가 잘 추가되었는지 확인:

```sql
-- 미션 확인
SELECT COUNT(*) as mission_count FROM public.missions WHERE is_active = true;

-- 경품 확인
SELECT COUNT(*) as prize_count FROM public.prizes WHERE is_active = true;

-- 리워드 상품 확인
SELECT COUNT(*) as product_count FROM public.reward_products WHERE is_active = true;

-- 사용자 재화 확인
SELECT username, points, tickets FROM public.profiles;

-- 게시글 확인
SELECT COUNT(*) as post_count FROM public.posts WHERE is_deleted = false;
```

예상 결과:
- mission_count: 9
- prize_count: 5
- product_count: 6
- points: 10000
- tickets: 50
- post_count: 12

### 4단계: 앱에서 확인

1. 앱을 재시작하거나 새로고침
2. 각 화면 확인:
   - **홈 화면**: 포인트, 티켓, 미션 4개, 게시글 5개 표시
   - **미션 화면**: 데일리 미션 3개, 게임 미션 6개 표시
   - **응모 화면**: 티켓 50장, 경품 5개 표시
   - **게시판 화면**: 게시글 12개 표시

## 문제 해결

### 게시글이 안 보이는 경우

```sql
-- 사용자가 있는지 확인
SELECT id, username FROM public.profiles;
```

사용자가 없다면:
1. 앱에서 로그인/회원가입
2. 다시 게시판 샘플 데이터 추가 (2-3단계)

### 포인트/티켓이 안 보이는 경우

```sql
-- 현재 재화 확인
SELECT username, points, tickets FROM public.profiles;

-- 재화 다시 지급
UPDATE public.profiles
SET points = 10000, tickets = 50
WHERE id = 'YOUR_USER_ID';
```

### 미션/경품이 안 보이는 경우

```sql
-- is_active 확인
SELECT id, title, is_active FROM public.missions;
SELECT id, name, is_active FROM public.prizes;

-- is_active를 true로 변경
UPDATE public.missions SET is_active = true;
UPDATE public.prizes SET is_active = true;
UPDATE public.reward_products SET is_active = true;
```

## 추가 정보

- 모든 샘플 데이터는 테스트용이므로 실제 서비스에서는 삭제하고 실제 데이터로 교체하세요.
- RLS(Row Level Security) 정책이 적용되어 있으므로, 앱에서 로그인한 사용자만 자신의 데이터를 볼 수 있습니다.
- 더 많은 샘플 데이터가 필요하면 `03_sample_data.sql` 파일을 수정하여 추가하세요.
