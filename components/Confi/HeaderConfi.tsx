import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderConfig() {
  return (
    <View style={styles.header}>
      <Ionicons name="arrow-back" size={24} color="#333" />
      <Text style={styles.title}>Configuración</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:20
  },
  title:{
    fontSize:22,
    fontWeight:"bold",
    marginLeft:10,
    color:"#333"
  }
});