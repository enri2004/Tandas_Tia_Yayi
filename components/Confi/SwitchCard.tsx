import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

type Props = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function SwitchCard({
  title,
  description,
  value,
  onValueChange,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    elevation: 2,
  },
  texts: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  description: {
    marginTop: 4,
    color: "#6b7280",
    lineHeight: 18,
  },
});
