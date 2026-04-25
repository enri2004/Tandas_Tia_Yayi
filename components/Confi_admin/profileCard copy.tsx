import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType, Pressable } from "react-native";
import { Usuario } from "../../utils/api/amigos/amigosTypes";

type Props = {
  perfil?: Partial<Usuario> | null;
  onPress?: () => void;
};

export default function ProfileCard({ perfil, onPress }: Props) {
  const [imageError, setImageError] = useState(false);

  const avatarSource = useMemo<ImageSourcePropType>(() => {
    if (!imageError && perfil?.imagen) {
      return { uri: perfil.imagen };
    }

    return require("../../assets/images/icon.png");
  }, [imageError, perfil?.imagen]);

  return (
    <Pressable style={styles.card} onPress={onPress} disabled={!onPress}>
      <Image source={avatarSource} style={styles.avatar} onError={() => setImageError(true)} />
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
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
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
