import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import SwitchCard from "../../../components/Confi/SwitchCard";
import { useAdminConfig } from "../../../hooks/useAdminConfig";

export default function PrivacidadAdminScreen() {
  const { preferencias, actualizarPreferencias } = useAdminConfig();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderConfig />
        <Text style={styles.title}>Privacidad</Text>
        <Text style={styles.subtitle}>
          Estas opciones dejan la estructura lista para conectarse despues con backend.
        </Text>

        <SwitchCard
          title="Refuerzo de privacidad"
          description="Reduce la exposicion de datos sensibles en vistas administrativas secundarias."
          value={preferencias?.privacidadRefuerzo ?? false}
          onValueChange={(value) => actualizarPreferencias({ privacidadRefuerzo: value })}
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

