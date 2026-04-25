import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BotonesAccion from "../../../components/detalles/Botonesaccion";
import CardInfo from "../../../components/detalles/Cardinfo";
import CardIntegrantes from "../../../components/detalles/Cardintegrantes";
import CardProgreso from "../../../components/detalles/Cardprogreso";
import FechaTurnoCard from "../../../components/detalles/FechaTurnoCard";
import HeaderTanda from "../../../components/detalles/HaderTandas";

import { obtenerTandaPorId } from "@/utils/api/Tandas/tandasApi";
import type { IntegranteItem, TandaItem } from "@/utils/api/Tandas/tandasTypes";
import { obtenerUsuarioGuardado } from "@/utils/api/login-registrar/authStorage";



export default function DetallesScreen() {
 const { id } = useLocalSearchParams<{ id?: string }>();
 const [tanda, setTanda] = useState<TandaItem | null>(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const ObtenerDatos = async () => {
    try {
      setLoading(true);

      if (!id) {
        setTanda(null);
        return;
      }

      const sesion = await obtenerUsuarioGuardado();
      setUserId(sesion?.id || "");
      const res = await obtenerTandaPorId(String(id));
      setTanda(res);
    } catch (error) {
      console.log(error);
      setTanda(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#3b86f6" />
      </SafeAreaView>
    );
  }

  if (!tanda) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No se encontró la tanda</Text>
      </SafeAreaView>
    );
  }

  const turnoActual = Array.isArray(tanda.turnos)
    ? tanda.turnos.find((item) =>
        typeof item.usuario === "string"
          ? item.usuario === userId
          : item.usuario?._id === userId
      )
    : null;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderTanda
            Titulo={tanda.nombre}
            Participantes={tanda.participantes}
          />
          <CardInfo
            Valor={tanda.pago}
            Turno={turnoActual?.orden || 0}
            Participantes={tanda.participantes}
            Pagos={tanda.pagoRealizados || 0}
          />
          <FechaTurnoCard
            fecha={turnoActual?.fechaProgramada || ""}
            estado={turnoActual?.estadoPago || "pendiente"}
          />
          <CardProgreso
            pagosRealizados={tanda.pagoRealizados || 0}
            totalPagos={tanda.participantes}
          />
          <CardIntegrantes
          integrantes={
          Array.isArray(tanda.integrantes) &&
          tanda.integrantes.length > 0 &&
          typeof tanda.integrantes[0] === "object"
          ? (tanda.integrantes as IntegranteItem[])
          : []
          }
          />
          <BotonesAccion tandaId={tanda._id} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
