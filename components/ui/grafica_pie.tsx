import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

type PieItem = {
  name: string;
  population: number;
  color: string;
  legendFontColor?: string;
  legendFontSize?: number;
};

type Props = {
  data?: PieItem[];
  chartWidth: number;
  isSmallScreen: boolean;
};

export default function GraficaPie({
  data,
  chartWidth,
  isSmallScreen,
}: Props) {
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
  const pieWidth = Math.max(Math.min(chartWidth - (isSmallScreen ? 12 : 20), chartWidth), 210);
  const pieHeight = isSmallScreen ? 180 : 200;

  return (
    <View style={styles.container}>
      <View style={[styles.chartWrapper, { minHeight: pieHeight }]}>
        <PieChart
          data={pieData}
          width={pieWidth}
          height={pieHeight}
          chartConfig={{
            color: () => "#000",
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          hasLegend={false}
          style={styles.chart}
        />
      </View>

      <View
        style={[
          styles.legendContainer,
          isSmallScreen && styles.legendContainerSmall,
        ]}
      >
        {pieData.map((item) => (
          <View key={item.name} style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                {
                  backgroundColor: item.color,
                },
              ]}
            />
            <Text
              style={[
                styles.legendText,
                {
                  color: item.legendFontColor || "#333",
                  fontSize: item.legendFontSize || (isSmallScreen ? 11 : 12),
                },
              ]}
              numberOfLines={2}
            >
              {item.name}: {item.population}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  chartWrapper: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  chart: {
    alignSelf: "center",
    marginVertical: 0,
  },
  legendContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
  },
  legendContainerSmall: {
    flexDirection: "column",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginRight: 8,
    flexShrink: 0,
  },
  legendText: {
    flexShrink: 1,
    fontWeight: "600",
  },
});
