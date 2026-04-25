import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import FormCard from "../../../components/Confi/FormCard";
import { useAdminConfig } from "../../../hooks/useAdminConfig";

export default function MontosMinimosAdminScreen() {
  const { preferencias, actualizarPreferencias } = useAdminConfig();
  const [monto, setMonto] = useState(preferencias?.montoMinimoCobro || "500");

  useEffect(() => {
    setMonto(preferencias?.montoMinimoCobro || "500");
  }, [preferencias?.montoMinimoCobro]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderConfig />
        <Text style={styles.title}>Montos minimos</Text>
        <Text style={styles.subtitle}>Configura el limite minimo sugerido para nuevas tandas.</Text>

        <FormCard
          title="Monto minimo de cobro"
          fields={[
            {
              key: "monto",
              label: "Monto minimo",
              value: monto,
              onChangeText: setMonto,
              placeholder: "500",
              keyboardType: "numeric",
            },
          ]}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (!monto.trim()) {
              Alert.alert("Campo obligatorio", "Ingresa un monto minimo");
              return;
            }
            await actualizarPreferencias({ montoMinimoCobro: monto.trim() });
            Alert.alert("Exito", "Monto minimo guardado");
          }}
        >
          <Text style={styles.buttonText}>Guardar monto</Text>
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
    marginTop: 16,
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});

