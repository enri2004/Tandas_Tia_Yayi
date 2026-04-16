import Cajatext from "../../../components/ui/Cajatext";
import IconoEstado from "../../../components/ui/icono";
import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

const data = [
  { id: "1", titulo: "Pago recibido", subtitulo: "10/03/2026", dinero: "$1,000" },
  { id: "2", titulo: "Pago rechazado", subtitulo: "10/03/2026", dinero: "$1,000" },
  { id: "3", titulo: "Pago pendiente", subtitulo: "10/03/2026", dinero: "$1,000" },
];

export default function Historial() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Historial</Text>
        <Text style={styles.subtitulo}>Movimientos recientes</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        renderItem={({ item }) => {
          const colorMonto =
            item.titulo === "Pago recibido"
              ? "#22c55e"
              : item.titulo === "Pago rechazado"
              ? "#ef4444"
              : "#f59e0b";

          return (
            <Cajatext
              titulo={item.titulo}
              subtitulo={item.subtitulo}
              icono={
                <View style={styles.iconoBox}>
                  <IconoEstado mensaje={item.titulo} />
                </View>
              }
              derecha={
                <View style={styles.derecha}>
                  <Text style={[styles.monto, { color: colorMonto }]}>
                    {item.dinero}
                  </Text>
                  <Text style={styles.estado}>
                    {item.titulo.replace("Pago ", "")}
                  </Text>
                </View>
              }
            />
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#f5f6fa"
},

/* HEADER */
header:{
  backgroundColor:"#3b82f6",
  padding:25,
  borderBottomLeftRadius:25,
  borderBottomRightRadius:25
},

titulo:{
  fontSize:22,
  fontWeight:"bold",
  color:"white"
},

subtitulo:{
  color:"#dbeafe",
  marginTop:5
},

/* ICONO */
iconoBox:{
  width:45,
  height:45,
  borderRadius:15,
  backgroundColor:"#eef2ff",
  justifyContent:"center",
  alignItems:"center",
  marginRight:10
},

/* DERECHA */
derecha:{
  alignItems:"flex-end"
},

monto:{
  fontWeight:"bold",
  fontSize:16
},

estado:{
  fontSize:12,
  color:"#777"
}

});