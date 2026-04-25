import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SolicitudAmistad } from "../../utils/api/amigos/amigosTypes";

type Props = {
  solicitud: SolicitudAmistad;
  onAceptar: () => void;
  onRechazar: () => void;
};

export default function CardSolicitud({ solicitud, onAceptar, onRechazar }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{ uri: solicitud.imagen || "https://i.pravatar.cc/120?u=" + solicitud.id }}
          style={styles.avatar}
        />
        <View style={styles.texts}>
          <Text style={styles.nombre}>{solicitud.nombre}</Text>
          <Text style={styles.usuario}>@{solicitud.usuario}</Text>
          <Text style={styles.extra}>{solicitud.correo}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.acceptButton} onPress={onAceptar}>
          <Text style={styles.acceptText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={onRechazar}>
          <Text style={styles.rejectText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    backgroundColor: "#e5e7eb",
  },
  texts: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  usuario: {
    color: "#2563eb",
    marginTop: 2,
  },
  extra: {
    color: "#6b7280",
    marginTop: 2,
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  rejectButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  acceptText: {
    color: "#fff",
    fontWeight: "700",
  },
  rejectText: {
    color: "#111827",
    fontWeight: "700",
  },
});
