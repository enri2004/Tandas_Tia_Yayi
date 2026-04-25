import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import InfoPago from "../../../components/ConfirmarPago/InfoPago";
import Comprobante from "../../../components/ConfirmarPago/Comprobante";
import AccionesPago from "../../../components/ConfirmarPago/AccionesPago";
import { obtenerComprobantes, revisarComprobante } from "@/utils/api/comprobantes/comprobantesApi";
import { obtenerUsuarioGuardado } from "@/utils/api/login-registrar/authStorage";

type ComprobanteDetalle = {
  _id: string;
  monto: number;
  metodoPago: string;
  comprobanteUrl?: string;
  estado: "pendiente" | "aprobado" | "rechazado";
  observacionesAdmin?: string;
  createdAt: string;
  tanda?: {
    _id?: string;
    nombre?: string;
  };
  usuario?: {
    _id?: string;
    nombre?: string;
  };
};

export default function ConfirmarPagos() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const [comprobante, setComprobante] = useState<ComprobanteDetalle | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await obtenerComprobantes({
          estado: "pendiente",
        });

        const encontrado =
          respuesta.find((item: ComprobanteDetalle) => item._id === id) || respuesta[0] || null;

        setComprobante(encontrado);
      } catch (error) {
        console.log(error);
      }
    };

    cargar();
  }, [id]);

  const revisar = async (estado: "aprobado" | "rechazado") => {
    if (!comprobante?._id) {
      return;
    }

    try {
      setLoading(true);
      const admin = await obtenerUsuarioGuardado();

      await revisarComprobante(comprobante._id, {
        estado,
        adminId: admin?.id,
      });

      Alert.alert(
        "Exito",
        estado === "aprobado"
          ? "Comprobante aprobado. Se genero historial, notificacion y push al usuario."
          : "Comprobante rechazado. Se genero historial, notificacion y push al usuario."
      );

      router.back();
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo revisar el comprobante"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!comprobante) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No se encontro un comprobante pendiente</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Confirmar pago</Text>
        <Ionicons name="receipt-outline" size={26} color="#27ae60" />
      </View>

      <View style={styles.card}>
        <View style={styles.headerColor}>
          <Text style={styles.tanda}>{comprobante.tanda?.nombre || "Tanda"}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{comprobante.estado}</Text>
          </View>
        </View>

        <InfoPago
          monto={`$${comprobante.monto || 0} MXN`}
          fecha={new Date(comprobante.createdAt).toLocaleString("es-MX")}
          metodo={comprobante.metodoPago}
        />

        <View style={styles.usuarioBox}>
          <Text style={styles.usuarioLabel}>Usuario</Text>
          <Text style={styles.usuarioNombre}>{comprobante.usuario?.nombre || "Sin nombre"}</Text>
        </View>

        {comprobante.comprobanteUrl ? (
          <Comprobante imagen={comprobante.comprobanteUrl} />
        ) : (
          <View style={styles.sinComprobante}>
            <Text style={styles.sinComprobanteText}>Este pago no incluye imagen de comprobante.</Text>
          </View>
        )}

        <AccionesPago
          onConfirmar={() => revisar("aprobado")}
          onRechazar={() => revisar("rechazado")}
        />

        {loading && <Text style={styles.loadingText}>Procesando revision...</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: "#27ae60",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
    paddingBottom: 16,
  },
  headerColor: {
    backgroundColor: "#4A90E2",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tanda: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: "#27ae60",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  usuarioBox: {
    paddingHorizontal: 15,
    paddingBottom: 12,
  },
  usuarioLabel: {
    color: "#6b7280",
    fontSize: 12,
  },
  usuarioNombre: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
  sinComprobante: {
    marginHorizontal: 15,
    padding: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
  },
  sinComprobanteText: {
    color: "#6b7280",
  },
  loadingText: {
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "600",
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f2f4f7",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
  },
});
