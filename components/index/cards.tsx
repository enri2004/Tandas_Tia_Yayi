import React from "react";
import { View, Text, StyleSheet,Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const {width} = Dimensions.get("window");
const CARD_WIDTH = (width - 50) / 2;

export default function CardsDashboard() {
  return (
    <View style={styles.containerCard}>

      {/* AZUL */}
      <View style={styles.card}>
        <View style={[styles.floatingHeader, styles.blue]}>
          <Text style={styles.headerText}>Resumen de Tandas</Text>
          <Text style={styles.bigText}>4 Tandas Activas</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.label}>Próximo Pago:</Text>
            <Text style={styles.value}>$1,250 MXN</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha Límite:</Text>
            <View style={styles.iconRow}>
              <Text style={styles.value}>25 Octubre</Text>
              <Ionicons name="calendar-outline" size={18} color="#555" />
            </View>
          </View>
        </View>
      </View>

      {/* VERDE */}
      <View style={styles.card}>
        <View style={[styles.floatingHeader1, styles.green]}>
          <View style={styles.rowBetween}>
            <Text style={styles.headerText}>Próximo Turno</Text>
            <Ionicons name="gift-outline" size={20} color="white" />
          </View>

          <Text style={styles.bigText}>¡Tu Turno #7</Text>
        </View>

        <View style={styles.body1}>
          <Text style={styles.label}>Monto a Recibir:</Text>
          <Text style={styles.amount}>$10,000 MXN</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

containerCard:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginBottom:20,
  flexWrap:"wrap"
},

card:{
  width:"48%",
  backgroundColor:"#fff",
  borderRadius:16,
  marginTop:25,
  paddingTop:35,
  elevation:4
},

floatingHeader:{
  position:"absolute",
  top:-20,
  width:"100%",
  padding:15,
  borderRadius:12
},

floatingHeader1:{
  position:"absolute",
  top:-20,
  width:"100%",
  padding:25,
  borderRadius:12
},

blue:{ backgroundColor:"#4A90E2" },
green:{ backgroundColor:"#27AE60" },

rowBetween:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center"
},

headerText:{ color:"#fff", fontSize:13 },
bigText:{ color:"#fff", fontSize:16, fontWeight:"bold" },

body:{ padding:12, marginTop:10 },
body1:{ padding:12, marginTop:40 },

row:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginBottom:6
},

label:{ fontSize:width * 0.03, color:"#555" },
value:{ fontSize: width * 0.03, fontWeight:"600" },

iconRow:{
  flexDirection:"row",
  alignItems:"center"
},

amount:{
  fontSize: width * 0.045,
  fontWeight:"bold",
  marginTop:5
}

});