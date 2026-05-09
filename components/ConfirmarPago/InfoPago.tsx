import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  monto: string;
  fecha: string;
  metodo: string;
  banco?: string;
  clabe?: string;
  beneficiario?: string;
};

export default function InfoPago({
  monto,
  fecha,
  metodo,
  banco,
  clabe,
  beneficiario,
}: Props) {
  const filas = [
    { label: "Monto", value: monto, emphasis: true },
    { label: "Fecha", value: fecha },
    { label: "Metodo", value: metodo },
    banco ? { label: "Banco", value: banco } : null,
    clabe ? { label: "Clave", value: clabe } : null,
    beneficiario ? { label: "Beneficiario", value: beneficiario } : null,
  ].filter(Boolean) as Array<{ label: string; value: string; emphasis?: boolean }>;

  return (
    <View style={styles.infoBox}>
      {filas.map((fila) => (
        <View key={fila.label} style={styles.row}>
          <Text style={styles.label}>{fila.label}</Text>
          <Text style={fila.emphasis ? styles.valueGreen : styles.value}>{fila.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    padding: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 12,
  },
  label: {
    color: "#777",
    fontSize: 13,
  },
  value: {
    color: "#333",
    fontSize: 13,
    flex: 1,
    textAlign: "right",
  },
  valueGreen: {
    color: "#1e73d8",
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
});
