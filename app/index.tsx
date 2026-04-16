import Input from "@/components/ui/input";
import React from "react";
import { View, Text, TextInput, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Botones from "@/components/ui/bontones"
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function Login() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
        resizeMode="cover"
      >
      <Text style={styles.titulo}>Bienvenidos </Text>
      <Text style={styles.subtitulo}>Accede a tu cuenta</Text>
        <View style={styles.container}>
          <View style={styles.input}>  
          <Input placeholder="correo"  />
        </View>
        <View style={styles.input}>  
          <Input placeholder="contraseña"/>
        </View>
        
        <View >
           <Botones nombre="Iniciar seccion" onPress={()=>router.push("/screen/login")} style={styles.btn} styletext={{color:"#fff"}}/>
      </View>
        <Text style={styles.text}>o continuar con:</Text>
           <View style={styles.social}>
             <Botones onPress={() => console.log("Google")} style={styles.icono} >
      <Ionicons name="logo-google" size={25} color="#DB4437" />
      </Botones>
      <Botones onPress={() => console.log("Facebook")} style={styles.icono}>
      <Ionicons name="logo-facebook" size={25} color="#1877F2" />
      </Botones>
          </View>
       <View style={styles.row}>
  <Text style={styles.text}>No tienes cuenta </Text>
  <Botones
    nombre="Crear cuenta"
    onPress={() => router.push("/screen/Login-registre/registro")}
    styletext={styles.btnText}
  />
</View>
      </View>
      </ImageBackground>

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // 🔥 ocupa toda la pantalla
    width: "100%",
    height:"100%"
      },

  titulo:{
    fontSize:50,
  alignSelf:"center",
   color:"#ffff",
  marginTop:80
  },
  subtitulo:{
    fontSize:20,
    alignSelf:"center",
    color:"#ffff"
  },  
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent:"center",
    padding: 20,
    marginTop:"40%"
  },
  input:{
    width:"85%",
    backgroundColor:"#F7F6F2",
    shadowOffset:{
      width:0,
      height:2
    },
    shadowRadius:5,
    shadowOpacity:0.4,
    padding:15,
    borderRadius:15,
    margin:10,
    alignSelf:"center",
  },
  btn:{
    backgroundColor:"#3b86f5",
    width:"60%",
    padding:12,
    borderRadius:20,
    alignContent:"center",
    alignItems:"center",
    marginTop:10,
    alignSelf:"center"
  },
   btnText:{
    color:"#28d537",
     marginLeft:2,
     marginTop:15, 
   },
  text: {
    marginTop: 15,
    color: "#262424",
    alignSelf:"center"
  },
  social: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center"
  },
  icono:{
    backgroundColor:"#F7F6F2",
    padding:12,
    shadowOffset:{
      width:0,
      height:3
    },
    shadowOpacity:0.5,
    shadowRadius:5,
    borderRadius:25,
    elevation: 3,
  },
 row: {
  flexDirection: "row",
  alignItems: "center", // 🔥 los alinea verticalmente
  justifyContent: "center", // 🔥 centra todo
  marginTop: 2,
},
 
});

