import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const user = {
    name: "김미니",
    tier: "골드 회원",
    joinDate: "2025.01.15",
    points: 12450,
    checkInDays: 24,
  };

  const earnings = {
    today: 350,
    thisWeek: 2450,
    thisMonth: 8920,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1EC997" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          {/* Profile Info */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <View style={styles.tierBadge}>
                <Text style={styles.tierText}>{user.tier}</Text>
              </View>
              <Text style={styles.joinDate}>가입일: {user.joinDate}</Text>
            </View>
          </View>

          {/* Points and Check-in Cards */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { flex: 1, marginRight: 8 }]}>
              <View style={styles.statHeader}>
                <Ionicons name="wallet-outline" size={20} color="#fff" />
                <Text style={styles.statLabel}>보유 포인트</Text>
              </View>
              <Text style={styles.statValue}>
                {user.points.toLocaleString()}
              </Text>
              <Text style={styles.statUnit}>P</Text>
            </View>

            <View style={[styles.statCard, { flex: 1, marginLeft: 8 }]}>
              <View style={styles.statHeader}>
                <Ionicons name="calendar-outline" size={20} color="#fff" />
                <Text style={styles.statLabel}>출근일</Text>
              </View>
              <Text style={styles.statValue}>{user.checkInDays}</Text>
              <Text style={styles.statUnit}>일</Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Earnings Stats */}
          <View style={styles.earningsCard}>
            <View style={styles.earningsHeader}>
              <Ionicons name="trending-up" size={20} color="#1EC997" />
              <Text style={styles.sectionTitle}>적립 현황</Text>
            </View>

            <View style={styles.earningsRow}>
              <View style={styles.earningItem}>
                <Text style={styles.earningLabel}>오늘 적립</Text>
                <Text style={styles.earningValue}>
                  {earnings.today.toLocaleString()}
                </Text>
                <Text style={styles.earningUnit}>P</Text>
              </View>

              <View style={[styles.earningItem, styles.earningItemMiddle]}>
                <Text style={styles.earningLabel}>이번 주</Text>
                <Text style={styles.earningValue}>
                  {earnings.thisWeek.toLocaleString()}
                </Text>
                <Text style={styles.earningUnit}>P</Text>
              </View>

              <View style={styles.earningItem}>
                <Text style={styles.earningLabel}>이번 달</Text>
                <Text style={styles.earningValue}>
                  {earnings.thisMonth.toLocaleString()}
                </Text>
                <Text style={styles.earningUnit}>P</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: "#E0F7F4" }]}>
                <Ionicons name="cash-outline" size={24} color="#1EC997" />
              </View>
              <Text style={styles.actionText}>포인트 출금</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: "#FFF4E0" }]}>
                <Ionicons name="gift-outline" size={24} color="#FFB800" />
              </View>
              <Text style={styles.actionText}>응모하기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: "#F4E0FF" }]}>
                <Ionicons name="people-outline" size={24} color="#A855F7" />
              </View>
              <Text style={styles.actionText}>친구 초대</Text>
            </TouchableOpacity>
          </View>

          {/* Activity Section */}
          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>활동</Text>

            <MenuItem
              icon="wallet-outline"
              iconColor="#1EC997"
              text="포인트 내역"
              onPress={() => {}}
            />

            <MenuItem
              icon="trophy-outline"
              iconColor="#FFB800"
              text="응모 내역"
              onPress={() => {}}
            />
          </View>

          {/* Account Section */}
          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>계정</Text>

            <MenuItem
              icon="notifications-outline"
              iconColor="#666"
              text="알림 설정"
              onPress={() => {}}
            />

            <MenuItem
              icon="shield-outline"
              iconColor="#666"
              text="개인정보 보호"
              onPress={() => {}}
            />

            <MenuItem
              icon="settings-outline"
              iconColor="#666"
              text="설정"
              onPress={() => {}}
            />
          </View>

          {/* Support Section */}
          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>지원</Text>

            <MenuItem
              icon="help-circle-outline"
              iconColor="#666"
              text="고객센터"
              onPress={() => {}}
            />

            <MenuItem
              icon="log-out-outline"
              iconColor="#FF3B30"
              text="로그아웃"
              onPress={() => {}}
              showChevron={false}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>머니모여 v1.0.0</Text>
            <Text style={styles.footerCopyright}>
              © 2025 MoneyMoyeo. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Menu Item Component
const MenuItem = ({
  icon,
  iconColor,
  text,
  onPress,
  showChevron = true,
}: {
  icon: string;
  iconColor: string;
  text: string;
  onPress: () => void;
  showChevron?: boolean;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Ionicons name={icon as any} size={24} color={iconColor} />
      <Text style={styles.menuItemText}>{text}</Text>
    </View>
    {showChevron && <Ionicons name="chevron-forward" size={20} color="#999" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#1EC997",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  tierBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  tierText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  joinDate: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
  },
  statsRow: {
    flexDirection: "row",
  },
  statCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 16,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    marginLeft: 6,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 2,
  },
  statUnit: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    padding: 20,
  },
  earningsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  earningsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  earningsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  earningItem: {
    flex: 1,
    alignItems: "center",
  },
  earningItemMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#f0f0f0",
  },
  earningLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  earningValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 2,
  },
  earningUnit: {
    fontSize: 12,
    color: "#999",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  menuSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 15,
    color: "#333",
    marginLeft: 12,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 13,
    color: "#999",
    marginBottom: 4,
  },
  footerCopyright: {
    fontSize: 12,
    color: "#ccc",
  },
});

export default ProfileScreen;
