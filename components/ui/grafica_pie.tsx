import React from "react";
import { View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function GraficaPie(){

const data = [
  {
    name: "Pagados",
    population: 70,
    color: "green",
    legendFontColor: "#333",
    legendFontSize: 14
  },
  {
    name: "Pendientes",
    population: 20,
    color: "orange",
    legendFontColor: "#333",
    legendFontSize: 14
  },
  {
    name: "Atrasados",
    population: 10,
    color: "red",
    legendFontColor: "#333",
    legendFontSize: 14
  }
];

return(

<View>

<PieChart
  data={data}
  width={screenWidth * 0.45}
  height={100}
  chartConfig={{
    color: () => `#000`
  }}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
/>

</View>

);
}