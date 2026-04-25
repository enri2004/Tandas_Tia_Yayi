import React from "react";
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import InfoCard from "../../../components/Confi/InfoCard";

export default function ContactoAdminScreen() {
  const abrirEnlace = async (url: string, errorText: string) => {
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      Alert.alert("No disponible", errorText);
      return;
    }

    await Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderConfig />
        <Text style={styles.title}>Contacto</Text>
        <Text style={styles.subtitle}>Canales disponibles para soporte administrativo</Text>

        <InfoCard title="Correo" description="soporte.admin@tandaapp.com" />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            abrirEnlace(
              "mailto:soporte.admin@tandaapp.com?subject=Soporte%20Admin%20Tanda-app",
              "No se pudo abrir la aplicacion de correo"
            )
          }
        >
          <Text style={styles.buttonText}>Enviar correo</Text>
        </TouchableOpacity>

        <InfoCard title="WhatsApp" description="+52 55 1234 5678" />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            abrirEnlace(
              "https://wa.me/525512345678?text=Hola,%20necesito%20soporte%20administrativo%20de%20Tanda-app",
              "No se pudo abrir WhatsApp en este dispositivo"
            )
          }
        >
          <Text style={styles.buttonText}>Abrir WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f6fa" },
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 16 },
  title: { fontSize: 24, fontWeight: "700", color: "#111827" },
  subtitle: { color: "#6b7280", marginTop: 4, marginBottom: 16 },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});
