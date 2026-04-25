// src/components/crearTanda/InputCard.tsx

import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: any;
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address";
  multiline?: boolean;
};

export default function InputCard({
  icon,
  label,
  value,
  onChange,
  placeholder,
  keyboardType = "default",
  multiline = false,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name={icon} size={22} color="#22c55e" />
        <Text style={styles.label}>{label}</Text>
      </View>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8
  },
  label: {
    color: "#000"
  },
  input: {
    color: "#000",
    padding: 10,
    borderRadius: 8,
  },
  inputMultiline: {
    minHeight: 86,
  },
});
