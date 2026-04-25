import React from "react";
import { View, FlatList, Text, StyleSheet, RefreshControl } from "react-native";
import Cajatext from "../../../components/ui/Cajatext";
import IconoEstado from "../../../components/ui/icono";
import { useAdminDashboard } from "../../../hooks/useAdminDashboard";

const formatearFecha = (fecha: string) => {
  try {
    return new Date(fecha).toLocaleString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Sin fecha";
  }
};

export default function HistorialAdmin() {
  const { data, loading, recargar } = useAdminDashboard();
  const movimientos = data?.actividadReciente || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Historial</Text>
        <Text style={styles.subtitulo}>Movimientos recientes de tus tandas</Text>
      </View>
      <FlatList
        data={movimientos}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={recargar} />}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20, flexGrow: movimientos.length ? 0 : 1 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Aun no hay actividad registrada</Text>
            <Text style={styles.emptyText}>Cuando ocurra un movimiento en tus tandas aparecera aqui.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Cajatext
            titulo={item.titulo}
            subtitulo={`${item.tanda?.nombre || "Sin tanda"} · ${formatearFecha(item.createdAt)}`}
            icono={
              <View style={styles.iconoBox}>
                <IconoEstado mensaje={item.tipo} />
              </View>
            }
            derecha={
              <View style={styles.derecha}>
                <Text style={styles.estado}>{item.tipo.replaceAll("_", " ")}</Text>
              </View>
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  header: {
    backgroundColor: "#3b82f6",
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  subtitulo: {
    color: "#dbeafe",
    marginTop: 5,
  },
  iconoBox: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  derecha: {
    alignItems: "flex-end",
  },
  estado: {
    fontSize: 12,
    color: "#777",
    textTransform: "capitalize",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
  },
});

