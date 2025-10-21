import { supabase } from "../lib/supabase";
import { Tables, TablesInsert, TablesUpdate } from "../lib/database.types";

export type Profile = Tables<"profiles">;
export type ProfileInsert = TablesInsert<"profiles">;
export type ProfileUpdate = TablesUpdate<"profiles">;

/**
 * 사용자 프로필 조회
 */
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * 프로필 생성
 */
export async function createProfile(profile: ProfileInsert) {
  const { data, error } = await supabase
    .from("profiles")
    .insert(profile)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 프로필 업데이트
 */
export async function updateProfile(userId: string, updates: ProfileUpdate) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 추천 코드로 프로필 조회
 */
export async function getProfileByReferralCode(referralCode: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("referral_code", referralCode)
    .single();

  if (error) throw error;
  return data;
}

/**
 * 추천인 코드 생성 (Supabase Function 사용)
 */
export async function generateReferralCode() {
  const { data, error } = await supabase.rpc("generate_referral_code");

  if (error) throw error;
  return data as string;
}

/**
 * 포인트 업데이트
 */
export async function updatePoints(
  userId: string,
  pointsDelta: number
): Promise<Profile> {
  // 현재 포인트 조회
  const profile = await getProfile(userId);

  // 새 포인트 계산
  const newPoints = Math.max(0, profile.points + pointsDelta);

  // 업데이트
  return updateProfile(userId, { points: newPoints });
}

/**
 * 티켓 업데이트
 */
export async function updateTickets(
  userId: string,
  ticketsDelta: number
): Promise<Profile> {
  // 현재 티켓 조회
  const profile = await getProfile(userId);

  // 새 티켓 계산
  const newTickets = Math.max(0, profile.tickets + ticketsDelta);

  // 업데이트
  return updateProfile(userId, { tickets: newTickets });
}

/**
 * 프로필 실시간 구독
 */
export function subscribeToProfile(
  userId: string,
  callback: (profile: Profile) => void
) {
  const subscription = supabase
    .channel(`profile:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "profiles",
        filter: `id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as Profile);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}
