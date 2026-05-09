import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";

type Props = {
  icon: ReactNode;
  text: string;
  color: string;
  onPress?: () => void;
};

export default function ActionButton({ icon, text, color, onPress }: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 390;
  const isTabletOrWeb = width >= 768;

  return (
    <TouchableOpacity style={styles.action} onPress={onPress} activeOpacity={0.85}>
      <View
        style={[
          styles.icon,
          {
            backgroundColor: color,
            width: isTabletOrWeb ? 64 : isCompact ? 54 : 58,
            height: isTabletOrWeb ? 64 : isCompact ? 54 : 58,
            borderRadius: isTabletOrWeb ? 32 : isCompact ? 27 : 29,
          },
        ]}
      >
        {icon}
      </View>
      <Text style={[styles.text, { fontSize: isCompact ? 11 : 12 }]} numberOfLines={2}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  action: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginTop: 6,
    width: "100%",
    minHeight: 32,
    color: "#111827",
  },
});
