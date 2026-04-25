import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Amigo } from "../../utils/api/amigos/amigosTypes";

type Props = {
  amigo: Amigo;
  onPress?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
  onAction?: () => void;
  actionLabel?: string;
  actionDisabled?: boolean;
};

export default function CardAmigo({
  amigo,
  onPress,
  onRemove,
  removeLabel = "Eliminar",
  onAction,
  actionLabel,
  actionDisabled = false,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.infoRow}>
        <Image
          source={{ uri: amigo.imagen || "https://i.pravatar.cc/120?u=" + amigo.id }}
          style={styles.avatar}
        />
        <View style={styles.texts}>
          <Text style={styles.nombre}>{amigo.nombre}</Text>
          <Text style={styles.usuario}>@{amigo.usuario}</Text>
          <Text style={styles.extra}>{amigo.correo}</Text>
        </View>
      </View>

      {onAction ? (
        <TouchableOpacity
          style={[styles.actionButton, actionDisabled && styles.actionButtonDisabled]}
          onPress={onAction}
          disabled={actionDisabled}
        >
          <Text style={styles.actionText}>{actionLabel || "Accion"}</Text>
        </TouchableOpacity>
      ) : null}

      {onRemove ? (
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeText}>{removeLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
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
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
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
  removeButton: {
    alignSelf: "flex-end",
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fee2e2",
  },
  removeText: {
    color: "#b91c1c",
    fontWeight: "700",
  },
  actionButton: {
    alignSelf: "flex-end",
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#2563eb",
  },
  actionButtonDisabled: {
    backgroundColor: "#cbd5e1",
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
});
