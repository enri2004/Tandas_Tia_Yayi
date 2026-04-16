import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 👇 tipos
type Props = {
  icon: string;
  text: string;
  hasSwitch?: boolean;
  onPress?: () => void;
};

export default function OptionItem({
  icon,
  text,
  hasSwitch,
  onPress
}: Props) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      
      <View style={styles.left}>
        <Ionicons name={icon as any} size={22} color="#333" />
        <Text style={styles.text}>{text}</Text>
      </View>

      {hasSwitch && <Switch />}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  text: {
    fontSize: 14
  }
});