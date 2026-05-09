import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  hasBlueHeader?: boolean;
  backgroundColor?: string;
  contentBackgroundColor?: string;
  statusBarStyle?: "light-content" | "dark-content";
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

const BLUE_HEADER = "#1e73d8";

export default function ScreenSafeArea({
  children,
  hasBlueHeader = false,
  backgroundColor = "#f2f2f2",
  contentBackgroundColor,
  statusBarStyle,
  edges = ["top", "left", "right"],
  style,
  contentStyle,
}: Props) {
  const safeBackground = hasBlueHeader ? BLUE_HEADER : backgroundColor;
  const innerBackground = contentBackgroundColor ?? backgroundColor;
  const resolvedStatusBarStyle =
    statusBarStyle ?? (hasBlueHeader ? "light-content" : "dark-content");

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.safeArea, { backgroundColor: safeBackground }, style]}
    >
      <StatusBar
        style={resolvedStatusBarStyle === "light-content" ? "light" : "dark"}
        backgroundColor={safeBackground}
        translucent={false}
      />
      <View
        style={[
          styles.content,
          { backgroundColor: innerBackground },
          contentStyle,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
