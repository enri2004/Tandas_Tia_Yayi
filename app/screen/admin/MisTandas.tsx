import CajaInput from "../../../components/ui/CajaInput";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Stack } from "expo-router";
import Apires from "../../../servers/Axios.js"


export default function MisTandas(){

const [data,setData]= useState([])

    const obtener=async()=>{
      try{
        const res = await Apires.get("/Tandas")
        console.log(res.data)
        setData(res.data)
        
      }catch(error){
        console.log(error)
      }
    }
    useEffect(()=>{
  obtener();
},[])


  return (
    <View style={styles.container}>

      <Stack.Screen options={{ title:"Mis Tandas" }} />

      <FlatList
        data={data}
        keyExtractor={(item)=>item}
        renderItem={({item}) => (
         <CajaInput
         nombre= {item}
         pago={item}
        participantes={item}
        turno={item}
        estado={item}
        imagen={item}
        tipo={item}
        rol={item}

        />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f5f6fa"
  }
});