import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  nombre: string;
  descripcion?: string;
  pago: number;
  participantes: number;
  fecha?: string;
  frecuencia?: string;
  estado?: boolean;
  codigoInvitacion?: string;
  onVerHistorial: () => void;
  onAdministrarIntegrantes: () => void;
  onFinalizar?: () => void;
  onEliminar?: () => void;
  deshabilitarFinalizar?: boolean;
};

export default function ResumenTandaAdminCard({
  nombre,
  descripcion,
  pago,
  participantes,
  fecha,
  frecuencia,
  estado,
  codigoInvitacion,
  onVerHistorial,
  onAdministrarIntegrantes,
  onFinalizar,
  onEliminar,
  deshabilitarFinalizar = false,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{nombre}</Text>
      {descripcion ? <Text style={styles.description}>{descripcion}</Text> : null}

      <View style={styles.grid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Monto</Text>
          <Text style={styles.metricValue}>${pago}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Participantes</Text>
          <Text style={styles.metricValue}>{participantes}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Fecha</Text>
          <Text style={styles.metricValue}>{fecha || "Sin fecha"}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Frecuencia</Text>
          <Text style={styles.metricValue}>{frecuencia || "Sin dato"}</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.statusText}>{estado === false ? "Finalizada" : "Activa"}</Text>
        {codigoInvitacion ? <Text style={styles.codeMini}>{codigoInvitacion}</Text> : null}
      </View>

      <View style={styles.actionRow}>
        <Pressable style={styles.actionButton} onPress={onAdministrarIntegrantes}>
          <Text style={styles.actionText}>Integrantes</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={onVerHistorial}>
          <Text style={styles.actionText}>Historial</Text>
        </Pressable>
      </View>

      {onFinalizar || onEliminar ? (
        <View style={styles.actionRow}>
          {onFinalizar ? (
            <Pressable
              style={[styles.actionButton, styles.warningButton, deshabilitarFinalizar && styles.buttonDisabled]}
              onPress={onFinalizar}
              disabled={deshabilitarFinalizar}
            >
              <Text style={styles.warningText}>
                {deshabilitarFinalizar ? "Ya finalizada" : "Finalizar"}
              </Text>
            </Pressable>
          ) : null}

          {onEliminar ? (
            <Pressable style={[styles.actionButton, styles.dangerButton]} onPress={onEliminar}>
              <Text style={styles.dangerText}>Eliminar</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  description: {
    color: "#4b5563",
    marginTop: 6,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#f5f6fa",
    borderRadius: 12,
    padding: 12,
  },
  metricLabel: {
    color: "#6b7280",
    fontSize: 12,
  },
  metricValue: {
    marginTop: 4,
    color: "#111827",
    fontWeight: "700",
  },
  footerRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    color: "#111827",
    fontWeight: "700",
  },
  codeMini: {
    color: "#3b82f6",
    fontWeight: "700",
  },
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 120,
    backgroundColor: "#f5f6fa",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  actionText: {
    color: "#111827",
    fontWeight: "700",
  },
  warningButton: {
    backgroundColor: "#fef3c7",
  },
  warningText: {
    color: "#b45309",
    fontWeight: "700",
  },
  dangerButton: {
    backgroundColor: "#fee2e2",
  },
  dangerText: {
    color: "#b91c1c",
    fontWeight: "700",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
