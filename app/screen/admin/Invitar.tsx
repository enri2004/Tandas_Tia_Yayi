import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CardAmigo from "../../../components/amigos/CardAmigo";
import BuscadorUsuarios from "../../../components/amigos/BuscadorUsuarios";
import { UsuarioBusqueda } from "../../../utils/api/amigos/amigosTypes";
import {
  buscarAmigosDisponibles,
  enviarNuevaSolicitud,
} from "../../../utils/api/amigos/amigosService";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";

export default function BuscarUsuariosAdminScreen() {
  const [userId, setUserId] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<UsuarioBusqueda[]>([]);

  useEffect(() => {
    const cargarSesion = async () => {
      const sesion = await obtenerUsuarioGuardado();
      setUserId(sesion?.id || "");
    };

    cargarSesion();
  }, []);

  const ejecutarBusqueda = useCallback(
    async (texto: string) => {
      setQuery(texto);

      if (!texto.trim() || !userId) {
        setUsuarios([]);
        return;
      }

      try {
        setLoading(true);
        const resultado = await buscarAmigosDisponibles(texto, userId);
        setUsuarios(resultado);
      } catch (error: any) {
        Alert.alert(
          "Error",
          error?.response?.data?.mensaje || "No se pudo buscar usuarios"
        );
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  const enviarSolicitud = async (receptorId: string) => {
    try {
      await enviarNuevaSolicitud(userId, receptorId);
      Alert.alert("Exito", "Solicitud enviada correctamente");
      ejecutarBusqueda(query);
    } catch (error: any) {
      Alert.alert(
        "Aviso",
        error?.response?.data?.mensaje || "No se pudo enviar la solicitud"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Buscar Usuarios</Text>
        <Text style={styles.subtitle}>
          Busca perfiles, revisa sus datos y envia solicitudes desde el modulo admin.
        </Text>

        <BuscadorUsuarios value={query} onChangeText={ejecutarBusqueda} />

        {loading ? (
          <ActivityIndicator size="small" color="#2563eb" />
        ) : usuarios.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              {query.trim()
                ? "No encontramos usuarios con esa busqueda."
                : "Escribe un nombre o usuario para buscar perfiles."}
            </Text>
          </View>
        ) : (
          usuarios.map((usuario) => (
            <CardAmigo
              key={usuario.id}
              amigo={usuario}
              onPress={() =>
                router.push(`/screen/admin/perfilAmigo?usuarioId=${userId}&amigoId=${usuario.id}`)
              }
              onAction={() => enviarSolicitud(usuario.id)}
              actionDisabled={
                usuario.esAmigo ||
                usuario.solicitudEnviada ||
                usuario.solicitudRecibida
              }
              actionLabel={
                usuario.esAmigo
                  ? "Ya son amigos"
                  : usuario.solicitudEnviada
                  ? "Solicitud enviada"
                  : usuario.solicitudRecibida
                  ? "Te envio solicitud"
                  : "Enviar solicitud"
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
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 4,
    marginBottom: 16,
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
  },
  emptyText: {
    color: "#6b7280",
    textAlign: "center",
  },
});
