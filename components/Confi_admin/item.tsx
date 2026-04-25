import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
};


/* COMPONENTE ITEM */
const Item = ({ icon, title, subtitle, onPress }:Props) => (
  <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={onPress} disabled={!onPress}>
    <Ionicons name={icon as any} size={22} color="#666" />
    <View style={{ marginLeft: 10 }}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.sub}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
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
