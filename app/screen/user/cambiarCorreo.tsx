import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import FormCard from "../../../components/Confi/FormCard";
import {
  actualizarUsuarioGuardadoLocal,
  obtenerUsuarioGuardado,
} from "../../../utils/api/login-registrar/authStorage";
import { actualizarCorreoUsuario } from "../../../utils/api/login-registrar/userapi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CambiarCorreoScreen() {
  const [userId, setUserId] = useState("");
  const [correoActual, setCorreoActual] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const cargarSesion = async () => {
        const sesion = await obtenerUsuarioGuardado();
        setUserId(sesion?.id || "");
        setCorreoActual(sesion?.correo || "");
        setNuevoCorreo(sesion?.correo || "");
      };

      cargarSesion();
    }, [])
  );

  const guardar = async () => {
    if (!userId) return;

    if (!nuevoCorreo.trim()) {
      Alert.alert("Campos obligatorios", "Debes escribir el nuevo correo");
      return;
    }

    if (!emailRegex.test(nuevoCorreo.trim())) {
      Alert.alert("Correo invalido", "Escribe un correo valido");
      return;
    }

    try {
      setSaving(true);
      const response = await actualizarCorreoUsuario(userId, nuevoCorreo.trim());
      await actualizarUsuarioGuardadoLocal({
        correo: response?.perfil?.correo || nuevoCorreo.trim(),
      });
      Alert.alert("Exito", response?.mensaje || "Correo actualizado correctamente");
      router.back();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo actualizar el correo"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HeaderConfig />
        <FormCard
          title="Cambiar correo"
          subtitle={`Correo actual: ${correoActual || "Sin dato"}`}
          fields={[
            {
              key: "correo",
              label: "Nuevo correo",
              value: nuevoCorreo,
              onChangeText: setNuevoCorreo,
              placeholder: "nuevo@correo.com",
              keyboardType: "email-address",
            },
          ]}
        />

        <TouchableOpacity style={styles.button} onPress={guardar} disabled={saving}>
          <Text style={styles.buttonText}>
            {saving ? "Guardando..." : "Guardar correo"}
          </Text>
        </TouchableOpacity>
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
  button: {
    marginTop: 18,
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
