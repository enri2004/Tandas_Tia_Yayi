// components/reporte/Crecimiento.tsx

import { View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
  monto: number;
  porcentaje: number;
};

const formatearMoneda = (valor: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(Number(valor || 0));

export default function Crecimiento({ monto, porcentaje }: Props) {
  const positivo = porcentaje >= 0;
  return (
    <View style={styles.caja}>
      <Text style={styles.titulo}>Indicador de Crecimiento</Text>

      <Text>Avance actual: {formatearMoneda(monto)}</Text>

      <Pressable style={[styles.boton, !positivo && styles.botonNegativo]}>
        <Text style={styles.texto}>
          {positivo ? "+" : ""}
          {porcentaje.toFixed(0)}%
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    margin: 10
  },
  titulo: {
    fontWeight: "bold",
    marginBottom: 10
  },
  boton: {
    marginTop: 10,
    backgroundColor: "#2ecc71",
    padding: 6,
    borderRadius: 6,
    alignSelf: "flex-start"
  },
  texto: {
    color: "white",
    fontWeight: "bold"
  },
  botonNegativo: {
    backgroundColor: "#f59e0b",
  }
});
