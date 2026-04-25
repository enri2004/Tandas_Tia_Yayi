import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  fecha?: string;
  estado?: "pendiente" | "pagado";
};

export default function FechaTurnoCard({
  fecha = "",
  estado = "pendiente",
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Tu fecha programada</Text>
      <Text style={styles.value}>{fecha || "Sin fecha asignada"}</Text>

      <Text style={styles.label}>Estado de pago</Text>
      <Text style={styles.value}>{estado === "pagado" ? "Pagado" : "Pendiente"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginTop: 14,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    elevation: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
});
