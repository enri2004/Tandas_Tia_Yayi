// /components/detalles/CardIntegrantes.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const integrantes = [
  { id: 1, nombre: "Juan", img: "https://i.pravatar.cc/100?img=1" },
  { id: 2, nombre: "Ana", img: "https://i.pravatar.cc/100?img=2" },
  { id: 3, nombre: "Luis", img: "https://i.pravatar.cc/100?img=3" },
  { id: 4, nombre: "Maria", img: "https://i.pravatar.cc/100?img=4" }
];

export default function CardIntegrantes() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Integrantes</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {integrantes.map((item) => (
          <View key={item.id} style={styles.user}>
            <Image source={{ uri: item.img }} style={styles.avatar} />
            <Text style={styles.userText}>{item.nombre}</Text>
          </View>
        ))}
      </ScrollView>
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
  user:{
    alignItems:"center",
    marginRight:15
  },
  avatar:{
    width:60,
    height:60,
    borderRadius:30
  },
  userText:{
    fontSize:12,
    marginTop:5
  }
});