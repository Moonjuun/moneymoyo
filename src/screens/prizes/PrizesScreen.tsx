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
import { usePrizesWithPity, usePrizeEntries } from "../../hooks/usePrizes";

const { width } = Dimensions.get("window");
const CARD_PADDING = Spacing.lg;

export default function PrizesScreen() {
  const { user, profile } = useAuth();
  const { prizes } = usePrizesWithPity(user?.id || null);
  const { entries } = usePrizeEntries(user?.id || null);

  const tickets = profile?.tickets || 0;

  // 첫 번째 경품의 천장 정보 (예시)
  const mainPrize = prizes[0];
  const ceilingProgress = mainPrize?.pityCount || 0;
  const ceilingTotal = mainPrize?.pity_threshold || 100;
  const ceilingPercentage = (ceilingProgress / ceilingTotal) * 100;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>응모</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 보유 응모권 카드 */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketHeader}>
            <View style={styles.ticketIconContainer}>
              <Ionicons name="ticket" size={24} color="#fff" />
            </View>
            <Text style={styles.ticketTitle}>보유 응모권</Text>
            <View style={styles.ticketBadge}>
              <Ionicons name="trending-up" size={16} color="#fff" />
            </View>
          </View>

          <Text style={styles.ticketAmount}>{tickets}장</Text>

          {/* 천장 시스템 */}
          <View style={styles.ceilingContainer}>
            <View style={styles.ceilingHeader}>
              <Text style={styles.ceilingLabel}>실명 시스템</Text>
              <Text style={styles.ceilingProgress}>
                {ceilingProgress}/{ceilingTotal} 티켓 사용
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${ceilingPercentage}%` },
                ]}
              />
            </View>
            <Text style={styles.ceilingInfo}>100장 사용 시 보상 보장!</Text>
          </View>
        </View>

        {/* 추천 경품 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>추천 경품</Text>
          </View>

          <View style={styles.prizeList}>
            {prizes.map((prize, index) => {
              const colors = ["#14B8A6", "#F59E0B", "#3B82F6", "#EF4444", "#10B981", "#EC4899"];
              return (
                <PrizeCard
                  key={prize.id}
                  title={prize.name}
                  description={`응모권 ${prize.tickets_per_entry}장 필요`}
                  ticketsRequired={prize.tickets_per_entry}
                  iconColor={colors[index % colors.length]}
                  onPress={() => console.log("응모하기:", prize.name)}
                />
              );
            })}
          </View>
        </View>

        {/* 응모 내역 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>응모 내역</Text>
          </View>

          <View style={styles.historyList}>
            {entries.slice(0, 10).map((entry) => (
              <HistoryCard
                key={entry.id}
                title={entry.prizes?.name || "알 수 없는 경품"}
                date={new Date(entry.created_at).toLocaleDateString("ko-KR")}
                status="pending"
              />
            ))}
          </View>
        </View>

        {/* 하단 여백 */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// 경품 카드 컴포넌트
interface PrizeCardProps {
  title: string;
  description: string;
  ticketsRequired: number;
  iconColor: string;
  onPress: () => void;
}

function PrizeCard({
  title,
  description,
  ticketsRequired,
  iconColor,
  onPress,
}: PrizeCardProps) {
  return (
    <View style={styles.prizeCard}>
      <View style={styles.prizeLeft}>
        <View style={[styles.prizeIcon, { backgroundColor: iconColor + "20" }]}>
          <Ionicons name="gift" size={28} color={iconColor} />
        </View>
        <View style={styles.prizeContent}>
          <Text style={styles.prizeTitle}>{title}</Text>
          <Text style={styles.prizeDescription}>{description}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.applyButtonText}>응모하기</Text>
      </TouchableOpacity>
    </View>
  );
}

// 응모 내역 카드 컴포넌트
interface HistoryCardProps {
  title: string;
  date: string;
  status: "pending" | "won" | "lost";
}

function HistoryCard({ title, date, status }: HistoryCardProps) {
  const getStatusInfo = () => {
    switch (status) {
      case "pending":
        return { text: "당첨 대기", color: Colors.accent.main };
      case "won":
        return { text: "당첨", color: Colors.success };
      case "lost":
        return { text: "미당첨", color: Colors.text.tertiary };
      default:
        return { text: "미당첨", color: Colors.text.tertiary };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <View style={styles.historyCard}>
      <View style={styles.historyLeft}>
        <View style={styles.historyIconContainer}>
          <Ionicons
            name={
              status === "pending" ? "time-outline" : "checkmark-circle-outline"
            }
            size={24}
            color={statusInfo.color}
          />
        </View>
        <View style={styles.historyContent}>
          <Text style={styles.historyTitle}>{title}</Text>
          <Text style={styles.historyDate}>{date}</Text>
        </View>
      </View>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: statusInfo.color + "20" },
        ]}
      >
        <Text style={[styles.statusText, { color: statusInfo.color }]}>
          {statusInfo.text}
        </Text>
      </View>
    </View>
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

  // 보유 응모권 카드
  ticketCard: {
    margin: CARD_PADDING,
    backgroundColor: "#F59E0B",
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ticketHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  ticketIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  ticketTitle: {
    flex: 1,
    fontSize: Fonts.size.base,
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
  },
  ticketBadge: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  ticketAmount: {
    fontSize: 40,
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
    marginBottom: Spacing.base,
  },

  // 천장 시스템
  ceilingContainer: {
    marginTop: Spacing.sm,
  },
  ceilingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  ceilingLabel: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.semiBold,
    color: "rgba(255, 255, 255, 0.95)",
  },
  ceilingProgress: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: BorderRadius.full,
    overflow: "hidden",
    marginBottom: Spacing.xs,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
  },
  ceilingInfo: {
    fontSize: Fonts.size.xs,
    color: "rgba(255, 255, 255, 0.9)",
  },

  // 섹션
  section: {
    paddingHorizontal: CARD_PADDING,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Fonts.size.lg,
    fontWeight: Fonts.weight.bold,
    color: Colors.text.primary,
  },

  // 경품 리스트
  prizeList: {
    gap: Spacing.sm,
  },
  prizeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  prizeLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginRight: Spacing.sm,
  },
  prizeIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  prizeContent: {
    flex: 1,
  },
  prizeTitle: {
    fontSize: Fonts.size.base,
    fontWeight: Fonts.weight.bold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  prizeDescription: {
    fontSize: Fonts.size.xs,
    color: Colors.text.secondary,
  },
  applyButton: {
    backgroundColor: "#14B8A6",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  applyButtonText: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
  },

  // 응모 내역 리스트
  historyList: {
    gap: Spacing.sm,
  },
  historyCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  historyLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginRight: Spacing.sm,
  },
  historyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.semiBold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: Fonts.size.xs,
    color: Colors.text.secondary,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    fontSize: Fonts.size.xs,
    fontWeight: Fonts.weight.semiBold,
  },

  // 하단 여백
  bottomSpacer: {
    height: Spacing["2xl"],
  },
});
