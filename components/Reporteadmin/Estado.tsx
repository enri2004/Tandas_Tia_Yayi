// components/reporte/EstadoTandas.tsx

import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
export default function EstadoTandas() {
  return (
    <View style={styles.caja}>
      <Text style={styles.titulo}>Estado de Tandas</Text>

      {["Activas", "Finalizadas", "Canceladas"].map((item) => (
        <View key={item} style={styles.item}>
          <Text>{item}</Text>
           <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Progress.Bar progress={0.3} width={200}
            height={10}
            color="green" />
            </View>
        </View>
      ))}
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
  item: {
    marginBottom: 10
  }
});