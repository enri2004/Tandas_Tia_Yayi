import React from "react";
import { StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Gestion from "../../../components/Confi_admin/Gestion";
import Notificacion from "../../../components/Confi_admin/Notificaciones";
import TandasSoport from "../../../components/Confi_admin/Tandas_soport";
import BotonCerrar from "../../../components/Confi_admin/BotonCerrar";
import ProfileCard from "../../../components/Confi_admin/profileCard copy";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import { cerrarSesion } from "../../../utils/api/login-registrar/authStorage";
import { useAdminConfig } from "../../../hooks/useAdminConfig";

export default function ConfigAdmin() {
  const tabBarHeight = useBottomTabBarHeight();
  const { perfil, preferencias, loading, actualizarPreferencias } = useAdminConfig();

  const salir = async () => {
    await cerrarSesion();
    Alert.alert("Sesion cerrada", "La sesion del administrador se cerro correctamente");
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 10 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Configuracion Admin"
          subtitle="Controla tu cuenta y preferencias de administracion"
        />

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
    </SafeAreaView>
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
});

