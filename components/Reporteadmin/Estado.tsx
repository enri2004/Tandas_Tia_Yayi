// components/reporte/EstadoTandas.tsx

import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

type Item = {
  label: string;
  count: number;
  progress: number;
  color: string;
};

type Props = {
  items: Item[];
};

export default function EstadoTandas({ items }: Props) {
  return (
    <View style={styles.caja}>
      <Text style={styles.titulo}>Estado de Tandas</Text>

      {items.map((item) => (
        <View key={item.label} style={styles.item}>
          <View style={styles.row}>
            <Text>{item.label}</Text>
            <Text style={styles.count}>{item.count}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Progress.Bar progress={item.progress} width={200} height={10} color={item.color} />
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
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  count: {
    fontWeight: "700",
  }
});
