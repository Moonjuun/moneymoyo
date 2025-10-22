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
-- 4. 게시판 샘플 데이터
-- ============================================================================
-- 주의: 이 스크립트를 실행하기 전에 먼저 앱에서 로그인하여
-- profiles 테이블에 사용자 데이터가 생성되어야 합니다.
-- 그 후 아래 쿼리로 사용자 ID를 확인하세요:
-- SELECT id, username FROM public.profiles LIMIT 1;
--
-- 확인한 사용자 ID를 아래 변수에 설정하고 실행하세요.

DO $$
DECLARE
    test_user_id UUID;
BEGIN
    -- 첫 번째 사용자 ID 가져오기 (없으면 샘플 게시글 생성 건너뜀)
    SELECT id INTO test_user_id FROM public.profiles LIMIT 1;

    IF test_user_id IS NOT NULL THEN
        -- 절약 팁 게시글
        INSERT INTO public.posts (author_id, title, content, category)
        VALUES
            (test_user_id, '편의점 1+1 행사 총정리', '이번 주 편의점 1+1 행사 상품 정리했습니다!\n\nCU: 삼각김밥, 샌드위치\nGS25: 음료수, 과자\n세븐일레븐: 도시락, 컵라면\n\n꼭 확인하시고 알뜰하게 장보세요!', 'savings'),
            (test_user_id, '교통비 절약 꿀팁', '대중교통 이용시 카드 할인 혜택 정리\n\n신한 체크카드: 20% 할인\n국민 체크카드: 10% 할인 + 포인트 적립\n\n월 만원 이상 절약 가능합니다!', 'savings'),
            (test_user_id, '통신비 아끼는 법', '알뜰폰으로 바꾸면 월 2~3만원 절약!\n\n제가 쓰는 알뜰폰 추천합니다.\n속도도 괜찮고 요금제도 다양해요.', 'savings');

        -- 혜택 정보 게시글
        INSERT INTO public.posts (author_id, title, content, category)
        VALUES
            (test_user_id, '스타벅스 50% 할인 이벤트', '이번 주말까지 스타벅스 앱에서 아메리카노 50% 할인!\n\n조건: 신규 가입자 또는 3개월 미이용자\n할인코드: SPRING2024\n\n놓치지 마세요!', 'benefits'),
            (test_user_id, '신용카드 캐시백 이벤트', '○○카드 5% 캐시백 이벤트\n\n기간: 이번달 말까지\n대상: 온라인 쇼핑몰 결제\n한도: 월 5만원\n\n꼭 챙기세요!', 'benefits'),
            (test_user_id, '배달앱 첫 주문 할인', '○○배달 신규 가입하면 첫 주문 5천원 할인!\n\n추가로 친구 초대하면 3천원 더 할인\n총 8천원 할인 받을 수 있어요.', 'benefits');

        -- 무료행사 게시글
        INSERT INTO public.posts (author_id, title, content, category)
        VALUES
            (test_user_id, '주말 무료 영화 상영회', '이번 주말 ○○구청에서 무료 영화 상영합니다!\n\n일시: 토요일 오후 7시\n장소: ○○구청 야외공연장\n영화: 최신 개봉작\n\n가족들과 함께 가세요!', 'free_events'),
            (test_user_id, '무료 체험 행사 안내', '△△백화점 신제품 무료 체험 행사\n\n기간: 이번주 내내\n장소: 1층 이벤트홀\n체험 상품: 화장품, 건강식품 등\n\n선착순 기념품도 준답니다!', 'free_events'),
            (test_user_id, '공원에서 무료 운동 강습', '매주 토요일 아침 공원에서 무료 요가 수업!\n\n시간: 오전 8시~9시\n준비물: 요가매트만 있으면 됩니다\n강사: 전문 요가 강사님\n\n건강도 챙기고 돈도 아껴요!', 'free_events');

        -- 일반 게시글
        INSERT INTO public.posts (author_id, title, content, category)
        VALUES
            (test_user_id, '적금 이자 비교해봤어요', '요즘 금리 좋은 적금 알아봤습니다.\n\n1. ○○은행: 연 4.5%\n2. △△은행: 연 4.3% + 우대금리 0.3%\n3. □□저축은행: 연 5.0%\n\n저는 2번으로 가입했어요!', 'general'),
            (test_user_id, '포인트 현금화 어디가 좋나요?', '쌓인 포인트 현금으로 바꾸려고 하는데\n어디가 제일 환율 좋은가요?\n\n추천 부탁드립니다!', 'general'),
            (test_user_id, '머니모여 앱 정말 좋네요!', '미션하면서 재미도 있고 포인트도 모이고\n완전 유용한 앱이에요!\n\n다들 열심히 해봐요 ㅎㅎ', 'general');

        RAISE NOTICE '게시판 샘플 데이터가 성공적으로 추가되었습니다.';
    ELSE
        RAISE NOTICE '사용자가 없어 게시판 샘플 데이터를 추가하지 않았습니다. 먼저 앱에서 로그인하세요.';
    END IF;
END $$;
