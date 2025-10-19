import React, { useState } from "react";
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

const { width } = Dimensions.get("window");
const CARD_PADDING = Spacing.lg;

// 카테고리 타입
type Category = "전체" | "할인정보" | "혜택" | "금융 꿀팁" | "후기";

export default function CommunityScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");

  const categories: Category[] = [
    "전체",
    "할인정보",
    "혜택",
    "금융 꿀팁",
    "후기",
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>게시판</Text>
      </View>

      {/* 카테고리 필터 */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 게시물 리스트 */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PostCard
          category="할인정보"
          categoryColor="#14B8A6"
          title="스타벅스 50% 할인 이벤트 놓치지 마세요"
          content="이번 주말까지 스타벅스 전 메뉴 50% 할인대요! 놓치면 후회할 듯..."
          author="절약왕"
          likes={234}
          comments={45}
          timeAgo="2시간 전"
        />
        <PostCard
          category="금융 꿀팁"
          categoryColor="#3B82F6"
          title="적금 이자 비교해봤습니다"
          content="요즘 금리 좋은 적금 상품들 정리해봤어요. 제 1금융권 중심으로..."
          author="재테크왕"
          likes={156}
          comments={28}
          timeAgo="5시간 전"
        />
        <PostCard
          category="혜택"
          categoryColor="#F59E0B"
          title="머니모여 신규 가입 혜택 받는 법"
          content="친구 초대하면 둘 다 1000포인트 받아요! 코드 공유합니다"
          author="money123"
          likes={89}
          comments={12}
          timeAgo="1일 전"
        />
        <PostCard
          category="후기"
          categoryColor="#EC4899"
          title="만보 걷기 미션 드디어 성공!"
          content="매일 꾸준히 걸었더니 포인트가 모이고 건강도 좋아진 것 같아요"
          author="건강러버"
          likes={67}
          comments={8}
          timeAgo="1일 전"
        />
        <PostCard
          category="할인정보"
          categoryColor="#14B8A6"
          title="편의점 2+1 행사 총정리"
          content="CU, GS25, 세븐일레븐 이번 주 행사 상품 모았어요"
          author="편의점마스터"
          likes={198}
          comments={32}
          timeAgo="2일 전"
        />
        <PostCard
          category="금융 꿀팁"
          categoryColor="#3B82F6"
          title="청년 지원금 신청 방법 정리"
          content="2025년 청년지원금 신청 기간과 방법 상세히 정리했습니다"
          author="청년파이팅"
          likes={312}
          comments={54}
          timeAgo="3일 전"
        />

        {/* 하단 여백 */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// 게시물 카드 컴포넌트
interface PostCardProps {
  category: string;
  categoryColor: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

function PostCard({
  category,
  categoryColor,
  title,
  content,
  author,
  likes,
  comments,
  timeAgo,
}: PostCardProps) {
  return (
    <TouchableOpacity style={styles.postCard} activeOpacity={0.7}>
      {/* 상단: 카테고리 + 시간 */}
      <View style={styles.postHeader}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: categoryColor + "20" },
          ]}
        >
          <Text style={[styles.categoryBadgeText, { color: categoryColor }]}>
            {category}
          </Text>
        </View>
        <Text style={styles.timeText}>{timeAgo}</Text>
      </View>

      {/* 제목 */}
      <Text style={styles.postTitle} numberOfLines={1}>
        {title}
      </Text>

      {/* 내용 미리보기 */}
      <Text style={styles.postContent} numberOfLines={2}>
        {content}
      </Text>

      {/* 하단: 작성자 + 좋아요/댓글 */}
      <View style={styles.postFooter}>
        <Text style={styles.authorText}>{author}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons
              name="heart-outline"
              size={16}
              color={Colors.text.tertiary}
            />
            <Text style={styles.statText}>{likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons
              name="chatbubble-outline"
              size={16}
              color={Colors.text.tertiary}
            />
            <Text style={styles.statText}>{comments}</Text>
          </View>
        </View>
      </View>
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
    paddingHorizontal: CARD_PADDING,
    paddingTop: Spacing.sm,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
  },

  // 헤더
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  writeButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  // 카테고리 필터
  categoryWrapper: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: Spacing.md,
  },
  categoryContent: {
    paddingHorizontal: CARD_PADDING,
    flexDirection: "row",
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  categoryText: {
    fontSize: Fonts.size.sm,
    fontWeight: Fonts.weight.medium,
    color: Colors.text.secondary,
  },
  categoryTextActive: {
    color: Colors.white,
    fontWeight: Fonts.weight.bold,
  },

  // 게시물 카드
  postCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: Fonts.weight.semiBold,
  },
  timeText: {
    fontSize: Fonts.size.xs,
    color: Colors.text.tertiary,
  },
  postTitle: {
    fontSize: Fonts.size.base,
    fontWeight: Fonts.weight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    lineHeight: 22,
  },
  postContent: {
    fontSize: Fonts.size.sm,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  authorText: {
    fontSize: Fonts.size.xs,
    color: Colors.text.secondary,
    fontWeight: Fonts.weight.medium,
  },
  statsContainer: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: Fonts.size.xs,
    color: Colors.text.tertiary,
  },

  // 하단 여백
  bottomSpacer: {
    height: Spacing.base,
  },
});
