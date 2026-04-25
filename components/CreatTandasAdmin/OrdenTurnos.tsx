import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Amigo } from "../../utils/api/amigos/amigosTypes";

type Props = {
  integrantesOrdenados: Amigo[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
};

export default function OrdenTurnos({
  integrantesOrdenados,
  onMoveUp,
  onMoveDown,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Orden de turnos</Text>
      <Text style={styles.subtitle}>
        Ajusta el orden manualmente antes de guardar. El lugar en esta lista sera el turno de cada integrante.
      </Text>

      {integrantesOrdenados.length === 0 ? (
        <Text style={styles.emptyText}>Selecciona integrantes para definir el orden de turnos.</Text>
      ) : (
        integrantesOrdenados.map((integrante, index) => (
          <View key={integrante.id} style={styles.item}>
            <View style={styles.turnBadge}>
              <Text style={styles.turnBadgeText}>{index + 1}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{integrante.nombre}</Text>
              <Text style={styles.meta}>{integrante.correo || integrante.usuario || "Sin correo"}</Text>
            </View>

            <View style={styles.actions}>
              <Pressable
                onPress={() => onMoveUp(index)}
                disabled={index === 0}
                style={[styles.actionButton, index === 0 && styles.actionButtonDisabled]}
              >
                <Ionicons
                  name="chevron-up"
                  size={18}
                  color={index === 0 ? "#cbd5e1" : "#111827"}
                />
              </Pressable>
              <Pressable
                onPress={() => onMoveDown(index)}
                disabled={index === integrantesOrdenados.length - 1}
                style={[
                  styles.actionButton,
                  index === integrantesOrdenados.length - 1 && styles.actionButtonDisabled,
                ]}
              >
                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={index === integrantesOrdenados.length - 1 ? "#cbd5e1" : "#111827"}
                />
              </Pressable>
            </View>
          </View>
        ))
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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  turnBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  turnBadgeText: {
    color: "#166534",
    fontWeight: "700",
  },
  info: {
    flex: 1,
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
  actions: {
    gap: 8,
  },
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonDisabled: {
    borderColor: "#e5e7eb",
    backgroundColor: "#f8fafc",
  },
});
