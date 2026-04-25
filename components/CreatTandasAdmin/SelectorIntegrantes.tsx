import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Amigo } from "../../utils/api/amigos/amigosTypes";

type Props = {
  amigos: Amigo[];
  seleccionados: string[];
  onToggle: (userId: string) => void;
  creadorId: string;
};

export default function SelectorIntegrantes({
  amigos,
  seleccionados,
  onToggle,
  creadorId,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Integrantes</Text>
      <Text style={styles.subtitle}>
        Selecciona manualmente los integrantes que quieres agregar antes de guardar la tanda.
      </Text>

      {amigos.length === 0 ? (
        <Text style={styles.emptyText}>
          Aun no tienes amigos disponibles para agregar. El creador se incluira automaticamente.
        </Text>
      ) : (
        amigos.map((amigo) => {
          const amigoId = amigo.id;
          const estaSeleccionado = seleccionados.includes(amigoId);
          const esCreador = amigoId === creadorId;

          return (
            <Pressable
              key={amigoId}
              style={[styles.item, estaSeleccionado && styles.itemSelected]}
              onPress={() => onToggle(amigoId)}
              disabled={esCreador}
            >
              <View style={styles.info}>
                <Text style={styles.name}>{amigo.nombre}</Text>
                <Text style={styles.meta}>{amigo.correo || amigo.usuario || "Sin correo"}</Text>
              </View>

              <View style={styles.badgeRow}>
                {esCreador ? <Text style={styles.creatorBadge}>Creador</Text> : null}
                <Ionicons
                  name={estaSeleccionado ? "checkbox" : "square-outline"}
                  size={22}
                  color={estaSeleccionado ? "#22c55e" : "#94a3b8"}
                />
              </View>
            </Pressable>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    color: "#6b7280",
  },
  emptyText: {
    color: "#6b7280",
  },
  item: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemSelected: {
    borderColor: "#22c55e",
    backgroundColor: "#f0fdf4",
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    color: "#111827",
    fontWeight: "600",
  },
  meta: {
    marginTop: 2,
    color: "#6b7280",
    fontSize: 12,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  creatorBadge: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "700",
  },
});
