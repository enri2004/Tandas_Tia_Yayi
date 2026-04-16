import React from "react";
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";

type Props = {
  imagen: string;
};

export default function Comprobante({imagen}:Props) {

return (
  <View style={styles.comprobanteContainer}>
    <Text style={styles.sectionTitle}>Comprobante</Text>

    <Image
      source={{ uri: imagen}}
      style={styles.comprobante}
    />
  </View>


);
}

const styles = StyleSheet.create({

comprobanteContainer:{
  paddingHorizontal:15,
  marginBottom:20
},

sectionTitle:{
  color:"#4A90E2", // 🔵 azul como en tus otras vistas
  marginBottom:8,
  fontWeight:"600"
},

comprobante:{
  width:"100%",
  height:200,
  borderRadius:12,
  resizeMode:"cover"
},

/* BOTONES */
actions:{
  padding:15,
  gap:10
},

confirmar:{
  flexDirection:"row",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#27ae60",
  padding:14,
  borderRadius:12
},

confirmarText:{
  color:"#fff",
  fontWeight:"bold",
  marginLeft:8
},

rechazar:{
  flexDirection:"row",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#fff",
  padding:14,
  borderRadius:12,
  borderWidth:1,
  borderColor:"#e74c3c"
},

rechazarText:{
  color:"#e74c3c",
  fontWeight:"bold",
  marginLeft:8
}

});