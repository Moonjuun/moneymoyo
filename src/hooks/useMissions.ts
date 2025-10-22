import { useEffect, useState } from "react";
import {
  getActiveMissions,
  getMissionsWithProgress,
  completeMission,
  canCompleteMission,
  Mission,
  MissionWithProgress,
  MissionCompletionInsert,
} from "../services/missions";

/**
 * 미션 목록을 관리하는 훅
 */
export function useMissions(userId: string | null) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadMissions() {
      try {
        setLoading(true);
        setError(null);
        const data = await getActiveMissions();
        if (isMounted) {
          setMissions(data);
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

    loadMissions();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getActiveMissions();
      setMissions(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    missions,
    loading,
    error,
    refresh,
  };
}

/**
 * 진행도와 함께 미션 목록을 관리하는 훅
 */
export function useMissionsWithProgress(userId: string | null) {
  const [missions, setMissions] = useState<MissionWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadMissions = async () => {
    if (!userId) {
      setMissions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getMissionsWithProgress(userId);
      setMissions(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMissions();
  }, [userId]);

  const refresh = () => loadMissions();

  const complete = async (completion: MissionCompletionInsert) => {
    try {
      // 완료 가능 여부 확인
      const { canComplete, reason } = await canCompleteMission(
        completion.user_id,
        completion.mission_id
      );

      if (!canComplete) {
        throw new Error(reason || "미션을 완료할 수 없습니다.");
      }

      // 미션 완료
      const result = await completeMission(completion);

      // 목록 새로고침
      await refresh();

      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    missions,
    loading,
    error,
    refresh,
    complete,
  };
}
