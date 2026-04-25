import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useResponsive } from "../../hooks/useResponsive";

type Props = {
  tandasActivas: number;
  dineroRecaudado: number;
  pagosPendientes: number;
  tandasFinalizadas: number;
};

const formatearMoneda = (valor: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(Number(valor || 0));

export default function CardsAdmin({
  tandasActivas,
  dineroRecaudado,
  pagosPendientes,
  tandasFinalizadas,
}: Props) {
  const { compactLabelSize, titleSize } = useResponsive();
  const cards = [
    {
      icon: <Ionicons name="wallet" size={24} color="#22c55e" />,
      title: "Tandas activas",
      value: String(tandasActivas),
    },
    {
      icon: <Ionicons name="cash" size={24} color="#3b82f6" />,
      title: "Dinero recaudado",
      value: formatearMoneda(dineroRecaudado),
    },
    {
      icon: <Ionicons name="alert-circle" size={24} color="#f59e0b" />,
      title: "Pagos pendientes",
      value: String(pagosPendientes),
    },
    {
      icon: <Ionicons name="checkmark-circle" size={24} color="#22c55e" />,
      title: "Tandas finalizadas",
      value: String(tandasFinalizadas),
    },
  ];

  return (
    <View style={styles.cardsContainer}>
      {cards.map((card) => (
        <View
          style={[styles.card, { width: "48%" }]}
          key={card.title}
        >
          {card.icon}
          <Text style={[styles.cardTitle, { fontSize: compactLabelSize }]}>{card.title}</Text>
          <Text style={[styles.cardNumber, { fontSize: titleSize }]}>{card.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 8,
    marginBottom: 6,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
});
