import React from "react";
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
type Props = {
  monto: string;
  fecha: string;
  metodo: string;
};

export default function InfoPago ({ monto, fecha, metodo }: Props) {

return (

  <View style={styles.infoBox}>
    <View style={styles.row}>
      <Text style={styles.label}>Monto</Text>
      <Text style={styles.valueGreen}>{monto}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.value}>{fecha}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.label}>Método</Text>
      <Text style={styles.value}>{metodo}</Text>
    </View>
  </View>
);
}

const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#f2f4f7",
  padding:20
},

/* HEADER */
header:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:20
},

title:{
  fontSize:22,
  color:"#27ae60", // 🔥 VERDE PRINCIPAL
  fontWeight:"bold"
},

/* CARD */
card:{
  backgroundColor:"#fff",
  borderRadius:20,
  overflow:"hidden",
  elevation:4
},

/* HEADER COLOR (tipo tus otras pantallas) */
headerColor:{
  backgroundColor:"#4A90E2", // 🔵 AZUL
  padding:15,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center"
},

tanda:{
  fontSize:16,
  color:"#fff",
  fontWeight:"bold"
},

badge:{
  backgroundColor:"#27ae60",
  paddingHorizontal:10,
  paddingVertical:5,
  borderRadius:20
},

badgeText:{
  color:"#fff",
  fontSize:12,
  fontWeight:"bold"
},

/* INFO */
infoBox:{
  padding:15
},

row:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginBottom:10
},

label:{
  color:"#777",
  fontSize:13
},

value:{
  color:"#333",
  fontSize:13
},

valueGreen:{
  color:"#27ae60",
  fontWeight:"bold"
},

/* COMPROBANTE */
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