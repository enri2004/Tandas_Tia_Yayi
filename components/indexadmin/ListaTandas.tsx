import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MisTandas from "../../app/screen/admin/MisTandas";

export default function AdminDashboard() {

  return (
<View>
      <Text style={styles.section}>Tandas activas</Text>

    <View style={styles.Mistanda} >
        <MisTandas/>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({


section:{
fontSize:18,
fontWeight:"bold",
marginTop:20,
marginBottom:10
},

tanda:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"white",
padding:15,
borderRadius:12,
marginBottom:10
},

tandaTitle:{
fontWeight:"bold"
},
Mistanda:{
  height:"50%",
  marginBottom:10
}

});