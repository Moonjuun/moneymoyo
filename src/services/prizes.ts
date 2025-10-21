import { supabase } from "../lib/supabase";
import { Tables, TablesInsert } from "../lib/database.types";

export type Prize = Tables<"prizes">;
export type PrizeEntry = Tables<"prize_entries">;
export type PrizeEntryInsert = TablesInsert<"prize_entries">;
export type PrizePityCounter = Tables<"prize_pity_counters">;

/**
 * 활성화된 경품 목록 조회 (display_order 순)
 */
export async function getActivePrizes(): Promise<Prize[]> {
  const { data, error } = await supabase
    .from("prizes")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * 특정 경품 조회
 */
export async function getPrize(prizeId: string): Promise<Prize> {
  const { data, error } = await supabase
    .from("prizes")
    .select("*")
    .eq("id", prizeId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * 사용자의 경품 응모 내역 조회
 */
export async function getUserPrizeEntries(
  userId: string
): Promise<PrizeEntry[]> {
  const { data, error } = await supabase
    .from("prize_entries")
    .select("*, prizes(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * 경품 응모하기
 */
export async function enterPrize(
  entry: PrizeEntryInsert
): Promise<PrizeEntry> {
  const { data, error } = await supabase
    .from("prize_entries")
    .insert(entry)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 사용자의 특정 경품 천장 카운터 조회
 */
export async function getPityCounter(
  userId: string,
  prizeId: string
): Promise<PrizePityCounter | null> {
  const { data, error } = await supabase
    .from("prize_pity_counters")
    .select("*")
    .eq("user_id", userId)
    .eq("prize_id", prizeId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/**
 * 천장 카운터 증가
 */
export async function incrementPityCounter(
  userId: string,
  prizeId: string
): Promise<PrizePityCounter> {
  const current = await getPityCounter(userId, prizeId);

  if (current) {
    // 기존 카운터 증가
    const { data, error } = await supabase
      .from("prize_pity_counters")
      .update({
        current_count: current.current_count + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("prize_id", prizeId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    // 새 카운터 생성
    const { data, error } = await supabase
      .from("prize_pity_counters")
      .insert({
        user_id: userId,
        prize_id: prizeId,
        current_count: 1,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

/**
 * 천장 카운터 리셋
 */
export async function resetPityCounter(
  userId: string,
  prizeId: string
): Promise<void> {
  const { error } = await supabase
    .from("prize_pity_counters")
    .update({
      current_count: 0,
      last_reset_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("prize_id", prizeId);

  if (error) throw error;
}

/**
 * 경품과 천장 정보를 함께 조회
 */
export interface PrizeWithPity extends Prize {
  pityCount: number;
  pityPercentage: number;
}

export async function getPrizesWithPity(
  userId: string
): Promise<PrizeWithPity[]> {
  const prizes = await getActivePrizes();

  return Promise.all(
    prizes.map(async (prize) => {
      const pityCounter = await getPityCounter(userId, prize.id);
      const pityCount = pityCounter?.current_count || 0;
      const pityPercentage = (pityCount / prize.pity_threshold) * 100;

      return {
        ...prize,
        pityCount,
        pityPercentage,
      };
    })
  );
}
