import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import Pag from "../../../components/Pagos_admin/Pagos_admin";
import { obtenerComprobantes } from "@/utils/api/comprobantes/comprobantesApi";

type ComprobanteListItem = {
  _id: string;
  monto: number;
  estado: "pendiente" | "aprobado" | "rechazado";
  tanda?: {
    nombre?: string;
  };
  usuario?: {
    nombre?: string;
  };
};

export default function Pagos() {
  const [data, setData] = useState<ComprobanteListItem[]>([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await obtenerComprobantes({ estado: "pendiente" });
        setData(respuesta);
      } catch (error) {
        console.log(error);
      }
    };

    cargar();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No hay comprobantes pendientes</Text>
            <Text style={styles.emptyText}>Los nuevos envios apareceran aqui para revision.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pag
            id={item._id}
            nombre={item.usuario?.nombre || "Usuario"}
            tandas={item.tanda?.nombre || "Sin tanda"}
            pago={`$${item.monto || 0}`}
            pendiente={item.estado}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    paddingTop: 10,
  },
  emptyState: {
    marginTop: 60,
    alignItems: "center",
    paddingHorizontal: 24,
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
