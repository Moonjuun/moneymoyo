import { supabase } from "../lib/supabase";
import { Tables, TablesInsert } from "../lib/database.types";

export type Mission = Tables<"missions">;
export type MissionCompletion = Tables<"mission_completions">;
export type MissionCompletionInsert = TablesInsert<"mission_completions">;

/**
 * 활성화된 미션 목록 조회 (display_order 순)
 */
export async function getActiveMissions(): Promise<Mission[]> {
  const { data, error } = await supabase
    .from("missions")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * 특정 미션 조회
 */
export async function getMission(missionId: string): Promise<Mission> {
  const { data, error } = await supabase
    .from("missions")
    .select("*")
    .eq("id", missionId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * 오늘 완료한 미션 목록 조회
 */
export async function getTodayCompletions(
  userId: string
): Promise<MissionCompletion[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("mission_completions")
    .select("*")
    .eq("user_id", userId)
    .gte("completed_at", today.toISOString())
    .order("completed_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * 특정 미션의 오늘 완료 횟수 조회
 */
export async function getTodayCompletionCount(
  userId: string,
  missionId: string
): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("mission_completions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("mission_id", missionId)
    .gte("completed_at", today.toISOString());

  if (error) throw error;
  return count || 0;
}

/**
 * 미션 완료 기록
 */
export async function completeMission(
  completion: MissionCompletionInsert
): Promise<MissionCompletion> {
  const { data, error } = await supabase
    .from("mission_completions")
    .insert(completion)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 미션 완료 가능 여부 확인
 */
export async function canCompleteMission(
  userId: string,
  missionId: string
): Promise<{ canComplete: boolean; reason?: string }> {
  // 미션 정보 조회
  const mission = await getMission(missionId);

  // 활성화 여부 확인
  if (!mission.is_active) {
    return { canComplete: false, reason: "비활성화된 미션입니다." };
  }

  // 일일 제한 확인
  if (mission.daily_limit) {
    const todayCount = await getTodayCompletionCount(userId, missionId);
    if (todayCount >= mission.daily_limit) {
      return {
        canComplete: false,
        reason: "오늘 완료 횟수를 초과했습니다.",
      };
    }
  }

  return { canComplete: true };
}

/**
 * 미션과 완료 정보를 함께 조회 (통합 데이터)
 */
export interface MissionWithProgress extends Mission {
  todayCompletionCount: number;
  canComplete: boolean;
}

export async function getMissionsWithProgress(
  userId: string
): Promise<MissionWithProgress[]> {
  const missions = await getActiveMissions();
  const todayCompletions = await getTodayCompletions(userId);

  return Promise.all(
    missions.map(async (mission) => {
      const completionCount = todayCompletions.filter(
        (c) => c.mission_id === mission.id
      ).length;

      const canComplete =
        !mission.daily_limit || completionCount < mission.daily_limit;

      return {
        ...mission,
        todayCompletionCount: completionCount,
        canComplete,
      };
    })
  );
}
