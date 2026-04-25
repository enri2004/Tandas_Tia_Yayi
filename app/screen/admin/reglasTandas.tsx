import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import FormCard from "../../../components/Confi/FormCard";
import { useAdminConfig } from "../../../hooks/useAdminConfig";

export default function ReglasTandasAdminScreen() {
  const { preferencias, actualizarPreferencias } = useAdminConfig();
  const [reglas, setReglas] = useState(preferencias?.reglasTandas || "");

  useEffect(() => {
    setReglas(preferencias?.reglasTandas || "");
  }, [preferencias?.reglasTandas]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderConfig />
        <FormCard
          title="Reglas de tandas"
          subtitle="Define las reglas principales del modulo administrativo. Por ahora quedan guardadas localmente para dejar la base preparada."
          fields={[
            {
              key: "reglas",
              label: "Reglas y parametros",
              value: reglas,
              onChangeText: setReglas,
              placeholder: "Escribe las reglas de operacion",
            },
          ]}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await actualizarPreferencias({ reglasTandas: reglas.trim() });
            Alert.alert("Exito", "Las reglas quedaron guardadas");
          }}
        >
          <Text style={styles.buttonText}>Guardar reglas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f6fa" },
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 16 },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});

