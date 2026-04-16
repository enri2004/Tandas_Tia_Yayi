// /components/detalles/CardProgreso.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CardProgreso() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Progreso</Text>

      <View style={styles.barraBg}>
        <View style={[styles.barraFill, { width: "60%" }]} />
      </View>

      <Text style={styles.porcentaje}>60%</Text>
      <Text style={styles.subText}>3 de 5 pagos realizados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    backgroundColor:"white",
    margin:20,
    padding:20,
    borderRadius:20,
    elevation:3
  },
  cardTitle:{
    fontSize:16,
    fontWeight:"bold",
    marginBottom:10
  },
  barraBg:{
    height:10,
    backgroundColor:"#eee",
    borderRadius:10,
    overflow:"hidden"
  },
  barraFill:{
    height:"100%",
    backgroundColor:"#3b82f6"
  },
  porcentaje:{
    textAlign:"center",
    fontWeight:"bold",
    marginTop:10
  },
  subText:{
    textAlign:"center",
    color:"#777"
  }
});