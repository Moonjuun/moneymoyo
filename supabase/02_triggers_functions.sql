-- ============================================================================
-- Database Triggers and Functions
-- ============================================================================
-- 이 파일을 Supabase SQL Editor에서 실행하세요.
-- ============================================================================

-- ============================================================================
-- 1. Updated_at 자동 업데이트 함수
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 기존 트리거 삭제 후 재생성

-- Profiles 테이블
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Missions 테이블
DROP TRIGGER IF EXISTS update_missions_updated_at ON public.missions;
CREATE TRIGGER update_missions_updated_at
    BEFORE UPDATE ON public.missions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Posts 테이블
DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Comments 테이블
DROP TRIGGER IF EXISTS update_comments_updated_at ON public.comments;
CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON public.comments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Prizes 테이블
DROP TRIGGER IF EXISTS update_prizes_updated_at ON public.prizes;
CREATE TRIGGER update_prizes_updated_at
    BEFORE UPDATE ON public.prizes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Reward Products 테이블
DROP TRIGGER IF EXISTS update_reward_products_updated_at ON public.reward_products;
CREATE TRIGGER update_reward_products_updated_at
    BEFORE UPDATE ON public.reward_products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Withdrawal Requests 테이블
DROP TRIGGER IF EXISTS update_withdrawal_requests_updated_at ON public.withdrawal_requests;
CREATE TRIGGER update_withdrawal_requests_updated_at
    BEFORE UPDATE ON public.withdrawal_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Prize Pity Counters 테이블
DROP TRIGGER IF EXISTS update_prize_pity_counters_updated_at ON public.prize_pity_counters;
CREATE TRIGGER update_prize_pity_counters_updated_at
    BEFORE UPDATE ON public.prize_pity_counters
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 2. 추천 코드 생성 함수
-- ============================================================================

CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := '';
    i INT;
BEGIN
    FOR i IN 1..8 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::INT, 1);
    END LOOP;

    -- 중복 확인
    IF EXISTS (SELECT 1 FROM public.profiles WHERE referral_code = result) THEN
        RETURN public.generate_referral_code();
    END IF;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 3. 신규 사용자 프로필 자동 생성 트리거
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, referral_code)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::TEXT, 1, 8)),
        public.generate_referral_code()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성 (auth.users 테이블에 사용자 생성 시 자동 실행)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 4. 게시글 통계 자동 업데이트
-- ============================================================================

-- 댓글 수 증가
CREATE OR REPLACE FUNCTION public.increment_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.posts
    SET comment_count = comment_count + 1
    WHERE id = NEW.post_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_comment_created ON public.comments;
CREATE TRIGGER on_comment_created
    AFTER INSERT ON public.comments
    FOR EACH ROW
    EXECUTE FUNCTION public.increment_post_comment_count();

-- 댓글 수 감소 (삭제 시)
CREATE OR REPLACE FUNCTION public.decrement_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_deleted = true AND OLD.is_deleted = false THEN
        UPDATE public.posts
        SET comment_count = GREATEST(comment_count - 1, 0)
        WHERE id = NEW.post_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_comment_deleted ON public.comments;
CREATE TRIGGER on_comment_deleted
    AFTER UPDATE ON public.comments
    FOR EACH ROW
    EXECUTE FUNCTION public.decrement_post_comment_count();