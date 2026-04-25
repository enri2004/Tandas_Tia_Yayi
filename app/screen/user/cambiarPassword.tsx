import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import FormCard from "../../../components/Confi/FormCard";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";
import { actualizarPasswordUsuario } from "../../../utils/api/login-registrar/userapi";

export default function CambiarPasswordScreen() {
  const [userId, setUserId] = useState("");
  const [passwordActual, setPasswordActual] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const cargarSesion = async () => {
        const sesion = await obtenerUsuarioGuardado();
        setUserId(sesion?.id || "");
      };

      cargarSesion();
    }, [])
  );

  const guardar = async () => {
    if (!userId) return;

    if (!passwordActual || !nuevaPassword || !confirmarPassword) {
      Alert.alert("Campos obligatorios", "Completa todos los campos");
      return;
    }

    if (nuevaPassword.length < 6) {
      Alert.alert(
        "Contrasena invalida",
        "La nueva contrasena debe tener al menos 6 caracteres"
      );
      return;
    }

    if (nuevaPassword !== confirmarPassword) {
      Alert.alert(
        "Contrasenas distintas",
        "La confirmacion de contrasena no coincide"
      );
      return;
    }

    try {
      setSaving(true);
      const response = await actualizarPasswordUsuario(userId, {
        passwordActual,
        nuevaPassword,
        confirmarPassword,
      });

      setPasswordActual("");
      setNuevaPassword("");
      setConfirmarPassword("");
      Alert.alert(
        "Exito",
        response?.mensaje || "Contrasena actualizada correctamente"
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo actualizar la contrasena"
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
          title="Cambiar contrasena"
          subtitle="Escribe tu contrasena actual y la nueva contrasena."
          fields={[
            {
              key: "actual",
              label: "Contrasena actual",
              value: passwordActual,
              onChangeText: setPasswordActual,
              placeholder: "Contrasena actual",
              secureTextEntry: true,
            },
            {
              key: "nueva",
              label: "Nueva contrasena",
              value: nuevaPassword,
              onChangeText: setNuevaPassword,
              placeholder: "Nueva contrasena",
              secureTextEntry: true,
            },
            {
              key: "confirmar",
              label: "Confirmar nueva contrasena",
              value: confirmarPassword,
              onChangeText: setConfirmarPassword,
              placeholder: "Confirma la nueva contrasena",
              secureTextEntry: true,
            },
          ]}
        />

        <TouchableOpacity style={styles.button} onPress={guardar} disabled={saving}>
          <Text style={styles.buttonText}>
            {saving ? "Guardando..." : "Guardar contrasena"}
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
