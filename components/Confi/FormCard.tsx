import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Field = {
  key: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
};

type Props = {
  title: string;
  subtitle?: string;
  fields: Field[];
};

export default function FormCard({ title, subtitle, fields }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      {fields.map((field) => (
        <View key={field.key} style={styles.fieldBlock}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            value={field.value}
            onChangeText={field.onChangeText}
            placeholder={field.placeholder}
            secureTextEntry={field.secureTextEntry}
            keyboardType={field.keyboardType}
            style={styles.input}
            placeholderTextColor="#9ca3af"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 4,
    marginBottom: 16,
  },
  fieldBlock: {
    marginBottom: 14,
  },
  label: {
    color: "#4b5563",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#111827",
  },
});
