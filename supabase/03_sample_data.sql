-- ============================================================================
-- Sample Data for Testing
-- ============================================================================
-- 이 파일을 Supabase SQL Editor에서 실행하세요.
-- 테스트용 샘플 데이터를 생성합니다.
-- ============================================================================

-- ============================================================================
-- 1. 미션 샘플 데이터
-- ============================================================================

INSERT INTO public.missions (title, description, mission_type, reward_currency, reward_amount, daily_limit, is_active, display_order)
VALUES
    ('출석 체크', '매일 앱에 접속하여 출석 체크하기', 'daily_attendance', 'points', 50, 1, true, 1),
    ('광고 시청', '광고를 시청하고 포인트 받기', 'watch_ad', 'points', 100, 5, true, 2),
    ('친구 초대', '친구를 초대하고 보상 받기', 'referral', 'tickets', 10, NULL, true, 3),
    ('맞춤법 게임', '맞춤법 게임을 플레이하고 티켓 받기', 'minigame_spelling', 'tickets', 5, 3, true, 4),
    ('숫자 게임', '숫자 게임을 플레이하고 티켓 받기', 'minigame_number', 'tickets', 5, 3, true, 5),
    ('색깔 맞추기', '색깔 맞추기 게임을 플레이하고 티켓 받기', 'minigame_color', 'tickets', 5, 3, true, 6),
    ('국기 맞추기', '국기 맞추기 게임을 플레이하고 티켓 받기', 'minigame_flag', 'tickets', 5, 3, true, 7),
    ('반응속도 테스트', '반응속도 테스트를 하고 티켓 받기', 'minigame_reaction', 'tickets', 5, 3, true, 8),
    ('데시벨 측정', '데시벨 측정 게임을 플레이하고 티켓 받기', 'minigame_decibel', 'tickets', 5, 3, true, 9)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 2. 경품 샘플 데이터
-- ============================================================================

INSERT INTO public.prizes (name, description, image_url, tickets_per_entry, pity_threshold, pity_reward_currency, pity_reward_amount, is_active, display_order)
VALUES
    ('아이폰 15 Pro', '최신 아이폰 15 Pro 256GB', NULL, 100, 100, 'points', 10000, true, 1),
    ('스타벅스 아메리카노', '스타벅스 아메리카노 기프티콘', NULL, 10, 50, 'points', 5000, true, 2),
    ('5만원 문화상품권', 'CGV, 교보문고 등에서 사용 가능', NULL, 50, 75, 'points', 7500, true, 3),
    ('넷플릭스 3개월 이용권', '넷플릭스 스탠다드 3개월 이용권', NULL, 30, 60, 'points', 6000, true, 4),
    ('치킨 기프티콘', 'BBQ, 교촌 등 치킨 기프티콘', NULL, 20, 50, 'points', 5000, true, 5)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 3. 리워드 상품 샘플 데이터
-- ============================================================================

INSERT INTO public.reward_products (name, description, image_url, points_required, stock, is_active, display_order)
VALUES
    ('스타벅스 아메리카노', '스타벅스 아메리카노 Tall 사이즈', NULL, 4500, 100, true, 1),
    ('CU 편의점 5000원권', 'CU 편의점에서 사용 가능한 5000원 상품권', NULL, 5000, 50, true, 2),
    ('GS25 편의점 5000원권', 'GS25 편의점에서 사용 가능한 5000원 상품권', NULL, 5000, 50, true, 3),
    ('맥도날드 빅맥 세트', '맥도날드 빅맥 세트 기프티콘', NULL, 6000, 30, true, 4),
    ('CGV 영화 관람권', 'CGV 영화 관람권 1매', NULL, 12000, 20, true, 5),
    ('10000원 문화상품권', '교보문고, YES24 등에서 사용 가능', NULL, 10000, 10, true, 6)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 4. 게시판 샘플 데이터 (테스트 계정 필요)
-- ============================================================================
-- 참고: 실제 사용자 ID가 필요하므로, 앱에서 직접 생성하거나
-- 테스트 계정 생성 후 해당 ID를 사용해야 합니다.
--
-- 예시:
-- INSERT INTO public.posts (author_id, title, content, category)
-- VALUES
--     ('USER_ID_HERE', '스타벅스 50% 할인 이벤트', '이번 주말까지...', 'benefits'),
--     ('USER_ID_HERE', '적금 이자 비교', '요즘 금리 좋은 적금...', 'savings');
