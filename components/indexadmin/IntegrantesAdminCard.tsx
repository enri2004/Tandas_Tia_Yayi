import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { IntegranteItem } from "../../utils/api/Tandas/tandasTypes";

type Props = {
  integrantes: IntegranteItem[];
};

export default function IntegrantesAdminCard({ integrantes }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Integrantes actuales</Text>
      {integrantes.length === 0 ? (
        <Text style={styles.emptyText}>Aun no hay integrantes registrados en esta tanda.</Text>
      ) : (
        integrantes.map((integrante, index) => (
          <View key={integrante._id} style={styles.item}>
            <View style={styles.turnoBadge}>
              <Text style={styles.turnoText}>{index + 1}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{integrante.nombre}</Text>
              <Text style={styles.meta}>{integrante.correo || "Sin correo"}</Text>
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
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  emptyText: {
    color: "#4b5563",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  turnoBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  turnoText: {
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
    color: "#6b7280",
    fontSize: 12,
    marginTop: 2,
  },
});
