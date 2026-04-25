import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type PagoCalendarioItem = {
  id: string;
  dia: string;
  mes: string;
  anio: string;
  fechaCompleta: string;
  etiqueta: string;
  esPagoUsuario: boolean;
  estado: "realizado" | "pendiente";
};

type Props = {
  items: PagoCalendarioItem[];
};

export default function CalendarioPagos({ items }: Props) {
  if (!items.length) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>No hay pagos programados</Text>
        <Text style={styles.emptyText}>
          Esta tanda aun no tiene fechas suficientes para mostrar en calendario.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {items.map((item) => (
        <View
          key={item.id}
          style={[
            styles.card,
            item.esPagoUsuario && styles.cardHighlight,
          ]}
        >
          <View style={styles.dateBox}>
            <Text style={styles.day}>{item.dia}</Text>
            <Text style={styles.month}>{item.mes}</Text>
            <Text style={styles.year}>{item.anio}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{item.etiqueta}</Text>
            <Text style={styles.subtitle}>{item.fechaCompleta}</Text>
            <View
              style={[
                styles.badge,
                item.estado === "realizado"
                  ? styles.badgeDone
                  : styles.badgePending,
              ]}
            >
              <Text style={styles.badgeText}>
                {item.estado === "realizado" ? "Pagado" : "Pendiente"}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  emptyText: {
    color: "#6b7280",
    marginTop: 6,
    textAlign: "center",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    gap: 14,
    elevation: 2,
  },
  cardHighlight: {
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  dateBox: {
    width: 72,
    borderRadius: 16,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  day: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1d4ed8",
  },
  month: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  year: {
    fontSize: 11,
    color: "#6b7280",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 4,
    color: "#6b7280",
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeDone: {
    backgroundColor: "#dcfce7",
  },
  badgePending: {
    backgroundColor: "#fef3c7",
  },
  badgeText: {
    fontWeight: "700",
    color: "#374151",
    fontSize: 12,
  },
});
