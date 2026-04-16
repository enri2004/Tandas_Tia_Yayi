// components/reporte/CardResumen.tsx

import { View, Text, StyleSheet } from "react-native";

type Props = {
  icon: React.ReactNode;
  titulo: string;
  valor: string;
};

export default function CardResumen({ icon, titulo, valor }: Props) {
  return (
    <View style={styles.caja}>
      {icon}
      <Text>{titulo}</Text>
      <Text>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  }
});