import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onGaleria: () => void;
  onCamara: () => void;
  loading?: boolean;
};

export default function PerfilImageActions({
  onGaleria,
  onCamara,
  loading = false,
}: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={onGaleria}
        disabled={loading}
      >
        <Text style={styles.secondaryText}>
          {loading ? "Subiendo..." : "Elegir de galeria"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={onCamara}
        disabled={loading}
      >
        <Text style={styles.primaryText}>Tomar foto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: "#e0ecff",
  },
  primaryButton: {
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
});
