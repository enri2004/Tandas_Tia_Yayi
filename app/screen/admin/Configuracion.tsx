import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Gestion from "../../../components/Confi_admin/Gestion";
import Notificacion from "../../../components/Confi_admin/Notificaciones";
import TandasSoport from "../../../components/Confi_admin/Tandas_soport";
import BotonCerrar from "../../../components/Confi_admin/BotonCerrar";
import ProfileCard from "../../../components/Confi_admin/profileCard copy";
import { cerrarSesion } from "../../../utils/api/login-registrar/authStorage";
import { useAdminConfig } from "../../../hooks/useAdminConfig";

export default function ConfigAdmin() {
  const { perfil, preferencias, loading, actualizarPreferencias } = useAdminConfig();

  const salir = async () => {
    await cerrarSesion();
    Alert.alert("Sesion cerrada", "La sesion del administrador se cerro correctamente");
    router.replace("/");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={24} color="#333" />
        <Text style={styles.title}>Configuracion de administracion</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="#2563eb" style={styles.loader} />
      ) : null}

      <ProfileCard perfil={perfil} onPress={() => router.push("/screen/admin/perfil")} />
      <Gestion />
      <Notificacion
        notificacionesActivas={preferencias?.notificacionesActivas ?? true}
        onToggleNotificaciones={(value) => actualizarPreferencias({ notificacionesActivas: value })}
        onOpenSonidos={() => router.push("/screen/admin/sonidos")}
      />
      <TandasSoport
        onOpenMetodosPago={() => router.push("/screen/admin/metodosPago")}
        onOpenHistorial={() => router.push("/screen/admin/historialTandas")}
        onOpenPrivacidad={() => router.push("/screen/admin/privacidad")}
        onOpenAyuda={() => router.push("/screen/admin/ayuda")}
        onOpenContacto={() => router.push("/screen/admin/contacto")}
      />

      <BotonCerrar onPress={salir} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  loader: {
    marginBottom: 12,
  },
});

