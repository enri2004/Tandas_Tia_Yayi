import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Cajatext from "../../../components/ui/Cajatext";
import { obtenerTandaPorId } from "../../../utils/api/Tandas/tandasApi";
import type { TandaItem, TurnoItem } from "../../../utils/api/Tandas/tandasTypes";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";

const obtenerUsuarioIdTurno = (turno: TurnoItem) =>
  typeof turno.usuario === "string" ? turno.usuario : turno.usuario?._id;

const obtenerNombreTurno = (turno: TurnoItem) => {
  if (turno.nombre) return turno.nombre;
  if (typeof turno.usuario === "object" && turno.usuario?.nombre) return turno.usuario.nombre;
  return "Integrante";
};

const formatearFecha = (fecha?: string) => {
  if (!fecha) return "Fecha pendiente";

  const parsed = new Date(fecha);
  if (Number.isNaN(parsed.getTime())) return fecha;

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
};

export default function Turnos() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [tanda, setTanda] = useState<TandaItem | null>(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const sesion = await obtenerUsuarioGuardado();
      setUserId(sesion?.id || "");

      if (!id) {
        setTanda(null);
        setError("No se recibio la tanda para consultar turnos.");
        return;
      }

      const respuesta = await obtenerTandaPorId(String(id));
      setTanda(respuesta);
    } catch (error: any) {
      setTanda(null);
      setError(error?.response?.data?.mensaje || "No se pudieron cargar los turnos.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const turnosOrdenados = useMemo(() => {
    if (!Array.isArray(tanda?.turnos)) return [];
    return [...tanda.turnos].sort((a, b) => Number(a.orden || 0) - Number(b.orden || 0));
  }, [tanda?.turnos]);

  const miTurno = turnosOrdenados.find((turno) => obtenerUsuarioIdTurno(turno) === userId);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Orden de Turnos</Text>
          <Text style={styles.subtitulo}>{tanda?.nombre || "Tanda activa"}</Text>
          {miTurno ? (
            <Text style={styles.miTurno}>
              Tu turno es #{miTurno.orden} - {formatearFecha(miTurno.fechaProgramada)}
            </Text>
          ) : null}
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={styles.centerText}>Cargando turnos reales...</Text>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : turnosOrdenados.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.emptyTitle}>Turnos pendientes</Text>
            <Text style={styles.centerText}>
              Cuando la tanda este completa y el administrador asigne turnos,
              apareceran aqui con sus fechas.
            </Text>
          </View>
        ) : (
          <FlatList
            data={turnosOrdenados}
            keyExtractor={(item) => `${obtenerUsuarioIdTurno(item)}-${item.orden}`}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const esActual = obtenerUsuarioIdTurno(item) === userId;
              const estadoPagado = item.estadoPago === "pagado";

              return (
                <Cajatext
                  titulo={`${obtenerNombreTurno(item)}${esActual ? " (Tú)" : ""}`}
                  subtitulo={`Turno #${item.orden} - Fecha: ${formatearFecha(item.fechaProgramada)}`}
                  icono={
                    <View style={[styles.circulo, esActual && styles.turnoActual]}>
                      <Text style={[styles.numero, esActual && styles.numeroActual]}>
                        {item.orden}
                      </Text>
                    </View>
                  }
                  derecha={
                    <View style={styles.derecha}>
                      {estadoPagado ? (
                        <MaterialCommunityIcons name="check-circle" size={26} color="#22c55e" />
                      ) : (
                        <MaterialCommunityIcons name="clock-outline" size={26} color="#f59e0b" />
                      )}
                      <Text style={styles.estado}>{estadoPagado ? "Pagado" : "Pendiente"}</Text>
                    </View>
                  }
                  estiloExtra={esActual && styles.cardActual}
                />
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  header: {
    backgroundColor: "#3b82f6",
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  subtitulo: {
    color: "#dbeafe",
    marginTop: 5,
  },
  miTurno: {
    marginTop: 10,
    color: "#fff",
    fontWeight: "700",
  },
  listContent: {
    paddingTop: 14,
    paddingBottom: 24,
  },
  circulo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  turnoActual: {
    backgroundColor: "#3b82f6",
  },
  numero: {
    fontWeight: "bold",
    color: "#333",
  },
  numeroActual: {
    color: "white",
  },
  derecha: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 72,
  },
  estado: {
    marginTop: 4,
    fontSize: 11,
    color: "#4b5563",
  },
  cardActual: {
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  center: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    marginTop: 10,
    textAlign: "center",
    color: "#4b5563",
    lineHeight: 20,
  },
  emptyTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
  },
  errorText: {
    color: "#991b1b",
    textAlign: "center",
  },
});
