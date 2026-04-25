import Constants from "expo-constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import InfoCard from "../../../components/Confi/InfoCard";

export default function AcercaScreen() {
  const version = Constants.expoConfig?.version || "1.0.0";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderConfig />
        <Text style={styles.title}>Acerca de</Text>
        <Text style={styles.subtitle}>Informacion general de la app</Text>

        <InfoCard title="Nombre de la app" description="Tandas-app" />
        <InfoCard title="Version" description={version} />
        <InfoCard
          title="Descripcion"
          description="Aplicacion para administrar tandas, pagos, notificaciones, historial y relacion entre usuarios."
        />
      </View>
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
