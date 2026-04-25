import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import SwitchCard from "../../../components/Confi/SwitchCard";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";
import {
  guardarPreferenciasUsuario,
  obtenerPreferenciasUsuario,
} from "../../../utils/api/configuracion/configuracionStorage";

export default function PrivacidadScreen() {
  const [userId, setUserId] = useState("");
  const [perfilPrivado, setPerfilPrivado] = useState(false);
  const [permitirSolicitudes, setPermitirSolicitudes] = useState(true);

  const persistir = async (partial: {
    perfilPrivado?: boolean;
    permitirSolicitudesAmistad?: boolean;
  }) => {
    if (!userId) return;
    const prev = await obtenerPreferenciasUsuario(userId);
    await guardarPreferenciasUsuario(userId, {
      ...prev,
      ...partial,
    });
  };

  useFocusEffect(
    useCallback(() => {
      const cargar = async () => {
        const sesion = await obtenerUsuarioGuardado();
        if (!sesion?.id) return;
        setUserId(sesion.id);
        const preferencias = await obtenerPreferenciasUsuario(sesion.id);
        setPerfilPrivado(preferencias.perfilPrivado);
        setPermitirSolicitudes(preferencias.permitirSolicitudesAmistad);
      };

      cargar();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderConfig />
        <Text style={styles.title}>Privacidad</Text>
        <Text style={styles.subtitle}>
          Estas opciones quedan listas para conectarse con backend si luego decides
          persistirlas en la base de datos.
        </Text>

        <SwitchCard
          title="Perfil privado"
          description="Oculta parte de tu informacion para otros usuarios de la app."
          value={perfilPrivado}
          onValueChange={async (value) => {
            setPerfilPrivado(value);
            await persistir({ perfilPrivado: value });
          }}
        />

        <SwitchCard
          title="Permitir solicitudes de amistad"
          description="Si lo desactivas, otros usuarios no podran enviarte nuevas solicitudes."
          value={permitirSolicitudes}
          onValueChange={async (value) => {
            setPermitirSolicitudes(value);
            await persistir({ permitirSolicitudesAmistad: value });
          }}
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
