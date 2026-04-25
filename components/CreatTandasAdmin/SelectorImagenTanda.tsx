import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  imageUri?: string;
  onGaleria: () => void;
  onCamara: () => void;
};

export default function SelectorImagenTanda({
  imageUri,
  onGaleria,
  onCamara,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Imagen de la tanda</Text>

      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : require("../../assets/images/icon.png")
        }
        style={styles.preview}
      />

      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.secondary]} onPress={onGaleria}>
          <Text style={styles.secondaryText}>Galeria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.primary]} onPress={onCamara}>
          <Text style={styles.primaryText}>Camara</Text>
        </TouchableOpacity>
      </View>

      {!imageUri ? (
        <Text style={styles.helper}>
          Si no eliges una imagen, la app mostrara la imagen por defecto.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    color: "#111827",
    fontWeight: "700",
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 170,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondary: {
    backgroundColor: "#e0ecff",
  },
  primary: {
    backgroundColor: "#2563eb",
  },
  secondaryText: {
    color: "#1d4ed8",
    fontWeight: "700",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },
  helper: {
    color: "#6b7280",
    marginTop: 10,
    fontSize: 12,
  },
});
