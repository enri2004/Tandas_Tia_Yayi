import { obtenerUsuarioGuardado } from "@/utils/api/login-registrar/authStorage";
import { obtenerTandaPorCodigo, obtenerTandas, unirseATanda } from "@/utils/api/Tandas/tandasApi";
import type { TandaItem } from "@/utils/api/Tandas/tandasTypes";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "../../../components/unirTanda/Input";
import CodigoTandaCard from "../../../components/unirTanda/CodigoTandaCard";
import ListaTandas from "../../../components/unirTanda/ListaTandas";

export default function Unir_Tanda() {
  const router = useRouter();
  const params = useLocalSearchParams<{ codigo?: string }>();
  const [search, setSearch] = useState("");
  const [tandas, setTandas] = useState<TandaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const [tandaInvitada, setTandaInvitada] = useState<TandaItem | null>(null);

  const cargarTandas = useCallback(async () => {
    try {
      setLoading(true);
      const usuario = await obtenerUsuarioGuardado();

      if (!usuario?.id) {
        setCurrentUserId("");
        setTandas([]);
        return;
      }

      setCurrentUserId(usuario.id);
      const respuesta = await obtenerTandas();
      setTandas(Array.isArray(respuesta) ? respuesta : []);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudieron cargar las tandas");
    } finally {
      setLoading(false);
    }
  }, []);

  const cargarTandaPorCodigo = useCallback(async (codigo: string) => {
    try {
      const respuesta = await obtenerTandaPorCodigo(codigo);
      setTandaInvitada(respuesta);
      setSearch(codigo);
    } catch (error: any) {
      setTandaInvitada(null);
      Alert.alert(
        "Aviso",
        error?.response?.data?.mensaje || "No se encontro una tanda con ese codigo"
      );
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarTandas();
    }, [cargarTandas])
  );

  useEffect(() => {
    if (typeof params.codigo === "string" && params.codigo.trim()) {
      cargarTandaPorCodigo(params.codigo.trim());
    }
  }, [cargarTandaPorCodigo, params.codigo]);

  const tandasFiltradas = useMemo(() => {
    const termino = search.trim().toLowerCase();

    if (!termino) {
      return tandas;
    }

    return tandas.filter(
      (item) =>
        item.nombre?.toLowerCase().includes(termino) ||
        item.codigoInvitacion?.toLowerCase().includes(termino)
    );
  }, [search, tandas]);

  const handleJoin = async (tandaId: string) => {
    try {
      if (!currentUserId) {
        Alert.alert("Error", "No se encontro la sesion del usuario");
        return;
      }

      setJoiningId(tandaId);
      const respuesta = await unirseATanda(tandaId, currentUserId);

      if (respuesta?.tanda?._id) {
        setTandas((actual) =>
          actual.map((item) =>
            item._id === tandaId
              ? {
                  ...item,
                  ...respuesta.tanda,
                }
              : item
          )
        );

        if (tandaInvitada?._id === tandaId) {
          setTandaInvitada(respuesta.tanda);
        }
      }

      Alert.alert(
        "Exito",
        respuesta?.mensaje || "Te uniste a la tanda correctamente",
        [
          {
            text: "Ver detalle",
            onPress: () => router.push(`/screen/user/detalles?id=${tandaId}`),
          },
          {
            text: "Cerrar",
            style: "cancel",
          },
        ]
      );

      cargarTandas();
    } catch (error: any) {
      const mensaje =
        error?.response?.data?.mensaje ||
        "No se pudo completar la solicitud";
      Alert.alert("Error", mensaje);
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.ConText}>
        <Text style={styles.Titulo}>Unir A Una Tanda</Text>
      </View>
      <View>
        <Input value={search} onChangeText={setSearch} />
      </View>

      {tandaInvitada ? (
        <CodigoTandaCard
          tanda={tandaInvitada}
          currentUserId={currentUserId}
          joining={joiningId === tandaInvitada._id}
          onJoin={handleJoin}
        />
      ) : null}

      <View style={styles.ListaContainer}>
        <ListaTandas
          data={tandasFiltradas}
          loading={loading}
          joiningId={joiningId}
          currentUserId={currentUserId}
          onJoin={handleJoin}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  ConText: {
    backgroundColor: "#3b82f6",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 25,
  },
  Titulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  ListaContainer: {
    flex: 1,
  },
});
