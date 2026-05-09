import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

type Props = {
  Valor: number;
  Turno: number;
  Participantes: number;
  Pagos: number;
};

export default function CardInfo({
  Valor,
  Pagos,
  Turno,
  Participantes,
}: Props) {
  const { width } = useWindowDimensions();
  const total = Valor * Participantes;
  const overlap = width >= 768 ? -22 : -18;

  return (
    <View
      style={[
        styles.cardInfo,
        {
          marginTop: overlap,
        },
      ]}
    >
      <View style={styles.grid}>
        <View style={styles.item}>
          <Text style={styles.label}>Pago por turno</Text>
          <Text style={styles.valor}>${Valor}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Pago</Text>
          <Text style={styles.valor}>{Pagos}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Turno</Text>
          <Text style={styles.valor}>{Turno > 0 ? `#${Turno}` : "Pendiente"}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Recibes</Text>
          <Text style={styles.valor}>${total}</Text>
        </View>
      </View>

      <View style={styles.lineVertical} />
      <View style={styles.lineHorizontal} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardInfo: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    elevation: 5,
    position: "relative",
    marginHorizontal: 0,
    overflow: "hidden",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: "50%",
    padding: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#777",
  },
  valor: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  lineVertical: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "#E5E7EB",
    transform: [{ translateX: -0.5 }],
    pointerEvents: "none",
  },
  lineHorizontal: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#E5E7EB",
    transform: [{ translateY: -0.5 }],
    pointerEvents: "none",
  },
});
