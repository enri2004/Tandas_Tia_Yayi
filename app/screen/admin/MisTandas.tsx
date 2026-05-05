import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { Stack, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CajaInput from "../../../components/ui/CajaInput";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";
import { obtenerTandasAdmin } from "../../../utils/api/admin/adminApi";
import { AdminTanda } from "../../../utils/api/admin/adminTypes";

export default function MisTandas() {
  const [data, setData] = useState<AdminTanda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const obtener = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const sesion = await obtenerUsuarioGuardado();

      if (!sesion?.id) {
        setData([]);
        setError("No se encontro la sesion del administrador.");
        return;
      }

      const res = await obtenerTandasAdmin(sesion.id);
      setData(Array.isArray(res) ? res : []);
    } catch (error: any) {
      setData([]);
      setError(error?.response?.data?.mensaje || "No se pudieron cargar las tandas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      obtener();
    }, [obtener])
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Mis Tandas" }} />
        <ScreenHeader
          title="Mis Tandas"
          subtitle="Revisa las tandas que administras"
        />

        {loading ? (
          <View style={styles.stateBox}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={styles.stateText}>Cargando tandas del administrador...</Text>
          </View>
        ) : error ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateTitle}>No pudimos cargar las tandas</Text>
            <Text style={styles.stateText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <CajaInput
                id={item._id}
                nombre={item.nombre}
                pago={String(item.pago)}
                participantes={item.participantes}
                turno={item.integrantes?.length || 0}
                estado={item.estadoTexto || (item.estado ? "Activa" : "Finalizada")}
                imagen={item.imagen}
                tipo={item.estado ? "success" : "warning"}
                rol="admin"
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.listContent, { paddingBottom: 24 }]}
            ListEmptyComponent={
              <View style={styles.stateBox}>
                <Text style={styles.stateTitle}>Aun no tienes tandas creadas</Text>
                <Text style={styles.stateText}>Cuando registres una tanda, aparecera aqui.</Text>
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
  listContent: {
    paddingBottom: 100,
  },
  stateBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    margin: 16,
    alignItems: "center",
    gap: 8,
  },
  stateTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  stateText: {
    color: "#4b5563",
    textAlign: "center",
  },
});
