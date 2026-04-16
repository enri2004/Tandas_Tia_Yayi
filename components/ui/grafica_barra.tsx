import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function GraficaBarras() {

const data = {
  labels: ["Ene", "Feb", "Mar", "Abr"],
  datasets: [
    {
      data: [500, 800, 650, 900]
    }
  ]
};

return (
<View>

<BarChart
  data={data}
  width={screenWidth * 0.40}
  height={100}
  yAxisLabel="$"
  yAxisSuffix=""
  chartConfig={{
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`
  }}
  style={{
    marginVertical: 10,
    borderRadius: 10
  }}
/>

</View>
);
}