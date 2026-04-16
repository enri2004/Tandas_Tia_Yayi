// screens/admin/ReporteScreen.tsx

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CardReporte from "../../../components/Reporteadmin/CardsRetporte";
import Graficas from "../../../components/Reporteadmin/Graficas";
import EstadoTandas from "../../../components/Reporteadmin/Estado";
import Crecimiento from "../../../components/Reporteadmin/Crecimiento";
import ActividadReciente from "../../../components/Reporteadmin/ActividadReciente";
import ExportarPDF from "../../../components/Reporteadmin/ExportPdf";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ReporteScreen() {
  return (
    <SafeAreaView style={styles.padre}>
      <ScrollView>

        <Text style={styles.titulo}>Análisis Global de Tandas</Text>
        <View style={styles.grid}>
          <CardReporte icon={<MaterialCommunityIcons name="cash-multiple" size={28} />} titulo="Total Recaudado" valor="$18,500" />
          <CardReporte icon={<Ionicons name="hourglass-outline" size={24} />} titulo="Pagos Pendientes" valor="$4,000" />
          <CardReporte icon={<MaterialCommunityIcons name="hand-coin" size={28} />} titulo="Pagos Completos" valor="120" />
          <CardReporte icon={<Ionicons name="calendar-outline" size={24} />} titulo="Tandas Activas" valor="8" />
        </View>
        <Graficas />
         <EstadoTandas />
        <Crecimiento />
        <ActividadReciente />
        <ExportarPDF />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10
  }
});