import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CardsAdmin() {

  return (
      <View style={styles.cardsContainer}>

        <View style={styles.card}>
          <Ionicons name="wallet" size={24} color="#4CAF50" />
          <Text style={styles.cardTitle}>Tandas activas</Text>
          <Text style={styles.cardNumber}>8</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="cash" size={24} color="#4CAF50" />
          <Text style={styles.cardTitle}>Dinero recaudado</Text>
          <Text style={styles.cardNumber}>$12,500</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="alert-circle" size={24} color="#FF9800" />
          <Text style={styles.cardTitle}>Pagos pendientes</Text>
          <Text style={styles.cardNumber}>5</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          <Text style={styles.cardTitle}>Tandas finalizadas</Text>
          <Text style={styles.cardNumber}>3</Text>
        </View>

      </View>
      
  );
}

const styles = StyleSheet.create({



cardsContainer:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between"
},

card:{
width:"48%",
backgroundColor:"white",
padding:15,
borderRadius:12,
marginBottom:10
},

cardTitle:{
fontSize:13,
color:"gray"
},

cardNumber:{
fontSize:20,
fontWeight:"bold"
},




});