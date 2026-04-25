import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import SwitchCard from "../../../components/Confi/SwitchCard";
import { useAdminConfig } from "../../../hooks/useAdminConfig";

export default function AdministracionGeneralScreen() {
  const { preferencias, actualizarPreferencias } = useAdminConfig();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderConfig />
        <Text style={styles.title}>Administracion general</Text>
        <Text style={styles.subtitle}>Opciones globales del panel administrativo.</Text>

        <SwitchCard
          title="Revision manual de pagos"
          description="Mantiene la aprobacion de comprobantes bajo supervision administrativa."
          value={preferencias?.revisionManualPagos ?? true}
          onValueChange={async (value) => {
            await actualizarPreferencias({ revisionManualPagos: value });
            Alert.alert("Preferencia guardada", "La administracion general fue actualizada");
          }}
        />

        <SwitchCard
          title="Administracion global activa"
          description="Permite mantener acciones globales listas para futuras reglas centralizadas."
          value={preferencias?.permitirAdministracionGlobal ?? true}
          onValueChange={async (value) => {
            await actualizarPreferencias({ permitirAdministracionGlobal: value });
            Alert.alert("Preferencia guardada", "La administracion general fue actualizada");
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
