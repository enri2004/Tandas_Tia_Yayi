
import { View, Text, Pressable, StyleSheet } from "react-native";
type Props = {
  frecuencia: string;
  setFrecuencia: (value: string) => void;
};
export default function FrecuenciaSelector({ frecuencia, setFrecuencia }:Props) {

  const opciones = ["semanal", "quincenal", "mensual"];

  return (
    <View style={styles.container}>
      {opciones.map((item) => (
        <Pressable
          key={item}
          style={[
            styles.frecuencia,
            frecuencia === item && styles.activa
          ]}
          onPress={() => setFrecuencia(item)}
        >
          <Text style={
            frecuencia === item ? styles.textActiva : styles.text
          }>
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  frecuencia: {
    backgroundColor: "#787c81",
    padding: 8,
    borderRadius: 8
  },
  activa: {
    backgroundColor: "#22c55e"
  },
  text: {
    color: "#aaa"
  },
  textActiva: {
    color: "#111",
    fontWeight: "bold"
  }
});