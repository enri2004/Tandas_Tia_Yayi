import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import CardSolicitud from "../../../components/amigos/CardSolicitud";
import { SolicitudAmistad } from "../../../utils/api/amigos/amigosTypes";
import {
  aceptarSolicitudPendiente,
  cargarSolicitudesRecibidas,
  rechazarSolicitudPendiente,
} from "../../../utils/api/amigos/amigosService";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";

export default function SolicitudesAmistadScreen() {
  const [userId, setUserId] = useState("");
  const [solicitudes, setSolicitudes] = useState<SolicitudAmistad[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      const sesion = await obtenerUsuarioGuardado();
      const actualUserId = sesion?.id || "";
      setUserId(actualUserId);

      if (!actualUserId) {
        setSolicitudes([]);
        return;
      }

      const data = await cargarSolicitudesRecibidas(actualUserId);
      setSolicitudes(data);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudieron cargar las solicitudes"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [cargarDatos])
  );

  const aceptar = async (solicitanteId: string) => {
    try {
      await aceptarSolicitudPendiente(userId, solicitanteId);
      Alert.alert("Exito", "Solicitud aceptada correctamente");
      cargarDatos();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo aceptar la solicitud"
      );
    }
  };

  const rechazar = async (solicitanteId: string) => {
    try {
      await rechazarSolicitudPendiente(userId, solicitanteId);
      Alert.alert("Exito", "Solicitud rechazada correctamente");
      cargarDatos();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo rechazar la solicitud"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Solicitudes de amistad</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : solicitudes.length === 0 ? (
          <Text style={styles.emptyText}>No tienes solicitudes pendientes.</Text>
        ) : (
          solicitudes.map((solicitud) => (
            <CardSolicitud
              key={solicitud.id}
              solicitud={solicitud}
              onAceptar={() => aceptar(solicitud.id)}
              onRechazar={() => rechazar(solicitud.id)}
            />
          ))
        )}
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 20,
  },
});
