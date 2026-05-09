import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightIcon?: React.ReactNode;
};

export default function ScreenHeader({
  title,
  subtitle,
  showBack = false,
  rightIcon,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.leftRow}>
          {showBack ? (
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color="#1d4ed8" />
            </Pressable>
          ) : null}

          <View style={styles.textBlock}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        </View>

        {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e73d8",
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    overflow: "hidden",
    paddingHorizontal: 18,
    paddingBottom: 18,
    paddingTop: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    marginTop: 4,
    color: "#dbeafe",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  rightIcon: {
    alignSelf: "flex-start",
  },
});
