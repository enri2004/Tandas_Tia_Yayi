import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import Hader from "../../../components/indexadmin/HarderIndexadmin";
import CardResumen from "../../../components/indexadmin/CardsAdmin";
import TandasAdminPanel from "../../../components/indexadmin/TandasAdminPanel";
import ModalMensaje from "../../../components/modal_alert/modal";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useAdminDashboard } from "../../../hooks/useAdminDashboard";
import { useResponsive } from "../../../hooks/useResponsive";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  actualizarUsuarioGuardadoLocal,
  obtenerUsuarioGuardado,
} from "../../../utils/api/login-registrar/authStorage";
import { guardarMiPerfil } from "../../../utils/api/amigos/amigosService";

export default function AdminDashboard() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { horizontalPadding, titleSize, tandasPanelHeight } = useResponsive();
  const { data, loading, error, recargar } = useAdminDashboard();
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);

  const revisarModalPerfil = useCallback(async () => {
    const usuario = await obtenerUsuarioGuardado();

    if (
      usuario?.mostrarModalActualizarDatos &&
      !usuario?.perfilActualizado
    ) {
      setModalPerfilVisible(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      revisarModalPerfil();
    }, [revisarModalPerfil])
  );

  const omitirActualizacionPerfil = useCallback(async () => {
    const usuario = await obtenerUsuarioGuardado();

    if (!usuario?.id) {
      setModalPerfilVisible(false);
      return;
    }

    try {
      await guardarMiPerfil(usuario.id, {
        mostrarModalActualizarDatos: false,
      });
      await actualizarUsuarioGuardadoLocal({
        mostrarModalActualizarDatos: false,
      });
    } catch (modalError) {
      console.log("No se pudo actualizar la preferencia del modal", modalError);
    } finally {
      setModalPerfilVisible(false);
    }
  }, []);

  const irActualizarPerfil = useCallback(() => {
    setModalPerfilVisible(false);
    router.push("/screen/admin/perfil");
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" backgroundColor="#1e73d8" />
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={recargar} />}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: Math.max(tabBarHeight - insets.bottom, 18),
          paddingHorizontal: horizontalPadding,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Hader
          adminName={data?.admin?.nombre || "Administrador"}
          notificacionesSinLeer={data?.resumen?.notificacionesSinLeer || 0}
          fotoPerfil={data?.admin?.fotoPerfil || data?.admin?.imagen || ""}
        />

        <CardResumen
          tandasActivas={data?.resumen?.tandasActivas || 0}
          dineroRecaudado={data?.resumen?.dineroRecaudado || 0}
          pagosPendientes={data?.resumen?.pagosPendientes || 0}
          tandasFinalizadas={data?.resumen?.tandasFinalizadas || 0}
        />

        <Text style={[styles.section, { fontSize: titleSize }]}>Tandas activas</Text>
        <TandasAdminPanel
          tandas={data?.tandas || []}
          loading={loading}
          error={error}
          maxHeight={tandasPanelHeight}
        />
      </ScrollView>

      <ModalMensaje
        visible={modalPerfilVisible}
        titulo="Actualiza tus datos"
        mensaje="Completa tu informacion de perfil para mejorar tu experiencia."
        textoBoton="Actualizar datos"
        textoBotonSecundario="Despues"
        onClose={irActualizarPerfil}
        onSecondaryAction={omitirActualizacionPerfil}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f6fa" },
  container: { backgroundColor: "#f5f6fa", flex: 1 },
  section: { fontWeight: "bold", marginTop: 20, marginBottom: 10, color: "#111827" },
});

