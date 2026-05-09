import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

type Props = {
  labels?: string[];
  values?: number[];
  chartWidth: number;
  isSmallScreen: boolean;
};

export default function GraficaBarras({
  labels = ["Act", "Fin", "Pend", "Ok"],
  values = [0, 0, 0, 0],
  chartWidth,
  isSmallScreen,
}: Props) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
      },
    ],
  };
  const baseWidth = Math.max(chartWidth, 220);
  const scrollableWidth = Math.max(
    baseWidth,
    labels.length * (isSmallScreen ? 72 : 84)
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <BarChart
          data={data}
          width={scrollableWidth}
          height={isSmallScreen ? 220 : 240}
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
            propsForLabels: {
              fontSize: isSmallScreen ? 10 : 12,
            },
            fillShadowGradient: "#22c55e",
            fillShadowGradientOpacity: 1,
          }}
          style={styles.chart}
          showValuesOnTopOfBars
          withInnerLines
          flatColor
          verticalLabelRotation={0}
          segments={4}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  scrollContent: {
    minWidth: "100%",
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
});
