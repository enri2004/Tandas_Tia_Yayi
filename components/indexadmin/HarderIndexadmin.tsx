import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";


export default function  HaderIndexadmind() {

  return (
 <View style={styles.container}>

      <Text style={styles.title}>Hola Administrador</Text>
      <Text style={styles.subtitle}>Resumen de las tandas</Text>
      <Ionicons name="notifications-outline" size={24} onPress={()=>router.push("/src/screen/admin/notificaciones")}/>

      </View>
  );
}

const styles = StyleSheet.create({

container:{
padding:20,
backgroundColor:"#f2f2f2"
},

title:{
fontSize:22,
fontWeight:"bold"
},

subtitle:{
color:"gray",
marginBottom:15
},




});