import type { TandaItem } from "@/utils/api/Tandas/tandasTypes";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  data: TandaItem[];
  loading?: boolean;
  joiningId?: string | null;
  currentUserId?: string;
  onJoin: (tandaId: string) => void;
};

export default function ListaTandas({
  data,
  loading = false,
  joiningId = null,
  currentUserId = "",
  onJoin,
}: Props) {
  if (loading) {
    return (
      <View style={styles.emptyState}>
        <ActivityIndicator size="large" color="#22C55E" />
        <Text style={styles.emptyText}>Cargando tandas disponibles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.section}>Tandas disponibles:</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No hay tandas disponibles para mostrar.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const integrantes = Array.isArray(item.integrantes)
            ? item.integrantes
            : [];
          const totalIntegrantes = integrantes.length;
          const lugaresDisponibles = Math.max(
            (item.participantes || 0) - totalIntegrantes,
            0
          );
          const yaEsIntegrante = integrantes.some((integrante) =>
            typeof integrante === "string"
              ? integrante === currentUserId
              : integrante?._id === currentUserId
          );
          const estaUniendose = joiningId === item._id;
          const imagenEsRemota =
            typeof item.imagen === "string" &&
            (item.imagen.startsWith("http://") ||
              item.imagen.startsWith("https://"));

          return (
            <View style={styles.item}>
              <Image
                source={
                  imagenEsRemota
                    ? { uri: item.imagen }
                    : require("../../assets/images/image.png")
                }
                style={styles.icon}
              />

              <View style={styles.info}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.pago}>${item.pago} MXN</Text>
                <Text style={styles.lugares}>
                  Lugares:{" "}
                  <Text
                    style={{
                      color: lugaresDisponibles > 0 ? "green" : "#ef4444",
                    }}
                  >
                    {lugaresDisponibles} disponibles
                  </Text>
                </Text>
              </View>

              <Pressable
                style={[
                  styles.joinBtn,
                  (yaEsIntegrante ||
                    lugaresDisponibles === 0 ||
                    estaUniendose) &&
                    styles.joinBtnDisabled,
                ]}
                onPress={() => onJoin(item._id)}
                disabled={yaEsIntegrante || lugaresDisponibles === 0 || estaUniendose}
              >
                <Text style={styles.joinText}>
                  {estaUniendose
                    ? "Uniendo..."
                    : yaEsIntegrante
                    ? "Unido"
                    : lugaresDisponibles === 0
                    ? "Llena"
                    : "Unirme"}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
    padding: 15,
    top: "10%",
  },
  section: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#F7F6F2",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 14,
  },
  pago: {
    fontSize: 12,
    color: "#555",
  },
  lugares: {
    fontSize: 12,
  },
  joinBtn: {
    backgroundColor: "#22C55E",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  joinBtnDisabled: {
    backgroundColor: "#94a3b8",
  },
  joinText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#475569",
    marginTop: 10,
    textAlign: "center",
  },
});
