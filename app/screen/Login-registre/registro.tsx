import Input from "@/components/ui/input";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet, View,Text } from "react-native";
import Botones from "@/components/ui/bontones";
import { router } from "expo-router";

export default function Registre(){
    return(
        <SafeAreaView style={{flex:1}}>
         <ImageBackground
        source={require("../../../assets/images/background.png")}
        style={styles.background}
        resizeMode="cover"
                  >
                    
          <Text style={styles.titulo}>Registro</Text>          
        <View style={styles.ContInput}>
        <View style={styles.Input}>
        <Input placeholder="nombre"/>
        </View>
          <View style={styles.Input}>
        <Input placeholder="edad"/>
        </View>
         <View style={styles.Input}>
        <Input placeholder="telefono"/>
        </View>
         <View style={styles.Input}>
        <Input placeholder="correo"/>
        </View>
         <View style={styles.Input}>
        <Input placeholder="usuario"/>
        </View> <View style={styles.Input}>
        <Input placeholder="contraseña"/>
        </View>
        </View>
        <Botones nombre="Registrarse" onPress={()=>console.log("registro")} style={styles.btn} styletext={styles.btnText}/>
        </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        width:"100%",
        height:"82%"
    },
    ContInput:{
        marginTop:"30%",
        },
    Input:{
        width:"80%",
        backgroundColor:"#F7F6F2",
        padding:10,
        shadowOffset:{
            height:2,
            width:0
        },
        shadowOpacity:0.5,
        shadowRadius:10,
        shadowColor:"#20201f",
        margin:8,
        borderRadius:10,
        alignSelf:"center"
    
    },
    btn:{
        backgroundColor:"#3b86f5",
        padding:10,
       borderRadius:25,
       width:"60%",
       alignSelf:"center", 
       margin:10,
       alignItems:"center",
        justifyContent:"center"
    },
    btnText:{
        color:"#fff",
        fontSize:18,
        
    },
    titulo:{
        color:"#fff",
        fontSize:50,
        alignSelf:"center",
        marginTop:80
    }
})