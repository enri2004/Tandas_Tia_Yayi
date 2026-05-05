import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ActionButton from "../../../components/index/ActionButton";
import CardsDashboard from "../../../components/index/cards";
import TandasHomePanel from "../../../components/index/TandasHomePanel";
import ModalMensaje from "../../../components/modal_alert/modal";
import UserAvatar from "../../../components/ui/UserAvatar";
import { useResponsive } from "../../../hooks/useResponsive";
import {
  actualizarUsuarioGuardadoLocal,
  obtenerUsuarioGuardado,
} from "../../../utils/api/login-registrar/authStorage";
import { guardarMiPerfil } from "../../../utils/api/amigos/amigosService";
import { cargarResumenDashboard } from "../../../utils/api/Tandas/tandasService";
import { DashboardResumenResponse } from "../../../utils/api/Tandas/tandasApi";

type DashboardState = DashboardResumenResponse | null;

const formatearFechaActual = () => {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
};

const formatearMoneda = (valor?: number | null) => {
  if (typeof valor !== "number" || Number.isNaN(valor)) {
    return "Sin dato";
  }

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(valor);
};

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { horizontalPadding, titleSize, subtitleSize, bodySize, tandasPanelHeight, isTablet, isDesktop } =
    useResponsive();
  const [dashboard, setDashboard] = useState<DashboardState>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);

  const cargarDatos = useCallback(async () => {
    setError("");
    const usuario = await obtenerUsuarioGuardado();

    if (!usuario?.id) {
      setDashboard(null);
      setLoading(false);
      setError("No se encontro la sesion del usuario.");
      return;
    }

    await cargarResumenDashboard(
      usuario.id,
      (data) => setDashboard(data),
      setLoading,
      (mensaje) => {
        setDashboard(null);
        setError(mensaje);
      }
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [cargarDatos])
  );

  const fechaActual = useMemo(() => formatearFechaActual(), []);
  const usuarioNombre = dashboard?.usuario?.nombre?.split(" ")[0] || "Usuario";
  const notificacionesSinLeer = dashboard?.resumen?.notificacionesSinLeer || 0;
  const misTandas = dashboard?.misTandas || [];
  const fotoPerfil =
    dashboard?.usuario?.fotoPerfil || dashboard?.usuario?.imagen || "";

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

  const irActualizarPerfil = useCallback(async () => {
    setModalPerfilVisible(false);
    router.push("/screen/user/perfil");
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" backgroundColor="#1e73d8" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: Math.max(tabBarHeight - insets.bottom, 18),
          paddingHorizontal: horizontalPadding,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/screen/user/perfil")}
              style={styles.avatarButton}
            >
              <UserAvatar
                uri={fotoPerfil}
                size={isDesktop ? 72 : isTablet ? 66 : 56}
              />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={[styles.saludo, { fontSize: titleSize }]}>{`Hola, ${usuarioNombre}!`}</Text>
              <Text style={[styles.fecha, { fontSize: subtitleSize }]}>{fechaActual}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/screen/user/notificaciones")}
            style={styles.notificationButton}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications-outline" size={26} color="#1f2937" />
            {notificacionesSinLeer > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notificacionesSinLeer > 9 ? "9+" : notificacionesSinLeer}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>

        <CardsDashboard
          tandasActivas={dashboard?.resumen?.tandasActivas || 0}
          proximoPagoMonto={dashboard?.resumen?.proximoPago?.monto ?? null}
          proximaFechaLimite={dashboard?.resumen?.proximoPago?.fechaLimite ?? null}
          proximoTurnoNumero={dashboard?.resumen?.proximoTurno?.numeroTurno ?? null}
          proximoTurnoMonto={dashboard?.resumen?.proximoTurno?.montoRecibir ?? null}
        />

        <Text style={[styles.sectionTitle, { fontSize: titleSize }]}>Seccion de Acciones Rapidas</Text>

        <View style={styles.actions}>
          <ActionButton
            icon={<Ionicons name="wallet" size={32} color="white" />}
            text="Realizar Pago"
            color="green"
            onPress={() => router.push("/screen/user/RegistroPagosUser")}
          />

          <ActionButton
            icon={<Ionicons name="layers" size={32} color="white" />}
            text="Historial"
            color="#3b82f2"
            onPress={() => router.push("/screen/user/historial")}
          />

          <ActionButton
            icon={<Ionicons name="add-circle" size={32} color="white" />}
            text="Unirse a Tanda"
            color="orange"
            onPress={() => router.push("/screen/user/Unir_Tadas")}
          />

          <ActionButton
            icon={<Ionicons name="people" size={32} color="white" />}
            text="Invitar Amigos"
            color="#d017da"
            onPress={() => router.push("/screen/user/invitar")} // ✅
          />
        </View>

        <View style={styles.tandasSection}>
          <Text style={[styles.sectionTitle, { fontSize: titleSize }]}>Mis Tandas</Text>

          <TandasHomePanel
            tandas={misTandas}
            loading={loading}
            error={error}
            maxHeight={tandasPanelHeight}
            onRetry={cargarDatos}
          />
        </View>
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
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 0,
    gap: 12,
    backgroundColor: "#1e73d8",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  headerTextContainer: {
    flex: 1,
  },
  avatarButton: {
    borderRadius: 999,
  },
  saludo: {
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
  },
  fecha: {
    color: "#dbeafe",
    marginTop: 2,
    textTransform: "capitalize",
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 14,
  },
  tandasSection: {
    marginTop: 30,
  },
});
