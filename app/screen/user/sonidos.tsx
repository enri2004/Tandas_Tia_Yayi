import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import SwitchCard from "../../../components/Confi/SwitchCard";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";
import {
  guardarPreferenciasUsuario,
  obtenerPreferenciasUsuario,
} from "../../../utils/api/configuracion/configuracionStorage";

export default function SonidosScreen() {
  const [userId, setUserId] = useState("");
  const [sonidos, setSonidos] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const cargar = async () => {
        const sesion = await obtenerUsuarioGuardado();
        if (!sesion?.id) return;
        setUserId(sesion.id);
        const preferencias = await obtenerPreferenciasUsuario(sesion.id);
        setSonidos(preferencias.sonidos);
      };

      cargar();
    }, [])
  );

  const actualizar = async (value: boolean) => {
    setSonidos(value);

    if (!userId) return;

    const preferencias = await obtenerPreferenciasUsuario(userId);
    await guardarPreferenciasUsuario(userId, {
      ...preferencias,
      sonidos: value,
    });

    Alert.alert(
      "Preferencia guardada",
      value ? "Los sonidos quedaron activados" : "Los sonidos quedaron desactivados"
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderConfig />
        <Text style={styles.title}>Sonidos</Text>
        <Text style={styles.subtitle}>
          Controla si la app debe reproducir sonidos al mostrar alertas o avisos.
        </Text>

        <SwitchCard
          title="Sonidos de la app"
          description="Activa o desactiva los sonidos de confirmacion y aviso."
          value={sonidos}
          onValueChange={actualizar}
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
