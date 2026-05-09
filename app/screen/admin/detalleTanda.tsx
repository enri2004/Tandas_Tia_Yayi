import React, { useCallback, useState } from "react";
import { Alert, Platform, ScrollView, Share, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Stack, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import ResumenTandaAdminCard from "../../../components/indexadmin/ResumenTandaAdminCard";
import InvitacionTandaCard from "../../../components/indexadmin/InvitacionTandaCard";
import IntegrantesAdminCard from "../../../components/indexadmin/IntegrantesAdminCard";
import TurnosAdminCard from "../../../components/indexadmin/TurnosAdminCard";
import { obtenerTandaPorId } from "../../../utils/api/Tandas/tandasApi";
import {
  asignarTurnosTandaAdmin,
  eliminarTandaAdmin,
  finalizarTandaAdmin,
  marcarTurnoEntregadoAdmin,
  notificarEntregaTurnoAdmin,
} from "../../../utils/api/admin/adminApi";
import type { IntegranteItem, TandaItem } from "../../../utils/api/Tandas/tandasTypes";

export default function GestionTandaAdminScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [tanda, setTanda] = useState<TandaItem | null>(null);
  const [error, setError] = useState("");
  const [guardandoTurnos, setGuardandoTurnos] = useState(false);

  const cargar = useCallback(async () => {
    try {
      setError("");
      if (!id) {
        setTanda(null);
        return;
      }

      const respuesta = await obtenerTandaPorId(String(id));
      setTanda(respuesta);
    } catch (error: any) {
      setTanda(null);
      setError(error?.response?.data?.mensaje || "No se pudo cargar la tanda");
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [cargar])
  );

  const qrValue = tanda?.codigoInvitacion
    ? `tandasapp://screen/user/Unir_Tadas?codigo=${encodeURIComponent(tanda.codigoInvitacion)}`
    : "";

  const compartirInvitacion = async () => {
    if (!tanda?.codigoInvitacion) {
      return;
    }

    const mensaje = `Únete a la tanda ${tanda.nombre} con el código ${tanda.codigoInvitacion}\n${qrValue}`;
    await Share.share({ message: mensaje });
  };

  const confirmarEliminar = () => {
    if (!tanda?._id) return;

    const ejecutar = async () => {
      try {
        await eliminarTandaAdmin(tanda._id);
        Alert.alert("Éxito", "La tanda fue eliminada correctamente", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } catch (error: any) {
        Alert.alert(
          "Error",
          error?.response?.data?.mensaje || "No se pudo eliminar la tanda"
        );
      }
    };

    if (Platform.OS === "web") {
      const confirmacion = globalThis.confirm?.(
        "Esta acción borrará la tanda de forma permanente. ¿Deseas continuar?"
      );
      if (confirmacion) {
        ejecutar();
      }
      return;
    }

    Alert.alert("Eliminar tanda", "Esta acción borrará la tanda de forma permanente.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: ejecutar,
      },
    ]);
  };

  const confirmarFinalizar = () => {
    if (!tanda?._id || tanda.estado === false) return;

    const ejecutar = async () => {
      try {
        const respuesta = await finalizarTandaAdmin(tanda._id);
        setTanda(respuesta?.tanda || null);
        Alert.alert("Éxito", respuesta?.mensaje || "Tanda finalizada correctamente");
      } catch (error: any) {
        Alert.alert(
          "Error",
          error?.response?.data?.mensaje || "No se pudo finalizar la tanda"
        );
      }
    };

    if (Platform.OS === "web") {
      const confirmacion = globalThis.confirm?.(
        "La tanda quedará marcada como finalizada. ¿Deseas continuar?"
      );
      if (confirmacion) {
        ejecutar();
      }
      return;
    }

    Alert.alert("Finalizar tanda", "La tanda quedará marcada como finalizada.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Finalizar",
        onPress: ejecutar,
      },
    ]);
  };

  const asignarTurnos = async (payload: { integrantesOrdenados?: string[]; aleatorio?: boolean }) => {
    if (!tanda?._id) return;

    try {
      setGuardandoTurnos(true);
      const respuesta = await asignarTurnosTandaAdmin(tanda._id, payload);
      setTanda(respuesta?.tanda || null);
      Alert.alert("Éxito", respuesta?.mensaje || "Turnos actualizados correctamente");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudieron asignar los turnos"
      );
    } finally {
      setGuardandoTurnos(false);
    }
  };

  const notificarEntrega = async (numeroTurno: number) => {
    if (!tanda?._id) {
      return;
    }

    try {
      const respuesta = await notificarEntregaTurnoAdmin(tanda._id, numeroTurno);
      Alert.alert(
        "Éxito",
        respuesta?.mensaje || "Se envió la notificación de entrega al usuario."
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo enviar la notificación de entrega"
      );
    }
  };

  const marcarEntregado = async (numeroTurno: number) => {
    if (!tanda?._id) {
      return;
    }

    try {
      const respuesta = await marcarTurnoEntregadoAdmin(tanda._id, numeroTurno);
      await cargar();
      Alert.alert(
        "Éxito",
        respuesta?.mensaje || "Se marcó el turno como entregado."
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo marcar el turno como entregado"
      );
    }
  };

  const integrantes =
    Array.isArray(tanda?.integrantes) && typeof tanda?.integrantes?.[0] === "object"
      ? (tanda?.integrantes as IntegranteItem[])
      : [];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Administrar Tanda" }} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {tanda ? (
            <>
              <ResumenTandaAdminCard
                nombre={tanda.nombre}
                descripcion={tanda.descripcion}
                pago={Number(tanda.pago || 0)}
                participantes={Number(tanda.participantes || 0)}
                fecha={tanda.fecha}
                frecuencia={tanda.frecuencia}
                estado={tanda.estado}
                codigoInvitacion={tanda.codigoInvitacion}
                onAdministrarIntegrantes={() => {
                  Alert.alert("Integrantes", "Desde aquí ya puedes ver el orden actual de integrantes.");
                }}
                onVerHistorial={() => router.push("/screen/admin/historialTandas")}
                onFinalizar={confirmarFinalizar}
                onEliminar={confirmarEliminar}
                deshabilitarFinalizar={tanda.estado === false}
              />

              {tanda.codigoInvitacion ? (
                <InvitacionTandaCard
                  codigoInvitacion={tanda.codigoInvitacion}
                  qrValue={qrValue}
                  onCompartir={compartirInvitacion}
                />
              ) : null}

              <IntegrantesAdminCard integrantes={integrantes} />
              <TurnosAdminCard
                turnos={Array.isArray(tanda.turnos) ? tanda.turnos : []}
                turnosCobro={Array.isArray(tanda.turnosCobro) ? tanda.turnosCobro : []}
                integrantes={integrantes}
                participantes={Number(tanda.participantes || 0)}
                guardando={guardandoTurnos}
                onAsignarManual={(integrantesOrdenados) =>
                  asignarTurnos({ integrantesOrdenados, aleatorio: false })
                }
                onAsignarAleatorio={() => asignarTurnos({ aleatorio: true })}
                onNotificarEntrega={notificarEntrega}
                onMarcarEntregado={marcarEntregado}
              />
            </>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No se encontró la tanda</Text>
              <Text style={styles.emptyText}>Revisa que la tanda siga disponible.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  content: {
    width: "100%",
    paddingHorizontal: 0,
    paddingBottom: 120,
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
  },
  error: {
    color: "#991b1b",
    marginBottom: 12,
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  emptyText: {
    marginTop: 6,
    color: "#4b5563",
  },
});










