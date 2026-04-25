import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import CalendarioPagos, {
  PagoCalendarioItem,
} from "../../../components/detalles/CalendarioPagos";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";
import { obtenerTandaPorId } from "../../../utils/api/Tandas/tandasApi";
import { IntegranteItem, TandaItem } from "../../../utils/api/Tandas/tandasTypes";

const parseFecha = (valor?: string) => {
  if (!valor) return null;

  const directa = new Date(valor);
  if (!Number.isNaN(directa.getTime())) {
    return directa;
  }

  const partes = valor.split(/[/-]/).map((item) => item.trim());
  if (partes.length === 3) {
    const [dia, mes, anio] = partes.map(Number);
    if ([dia, mes, anio].every((n) => !Number.isNaN(n))) {
      const fecha = new Date(anio, mes - 1, dia);
      if (!Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }
  }

  return null;
};

const construirCalendario = (
  tanda: TandaItem | null,
  userId: string
): PagoCalendarioItem[] => {
  if (!tanda) return [];

  if (Array.isArray(tanda.turnos) && tanda.turnos.length > 0) {
    return tanda.turnos.map((turno) => {
      const fecha = parseFecha(turno.fechaProgramada);
      const esPagoUsuario =
        typeof turno.usuario === "string"
          ? turno.usuario === userId
          : turno.usuario?._id === userId;

      return {
        id: `${tanda._id}-${turno.orden}`,
        dia: fecha
          ? new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(fecha)
          : "--",
        mes: fecha
          ? new Intl.DateTimeFormat("es-MX", { month: "short" }).format(fecha)
          : "--",
        anio: fecha
          ? new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(fecha)
          : "--",
        fechaCompleta: fecha
          ? new Intl.DateTimeFormat("es-MX", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(fecha)
          : turno.fechaProgramada,
        etiqueta: esPagoUsuario
          ? `Tu turno #${turno.orden}`
          : `Turno #${turno.orden}`,
        esPagoUsuario,
        estado: turno.estadoPago === "pagado" ? "realizado" : "pendiente",
      };
    });
  }

  const fechaBase = parseFecha(tanda.fecha);
  if (!fechaBase) return [];

  const integrantes = Array.isArray(tanda.integrantes)
    ? (tanda.integrantes as Array<string | IntegranteItem>)
    : [];

  const turnoUsuario =
    integrantes.findIndex((item) =>
      typeof item === "string" ? item === userId : item?._id === userId
    ) + 1;

  return Array.from({ length: Number(tanda.participantes || 0) }, (_, index) => {
    const fecha = new Date(fechaBase);
    fecha.setMonth(fechaBase.getMonth() + index);

    const estado =
      index < Number(tanda.pagoRealizados || 0) ? "realizado" : "pendiente";

    return {
      id: `${tanda._id}-${index + 1}`,
      dia: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(fecha),
      mes: new Intl.DateTimeFormat("es-MX", { month: "short" }).format(fecha),
      anio: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(fecha),
      fechaCompleta: new Intl.DateTimeFormat("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(fecha),
      etiqueta:
        turnoUsuario === index + 1
          ? `Tu pago / turno #${index + 1}`
          : `Pago #${index + 1}`,
      esPagoUsuario: turnoUsuario === index + 1,
      estado,
    };
  });
};

export default function CalendarioTandaScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [tanda, setTanda] = useState<TandaItem | null>(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const sesion = await obtenerUsuarioGuardado();
        setUserId(sesion?.id || "");

        if (!id) {
          setTanda(null);
          return;
        }

        const response = await obtenerTandaPorId(String(id));
        setTanda(response);
      } catch (error) {
        console.log(error);
        setTanda(null);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const calendario = useMemo(
    () => construirCalendario(tanda, userId),
    [tanda, userId]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Calendario de Pagos</Text>
          <Text style={styles.subtitle}>
            {tanda?.nombre || "Tanda"} - revisa tus fechas de pago programadas
          </Text>
        </View>

        <CalendarioPagos items={calendario} />
      </ScrollView>
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
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  header: {
    backgroundColor: "#3b82f6",
    padding: 22,
    borderRadius: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    color: "#dbeafe",
    marginTop: 4,
  },
});
