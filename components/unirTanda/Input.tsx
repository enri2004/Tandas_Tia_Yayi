import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View,Text, StyleSheet,TextInput, Touchable, TouchableOpacity } from "react-native";
import  { router}  from "expo-router";
import { useCameraPermissions } from "expo-camera";

export default function Input(){
   
   
const [permission, requestPermision]= useCameraPermissions();


   

const hadleScan = async()=>{
    if (!permission?.granted){
        const res = await requestPermision();
        if(!res.granted){
            alert("Permisio de requirido")
            return;
        }
    }
    router.push("/src/components/unirTanda/scanner")
}
    return(
        <>
        <View style={styles.conInput}>
            <Ionicons name="search" size={24}/>
            <TextInput placeholder="Buscar" style={styles.Input} />
         <TouchableOpacity onPress={hadleScan}>
                <MaterialCommunityIcons name="qrcode-scan" size={24}  />
            </TouchableOpacity>
        </View>
        <View>
           
        </View>
        </>
        
    )
}

const styles=StyleSheet.create({
    
    Input:{
        width:"100%",
        marginLeft:10,
    },
    conInput:{
      backgroundColor:"white",
      padding:10,
      borderRadius:10,
      width:"80%",
      left:"10%",
      top:"20%",
      flexDirection:"row"

    }
})