import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AdminTanda } from "@/utils/api/admin/adminTypes";
import { router } from "expo-router";
import { Pressable } from "react-native";

type Props = {
  tandas: AdminTanda[];
  loading?: boolean;
  error?: string;
};

const formatearMoneda = (valor: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(Number(valor || 0));

export default function ListaTandas({ tandas, loading = false, error = "" }: Props) {
  if (loading) {
    return (
      <View style={styles.stateBox}>
        <ActivityIndicator color="#2563eb" />
        <Text style={styles.stateText}>Cargando tus tandas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateBox}>
        <Text style={styles.stateTitle}>No pudimos cargar tus tandas</Text>
        <Text style={styles.stateText}>{error}</Text>
      </View>
    );
  }

  if (!tandas.length) {
    return (
      <View style={styles.stateBox}>
        <Text style={styles.stateTitle}>Aun no tienes tandas creadas</Text>
        <Text style={styles.stateText}>Cuando registres una tanda, aparecera aqui.</Text>
      </View>
    );
  }

  return (
    <View>
      {tandas.map((item) => (
        <Pressable
          key={item._id}
          style={styles.card}
          onPress={() => router.push(`/screen/admin/detalleTanda?id=${item._id}`)}
        >
          <View style={styles.headerRow}>
            <View style={styles.dot} />
            <View style={styles.titleBox}>
              <Text style={styles.tandaTitle}>{item.nombre}</Text>
              <Text style={styles.tandaDate}>{item.fecha || "Sin fecha definida"}</Text>
            </View>
            <View style={[styles.badge, item.estado === false ? styles.badgeOff : styles.badgeOn]}>
              <Text style={styles.badgeText}>{item.estadoTexto || (item.estado === false ? "Finalizada" : "Activa")}</Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Pago</Text>
              <Text style={styles.metricValue}>{formatearMoneda(item.pago)}</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Integrantes</Text>
              <Text style={styles.metricValue}>{item.totalIntegrantes}/{item.participantes}</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Pendientes</Text>
              <Text style={styles.metricValue}>{item.comprobantesPendientes}</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22c55e",
  },
  titleBox: {
    flex: 1,
  },
  tandaTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  tandaDate: {
    marginTop: 4,
    color: "#6b7280",
    fontSize: 12,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeOn: {
    backgroundColor: "#dcfce7",
  },
  badgeOff: {
    backgroundColor: "#e5e7eb",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1f2937",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    gap: 10,
  },
  metricItem: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    borderRadius: 12,
    padding: 10,
  },
  metricLabel: {
    color: "#6b7280",
    fontSize: 12,
  },
  metricValue: {
    color: "#111827",
    fontWeight: "700",
    marginTop: 4,
  },
  stateBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    gap: 8,
  },
  stateTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  stateText: {
    color: "#6b7280",
    textAlign: "center",
  },
});
