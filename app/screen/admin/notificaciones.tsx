import Cajatext from "../../../components/ui/Cajatext";
import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

const data = [
  { id: "1", titulo: "Pago confirmado", texto: "Tu pago es de $1250 MXN", nuevo: true },
  { id: "2", titulo: "Nuevo mensaje", texto: "Juan te envió un mensaje", nuevo: true },
  { id: "3", titulo: "Turno asignado", texto: "Recibirás la tanda el 15 de julio", nuevo: false },
  { id: "4", titulo: "Pago pendiente", texto: "Debes pagar $500 MXN", nuevo: true },
];

export default function Notificacion() {
  return (
    <View style={styles.container}>

      {/* 🔷 HEADER */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Notificaciones</Text>
        <Text style={styles.subtitulo}>Actividad reciente</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}

        renderItem={({ item }) => {

          return (
            <Cajatext
              titulo={item.titulo}
              subtitulo={item.texto}

              /* ICONO */
              icono={
                <View style={[
                  styles.iconoBox,
                  item.nuevo && styles.iconoNuevo
                ]}>
                  <Text style={styles.iconoEmoji}>🔔</Text>
                </View>
              }

              /* DERECHA */
              derecha={
                <View style={styles.derecha}>

                  {item.nuevo && <View style={styles.dot} />}

                  <Text style={styles.hora}>Ahora</Text>

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
  backgroundColor:"#e5e7eb",
  justifyContent:"center",
  alignItems:"center",
  marginRight:10
},

iconoNuevo:{
  backgroundColor:"#dbeafe"
},

iconoEmoji:{
  fontSize:20
},

/* DERECHA */
derecha:{
  alignItems:"flex-end"
},

hora:{
  fontSize:12,
  color:"#888"
},

dot:{
  width:10,
  height:10,
  borderRadius:5,
  backgroundColor:"#3b82f6",
  marginBottom:5
}

});