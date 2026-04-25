import Cajatext from "../../../components/ui/Cajatext";
import IconoEstado from "../../../components/ui/icono";
import { obtenerUsuarioGuardado } from "@/utils/api/login-registrar/authStorage";
import {
  HistorialItem,
  obtenerHistorialPorUsuario,
} from "@/utils/api/historial/historialApi";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Historial() {
  const [data, setData] = useState<HistorialItem[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarHistorial = useCallback(async () => {
    try {
      setLoading(true);
      const usuario = await obtenerUsuarioGuardado();

      if (!usuario?.id) {
        setData([]);
        return;
      }

      const respuesta = await obtenerHistorialPorUsuario(usuario.id);
      setData(Array.isArray(respuesta) ? respuesta : []);
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarHistorial();
    }, [cargarHistorial])
  );

  const obtenerFecha = (fecha: string) => {
    try {
      return new Date(fecha).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      return fecha;
    }
  };

  const obtenerResumen = (item: HistorialItem) => {
    return item.tanda?.nombre || item.descripcion || "Actividad";
  };

  const obtenerColor = (tipo: string) => {
    if (tipo === "usuario_unido" || tipo === "integrante_agregado") {
      return "#22c55e";
    }

    if (tipo.includes("rechaz")) {
      return "#ef4444";
    }

    return "#f59e0b";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Historial</Text>
        <Text style={styles.subtitulo}>Movimientos recientes</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.estado}>No hay movimientos en el historial.</Text>
            </View>
          }
          renderItem={({ item }) => {
            const colorMonto = obtenerColor(item.tipo || "");
            return (
              <Cajatext
                titulo={item.titulo}
                subtitulo={obtenerFecha(item.createdAt)}
                icono={
                  <View style={styles.iconoBox}>
                    <IconoEstado mensaje={item.titulo} />
                  </View>
                }
                derecha={
                  <View style={styles.derecha}>
                    <Text style={[styles.monto, { color: colorMonto }]}>
                      {obtenerResumen(item)}
                    </Text>
                    <Text style={styles.estado}>{item.tipo}</Text>
                  </View>
                }
              />
            );
          }}
        />
      )}
    </View>
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
  },
  iconoBox: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  derecha: {
    alignItems: "flex-end",
    maxWidth: 120,
  },
  monto: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "right",
  },
  estado: {
    fontSize: 12,
    color: "#777",
    textAlign: "right",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
