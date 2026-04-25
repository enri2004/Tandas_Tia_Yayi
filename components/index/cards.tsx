import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";

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
  const { compactLabelSize, bodySize, titleSize } = useResponsive();

  return (
    <View style={styles.containerCard}>
      <View style={styles.card}>
        <View style={[styles.floatingHeader, styles.blue]}>
          <Text style={[styles.headerText, { fontSize: compactLabelSize }]}>
            Resumen de Tandas
          </Text>
          <Text style={[styles.bigText, { fontSize: bodySize + 2 }]} numberOfLines={2}>
            {tandasActivas} Tandas Activas
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={[styles.label, { fontSize: compactLabelSize }]}>Próximo Pago:</Text>
            <Text style={[styles.value, { fontSize: compactLabelSize }]}>
              {formatearMoneda(proximoPagoMonto)}
            </Text>
          </View>

          <View style={styles.fechaBlock}>
            <Text style={[styles.label, { fontSize: compactLabelSize }]}>Fecha Límite:</Text>
            <View style={styles.iconRow}>
              <Text style={[styles.value, { fontSize: compactLabelSize }]}>
                {formatearFecha(proximaFechaLimite)}
              </Text>
              <Ionicons name="calendar-outline" size={18} color="#555" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={[styles.floatingHeader1, styles.green]}>
          <View style={styles.rowBetween}>
            <Text style={[styles.headerText, { fontSize: compactLabelSize }]}>
              Próximo Turno
            </Text>
            <Ionicons name="gift-outline" size={20} color="white" />
          </View>

          <Text style={[styles.bigText, { fontSize: bodySize + 2 }]} numberOfLines={2}>
            {proximoTurnoNumero ? `Tu Turno #${proximoTurnoNumero}` : "Sin turno asignado"}
          </Text>
        </View>

        <View style={styles.body1}>
          <Text style={[styles.label, { fontSize: compactLabelSize }]}>Monto a Recibir:</Text>
          <Text style={[styles.amount, { fontSize: titleSize }]} numberOfLines={1}>
            {formatearMoneda(proximoTurnoMonto)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 18,
    gap: 18,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 22,
    paddingTop: 35,
    elevation: 4,
  },
  floatingHeader: {
    position: "absolute",
    top: -20,
    width: "100%",
    padding: 15,
    borderRadius: 12,
  },
  floatingHeader1: {
    position: "absolute",
    top: -20,
    width: "100%",
    padding: 25,
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
  bigText: { color: "#fff", fontWeight: "bold" },
  body: { padding: 12, marginTop: 10 },
  body1: { padding: 12, marginTop: 40 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    gap: 12,
  },
  fechaBlock: {
    marginTop: 10,
  },
  label: { color: "#555" },
  value: { fontWeight: "600" },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  amount: {
    fontWeight: "bold",
    marginTop: 5,
  },
});
