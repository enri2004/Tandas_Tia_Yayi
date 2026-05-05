import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Usuario } from "../../utils/api/amigos/amigosTypes";
import UserAvatar from "../ui/UserAvatar";

type Props = {
  perfil?: Partial<Usuario> | null;
  onPress?: () => void;
};

export default function ProfileCard({ perfil, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress} disabled={!onPress}>
      <UserAvatar uri={perfil?.fotoPerfil || perfil?.imagen} size={60} />
      <View>
        <Text style={styles.name}>{perfil?.nombre || "Administrador"}</Text>
        <Text style={styles.email}>{perfil?.correo || "Sin correo"}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    color: "#777",
  },
});
