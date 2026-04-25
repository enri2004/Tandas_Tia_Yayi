import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ActionButton from "../../../components/index/ActionButton";
import CardsDashboard from "../../../components/index/cards";
import TandasHomePanel from "../../../components/index/TandasHomePanel";
import { useResponsive } from "../../../hooks/useResponsive";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";
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
  const { horizontalPadding, titleSize, subtitleSize, bodySize, tandasPanelHeight, isTablet, isDesktop } =
    useResponsive();
  const [dashboard, setDashboard] = useState<DashboardState>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 34 + Math.max(insets.bottom, 8),
          paddingHorizontal: horizontalPadding,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={require("../../../assets/images/icon.png")}
              style={[styles.imagen, { width: isDesktop ? 72 : isTablet ? 66 : 56, height: isDesktop ? 72 : isTablet ? 66 : 56 }]}
            />

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
  imagen: {
    borderRadius: 999,
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
