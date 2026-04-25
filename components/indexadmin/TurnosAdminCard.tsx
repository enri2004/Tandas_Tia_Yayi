import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { IntegranteItem, TurnoItem } from "../../utils/api/Tandas/tandasTypes";

type Props = {
  turnos: TurnoItem[];
  integrantes?: IntegranteItem[];
  participantes?: number;
  guardando?: boolean;
  onAsignarManual?: (integrantesOrdenados: string[]) => void;
  onAsignarAleatorio?: () => void;
};

type TurnoEditable = {
  id: string;
  nombre: string;
  correo?: string;
  orden: number;
  fechaProgramada?: string;
  estadoPago?: "pendiente" | "pagado";
};

const obtenerIdUsuario = (turno: TurnoItem) =>
  typeof turno.usuario === "string" ? turno.usuario : turno.usuario?._id;

const moverElemento = (lista: TurnoEditable[], fromIndex: number, toIndex: number) => {
  const copia = [...lista];
  const [item] = copia.splice(fromIndex, 1);
  copia.splice(toIndex, 0, item);
  return copia.map((turno, index) => ({ ...turno, orden: index + 1 }));
};

export default function TurnosAdminCard({
  turnos,
  integrantes = [],
  participantes = 0,
  guardando = false,
  onAsignarManual,
  onAsignarAleatorio,
}: Props) {
  const turnosBase = useMemo<TurnoEditable[]>(() => {
    if (turnos.length) {
      return turnos
        .map((turno) => ({
          id: obtenerIdUsuario(turno),
          nombre: turno.nombre || (typeof turno.usuario === "object" ? turno.usuario?.nombre : "") || "Integrante",
          correo: turno.correo || (typeof turno.usuario === "object" ? turno.usuario?.correo : ""),
          orden: turno.orden,
          fechaProgramada: turno.fechaProgramada,
          estadoPago: turno.estadoPago,
        }))
        .filter((turno) => Boolean(turno.id))
        .sort((a, b) => a.orden - b.orden);
    }

    return integrantes.map((integrante, index) => ({
      id: integrante._id,
      nombre: integrante.nombre || "Integrante",
      correo: integrante.correo,
      orden: index + 1,
      fechaProgramada: "",
      estadoPago: "pendiente",
    }));
  }, [integrantes, turnos]);

  const [ordenEditable, setOrdenEditable] = useState<TurnoEditable[]>(turnosBase);

  useEffect(() => {
    setOrdenEditable(turnosBase);
  }, [turnosBase]);

  const tandaCompleta =
    participantes > 0 && integrantes.length === participantes && ordenEditable.length === participantes;
  const tieneTurnos = turnos.length > 0;

  const moverArriba = (index: number) => {
    if (index <= 0) return;
    setOrdenEditable((actual) => moverElemento(actual, index, index - 1));
  };

  const moverAbajo = (index: number) => {
    setOrdenEditable((actual) => {
      if (index < 0 || index >= actual.length - 1) return actual;
      return moverElemento(actual, index, index + 1);
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Turnos y fechas</Text>
      <Text style={styles.subtitle}>
        Cuando la tanda este completa puedes acomodar el orden manualmente o generar uno aleatorio.
      </Text>

      {!tandaCompleta ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Faltan integrantes para asignar turnos: {integrantes.length} de {participantes || 0}.
          </Text>
        </View>
      ) : null}

      {ordenEditable.length === 0 ? (
        <Text style={styles.emptyText}>Aun no hay integrantes para programar turnos.</Text>
      ) : (
        ordenEditable.map((turno, index) => (
          <View key={`${turno.id}-${turno.orden}`} style={styles.item}>
            <View style={styles.left}>
              <Text style={styles.turno}>Turno #{index + 1}</Text>
              <Text style={styles.name}>{turno.nombre}</Text>
              <Text style={styles.fecha}>
                {turno.fechaProgramada || "La fecha se generara al asignar turnos"}
              </Text>
            </View>

            {tandaCompleta ? (
              <View style={styles.actions}>
                <Pressable
                  onPress={() => moverArriba(index)}
                  disabled={index === 0 || guardando}
                  style={[styles.actionButton, (index === 0 || guardando) && styles.actionButtonDisabled]}
                >
                  <Ionicons name="chevron-up" size={18} color={index === 0 ? "#cbd5e1" : "#111827"} />
                </Pressable>
                <Pressable
                  onPress={() => moverAbajo(index)}
                  disabled={index === ordenEditable.length - 1 || guardando}
                  style={[
                    styles.actionButton,
                    (index === ordenEditable.length - 1 || guardando) && styles.actionButtonDisabled,
                  ]}
                >
                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color={index === ordenEditable.length - 1 ? "#cbd5e1" : "#111827"}
                  />
                </Pressable>
              </View>
            ) : (
              <View style={[styles.badge, turno.estadoPago === "pagado" ? styles.badgeDone : styles.badgePending]}>
                <Text style={styles.badgeText}>{turno.estadoPago === "pagado" ? "Pagado" : "Pendiente"}</Text>
              </View>
            )}
          </View>
        ))
      )}

      {tandaCompleta ? (
        <View style={styles.footerActions}>
          <Pressable
            disabled={guardando}
            style={[styles.secondaryButton, guardando && styles.disabledButton]}
            onPress={onAsignarAleatorio}
          >
            <Text style={styles.secondaryButtonText}>Asignar aleatorio</Text>
          </Pressable>

          <Pressable
            disabled={guardando}
            style={[styles.primaryButton, guardando && styles.disabledButton]}
            onPress={() => onAsignarManual?.(ordenEditable.map((turno) => turno.id))}
          >
            <Text style={styles.primaryButtonText}>
              {tieneTurnos ? "Guardar orden" : "Asignar turnos"}
            </Text>
          </Pressable>
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
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  subtitle: {
    color: "#4b5563",
    marginBottom: 12,
  },
  notice: {
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  noticeText: {
    color: "#4b5563",
  },
  emptyText: {
    color: "#4b5563",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  turno: {
    color: "#111827",
    fontWeight: "700",
  },
  name: {
    marginTop: 3,
    color: "#4b5563",
  },
  fecha: {
    marginTop: 3,
    color: "#6b7280",
    fontSize: 12,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeDone: {
    backgroundColor: "#dcfce7",
  },
  badgePending: {
    backgroundColor: "#fef3c7",
  },
  badgeText: {
    color: "#1f2937",
    fontWeight: "700",
    fontSize: 12,
  },
  actions: {
    gap: 8,
  },
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonDisabled: {
    borderColor: "#e5e7eb",
    backgroundColor: "#f8fafc",
  },
  footerActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#1e73d8",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.6,
  },
});
