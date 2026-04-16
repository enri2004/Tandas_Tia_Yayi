// components/reporte/Crecimiento.tsx

import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Crecimiento() {
  return (
    <View style={styles.caja}>
      <Text style={styles.titulo}>Indicador de Crecimiento</Text>

      <Text>Este Mes: $5,200</Text>

      <Pressable style={styles.boton}>
        <Text style={styles.texto}>+12%</Text>
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
  }
});