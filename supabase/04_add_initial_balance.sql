-- ============================================================================
-- 기존 사용자에게 초기 재화 지급
-- ============================================================================
-- 이 스크립트는 이미 가입한 사용자들에게 테스트용 포인트와 티켓을 지급합니다.
-- ============================================================================

-- 모든 사용자에게 초기 포인트와 티켓 지급
UPDATE public.profiles
SET
    points = GREATEST(points, 10000),  -- 최소 10,000 포인트 보장
    tickets = GREATEST(tickets, 50)    -- 최소 50 티켓 보장
WHERE points < 10000 OR tickets < 50;

-- 결과 확인
SELECT
    id,
    username,
    points,
    tickets,
    created_at
FROM public.profiles
ORDER BY created_at DESC;
