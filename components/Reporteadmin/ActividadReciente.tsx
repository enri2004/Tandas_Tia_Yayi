import { View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
  titulo?: string;
  descripcion?: string;
  fecha?: string;
};

export default function ActividadReciente({
  titulo = "Sin actividad reciente",
  descripcion = "Cuando ocurra un movimiento importante aparecera aqui.",
  fecha = "",
}: Props) {
  return (
    <View style={styles.caja}>
      <Text style={styles.titulo}>Actividad Reciente</Text>

      <Text style={styles.textoPrincipal}>{titulo}</Text>
      <Text style={styles.textoSecundario}>{descripcion}</Text>
      {fecha ? <Text style={styles.fecha}>{fecha}</Text> : null}

      <Pressable>
        <Text style={styles.link}>Revisar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    margin: 10
  },
  titulo: {
    fontWeight: "bold",
    marginBottom: 10
  },
  textoPrincipal: {
    color: "#111827",
    fontWeight: "600",
  },
  textoSecundario: {
    color: "#4b5563",
    marginTop: 6,
  },
  fecha: {
    color: "#9ca3af",
    marginTop: 8,
    fontSize: 12,
  },
  link: {
    color: "blue",
    marginTop: 5
  }
});
