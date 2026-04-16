import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// 👇 definimos los tipos
type Props = {
  metodo: "transferencia" | "presencial";
  setMetodo: (metodo: "transferencia" | "presencial") => void;
};

export default function MetodoPago({ metodo, setMetodo }: Props) {
  return (
    <View style={styles.selector}>

      <TouchableOpacity
        style={[styles.boton, metodo === "transferencia" && styles.activo]}
        onPress={() => setMetodo("transferencia")}
      >
        <MaterialCommunityIcons
          name="bank"
          size={28}
          color={metodo === "transferencia" ? "white" : "#555"}
        />
        <Text style={[styles.text, metodo === "transferencia" && styles.textActivo]}>
          Transferencia
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.boton, metodo === "presencial" && styles.activo]}
        onPress={() => setMetodo("presencial")}
      >
        <MaterialCommunityIcons
          name="handshake"
          size={28}
          color={metodo === "presencial" ? "white" : "#555"}
        />
        <Text style={[styles.text, metodo === "presencial" && styles.textActivo]}>
          Presencial
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  selector: { flexDirection: "row", marginBottom: 20 },
  boton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eee",
    alignItems: "center",
    borderRadius: 12,
    marginHorizontal: 5
  },
  activo: { backgroundColor: "#3b82f6" },
  text: { marginTop: 5, fontSize: 13 },
  textActivo: { color: "white" }
});