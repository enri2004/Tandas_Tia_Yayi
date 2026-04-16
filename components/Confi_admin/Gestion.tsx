import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import Item from "./item"
export default function Gestion() {
  return (
  <View>
      <Text style={styles.section}>GESTIÓN DE TANDAS</Text>

      <View style={styles.card}>
        <Item icon="book-outline" title="Reglas de tandas" subtitle="Definir normas y parámetros" />
        <Item icon="cash-outline" title="Montos mínimos" subtitle="Establecer límites de cobro" />
        <Item icon="settings-outline" title="Administración general" subtitle="Control global de la tanda" />
      </View>
       </View>

      
  );
}


const styles = StyleSheet.create({

  section: {
    marginTop: 15,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#888"
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    elevation: 2
  },
});