import { useEffect, useState } from "react";
import {
  getActivePrizes,
  getPrizesWithPity,
  getUserPrizeEntries,
  enterPrize,
  Prize,
  PrizeWithPity,
  PrizeEntry,
  PrizeEntryInsert,
} from "../services/prizes";

/**
 * 경품 목록을 관리하는 훅
 */
export function usePrizes(userId: string | null) {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPrizes() {
      try {
        setLoading(true);
        setError(null);
        const data = await getActivePrizes();
        if (isMounted) {
          setPrizes(data);
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

    loadPrizes();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getActivePrizes();
      setPrizes(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    prizes,
    loading,
    error,
    refresh,
  };
}

/**
 * 천장 정보와 함께 경품 목록을 관리하는 훅
 */
export function usePrizesWithPity(userId: string | null) {
  const [prizes, setPrizes] = useState<PrizeWithPity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadPrizes = async () => {
    if (!userId) {
      setPrizes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getPrizesWithPity(userId);
      setPrizes(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrizes();
  }, [userId]);

  const refresh = () => loadPrizes();

  const enter = async (entry: PrizeEntryInsert) => {
    try {
      const result = await enterPrize(entry);
      await refresh();
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    prizes,
    loading,
    error,
    refresh,
    enter,
  };
}

/**
 * 사용자의 경품 응모 내역을 관리하는 훅
 */
export function usePrizeEntries(userId: string | null) {
  const [entries, setEntries] = useState<PrizeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadEntries = async () => {
    if (!userId) {
      setEntries([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getUserPrizeEntries(userId);
      setEntries(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, [userId]);

  const refresh = () => loadEntries();

  return {
    entries,
    loading,
    error,
    refresh,
  };
}
