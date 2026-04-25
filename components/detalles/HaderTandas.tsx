
import { StyleSheet, Text, View } from "react-native";
type Props={
Titulo:string,
Participantes:number,
}


export default function HeaderTanda({Titulo, Participantes}:Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.titulo}>{Titulo}</Text>
      <Text style={styles.subtitulo}>Activa •  {Participantes} participantes</Text>
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