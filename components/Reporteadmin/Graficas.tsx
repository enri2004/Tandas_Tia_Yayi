import { View, StyleSheet } from "react-native";
import GraficaBarras from "../ui/grafica_barra";
import GraficaPie from "../ui/grafica_pie";

type Props = {
  barLabels: string[];
  barValues: number[];
  pieData: Array<{
    name: string;
    population: number;
    color: string;
    legendFontColor?: string;
    legendFontSize?: number;
  }>;
};

export default function Graficas({ barLabels, barValues, pieData }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.grafica}>
        <GraficaBarras labels={barLabels} values={barValues} />
      </View>

      <View style={styles.grafica}>
        <GraficaPie data={pieData} />
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
