// /components/detalles/CardInfo.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CardInfo() {
  return (
    <View style={styles.cardInfo}>
      <View style={styles.grid}>
        <View style={styles.item}>
          <Text style={styles.label}>Pago por turno</Text>
          <Text style={styles.valor}>$1,000</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Pago total</Text>
          <Text style={styles.valor}>$5,000</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Turno</Text>
          <Text style={styles.valor}>#3</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Recibes</Text>
          <Text style={styles.valor}>$5,000</Text>
        </View>
      </View>

      <View style={styles.lineVertical} />
      <View style={styles.lineHorizontal} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardInfo:{
    backgroundColor:"white",
    marginTop:-40,
    marginHorizontal:20,
    borderRadius:20,
    padding:20,
    elevation:5
  },
  grid:{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  item:{
    width:"50%",
    padding:10,
    alignItems:"center"
  },
  label:{
    fontSize:12,
    color:"#777"
  },
  valor:{
    fontSize:18,
    fontWeight:"bold",
    marginTop:5
  },
  lineVertical:{
    position:"absolute",
    width:1,
    height:"100%",
    backgroundColor:"#eee",
    left:"50%"
  },
  lineHorizontal:{
    position:"absolute",
    height:1,
    width:"100%",
    backgroundColor:"#eee",
    top:"50%"
  }
});