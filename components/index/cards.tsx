import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

type Props = {
  tandasActivas?: number;
  proximoPagoMonto?: number | null;
  proximaFechaLimite?: string | null;
  proximoTurnoNumero?: number | null;
  proximoTurnoMonto?: number | null;
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

const formatearFecha = (fecha?: string | null) => {
  if (!fecha) return "Sin fecha";

  const parsed = new Date(fecha);
  if (Number.isNaN(parsed.getTime())) return fecha;

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
  }).format(parsed);
};

export default function CardsDashboard({
  tandasActivas = 0,
  proximoPagoMonto = null,
  proximaFechaLimite = null,
  proximoTurnoNumero = null,
  proximoTurnoMonto = null,
}: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 390;
  const stackCards = width < 360;

  return (
    <View style={[styles.containerCard, stackCards && styles.containerCardStack]}>
      <View style={styles.card}>
        <View style={[styles.floatingHeader, styles.blue]}>
          <Text style={[styles.headerText, { fontSize: isCompact ? 10.5 : 11.5 }]}>
            Resumen de Tandas
          </Text>
          <Text style={[styles.bigText, { fontSize: isCompact ? 13 : 14 }]} numberOfLines={2}>
            {tandasActivas} Tandas Activas
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={[styles.label, { fontSize: isCompact ? 10.5 : 11.5 }]}>Próximo Pago:</Text>
            <Text style={[styles.value, { fontSize: isCompact ? 10.5 : 11.5 }]} numberOfLines={1}>
              {formatearMoneda(proximoPagoMonto)}
            </Text>
          </View>

          <View style={styles.fechaBlock}>
            <Text style={[styles.label, { fontSize: isCompact ? 10.5 : 11.5 }]}>Fecha Límite:</Text>
            <View style={styles.iconRow}>
              <Text style={[styles.value, { fontSize: isCompact ? 10.5 : 11.5 }]} numberOfLines={1}>
                {formatearFecha(proximaFechaLimite)}
              </Text>
              <Ionicons name="calendar-outline" size={16} color="#555" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={[styles.floatingHeader, styles.green]}>
          <View style={styles.rowBetween}>
            <Text style={[styles.headerText, { fontSize: isCompact ? 10.5 : 11.5 }]}>
              Próximo Turno
            </Text>
            <Ionicons name="gift-outline" size={18} color="white" />
          </View>

          <Text style={[styles.bigText, { fontSize: isCompact ? 13 : 14 }]} numberOfLines={2}>
            {proximoTurnoNumero ? `Tu Turno #${proximoTurnoNumero}` : "Sin turno asignado"}
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={[styles.label, { fontSize: isCompact ? 10.5 : 11.5 }]}>Monto a Recibir:</Text>
          <Text style={[styles.amount, { fontSize: isCompact ? 15 : 17 }]} numberOfLines={1}>
            {formatearMoneda(proximoTurnoMonto)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  containerCardStack: {
    flexDirection: "column",
  },
  card: {
    flex: 1,
    minHeight: 135,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 22,
    paddingTop: 44,
    paddingHorizontal: 10,
    paddingBottom: 12,
    elevation: 4,
  },
  floatingHeader: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  blue: { backgroundColor: "#4A90E2" },
  green: { backgroundColor: "#27AE60" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: { color: "#fff" },
  bigText: { color: "#fff", fontWeight: "bold", marginTop: 4 },
  body: { marginTop: 2 },
  row: {
    gap: 4,
  },
  fechaBlock: {
    marginTop: 10,
  },
  label: { color: "#555" },
  value: { fontWeight: "600" },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  amount: {
    fontWeight: "bold",
    marginTop: 5,
  },
});
