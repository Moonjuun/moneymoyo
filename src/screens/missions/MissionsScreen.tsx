import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/theme/colors";
import { Fonts } from "../../constants/theme/fonts";
import { Spacing, BorderRadius } from "../../constants/theme/spacing";
import { useAuth } from "../../contexts/AuthContext";
import { useMissionsWithProgress } from "../../hooks/useMissions";

const { width } = Dimensions.get("window");
const CARD_PADDING = Spacing.lg;

export default function MissionsScreen() {
  const { profile } = useAuth();
  const { missions, loading, complete } = useMissionsWithProgress(profile?.id || null);

  const totalMissions = missions.length;
  const completedMissions = missions.filter((m) => !m.canComplete && m.daily_limit).length;
  const totalPoints = missions.reduce((sum, m) => sum + m.reward_amount, 0);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>미션</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 오늘의 미션 현황 카드 */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIconContainer}>
              <Ionicons name="trophy" size={20} color="#fff" />
            </View>
            <Text style={styles.statusTitle}>오늘의 미션 현황</Text>
            <View style={styles.statusBadge}>
              <Ionicons name="flash" size={14} color="#fff" />
            </View>
          </View>

          <Text style={styles.statusProgress}>
            {completedMissions} / {totalMissions} 완료
          </Text>

          <View style={styles.statusFooter}>
            <Text style={styles.statusLabel}>획득 가능한 포인트</Text>
            <Text style={styles.statusPoints}>+{totalPoints}P</Text>
          </View>
        </View>

        {/* 데일리 미션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Text style={styles.sectionTitle}>데일리 미션</Text>
          </View>

          <View style={styles.missionList}>
            {missions
              .filter((m) =>
                m.mission_type === "daily_attendance" ||
                m.mission_type === "watch_ad" ||
                m.mission_type === "referral"
              )
              .map((mission) => {
                const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
                  watch_ad: "play-circle",
                  daily_attendance: "checkmark-circle",
                  referral: "people",
                };

                const colorMap: { [key: string]: string } = {
                  watch_ad: "#14B8A6",
                  daily_attendance: "#10B981",
                  referral: "#8B5CF6",
                };

                return (
                  <MissionCard
                    key={mission.id}
                    iconName={iconMap[mission.mission_type] || "gift"}
                    iconColor={colorMap[mission.mission_type] || "#14B8A6"}
                    title={mission.title}
                    progress={mission.todayCompletionCount}
                    total={mission.daily_limit || undefined}
                    points={mission.reward_amount}
                    completed={!mission.canComplete && !!mission.daily_limit}
                  />
                );
              })}
          </View>
        </View>


        {/* 게임 미션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Text style={styles.sectionTitle}>게임 미션</Text>
          </View>

          <View style={styles.missionList}>
            {missions
              .filter((m) => m.mission_type.startsWith("minigame_"))
              .map((mission) => {
                const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
                  minigame_spelling: "game-controller",
                  minigame_number: "calculator",
                  minigame_color: "color-palette",
                  minigame_flag: "flag",
                  minigame_reaction: "flash",
                  minigame_decibel: "volume-high",
                };

                const colorMap: { [key: string]: string } = {
                  minigame_spelling: "#F59E0B",
                  minigame_number: "#3B82F6",
                  minigame_color: "#10B981",
                  minigame_flag: "#EF4444",
                  minigame_reaction: "#EC4899",
                  minigame_decibel: "#06B6D4",
                };

                return (
                  <MissionCard
                    key={mission.id}
                    iconName={iconMap[mission.mission_type] || "game-controller"}
                    iconColor={colorMap[mission.mission_type] || "#F59E0B"}
                    title={mission.title}
                    progress={mission.todayCompletionCount}
                    total={mission.daily_limit || undefined}
                    points={mission.reward_amount}
                    completed={!mission.canComplete && !!mission.daily_limit}
                  />
                );
              })}
          </View>
        </View>

        {/* 하단 여백 */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// 미션 카드 컴포넌트
interface MissionCardProps {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  progress?: number;
  total?: number;
  points?: number;
  showProgressBar?: boolean;
  completed?: boolean;
}

function MissionCard({
  iconName,
  iconColor,
  title,
  progress = 0,
  total,
  points,
  showProgressBar = false,
  completed = false,
}: MissionCardProps) {
  const progressPercentage = total ? (progress / total) * 100 : 0;

  return (
    <TouchableOpacity
      style={[styles.missionCard, completed && styles.missionCardCompleted]}
      activeOpacity={0.7}
      disabled={completed}
    >
      <View style={styles.missionLeft}>
        <View
          style={[styles.missionIcon, { backgroundColor: iconColor + "20" }]}
        >
          <Ionicons
            name={completed ? "checkmark-circle" : iconName}
            size={24}
            color={completed ? "#10B981" : iconColor}
          />
        </View>
        <View style={styles.missionContent}>
          <Text
            style={[
              styles.missionTitle,
              completed && styles.missionTitleCompleted,
            ]}
          >
            {title}
          </Text>

          {/* 진행률 텍스트 */}
          {total && !completed && (
            <Text style={styles.missionProgress}>
              {showProgressBar
                ? `${progress.toLocaleString()} / ${total.toLocaleString()}`
                : `${progress} / ${total}`}
            </Text>
          )}

          {/* 완료 텍스트 */}
          {completed && <Text style={styles.missionCompletedText}>완료</Text>}

          {/* 진행바 */}
          {showProgressBar && !completed && (
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${progressPercentage}%`,
                    backgroundColor: iconColor,
                  },
                ]}
              />
            </View>
          )}
        </View>
      </View>

      {/* 포인트 */}
      {points && !completed && (
        <Text style={styles.missionPoints}>+{points}P</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
  },

  // 헤더
  header: {
    paddingHorizontal: CARD_PADDING,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Fonts.size["2xl"],
    fontWeight: Fonts.weight.bold,
    color: Colors.text.primary,
  },

  // 오늘의 미션 현황 카드
  statusCard: {
    margin: CARD_PADDING,
    backgroundColor: "#14B8A6",
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: "#14B8A6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  statusIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  statusTitle: {
    flex: 1,
    fontSize: Fonts.size.base,
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
  },
  statusBadge: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  statusProgress: {
    fontSize: 32,
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  statusFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: Fonts.size.sm,
    color: "rgba(255, 255, 255, 0.9)",
  },
  statusPoints: {
    fontSize: Fonts.size.lg,
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
  },

  // 섹션
  section: {
    paddingHorizontal: CARD_PADDING,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: Colors.primary.main,
    marginRight: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Fonts.size.lg,
    fontWeight: Fonts.weight.bold,
    color: Colors.text.primary,
  },

  // 미션 리스트
  missionList: {
    gap: Spacing.sm,
  },
  missionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  missionCardCompleted: {
    backgroundColor: Colors.gray["50"],
    opacity: 0.7,
  },
  missionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginRight: Spacing.sm,
  },
  missionIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  missionContent: {
    flex: 1,
  },
  missionTitle: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.semiBold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  missionTitleCompleted: {
    color: Colors.text.tertiary,
  },
  missionProgress: {
    fontSize: Fonts.size.xs,
    color: Colors.text.secondary,
  },
  missionCompletedText: {
    fontSize: Fonts.size.xs,
    color: Colors.success,
    fontWeight: Fonts.weight.medium,
  },
  missionPoints: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.bold,
    color: Colors.accent.main,
  },

  // 진행바
  progressBarContainer: {
    marginTop: 6,
    height: 6,
    backgroundColor: Colors.gray["200"],
    borderRadius: BorderRadius.full,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: BorderRadius.full,
  },

  // 하단 여백
  bottomSpacer: {
    height: Spacing["2xl"],
  },
});
