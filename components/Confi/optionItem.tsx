import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: string;
  text: string;
  hasSwitch?: boolean;
  onPress?: () => void;
  switchValue?: boolean;
  onToggle?: (value: boolean) => void;
};

export default function OptionItem({
  icon,
  text,
  hasSwitch,
  onPress,
  switchValue = false,
  onToggle,
}: Props) {
  if (hasSwitch) {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.left}
          onPress={() => onToggle?.(!switchValue)}
          activeOpacity={0.7}
        >
          <Ionicons name={icon as any} size={22} color="#333" />
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>

        <Switch value={switchValue} onValueChange={onToggle} />
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.left}>
        <Ionicons name={icon as any} size={22} color="#333" />
        <Text style={styles.text}>{text}</Text>
      </View>
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
    marginBottom: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: "#111827",
  },
});
