-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================
-- 이 파일을 Supabase SQL Editor에서 실행하세요.
-- ============================================================================

-- ============================================================================
-- 1. Profiles 테이블 RLS
-- ============================================================================

-- RLS 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 자신의 프로필 조회 가능
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- 모든 사용자가 다른 사용자의 기본 정보 조회 가능 (작성자 정보 등)
CREATE POLICY "Users can view other profiles' public info"
ON public.profiles
FOR SELECT
USING (true);

-- 사용자는 자신의 프로필만 수정 가능
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- ============================================================================
-- 2. Missions 테이블 RLS
-- ============================================================================

ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;

-- 모든 인증된 사용자가 활성화된 미션 조회 가능
CREATE POLICY "Authenticated users can view active missions"
ON public.missions
FOR SELECT
USING (auth.role() = 'authenticated' AND is_active = true);

-- ============================================================================
-- 3. Mission Completions 테이블 RLS
-- ============================================================================

ALTER TABLE public.mission_completions ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 미션 완료 기록만 조회 가능
CREATE POLICY "Users can view their own mission completions"
ON public.mission_completions
FOR SELECT
USING (auth.uid() = user_id);

-- 사용자는 자신의 미션 완료 기록만 생성 가능
CREATE POLICY "Users can insert their own mission completions"
ON public.mission_completions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 4. Posts 테이블 RLS
-- ============================================================================

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 모든 인증된 사용자가 삭제되지 않은 게시글 조회 가능
CREATE POLICY "Authenticated users can view non-deleted posts"
ON public.posts
FOR SELECT
USING (auth.role() = 'authenticated' AND is_deleted = false);

-- 사용자는 게시글 작성 가능
CREATE POLICY "Authenticated users can create posts"
ON public.posts
FOR INSERT
WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);

-- 사용자는 자신의 게시글만 수정 가능
CREATE POLICY "Users can update their own posts"
ON public.posts
FOR UPDATE
USING (auth.uid() = author_id);

-- ============================================================================
-- 5. Comments 테이블 RLS
-- ============================================================================

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 모든 인증된 사용자가 삭제되지 않은 댓글 조회 가능
CREATE POLICY "Authenticated users can view non-deleted comments"
ON public.comments
FOR SELECT
USING (auth.role() = 'authenticated' AND is_deleted = false);

-- 사용자는 댓글 작성 가능
CREATE POLICY "Authenticated users can create comments"
ON public.comments
FOR INSERT
WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);

-- 사용자는 자신의 댓글만 수정 가능
CREATE POLICY "Users can update their own comments"
ON public.comments
FOR UPDATE
USING (auth.uid() = author_id);

-- ============================================================================
-- 6. Prizes 테이블 RLS
-- ============================================================================

ALTER TABLE public.prizes ENABLE ROW LEVEL SECURITY;

-- 모든 인증된 사용자가 활성화된 경품 조회 가능
CREATE POLICY "Authenticated users can view active prizes"
ON public.prizes
FOR SELECT
USING (auth.role() = 'authenticated' AND is_active = true);

-- ============================================================================
-- 7. Prize Entries 테이블 RLS
-- ============================================================================

ALTER TABLE public.prize_entries ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 경품 응모 기록만 조회 가능
CREATE POLICY "Users can view their own prize entries"
ON public.prize_entries
FOR SELECT
USING (auth.uid() = user_id);

-- 사용자는 자신의 경품 응모 기록만 생성 가능
CREATE POLICY "Users can insert their own prize entries"
ON public.prize_entries
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 8. Prize Pity Counters 테이블 RLS
-- ============================================================================

ALTER TABLE public.prize_pity_counters ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 천장 카운터만 조회 가능
CREATE POLICY "Users can view their own pity counters"
ON public.prize_pity_counters
FOR SELECT
USING (auth.uid() = user_id);

-- 사용자는 자신의 천장 카운터만 생성/수정 가능
CREATE POLICY "Users can manage their own pity counters"
ON public.prize_pity_counters
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 9. Reward Products 테이블 RLS
-- ============================================================================

ALTER TABLE public.reward_products ENABLE ROW LEVEL SECURITY;

-- 모든 인증된 사용자가 활성화된 상품 조회 가능
CREATE POLICY "Authenticated users can view active reward products"
ON public.reward_products
FOR SELECT
USING (auth.role() = 'authenticated' AND is_active = true);

-- ============================================================================
-- 10. Wallet Transactions 테이블 RLS
-- ============================================================================

ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 트랜잭션만 조회 가능
CREATE POLICY "Users can view their own transactions"
ON public.wallet_transactions
FOR SELECT
USING (auth.uid() = user_id);

-- 사용자는 자신의 트랜잭션만 생성 가능
CREATE POLICY "Users can insert their own transactions"
ON public.wallet_transactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 11. Withdrawal Requests 테이블 RLS
-- ============================================================================

ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 출금 요청만 조회 가능
CREATE POLICY "Users can view their own withdrawal requests"
ON public.withdrawal_requests
FOR SELECT
USING (auth.uid() = user_id);

-- 사용자는 자신의 출금 요청만 생성 가능
CREATE POLICY "Users can insert their own withdrawal requests"
ON public.withdrawal_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);
