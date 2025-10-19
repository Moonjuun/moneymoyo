// src/screens/splash/SplashScreen.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { Colors } from "../../constants/theme/colors";
import { Fonts } from "../../constants/theme/fonts";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // 2초 후 다음 화면으로
      const timer = setTimeout(() => {
        if (user) {
          // @ts-ignore
          navigation.replace("Main");
        } else {
          // @ts-ignore
          navigation.replace("Login");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading, user, navigation]);

  return (
    <View style={styles.container}>
      {/* 중앙 로고 영역 */}
      <View style={styles.logoContainer}>
        {/* 로고 이미지 플레이스홀더 */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoEmoji}>💰</Text>
        </View>

        {/* 앱 이름 */}
        <Text style={styles.appName}>머니모여</Text>
      </View>

      {/* 하단 설명 */}
      <View style={styles.bottomContainer}>
        <Text style={styles.description}>돈 버는 즐거운 습관,</Text>
        <Text style={styles.description}>오늘도 쌓이는 머니</Text>

        {/* 로딩 인디케이터 */}
        <ActivityIndicator
          size="small"
          color={Colors.primary.main}
          style={styles.loader}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    paddingVertical: 80,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: Colors.primary.main,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    // 그림자
    shadowColor: Colors.primary.main,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 60,
  },
  appName: {
    fontSize: Fonts.size["4xl"],
    fontWeight: Fonts.weight.bold,
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  bottomContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  description: {
    fontSize: Fonts.size.base,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  loader: {
    marginTop: 24,
  },
});
