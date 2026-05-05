import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Usuario } from "../../utils/api/amigos/amigosTypes";
import UserAvatar from "../ui/UserAvatar";

type Props = {
  perfil: Usuario;
  subtitle?: string;
};

export default function PerfilHeader({ perfil, subtitle }: Props) {
  return (
    <View style={styles.card}>
      <UserAvatar uri={perfil?.fotoPerfil || perfil?.imagen} size={88} />
      <Text style={styles.nombre}>{perfil.nombre}</Text>
      <Text style={styles.usuario}>@{perfil.usuario}</Text>
      <Text style={styles.correo}>{perfil.correo}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  usuario: {
    color: "#2563eb",
    marginTop: 4,
  },
  correo: {
    color: "#6b7280",
    marginTop: 4,
  },
  subtitle: {
    marginTop: 8,
    color: "#4b5563",
    textAlign: "center",
  },
});
