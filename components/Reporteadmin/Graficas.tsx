import { View, StyleSheet } from "react-native";
import GraficaBarras from "../ui/grafica_barra";
import GraficaPie from "../ui/grafica_pie";



export default function Graficas() {
  return (
    <View style={styles.container}>
      <View style={styles.grafica}>
        <GraficaBarras />
      </View>

      <View style={styles.grafica}>
        <GraficaPie />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10
  },
  grafica: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10
  }
});