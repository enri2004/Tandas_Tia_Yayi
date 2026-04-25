import React from "react";
import { View, Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CardReporte from "../../../components/Reporteadmin/CardsRetporte";
import Graficas from "../../../components/Reporteadmin/Graficas";
import EstadoTandas from "../../../components/Reporteadmin/Estado";
import Crecimiento from "../../../components/Reporteadmin/Crecimiento";
import ActividadReciente from "../../../components/Reporteadmin/ActividadReciente";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAdminDashboard } from "../../../hooks/useAdminDashboard";

const formatearMoneda = (valor: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(Number(valor || 0));

const formatearFecha = (fecha: string) => {
  try {
    return new Date(fecha).toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

export default function ReporteScreen() {
  const { data, loading, error, recargar } = useAdminDashboard();

  const resumen = data?.resumen;
  const actividad = data?.actividadReciente?.[0];
  const totalTandas = resumen?.totalTandas || 0;
  const avance = resumen?.totalEsperado
    ? (Number(resumen.dineroRecaudado || 0) / Number(resumen.totalEsperado || 1)) * 100
    : 0;

  return (
    <SafeAreaView style={styles.padre}>
      <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={recargar} />}>
        <Text style={styles.titulo}>Analisis Global de Tandas</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.grid}>
          <CardReporte
            icon={<MaterialCommunityIcons name="cash-multiple" size={28} />}
            titulo="Total Recaudado"
            valor={formatearMoneda(resumen?.dineroRecaudado || 0)}
          />
          <CardReporte
            icon={<Ionicons name="hourglass-outline" size={24} />}
            titulo="Pagos Pendientes"
            valor={String(resumen?.pagosPendientes || 0)}
          />
          <CardReporte
            icon={<MaterialCommunityIcons name="hand-coin" size={28} />}
            titulo="Pagos Completos"
            valor={String(resumen?.pagosCompletos || 0)}
          />
          <CardReporte
            icon={<Ionicons name="calendar-outline" size={24} />}
            titulo="Tandas Activas"
            valor={String(resumen?.tandasActivas || 0)}
          />
        </View>

        <Graficas
          barLabels={["Act", "Fin", "Pend", "Ok"]}
          barValues={[
            resumen?.tandasActivas || 0,
            resumen?.tandasFinalizadas || 0,
            resumen?.pagosPendientes || 0,
            resumen?.pagosCompletos || 0,
          ]}
          pieData={[
            {
              name: "Activas",
              population: Math.max(resumen?.tandasActivas || 0, totalTandas ? 0 : 1),
              color: "#22c55e",
              legendFontColor: "#333",
              legendFontSize: 12,
            },
            {
              name: "Finalizadas",
              population: resumen?.tandasFinalizadas || 0,
              color: "#3b82f6",
              legendFontColor: "#333",
              legendFontSize: 12,
            },
            {
              name: "Pendientes",
              population: resumen?.pagosPendientes || 0,
              color: "#f59e0b",
              legendFontColor: "#333",
              legendFontSize: 12,
            },
          ]}
        />

        <EstadoTandas
          items={[
            {
              label: "Activas",
              count: resumen?.tandasActivas || 0,
              progress: totalTandas ? (resumen?.tandasActivas || 0) / totalTandas : 0,
              color: "#22c55e",
            },
            {
              label: "Finalizadas",
              count: resumen?.tandasFinalizadas || 0,
              progress: totalTandas ? (resumen?.tandasFinalizadas || 0) / totalTandas : 0,
              color: "#3b82f6",
            },
            {
              label: "Por revisar",
              count: resumen?.comprobantesPorRevisar || 0,
              progress:
                (resumen?.pagosPendientes || 0) + (resumen?.pagosCompletos || 0) > 0
                  ? (resumen?.comprobantesPorRevisar || 0) /
                    ((resumen?.pagosPendientes || 0) + (resumen?.pagosCompletos || 0))
                  : 0,
              color: "#f59e0b",
            },
          ]}
        />

        <Crecimiento monto={resumen?.dineroRecaudado || 0} porcentaje={avance} />

        <ActividadReciente
          titulo={actividad?.titulo || "Sin actividad reciente"}
          descripcion={actividad?.descripcion || "Cuando haya nuevos movimientos apareceran aqui."}
          fecha={actividad?.createdAt ? formatearFecha(actividad.createdAt) : ""}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  error: {
    color: "#dc2626",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});

