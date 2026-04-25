import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  codigoInvitacion: string;
  qrValue: string;
  onCompartir: () => void;
};

export default function InvitacionTandaCard({
  codigoInvitacion,
  qrValue,
  onCompartir,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Invitacion a la tanda</Text>
      <Text style={styles.subtitle}>
        Comparte este codigo o el QR para que otros usuarios abran la tanda correcta.
      </Text>

      <View style={styles.codeBox}>
        <Text style={styles.codeLabel}>Codigo de invitacion</Text>
        <Text style={styles.codeValue}>{codigoInvitacion}</Text>
      </View>

      <View style={styles.qrBox}>
        <QRCode value={qrValue} size={170} color="#111827" backgroundColor="#fff" />
      </View>

      <Pressable style={styles.button} onPress={onCompartir}>
        <Ionicons name="share-social-outline" size={18} color="#fff" />
        <Text style={styles.buttonText}>Compartir invitacion</Text>
      </Pressable>
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
  },
  subtitle: {
    color: "#4b5563",
    marginTop: 4,
    marginBottom: 12,
  },
  codeBox: {
    backgroundColor: "#f5f6fa",
    borderRadius: 12,
    padding: 12,
  },
  codeLabel: {
    color: "#6b7280",
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  codeValue: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: 1.2,
  },
  qrBox: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#3b82f6",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
