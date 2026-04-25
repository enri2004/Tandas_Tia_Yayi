import React from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import Hader from "../../../components/indexadmin/HarderIndexadmin";
import CardResumen from "../../../components/indexadmin/CardsAdmin";
import TandasAdminPanel from "../../../components/indexadmin/TandasAdminPanel";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminDashboard } from "../../../hooks/useAdminDashboard";
import { useResponsive } from "../../../hooks/useResponsive";

export default function AdminDashboard() {
  const insets = useSafeAreaInsets();
  const { horizontalPadding, titleSize, tandasPanelHeight } = useResponsive();
  const { data, loading, error, recargar } = useAdminDashboard();

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={recargar} />}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 34 + Math.max(insets.bottom, 8),
          paddingHorizontal: horizontalPadding,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Hader
          adminName={data?.admin?.nombre || "Administrador"}
          notificacionesSinLeer={data?.resumen?.notificacionesSinLeer || 0}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f6fa" },
  container: { backgroundColor: "#f5f6fa", flex: 1 },
  section: { fontWeight: "bold", marginTop: 20, marginBottom: 10, color: "#111827" },
});

