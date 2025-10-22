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
import { usePosts } from "../../hooks/useCommunity";
import { PostCategory } from "../../services/community";

const { width } = Dimensions.get("window");
const CARD_PADDING = Spacing.lg;

// 시간 차이 계산 함수
function getTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime() - past.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return "방금 전";
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  if (diffInDays < 7) return `${diffInDays}일 전`;
  return past.toLocaleDateString("ko-KR");
}

export default function CommunityScreen() {
  const [selectedCategory, setSelectedCategory] = useState<
    PostCategory | "전체"
  >("전체");
  const { posts } = usePosts(
    selectedCategory === "전체" ? undefined : selectedCategory
  );

  const categories: (PostCategory | "전체")[] = [
    "전체",
    "savings",
    "benefits",
    "free_events",
    "general",
  ];

  const categoryLabels: { [key: string]: string } = {
    전체: "전체",
    savings: "절약 팁",
    benefits: "혜택",
    free_events: "무료행사",
    general: "일반",
  };

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
                {categoryLabels[category] || category}
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
        {posts.map((post) => {
          const categoryColorMap: { [key: string]: string } = {
            savings: "#14B8A6",
            benefits: "#F59E0B",
            free_events: "#EC4899",
            general: "#3B82F6",
          };

          const timeAgo = getTimeAgo(post.created_at);

          return (
            <PostCard
              key={post.id}
              category={categoryLabels[post.category] || post.category}
              categoryColor={categoryColorMap[post.category] || "#3B82F6"}
              title={post.title}
              content={post.content}
              author={post.author.username}
              likes={post.like_count}
              comments={post.comment_count}
              timeAgo={timeAgo}
            />
          );
        })}

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
