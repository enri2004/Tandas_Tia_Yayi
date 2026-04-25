import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import CardAmigo from "../../../components/amigos/CardAmigo";
import { Amigo } from "../../../utils/api/amigos/amigosTypes";
import { cargarListaAmigos } from "../../../utils/api/amigos/amigosService";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";

export default function ListaAmigosScreen() {
  const [amigos, setAmigos] = useState<Amigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      const sesion = await obtenerUsuarioGuardado();
      const actualUserId = sesion?.id || "";
      setUserId(actualUserId);

      if (!actualUserId) {
        setAmigos([]);
        return;
      }

      const data = await cargarListaAmigos(actualUserId);
      setAmigos(data);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo cargar tu lista de amigos"
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

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Mis Amigos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : amigos.length === 0 ? (
          <Text style={styles.emptyText}>Aun no tienes amigos agregados.</Text>
        ) : (
          amigos.map((amigo) => (
            <CardAmigo
              key={amigo.id}
              amigo={amigo}
              onPress={() =>
                router.push(`/screen/admin/perfilAmigo?usuarioId=${userId}&amigoId=${amigo.id}`)
              }
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
