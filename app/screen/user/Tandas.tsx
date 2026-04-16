import CajaInput from "../../../components/ui/CajaInput";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList,Text} from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Apires from "@/servers/Axios";


export default function Tanda(){
  
  const [data,setData]=useState([])

  const ObtenerDatos= async()=>{
    try{  const res = await Apires.get("/Tandas")
    setData(res.data)}catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    ObtenerDatos();
  },[])

  
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <View style={styles.context}>
        <Text style={styles.titulo}>Tandas</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item)=>item._id}
        renderItem={({item}) => (
         <CajaInput
         nombre= {item.nombre}
         pago={item.pago}
        participantes={item.participantes}
        turno={item.turno}
        estado={item.estado}
        imagen={item.imagen}
        tipo={item.tipo}
        rol={item.rol}
        />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f5f6fa"
  },
  context:{
    backgroundColor:"#3b86f6",
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
    padding:25
  },
  titulo:{
    fontSize:25,
    fontWeight:"bold",
    color:"white"

  }
});