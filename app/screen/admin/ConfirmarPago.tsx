import React from "react";
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InfoPago from "../../../components/ConfirmarPago/InfoPago";
import Comprobante from "../../../components/ConfirmarPago/Comprobante";
import AccionesPago from "../../../components/ConfirmarPago/AccionesPago";

export default function ConfirmarPagos() {

return (

<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
<View style={styles.header}>
  <Text style={styles.title}>Confirmar pago</Text>
  <Ionicons name="receipt-outline" size={26} color="#27ae60"/>
</View>
<View style={styles.card}>
  <View style={styles.headerColor}>
    <Text style={styles.tanda}>Tanda Navidad 2026</Text>
    <View style={styles.badge}>
      <Text style={styles.badgeText}>3 pendientes</Text>
    </View>
  </View>
      <InfoPago
        monto="$500 MXN"
        fecha="12 Mar 2026 · 18:20"
        metodo="Transferencia SPEI"
      />
      <Comprobante imagen="https://i.imgur.com/1ZQZ1Zm.png" />
      <AccionesPago
        onConfirmar={() => console.log("Confirmado")}
        onRechazar={() => console.log("Rechazado")}
      />

</View>

</ScrollView>

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



});