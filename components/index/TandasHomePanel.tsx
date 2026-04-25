import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useResponsive } from "../../hooks/useResponsive";
import { TandaItem } from "../../utils/api/Tandas/tandasTypes";

type Props = {
  tandas: TandaItem[];
  loading: boolean;
  error: string;
  maxHeight: number;
  onRetry: () => void;
};

const formatearMoneda = (valor?: number | null) => {
  if (typeof valor !== "number" || Number.isNaN(valor)) {
    return "Sin dato";
  }

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(valor);
};

export default function TandasHomePanel({
  tandas,
  loading,
  error,
  maxHeight,
  onRetry,
}: Props) {
  const { tandasRowHeight } = useResponsive();
  const panelHeight = tandas.length > 3 ? maxHeight : tandas.length * tandasRowHeight + 24;

  if (loading) {
    return (
      <View style={styles.statusCard}>
        <ActivityIndicator size="small" color="#1e73d8" />
        <Text style={styles.statusText}>Cargando datos reales...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.statusCard}>
        <Text style={styles.errorTitle}>No pudimos cargar tu inicio</Text>
        <Text style={styles.statusText}>{error}</Text>
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!tandas.length) {
    return (
      <View style={styles.statusCard}>
        <Text style={styles.emptyTitle}>Aun no tienes tandas</Text>
        <Text style={styles.statusText}>
          Cuando te unas o crees una tanda, aparecera aqui con datos reales.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.panel, { height: panelHeight, maxHeight }]}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} bounces={false}>
        {tandas.map((tanda) => {
          const turnoTexto =
            typeof tanda.turnoUsuario === "number" && tanda.turnoUsuario > 0
              ? `#${tanda.turnoUsuario}`
              : "Pendiente";

          return (
            <TouchableOpacity
              key={tanda._id}
              activeOpacity={0.8}
              style={styles.tandaCard}
              onPress={() => router.push(`/screen/user/detalles?id=${tanda._id}`)}
            >
            <View style={styles.tandaRow}>
              <Text style={styles.tandaTitle} numberOfLines={2}>
                {tanda.nombre}
              </Text>
              <View
                style={[
                  styles.estadoBadge,
                  tanda.estado === false ? styles.estadoFinalizada : styles.estadoActiva,
                ]}
              >
                <Text style={styles.estadoBadgeText}>
                  {tanda.estado === false ? "Finalizada" : "Activa"}
                </Text>
              </View>
            </View>

            <Text style={styles.estadoTexto}>{tanda.estadoTexto || "Sin estado"}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{`Pago: ${formatearMoneda(Number(tanda.pago || 0))}`}</Text>
              <Text style={styles.metaText}>{`Turno: ${turnoTexto}`}</Text>
            </View>

            <View style={styles.progresoContainer}>
              <View style={styles.barraBg}>
                <View
                  style={[
                    styles.barraFill,
                    {
                      width: `${Math.min(
                        ((Number(tanda.pagoRealizados || 0) /
                          Math.max(Number(tanda.participantes || 0), 1)) *
                          100),
                        100
                      )}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progresoTexto}>
                {`${Number(tanda.pagoRealizados || 0)} de ${Number(
                  tanda.participantes || 0
                )} pagos realizados`}
              </Text>
            </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    overflow: "hidden",
  },
  tandaCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  tandaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  tandaTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#111827",
    flex: 1,
  },
  estadoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  estadoActiva: {
    backgroundColor: "#dcfce7",
  },
  estadoFinalizada: {
    backgroundColor: "#e5e7eb",
  },
  estadoBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1f2937",
  },
  estadoTexto: {
    color: "#16a34a",
    marginTop: 6,
    fontSize: 13,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
    flexWrap: "wrap",
  },
  metaText: {
    color: "#4b5563",
    fontSize: 13,
  },
  progresoContainer: {
    marginTop: 12,
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
  progresoTexto: {
    textAlign: "center",
    color: "#777",
    marginTop: 8,
    fontSize: 12,
  },
  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    gap: 8,
  },
  statusText: {
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#991b1b",
  },
  retryButton: {
    marginTop: 6,
    backgroundColor: "#1e73d8",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  retryText: {
    color: "#fff",
    fontWeight: "700",
  },
});
