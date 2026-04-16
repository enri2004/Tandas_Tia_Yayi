import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  onPress: () => void;
};

export default function BotonCrear({ onPress }:Props) {
  return (
    <Pressable style={styles.boton} onPress={onPress}>
      <Text style={styles.texto}>Crear Tanda +</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },
  texto: {
    color: "#f2f4f7",
    fontWeight: "bold",
    fontSize: 16
  }
});