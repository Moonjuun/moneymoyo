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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/theme/colors";
import { Fonts } from "../../constants/theme/fonts";
import { Spacing, BorderRadius } from "../../constants/theme/spacing";
import { useAuth } from "../../contexts/AuthContext";
import { useMissions } from "../../hooks/useMissions";
import { usePosts } from "../../hooks/useCommunity";

const { width } = Dimensions.get("window");
const CARD_PADDING = Spacing.lg;
const CARD_WIDTH = (width - CARD_PADDING * 3) / 2;

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, profile } = useAuth();
  const { missions } = useMissions(user?.id || null);
  const { posts } = usePosts(undefined, 5);

  const points = profile?.points || 0;
  const tickets = profile?.tickets || 0;

  // 미션 탭으로 이동
  const handleGoToMissions = () => {
    // @ts-ignore
    navigation.navigate("Missions");
  };

  // 게시판 탭으로 이동
  const handleGoToCommunity = () => {
    // @ts-ignore
    navigation.navigate("Community");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.appName}>머니모여</Text>
          <Text style={styles.greeting}>오늘도 모으러 오셨군요!</Text>
        </View>
        {/* 보유 재화 카드 (가로 2개) */}
        <View style={styles.balanceSection}>
          {/* 포인트 카드 */}
          <TouchableOpacity
            style={[styles.balanceCard, styles.balanceCardPoints]}
            activeOpacity={0.8}
          >
            <View style={styles.balanceTop}>
              <View style={styles.balanceIconSmall}>
                <Ionicons name="wallet" size={16} color="#fff" />
              </View>
              <Text style={styles.balanceLabelTop}>포인트</Text>
            </View>
            <View style={styles.balanceBottom}>
              <Text style={styles.balanceAmountLarge}>
                {points.toLocaleString()}
              </Text>
              <Text style={styles.balanceUnitLarge}>P</Text>
            </View>
          </TouchableOpacity>

          {/* 응모권 카드 */}
          <TouchableOpacity
            style={[styles.balanceCard, styles.balanceCardTickets]}
            activeOpacity={0.8}
          >
            <View style={styles.balanceTop}>
              <View style={styles.balanceIconSmall}>
                <Ionicons name="ticket" size={16} color="#fff" />
              </View>
              <Text style={styles.balanceLabelTop}>응모권</Text>
            </View>
            <View style={styles.balanceBottom}>
              <Text style={styles.balanceAmountLarge}>{tickets}</Text>
              <Text style={styles.balanceUnitLarge}>개</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* 오늘의 미션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>오늘의 미션</Text>
            <TouchableOpacity onPress={handleGoToMissions}>
              <Text style={styles.sectionMore}>전체보기 →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.missionGrid}>
            {missions.slice(0, 4).map((mission, index) => {
              const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
                watch_ad: "play-circle",
                daily_attendance: "checkmark-circle",
                referral: "people",
                minigame_spelling: "game-controller",
                minigame_number: "calculator",
                minigame_color: "color-palette",
                minigame_flag: "flag",
                minigame_reaction: "flash",
                minigame_decibel: "volume-high",
              };

              const colorMap: { [key: string]: string } = {
                watch_ad: "#14B8A6",
                daily_attendance: "#3B82F6",
                referral: "#8B5CF6",
                minigame_spelling: "#EC4899",
                minigame_number: "#F59E0B",
                minigame_color: "#10B981",
                minigame_flag: "#EF4444",
                minigame_reaction: "#F59E0B",
                minigame_decibel: "#06B6D4",
              };

              return (
                <MissionCard
                  key={mission.id}
                  iconName={iconMap[mission.mission_type] || "gift"}
                  title={mission.title}
                  points={mission.reward_amount}
                  color={colorMap[mission.mission_type] || "#14B8A6"}
                />
              );
            })}
          </View>
        </View>
        {/* 돈되는 게시판 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>돈되는 게시판</Text>
            </View>
            <TouchableOpacity onPress={handleGoToCommunity}>
              <Text style={styles.sectionMore}>전체보기 →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.postList}>
            {posts.slice(0, 5).map((post) => {
              const categoryMap: { [key: string]: { icon: keyof typeof Ionicons.glyphMap; label: string } } = {
                savings: { icon: "trending-down", label: "절약 팁" },
                benefits: { icon: "card", label: "혜택" },
                free_events: { icon: "gift", label: "무료행사" },
                general: { icon: "chatbubble", label: "일반" },
              };

              const categoryInfo = categoryMap[post.category] || categoryMap.general;

              return (
                <PostItem
                  key={post.id}
                  iconName={categoryInfo.icon}
                  category={categoryInfo.label}
                  title={post.title}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 미션 카드 컴포넌트
interface MissionCardProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  points: number;
  color: string;
}

function MissionCard({ iconName, title, points, color }: MissionCardProps) {
  return (
    <TouchableOpacity style={styles.missionCard} activeOpacity={0.7}>
      <View style={[styles.missionIcon, { backgroundColor: color + "20" }]}>
        <Ionicons name={iconName} size={32} color={color} />
      </View>
      <Text style={styles.missionTitle} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.missionPoints}>+{points}P</Text>
    </TouchableOpacity>
  );
}

// 게시물 아이템 컴포넌트
interface PostItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  category: string;
  title: string;
}

function PostItem({ iconName, category, title }: PostItemProps) {
  return (
    <TouchableOpacity style={styles.postItem} activeOpacity={0.7}>
      <View style={styles.postLeft}>
        <View style={styles.postIconContainer}>
          <Ionicons name={iconName} size={20} color={Colors.primary.main} />
        </View>
        <View style={styles.postContent}>
          <View style={styles.postCategoryBadge}>
            <Text style={styles.postCategoryText}>{category}</Text>
          </View>
          <Text style={styles.postTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
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
  },
  appName: {
    fontSize: Fonts.size["2xl"],
    fontWeight: Fonts.weight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  greeting: {
    fontSize: Fonts.size.base,
    color: Colors.text.secondary,
  },

  // 보유 재화
  balanceSection: {
    flexDirection: "row",
    paddingHorizontal: CARD_PADDING,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  balanceCard: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    minHeight: 110,
    justifyContent: "space-between",
    // 그림자 추가
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceCardPoints: {
    backgroundColor: "#14B8A6",
  },
  balanceCardTickets: {
    backgroundColor: "#F59E0B",
  },

  // 상단 (아이콘 + 레이블)
  balanceTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  balanceIconSmall: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.sm,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  balanceLabelTop: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.semiBold,
    color: "rgba(255, 255, 255, 0.95)",
  },

  // 하단 (숫자 + 단위)
  balanceBottom: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  balanceAmountLarge: {
    fontSize: 32,
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  balanceUnitLarge: {
    fontSize: Fonts.size.base,
    fontWeight: Fonts.weight.bold,
    color: "rgba(255, 255, 255, 0.9)",
  },

  // 섹션
  section: {
    paddingHorizontal: CARD_PADDING,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: Fonts.size.lg,
    fontWeight: Fonts.weight.bold,
    color: Colors.text.primary,
  },
  sectionMore: {
    fontSize: Fonts.size.xs,
    color: Colors.text.tertiary,
  },

  // 미션 그리드
  missionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  missionCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  missionIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  missionTitle: {
    fontSize: Fonts.size.xs,
    fontWeight: Fonts.weight.medium,
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: "center",
  },
  missionPoints: {
    fontSize: Fonts.size.xs,
    fontWeight: Fonts.weight.bold,
    color: Colors.accent.main,
  },

  // 게시물 리스트
  postList: {
    gap: Spacing.sm,
  },
  postItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 68,
  },
  postLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginRight: Spacing.sm,
  },
  postIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  postContent: {
    flex: 1,
    justifyContent: "center",
  },
  postCategoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginBottom: 4,
  },
  postCategoryText: {
    fontSize: 10,
    fontWeight: Fonts.weight.medium,
    color: Colors.primary.main,
  },
  postTitle: {
    fontSize: Fonts.size.xs,
    fontWeight: Fonts.weight.medium,
    color: Colors.text.primary,
    lineHeight: 18,
  },
});
