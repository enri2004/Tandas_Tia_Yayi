// src/components/crearTanda/FechaSelector.tsx

import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  fecha: string;
  onPress: () => void;
};

export default function FechaSelector({ fecha, onPress }: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.label}>Fecha de inicio</Text>

      <Pressable style={styles.box} onPress={onPress}>
        <Text style={styles.text}>{fecha}</Text>
        <Ionicons name="calendar-outline" size={20} color="#aaa" />
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    marginTop: 10
  },
  label: {
    color: "#000",
    marginBottom: 5
  },
  box: {
    backgroundColor: "White",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    color: "#000"
  }
});