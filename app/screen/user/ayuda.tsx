import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import InfoCard from "../../../components/Confi/InfoCard";

export default function AyudaScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HeaderConfig />
        <Text style={styles.title}>Ayuda</Text>
        <Text style={styles.subtitle}>Preguntas frecuentes de la app</Text>

        <InfoCard
          title="Como me uno a una tanda?"
          description="Desde el inicio toca 'Unirse a Tanda' y sigue el proceso de registro dentro de la tanda disponible."
        />
        <InfoCard
          title="Como veo mis pagos?"
          description="Entra a la seccion de historial o revisa los detalles de tu tanda para ver pagos, progreso y fechas."
        />
        <InfoCard
          title="Como agrego amigos?"
          description="En la opcion Amigos puedes buscar usuarios, enviar solicitudes y administrar tu lista de amistades."
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 4,
    marginBottom: 16,
  },
});
