import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 👇 tipo reutilizable
type Option = string;

// 👇 props tipadas
type Props = {
  value: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  options: Option[];
  onSelect: (value: Option) => void;
};

export default function Select({ value, open, setOpen, options, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.select} onPress={() => setOpen(!open)}>
        <Text>{value}</Text>
        <Ionicons name="chevron-down" size={20} />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {options.map((item: Option, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => onSelect(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },

  select: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5
  },

  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee"
  }
});