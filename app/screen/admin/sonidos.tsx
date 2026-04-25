import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import SwitchCard from "../../../components/Confi/SwitchCard";
import { useAdminConfig } from "../../../hooks/useAdminConfig";

export default function SonidosAdminScreen() {
  const { preferencias, actualizarPreferencias } = useAdminConfig();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderConfig />
        <Text style={styles.title}>Sonidos</Text>
        <Text style={styles.subtitle}>
          Controla los sonidos y alertas del panel administrativo.
        </Text>

        <SwitchCard
          title="Sonidos del panel"
          description="Activa o desactiva los sonidos al revisar pagos y notificaciones administrativas."
          value={preferencias?.sonidos ?? true}
          onValueChange={async (value) => {
            await actualizarPreferencias({ sonidos: value });
            Alert.alert(
              "Preferencia guardada",
              value ? "Los sonidos quedaron activados" : "Los sonidos quedaron desactivados"
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f6fa" },
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 16 },
  title: { fontSize: 24, fontWeight: "700", color: "#111827" },
  subtitle: { color: "#6b7280", marginTop: 4, marginBottom: 16 },
});

