import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  pagosRealizados: number;
  totalPagos: number;
};

export default function CardProgreso({
  pagosRealizados,
  totalPagos,
}: Props) {
  const porcentaje =
    totalPagos > 0 ? (pagosRealizados / totalPagos) * 100 : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Progreso</Text>

      <View style={styles.barraBg}>
        <View
          style={[
            styles.barraFill,
            { width: `${Math.min(porcentaje, 100)}%` },
          ]}
        />
      </View>

      <Text style={styles.porcentaje}>{porcentaje.toFixed(0)}%</Text>
      <Text style={styles.subText}>
        {pagosRealizados} de {totalPagos} pagos realizados
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  barraBg: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
  },
  barraFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
  },
  porcentaje: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  subText: {
    textAlign: "center",
    color: "#777",
  },
});