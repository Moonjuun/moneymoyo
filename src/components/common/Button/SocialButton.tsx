import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { Colors } from "../../../constants/theme/colors";
import { Fonts } from "../../../constants/theme/fonts";
import { Spacing, BorderRadius } from "../../../constants/theme/spacing";

type SocialProvider = "google" | "naver" | "apple";

interface SocialButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const PROVIDER_CONFIG = {
  google: {
    label: "Google로 계속하기",
    backgroundColor: Colors.white,
    textColor: Colors.text.primary,
    borderColor: Colors.border,
    icon: "🔍", // 나중에 실제 아이콘으로 교체
  },
  naver: {
    label: "네이버로 계속하기",
    backgroundColor: "#03C75A",
    textColor: Colors.white,
    borderColor: "#03C75A",
    icon: "N",
  },
  apple: {
    label: "Apple로 계속하기",
    backgroundColor: Colors.black,
    textColor: Colors.white,
    borderColor: Colors.black,
    icon: "",
  },
};

export default function SocialButton({
  provider,
  onPress,
  loading = false,
  disabled = false,
}: SocialButtonProps) {
  const config = PROVIDER_CONFIG[provider];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={config.textColor} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.icon}>{config.icon}</Text>
          <Text style={[styles.label, { color: config.textColor }]}>
            {config.label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 56,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: Fonts.size.base,
    fontWeight: Fonts.weight.semiBold,
  },
  disabled: {
    opacity: 0.5,
  },
});
