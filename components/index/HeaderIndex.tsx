import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HeaderDashboard() {
  return (
    <View style={styles.header}>
      <Image source={require("../../assets/images/icon.png")} style={styles.imagen}/>

      <View>
        <Text style={styles.saludo}>¡Hola, María! 👋</Text>
        <Text style={styles.fecha}>Miércoles, 15 Oct 2024</Text>
      </View>

      <Ionicons 
        name="notifications-outline" 
        size={26} 
        onPress={() => router.push("../app/screen/user/notificaciones")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:20,
     marginTop:10
  },
  saludo:{ fontSize:20, fontWeight:"bold" },
  fecha:{ color:"gray" },
  imagen:{ width:60, height:60, borderRadius:999 }
});