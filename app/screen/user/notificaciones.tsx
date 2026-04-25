import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { obtenerUsuarioGuardado } from "@/utils/api/login-registrar/authStorage";
import {
  eliminarNotificacion,
  eliminarNotificacionesSeleccionadas,
  marcarNotificacionLeida,
  marcarTodasLeidas,
  NotificacionItem,
  obtenerNotificacionesPorUsuario,
} from "@/utils/api/notificaciones/notificacionesApi";
import NotificacionRow from "../../../components/notificaciones/NotificacionRow";

const formatearFecha = (fecha: string) => {
  try {
    return new Date(fecha).toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Ahora";
  }
};

export default function Notificacion() {
  const [data, setData] = useState<NotificacionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const [eliminando, setEliminando] = useState(false);

  const modoSeleccion = seleccionadas.length > 0;

  const obtenerNoti = async () => {
    try {
      setLoading(true);
      const usuario = await obtenerUsuarioGuardado();

      if (!usuario?.id) {
        setData([]);
        return;
      }

      setUserId(usuario.id);
      const respuesta = await obtenerNotificacionesPorUsuario(usuario.id);
      setData(respuesta);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSeleccion = (id: string) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePress = async (item: NotificacionItem) => {
    if (modoSeleccion) {
      toggleSeleccion(item._id);
      return;
    }

    if (!item.leida) {
      await marcarNotificacionLeida(item._id);
      setData((prev) =>
        prev.map((noti) =>
          noti._id === item._id ? { ...noti, leida: true } : noti
        )
      );
    }
  };

  const handleEliminarIndividual = async (id: string) => {
    try {
      await eliminarNotificacion(id);
      setData((prev) => prev.filter((item) => item._id !== id));
      setSeleccionadas((prev) => prev.filter((item) => item !== id));
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo eliminar la notificacion"
      );
    }
  };

  const handleEliminarSeleccionadas = async () => {
    if (!userId || !seleccionadas.length) {
      return;
    }

    try {
      setEliminando(true);
      await eliminarNotificacionesSeleccionadas(userId, seleccionadas);
      setData((prev) => prev.filter((item) => !seleccionadas.includes(item._id)));
      setSeleccionadas([]);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje ||
          "No se pudieron eliminar las notificaciones seleccionadas"
      );
    } finally {
      setEliminando(false);
    }
  };

  const handleMarcarTodas = async () => {
    if (!userId) {
      return;
    }

    await marcarTodasLeidas(userId);
    setData((prev) => prev.map((item) => ({ ...item, leida: true })));
  };

  useEffect(() => {
    obtenerNoti();
  }, []);

  const seleccionTexto = useMemo(() => {
    if (!seleccionadas.length) return "";
    return `${seleccionadas.length} seleccionada${seleccionadas.length > 1 ? "s" : ""}`;
  }, [seleccionadas.length]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Notificaciones</Text>
        <Text style={styles.subtitulo}>Actividad reciente guardada en tu cuenta</Text>

        <View style={styles.headerActions}>
          {modoSeleccion ? (
            <>
              <Text style={styles.selectionText}>{seleccionTexto}</Text>
              <Pressable
                style={[styles.botonHeader, eliminando && styles.botonDisabled]}
                onPress={handleEliminarSeleccionadas}
                disabled={eliminando}
              >
                <Text style={styles.botonHeaderText}>
                  {eliminando ? "Eliminando..." : "Eliminar seleccionadas"}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.botonHeader, styles.botonSecondary]}
                onPress={() => setSeleccionadas([])}
              >
                <Text style={styles.botonSecondaryText}>Cancelar</Text>
              </Pressable>
            </>
          ) : (
            <Pressable style={styles.botonHeader} onPress={handleMarcarTodas}>
              <Text style={styles.botonHeaderText}>Marcar todas</Text>
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={obtenerNoti} />
        }
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20,
          flexGrow: data.length ? 0 : 1,
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No tienes notificaciones por ahora</Text>
            <Text style={styles.emptyText}>
              Cuando ocurra un evento importante de tu tanda, aparecera aqui.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <NotificacionRow
            item={item}
            fecha={formatearFecha(item.createdAt)}
            seleccionado={seleccionadas.includes(item._id)}
            modoSeleccion={modoSeleccion}
            onPress={() => handlePress(item)}
            onLongPress={() => toggleSeleccion(item._id)}
            onDelete={() => handleEliminarIndividual(item._id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 14,
  },
  headerActions: {
    gap: 10,
  },
  botonHeader: {
    alignSelf: "flex-start",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  botonHeaderText: {
    color: "#1d4ed8",
    fontWeight: "600",
  },
  botonSecondary: {
    backgroundColor: "#dbeafe",
  },
  botonSecondaryText: {
    color: "#1d4ed8",
    fontWeight: "600",
  },
  botonDisabled: {
    opacity: 0.7,
  },
  selectionText: {
    color: "#eff6ff",
    fontWeight: "700",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
  },
});
