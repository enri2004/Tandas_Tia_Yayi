// /components/detalles/CardInfo.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
type Props={
  Valor:number,
  Turno:number,
  Participantes:number,
  Pagos:number
}

export default function CardInfo({
  Valor,
  Pagos,
  Turno,
  Participantes,
}:Props) {
   
  const total = Valor * Participantes;
  return (
    <View style={styles.cardInfo}>
      <View style={styles.grid}>
        <View style={styles.item}>
          <Text style={styles.label}>Pago por turno</Text>
          <Text style={styles.valor}>${Valor}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Pago</Text>
          <Text style={styles.valor}>{Pagos}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Turno</Text>
          <Text style={styles.valor}>{Turno > 0 ? `#${Turno}` : "Pendiente"}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Recibes</Text>
          <Text style={styles.valor}>${total}</Text>
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
  },
});
