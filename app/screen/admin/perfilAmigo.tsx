import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import PerfilHeader from "../../../components/amigos/PerfilHeader";
import { cargarPerfilAmigo } from "../../../utils/api/amigos/amigosService";
import { Amigo } from "../../../utils/api/amigos/amigosTypes";

export default function PerfilUsuarioAdminScreen() {
  const { usuarioId, amigoId } = useLocalSearchParams<{
    usuarioId?: string;
    amigoId?: string;
  }>();
  const [perfil, setPerfil] = useState<Amigo | null>(null);
  const [loading, setLoading] = useState(true);

  const cargarDatos = useCallback(async () => {
    if (!usuarioId || !amigoId) {
      setPerfil(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await cargarPerfilAmigo(String(usuarioId), String(amigoId));
      setPerfil(data);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo cargar el perfil del usuario"
      );
      setPerfil(null);
    } finally {
      setLoading(false);
    }
  }, [usuarioId, amigoId]);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [cargarDatos])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  if (!perfil) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No se encontro el perfil del usuario.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <PerfilHeader
          perfil={perfil}
          subtitle={`${perfil.totalAmigos || 0} conexiones registradas`}
        />

        <View style={styles.card}>
          <Text style={styles.label}>Edad</Text>
          <Text style={styles.value}>{perfil.edad ?? "Sin dato"}</Text>

          <Text style={styles.label}>Telefono</Text>
          <Text style={styles.value}>{perfil.telefono || "Sin dato"}</Text>

          <Text style={styles.label}>Direccion</Text>
          <Text style={styles.value}>{perfil.direccion || "Sin dato"}</Text>
        </View>
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    elevation: 2,
  },
  label: {
    color: "#6b7280",
    fontWeight: "700",
    marginTop: 10,
  },
  value: {
    color: "#111827",
    marginTop: 4,
  },
});
