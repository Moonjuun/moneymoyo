import { useEffect, useState } from "react";
import {
  getTransactions,
  createTransaction,
  WalletTransaction,
  CurrencyType,
  TransactionType,
} from "../services/wallet";

/**
 * 지갑 트랜잭션 내역을 관리하는 훅
 */
export function useWalletTransactions(
  userId: string | null,
  currency?: CurrencyType,
  limit: number = 50
) {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTransactions = async () => {
    if (!userId) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getTransactions(userId, currency, limit);
      setTransactions(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [userId, currency, limit]);

  const refresh = () => loadTransactions();

  const addTransaction = async (
    currency: CurrencyType,
    amount: number,
    transactionType: TransactionType,
    description?: string,
    referenceId?: string
  ) => {
    if (!userId) throw new Error("User ID is required");

    try {
      const transaction = await createTransaction(
        userId,
        currency,
        amount,
        transactionType,
        description,
        referenceId
      );
      await refresh();
      return transaction;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    transactions,
    loading,
    error,
    refresh,
    addTransaction,
  };
}
