import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ProfileCard() {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: "https://i.pravatar.cc/100" }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.name}>Enrique Cruz</Text>
        <Text style={styles.email}>enrique.c@email.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#FFF",
    padding:15,
    borderRadius:15,
    marginBottom:20,
    elevation:2
  },
  avatar:{
    width:60,
    height:60,
    borderRadius:30,
    marginRight:15
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
    color:"#333"
  },
  email:{
    color:"#777"
  }
});