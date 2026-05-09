import { StyleSheet, useWindowDimensions, View } from "react-native";
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
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;
  const horizontalPadding = isSmallScreen ? 12 : 16;
  const gap = isSmallScreen ? 12 : 16;
  const containerWidth = Math.max(width - horizontalPadding * 2, 0);
  const cardWidth = isSmallScreen
    ? containerWidth
    : Math.max((containerWidth - gap) / 2, 0);
  const cardPadding = isSmallScreen ? 12 : 14;
  const chartWidth = Math.max(cardWidth - cardPadding * 2, 220);

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: isSmallScreen ? "column" : "row",
          paddingHorizontal: horizontalPadding,
          gap,
        },
      ]}
    >
      <View
        style={[
          styles.grafica,
          {
            width: isSmallScreen ? "100%" : "48%",
            padding: cardPadding,
          },
        ]}
      >
        <GraficaBarras
          labels={barLabels}
          values={barValues}
          chartWidth={chartWidth}
          isSmallScreen={isSmallScreen}
        />
      </View>

      <View
        style={[
          styles.grafica,
          {
            width: isSmallScreen ? "100%" : "48%",
            padding: cardPadding,
          },
        ]}
      >
        <GraficaPie
          data={pieData}
          chartWidth={chartWidth}
          isSmallScreen={isSmallScreen}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "stretch",
    marginTop: 10,
  },
  grafica: {
    backgroundColor: "white",
    borderRadius: 10,
    maxWidth: "100%",
    overflow: "hidden",
  },
});
