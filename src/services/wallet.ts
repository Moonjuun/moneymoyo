import { supabase } from "../lib/supabase";
import { Tables, TablesInsert, Enums } from "../lib/database.types";
import { getProfile, updateProfile } from "./profile";

export type WalletTransaction = Tables<"wallet_transactions">;
export type WalletTransactionInsert = TablesInsert<"wallet_transactions">;
export type CurrencyType = Enums<"currency_type">;
export type TransactionType = Enums<"transaction_type">;

/**
 * 지갑 트랜잭션 생성 (포인트/티켓 변경 시 자동으로 기록)
 */
export async function createTransaction(
  userId: string,
  currency: CurrencyType,
  amount: number,
  transactionType: TransactionType,
  description?: string,
  referenceId?: string
): Promise<WalletTransaction> {
  // 현재 프로필 조회
  const profile = await getProfile(userId);

  // 현재 잔액
  const currentBalance =
    currency === "points" ? profile.points : profile.tickets;

  // 새 잔액 계산
  const newBalance = Math.max(0, currentBalance + amount);

  // 잔액이 부족한 경우
  if (amount < 0 && currentBalance + amount < 0) {
    throw new Error(`${currency === "points" ? "포인트" : "티켓"}가 부족합니다.`);
  }

  // 프로필 업데이트
  await updateProfile(userId, {
    [currency]: newBalance,
  });

  // 트랜잭션 기록
  const transaction: WalletTransactionInsert = {
    user_id: userId,
    currency,
    amount,
    balance_after: newBalance,
    transaction_type: transactionType,
    description,
    reference_id: referenceId,
  };

  const { data, error } = await supabase
    .from("wallet_transactions")
    .insert(transaction)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 사용자의 트랜잭션 내역 조회
 */
export async function getTransactions(
  userId: string,
  currency?: CurrencyType,
  limit: number = 50
): Promise<WalletTransaction[]> {
  let query = supabase
    .from("wallet_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (currency) {
    query = query.eq("currency", currency);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

/**
 * 포인트 추가
 */
export async function addPoints(
  userId: string,
  amount: number,
  transactionType: TransactionType,
  description?: string,
  referenceId?: string
): Promise<WalletTransaction> {
  return createTransaction(
    userId,
    "points",
    amount,
    transactionType,
    description,
    referenceId
  );
}

/**
 * 포인트 차감
 */
export async function deductPoints(
  userId: string,
  amount: number,
  transactionType: TransactionType,
  description?: string,
  referenceId?: string
): Promise<WalletTransaction> {
  return createTransaction(
    userId,
    "points",
    -amount,
    transactionType,
    description,
    referenceId
  );
}

/**
 * 티켓 추가
 */
export async function addTickets(
  userId: string,
  amount: number,
  transactionType: TransactionType,
  description?: string,
  referenceId?: string
): Promise<WalletTransaction> {
  return createTransaction(
    userId,
    "tickets",
    amount,
    transactionType,
    description,
    referenceId
  );
}

/**
 * 티켓 차감
 */
export async function deductTickets(
  userId: string,
  amount: number,
  transactionType: TransactionType,
  description?: string,
  referenceId?: string
): Promise<WalletTransaction> {
  return createTransaction(
    userId,
    "tickets",
    -amount,
    transactionType,
    description,
    referenceId
  );
}

/**
 * 출금 요청 관련 타입
 */
export type WithdrawalRequest = Tables<"withdrawal_requests">;
export type WithdrawalRequestInsert = TablesInsert<"withdrawal_requests">;
export type WithdrawalStatus = Enums<"withdrawal_status">;

/**
 * 출금 요청 생성
 */
export async function createWithdrawalRequest(
  request: WithdrawalRequestInsert
): Promise<WithdrawalRequest> {
  const { data, error } = await supabase
    .from("withdrawal_requests")
    .insert(request)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 사용자의 출금 요청 내역 조회
 */
export async function getWithdrawalRequests(
  userId: string
): Promise<WithdrawalRequest[]> {
  const { data, error } = await supabase
    .from("withdrawal_requests")
    .select("*, product:reward_products(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}
