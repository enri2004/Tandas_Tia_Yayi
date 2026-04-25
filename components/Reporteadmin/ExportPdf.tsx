import { View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
  onPress: () => void;
};

export default function ExportarPDF({ onPress }: Props) {
  return (
    <View style={styles.caja}>
      <Text style={styles.titulo}>Admin exporta analisis</Text>

      <Pressable style={styles.boton} onPress={onPress}>
        <Text style={styles.texto}>Exportar reporte a PDF</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    alignItems: "center",
  },
  titulo: {
    fontWeight: "bold",
  },
  boton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  texto: {
    color: "white",
    fontWeight: "bold",
  },
});
