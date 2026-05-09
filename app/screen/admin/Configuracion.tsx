import React from "react";
import ScreenSafeArea from "@/components/layout/ScreenSafeArea";
import { StyleSheet, ScrollView, Alert, ActivityIndicator, Text, View } from "react-native";
import { router } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Gestion from "../../../components/Confi_admin/Gestion";
import Notificacion from "../../../components/Confi_admin/Notificaciones";
import TandasSoport from "../../../components/Confi_admin/Tandas_soport";
import BotonCerrar from "../../../components/Confi_admin/BotonCerrar";
import ProfileCard from "../../../components/Confi_admin/profileCard copy";
import Item from "../../../components/Confi_admin/item";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminConfig } from "../../../hooks/useAdminConfig";

export default function ConfigAdmin() {
  const tabBarHeight = useBottomTabBarHeight();
  const { logout } = useAuth();
  const { perfil, preferencias, loading, actualizarPreferencias } = useAdminConfig();

  const salir = async () => {
    await logout();
    Alert.alert("Sesión cerrada", "La sesión del administrador se cerró correctamente.");
  };

  return (
    <ScreenSafeArea hasBlueHeader backgroundColor="#F2F2F2">
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 10 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Configuración Admin"
          subtitle="Controla tu cuenta y preferencias de administración"
        />

        {loading ? (
          <ActivityIndicator size="small" color="#2563eb" style={styles.loader} />
        ) : null}

        <ProfileCard perfil={perfil} onPress={() => router.push("/screen/admin/perfil")} />
        <Gestion />
        <View>
          <Text style={styles.section}>CUENTA</Text>
          <View style={styles.card}>
            <Item
              icon="mail-outline"
              title="Cambiar correo"
              subtitle="Actualiza el correo de acceso"
              onPress={() => router.push("/screen/admin/cambiarCorreo")}
            />
            <Item
              icon="lock-closed-outline"
              title="Cambiar contraseña"
              subtitle="Modifica tu contraseña actual"
              onPress={() => router.push("/screen/admin/cambiarPassword")}
            />
          </View>
        </View>
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
    </ScreenSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 15,
  },
  loader: {
    marginBottom: 12,
  },
  section: {
    marginTop: 6,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#888",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
});
