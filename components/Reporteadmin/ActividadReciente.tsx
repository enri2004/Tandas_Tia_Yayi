// components/reporte/ActividadReciente.tsx

import { View, Text, Pressable, StyleSheet } from "react-native";

export default function ActividadReciente() {
  return (
    <View style={styles.caja}>
      <Text style={styles.titulo}>Actividad Reciente</Text>

      <Text>Juan Perez Pago: $500</Text>

      <Pressable>
        <Text style={styles.link}>Revisar</Text>
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
  link: {
    color: "blue",
    marginTop: 5
  }
});