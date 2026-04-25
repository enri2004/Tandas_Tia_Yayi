import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type Props = {
  labels?: string[];
  values?: number[];
};

export default function GraficaBarras({
  labels = ["Act", "Fin", "Pend", "Ok"],
  values = [0, 0, 0, 0],
}: Props) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
      },
    ],
  };

  return (
    <View>
      <BarChart
        data={data}
        width={screenWidth * 0.4}
        height={120}
        fromZero
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
          labelColor: () => "#374151",
          propsForBackgroundLines: {
            stroke: "#e5e7eb",
          },
        }}
        style={{
          marginVertical: 10,
          borderRadius: 10,
        }}
        showValuesOnTopOfBars
      />
    </View>
  );
}
