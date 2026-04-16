import Apires from "@/servers/Axios";
import Cajatext from "../../../components/ui/Cajatext";
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Noti{
_id:string;
titulo:string;
texto:string;
nuevo:boolean;
}


export default function Notificacion() {


const [data, setData]=useState<Noti[]>([])

const obtenerNoti=async()=>{
  try{
    const res = await Apires.get("/Noti");
    setData(res.data)
  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  obtenerNoti();
},[])




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Notificaciones</Text>
        <Text style={styles.subtitulo}>Actividad reciente</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        renderItem={({ item }) => {
          return (
            <Cajatext
              titulo={item.titulo}
              subtitulo={item.texto}
              icono={
                <View style={[
                  styles.iconoBox,
                  item.nuevo && styles.iconoNuevo
                ]}>
                  <Text style={styles.iconoEmoji}>🔔</Text>
                </View>
              }
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

    </SafeAreaView>
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