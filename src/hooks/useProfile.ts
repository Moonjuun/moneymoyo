import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  subscribeToProfile,
  Profile,
  ProfileUpdate,
} from "../services/profile";

/**
 * 프로필 데이터를 관리하는 훅
 */
export function useProfile(userId: string | null) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 프로필 데이터 로드
  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProfile(userId);
        if (isMounted) {
          setProfile(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // 실시간 업데이트 구독
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToProfile(userId, (updatedProfile) => {
      setProfile(updatedProfile);
    });

    return unsubscribe;
  }, [userId]);

  // 프로필 업데이트 함수
  const update = async (updates: ProfileUpdate) => {
    if (!userId) throw new Error("User ID is required");

    try {
      const updatedProfile = await updateProfile(userId, updates);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  // 프로필 새로고침
  const refresh = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getProfile(userId);
      setProfile(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    update,
    refresh,
  };
}
