// /components/detalles/CardIntegrantes.tsx
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type Integrante = {
  _id: string;
  nombre: string;
  correo?: string;
  imagen?: string;
};

type Props = {
  integrantes: Integrante[];
};

export default function CardIntegrantes({integrantes}:Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Integrantes</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {integrantes.length > 0 ? (
          integrantes.map((item) => {
            const esUrlValida =
              typeof item.imagen === "string" &&
              item.imagen.trim().length > 0 &&
              (item.imagen.startsWith("http://") ||
                item.imagen.startsWith("https://"));

            return (
              <View key={item._id} style={styles.user}>
                <Image
                  source={
                    esUrlValida
                      ? { uri: item.imagen }
                      : require("../../assets/images/icon.png")
                  }
                  style={styles.avatar}
                />
                <Text style={styles.userText}>{item.nombre}</Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyText}>No hay integrantes todavía</Text>
        )}
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
  }, emptyText: {
    color: "#777",
  },
});