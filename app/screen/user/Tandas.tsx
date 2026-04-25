import CajaInput from "@/components/ui/CajaInput";
import { obtenerUsuarioGuardado } from "@/utils/api/login-registrar/authStorage";
import { obtenerTandasPorUsuario } from "@/utils/api/Tandas/tandasApi";
import type { TandaItem } from "@/utils/api/Tandas/tandasTypes";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tanda() {
  const [data, setData] = useState<TandaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const tabBarHeight = useBottomTabBarHeight();

  const ObtenerDatos = async () => {
    try {
      setLoading(true);

      const usuario = await obtenerUsuarioGuardado();

      if (!usuario?.id) {
        setData([]);
        return;
      }

      const res = await obtenerTandasPorUsuario(usuario.id);
      setData(res);
    } catch (error) {
      console.log("Error al obtener tandas:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await ObtenerDatos();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      ObtenerDatos();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.context}>
          <Text style={styles.titulo}>Tandas</Text>
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#3b86f6" />
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              const turnoReal =
                typeof item.turnoUsuario === "number" && item.turnoUsuario > 0
                  ? item.turnoUsuario
                  : null;

              return (
                <CajaInput
                  id={item._id}
                  nombre={item.nombre}
                  pago={String(item.pago)}
                  participantes={item.participantes}
                  turno={turnoReal}
                  estado={item.estado ? "Activa" : "Pendiente"}
                  imagen={item.imagen}
                  tipo={item.estado ? "success" : "warning"}
                  rol="User"
                />
              );
            }}
            refreshing={refreshing}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            contentContainerStyle={[
              styles.listContent,
              {
                paddingBottom: tabBarHeight + 8,
              },
            ]}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay tandas disponibles</Text>
              </View>
            }
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

  context: {
    backgroundColor: "#3b86f6",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 25,
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingTop: 12,
  },

  emptyContainer: {
    paddingTop: 40,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
