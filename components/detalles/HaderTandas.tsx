
import { View, Text, StyleSheet } from "react-native";

export default function HeaderTanda() {
  return (
    <View style={styles.header}>
      <Text style={styles.titulo}>Tanda Oficina</Text>
      <Text style={styles.subtitulo}>Activa • 5 participantes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor:"#3b82f6",
    padding:25,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  },
  titulo:{
    fontSize:26,
    fontWeight:"bold",
    color:"white"
  },
  subtitulo:{
    color:"#dbeafe",
    marginTop:5
  }
});