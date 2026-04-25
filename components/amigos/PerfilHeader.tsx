import React, { useMemo, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Usuario } from "../../utils/api/amigos/amigosTypes";

type Props = {
  perfil: Usuario;
  subtitle?: string;
};

export default function PerfilHeader({ perfil, subtitle }: Props) {
  const [imageError, setImageError] = useState(false);

  const avatarSource = useMemo<ImageSourcePropType>(() => {
    if (!imageError && perfil?.imagen) {
      return { uri: perfil.imagen };
    }

    return require("../../assets/images/icon.png");
  }, [imageError, perfil?.imagen]);

  return (
    <View style={styles.card}>
      <Image
        source={avatarSource}
        style={styles.avatar}
        onError={() => setImageError(true)}
      />
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
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#e5e7eb",
    marginBottom: 12,
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
