import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: string;
  title: string;
  subtitle: string;
};


/* COMPONENTE ITEM */
const Item = ({ icon, title, subtitle }:Props) => (
  <View style={styles.item}>
    <Ionicons name={icon as any} size={22} color="#666" />
    <View style={{ marginLeft: 10 }}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.sub}>{subtitle}</Text>
    </View>
  </View>
);

export default  Item;
/* ESTILOS */
const styles = StyleSheet.create({

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },

 

  text: {
    fontSize: 15,
    color: "#333"
  },

  sub: {
    fontSize: 12,
    color: "#777"
  },

 


});