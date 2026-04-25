import React from "react";
import { View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type PieItem = {
  name: string;
  population: number;
  color: string;
  legendFontColor?: string;
  legendFontSize?: number;
};

type Props = {
  data?: PieItem[];
};

export default function GraficaPie({ data }: Props) {
  const pieData =
    data && data.length
      ? data
      : [
          {
            name: "Pagados",
            population: 1,
            color: "green",
            legendFontColor: "#333",
            legendFontSize: 12,
          },
        ];

  return (
    <View>
      <PieChart
        data={pieData}
        width={screenWidth * 0.45}
        height={120}
        chartConfig={{
          color: () => `#000`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"10"}
        hasLegend
      />
    </View>
  );
}
