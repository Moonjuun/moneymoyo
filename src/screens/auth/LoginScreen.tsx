import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import SocialButton from "../../components/common/Button/SocialButton";
import { Colors } from "../../constants/theme/colors";
import { Fonts } from "../../constants/theme/fonts";
import { Spacing, BorderRadius } from "../../constants/theme/spacing";
import { supabase } from "../../lib/supabase";

const { width } = Dimensions.get("window");

// 개발 모드 확인
const __DEV__ = process.env.NODE_ENV === "development";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<"google" | "naver" | "apple" | null>(
    null
  );

  const handleGoogleLogin = async () => {
    try {
      setLoading("google");

      // TODO: Google 로그인 구현
      Alert.alert("알림", "Google 로그인 준비 중입니다.");
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert("오류", "로그인에 실패했습니다.");
    } finally {
      setLoading(null);
    }
  };

  const handleNaverLogin = async () => {
    try {
      setLoading("naver");

      // TODO: 네이버 로그인 구현
      Alert.alert("알림", "네이버 로그인 준비 중입니다.");
    } catch (error) {
      console.error("Naver login error:", error);
      Alert.alert("오류", "로그인에 실패했습니다.");
    } finally {
      setLoading(null);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setLoading("apple");

      // TODO: Apple 로그인 구현
      Alert.alert("알림", "Apple 로그인 준비 중입니다.");
    } catch (error) {
      console.error("Apple login error:", error);
      Alert.alert("오류", "로그인에 실패했습니다.");
    } finally {
      setLoading(null);
    }
  };

  // 개발용 홈 화면 이동
  const handleDevLogin = () => {
    // @ts-ignore
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* 상단 로고 영역 */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoEmoji}>💰</Text>
          </View>
          <Text style={styles.appName}>머니모여</Text>
        </View>

        <Text style={styles.welcomeText}>환영합니다!</Text>
        <Text style={styles.description}>
          간편하게 로그인하고{"\n"}
          포인트를 모아보세요
        </Text>
      </View>

      {/* 소셜 로그인 버튼 영역 */}
      <View style={styles.loginContainer}>
        <SocialButton
          provider="google"
          onPress={handleGoogleLogin}
          loading={loading === "google"}
          disabled={loading !== null}
        />

        <SocialButton
          provider="naver"
          onPress={handleNaverLogin}
          loading={loading === "naver"}
          disabled={loading !== null}
        />

        {Platform.OS === "ios" && (
          <SocialButton
            provider="apple"
            onPress={handleAppleLogin}
            loading={loading === "apple"}
            disabled={loading !== null}
          />
        )}

        {/* 🔧 개발용 버튼 (개발 환경에서만 표시) */}
        {__DEV__ && (
          <TouchableOpacity style={styles.devButton} onPress={handleDevLogin}>
            <Text style={styles.devButtonText}>
              🔧 개발용: 홈 화면으로 이동
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 하단 약관 */}
      <View style={styles.footer}>
        <Text style={styles.termsText}>
          로그인 시 <Text style={styles.termsLink}>이용약관</Text> 및{" "}
          <Text style={styles.termsLink}>개인정보처리방침</Text>에{"\n"}
          동의하게 됩니다
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Spacing["2xl"],
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing["3xl"],
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: Colors.primary.main,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.base,
    shadowColor: Colors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoEmoji: {
    fontSize: 50,
  },
  appName: {
    fontSize: Fonts.size["3xl"],
    fontWeight: Fonts.weight.bold,
    color: Colors.text.primary,
  },
  welcomeText: {
    fontSize: Fonts.size["2xl"],
    fontWeight: Fonts.weight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Fonts.size.base,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  loginContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
    alignItems: "center",
  },
  termsText: {
    fontSize: Fonts.size.sm,
    color: Colors.text.tertiary,
    textAlign: "center",
    lineHeight: 20,
  },
  termsLink: {
    color: Colors.primary.main,
    fontWeight: Fonts.weight.medium,
  },
  // 🔧 개발용 버튼 스타일
  devButton: {
    marginTop: Spacing.lg,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.warning,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.accent.dark,
    borderStyle: "dashed",
  },
  devButtonText: {
    fontSize: Fonts.size.base,
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
  },
});
