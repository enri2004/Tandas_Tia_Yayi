import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import InfoCard from "../../../components/Confi/InfoCard";

export default function AyudaAdminScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HeaderConfig />
        <Text style={styles.title}>Ayuda</Text>
        <Text style={styles.subtitle}>Preguntas frecuentes del panel administrativo</Text>

        <InfoCard
          title="Como administro usuarios?"
          description="En la opcion Usuarios puedes buscar perfiles, revisar informacion basica y enviar solicitudes si tu flujo lo requiere."
        />
        <InfoCard
          title="Como reviso comprobantes?"
          description="Desde el modulo de pagos puedes abrir comprobantes pendientes y aprobarlos o rechazarlos."
        />
        <InfoCard
          title="Como ajusto reglas y montos?"
          description="Desde configuracion puedes cambiar reglas internas, montos minimos y parametros globales del panel admin."
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f6fa" },
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 16 },
  title: { fontSize: 24, fontWeight: "700", color: "#111827" },
  subtitle: { color: "#6b7280", marginTop: 4, marginBottom: 16 },
});
